(function(){
'use strict';
if(window.__BYZ_HISTORIC_MAP_V43__)return;
window.__BYZ_HISTORIC_MAP_V43__=true;
const BASE='/ByzantineEmpireWebsite/about-map/';
const frame=document.createElement('aside');
frame.id='byz-history-map';
frame.dataset.active='false';
frame.dataset.visible='false';
frame.dataset.expanded='false';
frame.setAttribute('aria-label','Interactive historical map of the Byzantine Empire');
frame.innerHTML=`<div class="hm-shade" data-close="1" aria-hidden="true"></div>
<section class="hm-card"><div class="hm-header">
 <div><span class="hm-eyebrow">HISTORICAL ATLAS · EASTERN ROMAN EMPIRE</span><h2 class="hm-heading">The Byzantine Empire</h2></div>
 <div class="hm-tools"><button class="hm-icon" data-zoom="out" aria-label="Zoom out" title="Zoom out">−</button><button class="hm-icon" data-zoom="in" aria-label="Zoom in" title="Zoom in">+</button><button class="hm-icon" data-reset="1" aria-label="Reset map" title="Reset view">↺</button><button class="hm-expand" data-expand="1" aria-label="Expand map">ENLARGE ↗</button></div>
</div><div class="hm-viewport" role="region" aria-label="Drag map to pan; scroll to zoom; press plus or minus keys to zoom" tabindex="0">
 <div class="hm-stage"><img src="${BASE}Byzantine_Empire_1025.svg" alt="Map of the Byzantine Empire in 1025 CE showing the imperial territory, cities, and the Mediterranean" draggable="false"><img class="hm-highlight" src="${BASE}territory-pulse-1025.png" alt="" aria-hidden="true" draggable="false"></div>
</div><div class="hm-foot"><span>Drag to explore · Scroll to magnify</span><span>Byzantine Empire · 1025 CE</span></div></section>`;
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
// The map is tracked against the native crystal opacity uniform. Expansion
// temporarily hides the WebGPU canvas instead of relying on a separate overlay
// to mask native text that can be in a higher GPU compositing layer.
const screenVeil=document.createElement('div');
screenVeil.id='byz-map-screen-veil';
if(document.body)document.body.append(screenVeil);
else document.addEventListener('DOMContentLoaded',()=>document.body.append(screenVeil),{once:true});
let swapBusy=false;
const nap=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const insideMap=target=>!!target&&(viewport.contains(target)||frame.querySelector('.hm-tools').contains(target));
function modalCapture(event){
 if(frame.dataset.expanded!=='true'&&!swapBusy)return;
 if(event.type==='keydown'&&event.key==='Escape')return;
 if(event.type==='wheel'&&viewport.contains(event.target))return; // map zoom still works
 if(event.type==='pointerdown'&&insideMap(event.target))return;
 if(event.type==='pointermove'&&insideMap(event.target))return;
 if(event.type==='pointerup'&&insideMap(event.target))return;
 if(event.type==='touchstart'&&insideMap(event.target))return;
 if(event.type==='touchmove'&&insideMap(event.target))return;
 if(event.type==='keydown'&&['Tab','Shift'].includes(event.key))return;
 if(event.cancelable)event.preventDefault();
 event.stopImmediatePropagation();
}
// Register on window in capture, before any application's bubbling listeners.
for(const type of ['wheel','touchstart','touchmove','keydown'])window.addEventListener(type,modalCapture,{capture:true,passive:false});
function holdPage(yes){
 document.body?.classList.toggle('byz-map-modal-open',yes);
 document.documentElement.classList.toggle('byz-map-modal-open',yes);
 window.__BYZ_ABOUT_MAP_MODAL__=yes;
}
function collapseImmediately(){
 frame.dataset.expanded='false';
 frame.dataset.swapping='';delete frame.dataset.swapping;
 screenVeil.classList.remove('is-on');
 holdPage(false);swapBusy=false;
 expandButton.textContent='ENLARGE ↗';
 expandButton.setAttribute('aria-label','Expand map');
}
async function toggleExpand(force){
 const want=typeof force==='boolean'?force:frame.dataset.expanded!=='true';
 if(swapBusy||want===(frame.dataset.expanded==='true'))return;
 swapBusy=true;
 frame.dataset.swapping='out';
 // Start fading the native About Us WebGPU content *with* the compact map.
 if(want){
   holdPage(true);
   screenVeil.classList.add('is-on');
   window.__BYZ_ABOUT_MODAL_TEXT__?.(true);
 }
 await nap(350);
 frame.dataset.expanded=want?'true':'false';
 expandButton.textContent=want?'CLOSE ×':'ENLARGE ↗';
 expandButton.setAttribute('aria-label',want?'Close expanded map':'Expand map');
 zoom=1;panX=panY=0;
 await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done)));
 draw(true);
 frame.dataset.swapping='in';
 if(!want){
   window.__BYZ_ABOUT_MODAL_TEXT__?.(false);
   screenVeil.classList.remove('is-on');
   holdPage(false);
 }
 await nap(420);
 delete frame.dataset.swapping;
 swapBusy=false;
 if(want)viewport.focus({preventScroll:true});
}
frame.querySelectorAll('[data-zoom]').forEach(el=>el.addEventListener('click',()=>setZoom(zoom+(el.dataset.zoom==='in'?.17:-.17))));
frame.querySelector('[data-reset]').addEventListener('click',reset);
expandButton.addEventListener('click',()=>toggleExpand());
frame.querySelector('[data-close]').addEventListener('click',()=>toggleExpand(false));
screenVeil.addEventListener('click',()=>toggleExpand(false));
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
// V50: the SVG widget uses the SAME native reveal uniform as the text.
// Both fade out completely BEFORE the underlying crystal starts to move.
// No second GPU-baked map and no retained preview on re-entry.
let wasActive=false,prevRect='';
// The store entry bridge fires synchronously at click time, before camera travel.
window.addEventListener('byz:about:begin-entry',()=>{
  frame.style.setProperty('--byz-native-reveal','0');
  wasActive=false;prevRect='';
  setMapActive(false);
});
function setMapActive(active){
  if(active){
    mount();
    frame.dataset.visible='true';
    frame.dataset.active='true';
  }else{
    // Do not animate the map away independently from the crystal text.
    // It persists as long as the original media rectangle exists.
    frame.dataset.active='false';
    frame.dataset.visible='false';
    if(frame.dataset.expanded==='true'||swapBusy)collapseImmediately();
  }
}
function layout(){
  const r=window.__BYZ_ABOUT_MAP_SLOT_V45__;
  const reveal=clamp(Number(r?.opacity)||0,0,1);
  // During fullscreen, native text opacity is zero. Keep the real map mounted
  // instead of allowing the native opacity guard to dismiss the modal.
  const modalActive=frame.dataset.expanded==='true'||swapBusy;
  const valid=!!r&&r.phase==='interior'&&!window.__BYZ_ABOUT_ENTER_LOCK__&&
    (reveal>0.001||modalActive)&&r.width>60&&r.height>40&&
    r.left<window.innerWidth&&r.top<window.innerHeight&&
    r.left+r.width>0&&r.top+r.height>0;
  // This is the actual native text shader reveal, not a separate CSS timer.
  frame.style.setProperty('--byz-native-reveal',valid?String(reveal):'0');
  if(valid!==wasActive){
    wasActive=valid;
    if(valid){reset();setMapActive(true)}
    else {setMapActive(false);prevRect=''}
  }
  if(valid){
    // Opacity comes directly from the native WebGPU uReveal uniform.
    // In particular, the widget does NOT remain opaque during exit.
    const vals=[r.left,r.top,r.width,r.height].map(n=>Math.round(n*2)/2);
    const key=vals.join(',');
    // Make the original SVG's 296.93:181.17 aspect fit the media slot *without*
    // cropping or injecting gray letterbox columns at 1x zoom.
    // The actual book/scroll geometry stays untouched; its map is centered.
    if(key!==prevRect){
      prevRect=key;
      // Measure header after giving it the full available width; otherwise
      // a narrow default frame makes the heading wrap and distorts the ratio.
      frame.style.width=vals[2]+'px';
      const header=frame.querySelector('.hm-header').offsetHeight||54;
      const foot=frame.querySelector('.hm-foot').offsetHeight||27;
      const availableHeight=Math.max(40,vals[3]-header-foot);
      const desiredWidth=Math.min(vals[2],availableHeight*(296.92649/181.17015)+2);
      frame.style.left=vals[0]+'px';
      frame.style.top=vals[1]+'px';
      frame.style.width=desiredWidth+'px';frame.style.height=vals[3]+'px';
    }
  }
  requestAnimationFrame(layout);
}
requestAnimationFrame(layout);
})();
