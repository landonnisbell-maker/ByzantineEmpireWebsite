V64 — PRODUCT HERO, ABOUT GALLERY, HISTORICAL SHADER & MARKET GUIDE

Apply this update over the working V63 website.
Copy the contents of this ZIP into your existing GitHub repository and allow
matching files to be replaced. Keep the folder structure unchanged.

CHANGES
1. Constrains product hero photos to the native hero container and puts the
   product title/tagline below the photo without overlap (desktop and mobile).
2. Makes the five cloth/card product names white instead of dark.
3. Removes the cycling placeholder gallery after the About Us content, while
   leaving the interactive Historical Atlas/SVG map in place.
4. Moves the Historical Connection orange/black grain gradient out of the
   scrolling text texture and into the same native full-screen WebGPU shader
   system used by the Introduction and About Us pages. No rectangular overlay.
5. Adds a persistent instruction caption to the bottom of the cloth selection
   page. The caption disappears when opening a product and returns upon exit.
6. Cache-busts the changed page scripts and Market/Palia iframe URLs.

TESTING
- JavaScript syntax checks passed for the compiled and content scripts.
- Isolated page canvas rendering completed for Crystal 1, 2 and 4.
- Product photo/title/body vertical layout verified at 1440x900 and 390x844.
- Full WebGPU shader appearance and cloth WebGL view still require testing
  on the deployed GitHub Pages website.

If some files do not show the updated appearance, use Ctrl+Shift+R after
GitHub Pages has deployed your commit.
