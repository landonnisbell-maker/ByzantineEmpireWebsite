BYZANTINE V104 — MARKET BLACK CROSSFADE + LOADER FIXES (UPDATE ONLY)
==============================================================
INSTALL: Extract this ZIP. Copy the files INSIDE ByzantineEmpireWebsite/ into
         your existing GitHub repository, replacing matching files. Do not
         delete any other files. This assumes V103 is already installed.

What changed:
1) Gallery now fades smoothly from an opaque black curtain into the pre-rendered
   gallery using a lightweight .78-second opacity transition. The original
   native crystal zoom and native Aengel card spin are preserved.
2) Fixed the actual "buildGalleryAtlas is not defined" runtime error. That
   orphaned call remained after switching Introduction to its HTML marquee.
3) Deferred gallery prewarming until the main loading screen is ready, but
   start it immediately if the Market crystal is entered early.
4) Deferred heavy, repeated full 3D product iframe preloads until AFTER the
   gallery is visible; staged subsequent warmups instead of competing with
   the portal/loading scene. Product preview and navigation stay intact.
5) Silenced only broken legacy _lite_meta and API telemetry requests that
   received HTTP 405 on static GitHub Pages. No content/API features changed.
6) Removed a captured Cloudflare bot-check iframe and two broken speculative
   Next image-optimizer preload links from the embedded gallery.
7) Cache-bumped patched files to V104.

IMPORTANT: Existing captured Palia/Next runtime resources such as missing
textures/fonts and external Vimeo/CORS links can still fail if they are absent
from your hosted repository. Those errors are separate from this patch; the
patch does not invent missing art or rewrite working scenes to hide them.

VERIFY:
- Hard-refresh once after publishing (Ctrl+Shift+R).
- Crystal zoom -> black cover -> gradual fade-in of the moving gallery.
- Introduction's marquee no longer triggers buildGalleryAtlas ReferenceError.
- Main loading reaches the portal before background product 3D warmup begins.
- Market can still open all five products; first visit to an unwarmed product
  may briefly show its existing lightweight preview.
- Native scrolling, click navigation, close button, and other pages unchanged.
