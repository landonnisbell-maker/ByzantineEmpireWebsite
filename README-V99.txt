V99 — SITE-WIDE MIDDLE-CLICK BLOCK + SAFE REFRESH / LOADER RESTART

UPDATE ONLY. Apply ON TOP OF V98.

Copy the CONTENTS of ByzantineEmpireWebsite/ over your EXISTING repository
ROOT (where index.html and .nojekyll are). Replace matching files. Do not
remove or replace anything else.

FIX #1: Middle mouse button browser autoscrolling is suppressed on every
HTML entry point of the full site, including all separate market/gallery/
product/embedded pages. Ordinary mouse-wheel reading, touch scrolling,
left-click, dragging, and gallery animations are unchanged. The protection
runs in the capture phase before WebGL/WebGPU/canvas event handlers.

FIX #2: The top-level browser URL is normalized back to
/ByzantineEmpireWebsite/ after internal navigation; the current live route
still stays in the app. When refreshing, GitHub Pages receives a request for
the ACTUAL index.html, so its normal loading screen runs again. Standalone
nested HTML entries navigate to that loader when opened in the top-level
tab, but still run normally inside the site (iframe).

FIX #3: New 404.html fallback immediately sends any unknown route to the
REAL homepage, with a meta-refresh backup if JavaScript is disabled.

IMPORTANT: A GitHub-native screen saying "There isn't a GitHub Pages site
here" means GitHub did NOT serve your 404.html. No browser-side file can run
inside GitHub's own default error page. If you still get that screen, open
repository Settings > Pages and verify the deployed site URL, publish source
(main / root), and a successful Pages deployment. Also verify the URL is:
https://landonnisbell-maker.github.io/ByzantineEmpireWebsite/

Changed 18 HTML files; no changes to images, shaders, original site content,
product layouts, styles, or gallery animations. No third-party libraries.

Test steps after deploying:
1. On any crystal, product, market, about or history page, press middle mouse
   button; it should never display the browser auto-scroll cursor.
2. Wheel-scroll normally on About Us, Introduction and Historical Connection.
3. Open a product and refresh the top-level page; it should restart at loader.
4. Open https://landonnisbell-maker.github.io/ByzantineEmpireWebsite/ directly.
