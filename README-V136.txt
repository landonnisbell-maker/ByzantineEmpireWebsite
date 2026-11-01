Byzantine V136 — Larger Historical Images and Native Works Cited Scroll

Install this update directly on top of V135.
Copy the ByzantineEmpireWebsite folder contents into your existing GitHub
repository, preserving paths and replacing the matching files.

CHANGES
1) Historical Connection product and crystal images: 410 -> 495 logical px tall.
   Portal images: 380 -> 455 logical px tall.
   Market logo illustration: 430 -> 490 logical px tall.
   The 2-column layout, aspect ratios, centering, and native fluid shader stay intact.
2) Works Cited: removes max-height 72vh and overflow-y auto, so there is no
   separate citations scrollbar. Its normal HTML box has natural height.
3) Extends only Aengel's native scroll range based on the citations' measured
   height. This lets the main Historical Connection wheel/trackpad scrolling
   reach all citations without creating a taller low-resolution GPU texture.
4) Removes the Works Cited wheel propagation block and updates visibility to
   consider the whole citations box rather than only its first 950 px.
5) Bumps the Historical layout script's cache version in index.html.

FILES
- index.html
- historical-experience/history-native-layout-v133.js
- _next/static/chunks/1502ibkr~cu.4.js

No changes to Introduction, About Us, Market, loading, or crystal transitions.
After deployment, hard refresh (Ctrl+Shift+R).
