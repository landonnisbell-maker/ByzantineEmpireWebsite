PORPHYRA — Home Start Fix (ByzantineEmpireWebsite)

WHAT IT DOES
- Makes /ByzantineEmpireWebsite/ load the arch landing scene instead of using the Projects fallback.
- Makes invalid entry routes prefer the landing scene instead of Projects.
- Disables browser scroll restoration for fresh visits to the homepage only.
- Does NOT change the actual Projects page, models, shaders, animations, or purple glow.

INSTALL
1. Open the local clone of your GitHub Pages repository in File Explorer.
2. Copy index.html AND the _next folder from this patch into the repository root.
3. Choose 'Replace the files in the destination' when Windows asks.
4. In GitHub Desktop: commit the changes and Push origin.
5. Wait for Pages to deploy and test your homepage in a new incognito tab.

IMPORTANT
- A URL ending in /projects intentionally shows Projects. To open the arch, use the website's root URL (without /projects).
- If your repo's GitHub Pages URL includes /ByzantineEmpireWebsite/, the patch also makes that entry path select the arch.
- If the GitHub Pages settings link itself ends in /projects, update that published Website URL/bookmark to the homepage root URL.
