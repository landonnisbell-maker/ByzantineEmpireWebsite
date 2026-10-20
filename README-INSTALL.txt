PURPLE & PREMIUM — STABLE LOADER, BYZANTINE CARDS

WHAT THIS DOES
- Restores the earlier stable Purple & Premium React loader using the saved 4-file rollback.
- Keeps its original asset progress bar, warmup/ready status, Enter the Experience action and original fade-to-black portal transition.
- Removes all separate WebGL liquid effects, overlay iframes, animation-frame patches and custom handoff code.
- Displays Hagia Sophia architectural blueprint and its attribution in the left card; Byzantine merchant design in the right card.
- Keeps the top-right P✦P logo and Lite Version button hidden; the original engine is otherwise untouched.

COPY THE CONTENTS OF THIS ZIP TO THE ROOT OF ByzantineEmpireWebsite: 
  index.html
  _next/static/chunks/05jnh5ihg9x9-.js
  _next/static/chunks/10fw6ai0pk_p_.css
  _next/static/chunks/1502ibkr~cu.4.js
  pp-byzantine/hagia-sophia-architectural-plan.png
  pp-byzantine/ornament.svg

IMPORTANT
- Make a backup of the existing repository index.html and 3 _next files before overwriting them.
- Delete the old pp-loader folder from the repository and stage its deletion in GitHub Desktop.
  It must no longer be referenced anywhere.
- Do NOT delete the _next or __assets__ folders. Merge the supplied _next folder.
- This is based on the saved stable snapshot from earlier in the session, not a fresh export of your live repo.
  Check GitHub Desktop's diff before committing, particularly if you changed compiled chunks since.
- GitHub Pages -> Settings -> Pages should still deploy main / (root).
- Commit, push, allow Pages to deploy, then Ctrl+Shift+R.

HOW TO CONFIRM SUCCESS
- Loader first says FETCHING ASSET / status, with native progress bar.
- It reveals ENTER THE EXPERIENCE when scene is ready, not immediately.
- Clicking runs the original fade-to-black/gateway transition.
- No pp-loader/boot.js, pp-loader/index.html or living-gold.js fetches in DevTools Network.
- If old behavior persists, check cache and ensure the newest GitHub Pages deploy finished.

FALLBACK
To completely revert even these card changes, use your previous working commit or
PURPLE-PREMIUM-LOADER-STABLE-RECOVERY.zip.

This package was checked for file structure and source integrity; runtime scene warmup
must still be tested against your deployed GitHub Pages project.
