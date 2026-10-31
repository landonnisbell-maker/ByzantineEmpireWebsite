(()=>{
'use strict';
// V113: preserve the V111 entrance exactly; synchronize exit crossfade with the actual camera retreat.
// Early-preloaded gallery crossfades before the raw prismatic interior.
// On exit the cloth keeps its original V111 reverse speed. The native return begins
// at the same time underneath it; reveal only on its real zoom-out milestone.
if(window.__BYZ_MARKET_V37__)return;
window.__BYZ_MARKET_V37__=true;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ORIGIN=location.origin;
const SHELL=new URL('index.html?embedded=1&v=111.0',document.currentScript.src).href;
const DEBUG=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...args)=>{if(DEBUG)console.info('[BYZ Market V111]',...args)};
let overlay=null,frame=null,frameLoaded=false,marketReady=false,preloadRequested=false;
let wanted=false,nativeReached=false,opened=false,recoveries=0,reconnectScheduled=false;
let safetyCover=false;
let closing=false,closingStarted=0,exitFallback=0,revealExitTimer=0,returnFadeTimer=0;
let returnFadeStartedAt=0;
let feedback=null,deadline=0;
// V103: replay the gallery's original Aengel intro only once it is actually visible.
// V110: the same Three.js card, ribbon and travel timeline can run backwards
// on Close. Give it its own visible exit phase before revealing the native zoom.
let marketRevealEpoch=0;
let galleryPreloadCheck=null;
// Native zoom-ready now fires 185ms later than V110 (~1.415s during the 1.6s zoom).
// Use a 90ms spin pre-lead so the gallery is moving at reveal.
// Shorten the opacity fade to 65ms so the native interior never flashes.
const DIRECT_SPIN_LEAD_MS=90;
// Do not alter the gallery renderer's 1.1s reverse playback, or the native
// camera's 0.8s traversal / 1.0s retreat. The native timeline itself notifies
// us when the retreat has begun; the fallback is only for older cached chunks.
const RETURN_CAMERA_FALLBACK_MS=1180;
const RETURN_FADE_MS=300;
const RETURN_SAFETY_MS=3200;
const STYLES=`
#byz-v33-market{position:fixed;inset:0;z-index:2147483000;opacity:0;visibility:visible;
 pointer-events:none;overflow:hidden;background:#000;transition:opacity .12s ease-out}
#byz-v33-market.byz-v33-covering,#byz-v33-market.byz-v33-open,
#byz-v33-market.byz-v33-closing{opacity:1;pointer-events:auto}
/* The gallery becomes visible during the last camera zoom segment. */
#byz-v33-market.byz-v106-direct{opacity:1;pointer-events:auto;transition:opacity .065s cubic-bezier(.22,1,.36,1)}
#byz-v33-market.byz-v33-covering{transition:opacity .26s ease-in}
#byz-v33-market.byz-v33-closing{transition:none}
/* V113: the exit fade starts when the native camera has actually begun its
   reverse movement, not at an arbitrary fraction of cloth playback. */
#byz-v33-market.byz-v108-returning{opacity:0;pointer-events:none;
 transition:opacity .30s cubic-bezier(.42,0,.58,1)}
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
/* No opaque veil on reverse: expose the exiting 3D camera directly. */
#byz-v33-market.byz-v33-closing::after,
#byz-v33-market.byz-v108-returning::after{opacity:0;transition:none}
/* Slow-load safety: a black cover fades over the zoom before native traversal
   exposes the empty interior. On readiness, dissolve black into a moving gallery.
   Normally preloading makes this branch unnecessary. */
#byz-v33-market.byz-v110-safety,
#byz-v33-market.byz-v110-recovering{opacity:1;pointer-events:auto;
 transition:opacity .24s ease-in}
#byz-v33-market.byz-v110-recovering>iframe{opacity:1;pointer-events:auto}
#byz-v33-market.byz-v110-recovering::after{opacity:0;
 transition:opacity .38s ease-out}
/* Keep the ORIGINAL website sound/menu controls over the Market frame.
   Do not copy or re-create any buttons: these are the live React controls. */
html.byz-v35-market-active nav[data-navbar][class*="Navbar-module_"]{
 position:fixed!important;inset:auto 0 auto 0!important;top:0!important;
 z-index:2147483400!important;opacity:1!important;visibility:visible!important;
 transform:translateY(0)!important;pointer-events:none!important;
 transition:opacity .2s ease!important;
}
html.byz-v35-market-active nav[data-navbar][class*="Navbar-module_"] button[class*="__sound"],
html.byz-v35-market-active nav[data-navbar][class*="Navbar-module_"] button[class*="__menu"]{
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
   overlay.classList.remove('byz-v33-open','byz-v33-covering','byz-v33-closing','byz-v106-direct','byz-v108-returning','byz-v110-safety','byz-v110-recovering');overlay.setAttribute('aria-hidden','true');
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
function engageSafetyCover(){
 if(!wanted||opened||closing||!nativeReached||marketReady||!overlay?.isConnected)return;
 safetyCover=true;
 overlay.setAttribute('aria-hidden','false');
 overlay.classList.add('byz-v110-safety');
 // Gallery remains hidden until genuinely pre-rendered; black is preferable
 // to exposing the unstyled internal prism on slow or disconnected devices.
 log('preload pending: mask native interior with safety cover');
}
function revealDirect(){
 // The camera-zoom marker is emitted by the ACTUAL GSAP entrance animation;
 // interior completion is retained as a backwards-compatible fallback.
 if(!wanted||!marketReady||!nativeReached||opened||closing)return;
 mount();if(!overlay?.isConnected)return;
 clearStatus();opened=true;
 const epoch=++marketRevealEpoch;
 overlay.setAttribute('aria-hidden','false');
 const fromSafety=safetyCover;
 // The gallery starts animating before its first visible frame.
 emit('byz:market:enter');
 emit('byz:market:replay-intro');
 emit('byz:market:visible');
 setTimeout(()=>{
  if(!opened||closing||!wanted||epoch!==marketRevealEpoch)return;
  requestAnimationFrame(()=>{
   if(!opened||closing||!wanted||epoch!==marketRevealEpoch)return;
   document.documentElement.classList.add('byz-v35-market-active');
   if(fromSafety){
    // Keep the solid cover until gallery paints, then animate the veil off.
    overlay.classList.add('byz-v110-recovering','byz-v106-direct');
    overlay.classList.remove('byz-v110-safety');
   }else{
    overlay.classList.add('byz-v106-direct');
   }
  });
 },DIRECT_SPIN_LEAD_MS);
 log('native zoom milestone: crossfade into moving gallery');
}
function prepareMarket(entering=false){
 if(closing)return;
 mount();startGalleryPreload('market requested');
 if(!wanted){
  wanted=true;
 }
 if(frameLoaded){emit('byz:market:prewarm');emit('byz:market:ping');}
 if(marketReady)revealDirect();
 else if(nativeReached){
  engageSafetyCover();
  status('Preparing Market…');
  if(!deadline)deadline=setTimeout(()=>{deadline=0;if(wanted&&!marketReady)status('Market could not finish loading.',true)},30000);
 }
}
function clearExitTimers(){
 clearTimeout(exitFallback);clearTimeout(revealExitTimer);clearTimeout(returnFadeTimer);
 exitFallback=revealExitTimer=returnFadeTimer=0;
}
function conceal(){
 marketRevealEpoch++;clearExitTimers();closing=false;returnFadeStartedAt=0;
 opened=false;wanted=false;nativeReached=false;safetyCover=false;
 document.documentElement.classList.remove('byz-v35-market-active');
 overlay?.classList.remove('byz-v33-open','byz-v33-covering','byz-v33-closing','byz-v106-direct','byz-v108-returning','byz-v110-safety','byz-v110-recovering');
 overlay?.setAttribute('aria-hidden','true');
 emit('byz:market:close');clearStatus();
}
function finishClosing(){
 if(!closing)return;
 // When the native camera reports exterior (or the safety fallback fires),
 // wait only for any IN-PROGRESS crossfade to finish; never shorten the native
 // 3D movement itself to make the overlay disappear sooner.
 if(!returnFadeStartedAt)beginReturnFade();
 const remaining=Math.max(0,RETURN_FADE_MS+45-(performance.now()-returnFadeStartedAt));
 clearTimeout(revealExitTimer);
 revealExitTimer=setTimeout(()=>{
  if(!closing)return;
  conceal();
  log('return to crystal complete');
 },remaining);
}
function beginReturnFade(){
 if(!closing||!overlay?.isConnected||returnFadeStartedAt)return;
 // The native GSAP camera-retreat checkpoint is reached: the raw prism has
 // passed. The cloth animation is still running at its unchanged V111 speed.
 returnFadeStartedAt=performance.now();
 clearTimeout(returnFadeTimer);returnFadeTimer=0;
 document.documentElement.classList.remove('byz-v35-market-active');
 overlay.classList.add('byz-v108-returning');
 log('native camera retreat is visible: dissolve moving cloth into crystals');
}
function triggerNativeReturn(){
 if(!closing)return;
 const exit=window.__BYZ_MARKET_EXIT_TO_CRYSTALS;
 if(typeof exit==='function')exit();
 else log('native exit handler unavailable: waiting for fallback');
}
function closeMarket(options={}){
 if(closing)return true;
 const wasVisible=opened&&overlay?.isConnected&&overlay.classList.contains('byz-v106-direct');
 wanted=false;nativeReached=false;
 marketRevealEpoch++;clearStatus();
 if(!wasVisible){
  conceal();
  if(!options.fromNative){
   const exit=window.__BYZ_MARKET_EXIT_TO_CRYSTALS;
   if(typeof exit==='function')exit();
  }
  return true;
 }
 closing=true;closingStarted=performance.now();
 // Keep gallery visible and interactive for the first frame while its Three.js
 // carousel jumps to settled position and starts playing the real intro BACKWARD.
 overlay.classList.add('byz-v33-closing');
 overlay.classList.remove('byz-v33-open','byz-v106-direct','byz-v108-returning','byz-v109-safety','byz-v109-recovering');
 overlay.setAttribute('aria-hidden','false');
 emit('byz:market:reverse-intro');
 // Start the NATIVE camera timeline while the 1.1s cloth reverse begins.
 // Neither animation is accelerated; they run concurrently rather than serially.
 // If the store already sent the exit event, its native timeline is running.
 if(!options.fromNative)triggerNativeReturn();
 // Cached chunk fallback: by this point the unmodified native animation has
 // moved into its real reverse camera leg, so the grey prism cannot flash.
 returnFadeTimer=setTimeout(()=>{returnFadeTimer=0;beginReturnFade()},RETURN_CAMERA_FALLBACK_MS);
 exitFallback=setTimeout(()=>{exitFallback=0;finishClosing()},RETURN_SAFETY_MS);
 log('reverse cloth and native return concurrently; reveal at camera-ready event');
 return true;
}
// Support older/cached callers safely by starting the native transition.
window.__BYZ_V24_OPEN_MARKET__=()=>{
 const enter=window.__BYZ_MARKET_NATIVE_ENTER__;
 if(typeof enter==='function'){enter();return true;}
 prepareMarket();return false;
};
window.__BYZ_V24_CLOSE_MARKET__=()=>closeMarket();
window.__BYZ_V24_STATUS__=()=>({version:'113.0',marketReady,frameLoaded,connected:!!frame?.isConnected,recoveries,opened,wanted,nativeReached,preloadRequested,pathname:location.pathname});
function applyNative(detail){
 if(!detail)return;
 const index=Number(detail.index??detail.projectIndex??-1);
 const state=detail.status;
 if(closing){
  // Keep the overlay until the reverse fade finishes; native 'exterior'
  // completes the cleanup, not the start of the return animation.
  if(state==='exterior'||(state!=='exiting'&&detail.inside===false))finishClosing();
  return;
 }
 if(index===2&&(state==='entering'||state==='interior')){
  nativeReached=nativeReached||state==='interior';
  prepareMarket(state==='entering');
  if(nativeReached)revealDirect();
 }else if(state==='exiting'&&(wanted||opened)){
  closeMarket({fromNative:true});
 }else if(state==='exterior'||(index!==2&&wanted)){
  conceal();
 }
}
// Exact native camera-move checkpoint, before the gallery's undesired
// WebGL interior background would take over the screen.
window.addEventListener('byz:market:zoom-ready',ev=>{
 if(Number(ev.detail?.index)!==2||closing||!wanted)return;
 nativeReached=true;
 if(marketReady)revealDirect();else engageSafetyCover();
});
// Real native GSAP exit checkpoint, at the start of the camera's return to
// the exterior crystals. This replaces V112's blind early-opacity timer.
window.addEventListener('byz:market:return-camera-ready',ev=>{
 if(!closing||Number(ev.detail?.index)!==2)return;
 beginReturnFade();
});
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