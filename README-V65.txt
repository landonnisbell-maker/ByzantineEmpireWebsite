BYZANTINE V65 — Palia full artwork + Coin Exchange + About Us gallery removal

INSTALL
Copy this ZIP over the existing GitHub website folder, keeping all subfolders and allowing replacements.
V64 should already be installed. Do not delete any other files.
Commit/push to GitHub, then hard-refresh after the deployment finishes.

FIXES
1. Product hero photos now use `object-fit:contain` so the entire original image is visible,
   with blurred backdrop extensions and soft feathering around the edges. Image remains above title.
2. Coin Exchange Service is accepted by the Palia product iframe (previously it accepted only 'Coins'),
   preventing fallback to the sword page. Palia JS and stylesheet cache versions are bumped.
3. About Us gallery is suppressed at both data and native renderer levels, preserving the SVG atlas.

No changes to Intro portraits, history shader, crystal entrance, or Market cloth navigation.
