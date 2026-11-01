BYZANTINE WEBSITE — V144 targeted stability and performance update
==============================================================
UPDATE-ONLY: copy the CONTENTS of the ByzantineEmpireWebsite folder over your existing GitHub website files.
This is based on the newest user-uploaded source ZIP (post-V143 / with V142 custom MP4s).

FIXES
1) Crystal-selection native mouse-fluid on low-end machines
   The existing low-performance fluid exception now also includes Aengel's Projects/crystal-selection scene.
   The original effect/shader stays in use, including V143's smaller 320-pixel simulation on low-end devices.
   Reduced-motion behavior is still respected. Market's separate gallery is unchanged.

2) Historical Connection Works Cited exit
   A 0.43s pre-fade is triggered by the existing Close action using the same native reveal-opacity uniform
   as the rest of Historical Connection, and the original exit action then starts after 0.50s.
   The HTML Works Cited panel already follows that uniform, so it fades rather than vanishing instantly.
   No change to citation content, scroll range, or its position.

3) Enter the Experience hover and portal / first-crystal responsiveness
   The loader-brand and site-menu branding scripts now ignore unrelated DOM changes, instead of scanning
   the entire document after every mutation.
   Optional market asset downloads still run during the READY loading screen, but yield while Enter's
   animated button is hovered; new optional downloads are paused when the user leaves the loader.
   Already-running downloads finish naturally. Remaining optional caching resumes when Market is opened.
   This avoids the prefetch queue competing with the portal and first crystal swipes.

UNCHANGED
- Native shaders and visual quality; portal and crystal transition timings
- Custom V142 crystal video files / references and all four assignments
- Native interior scroll animations and Historical Connection image positions
- All Market entrance/exit transitions, product descriptions, and MLA Works Cited text
- Loader design, loading progress, and Enter button behavior

NOTES
- These changes target identifiable sources of avoidable main-thread/network work; the exact FPS benefit
  on your ASUS and Ryzen 3 depends on browser, drivers and shader compilation.
- Full WebGPU performance could not be benchmarked in this environment. If a one-time spike persists,
  profile it with Chrome's Performance panel before changing graphics or render-pipeline settings.

INSTALL: Replace only the matching 5 website files, deploy to GitHub Pages, then Ctrl+Shift+R.
