ta pánta pazári — V117
Historical Connection — original Aengel WebGPU fluid effect on the actual text/images

BASE: V116 (retains its cloth-image loading fixes, existing crystal/Market
transitions and other pages). This is an UPDATE-ONLY package, not a full site.

INSTALL
1. Unzip this package.
2. Copy the contents of the ByzantineEmpireWebsite folder into the root of
   your EXISTING GitHub website repository.
3. Allow File Explorer to replace matching files; retain everything else.
4. Deploy, then hard-refresh with Ctrl+Shift+R.

CHANGED FILES (4)
- index.html
- _next/static/chunks/1502ibkr~cu.4.js
- historical-experience/history-v93.css
- historical-experience/history-native-fluid-v117.js (new)

IMPLEMENTATION
The Aengel compositor is STILL the original WebGPU X.compose project-interior
fluid-iridescence pipeline. V117 moves the Historical Connection's actual
text and image pixels INTO that pipeline by rasterizing the browser's already-
laid-out page into a screen-aligned canvas texture. Aengel's WebGPU renderer
then applies its existing fluid distortion to those pixels.

The HTML document itself still handles all page layout, real scroll position,
image loading, Works Cited and link interactions. When the WebGPU handoff is
ready, its non-citation pixels are hidden to prevent duplicate imagery. Works
Cited is not rasterized, remains above the WebGPU view, and is never hidden.
If the native WebGPU effect doesn't initialize, the HTML remains visible.

This avoids the V115 secondary shader/canvas and the V116 mix-blend shortcut.
Introduction, About Us, the gallery and Market entrance/exit timings have NOT
been modified by V117.

CHECKS
- Native shader and overlay JavaScript syntax passed.
- Historical page's canvas capture was tested in Chromium for text layout,
  scrolling, showing/hiding, and Works Cited exclusion.
- The full live WebGPU output and performance have NOT been verified in a
  GPU-enabled browser here; please visually check after deployment.
