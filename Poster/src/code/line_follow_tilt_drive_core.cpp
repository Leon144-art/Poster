#include <opencv2/opencv.hpp>

#include <algorithm>
#include <chrono>
#include <cmath>
#include <csignal>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <limits>
#include <string>
#include <thread>
#include <vector>

#include <fcntl.h>
#include <termios.h>
#include <unistd.h>

namespace
{
volatile std::sig_atomic_t gKeepRunning = 1;

constexpr const char *kStopCommand = "#ha";
constexpr int kCameraWarmupFrames = 12;
constexpr int kXDeadbandPixels = 10;
constexpr int kEmaResetLostFrames = 5;
constexpr double kCornerEnterDeg = 35.0;
constexpr double kCornerFullDeg = 65.0;
constexpr int kCornerReverseSpeed = 28;

struct Config
{
    int width = 960;
    int height = 540;
    int fps = 60;
    int cameraIndex = 0;
    bool rotate180 = true;
    int loopMs = 1;

    int roiPositionPercent = 95;
    int roiHeightPercent = 65;
    int blurKernel = 5;
    int morphKernel = 5;

    int hMin = 0;
    int hMax = 180;
    int sMin = 0;
    int sMax = 70;
    int vMin = 0;
    int vMax = 110;
    int minAreaBasisPoints = 4;

    double emaAlpha = 0.50;
    double expoPower = 2.0;
    double tiltDeadbandDeg = 2.0;

    double kp = 120.0;
    double ki = 1.0;
    double kd = 0.15;
    double integralLimit = 2.0;
    double outputLimit = 30.0;

    int baseLeft = 30;
    int baseRight = 36;
    int trimFrontRight = 0;
    int trimRearLeft = 0;
    int trimFrontLeft = 0;
    int trimRearRight = 1;

