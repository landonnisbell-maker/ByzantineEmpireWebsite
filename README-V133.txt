BYZANTINE V133 — HISTORICAL CONNECTION NATIVE LAYOUT RESTORATION

BASE: V132. This is an update-only package for your EXISTING GitHub website.

WHY V132 CHANGED THE DESIGN
V132 routed Crystal 4 through Aengel's original generic native page builder,
which only supported a title, one text column, a hero image, and a simple gallery.
It did not have the original Historical Connection two-column design.

WHAT V133 DOES
- Retains the SAME Aengel native 3D content surface and original scroll/mouse
  fluid/bulge shader used by the working Introduction and About Us pages.
- Rebuilds the original Historical Connection editorial content directly in
  Canvas 2D drawing commands, without rasterizing a giant hidden HTML document.
- Restores the centered heading and section dividers, Society/Trade columns,
  six illustrated product entries, Portal and Crystals sections, and market logo.
- Preloads and draws the original historical asset images into the native surface.
- Restores Works Cited as a separately scrolling, sharp HTML box with its MLA
  references and links. It is outside the mouse distortion, by design.
- Does not alter the Market transition, other crystals, product pages or loader.

IMPORTANT VISUAL NOTE
This recreates the old page's editorial layout and image grouping, rather than
being an exact pixel-for-pixel copy of the former HTML. The text and images are
now native canvas content and can be distorted by Aengel's original 3D effect.

FILES INCLUDED
  index.html
  byzantine-historical-connection-content.js
  historical-experience/history-native-layout-v133.js (NEW)
  _next/static/chunks/1502ibkr~cu.4.js

HOW TO INSTALL
1. Extract ZIP.
2. Open the ByzantineEmpireWebsite folder.
3. Copy its files/folders into the ROOT of your existing GitHub repository.
4. Replace matching files, commit and push.
5. Refresh with Ctrl+Shift+R after GitHub Pages deploys.

CHECK IN BROWSER
- All six Historical Connection product images are present and not blurred.
- Portal/Crystals/Market sections retain their intended positioning.
- Fluid mouse and scroll-bend effect work as before.
- Works Cited opens links and isn't distorted.
- Page doesn't show duplicate content or wrong images during transitions.

VALIDATION
JavaScript syntax and direct native canvas image/text rendering were checked.
Full WebGPU camera/shader visuals and frame rate still require browser testing.
