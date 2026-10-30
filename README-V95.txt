V95 — FIX INTRODUCTION IMAGE CAROUSEL RENDERING

UPDATE ONLY — place these files into your existing ByzantineEmpireWebsite
repository folder, and REPLACE matching files in their exact paths.
Do not delete the folders or replace the full site.

FIXED ROOT CAUSE:
The V94 Introduction JS used a 5-column, 3-row GPU image atlas and taller,
wider carousel panels, but the existing WebGPU shader remained configured for
the previous single-column texture and smaller rectangles. Its UV sample was
missing the division by five, stretching image content over entire panels and
other areas. V95 updates the actual native renderer to match the carousel
geometry and to sample each of the five atlas cells correctly.

ALSO:
- Limit GPU atlas to 3600 x 1200, under 4096px texture-width devices.
- Portrait/square images display fully over softly blurred side-fill.
- Landscape images fill the panel normally (small crop if needed).
- Keep 3 independent automatic sliders: Architecture, Jewelry, Artifacts.
- index.html / 404.html retain newer V93 Historical Connection changes;
  the gallery script is cache-busted to v95.
- No other pages, written content, images, products, or menu logic touched.

Files in ZIP:
ByzantineEmpireWebsite/index.html
ByzantineEmpireWebsite/404.html
ByzantineEmpireWebsite/intro-team/team-v54.js
ByzantineEmpireWebsite/_next/static/chunks/1502ibkr~cu.4.js

AFTER COPYING:
Commit and push. Refresh with Ctrl+Shift+R; allow GitHub Pages to deploy.
If a service worker or caching extension stores old JS, test in a private window.
