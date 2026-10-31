/* V71 loader branding — keeps the original React loader intact. */
(()=>{
 'use strict';
 if(window.__BYZ_LOADER_BRAND_V71__)return;window.__BYZ_LOADER_BRAND_V71__=true;
 const BASE='/ByzantineEmpireWebsite/pp-loader/';
 const safeImage=BASE+'assets/pazari-color-v71.webp';
 const names=['Paramerion Sword','Gold Jewelry','Food Items','Coin Exchange Service','Silk Textiles'];
 const sel='.loader-module__y9w63G__loaderContainer';
 const el=(tag,cls,txt)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(txt!==undefined)node.textContent=txt;return node};
 function brand(header){
  if(header.querySelector('.byz-v71-brand'))return;
  const box=el('div','byz-v71-brand');
  const words=el('div','byz-v71-brand-text');
  words.append(el('div','byz-v71-brand-name','ta pánta pazári'),el('div','byz-v71-brand-meaning','The Everything Baazar'));
  const logo=el('img','byz-v71-brand-logo');logo.src=safeImage;logo.alt='ta pánta pazári flower logo';logo.decoding='async';
  box.append(words,logo);header.appendChild(box);
 }
 function ticket(panel){
  if(panel.querySelector('.byz-v71-ticket'))return;
  const div=el('div','byz-v71-ticket');div.setAttribute('aria-label','Byzantine market product categories');
  div.append(el('div','byz-v71-ticket-label','IMPERIAL MARKET'),el('div','byz-v71-ticket-year','C. 1000 CE'));
  const arch=el('img','byz-v71-ticket-arch');arch.src=BASE+'assets/wireframe-arch.avif';arch.alt='Byzantine arch illustration';arch.decoding='async';div.appendChild(arch);
  div.append(el('div','byz-v71-ticket-topline'),el('div','byz-v71-ticket-head','From Byzantium'),el('div','byz-v71-ticket-subhead','Our products & services'));
  const list=el('ol','byz-v71-ticket-items');names.forEach((name,i)=>{const item=el('li');item.append(el('span','',String(i+1).padStart(2,'0')),document.createTextNode(name));list.appendChild(item)});div.appendChild(list);
  const foot=el('div','byz-v71-ticket-footer');foot.append(el('b','','TA PÁNTA PAZÁRI'));
  const logo=el('img','byz-v71-ticket-logo');logo.src=safeImage;logo.alt='';logo.decoding='async';foot.appendChild(logo);div.appendChild(foot);
  panel.appendChild(div);
 }
 let queued=false;
 function scan(){queued=false;document.querySelectorAll(sel).forEach(root=>{
  const header=root.querySelector('.loader-module__y9w63G__header');if(header)brand(header);
  const card=root.querySelector('.loader-module__y9w63G__ticketCard');if(card)ticket(card);
  const zone=root.querySelector('.loader-module__y9w63G__progressZone');
  if(zone && !zone.querySelector('.byz-v105-device-note')){
   const note=el('p','byz-v105-device-note','This website may load slower or perform worse on lower end devices');
   zone.appendChild(note);
  }
 });}
 function queue(){if(queued)return;queued=true;requestAnimationFrame(scan);}
 function init(){scan();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
