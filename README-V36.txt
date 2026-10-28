BYZANTINE MARKET V36 — STABILITY AND UI RECOVERY

START FROM CURRENT V35 DEPLOYMENT. Backup your entire repository first.
Extract this ZIP and copy all files/folders into the ROOT of your existing
ByzantineEmpireWebsite repository, choosing Replace for matching files.
Commit and push all files; allow Pages to finish, test in fresh Chrome Incognito.

What this update repairs:
- Forces fresh versioned main -> Market script -> shell -> gallery/Palia HTML paths.
- Removes footer by targeting the exact Aengel corner component.
- ONE native-style CLOSE in top left: while viewing product, it returns to
  the gallery; otherwise, it runs original crystal exit.
- Retains original Palia WebGL/scroll/hero behavior; hides duplicate return control.
- Stops the embedded Market iframe from rewriting its own browser history
  to virtual product paths. All five dedicated direct product files remain.
- Does not modify core _next chunks, crystal animations, loader, or Palia Nuxt assets.

Do NOT merge this with V34 or V35 again afterward: that would restore stale HTML.

If something is still wrong, inspect the served page source for `v=36.0` and
`byz-footer-v36-guard`, then send browser Console errors and exact failing URL.

NOTE: Code and static resource tests do not prove WebGPU behavior on your GPU.
