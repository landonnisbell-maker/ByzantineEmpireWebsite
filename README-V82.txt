BYZANTINE V82 — PRODUCT PAGE ALIGNMENT + INTRO CLEANUP + CLOSE BUTTON POSITION

UPDATE-ONLY. Copy these files into your existing site, preserving folders and replacing when prompted.

THIS UPDATE FIXES
1. Product copy alignment is cleaned up across ALL product pages.
   - No-image sections are now centered as one coherent text block.
   - The awkward split-up mini paragraph / multi-column look is removed.
   - Image-adjacent sections still align in the direction that reads best.
2. Repeated intro title / subtitle duplication is reduced.
   - Coin Exchange, Silk, Sword, and Gold Jewelry no longer repeat the page title + subtitle inside the article intro.
   - Food keeps its Garos / Apaki subheadings, but their repeated intro tagline is removed.
3. Duplicate hero-image reuse at the top of the article is removed where it looked redundant.
4. The close button is moved to the right of the flower logo across the market shell pages.

FILES UPDATED
- market-runtime/palia/work/palia/byz-product-content-v82.js
- market-runtime/palia/work/palia/byz-product-content-v82.css
- market-runtime/palia/work/palia/entries/*/index.html (all five products)
- pp-loader/market-preload-v71.js
- market-runtime/index.html
- market-runtime/products/gold-jewelry/index.html
- market-runtime/products/food-items/index.html
- market-runtime/products/silk-textiles/index.html
- market-runtime/products/paramerion-sword/index.html
- market-runtime/products/coins/index.html
- brand/market-flower-v39.css

TEST CHECKLIST
- Food: Garos intro shows heading + image, but NOT the repeated italic subtitle under it.
- Coin/Silk/Sword/Jewelry: product article no longer repeats the big page title/subtitle at the top of the written content.
- Long centered sections now read as one centered block instead of many tiny separated centered paragraphs.
- Close button sits to the right of the flower logo on market and product pages.
