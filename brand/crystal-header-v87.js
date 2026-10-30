/* V87: one unobtrusive, shared flower mark beside the original crystal Close button.
   Preserve the actual native exit handler (no duplicate navigation controls). */
(() => {
  'use strict';
  if (window.__BYZ_CRYSTAL_HEADER_V87__) return;
  window.__BYZ_CRYSTAL_HEADER_V87__ = true;
  const LOGO = '/ByzantineEmpireWebsite/brand/pazari-flower-v39.png';
  let logo;
  function mount() {
    if (logo?.isConnected) return;
    logo = document.createElement('img');
    logo.id = 'byz-crystal-flower-v87';
    logo.src = LOGO;
    logo.alt = 'ta pánta pazári';
    logo.decoding = 'async';
    logo.setAttribute('aria-hidden', 'true');
    document.body.appendChild(logo);
  }
  let previous = null;
  function update(info) {
    const index = Number(info?.index);
    const visible = info?.status === 'interior' && (index === 0 || index === 1 || index === 3);
    if (previous === visible) return;
    previous = visible;
    document.body.classList.toggle('byz-crystal-header-v87-active', visible);
    if (logo) logo.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }
  function init() {
    mount();
    window.addEventListener('byz:market:real-page', e => update(e.detail));
    update(window.__BYZ_MARKET_CURRENT_PAGE);
    // Backup for a missed signal during an initial WebGPU/project transition.
    setInterval(() => update(window.__BYZ_MARKET_CURRENT_PAGE), 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
