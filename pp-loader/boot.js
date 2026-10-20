/* Purple & Premium / stable integration V3
   Never replaces requestAnimationFrame, cancelAnimationFrame, WebGPU or the
   original site's initialization code. The original scene has full priority.
*/
(()=>{
 'use strict';
 if (window!==window.top || window.__PP_LOADER_V3__) return;
 window.__PP_LOADER_V3__=true;
 const base=new URL('./pp-loader/',document.baseURI);
 let cover=null, frame=null, curtain=null, ready=false, entered=false, handingOff=false;
 let poll=null, lastStatus='',lastProgress=-1,readyCount=0,started=performance.now();
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const send=(kind,payload={})=>{
   try{frame?.contentWindow?.postMessage({source:'pp-site-v2',kind,...payload},location.origin);}catch(_){ }
 };
 const originalLoader=()=>document.querySelector('body > .loader-module__y9w63G__loaderContainer');
 function statusSnapshot(){
   const root=originalLoader();
   if(!root) return {ready:false,progress:0,status:'INITIALIZING THE BYZANTINE GATEWAY'};
   const isGate=root.classList.contains('loader-module__y9w63G__gate') || root.classList.contains('loader-module__y9w63G__exiting');
   const btn=root.querySelector('[data-testid="loader-enter"]');
   const canEnter=Boolean(isGate&&btn&&!btn.disabled);
   let progress=0;
   const v=Number(root.style.getPropertyValue('--load-p'));
   if(Number.isFinite(v))progress=Math.round(v*100);
   const fill=root.querySelector('[class*="__fill"]');
   if(fill&&fill.style.width.endsWith('%'))progress=Math.max(progress,Math.round(parseFloat(fill.style.width)));
   const label=root.querySelector('.loader-module__y9w63G__status')?.textContent?.replace(/\s+/g,' ').trim();
   progress=Math.max(0,Math.min(100,progress));
   return {
     ready:canEnter,
     progress:canEnter?100:Math.min(99,progress),
     status:label || (progress>90?'FINALIZING THE GATEWAY':'PREPARING THE IMPERIAL GATEWAY')
   };
 }
 function sync(){
   if(!cover||handingOff)return;
   const snap=statusSnapshot();
   readyCount=snap.ready?readyCount+1:0;
   // Avoid exposing the CTA because of a transient DOM re-render.
   const stableReady=readyCount>=2;
   ready=stableReady;
   if(snap.status!==lastStatus||snap.progress!==lastProgress||stableReady){
     send('PP_PROGRESS',{status:snap.status,progress:snap.progress,ready:stableReady});
     lastStatus=snap.status;lastProgress=snap.progress;
   }
   if(stableReady)send('PP_READY');
   const rescue=document.getElementById('pp-rescue');
   if(rescue&&!stableReady&&performance.now()-started>28000)rescue.hidden=false;
 }
 function cleanup(){
   clearInterval(poll);poll=null;
   cover?.remove();cover=null;frame=null;
   curtain?.remove();curtain=null;
   document.getElementById('pp-integration-styles')?.remove();
 }
 async function enter(){
   if(handingOff)return;
   sync();
   const root=originalLoader();
   const btn=root?.querySelector('[data-testid="loader-enter"]');
   if(!ready||!btn||btn.disabled){send('PP_WAIT',{message:'THE GATEWAY IS STILL PREPARING'});return;}
   handingOff=true;entered=true;
   send('PP_TRANSITION');
   curtain=document.createElement('div');curtain.id='pp-transition-curtain';curtain.setAttribute('aria-hidden','true');
   document.body.appendChild(curtain);
   // The site's main rendering loop is never throttled or changed.
   curtain.getBoundingClientRect();curtain.classList.add('visible');
   await pause(650);
   try{btn.click();}catch(e){console.warn('[Purple & Premium] original entry action failed',e);}
   // Wait for the original exit animation (normally ~900ms) while hidden.
   await pause(1150);
   cover?.remove();cover=null;frame=null;
   curtain.classList.remove('visible');
   await pause(700);
   cleanup();
 }
 function mount(){
   if(!document.body || cover)return;
   const styles=document.createElement('style');styles.id='pp-integration-styles';
   styles.textContent=`
   #pp-overlay{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483000!important;background:#141014!important;pointer-events:auto!important;margin:0!important;border:0!important}
   #pp-overlay iframe{display:block;width:100%!important;height:100%!important;border:0!important;background:#141014!important}
   #pp-transition-curtain{position:fixed;inset:0;z-index:2147483002;background:#000;opacity:0;transition:opacity .65s ease;pointer-events:auto}
   #pp-transition-curtain.visible{opacity:1}
   #pp-rescue{position:fixed;z-index:2147483001;right:16px;top:16px;background:#17121c;border:1px solid #8b7254;border-radius:7px;color:#ede0c7;padding:12px 14px;font:12px/1.4 system-ui,sans-serif;max-width:260px}
   #pp-rescue button{display:block;background:#3d2b42;border:1px solid #ab8bba;color:#fff;padding:8px 10px;margin-top:8px;cursor:pointer}
   #pp-rescue[hidden]{display:none!important}`;
   document.head.appendChild(styles);
   cover=document.createElement('div');cover.id='pp-overlay';
   frame=document.createElement('iframe');frame.src=new URL('index.html',base).href;
   frame.title='Purple & Premium interactive loading screen';frame.id='pp-live-loader-frame';frame.loading='eager';
   cover.appendChild(frame);
   const rescue=document.createElement('div');rescue.id='pp-rescue';rescue.hidden=true;
   rescue.innerHTML='The original 3D website is taking longer than expected.<button type="button">View original loading screen</button>';
   rescue.querySelector('button').addEventListener('click',cleanup);
   cover.appendChild(rescue);
   document.body.appendChild(cover);
   frame.addEventListener('load',sync);
   window.addEventListener('message',event=>{
     if(event.source!==frame?.contentWindow||event.origin!==location.origin||event.data?.source!=='pp-loader-v2')return;
     if(event.data.kind==='HELLO')sync();
     if(event.data.kind==='ENTER')enter();
   });
   window.addEventListener('keydown',event=>{if(event.key==='Escape'&&!handingOff)cleanup()});
   poll=setInterval(sync,250);
   sync();
 }
 if(document.body)mount();
 else{
   const mo=new MutationObserver(()=>{if(document.body){mo.disconnect();mount();}});
   mo.observe(document.documentElement,{childList:true,subtree:true});
 }
})();
