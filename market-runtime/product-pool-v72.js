/* V72 — Persistent, independent, preinitialized Palia product pages.
   One iframe/document per product, mounted during the site's original loading screen.
   We never navigate a product iframe when a cloth card is clicked. */
(() => {
  'use strict';
  const ORIGIN=location.origin;
  const BASE='/ByzantineEmpireWebsite/';
  const PRODUCTS=Object.freeze([
    {slug:'paramerion-sword',title:'Paramerion Sword'},
    {slug:'gold-jewelry',title:'Gold Jewelry'},
    {slug:'food-items',title:'Food Items'},
    {slug:'coins',title:'Coin Exchange Service'},
    {slug:'silk-textiles',title:'Silk Textiles'}
  ]);
  const CLOTH_IDS=Object.freeze({'cgtrader':0,'w3r-one':1,'presti':2,'grandir':3,'reaali':4,'coin-exchange-service':3,'coins':3});
  const gallery=document.getElementById('byz-gallery');
  const pool=document.getElementById('byz-palia-pool');
  const status=document.getElementById('byz-status');
  const retry=document.getElementById('byz-retry');
  const closeButton=document.getElementById('byz-new-page-return');
  if(!gallery||!pool||!status||!retry||!closeButton)return;
  const debug=new URLSearchParams(location.search).has('byzdebug');
  const log=(...args)=>{if(debug)console.info('[V72 warm products]',...args)};
  const states=PRODUCTS.map((product,index)=>({product,index,frame:null,started:false,loaded:false,hero:false,applied:false,scene:false,ready:false,failed:false}));
  const PREFIX=BASE+'market-runtime/products/';
  const pathSlug=location.pathname.startsWith(PREFIX)?location.pathname.slice(PREFIX.length).replace(/\/index\.html$/,'').replace(/\/$/,''):'';
  let activeIndex=PRODUCTS.findIndex(p=>p.slug===pathSlug);
  let productRequested=false, leaving=false, galleryReady=false, shellReadySignalled=false;
  let failureTimeout=null, foregroundTimer=null, warmCursor=0;
  const constrained=matchMedia('(max-width:680px)').matches || (navigator.deviceMemory&&navigator.deviceMemory<=3);
  const maxResident=constrained?2:5;
  let recent=[];
  function touch(i){recent=recent.filter(v=>v!==i);recent.push(i);}
  function evictIfNeeded(keep){
    if(!constrained)return;
    const resident=states.filter(s=>s.frame);
    if(resident.length<=maxResident)return;
    const victim=recent.find(i=>i!==keep && states[i].frame && i!==activeIndex);
    if(victim===undefined)return;
    const s=states[victim];s.frame.remove();s.frame=null;s.started=s.loaded=s.hero=s.applied=s.scene=s.ready=false;
    recent=recent.filter(v=>v!==victim);
    log('reclaimed idle product WebGL context',s.product.slug);
  }
  const safeMessage=(frame,payload)=>{try{frame?.contentWindow?.postMessage(payload,ORIGIN)}catch(e){log('message failed',e)}};
  function urlFor(p){const url=new URL(BASE+'market-runtime/palia/work/palia/entries/'+p.slug+'/index.html',ORIGIN);
    url.searchParams.set('no-loader','');url.searchParams.set('byzantine-palia-preload','1');url.searchParams.set('byzantine-lite-fullscreen','1');
    url.searchParams.set('byz-product',p.slug);url.searchParams.set('v','72.0');return url.pathname+url.search;}
  function makeFrame(state){
    if(state.frame)return state.frame;
    const frame=document.createElement('iframe');
    frame.className='byz-palia-frame';
    frame.dataset.productSlug=state.product.slug;
    frame.title=state.product.title+' product details';
    frame.setAttribute('allow','autoplay; fullscreen');
    frame.setAttribute('loading','eager');
    frame.setAttribute('tabindex','-1');
    frame.setAttribute('aria-hidden','true');
    frame.addEventListener('load',()=>{
      state.loaded=true;
      safeMessage(frame,{type:'byz:palia:ping'});
      log('document loaded',state.product.slug);
      // A ready signal may have arrived before the iframe's load event.
      updateReady(state);
    });
    state.frame=frame;pool.appendChild(frame);
    touch(state.index);evictIfNeeded(state.index);
    state.started=true;
    frame.src=urlFor(state.product);
    log('warming',state.product.slug);
    return frame;
  }
  function warmNext(){
    if(warmCursor>=Math.min(states.length,maxResident))return;
    const next=states[warmCursor++];
    makeFrame(next);
    // Stagger initializations so the loader and the crystal shader aren't stalled.
    // All five are still initialized before a user typically reaches the Market.
    if(warmCursor<Math.min(states.length,maxResident))setTimeout(warmNext,520);
  }
  function signalReady(){
    if(galleryReady&&!shellReadySignalled){shellReadySignalled=true;window.parent!==window&&window.parent.postMessage({type:'byz:market:ready'},ORIGIN)}
  }
  function clearPrompt(){clearTimeout(foregroundTimer);foregroundTimer=null;status.classList.remove('visible');}
  function chooseIndex(payload){
    if(payload && Number.isInteger(Number(payload.index))&&Number(payload.index)>=0&&Number(payload.index)<PRODUCTS.length)return Number(payload.index);
    const slug=String(payload?.slug||'');if(Object.prototype.hasOwnProperty.call(CLOTH_IDS,slug))return CLOTH_IDS[slug];
    const direct=PRODUCTS.findIndex(p=>p.slug===slug||p.title===payload?.title);return direct;
  }
  function showProduct(){
    if(!productRequested||leaving||activeIndex<0)return;
    const state=states[activeIndex];if(!state.ready)return;
    clearTimeout(failureTimeout);retry.classList.remove('visible');clearPrompt();
    pool.classList.add('is-active');
    states.forEach((s,i)=>{
      if(!s.frame)return;
      const chosen=i===activeIndex;
      s.frame.classList.toggle('byz-palia-active',chosen);
      s.frame.setAttribute('aria-hidden',String(!chosen));
      s.frame.tabIndex=chosen?0:-1;
      if(chosen){
        // Same document remains active, just reset its scroll position on reopening.
        try{s.frame.contentWindow.scrollTo({top:0,left:0,behavior:'instant'});}catch(e){}
      }
    });
    document.body.classList.remove('byz-product-leaving');
    document.body.classList.add('byz-product-open');
    log('instant product reveal',state.product.slug);
  }
  function updateReady(s){
    const nowReady=s.applied && s.hero && s.scene;
    if(nowReady&&!s.ready){s.ready=true;log('preinitialized',s.product.slug);}
    if(nowReady&&productRequested&&activeIndex===s.index)showProduct();
  }
  function openProduct(payload={},options={}){
    if(leaving)return;
    const i=chooseIndex(payload);
    if(i<0)return;
    activeIndex=i;productRequested=true;
    // Show the gallery rather than the previous product if the selected frame is not ready.
    document.body.classList.remove('byz-product-open','byz-product-leaving');
    pool.classList.remove('is-active');
    states.forEach(old=>old.frame?.classList.remove('byz-palia-active'));
    const s=states[i];makeFrame(s);touch(i);evictIfNeeded(i);
    if(!options.fromHistory){const route=PREFIX+s.product.slug+'/';if(location.pathname!==route)history.pushState({byzProduct:s.product.slug},'',route)}
    retry.classList.remove('visible');clearTimeout(failureTimeout);clearPrompt();
    if(s.ready){showProduct();return;}
    // Only show a progress notice if warm-up hasn't finished within 350 ms.
    foregroundTimer=setTimeout(()=>{if(productRequested&&!states[activeIndex]?.ready)status.classList.add('visible')},350);
    failureTimeout=setTimeout(()=>{if(productRequested&&!states[activeIndex]?.ready){clearPrompt();retry.classList.add('visible')}},20000);
    safeMessage(s.frame,{type:'byz:palia:ping'});
    log('waiting on first startup',s.product.slug);
  }
  function exitProduct(options={}){
    if(!productRequested&&!document.body.classList.contains('byz-product-open'))return;
    productRequested=false;clearTimeout(failureTimeout);clearPrompt();retry.classList.remove('visible');
    if(!options.fromHistory && location.pathname.startsWith(PREFIX))history.replaceState({byzMarket:true},'',BASE+'market/');
    document.body.classList.remove('byz-product-open');
    document.body.classList.add('byz-product-leaving');
    pool.classList.remove('is-active');
    // Do not destroy product documents! Re-opening them is already warm.
    leaving=true;
    setTimeout(()=>{document.body.classList.remove('byz-product-leaving');leaving=false;
      states.forEach(s=>{s.frame?.classList.remove('byz-palia-active');if(s.frame){s.frame.tabIndex=-1;s.frame.setAttribute('aria-hidden','true')}});
    },190);
  }
  window.addEventListener('message',ev=>{
    if(ev.origin!==ORIGIN||!ev.data||typeof ev.data!=='object')return;
    if(ev.source===window.parent){
      if(['byz:market:prewarm','byz:market:enter','byz:market:ping'].includes(ev.data.type)){
        safeMessage(gallery,{type:'byz:market:enter'});
        if(galleryReady&&window.parent!==window)window.parent.postMessage({type:'byz:market:gallery-ready'},ORIGIN);
        signalReady();
      } else if(ev.data.type==='byz:market:close'){
        safeMessage(gallery,{type:'byz:market:close'});exitProduct({fromHistory:true});
      }
      return;
    }
    if(ev.source===gallery.contentWindow){
      if(ev.data.type==='byz:market:gallery-ready'){
        galleryReady=true;
        window.parent!==window&&window.parent.postMessage({type:'byz:market:gallery-ready'},ORIGIN);
        signalReady();
      } else if(ev.data.type==='byz:open-product')openProduct(ev.data);
      return;
    }
    const state=states.find(s=>s.frame&&ev.source===s.frame.contentWindow);
    if(!state)return;
    switch(ev.data.type){
      case 'byz:palia:hero-ready-v70':
        if(ev.data.slug===state.product.slug&&ev.data.title===state.product.title){state.hero=true;updateReady(state)}
        break;
      case 'byz:palia:v66-applied':
        if(ev.data.title===state.product.title){state.applied=true;updateReady(state)}
        break;
      case 'byz:palia:prepared':
        safeMessage(state.frame,{type:'byz:palia:enter'});
        break;
      case 'byz:palia:started':
        state.scene=true;updateReady(state);
        break;
      case 'byz:palia:return':
        if(state.index===activeIndex&&productRequested)exitProduct();
        break;
    }
  });
  gallery.addEventListener('load',()=>safeMessage(gallery,{type:'byz:market:enter'}));
  retry.addEventListener('click',()=>{retry.classList.remove('visible');const s=states[activeIndex];if(!s)return;
    // Explicit retry only. Keep other warmed pages undisturbed.
    s.ready=s.applied=s.hero=s.scene=false;
    s.frame?.remove();s.frame=null;makeFrame(s);
    foregroundTimer=setTimeout(()=>status.classList.add('visible'),350);
  });
  window.addEventListener('popstate',()=>{
    const slug=location.pathname.startsWith(PREFIX)?location.pathname.slice(PREFIX.length).replace(/\/$/,''):'';
    const i=PRODUCTS.findIndex(p=>p.slug===slug);
    if(i>=0)openProduct({index:i},{fromHistory:true});else exitProduct({fromHistory:true});
  });
  closeButton.addEventListener('click',()=>{
    if(productRequested||document.body.classList.contains('byz-product-open'))exitProduct();
    else if(window.parent!==window)window.parent.postMessage({type:'byz:v24:exit-market'},ORIGIN);
    else location.href=BASE;
  });
  window.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!productRequested){if(window.parent!==window)window.parent.postMessage({type:'byz:v24:exit-market'},ORIGIN)}});
  window.__BYZ_MARKET_STATUS__=()=>({version:'72.0',galleryReady,productRequested,activeProduct:PRODUCTS[activeIndex]?.slug||null,
    products:states.map(s=>({slug:s.product.slug,started:s.started,loaded:s.loaded,hero:s.hero,scene:s.scene,applied:s.applied,ready:s.ready}))});
  window.__BYZ_MARKET_SHOULD_ENTER__=true;
  if(activeIndex>=0)openProduct({index:activeIndex},{fromHistory:true});
  // Pre-initialize distinct Palia documents while the main loader is still visible.
  setTimeout(warmNext,300);
  log('persistent product pool mounted');
})();
