BYZANTINE WEBSITE V44 — NATIVE ABOUT US MAP + PORTAL SCROLL LOCK
===========================================================
Starting point: working V42 shader and V43 interactive map, with all later unrelated
website updates already installed in your existing GitHub repository.

This is an UPDATE-ONLY ZIP. It is not a complete website.

INSTALL
1. Back up your current website folder or make a Git commit first.
2. Extract this ZIP.
3. Copy all files/folders from the extracted ZIP into the EXISTING repo root.
4. Let File Explorer merge the folders and replace matching files.
5. Commit/push the changes and hard-refresh the published site.

WHAT CHANGES
- Crystal 2's existing large hero-media panel (right below Location) now displays
  the same actual Britannica image as V43, with animated territory pulse.
- The image is drawn as a CanvasTexture on the ORIGINAL moving WebGPU hero plane.
  Drag to pan, wheel/pinch or the visible controls to zoom within bounded limits.
  No fixed-position map overlay, no replacement About Us layout or new 3D scene.
- After entering the crystal-selection scene, upward wheel/keyboard/touch scroll
  is swallowed there, preventing an accidental reverse journey through the portal.
  Interior page scrolling remains enabled, including About Us.

CHANGED FILES
  index.html
  _next/static/chunks/1502ibkr~cu.4.js
  about-map/byzantine-map.js
  byz-portal-scroll-lock-v44.js  (new)
  about-map/Byzantine-Empire.webp (same art as V43, included for safety)
  about-map/empire-pulse.png   (same pulse mask as V43)

NOT CHANGED
- Existing V42 dark purple About Us shader
- Crystal navigation and transition functions
- Market and product page files, text, or images
- Other three crystal page renderers

VALIDATION
- JavaScript syntax checks passed for all three scripts.
- In isolated Chromium, map drawing and drag/zoom bounds passed.
- Portal lock event tests passed for before entry, crystal-selection, and interior.
- Full GPU-rendered About Us interior has NOT been visually verified in Chrome.

LICENSE
Historical map is user-supplied and displays Encyclopaedia Britannica's copyright;
confirm public reuse permission for your published school project.
