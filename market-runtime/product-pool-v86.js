/* V86: persistent per-product iframes. The V70 shell recreated the Nuxt/WebGL
   document on every click; this restores staged warm-up and cached navigation. */
(()=>{'use strict';
if(window.__BYZ_V86_POOL__)return;window.__BYZ_V86_POOL__=true;
const ORIGIN=location.origin,BASE='/ByzantineEmpireWebsite/';
const PRODUCTS=[
 {slug:'paramerion-sword',title:'Paramerion Sword',tagline:'Expertly Forged. Beautifully Finished. Made to Last.'},
 {slug:'gold-jewelry',title:'Gold Jewelry',tagline:'Genuine Gold. Beautiful Details. Made Just for You.'},
 {slug:'food-items',title:'Food Items',tagline:'Fresh from the Coast. Carefully Made. Rich in Flavor.'},
 {slug:'coins',title:'Coin Exchange Service',tagline:'Your Money. Your Choice. Every Coin Accounted For.'},
 {slug:'silk-textiles',title:'Silk Textiles',tagline:'The Finest Silk. The Finest Craftsmanship. Made Right Here at Home.'}
];
const ALIASES={'cgtrader':0,'w3r-one':1,'presti':2,'grandir':3,'reaali':4,'coins':3,'coin-exchange-service':3};
const gallery=document.getElementById('byz-gallery'),pool=document.getElementById('byz-palia-pool'),
 status=document.getElementById('byz-status'),retry=document.getElementById('byz-retry'),close=document.getElementById('byz-new-page-return'),
 quick=document.getElementById('byz-quick-v86');
if(!gallery||!pool||!status||!retry||!close||!quick)return;
const debug=new URLSearchParams(location.search).has('byzdebug');const log=(...args)=>debug&&console.info('[V86 ready pool]',...args);
const states=PRODUCTS.map((product,index)=>({product,index,frame:null,ready:false,hero:false,applied:false,scene:false,loaded:false,started:false}));
const PREFIX=BASE+'market-runtime/products/';
const pathSlug=location.pathname.startsWith(PREFIX)?location.pathname.slice(PREFIX.length).replace(/\/index\.html$/,'').replace(/\/$/,''):'';
let activeIndex=PRODUCTS.findIndex(p=>p.slug===pathSlug),open=false,leaving=false,galleryReady=false,readyReported=false;
const constrained=matchMedia('(pointer:coarse)').matches||((navigator.deviceMemory||8)<=3)||((navigator.hardwareConcurrency||8)<=4)||navigator.connection?.saveData;
// Full-screen WebGL canvases cost GPU RAM. On constrained hardware, keep two
// permanently cached and show an instant lightweight product preview for others.
const residentCap=constrained?2:5;
let recent=[],cursor=0,statusTimer=null,failTimer=null;
let delayedWarmupStarted=false;
const send=(frame,msg)=>{try{frame?.contentWindow?.postMessage(msg,ORIGIN)}catch(e){log('postMessage',e)}};
function clearTimers(){clearTimeout(statusTimer);clearTimeout(failTimer);statusTimer=failTimer=null;status.classList.remove('visible')}
function indexFor(d){
 if(Number.isInteger(Number(d?.index))&&d?.index!==undefined&&Number(d.index)>=0&&Number(d.index)<5)return Number(d.index);
 if(d?.slug in ALIASES)return ALIASES[d.slug];
 return PRODUCTS.findIndex(p=>p.slug===d?.slug||p.title===d?.title);
}
function touch(i){recent=recent.filter(v=>v!==i);recent.push(i)}
function trim(keep){
 if(!constrained)return;
 while(states.filter(s=>!!s.frame).length>residentCap){
  const victim=recent.find(i=>i!==keep&&i!==activeIndex&&states[i].frame);
  if(victim===undefined)break;
  const s=states[victim];s.frame.remove();s.frame=null;s.ready=s.loaded=s.hero=s.applied=s.scene=s.started=false;
  recent=recent.filter(i=>i!==victim);log('reclaimed dormant GPU iframe',s.product.slug);
 }
}
function urlFor(p){return BASE+'market-runtime/palia/work/palia/entries/'+p.slug+'/index.html?no-loader&byzantine-palia-preload=1&byzantine-lite-fullscreen=1&byz-product='+p.slug+'&v=86.0'}
function ensure(i){
 const s=states[i];if(s.frame)return s.frame;
 const f=document.createElement('iframe');f.className='byz-palia-frame';f.title=s.product.title+' information';f.dataset.productSlug=s.product.slug;
 f.setAttribute('allow','autoplay; fullscreen');f.setAttribute('loading','eager');f.setAttribute('aria-hidden','true');f.tabIndex=-1;
 f.addEventListener('load',()=>{s.loaded=true;send(f,{type:'byz:palia:ping'});update(s);log('loaded',s.product.slug)});
 s.frame=f;s.started=true;pool.append(f);touch(i);trim(i);f.src=urlFor(s.product);log('warming',s.product.slug);return f;
}
// V125: Warming begins on the GATE phase of the original loading page,
// not while the original 3D scene is still initializing (the 30% stall).
// Wait for each product's document load or a bounded fallback before starting
// another WebGL page, keeping the first view responsive on slower hardware.
function warmNext(){
 if(cursor>=PRODUCTS.length)return;
 if(constrained&&cursor>=residentCap)return;
 const index=cursor++;
 ensure(index);
 const startedAt=performance.now();
 const follow=()=>{
  if(!delayedWarmupStarted||cursor>=PRODUCTS.length||(constrained&&cursor>=residentCap))return;
  if(states[index].loaded||states[index].ready||performance.now()-startedAt>=4500){
   setTimeout(warmNext,constrained?1600:900);
  }else setTimeout(follow,300);
 };
 setTimeout(follow,900);
}
function beginWarmup(duringLoader=false){
 if(delayedWarmupStarted)return;
 delayedWarmupStarted=true;
 // During the loader gate, start now; if a visitor enters Market before
 // the gate handoff, retain V124's entrance-safe delayed fallback.
 setTimeout(warmNext,duringLoader?120:2700);
}
function showQuick(i){const p=states[i].product;const mobile=innerWidth<=720;
 const img=quick.querySelector('img');img.src=BASE+'market-runtime/product-images/banners/'+p.slug+'-'+(mobile?'mobile':'desktop')+'.webp';
 quick.querySelector('h1').textContent=p.title;quick.querySelector('p').textContent=p.tagline;
 quick.classList.add('active');document.body.classList.add('byz-quick-show');quick.setAttribute('aria-hidden','false');
}
function hideQuick(){quick.classList.remove('active');document.body.classList.remove('byz-quick-show');quick.setAttribute('aria-hidden','true')}
function showActive(){if(!open||leaving||activeIndex<0)return;const s=states[activeIndex];if(!s.ready)return;
 clearTimers();retry.classList.remove('visible');document.body.classList.remove('byz-product-leaving');
 document.body.classList.add('byz-product-open');
 states.forEach((item,i)=>{if(!item.frame)return;const on=i===activeIndex;
  item.frame.classList.toggle('byz-palia-active',on);item.frame.setAttribute('aria-hidden',String(!on));item.frame.tabIndex=on?0:-1;
  send(item.frame,{type:'byz:v86:active',active:on});
 });
 try{s.frame.contentWindow.scrollTo({top:0,left:0,behavior:'instant'})}catch(e){}
 requestAnimationFrame(()=>hideQuick());log('ready reveal',s.product.slug);
}
function update(s){if(s.hero&&s.applied&&s.scene){s.ready=true;s.frame?.setAttribute('data-ready','1');if(open&&s.index===activeIndex)showActive();}}
function openProduct(d={},opts={}){
 if(leaving)return;const i=indexFor(d);if(i<0)return;activeIndex=i;open=true;
 const s=states[i];touch(i);ensure(i);trim(i);
 if(!opts.fromHistory){const route=PREFIX+s.product.slug+'/';if(location.pathname!==route)history.pushState({byzProduct:s.product.slug},'',route)}
 document.body.classList.remove('byz-product-open','byz-product-leaving');pool.querySelectorAll('iframe').forEach(f=>f.classList.remove('byz-palia-active'));
 retry.classList.remove('visible');clearTimers();
 if(s.ready){showActive();return}
 showQuick(i);statusTimer=setTimeout(()=>{if(open&&!states[activeIndex]?.ready)status.classList.add('visible')},2400);
 failTimer=setTimeout(()=>{if(open&&!states[activeIndex]?.ready)retry.classList.add('visible')},24000);
 send(s.frame,{type:'byz:palia:ping'});log('instant preview / native warming',s.product.slug);
}
function exitProduct(opts={}){if(!open)return;open=false;clearTimers();retry.classList.remove('visible');hideQuick();
 if(!opts.fromHistory&&location.pathname.startsWith(PREFIX))history.replaceState({byzMarket:true},'',BASE+'market/');
 leaving=true;document.body.classList.remove('byz-product-open');document.body.classList.add('byz-product-leaving');
 states.forEach(s=>{if(s.frame){s.frame.classList.remove('byz-palia-active');s.frame.tabIndex=-1;send(s.frame,{type:'byz:v86:active',active:false})}});
 setTimeout(()=>{document.body.classList.remove('byz-product-leaving');leaving=false;trim(-1)},230);
}
function reportReady(){if(!galleryReady)return;
 document.body.classList.add('byz-gallery-ready');if(window.parent!==window){window.parent.postMessage({type:'byz:market:gallery-ready'},ORIGIN);
 if(!readyReported){readyReported=true;window.parent.postMessage({type:'byz:market:ready'},ORIGIN)}}
}
window.addEventListener('message',ev=>{
 if(ev.origin!==ORIGIN||!ev.data||typeof ev.data!=='object')return;
 if(ev.source===window.parent){
  if(ev.data.type==='byz:market:prewarm-products'){
   // Explicit loading-gate message from the main document. Prewarming actual
   // product iframes here leaves them mounted for instant later navigation.
   beginWarmup(true);
   window.parent.postMessage({type:'byz:market:products-warmup-started',residentCap,total:PRODUCTS.length},ORIGIN);
  }else if(['byz:market:prewarm','byz:market:enter','byz:market:ping'].includes(ev.data.type)){
   send(gallery,{type:'byz:market:enter'});reportReady();
   // Only actual entry may start product WebGL contexts. Prewarm/ping
   // signals sent during site startup must not spawn five hidden pages.
   if(ev.data.type==='byz:market:enter')beginWarmup();
  }else if(ev.data.type==='byz:market:replay-intro'){
   // Native Aengel gallery animation, deferred until the real Market reveal.
   // Intentionally not sent during prewarming or product transitions.
   if(!open)send(gallery,{type:'byz:market:replay-intro'});
  }else if(ev.data.type==='byz:market:reverse-intro'){
   // V110: send the real 2.2s reverse intro command through to WebGL gallery.
   if(!open)send(gallery,{type:'byz:market:reverse-intro'});
  }else if(ev.data.type==='byz:market:close'){exitProduct({fromHistory:true});send(gallery,{type:'byz:market:close'})}
  return;
 }
 if(ev.source===gallery.contentWindow){
  if(ev.data.type==='byz:market:gallery-ready'){galleryReady=true;reportReady()}
  else if(ev.data.type==='byz:open-product')openProduct(ev.data);
  return;
 }
 const s=states.find(s=>s.frame&&ev.source===s.frame.contentWindow);
 if(!s)return;
 switch(ev.data.type){
  case 'byz:palia:hero-ready-v70':if(ev.data.slug===s.product.slug&&ev.data.title===s.product.title){s.hero=true;update(s)}break;
  case 'byz:palia:v66-applied':if(ev.data.title===s.product.title){s.applied=true;update(s)}break;
  case 'byz:palia:started':s.scene=true;update(s);break;
  case 'byz:palia:prepared':send(s.frame,{type:'byz:palia:enter'});break;
  case 'byz:palia:return':if(s.index===activeIndex&&open)exitProduct();break;
 }
});
gallery.addEventListener('load',()=>send(gallery,{type:'byz:market:enter'}));
retry.addEventListener('click',()=>{const s=states[activeIndex];if(!s)return;
 s.frame?.remove();s.frame=null;s.ready=s.loaded=s.hero=s.applied=s.scene=s.started=false;ensure(activeIndex);retry.classList.remove('visible')});
window.addEventListener('popstate',()=>{const slug=location.pathname.startsWith(PREFIX)?location.pathname.slice(PREFIX.length).replace(/\/$/,''):'';
 const i=PRODUCTS.findIndex(p=>p.slug===slug);if(i>=0)openProduct({index:i},{fromHistory:true});else exitProduct({fromHistory:true})});
close.addEventListener('click',()=>{if(open)exitProduct();else if(window.parent!==window)window.parent.postMessage({type:'byz:v24:exit-market'},ORIGIN);else location.href=BASE});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!open){if(window.parent!==window)window.parent.postMessage({type:'byz:v24:exit-market'},ORIGIN)}});
window.__BYZ_MARKET_STATUS__=()=>({version:'86',galleryReady,productRequested:open,active:PRODUCTS[activeIndex]?.slug||null,
 preloaded:states.map(s=>({slug:s.product.slug,ready:s.ready,hero:s.hero,applied:s.applied,scene:s.scene,loaded:s.loaded}))});
window.__BYZ_MARKET_SHOULD_ENTER__=true;
if(activeIndex>=0)openProduct({index:activeIndex},{fromHistory:true});
// V125: product WebGL iframes are allowed *during the visible loading GATE*,
// after the original site reaches READY. Never start them at 0-30% startup.
// Direct product routes still call openProduct/ensure above on demand.
if(window.parent===window&&activeIndex<0)beginWarmup();
})();
