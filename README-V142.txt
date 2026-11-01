Byzantine V142 — Crystal picture alignment and custom-video safeguard

Install directly over V141 (which was installed after V140).
Copy the CONTENTS of the ByzantineEmpireWebsite folder into your existing repo,
replacing files with matching names. Do not delete unrelated files.

1. Historical Connection: each two-column row now uses a common image top
   position. In particular, the orange Theodosian Walls screenshot is raised
   to line up with the green Hippodrome screenshot. This does not change
   caption wording or image sizes.

2. Crystal videos: restored the four user-supplied 720x720 H.264 MP4s as the
   authoritative source in index.html, including Next/React serialized data.
   Also synchronized about-map/index.html for the alternate entry route.
   Both HTML pages now reference uniquely named Crystal-*-V142.mp4 files.

3. No legacy Aengel footage: additionally overwrote the four old original
   MP4 paths (CG Trader, W3RONE, Presti AI, Grandir) with the user-supplied
   videos. If an old code path still requests one of those filenames, it will
   receive the user's footage. Browser caches may retain old bytes until
   refreshed or cleared.

Files changed/added
- index.html
- about-map/index.html
- historical-experience/history-native-layout-v133.js
- __assets__/Crystal-{Introduction,AboutUs,Market,Historical}-V142.mp4
- __assets__/{CG Trader Video,W3RONE Video,Presti AI Video,Grandir Video}.mp4

Note: This update changes image positioning only on the Historical Connection
native page and crystal video sources. It leaves the other page content,
shaders and transitions unchanged.
- video-check.html (alternate/manual video test page mapped to V142 custom videos)