    std::string serialDevice = "/dev/ttyAMA0";
    int baudRate = 57600;
    std::string videoPath;
};

struct DetectionResult
{
    cv::Rect roiRect;
    bool centreComputed = false;
    cv::Point centre{-1, -1};
    bool fitComputed = false;
    cv::Point2f fitLinePoint{0.0f, 0.0f};
    cv::Point2f fitLineDirection{0.0f, 0.0f};
};

struct TiltTrackerState
{
    double emaTilt = std::numeric_limits<double>::quiet_NaN();
    int lostFrames = 0;
};

struct PidState
{
    double integral = 0.0;
    double previousError = 0.0;
    bool hasPreviousError = false;
};

struct ControlOutput
{
    bool lineFound = false;
    int leftSpeed = 0;
    int rightSpeed = 0;
    std::string driveCommand = kStopCommand;
};

struct SerialPort
{
    int fd = -1;
    bool available = false;
};

struct WheelSetpoint
{
    int frontRight = 0;
    int rearLeft = 0;
    int frontLeft = 0;
    int rearRight = 0;
};

static void handleSignal(int signalNumber)
{
    (void)signalNumber;
    gKeepRunning = 0;
}

static int ensureOddKernel(int value)
{
    value = std::max(1, value);
    return (value % 2 == 0) ? value + 1 : value;
}

static cv::Rect computeRoiRect(const cv::Size &frameSize, const Config &config)
{
    const int roiHeight = std::max(1, frameSize.height * std::max(1, config.roiHeightPercent) / 100);
    const int maxStart = std::max(0, frameSize.height - roiHeight);
    const int roiStart = std::clamp(config.roiPositionPercent * maxStart / 100, 0, maxStart);
    return cv::Rect(0, roiStart, frameSize.width, roiHeight);
}

static DetectionResult detectLine(const cv::Mat &frame, const Config &config)
{
    DetectionResult result;
    result.roiRect = computeRoiRect(frame.size(), config);
    const cv::Mat roi = frame(result.roiRect).clone();

    const int blurKernel = ensureOddKernel(config.blurKernel);
    const int morphKernel = ensureOddKernel(config.morphKernel);
    const cv::Mat morphElement =
        cv::getStructuringElement(cv::MORPH_ELLIPSE, cv::Size(morphKernel, morphKernel));

    cv::Mat blurred;
    cv::GaussianBlur(roi, blurred, cv::Size(blurKernel, blurKernel), 0.0);

    cv::Mat hsv;
    cv::cvtColor(blurred, hsv, cv::COLOR_BGR2HSV);

    cv::Mat mask;
    cv::inRange(hsv,
                cv::Scalar(config.hMin, config.sMin, config.vMin),
                cv::Scalar(config.hMax, config.sMax, config.vMax),
                mask);
    cv::morphologyEx(mask, mask, cv::MORPH_OPEN, morphElement);
    cv::morphologyEx(mask, mask, cv::MORPH_CLOSE, morphElement);

    std::vector<std::vector<cv::Point>> contours;
    cv::findContours(mask.clone(), contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);

    int largestIndex = -1;
    double largestArea = 0.0;
    for (int i = 0; i < static_cast<int>(contours.size()); ++i)
    {
        const double area = cv::contourArea(contours[i]);
        if (area > largestArea)
        {
            largestArea = area;
            largestIndex = i;
        }
    }

    const double minAreaThreshold = static_cast<double>(config.minAreaBasisPoints) * result.roiRect.area() / 10000.0;
    if (largestIndex < 0 || largestArea < minAreaThreshold)
    {
        return result;
    }

    const std::vector<cv::Point> &largestContour = contours[largestIndex];
    const cv::Moments moments = cv::moments(largestContour);
    if (std::abs(moments.m00) > 1e-9)
    {
        const int centerX = static_cast<int>(moments.m10 / moments.m00);
        const int centerY = static_cast<int>(moments.m01 / moments.m00);
        result.centreComputed = true;
        result.centre = cv::Point(centerX, centerY);
    }

    if (largestContour.size() < 6)
    {
        return result;
    }

    cv::Vec4f lineParams;
    cv::fitLine(largestContour, lineParams, cv::DIST_L2, 0, 0.01, 0.01);
    result.fitLinePoint = cv::Point2f(lineParams[2], lineParams[3]);
    result.fitLineDirection = cv::Point2f(lineParams[0], lineParams[1]);
    result.fitComputed = true;
    return result;
}

static double computeTiltAngleDeg(const DetectionResult &result)
{
    if (!result.fitComputed)
    {
        return std::numeric_limits<double>::quiet_NaN();
    }

    const double angle = std::atan2(result.fitLineDirection.y, result.fitLineDirection.x) * 180.0 / CV_PI;
    return (angle >= 0.0) ? angle : (angle + 180.0);
}

static double filterEma(double previous, double current, double alpha)
{
    if (std::isnan(current))
    {
        return previous;
    }
    if (std::isnan(previous))
    {
        return current;
    }
    return alpha * current + (1.0 - alpha) * previous;
}

static double applyExpo(double normalizedError, double expoPower)
{
    const double clamped = std::clamp(normalizedError, -1.0, 1.0);
    return std::copysign(std::pow(std::abs(clamped), expoPower), clamped);
}

static void resetPid(PidState &state)
{
    state.integral = 0.0;
    state.previousError = 0.0;
    state.hasPreviousError = false;
}

static double computeCornerRatio(double tiltDeg, double tiltDeadbandDeg)
{
    if (std::isnan(tiltDeg))
    {
        return 0.0;
    }

    const double theta = std::max(0.0, std::abs(tiltDeg - 90.0) - std::max(0.0, tiltDeadbandDeg));
    if (theta <= kCornerEnterDeg)
    {
        return 0.0;
    }
    if (theta >= kCornerFullDeg)
    {
        return 1.0;
    }

    return (theta - kCornerEnterDeg) / (kCornerFullDeg - kCornerEnterDeg);
}

static char protocolDirectionForSignedSpeed(int signedSpeed, char forwardDirection)
{
    const char reverseDirection = (forwardDirection == 'f') ? 'r' : 'f';
    return (signedSpeed >= 0) ? forwardDirection : reverseDirection;
}

static int protocolMagnitudeForSignedSpeed(int signedSpeed)
{
    return std::clamp(std::abs(signedSpeed), 0, 99);
}

static std::string buildWheelCommand(const WheelSetpoint &wheelSetpoint)
{
    const char directionFrontRight = protocolDirectionForSignedSpeed(wheelSetpoint.frontRight, 'f');
    const char directionRearLeft = protocolDirectionForSignedSpeed(wheelSetpoint.rearLeft, 'r');
    const char directionFrontLeft = protocolDirectionForSignedSpeed(wheelSetpoint.frontLeft, 'r');
    const char directionRearRight = protocolDirectionForSignedSpeed(wheelSetpoint.rearRight, 'r');

    const int magnitudeFrontRight = protocolMagnitudeForSignedSpeed(wheelSetpoint.frontRight);
    const int magnitudeRearLeft = protocolMagnitudeForSignedSpeed(wheelSetpoint.rearLeft);
    const int magnitudeFrontLeft = protocolMagnitudeForSignedSpeed(wheelSetpoint.frontLeft);
    const int magnitudeRearRight = protocolMagnitudeForSignedSpeed(wheelSetpoint.rearRight);

    char command[64];
    std::snprintf(command,
                  sizeof(command),
                  "#Ba%c%c%c%c %03d %03d %03d %03d",
                  directionFrontRight,
                  directionRearLeft,
                  directionFrontLeft,
                  directionRearRight,
                  magnitudeFrontRight,
                  magnitudeRearLeft,
                  magnitudeFrontLeft,
                  magnitudeRearRight);
    return std::string(command);
}

static WheelSetpoint buildWheelSetpointFromSideSpeeds(int leftSpeed, int rightSpeed, const Config &config)
{
    const auto clampSignedWheel = [](int value)
    {
        return std::clamp(value, -99, 99);
    };

    WheelSetpoint wheelSetpoint;
    wheelSetpoint.frontRight = clampSignedWheel(rightSpeed + config.trimFrontRight);
    wheelSetpoint.rearLeft = clampSignedWheel(leftSpeed + config.trimRearLeft);
    wheelSetpoint.frontLeft = clampSignedWheel(leftSpeed + config.trimFrontLeft);
    wheelSetpoint.rearRight = clampSignedWheel(rightSpeed + config.trimRearRight);
    return wheelSetpoint;
}

static std::string buildDriveCommand(int leftSpeed, int rightSpeed, const Config &config)
{
    return buildWheelCommand(buildWheelSetpointFromSideSpeeds(leftSpeed, rightSpeed, config));
}

static speed_t baudToTermios(int baudRate)
{
    switch (baudRate)
    {
    case 9600:
        return B9600;
    case 19200:
        return B19200;
    case 38400:
        return B38400;
    case 57600:
        return B57600;
    case 115200:
        return B115200;
    default:
        return 0;
    }
}

static bool openSerialPort(const Config &config, SerialPort &port, std::string &errorMessage)
{
    const speed_t speed = baudToTermios(config.baudRate);
    if (speed == 0)
    {
        errorMessage = "unsupported baud rate: " + std::to_string(config.baudRate);
        return false;
    }

    const int fd = open(config.serialDevice.c_str(), O_RDWR | O_NOCTTY | O_SYNC);
    if (fd < 0)
    {
        errorMessage = "failed to open serial device: " + config.serialDevice + " (" + std::strerror(errno) + ")";
        return false;
    }

    termios tty {};
    if (tcgetattr(fd, &tty) != 0)
    {
        errorMessage = "tcgetattr failed on serial device: " + std::string(std::strerror(errno));
        close(fd);
        return false;
    }

    cfsetospeed(&tty, speed);
    cfsetispeed(&tty, speed);
    tty.c_cflag = (tty.c_cflag & ~CSIZE) | CS8;
    tty.c_iflag &= ~IGNBRK;
    tty.c_lflag = 0;
    tty.c_oflag = 0;
    tty.c_cc[VMIN] = 0;
    tty.c_cc[VTIME] = 1;
    tty.c_iflag &= ~(IXON | IXOFF | IXANY);
    tty.c_cflag |= (CLOCAL | CREAD);
    tty.c_cflag &= ~(PARENB | PARODD);
    tty.c_cflag &= ~CSTOPB;
    tty.c_cflag &= ~CRTSCTS;

    if (tcsetattr(fd, TCSANOW, &tty) != 0)
    {
        errorMessage = "tcsetattr failed on serial device: " + std::string(std::strerror(errno));
        close(fd);
        return false;
    }

    port.fd = fd;
    port.available = true;
    return true;
}

static void closeSerialPort(SerialPort &port)
{
    if (port.fd >= 0)
    {
        close(port.fd);
    }
    port.fd = -1;
    port.available = false;
}

static void sendRawCommand(const SerialPort &port, const std::string &command)
{
    if (!port.available)
    {
        return;
    }

    const ssize_t written = write(port.fd, command.c_str(), command.size());
    if (written < 0)
    {
        std::cerr << "[serial] write failed: " << std::strerror(errno) << '\n';
    }
}

static void sendSideCommand(const SerialPort &port,
                            int leftSpeed,
                            int rightSpeed,
                            const Config &config)
{
    sendRawCommand(port, buildDriveCommand(leftSpeed, rightSpeed, config));
}

static std::string buildLibcameraPipeline(const Config &config)
{
    return "libcamerasrc "
           "ae-enable=true "
           "awb-enable=true "
           "! video/x-raw,format=RGB,width=" + std::to_string(config.width) +
           ",height=" + std::to_string(config.height) +
           ",framerate=" + std::to_string(config.fps) + "/1 "
           "! videoconvert "
           "! video/x-raw,format=BGR "
           "! appsink drop=true max-buffers=1 sync=false";
}

static bool openCapture(cv::VideoCapture &capture, const Config &config, std::string &errorMessage)
{
    if (!config.videoPath.empty())
    {
        if (!capture.open(config.videoPath))
        {
            errorMessage = "failed to open video: " + config.videoPath;
            return false;
        }
        return true;
    }

    const std::string pipeline = buildLibcameraPipeline(config);
    if (capture.open(pipeline, cv::CAP_GSTREAMER))
    {
        return true;
    }

    capture.release();
    if (!capture.open(config.cameraIndex, cv::CAP_V4L2))
    {
        errorMessage = "failed to open camera index " + std::to_string(config.cameraIndex);
        return false;
    }

    capture.set(cv::CAP_PROP_FRAME_WIDTH, config.width);
    capture.set(cv::CAP_PROP_FRAME_HEIGHT, config.height);
    capture.set(cv::CAP_PROP_FPS, config.fps);
    return true;
}

static cv::Mat prepareFrame(const cv::Mat &frame, const Config &config)
{
    cv::Mat prepared = frame;
    if (prepared.empty())
    {
        return prepared;
    }
    if (config.rotate180)
    {
        cv::rotate(prepared, prepared, cv::ROTATE_180);
    }
    if (prepared.size() != cv::Size(config.width, config.height))
    {
        cv::resize(prepared, prepared, cv::Size(config.width, config.height));
    }
    return prepared;
}

static ControlOutput computeControlOutput(const DetectionResult &result,
                                          const Config &config,
                                          TiltTrackerState &tiltState,
                                          PidState &pidState,
                                          double dtSeconds)
{
    ControlOutput output;
    output.leftSpeed = config.baseLeft;
    output.rightSpeed = config.baseRight;

    if (!result.centreComputed)
    {
        ++tiltState.lostFrames;
        if (tiltState.lostFrames > kEmaResetLostFrames)
        {
            tiltState.emaTilt = std::numeric_limits<double>::quiet_NaN();
            tiltState.lostFrames = 0;
        }
        resetPid(pidState);
        return output;
    }

    const double centerOffsetPx = static_cast<double>(result.centre.x) - (result.roiRect.width / 2.0);
    double rawErrorX = centerOffsetPx;
    if (std::abs(rawErrorX) <= kXDeadbandPixels)
    {
        rawErrorX = 0.0;
    }

    const double normalizedError =
        std::clamp(rawErrorX / std::max(1.0, result.roiRect.width / 2.0), -1.0, 1.0);
    const double expoError = applyExpo(normalizedError, config.expoPower);

    pidState.integral += expoError * dtSeconds;
    pidState.integral = std::clamp(pidState.integral, -config.integralLimit, config.integralLimit);

    const double proportional = config.kp * expoError;
    const double integralTerm = config.ki * pidState.integral;
    double derivativeTerm = 0.0;
    if (pidState.hasPreviousError && dtSeconds > 1e-6)
    {
        derivativeTerm = config.kd * ((expoError - pidState.previousError) / dtSeconds);
    }

    const double steer = std::clamp(proportional + integralTerm + derivativeTerm,
                                    -config.outputLimit,
                                    config.outputLimit);

    double tiltDeg = std::numeric_limits<double>::quiet_NaN();
    if (result.fitComputed)
    {
        tiltDeg = computeTiltAngleDeg(result);
        tiltState.emaTilt = filterEma(tiltState.emaTilt, tiltDeg, config.emaAlpha);
    }
    const double cornerRatio = computeCornerRatio(tiltState.emaTilt, config.tiltDeadbandDeg);
    tiltState.lostFrames = 0;

    double leftCommand = static_cast<double>(config.baseLeft);
    double rightCommand = static_cast<double>(config.baseRight);
    if (std::abs(steer) > 1e-6)
    {
        const double turnMagnitude = std::abs(steer);
        if (steer > 0.0)
        {
            leftCommand = config.baseLeft + turnMagnitude;
            const double normalInner = config.baseRight - turnMagnitude;
            rightCommand = (1.0 - cornerRatio) * normalInner + cornerRatio * (-kCornerReverseSpeed);
        }
        else
        {
            rightCommand = config.baseRight + turnMagnitude;
            const double normalInner = config.baseLeft - turnMagnitude;
            leftCommand = (1.0 - cornerRatio) * normalInner + cornerRatio * (-kCornerReverseSpeed);
        }
    }

    output.lineFound = true;
    output.leftSpeed = std::clamp(static_cast<int>(std::lround(leftCommand)), -99, 99);
    output.rightSpeed = std::clamp(static_cast<int>(std::lround(rightCommand)), -99, 99);
    output.driveCommand = buildDriveCommand(output.leftSpeed, output.rightSpeed, config);

    pidState.previousError = expoError;
    pidState.hasPreviousError = true;
    return output;
}
} // namespace

