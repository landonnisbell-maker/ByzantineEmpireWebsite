(()=>{
'use strict';
if(window.__BYZ_V24_PAGE_INSTALLED__)return;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ROOT='/ByzantineEmpireWebsite/';
const MARKET=ROOT+'market/';
const log=(...a)=>{if(new URLSearchParams(location.search).has('byzmarketdebug'))console.log('[BYZ V24]',...a)};
let overlay=null,frame=null,open=false,frameReady=false,originalUrl=location.href;
let nativeNav=null,navListenerInstalled=false,styleInstalled=false;

// V29: the real GitHub navbar (and its React handlers) is kept above the
// independent marketplace. We do NOT duplicate its menu or patch the loader.
function installMarketChrome(){
 if(!styleInstalled){
   styleInstalled=true;
   const style=document.createElement('style');
   style.id='byz-v29-market-chrome';
   style.textContent=`
body.byz-v29-market-open nav[class*="Navbar-module_"][class*="__nav"] {
 z-index:2147483200!important;visibility:visible!important;opacity:1!important;
 transform:translateY(0)!important;pointer-events:none!important;
}
body.byz-v29-market-open nav[class*="Navbar-module_"][class*="__nav"] button,
body.byz-v29-market-open nav[class*="Navbar-module_"][class*="__nav"] a {
 pointer-events:auto!important;
}
/* Return to Crystals occupies the left side; avoid overlapping original logo. */
body.byz-v29-market-open nav[class*="Navbar-module_"] [class*="logoWrap"] {opacity:0!important;pointer-events:none!important;}
@media(prefers-reduced-motion:reduce){#byz-v24-market-page{transition-duration:.2s!important;}}
`;
   document.head.appendChild(style);
 }
 const nav=document.querySelector('nav[class*="Navbar-module_"][class*="__nav"]');
 if(!nav||nav===nativeNav && navListenerInstalled)return;
 nativeNav=nav;
 if(!navListenerInstalled){
  navListenerInstalled=true;
  // Menu/volume toggles stay fully native. When a navigation item is used,
  // dismiss only Market, letting the site's original React handler proceed.
  document.addEventListener('click',event=>{
    if(!open)return;
    const item=event.target?.closest?.('nav[class*="Navbar-module_"] a,nav[class*="Navbar-module_"] button');
    if(!item)return;
    const cl=String(item.className||'');
    if(/(?:sound|menu|availability)/i.test(cl))return;
    setTimeout(()=>{if(open)closeMarket();},0);
  },true);
 }
}

function send(type){try{frame?.contentWindow?.postMessage({type},location.origin)}catch(e){log('send',e)}}
function mount(){
 installMarketChrome();
 if(overlay||!document.body)return;
 overlay=document.createElement('div');
 overlay.id='byz-v24-market-page';
 overlay.setAttribute('aria-label','Byzantine Market page');
 // Keep the iframe in a real full-size viewport for WebGL preloading. It is never display:none.
 overlay.style.cssText='position:fixed;inset:0;z-index:2147483000;overflow:hidden;background:#08090b;opacity:0;pointer-events:none;clip-path:circle(0% at 50% 47%);transform:scale(1.065);transition:opacity .75s cubic-bezier(.22,1,.36,1),clip-path 1.18s cubic-bezier(.16,1,.3,1),transform 1.28s cubic-bezier(.16,1,.3,1);will-change:opacity,transform,clip-path;';
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
 installMarketChrome();
 document.body.classList.add('byz-v29-market-open');
 overlay.style.clipPath='circle(0% at 50% 47%)';
 overlay.style.transform='scale(1.065)';
 overlay.inert=false;
 overlay.setAttribute('aria-hidden','false');
 overlay.style.pointerEvents='auto';
 // Fade to the complete new page; the legacy Market WebGL interior is not entered.
 requestAnimationFrame(()=>requestAnimationFrame(()=>{if(open){overlay.style.opacity='1';overlay.style.clipPath='circle(155% at 50% 47%)';overlay.style.transform='scale(1)';}}));
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
 document.body.classList.remove('byz-v29-market-open');
 overlay.style.opacity='0';
 overlay.style.clipPath='circle(0% at 50% 47%)';
 overlay.style.transform='scale(1.065)';
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
function init(){mount();installMarketChrome()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.__BYZ_V24_STATUS__=()=>({open,frameReady,pageUrl:MARKET,frame:frame?.src,hasOverlay:!!overlay,version:'V29-native-nav-cinematic'});
})();