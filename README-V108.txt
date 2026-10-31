BYZANTINE V108 — Native crystal-complete entrance + reverse gallery-to-crystal fade (UPDATE ONLY)
==============================================================================================
INSTALL: Extract this ZIP. Copy the CONTENTS inside ByzantineEmpireWebsite/
         into your existing GitHub repository, replacing matching files only.
         Do not delete anything. Install over V107; hard-refresh (Ctrl+Shift+R).

CHANGED (market/market-entry-v24.js and index.html cache query):

1) MARKET ENTRANCE: The gallery can only become visible after the actual native
   3D crystal entrance timeline reports its completed "interior" state AND the
   gallery is ready. Removed the 1790-ms timer. On slower frames, fixed timers
   may outrun the actual WebGL animation; native completion cannot. Keep the
   same direct, no-black gallery reveal and gallery spin pre-lead.

2) MARKET EXIT: Clicking CLOSE in the gallery triggers the native stone/camera
   return immediately. The gallery stays visible while it begins; around 660ms
   into the return the gallery fades OUT over 760ms, revealing the underlying
   retreating crystal camera. The black veil is disabled for this path.
   The native "exterior" completion cleans up the overlay; failsafe if the
   event does not arrive. Escape and native exit share the same reverse path.

UNCHANGED: Loading screen (including its warning and spacing), gallery spin,
preloading, products, product pages, styles, all page content, sound/menu UI.

CHECK: Click Market (full crystal entrance finishes before gallery emerges);
click CLOSE in the gallery (gallery fades back into reversing crystal camera).
