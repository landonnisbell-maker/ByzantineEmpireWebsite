BYZANTINE MARKET V28 — RECOVERY + DIRECT DISCOVER-PAGE INTEGRATION

IMPORTANT: This update is based on the working V24 site. It is not a full website.

WHY:
V25 changed the core store and Discover button JS. Re-applying the V24 update did not
restore the core store and button JS because those files were absent in V24. V27
then used a DOM click interceptor that canceled the native click before React.

V28 replaces the store with the original working file, replaces the Discover button
chunk with a narrow conditional on its actual React onClick, and restores the V24
index + Market bridge. It also restores V24's main scene chunk for consistency.
There is NO window capture click listener, no delayed Enter the Experience gate,
and no changes to the loader.

INSTALL:
1. BACK UP your current repository folder, including _next.
2. Make sure V24's market/ and market-runtime/ asset folders are still in the repo.
   If they aren't, restore those folders from the V24 ZIP first.
3. Extract this ZIP. Copy *everything inside* into your repo root and replace files.
   This must replace BOTH JS chunks under _next/static/chunks/.
4. Commit & push the changes; wait for GitHub Pages deployment to finish.
5. Visit /ByzantineEmpireWebsite/market/VERIFY-V28.html; verify checks are green.
6. Visit main website in Chrome Incognito. Enter the crystals, select Market, then
   click Discover page. The button directly opens the dedicated cloth-gallery Market.
   For non-Market crystals the button calls the original enterInterior().

ROLLBACK: Use your full folder backup or a Git commit revert. Copying V24 over V28
will not restore the core JS because V24 does not include them.

NOTE: UI core bundle is copied from the original full website V5.8.2 export, with
one carefully targeted modification. The V24 rendering chunk and Market bridge
are preserved. Full live WebGL verification was not possible in this environment.
