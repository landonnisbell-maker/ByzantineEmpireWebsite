V97 — INTRODUCTION: SEAMLESS AUTO-SCROLL PHOTO BANNER

UPDATE ONLY. Copy the contents of ByzantineEmpireWebsite/ into the same
folder in your GitHub website repository, replacing only matching files.
Do not delete existing image folders, scripts, or any other content.

Changes:
- Removes all three failing GPU carousel displays (and their texture atlas).
- Adds one continuous right-to-left banner of all 9 original photographs
  at the bottom of the Introduction page's Explore Byzantium section.
- Regular HTML <img> elements show the actual photos, not shader slices.
- All images are displayed without stretching; vertical photos stay fully
  visible with blurred versions behind them filling the sides.
- All animation uses lightweight CSS transforms, not WebGPU texture uploads.
- The banner is projected onto the existing page, so it follows the SAME
  native smooth scrolling as Introduction; no secondary scrollbar.
- Does not alter any About Us, Historical Connection, product pages, content,
  navigation, source credits or market gallery.

Modified:
index.html, 404.html,
intro-team/team-v54.js, _next/static/chunks/1502ibkr~cu.4.js

This update assumes the nine images in intro-team/gallery are already
present from previous versions (V59/V94). No image files are overwritten.

Publish update and hard-refresh with Ctrl+Shift+R.
