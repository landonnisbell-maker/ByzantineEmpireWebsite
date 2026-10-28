TA PANTA PAZARI — V38 PRODUCT PRESENTATION UPDATE

Update-only package for the WORKING V37 GitHub marketplace.

To install:
1. Back up your working website folder.
2. Extract this ZIP.
3. Copy the market-runtime/ folder into the ROOT of your existing repository, merging folders and replacing matching files.
4. Commit/push, then hard-refresh or open in a fresh private window.

FILES CHANGED
- market-runtime/palia/work/palia/index.html
  Changes references from V37 content assets to V38 content assets. No navigation changes.

FILES ADDED
- market-runtime/palia/work/palia/byz-product-content-v38.js
- market-runtime/palia/work/palia/byz-product-content-v38.css
- market-runtime/palia/work/palia/byz-scratch-edge-v38.png

NEW PRESENTATION
- Hero: one centered product title and italic slogan, slightly overlapping the hero artwork.
- The article no longer repeats the primary heading and its first slogan.
- Product text and headings reveal subtly as they enter the viewport while scrolling.
- Scratchy/painted-edge 'No Image Supplied' placeholders are inserted periodically in each article.
- Food Items retains separate Garos and Cretan Apaki headings; Silk Textiles retains its product sections.
- Full product wording, prices, strong/italic emphasis and purchase instruction are preserved.

FUTURE PHOTOS
The slots are <figure class="byz-market-scratch-figure" data-image-slot="1"> etc. inside the product content created by byz-product-content-v38.js. Each slot has a .byz-market-scratch-surface element, which can hold an <img class="byz-market-supplied-photo" src="..." alt="...">. The mask automatically gives supplied images the same rough edge. There are no real photos in this package.

DOES NOT TOUCH
Main site index; crystal navigation/animation files; gallery renderer; original Palia WebGL assets; product routing; Close buttons.

VALIDATION
JavaScript syntax verified, responsive DOM tests at 1500px and 390px, five content-switch checks, zero horizontal overflow, hero heading/tagline checks, placeholder counts, and purchase footer verified. Full native WebGL scene must still be checked on the live website.
