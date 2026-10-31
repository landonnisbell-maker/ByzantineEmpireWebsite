BYZANTINE V111 — Market Entry Crystal Hold + Faster Reversed Cloth Exit
=====================================================================

INSTALLATION
------------
Apply OVER THE WORKING V110 website. Extract this archive and copy the
CONTENTS of the ByzantineEmpireWebsite/ folder into the matching root of
your existing GitHub repository. Replace files where prompted. Do not
remove your other website files.

WHAT CHANGED
------------
1) MARKET ENTRY
   - Native GSAP zoom handoff now fires exactly 0.185 seconds later than V110
     (from am - 0.370 to am - 0.185 on the native zoom timeline).
   - Uses a 90ms WebGL spin pre-lead, long enough to start moving before
     reveal while maintaining a safe margin before the native interior.
   - Reduced crossfade to 65ms so it becomes fully opaque before the
     prismatic/grey internal crystal frame could show through. This is a
     tradeoff: the final fade is intentionally quicker, but not a hard cut.

2) MARKET EXIT
   - 2x reverse speed in the ORIGINAL WebGL cloth/ribbon intro, giving
     about 1.1 seconds of reversed motion rather than 2.2 seconds.
   - Native crystal return begins at 0.32 seconds, rather than 1.32.
   - Gallery fade-out starts at 1.03 seconds, and lasts 0.30 seconds,
     so the 3D crystal camera is already traversing back during the fade.
   - Preloading, gallery spin on entrance, mouse controls, and other
     site content are unchanged.

FILES REPLACED
--------------
- index.html
- _next/static/chunks/1502ibkr~cu.4.js
- market/index.html
- market/market-entry-v24.js
- market-runtime/gallery/_next/static/chunks/1g4_rbq7oliu6.js

BROWSER NOTES
-------------
After deployment, Ctrl+Shift+R to refresh stale JavaScript/WebGL chunks.
This package is an update-only patch, NOT a standalone website.

CHECKS
------
JavaScript syntax checks pass. The full WebGL animations must be tested in
an actual browser with your existing site assets; this ZIP does not contain
those full assets.
