BYZANTINE V107 — Market crystal fade timing (UPDATE ONLY)
==========================================================
Install over V106. Copy the CONTENTS of ByzantineEmpireWebsite/ into
your existing GitHub repository, preserving all other site files.

Changed files: 
  index.html
  market/market-entry-v24.js

What changed:
- Direct Market gallery crossfade now starts at 1790 ms after the
  Market crystal first begins entering, 750 ms later than V106 (1040 ms).
- The native 'interior' event can no longer bypass that delay.
- The same preloaded, moving gallery is revealed; fade speed, exit fade,
  gallery animation, loading screen, assets, and other pages are unchanged.
- Only the integration script is cache-busted (?v=107.0).

Test: Reload (hard-refresh if needed), click Market crystal and verify
that the camera zoom plays 0.75 seconds longer before the gallery fade.
Then close gallery to verify the original black exit fade still works.
