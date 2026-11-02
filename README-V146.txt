V146 — Loader message responsiveness, low-end crystal-selection water, safe cleanup

INSTALL: Apply over V145. Copy the contents of ByzantineEmpireWebsite into the
root of your existing GitHub repository, replacing matching files only. Do not
remove other files. Commit/push and hard-refresh (Ctrl+Shift+R).

FIX 1 — Loader text: Both existing messages now wrap within a compact width
(max 440 CSS pixels, 380 on smaller screens/shorter browser windows), aligned
with the original loading control in both LOADING and READY states. The
messages' wording, position below the control, and loader graphics remain.

FIX 2 — Low-end crystal-selection water: The original Aengel interactive water
simulation was entirely disabled in low-performance mode. Enable it ONLY on
the crystal-selection scene with its existing pointer raycast and compute
pipeline. The grid is 128x128 on low-performance systems (was disabled), and
remains 256x256 on standard systems. The landing/portal water is unchanged.

FIX 3 — Cleanup: The loader's branding MutationObserver now stops watching
DOM changes after the loader has unmounted. Previously it stayed subscribed
for the whole 3D experience. This reduces avoidable background observer work;
no graphics, asset-loading priority or animations are changed.

FILES CHANGED
- index.html (branding cache-busting references only)
- pp-loader/index.html (branding cache-busting references only)
- pp-loader/branding-v71.css (responsive notices)
- pp-loader/branding-v71.js (loader-only observer cleanup)
- _next/static/chunks/1502ibkr~cu.4.js (projects water low-perf path)

VERIFICATION
- JS syntax and exact source assertions pass.
- Chromium CSS layout tests pass at 1920x1080, 1366x768, 1120x600,
  1120x560 and 900x600, during both loading and ready.
- Full WebGPU scene / on-device FPS not tested in this environment.

IMPORTANT
V146 does not modify your custom crystal videos, the Market entrance/exit,
Historical Connection images/text, product pages, Works Cited, portal graphics,
or native postprocessing shaders. A full GPU performance measurement on your
ASUS is still needed to identify any additional source of stuttering.
