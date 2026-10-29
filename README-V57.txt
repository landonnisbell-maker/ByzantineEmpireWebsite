V57 — Introduction Portrait Edge Feather + Subtitle

UPDATE ONLY — Apply on top of working V56 website.

Copy all files and folders into your existing GitHub repository root,
accept overwrite for the matching three files, and commit/push.

Included files:
- index.html                  (cache-bust references only)
- intro-team/team-v54.js     (actual image-bounds feathering)
- byzantine-introduction-content.js (exact requested subtitle)

Fixes:
- Feathering now follows each entire fitted portrait rather than a larger
  rectangular drawing canvas. Left/right/top/bottom edges all soften smoothly.
- Full image remains contained with its original proportions.
- Existing portrait/text pop-up animation, team order, native WebGPU shader,
  navigation, loader, and 404 changes are untouched.
- Introduction subtitle: Welcome to the Byzantine Empire

Role and quote placeholders remain editable in intro-team/team-v54.js.

Tested locally: syntax, alpha-edge mask on five portraits, isolated Chromium
render, and ZIP integrity. Native GPU page needs live browser verification.
