V85 — PERFORMANCE FIRST + REAL ANIMATED PRODUCT ATMOSPHERES (UPDATE ONLY)

Install by extracting this ZIP into the parent directory containing your existing ByzantineEmpireWebsite folder. Allow matching files to be replaced. DO NOT delete the existing website or replace it with this partial package.

INSTALL ON TOP OF V84. Only four new v85 effect assets and six HTML entrypoints are included.

WHY V84 FELT SLOW:
  V84 placed a large radial-gradient + stacking contexts on the full vertical length of every product page, with a moving pointer-glow. The gallery used an oversized mixed-blend hover effect on top of WebGL. Those effects can increase paint/compositing cost as users scroll.

WHAT V85 CHANGES:
  • Removes references to the costly V84 atmosphere and gallery glow files. The files may remain on disk but no longer load.
  • Sword: actual floating gold/orange ember particles (13 tiny CSS elements on desktops).
  • Jewelry: subtle four-point gold sparkles.
  • Silk: drifting lavender luminous threads.
  • Food: a few gentle smoke/steam flecks.
  • Coin exchange: sparse metallic specks.
  • Each keeps the original textured background and a soft, ONE-VIEWPORT, STATIC color tint, instead of a full scrolling-page gradient.
  • A smaller, cheaper canvas-only pointer highlight appears in the cloth gallery. The original WebGL cloth simulation remains unchanged.
  • No new animation frame loop on product pages. No new scroll listeners or canvases. Only small CSS transform+opacity animations. Particle count drops to 5 on touch, Save-Data, or low-concurrency devices; reduced-motion disables particles. Inactive tabs pause the particle animations.
  • Adds subtle title hover color reactions without changing image pixels, shapes, masks, positions or existing content.

UNCHANGED:
  All product descriptions, prices, images, routes, main 3D gallery renderer, and market-to-gallery black entrance.

CHECKS:
  Syntax, reference paths and zip integrity are checked. Browser appearance/performance still needs real-device testing, especially if a separate heavy WebGL effect or unrelated code still causes low FPS.

NOTE: V85's gallery cursor glow is a small visual hover indication over WebGL. It is NOT a true emissive shader directly behind a cloth mesh (that would require editing the WebGL cloth material and might cost more GPU time).
