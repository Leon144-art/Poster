#include "transparent_contour.hpp"

#include <opencv2/opencv.hpp>

#include <cstdlib>
#include <exception>
#include <iostream>
#include <string>

namespace
{
void printUsage(const char *programName)
{
    std::cerr
        << "Usage:\n"
        << "  " << programName << " <input> <output> <layers> [--smoothness=N] [--all-contours] [--fixed-layers] [--alpha-threshold=N] [--gray-threshold=N]\n\n"
        << "Examples:\n"
        << "  " << programName << " input.png output.png 8\n"
        << "  " << programName << " input.png output.png 8 --smoothness=3\n"
        << "  " << programName << " input.png output.png 12 --all-contours\n"
        << "  " << programName << " input.png output.png 8 --fixed-layers\n";
}

bool startsWith(const std::string &value, const std::string &prefix)
{
    return value.rfind(prefix, 0) == 0;
}
}

int main(int argc, char **argv)
{
    if (argc < 4)
    {
        printUsage(argv[0]);
        return 1;
    }

    graph::TransparentContourOptions options;
    const std::string inputPath = argv[1];
    const std::string outputPath = argv[2];
    options.layers = std::atoi(argv[3]);

    for (int i = 4; i < argc; ++i)
    {
        const std::string arg = argv[i];

        if (arg == "--all-contours")
        {
            options.externalOnly = false;
            continue;
        }

        if (arg == "--fixed-layers")
        {
            options.darknessAdaptive = false;
            continue;
        }

        if (startsWith(arg, "--smoothness="))
        {
            options.smoothness = std::stof(arg.substr(13));
            continue;
        }

        if (startsWith(arg, "--alpha-threshold="))
        {
            options.alphaThreshold = static_cast<std::uint8_t>(std::stoi(arg.substr(18)));
            continue;
        }

        if (startsWith(arg, "--gray-threshold="))
        {
            options.grayscaleThreshold = static_cast<std::uint8_t>(std::stoi(arg.substr(17)));
            continue;
        }

        std::cerr << "Unknown argument: " << arg << "\n";
        printUsage(argv[0]);
        return 1;
    }

    try
    {
        cv::Mat input = cv::imread(inputPath, cv::IMREAD_UNCHANGED);
        if (input.empty())
        {
            std::cerr << "Failed to read image: " << inputPath << "\n";
            return 1;
        }

        cv::Mat output = graph::makeOuterContourTransparent(input, options);
        if (!cv::imwrite(outputPath, output))
        {
            std::cerr << "Failed to write image: " << outputPath << "\n";
            return 1;
        }

        std::cout
            << "Wrote " << outputPath
            << " with " << options.layers << " transparent contour layer(s)"
            << " and smoothness " << options.smoothness
            << (options.darknessAdaptive ? " using darkness-adaptive shrink" : " using fixed shrink")
            << (options.externalOnly ? " on external contours only.\n" : " on all contours.\n");
    }
    catch (const std::exception &error)
    {
        std::cerr << "Error: " << error.what() << "\n";
        return 1;
    }

    return 0;
}
