/* V119 – Draw Historical Connection's already-laid-out HTML content into a
 * screen-aligned, live canvas texture. The ORIGINAL Aengel WebGPU project-
 * interior fluid compositor samples that texture and distorts its pixels.
 * No substitute cursor animation, no second WebGPU canvas, no mix-blend hack.
 * The original HTML remains in charge of layout, scrolling and interaction;
 * non-Works-Cited pixels are drawn into the real 3D scene surface.
 */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_FRAME_BRIDGE_V119__) return;
  const bridge = window.__BYZ_HISTORY_FRAME_BRIDGE_V119__ = {
    canvas:document.createElement('canvas'), ready:false, version:0, gpuUploaded:false,
    activate(){ if (this.ready && this.gpuUploaded && isActive()) document.body.classList.add('byz-h-native-content-v119'); },
    deactivate(){ document.body.classList.remove('byz-h-native-content-v119'); }
  };
  const ctx = bridge.canvas.getContext('2d', { alpha:true, desynchronized:true });
  if (!ctx) return;
  let root, scroller, lastScroll = NaN, lastWidth=0, lastHeight=0, dirty=true;
  let lastDraw=0, raf=0, active=false, animateUntil=0;
  let imageListenerSet = new WeakSet();

  const isActive=()=>!!document.querySelector('#byz-history-v93.byz-h-open');
  const isVisible=(r)=>r.bottom>=-40&&r.top<=innerHeight+40&&r.right>=-40&&r.left<=innerWidth+40;
  const fmtColor=(val, fallback)=>val && val!=='transparent'?val:fallback;
  function getRoot() {
    root = document.getElementById('byz-history-v93');
    scroller = root?.querySelector('.byz-history-scroll');
    return !!scroller;
  }

  function resize() {
    const width=Math.max(1,Math.round(innerWidth));
    const height=Math.max(1,Math.round(innerHeight));
    // Keep texture transfers affordable on modest GPUs; no giant atlas.
    const deviceScale=Math.max(.75,Math.min(1.25,devicePixelRatio||1));
    const maxPixels=2000000;
    const reduction=Math.min(1,Math.sqrt(maxPixels/(width*height*deviceScale*deviceScale)));
    const scale=deviceScale*reduction;
    const w=Math.max(1,Math.round(width*scale)),h=Math.max(1,Math.round(height*scale));
    if (bridge.canvas.width!==w||bridge.canvas.height!==h){
      bridge.canvas.width=w;bridge.canvas.height=h;
    }
    ctx.setTransform(w/width,0,0,h/height,0,0);
    return {width,height};
  }

  function border(el) {
    const style=getComputedStyle(el),r=el.getBoundingClientRect();
    if (!isVisible(r)) return;
    const thickness=parseFloat(style.borderTopWidth);
    if (thickness>0&&style.borderTopStyle!=='none'&&style.borderTopColor!=='transparent') {
      ctx.fillStyle=style.borderTopColor;
      ctx.fillRect(r.left,r.top,r.width,Math.min(2,thickness));
    }
  }

  function drawImage(el) {
    if(!el.complete||!el.naturalWidth){
      if(!imageListenerSet.has(el)){
        imageListenerSet.add(el);
        el.addEventListener('load',()=>{dirty=true;},{once:true});
      }
      return;
    }
    const r=el.getBoundingClientRect();
    if(!isVisible(r)||r.width<1||r.height<1)return;
    const style=getComputedStyle(el);
    ctx.save();
    const alpha=parseFloat(style.opacity);
    if(Number.isFinite(alpha))ctx.globalAlpha=alpha;
    const dropShadow=style.filter.match(/drop-shadow\([^)]*?([\d.]+)px\s+rgba?\(([^)]*)\)\)/);
    if(dropShadow){ctx.shadowColor='rgba(0,0,0,.33)';ctx.shadowBlur=12;ctx.shadowOffsetY=8;}
    const fit=style.objectFit;
    if(fit==='contain'||fit==='cover'){
      const iw=el.naturalWidth,ih=el.naturalHeight;
      const s=fit==='contain'?Math.min(r.width/iw,r.height/ih):Math.max(r.width/iw,r.height/ih);
      const dw=iw*s,dh=ih*s;
      if(fit==='cover'){ctx.beginPath();ctx.rect(r.left,r.top,r.width,r.height);ctx.clip();}
      ctx.drawImage(el,r.left+(r.width-dw)/2,r.top+(r.height-dh)/2,dw,dh);
    } else ctx.drawImage(el,r.left,r.top,r.width,r.height);
    ctx.restore();
  }

  function drawText(node) {
    const text=node.nodeValue;
    if(!text||!text.trim())return;
    const parent=node.parentElement;
    if(!parent)return;
    const style=getComputedStyle(parent);
    if(style.display==='none'||style.visibility==='hidden')return;
    const fontSize=parseFloat(style.fontSize)||16;
    const family=style.fontFamily||'Arial,sans-serif';
    const weight=style.fontWeight||'400';
    const fontStyle=style.fontStyle||'normal';
    const rect=document.createRange();
    ctx.save();
    ctx.font=`${fontStyle} ${weight} ${fontSize}px ${family}`;
    if('letterSpacing' in ctx) ctx.letterSpacing=style.letterSpacing==='normal'?'0px':style.letterSpacing;
    ctx.fillStyle=fmtColor(style.color,'white');
    ctx.textAlign='left';ctx.textBaseline='alphabetic';
    // Use the BROWSER's actual typeset line positions. This retains the
    // original CSS grid, spacing and wrapping without maintaining a clone.
    const regex=/\S+/g;let m;
    while((m=regex.exec(text))){
      rect.setStart(node,m.index);rect.setEnd(node,m.index+m[0].length);
      const parts=rect.getClientRects();
      for(const r of parts){
        if(!isVisible(r)||r.width<=0||r.height<=0)continue;
        // Text's glyph baseline is near the bottom of its browser line box.
        const y=r.bottom-Math.max(1,fontSize*.18);
        ctx.fillText(m[0],r.left,y);
      }
    }
    rect.detach?.(); ctx.restore();
  }

  function drawBranch(el){
    if(!el||el.nodeType!==1)return;
    const st=getComputedStyle(el);
    if(st.display==='none'||st.visibility==='hidden')return;
    const r=el.getBoundingClientRect();
    if(!isVisible(r))return;
    ctx.save();
    const ownOpacity=parseFloat(st.opacity);
    if(Number.isFinite(ownOpacity))ctx.globalAlpha*=ownOpacity;
    if(el.matches('.byz-h-card,.byz-h-section-title'))border(el);
    if(el.tagName==='IMG')drawImage(el);
    else if(el.tagName!=='CANVAS')for(const child of el.childNodes){
      if(child.nodeType===3)drawText(child);
      else if(child.nodeType===1)drawBranch(child);
    }
    ctx.restore();
  }

  function draw(t) {
    raf=0;
    if(!isActive()){
      active=false;bridge.ready=false;bridge.gpuUploaded=false;bridge.deactivate();
      return;
    }
    if(!getRoot())return;
    // Scroll and layout movement are the only reasons to update this canvas;
    // Aengel's own WebGPU compositor continues animating independently at 60fps.
    const scroll=scroller.scrollTop;
    if(!dirty&&t>=animateUntil&&scroll===lastScroll&&innerWidth===lastWidth&&innerHeight===lastHeight)return;
    if(t-lastDraw<40){raf=requestAnimationFrame(draw);return;}
    const {width,height}=resize();
    ctx.clearRect(0,0,width,height);
    root.querySelectorAll('.byz-h-hero,.byz-h-section:not(.byz-h-works)').forEach(drawBranch);
    bridge.version++;
    bridge.ready=true;
    lastDraw=t; lastScroll=scroll;lastWidth=innerWidth;lastHeight=innerHeight;
    dirty=false;active=true;
    if(t<animateUntil)schedule();
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(draw);}
  function tick(){
    if(isActive()){
      if(!active){dirty=true;active=true;animateUntil=performance.now()+1600;}
      schedule();
    } else if(active){
      active=false;bridge.ready=false;bridge.gpuUploaded=false;bridge.deactivate();
    }
  }
  function boot(){
    if(!getRoot()){setTimeout(boot,100);return;}
    scroller.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
    window.addEventListener('byz:market:real-page',()=>{dirty=true;tick();});
    document.fonts?.ready.then(()=>{dirty=true;schedule();}).catch(()=>{});
    const obs=new MutationObserver(()=>{dirty=true;schedule();});
    obs.observe(scroller,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src']});
    window.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
    setInterval(tick,180);
    tick();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
