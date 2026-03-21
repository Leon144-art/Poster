cmake_minimum_required(VERSION 3.16)

project(transparent_contour LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(OpenCV REQUIRED)

add_executable(
    transparent_contour
    main.cpp
    transparent_contour.cpp
)

target_include_directories(transparent_contour PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(transparent_contour PRIVATE ${OpenCV_LIBS})
