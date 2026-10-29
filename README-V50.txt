V50 — SIMPLE ABOUT US FADES, NO FLASH, FULLSCREEN BACKGROUND + 404 FALLBACK

INSTALL (UPDATE-ONLY, based on installed V49)
1. Extract this ZIP into your existing GitHub repository's root.
2. Keep directory structure and overwrite files when asked.
3. Commit and push, then hard-refresh (Ctrl+Shift+R).
4. GitHub Pages: ensure 404.html is at the repository root alongside index.html.

ABOUT US TRANSITIONS
- No baked GPU map remains. The only map is the live SVG.
- When opening About Us: the page/map stays hidden during the crystal/camera
  transition, then text and map fade in together from 0 to 1.
- When closing About Us: the native text shader and the real map fade together
  for 430ms; the original crystal exit starts after 500ms.
- Other crystals and Market transitions use their original timings.
- The expanded map now has a purple atmospheric gradient behind it.

RELOAD / GITHUB PAGES LIMITATION
- 404.html catches URLs without their own exported HTML and returns to the
  repository root instead of showing a GitHub Pages 404.
- A refresh of an unsupported deep URL returns to Portal (not the exact prior
  product or crystal). True same-page reload requires pre-exported route files
  or a broader client-side router migration.

This ZIP replaces only listed files; DO NOT delete other site assets.
