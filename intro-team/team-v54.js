/*
 * ta pánta pazári — Crystal 1 / Introduction team + galleries, V59.
 * Native canvas/WebGPU content only: team portraits, full names, roles/quotes,
 * and three continuous sliding galleries for Architecture, Jewelry, Artifacts.
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

  // V61: The original large page texture is static, but this much smaller
  // three-row gallery texture is repainted continuously. Unlike V60, we do
  // not depend on slide-position shader uniforms being invalidated by WebGPU.
  var GALLERY_CELL_W = 900, GALLERY_CELL_H = 480;
  var galleryAtlas = null, galleryFrames = null, galleryLastRender = -1;
  function drawGalleryImage(ctx, img, x, y, w, h) {
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      ctx.fillStyle = '#081b2a'; ctx.fillRect(x, y, w, h); return;
    }
    var iw=img.naturalWidth,ih=img.naturalHeight,ratio=iw/ih;
    // Only portrait/square formats need a blurred fill. Normal landscape
    // photographs are rendered as a single sharp image.
    if (ratio < 1.14) {
      var cover=Math.max(w/iw,h/ih), bw=iw*cover,bh=ih*cover;
      ctx.save();ctx.filter='blur(26px) brightness(.51) saturate(.8)';
      ctx.drawImage(img,x+(w-bw)/2,y+(h-bh)/2,bw,bh);ctx.restore();
      var contain=Math.min((w-16)/iw,(h-12)/ih),fw=iw*contain,fh=ih*contain;
      ctx.drawImage(img,x+(w-fw)/2,y+(h-fh)/2,fw,fh);
    } else {
      var scale=Math.max(w/iw,h/ih),dw=iw*scale,dh=ih*scale;
      ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);
    }
  }
  function buildGalleryAtlas(){
    if(galleryAtlas)return galleryAtlas;
    var c=document.createElement('canvas');
    c.width=GALLERY_CELL_W;c.height=GALLERY_CELL_H*galleries.length;
    var ctx=c.getContext('2d');if(!ctx)return null;
    galleryFrames=galleries.map(function(g){return g._images.map(function(img){
      var tile=document.createElement('canvas');tile.width=GALLERY_CELL_W;tile.height=GALLERY_CELL_H;
      var tc=tile.getContext('2d');
      tc.fillStyle='#081728';tc.fillRect(0,0,tile.width,tile.height);
      drawGalleryImage(tc,img,0,0,tile.width,tile.height);
      return tile;
    });});
    galleryAtlas=c;
    return c;
  }
  window.__BYZ_INTRO_GALLERY_ATLAS_V60__=function(){return galleryAtlas;};
  window.__BYZ_INTRO_GALLERY_TICK_V60__=function(active,shader){
    if(shader && shader.enabled) shader.enabled.value=0;
  };

  function drawCarouselFrame(ctx,gallery,x,y,w,h){
    ctx.save();
    roundedPath(ctx,x,y,w,h,26);
    ctx.fillStyle='rgba(7,20,36,.85)';
    ctx.fill();
    ctx.strokeStyle='rgba(189,235,255,.26)';
    ctx.lineWidth=1.4;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.textAlign='left';
    ctx.fillStyle='#f3fbff';
    ctx.font='700 40px "League Spartan", system-ui, sans-serif';
    ctx.fillText(gallery.title,x,y-25);
    ctx.fillStyle='rgba(216,241,252,.88)';
    ctx.font='500 18px Manrope, sans-serif';
    ctx.fillText(gallery.subtitle,x,y+h+35);
    ctx.textAlign='right';
    ctx.fillStyle='#a7deee';
    ctx.font='700 17px Manrope, sans-serif';
    ctx.fillText('AUTO · '+String(gallery.images.length).padStart(2,'0')+' IMAGES',x+w,y-25);
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

    var galleryStart = gallerySectionY + 148;
    var cardW = 330;
    var cardH = 215;
    var cardGap = 28;
    var sectionGap = 320;

    function drawStaticGalleryCard(ctx, img, x, y, w, h) {
      ctx.save();
      roundedPath(ctx, x, y, w, h, 22);
      ctx.fillStyle = 'rgba(7,20,36,.88)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(189,235,255,.24)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.clip();
      drawGalleryImage(ctx, img, x, y, w, h);
      ctx.restore();
    }

    galleries.forEach(function (gallery, idx) {
      var gy = galleryStart + idx * sectionGap;
      commands.push(function (ctx) {
        ctx.save();
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f3fbff';
        ctx.font = '700 42px "League Spartan", system-ui, sans-serif';
        ctx.fillText(gallery.title, 336, gy + 24);
        ctx.fillStyle = 'rgba(216,241,252,.88)';
        ctx.font = '500 18px Manrope, sans-serif';
        ctx.fillText(gallery.subtitle, 336, gy + 58);
        var imgs = gallery._images.filter(Boolean);
        imgs.forEach(function (img, i) {
          var x = 336 + i * (cardW + cardGap);
          drawStaticGalleryCard(ctx, img, x, gy + 88, cardW, cardH);
        });
        ctx.restore();
      });
    });

    return galleryStart + sectionGap * galleries.length - 32;
  };
})();
