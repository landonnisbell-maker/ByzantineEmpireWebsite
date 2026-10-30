/* V88: shared crystal header logo + improved Close alignment. */
(() => {
  'use strict';
  if (window.__BYZ_CRYSTAL_HEADER_V88__) return;
  window.__BYZ_CRYSTAL_HEADER_V88__ = true;
  const LOGO = '/ByzantineEmpireWebsite/brand/pazari-flower-v39.png';
  let logo;
  function mount() {
    if (logo?.isConnected) return;
    logo = document.createElement('img');
    logo.id = 'byz-crystal-flower-v88';
    logo.src = LOGO;
    logo.alt = 'ta pánta pazári';
    logo.decoding = 'async';
    document.body.appendChild(logo);
  }
  let previous = null;
  function update(info) {
    const index = Number(info?.index);
    const visible = info?.status === 'interior' && (index === 0 || index === 1 || index === 3);
    if (previous === visible) return;
    previous = visible;
    document.body.classList.toggle('byz-crystal-header-v88-active', visible);
    if (logo) logo.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }
  function init() {
    mount();
    window.addEventListener('byz:market:real-page', e => update(e.detail));
    update(window.__BYZ_MARKET_CURRENT_PAGE);
    setInterval(() => update(window.__BYZ_MARKET_CURRENT_PAGE), 700);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
