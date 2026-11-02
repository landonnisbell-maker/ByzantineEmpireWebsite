/* V145: Brightened only the four historical crystal screenshots. */
/* V142 — Historical Connection: paired image alignment and native content with updated
 * crystal landmark screenshots from the live portal. Readable source imagery and
 * HTML-only Works Cited. No DOM rasterization.
 * Content is drawn directly into the same CanvasTexture/3D-plane path as the
 * Introduction/About Us pages. The native renderer owns scroll, bend, and fluid. */
(() => {
  'use strict';
  if (window.__BYZ_NATIVE_HISTORY_V133__) return;
  window.__BYZ_NATIVE_HISTORY_V133__ = true;

  const SRC = '/ByzantineEmpireWebsite/historical-experience/assets/';
  const imageFiles = [
    'product-paramerion-sword-v93.webp', 'product-gold-jewelry-v93.webp',
    'product-garos-v93.webp', 'product-apaki-v93.webp',
    'product-silk-textiles-v93.webp', 'product-coins-v93.webp',
    'portal-arch.png', 'portal-open.png',
    'crystal-blue-hagia-sophia-v145.png', 'crystal-purple-great-palace-v145.png',
    'crystal-green-hippodrome-v145.png', 'crystal-orange-theodosian-walls-v145.png',
    'market-logo.png'
  ];
  const imageCache = new Map();
  let loaded = false;
  const onReady = [];
  const loading = imageFiles.map(name => new Promise(resolve => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => { imageCache.set(name, image); resolve(); };
    image.onerror = () => resolve();
    image.src = SRC + name;
    if (image.complete && image.naturalWidth) { imageCache.set(name, image); resolve(); }
  }));
  Promise.all(loading).then(() => {
    loaded = true;
    onReady.splice(0).forEach(cb => { try { cb(); } catch(e) { console.warn('[History V133] redraw callback',e); } });
  });
  window.__BYZ_HISTORY_NATIVE_ON_READY_V133__ = cb => {
    if (typeof cb !== 'function') return;
    if (loaded) cb(); else onReady.push(cb);
  };

  const parsePairs = src => String(src || '').split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
    .reduce((out, text, i, parts) => { if (i % 2 === 0) out.push({heading: text, body: parts[i+1] || ''}); return out; }, []);

  const C = {
    cream: '#f9f2e7', gold: '#e1b475', body:'#f1eeec', dim:'#b4aaa3',
    thin:'rgba(232,186,131,.55)'
  };
  const X = 336, RIGHT = 1909, CX = 1122.5, W = 1573, G = 84;
  const COL = (W-G)/2, X2 = X+COL+G;
  const FONT_SANS = 'Manrope, Arial, sans-serif';
  const FONT_SERIF = 'Georgia, "Times New Roman", serif';

  function makeDrawer(data) {
    const ops=[];
    let cursor=140;
    const add=cb=>ops.push(cb);
    const line=(x,y,x2,color=C.thin)=>add(ctx=>{
      ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.moveTo(x,y);ctx.lineTo(x2,y);ctx.stroke();
    });
    const text=(value,x,y,font,color=C.body,align='left')=>add(ctx=>{
      ctx.font=font;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(String(value),x,y);
    });
    const wrap=(value,x,y,maxWidth,font,color=C.body,lineHeight=34,align='left')=>{
      const temp=document.createElement('canvas').getContext('2d');
      temp.font=font;
      const words=String(value||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean);
      const lines=[];let cur='';
      for(const word of words) {
        const proposal=cur?`${cur} ${word}`:word;
        if(cur&&temp.measureText(proposal).width>maxWidth){lines.push(cur);cur=word;} else cur=proposal;
      }
      if(cur)lines.push(cur);
      lines.forEach((l,i)=>text(l,x,y+i*lineHeight,font,color,align));
      return y+lines.length*lineHeight;
    };
    const img=(name,x,y,w,h)=>add(ctx=>{
      const image=imageCache.get(name);
      if(!image?.naturalWidth)return;
      const fit=Math.min(w/image.naturalWidth,h/image.naturalHeight);
      const dw=fit*image.naturalWidth,dh=fit*image.naturalHeight;
      const dx=x+(w-dw)/2,dy=y+(h-dh)/2;
      ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(image,dx,dy,dw,dh);ctx.restore();
    });
    const ribbon=(num,tag,title,sub,y)=>{
      line(X+150,y,RIGHT-150);text(`${num} / ${tag}`.toUpperCase(),CX,y+39,`700 15px ${FONT_SANS}`,C.gold,'center');
      text(title,CX,y+102,`normal 58px ${FONT_SERIF}`,C.cream,'center');
      if(sub)text(sub.toUpperCase(),CX,y+135,`700 15px ${FONT_SANS}`,C.gold,'center');
      return y+153;
    };
    const twoText=(items,y,imgFiles=null)=>{
      let maxY=y;
      for(let i=0;i<items.length;i+=2){
        const y0=maxY;
        const entries=[];
        // Layout the paired columns first. Images in a row must share a
        // vertical anchor, even if the paragraphs have different line counts.
        [0,1].forEach(k=>{
          const entry=items[i+k]; if(!entry) return;
          const x=k?X2:X;
          line(x,y0,x+COL);
          text(String(i+k+1).padStart(2,'0'),x,y0+26,`700 14px ${FONT_SANS}`,C.gold);
          text(entry.heading,x,y0+73,`normal 40px ${FONT_SERIF}`,C.cream);
          const end=wrap(entry.body,x,y0+105,COL-8,`400 21px ${FONT_SANS}`,C.body,29);
          entries.push({x,end,name:imgFiles?.[i+k]});
        });
        const ends=entries.map(entry=>entry.end);
        const shortest=Math.min(...ends),longest=Math.max(...ends);
        // Starting near the shorter paragraph's former image location brings
        // the longer column's image upward; preserve a safe space after text.
        const sharedImageTop=Math.max(shortest+18,longest-9);
        let rowEnd=y0;
        for(const entry of entries){
          if(entry.name){
            const imageHeight=495;
            img(entry.name,entry.x,sharedImageTop,COL,imageHeight);
            rowEnd=Math.max(rowEnd,sharedImageTop+imageHeight+44);
          } else {
            rowEnd=Math.max(rowEnd,entry.end+14);
          }
        }
        maxY=rowEnd+35;
      }
      return maxY;
    };
    // Header mirrors the original V93 page composition.
    text('CRYSTAL IV / THE BYZANTINE EMPIRE',CX,cursor,`700 15px ${FONT_SANS}`,C.gold,'center');
    text('Historical Connection',CX,cursor+90,`normal 82px ${FONT_SERIF}`,C.cream,'center');
    text('THE HISTORY BEHIND THE BAZAAR',CX,cursor+136,`700 17px ${FONT_SANS}`,C.gold,'center');
    wrap('A behind-the-scenes look at the history, goods, and design decisions that shaped ta pánta pazári.',CX,cursor+195,800,`400 23px ${FONT_SANS}`,C.body,33,'center');
    cursor+=255;
    cursor=ribbon('01','Context','The world behind the market','Society / Commerce',cursor);
    cursor=twoText(parsePairs(data.description),cursor+5);
    cursor=ribbon('02','Objects','Every product has a history','Behind the goods',cursor+10);
    cursor=twoText(parsePairs(data.roleDescription),cursor+10,[
      'product-paramerion-sword-v93.webp','product-gold-jewelry-v93.webp',
      'product-garos-v93.webp','product-apaki-v93.webp',
      'product-silk-textiles-v93.webp','product-coins-v93.webp'
    ]);
    cursor=ribbon('03','The Design','Hidden in plain sight','Why we designed it this way',cursor+20);
    const hidden=data.hiddenPlainSight || {};
    cursor=wrap(hidden.intro || '',CX,cursor+25,1060,`400 21px ${FONT_SANS}`,C.body,29,'center')+48;
    text('Portal',CX,cursor+45,`normal 49px ${FONT_SERIF}`,C.cream,'center');cursor+=79;
    const portal=(hidden.portal || []).map((item,i)=>({heading:i===0?'Purple energy':'Gold & purple',body:item.body}));
    let cy=cursor;
    const portalImageStarts=[];
    portal.forEach((entry,i)=>{
      const x=i?X2:X;
      line(x,cy,x+COL);
      const bottom=wrap(entry.body,x,cy+36,COL,`400 21px ${FONT_SANS}`,C.body,29);
      portalImageStarts.push(bottom+18);
    });
    // Both Portal images begin at the same baseline, clear of the longer paragraph.
    const portalImageTop=Math.max(...portalImageStarts);
    portal.forEach((entry,i)=>{
      img(i===0?'portal-arch.png':'portal-open.png',i?X2:X,portalImageTop,COL,455);
    });
    cursor=portalImageTop+455+77;
    text('Crystals',CX,cursor+45,`normal 49px ${FONT_SERIF}`,C.cream,'center');cursor+=65;
    cursor=wrap(hidden.crystalsIntro || '',CX,cursor+25,1040,`400 21px ${FONT_SANS}`,C.body,29,'center')+66;
    cursor=twoText((hidden.crystals||[]).map((item,i)=>({heading:['Hagia Sophia','Great Palace','Hippodrome','Theodosian Walls'][i]||`Crystal ${i+1}`,body:item.body})),cursor,[
      'crystal-blue-hagia-sophia-v145.png','crystal-purple-great-palace-v145.png',
      'crystal-green-hippodrome-v145.png','crystal-orange-theodosian-walls-v145.png'
    ]);
    cursor=wrap(hidden.crystalsOutro||'',CX,cursor,1070,`400 21px ${FONT_SANS}`,C.body,29,'center')+34;
    cursor=wrap(hidden.mountainsWater||'',CX,cursor,1090,`400 21px ${FONT_SANS}`,C.body,29,'center')+65;
    text('Market',CX,cursor+55,`normal 58px ${FONT_SERIF}`,C.cream,'center');cursor+=79;
    cursor=wrap(hidden.market?.body||'',CX,cursor+25,1120,`400 21px ${FONT_SANS}`,C.body,29,'center')+30;
    img('market-logo.png',CX-555,cursor,1110,490);cursor+=522;
    cursor=wrap('The name we chose for our market is ta pánta pazári, a Greek phrase that translates to “The Everything Bazaar.” Greek was the primary language spoken throughout the Byzantine Empire, making it a fitting choice for our market’s name. We wanted a name that would reflect the wide variety of goods we offer, ranging from swords and cloaks to food and more.',CX,cursor,1110,`400 21px ${FONT_SANS}`,C.body,29,'center')+70;
    const worksY=cursor;
    line(X,worksY,RIGHT);text('04 / SOURCES',CX,worksY+39,`700 15px ${FONT_SANS}`,C.gold,'center');
    text('Works Cited',CX,worksY+112,`normal 58px ${FONT_SERIF}`,C.cream,'center');
    // Reserve space for a crisp HTML references box attached to the same native scroll plane.
    const height=Math.max(worksY+825,1400);
    return {height,worksY,ops};
  }

  function build(data) {
    // Uses exact same content texture, filters, bend/scroll uniforms and 3D
    // surface lifecycle as the other native crystal pages.
    const documentData=window.BYZANTINE_HISTORICAL_CONTENT_V92 || data?.interior || data;
    const layout=makeDrawer(documentData);
    const scale=Math.min(2,8192/layout.height,5.207883026064844);
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.ceil(W*scale));
    canvas.height=Math.max(1,Math.ceil(layout.height*scale));
    const ctx=canvas.getContext('2d',{alpha:true});
    ctx.scale(scale,scale);ctx.translate(-X,0);
    ctx.textBaseline='alphabetic';
    layout.ops.forEach(draw=>draw(ctx));
    ensureWorks(documentData);
    // Keep a short blank tail in the GPU canvas, but make the native scroll
    // controller travel through the full natural-height citations HTML.
    // Increasing the GPU canvas itself would unnecessarily reduce text clarity.
    // Include the footer below the citations in the native scroll extent;
    // absolutely positioned children are not counted by getBoundingClientRect.
    const worksHeight = works ? Math.ceil(works.getBoundingClientRect().height) + 29 + 30 : 0;
    window.__BYZ_HISTORY_LAYOUT_V133__={
      height:layout.height,worksY:layout.worksY,worksHeight,
      worksTopOffset:150,worksBottomPadding:160
    };
    return {canvas,height:layout.height,hero:null,carousel:null,progress:null,liveLink:null,next:null};
  }
  window.__BYZ_BUILD_HISTORY_NATIVE_V133__=build;

  let works, scroller;
  function ensureWorks(data){
    if(works || !document.body)return;
    works=document.createElement('div');
    works.id='byz-history-works-v133';
    works.setAttribute('aria-label','Historical Connection Works Cited');
    Object.assign(works.style,{
      position:'fixed',zIndex:'1500',left:'50%',top:'-9999px',
      width:'min(1120px, calc(100vw - 44px))',transform:'translateX(-50%)',
      background:'#131116',border:'1px solid #756657',outline:'1px solid #302a2d',outlineOffset:'-9px',
      padding:'28px 36px',boxSizing:'border-box',maxHeight:'none',overflowY:'visible',
      color:'#f1eeec',font:'15px/1.65 Manrope, Arial, sans-serif',
      visibility:'hidden',pointerEvents:'none'
    });
    const p=document.createElement('p');p.textContent='Each source below opens in a new tab.';
    p.style.textAlign='center';p.style.margin='0 0 24px';p.style.lineHeight='2';

    // MLA Works Cited: 12pt Times New Roman, true double spacing,
    // an unnumbered list, and a 0.5-inch hanging indent on every citation.
    // Container titles stay italicized, URLs show without protocols or underlines.
    const list=document.createElement('div');
    list.setAttribute('role','list');
    list.setAttribute('aria-label','MLA Works Cited references');
    Object.assign(list.style,{
      padding:'0',margin:'0',
      font:'400 16px/2 "Times New Roman", Times, serif',
      lineHeight:'2',
      overflowWrap:'anywhere',textAlign:'left'
    });
    (data.worksCited||[]).forEach(html=>{
      const entry=document.createElement('div');
      entry.setAttribute('role','listitem');
      entry.innerHTML=html;
      Object.assign(entry.style,{
        display:'block',width:'100%',boxSizing:'border-box',
        paddingLeft:'0.5in',textIndent:'-0.5in',
        margin:'0',lineHeight:'2',
        whiteSpace:'normal',overflowWrap:'anywhere',textAlign:'left'
      });
      entry.querySelectorAll('a').forEach(a=>{
        a.style.color='#f1c68b';a.style.textDecoration='none';a.style.textDecorationLine='none';
        a.target='_blank';a.rel='noopener noreferrer';
      });
      list.appendChild(entry);
    });

    // Footer sits BELOW the dark Works Cited panel, not inside its contents.
    // The parent travels with the existing native Aengel scroll position.
    const footer=document.createElement('div');
    footer.className='byz-h-works-footer-v137';
    footer.textContent='TA PÁNTA PAZÁRI  /  THE EVERYTHING BAZAAR';
    Object.assign(footer.style,{
      position:'absolute',top:'calc(100% + 29px)',
      left:'0',width:'100%',textAlign:'center',
      color:'#f8f5f1',font:'500 13px/1.5 Manrope, Arial, sans-serif',
      letterSpacing:'.14em',
      textShadow:'0 2px 5px rgba(0,0,0,.88), 0 0 12px rgba(0,0,0,.58)',
      pointerEvents:'none',whiteSpace:'normal'
    });
    works.append(p,list,footer);document.body.appendChild(works);
    // Wheel and touch input bubble to Aengel's native scroll controller.
  }
  window.__BYZ_HISTORY_WORKS_TICK_V133__=(visible,rect)=>{
    if(!works)return;
    // V139: Projected from the native Works Cited heading, not offset by
    // 150 fixed CSS pixels. The heading and HTML citation box now remain
    // adjacent at any screen height / browser zoom.
    const panelTop=Number.isFinite(rect?.boxTop)?rect.boxTop:null;
    const panelHeight=window.__BYZ_HISTORY_LAYOUT_V133__?.worksHeight || 0;
    const show=visible&&Number.isFinite(panelTop)&&panelTop<innerHeight+40&&panelTop+panelHeight>-60;
    if(!show){works.style.visibility='hidden';works.style.pointerEvents='none';return;}
    works.style.top=`${panelTop}px`;
    works.style.visibility='visible';works.style.pointerEvents='auto';
    works.style.opacity=String(Math.max(0,Math.min(1,rect.opacity??1)));
  };
})();
