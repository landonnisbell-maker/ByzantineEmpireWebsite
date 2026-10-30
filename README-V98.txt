V98 — FULL-SCREEN INTRODUCTION BANNER + REFRESH + MIDDLE-CLICK LOCK

UPDATE ONLY (apply ON TOP OF V97)

Copy the *contents* of ByzantineEmpireWebsite/ into your EXISTING GitHub
repository root (the folder that already contains index.html and .nojekyll).
Replace matching files; do not delete or replace other assets or folders.

Four modified files:
  index.html
  404.html
  intro-team/team-v54.js
  byz-portal-scroll-lock-v45.js

FIXES
1) Introduction: image banner fills the entire browser width. Photographs
   enter/exit off both screen edges. Existing 9 images, labels, blur sidefills,
   smooth CSS motion, and scrolling all remain intact. The caption below is
   now centered in the viewport rather than in the WebGPU text plane.
2) GitHub Pages: when refreshing a client-side route, its 404.html navigates
   back to the ACTUAL site root, so the real index.html and loading/portal
   sequence are fetched. It no longer hydrates a full app from an HTTP 404.
3) Crystal selector: middle-button browser autoscroll is prevented by
   cancelling the initiating mouse/pointer event. Normal left-click, initial
   portal entry, and interior/content-page scrolling are not changed.
4) index.html cache-busts both updated external scripts (?v=98.0).

Deployment:
- GitHub Pages Settings > Pages must publish from the branch and root folder
  where index.html, 404.html, .nojekyll and _next/ actually exist.
- After the push is deployed, hard refresh (Ctrl+Shift+R).
- Test a refresh both on the root URL and after opening any crystal page.
- If GitHub itself serves an old 404.html due to deployment/configuration,
  no client-side change can fix that until Pages deploys the new files.
