/* V39: brand the existing native menu transition; do not replace its animation. */
(()=>{
 'use strict';
 if(window.__BYZ_BRAND_V39__)return;
 window.__BYZ_BRAND_V39__=true;
 const LOGO='/ByzantineEmpireWebsite/brand/pazari-flower-v39.png';
 const veilSelector='[class*="veilOverlay-module_"][class*="__root"]';
 const linked=new WeakSet();
 function attachVeil(root){
   if(linked.has(root))return;
   const svg=root.querySelector('svg[class*="__logo"]');
   if(!svg)return;
   linked.add(root);
   const logo=document.createElement('img');
   logo.className='byz-veiled-brand-logo';
   logo.src=LOGO;logo.alt='';logo.setAttribute('aria-hidden','true');
   root.appendChild(logo);
   const sync=()=>{
      logo.style.opacity=svg.style.opacity||'0';
      logo.style.transform=svg.style.transform||'scale(.96)';
   };
   const watcher=new MutationObserver(sync);
   watcher.observe(svg,{attributes:true,attributeFilter:['style']});
   sync();
   // Stop watching when the original transition unmounts.
   const cleanup=new MutationObserver(()=>{
      if(!root.isConnected){watcher.disconnect();cleanup.disconnect();}
   });
   cleanup.observe(document.documentElement,{childList:true,subtree:true});
 }
 function pruneAbout(){
   // Exact native menu link only. Never remove the About Us crystal.
   for(const panel of document.querySelectorAll('nav[data-navbar] [class*="menuPanel"]')){
     for(const link of panel.querySelectorAll('a')){
       let pathname='';
       try{pathname=new URL(link.getAttribute('href')||'',location.href).pathname.replace(/\/$/,'');}catch(_){continue;}
       const label=(link.textContent||'').trim().toLowerCase();
       if(pathname==='/about'||(label==='about'&&pathname.endsWith('/about'))){
         const item=link.closest('li');
         if(item){item.style.setProperty('display','none','important');item.setAttribute('aria-hidden','true');}
         link.tabIndex=-1;
       }
     }
   }
 }
 let pending=false;
 function scan(){pending=false;document.querySelectorAll(veilSelector).forEach(attachVeil);pruneAbout();}
 function queueScan(){if(pending)return;pending=true;queueMicrotask(scan);}
 function init(){scan();new MutationObserver(queueScan).observe(document.documentElement,{childList:true,subtree:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
