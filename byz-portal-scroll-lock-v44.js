/* V44 — Once the user has entered crystals, upward scrolling may not re-enter portal.
   Only blocks backward wheel / keyboard / touch gestures in the crystal-selection scene.
   Interior scrolling, page controls, and normal initial portal entrance remain intact. */
(function(){
  'use strict';
  if(window.__BYZ_PORTAL_LOCK_V44__)return;
  let hasEntered=false,backBoundary=0,touchStart=null;
  const scene=()=>window.__BYZ_MARKET_CURRENT_ROUTE?.scene||'';
  function observe(detail){
    const name=detail?.scene||scene();
    if(name==='projects'||name==='projectInterior'){
      if(!hasEntered){hasEntered=true;backBoundary=Math.max(0,window.scrollY-4)}
    }
  }
  window.addEventListener('byz:market:route',e=>observe(e.detail));
  setInterval(()=>observe(window.__BYZ_MARKET_CURRENT_ROUTE),350);
  const onSelector=()=>hasEntered&&scene()==='projects';
  const ignore=e=>e.ctrlKey||e.metaKey||e.altKey;
  function blockWheel(e){
    if(!onSelector()||ignore(e)||e.deltaY>=0)return;
    e.preventDefault();e.stopImmediatePropagation();
  }
  window.addEventListener('wheel',blockWheel,{capture:true,passive:false});
  window.addEventListener('keydown',e=>{
    if(!onSelector()||ignore(e)||/INPUT|TEXTAREA|SELECT/.test(e.target?.tagName||'')||e.target?.isContentEditable)return;
    if(['ArrowUp','PageUp','Home'].includes(e.key)||(e.key===' '&&e.shiftKey)){
      e.preventDefault();e.stopImmediatePropagation();
    }
  },true);
  window.addEventListener('touchstart',e=>{if(e.touches.length===1)touchStart=e.touches[0].clientY},{capture:true,passive:true});
  window.addEventListener('touchmove',e=>{
    if(!onSelector()||e.touches.length!==1||touchStart===null)return;
    const y=e.touches[0].clientY;
    if(y>touchStart+2){e.preventDefault();e.stopImmediatePropagation()}
    touchStart=y;
  },{capture:true,passive:false});
  window.addEventListener('touchend',()=>touchStart=null,true);
  window.__BYZ_PORTAL_LOCK_V44__={get entered(){return hasEntered},get scene(){return scene()},get boundary(){return backBoundary}};
})();
