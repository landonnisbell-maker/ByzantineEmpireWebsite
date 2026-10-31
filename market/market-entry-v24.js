(()=>{
'use strict';
// V102: Preserve the native Market crystal camera zoom before covering the later
// grey/refraction traversal with black. Reveal the already-warmed gallery when
// the native interior state and gallery-ready signal are both true.
if(window.__BYZ_MARKET_V34__)return;
window.__BYZ_MARKET_V34__=true;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ORIGIN=location.origin;
const SHELL=new URL('index.html?embedded=1&v=104.0',document.currentScript.src).href;
const DEBUG=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...args)=>{if(DEBUG)console.info('[BYZ Market V103]',...args)};
let overlay=null,frame=null,frameLoaded=false,marketReady=false,preloadRequested=false;
let wanted=false,nativeReached=false,opened=false,recoveries=0,reconnectScheduled=false;
let feedback=null,deadline=0;
// V103: replay the gallery's original Aengel intro only once it is actually visible.
let marketRevealEpoch=0;
let galleryPreloadCheck=null;
// The original WebGL entrance starts a 1.6s camera move; its shader traversal
// begins at about 1.15s. Do NOT cover the initial crystal zoom.
const CRYSTAL_ZOOM_VISIBLE_MS=1100;
let zoomCoverTimer=0;
function cancelZoomCover(){if(zoomCoverTimer){clearTimeout(zoomCoverTimer);zoomCoverTimer=0;}}
const STYLES=`
#byz-v33-market{position:fixed;inset:0;z-index:2147483000;opacity:0;visibility:visible;
 pointer-events:none;overflow:hidden;background:#000;transition:opacity .12s ease-out}
#byz-v33-market.byz-v33-covering,#byz-v33-market.byz-v33-open{opacity:1;pointer-events:auto}
#byz-v33-market.byz-v33-covering{transition:opacity .26s ease-in}
#byz-v33-market>iframe{display:block;width:100%;height:100%;border:0;background:#000;opacity:0;pointer-events:none}
/* A cheap, fixed black veil fades over a PRE-RENDERED gallery frame. The iframe
   itself must never jump from transparent to opaque on its first WebGL paint. */
#byz-v33-market.byz-v33-covering>iframe,#byz-v33-market.byz-v33-open>iframe{opacity:1}
#byz-v33-market.byz-v33-open>iframe{pointer-events:auto}
#byz-v33-market::after{content:"";position:absolute;inset:0;background:#000;opacity:1;pointer-events:none;z-index:2;transition:opacity .78s cubic-bezier(.2,.72,.16,1)}
#byz-v33-market.byz-v33-open::after{opacity:0}
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
function scheduleGalleryPreload(){
 if(preloadRequested||galleryPreloadCheck)return;
 const begun=performance.now();
 const check=()=>{
  if(preloadRequested){clearInterval(galleryPreloadCheck);galleryPreloadCheck=null;return;}
  const btn=document.querySelector('[data-testid="loader-enter"]');
  const spinner=document.querySelector('[class*="loaderContainer"]');
  if((btn&&!btn.disabled)||(!spinner&&document.readyState==='complete')||performance.now()-begun>20000){
   clearInterval(galleryPreloadCheck);galleryPreloadCheck=null;
   if('requestIdleCallback' in window)requestIdleCallback(()=>startGalleryPreload('main ready'),{timeout:1800});
   else setTimeout(()=>startGalleryPreload('main ready'),400);
  }
 };
 galleryPreloadCheck=setInterval(check,450);check();
}
function mount(){
 if(!document.body)return;
 if(overlay){
  if(!overlay.isConnected){
   frameLoaded=false;marketReady=false;preloadRequested=false;opened=false;recoveries++;
   overlay.classList.remove('byz-v33-open','byz-v33-covering');overlay.setAttribute('aria-hidden','true');
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
 scheduleGalleryPreload();
}
function status(message,canRetry=false){
 if(!feedback){feedback=document.createElement('div');feedback.id='byz-market-feedback';feedback.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483002;background:#101014ee;color:#fff;padding:12px 18px;border:1px solid #ffffff40;font:13px system-ui;text-align:center;max-width:85vw';feedback.setAttribute('role','status')}
 feedback.replaceChildren(document.createTextNode(message));
 if(canRetry){let b=document.createElement('button');b.textContent='Retry Market';b.style.cssText='margin-left:14px;padding:7px 12px;cursor:pointer';b.onclick=()=>{marketReady=false;frameLoaded=false;frame.src=SHELL+'&retry='+Date.now();b.remove();};feedback.appendChild(b)}
 if(!feedback.isConnected)document.body.appendChild(feedback);
}
function clearStatus(){if(deadline){clearTimeout(deadline);deadline=0;}feedback?.remove()}
function coverWithBlack(){
 mount();if(!overlay?.isConnected)return;
 overlay.setAttribute('aria-hidden','false');
 overlay.classList.add('byz-v33-covering');
 // No iframe is shown until both the gallery and native handoff are ready.
}
function reveal(){
 if(!wanted||!nativeReached||!marketReady||opened)return;
 mount();if(!overlay?.isConnected)return;
 clearStatus();opened=true;document.documentElement.classList.add('byz-v34-market-active');overlay.setAttribute('aria-hidden','false');emit('byz:market:enter');
 const revealEpoch=++marketRevealEpoch;
 requestAnimationFrame(()=>{
  if(!opened||revealEpoch!==marketRevealEpoch)return;
  // The covering state was committed during the crystal zoom, so the black
  // curtain can now fade smoothly into the already-rendered gallery.
  overlay.classList.add('byz-v33-open');
  emit('byz:market:visible');
  // The cards were prewarmed offscreen. Restart their native (2.2s) spin
  // just after the iframe fade begins; never restart the 3D/gallery assets.
  setTimeout(()=>{
   if(opened&&wanted&&nativeReached&&revealEpoch===marketRevealEpoch)
    emit('byz:market:replay-intro');
  },120);
 });
 log('native interior COMPLETE — gallery revealed');
}
function prepareMarket(preserveCrystalZoom=false){
 mount();startGalleryPreload('market requested');
 // The gallery keeps prewarming in its existing iframe while the actual 3D
 // crystal moves toward the camera. Only the late shader handoff is black.
 if(!wanted && preserveCrystalZoom && !nativeReached){
  cancelZoomCover();
  zoomCoverTimer=setTimeout(()=>{
   zoomCoverTimer=0;
   if(wanted&&!nativeReached)coverWithBlack();
  },CRYSTAL_ZOOM_VISIBLE_MS);
 }
 wanted=true;
 if(!preserveCrystalZoom||nativeReached){cancelZoomCover();coverWithBlack();}
 if(frameLoaded){emit('byz:market:prewarm');emit('byz:market:ping');}
 if(nativeReached){
  if(marketReady)reveal();else{
   status('Preparing Market…');
   if(!deadline)deadline=setTimeout(()=>{deadline=0;if(wanted&&nativeReached&&!marketReady)status('Market could not finish loading.',true)},30000);
  }
 }
}
function conceal(){
 marketRevealEpoch++;
 cancelZoomCover();
 opened=false;document.documentElement.classList.remove('byz-v34-market-active');overlay?.classList.remove('byz-v33-open','byz-v33-covering');overlay?.setAttribute('aria-hidden','true');emit('byz:market:close');clearStatus();
}
function closeMarket(options={}){
 wanted=false;nativeReached=false;conceal();
 // This is the original project store action used by the other crystals.
 // The native WebGL camera/stone-reversal runs underneath the Market page.
 if(!options.fromNative){
  const exit=window.__BYZ_MARKET_EXIT_TO_CRYSTALS;
  if(typeof exit==='function')exit();
 }
 log('native crystal exit requested');return true;
}
// Support older/cached callers safely by starting the native transition.
window.__BYZ_V24_OPEN_MARKET__=()=>{
 const enter=window.__BYZ_MARKET_NATIVE_ENTER__;
 if(typeof enter==='function'){enter();return true;}
 prepareMarket();return false;
};
window.__BYZ_V24_CLOSE_MARKET__=()=>closeMarket();
window.__BYZ_V24_STATUS__=()=>({version:'104.0',marketReady,frameLoaded,connected:!!frame?.isConnected,recoveries,opened,wanted,nativeReached,preloadRequested,pathname:location.pathname});
function applyNative(detail){
 if(!detail)return;
 // Native store drives every one of the original camera transitions:
 // entering -> interior -> exiting -> exterior.
 const index=Number(detail.index??detail.projectIndex??-1);
 const state=detail.status;
 if(index===2&&(state==='entering'||state==='interior')){
  nativeReached=state==='interior';
  prepareMarket(state==='entering');
  if(nativeReached)reveal();
 }else if(state==='exiting'||state==='exterior'||(index!==2&&wanted)){
  wanted=false;nativeReached=false;conceal();
 }
}
window.addEventListener('byz:market:route',ev=>applyNative(ev.detail));
window.addEventListener('byz:market:real-page',ev=>applyNative(ev.detail));
window.addEventListener('message',ev=>{
 if(ev.origin!==ORIGIN||!frame?.isConnected||ev.source!==frame.contentWindow)return;
 const type=ev.data?.type;
 if(type==='byz:market:gallery-ready'||type==='byz:market:ready'){
  marketReady=true;if(wanted&&nativeReached)reveal();
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