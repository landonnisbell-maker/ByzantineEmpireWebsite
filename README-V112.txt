BYZANTINE V112 — EARLIER CRYSTAL REVEAL ON MARKET EXIT
======================================================

APPLY ON TOP OF YOUR WORKING V111 SITE.
Extract the ZIP and copy the contents of the ByzantineEmpireWebsite folder
into the root of your existing GitHub repository. Replace matching files.
Do not delete your existing website files.

CHANGED
-------
- On exit, the native crystal camera still begins its reverse at 0.32 seconds.
- The gallery-to-crystal crossfade now BEGINS at 0.56 seconds (was 1.03 seconds).
- The crossfade runs for 0.39 seconds (was 0.30 seconds); the crystal becomes
  visible sooner during the cloths' backwards movement.
- The REAL WebGL cloth reverse remains at the exact same 1.1-second duration.
- All Market entrance timings and animation files are UNCHANGED from V111.

ONLY THESE TWO WEBSITE FILES ARE INCLUDED
-----------------------------------------
index.html
market/market-entry-v24.js

The revised query-string in index.html busts the browser cache for the bridge.
After deploying, use Ctrl+Shift+R if needed.

Checks: Node JavaScript syntax and archive integrity passed. The full WebGL
visual result needs verification on your live website.
