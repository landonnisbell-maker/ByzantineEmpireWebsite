V118 — SAFE RECOVERY OF HISTORICAL CONNECTION (V117 BLACK-SCREEN FIX)

Copy the CONTENTS of ByzantineEmpireWebsite into the existing GitHub
repository, replacing matching files. No other files should be removed.

This recovery package specifically undoes the unsafe V115–V117 Historical
Connection experiments. It restores:
- The existing, working Historical Connection text, images, and scrolling.
- Aengel's original, unmodified WebGPU postprocessor (no extra capture pass).
- The Works Cited box and its original interactions.
- V114's resilient cloth image loader and V113 Market transition, unchanged.

IMPORTANT: This is a stability rollback. It does NOT claim to have achieved
identical original Aengel fluid displacement of the HTML History content.
Introduction/About use content in the native WebGPU scene; Historical
Connection uses HTML over that scene. The exact effect requires moving the
Historical contents into the original scene's rendering pipeline with a
properly tested implementation, not changing z-index or adding an overlay.

The unused history-native-fluid-v117.js may remain on the server; index.html
no longer loads it. Ctrl+Shift+R after deployment.
