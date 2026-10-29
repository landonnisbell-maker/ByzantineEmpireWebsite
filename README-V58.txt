V58 — Yusrah Edge & Single Entrance Animation

UPDATE ONLY. Apply on top of your working V57 website.

Replace only:
- index.html
- intro-team/team-v54.js

FIX 1: Stronger feather on Yusrah's left side and a slight rightward
placement for left-side portraits so the native page texture does not
clip their outer fade. Their full height and four-side fades are kept.

FIX 2: V56's extra row-mask fade-and-rise pass is disabled. This is the
second animation that made portraits and text disappear AFTER the first,
more dramatic native crystal reveal. The original GPU animation remains
responsible for revealing the page. This works even with the V56 compiled
shader chunk still installed, so no risky renderer changes are needed.

Existing team order, subtitle, role and quote editing, WebGPU background,
loader and GitHub Pages 404 fallback are unchanged.

To install: extract ZIP into existing GitHub repository root, overwrite the
two matching files, commit/push. Test after refreshing the live site.
