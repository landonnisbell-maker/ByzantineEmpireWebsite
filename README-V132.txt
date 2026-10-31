Byzantine V132 – Native Historical Renderer Update

WHAT THIS UPDATE DOES
- Moves Historical Connection onto the same built-in native crystal-content renderer path used by Introduction and About Us.
- Removes the separate historical HTML overlay / HTML-to-canvas bridge from index.html.
- Re-enables crystal 4 in the main renderer bundle instead of returning the intentional blank canvas.
- Loads the Historical Connection text directly through BYZANTINE_CRYSTAL_CONTENT[3].
- Supplies a native hero image and gallery images so crystal 4 still has visuals.

WHY
The previous Historical Connection implementation relied on a separate HTML page and a capture bridge. That caused blurry text, unreadable image details, and repeated fallback behavior. This update switches crystal 4 back to the same native content pipeline used by the crisp Introduction and About Us pages.

FILES INCLUDED
- index.html
- byzantine-historical-connection-content.js
- _next/static/chunks/1502ibkr~cu.4.js
- about-map/_next/static/chunks/1502ibkr~cu.4.js

INSTALL
Copy these files/folders into the root of your existing GitHub repository, allowing replacements.
Then commit and push.
Hard refresh the site with Ctrl+Shift+R after GitHub Pages finishes updating.

NOTES
- This update intentionally stops loading the separate history-v93/history-native-panel-v122 overlay pipeline.
- Historical Connection now follows the same native rendering approach as the working crystal pages, rather than the old custom overlay approach.
