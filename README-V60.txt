V60 — Native GPU Sliding Galleries + Normal Image Fitting

UPDATE ONLY, built on V59. Extract into existing GitHub repo root and overwrite matching files.

- index.html: cache-bust team script to v60.0
- intro-team/team-v54.js: gallery atlas, autoplay timing, 16:9-ish image frames
- _next/static/chunks/1502ibkr~cu.4.js: native shader samples animated gallery atlas
- Existing intro-team/gallery/* assets from V59 remain unchanged

Architecture, Jewelry and Artifacts now slide horizontally using three
GPU uniforms that are updated every animation frame. The large native
scroll-page canvas remains static, avoiding repeated full texture uploads.
Landscape images use standard cover fit. Square/tall images keep blurred
side-fill and an uncropped foreground. Portraits and text are unchanged.

The original page introduction, crystal transition, loader and 404 handling
are unchanged. Full WebGPU runtime requires testing after deployment.