int main()
{
    std::signal(SIGINT, handleSignal);
    std::signal(SIGTERM, handleSignal);

    Config config;

    SerialPort serialPort;
    {
        std::string serialError;
        if (!openSerialPort(config, serialPort, serialError))
        {
            std::cerr << "[serial] " << serialError << '\n';
            std::cerr << "[serial] fallback to stub output\n";
        }
    }

    cv::VideoCapture capture;
    std::string errorMessage;
    if (!openCapture(capture, config, errorMessage))
    {
        std::cerr << "[capture] " << errorMessage << '\n';
        return 1;
    }

    if (config.videoPath.empty())
    {
        for (int i = 0; i < kCameraWarmupFrames && gKeepRunning; ++i)
        {
            cv::Mat warmup;
            if (!capture.read(warmup) || warmup.empty())
            {
                std::cerr << "[capture] camera warmup failed\n";
                return 1;
            }
        }
    }

    TiltTrackerState tiltState;
    PidState pidState;
    bool stopSent = false;
    auto lastFrameTime = std::chrono::steady_clock::now();
    auto nextTick = std::chrono::steady_clock::now();

    while (gKeepRunning)
    {
        nextTick += std::chrono::milliseconds(config.loopMs);

        cv::Mat frame;
        if (!capture.read(frame) || frame.empty())
        {
            break;
        }

        frame = prepareFrame(frame, config);
        const auto now = std::chrono::steady_clock::now();
        const double dtSeconds = std::max(1e-3, std::chrono::duration<double>(now - lastFrameTime).count());
        lastFrameTime = now;

        const DetectionResult result = detectLine(frame, config);
        const ControlOutput output = computeControlOutput(result, config, tiltState, pidState, dtSeconds);

        if (output.lineFound)
        {
            sendSideCommand(serialPort, output.leftSpeed, output.rightSpeed, config);
        }
        else
        {
            sendRawCommand(serialPort, output.driveCommand);
        }
        stopSent = (output.driveCommand == kStopCommand);

        std::this_thread::sleep_until(nextTick);
    }

    if (!stopSent)
    {
        sendRawCommand(serialPort, kStopCommand);
    }

    closeSerialPort(serialPort);
    return 0;
}
