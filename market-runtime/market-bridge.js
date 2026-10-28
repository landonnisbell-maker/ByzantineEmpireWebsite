(()=>{
'use strict';
if(window.__BYZ_MARKET_V23__)return;
window.__BYZ_MARKET_V23__=true;
const root=new URL('./',document.currentScript?.src||document.baseURI);
const debug=new URLSearchParams(location.search).has('byzmarketdebug');
const log=(...x)=>{if(debug)console.log('[MARKET V23]',...x)};
let host=null,frame=null,visible=false,entryRequested=false,state=null,returning=false;
function send(type){try{frame?.contentWindow?.postMessage({type},location.origin)}catch(err){log('postMessage failed',err)}}
function mount(){
  if(host||!document.body)return;
  host=document.createElement('section');
  host.id='byzantine-market-v23-page';
  host.setAttribute('aria-label','ta pánta pazári Market');
  host.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#090a0c;opacity:0;pointer-events:none;visibility:hidden;transition:opacity .65s cubic-bezier(.22,1,.36,1);';
  frame=document.createElement('iframe');
  frame.title='ta pánta pazári · Market Cloth Gallery';
  frame.src=new URL('index.html?v=23',root).href;
  frame.loading='eager'; frame.allow='autoplay; fullscreen';
  frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;display:block';
  const back=document.createElement('button');back.type='button';back.textContent='← RETURN TO CRYSTALS';
  back.style.cssText='position:absolute;top:16px;left:18px;z-index:2;padding:11px 16px;background:rgba(12,14,17,.82);border:1px solid rgba(255,255,255,.28);color:white;cursor:pointer;font:600 11px Arial,sans-serif;letter-spacing:.09em';
  back.addEventListener('click',()=>{
    returning=true;
    hide('user returned to crystals');
    try{if(typeof window.__BYZ_MARKET_EXIT_TO_CRYSTALS==='function')window.__BYZ_MARKET_EXIT_TO_CRYSTALS();
    else window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}))}catch(err){log('exit failed',err)}
  });
  host.append(frame,back); document.body.append(host);
  host.inert=true;host.setAttribute('aria-hidden','true');
  frame.addEventListener('load',()=>{if(visible||entryRequested)send('byz:market:enter')});
  log('market shell preloaded');
}
function show(){
  mount();if(!host)return;
  if(visible)return;
  visible=true;entryRequested=true;
  host.style.visibility='visible';host.style.pointerEvents='auto';
  host.inert=false;host.setAttribute('aria-hidden','false');
  requestAnimationFrame(()=>{if(visible)host.style.opacity='1'});
  send('byz:market:enter');
  log('showing new Market page',state);
}
function hide(why){
  if(!host)return;
  visible=false;entryRequested=false;
  host.style.opacity='0';host.style.pointerEvents='none';
  host.inert=true;host.setAttribute('aria-hidden','true');
  send('byz:market:close');
  // Keep running behind the page while not visible; only its host hides.
  setTimeout(()=>{if(!visible)host.style.visibility='hidden'},680);
  log('hidden',why);
}
function apply(detail){
  if(!detail||typeof detail.active!=='boolean')return;
  state=detail;
  if(!detail.active){returning=false;hide('original interior renderer inactive');return}
  if(!returning)show();
}
window.__BYZ_MARKET_RENDER_PAGE__=apply;
window.addEventListener('byz:market:real-page',e=>apply(e.detail));
window.addEventListener('message',e=>{
  if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
  if(e.data?.type==='byz:market:shell-ready'&&visible)send('byz:market:enter');
});
window.__BYZ_MARKET_DEBUG__=()=>({version:'23',mounted:!!host,visible,entryRequested,state,iframe:frame?.src});
function init(){mount();if(window.__BYZ_MARKET_CURRENT_PAGE)apply(window.__BYZ_MARKET_CURRENT_PAGE)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
