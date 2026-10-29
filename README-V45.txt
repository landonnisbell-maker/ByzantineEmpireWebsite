BYZANTINE ABOUT US V45 — FULL-SLOT HTML MAP + TWO-WAY CRYSTAL SCROLL LOCK

BASE: Install over V44 (working map + upward-scroll lock).

CHANGES
  1) The V44 WebGPU-rendered map texture is removed. The original V43-style
     interactive HTML map widget now covers the former About Us hero-media
     placeholder at its full original size, following that slot during scrolling.
     Original header, +/−/reset/expand controls, attribution, pulse, drag,
     pinch and bounded zoom are preserved. No small floating duplicate.
  2) Once inside the crystal-selector scene, wheel, touch and keyboard page
     scrolling are blocked in both directions. Initial portal traversal is
     unaffected; crystal page and product scrolling remain enabled.

INSTALL
  Extract ZIP. Copy all files and folders into the root of the existing
  ByzantineEmpireWebsite GitHub repository. Choose Replace on matching files.
  Commit/push, allow GitHub Pages to publish, then test in a fresh window.

MODIFIED: index.html; _next/static/chunks/1502ibkr~cu.4.js;
about-map/byzantine-map.js; about-map/byzantine-map.css
NEW: byz-portal-scroll-lock-v45.js
ASSETS INCLUDED: about-map/Byzantine-Empire.webp; about-map/empire-pulse.png

OLDER FILES LEFT IN REPOSITORY SAFELY:
  byz-portal-scroll-lock-v44.js may remain: V45 index no longer imports it.

TEST CHECKS:
  * On crystal selector: wheel up/down, touch swipe up/down should do nothing.
  * Inside About Us: scroll normally. Map occupies original picture area.
  * Wheel over map zooms; click + and -; drag/pinch; Expand works.
  * On other crystals / Market: normal navigation and page scroll.

NOTE: DOM-to-WebGPU projection tracking was validated for coordinates and
map controls in an isolated Chromium page, but full live GPU scene still needs
your browser verification. No changes to product pages, Market, or the shader.
