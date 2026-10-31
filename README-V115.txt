V115 — ORIGINAL AENGEL FLUID EFFECT ON HISTORICAL CONNECTION

INSTALLATION
Copy the contents of ByzantineEmpireWebsite into your existing GitHub
repository and replace matching files. Do NOT delete anything else.

Fixes
- Removes V114's newly invented cursor/lens effect from Historical Connection.
- Reuses Aengel's original createFluidIridescentEffect shader in its existing
  WebGPU renderer, composited into the native interior scene.
- Brings the native fluid pixels above Historical Connection's HTML text/images
  with a localized screen blend, without changing the shader's simulation.
- Masks the Works Cited box out of this overlaid native output.
- Leaves the V114 fallback on Introduction, About Us and crystal selection
  alone, and retains gallery loading and Market transitions.

IMPORTANT
This includes a patch to an existing minified Next.js chunk; use Ctrl+Shift+R
after deploying, and test the visual effect on the high-end computer.
Original GPU fluid will only work on devices where the original WebGPU
renderer works. No synthetic history effect is substituted.

Visual limitations: without GPU rendering in a browser, whether compositing
fits your exact visual expectations cannot be verified by static code checks.
