(()=>{
'use strict';
// V106: retain the crystal camera zoom and hand off DIRECTLY to the already-
// preloaded gallery. No opaque intermediate screen on entry; the gallery
// crossfades over the last portion of the zoom before the grey shader stage.
if(window.__BYZ_MARKET_V34__)return;
window.__BYZ_MARKET_V34__=true;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ORIGIN=location.origin;
const SHELL=new URL('index.html?embedded=1&v=106.0',document.currentScript.src).href;
const DEBUG=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...args)=>{if(DEBUG)console.info('[BYZ Market V106]',...args)};
let overlay=null,frame=null,frameLoaded=false,marketReady=false,preloadRequested=false;
let wanted=false,nativeReached=false,opened=false,recoveries=0,reconnectScheduled=false;
let closing=false,closingStarted=0,exitCallTimer=0,exitFallback=0,revealExitTimer=0;
let feedback=null,deadline=0;
// V103: replay the gallery's original Aengel intro only once it is actually visible.
let marketRevealEpoch=0;
let galleryPreloadCheck=null;
let crystalEnterAt=0,directEnterTimer=0;
const DIRECT_GALLERY_MS=1040;
const DIRECT_SPIN_LEAD_MS=115;
// The original native crystal zoom lasts ~1.6s. Reveal the gallery around
// 1.04s into it, before the old refraction/grey handoff becomes visible.
function cancelDirectTimer(){if(directEnterTimer){clearTimeout(directEnterTimer);directEnterTimer=0;}}
const STYLES=`
#byz-v33-market{position:fixed;inset:0;z-index:2147483000;opacity:0;visibility:visible;
 pointer-events:none;overflow:hidden;background:#000;transition:opacity .12s ease-out}
#byz-v33-market.byz-v33-covering,#byz-v33-market.byz-v33-open,
#byz-v33-market.byz-v33-closing{opacity:1;pointer-events:auto}
/* Direct handoff: this opacity transition overlays the end of the crystal zoom.
   The 3D gallery is already rendered underneath, with no black flash. */
#byz-v33-market.byz-v106-direct{opacity:1;pointer-events:auto;transition:opacity .38s cubic-bezier(.22,1,.36,1)}
#byz-v33-market.byz-v33-covering{transition:opacity .26s ease-in}
#byz-v33-market.byz-v33-closing{transition:none}
#byz-v33-market>iframe{display:block;width:100%;height:100%;border:0;background:#000;opacity:0;pointer-events:none}
/* A cheap, fixed black veil fades over a PRE-RENDERED gallery frame. The iframe
   itself must never jump from transparent to opaque on its first WebGL paint. */
#byz-v33-market.byz-v33-covering>iframe,#byz-v33-market.byz-v33-open>iframe,
#byz-v33-market.byz-v33-closing>iframe,#byz-v33-market.byz-v106-direct>iframe{opacity:1}
#byz-v33-market.byz-v33-open>iframe,#byz-v33-market.byz-v106-direct>iframe{pointer-events:auto}
#byz-v33-market::after{content:"";position:absolute;inset:0;background:#000;opacity:1;pointer-events:none;z-index:2;transition:opacity .78s cubic-bezier(.2,.72,.16,1)}
#byz-v33-market.byz-v33-open::after{opacity:0}
/* No black curtain at all on direct entry; still use the black curtain on exit. */
#byz-v33-market.byz-v106-direct::after{opacity:0;transition:none}
/* On exit, fade the gallery TO BLACK before starting the native crystal return. */
#byz-v33-market.byz-v33-closing::after{opacity:1;transition-duration:.36s;transition-timing-function:ease-in-out}
/* Keep the ORIGINAL website sound/menu controls over the Market frame.
   Do not copy or re-create any buttons: these are the live React controls. */
html.byz-v34-market-active nav[data-navbar][class*="Navbar-module_"]{
 position:fixed!important;inset:auto 0 auto 0!important;top:0!important;
 z-index:2147483400!important;opacity:1!important;visibility:visible!important;
 transform:translateY(0)!important;pointer-events:none!important;
 transition:opacity .2s ease!important;
}
html.byz-v34-market-active nav[data-navbar][class*="Navbar-module_"] button[class*="__sound"],
html.byz-v34-market-active nav[data-navbar][class*="Navbar-module_"] button[class*="__menu"]{
 opacity:1!important;visibility:visible!important;pointer-events:auto!important;
}
@media(prefers-reduced-motion:reduce){#byz-v33-market,#byz-v33-market::after{transition-duration:0s!important}}
`;
function emit(type){try{frame?.contentWindow?.postMessage({type},ORIGIN)}catch(e){log('postMessage',e)}}
function startGalleryPreload(reason){
 if(preloadRequested||!frame||!frame.isConnected)return;
 preloadRequested=true;
 if(galleryPreloadCheck){clearInterval(galleryPreloadCheck);galleryPreloadCheck=null;}
 frame.src=SHELL;
 log('gallery prewarm after',reason);
}
function mount(){
 if(!document.body)return;
 if(overlay){
  if(!overlay.isConnected){
   frameLoaded=false;marketReady=false;preloadRequested=false;opened=false;recoveries++;
   overlay.classList.remove('byz-v33-open','byz-v33-covering','byz-v33-closing','byz-v106-direct');overlay.setAttribute('aria-hidden','true');
   // React may replace body during hydration. A reattached iframe reloads.
   document.body.appendChild(overlay);
   // Re-prime without changing native crystal state or restarting the main site.
   if(frame){frame.removeAttribute('src');frame.src=SHELL+'&reconnect='+recoveries;preloadRequested=true;}
   log('reconnected after React reset',recoveries);
  }
  return;
 }
 const style=document.createElement('style');style.id='byz-v33-market-style';style.textContent=STYLES;document.head.appendChild(style);
 overlay=document.createElement('section');overlay.id='byz-v33-market';overlay.setAttribute('aria-label','Byzantine market');overlay.setAttribute('aria-hidden','true');
 frame=document.createElement('iframe');frame.title='ta pánta pazári marketplace';frame.id='byz-v33-market-frame';frame.allow='autoplay; fullscreen';frame.loading='eager';frame.tabIndex=-1;
 overlay.appendChild(frame);document.body.appendChild(overlay);
 frame.addEventListener('load',()=>{if(!frame.isConnected)return;frameLoaded=true;emit('byz:market:prewarm');emit('byz:market:ping');log('shell loaded')});
 // V105: Restore immediate hidden gallery preload during the original screen.
 const preload=()=>{if(preloadRequested)return;startGalleryPreload('original loader')};
 if('requestIdleCallback' in window)requestIdleCallback(preload,{timeout:900});else setTimeout(preload,250);
}
function status(message,canRetry=false){
 if(!feedback){feedback=document.createElement('div');feedback.id='byz-market-feedback';feedback.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483002;background:#101014ee;color:#fff;padding:12px 18px;border:1px solid #ffffff40;font:13px system-ui;text-align:center;max-width:85vw';feedback.setAttribute('role','status')}
 feedback.replaceChildren(document.createTextNode(message));
 if(canRetry){let b=document.createElement('button');b.textContent='Retry Market';b.style.cssText='margin-left:14px;padding:7px 12px;cursor:pointer';b.onclick=()=>{marketReady=false;frameLoaded=false;frame.src=SHELL+'&retry='+Date.now();b.remove();};feedback.appendChild(b)}
 if(!feedback.isConnected)document.body.appendChild(feedback);
}
function clearStatus(){if(deadline){clearTimeout(deadline);deadline=0;}feedback?.remove()}
function revealDirect(){
 if(!wanted||!marketReady||opened||closing)return;
 // Wait until the native zoom's handoff point, unless the crystal has already
 // reached its interior state. Timing is measured from the FIRST entering event.
 const elapsed=crystalEnterAt?performance.now()-crystalEnterAt:DIRECT_GALLERY_MS;
 if(!nativeReached&&elapsed<DIRECT_GALLERY_MS){
  cancelDirectTimer();
  directEnterTimer=setTimeout(()=>{directEnterTimer=0;revealDirect();},DIRECT_GALLERY_MS-elapsed);
  return;
 }
 cancelDirectTimer();mount();if(!overlay?.isConnected)return;
 clearStatus();opened=true;
 const epoch=++marketRevealEpoch;
 overlay.setAttribute('aria-hidden','false');
 // Start native Aengel movement while the crystal is still visible, so the
 // crossfade doesn't expose a motionless gallery frame before the spin.
 emit('byz:market:enter');
 emit('byz:market:replay-intro');
 emit('byz:market:visible');
 setTimeout(()=>{
  if(!opened||closing||!wanted||epoch!==marketRevealEpoch)return;
  requestAnimationFrame(()=>{
   if(!opened||closing||!wanted||epoch!==marketRevealEpoch)return;
   document.documentElement.classList.add('byz-v34-market-active');
   overlay.classList.add('byz-v106-direct');
  });
 },DIRECT_SPIN_LEAD_MS);
 log('native crystal zoom crossfades DIRECTLY into already moving gallery');
}
function prepareMarket(entering=false){
 if(closing)return;
 mount();startGalleryPreload('market requested');
 if(!wanted){
  crystalEnterAt=entering?performance.now():0;
  wanted=true;
 }
 if(frameLoaded){emit('byz:market:prewarm');emit('byz:market:ping');}
 if(marketReady)revealDirect();
 else if(nativeReached){
  status('Preparing Market…');
  if(!deadline)deadline=setTimeout(()=>{deadline=0;if(wanted&&!marketReady)status('Market could not finish loading.',true)},30000);
 }
}
function clearExitTimers(){
 clearTimeout(exitCallTimer);clearTimeout(exitFallback);clearTimeout(revealExitTimer);
 exitCallTimer=exitFallback=revealExitTimer=0;
}
function conceal(){
 marketRevealEpoch++;
 cancelDirectTimer();crystalEnterAt=0;clearExitTimers();closing=false;
 opened=false;wanted=false;nativeReached=false;
 document.documentElement.classList.remove('byz-v34-market-active');
 overlay?.classList.remove('byz-v33-open','byz-v33-covering','byz-v33-closing','byz-v106-direct');
 overlay?.setAttribute('aria-hidden','true');
 emit('byz:market:close');clearStatus();
}
function finishClosing(){
 if(!closing)return;
 // Give the blackout enough time to be perceptible on a fast native exit.
 const elapsed=performance.now()-closingStarted;
 const delay=Math.max(0,390-elapsed);
 clearTimeout(revealExitTimer);
 revealExitTimer=setTimeout(()=>{
  if(!closing)return;
  closing=false;opened=false;clearExitTimers();
  document.documentElement.classList.remove('byz-v34-market-active');
  // Opacity transitions the BLACK host off, revealing the finished crystal scene.
  overlay?.classList.remove('byz-v33-open','byz-v33-covering','byz-v33-closing','byz-v106-direct');
  overlay?.setAttribute('aria-hidden','true');
  emit('byz:market:close');clearStatus();
 },delay);
}
function closeMarket(options={}){
 if(closing)return true;
 const wasVisible=opened&&overlay?.isConnected&&overlay.classList.contains('byz-v106-direct');
 wanted=false;nativeReached=false;
 marketRevealEpoch++;cancelDirectTimer();crystalEnterAt=0;clearStatus();
 if(!wasVisible){
  conceal();
  if(!options.fromNative){const exit=window.__BYZ_MARKET_EXIT_TO_CRYSTALS;
   if(typeof exit==='function')exit();}
  return true;
 }
 closing=true;closingStarted=performance.now();
 // Keep the same gallery iframe and its exact frame still visible under a
 // fading-in black veil. Do not render a blank or reset the cards midfade.
 overlay.classList.add('byz-v33-closing');
 overlay.classList.remove('byz-v33-open','byz-v106-direct');
 if(!options.fromNative){
  exitCallTimer=setTimeout(()=>{
   if(!closing)return;
   const exit=window.__BYZ_MARKET_EXIT_TO_CRYSTALS;
   if(typeof exit==='function')exit();else finishClosing();
  },380);
 }
 // Safety fallback if the native state notification is not delivered.
 exitFallback=setTimeout(finishClosing,3100);
 log('gallery fades to black; native crystal exit underneath');return true;
}
// Support older/cached callers safely by starting the native transition.
window.__BYZ_V24_OPEN_MARKET__=()=>{
 const enter=window.__BYZ_MARKET_NATIVE_ENTER__;
 if(typeof enter==='function'){enter();return true;}
 prepareMarket();return false;
};
window.__BYZ_V24_CLOSE_MARKET__=()=>closeMarket();
window.__BYZ_V24_STATUS__=()=>({version:'106.0',marketReady,frameLoaded,connected:!!frame?.isConnected,recoveries,opened,wanted,nativeReached,preloadRequested,pathname:location.pathname});
function applyNative(detail){
 if(!detail)return;
 const index=Number(detail.index??detail.projectIndex??-1);
 const state=detail.status;
 if(closing){
  // Do not remove the black curtain on 'exiting': the crystal camera is still
  // reversing. Fade it away only after the scene reports 'exterior'.
  if(state==='exterior'||(state!=='exiting'&&detail.inside===false))finishClosing();
  return;
 }
 if(index===2&&(state==='entering'||state==='interior')){
  nativeReached=state==='interior';
  prepareMarket(state==='entering');
  if(nativeReached)revealDirect();
 }else if(state==='exiting'&&(wanted||opened)){
  closeMarket({fromNative:true});
 }else if(state==='exterior'||(index!==2&&wanted)){
  conceal();
 }
}
window.addEventListener('byz:market:route',ev=>applyNative(ev.detail));
window.addEventListener('byz:market:real-page',ev=>applyNative(ev.detail));
window.addEventListener('message',ev=>{
 if(ev.origin!==ORIGIN||!frame?.isConnected||ev.source!==frame.contentWindow)return;
 const type=ev.data?.type;
 if(type==='byz:market:gallery-ready'||type==='byz:market:ready'){
  marketReady=true;if(wanted)revealDirect();
 }
 if(type==='byz:market:error'&&wanted&&nativeReached)status('Market could not finish loading.',true);
 if(type==='byz:v24:exit-market')closeMarket();
});
window.addEventListener('keydown',ev=>{if((opened||wanted)&&ev.key==='Escape'){ev.preventDefault();closeMarket()}});
new MutationObserver(()=>{
 if(!overlay||overlay.isConnected||reconnectScheduled)return;
 reconnectScheduled=true;queueMicrotask(()=>{reconnectScheduled=false;mount()});
}).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
// Catch already-entering Market when this script arrives later than the scene store.
if(window.__BYZ_MARKET_CURRENT_ROUTE__)applyNative(window.__BYZ_MARKET_CURRENT_ROUTE__);
})();