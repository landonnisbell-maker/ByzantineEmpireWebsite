V67 — PRODUCT PAGE RECOVERY (UPDATE-ONLY)

BASED ON YOUR UPLOADED WEBSITE ZIP (2), WHICH HAD V66 INSTALLED.

Fixes:
- Removes the V66 independent hero stage that hid the original Palia hero
  and displaced the product page.
- Restores the earlier working V65 hero and copy layout, including the full
  contained image and the original feather/scratch edge mask.
- Preserves the V66 product-selection routing, including Coin Exchange Service.
- Adds a product-loaded acknowledgement only after real product content appears.
- Changes nested page resource query versions to V67 to defeat stale iframe CSS/JS.

Install:
Extract over your existing GitHub website repository folder, preserving
folder structure and REPLACING any matching files. Commit and push.
Once GitHub Pages deploys, hard-refresh (Ctrl+Shift+R) and enter a product
from Market. No other crystal pages or historical content is changed.

Known limitation: the hosted WebGL/Nuxt experience cannot be loaded in the
restricted testing browser. Local DOM fixture checks of product body and
hero have passed, including switching between Gold Jewelry, Coin Exchange
Service, and Paramerion Sword without a page reload.
