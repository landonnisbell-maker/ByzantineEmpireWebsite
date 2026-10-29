/* V71: Pre-warm every product's assets while the ORIGINAL 3D loader is visible.
 No hidden WebGL iframes are created — five simultaneous GPU contexts would be counterproductive.
 The fetched assets are cacheable by the browser, and images are decoded in advance. */
(()=>{
 'use strict';
 if(window!==window.top || window.__BYZ_MARKET_PRELOAD_V71__)return;
 window.__BYZ_MARKET_PRELOAD_V71__=true;
 const base='/ByzantineEmpireWebsite/';
 const slugs=['paramerion-sword','gold-jewelry','food-items','coins','silk-textiles'];
 const docs=slugs.map(s=>base+'market-runtime/palia/work/palia/entries/'+s+'/index.html');
 const shared=[
  'market/index.html',
  'market-runtime/palia/_nuxt/B5B1E9Dr.js',
  'market-runtime/palia/_nuxt/Bx_VpDl2.js?v=70',
  'market-runtime/palia/_nuxt/Cn6bT5a5.js',
  'market-runtime/palia/_nuxt/smrkeggE.js',
  'market-runtime/palia/_nuxt/jZ4h2aQc.js',
  'market-runtime/palia/_nuxt/D-uwnDvt.js',
  'market-runtime/palia/_nuxt/BRCWKBTb.js',
  'market-runtime/palia/_nuxt/B2Em7_D3.js',
  'market-runtime/palia/_nuxt/entry.B6zjpOmH.css',
  'market-runtime/palia/work/palia/byz-product-content-v73.css?v=73.0',
  'market-runtime/palia/work/palia/byz-product-content-v73.js?v=73.0',
  'market-runtime/palia/fonts/IvarHeadline-Regular.woff2',
  'market-runtime/palia/fonts/PPFrama-Regular.woff2'
 ].map(s=>base+s);
 const mobile=matchMedia('(max-width:720px)').matches?'mobile':'desktop';
 const imageUrls=slugs.map(s=>base+'market-runtime/product-images/banners/'+s+'-'+mobile+'.webp');
 imageUrls.push(base+'market-runtime/product-images/details/silk-cloak-feature-v73.webp');
 let complete=0;const total=docs.length+shared.length+imageUrls.length;
 const state={started:true,done:false,complete:0,total,errors:0};
 window.__BYZ_MARKET_PRELOAD_STATE__=state;
 const done=()=>{complete++;state.complete=complete;if(complete>=total){state.done=true;window.dispatchEvent(new Event('byz:market:preload-complete'))}};
 const fetchOne=async(url)=>{
  try{let r=await fetch(url,{mode:'same-origin',credentials:'same-origin',cache:'force-cache'});if(!r.ok)throw Error('HTTP '+r.status);await r.arrayBuffer();}
  catch(e){state.errors++;console.warn('[Byzantine market preload]',url,e.message)}finally{done()}
 };
 const imageOne=async(url)=>{
  try{const image=new Image();image.decoding='async';image.src=url;
   if(image.decode)await image.decode();else await new Promise((res,rej)=>{image.onload=res;image.onerror=rej})}
  catch(e){state.errors++;console.warn('[Byzantine market image preload]',url,e.message)}finally{done()}
 };
 const tasks=[...docs,...shared].map(url=>()=>fetchOne(url));
 for(let url of imageUrls)tasks.push(()=>imageOne(url));
 // Gentle four-request queue; avoid delaying the actual 3D gateway startup.
 let idx=0;const next=async()=>{while(idx<tasks.length){const n=idx++;await tasks[n]()}};
 Promise.all([next(),next(),next(),next()]).catch(e=>{console.warn('[Byzantine market preload] stopped',e);state.done=true});
})();
