(()=>{
'use strict';
if(window.__BYZ_V24_PAGE_INSTALLED__)return;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ROOT='/ByzantineEmpireWebsite/';
const MARKET=ROOT+'market/';
const log=(...a)=>{if(new URLSearchParams(location.search).has('byzmarketdebug'))console.log('[BYZ V24]',...a)};
let overlay=null,frame=null,open=false,frameReady=false,originalUrl=location.href;
function send(type){try{frame?.contentWindow?.postMessage({type},location.origin)}catch(e){log('send',e)}}
function mount(){
 if(overlay||!document.body)return;
 overlay=document.createElement('div');
 overlay.id='byz-v24-market-page';
 overlay.setAttribute('aria-label','Byzantine Market page');
 // Keep the iframe in a real full-size viewport for WebGL preloading. It is never display:none.
 overlay.style.cssText='position:fixed;inset:0;z-index:2147483000;overflow:hidden;background:#08090b;opacity:0;pointer-events:none;transition:opacity .7s cubic-bezier(.22,1,.36,1);will-change:opacity;';
 frame=document.createElement('iframe');
 frame.id='byz-v24-market-document';
 frame.title='ta pánta pazári — Market';
 frame.src=MARKET+'index.html?embedded=1';
 frame.loading='eager';
 frame.allow='autoplay; fullscreen';
 frame.style.cssText='display:block;width:100%;height:100%;border:0;background:#090b0d;';
 overlay.appendChild(frame);
 overlay.inert=true;
 overlay.setAttribute('aria-hidden','true');
 document.body.appendChild(overlay);
 frame.addEventListener('load',()=>{frameReady=true;if(open)send('byz:market:enter');log('iframe-loaded')});
 log('separate-page-preload-mounted');
}
function reveal(){
 mount();if(!overlay)return;
 if(open)return;
 open=true;
 overlay.inert=false;
 overlay.setAttribute('aria-hidden','false');
 overlay.style.pointerEvents='auto';
 // Fade to the complete new page; the legacy Market WebGL interior is not entered.
 requestAnimationFrame(()=>{if(open)overlay.style.opacity='1'});
 send('byz:market:enter');
 log('open-new-market',frameReady);
}
function openMarket(){
 // Called synchronously by native Crystal 3 selection. Never enters old Market interior.
 if(!open){
   if(location.pathname!==MARKET){
     history.pushState({byzV24Market:true},'',MARKET);
   }
   reveal();
 }
 return true;
}
function closeMarket({fromHistory=false}={}){
 if(!open)return;
 open=false;
 overlay.style.opacity='0';
 overlay.style.pointerEvents='none';
 overlay.inert=true;
 overlay.setAttribute('aria-hidden','true');
 send('byz:market:close');
 if(!fromHistory && location.pathname===MARKET){
   // No navigation, no loader: the original site remains mounted at its exact crystal position.
   history.replaceState({byzV24Market:false},'',originalUrl);
 }
 log('return-to-crystals');
}
window.__BYZ_V24_OPEN_MARKET__=openMarket;
window.__BYZ_V24_CLOSE_MARKET__=closeMarket;
window.addEventListener('popstate',()=>{
 if(location.pathname===MARKET)reveal();
 else closeMarket({fromHistory:true});
});
window.addEventListener('message',e=>{
 if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
 if(e.data?.type==='byz:v24:exit-market')closeMarket();
});
window.addEventListener('keydown',e=>{
 if(open && e.key==='Escape'){
  // The iframe handles Escape for product-specific UI; parent Escape closes the Market page.
  closeMarket();
 }
});
function init(){mount()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.__BYZ_V24_STATUS__=()=>({open,frameReady,pageUrl:MARKET,frame:frame?.src,hasOverlay:!!overlay});
})();