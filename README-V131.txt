BYZANTINE WEBSITE V131 — HISTORICAL CONTENT DISAPPEARING FIX

INSTALL: From within ByzantineEmpireWebsite/, copy the three listed website
files into your existing GitHub Pages repo, preserving relative paths.
Replace matching files. Install directly over V130. Then force-reload.

ROOT CAUSE: V130 removed the native full-page canvas and its original
CanvasTexture. It enabled the six-tile shader and hid the HTML before there
was a dependable native fallback, so if tiles did not render the page vanished.

FIX:
- Keep V130's one-time, direct Canvas 2D drawing commands for paragraphs
  and original images.
- Draw a complete, memory-capped fallback texture using those commands,
  and pass it through the proven V129 native CanvasTexture pipeline.
- High-resolution tiles are an optional four-section enhancement. Missing
  or transparent tile pixels preserve the fallback's original color/alpha
  rather than turning the plane invisible.
- Never hide the HTML until the fallback's GPU texture upload callback runs.
- Continue to use the original Aengel scroll and fluid shader; Works Cited
  stays interactive HTML. No product or Market scripts have changed.

TEST: Reload, enter Historical Connection, wait at least 5 seconds, scroll
through the entire page, close/reopen, and check Introduction/About Us.
If texture upload itself fails, the HTML page should stay visible.

Notes: Syntax and ZIP checks passed. A real-device WebGPU test is still
necessary, especially for the improved text sharpness. This is designed to
fail toward visible content, not a blank page.
