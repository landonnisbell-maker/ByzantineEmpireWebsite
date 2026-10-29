/*
 * ta pánta pazári — Crystal 1 / Introduction team.
 * Edit role and quote fields below; the five portraits and text are painted
 * directly into the native WebGPU page canvas, not placed in an HTML overlay.
 * The order deliberately ends with Landon.
 */
(function () {
  'use strict';
  var BASE = '/ByzantineEmpireWebsite/intro-team/portraits/';
  var people = [
    { name: 'Yusrah',        portrait: 'yusrah.webp', role: 'Add role here', quote: 'Add a personal quote here.' },
    { name: 'Fizza',         portrait: 'fizza.webp',  role: 'Add role here', quote: 'Add a personal quote here.' },
    { name: 'Shamir',        portrait: 'shamir.webp', role: 'Add role here', quote: 'Add a personal quote here.' },
    { name: 'Lillyan',       portrait: 'lillyan.webp',role: 'Add role here', quote: 'Add a personal quote here.' },
    { name: 'Landon Isbell', portrait: 'landon.webp', role: 'Add role here', quote: 'Add a personal quote here.' }
  ];
  window.BYZANTINE_INTRO_TEAM_V54 = people;

  var loading = people.map(function (person) {
    var img = new Image();
    img.decoding = 'async';
    person._image = img;
    person._portraitCache = null;
    return new Promise(function (resolve) {
      img.addEventListener('load', function () { resolve(true); }, { once:true });
      img.addEventListener('error', function () { resolve(false); }, { once:true });
      img.src = BASE + person.portrait;
      if (img.complete) resolve(img.naturalWidth > 0);
    });
  });
  var ready = false;
  var readyCallbacks = [];
  Promise.all(loading).then(function () {
    ready = true;
    readyCallbacks.splice(0).forEach(function (callback) { callback(); });
  });
  window.__BYZ_INTRO_TEAM_ON_READY_V54__ = function (callback) {
    if (!ready && typeof callback === 'function') readyCallbacks.push(callback);
  };

  function line(ctx, text, x, y, width, font, fill, lineHeight) {
    ctx.font = font;
    ctx.fillStyle = fill;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    var words = String(text).split(/\s+/).filter(Boolean);
    var out = [], current = '';
    words.forEach(function (word) {
      var next = current ? current + ' ' + word : word;
      if (current && ctx.measureText(next).width > width) { out.push(current); current = word; }
      else current = next;
    });
    if (current) out.push(current);
    out.slice(0,5).forEach(function (row, i) { ctx.fillText(row, x, y + i * lineHeight); });
  }

  function preparedPortrait(person) {
    if (person._portraitCache) return person._portraitCache;
    var image = person._image;
    if (!image || !image.complete || !image.naturalWidth) return null;
    var width = 720, height = 610;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    var iw = image.naturalWidth, ih = image.naturalHeight;
    // Crops to a head-and-shoulders portrait without distorting the photograph.
    var scale = Math.max(width / iw, height / ih);
    var sw = width / scale, sh = height / scale;
    var sx = (iw - sw) / 2;
    var sy = Math.max(0, Math.min(ih - sh, ih * .045));
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
    // Feather ALL four sides so no rectangular photo frame can appear.
    ctx.globalCompositeOperation = 'destination-in';
    var fadeX = ctx.createLinearGradient(0, 0, width, 0);
    fadeX.addColorStop(0, 'rgba(0,0,0,0)');
    fadeX.addColorStop(.08, 'rgba(0,0,0,0.85)');
    fadeX.addColorStop(.2, 'rgba(0,0,0,1)');
    fadeX.addColorStop(.80, 'rgba(0,0,0,1)');
    fadeX.addColorStop(.92, 'rgba(0,0,0,.85)');
    fadeX.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fadeX;
    ctx.fillRect(0,0,width,height);
    var fadeY = ctx.createLinearGradient(0, 0, 0, height);
    fadeY.addColorStop(0, 'rgba(0,0,0,0)');
    fadeY.addColorStop(.08, 'rgba(0,0,0,.85)');
    fadeY.addColorStop(.19, 'rgba(0,0,0,1)');
    fadeY.addColorStop(.70, 'rgba(0,0,0,1)');
    fadeY.addColorStop(.92, 'rgba(0,0,0,.37)');
    fadeY.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fadeY;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
    person._portraitCache = canvas;
    return canvas;
  }

  // The host will execute these draw commands while generating its original
  // scrolling canvas texture, so images and text inherit native scroll/bend.
  window.__BYZ_DRAW_INTRO_TEAM_V54__ = function (commands, startY) {
    if (!Array.isArray(commands)) return startY;
    var sectionStart = startY + 26;
    commands.push(function (ctx) {
      ctx.save();
      ctx.textAlign = 'left';
      ctx.font = '700 19px Manrope, sans-serif';
      ctx.fillStyle = '#aeeaff';
      ctx.fillText('THE PEOPLE BEHIND THE BAZAAR', 336, sectionStart + 24);
      ctx.globalAlpha = .32;
      var rule = ctx.createLinearGradient(336,0,1909,0);
      rule.addColorStop(0,'#c8f7ff');rule.addColorStop(.58,'#4689d9');rule.addColorStop(1,'rgba(65,144,220,0)');
      ctx.fillStyle = rule;ctx.fillRect(336,sectionStart+48,1573,1.5);
      ctx.restore();
    });
    var rowStart = sectionStart + 96;
    var rowHeight = 628;
    people.forEach(function (person, idx) {
      var y = rowStart + idx * rowHeight;
      var photoOnLeft = idx % 2 === 0;
      var photoX = photoOnLeft ? 304 : 1190;
      var textX = photoOnLeft ? 1125 : 355;
      var textWidth = 725;
      commands.push(function (ctx) {
        ctx.save();
        var image = preparedPortrait(person);
        if (image) ctx.drawImage(image, photoX, y, 720, 610);
        ctx.fillStyle = '#86ceec';
        ctx.font = '700 18px Manrope, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(String(idx + 1).padStart(2,'0') + '  /  05', textX, y + 144);
        ctx.fillStyle = '#f4fbff';
        ctx.font = '700 60px "League Spartan", system-ui, sans-serif';
        ctx.fillText(person.name, textX, y + 221);
        var rule = ctx.createLinearGradient(textX,0,textX+textWidth,0);
        rule.addColorStop(0,'rgba(187,232,251,.75)');rule.addColorStop(1,'rgba(110,173,239,0)');
        ctx.fillStyle = rule;
        ctx.fillRect(textX,y+245,textWidth-70,2);
        ctx.fillStyle = '#a6d9ed';
        ctx.font = '700 18px Manrope, sans-serif';
        ctx.fillText('ROLE',textX,y+300);
        line(ctx, person.role, textX, y+347, textWidth, '600 27px Manrope, sans-serif', '#eefaff', 37);
        ctx.fillStyle = '#93d4ed';
        ctx.font = '700 18px Manrope, sans-serif';
        ctx.fillText('IN THEIR WORDS',textX,y+424);
        line(ctx, '\u201c' + person.quote + '\u201d', textX, y+473, textWidth, 'italic 28px Georgia, serif', '#e5f3ff', 40);
        ctx.restore();
      });
    });
    // The pre-existing Introduction content begins only after the entire team.
    return rowStart + rowHeight * people.length + 25;
  };
})();
