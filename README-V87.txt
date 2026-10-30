ta pánta pazári — V87 UPDATE-ONLY
Historical Connection behind-the-scenes redesign + consistent crystal headers

HOW TO INSTALL
1. Use this update ON TOP OF the V86 site currently deployed.
2. Open the ZIP and copy its ByzantineEmpireWebsite folder into the directory
   that already contains your own ByzantineEmpireWebsite folder.
3. Merge folders and allow Windows File Explorer to replace matching files.
4. Commit and push the changed files to the same GitHub Pages repository.
5. On the live site, hard refresh once (Ctrl+Shift+R) after GitHub deploys.

WHAT CHANGED
- Historical Connection is now presented as an editorial behind-the-scenes
  experience with three chapters: Empire context, product histories, and
  expandable design details. Its existing orange/black background stays.
- All original Historical Connection text is preserved verbatim. The original
  plain-column version is hidden to avoid showing the same material twice.
- Deleted the stray [ZENDORA MAVEN] template label by clearing its stack data.
- Light text shadow improves contrast over the moving orange backdrop.
- The original native Close button is kept, including its transition behavior.
  A flower logo is added to its left on Introduction, About Us and Historical
  Connection, with Close vertically aligned beside it.
- Market/product Close is vertically centered against its existing logo.
- index.html AND 404.html load the same update, so refreshes remain consistent.

FILES REPLACED
  index.html
  404.html
  byzantine-historical-connection-content.js
  brand/market-flower-v39.css

FILES ADDED
  brand/crystal-header-v87.js
  brand/crystal-header-v87.css
  historical-experience/history-v87.js
  historical-experience/history-v87.css

NO CHANGES to any dedicated product pages, their prices, text, images, or
market preloading/gallery controllers.

TESTING
- JavaScript syntax checked.
- Confirmed historical data keeps Society/Trade, 6 product histories,
  and 5 design details intact.
- Verified all script/style assets are referenced by index.html and 404.html.
- ZIP integrity checked after packaging.
- Could not complete live WebGPU/Chromium integration tests in this environment.
