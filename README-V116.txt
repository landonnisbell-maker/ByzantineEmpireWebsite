V116 — HISTORICAL CONNECTION: ORIGINAL AENGEL FLUID (NO V115 OVERLAY)

INSTALL
Copy the CONTENTS of the ByzantineEmpireWebsite folder onto your existing
GitHub repository and replace matching files. This is update-only; do not
delete anything else.

FIX
- Undoes V115's extra shader uniform and second application of the fluid effect.
- Stops V115 from elevating the entire WebGPU canvas above the HTML page.
- Uses the same pre-V115 original Aengel native fluid shader and render pipeline
  that serves the other crystals (no imitation effect or additional canvas).
- Blends historical content with the existing fluid pixels without altering
  its layout, scrolling, or source images.
- Keeps Works Cited outside the content blending and behind an opaque
  background so that it remains readable and interactive.
- Keeps V114's low-end cloth image loading and fallback effects on OTHER pages.
- Leaves all Market entrance and exit transition code unchanged (V113 baseline).

NOTE
The original shader renders a WebGPU scene, whereas Historical Connection
content is separate HTML. The content blending is a browser compositing bridge,
not GPU-side optical deformation of DOM glyphs. Truly identical text geometry
warping would require rendering the text itself into the WebGPU pass.
This is a non-invasive fix; please visually test, especially in browsers with
WebGPU enabled. Hard-refresh with Ctrl+Shift+R after deployment.
