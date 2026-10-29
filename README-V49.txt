V49 — Byzantine About Us: native GPU map hand-off (UPDATE-ONLY)

INSTALL
1. Ensure V48 is installed in your existing GitHub Pages repository.
2. Unzip this archive; copy contents into repository root, preserving folders.
3. Overwrite matching files, commit and push.
4. Hard-refresh after GitHub Pages deploys (Ctrl+Shift+R).

WHAT IS FIXED
- Entry: the HTML atlas is never visible during `entering`; the baked map texture
  is already attached to the 3D media mesh and is revealed by the native shader.
- Exit: the DOM atlas disappears at `exiting`; the native atlas preview stays on
  the actual bent 3D page mesh and dissolves with the other WebGPU text.
- Interior: the original live SVG map remains interactive (drag/zoom/expand).
- No GPU canvas re-creation or shader replacement; the existing TSL material and
  uReveal/uBendAmp uniforms are reused.

IMPORTANT
- The native map is a static visual preview (not interactive) ONLY while the
  crystal page is entering or exiting. During interior, the full interactive SVG
  is layered over it. For expansion, existing modal behavior is preserved.
- Static preview asset is a rendered version of the map and its card; it does
  not replace the original SVG (which remains on disk from V47).
- Main WebGPU transition and hand-off require testing on the live site.
