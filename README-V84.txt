V84 - MARKET BLACK ENTRANCE / GALLERY POLISH / PRODUCT ATMOSPHERES (UPDATE ONLY)

Install: Extract into the parent folder of your existing ByzantineEmpireWebsite directory. Allow matching files to be replaced. Do not delete any existing folders. The files here are only the changed/additional files.

WHAT CHANGED:
- Native Market-crystal entry: as soon as the crystal begins entering, an opaque BLACK cover hides the transitional grey shader. The gallery iframe was already started in advance; it fades in on the native interior event after the gallery confirms ready. No artificial waiting delay was added.
- Market host gallery: starts behind black until ready, preserves the prewarmed gallery iframe between product visits.
- Bottom guidance: no more rounded box; instead an editorial gold rule, the market name, scroll-and-select invitation, and the ORIGINAL simulation explanation in small refined text.
- Cloth hover: gentle gold/amethyst pointer-following glow in the gallery WebGL scene, without blocking cloth clicks or scroll. Does not replace any existing WebGL cloth motion.
- Individual product pages: atmospheric color themes that sit over the existing original blue-textured surface: forge ember orange for Sword; regal gold/plum for Jewelry; warm copper for Food; royal violet for Silk; antique gold/teal for Coin Exchange.
- Product interactions: each page gets a light cursor-responsive ambient highlight plus 8 subtle drifting particles; Sword uses 12 ember particles, Jewelry four-point glints, Silk silk-light streaks, Food warm motes, Coins soft metallic glints.
- Reduced motion and touch devices: particles and pointer-glow are disabled.

UNCHANGED:
- Product wording, prices, image assets, layout rules, custom feathered edges, dedicated product routes, and original gallery click-to-open routing.

VALIDATION:
- JavaScript syntax and package ZIP integrity validated. Check the live deployed site for actual shader/Canvas appearance; no GPU/live deployment test can be confirmed by these checks.

TROUBLESHOOTING:
- Hard refresh after uploading, and confirm index.html plus market/market-entry-v24.js and both market shells were replaced.
- Existing pages use root-relative /ByzantineEmpireWebsite paths; keep that GitHub Pages repository path unchanged.
