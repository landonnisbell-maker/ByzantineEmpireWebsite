/* V93 — V92 historical editorial design, with six product photos and borderless image shadows. */
(() => {
  'use strict';
  if (window.__BYZ_HISTORY_V93__) return;
  window.__BYZ_HISTORY_V93__ = true;

  let root, scroller, active = false;
  const source = () => window.BYZANTINE_HISTORICAL_CONTENT_V92 || window.BYZANTINE_HISTORICAL_CONTENT_V88;
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

  // Historical product illustrations, kept independent of the market's own product assets.
  const PRODUCT_IMAGES = {
    'Paramerion Sword': ['product-paramerion-sword-v93.webp', 'A Byzantine paramerion sword and its matching scabbard.'],
    'Gold Jewelry': ['product-gold-jewelry-v93.webp', 'Gold Byzantine ring showing a religious portrait.'],
    'Gàros': ['product-garos-v93.webp', 'Fish in a wooden bowl beside a jug of garos fish sauce.'],
    'Apáki': ['product-apaki-v93.webp', 'Slices of traditional Cretan Apáki pork laid on a wooden board.'],
    'Silk Textiles': ['product-silk-textiles-v93.webp', 'Illustration of a Byzantine ruler in a richly colored cloak.'],
    'Coins': ['product-coins-v93.webp', 'Byzantine gold nomisma coin in a graded collector holder.']
  };
  const productAssetBase = '/ByzantineEmpireWebsite/historical-experience/assets/';

  function buildStoryCard(entry, i, withProductImage = false) {
    const card = node('article', 'byz-h-card byz-h-reveal');
    card.append(node('div', 'byz-h-card-count', String(i + 1).padStart(2, '0')));
    card.append(node('h3', '', entry.title));
    card.append(node('p', '', entry.body));
    const imageDetails = withProductImage ? PRODUCT_IMAGES[entry.title] : null;
    if (imageDetails) {
      card.append(buildFigure(productAssetBase + imageDetails[0], imageDetails[1], 'byz-h-figure-product'));
    }
    return card;
  }

  function buildFigure(src, alt, extraClass = '') {
    const fig = node('figure', `byz-h-figure byz-h-reveal ${extraClass}`.trim());
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    fig.append(img);
    return fig;
  }

  function buildPortalSection(items) {
    const wrap = node('section', 'byz-h-subsection byz-h-subsection-portal');
    wrap.append(node('h3', 'byz-h-subheading byz-h-reveal', 'Portal'));
    const grid = node('div', 'byz-h-subgrid byz-h-subgrid-portal');
    (items || []).forEach(item => {
      const article = node('article', 'byz-h-media-entry byz-h-reveal');
      article.append(node('p', 'byz-h-body', item.body || ''));
      if (item.image) article.append(buildFigure(item.image, item.alt || 'Historical portal image'));
      grid.append(article);
    });
    wrap.append(grid);
    return wrap;
  }

  function buildCrystalsSection(data) {
    const wrap = node('section', 'byz-h-subsection byz-h-subsection-crystals');
    wrap.append(node('h3', 'byz-h-subheading byz-h-reveal', 'Crystals'));
    if (data.crystalsIntro) {
      const intro = node('p', 'byz-h-long-copy byz-h-reveal', data.crystalsIntro);
      wrap.append(intro);
    }
    const grid = node('div', 'byz-h-subgrid byz-h-subgrid-crystals');
    (data.crystals || []).forEach(item => {
      const article = node('article', 'byz-h-media-entry byz-h-reveal');
      article.append(node('p', 'byz-h-body', item.body || ''));
      if (item.image) article.append(buildFigure(item.image, item.alt || 'Crystal historical image'));
      grid.append(article);
    });
    wrap.append(grid);
    if (data.crystalsOutro) {
      wrap.append(node('p', 'byz-h-centered-copy byz-h-reveal', data.crystalsOutro));
    }
    if (data.mountainsWater) {
      wrap.append(node('p', 'byz-h-centered-copy byz-h-centered-copy-wide byz-h-reveal', data.mountainsWater));
    }
    return wrap;
  }

  function buildMarketSection(data) {
    const wrap = node('section', 'byz-h-subsection byz-h-subsection-market');
    wrap.append(node('h3', 'byz-h-subheading byz-h-reveal', 'Market'));
    const intro = node('p', 'byz-h-long-copy byz-h-reveal', data.body || '');
    wrap.append(intro);
    if (data.image) wrap.append(buildFigure(data.image, data.alt || 'Market logo', 'byz-h-figure-market'));
    // V100: The market's Greek name, in the existing centered editorial style.
    const nameCopy = node('p', 'byz-h-centered-copy byz-h-centered-copy-wide byz-h-reveal');
    nameCopy.append(document.createTextNode('The name we chose for our market is '));
    nameCopy.append(node('em', '', 'ta pánta pazári'));
    nameCopy.append(document.createTextNode(', a Greek phrase that translates to “The Everything Bazaar.” Greek was the primary language spoken throughout the Byzantine Empire, making it a fitting choice for our market\'s name. We wanted a name that would reflect the wide variety of goods we offer, ranging from swords and cloaks to food and more.'));
    wrap.append(nameCopy);
    return wrap;
  }

  function buildWorksCited(items) {
    const section = node('section', 'byz-h-works byz-h-reveal');
    section.id = 'byz-h-works';
    const inner = node('div', 'byz-h-works-box');
    inner.append(buildSectionTitle('04  /  SOURCES', 'Works Cited', 'MLA FORMATTED REFERENCES USED FOR THIS PAGE'));
    inner.append(node('p', 'byz-h-works-intro', 'Each source below opens in a new tab.'));
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

  function renderHiddenSection(data) {
    const hidden = node('section', 'byz-h-section');
    hidden.id = 'byz-h-secrets';
    hidden.append(buildSectionTitle('03  /  THE DESIGN', 'Hidden in plain sight', 'EXAMINE THE CHOICES BEHIND THE WEBSITE'));
    if (data.hiddenPlainSight?.intro) {
      hidden.append(node('p', 'byz-h-long-copy byz-h-reveal', data.hiddenPlainSight.intro));
    }
    if (data.hiddenPlainSight?.portal?.length) hidden.append(buildPortalSection(data.hiddenPlainSight.portal));
    if (data.hiddenPlainSight) hidden.append(buildCrystalsSection(data.hiddenPlainSight));
    if (data.hiddenPlainSight?.market) hidden.append(buildMarketSection(data.hiddenPlainSight.market));
    return hidden;
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
    hero.append(node('p', 'byz-h-hero-copy', 'A behind-the-scenes look at the history, goods, and design decisions that shaped ta pánta pazári.'));
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
    sections(data.roleDescription).forEach((entry, i) => goodsGrid.append(buildStoryCard(entry, i, true)));
    goods.append(goodsGrid);
    page.append(goods);

    page.append(renderHiddenSection(data));
    page.append(buildWorksCited(data.worksCited));
    page.append(node('footer', 'byz-h-footer byz-h-reveal', 'TA PÁNTA PAZÁRI  /  THE EVERYTHING BAZAAR'));

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
        if (rect.top < innerHeight * 0.93 && rect.bottom > 0) el.classList.add('byz-h-shown');
      });
    });
  }

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
    const ease = 1 - Math.pow(0.91, elapsed / (1000 / 60));
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
    if (window.__BYZ_HISTORY_FRAME_BRIDGE_V121__?.nativeActive) return;
    if (!active || !scroller || event.ctrlKey || event.metaKey) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
    scrollBySmooth(event.deltaY * unit);
  }
  function handleKeys(event) {
    if (window.__BYZ_HISTORY_FRAME_BRIDGE_V121__?.nativeActive) return;
    if (!active || !scroller || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target?.closest?.('input,textarea,select,[contenteditable="true"]')) return;
    const jumps = { ArrowDown: 54, ArrowUp: -54, PageDown: scroller.clientHeight * 0.82, PageUp: -scroller.clientHeight * 0.82, ' ': scroller.clientHeight * 0.82 };
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      event.stopImmediatePropagation();
      scrollBySmooth(event.key === 'Home' ? 0 : maxScroll(), true);
    } else if (Object.prototype.hasOwnProperty.call(jumps, event.key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      scrollBySmooth((event.shiftKey && event.key === ' ' ? -1 : 1) * jumps[event.key]);
    }
  }

  function mount() {
    if (root?.isConnected) return;
    root = node('main', 'byz-history-v93');
    root.id = 'byz-history-v93';
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
      root.querySelectorAll('.byz-h-reveal').forEach(el => el.classList.remove('byz-h-shown'));
      requestAnimationFrame(() => requestAnimationFrame(queueReveals));
    }
  }

  function init() {
    ['byz-history-v87', 'byz-history-v88', 'byz-history-v89', 'byz-history-v90', 'byz-history-v91', 'byz-history-v92'].forEach(id => {
      const old = document.getElementById(id);
      if (old) {
        old.classList.remove('byz-h-open');
        old.style.display = 'none';
      }
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
