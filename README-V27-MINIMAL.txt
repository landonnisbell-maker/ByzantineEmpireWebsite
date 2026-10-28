V27 — MINIMAL MARKET FIX — for sites already restored to V24

This four-file update does not contain the original WebGL bundles or
marketplace assets. It expects the V24 site already in your GitHub repo.

1. Back up your currently working V24 index.html.
2. Extract this ZIP, then copy index.html and the market/ folder into
   your repository's root. Merge folders and replace index.html.
3. Commit and push the files to the GitHub Pages publishing branch.
4. Open https://landonnisbell-maker.github.io/ByzantineEmpireWebsite/market/VERIFY-V27.html
5. Open your website in a private browsing window, select the Market
   crystal, and click Discover Page. This now opens the separate V24
   cloth-gallery page instead of the old empty Market interior.
6. Confirm that Enter the Experience and all other crystal pages still work.

This fix does NOT modify anything in _next/static/chunks. It does not
change the working loader or any React navigation-store code.

ROLLBACK: put your saved V24 index.html back; the new market script can
remain unused.

To debug: run 'window.__BYZ_V27_ENTRY_STATUS__()' in Chrome F12 Console.
The expected value has enabled:true and marketOpened:true after entering.
