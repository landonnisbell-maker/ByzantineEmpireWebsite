V125 — Product Page Warm-Up During the Original Loading Screen (update-only)

Apply this package directly over V123 (you do NOT have to install V124 first).
Copy the contents of ByzantineEmpireWebsite/ into the root of the existing GitHub
repository, replacing matching files. Do not delete unrelated files.

What is retained from V124:
- The Historical Connection module no longer makes an eager WebGPU adapter
  request or allocates its oversized texture at initial site boot.
- Static market asset caching is optional and limited to two simultaneous
  fetches; it cannot delay the native React/3D loader.
- Original Market entrance/exit timing, Introduction carousel, Works Cited,
  and Aengel fluid and native scrolling code remain unchanged.

V125 change requested:
- After the native gateway's original React/3D loader reports READY, while
  the loading screen / Enter the Experience stage is still on screen, the
  static Market asset cache starts and the existing hidden Market shell gets
  a byz:market:prewarm-products message.
- That shell now initializes the REAL product-page WebGL iframes, not only
  their HTML files. Frames are started in a staggered queue after each prior
  document has loaded (or after a bounded 4.5-second fallback). Stronger
  devices prepare up to five persistent pages; constrained devices prepare
  up to two, respecting the existing residentCap policy.
- Warm-up starts during the loading GATE, not during the first 30% of the
  original 3D startup. No page warm-up can block the Enter button. If the
  user enters before all pages finish, the existing instant image previews
  and on-demand product loading still work.

Note: Prewarming every WebGL product page necessarily takes memory/GPU work.
On older machines the cap and staging limit that work, but an individual
product can still require additional loading when opened. This update does
not assert that the missing-file/CORS/hydration console errors are fixed.

Updated files: index.html; market/market-entry-v24.js;
market/index.html; market-runtime/index.html;
market-runtime/product-pool-v86.js; pp-loader/market-preload-v71.js;
historical-experience/history-native-panel-v122.js (V124 retained).

Test on a fresh GitHub Pages browser session; look for the normal native
loading screen reaching READY, then verify the Market product pages begin
loading before Enter is pressed, followed by successful Market entry.
Use Ctrl+Shift+R once after deployment to refresh cached scripts.
