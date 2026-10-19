# PORPHYRA crystal-video URL fix

This ZIP contains ONE patched original JS chunk and a standalone video-check.html diagnostic page.

## What failed

Captured CMS videos already contain a URL beginning with `/ByzantineEmpireWebsite/__assets__/`.
The original assetUrl helper blindly prepends `/ByzantineEmpireWebsite/__assets__` again, producing
`/ByzantineEmpireWebsite/__assets__/ByzantineEmpireWebsite/__assets__/CG Trader Video.mp4`.
The resulting video load fails, so the crystal interior is dark despite the video existing.

## Fix

The helper now leaves paths that already begin with the asset prefix unchanged. Other asset paths are still prefixed normally.
This change affects one JS chunk only, not your homepage, portal, routing fixes or assets.

## Installation

1. Back up the currently working repository.
2. Extract this ZIP.
3. Copy the `_next` folder **into** your repository root (alongside index.html), merging folders and replacing only `_next/static/chunks/0uzec6t9x5_l7.js`.
4. Optionally copy `video-check.html` to the repository root for testing.
5. In GitHub Desktop: commit and push the changed files.
6. After GitHub Pages deploys, do a hard reload (Ctrl+Shift+R), or open in Incognito. The source JS is cached by the browser.

## Diagnostics

Visit your GitHub Pages site with `/video-check.html` appended to its homepage path, e.g. `https://YOUR-USERNAME.github.io/ByzantineEmpireWebsite/video-check.html`.
It uses URLs relative to the page and does not access external servers.
If the videos load on this page but not in the crystals, inspect Network for `Video.mp4` and the Console for `Video load failed`.

## Known limitation

The exported `Grandir Video.mp4` is only 7,644 bytes and is NOT a valid MP4, unlike the other five videos.
That one needs a complete replacement source file; do not mistake it for a shader problem.

This is a targeted source fix validated syntactically and through URL-resolution reasoning; final visual behavior still needs testing in your browser.
