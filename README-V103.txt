BYZANTINE MARKET V103 - NATIVE AENGEL GALLERY INTRO REPLAY
========================================================
INSTALL: Extract and copy the ByzantineEmpireWebsite folder contents into
        the root of your existing GitHub repository, replacing matching files.
        Keep all other files; this is UPDATE ONLY, not a standalone site.

CHANGED:
- Replays the original Aengel Lite gallery's native 2.2-second, six-card
  fast-to-slow spin when the Market gallery becomes visible after the
  original crystal zoom -> black -> fade-in sequence.
- Leaves the gallery's existing WebGL renderer, textures, product cards,
  scroll/drag gestures, clickable products, product preload and exits intact.
- No extra rendering layers, artificial wheel events, or long loading delay.
- Respects prefers-reduced-motion and cancels delayed replay when exiting.
- Cache versions bumped for the bridge and gallery HTML/shell.

This patch assumes V102 was installed first. A cached Next.js chunk may require
Ctrl+Shift+R once after GitHub Pages finishes deploying.
