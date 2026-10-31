BYZANTINE MARKET V113 — CAMERA-SYNCHRONIZED GALLERY EXIT (UPDATE ONLY)

STARTING POINT: V112 (or V111 + V112); V113 contains the correct V111 native and
market bridge baseline with only the exit logic fixed.

WHAT CHANGED
- Entrance is unchanged from V111: same timing, opacity and gallery spin.
- Cloths still reverse using V111's 1.1-second renderer animation (no speed change).
- Native crystal exit begins immediately after pressing Close rather than waiting
  320 milliseconds, running BEHIND the still-moving gallery.
- Native GSAP timeline emits a one-time camera-ready event roughly 0.77 seconds
  after native exit begins (0.71s camera-move start + a 0.06s paint margin).
- The overlay fades out only at that event, not at V112's arbitrary 560ms timer.
  Its duration stays 0.3s and the original camera motion is unchanged.
- A conservative time fallback is retained for stale native chunks / load races.

WHY IT FIXES THE GREY FLASH
V112's fade began 560ms after pressing Close. Native exit began 320ms after
Close, so the gallery was revealing the scene just 240ms into its native
traversal, well BEFORE the camera's reverse zoom started (at ~710ms).
V113 starts the native exit immediately and reveals the moving crystal only
after the native camera has entered its actual reverse leg. This moves the
crystal reveal earlier without exposing the interior.

INSTALL
Copy the contents of the ByzantineEmpireWebsite folder into the ROOT of the
existing GitHub repository, replacing these THREE files only:
    index.html
    market/market-entry-v24.js
    _next/static/chunks/1502ibkr~cu.4.js

Keep all other files from your current deployment. Do NOT replace the full site.
Hard-refresh (Ctrl+Shift+R) after GitHub Pages deploys.

NOTE: Syntax/ZIP verified offline. WebGL timing should be checked on your live
website. If a stale CDN chunk runs, the guarded conservative fallback is used.
