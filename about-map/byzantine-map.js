(function(){
'use strict';
if(window.__BYZ_HISTORIC_MAP_V43__)return;
window.__BYZ_HISTORIC_MAP_V43__=true;
const BASE='/ByzantineEmpireWebsite/about-map/';
const frame=document.createElement('aside');
frame.id='byz-history-map';
frame.dataset.active='false';
frame.dataset.expanded='false';
frame.setAttribute('aria-label','Interactive historical map of the Byzantine Empire');
frame.innerHTML=`<div class="hm-shade" data-close="1" aria-hidden="true"></div>
<section class="hm-card"><div class="hm-header">
 <div><span class="hm-eyebrow">Historic geography · Map</span><h2 class="hm-heading">The Byzantine Empire</h2></div>
 <div class="hm-tools"><button class="hm-icon" data-zoom="out" aria-label="Zoom out" title="Zoom out">−</button><button class="hm-icon" data-zoom="in" aria-label="Zoom in" title="Zoom in">+</button><button class="hm-icon" data-reset="1" aria-label="Reset map" title="Reset view">↺</button><button class="hm-expand" data-expand="1" aria-label="Expand map">Expand ↗</button></div>
</div><div class="hm-viewport" role="region" aria-label="Drag map to pan; scroll to zoom; press plus or minus keys to zoom" tabindex="0">
 <div class="hm-stage"><img src="${BASE}Byzantine-Empire.webp" alt="Historical comparison of the Byzantine Empire in about 1020, about 1360, and under Justinian I, 527 to 565" draggable="false"><img class="hm-highlight" src="${BASE}empire-pulse.png" alt="" aria-hidden="true" draggable="false"></div>
</div><div class="hm-foot"><span>Drag to explore · Scroll to zoom</span><a href="https://www.britannica.com/place/Byzantine-Empire" target="_blank" rel="noopener noreferrer">Map © Encyclopaedia Britannica</a></div></section>`;
const mount=()=>{if(!frame.isConnected)document.body.append(frame)};
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});
const viewport=frame.querySelector('.hm-viewport');
const stage=frame.querySelector('.hm-stage');
const expandButton=frame.querySelector('[data-expand]');
let zoom=1,panX=0,panY=0,dragging=false;
const pointers=new Map();
let anchor=null;
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
function capPan(){
 const w=viewport.clientWidth,h=viewport.clientHeight;
 const mx=Math.max(0,(w*(zoom-1))/2),my=Math.max(0,(h*(zoom-1))/2);
 panX=clamp(panX,-mx,mx);panY=clamp(panY,-my,my);
}
function draw(immediate=false){capPan();stage.style.transition=immediate?'none':'transform 180ms cubic-bezier(.18,.72,.25,1)';stage.style.transform=`translate3d(${panX}px,${panY}px,0) scale(${zoom})`;}
function setZoom(next){zoom=clamp(next,1,1.55);draw()}
function reset(){zoom=1;panX=panY=0;draw()}
function toggleExpand(force){
 const want=typeof force==='boolean'?force:frame.dataset.expanded!=='true';
 frame.dataset.expanded=want?'true':'false';
 expandButton.textContent=want?'Close ×':'Expand ↗';
 expandButton.setAttribute('aria-label',want?'Close expanded map':'Expand map');
 if(!want)reset();else{zoom=1;panX=panY=0;requestAnimationFrame(()=>{draw();viewport.focus({preventScroll:true})})}
}
frame.querySelectorAll('[data-zoom]').forEach(el=>el.addEventListener('click',()=>setZoom(zoom+(el.dataset.zoom==='in'?.17:-.17))));
frame.querySelector('[data-reset]').addEventListener('click',reset);
expandButton.addEventListener('click',()=>toggleExpand());
frame.querySelector('[data-close]').addEventListener('click',()=>toggleExpand(false));
window.addEventListener('wheel',ev=>{
 if(frame.dataset.active!=='true'||frame.dataset.expanded==='true'&& !frame.contains(ev.target))return;
 if(!viewport.contains(ev.target))return;
 if(ev.ctrlKey||ev.metaKey)return;
 ev.preventDefault();ev.stopImmediatePropagation();
 setZoom(zoom+(ev.deltaY<0?.08:-.08));
},{capture:true,passive:false});
viewport.addEventListener('pointerdown',ev=>{
 if(ev.pointerType==='mouse'&&ev.button!==0)return;
 viewport.setPointerCapture(ev.pointerId);pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
 dragging=true;
 if(pointers.size===2){const pts=[...pointers.values()];anchor={distance:Math.hypot(pts[1].x-pts[0].x,pts[1].y-pts[0].y),zoom};}
});
viewport.addEventListener('pointermove',ev=>{
 if(!pointers.has(ev.pointerId))return;
 const prev=pointers.get(ev.pointerId);pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
 if(pointers.size>=2){
   const pts=[...pointers.values()];const distance=Math.hypot(pts[1].x-pts[0].x,pts[1].y-pts[0].y);
   if(anchor?.distance)zoom=clamp(anchor.zoom*distance/anchor.distance,1,1.55);
 }else{panX+=ev.clientX-prev.x;panY+=ev.clientY-prev.y;}
 draw(true);
});
function endPointer(ev){pointers.delete(ev.pointerId);if(pointers.size<2)anchor=null;if(!pointers.size){dragging=false;draw();}}
viewport.addEventListener('pointerup',endPointer);viewport.addEventListener('pointercancel',endPointer);viewport.addEventListener('lostpointercapture',endPointer);
viewport.addEventListener('keydown',ev=>{
 if(ev.key==='+'||ev.key==='='){ev.preventDefault();setZoom(zoom+.12)}
 else if(ev.key==='-'){ev.preventDefault();setZoom(zoom-.12)}
 else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(ev.key)){
 ev.preventDefault();let move=18;if(ev.key==='ArrowLeft')panX-=move;if(ev.key==='ArrowRight')panX+=move;if(ev.key==='ArrowUp')panY-=move;if(ev.key==='ArrowDown')panY+=move;draw();}
 });
window.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&frame.dataset.expanded==='true')toggleExpand(false)});
window.addEventListener('resize',()=>{if(frame.dataset.active==='true')draw()});
// V45 — Only show the panel over the native WebGPU About Us image slot.
// No additional floating map; this follows the original placeholder when scrolling.
let wasActive=false,prevRect='';
function layout(){
  const r=window.__BYZ_ABOUT_MAP_SLOT_V45__;
  const valid=!!r&&r.width>60&&r.height>40&&
    r.left<window.innerWidth&&r.top<window.innerHeight&&
    r.left+r.width>0&&r.top+r.height>0;
  if(valid!==wasActive){
    wasActive=valid;
    frame.dataset.active=valid?'true':'false';
    if(valid){mount();reset()}
    else if(frame.dataset.expanded==='true'){toggleExpand(false)}
  }
  if(valid){
    const vals=[r.left,r.top,r.width,r.height].map(n=>Math.round(n*2)/2);
    const key=vals.join(',');
    if(key!==prevRect){
      prevRect=key;
      frame.style.left=vals[0]+'px';frame.style.top=vals[1]+'px';
      frame.style.width=vals[2]+'px';frame.style.height=vals[3]+'px';
    }
  }
  requestAnimationFrame(layout);
}
requestAnimationFrame(layout);
})();
