V40 — ABOUT US: ANIMATED PURPLE/PINK GRADIENT AND EDITORIAL TYPE
==========================================================
UPDATE-ONLY PACKAGE. BASE: YOUR CURRENT WORKING V39 WEBSITE.

INSTALLATION
1. Back up your current local repository folder (especially index.html).
2. Extract this ZIP.
3. Copy EVERYTHING INSIDE into the root of your existing ByzantineEmpireWebsite repository.
4. When prompted, choose Replace the files in the destination.
5. Commit and push; allow GitHub Pages to publish.
6. Refresh the published page using Ctrl+Shift+R or use a fresh Incognito tab.

CHANGED/ADDED FILES
- index.html (adds only two tags for the About Us stylesheet and JS)
+ about-experience/about-v40.css (animated moving gradient, grain, typography, reveal animations)
+ about-experience/about-v40.js (reads original About Us editor content and responds to native Crystal 2 interior state)

OPERATION
The native WebGL Crystal 2 remains intact for its original entry/exit camera transitions.
Once the interior status is active, an HTML About Us layer presents the same ten sections
from byzantine-about-us-content.js, with a gradient and scroll animations.
The existing fixed C L O S E button triggers the original reverse crystal animation.
Only Crystal 2 is affected (index 1). Other crystals, Market, loader, product pages,
menu and project content are unchanged by this update.

EDITING CONTENT
Continue editing byzantine-about-us-content.js as before, not the new v40 script.

ROLLBACK
Restore your backed-up index.html. The two files in about-experience/ then become
unused and may be deleted if desired.

NOTES
This change has been tested in an isolated browser presentation and state-event harness,
not visually on the fully accelerated live GitHub WebGPU site. It does not alter core
_next/ JavaScript or the original crystal navigation store.
