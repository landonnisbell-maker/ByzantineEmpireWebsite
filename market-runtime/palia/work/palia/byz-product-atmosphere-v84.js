(()=>{'use strict';
if(window.__BYZ_PRODUCT_ATMOSPHERE_V84__)return;window.__BYZ_PRODUCT_ATMOSPHERE_V84__=true;
const slug=(location.pathname.match(/entries\/([^/]+)\//)||[])[1]||new URLSearchParams(location.search).get('byz-product')||'';
const theme={'paramerion-sword':'sword','gold-jewelry':'jewelry','food-items':'food','silk-textiles':'silk','coins':'coins'}[slug];
if(!theme)return;document.documentElement.classList.add('byz-v84-'+theme);
const prefersReduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
let mounted=false;
function mount(){
 const copy=document.querySelector('.byz-market-product-copy');if(!copy||mounted)return false;
 mounted=true;const scene=document.createElement('div');scene.className='byz-v84-atmosphere';scene.setAttribute('aria-hidden','true');
 const cursor=document.createElement('div');cursor.className='byz-v84-cursor';scene.appendChild(cursor);
 if(!prefersReduced&&finePointer){
  const count=theme==='sword'?12:8;
  for(let i=0;i<count;i++){
   const mote=document.createElement('span');mote.className='byz-v84-mote';
   mote.style.setProperty('--mote-x',(((i*43+17)%87)+6)+'%');
   mote.style.setProperty('--mote-size',(2+i%3*1.2)+'px');
   mote.style.setProperty('--mote-drift',(((i*11)%37)-18)+'px');
   mote.style.setProperty('--mote-dur',(8+i%5*1.6)+'s');
   mote.style.setProperty('--mote-delay',(-i*1.14)+'s');scene.appendChild(mote);
  }
 }
 copy.prepend(scene);
 if(finePointer&&!prefersReduced){
  let x=0,y=0,currentX=0,currentY=0,queued=false,hovering=false,initialized=false;
  function render(){
   queued=false;
   if(!hovering)return;
   currentX+=(x-currentX)*.22;currentY+=(y-currentY)*.22;
   cursor.style.transform=`translate3d(${currentX.toFixed(2)}px,${currentY.toFixed(2)}px,0) translate(-50%,-50%)`;
   if(Math.abs(x-currentX)>0.4||Math.abs(y-currentY)>0.4){queued=true;requestAnimationFrame(render)}
  }
  copy.addEventListener('pointermove',ev=>{
   const rect=copy.getBoundingClientRect();x=ev.clientX-rect.left;y=ev.clientY-rect.top;
   if(!initialized){currentX=x;currentY=y;initialized=true}
   hovering=true;scene.classList.add('byz-v84-hover');
   if(!queued){queued=true;requestAnimationFrame(render)}
  },{passive:true});
  copy.addEventListener('pointerleave',()=>{
   hovering=false;initialized=false;scene.classList.remove('byz-v84-hover');
  },{passive:true});
 }
 return true;
}
if(!mount()){
 const observer=new MutationObserver(()=>{if(mount())observer.disconnect()});
 observer.observe(document.documentElement,{subtree:true,childList:true});
 window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
}
})();
