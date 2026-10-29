BYZANTINE WEBSITE — V45.1 LOADER CRASH REPAIR
================================================

This is a ONE-FILE, UPDATE-ONLY patch to your existing V45 installation.

Cause identified from your DevTools screenshot:
  ReferenceError: downMap is not defined
  in _next/static/chunks/1502ibkr~cu.4.js

V45 removed V44's map pointer handlers but left cleanup code that
attempted to unregister them. React calls that cleanup during startup,
crashing the application when the loader reaches ~98%.

This repair deletes ONLY those stale cleanup statements. All other
JavaScript bytes are identical to V45.

INSTALL
1. Keep your current V45 website files in place.
2. Extract this ZIP.
3. Copy the enclosed _next folder into your repo root, preserving its path.
4. Replace _next/static/chunks/1502ibkr~cu.4.js when prompted.
5. Commit and push your GitHub repository changes.
6. After GitHub Pages deploys, open a new Incognito window and test.

No map, portal lock, other crystal, loading, product, or market files
are replaced by this patch.

VALIDATION
- Patched JavaScript passes node --check.
- No references to downMap/moveMap/upMap/wheelMap remain.
- The V45 map positioning and original renderer are retained.
- Full browser GPU startup must be tested in your deployed Chrome.

Some unrelated missing resources (404s), blocked Vimeo assets, and
React warnings in your screenshot may persist. They are separate from
the confirmed fatal undefined-handler reference and are not changed.
