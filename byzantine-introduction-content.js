/*
  BYZANTINE EMPIRE — CRYSTAL 1: INTRODUCTION
  ===========================================================
  EDIT THIS FILE TO CHANGE THE TEXT INSIDE THIS CRYSTAL PAGE.
  You can edit anything in quotes below and use backticks for long paragraphs.
  Keep commas, brackets, backticks and the surrounding JavaScript intact.
  Leave the "No image supplied yet" placeholders alone: media is controlled separately.
  When finished: save, commit and push to your existing GitHub repository.

  IMPORTANT: The image placeholder and page transitions are NOT in this file.
  No need to edit index.html, _next/ JavaScript, or any 3D assets.
*/
(function () {
  'use strict';

  const page = {
    // The large page title. Keep it matched to Crystal 1 unless intentionally renaming it.
    title: "Introduction",

    // Small label and subtitle underneath/near the title.
    overline: "Page 1",
    year: "Welcome to the Byzantine Empire",

    // Introductory highlighted line near the top.
    tagline: "", // Intentionally blank: native renderer uses year as the entire subtitle, without an extra dash.

    // Main text ABOVE the first "No image supplied yet" image.
    description: ``,

    // Section AFTER the first image (before the image gallery).
    roleHeading: 'ROLE SUMMARY',
    roleTitles: [],
    roleDescription: ``,

    // Optional small tags / keywords (delete words or add more in quotes).
    stack: [],

    // Section AFTER the image gallery.
    challengesHeading: 'TECHNICAL CONSTRAINTS',
    challenges: ``
  };

  window.BYZANTINE_CRYSTAL_CONTENT = window.BYZANTINE_CRYSTAL_CONTENT || {};
  window.BYZANTINE_CRYSTAL_CONTENT[0] = page;
})();
