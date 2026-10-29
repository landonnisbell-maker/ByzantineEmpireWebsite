/* V44 — Native interior hero-media map. No HTML overlay or alternate page. */
(function(){
  'use strict';
  if(window.__BYZ_MAP_V44__) return;
  const BASE='/ByzantineEmpireWebsite/about-map/';
  const canvas=document.createElement('canvas');
  canvas.width=1600;canvas.height=900;
  const ctx=canvas.getContext('2d',{alpha:false});
  const map=new Image(),pulse=new Image();
  map.src=BASE+'Byzantine-Empire.webp';
  pulse.src=BASE+'empire-pulse.png';
  let zoom=1.0,px=0,py=0,active=false;
  const pointers=new Map();let pinch=null;
  let isMapReady=false,isMaskReady=false,texture=null,lastFrame=0;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const cap=()=>{px=clamp(px,-(zoom-1)*canvas.width/2,(zoom-1)*canvas.width/2);py=clamp(py,-(zoom-1)*canvas.height/2,(zoom-1)*canvas.height/2);};
  function draw(time){
    ctx.fillStyle='#f6f0e5';ctx.fillRect(0,0,1600,900);
    if(isMapReady){
      ctx.save();ctx.translate(800+px,450+py);ctx.scale(zoom,zoom);
      ctx.drawImage(map,-800,-450,1600,900);
      if(isMaskReady){
        ctx.globalCompositeOperation='screen';
        ctx.globalAlpha=.24+.14*Math.sin(time*.00145);
        ctx.drawImage(pulse,-800,-450,1600,900);
      }
      ctx.restore();
      // Zoom controls stay fixed inside the original media slot as the map pans.
      for(const [glyph,x] of [['−',1370],['+',1436],['↺',1502]]){
        ctx.fillStyle='rgba(23,16,45,.82)';
        ctx.fillRect(x,24,54,54);
        ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;ctx.strokeRect(x,24,54,54);
        ctx.font='bold 34px system-ui, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillStyle='#ffffff';ctx.fillText(glyph,x+27,48);
      }
    }
    if(texture)texture.needsUpdate=true;
  }
  const onLoad=()=>{isMapReady=map.complete&&map.naturalWidth>0;isMaskReady=pulse.complete&&pulse.naturalWidth>0;draw(performance.now())};
  map.onload=onLoad;pulse.onload=onLoad;map.onerror=onLoad;pulse.onerror=onLoad;
  draw(0);
  function animate(now){
    if(active && now-lastFrame>85){lastFrame=now;draw(now)}
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  const api={
    canvas,
    attachTexture(t){texture=t;draw(performance.now())},
    setActive(v){active=!!v;if(active)draw(performance.now());else{pointers.clear();pinch=null}},
    reset(){zoom=1;px=0;py=0;cap();draw(performance.now())},
    start(id,x,y){
      const cx=x*canvas.width,cy=y*canvas.height;
      if(cy>=24&&cy<=78&&cx>=1370&&cx<=1556){
        if(cx<1432)zoom=clamp(zoom-.12,1,1.55);
        else if(cx<1498)zoom=clamp(zoom+.12,1,1.55);
        else{zoom=1;px=0;py=0}
        cap();draw(performance.now());return true;
      }
      pointers.set(id,{x,y});
      if(pointers.size===2){let [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),zoom}}
      return true;
    },
    move(id,x,y){
      const old=pointers.get(id);if(!old)return false;
      pointers.set(id,{x,y});
      if(pointers.size>=2&&pinch?.distance){
        let [a,b]=[...pointers.values()];
        zoom=clamp(pinch.zoom*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance,1,1.55);
      }else{px+=(x-old.x)*canvas.width;py+=(y-old.y)*canvas.height}
      cap();draw(performance.now());return true;
    },
    end(id){pointers.delete(id);if(pointers.size<2)pinch=null;return true},
    get dragging(){return pointers.size>0},
    wheel(d){zoom=clamp(zoom+(d<0?.075:-.075),1,1.55);cap();draw(performance.now())},
    get state(){return{zoom,x:px,y:py,active,mapReady:isMapReady}}
  };
  window.__BYZ_MAP_V44__=api;
})();
