Byzantine V147 — Restore Complete Loading Screen UI

INSTALL OVER V146
Extract this ZIP, then copy the CONTENTS of the ByzantineEmpireWebsite folder to
matching paths in your existing GitHub Pages repository. Allow replacements.
Commit and deploy, then hard-refresh with Ctrl+Shift+R.

FIX
V146's loader-only DOM observer disconnected as soon as React temporarily
removed the loader while switching from loading to READY. Because the default
branding is hidden by CSS, the remounted loader lost the custom logo, product
card, and instruction text.

V147 keeps the observer active across loader remounts. It only disconnects
AFTER the Enter button is clicked and the loader has finished leaving.
It restores the custom content whenever React replaces the loader or any
of its header / ticket / progress sections.

CHANGED FILES
- pp-loader/branding-v71.js: observer lifecycle correction
- index.html: cache-bust updated branding script
- pp-loader/index.html: cache-bust updated branding script

UNCHANGED
- V146 responsive instruction styling
- Low-end mouse-reactive water and fluid effects
- Loading schedule, graphics, textures, videos, and all page content
- All other JavaScript and 3D shaders

VALIDATION
A Chromium browser test reproduced the UI disappearance using V146's
script and verified recovery in V147. JavaScript syntax and ZIP validation
were also checked. The live WebGPU experience needs verification on your PC.
