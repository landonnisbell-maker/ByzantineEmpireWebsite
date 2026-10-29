V46 — Byzantine map transitions, themed map and larger expanded map, silent Market only

BASE: Existing working V45.1 site with V38 product content and V45 map.

1. Extract this archive. Copy the contents into the root of your GitHub repository.
2. Choose Replace in Windows File Explorer; preserve folder structure.
3. Commit and push, allow GitHub Pages to finish deploying.
4. Test in a private window, or hard-refresh (Ctrl + Shift + R).

Updated files:
 - index.html: only versioned About map CSS/JS links.
 - about-map/byzantine-map.js: native-slot fade in/out and historical styling labels.
 - about-map/byzantine-map.css: manuscript-like decoration and viewport-filling expanded layout.
 - market-runtime/gallery/index.html: early audio-shield inclusion.
 - market-runtime/palia/work/palia/index.html: early audio-shield inclusion.
 - market-runtime/byz-market-silence-v46.js: new audio shield loaded ONLY in those two Market subframes.

No files under _next are included; this avoids the previous WebGPU startup regression.
The main website's audio is not touched. The map's underlying image and grainy purple shader are unchanged.

Rollback: restore index.html, gallery/index.html and palia/work/palia/index.html from your backup, and restore the V45 map CSS and JS. Extra silence file is harmless when unused.
