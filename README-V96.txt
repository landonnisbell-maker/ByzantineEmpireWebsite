V96 — INTRODUCTION CAROUSELS: STABLE IMAGE FRAMES

UPDATE ONLY. Copy the CONTENTS of the ByzantineEmpireWebsite folder into
THE SAME FOLDER in your existing GitHub repository, replacing matching files.
Do not remove or replace any other website files or image directories.

WHAT CHANGED
- Removes the fragile 5-column WebGPU texture-atlas UV animation from V95.
- Uses ONE canvas texture with THREE independent rows, one for each carousel.
- Each original photo is prepared once as a sharp individual image frame.
- Landscape images use a cover fit; portrait/square images remain contained
  over the blurred version of the same photograph (no stretch/distortion).
- Slides happen INSIDE each category row; the shader samples only that row.
- Only changed frames are uploaded to the GPU, not every rendered frame.
- Retains the introduction section positions, portraits and all other pages.
- Uses a query-string bump so browsers fetch the new gallery script.

CHANGED FILES
ByzantineEmpireWebsite/index.html
ByzantineEmpireWebsite/404.html
ByzantineEmpireWebsite/intro-team/team-v54.js
ByzantineEmpireWebsite/_next/static/chunks/1502ibkr~cu.4.js

Install and deploy as your usual update-only package, then Ctrl+Shift+R.
The JS syntax and patch targets were checked, but full WebGPU visual behavior
cannot be verified in this container's Chromium due to browser restrictions.
