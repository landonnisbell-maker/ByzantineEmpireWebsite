/* V89 — restored editorial Historical Connection, wheel + touch scrolling, and Works Cited as the ONLY boxed section. */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_V89__) return;
  window.__BYZ_HISTORY_V89__ = true;

  let root, scroller, observer, active = false;
  const source = () => window.BYZANTINE_HISTORICAL_CONTENT_V88;
  const state = () => window.__BYZ_MARKET_CURRENT_PAGE;
  const node = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const sections = str => String(str || '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
    .reduce((acc, cur, idx, arr) => {
      if (idx % 2 === 0) acc.push({ title: cur, body: arr[idx + 1] || '' });
      return acc;
    }, []);

  function buildSectionTitle(label, titleText, subText) {
    const wrap = node('header', 'byz-h-section-title byz-h-reveal');
    wrap.append(node('div', 'byz-h-eyebrow', label));
    wrap.append(node('h2', '', titleText));
    if (subText) wrap.append(node('p', 'byz-h-section-sub', subText));
    return wrap;
  }

  function buildStoryCard(entry, i) {
    const card = node('article', 'byz-h-card byz-h-reveal');
    card.append(node('div', 'byz-h-card-count', String(i + 1).padStart(2, '0')));
    card.append(node('h3', '', entry.title));
    card.append(node('p', '', entry.body));
    return card;
  }

  function buildSecret(entry, i) {
    const item = node('details', 'byz-h-secret byz-h-reveal');
    if (i === 0) item.open = true;
    const summary = node('summary');
    summary.append(node('span', 'byz-h-secret-count', String(i + 1).padStart(2, '0')));
    summary.append(node('span', 'byz-h-secret-title', entry.title));
    summary.append(node('span', 'byz-h-secret-symbol', '+'));
    item.append(summary);
    item.append(node('div', 'byz-h-secret-body', entry.body));
    return item;
  }

  function buildWorksCited(items) {
    const section = node('section', 'byz-h-works byz-h-reveal');
    section.id = 'byz-h-works';
    const inner = node('div', 'byz-h-works-box');
    inner.append(buildSectionTitle('04  /  SOURCES', 'Works Cited', 'MLA FORMATTED REFERENCES USED FOR THIS PAGE'));
    const intro = node('p', 'byz-h-works-intro', 'Each source below opens in a new tab.');
    inner.append(intro);
    const list = node('ol', 'byz-h-works-list');
    (items || []).forEach(html => {
      const li = node('li', 'byz-h-work-item');
      li.innerHTML = html;
      list.append(li);
    });
    inner.append(list);
    section.append(inner);
    return section;
  }

  function render() {
    if (!scroller) return;
    const data = source();
    if (!data) return;
    scroller.replaceChildren();

    const page = node('main', 'byz-history-page');

    const hero = node('section', 'byz-h-hero byz-h-reveal');
    hero.id = 'byz-h-top';
    hero.append(node('div', 'byz-h-eyebrow', 'CRYSTAL IV  /  THE BYZANTINE EMPIRE'));
    hero.append(node('h1', '', 'Historical Connection'));
    hero.append(node('p', 'byz-h-hero-sub', data.tagline || 'THE HISTORY BEHIND THE BAZAAR'));
    const heroDeck = node('p', 'byz-h-hero-copy', 'A behind-the-scenes look at the history, goods, and design decisions that shaped ta pánta pazári.');
    hero.append(heroDeck);
    const nav = node('nav', 'byz-h-nav');
    nav.setAttribute('aria-label', 'Historical Connection sections');
    [
      ['byz-h-context', 'The Empire'],
      ['byz-h-goods', 'The Goods'],
      ['byz-h-secrets', 'The Hidden Details'],
      ['byz-h-works', 'Works Cited']
    ].forEach(([id, label]) => {
      const a = node('a', '', label);
      a.href = '#' + id;
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = page.querySelector('#' + id);
        if (target) {
          const y = scroller.scrollTop + target.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 28;
          scroller.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
      });
      nav.append(a);
    });
    hero.append(nav);
    page.append(hero);

    const context = node('section', 'byz-h-section');
    context.id = 'byz-h-context';
    context.append(buildSectionTitle('01  /  CONTEXT', 'The world behind the market', 'SOCIETY  /  COMMERCE'));
    const contextGrid = node('div', 'byz-h-grid byz-h-grid-two');
    sections(data.description).forEach((entry, i) => contextGrid.append(buildStoryCard(entry, i)));
    context.append(contextGrid);
    page.append(context);

    const goods = node('section', 'byz-h-section');
    goods.id = 'byz-h-goods';
    goods.append(buildSectionTitle('02  /  OBJECTS', 'Every product has a history', 'BEHIND THE GOODS'));
    const goodsGrid = node('div', 'byz-h-grid byz-h-grid-two');
    sections(data.roleDescription).forEach((entry, i) => goodsGrid.append(buildStoryCard(entry, i)));
    goods.append(goodsGrid);
    page.append(goods);

    const secrets = node('section', 'byz-h-section');
    secrets.id = 'byz-h-secrets';
    secrets.append(buildSectionTitle('03  /  THE DESIGN', 'Hidden in plain sight', 'EXAMINE THE CHOICES BEHIND THE WEBSITE'));
    secrets.append(node('p', 'byz-h-secret-intro byz-h-reveal', 'Select a design detail to uncover its historical connection.'));
    const secretGrid = node('div', 'byz-h-secret-grid');
    sections(data.challenges).forEach((entry, i) => {
      const item = buildSecret(entry, i);
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        secretGrid.querySelectorAll('details').forEach(other => {
          if (other !== item) other.open = false;
        });
      });
      secretGrid.append(item);
    });
    secrets.append(secretGrid);
    page.append(secrets);

    page.append(buildWorksCited(data.worksCited));
    const footer = node('footer', 'byz-h-footer byz-h-reveal', 'TA PÁNTA PAZÁRI  /  THE EVERYTHING BAZAAR');
    page.append(footer);

    scroller.append(page);
    registerReveals();
  }

  function registerReveals() {
    observer?.disconnect();
    const items = scroller.querySelectorAll('.byz-h-reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('byz-h-shown'));
      return;
    }
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('byz-h-shown');
          observer.unobserve(entry.target);
        }
      });
    }, { root: scroller, threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
  }

  function mount() {
    if (root?.isConnected) return;
    root = node('section', 'byz-history-v89');
    root.id = 'byz-history-v89';
    root.setAttribute('aria-hidden', 'true');
    scroller = node('div', 'byz-history-scroll');
    scroller.tabIndex = 0;
    scroller.setAttribute('data-lenis-prevent', 'true');
    scroller.setAttribute('data-lenis-prevent-wheel', 'true');
    scroller.setAttribute('data-lenis-prevent-touch', 'true');
    // The 3D page intercepts wheel input globally. Handle it on this visible
    // article so scrolling works regardless of Lenis / canvas event listeners.
    scroller.addEventListener('wheel', event => {
      if (!active || event.ctrlKey) return;
      event.preventDefault();
      event.stopPropagation();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      scroller.scrollTop += event.deltaY * unit;
    }, { passive: false });
    root.append(scroller);
    document.body.append(root);
    render();
  }

  function update(payload) {
    const next = Number(payload?.index) === 3 && payload?.status === 'interior';
    if (next === active) return;
    active = next;
    mount();
    root.classList.toggle('byz-h-open', next);
    root.setAttribute('aria-hidden', String(!next));
    document.body.classList.toggle('byz-history-is-active', next);
    if (next) {
      scroller.scrollTop = 0;
      registerReveals();
    }
  }

  function init() {
    // The V88 scripts have been removed from the entry pages by this patch.
    // If a cached older copy survives a hot navigation, keep it invisible.
    const old = document.getElementById('byz-history-v88');
    if (old) { old.classList.remove('byz-h-open'); old.style.display = 'none'; }
    mount();
    window.addEventListener('byz:market:real-page', e => update(e.detail));
    update(state());
    setInterval(() => {
      const page = state();
      if (page && (Number(page.index) === 3 || active)) update(page);
    }, 850);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
