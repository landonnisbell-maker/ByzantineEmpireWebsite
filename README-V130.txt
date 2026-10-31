BYZANTINE WEBSITE V130 — NATIVE HISTORICAL CONTENT DRAWING

INSTALL
Copy the files inside ByzantineEmpireWebsite/ into the root of the
existing GitHub repository. Replace matching files. Based on V129.

CHANGES
- Historical content is compiled once into native Canvas 2D text-line and
  source-image draw commands using the existing page's layout.
- Paints directly into up to six independent high-resolution canvases; no
  full-page low-resolution texture and no per-scroll redraws.
- The existing Aengel native WebGPU content surface and scroll-bend / mouse
  fluid shader are reused unchanged. No extra WebGPU context.
- Historical HTML remains visible until all canvases upload to the GPU.
  Failure falls back to HTML rather than an empty page.
- Works Cited stays real HTML, outside the shader.
- Market gallery, product warm-up, Intro fade and carousel unchanged.

TEST
1) Hard-refresh after deploying. Open Historical Connection. Verify sharp
   text and coin label, scroll in both directions, and open Works Cited links.
2) Close and re-enter Historical Connection. Verify no double render.
3) Check Introduction, About Us, and Market remain unchanged.
4) On low-end devices the native textures use a smaller memory budget.

Note: the WebGPU appearance still must be tested on a real GPU.
