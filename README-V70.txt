V70 — FIVE SEPARATE PALIA ENTRY DOCUMENTS + HERO CAPTION POSITION

Install over V69, preserving folder structure and replacing matching files.

- Five PHYSICAL Palia HTML entrypoints, one per product, are stored in:
    market-runtime/palia/work/palia/entries/<product>/index.html
  They share common Nuxt and Palia WebGL engine files, but each loads a new
  independent browser document and fixes its product identity before boot.
- Fixed an async texture-loading race: stale GPU textures can no longer
  overwrite a newer product's image.
- The market keeps the new product hidden until BOTH its own content and
  the correct native GPU banner texture are ready.
- Prevented redundant show() calls from restarting the original Palia
  feathered reveal animation.
- Pulled the title and subtitle up to the bottom of the native banner,
  with the subsequent product text following in normal flow.
- No HTML image overlays have been reintroduced.
- Coin Exchange continues to map to the coins slug.

Note: To honor Nuxt's original route, each unique Palia HTML entry changes
its iframe's internal browser URL to /work/palia/ before Nuxt starts.
It remains a separately loaded HTML document, not dynamically swapped DOM.

Live WebGL verification is still required after deployment.
