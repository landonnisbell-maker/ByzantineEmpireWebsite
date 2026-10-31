BYZANTINE WEBSITE V114 — LOW-END TEXTURES + FLUID POINTER
UPDATE-ONLY PACKAGE (BUILT AGAINST THE USER'S V113 GITHUB ZIP)

INSTALL
1. Unzip this archive.
2. Open its ByzantineEmpireWebsite folder.
3. Copy that folder's contents over the corresponding files in your existing
   GitHub website repository (the root that contains index.html).
4. Allow matching files to be replaced; do not delete unrelated files.
5. Commit and deploy. Then use Ctrl+Shift+R to bypass cached JS/CSS.

CHANGES
- Gallery renderer's original 8-second permanent colored-placeholder response
  is replaced by real-image retries (22/27/27 seconds) with secondary browser
  image decoding when ImageBitmap decoding fails. Colored fallback is retained
  only if all attempts fail or an image is genuinely missing.
- Gallery's five cloth product images are preloaded before optional product
  assets to improve first-load success on slow machines.
- Added an adaptive, budget-capped 2D fluid cursor fallback for lower-end GPUs
  or machines with unavailable WebGPU rendering. The original shader remains
  untouched on stronger systems for Introduction, About Us and crystal selection.
- Historical Connection always gets a fluid-pointer layer over ordinary text
  and images, with clipping/exclusion around its Works Cited panel. The panel
  and its links remain clickable; the overlay has pointer-events:none.
- Market entrance, reverse exit, timings and main native 3D chunk are unchanged
  from V113.

FILES
index.html
pp-loader/market-preload-v71.js
market-runtime/gallery/_next/static/chunks/1g4_rbq7oliu6.js
brand/fluid-cursor-v114.js
brand/fluid-cursor-v114.css
README-V114.txt

TESTING
- JavaScript syntax checks passed for all modified JS files.
- Gallery real-image retry and secondary decoder paths passed mocked tests.
- Whole-site interaction/performance testing on a physical lower-end computer
  has not been run; please verify on your original test machine.
