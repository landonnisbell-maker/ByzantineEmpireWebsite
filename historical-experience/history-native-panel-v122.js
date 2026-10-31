/* V131 — Direct-drawn Historical content with a permanent native base texture.
   HTML supplies its existing editorial layout and accessible Works Cited.
   We compile a list of TEXT and IMAGE draw commands only when opening or
   resizing, just as the original Aengel pages prepare content canvases.
   The base texture is always present; higher-res tiles enhance it safely.
*/
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_FRAME_BRIDGE_V121__) return;
  let root, scroller, dirty=true, frame=0, active=false, building=false;
  let lastWidth=0,lastHeight=0,lastDoc=0;
  const watchedImages=new WeakSet();
  const isActive=()=>!!document.querySelector('#byz-history-v93.byz-h-open');
  const bridge=window.__BYZ_HISTORY_FRAME_BRIDGE_V121__={
    canvas:document.createElement('canvas'),tiles:[],tileCount:0,tilesReady:false,
    ready:false,version:0,gpuUploaded:false,nativeActive:false,
    documentPx:0,viewportPx:0,scrollPx:0,nativeScrollPx:0,
    worksStart:0,worksHeight:0,commandCount:0,
    activate(){
      if(!this.ready||!this.gpuUploaded||!isActive()||this.nativeActive)return;
      const page=scroller?.querySelector('.byz-history-page');
      const works=page?.querySelector('#byz-h-works');
      if(works&&root){
        page.style.minHeight=(this.pageHeight||page.getBoundingClientRect().height)+'px';
        const rect=works.getBoundingClientRect(), style=getComputedStyle(works);
        const spacer=document.createElement('div');spacer.className='byz-h-works-spacer-v122';
        spacer.style.height=rect.height+'px';spacer.style.marginBottom=style.marginBottom;
        works.replaceWith(spacer);root.appendChild(works);
        this.worksPlaceholder=spacer;this.worksNode=works;
      }
      this.nativeActive=true;
      document.body.classList.add('byz-h-native-content-v121');
      scroller?.removeAttribute('data-lenis-prevent');
      scroller?.removeAttribute('data-lenis-prevent-wheel');
      scroller?.removeAttribute('data-lenis-prevent-touch');
      this.onNativeScroll(this.nativeScrollPx);
    },
    deactivate(){
      if(this.worksNode&&this.worksPlaceholder?.isConnected){this.worksPlaceholder.replaceWith(this.worksNode);}
      this.worksNode=null;this.worksPlaceholder=null;
      const page=scroller?.querySelector('.byz-history-page');
      if(page)page.style.minHeight='';
      this.nativeActive=false;this.nativeScrollPx=0;this.lastWorksTop=undefined;
      document.body.classList.remove('byz-h-native-content-v121');
      scroller?.setAttribute('data-lenis-prevent','true');
      scroller?.setAttribute('data-lenis-prevent-wheel','true');
      scroller?.setAttribute('data-lenis-prevent-touch','true');
    },
    onNativeScroll(px){
      if(!this.nativeActive||!this.worksNode)return;
      this.nativeScrollPx=px;
      const top=Math.round((this.worksStart-px)*100)/100;
      const inRange=top<innerHeight+160&&top+(this.worksHeight||0)>-160;
      if(inRange&&this.lastWorksTop!==top){
        this.lastWorksTop=top;
        this.worksNode.style.transform=`translate3d(-50%, ${top}px, 0)`;
      }
      if(this.worksNode.dataset.nativeShown!==(inRange?'1':'0'))this.worksNode.dataset.nativeShown=inRange?'1':'0';
    }
  };
  bridge.canvas.width=bridge.canvas.height=1;
  bridge.getActiveScroll=()=>isActive()&&bridge.ready?bridge.scrollPx:null;
  function findRoot(){root=document.getElementById('byz-history-v93');scroller=root?.querySelector('.byz-history-scroll');return !!scroller;}
  const visibleStyle=style=>style.display!=='none'&&style.visibility!=='hidden';
  const num=x=>Number.parseFloat(x)||0;
  function createNativeCommands(width,doc){
    // Use the real page's typography and CSS grid solely for one-time layout.
    // Unlike a rasterized HTML screenshot, text stays as native fillText
    // commands and every image is drawn from its original high-res source.
    const commands=[];
    const origin=scroller.getBoundingClientRect();
    const scroll=scroller.scrollTop;
    const xRect=r=>r.left-origin.left;
    const yRect=r=>r.top-origin.top+scroll;
    const add=(command)=>{if(command.y+command.h>=0&&command.y<=doc)commands.push(command);};
    function textNode(node){
      const text=node.nodeValue;
      if(!text||!text.trim())return;
      const parent=node.parentElement;if(!parent)return;
      const s=getComputedStyle(parent);if(!visibleStyle(s))return;
      const fontSize=num(s.fontSize)||16;
      const font=`${s.fontStyle||'normal'} ${s.fontWeight||'400'} ${fontSize}px ${s.fontFamily||'Arial, sans-serif'}`;
      const range=document.createRange();
      const regex=/\S+/g;
      let match,line=null;
      function flush(){
        if(!line)return;
        let value=text.slice(line.start,line.end).replace(/\s+/g,' ');
        if(value.trim())add({kind:'text',value,x:line.x,y:line.y,h:line.h,
          font,color:s.color||'#fff',letterSpacing:s.letterSpacing==='normal'?'0px':s.letterSpacing});
        line=null;
      }
      while((match=regex.exec(text))){
        range.setStart(node,match.index);range.setEnd(node,match.index+match[0].length);
        for(const r of range.getClientRects()){
          if(r.width<=0||r.height<=0)continue;
          const x=xRect(r),top=yRect(r),base=top+r.height-Math.max(1,fontSize*.18);
          const end=match.index+match[0].length;
          if(line&&Math.abs(line.top-top)>Math.max(2,fontSize*.28))flush();
          if(!line)line={start:match.index,end,x,y:base,top,h:r.height};
          else line.end=end;
        }
      }
      flush();range.detach?.();
    }
    function walk(el){
      if(!el||el.nodeType!==1||el.id==='byz-h-works'||el.classList.contains('byz-h-works-spacer-v122'))return;
      const s=getComputedStyle(el);if(!visibleStyle(s))return;
      const r=el.getBoundingClientRect();
      const x=xRect(r),y=yRect(r);
      if(y>doc+50||y+r.height< -50)return;
      if(el.matches('.byz-h-card,.byz-h-section-title')){
        const bw=num(s.borderTopWidth);
        if(bw>0&&s.borderTopStyle!=='none')add({kind:'rule',x,y,h:2,w:r.width,color:s.borderTopColor});
      }
      if(el.tagName==='IMG'){
        if(el.complete&&el.naturalWidth>0){
          const iw=el.naturalWidth,ih=el.naturalHeight;
          let dx=x,dy=y,dw=r.width,dh=r.height;
          const fit=s.objectFit;
          if(fit==='contain'||fit==='cover'){
            const scale=fit==='contain'?Math.min(dw/iw,dh/ih):Math.max(dw/iw,dh/ih);
            const ww=iw*scale,hh=ih*scale;dx+=(dw-ww)/2;dy+=(dh-hh)/2;dw=ww;dh=hh;
          }
          add({kind:'image',image:el,x:dx,y:dy,w:dw,h:dh,clip:fit==='cover'?{x,y,w:r.width,h:r.height}:null});
        }else if(!watchedImages.has(el)){
          watchedImages.add(el);
          el.loading='eager';
          el.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
          el.addEventListener('error',()=>{dirty=true;schedule();},{once:true});
        }
        return;
      }
      if(el.tagName==='CANVAS')return;
      for(const child of el.childNodes){
        if(child.nodeType===3)textNode(child);
        else if(child.nodeType===1)walk(child);
      }
    }
    scroller.querySelectorAll('.byz-history-page > .byz-h-hero, .byz-history-page > .byz-h-section:not(.byz-h-works), .byz-history-page > .byz-h-footer').forEach(walk);
    return commands;
  }
  function paintTile(canvas,commands,top,sectionH,width,scale){
    const w=Math.max(1,Math.round(width*scale)),h=Math.max(1,Math.round(sectionH*scale));
    if(canvas.width!==w)canvas.width=w;
    if(canvas.height!==h)canvas.height=h;
    const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
    if(!ctx)throw Error('Native historical canvas is unavailable');
    const sx=w/width,sy=h/sectionH;
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);
    ctx.setTransform(sx,0,0,sy,0,-top*sy);
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    if('fontKerning' in ctx)ctx.fontKerning='normal';
    if('textRendering' in ctx)ctx.textRendering='optimizeLegibility';
    ctx.textBaseline='alphabetic';ctx.textAlign='left';
    for(const cmd of commands){
      if(cmd.y+cmd.h<top-4||cmd.y>top+sectionH+4)continue;
      if(cmd.kind==='text'){
        ctx.font=cmd.font;
        ctx.fillStyle=cmd.color;
        if('letterSpacing' in ctx)ctx.letterSpacing=cmd.letterSpacing;
        ctx.fillText(cmd.value,cmd.x,cmd.y);
      }else if(cmd.kind==='image'){
        ctx.save();
        if(cmd.clip){ctx.beginPath();ctx.rect(cmd.clip.x,cmd.clip.y,cmd.clip.w,cmd.clip.h);ctx.clip();}
        ctx.drawImage(cmd.image,cmd.x,cmd.y,cmd.w,cmd.h);ctx.restore();
      }else if(cmd.kind==='rule'){
        ctx.fillStyle=cmd.color;ctx.fillRect(cmd.x,cmd.y,cmd.w,1);
      }
    }
    ctx.setTransform(1,0,0,1,0,0);
  }
  function build(){
    frame=0;
    if(building||!isActive()||!findRoot())return;
    if(bridge.nativeActive&&!dirty)return;
    building=true;
    try{
      // Never hide the HTML before native GPU upload and shader completion.
      if(bridge.nativeActive){bridge.deactivate();bridge.gpuUploaded=false;}
      root.classList.add('byz-h-capture-v121');
      const width=Math.max(1,Math.round(scroller.clientWidth));
      const viewport=Math.max(1,Math.round(scroller.clientHeight));
      const doc=Math.max(viewport,Math.round(scroller.scrollHeight));
      const page=scroller.querySelector('.byz-history-page');
      bridge.pageHeight=page?.getBoundingClientRect().height||doc;
      const works=page?.querySelector('#byz-h-works'),wr=works?.getBoundingClientRect(),sr=scroller.getBoundingClientRect();
      if(wr){bridge.worksStart=wr.top-sr.top+scroller.scrollTop;bridge.worksHeight=wr.height;}
      // Aengel's Introduction builder similarly produces commands first,
      // then paints them directly to its canvas at the selected resolution.
      const commands=createNativeCommands(width,doc);
      const cores=Number(navigator.hardwareConcurrency)||4;
      const memory=Number(navigator.deviceMemory)||4;
      const strong=cores>=8&&memory>=6;
      const medium=cores>=6&&memory>=4;
      const count=strong?6:medium?5:4;
      const sectionH=doc/count;
      const pixelBudget=strong?9500000:medium?5500000:3000000;
      const targetScale=strong?2:medium?1.45:1.05;
      const maxDimension=8192;
      const scale=Math.max(.5,Math.min(targetScale,maxDimension/width,maxDimension/sectionH,
        Math.sqrt(pixelBudget/(width*sectionH))));
      // Critical V131 safety fix: always paint the original single-texture
      // 3D content path FIRST. V130 left bridge.canvas as a transparent 1x1,
      // so switching shader stages could make the entire page disappear.
      // Higher-resolution tiles are an optional upgrade, never the only image.
      const baseScale=Math.min(1,8192/width,8192/doc,
        Math.sqrt(4500000/(width*doc)));
      paintTile(bridge.canvas,commands,0,doc,width,Math.max(.1,baseScale));
      const next=[];
      const safeCount=Math.min(4,count);
      const safeSectionH=doc/safeCount;
      const safeScale=Math.max(.5,Math.min(targetScale,maxDimension/width,
        maxDimension/safeSectionH,Math.sqrt(pixelBudget/(width*safeSectionH))));
      for(let i=0;i<safeCount;i++){
        const canvas=bridge.tiles[i]||document.createElement('canvas');
        paintTile(canvas,commands,i*safeSectionH,safeSectionH,width,safeScale);
        next.push(canvas);
      }
      bridge.tiles=next;
      bridge.tilesReady=true;
      bridge.tileCount=next.length;
      bridge.documentPx=doc;
      bridge.viewportPx=viewport;
      bridge.commandCount=commands.length;
      bridge.nativeScale=safeScale;
      // A new build must be uploaded before hiding the live HTML.
      bridge.ready=true;
      bridge.gpuUploaded=false;
      bridge.version++;
      lastWidth=width;lastHeight=viewport;lastDoc=doc;
      dirty=false;
    }catch(err){
      bridge.ready=false;bridge.tilesReady=false;bridge.gpuUploaded=false;
      bridge.deactivate();
      console.warn('[V131] Native historical content unavailable; retaining HTML',err);
    }finally{
      root?.classList.remove('byz-h-capture-v121');
      building=false;
    }
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(build);}
  function tick(){
    if(isActive()){
      active=true;bridge.scrollPx=0;
      if(bridge.nativeActive){if(dirty)schedule();return;}
      if(dirty||!bridge.ready||scroller?.clientWidth!==lastWidth||scroller?.clientHeight!==lastHeight||scroller?.scrollHeight!==lastDoc)schedule();
    }else if(active){
      active=false;bridge.ready=false;bridge.tilesReady=false;
      bridge.gpuUploaded=false;bridge.deactivate();dirty=true;
    }
  }
  function boot(){
    if(!findRoot()){setTimeout(boot,100);return;}
    window.addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
    window.addEventListener('byz:market:real-page',()=>{if(isActive()&&!active){dirty=true;bridge.ready=false;}tick();});
    document.fonts?.ready.then(()=>{dirty=true;schedule();}).catch(()=>{});
    const observer=new MutationObserver(changes=>{
      if(changes.some(m=>{
        if(m.target?.closest?.('#byz-h-works'))return false;
        if(m.type==='childList'){
          const nodes=[...m.addedNodes,...m.removedNodes];
          if(nodes.length&&nodes.every(n=>n.nodeType===1&&
            (n.matches?.('#byz-h-works,.byz-h-works-spacer-v122')||n.closest?.('#byz-h-works'))))return false;
        }
        return m.type==='childList'||m.attributeName==='src';
      })){dirty=true;schedule();}
    });
    observer.observe(scroller,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
    scroller.querySelectorAll('img').forEach(el=>{el.loading='eager';
      if(!el.complete){el.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
        el.addEventListener('error',()=>{dirty=true;schedule();},{once:true});}
    });
    window.addEventListener('load',()=>{dirty=true;schedule();},{once:true});
    setInterval(tick,150);tick();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
