/* V87 — Historical Connection as a real behind-the-scenes editorial tour.
   All historical paragraphs are read verbatim from the original page data. */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_V87__) return;
  window.__BYZ_HISTORY_V87__ = true;
  const ID = 'byz-history-v87';
  const source = () => window.BYZANTINE_HISTORICAL_CONTENT_V87;
  const state = () => window.__BYZ_MARKET_CURRENT_PAGE;
  let root, scroller, observer, active = false;
  const node = (tag, cls, text) => {
    const result = document.createElement(tag);
    if (cls) result.className = cls;
    if (text !== undefined) result.textContent = text;
    return result;
  };
  function sections(str) {
    const parts = String(str || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const result = [];
    for (let i = 0; i < parts.length; i += 2) result.push({title:parts[i],body:parts[i + 1] || ''});
    return result;
  }
  function title(label, main, sub) {
    const header = node('div','byz-history-act-title byz-h-reveal');
    header.append(node('span','byz-h-eyebrow',label),node('h2','',main));
    if (sub) header.append(node('p','byz-h-act-sub',sub));
    return header;
  }
  function story(entry, i, kind) {
    const article = node('article',`byz-history-story byz-h-reveal byz-history-${kind}`);
    article.append(node('div','byz-h-story-counter',String(i+1).padStart(2,'0')));
    article.append(node('h3','',entry.title));
    const content = node('div','byz-h-story-copy');
    content.append(node('p','',entry.body));
    article.append(content);
    return article;
  }
  function render() {
    if (!scroller) return;
    const data = source();
    if (!data) return;
    scroller.replaceChildren();
    const page = node('div','byz-history-page');
    const hero = node('header','byz-history-hero byz-h-reveal');
    hero.append(node('div','byz-h-eyebrow','CRYSTAL IV  /  THE BYZANTINE EMPIRE'));
    hero.append(node('h1','','Historical Connection'));
    hero.append(node('p','byz-h-hero-deck',data.tagline || 'THE HISTORY BEHIND THE BAZAAR'));
    const links=node('nav','byz-h-chapter-nav');links.setAttribute('aria-label','Explore this page');
    for (const [anchor,caption] of [['byz-h-context','The Empire'],['byz-h-goods','The Goods'],['byz-h-secrets','The Hidden Details']]) {
      const a=node('a','',caption);a.href='#'+anchor;a.addEventListener('click',e=>{
        e.preventDefault();const target=document.getElementById(anchor);
        if(target) scroller.scrollTo({top:target.offsetTop-45,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
      });links.appendChild(a);
    }
    hero.append(links);page.appendChild(hero);

    const context = node('section','byz-h-act byz-h-context');context.id='byz-h-context';
    context.append(title('01  /  CONTEXT','The world behind the market','SOCIETY  /  COMMERCE'));
    const contextGrid=node('div','byz-h-context-grid');
    sections(data.description).forEach((p,i)=>contextGrid.append(story(p,i,'context')));
    context.append(contextGrid);page.append(context);

    const products=node('section','byz-h-act byz-h-products');products.id='byz-h-goods';
    products.append(title('02  /  OBJECTS','Every product has a history','BEHIND THE GOODS'));
    const productsGrid=node('div','byz-h-products-grid');
    sections(data.roleDescription).forEach((p,i)=>productsGrid.append(story(p,i,'product')));
    products.append(productsGrid);page.append(products);

    const meaning=node('section','byz-h-act byz-h-meaning');meaning.id='byz-h-secrets';
    meaning.append(title('03  /  THE DESIGN','Hidden in plain sight','EXAMINE THE CHOICES BEHIND THE WEBSITE'));
    const intro=node('p','byz-h-inspection-note byz-h-reveal','Select a design detail to uncover its historical connection.');
    meaning.append(intro);
    const secrets=node('div','byz-h-secret-list');
    sections(data.challenges).forEach((p,i)=>{
      const item=node('details','byz-h-secret byz-h-reveal');
      if (i===0) item.open=true;
      const summary=node('summary','');summary.append(node('span','byz-h-secret-number',String(i+1).padStart(2,'0')),node('span','byz-h-secret-name',p.title),node('span','byz-h-secret-symbol','+'));
      item.append(summary,node('p','byz-h-secret-description',p.body));
      item.addEventListener('toggle',()=>{
        if (!item.open) return;
        for(const other of secrets.querySelectorAll('details')) if(other!==item && other.open) other.open=false;
      });
      secrets.append(item);
    });
    meaning.append(secrets);page.append(meaning);
    page.append(node('footer','byz-h-endnote','TA PÁNTA PAZÁRI  /  THE EVERYTHING BAZAAR'));
    scroller.append(page);
    registerReveals();
  }
  function registerReveals() {
    observer?.disconnect();
    if (!('IntersectionObserver' in window)) {
      scroller?.querySelectorAll('.byz-h-reveal').forEach(x=>x.classList.add('byz-h-shown'));return;
    }
    observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('byz-h-shown');observer.unobserve(entry.target);}});
    },{root:scroller,threshold:0.07,rootMargin:'0px 0px -24px 0px'});
    scroller.querySelectorAll('.byz-h-reveal').forEach(x=>observer.observe(x));
  }
  function mount() {
    if (root?.isConnected) return;
    root=node('main','byz-history-v87');root.id=ID;
    root.setAttribute('aria-label','Historical Connection — behind the scenes');
    root.setAttribute('aria-hidden','true');
    scroller=node('div','byz-history-scroll');scroller.setAttribute('data-lenis-prevent','true');
    scroller.setAttribute('data-lenis-prevent-wheel','true');scroller.tabIndex=-1;
    root.append(scroller);document.body.append(root);render();
  }
  function update(payload) {
    const next=Number(payload?.index)===3 && payload?.status==='interior';
    if(next===active) return;
    active=next;mount();
    root.classList.toggle('byz-h-open',next);
    root.setAttribute('aria-hidden',String(!next));
    document.body.classList.toggle('byz-history-is-active',next);
    if(next){scroller.scrollTop=0;registerReveals();}
  }
  function init() {
    mount();
    window.addEventListener('byz:market:real-page',e=>update(e.detail));
    update(state());
    setInterval(()=>{const p=state();if(p&&(Number(p.index)===3||active))update(p);},850);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
