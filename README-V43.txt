BYZANTINE EMPIRE WEBSITE — V43: INTERACTIVE HISTORICAL MAP
=========================================================
BASELINE: V42 (working About Us wallMesh dark amethyst shader)

INSTALLATION
1. Back up your current repository.
2. Extract this ZIP.
3. Copy index.html and the about-map/ folder into the root of
   your existing ByzantineEmpireWebsite GitHub repository.
4. Choose "Replace the files in the destination" when prompted.
5. Commit/push the changes and hard-refresh your site.

WHAT CHANGES
- index.html: adds exactly one stylesheet and one script reference.
  This index is based on the V41 index (which V42 did not replace).
- about-map/Byzantine-Empire.webp: the uploaded original image.
- about-map/empire-pulse.png: transparent highlight mask for
  the pink/red empire regions, generated from that same map.
- about-map/byzantine-map.css and .js: bounded pan/zoom UI.

Nothing changes in the original WebGPU wallMesh shader. The V42
_next/static/chunks/1502ibkr~cu.4.js file is NOT part of this update.

USE
- Enter Crystal 2 (About Us). The compact map appears at the right
  on wide displays, or as an expandable small control on narrow ones.
- Drag with mouse/touch to pan. The image always fills the viewport.
- Mouse wheel, +/- buttons, or pinch to zoom from 1x to 1.55x.
- Expand the map for a larger, more readable view.
- Close expanded map via Close, the backdrop, or Escape.
- Return to Crystals and the map disappears automatically.

VALIDATION
- JS syntax checked.
- Isolated Chromium behavior tested: display, bounded drag, zoom cap,
  expand, close, responsive/mobile layout, hide on route changes.
- Full live WebGPU integration not tested in the target browser.

COPYRIGHT
This historical image displays Encyclopaedia Britannica's copyright.
Attribution is shown in the map UI. Public reuse may require permission;
please check your rights before posting it on GitHub Pages.

ROLLBACK
Replace index.html with your backup, then optionally remove about-map/.
