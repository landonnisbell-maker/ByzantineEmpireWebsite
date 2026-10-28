BYZANTINE MARKET V34 — UI ONLY — UPDATE-ONLY

BASE: V33 (working native transitions) + V32 Market shell/gallery.

Changes:
- Main site original sound/menu navbar stays visible above Market, using its REAL React controls.
- Hides original Aengel footer, brand, legal, contact, social links, and nav within the gallery frame.
- Bumps cache versions for the three layers so Chrome serves the newly edited files.

NO modifications to WebGL code, crystal click handlers, GSAP camera animations,
loader, Palia content, or product data. No _next JavaScript chunks are included.

INSTALL:
1. Back up your existing repository folder.
2. Extract this ZIP. Copy its contents into your repository root.
3. Choose 'Replace files' in File Explorer when prompted.
4. Commit/push all four files.
5. Hard-refresh the published site (Ctrl + Shift + R).

TEST:
- Enter Market from Crystal 3. The original native transition remains.
- The gallery has no Aengel footer or Aengel upper-right navbar.
- The GitHub website's actual sound/menu buttons are visible and clickable above Market.
- Return to crystals, open Market again, and open a cloth product.

RESTORE: Restore the four files from your V33/V32 backups.

NOTE: Full WebGPU behavior has not been confirmed visually in a real browser.
