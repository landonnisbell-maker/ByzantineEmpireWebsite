(()=>{
  'use strict';
  // V22: direct from original WebGL scene-store subscriptions, not DOM guessing.
  // Each new Market crystal update immediately reaches __BYZ_MARKET_NATIVE_UPDATE__.
  if(window.__BYZ_MARKET_BRIDGE_V22)return;
  window.__BYZ_MARKET_BRIDGE_V22=true;
  const ownScript=document.currentScript;
  const root=new URL('./',ownScript?.src||location.href);
  const debug=new URLSearchParams(location.search).has('byzmarketdebug');
  const log=(...args)=>{if(debug)console.info('[MARKET V22]',...args);};
  let host=null,frame=null,ready=false,shown=false,wasShown=false,pending=null,returning=false;
  let native=null,seenNative=false,reason='not-in-market';
  function send(type){try{frame?.contentWindow?.postMessage({type},location.origin)}catch(e){log('send failed',e)}}
  function attach(){
    if(host)return;
    if(!document.body)return;
    host=document.createElement('section');host.id='byzantine-market-host';
    host.setAttribute('aria-label','ta pánta pazári Market');
    Object.assign(host.style,{position:'fixed',inset:'0',zIndex:'2147483000',
      background:'#0d0e10',opacity:'0',pointerEvents:'none',
      transition:'opacity 650ms cubic-bezier(.22,1,.36,1)',willChange:'opacity'});
    frame=document.createElement('iframe');frame.title='ta pánta pazári · Cloth Market';
    frame.src=new URL('index.html?v=22',root).href;frame.loading='eager';frame.allow='autoplay; fullscreen';
    Object.assign(frame.style,{position:'absolute',inset:'0',width:'100%',height:'100%',border:'0',display:'block'});
    const back=document.createElement('button');back.className='byz-market-back';back.type='button';
    back.textContent='← RETURN TO CRYSTALS';
    Object.assign(back.style,{position:'absolute',top:'16px',left:'18px',zIndex:'2',padding:'11px 16px',
      background:'rgba(12,14,17,.8)',border:'1px solid rgba(255,255,255,.28)',
      color:'#fff',font:'600 11px Arial,sans-serif',letterSpacing:'.09em',cursor:'pointer'});
    back.addEventListener('click',()=>{
      returning=true;close('return button');
      if(typeof window.__BYZ_MARKET_EXIT_TO_CRYSTALS==='function')window.__BYZ_MARKET_EXIT_TO_CRYSTALS();
      else window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));
    });
    host.append(frame,back);document.body.append(host);
    host.inert=true;host.setAttribute('aria-hidden','true');
    frame.addEventListener('load',()=>{ready=true;log('market iframe loaded');if(shown)send('byz:market:enter')});
    log('market preload mounted',frame.src);
  }
  function open(why){
    attach();if(!host)return;
    clearTimeout(pending);pending=null;
    if(shown)return;
    shown=true;wasShown=true;reason=why;
    host.inert=false;host.setAttribute('aria-hidden','false');
    host.style.pointerEvents='auto';
    requestAnimationFrame(()=>{if(shown)host.style.opacity='1'});
    // The frame is mounted during the site loader and survives all visits.
    send('byz:market:enter');
    log('SHOW',why,native);
  }
  function close(why){
    clearTimeout(pending);pending=null;
    if(!shown)return;
    shown=false;reason=why;
    host.style.opacity='0';host.style.pointerEvents='none';
    host.inert=true;host.setAttribute('aria-hidden','true');
    send('byz:market:close');log('HIDE',why);
  }
  function nativeIsMarket(r){
    if(!r)return false;
    if(typeof r.active==='boolean')return r.active;
    if(r.status==='exiting')return false;
    const idx=Number(r.projectIndex??r.index??r.routeIndex);
    return idx===2 && (r.scene==='projectInterior'||r.inside===true||r.status==='interior'||r.status==='entering');
  }
  function resolve(){
    if(seenNative)return nativeIsMarket(native);
    // Fallback only for a main site where the patched chunk has not started.
    if(window.__BYZ_MARKET_CURRENT_ROUTE)return nativeIsMarket(window.__BYZ_MARKET_CURRENT_ROUTE);
    return /^Byzantine\s*[·—\-:]\s*Market\s*$/i.test(document.title.trim());
  }
  function sync(){
    const active=resolve();
    if(returning){if(!active)returning=false;else return;}
    if(active && !shown){
      if(pending===null)pending=setTimeout(()=>{pending=null;if(!returning&&resolve())open('native crystal 3');},270);
    }else if(!active){close('crystal outside Market')}
  }
  window.__BYZ_MARKET_NATIVE_UPDATE__=(d)=>{
    native=d;seenNative=true;
    // No DOM/title polling required: these are the real site navigation stores.
    sync();
  };
  window.addEventListener('byz:market:route',e=>{
    if(e.detail){native=e.detail;seenNative=true} sync();
  });
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin ||e.source!==frame?.contentWindow)return;
    if(e.data?.type==='byz:market:shell-ready'&&shown)send('byz:market:enter');
  });
  window.addEventListener('pageshow',sync);
  // On startup the app's core bundle can have published a state before this script loaded.
  function boot(){attach();native=window.__BYZ_MARKET_CURRENT_ROUTE||native;seenNative=Boolean(native);sync()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.__BYZ_MARKET_BRIDGE={
    debug:()=>({version:'22',loaded:!!host,frameLoaded:ready,shown,wasShown,reason,native,resolve:resolve(),src:frame?.src}),
    show:()=>open('manual diagnostic'),hide:()=>close('manual diagnostic'),sync
  };
})();