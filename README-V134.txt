BYZANTINE V134 — HISTORICAL CONNECTION HORIZONTAL CENTERING

This update adjusts ONLY the horizontal placement of Crystal 4's native 3D
content panel. In the supplied screenshot, the native Historical layout's
top divider was centered at x=854.5px on a 1766px-wide frame, approximately
28.5px left of the viewport's horizontal center. The native panel receives
an additional 31 logical pixels of horizontal displacement (about 29px at
that screenshot scale).

It does not change the contents of the canvas, text or image quality, Works
Cited, scroll behavior, vertical positions, fluid mouse effect, Introduction,
About Us, loading screen, Market, or exit transitions.

INSTALL: Copy the contents of the ByzantineEmpireWebsite directory into your
existing GitHub repository, replacing matching files, and commit/push.
Use Ctrl+Shift+R after deployment to load the modified bundle.

FILES CHANGED:
- _next/static/chunks/1502ibkr~cu.4.js

Visual verification in a live WebGPU browser is still needed.
