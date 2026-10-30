V86 — PERSISTENT PRODUCT PRELOAD + FORGE EMBERS (UPDATE ONLY)

INSTALL: Extract ZIP to the PARENT directory that contains ByzantineEmpireWebsite, replace the matching files, and commit/push. V85 must already be installed. Do NOT remove any existing files.

ROOT CAUSE: V85 market-runtime/index.html had reverted to the V70 controller: it navigated a single Palia iframe to a brand-new HTML document on EVERY product click. V72's product-pool-v72.js existed on disk but was never referenced. Browser had to bootstrap Nuxt, WebGL and hero textures again.

V86: Restores persistent independently mounted product HTML frames in market shell. Pages warm in a staged queue on desktop, retain previously initialized scenes across gallery visits; constrained devices limit resident GPU contexts to two to avoid exhausting memory. Cold choices display their title, subtitle and full preloaded banner immediately, switching only when the correct full product page is ready. Note: a cold page's complete WebGL scene cannot initialize instantly on all hardware.

SWORD: original glow-textured white-hot/amber/ash ember sprites (three small PNGs) rise, cool and drift. Glow is baked into sprites, not an expensive animated filter, canvas or CSS blur. No scroll handlers. Desktop 30 small elements, lower-end/touch 12, reduced-motion disables. Keeps product wording, image pixels and the Palia hero intact.

CAVEAT: This is a performance-oriented architecture change. Test on real devices and verify products and navigation in Chrome. Monitor console with ?byzdebug on market URL; window.__BYZ_MARKET_STATUS__() is available in the market shell iframe console.
