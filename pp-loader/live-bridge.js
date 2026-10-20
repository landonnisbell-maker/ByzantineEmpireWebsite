/* V2 bridge: loading state is mirrored from the real 3D app, never guessed. */
(()=>{
 'use strict';
 const root=document.querySelector('.loader-module__y9w63G__loaderContainer');
 const button=document.querySelector('[data-testid="loader-enter"]');
 const status=document.querySelector('.loader-module__y9w63G__status');
 const fill=document.querySelector('.loader-module__y9w63G__fill');
 const percent=document.querySelector('.loader-module__y9w63G__bigPercent span');
 const note=document.querySelector('#standalone-note');
 let ready=false;
 const send=kind=>window.parent!==window&&window.parent.postMessage({source:'pp-loader-v2',kind},location.origin);
 const setReady=(yes)=>{
   if(yes===ready)return;
   ready=yes;root?.classList.toggle('loader-module__y9w63G__gate',yes);
   root?.classList.toggle('pp-site-loading',!yes);
   button&&(button.disabled=!yes);
   button?.setAttribute('aria-hidden',String(!yes));
   button?.setAttribute('tabindex',yes?'0':'-1');
   root?.setAttribute('aria-busy',String(!yes));
 };
 const setProgress=(v,label)=>{
   const pct=Math.min(100,Math.max(0,Math.round(Number(v)||0)));
   if(percent)percent.textContent=String(pct);
   if(fill)fill.style.width=pct+'%';
   root?.style.setProperty('--load-p',String(pct/100));
   if(status)status.textContent=(label||'PREPARING THE GATEWAY').toUpperCase();
 };
 root?.classList.remove('loader-module__y9w63G__gate');
 root?.classList.add('pp-site-loading');
 setProgress(0,'PREPARING THE BYZANTINE GATEWAY');
 button&&(button.disabled=true);
 button?.addEventListener('click',e=>{
   e.preventDefault();e.stopImmediatePropagation();
   if(ready)send('ENTER');
 },true);
 window.addEventListener('message',ev=>{
   if(ev.source!==window.parent||ev.origin!==location.origin||ev.data?.source!=='pp-site-v2')return;
   if(ev.data.kind==='PP_PROGRESS'){
     setProgress(ev.data.progress,ev.data.status);
     setReady(!!ev.data.ready);
   }
   if(ev.data.kind==='PP_READY')setReady(true);
   if(ev.data.kind==='PP_WAIT'&&note){note.textContent=ev.data.message;note.classList.add('show');}
   if(ev.data.kind==='PP_TRANSITION'){
     root?.classList.add('pp-transitioning');
   }
 });
 // If heavy 3D initialization makes even the lighter material drop frames,
 // reduce WebGL resolution rather than letting the interaction become unusable.
 let slowSamples=0;
 const gpuQuality=document.querySelector('#material-quality');
 const fpsReadout=document.querySelector('#performance-readout');
 setInterval(()=>{
   if(ready || !gpuQuality || gpuQuality.value!=='balanced')return;
   const fps=parseInt(fpsReadout?.textContent||'',10);
   if(Number.isFinite(fps)&&fps>0&&fps<25) slowSamples++;
   else slowSamples=0;
   if(slowSamples>=2){
     gpuQuality.value='lite';
     gpuQuality.dispatchEvent(new Event('change',{bubbles:true}));
     slowSamples=0;
   }
 },2000);
 send('HELLO');
})();
