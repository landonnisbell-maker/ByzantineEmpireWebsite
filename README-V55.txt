BYZANTINE V55 — GITHUB PAGES REFRESH / 404 LOOP REPAIR
=======================================================

WHAT THIS CHANGES
- Replaces the old 404.html redirect-only page ("Returning to ta pánta pazári…")
  with a full fallback bootstrap based on the V54 index.html.
- When GitHub Pages returns 404.html at an unsupported in-app URL,
  its first script immediately restores the URL to
  /ByzantineEmpireWebsite/ using history.replaceState,
  then starts the same app/loader as index.html.
- There is no self-redirect or silent refresh loop.

INSTALL (UPDATE ONLY)
1. Open your EXISTING local ByzantineEmpireWebsite GitHub repository.
2. Extract this ZIP into its root (same folder as index.html).
   This also includes the required empty .nojekyll file for _next assets.
3. Replace ONLY 404.html. Do not delete or replace other files.
4. Commit and push the change.
5. After GitHub Pages has deployed, test a direct page refresh and a deep
   URL like /ByzantineEmpireWebsite/unknown-route.

V54 MUST ALREADY BE INSTALLED. This 404.html includes the V54 entry shell,
which references the five team portraits and native GPU bundle in your
existing repository. All other V54 files are unchanged.

IMPORTANT LIMITATION
If BOTH /ByzantineEmpireWebsite/ and its assets are actually unpublished
(e.g. Pages is configured for the wrong branch or folder), no 404.html
file can repair server-side deployment. Verify GitHub repo Settings > Pages:
Deploy from branch = main (or deployed branch), folder = /(root).
Check latest deployment is successful and index.html + .nojekyll are at
repository root. The 404 fallback only works when it is deployed too.
