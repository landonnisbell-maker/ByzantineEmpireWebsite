V123 — HISTORICAL TEXT QUALITY, TRANSITION DOUBLING, INTRO MARQUEE

Base: V122. Copy all contents of ByzantineEmpireWebsite into your existing GitHub repository root; replace matching files. This is update-only.

1. Historical Connection's long canvas text was often compressed from its full height to 8192px, giving softened/heavy characters. V123 queries WebGPU adapter limits and permits a higher-resolution atlas only on 16k-texture-capable devices. Low-end GPUs retain the smaller, safe texture.
2. The HTML-to-GPU takeover now occurs immediately upon a successful texture upload. Exiting Historical Connection immediately hides the source HTML so it cannot overlap the 3D version through its exit animation. Works Cited remains the independent HTML overlay outside the fluid shader.
3. Restores the missing native per-frame projection call for the original Introduction HTML photo carousel (Architecture, Jewelry & Artifacts). No gallery images or content are replaced.

Test after a hard refresh: Introduction, scroll to the bottom and watch the marquee; Historical Connection, enter and exit repeatedly, scroll at normal speed, verify readable lettering and Works Cited links.

Scope: index.html, history-v93.css, history-native-panel-v122.js and the original 3D renderer chunk. No Market gallery files were modified.
