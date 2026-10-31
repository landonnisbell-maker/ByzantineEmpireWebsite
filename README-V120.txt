V120 — HISTORICAL SCROLL PERFORMANCE + ORIGINAL AENGEL BEND

Apply to the GitHub repository AFTER V119 (copy these files and replace matches).
Changed: index.html, native 3D JS bundle, History CSS, History scroll JS; NEW native-panel-v120.js.

WHY V119 LAGGED:
V119 measured/drew hundreds of DOM text fragments and images on every
scroll frame, then uploaded a full-screen canvas texture repeatedly to WebGPU.
That caused frame drops and unstable scroll on slower machines.

HOW V120 WORKS:
- Snapshot all History text/images ONCE into a full page-long transparent canvas
  texture (refresh only for resize, font/image load or structural change).
- Use the existing Aengel 3D plane to move it as History HTML scrollTop moves.
  No scroll-time canvas drawing or texture uploads.
- Feed the SAME native Aengel scroll velocity to its uBendAmp shader uniform,
  producing the Introduction-style out/in bulge, without a new mouse effect.
- Works Cited remains regular HTML, excluded from the GPU canvas and shader.
- If native rendering never becomes ready, readable original HTML stays visible.
- Market entrance/exit, other pages, gallery loader unchanged.

Browser test on your ROG and slower computer; native GPU result cannot be
verified in this environment. Restore V119 or V118 if a regression is seen.
