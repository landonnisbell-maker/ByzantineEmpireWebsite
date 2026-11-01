BYZANTINE WEBSITE — V143 optimization & Historical Connection Portal image alignment
UPDATE-ONLY PACKAGE. Installs directly over V142. No earlier update needs to be reinstalled.

CHANGES
1. Viewport support (root _next/static/chunks/01ay6y4_-9myt.js)
   - Minimum width: 1180 -> 1120 CSS pixels
   - Minimum height: 620 -> 560 CSS pixels
   - Minimum supported aspect: 1.30 -> 1.25
   - Maximum aspect remains 3.0.
   The intention is to accommodate slightly shorter browser viewports (including a visible Chrome bookmarks bar), not to enable mobile layouts.

2. Original Aengel fluid, now retained on low-performance crystal interior pages
   (root _next/static/chunks/1502ibkr~cu.4.js)
   - The existing automatic low-performance gate no longer disables the native fluid for Introduction (Crystal 1), About Us (Crystal 2), or Historical Connection (Crystal 4) while their interior is active.
   - Low-performance simulation dimensions use a smaller 320-pixel primary grid instead of 512 pixels, reducing fluid simulation work while preserving the same native shader, pointer interactions, and visual style.
   - Responds to changes in the site's low-performance flag after initialization.
   - Market (Crystal 3) is unchanged; it uses its own gallery.
   - The existing accessibility setting for reduced motion is respected.

3. Historical Connection Portal image alignment
   (historical-experience/history-native-layout-v133.js)
   - The two Portal screenshots now share one image top, aligned beneath the longer paragraph.
   - Crystal image alignment, content text, and layout styles are otherwise unchanged.

FILES TO COPY INTO THE EXISTING GITHUB REPOSITORY
- _next/static/chunks/01ay6y4_-9myt.js
- _next/static/chunks/1502ibkr~cu.4.js
- historical-experience/history-native-layout-v133.js

WHAT IS NOT INCLUDED OR ALTERED
- No HTML entry files, MP4 files, or crystal video paths.
- V142's custom video assignments and replacement fallback files remain installed and are not overwritten.
- No edits to Market transitions, historical citations, Intro carousel, product loading, or other layouts.

INSTALLATION
Extract the ZIP; copy CONTENTS of the ByzantineEmpireWebsite folder to your existing site repository, replacing matching files. Do not delete other files. Commit and deploy; then use Ctrl+Shift+R to clear cached JavaScript.

TESTING NOTE
Syntax, static regression checks, and ZIP structure were validated. The full WebGPU fluid on the target low-end laptop cannot be benchmarked here, so test fluid motion and frame rate on that device before finalizing.
