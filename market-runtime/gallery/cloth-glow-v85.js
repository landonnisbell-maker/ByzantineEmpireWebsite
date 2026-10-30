(()=>{'use strict';
if(window.__BYZ_CLOTH_HALO_V85__)return;window.__BYZ_CLOTH_HALO_V85__=true;
if(!matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches)return;
const halo=document.createElement('div');halo.id='byz-cloth-halo-v85';halo.setAttribute('aria-hidden','true');
function mount(){(document.body||document.documentElement).append(halo)}
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});
let x=-300,y=-300,active=false,pending=false;
function flush(){pending=false;halo.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';halo.dataset.on=active?'1':'0'}
function request(){if(!pending){pending=true;requestAnimationFrame(flush)}}
// The gallery is already a heavy WebGL renderer. Only react to direct canvas pointer
// events, without elementFromPoint, getBoundingClientRect, or a perpetual animation loop.
document.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse')return;
 const canvas=e.target&&e.target.tagName==='CANVAS';
 if(!canvas){if(active){active=false;request()}return}
 const inGallery=e.clientY>innerHeight*.13&&e.clientY<innerHeight*.83;
 if(!inGallery){if(active){active=false;request()}return}
 active=true;x=e.clientX;y=e.clientY;request();
},{passive:true});
document.addEventListener('pointerleave',()=>{active=false;request()},{passive:true});
window.addEventListener('blur',()=>{active=false;request()},{passive:true});
})();
