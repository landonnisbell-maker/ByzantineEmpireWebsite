(()=>{'use strict';
if(window.__BYZ_ATMOSPHERE_V85__)return;window.__BYZ_ATMOSPHERE_V85__=true;
const slug=(location.pathname.match(/entries\/([^/]+)\//)||[])[1]||new URLSearchParams(location.search).get('byz-product')||'';
const theme={'paramerion-sword':'sword','gold-jewelry':'jewelry','food-items':'food','silk-textiles':'silk','coins':'coins'}[slug];
if(!theme)return;
const root=document.documentElement;root.classList.add('byz-fx-'+theme);
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const coarse=matchMedia('(pointer:coarse)').matches;
const saveData=!!navigator.connection?.saveData;
const weak=typeof navigator.hardwareConcurrency==='number'&&navigator.hardwareConcurrency<=4;
const count=reduced?0:((coarse||saveData||weak)?5:(theme==='sword'?13:theme==='jewelry'?7:9));
function install(){
 if(document.getElementById('byz-fx-v85'))return;
 const layer=document.createElement('div');layer.id='byz-fx-v85';layer.setAttribute('aria-hidden','true');
 // All animation is CSS transform+opacity on a small bounded number of tiny nodes.
 // No per-frame JS, no scroll listeners, no canvas/WebGL context, no forced layout.
 for(let i=0;i<count;i++){
  const particle=document.createElement('i');particle.className='byz-fx-v85-particle';
  const x=(i*37+11)%98, drift=(i*19)%85-42;
  particle.style.setProperty('--fx-x',x+'%');
  particle.style.setProperty('--fx-w',(2+(i%3))+'px');
  particle.style.setProperty('--fx-h',(3+(i%3))+'px');
  particle.style.setProperty('--fx-a',(.58+(i%3)*.11).toFixed(2));
  particle.style.setProperty('--fx-opacity',(.30+(i%4)*.10).toFixed(2));
  particle.style.setProperty('--fx-drift',drift+'px');
  particle.style.setProperty('--fx-d',(7+(i%5)*1.6)+'s');
  particle.style.setProperty('--fx-delay',(-i*1.45)+'s');
  layer.append(particle);
 }
 document.body.append(layer);
 root.classList.toggle('byz-fx-suspended',document.hidden);
 document.addEventListener('visibilitychange',()=>root.classList.toggle('byz-fx-suspended',document.hidden),{passive:true});
}
if(document.body)install();else document.addEventListener('DOMContentLoaded',install,{once:true});
})();
