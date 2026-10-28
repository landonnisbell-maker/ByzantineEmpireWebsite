BYZANTINE MARKET V31 — INITIAL PRELOAD + ONE CONTINUOUS CRYSTAL TRANSITION

BASELINE: Your successfully loading V30 GitHub site, with the functioning V28 Market click paths.
This is an UPDATE-ONLY package. Do NOT delete your current market-runtime assets.

Copy all files in this ZIP into the repository root, preserving paths, replace existing files:
 index.html
 market/market-entry-v24.js
 market/index.html
 market-runtime/gallery/index.html

DO NOT replace any _next/static/chunks files, any navigation store, or any crystal content pages.

NEW FLOW
 - Starts the cloth gallery during the main initial loader and enters its internal Aengel experience offscreen.
 - Starts the Palia WebGL renderer during that same initialization period.
 - Once both are prepared, selecting Market zooms the underlying crystal view and reveals the fully initialized gallery.
 - No intermediate Aengel loader, blue screen, or 'OPENING MARKET' overlay is displayed on click.
 - Close reverses the zoom and returns to the already-running crystal scene.
 - If Market loads unusually slowly, the original crystal scene remains visible until the gallery is ready. A 16-second fallback prevents a stalled Palia renderer from blocking the Market completely.

NOTE: This is a visual crystal zoom/reveal composited over the current 3D canvas;
it does not call the original interior-enter store action. We deliberately avoid
altering the working application's navigation code.

DEBUG: Add ?byzmarketdebug to the main site URL, then in the browser console
run window.__BYZ_V24_STATUS__() to inspect marketReady, frameLoaded and open.

BACKUP: Preserve the four destination files before replacing them. Restoring
those four files returns you to V30 without disturbing the core website.
