PURPLE & PREMIUM — PORTAL INNER COLOR FIX

This is an additional correction for the INNER portal colors, following the earlier purple-and-gold portal replacement.

INSTALLATION
1. Keep your currently working purple-and-gold portal JS patch in place.
2. Back up the matching file in your repository: _next/static/chunks/1502ibkr~cu.4.js
3. Copy the _next folder from this ZIP into your repository root, replacing the matching file.
4. Commit/push using GitHub Desktop and refresh the deployed page with Ctrl+Shift+R.

TECHNICAL DETAILS
- One minified JS chunk has one shader expression changed.
- Clamps the portal's color interpolation to avoid extrapolating beyond purple/gold, which likely produced cyan and hard-black areas.
- Adds a tiny deep-violet floor to preserve dimensional darks without pure black clipping.
- No timing, geometry, scrolling, loading, or other shader code changed.
- This addresses the procedural portal fill but has not been visually verified on the deployed WebGPU site.

SECURITY
This package contains compiled site JavaScript copied from the saved original site, plus the one described shader edit. If Defender warns again, do not bypass it.

ROLLBACK
Restore only _next/static/chunks/1502ibkr~cu.4.js from your backup. Your original purple/gold change is in a separate file.
