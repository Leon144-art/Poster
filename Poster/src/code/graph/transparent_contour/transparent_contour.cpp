#include "transparent_contour.hpp"

#include <stdexcept>
#include <vector>

namespace graph
{
namespace
{
cv::Mat buildGrayscaleImage(const cv::Mat &input)
{
    if (input.channels() == 4)
    {
        cv::Mat gray;
        cv::cvtColor(input, gray, cv::COLOR_BGRA2GRAY);
        return gray;
    }

    if (input.channels() == 3)
    {
        cv::Mat gray;
        cv::cvtColor(input, gray, cv::COLOR_BGR2GRAY);
        return gray;
    }

    if (input.channels() == 1)
    {
        return input.clone();
    }

    throw std::invalid_argument("Unsupported image format: expected 1, 3, or 4 channels.");
}

cv::Mat buildForegroundMask(const cv::Mat &input, const TransparentContourOptions &options)
{
    cv::Mat mask;

    if (input.channels() == 4)
    {
        std::vector<cv::Mat> channels;
        cv::split(input, channels);
        cv::threshold(channels[3], mask, options.alphaThreshold, 255, cv::THRESH_BINARY);
        return mask;
    }

    if (input.channels() == 3)
    {
        cv::Mat gray = buildGrayscaleImage(input);
        cv::threshold(gray, mask, options.grayscaleThreshold, 255, cv::THRESH_BINARY);
        return mask;
    }

    if (input.channels() == 1)
    {
        cv::threshold(input, mask, options.grayscaleThreshold, 255, cv::THRESH_BINARY);
        return mask;
    }

    throw std::invalid_argument("Unsupported image format: expected 1, 3, or 4 channels.");
}

cv::Mat buildAdaptiveLayerMap(const cv::Mat &input, const cv::Mat &foregroundMask, int maxLayers)
{
    cv::Mat gray = buildGrayscaleImage(input);
    cv::Mat grayFloat;
    gray.convertTo(grayFloat, CV_32FC1, 1.0 / 255.0);

    cv::Mat adaptiveLayerMap = (1.0f - grayFloat) * static_cast<float>(maxLayers);
    adaptiveLayerMap.setTo(0.0f, foregroundMask == 0);
    return adaptiveLayerMap;
}

cv::Mat buildLayerMap(const cv::Mat &input, const cv::Mat &foregroundMask, const TransparentContourOptions &options)
{
    if (options.darknessAdaptive)
    {
        return buildAdaptiveLayerMap(input, foregroundMask, options.layers);
    }

    cv::Mat layerMap(foregroundMask.size(), CV_32FC1, cv::Scalar(static_cast<float>(options.layers)));
    layerMap.setTo(0.0f, foregroundMask == 0);
    return layerMap;
}

cv::Mat buildDistanceMask(const cv::Mat &foregroundMask, bool externalOnly)
{
    if (!externalOnly)
    {
        return foregroundMask.clone();
    }

    std::vector<std::vector<cv::Point>> contours;
    cv::findContours(foregroundMask.clone(), contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);

    cv::Mat externalMask = cv::Mat::zeros(foregroundMask.size(), CV_8UC1);
    if (!contours.empty())
    {
        cv::drawContours(externalMask, contours, -1, cv::Scalar(255), cv::FILLED);
    }
    return externalMask;
}

cv::Mat ensureBgra(const cv::Mat &input)
{
    if (input.channels() == 4)
    {
        return input.clone();
    }

    cv::Mat bgra;
    if (input.channels() == 3)
    {
        cv::cvtColor(input, bgra, cv::COLOR_BGR2BGRA);
        return bgra;
    }

    if (input.channels() == 1)
    {
        cv::cvtColor(input, bgra, cv::COLOR_GRAY2BGRA);
        return bgra;
    }

    throw std::invalid_argument("Unsupported image format: expected 1, 3, or 4 channels.");
}
}

cv::Mat makeOuterContourTransparent(const cv::Mat &input, const TransparentContourOptions &options)
{
    if (input.empty())
    {
        throw std::invalid_argument("Input image is empty.");
    }

    if (options.layers <= 0)
    {
        throw std::invalid_argument("layers must be greater than zero.");
    }

    if (options.smoothness < 0.0f)
    {
        throw std::invalid_argument("smoothness must be greater than or equal to zero.");
    }

    cv::Mat foregroundMask = buildForegroundMask(input, options);
    if (cv::countNonZero(foregroundMask) == 0)
    {
        throw std::runtime_error("No foreground pixels were found in the image.");
    }

    cv::Mat distanceMask = buildDistanceMask(foregroundMask, options.externalOnly);

    cv::Mat distanceMap;
    cv::distanceTransform(distanceMask, distanceMap, cv::DIST_L2, 3);

    cv::Mat output = ensureBgra(input);
    cv::Mat layerMap = buildLayerMap(input, foregroundMask, options);

    std::vector<cv::Mat> channels;
    cv::split(output, channels);

    cv::Mat originalAlphaFloat;
    channels[3].convertTo(originalAlphaFloat, CV_32FC1, 1.0 / 255.0);

    cv::Mat featherFactor;
    if (options.smoothness > 0.0f)
    {
        cv::subtract(distanceMap, layerMap, featherFactor);
        featherFactor /= options.smoothness;
        cv::min(featherFactor, 1.0f, featherFactor);
        cv::max(featherFactor, 0.0f, featherFactor);
    }
    else
    {
        cv::compare(distanceMap, layerMap, featherFactor, cv::CMP_GT);
        featherFactor.convertTo(featherFactor, CV_32FC1, 1.0 / 255.0);
    }

    featherFactor.setTo(0.0f, foregroundMask == 0);

    cv::Mat alphaFloat = originalAlphaFloat.mul(featherFactor);
    alphaFloat.convertTo(channels[3], CV_8UC1, 255.0);
    cv::merge(channels, output);

    return output;
}
}
