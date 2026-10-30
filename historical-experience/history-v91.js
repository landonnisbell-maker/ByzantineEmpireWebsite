/* V91 — smooth wheel scrolling and clean historical heading; only Works Cited uses a box. */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_V91__) return;
  window.__BYZ_HISTORY_V91__ = true;

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
    // Intentionally no shortcut navigation here: keep the editorial header
    // clear, and retain all sections (including the Works Cited list) below.
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
    // The full original descriptions are always shown. No accordions or
    // click-to-reveal controls: they interfered with normal page scrolling.
    const secretGrid = node('div', 'byz-h-grid byz-h-grid-two byz-h-meanings');
    sections(data.challenges).forEach((entry, i) => secretGrid.append(buildStoryCard(entry, i)));
    secrets.append(secretGrid);
    page.append(secrets);

    page.append(buildWorksCited(data.worksCited));
    const footer = node('footer', 'byz-h-footer byz-h-reveal', 'TA PÁNTA PAZÁRI  /  THE EVERYTHING BAZAAR');
    page.append(footer);

    scroller.append(page);
    queueReveals();
  }

  let revealQueued = false;
  function queueReveals() {
    if (revealQueued) return;
    revealQueued = true;
    requestAnimationFrame(() => {
      revealQueued = false;
      if (!active || !root) return;
      root.querySelectorAll('.byz-h-reveal:not(.byz-h-shown)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < innerHeight * .93 && rect.bottom > 0) el.classList.add('byz-h-shown');
      });
    });
  }

  // The original WebGL crystal view also listens for global wheel input. Capture
  // first so it cannot change scenes, then ease wheel motion *inside this page*.
  // This avoids V90's instantaneous `scrollTop += deltaY` jumps without
  // changing the scroll behavior of the other crystals or product pages.
  let wheelFrame = 0;
  let wheelGoal = 0;
  let frameClock = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function maxScroll() {
    return scroller ? Math.max(0, scroller.scrollHeight - scroller.clientHeight) : 0;
  }
  function boundScroll(y) {
    return Math.min(maxScroll(), Math.max(0, y));
  }
  function stopWheelAnimation() {
    if (wheelFrame) cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
    frameClock = 0;
    if (scroller) wheelGoal = scroller.scrollTop;
  }
  function animateWheel(now) {
    wheelFrame = 0;
    if (!active || !scroller) return;
    const elapsed = frameClock ? Math.min(50, Math.max(1, now - frameClock)) : 16.67;
    frameClock = now;
    wheelGoal = boundScroll(wheelGoal);
    const current = scroller.scrollTop;
    const distance = wheelGoal - current;
    if (Math.abs(distance) < 0.7) {
      scroller.scrollTop = wheelGoal;
      frameClock = 0;
      return;
    }
    // Time-based exponential interpolation: consistent on 30/60/120Hz screens;
    // no animation library, WebGL work, or extra layout nodes required.
    const ease = 1 - Math.exp(-elapsed / 78);
    scroller.scrollTop = current + distance * ease;
    wheelFrame = requestAnimationFrame(animateWheel);
  }
  function scrollBySmooth(amount, absolute = false) {
    if (!active || !scroller) return;
    if (reduceMotion.matches) {
      stopWheelAnimation();
      scroller.scrollTop = boundScroll(absolute ? amount : scroller.scrollTop + amount);
      return;
    }
    if (!wheelFrame) {
      wheelGoal = scroller.scrollTop;
      frameClock = 0;
    }
    wheelGoal = boundScroll(absolute ? amount : wheelGoal + amount);
    if (!wheelFrame && Math.abs(wheelGoal - scroller.scrollTop) >= 0.7) {
      wheelFrame = requestAnimationFrame(animateWheel);
    }
  }
  function handleWheel(event) {
    if (!active || !scroller || event.ctrlKey || event.metaKey) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
    scrollBySmooth(event.deltaY * unit);
  }
  function handleKeys(event) {
    if (!active || !scroller || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target?.closest?.('input,textarea,select,[contenteditable="true"]')) return;
    const jumps = { ArrowDown: 54, ArrowUp: -54, PageDown: scroller.clientHeight*.82,
      PageUp: -scroller.clientHeight*.82, ' ': scroller.clientHeight*.82 };
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); event.stopImmediatePropagation();
      scrollBySmooth(event.key === 'Home' ? 0 : maxScroll(), true);
    } else if (Object.prototype.hasOwnProperty.call(jumps, event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      scrollBySmooth((event.shiftKey && event.key === ' ' ? -1 : 1) * jumps[event.key]);
    }
  }

  function mount() {
    if (root?.isConnected) return;
    root = node('main', 'byz-history-v91');
    root.id = 'byz-history-v91';
    root.setAttribute('aria-hidden', 'true');
    scroller = node('div', 'byz-history-scroll');
    scroller.tabIndex = 0;
    scroller.setAttribute('data-lenis-prevent', 'true');
    scroller.setAttribute('data-lenis-prevent-wheel', 'true');
    scroller.setAttribute('data-lenis-prevent-touch', 'true');
    scroller.addEventListener('scroll', queueReveals, { passive: true });
    scroller.addEventListener('pointerdown', stopWheelAnimation, { passive: true });
    scroller.addEventListener('touchstart', stopWheelAnimation, { passive: true });
    root.append(scroller);
    document.body.append(root);
    render();
  }

  function update(payload) {
    const next = Number(payload?.index) === 3 && payload?.status === 'interior';
    if (next === active) return;
    stopWheelAnimation();
    active = next;
    mount();
    root.classList.toggle('byz-h-open', next);
    root.setAttribute('aria-hidden', String(!next));
    document.body.classList.toggle('byz-history-is-active', next);
    if (next) {
      scroller.scrollTop = 0;
      queueReveals();
    }
  }

  function init() {
    // The V88 scripts have been removed from the entry pages by this patch.
    // If a cached older copy survives a hot navigation, keep it invisible.
    ['byz-history-v87', 'byz-history-v88', 'byz-history-v89', 'byz-history-v90'].forEach(id => {
      const old = document.getElementById(id);
      if (old) { old.classList.remove('byz-h-open'); old.style.display = 'none'; }
    });
    mount();
    window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    window.addEventListener('keydown', handleKeys, true);
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
