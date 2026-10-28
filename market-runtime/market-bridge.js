(()=>{
  'use strict';
  // V21.1: independent of third-party/minified React scene event internals.
  // Resolving from this script's URL handles GitHub Pages project base paths.
  const SCRIPT=document.currentScript;
  const ROOT=new URL('./',SCRIPT?.src||location.href).href;
  const DEBUG=/[?&]byzmarketdebug=1(?:&|$)/.test(location.search);
  const log=(...args)=>{if(DEBUG)console.info('[Byzantine Market V21.1]',...args);};
  let host=null,frame=null,shown=false,entered=false,lastSignal='',exitRequested=false;
  let syncPending=false, pendingShowTimer=null, lastMarket=false;

  function attach(){
    if(frame)return frame;
    if(!document.body)return null;
    host=document.createElement('section');
    host.id='byzantine-market-host';
    host.setAttribute('aria-label','ta pánta pazári marketplace');
    Object.assign(host.style,{
      position:'fixed',inset:'0',zIndex:'2147483000',background:'#0d0e10',
      opacity:'0',pointerEvents:'none',visibility:'visible',
      transition:'opacity .72s cubic-bezier(.22,1,.36,1)'
    });
    frame=document.createElement('iframe');
    frame.title='ta pánta pazári · Five Product Market';
    frame.allow='autoplay; fullscreen';
    frame.src=ROOT+'index.html?v=21.1';
    frame.loading='eager';
    Object.assign(frame.style,{width:'100%',height:'100%',border:'0',display:'block'});
    const back=document.createElement('button');
    back.className='byz-market-back';back.type='button';back.textContent='← RETURN TO CRYSTALS';
    Object.assign(back.style,{
      position:'absolute',top:'16px',left:'18px',zIndex:'2',padding:'11px 16px',
      background:'rgba(12,14,17,.72)',border:'1px solid rgba(255,255,255,.28)',
      color:'#fff',font:'600 11px Arial,sans-serif',letterSpacing:'.09em',cursor:'pointer',
      backdropFilter:'blur(9px)'
    });
    back.addEventListener('click',()=>{
      exitRequested=true;
      hide('return-to-crystals');
      if(typeof window.__BYZ_MARKET_EXIT_TO_CRYSTALS==='function'){
        window.__BYZ_MARKET_EXIT_TO_CRYSTALS();
      }else{
        // The site's own Crystal pages already handle Escape -> exitInterior.
        window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));
      }
    });
    host.append(frame,back);
    host.inert=true;host.setAttribute('aria-hidden','true');
    document.body.append(host);
    frame.addEventListener('load',()=>{
      log('gallery shell loaded');
      if(entered)send('byz:market:enter');
    });
    log('bridge attached; preloading marketplace from',frame.src);
    return frame;
  }
  function send(type){
    try{frame?.contentWindow?.postMessage({type},location.origin);}catch(e){log('postMessage skipped',e);}
  }
  function show(reason){
    if(!attach())return;
    entered=true;
    if(shown)return;
    shown=true;lastSignal=reason;
    host.inert=false;host.setAttribute('aria-hidden','false');
    host.style.pointerEvents='auto';
    requestAnimationFrame(()=>{if(shown)host.style.opacity='1';});
    send('byz:market:enter');
    log('SHOW',reason);
  }
  function hide(reason){
    if(!shown)return;
    shown=false;
    host.style.opacity='0';host.style.pointerEvents='none';
    host.inert=true;host.setAttribute('aria-hidden','true');
    send('byz:market:close');
    log('HIDE',reason);
  }
  function titleIsMarket(){
    return /^Byzantine\s*[·—\-:]\s*Market\s*$/i.test(document.title.trim());
  }
  function routeIsMarket(){
    const r=window.__BYZ_MARKET_CURRENT_ROUTE;
    if(!r)return null;
    // IMPORTANT: the old bridge required status === 'interior'. On the real site,
    // 'projectInterior' can display while its project store is still settling.
    if(r.status==='exiting')return false;
    const index=Number(r.index);
    return index===2 && (r.scene==='projectInterior' ||
      r.inside===true || r.status==='interior');
  }
  function visibleElement(el){
    if(!el||!el.isConnected||el.closest('#byzantine-market-host'))return false;
    let box=el.getBoundingClientRect();
    if(box.width<12||box.height<8||box.bottom<0||box.top>innerHeight)return false;
    for(let p=el;p && p.nodeType===1;p=p.parentElement){
      const style=getComputedStyle(p);
      if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)<0.07)return false;
    }
    return true;
  }
  function visibleMarketContent(){
    // Fallback for deployments where the main scene chunk has been cached or
    // updated and no longer emits our custom route event.
    for(const e of document.querySelectorAll('main h1,main h2,main h3,article h1,article h2,article h3,h1,h2')){
      if(e.textContent.trim().toUpperCase()==='MARKET' && visibleElement(e))return true;
    }
    return false;
  }
  function marketActive(){
    const route=routeIsMarket();
    if(route===true)return {yes:true,reason:'internal-crystal-state'};
    // 'exiting' intentionally wins over stale page titles.
    const r=window.__BYZ_MARKET_CURRENT_ROUTE;
    if(r?.status==='exiting'||(r?.scene==='projects'&&r?.status==='exterior'))return {yes:false,reason:'crystal-exiting'};
    if(titleIsMarket())return {yes:true,reason:'page-title'};
    // A known non-Market page title overrides stale offscreen Market markup.
    if(/^Byzantine\s*[·—\-:]\s*(?!Market\s*$)/i.test(document.title.trim()))return {yes:false,reason:'other-crystal-title'};
    if(/\/projects\/presti\/?$/i.test(location.pathname))return {yes:true,reason:'market-route'};
    if(visibleMarketContent())return {yes:true,reason:'visible-market-heading'};
    return {yes:false,reason:'not-market'};
  }
  function sync(){
    syncPending=false;
    const signal=marketActive();
    lastMarket=signal.yes;
    if(exitRequested){
      if(!signal.yes)exitRequested=false;
      else {hide('manual-return-pending');return;}
    }
    if(signal.yes){
      // Keep original crystal entry motion rather than showing on the very
      // first frame of a transition.
      if(!shown && pendingShowTimer===null){
        pendingShowTimer=setTimeout(()=>{
          pendingShowTimer=null;
          if(exitRequested)return;
          const s=marketActive();if(s.yes)show(s.reason);
        },400);
      }
    }else{
      if(pendingShowTimer!==null){clearTimeout(pendingShowTimer);pendingShowTimer=null;}
      hide(signal.reason);
    }
  }
  function queueSync(){
    if(syncPending)return;
    syncPending=true;
    requestAnimationFrame(sync);
  }
  window.addEventListener('byz:market:route',queueSync);
  window.addEventListener('popstate',queueSync);
  window.addEventListener('hashchange',queueSync);
  window.addEventListener('pageshow',queueSync);
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
    if(e.data?.type==='byz:market:shell-ready'&&entered)send('byz:market:enter');
  });
  // Next.js can rewrite <title> after the scene is already visible.
  const titleWatcher=new MutationObserver(queueSync);
  titleWatcher.observe(document.head,{childList:true,subtree:true,characterData:true});
  // Cheap route/DOM fallback also catches stale cached app chunks.
  setInterval(queueSync,550);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{attach();queueSync();},{once:true});
  else{attach();queueSync();}
  window.__BYZ_MARKET_BRIDGE={show:()=>show('manual'),hide:()=>hide('manual'),sync:queueSync,debug:()=>({shown,lastSignal,marketActive:marketActive(),frame:frame?.src})};
})();
