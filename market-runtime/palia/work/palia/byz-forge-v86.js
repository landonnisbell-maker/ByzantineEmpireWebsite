(()=>{'use strict';
if(window.__BYZ_FORGE_V86__)return;window.__BYZ_FORGE_V86__=true;
if(!document.documentElement.classList.contains('byz-fx-sword'))return;
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<700;
const weak=(navigator.hardwareConcurrency||8)<=4||navigator.connection?.saveData;
const count=mobile||weak?12:30;
const root='/ByzantineEmpireWebsite/market-runtime/palia/work/palia/';
const images=['fx-v86-hot.png','fx-v86-amber.png','fx-v86-ash.png'];
function install(){if(document.getElementById('byz-forge-v86'))return;
 const layer=document.createElement('div');layer.id='byz-forge-v86';layer.setAttribute('aria-hidden','true');
 let seed=2031;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
 for(let i=0;i<count;i++){
  const el=document.createElement('span');el.className='byz-ember';
  const kind=i%7===0?2:i%3===0?1:0;
  // Most sparks stay in the outer thirds, away from paragraphs.
  const x=rand()*(rand()<.52?29:28)+(rand()<.5?0:72);
  const h=kind===2?25+rand()*19:36+rand()*54;
  const w=h*.67;
  const props={'--x':Math.min(99,x).toFixed(1)+'%','--w':w.toFixed(1)+'px','--h':h.toFixed(1)+'px',
   '--sprite':`url("${root+images[kind]}")`,'--dur':(6+rand()*9).toFixed(2)+'s',
   '--delay':(-rand()*17).toFixed(2)+'s','--drift':(-95+rand()*190).toFixed(0)+'px',
   '--bright':(kind===2?.26:.48+rand()*.44).toFixed(2),'--tilt':(-25+rand()*50).toFixed(1)+'deg'};
  for(const [k,v]of Object.entries(props))el.style.setProperty(k,v);
  layer.append(el);
 }
 document.body.append(layer);
 document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('byz-fx-suspended',document.hidden),{passive:true});
}
if(document.body)install();else document.addEventListener('DOMContentLoaded',install,{once:true});
})();
