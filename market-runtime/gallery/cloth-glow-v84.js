(()=>{'use strict';
if(window.__BYZ_CLOTH_GLOW_V84__)return;window.__BYZ_CLOTH_GLOW_V84__=true;
const halo=document.createElement('div');halo.id='byz-cloth-halo';halo.setAttribute('aria-hidden','true');document.body.append(halo);
let x=-1000,y=-1000,active=false,queued=false;
function flush(){queued=false;halo.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';halo.dataset.active=active?'true':'false'}
function schedule(){if(!queued){queued=true;requestAnimationFrame(flush)}}
// Cloths are rendered by WebGL, not as individual HTML cards: illuminate the pointer area
// only over the interactive canvas, preserving the original card hover and click handlers.
document.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse')return;
 const canvas=e.target.closest?.('canvas')||document.elementFromPoint(e.clientX,e.clientY)?.closest?.('canvas');
 const inGallery=e.clientY>window.innerHeight*.11 && e.clientY<window.innerHeight*.83;
 const overUI=!!e.target.closest?.('button,a,nav,[role=button]');
 active=inGallery&&!overUI&&(!!canvas||e.clientX>window.innerWidth*.05);x=e.clientX;y=e.clientY;schedule();
},{passive:true});
document.addEventListener('pointerout',e=>{if(!e.relatedTarget){active=false;schedule()}},{passive:true});
window.addEventListener('blur',()=>{active=false;schedule()});
})();
