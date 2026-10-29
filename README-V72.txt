V72 — Persistent prepared product pages

Install over V71. Copy ALL files and folders into the existing GitHub repository, replacing matching files.

WHY THE FIVE-SECOND DELAY HAPPENED
V71 pre-fetched static assets, but V70 still assigned a fresh iframe.src at every product click and waited for Nuxt, WebGL, the hero texture, plus a 1100ms timer.

THE FIX
- All five separate HTML entrypoint documents warm in persistent frames while the main loader/portal is running on capable desktop devices. On phones and memory-constrained browsers, a maximum of two remain resident to reduce WebGL context crashes.
- Selecting a ready product changes which frame is visible, not its URL or WebGL state.
- The cloth gallery stays running and returns immediately. Each product is pre-initialized once on desktop; low-memory devices may need to initialize a product when first selected.
- A product is never displayed until its correct image, content, and scene all report ready.
- Reopening a product does not reload it or briefly display another product.
- First visits can still take time if the visitor opens Market before background initialization has finished. Browser/GPU capacity and network speed affect cold loads.

TEST: Open the site and allow its usual loader to complete, then enter Market and switch among all five products. Use devtools on the Market iframe: window.__BYZ_MARKET_STATUS__() to inspect ready status. The five product iframes should not navigate again after clicking a cloth card.
