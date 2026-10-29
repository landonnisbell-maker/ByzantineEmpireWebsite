V56 — Full-Height Portraits + Native Scroll Pop-Up Reveals

PATCH TYPE: UPDATE ONLY. Designed for your existing working V55 site (which includes V54).

Files to replace:
- index.html
- intro-team/team-v54.js
- _next/static/chunks/1502ibkr~cu.4.js

Installation:
1. Extract the ZIP.
2. Copy its files into the root of your existing GitHub repo. Preserve directories.
3. Accept overwrite of those three files. Do not delete any other site files.
4. Commit/push. Hard refresh the GitHub Pages homepage.

Changes:
- Contain scaling in a taller 760 x 858 layout, with no source cropping.
- Preserves the transparency and four-edge feathered fades.
- Alternating left-right positions preserved, Landon remains last.
- Scroll-triggered GPU shader reveals per portrait and text: 760ms image and
  820ms text ease-out, with the latter delayed 140ms. They rise 38 native
  canvas pixels from below, and fade into view.
- Mask is gated off during crystal transitions and for all other crystals.
- Animations support reduced-motion preferences.
- The large canvas texture is NOT reuploaded for animation; only 10 GPU
  uniform values change per frame.

Role/quote fields remain editable near the beginning of intro-team/team-v54.js.
No changes to existing portraits, loader, shader colors, map, or routing.

Checks: JS syntax, ZIP integrity, and isolated 2D canvas layout checks.
The full original WebGPU renderer should be verified after deployment.
