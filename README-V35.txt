BYZANTINE MARKET V35 — UI-ONLY CLOSE AND FOOTER CORRECTION

Start from working V34. This package contains ONLY THREE replacement HTML files.

- market/index.html: "RETURN TO CRYSTALS" -> original crystal-style "C L O S E".
  This button still signals the existing parent to run the original exit animation.
- market-runtime/gallery/index.html: hides the actual Aengel bottom-corner overlay
  (class _7ZPv2G_root), which V34 failed to target. Cloth renderer is untouched.
- market-runtime/palia/work/palia/index.html: moves "RETURN TO GALLERY" to
  the top-left, labels it "C L O S E" with matching crystal styling, and
  preserves its original postMessage return action and reverse transition.

No JavaScript chunks, product data, loaders, gallery movement, or transitions changed.

Installation: Extract. Copy all contents to the repository ROOT and replace existing
files, keeping directories. Commit/push. Test in a new browser session or hard refresh.

To roll back V35, restore these same three files from your V34 backup.

Note: This removes the bottom-left branding from the visible website; the
underlying captured source code is not relicensed by this cosmetic change.
