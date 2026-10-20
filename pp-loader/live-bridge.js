/* Bridge from the isolated Living Gold loader to the actual homepage.
   The WebGL material study stays unchanged and runs inside its own iframe. */
(() => {
  'use strict';
  const button = document.querySelector('[data-testid="loader-enter"]');
  const pct = document.querySelector('.loader-module__y9w63G__bigPercent span');
  const note = document.querySelector('#standalone-note');
  let isReady = false;
  const send = kind => { if(window.parent !== window) window.parent.postMessage({kind, source:'purple-premium-live-loader-v1'},'*'); };
  function setMessage(message) {
    if (!note) return;
    note.textContent = message || '';
    note.classList.toggle('show',Boolean(message));
  }
  function readyChange(next) {
    isReady = next;
    if(pct) pct.textContent = next ? '100' : '· · ·';
    if(button) button.setAttribute('aria-label',next ? 'Enter the experience' : 'Enter when the experience is ready');
    if(next) setMessage('');
  }
  readyChange(false);
  // Capturing the event prevents the standalone-demo click handler from running.
  button?.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if(!isReady) setMessage('PREPARING THE IMPERIAL GATEWAY — IT WILL OPEN WHEN READY');
    send('PP_LOADER_ENTER');
  },true);
  window.addEventListener('message',event => {
    if(event.source !== window.parent || event.origin !== window.location.origin) return;
    if(event.data?.source !== 'purple-premium-home-v1') return;
    if(event.data.kind === 'PP_LOADER_READY') readyChange(true);
    if(event.data.kind === 'PP_LOADER_WAIT') {
      readyChange(false);
      if(event.data.message) setMessage(event.data.message);
    }
  });
  send('PP_LOADER_HELLO');
})();
