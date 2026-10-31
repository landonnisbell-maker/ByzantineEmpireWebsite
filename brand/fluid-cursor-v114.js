/* V114 – resilient fluid mouse effects on crystal pages.
 * The original WebGPU fluid compositor may be absent on reduced-power hardware.
 * This CPU-light, capped-resolution composited overlay is an intentional visual
 * fallback. On the Historical Connection page it also sits above normal content,
 * with an exact exclusion for the Works Cited box.
 */
(() => {
  'use strict';
  if (window.__BYZ_FLUID_V114__) return;
  window.__BYZ_FLUID_V114__ = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.createElement('div');
  root.id = 'byz-fluid-v114';
  root.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  const lens = document.createElement('div');
  lens.className = 'byz-fluid-lens';
  root.append(canvas, lens);
  const ctx = canvas.getContext('2d', {alpha:true, desynchronized:true});
  if (!ctx) return;

  // The overlay is required on History even on fast computers: that page's DOM
  // historically sat *above* the native fluid, unlike the other two pages.
  const mem = Number(navigator.deviceMemory) || 0;
  const cores = Number(navigator.hardwareConcurrency) || 0;
  let needsFallback = !navigator.gpu || (mem > 0 && mem <= 4) || (cores > 0 && cores <= 4);
  const samples = [];
  let lastProbe = 0, probeCount = 0;
  function probe(now) {
    if (lastProbe && probeCount < 90) {
      const delta = now - lastProbe;
      if (delta > 0 && delta < 500) samples.push(delta);
      if (samples.length > 45) samples.shift();
      if (samples.length >= 30 && samples.filter(x => x > 37).length >= 17) needsFallback = true;
    }
    lastProbe = now; probeCount++;
    if (probeCount < 90) requestAnimationFrame(probe);
  }
  requestAnimationFrame(probe);
  if (navigator.gpu && typeof navigator.gpu.requestAdapter === 'function') {
    // Absence of a working adapter is different from the API merely existing.
    navigator.gpu.requestAdapter().then(adapter => { if (!adapter) needsFallback = true; }).catch(() => { needsFallback = true; });
  }

  let mode = '', particles = [], lastX = -999, lastY = -999, lastMoved = 0;
  let raf = 0, lastDraw = 0, w = 0, h = 0, scale = 1;
  let wasVisible = false;
  const colors = {
    history:[255,204,147], intro:[137,222,255], about:[248,174,254], crystals:[127,213,255]
  };
  const works = () => document.querySelector('#byz-history-v93.byz-h-open .byz-h-works-box');
  function currentMode() {
    const market = document.querySelector('#byz-v33-market');
    if (market && /byz-v33-open|byz-v106-direct|byz-v33-closing|byz-v110-recovering/.test(market.className)) return '';
    // V115: The Historical Connection uses the original Aengel shader instead.
    if (document.querySelector('#byz-history-v93.byz-h-open')) return '';
    if (!needsFallback) return '';
    if (document.querySelector('#byz-intro-v52.byz-intro-open')) return 'intro';
    if (document.querySelector('#byz-about-v40.byz-about-open')) return 'about';
    const state = window.__BYZ_MARKET_CURRENT_PAGE;
    if (state && state.status === 'exterior' && Number.isFinite(Number(state.index))) return 'crystals';
    return '';
  }
  function size() {
    const rect = root.getBoundingClientRect();
    w = Math.max(1, rect.width || window.innerWidth);
    h = Math.max(1, rect.height || window.innerHeight);
    // Limit offscreen buffer memory and bandwidth on entry-level laptops.
    scale = needsFallback ? .68 : .85;
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    ctx.setTransform(scale,0,0,scale,0,0);
  }
  function cutout() {
    if (mode !== 'history') return null;
    const box = works();
    return box ? box.getBoundingClientRect() : null;
  }
  function intersects(x,y,r,rect) {
    return !!rect && (x+r > rect.left && x-r < rect.right && y+r > rect.top && y-r < rect.bottom);
  }
  function updateMode() {
    const next = currentMode();
    if (next !== mode) {
      mode = next; particles = []; lastX = lastY = -999; lastMoved = 0;
      root.className = next ? `byz-fluid-active byz-fluid-${next}${needsFallback?' byz-fluid-slow':''}` : '';
      lens.style.opacity = '0';
      ctx.clearRect(0,0,w,h);
    }
    if (!root.isConnected && document.body) document.body.append(root);
    return !!mode;
  }
  function render(now) {
    raf = 0;
    if (!updateMode()) return;
    const interval = needsFallback ? 1000/26 : 1000/42;
    if (now-lastDraw < interval && now-lastMoved < 1800) {
      raf = requestAnimationFrame(render); return;
    }
    lastDraw = now;
    ctx.clearRect(0,0,w,h);
    particles = particles.filter(p => now - p.time < 680);
    const exclusion = cutout();
    ctx.save();
    if (exclusion) {
      ctx.beginPath();ctx.rect(0,0,w,h);
      ctx.rect(exclusion.left,exclusion.top,exclusion.width,exclusion.height);
      ctx.clip('evenodd');
    }
    const [r,g,b] = colors[mode] || colors.crystals;
    ctx.globalCompositeOperation = 'screen';
    for (const p of particles) {
      const t = (now-p.time)/680;
      const energy = (1-t)*(1-t);
      const rad = p.radius + t*(needsFallback?41:57);
      const alpha = energy * (needsFallback?.19:.26) * p.strength;
      if (alpha <= .004) continue;
      ctx.lineWidth = 1.6 + energy * 3;
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();ctx.ellipse(p.x,p.y,rad,rad*.64,p.angle,0,Math.PI*1.9);ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255,248,239,${alpha*.65})`;
      ctx.beginPath();ctx.ellipse(p.x+3,p.y-2,rad*.71,rad*.52,p.angle+.15,.22,Math.PI*1.63);ctx.stroke();
    }
    ctx.restore();
    if (particles.length || now-lastMoved < 280) raf = requestAnimationFrame(render);
    else lens.style.opacity = '0';
  }
  function onMove(e) {
    if (!updateMode() || e.pointerType === 'touch') return;
    const x = e.clientX, y = e.clientY;
    const region = cutout();
    if (intersects(x,y,needsFallback?67:83,region)) {
      lens.style.opacity = '0'; lastX = lastY = -999; return;
    }
    lens.style.transform = `translate3d(${x}px,${y}px,0)`;
    lens.style.opacity = '.84';
    const dist = Math.hypot(x-lastX,y-lastY);
    if (dist > 5 && dist < 900) {
      const count = Math.min(3, Math.ceil(dist / 32));
      for (let i=0;i<count;i++) {
        const t=(i+1)/count;
        particles.push({x:lastX+(x-lastX)*t,y:lastY+(y-lastY)*t,
          time:performance.now(),radius:10+Math.min(16,dist*.12),
          strength:Math.min(1.25,.35+dist/80),angle:Math.atan2(y-lastY,x-lastX)});
      }
      if (particles.length > 36) particles.splice(0,particles.length-36);
    }
    lastX=x;lastY=y;lastMoved=performance.now();
    if (!raf) raf=requestAnimationFrame(render);
  }
  function reset() {lens.style.opacity = '0';particles = [];lastX=lastY=-999;}
  function start() {
    if (!document.body) return;
    document.body.append(root);size();
    window.addEventListener('pointermove',onMove,{capture:true,passive:true});
    window.addEventListener('pointerleave',reset,{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden) reset()});
    window.addEventListener('resize',()=>{size();reset()},{passive:true});
    window.addEventListener('byz:market:real-page',updateMode);
    // React can replace the body/overlays on first hydration.
    setInterval(updateMode,550);
    updateMode();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
