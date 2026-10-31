V124 — LOADER STARTUP / MARKET WEBGL WARM-UP FIX (update-only)

Apply this update over V123, replacing matching files at the GitHub repository root.

Why loading may stall near 30%:
- V123 queried an additional WebGPU adapter immediately and allowed a very large Historical Connection GPU texture, even before Crystal 4 was opened. V124 removes this eager request and restores the safe texture cap; Historical page logic and V123 Introduction carousel remain intact.
- The Market product pool previously launched up to FIVE heavyweight Nuxt/WebGL product iframes during the original 3D loader. Those generated the repeating GPU-detection/texture/Vimeo console noise and competed with the main scene. V124 does not create them until a real Market entry; product pages still load on demand and show quick previews. The background warm-up starts after the gallery entrance animation.
- The static Market file/image cache warmer previously ran 4 simultaneous request streams immediately. It now waits until the real original gateway is READY, then starts a gentle two-request queue when idle.

This deliberately does not mask or fake the original loader progress. A stalled loader may have additional causes (e.g., missing core assets or Next/React hydration); those console errors are not all automatically repaired. No Market transition, Intro carousel renderer chunk, original fluid shader, or Works Cited behavior is modified.

Test first load in a fresh browser session (not just a cached refresh), followed by Market entry, product opening, intro carousel, Historical scrolling, and exit transitions. Use Ctrl+Shift+R after deployment to avoid old JS caches.

Changed: index.html; historical-experience/history-native-panel-v122.js; pp-loader/market-preload-v71.js; market-runtime/product-pool-v86.js; market/index.html; market-runtime/index.html.
