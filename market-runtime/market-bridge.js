(()=>{
  'use strict';
  const ROOT='/ByzantineEmpireWebsite/market-runtime/';
  let frame=null, visible=false, entered=false, desired=false;
  function attach(){
    if(frame)return frame;
    if(!document.body)return null;
    const host=document.createElement('section');
    host.id='byzantine-market-host';
    host.setAttribute('aria-label','Market product gallery');
    host.innerHTML='<iframe title="ta pánta pazári Marketplace" allow="autoplay; fullscreen" src="'+ROOT+'index.html"></iframe><button type="button" class="byz-market-back">← RETURN TO CRYSTALS</button>';
    Object.assign(host.style,{position:'fixed',inset:'0',zIndex:'2147483000',background:'#0d0e10',opacity:'0',visibility:'visible',pointerEvents:'none',transition:'opacity .75s cubic-bezier(.22,1,.36,1)'});
    const ifr=host.querySelector('iframe');
    Object.assign(ifr.style,{width:'100%',height:'100%',border:'0',display:'block'});
    const back=host.querySelector('button');
    Object.assign(back.style,{position:'absolute',top:'16px',left:'18px',zIndex:'2',padding:'11px 16px',background:'rgba(12,14,17,.72)',border:'1px solid rgba(255,255,255,.28)',color:'#fff',font:'600 11px Arial,sans-serif',letterSpacing:'.09em',cursor:'pointer',backdropFilter:'blur(9px)'});
    back.addEventListener('click',()=>{
      hide();
      if(typeof window.__BYZ_MARKET_EXIT_TO_CRYSTALS==='function')window.__BYZ_MARKET_EXIT_TO_CRYSTALS();
    });
    host.addEventListener('keydown',e=>{if(e.key==='Escape'&&e.target===back)back.click();});
    host.inert=true;host.setAttribute('aria-hidden','true');
    document.body.append(host);
    frame=ifr;
    frame.addEventListener('load',()=>{if(entered)frame.contentWindow?.postMessage({type:'byz:market:enter'},location.origin);});
    return frame;
  }
  function show(){
    const f=attach();if(!f)return;
    desired=true;entered=true;
    if(!visible){visible=true;f.parentElement.inert=false;f.parentElement.setAttribute('aria-hidden','false');f.parentElement.style.pointerEvents='auto';requestAnimationFrame(()=>{f.parentElement.style.opacity='1';});}
    f.contentWindow?.postMessage({type:'byz:market:enter'},location.origin);
    document.title='Byzantine · Market';
  }
  function hide(){
    desired=false;
    if(!frame||!visible)return;
    visible=false;
    const host=frame.parentElement;
    host.style.opacity='0';host.style.pointerEvents='none';host.inert=true;host.setAttribute('aria-hidden','true');
    frame.contentWindow?.postMessage({type:'byz:market:close'},location.origin);
    // Keep the frame visible to the rendering engine while visually transparent.
    // visibility:hidden/display:none can suspend the preloaded WebGL scenes.
  }
  function update(route){
    if(!route)return;
    if(route.inside && Number(route.index)===2 && route.status==='interior')show();
    else if(visible && (!route.inside || route.status==='exiting' || Number(route.index)!==2))hide();
  }
  window.addEventListener('byz:market:route',e=>update(e.detail));
  window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
    if(e.data?.type==='byz:market:shell-ready'&&entered)frame.contentWindow.postMessage({type:'byz:market:enter'},location.origin);
  });
  const init=()=>{attach();update(window.__BYZ_MARKET_CURRENT_ROUTE);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.__BYZ_MARKET_BRIDGE={show,hide};
})();