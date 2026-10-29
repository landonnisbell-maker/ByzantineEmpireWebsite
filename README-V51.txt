V51 — ABOUT US MAP ALIGNMENT + EXACT LIVE BACKGROUND + TIMEFRAME CLEANUP

INSTALL (UPDATE-ONLY; requires installed V50)
1. Extract into your existing GitHub website repository root.
2. Overwrite matching files, preserving the nested _next and about-map folders.
3. Commit/push and hard refresh (Ctrl+Shift+R).
4. Keep all other files as they are, including the existing 404.html.

CHANGES
1. Compact map left edge now matches the native text column (x=336 projection).
   Removes the extra centering offset while retaining responsive width/aspect.
2. Fullscreen atlas now shows the site’s real WebGPU purple/pink animated
   grainy background instead of a static CSS-gradient imitation. Native page
   text is hidden via its own reveal uniform, while the background renders.
   Modal input blocking, zoom/pan, and scroll lock are preserved.
3. Removes only the duplicated Time Frame and 330 CE - 1453 CE paragraphs
   from the About Us description. Date directly under THE BYZANTINE EMPIRE
   remains unchanged. Normalizes both embedded and runtime-overridden content.

V50’s proven fade-before-crystal entry/exit remains unchanged.
