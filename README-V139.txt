BYZANTINE V139 — RESPONSIVE HISTORICAL WORKS CITED SPACING

This update addresses the laptop/desktop mismatch in the gap between the
native 3D "Works Cited" heading and the regular HTML citations box.

CAUSE
The heading lives on the Aengel 3D page and scales with viewport dimensions,
while the box used a hard-coded 150 CSS-pixel offset. Consequently, their
spacing looked different on the 27-inch monitor and the laptop.

CHANGES
- The existing 3D renderer now projects both the Works Cited heading anchor
  and the citations box's planned logical start into screen coordinates.
- The HTML citations box follows that projected position each frame instead
  of adding 150 physical screen pixels.
- The extra native scroll range scales the heading-to-box space in native
  units, preserving access to the bottom of the box and footer.
- Cache-busting version updated for the Historical layout script.

UNTOUCHED
All text, citations, MLA formatting, hyperlinks, footer, page layout,
images, mouse fluid effects, transitions, Market, Introduction, and About Us.

INSTALL
Copy the files inside ByzantineEmpireWebsite/ into the root of your
existing GitHub repository, replacing matching files. Do not remove any
other files. Commit and push, then hard-refresh (Ctrl+Shift+R).

FILES
index.html
historical-experience/history-native-layout-v133.js
_next/static/chunks/1502ibkr~cu.4.js

Note: JavaScript syntax and static checks passed; the final WebGPU visual
alignment must be checked on the actual laptop and desktop.
