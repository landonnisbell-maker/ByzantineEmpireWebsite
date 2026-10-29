V63 — CRITICAL RUNTIME REPAIR FOR V62

This is an update-only repair. Your existing website must already have V62 installed.

Install:
1. Extract V63 into your existing local website repository folder.
2. Preserve the folder layout. Replace the one matching file:
   _next/static/chunks/1502ibkr~cu.4.js
3. Commit and push to GitHub Pages.
4. After deployment finishes, hard-refresh with Ctrl+Shift+R (or use a private window).

Fix:
The V62 Historical Connection background patch prematurely ended a `let`
variable-declaration chain, which triggered:
  ReferenceError: Cannot access 'l' before initialization
when the interior page renderer ran. V63 declares the gradient callback inside
the function's local variable list and inserts it into the render queue only
after the declaration is complete.

This patch changes no content, portraits, Market images, routing, or animations.
Other old 404s from external CDN assets, optional fonts, or telemetry are not
part of this runtime crash and may require separate site-asset cleanup.
