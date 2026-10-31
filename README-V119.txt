V119 — NATIVE AENGEL HISTORICAL CONNECTION RENDERING (TEST BUILD)

Copy CONTENTS of ByzantineEmpireWebsite to the existing GitHub repository, replacing matching files.
This package is based on V118; V114 cloth improvements and V113 Market transitions stay untouched.

This revision DOES NOT add a second effect. It draws the Historical Connection
body (text and images) to a transparent viewport canvas. That canvas becomes
the same native 3D panel's CanvasTexture used by the original Introduction/About
content, and therefore passes through the original Aengel WebGPU fluid shader.
The existing HTML remains responsible for scroll and layout. Works Cited
remains normal HTML and is never hidden or rasterized by this change.

SAFETY: The HTML history stays visible unless WebGPU confirms that the native
texture was uploaded. If the GPU cannot render, the history doesn't vanish.

IMPORTANT: Verify on the actual GPU/browser; this changes native WebGPU texture
upload and rendering and has NOT been verified visually in a live WebGPU session.
If it shows a visual issue, restore V118's files to recover.
