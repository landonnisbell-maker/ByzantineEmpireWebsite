/*
 * ta pánta pazári — Crystal 1 / Introduction team + galleries, V98.
 * Native canvas/WebGPU content only: team portraits, full names, roles/quotes,
 * and one lightweight HTML marquee of Architecture, Jewelry, Artifacts.
 */
(function () {
  'use strict';

  var PORTRAIT_BASE = '/ByzantineEmpireWebsite/intro-team/portraits/';
  var GALLERY_BASE = '/ByzantineEmpireWebsite/intro-team/gallery/';

  var people = [
    {
      name: 'Yusrah Abdallah',
      portrait: 'yusrah.webp',
      role: 'Writer',
      quote: "Don't forget to check out gàros sauce. It tastes good on Pizza. It tastes good on anything."
    },
    {
      name: 'Fizza Zaid',
      portrait: 'fizza.webp',
      role: 'Head of Research',
      quote: 'Only the finest comes from Byzantine'
    },
    {
      name: 'Shamir Owens',
      portrait: 'shamir.webp',
      role: 'Co-Researcher',
      quote: "You'll look awesome and cool with a Byzantine jewel."
    },
    {
      name: 'Lillyan Palmer',
      portrait: 'lillyan.webp',
      role: 'Product Selector',
      quote: "Who doesn't love swords?"
    },
    {
      name: 'Landon Isbell',
      portrait: 'landon.webp',
      role: 'Website Creator/Designer & CMO',
      quote: 'Pay close attention to the finer details of this website. From the placement of each element to the purpose behind its design, every choice has been made with intention. Nothing is there by accident. Just as with the art, architecture, and craftsmanship of the Byzantine Empire, even the smallest details have meaning.'
    }
  ];

  var galleries = [
    {
      title: 'Architecture',
      subtitle: 'Sacred spaces, vaulted interiors, and imperial design',
      images: [
        'architecture/hagia-sophia.webp',
        'architecture/basilica-cistern.png',
        'architecture/church-dome.webp',
        'architecture/mosaic-arches.png'
      ]
    },
    {
      title: 'Jewelry',
      subtitle: 'Portable luxury, symbols of faith, and personal adornment',
      images: [
        'jewelry/cross-pendant.jpg',
        'jewelry/ring.png'
      ]
    },
    {
      title: 'Artifacts',
      subtitle: 'Carved ivory, sacred objects, and devotional craftsmanship',
      images: [
        'artifacts/ivory-saint.png',
        'artifacts/gold-plaque.png',
        'artifacts/ivory-cup.png'
      ]
    }
  ];

  window.BYZANTINE_INTRO_TEAM_V54 = people;

  function loadImage(src) {
    var img = new Image();
    img.decoding = 'async';
    return new Promise(function (resolve) {
      img.addEventListener('load', function () { resolve(img); }, { once: true });
      img.addEventListener('error', function () { resolve(null); }, { once: true });
      img.src = src;
      if (img.complete) resolve(img.naturalWidth > 0 ? img : null);
    });
  }

  var loading = [];
  people.forEach(function (person) {
    person._portraitCache = null;
    loading.push(loadImage(PORTRAIT_BASE + person.portrait).then(function (img) {
      person._image = img;
      return img;
    }));
  });
  galleries.forEach(function (gallery) {
    gallery._images = [];
    gallery.images.forEach(function (name, i) {
      loading.push(loadImage(GALLERY_BASE + name).then(function (img) {
        gallery._images[i] = img;
        return img;
      }));
    });
  });

  var ready = false;
  var readyCallbacks = [];
  Promise.all(loading).then(function () {
    buildGalleryAtlas();
    ready = true;
    readyCallbacks.splice(0).forEach(function (callback) { callback(); });
  });
  window.__BYZ_INTRO_TEAM_ON_READY_V54__ = function (callback) {
    if (ready) {
      if (typeof callback === 'function') callback();
      return;
    }
    if (typeof callback === 'function') readyCallbacks.push(callback);
  };

  function roundedPath(ctx, x, y, w, h, r) {
    var rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function line(ctx, text, x, y, width, font, fill, lineHeight, maxLines) {
    ctx.font = font;
    ctx.fillStyle = fill;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    var words = String(text || '').split(/\s+/).filter(Boolean);
    var out = [], current = '';
    words.forEach(function (word) {
      var next = current ? current + ' ' + word : word;
      if (current && ctx.measureText(next).width > width) {
        out.push(current);
        current = word;
      } else {
        current = next;
      }
    });
    if (current) out.push(current);
    var lines = out.slice(0, Math.max(1, maxLines || 5));
    lines.forEach(function (row, i) { ctx.fillText(row, x, y + i * lineHeight); });
    return lines.length;
  }

  function preparedPortrait(person) {
    if (person._portraitCache) return person._portraitCache;
    var image = person._image;
    if (!image || !image.complete || !image.naturalWidth) return null;
    var width = 760, height = 858;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    var iw = image.naturalWidth, ih = image.naturalHeight;
    var insetX = 18, insetY = 8;
    var scale = Math.min((width - insetX * 2) / iw, (height - insetY * 2) / ih);
    var dw = iw * scale, dh = ih * scale;
    var dx = (width - dw) / 2, dy = (height - dh) / 2;
    ctx.drawImage(image, 0, 0, iw, ih, dx, dy, dw, dh);

    ctx.globalCompositeOperation = 'destination-in';
    var fadeX = ctx.createLinearGradient(dx, 0, dx + dw, 0);
    if (person.name === 'Yusrah Abdallah') {
      fadeX.addColorStop(0, 'rgba(0,0,0,0)');
      fadeX.addColorStop(.08, 'rgba(0,0,0,.08)');
      fadeX.addColorStop(.16, 'rgba(0,0,0,.38)');
      fadeX.addColorStop(.26, 'rgba(0,0,0,.90)');
      fadeX.addColorStop(.35, 'rgba(0,0,0,1)');
    } else {
      fadeX.addColorStop(0, 'rgba(0,0,0,0)');
      fadeX.addColorStop(.055, 'rgba(0,0,0,.35)');
      fadeX.addColorStop(.12, 'rgba(0,0,0,.85)');
      fadeX.addColorStop(.18, 'rgba(0,0,0,1)');
    }
    fadeX.addColorStop(.82, 'rgba(0,0,0,1)');
    fadeX.addColorStop(.88, 'rgba(0,0,0,.85)');
    fadeX.addColorStop(.945, 'rgba(0,0,0,.35)');
    fadeX.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fadeX;
    ctx.fillRect(0, 0, width, height);

    var fadeY = ctx.createLinearGradient(0, dy, 0, dy + dh);
    fadeY.addColorStop(0, 'rgba(0,0,0,0)');
    fadeY.addColorStop(.04, 'rgba(0,0,0,.4)');
    fadeY.addColorStop(.115, 'rgba(0,0,0,1)');
    fadeY.addColorStop(.72, 'rgba(0,0,0,1)');
    fadeY.addColorStop(.84, 'rgba(0,0,0,.70)');
    fadeY.addColorStop(.93, 'rgba(0,0,0,.22)');
    fadeY.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fadeY;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    person._portraitCache = canvas;
    return canvas;
  }

  window.__BYZ_INTRO_TEAM_TICK_V56__ = function (scrollY, viewportHeight, active, shader) {
    if (shader && shader.enabled) shader.enabled.value = 0;
  };

  // V98: Full-bleed plain HTML/CSS image marquee, independent from WebGPU textures.
  // The previous WebGPU atlas showed stretched fragments on multiple devices.
  // Images are now regular <img> elements and never passed through a shader.
  var marqueeLayout = null;
  var marqueeNode = null;
  var marqueeLastShown = false;
  var marqueeCaption = null;

  window.__BYZ_INTRO_GALLERY_ATLAS_V60__ = function () { return null; };
  window.__BYZ_INTRO_GALLERY_TICK_V60__ = function (active, shader) {
    if (shader && shader.enabled) shader.enabled.value = 0;
  };

  function makeMarquee() {
    if (marqueeNode) return marqueeNode;
    if (!document.body) return null;
    if (!document.getElementById('byz-intro-marquee-v97-style')) {
      var style = document.createElement('style');
      style.id = 'byz-intro-marquee-v97-style';
      style.textContent = `
        #byz-intro-marquee-v97 {
          position: fixed; z-index: 2147479000;
          display: none; left: 0; top: 0;
          margin: 0; padding: 0; pointer-events: none;
          overflow: hidden; isolation: isolate;
          background: #071525;
          border: none;
          border-radius: 0;
          box-shadow: none;
          box-sizing: border-box;
          contain: layout paint style;
        }
        #byz-intro-marquee-v97-caption {
          position: fixed; top: 0; left: 0; width: 100%;
          text-align: center; box-sizing: border-box;
          margin: 0; padding: 0 16px;
          color: #c6e8f3;
          font: 600 15px/1.5 Manrope, system-ui, sans-serif;
          text-shadow: 0 2px 8px rgba(0,0,0,.33);
          z-index: 2147479000; pointer-events: none;
          display: none;
        }
        #byz-intro-marquee-v97 .byz97-track {
          display: flex; height: 100%; width: max-content;
          animation: byz97-marquee 72s linear infinite;
          will-change: transform;
        }
        #byz-intro-marquee-v97 .byz97-set {
          display: flex; height: 100%; width: max-content; gap: 12px;
          padding-right: 12px; box-sizing: border-box;
          flex: 0 0 auto;
        }
        #byz-intro-marquee-v97 figure {
          position: relative; height: 100%; aspect-ratio: 1.55;
          flex: 0 0 auto; overflow: hidden; background: #102035;
          margin: 0;
        }
        #byz-intro-marquee-v97 .byz97-back {
          position: absolute; width: 116%; height: 116%; left: -8%; top: -8%;
          object-fit: cover;
          filter: blur(15px) brightness(.60);
        }
        #byz-intro-marquee-v97 .byz97-front {
          position: relative; z-index: 1; display: block;
          width: 100%; height: 100%; object-fit: contain;
        }
        #byz-intro-marquee-v97 .byz97-label {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          padding: 24px 13px 12px;
          font: 700 11px/1.4 Manrope, system-ui, sans-serif;
          letter-spacing: .17em; text-transform: uppercase;
          color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,.9);
          background: linear-gradient(transparent,rgba(2,8,17,.72));
        }
        @keyframes byz97-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @media (prefers-reduced-motion: reduce) {
          #byz-intro-marquee-v97 .byz97-track {animation-duration: 180s;}
        }
      `;
      document.head.appendChild(style);
    }
    var host = document.createElement('div');
    host.id = 'byz-intro-marquee-v97';
    host.setAttribute('aria-label', 'Automatically scrolling Byzantine architecture, jewelry, and artifacts photographs');
    var track = document.createElement('div');
    track.className = 'byz97-track';
    var primarySet = document.createElement('div');
    primarySet.className = 'byz97-set';
    galleries.forEach(function(gallery) {
      gallery.images.forEach(function(name) {
        var frame = document.createElement('figure');
        var src = GALLERY_BASE + name;
        var back = document.createElement('img');
        back.className = 'byz97-back';
        back.src = src; back.alt = ''; back.decoding = 'async';
        back.setAttribute('aria-hidden', 'true');
        var front = document.createElement('img');
        front.className = 'byz97-front';
        front.src = src;
        front.alt = gallery.title + ': ' + name.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        front.decoding = 'async';
        var label = document.createElement('figcaption');
        label.className = 'byz97-label';
        label.textContent = gallery.title;
        frame.appendChild(back); frame.appendChild(front); frame.appendChild(label);
        primarySet.appendChild(frame);
      });
    });
    var clonedSet = primarySet.cloneNode(true);
    clonedSet.setAttribute('aria-hidden', 'true');
    clonedSet.querySelectorAll('img').forEach(function(img){img.alt='';});
    track.appendChild(primarySet);
    track.appendChild(clonedSet);
    host.appendChild(track);
    document.body.appendChild(host);
    var caption = document.createElement('p');
    caption.id = 'byz-intro-marquee-v97-caption';
    caption.textContent = 'Architecture  ·  Jewelry  ·  Artifacts';
    document.body.appendChild(caption);
    marqueeCaption = caption;
    marqueeNode = host;
    return host;
  }

  window.__BYZ_INTRO_MARQUEE_LAYOUT_V97__ = null;
  // Coordinates are supplied by the site's existing 3D-to-screen projection
  // while Introduction is active. No independent scroll container is created.
  window.__BYZ_INTRO_MARQUEE_TICK_V97__ = function (active, rect) {
    var el = makeMarquee();
    if (!el) return;
    var shown = !!(active && rect &&
      Number.isFinite(rect.left) && Number.isFinite(rect.top) &&
      rect.width > 20 && rect.height > 20 &&
      rect.bottom > 0 && rect.top < window.innerHeight &&
      rect.right > 0 && rect.left < window.innerWidth);
    if (!shown) {
      if (marqueeLastShown) { el.style.display='none'; marqueeLastShown=false; }
      if (marqueeCaption) marqueeCaption.style.display='none';
      return;
    }
    if (!marqueeLastShown) { el.style.display='block'; marqueeLastShown=true; }
    // Bleed all the way to both screen edges; retain only projected Y/height
    // so it still scrolls natively with the existing Introduction plane.
    el.style.transform = 'translate3d(0,' + rect.top.toFixed(2) + 'px,0)';
    el.style.width = window.innerWidth + 'px';
    el.style.height = rect.height.toFixed(2) + 'px';
    // Viewport-centered caption independent of the 3D page's horizontal offset.
    if (marqueeCaption) {
      var captionY = rect.bottom + 17;
      var captionVisible = captionY >= -24 && captionY < window.innerHeight;
      marqueeCaption.style.display = captionVisible ? 'block' : 'none';
      if (captionVisible) marqueeCaption.style.transform='translate3d(0,' + captionY.toFixed(2) + 'px,0)';
    }
  };

  function drawMarqueeFrame(ctx, x, y, w, h) {
    ctx.save();
    roundedPath(ctx, x, y, w, h, 16);
    ctx.fillStyle = '#061625';
    ctx.fill();
    ctx.strokeStyle = 'rgba(158,220,240,.34)';
    ctx.lineWidth = 1.3;
    ctx.stroke();
    ctx.restore();
  }

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
      var rule = ctx.createLinearGradient(336, 0, 1909, 0);
      rule.addColorStop(0, '#c8f7ff');
      rule.addColorStop(.58, '#4689d9');
      rule.addColorStop(1, 'rgba(65,144,220,0)');
      ctx.fillStyle = rule;
      ctx.fillRect(336, sectionStart + 48, 1573, 1.5);
      ctx.restore();
    });

    var rowStart = sectionStart + 96;
    var rowHeight = 910;
    people.forEach(function (person, idx) {
      var y = rowStart + idx * rowHeight;
      var photoOnLeft = idx % 2 === 0;
      var photoX = photoOnLeft ? 374 : 1140;
      var textX = photoOnLeft ? 1125 : 355;
      var textWidth = 725;
      commands.push(function (ctx) {
        ctx.save();
        var image = preparedPortrait(person);
        if (image) ctx.drawImage(image, photoX, y, 760, 858);
        ctx.fillStyle = '#86ceec';
        ctx.font = '700 18px Manrope, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(String(idx + 1).padStart(2, '0') + '  /  05', textX, y + 144);
        ctx.fillStyle = '#f4fbff';
        ctx.font = '700 60px "League Spartan", system-ui, sans-serif';
        line(ctx, person.name, textX, y + 221, textWidth, '700 60px "League Spartan", system-ui, sans-serif', '#f4fbff', 62, 2);
        var rule = ctx.createLinearGradient(textX, 0, textX + textWidth, 0);
        rule.addColorStop(0, 'rgba(187,232,251,.75)');
        rule.addColorStop(1, 'rgba(110,173,239,0)');
        ctx.fillStyle = rule;
        ctx.fillRect(textX, y + 258, textWidth - 70, 2);
        ctx.fillStyle = '#a6d9ed';
        ctx.font = '700 18px Manrope, sans-serif';
        ctx.fillText('ROLE', textX, y + 320);
        line(ctx, person.role, textX, y + 367, textWidth, '600 27px Manrope, sans-serif', '#eefaff', 37, 3);
        if (person.quote) {
          ctx.fillStyle = '#93d4ed';
          ctx.font = '700 18px Manrope, sans-serif';
          ctx.fillText('IN THEIR WORDS', textX, y + 444);
          line(ctx, '\u201c' + person.quote + '\u201d', textX, y + 493, textWidth, 'italic 26px Georgia, serif', '#e5f3ff', 38, 10);
        }
        ctx.restore();
      });
    });

    var gallerySectionY = rowStart + rowHeight * people.length + 90;
    commands.push(function (ctx) {
      ctx.save();
      ctx.fillStyle = '#9cdcf2';
      ctx.font = '700 19px Manrope, sans-serif';
      ctx.fillText('EXPLORE BYZANTIUM', 336, gallerySectionY);
      ctx.fillStyle = '#f3fbff';
      ctx.font = '700 66px "League Spartan", system-ui, sans-serif';
      ctx.fillText('Architecture, Jewelry & Artifacts', 336, gallerySectionY + 78);
      var rule = ctx.createLinearGradient(336, 0, 1909, 0);
      rule.addColorStop(0, 'rgba(211,246,255,.85)');
      rule.addColorStop(.45, 'rgba(75,153,231,.52)');
      rule.addColorStop(1, 'rgba(75,153,231,0)');
      ctx.fillStyle = rule;
      ctx.fillRect(336, gallerySectionY + 102, 1573, 1.5);
      ctx.restore();
    });

    // A single banner at the bottom, not three oversized WebGPU panels.
    var bandX = 348, bandY = gallerySectionY + 166;
    var bandW = 1530, bandH = 485;
    window.__BYZ_INTRO_MARQUEE_LAYOUT_V97__ = {
      x: bandX, y: bandY, w: bandW, h: bandH
    };
    // V98: Frame and caption live in the full-bleed HTML overlay, not on
    // the limited-width WebGPU content plane. This prevents doubled text.
    return bandY + bandH + 116;
  };
})();
