V121 — HISTORICAL CONNECTION: NATIVE AENGEL SCROLLING

Apply after V120. Copy all files inside ByzantineEmpireWebsite to your existing GitHub repository; replace matching files. Update-only, not a full site.

Actual fix versus V120:
* The browser's HTML scroller no longer drives the WebGPU plane.
* The EXACT original native useInteriorScrollStore targetPx and .09/60fps lerp now drive the same projectInterior mesh, and the original native velocity uBendAmp bends the panel while scrolling. No second wheel-easing function is allowed to intercept wheel/keys once the GPU is ready.
* A single canvas atlas is made from the existing Historical layout on entry, then uploaded once (and again only on resize, fonts or image changes), never per scroll frame. Native geometry is translated by Aengel's existing engine.
* Removes huge CSS filter:opacity(0) compositing, which was rendering a long hidden page and likely causing the 5-FPS experience. Original DOM is now visibility:hidden while native runs, so only the native mesh is painted.
* Works Cited is a separate un-distorted HTML box, positioned using the SAME smoothly interpolated native camera offset. Links remain clickable. It is not baked into the fluid shader.
* A failsafe keeps the original HTML layout and its ordinary scroll available until WebGPU confirms the texture has uploaded.

No Market/gallery/Introduction/About Us changes. Script syntax and ZIP integrity tested; final WebGPU performance still requires real-hardware validation.

If the GPU result is unusable, restore V118 as a readable fallback, or V120 if you want the previous full-fluid rendering.
