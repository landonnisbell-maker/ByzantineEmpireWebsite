/* ta pánta pazári — Crystal 1 introduction presentation */
(() => {
  'use strict';
  const ROOT_ID = 'byz-intro-v52';
  const NAV_STATUS = () => window.__BYZ_MARKET_CURRENT_PAGE;
  let root = null;
  let scrollViewport = null;
  let revealPending = false;
  let active = false;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function paragraphs(text) {
    return String(text || '').split(/\n\s*\n/).map(v => v.trim()).filter(Boolean);
  }
  function imageSlot(n) {
    const wrap = el('figure', 'byz-intro-photo byz-intro-reveal');
    wrap.setAttribute('aria-label', 'Image placeholder ' + n);
    wrap.append(el('div', 'byz-intro-photo-wash'), el('figcaption', 'byz-intro-photo-caption', 'No image supplied yet.'));
    return wrap;
  }
  function mount() {
    if (root && root.isConnected) return;
    root = el('main', 'byz-intro-v52');
    root.id = ROOT_ID;
    root.setAttribute('aria-label', 'Introduction — The Byzantine Empire');
    root.setAttribute('aria-hidden', 'true');
    const bg = el('div', 'byz-intro-bg');
    bg.setAttribute('aria-hidden', 'true');
    bg.append(el('div', 'byz-intro-wave one'), el('div', 'byz-intro-wave two'), el('div', 'byz-intro-wave three'), el('div', 'byz-intro-vignette'));
    const scan = el('div', 'byz-intro-scan');
    scan.setAttribute('aria-hidden', 'true');
    const grain = el('div', 'byz-intro-grain');
    grain.setAttribute('aria-hidden', 'true');
    scrollViewport = el('div', 'byz-intro-scroll');
    scrollViewport.setAttribute('data-lenis-prevent', 'true');
    scrollViewport.setAttribute('data-lenis-prevent-wheel', 'true');
    scrollViewport.setAttribute('tabindex', '-1');
    scrollViewport.addEventListener('scroll', queueReveals, { passive: true });
    root.append(bg, scan, grain, scrollViewport);
    document.body.appendChild(root);
    renderContent();
  }
  function renderContent() {
    if (!scrollViewport) return;
    const source = window.BYZANTINE_CRYSTAL_CONTENT?.[0] || {};
    scrollViewport.replaceChildren();
    const page = el('div', 'byz-intro-page');
    const header = el('header', 'byz-intro-header byz-intro-reveal');
    const headerMain = document.createElement('div');
    const overline = el('div', 'byz-intro-kicker', 'CRYSTAL I   /   THE BYZANTINE EMPIRE');
    const h1 = el('h1', 'byz-intro-main-heading');
    h1.append(document.createTextNode('Introduc'), el('em', '', 'tion.'));
    const rule = el('div', 'byz-intro-heading-rule');
    const deck = el('p', 'byz-intro-deck', `${source.tagline || 'INTRODUCTION'}${source.year && source.year !== '—' ? ' · ' + source.year : ''}`);
    headerMain.append(overline, h1, rule, deck);
    const marker = el('div', 'byz-intro-page-marker', (source.overline || 'Page 1').toUpperCase());
    header.append(headerMain, marker);
    page.appendChild(header);

    const grid = el('section', 'byz-intro-grid');
    const left = document.createElement('div');
    const introPanel = el('article', 'byz-intro-panel byz-intro-reveal');
    introPanel.append(el('span', 'byz-intro-panel-label', 'Overview'), el('h2', 'byz-intro-panel-title', source.title || 'Introduction'));
    const introCopy = el('div', 'byz-intro-copy');
    paragraphs(source.description).forEach(p => introCopy.appendChild(el('p', '', p)));
    if (!introCopy.children.length) introCopy.appendChild(el('p', '', 'No introduction text supplied yet.'));
    introPanel.appendChild(introCopy);
    left.appendChild(introPanel);
    left.appendChild(imageSlot(1));

    const right = document.createElement('div');
    const roleCard = el('article', 'byz-intro-card byz-intro-reveal');
    roleCard.append(el('span', 'byz-intro-panel-label', source.roleHeading || 'Role Summary'));
    if ((source.roleTitles || []).length) roleCard.append(el('h3', 'byz-intro-panel-title', source.roleTitles.join(' / ')));
    const roleCopy = el('div', 'byz-intro-copy');
    paragraphs(source.roleDescription).forEach(p => roleCopy.appendChild(el('p', '', p)));
    if (!roleCopy.children.length) roleCopy.appendChild(el('p', '', 'No supporting summary supplied yet.'));
    roleCard.appendChild(roleCopy);
    if ((source.stack || []).length) {
      const chips = el('div', 'byz-intro-stack');
      source.stack.forEach(item => chips.appendChild(el('span', 'byz-intro-chip', item)));
      roleCard.appendChild(chips);
    }
    right.appendChild(roleCard);
    right.appendChild(imageSlot(2));

    const challengeCard = el('article', 'byz-intro-panel byz-intro-reveal');
    challengeCard.append(el('span', 'byz-intro-panel-label', source.challengesHeading || 'Technical Constraints'), el('h3', 'byz-intro-panel-title', source.challengesHeading || 'Technical Constraints'));
    const challengeCopy = el('div', 'byz-intro-copy');
    paragraphs(source.challenges).forEach(p => challengeCopy.appendChild(el('p', '', p)));
    if (!challengeCopy.children.length) challengeCopy.appendChild(el('p', '', 'No additional details supplied yet.'));
    challengeCard.appendChild(challengeCopy);
    right.appendChild(challengeCard);

    grid.append(left, right);
    page.appendChild(grid);
    page.appendChild(el('footer', 'byz-intro-endnote', 'TA PÁNTA PAZÁRI   /   CONSTANTINOPLE'));
    scrollViewport.appendChild(page);
    queueReveals();
  }
  function queueReveals() {
    if (revealPending) return;
    revealPending = true;
    requestAnimationFrame(() => {
      revealPending = false;
      if (!active || !root) return;
      root.querySelectorAll('.byz-intro-reveal:not(.byz-intro-visible)').forEach(node => {
        const rect = node.getBoundingClientRect();
        if (rect.top < innerHeight * 0.9 && rect.bottom > 0) node.classList.add('byz-intro-visible');
      });
    });
  }
  function setActive(next) {
    mount();
    if (active === next) return;
    active = next;
    root.classList.toggle('byz-intro-open', next);
    root.setAttribute('aria-hidden', String(!next));
    document.documentElement.classList.toggle('byz-intro-is-active', next);
    document.body.classList.toggle('byz-intro-is-active', next);
    if (next) {
      scrollViewport.scrollTop = 0;
      root.querySelectorAll('.byz-intro-reveal').forEach(n => n.classList.remove('byz-intro-visible'));
      requestAnimationFrame(() => requestAnimationFrame(queueReveals));
    }
  }
  function update(payload) {
    if (!payload) return;
    const index = Number(payload.index);
    const status = String(payload.status || '');
    setActive(index === 0 && status === 'interior');
  }
  function initialize() {
    mount();
    window.addEventListener('byz:market:real-page', e => update(e.detail));
    update(NAV_STATUS());
    setInterval(() => { const p = NAV_STATUS(); if (p && (Number(p.index) === 0 || active)) update(p); }, 850);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
