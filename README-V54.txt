BYZANTINE V54 — INTRODUCTION TEAM PORTRAITS (NATIVE PAGE)
======================================================
Update-only patch; installs ON TOP of V53.

CONTENTS
  index.html
  _next/static/chunks/1502ibkr~cu.4.js
  intro-team/team-v54.js
  intro-team/portraits/yusrah.webp
  intro-team/portraits/fizza.webp
  intro-team/portraits/shamir.webp
  intro-team/portraits/lillyan.webp
  intro-team/portraits/landon.webp

THE PAGE
Five team profiles are inserted directly into the real Crystal 1
Introduction scrolling canvas, immediately after the title/tagline and
before the existing introduction content. Their alternating order is:
  1 Yusrah  — picture left, text right
  2 Fizza   — picture right, text left
  3 Shamir  — picture left, text right
  4 Lillyan — picture right, text left
  5 Landon Isbell — picture left, text right

Photographs have soft, feathered edges (including the bottom), no hard
rectangle, and retain transparency. Name, role and quote are painted on
the native scroll texture, so they take part in WebGPU scroll and crystal
transitions together with the original text. NO separate HTML overlay.

EDIT TEAM ROLES AND QUOTES
Open intro-team/team-v54.js in any text editor. At the top, find:
  { name: 'Yusrah', portrait: 'yusrah.webp', role: 'Add role here',
    quote: 'Add a personal quote here.' },
Edit only the role and quote values in quotes. Repeat for each teammate.
The script automatically surrounds the quote with typographic quote marks.
Do not edit the compiled _next chunk for simple text changes.

INSTALL
1. Extract the ZIP.
2. Copy its files and folders into the ROOT of your existing GitHub Pages
   repository (the folder containing index.html), preserving paths.
3. Choose Replace when asked, and keep all other files in your repo.
4. Commit and push, allow Pages to deploy, then press Ctrl+Shift+R.

V53 is required. This update leaves the existing blue-black GPU shader,
About Us map/background, Market, transitions, and 404 handling unchanged.

QA
- JavaScript syntax checked with Node.
- Five photos and all native-canvas drawing callbacks rendered without JS
  exceptions in isolated Chromium (original WebGPU renderer not exercised).
- Check your deployed WebGPU entrance/scroll behavior after uploading.
