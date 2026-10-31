/* V122 – Draw Historical Connection's already-laid-out HTML content into a
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
    canvas:document.createElement('canvas'), tiles:[], tileCount:0, ready:false, version:0, gpuUploaded:false,
    nativeScrollPx:0, worksStart:0, worksHeight:0, nativeActive:false,
    activate(){
      if (!this.ready || !this.gpuUploaded || !isActive()) return;
      if(this.nativeActive)return;
      // The native content already contains a reserved gap for the citations.
      // Put the *real* interactive Works Cited element into a separate overlay
      // outside the hidden HTML scroll container (like the About Us map).
      // This prevents scroll clipping and a second transform interpolation.
      const page=scroller?.querySelector('.byz-history-page');
      const works=page?.querySelector('#byz-h-works');
      if(works&&root){
        if(page)page.style.minHeight=(this.pageHeight||page.getBoundingClientRect().height)+'px';
        const rect=works.getBoundingClientRect();
        const style=getComputedStyle(works);
        this.worksPlaceholder=document.createElement('div');
        this.worksPlaceholder.className='byz-h-works-spacer-v122';
        this.worksPlaceholder.style.height=rect.height+'px';
        this.worksPlaceholder.style.marginBottom=style.marginBottom;
        works.replaceWith(this.worksPlaceholder);
        root.appendChild(works);
        this.worksNode=works;
      }
      this.nativeActive=true;
      document.body.classList.add('byz-h-native-content-v121');
      if(scroller){
        scroller.removeAttribute('data-lenis-prevent');
        scroller.removeAttribute('data-lenis-prevent-wheel');
        scroller.removeAttribute('data-lenis-prevent-touch');
      }
      this.onNativeScroll(this.nativeScrollPx);
    },
    deactivate(){
      if(this.worksNode&&this.worksPlaceholder?.isConnected){
        this.worksPlaceholder.replaceWith(this.worksNode);
      }
      this.worksNode=null;this.worksPlaceholder=null;
      const page=scroller?.querySelector('.byz-history-page');
      if(page)page.style.minHeight='';
      this.nativeActive=false;
      document.body.classList.remove('byz-h-native-content-v121');
      this.nativeScrollPx=0;this.lastWorksTop=undefined;
      if(scroller){
        scroller.setAttribute('data-lenis-prevent','true');
        scroller.setAttribute('data-lenis-prevent-wheel','true');
        scroller.setAttribute('data-lenis-prevent-touch','true');
      }
    },
    onNativeScroll(px){
      if(!this.nativeActive||!this.worksNode)return;
      this.nativeScrollPx=px;
      // Same smoothed scroll position as the 3D plane: no additional easing.
      const top=Math.round((this.worksStart-px)*100)/100;
      if(this.lastWorksTop!==top){
        this.lastWorksTop=top;
        this.worksNode.style.transform=`translate3d(-50%, ${top}px, 0)`;
      }
      const h=innerHeight;
      // Don't paint/capture a massive offscreen citation block.
      const onScreen=top<h+80&&top+(this.worksHeight||0)>-80;
      if(this.worksNode.dataset.nativeShown!==(onScreen?'1':'0')){
        this.worksNode.dataset.nativeShown=onScreen?'1':'0';
      }
    }
  };
  let ctx = bridge.canvas.getContext('2d', { alpha:true, desynchronized:true });
  let sliceTop=0, sliceBottom=Infinity;
  if (!ctx) return;
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality='high';
  if('fontKerning' in ctx)ctx.fontKerning='normal';
  if('textRendering' in ctx)ctx.textRendering='optimizeLegibility';
  let root, scroller, dirty=true, raf=0, active=false, capturing=false;
  let lastWidth=0,lastHeight=0,lastDocHeight=0, lastCapture=0;
  let imageListenerSet = new WeakSet();
  // V124: no extra WebGPU adapter request during the site's initial load.
  // The primary crystal renderer owns adapter/device creation. Historical
  // page capture stays capped, and happens only when Crystal 4 is opened.
  const gpuMaxTexture=8192, gpuMaxPixels=10000000;
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
    return top+r.height>=sliceTop&&top<=sliceBottom&&r.right>=box.left-40&&r.left<=box.right+40;
  }
  function resize() {
    const width=Math.max(1,Math.round(scroller.clientWidth));
    const viewport=Math.max(1,Math.round(scroller.clientHeight));
    const doc=Math.max(viewport,Math.round(scroller.scrollHeight));
    // One massive image was compressing every letter and photograph.  Divide
    // the DOCUMENT (not the viewport) into constant-resolution sections.
    // Aengel still moves/bends ONE native plane, with zero per-scroll uploads.
    // Four WebGPU-compatible texture bindings, no extra GPU adapter request.
    const count=Math.min(4,Math.max(1,Math.ceil(doc/3400)));
    const memory=Number(navigator.deviceMemory)||4;
    const desiredScale=memory>=6&&navigator.hardwareConcurrency>=6?1.45:1.0;
    const tilePixelBudget=memory>=6?9500000:6000000;
    const tileDocumentH=doc/count;
    const scale=Math.max(.55,Math.min(desiredScale,8192/Math.max(width,tileDocumentH),Math.sqrt(tilePixelBudget/(width*tileDocumentH))));
    const w=Math.max(1,Math.round(width*scale));
    const h=Math.max(1,Math.round(tileDocumentH*scale));
    bridge.documentPx=doc;
    bridge.viewportPx=viewport;
    bridge.tileCount=count;
    bridge.tileHeightPx=tileDocumentH;
    bridge.tileScaleX=w/width;
    bridge.tileScaleY=h/tileDocumentH;
    for(let k=0;k<count;k++){
      let tile=bridge.tiles[k];
      if(!tile){tile=bridge.tiles[k]=document.createElement('canvas');}
      if(tile.width!==w)tile.width=w;
      if(tile.height!==h)tile.height=h;
    }
    bridge.tiles.length=count;
    // The legacy texture is a transparent 1x1 fallback. It is NEVER sampled
    // while the six-section historical atlas is active.
    if(bridge.canvas.width!==1)bridge.canvas.width=1;
    if(bridge.canvas.height!==1)bridge.canvas.height=1;
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
      const oldCtx=ctx;
      for(let tileIndex=0;tileIndex<bridge.tileCount;tileIndex++){
        sliceTop=tileIndex*bridge.tileHeightPx;
        sliceBottom=(tileIndex+1)*bridge.tileHeightPx;
        ctx=bridge.tiles[tileIndex].getContext('2d',{alpha:true,desynchronized:true});
        if(!ctx)throw Error('Canvas context unavailable for historical section '+tileIndex);
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.imageSmoothingEnabled=true;
        ctx.imageSmoothingQuality='high';
        if('fontKerning' in ctx)ctx.fontKerning='normal';
        if('textRendering' in ctx)ctx.textRendering='optimizeLegibility';
        ctx.save();
        // Capture DOM coordinates at the same resolution as Introduction,
        // clipped to this section. No HTML canvas changes while scrolling.
        const sx=bridge.tileScaleX,sy=bridge.tileScaleY;
        ctx.setTransform(sx,0,0,sy,-box.left*sx,(scroller.scrollTop-box.top-sliceTop)*sy);
        root.querySelectorAll('.byz-history-page > .byz-h-hero, .byz-history-page > .byz-h-section:not(.byz-h-works), .byz-history-page > .byz-h-footer').forEach(drawBranch);
        ctx.restore();
      }
      ctx=oldCtx;
      sliceTop=0;sliceBottom=Infinity;
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
      ctx=bridge.canvas.getContext('2d');sliceTop=0;sliceBottom=Infinity;
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
      if(list.some(m=>{
        if(m.target?.closest?.('#byz-h-works'))return false;
        if(m.type==='childList'){
          const changed=[...m.addedNodes,...m.removedNodes];
          if(changed.length&&changed.every(n=>n.nodeType===1&&
            (n.matches?.('#byz-h-works,.byz-h-works-spacer-v122')||n.closest?.('#byz-h-works'))))return false;
        }
        return m.type==='childList'||m.attributeName==='src';
      })){
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
