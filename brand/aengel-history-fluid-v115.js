/* V115 — Historical Connection uses the SAME Aengel fluid iridescence shader
 * and native WebGPU canvas as the other crystal scenes. No synthetic lens,
 * CPU particle renderer, or alternate shader is created here.
 * We only expose and mask a region of the existing canvas above HTML content.
 */
(() => {
  'use strict';
  if (window.__BYZ_AENGEL_HISTORY_V115__) return;
  window.__BYZ_AENGEL_HISTORY_V115__ = true;

  let active = false, canvas = null, x = -500, y = -500, hasPointer = false;
  let raf = 0, lastMask = '', lastMaskAt = 0, lastRectKey = '';
  const selector = '.layout-module__r4ewHq__main canvas';
  const root = () => document.querySelector('#byz-history-v93.byz-h-open');
  const works = () => document.querySelector('#byz-history-v93.byz-h-open .byz-h-works-box');

  function locate() {
    if (canvas && canvas.isConnected) return canvas;
    const found = Array.from(document.querySelectorAll(selector)).find(c =>
      c.width >= 400 && c.height >= 200 && !c.closest('iframe'));
    if (found) {
      canvas = found;
      canvas.classList.add('byz-aengel-history-fluid-v115');
    }
    return canvas;
  }
  function outsideWorks(rect) {
    return !rect || x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  }
  function cutoutSvg(width, height, rect) {
    let d = `M0 0H${width}V${height}H0Z`;
    if (rect && rect.right > 0 && rect.bottom > 0 && rect.left < width && rect.top < height) {
      const L = Math.max(0,rect.left-1), T=Math.max(0,rect.top-1);
      const R = Math.min(width,rect.right+1), B=Math.min(height,rect.bottom+1);
      if (R > L && B > T) d += ` M${L} ${T}H${R}V${B}H${L}Z`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path d="${d}" fill="white" fill-rule="evenodd"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  function applyMask() {
    if (!active) return;
    const node = locate();
    if (!node) return;
    let w=Math.max(1,Math.round(window.innerWidth)),h=Math.max(1,Math.round(window.innerHeight));
    const citation = works();
    const r = citation ? citation.getBoundingClientRect() : null;
    // When hovering the archival box the fluid is off, as on the other pages'
    // interactive overlays. An even-odd SVG mask excludes the box at all other times.
    const radius = hasPointer && outsideWorks(r) ? 250 : 0;
    const gradient = `radial-gradient(circle ${radius}px at ${Math.round(x)}px ${Math.round(y)}px, black 8%, rgba(0,0,0,.96) 29%, rgba(0,0,0,.50) 66%, transparent 100%)`;
    const rectKey = r ? [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)].join(',') : 'none';
    const key = `${w}|${h}|${rectKey}|${radius}|${Math.round(x)}|${Math.round(y)}`;
    if(key===lastMask) return;
    lastMask=key;
    const mask = `${gradient}, ${cutoutSvg(w,h,r)}`;
    node.style.setProperty('--byz-aengel-history-mask', mask);
  }
  function refresh() {
    const enabled=!!root();
    if(enabled!==active){
      active=enabled;
      if(!active){
        if(canvas) canvas.style.removeProperty('--byz-aengel-history-mask');
        hasPointer=false; lastMask='';
      } else {
        lastMask='';
        locate();
        applyMask();
      }
    }
    // This uniform exclusively enables the original Aengel fluid composition
    // for the native interior scene while Historical Connection is open.
    const shader = window.__BYZ_AENGEL_HISTORY_FLUID_UNIFORM;
    if(shader) shader.value=active ? 1 : 0;
  }
  function pointerMove(e){
    if(!active || e.pointerType==='touch') return;
    x=e.clientX;y=e.clientY;hasPointer=true;
    if(!raf)raf=requestAnimationFrame(()=>{raf=0;applyMask()});
  }
  function init(){
    window.addEventListener('pointermove',pointerMove,{passive:true,capture:true});
    window.addEventListener('resize',()=>{lastMask='';applyMask()},{passive:true});
    document.addEventListener('scroll',()=>{lastMask='';applyMask()},{passive:true,capture:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){hasPointer=false;applyMask()}});
    window.addEventListener('byz:market:real-page',refresh);
    setInterval(refresh,200);
    refresh();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
