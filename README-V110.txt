BYZANTINE V110 — Earlier Market Hand-off + Reversed Gallery Exit
================================================================
Apply over V109 by copying the CONTENTS of ByzantineEmpireWebsite/ into your
existing GitHub repo. Replace matching files; do not delete other site files.
Hard refresh with Ctrl+Shift+R after deployment (JavaScript asset URLs changed).

7 REPLACEMENT FILES:
- index.html : cache-bust entry script
- _next/static/chunks/1502ibkr~cu.4.js : native GSAP handoff 250ms earlier
- market/market-entry-v24.js : reverse-entrance exit sequence & return timings
- market/index.html : cache-bust gallery shell JS
- market-runtime/product-pool-v86.js : forward reverse-intro to nested iframe
- market-runtime/gallery/index.html : forward reverse-intro to live 3D renderer
- market-runtime/gallery/_next/static/chunks/1g4_rbq7oliu6.js : run real
  2.2-second native cloth/card intro timeline backwards from the current
  gallery position, not a CSS imitation

ENTRANCE:
- The event remains bound to the real GSAP camera timeline, now fired 250ms
  earlier (1.23 seconds into the 1.6-second camera move instead of 1.48).
- The pre-rendered, moving gallery appears before the brief prismatic interior.
- Existing safety veil still protects slow-loading devices.

EXIT:
- On CLOSE, the gallery spins/flys its cloth/cards backward using the actual
  same native 3D curves and image/ribbon transforms that animate entry.
- The gallery stays visible throughout most of this reverse, about 2.13 sec.
- After ~1.32 sec, the native crystal camera starts retreating underneath.
- A short 340ms crossfade near the end of the reverse reveals that native
  retreat. Exit is not an instant fade from a static gallery any more.
- The normal crystal navigation, product detail pages and other animations
  are unchanged.

TEST:
1. Hard refresh and click the Market crystal: no grey/prismatic flash.
2. Click CLOSE: cloths retreat/spin backwards, then return zoom to crystals.
3. Re-enter Market and repeat; test on a second browser if old JS is cached.

JS syntax and event-routing sanity can be validated statically; browser GPU
rendering on the deployed site remains to be verified visually.
