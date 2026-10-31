BYZANTINE V129 — SHARP HISTORICAL CONNECTION (SAFE HIGH-RES TILE HANDOFF)

INSTALL
Apply on top of the current V128 GitHub site. Copy the CONTENTS of the
ByzantineEmpireWebsite folder into the existing GitHub repository and
replace matching files. Do not remove any other files.

CAUSE OF BLUR
Historical Connection is much longer than Introduction. Previous releases
compressed its whole page (text and images) into a GPU texture of at most
8192 pixels high, with an additional 10-million-pixel total cap. Upscaling
that texture at display time makes letters look bold/soft and fine image text
unreadable. Changing font weights or scroll smoothing cannot restore it.

CHANGES
1. Capture short page sections at high pixel density, instead of shrinking
   the entire Historical page as one single image.
2. Sample all sections in the SAME native Aengel 3D material with its original
   scroll, bend, and mouse-fluid effect. The Works Cited HTML stays separate.
3. Explicitly preserve the RGBA opacity when compositing the tiled sections.
   V126 accidentally kept opacity from its transparent 1x1 placeholder;
   that was why the whole page vanished after a brief appearance.
4. Retain V128's working full-page atlas until every high-res section has
   finished uploading; if the optional higher-resolution path fails, the
   working page remains visible instead of disappearing.
5. Nothing in Introduction, About Us, Market, the product preloader, the
   loader, or the carousel is intentionally modified.

NOTES
The higher-resolution sections consume extra GPU memory. The chosen scale
and pixel budget are lower on constrained devices. JavaScript syntax and
isolated Historical DOM rasterization have been tested, but the final shader
has NOT been visually verified on your computer; check the live result.
