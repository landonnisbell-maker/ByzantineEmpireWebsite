BYZANTINE V126 – HISTORICAL CONTENT SHARPNESS + INTRODUCTION EXIT FADE
========================================================================
UPDATE ONLY, designed for the current V125 GitHub site. Do not delete other files.

Changed files:
  index.html
  historical-experience/history-native-panel-v122.js
  _next/static/chunks/1502ibkr~cu.4.js

HISTORICAL CONNECTION
- Long historical page is now split into up to four independent, higher-resolution
  canvas textures instead of downscaling the ENTIRE page into a single 8192px-
  high, 10-megapixel image.
- The original Aengel WebGPU shader combines the tiles on the SAME one-piece
  3D scrolling plane, preserving native mouse-fluid and scroll-bulge effects.
- Tile textures upload at entry/content changes only, not on every scroll.
- Keeps the existing normal-HTML Works Cited panel outside the fluid effect.
- Keeps HTML source visible until the GPU textures have uploaded.
- Uses a lower resolution on constrained devices for GPU-memory safety.

INTRODUCTION
- The native 3D text/image content's exit reveal fades out immediately over
  approximately 0.46 s, rather than taking 1.12 s with an additional 0.08 s
  delay, to better match the existing bottom carousel's exit transition.
- About Us and Market exit behavior is unchanged.

INSTALL:
Merge the contents of ByzantineEmpireWebsite/ into the ROOT of your existing
ByzantineEmpireWebsite GitHub repository and replace the three matching files.
Do not place an extra nested folder at repository root.
After GitHub Pages deployment, use Ctrl+Shift+R.

Verification: JavaScript syntax checks and ZIP/expected-file checks.
No final live WebGPU visual/performance verification was possible in this
runtime. Test both Historical scroll and Introduction Close in your browser.
