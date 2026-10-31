/* V121 – Draw Historical Connection's already-laid-out HTML content into a
 * screen-aligned, live canvas texture. The ORIGINAL Aengel WebGPU project-
 * interior fluid compositor samples that texture and distorts its pixels.
 * No substitute cursor animation, no second WebGPU canvas, no mix-blend hack.
 * The original HTML supplies only initial measurements and Works Cited;
 * Aengel owns scrolling and velocity, identical to Introduction;
 * non-Works-Cited pixels are drawn into the real 3D scene surface.
 */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_FRAME_BRIDGE_V121__) return;
  const bridge = window.__BYZ_HISTORY_FRAME_BRIDGE_V121__ = {
    canvas:document.createElement('canvas'), ready:false, version:0, gpuUploaded:false,
    nativeScrollPx:0, worksStart:0, worksHeight:0, nativeActive:false,
    activate(){
      if (!this.ready || !this.gpuUploaded || !isActive()) return;
      this.nativeActive=true;
      // Keep the original page's scroll extent after Works Cited becomes fixed.
      const page=scroller?.querySelector('.byz-history-page');
      if(page)page.style.minHeight=this.pageHeight+'px';
      document.body.classList.add('byz-h-native-content-v121');
      if(scroller) {
        scroller.removeAttribute('data-lenis-prevent');
        scroller.removeAttribute('data-lenis-prevent-wheel');
        scroller.removeAttribute('data-lenis-prevent-touch');
      }
      this.onNativeScroll(this.nativeScrollPx);
    },
    deactivate(){
      this.nativeActive=false;
      document.body.classList.remove('byz-h-native-content-v121');
      const page=scroller?.querySelector('.byz-history-page');
      if(page)page.style.minHeight='';
      this.nativeScrollPx=0;this.lastWorksTop=undefined;
      if(scroller) {
        scroller.setAttribute('data-lenis-prevent','true');
        scroller.setAttribute('data-lenis-prevent-wheel','true');
        scroller.setAttribute('data-lenis-prevent-touch','true');
      }
    },
    onNativeScroll(px){
      if(!this.nativeActive)return;
      this.nativeScrollPx=px;
      // This changes only the independent Works Cited HTML compositor;
      // it does not scroll the DOM or rerender its canvas texture.
      const top=Math.round(this.worksStart-px);
      if(this.lastWorksTop!==top){
        this.lastWorksTop=top;
        root?.style.setProperty('--byz-h-works-top',top+'px');
      }
    }
  };
  const ctx = bridge.canvas.getContext('2d', { alpha:true, desynchronized:true });
  if (!ctx) return;
  let root, scroller, dirty=true, raf=0, active=false, capturing=false;
  let lastWidth=0,lastHeight=0,lastDocHeight=0, lastCapture=0;
  let imageListenerSet = new WeakSet();
  const isActive=()=>!!document.querySelector('#byz-history-v93.byz-h-open');
  const fmtColor=(val, fallback)=>val && val!=='transparent'?val:fallback;
  // The full texture is built only when the content or dimensions change.
  // Native Three.js translates/bends the plane during scrolling at full FPS.
  const bridgeState=bridge;
  bridgeState.scrollPx=0; bridgeState.documentPx=0; bridgeState.viewportPx=innerHeight;
  bridgeState.getActiveScroll=()=>isActive()&&bridge.ready?bridge.scrollPx:null;
  function getRoot() {
    root = document.getElementById('byz-history-v93');
    scroller = root?.querySelector('.byz-history-scroll');
    return !!scroller;
  }
  function isVisible(r) {
    // Work in the scroller's document space, never the visible viewport.
    // Rectangles outside the screen MUST be included in a full-page snapshot.
    const box=scroller.getBoundingClientRect();
    const top=r.top-box.top+scroller.scrollTop;
    return top+r.height>=0&&top<=bridge.documentPx&&r.right>=box.left-40&&r.left<=box.right+40;
  }
  function resize() {
    const width=Math.max(1,Math.round(scroller.clientWidth));
    const viewport=Math.max(1,Math.round(scroller.clientHeight));
    const doc=Math.max(viewport,Math.round(scroller.scrollHeight));
    // Aengel's native content texture is similarly capped at 8192px high.
    // Cap total allocation too to protect low-end and integrated GPUs.
    const maxTexture=8192, maxPixels=10000000;
    const preferredScale=Math.min(1.1,Math.max(.8,Math.min(devicePixelRatio||1,1.1)));
    const scale=Math.min(preferredScale,maxTexture/doc,maxTexture/width,Math.sqrt(maxPixels/(width*doc)));
    const w=Math.max(1,Math.round(width*scale)), h=Math.max(1,Math.round(doc*scale));
    if (bridge.canvas.width!==w||bridge.canvas.height!==h) {
      bridge.canvas.width=w;bridge.canvas.height=h;
    }
    bridge.documentPx=doc;bridge.viewportPx=viewport;
    ctx.setTransform(w/width,0,0,h/doc,0,0);
    return {width,viewport,doc};
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
        el.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
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

  function capture() {
    raf=0;
    if(!isActive()){
      active=false;bridge.ready=false;bridge.gpuUploaded=false;bridge.deactivate();return;
    }
    if(!getRoot())return;
    const viewportWidth=scroller.clientWidth,viewportHeight=scroller.clientHeight,docHeight=scroller.scrollHeight;
    if (!dirty && bridge.ready && viewportWidth===lastWidth && viewportHeight===lastHeight && docHeight===lastDocHeight)return;
    if(capturing)return;
    capturing=true;
    try {
      // The page retains native HTML layout and scrolling, but we capture its
      // static, fully revealed content just ONCE, not on every scroll event.
      root.classList.add('byz-h-capture-v121');
      const pageEl=scroller.querySelector('.byz-history-page');
      if(pageEl&&!bridge.nativeActive)bridge.pageHeight=pageEl.getBoundingClientRect().height;
      const works=root.querySelector('#byz-h-works');
      const wr=works?.getBoundingClientRect();
      const sr=scroller.getBoundingClientRect();
      if(wr&&!bridge.nativeActive){bridge.worksStart=wr.top-sr.top+scroller.scrollTop;bridge.worksHeight=wr.height;}
      const {width,viewport,doc}=resize();
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,bridge.canvas.width,bridge.canvas.height);
      ctx.restore();
      const box=scroller.getBoundingClientRect();
      ctx.save();
      // Coordinates of DOM text are viewport-relative; convert to the full
      // scroll-document origin, without changing the actual HTML scrollTop.
      ctx.translate(-box.left,scroller.scrollTop-box.top);
      root.querySelectorAll('.byz-history-page > .byz-h-hero, .byz-history-page > .byz-h-section:not(.byz-h-works), .byz-history-page > .byz-h-footer').forEach(drawBranch);
      ctx.restore();
      bridge.version++;
      bridge.ready=true;
      lastCapture=performance.now();
      lastWidth=viewportWidth;lastHeight=viewportHeight;lastDocHeight=docHeight;
      dirty=false;
    } catch(e) {
      // On failure, HTML remains visible rather than going black.
      bridge.deactivate();bridge.ready=false;
      console.warn('[V121] Historical canvas atlas failed; retaining HTML',e);
    } finally {
      root.classList.remove('byz-h-capture-v121');
      capturing=false;
    }
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(capture);}
  function tick(){
    if(isActive()){
      active=true;
      if(!bridge.ready)dirty=true;
      // Native store drives the plane. Reading HTML scrollTop here caused V120 jitter.
      bridge.scrollPx=0;
      if(dirty || !bridge.ready || scroller.clientWidth!==lastWidth || scroller.clientHeight!==lastHeight || scroller.scrollHeight!==lastDocHeight)schedule();
    } else if(active){
      active=false;bridge.ready=false;bridge.gpuUploaded=false;bridge.deactivate();
    }
  }
  function boot(){
    if(!getRoot()){setTimeout(boot,100);return;}
    // Read scrollTop only; DO NOT rasterize, redraw or upload a texture per tick.
    // No HTML scroll handler. Input goes straight to Aengel's native scroll store.
    window.addEventListener('resize',()=>{dirty=true; schedule();},{passive:true});
    window.addEventListener('byz:market:real-page',()=>{
      if(isActive()&&!active){dirty=true;bridge.ready=false;}
      tick();
    });
    document.fonts?.ready.then(()=>{dirty=true;schedule();}).catch(()=>{});
    const obs=new MutationObserver(list=>{
      // Reveal class mutations are cosmetic. They DO NOT change our capture.
      if(list.some(m=>m.type==='childList'||m.attributeName==='src')){
        dirty=true;schedule();
      }
    });
    obs.observe(scroller,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
    // Images beyond the viewport must load before they're used in the atlas.
    scroller.querySelectorAll('img').forEach(img=>{
      img.loading='eager';
      if(!img.complete){
        img.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
        img.addEventListener('error',()=>{dirty=true;schedule();},{once:true});
      }
    });
    window.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
    setInterval(tick,150);
    tick();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
