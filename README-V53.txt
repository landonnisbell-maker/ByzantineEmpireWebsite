BYZANTINE V53 — NATIVE INTRODUCTION WEBGPU SHADER
=================================================
Update-only patch to the existing GitHub Pages repository, based on V51/V52.

CHANGED FILES
  _next/static/chunks/1502ibkr~cu.4.js
  _next/static/chunks/01ay6y4_-9myt.js
  index.html

Crystal 1 uses a new procedural black/navy/cobalt/cyan flowing wave gradient
inside the ORIGINAL WebGPU wallMesh, using the same material/uniform mechanism
as the working Crystal 2 gradient. No replacement page or DOM overlay.

Preserves Crystal 2 About Us shader, native navigation/transitions, map, and
Market. The prior V52 intro-v52 files, if present, are harmless but unused.

Low-performance toast: remove its Switch to lite action, retaining Continue
anyway. The current 404.html is intentionally LEFT UNCHANGED. V53 only corrects
the Introduction shader and removes the obsolete Lite button.

INSTALL
  Unzip into repository ROOT, replace same-named files, commit and push.
  If V52 was installed, this index.html removes that overlay's references.
  Do not replace the whole website or delete other assets.

Native shader verified by JavaScript syntax and bundle-diff inspection.
Full WebGPU rendering requires testing on the live site.
