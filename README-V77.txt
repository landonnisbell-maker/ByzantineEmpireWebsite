V77 — Editorial Product Information Redesign (Update Only)

Copy this ZIP's ByzantineEmpireWebsite folder contents into your existing GitHub website repository, replacing matching files and retaining the current assets and all other files. Built on V76.

Contents:
- All five independent Palia product documents now point to the new V77 CSS/JS.
- Product information layouts have been rebuilt around a consistent editorial design grid with naturally flowing text, hairline separators, and more balanced images.
- No modern rounded cards/boxed descriptions.
- Responsive type and compact spacing across desktop/mobile.
- The silk cloak image uses the exact user-supplied transparent PNG bytes, with no recolor, crop, mask, border, or extra feathering.
- Scroll reveal only animates the image figure briefly, without resizing or changing the image itself.
- The authored PRODUCT HTML strings are byte-for-byte identical to V76; the renderer moves each original heading and paragraph node once and in original order.
- The existing five independent product entry pages, WebGL top banners, routing, and persistent preload architecture remain unchanged.

Quick verification on deployed site:
1. Open all five cloth products and confirm each still shows its complete original information.
2. Check the silk cloak image is fully visible with custom alpha edges intact.
3. Verify both desktop and mobile layouts, scrolling, and Coin Exchange routing.
