BYZANTINE V105 — Gallery Entrance/Exit + Original Loader Prewarm (UPDATE ONLY)
==============================================================================
Install over V104: copy the CONTENTS of ByzantineEmpireWebsite/ into your
existing GitHub repository, replacing files with matching names. Do not delete
any other files. Hard refresh with Ctrl+Shift+R after deployment.

- RESTORED V103 LOADING: gallery starts hidden preload with the original screen;
  product iframes begin their staged warmup after 500 ms, as before V104.
  Low-end devices retain the GPU context cap for stability.
- GALLERY ENTRANCE: send native Aengel 2.2-second spin command while black is
  still opaque, then remove the black cover after 180 ms. The previous 120-ms
  post-fade spin trigger caused the visible still-then-jump frame.
- GALLERY EXIT: fade back TO black first (360ms), trigger the original crystal
  reversal underneath it, then fade that black cover away after the crystal
  scene reaches its exterior state (fallback if notification does not arrive).
- LOADER NOTE under existing progress display:
  "This website may load slower or perform worse on lower end devices"
  Kept understated, centered, accessible, and away from progress logic.
- Content, product art, text, controls, middle click lock and refresh routing
  remain untouched. V104 atlas fix and static analytics guard are preserved.

TEST: open Market crystal, see zoom then black then the ALREADY-MOVING gallery.
Close gallery and see black cover the scene before the crystals return.
At startup, check preloading and warning beneath the original loader's bar.
