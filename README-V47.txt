BYZANTINE ABOUT US — V47 UPDATE ONLY

Starting point: a working V46 installation (with V45.1 loading crash repair already applied).

What this update changes:
1. Replaces the previous Britannica raster inside About Us with the exact user-provided "Byzantine_Empire_1025_Editable(1).svg" vector map. It remains pannable/zoomable; a derived raster is used ONLY for soft territory pulse highlights.
2. Removes the map's separate delayed fade-in and early fade-out. The panel follows the same native projected media rectangle as the rest of the original crystal content.
3. "ENLARGE" now fades the original About Us text/background behind a page-wide curtain, dissolves the compact map, and reveals a nearly full-screen SVG map; the Close action reverses those effects.
4. Refines ONLY Crystal 2's wallMesh procedural shader to match the supplied dark-violet/magenta grainy gradient reference more closely, with reduced caustics in Crystal 2. Other crystal backgrounds are untouched.

INSTALL:
- BACK UP your current repository folder.
- Extract this archive, copy its contents into the repository root, preserving folders.
- Replace matching files (index.html, _next/static/chunks/1502ibkr~cu.4.js, about-map/byzantine-map.js, about-map/byzantine-map.css).
- Add about-map/Byzantine_Empire_1025.svg and about-map/territory-pulse-1025.png.
- Commit/push, allow GitHub Pages deployment, hard-refresh (Ctrl+Shift+R).

Only the listed code and assets are changed; other content/editor/Market files are left alone.
The SVG was provided by the website owner and may have its own reuse or attribution obligations.

TEST:
- Open About Us: the map should appear with the native page content and remain until the page goes away.
- Expand: original page disappears behind a curtain while the full-screen map appears; Close reverses it.
- Zoom/pan bounded as before. Check several other crystals for unchanged backgrounds.

Verification: browser DOM interaction tests passed for map open/close at desktop and mobile widths, and scripts passed node --check. Full WebGPU shader compile and the crystal handoff still require a live Chrome/Edge test.
