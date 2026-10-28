(()=>{
'use strict';
// Stability patch V30. Do not change the browser URL or touch the main website loader.
if(window.__BYZ_V30_STABLE_INSTALLED__)return;
window.__BYZ_V30_STABLE_INSTALLED__=true;
window.__BYZ_V24_PAGE_INSTALLED__=true;
const ROOT='/ByzantineEmpireWebsite/';
const PAGE=ROOT+'market/index.html?embedded=1&v=30.0';
const debug=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...args)=>{if(debug)console.info('[BYZ Market V30]',...args)};
let overlay=null,frame=null,veil=null,retry=null;
let opened=false,ready=false,revealJob=0,loadTimeout=null;
function send(type){try{frame?.contentWindow?.postMessage({type},location.origin)}catch(e){log('postMessage error',e)}}
function create(){
 if(overlay||!document.body)return;
 overlay=document.createElement('section');
 overlay.id='byz-v24-market-page'; // Retain established integration hook.
 overlay.setAttribute('aria-label','Byzantine Market');
 overlay.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#090a0d;opacity:0;pointer-events:none;visibility:hidden;overflow:hidden;transition:opacity .52s cubic-bezier(.22,1,.36,1);';
 frame=document.createElement('iframe');
 frame.id='byz-v24-market-document';
 frame.title='ta pánta pazári — Market';
 frame.allow='autoplay;fullscreen';
 frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;background:#090a0d;opacity:0;transition:opacity .55s ease;';
 veil=document.createElement('div');
 veil.id='byz-market-v30-preparing';
 veil.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:15px;color:#ece9e5;font:600 12px/1.5 system-ui,sans-serif;letter-spacing:.18em;background:radial-gradient(circle at center,#20232c,#090a0d 70%);transition:opacity .45s ease;';
 veil.innerHTML='<div style="font-size:12px;letter-spacing:.25em">TA PÁNTA PAZÁRI</div><div style="font-size:11px;opacity:.7">OPENING MARKET</div>';
 const btn=document.createElement('button');
 btn.type='button';btn.textContent='RETURN TO CRYSTALS';
 btn.style.cssText='cursor:pointer;color:#d8d8dc;background:transparent;border:1px solid #ffffff55;padding:12px 15px;font:600 10px system-ui,sans-serif;letter-spacing:.1em;';
 btn.addEventListener('click',()=>closeMarket());
 veil.appendChild(btn);
 retry=document.createElement('button');
 retry.type='button';retry.textContent='RETRY MARKET';
 retry.style.cssText='display:none;cursor:pointer;color:white;background:#1d2028;border:1px solid #ffffff55;padding:12px 15px;font:600 10px system-ui,sans-serif;letter-spacing:.1em;';
 retry.addEventListener('click',()=>{ready=false;frame.src=PAGE+'&retry='+Date.now();veil.style.opacity='1';veil.style.pointerEvents='auto';frame.style.opacity='0';retry.style.display='none';});
 veil.appendChild(retry);
 overlay.append(frame,veil);
 overlay.inert=true;
 overlay.setAttribute('aria-hidden','true');
 document.body.appendChild(overlay);
 // No eager frame at startup: prevent multiple WebGL apps competing with the main loader.
 frame.addEventListener('load',()=>{
  ready=true;
  clearTimeout(loadTimeout);
  log('market shell loaded');
  if(opened){send('byz:market:enter');scheduleReveal();}
 });
 frame.addEventListener('error',()=>{if(opened){retry.style.display='block';log('market shell load failed')}});
 frame.src=PAGE;
 log('market frame first mounted; main site remains mounted');
}
function scheduleReveal(){
 if(!opened||!ready)return;
 clearTimeout(revealJob);
 // Allow the embedded gallery to receive its enter message and begin its transition.
 revealJob=setTimeout(()=>{
   if(!opened)return;
   frame.style.opacity='1';
   veil.style.opacity='0';
   veil.style.pointerEvents='none';
   log('market gallery revealed');
 },850);
}
function openMarket(){
 if(opened)return true;
 opened=true;
 create();
 if(!overlay){opened=false;return false;}
 overlay.inert=false;
 overlay.setAttribute('aria-hidden','false');
 overlay.style.visibility='visible';
 overlay.style.pointerEvents='auto';
 requestAnimationFrame(()=>{if(opened)overlay.style.opacity='1'});
 // Critically: NO pushState/replaceState/assign to /market/.
 // Refreshing the browser must always reload the main crystal website.
 if(ready){send('byz:market:enter');scheduleReveal();}
 else{
   loadTimeout=setTimeout(()=>{if(opened&&!ready){retry.style.display='block';log('market frame delayed')}},20000);
 }
 log('market-opened',location.pathname,'frame ready:',ready);
 return true;
}
function closeMarket(){
 if(!opened)return true;
 opened=false;
 clearTimeout(revealJob);clearTimeout(loadTimeout);
 send('byz:market:close');
 overlay.style.opacity='0';
 overlay.style.pointerEvents='none';
 veil.style.opacity='1';veil.style.pointerEvents='auto';
 frame.style.opacity='0';
 retry.style.display='none';
 overlay.inert=true;
 overlay.setAttribute('aria-hidden','true');
 setTimeout(()=>{if(!opened&&overlay)overlay.style.visibility='hidden'},550);
 log('market-closed, restored existing crystal scene');
 return true;
}
window.__BYZ_V24_OPEN_MARKET__=openMarket;
window.__BYZ_V24_CLOSE_MARKET__=closeMarket;
window.__BYZ_V24_STATUS__=()=>({open:opened,frameReady:ready,hasOverlay:!!overlay,pageUrl:PAGE,location:location.pathname,version:'30.0'});
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==frame?.contentWindow)return;
 if(event.data?.type==='byz:v24:exit-market')closeMarket();
 if(event.data?.type==='byz:market:shell-ready')log('market shell script ready');
});
window.addEventListener('keydown',event=>{if(opened&&event.key==='Escape')closeMarket()});
log('registered without preloading WebGL or modifying site navigation');
})();
