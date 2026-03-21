# transparent_contour

Use OpenCV C++ to replace the outermost `n` pixels of a foreground contour with transparent pixels.

## Build

```bash
cmake -S . -B build
cmake --build build
```

## Run

```bash
./build/transparent_contour input.png output.png 8
```

Default behavior only strips the external contour, and darker pixels shrink more aggressively. Pure black reaches the full `layers` limit; brighter pixels shrink less.

If you want a smoother edge after shrinking, increase `--smoothness`. This controls the feather width in pixels outside the removed band.

```bash
./build/transparent_contour input.png output.png 8 --smoothness=3
```

To also strip internal holes:

```bash
./build/transparent_contour input.png output.png 8 --all-contours
```

To disable darkness-adaptive shrink and use a fixed contour width everywhere:

```bash
./build/transparent_contour input.png output.png 8 --fixed-layers
```

For RGBA images, the foreground mask is derived from alpha. For RGB images, the mask is derived from grayscale thresholding:

```bash
./build/transparent_contour input.png output.png 8 --gray-threshold=10
```
