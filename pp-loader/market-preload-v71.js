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
  'market-runtime/palia/work/palia/byz-product-content-v77.css?v=77.0',
  'market-runtime/palia/work/palia/byz-product-content-v77.js?v=77.0',
  'market-runtime/palia/work/palia/byz-product-content-v78.css?v=78.0',
  'market-runtime/palia/work/palia/byz-product-content-v78.js?v=78.0',
  'market-runtime/palia/work/palia/byz-product-content-v79.css?v=79.0',
  'market-runtime/palia/work/palia/byz-product-content-v79.js?v=79.0',
  'market-runtime/palia/work/palia/byz-product-content-v80.css?v=80.0',
  'market-runtime/palia/work/palia/byz-product-content-v80.js?v=80.0',
  'market-runtime/palia/work/palia/byz-product-content-v81.css?v=81.0',
  'market-runtime/palia/work/palia/byz-product-content-v81.js?v=81.0',
  'market-runtime/palia/work/palia/byz-product-content-v82.css?v=82.0',
  'market-runtime/palia/work/palia/byz-product-content-v82.js?v=82.0',
  'market-runtime/palia/work/palia/byz-product-content-v83.css?v=83.0',
  'market-runtime/palia/work/palia/byz-product-atmosphere-v84.css?v=84.0',
  'market-runtime/palia/work/palia/byz-product-content-v83.js?v=83.0',
  'market-runtime/palia/fonts/IvarHeadline-Regular.woff2',
  'market-runtime/palia/fonts/PPFrama-Regular.woff2'
 ].map(s=>base+s);
 const mobile=matchMedia('(max-width:720px)').matches?'mobile':'desktop';
 // V114: these FIVE cloth faces must decode before the optional product-page
 // images. Otherwise an uncached low-end machine can hit the original renderer's
 // permanent placeholder path before the browser finishes fetching them.
 const galleryImages=slugs.map(s=>base+'market-runtime/product-images/'+s+'.webp');
 const imageUrls=slugs.map(s=>base+'market-runtime/product-images/banners/'+s+'-'+mobile+'.webp');
 imageUrls.push(base+'market-runtime/product-images/details/silk-v78-cloak-full.png');
 imageUrls.push(base+'market-runtime/product-images/details/sword-v79-leather-harness.png');
 imageUrls.push(base+'market-runtime/product-images/details/jewelry-v80-pendants.png');
 imageUrls.push(base+'market-runtime/product-images/details/food-v80-garos-apaki-combo.png');
 imageUrls.push(base+'market-runtime/product-images/details/food-v81-garos-apaki-combo.png');
 imageUrls.push(base+'market-runtime/product-images/details/food-v81-garos-bottle.png');
 let complete=0;const total=docs.length+shared.length+imageUrls.length+galleryImages.length;
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
 const tasks=[...galleryImages.map(url=>()=>imageOne(url)),...docs.map(url=>()=>fetchOne(url)),...shared.map(url=>()=>fetchOne(url))];
 for(let url of imageUrls)tasks.push(()=>imageOne(url));
 // Gentle four-request queue; avoid delaying the actual 3D gateway startup.
 let idx=0;const next=async()=>{while(idx<tasks.length){const n=idx++;await tasks[n]()}};
 Promise.all([next(),next(),next(),next()]).catch(e=>{console.warn('[Byzantine market preload] stopped',e);state.done=true});
})();
