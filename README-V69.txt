V69 — FULL-COLOR NATIVE Palia HERO + INDEPENDENT PRODUCT DOCUMENTS

Based on V68.

- Each cloth selection now navigates a NEW, product-identified Palia iframe HTML document.
  It does not recycle the previous product's Vue, WebGL, DOM, scroll, or GPU texture.
  The product is selected before the Nuxt bundle runs, preventing old image flashes.
- Five existing direct product URLs remain distinct, with their own entry documents.
- The hero's native shader now fits the FULL image instead of applying a center crop.
  All feathered/torn edges, displacement, scroll and reveal effects are retained.
- The precomposed desktop/mobile banner textures are brighter and retain the original
  product image colors, while blurred side continuation remains softly feathered.
- The working Coin Exchange routing and copy are preserved.

INSTALL: Extract all included files into the existing GitHub repository, preserving
folder structure and replacing matching files. Commit/push, then hard refresh.

NOTE: Product WebGL instances now load separately on entry, so opening a product can
require a fresh load; the gallery remains visible while its new document prepares.
The complete live WebGL effect still requires deployment testing.
