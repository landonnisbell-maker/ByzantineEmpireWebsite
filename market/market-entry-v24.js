(()=>{
'use strict';
// V32: React may replace <body> during hydration recovery. Keep the external
// Market host connected, and replay readiness instead of waiting on a dead frame.
// No changes to the React loader, crystal click handlers, router or core chunks.
if(window.__BYZ_MARKET_V32__)return;
window.__BYZ_MARKET_V32__=true;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ORIGIN=location.origin;
const SHELL=new URL('index.html?embedded=1&v=32',document.currentScript.src).href;
const DEBUG=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...a)=>{if(DEBUG)console.info('[BYZ Market V32]',...a)};
let overlay,frame,marketReady=false,frameLoaded=false,opened=false,wanted=false,preloadRequested=false;
let zoomAnim=null,zoomCanvas=null,hideTimer=0;
let recoveries=0,reconnectScheduled=false,feedback,deadline=0;
const STYLES=`
#byz-v31-market{
 position:fixed;inset:0;z-index:2147483000;opacity:0;pointer-events:none;
 visibility:visible;clip-path:none;
 transform:scale(1.055);transform-origin:50% 50%;background:#090a0d;
 transition:opacity .73s cubic-bezier(.22,1,.36,1),clip-path .93s cubic-bezier(.16,1,.3,1),transform .93s cubic-bezier(.16,1,.3,1);
 overflow:hidden;will-change:opacity,clip-path,transform;
}
#byz-v31-market.byz-v31-open{opacity:1;clip-path:circle(145% at 50% 50%);transform:scale(1);pointer-events:auto;}
#byz-v31-market > iframe{display:block;width:100%;height:100%;border:0;background:#090a0d}
@media(prefers-reduced-motion:reduce){#byz-v31-market{transition-duration:.15s!important}}
`;
function emit(type){try{frame?.contentWindow?.postMessage({type},ORIGIN)}catch(e){log('message',e)}}
function mount(){
 if(!document.body)return;
 if(overlay){
   if(!overlay.isConnected){
     // Reconnecting an iframe starts a new document. Discard its old ready flag.
     marketReady=false;frameLoaded=false;recoveries++;
     const wasOpen=opened;opened=false;wanted=wanted||wasOpen;
     overlay.classList.remove('byz-v31-open');
     overlay.setAttribute('aria-hidden','true');
     document.body.appendChild(overlay);
     log('restored Market frame after React replaced its host',recoveries);
   }
   return;
 }
 const style=document.createElement('style');style.id='byz-v31-market-style';style.textContent=STYLES;document.head.appendChild(style);
 overlay=document.createElement('section');overlay.id='byz-v31-market';
 overlay.setAttribute('aria-label','Byzantine marketplace');
 overlay.setAttribute('aria-hidden','true');
 // Keep nested WebGL renderers active while transparent; pointer events are disabled.
 // Do NOT make the prewarmed iframe inert or clip its rendering area to zero.
 frame=document.createElement('iframe');frame.id='byz-v31-market-frame';
 frame.title='ta pánta pazári — Market';frame.allow='autoplay; fullscreen';frame.loading='eager';
 frame.tabIndex=-1;overlay.appendChild(frame);document.body.appendChild(overlay);
 frame.addEventListener('load',()=>{
   if(!frame.isConnected)return;
   frameLoaded=true;log('market shell loaded');
   emit('byz:market:prewarm');emit('byz:market:ping');
 });
 // Start early enough to share initial loading period, but yield the first paint to the primary scene.
 const begin=()=>{if(preloadRequested)return;preloadRequested=true;frame.src=SHELL;log('background preload started');};
 if('requestIdleCallback'in window){window.requestIdleCallback(begin,{timeout:900});}
 else setTimeout(begin,250);
}
function showFeedback(message,retry=false){
 if(!feedback){
   feedback=document.createElement('div');feedback.id='byz-market-feedback';
   feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
   feedback.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483002;background:#101014ee;color:white;padding:12px 18px;border:1px solid #ffffff40;font:13px system-ui;text-align:center;max-width:85vw';
 }
 feedback.replaceChildren(document.createTextNode(message));
 if(retry){
   const button=document.createElement('button');button.textContent='Retry Market';
   button.style.cssText='margin-left:14px;padding:7px 12px;cursor:pointer';
   button.onclick=()=>{
     marketReady=false;frameLoaded=false;mount();
     frame.src=SHELL+'&retry='+Date.now();requestOpen();
   };
   feedback.appendChild(button);
 }
 if(!feedback.isConnected)document.body.appendChild(feedback);
}
function clearFeedback(){clearTimeout(deadline);deadline=0;feedback?.remove();}
function findMainScene(){
 let best=null,area=0;
 for(const c of document.querySelectorAll('canvas')){
   if(overlay?.contains(c))continue;
   const r=c.getBoundingClientRect(),a=r.width*r.height;
   if(a>area && r.width>innerWidth*.35 && r.height>innerHeight*.35){best=c;area=a}
 }
 return best;
}
function startZoom(){
 try{
   const c=findMainScene();if(!c)return;
   if(zoomAnim&&zoomCanvas!==c){zoomAnim.cancel();zoomAnim=null;}
   zoomCanvas=c;
   if(zoomAnim){zoomAnim.playbackRate=1;zoomAnim.play();return;}
   zoomAnim=c.animate([{transform:'scale(1)',filter:'brightness(1)'},{transform:'scale(1.22)',filter:'brightness(.82)'}],{duration:950,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
 }catch(err){log('canvas zoom unavailable',String(err))}
}
function reverseZoom(){
 if(!zoomAnim)return;
 try{zoomAnim.reverse();zoomAnim.onfinish=()=>{if(!opened){zoomAnim?.cancel();zoomAnim=null;zoomCanvas=null}}}catch(e){zoomAnim.cancel();zoomAnim=null;zoomCanvas=null}
}
function reveal(){
 if(!wanted||opened||!marketReady)return;
 mount();if(!overlay?.isConnected||!marketReady)return;
 clearFeedback();
 opened=true;clearTimeout(hideTimer);
 overlay.style.pointerEvents='';
 overlay.setAttribute('aria-hidden','false');
 // Crystal-view zoom is composited with the new Market reveal. The native navigation stores are untouched.
 startZoom();emit('byz:market:enter');
 // Do not clip the iframe during preloading. Apply the circular mask only
 // immediately before beginning the reveal, after both renderers have started.
 overlay.style.clipPath='circle(0% at 50% 50%)';
 requestAnimationFrame(()=>requestAnimationFrame(()=>{if(opened){overlay.style.clipPath='';overlay.classList.add('byz-v31-open');log('revealed prepared market')}}));
}
function requestOpen(){
 wanted=true;
 mount();
 if(marketReady)reveal();
 else {
   if(frameLoaded){emit('byz:market:prewarm');emit('byz:market:ping');}
   showFeedback('Preparing Market…');
   // Never silently swallow both entry actions if a child renderer fails.
   if(!deadline)deadline=setTimeout(()=>{
     deadline=0;if(wanted&&!marketReady)showFeedback('Market could not finish loading.',true);
   },30000);
   log('entry queued until prewarmed — original crystal scene stays visible');
 }
 return true;
}
function closeMarket(){
 wanted=false;
 clearFeedback();deadline=0;
 if(!opened)return true;
 opened=false;emit('byz:market:close');
 overlay.classList.remove('byz-v31-open');
 overlay.style.clipPath='circle(0% at 50% 50%)';
 overlay.style.pointerEvents='none';overlay.setAttribute('aria-hidden','true');
 reverseZoom();
 hideTimer=setTimeout(()=>{if(!opened){overlay.style.pointerEvents='none';overlay.style.clipPath='none';}},1000);
 log('reverse zoom to preserved crystal scene');
 return true;
}
window.__BYZ_V24_OPEN_MARKET__=requestOpen;
window.__BYZ_V24_CLOSE_MARKET__=closeMarket;
window.__BYZ_V24_STATUS__=()=>({version:'32.0',marketReady,frameLoaded,connected:!!frame?.isConnected,recoveries,open:opened,requested:wanted,preloadRequested,pathname:location.pathname});
window.addEventListener('message',event=>{
 if(event.origin!==ORIGIN||!frame?.isConnected||event.source!==frame.contentWindow)return;
 const type=event.data?.type;
 if(type==='byz:market:ready'){
   marketReady=true;log('market gallery and Palia confirmed prepared');
   if(wanted)reveal();
 }
 // The product renderer has its own readiness gate. A ready cloth gallery can
 // open independently; a slow product renderer must not disable Market entry.
 if(type==='byz:market:gallery-ready'){
   marketReady=true;log('cloth gallery ready');if(wanted)reveal();
 }
 if(type==='byz:market:error'&&wanted)showFeedback('Market could not finish loading.',true);
 if(type==='byz:v24:exit-market')closeMarket();
});
window.addEventListener('keydown',ev=>{if((opened||wanted)&&ev.key==='Escape'){ev.preventDefault();closeMarket()}});
// React owns the body contents; module-level references alone do not establish
// that our DOM still exists. Reattach once after each actual removal.
new MutationObserver(()=>{
 if(!overlay||overlay.isConnected||reconnectScheduled)return;
 reconnectScheduled=true;queueMicrotask(()=>{reconnectScheduled=false;mount()});
}).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
