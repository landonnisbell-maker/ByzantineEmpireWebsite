BYZANTINE V109 — No visible prismatic / empty crystal interior during Market entrance
===================================================================================
Install over V108: Extract the ZIP, copy the CONTENTS of ByzantineEmpireWebsite/
into your existing GitHub repository, and replace matching files. Do not delete
any other files. Hard refresh (Ctrl+Shift+R) after GitHub Pages updates.

3 REPLACEMENT FILES:
- index.html (cache-bust market-entry-v24.js to V109)
- market/market-entry-v24.js (gallery transition state machine)
- _next/static/chunks/1502ibkr~cu.4.js (native GSAP camera-timeline marker)

THE FIX:
* Crystal camera's own GSAP timeline (1.6-second move) dispatches a zoom-ready
  event at ~1.48 seconds. This is the actual scene animation milestone, not a
  free-running delay started when clicking the crystal.
* The gallery animation starts while zoom finishes; 115ms later a 240ms
  transparent crossfade starts. The gallery reaches full opacity before
  the raw, bright prismatic interior can be exposed (~1.95s onward).
* If the gallery is still loading, a protective black cover prevents the
  unwanted 3D scene appearing, then dissolves into the moving gallery.
* V108 reverse transition from gallery back to the crystal is retained.

UNCHANGED: all products, loading screen, visual assets, navigation, gallery
content and its animation sequence, and everything outside Market entrance.

TEST: from crystals click Market: camera zoom ends in gallery, never showing
any full-screen raw pale prism. Close gallery: reverse zoom fade still works.
