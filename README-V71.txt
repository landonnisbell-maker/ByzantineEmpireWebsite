V71 — MARKET BRANDING + PRODUCT RESOURCE PRELOADING

Update-only package. Install on V70, preserving folder structure.

- Original loading screen header is changed to ta pánta pazári, with the supplied
  pink/gold flower logo at the right and the English translation underneath.
- Lower-right ticket retains the Byzantine arch design and lists the five
  actual Market products, with the flower mark replacing the former P✦P mark.
- Both the original native React loading screen and the integrated PP loader
  receive the same branding, without rewriting their React-hydrated markup.
- While the normal initial loader runs, product HTML, shared Nuxt/Palia code,
  fonts, and all five product banner images are fetched/decoded into browser
  caches. Nothing opens five independent WebGL renderers in the background.

IMPORTANT: Preloading assets reduces repeat waits, but WebGL initialization
still takes some time when a product page first opens. It cannot be guaranteed
literally instantaneous on every device.

V70's five distinct product entry pages, routing, and banner effects are left untouched.
