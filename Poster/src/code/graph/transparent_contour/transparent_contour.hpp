#pragma once

#include <opencv2/opencv.hpp>

#include <cstdint>

namespace graph
{
struct TransparentContourOptions
{
    int layers = 1;
    float smoothness = 0.0f;
    bool externalOnly = true;
    bool darknessAdaptive = true;
    std::uint8_t alphaThreshold = 0;
    std::uint8_t grayscaleThreshold = 0;
};

// Replaces the outermost n-pixel contour band of the foreground with transparent pixels.
// If the source already contains alpha, foreground is derived from the alpha channel.
// Otherwise, foreground is derived from grayscale thresholding.
cv::Mat makeOuterContourTransparent(const cv::Mat &input, const TransparentContourOptions &options);
}
