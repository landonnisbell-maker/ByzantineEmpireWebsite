BYZANTINE V122 — INTERIOR CLEANUP, CITATIONS, MOUSE, LOADER

BASED ON: V121 (working native Historical Connection scroll and fluid).

FIXES
  1. Historical entrance/exit: no unrelated native page canvas flashes.
  2. Works Cited: moves to independent HTML overlay when native mode starts;
     follows exactly the native 3D scroll coordinate with NO second .65s CSS
     transition; fully readable, clickable and excluded from GPU fluid.
  3. Removes V114 additional global cursor simulation; original Aengel
     WebGPU fluid mouse shader is preserved.
  4. Loader: device note has identical placement whether loading or ready.

INSTALL
  Copy the *contents* of ByzantineEmpireWebsite into your existing GitHub
  website root, replacing matching files. Keep the rest. Do not delete
  older files. The new v122 historical JS must be copied along with index.html.
  The files in the ZIP preserve their repository-relative paths.

VERIFICATION
  Run hard-refresh after GitHub deployment. Confirm native Works Cited starts
  when expected and scrolls with the page, and inspect citation hyperlinks.
  Testing in a real WebGPU browser is still required.
