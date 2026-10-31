BYZANTINE EMPIRE WEBSITE - V102 UPDATE ONLY
=========================================
Only two requested changes have been made:

1. The Market gallery and product CLOSE controls retain their existing
   positions, accessibility, and click behaviors, without a background
   rectangle on hover, active press, or mouse focus.

2. Entering Market now preserves the native WebGL camera zoom into the
   crystal. The view then fades to black before the already-prewarmed
   gallery fades in on the original native completion / ready signals.
   It does not reveal the old grey shader page.

Includes a versioned script/iframe URL change to avoid cached V101 behavior.

INSTALL
Extract and copy the *contents* of the ByzantineEmpireWebsite folder
into your existing repository, allowing replacement of these matching
files. Do not delete other site files. Push the changes to GitHub.
After deployment, reload the page (Ctrl+Shift+R if necessary).

Unchanged: product content/images, Market gallery appearance, product
atmospheres, history, About Us, Introduction, global scroll prevention,
refresh-to-loader behavior, and other transition systems.

Checks: JS syntax and browser-based hover/click/transition-state smoke
checks passed; the full WebGPU scene needs a final deployment check.
