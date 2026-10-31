BYZANTINE V128 - HISTORICAL SCROLL PERFORMANCE (UPDATE ONLY)

Install over the current V127 site. Copy the CONTENTS of ByzantineEmpireWebsite
into the existing GitHub repository, replacing matching files. Delete nothing.

CAUSE INVESTIGATED
Introduction and About Us use the original Aengel scroll store and GPU content
plane. Historical also uses that store, but still maintains an entire separate
HTML page and Works Cited overlay. The HTML is not needed to paint while the
GPU texture is active. Moving the citations layer offscreen every frame and
checking the hidden HTML document scrollHeight repeatedly can do unnecessary
work or trigger expensive texture re-captures.

V128 CHANGES
- Suspend the separate Historical source page's layout/paint after native GPU
  activation using CSS content-visibility:hidden. Restore it automatically
  for legitimate re-capture and when leaving native mode.
- Do not poll source scrollHeight while the native page is active; that
  measurement is meaningless when its layout is suspended.
- Update the Works Cited transform only when it is near the viewport. When
  visible, it still follows the original native Aengel smoothed scroll each
  frame, with NO secondary easing, and remains outside the fluid distortion.
- No modifications to the native scroll store, 3D camera, scroll bend shader,
  fluid shader, Market transitions, Introduction carousel or product warm-up.

VALIDATION
JavaScript syntax, local DOM activation/deactivation, Works Cited, and
static patch integrity have been checked. Live WebGPU FPS cannot be determined
from this environment. If the page still stutters, use Chrome Performance
profiling to identify the GPU/CPU bottleneck rather than changing more timing.
