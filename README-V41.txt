BYZANTINE ABOUT US - V41 NATIVE SHADER GRADIENT
===============================================

This is an UPDATE-ONLY package for the existing GitHub Pages repository.
It is based on the working V39 website (BEFORE the V40 overlay).

FILES TO REPLACE (two total):
  index.html
  _next/static/chunks/1502ibkr~cu.4.js

WHAT CHANGED
- Restores the pre-V40 index.html to remove the unwanted full-screen HTML overlay.
- Adds a procedural purple / magenta / gold / indigo, finely grainy gradient
  to the original WebGPU wallMesh shader.
- Activates the new wall colors only for Crystal 2 (About Us).
- Preserves the original animated lightMesh caustics and all native page content.
- Changes no product content, cloth gallery, transitions, or Market assets.
- No gradient image is loaded: all colors and textures are calculated on the GPU.

INSTALL
1. Back up your current index.html and _next/static/chunks/1502ibkr~cu.4.js.
2. Extract this archive; copy BOTH files into the ROOT of the existing repository.
3. Replace matching files, preserving their paths.
4. Commit and push. Then hard-refresh the published site (Ctrl+Shift+R)
   or test in a new Incognito session.
5. Open Crystal 2, then check Crystal 1 and Crystal 4 for unchanged backgrounds.

ROLLBACK
To undo V41, copy index.html from the V39 ZIP and
_next/static/chunks/1502ibkr~cu.4.js from the working V33 ZIP.
The unused V40 about-experience/ files may remain in the repository; without
references in index.html they do not run.

TESTING NOTES
The bundle passes JavaScript syntax and artifact integrity checks.
A complete GPU/WebGPU visual test was not possible in the testing environment
because local browser navigation is blocked. Verify on your desktop.

GRADIENT SHADER NOTES
- New TSL uniform: uAboutGradient, blended via the existing GSAP morph timeline.
- The index mapping is Crystal 1=0, Crystal 2=1, Crystal 3=2, Crystal 4=3.
- The grain is procedural high-frequency hash noise; flowing cloud noise is 3D.
