BYZANTINE V127 — HISTORICAL CONNECTION CONTENT VISIBILITY RECOVERY
Update-only for the installed V126 GitHub website. Do NOT delete existing files.

PROBLEM
V126 replaced the stable single-history-texture GPU compositing with a new four-tile
shader. The HTML briefly appeared, then the render handoff hid the HTML while the
four-tile output displayed transparent pixels, leaving only the background.

CHANGES
- Restore the reliable V125 Historical Connection capture/texture path.
- Restore V123's stable native shader integration (the same scroll, bend and fluid behavior),
  removing V126's four-tile sampler completely.
- Retain ONLY V126's Introduction content exit fade (0.46s immediately, no delay).
- Keep the V125 startup/product warm-up logic, V123 Introduction carousel callback,
  and working Works Cited overlay, Market transitions, and original fluid effects.
- Bump history script URL to ?v=127.0.

KNOWN LIMITATION
The Historical Connection text can still look softer than Introduction because the
known-stable version uses one texture for the long page. V127 deliberately prioritizes
restoring visible content over the unverified V126 high-resolution tiling approach.
No live WebGPU/GPU frame-rate verification was possible in this environment.

INSTALL
Copy the contents of ByzantineEmpireWebsite into your existing GitHub repo,
replacing the three matching files. Deploy and use Ctrl+Shift+R to bypass caches.
