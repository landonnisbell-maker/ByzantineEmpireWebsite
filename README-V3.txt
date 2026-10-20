PURPLE & PREMIUM — GitHub Pages loader V3 (warmup recovery)

WHY V2 FAILED:
The V2 boot script globally replaced window.requestAnimationFrame and tried
limiting the original 3D application to approximately 10 FPS while the loader
was active. This could prevent the WebGPU application from completing its
scene warmup, causing `Warmup stalled for 30s during waiting for scenes`.

V3 DOES NOT MODIFY requestAnimationFrame OR THE ORIGINAL WEBGPU RENDERER.
It only reduces the loader's own quality if its measured FPS remains very low.

INSTALL:
1. In GitHub Desktop: Repository > Show in Explorer.
2. BACK UP your current index.html outside the repository.
3. Copy index.html and pp-loader/ from this ZIP into the repository ROOT.
   Replace ONLY those two items. Do not remove _next or __assets__.
4. Commit and Push origin. After deployment, Ctrl+Shift+R to hard refresh.
5. Click ENTER THE EXPERIENCE only after the original loader is ready.
   The transition uses a black curtain; original app entry handles its scene.

SAFETY / DEBUGGING:
- Press Esc to reveal the original app behind the overlay.
- If the original app cannot initialize, a recovery button appears after 28 s.
- To undo: restore the index.html backup and delete pp-loader/.
- Missing manifest.webmanifest / favicon.ico and 405 telemetry errors are
  usually unrelated to WebGPU warmup; React #418 is a separate potential issue.

LIMITATION:
The original 3D renderer and this interactive loader still share GPU hardware.
During heavy shader compilation on low-power devices a pause can occur. V3
prioritizes correct initialization over artificial throttling of the 3D app.
