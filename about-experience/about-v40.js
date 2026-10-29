/* ta pánta pazári — Crystal 2 only. No changes to the native project store or transitions. */
(() => {
  'use strict';
  const ROOT_ID = 'byz-about-v40';
  const NAV_STATUS = () => window.__BYZ_MARKET_CURRENT_PAGE;
  let root = null;
  let scrollViewport = null;
  let revealPending = false;
  let active = false;
  let currentStatus = '';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function contentSections(source) {
    if (!source) return [];
    const names = new Set(['Time Frame', 'Location', 'Government', 'Economy', 'Religion', 'Important Cities', 'Major Achievements', 'Important Resources', 'Trade connections', 'Cultural Characteristics']);
    const all = [];
    for (const part of [source.description, source.roleDescription, source.challenges]) {
      if (!part) continue;
      const paragraphs = String(part).split(/\n\s*\n/).map(v => v.trim()).filter(Boolean);
      for (let i = 0; i < paragraphs.length; i++) {
        const name = paragraphs[i];
        if (names.has(name)) {
          all.push({ title: name, text: paragraphs[i + 1] || '' });
          i++;
        } else if (all.length) {
          all[all.length - 1].text += '\n\n' + name;
        }
      }
    }
    return all;
  }
  function imageSlot(n) {
    const wrap = el('figure', 'byz-about-photo byz-about-reveal');
    wrap.setAttribute('aria-label', 'Image placeholder ' + n);
    const wash = el('div', 'byz-about-photo-wash');
    const label = el('figcaption', 'byz-about-photo-caption', 'No image supplied yet.');
    wrap.append(wash, label);
    return wrap;
  }
  function sectionItem(info, idx) {
    const card = el('section', 'byz-about-section byz-about-reveal');
    card.style.setProperty('--section-index', idx);
    const number = el('span', 'byz-about-section-number', String(idx + 1).padStart(2, '0'));
    const title = el('h2', 'byz-about-section-title', info.title);
    const paragraphs = el('div', 'byz-about-section-copy');
    for (const item of String(info.text || '').split(/\n\s*\n/).filter(Boolean)) {
      paragraphs.appendChild(el('p', '', item));
    }
    card.append(number, title, paragraphs);
    return card;
  }
  function mount() {
    if (root && root.isConnected) return;
    root = el('main', 'byz-about-v40');
    root.id = ROOT_ID;
    root.setAttribute('aria-label', 'About Us — The Byzantine Empire');
    root.setAttribute('aria-hidden', 'true');
    const bg = el('div', 'byz-about-v40-bg');
    bg.setAttribute('aria-hidden','true');
    const light1 = el('div', 'byz-about-aurora byz-about-aurora-one');
    const light2 = el('div', 'byz-about-aurora byz-about-aurora-two');
    bg.append(light1,light2);
    const grain = el('div', 'byz-about-v40-grain');
    grain.setAttribute('aria-hidden', 'true');
    scrollViewport = el('div', 'byz-about-v40-scroll');
    scrollViewport.setAttribute('data-lenis-prevent', 'true');
    scrollViewport.setAttribute('data-lenis-prevent-wheel', 'true');
    scrollViewport.setAttribute('tabindex', '-1');
    scrollViewport.addEventListener('scroll', queueReveals, {passive:true});
    root.append(bg,grain,scrollViewport);
    document.body.appendChild(root);
    renderContent();
  }
  function renderContent() {
    if (!scrollViewport) return;
    scrollViewport.replaceChildren();
    const source = window.BYZANTINE_ABOUT_US_CONTENT || window.BYZANTINE_CRYSTAL_CONTENT?.[1] || {};
    const sections = contentSections(source);
    const page = el('div', 'byz-about-v40-page');
    const header = el('header', 'byz-about-header byz-about-reveal');
    const overline = el('div', 'byz-about-kicker', 'CRYSTAL II   /   THE BYZANTINE EMPIRE');
    const h1 = el('h1', 'byz-about-main-heading');
    h1.append(document.createTextNode('About '),el('em','', 'Us.'));
    const underline = el('div', 'byz-about-heading-rule');
    const intro = el('p', 'byz-about-deck', `${source.tagline || 'THE BYZANTINE EMPIRE'} · ${source.year || '330 CE – 1453 CE'}`);
    header.append(overline,h1,underline,intro);
    page.appendChild(header);
    const first = el('div', 'byz-about-story-grid');
    sections.forEach((section,i) => {
      if (i === 2) {
        page.appendChild(first);
        page.appendChild(imageSlot(1));
      }
      if (i === 6) page.appendChild(imageSlot(2));
      (i < 2 ? first : page).appendChild(sectionItem(section,i));
    });
    if (sections.length <= 2) page.appendChild(first);
    page.appendChild(el('footer', 'byz-about-endnote', 'TA PÁNTA PAZÁRI   /   CONSTANTINOPLE'));
    scrollViewport.appendChild(page);
    queueReveals();

  }
  function queueReveals() {
    if(revealPending) return;
    revealPending = true;
    requestAnimationFrame(()=>{
      revealPending = false;
      if(!active || !root) return;
      root.querySelectorAll('.byz-about-reveal:not(.byz-about-visible)').forEach(node=>{
        const rect = node.getBoundingClientRect();
        if(rect.top < innerHeight * .90 && rect.bottom > 0) node.classList.add('byz-about-visible');
      });
    });
  }
  function setActive(next) {
    mount();
    if (active === next) return;
    active = next;
    root.classList.toggle('byz-about-open',next);
    root.setAttribute('aria-hidden', String(!next));
    document.documentElement.classList.toggle('byz-about-is-active',next);
    document.body.classList.toggle('byz-about-is-active',next);
    if (next) {
      scrollViewport.scrollTop = 0;
      root.querySelectorAll('.byz-about-reveal').forEach(n=>n.classList.remove('byz-about-visible'));
      // Check layout geometry directly: clipping is visual, not a visibility threshold.
      requestAnimationFrame(()=>requestAnimationFrame(queueReveals));
    }
  }
  function update(payload) {
    if (!payload) return;
    const index = Number(payload.index);
    const status = String(payload.status || '');
    const show = index === 1 && status === 'interior';
    currentStatus = status;
    setActive(show);
  }
  function initialize() {
    mount();
    window.addEventListener('byz:market:real-page',e=>update(e.detail));
    update(NAV_STATUS());
    // Recover from a remount or signal missed while the React scene was initializing.
    setInterval(()=>{const p=NAV_STATUS();if(p && (Number(p.index)===1 || active)) update(p);},850);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
