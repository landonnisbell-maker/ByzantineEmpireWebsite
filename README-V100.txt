V100 — Introduction native-feeling banner transition, latest Marketplace, and History Market paragraph

UPDATE ONLY, install ON TOP OF V99. Copy the contents of ByzantineEmpireWebsite/ into the root of your existing repository and REPLACE matching files. Do not delete any other files.

1. INTRODUCTION: Keep the marquee and its text alive for a matching 760ms opacity fade when closing Crystal I, instead of instantly hiding the HTML overlay at the first exit frame. Fade on entering the banner too. Does not change native scrolling, shader, images, marquee animation or product data. No scroll listeners or extra frame loops.

2. MARKET: Restores the V86 persistent product pool market shell that was overwritten by the older V70 controller included in V99. V86 prewarms separate product frames and keeps the latest V84 gallery glow/presentation. V99 middle-mouse protection and standalone-page-to-loader refresh guards are REAPPLIED to every restored HTML market wrapper, including all five product entry points. V86's product-pool-v86.js is included so the restored HTML never references a missing script. Existing forge FX assets are unchanged. Do NOT also copy older market files over this update.

3. HISTORICAL CONNECTION: Adds the user-supplied paragraph immediately beneath the logo image under the Market heading, using the established centered paragraph styling with the name italicized. Keeps the entire rest of the history page unchanged.

4. ROOT: Cache-busts only the 2 edited JS files; the existing V99 refresh URL normalization, 404 fallback, scroll protections, page routes and other app assets are unchanged.

TEST: Intro page -> scroll to moving pictures -> close; banner should fade with page. Market crystal -> original draggable gallery, glow and immediate prewarmed product pages. History -> Market below logo shows added paragraph. Refresh on any page -> loading screen. Middle-click everywhere -> no autoscrolling.
