/* Purple & Premium - live loader v2
 * Loads BEFORE the main application's scripts. Its own WebGL2 canvas runs in an
 * isolated iframe. Parent requestAnimationFrame is throttled during background
 * initialization, so the heavy 3D renderer cannot run at full speed beneath it.
 * Does not edit the site's existing React/Next.js bundle.
 */
(()=>{
 'use strict';
 if(window!==window.top || window.__PP_LIVE_V2__)return;
 window.__PP_LIVE_V2__=true;
 const nativeRaf=window.requestAnimationFrame.bind(window);
 const nativeCancel=window.cancelAnimationFrame.bind(window);
 let backgroundLimited=true, nextRafId=1, lastAppFrame=0;
 const requests=new Map();
 // Use virtual request IDs so cancelAnimationFrame continues to work even when
 // an underlying native animation frame is skipped.
 window.requestAnimationFrame=function(callback){
   if(typeof callback!=='function')return nativeRaf(callback);
   const id=nextRafId++,item={native:0,dead:false};requests.set(id,item);
   const run=(t)=>{
     if(item.dead)return;
     if(!backgroundLimited || t-lastAppFrame>=95){
       lastAppFrame=t;requests.delete(id);callback(t);
     }else item.native=nativeRaf(run);
   };
   item.native=nativeRaf(run);
   return id;
 };
 window.cancelAnimationFrame=function(id){
   const item=requests.get(id);
   if(item){item.dead=true;nativeCancel(item.native);requests.delete(id);}
   else nativeCancel(id);
 };
 // For robustness: the wrapper becomes unrestricted as soon as the 3D world
 // is visible, even if other code retained the wrapper reference.
 const unlimit=()=>{backgroundLimited=false;};
 const base=new URL('./pp-loader/',document.baseURI);
 let cover=null,frame=null,black=null,entered=false,transitioning=false,ready=false,appLoaded=false;
 let lastStatus='',lastProgress=-1,startedAt=performance.now(),poll=null;
 const send=(kind,payload={})=>{
   try{frame?.contentWindow?.postMessage({source:'pp-site-v2',kind,...payload},location.origin);}catch(_){}
 };
 function root(){return document.querySelector('body > .loader-module__y9w63G__loaderContainer');}
 function snapshot(){
   const el=root();
   if(!el)return {ready:false,progress:0,status:'INITIALIZING THE GATEWAY'};
   const gate=el.classList.contains('loader-module__y9w63G__gate')||el.classList.contains('loader-module__y9w63G__exiting');
   const btn=el.querySelector('[data-testid="loader-enter"]');
   const canEnter=gate && btn && !btn.disabled;
   let progress=0;
   const v=el.style.getPropertyValue('--load-p');
   if(v&&Number.isFinite(Number(v)))progress=Math.round(Number(v)*100);
   const fill=el.querySelector('[class*="__fill"]');
   if(fill&&fill.style.width.endsWith('%'))progress=Math.max(progress,Math.round(parseFloat(fill.style.width)));
   progress=Math.max(0,Math.min(100,progress));
   const statusNode=el.querySelector('[class*="__status"]');
   const label=statusNode?.textContent?.replace(/\s+/g,' ').trim()||'';
   let status=label || 'PREPARING THE BYZANTINE GATEWAY';
   if(!canEnter && !label && progress>90)status='FINALIZING THE GATEWAY';
   return {ready:!!canEnter,progress:canEnter?100:Math.min(99,progress),status};
 }
 function sync(){
   if(!cover||transitioning)return;
   const snap=snapshot();
   ready=snap.ready;
   if(snap.status!==lastStatus||snap.progress!==lastProgress){
     send('PP_PROGRESS',{progress:snap.progress,status:snap.status,ready:snap.ready});
     lastStatus=snap.status;lastProgress=snap.progress;
   }
   if(snap.ready){send('PP_READY');}
   // Never auto-enter. Visitor enters only after the original gate enables.
 }
 function finalize(){
   unlimit();clearInterval(poll);
   cover?.remove();black?.remove();
   document.querySelector('#pp-live-style-v2')?.remove();
   cover=null;black=null;frame=null;
 }
 async function enter(){
   if(transitioning)return;
   sync();
   const original=root();
   const btn=original?.querySelector('[data-testid="loader-enter"]');
   if(!ready||!btn||btn.disabled){send('PP_WAIT',{message:'STILL PREPARING THE IMPERIAL GATEWAY'});return;}
   transitioning=true;
   send('PP_TRANSITION');
   // Dedicated black curtain above BOTH applications. The native app can
   // complete its existing exit animation underneath without a flash or cut.
   black=document.createElement('div');black.id='pp-black-curtain';
   black.setAttribute('aria-hidden','true');
   document.body.appendChild(black);
   black.getBoundingClientRect();black.classList.add('pp-opaque');
   await new Promise(r=>setTimeout(r,650));
   try{btn.click();}catch(e){console.error('Original gate could not open',e);}
   await new Promise(r=>setTimeout(r,1050));
   // The cover is now entirely behind an opaque black surface.
   cover?.remove();cover=null;frame=null;
   unlimit();
   // Reveal AFTER original loader exits; the site's real world-opening
   // animation is left to its original code.
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
     black?.classList.remove('pp-opaque');
     setTimeout(finalize,1050);
   }));
 }
 function install(){
   if(!document.body||document.querySelector('#pp-live-cover'))return;
   const style=document.createElement('style');style.id='pp-live-style-v2';
   style.textContent=`
    #pp-live-cover{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483000!important;background:#141014!important;pointer-events:auto!important;margin:0!important;border:0!important}
    #pp-live-cover iframe{display:block;width:100%!important;height:100%!important;border:0!important;background:#141014!important}
    #pp-black-curtain{position:fixed;inset:0;z-index:2147483001;background:#000;opacity:0;pointer-events:auto;transition:opacity .65s ease}
    #pp-black-curtain.pp-opaque{opacity:1}
   `;
   document.head.appendChild(style);
   cover=document.createElement('div');cover.id='pp-live-cover';
   frame=document.createElement('iframe');frame.title='Purple & Premium interactive loading screen';
   frame.id='pp-live-loader-frame';frame.src=new URL('index.html',base).href;
   frame.loading='eager';frame.setAttribute('allow','autoplay');
   cover.appendChild(frame);document.body.appendChild(cover);
   frame.addEventListener('load',sync);
   window.addEventListener('message',(event)=>{
     if(event.source!==frame?.contentWindow||event.origin!==location.origin||event.data?.source!=='pp-loader-v2')return;
     if(event.data.kind==='HELLO')sync();
     if(event.data.kind==='ENTER')enter();
   });
   poll=setInterval(sync,170);sync();
   // Soft failsafe for asset/network errors: visitor can always recover.
   window.addEventListener('keydown',e=>{
     if(e.key==='Escape'&&cover&&!transitioning){finalize();}
   });
   const obs=new MutationObserver(()=>{
     if(!cover||transitioning){obs.disconnect();return;}
     if(!cover.isConnected&&document.body)document.body.appendChild(cover);
   });obs.observe(document.body,{childList:true});
 }
 if(document.body)install();
 else{
   const mo=new MutationObserver(()=>{if(document.body){mo.disconnect();install();}});
   mo.observe(document.documentElement,{childList:true,subtree:true});
 }
})();
