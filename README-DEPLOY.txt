PURPLE & PREMIUM — GITHUB PAGES DEPLOYMENT (V5.8.2)
========================================================

THIS ZIP IS READY FOR REPOSITORY: ByzantineEmpireWebsite
Expected site: https://YOUR-GITHUB-USERNAME.github.io/ByzantineEmpireWebsite/

IMPORTANT: The ZIP contents are ALREADY LAID OUT FOR THE REPOSITORY ROOT.
Do NOT upload the ZIP itself to your repo; extract it and copy its contents.
Do NOT put these files inside another ByzantineEmpireWebsite subfolder.

RECOMMENDED METHOD — GITHUB DESKTOP
1. Back up your existing repository folder or create a branch.
2. Open GitHub Desktop and clone/open your ByzantineEmpireWebsite repository.
3. Extract this zip and copy ALL its contents into the CLONED REPOSITORY ROOT.
   Allow same-name files to be replaced, retaining the _next/, __assets__/,
   pp-byzantine/, draco/, fonts/ and _next-images/ folders.
4. Ensure index.html AND .nojekyll are directly in the repository root.
5. In GitHub Desktop, review changes, commit (e.g. "Deploy Byzantine V5.8.2"),
   then Push origin.
6. On GitHub: Settings > Pages > Build and deployment > Deploy from a branch,
   branch main, folder /(root), and Save (if not already configured).
7. Wait for GitHub Pages to publish, open your repository URL, and refresh with
   Ctrl+Shift+R once so old cached JavaScript does not obscure new changes.

FULL UPDATE FEATURES
- 4 pages: Introduction, About Us, Market, Historical Connection.
- Original crystal and mountain morph behavior.
- Hagia Sophia, purple palace, revised green Hippodrome and raised red walls.
- Synchronized, distorted background transitions.
- Aengel branding/logo and Available status hidden/removed from the interface.

FILES INCLUDED
- All captured site runtime files/assets, including hidden .nojekyll
- The four Byzantine PNGs and all updated JavaScript/HTML files
- 404.html redirect to homepage for unsupported deep links
- No Windows .bat or Python local server (not needed by GitHub Pages)

DEPLOYMENT GOTCHAS
- You must use the exact repository name ByzantineEmpireWebsite because the
  site has absolute URLs that begin /ByzantineEmpireWebsite/.
- Do NOT enable Git LFS for the actual web assets: GitHub Pages doesn't serve
  LFS pointer files as images/videos/models. All assets here are under 25MB.
- Do NOT omit .nojekyll; otherwise GitHub Pages may skip the _next directory.
- If you previously copied a large experimental city GLB, it is not used in
  this build and can be removed: __assets__/models/city/ByzantineEmpire.glb.
- The deprecated pp-city-tuner.js may also be removed if present.
- A full 3D WebGPU experience requires a supported desktop browser/device.
- This is a captured static site from a third-party original: verify you have
  permission/licensing to redistribute its code and included assets.
- The interior pages still contain some original demo materials.

If GitHub Pages shows a blank screen: F12 > Console + Network; check missing
requests, and verify the site runs at the expected project URL.
