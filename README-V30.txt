V30 STABILITY FIX - UPDATE ONLY

BASE: Working V28 / V24 Market site. DO NOT copy V29 during this test.

This update changes only:
  index.html (Market integration script cache version)
  market/market-entry-v24.js (no URL changes; market loads only on first open)
  market/index.html (gallery and Palia WebGL startup staggered)

It does not change any _next/static/chunks files, or any other crystal pages.

Install: backup your current repository folder, copy the three files into it preserving paths, replace when asked, commit and push.

IMPORTANT: Test from https://landonnisbell-maker.github.io/ByzantineEmpireWebsite/
NOT from /ByzantineEmpireWebsite/market/ because the latter is a standalone market page that loads its own gallery.

Expected: root site loader -> crystal gallery -> Market (first visit prepares gallery once) -> return to identical crystal gallery -> reopen Market instantly. Chrome refresh stays at main site root.

Tradeoff: Market initializes on first selection, not during the main loading screen. This avoids starting multiple independent WebGL renderers simultaneously during the website's critical loader phase. Its Palia scene is prepared shortly after gallery load.

Testing diagnostics: open website root with ?byzmarketdebug=1, press F12 Console, inspect [BYZ Market V30]. In console you can run window.__BYZ_V24_STATUS__?.() to check.

Rollback: restore the backed-up index.html, market/market-entry-v24.js, and market/index.html.
