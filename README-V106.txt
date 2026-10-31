BYZANTINE V106 — Loader CTA spacing + direct crystal-to-gallery handoff (UPDATE ONLY)
====================================================================================
Install over V105. Copy the contents of ByzantineEmpireWebsite/ into the existing
repository (preserving all other files). No deletion and no repository reset.

- Loading screen: warning has a stable, centered width independent of the progress
  bar width; once Enter the Experience appears, note moves below that CTA.
  This prevents both the wrapping/squishing and overlap visible in V105.
- Market entrance: retain native 3D crystal camera zoom. Around the last part of
  the zoom, crossfade DIRECTLY to the already-preloaded, already-spinning gallery.
  Removed the opaque black-cover stage from entrance only. The exit's existing
  fade-to-black-and-return behavior is unchanged.
- V105 eager product preloading, gallery spin, images, content, navigation,
  and mouse controls are unchanged.
- Cache-busted just the changed assets, via ?v=106.0 in index.html.

Test: Finish loading; warning is below Enter the Experience, not overlapping it.
Then select Market: see the crystal zoom followed by the gallery itself, with no
intermediate grey page or prolonged black cover. Close and verify the prior
black exit transition still works.
