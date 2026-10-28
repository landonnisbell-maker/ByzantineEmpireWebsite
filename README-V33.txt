BYZANTINE MARKET V33 — NATIVE CRYSTAL CAMERA TRANSITIONS (UPDATE-ONLY)

BASE: WORKING V32 GitHub website. Do NOT install over an older version.

V33 changes only:
  index.html
  _next/static/chunks/1502ibkr~cu.4.js
  _next/static/chunks/01ay6y4_-9myt.js
  market/market-entry-v24.js

This DOES NOT replace Market assets, 5 product routes, gallery JS, loaders,
other crystal pages, or the Palia application.

INSTALL: Backup entire repo, unzip, copy ALL folders/files into repo root,
replace these FOUR files, commit/push, and open a fresh Incognito window.

ENTER: Market click/Discover Page now call the exact same original React
  project-store enterInterior() used by Introduction/About/Historical.
  Its real WebGL camera, stone traversal, arrival glow, and timing run unchanged.
  When native interiorStatus becomes "interior", V33 reveals the warmed gallery.
EXIT: Return to Crystals invokes the original exitInterior() reverse camera.

Note: the Market's legacy interior canvas is intentionally blank; a brief
  seam can be visible between original stone animation and the gallery.
  Avoid claiming full graphical equivalence until confirmed on your computer.

DEBUG: append ?byzmarketdebug to main website URL and inspect Console.
  window.__BYZ_V24_STATUS__() gives readiness and nativeReached.

Rollback V33: restore the FOUR named files from your V32 repository backup.
