/* Purple & Premium GitHub Pages loader integration.
   This file ONLY mounts/removes the loader iframe, leaving Next.js/WebGPU untouched. */
(() => {
  'use strict';
  const LOADER_ID = 'pp-live-cover';
  if (window !== window.top || document.getElementById(LOADER_ID)) return;
  let cover, frame, appLoaded = document.readyState === 'complete';
  let entered = false, waiting = false, handoffStarted = false, ready = false;
  let checks = 0;
  let readinessInterval;
  const messageToLoader = (kind, message) => {
    try { frame?.contentWindow?.postMessage({kind, message, source:'purple-premium-home-v1'},location.origin); } catch (_) {}
  };
  function getOriginalLoader() {
    return document.querySelector('body > .loader-module__y9w63G__loaderContainer');
  }
  function siteReady() {
    if(!appLoaded) return false;
    const old = getOriginalLoader();
    if(!old) return !!document.querySelector('main');
    return old.classList.contains('loader-module__y9w63G__gate') ||
      old.classList.contains('loader-module__y9w63G__exiting');
  }
  function removeCover() {
    if(!cover) return;
    cover.style.opacity='0';
    cover.style.pointerEvents='none';
    setTimeout(() => {cover?.remove(); cover = null;clearInterval(readinessInterval);},800);
  }
  function handoff() {
    if(handoffStarted || !ready || !entered) return;
    handoffStarted = true;
    const original = getOriginalLoader();
    const btn = original?.querySelector('button[data-testid="loader-enter"],button[class*="__cta"]');
    if(btn && !original?.classList.contains('loader-module__y9w63G__exiting')) {
      // Dispatch the original app's own entry handler. Do not simulate navigation.
      btn.click();
      // The original page's exit transition is ~900ms; keep the cover up for it.
      setTimeout(removeCover,1250);
    } else removeCover();
  }
  function checkReadiness() {
    checks++;
    if(!cover) {clearInterval(readinessInterval); return;}
    const next = siteReady();
    if (next !== ready) {
      ready = next;
      messageToLoader(ready?'PP_LOADER_READY':'PP_LOADER_WAIT');
    }
    if (ready && entered) handoff();
    // No indefinite trapping: keep a failsafe message and allow Escape.
    if (checks === 180 && !ready) messageToLoader('PP_LOADER_WAIT','Still preparing the 3D scene. Press Esc to view the original site.');
  }
  function install() {
    if(!document.body || document.getElementById(LOADER_ID)) return;
    const css = document.createElement('style');
    css.id = 'pp-live-cover-style';
    css.textContent = '#pp-live-cover{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483646!important;background:#141114!important;opacity:1;transition:opacity .7s ease!important;pointer-events:auto!important;border:0!important;padding:0!important;margin:0!important}#pp-live-cover iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#141114}';
    document.head.appendChild(css);
    cover = document.createElement('div');
    cover.id = LOADER_ID;
    cover.setAttribute('role','region');
    cover.setAttribute('aria-label','Purple and Premium interactive loading experience');
    frame = document.createElement('iframe');
    frame.id = 'pp-live-loader-frame';
    frame.title='Purple & Premium — interactive loading screen';
    frame.src = new URL('./pp-loader/index.html', document.baseURI).href;
    frame.setAttribute('allow','autoplay');
    cover.appendChild(frame);
    document.body.appendChild(cover);
    frame.addEventListener('load', () => checkReadiness());
    window.addEventListener('message', (event) => {
      if(event.source !== frame?.contentWindow || event.origin !== location.origin || event.data?.source !== 'purple-premium-live-loader-v1') return;
      if(event.data.kind === 'PP_LOADER_HELLO') checkReadiness();
      if(event.data.kind === 'PP_LOADER_ENTER') {
        entered = true;
        if(ready) handoff();
        else messageToLoader('PP_LOADER_WAIT','Preparing the Byzantine gateway…');
      }
    });
    window.addEventListener('load',()=>{appLoaded=true;checkReadiness();},{once:true});
    window.addEventListener('keydown',event=>{
      if(event.key==='Escape' && cover) {entered=true;ready=true;removeCover();}
    });
    // Lightweight poll; stops once the visitor enters. Asset fetching continues behind cover.
    readinessInterval=setInterval(checkReadiness,200);
    checkReadiness();
    // Reattach only if another framework accidentally removes our isolated sibling.
    const observer = new MutationObserver(() => {
      if(!cover || handoffStarted) {observer.disconnect();return;}
      if(!cover.isConnected && document.body) document.body.appendChild(cover);
    });
    observer.observe(document.body,{childList:true});
  }
  // Start as soon as body exists, without waiting for Next.js/WebGPU to load.
  if(document.body) install();
  else {
    const mo = new MutationObserver(() => {
      if(document.body) {mo.disconnect();install();}
    });
    mo.observe(document.documentElement,{childList:true});
  }
})();
