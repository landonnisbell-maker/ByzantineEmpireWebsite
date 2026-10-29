BYZANTINE ABOUT US — V42 DARK AMETHYST SHADER
===================================================
Starting point: your WORKING V41 installation, NOT V40.

INSTALL
1. Back up the repository or save a Git commit.
2. Extract this ZIP.
3. Copy its _next folder into the root of your existing repository.
4. Choose Replace matching files, then commit and push.
5. On the published site, hard refresh (Ctrl + Shift + R) or test in Incognito.

CHANGED SITE FILE
_next/static/chunks/1502ibkr~cu.4.js

WHAT CHANGED
Only the existing ABOUT US shader color/noise expression identified by
BYZ_V41_ABOUT_WALL_SHADER has changed. Its new marker is BYZ_V42_ABOUT_WALL_SHADER.
The new look uses near-black aubergine, dark purple, muted pink and blue with
subtle animated clouds and fine procedural grain. There is NO image texture,
NO HTML overlay, and NO change to crystal navigation, other page shaders,
or the separate caustics/light material.

Rollback: replace this JavaScript file with the version from the V41 ZIP.

NOTE: WebGPU appearance must be visually confirmed on your computer. A syntax
check passed, but shader compilation has not been validated on a WebGPU GPU.
