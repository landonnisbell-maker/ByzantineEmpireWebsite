/* PURPLE & PREMIUM — LIVING GOLD V4.6 / ORIGINAL UNLIMITED SEALS — TEXT SAFE
 * Independent WebGL2 renderer. Does not import or modify AENGEL's WebGPU app.
 * No network requests, no third-party scripts; procedural gilding drawn once to an ornament texture.
 */
(() => {
  'use strict';
  const canvas = document.querySelector('#gilded-grid');
  const status = document.querySelector('#material-status');
  const fpsLabel = document.querySelector('#performance-readout');
  const setting = document.querySelector('#material-quality');
  const distortionSelect = document.querySelector('#material-distortion');
  const toggle = document.querySelector('#toggle-effect');
  const note = document.querySelector('#standalone-note');
  const hint = document.querySelector('#gilded-hint');
  const lowMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowCore = (navigator.hardwareConcurrency || 8) <= 4;
  const mobile = window.matchMedia('(pointer: coarse)').matches;
  const support = { reducedMotion: lowMotion, lowCore, mobile };
  const profiles = {
    high: { scale: .78, simHeight: 360, fps: 60, bloom: .65, mode: 2 },
    balanced: { scale: .58, simHeight: 244, fps: 45, bloom: .50, mode: 1 },
    lite: { scale: .42, simHeight: 152, fps: 30, bloom: .28, mode: 0 }
  };
  let quality = (mobile || lowCore) ? 'lite' : 'balanced';
  let active = !lowMotion;
  let distortionPreset = 'extreme';
  let cursorMotion = 0;
  let recentPointerTime = 0;
  let pointerDirection = {x:1,y:0};
  let ready = false;
  let gl = null;
  let raf = 0;
  let last = 0, elapsed = 0, frames = 0, fpsStart = performance.now();
  let vw = 1, vh = 1, sw = 1, sh = 1, dw = 1, dh = 1, bw = 1, bh = 1;
  let state = null, goldPattern = null, output = null, glow = null;
  let programs = {}, quad = null;
  let pointer = { x:-4, y:-4, px:-4, py:-4, dx:0, dy:0, down:false, active:false, last:0 };
  // Clicks live for their natural 3 seconds. Original v4.4 seal geometry executes
  // for EVERY active click via a growable floating-point event texture.
  // There is no 3-slot limit or Canvas imitation.
  let clicks = [];
  let clickTexture = null;
  let clickCapacity = 0;
  let clickTextureWidth = 1;
  let clickTextureHeight = 1;
  let maxTextureSize = 0;
  let localError=null;
  let impulse = 0;
  let pointerEvents = 0;
  // Normalized device-space rectangles: title, button, hint, blueprint and merchant ticket.
  // Card masks attenuate the fluid outside the cards with a wide feather.
  const protectedAreas = new Float32Array(20);

  const setStatus = s => { if (status) status.textContent = s; };
  const clamp = (v,a,b) => Math.min(b,Math.max(a,v));
  const random = (() => {let a=370711; return () => {a^=a<<13;a^=a>>>17;a^=a<<5;return (a>>>0)/4294967296;};})();

  // Keep an elaborate, continuous network, not independent stamped medallions.
  // This white-on-transparent texture provides microscopic gilding contours;
  // the actual visibility, motion and sheen are calculated by the GPU.
  function makePattern(){
    const el=document.createElement('canvas'); const W=2048,H=1152;
    el.width=W;el.height=H; const c=el.getContext('2d',{alpha:true});
    c.strokeStyle='rgba(255,255,255,.75)'; c.fillStyle='rgba(255,255,255,.7)';
    const S=114;
    function line(x1,y1,x2,y2){ c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke(); }
    function arc(cx,cy,r,a,b){c.beginPath();c.arc(cx,cy,r,a,b);c.stroke();}
    function star(x,y,r,n,rot=0){c.beginPath();for(let k=0;k<n*2;k++){const rr=k%2?r*.59:r;const a=rot+k*Math.PI/n;c[k?'lineTo':'moveTo'](x+rr*Math.cos(a),y+rr*Math.sin(a));}c.closePath();c.stroke();}
    c.lineCap='round';c.lineJoin='round';
    // Continuous curving silk-woven tracery, tracing across the entire plane.
    for(let yy=-S;yy<H+S;yy+=S){
      const parity=Math.round(yy/S)%2; c.lineWidth=.9;
      c.beginPath();c.moveTo(-20,yy);
      for(let xx=0;xx<W+S;xx+=S){ const off=parity?-S*.32:S*.32;
        c.bezierCurveTo(xx+S*.22, yy+off, xx+S*.64,yy-off,xx+S,yy);
      } c.stroke();
      c.lineWidth=.48; c.globalAlpha=.55; c.beginPath();c.moveTo(-20,yy+6);
      for(let xx=0;xx<W+S;xx+=S){const off=parity?-S*.32:S*.32;c.bezierCurveTo(xx+S*.22,yy+6+off,xx+S*.64,yy+6-off,xx+S,yy+6);}c.stroke();c.globalAlpha=1;
      // A run of vine-leaves along the horizontal flow, alternating sides.
      for(let xx=25;xx<W+S;xx+=38){ const y=yy+Math.sin(xx*.042+yy*.014)*13;
        c.lineWidth=.83;c.beginPath();c.moveTo(xx,y);c.quadraticCurveTo(xx+3,y-14,xx+17,y-20);c.stroke();
        c.beginPath();c.moveTo(xx+16,y-20);c.quadraticCurveTo(xx+10,y-8,xx+3,y-12);c.quadraticCurveTo(xx+6,y-23,xx+16,y-20);c.stroke();
        c.beginPath();c.moveTo(xx+13,y-14);c.lineTo(xx+5,y-16);c.stroke();
      }
    }
    // Secondary continuous ogee arches and fine braided crossings.
    c.globalAlpha=.68;
    for(let xx=-S;xx<W+S;xx+=S){
      c.lineWidth=.72;c.beginPath();c.moveTo(xx,-50);
      for(let yy=-S;yy<H+S;yy+=S){
        c.bezierCurveTo(xx+25,yy+S*.25,xx-25,yy+S*.8,xx,yy+S);
      }c.stroke();
    }
    c.globalAlpha=1;
    for(let yy=0;yy<H+S;yy+=S){for(let xx=0;xx<W+S;xx+=S){
      const h=Math.sin(xx*13.7+yy*34.1);
      c.globalAlpha=h>-.45?.94:.42;
      c.save();c.translate(xx,yy);c.rotate((Math.round(xx/S)+Math.round(yy/S))%2?Math.PI/4:0);
      c.lineWidth=.9;
      c.strokeRect(-26,-26,52,52);c.lineWidth=.53;c.strokeRect(-31,-31,62,62);
      for(let k=0;k<4;k++){let a=k*Math.PI/2;
        c.beginPath();c.moveTo(Math.cos(a)*11,Math.sin(a)*11);
        c.quadraticCurveTo(Math.cos(a+.5)*24,Math.sin(a+.5)*24,Math.cos(a+Math.PI/4)*29,Math.sin(a+Math.PI/4)*29);c.stroke();}
      c.rotate(Math.PI/8);c.lineWidth=.9;star(0,0,15,8,.03);
      arc(0,0,20,0,Math.PI*2);arc(0,0,3,0,Math.PI*2);
      for(let k=0;k<8;k++){let a=k*Math.PI/4;line(23*Math.cos(a),23*Math.sin(a),27*Math.cos(a),27*Math.sin(a));}
      c.restore();c.globalAlpha=1;
    }}
    // Interlacing imperial border ribbons / Greek-key meanders across irregular bands.
    for(let band=0;band<4;band++){
      const y=190+band*268; c.globalAlpha=.35;c.lineWidth=1.1;
      c.beginPath();c.moveTo(0,y);for(let xx=0;xx<W+36;xx+=36){c.lineTo(xx+8,y);c.lineTo(xx+8,y+15);c.lineTo(xx+24,y+15);c.lineTo(xx+24,y-15);c.lineTo(xx+35,y-15);c.lineTo(xx+35,y);}c.stroke();
      c.globalAlpha=1;
    }
    // Tiny crosswork and tiled tesserae are continuous details, not isolated clip art.
    for(let i=0;i<490;i++){
      const x=random()*W, y=random()*H;const r=1+random()*2.3;
      c.globalAlpha=.26+random()*.4;c.lineWidth=.6;line(x-r,y,x+r,y);line(x,y-r,x,y+r);
    }
    c.globalAlpha=1;
    return el;
  }

  const vs=`#version 300 es
    in vec2 aPosition; out vec2 vUv;
    void main(){vUv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`;
  const simulate=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 outColor;
uniform sampler2D uState;
uniform vec2 uPointer, uPrevious, uVelocity, uAspect;
uniform float uDelta, uTime, uPressed, uActive;
float sat(float x){return clamp(x,0.,1.);}
float segDistance(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/max(dot(v,v),.0000001),0.,1.));}
void main(){
 vec2 uv=vUv;
 vec4 stored=texture(uState,uv);
 vec2 flow=(stored.rg-.5)*2.;
 float ink=stored.b;
 // Semi-Lagrangian advection of the gold/violet dye field (one feedback pass).
 vec2 back=clamp(uv-flow*uDelta*.25,vec2(.001),vec2(.999));
 vec4 moved=texture(uState,back);
 flow=(moved.rg-.5)*2.;ink=moved.b;
 float heat=moved.a;
 vec2 p=uv*uAspect, cur=uPointer*uAspect, old=uPrevious*uAspect;
 float d=segDistance(p,old,cur);
 float distMouse=length(p-cur);
 float brush=exp(-d*d/(.0085+uPressed*.004))*uActive;
 float hotBrush=exp(-d*d/.0020)*uActive;
 float speed=sat(length(uVelocity*uAspect)*8.);
 // Local curl twists the ribbons without imposing a circular bubble boundary.
 vec2 curl=vec2(sin(uv.y*23.+uTime*.85)+sin(uv.x*19.-uTime*.47),
                -cos(uv.x*17.-uTime*.68)+sin(uv.y*21.+uTime*.75));
 float twist=exp(-distMouse*distMouse/.065)*uActive;
 flow+=uVelocity*brush*(5.3+3.2*uPressed);
 flow+=vec2(-(uv.y-uPointer.y),uv.x-uPointer.x)*twist*uDelta*(.29+speed*.55);
 flow+=curl*ink*uDelta*.17;
 flow*=exp(-uDelta*1.85);
 flow=clamp(flow,vec2(-.95),vec2(.95));
 ink=sat(ink*exp(-uDelta*.96)+brush*(.24+speed*.16+uPressed*.08));
 heat=sat(heat*exp(-uDelta*1.65)+hotBrush*(.38+speed*.25+uPressed*.30));
 outColor=vec4(flow*.5+.5,ink,heat);
}`;
  const scene=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uState;
uniform sampler2D uOrnament;
uniform vec2 uResolution;
uniform vec2 uSimTexel;
uniform vec2 uPointer;
uniform vec2 uHoverPos;
uniform float uHoverAge;
uniform float uTime;
uniform highp sampler2D uClickData;
uniform int uClickCount;
uniform int uClickDataWidth;
uniform float uMode;

const float PI=3.14159265359;
float sat(float x){return clamp(x,0.0,1.0);}
float hash11(float x){return fract(sin(x*127.17)*43758.5453);}
float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 float a=hash21(i),b=hash21(i+vec2(1,0));
 float c=hash21(i+vec2(0,1)),d=hash21(i+vec2(1,1));
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float a=0.,w=.5;for(int i=0;i<4;i++){
 a+=w*noise2(p);p=mat2(1.61,-1.14,1.14,1.61)*p+vec2(7.8,1.4);w*=.5;}
 return a;}

vec2 spin(vec2 p,float a){float s=sin(a),c=cos(a);return vec2(c*p.x-s*p.y,s*p.x+c*p.y);}
float edge(float x,float w){return 1.0-smoothstep(0.0,w,abs(x));}
float ring(float r,float center,float width){return exp(-pow((r-center)/width,2.0));}
float gridline(vec2 pixel){vec2 grid=abs(fract(pixel/48.0)-0.5);float d=min(grid.x,grid.y);return 1.0-smoothstep(0.010,0.030,d);}
float distSeg(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-(a+clamp(dot(p-a,v)/max(dot(v,v),1e-5),0.,1.))*v);}
float sealDrawing(vec2 p,float radius){
  float r=length(p);float a=atan(p.y,p.x);
  float ornamental=ring(r,radius*0.94,0.0023)+ring(r,radius*0.83,0.0014)*.68+ring(r,radius*.33,.0021);
  float petal=radius*(.59+.14*cos(8.*a)+.06*cos(16.*a));
  ornamental+=ring(r,petal,.0022)*1.6;
  float rays=pow(abs(cos(a*8.)),38.)*smoothstep(radius*.45,radius*.55,r)*(1.-smoothstep(radius*.72,radius*.79,r));
  ornamental+=rays*.9;
  float center=ring(r,.015,.002)+ring(r,.025,.0015);
  return sat(ornamental+center);
}
float tessera(vec2 uv,vec2 center,float bloom,float time){
  vec2 tess=uv*uResolution/38.;vec2 cell=floor(tess);
  vec2 randoms=vec2(hash21(cell),hash21(cell+51.17));
  float lag=clamp(bloom*1.35-(randoms.x*.35),0.,1.);
  lag=lag*lag*(3.-2.*lag);
  vec2 xy=tess-cell-.5;
  vec2 start=(randoms-.5)*4.*(1.-lag);
  float twist=(randoms.y-.5)*(1.-lag)*2.3;
  vec2 q=spin(xy-start,twist);
  float sz=(.04+.39*lag);
  float d=max(abs(q.x),abs(q.y))-sz;
  float fill=1.-smoothstep(-.04,.07,d);
  float engraved=edge(d,.035);
  float diamond=ring(length(q),.22*lag,.03)*.3;
  float intermittent=.72+.28*sin(time*3.+randoms.x*10.);
  float close=sat(1.-length((uv-center)*vec2(uResolution.x/uResolution.y,1.))/.21);
  return (fill*.43+engraved*.55+diamond)*lag*close*intermittent;
}
float sparks(vec2 uv, float ink, float time){
  vec2 xy=uv*uResolution/25.;vec2 cell=floor(xy),f=fract(xy);
  float n=hash21(cell), n2=hash21(cell+42.3);
  vec2 focus=vec2(n,n2);
  focus.x+=.12*sin(time*3.+n*32.);
  focus.y+=.12*cos(time*2.+n2*22.);
  float dist=length((f-focus));
  float core=1.-smoothstep(.015,.09,dist);
  float star=(1.-smoothstep(.0,.020,abs(f.x-focus.x)))*(1.-smoothstep(.0,.22,abs(f.y-focus.y)))
   +(1.-smoothstep(.0,.020,abs(f.y-focus.y)))*(1.-smoothstep(.0,.22,abs(f.x-focus.x)));
  float twinkle=pow(max(0.,sin(time*(3.+n*5.)+n*60.)),6.);
  return (core+star*.22)*twinkle*ink*smoothstep(.55,.82,n);
}
void main(){
  vec2 uv=vUv;
  float aspect=uResolution.x/uResolution.y;
  vec2 asp=vec2(aspect,1.);
  vec4 st=texture(uState,uv);
  vec2 velocity=(st.rg-.5)*2.;
  float ink=pow(sat(st.b),.77);
  float heat=pow(sat(st.a),.73);

  // Surface gradient used as a bent-metal normal and for elastic deformation of the grid.
  float nx=texture(uState,uv+vec2(uSimTexel.x,0)).b-texture(uState,uv-vec2(uSimTexel.x,0)).b;
  float ny=texture(uState,uv+vec2(0,uSimTexel.y)).b-texture(uState,uv-vec2(0,uSimTexel.y)).b;
  vec2 grad=vec2(nx,ny);
  vec2 shift=(velocity*.044-grad*.018)*smoothstep(.015,.12,ink);
  vec2 warped=uv-shift;

  // The EXACT original V4.4 analytical seal + expanding ripple formulas,
  // evaluated for every still-live click. New clicks do not displace old ones.
  float shock=0.,seal=0.,fragments=0.,sealHeat=0.;
  for(int i=0;i<uClickCount;i++){
    vec4 eventData=texelFetch(uClickData,ivec2(i%uClickDataWidth,i/uClickDataWidth),0);
    float age=eventData.z;float live=eventData.w;
    if(live>.001){
      vec2 cp=eventData.xy;
      vec2 delta=(uv-cp)*asp;
      float r=length(delta);float a=atan(delta.y,delta.x);
      float leading=age*.30;
      float wave=ring(r,leading,.012+age*.009)*live;
      shock+=wave;
      warped+=normalize(delta+vec2(.0001))*.010*wave;
      float assembly=smoothstep(.04,.64,age)*(1.-smoothstep(1.3,2.8,age));
      float birth=smoothstep(.02,.6,age);
      seal+=sealDrawing(delta,.13)*assembly*live*2.3;
      float inside=1.-smoothstep(.13,.16,r);
      float rings=ring(r,.052+age*.025,.008)*inside*birth;
      seal+=rings*live*.5;
      float disperse=smoothstep(1.0,1.8,age)*(1.-smoothstep(2.3,3.,age));
      float shards=pow(max(0.,cos(a*44.+sin(r*160.-uTime*9.))),46.);
      float scatter=ring(r,.13+max(0.,age-1.25)*.09,.022)*shards;
      fragments+=scatter*disperse*live*1.8;
      sealHeat+=inside*assembly*live*.2;
    }
  }

  // ARCANE SILK V4.4: move rich colored silk THROUGH the existing ink/velocity field.
  // The ink confines this material to cursor trails: no always-on wallpaper.
  vec2 world=warped*asp;
  float speed=sat(length(velocity)*10.+heat*.65);
  float dye=pow(sat(ink),.70);
  vec2 local=world+vec2(-uTime*.056,uTime*.032)+velocity*.34;
  float turbulence=fbm(local*7.1+vec2(0.,uTime*.095));
  float medium=fbm(local*15.5-vec2(uTime*.07,uTime*.035));
  float tiny=fbm(local*31.5+velocity*.8);
  // Oblique, folded silk strands: no radially bounded lens, no soap-bubble ring.
  float streamAxis=world.x*.84-world.y*.58;
  float streamCross=world.x*.41+world.y*.91;
  float phase=streamAxis*18.5 + 3.9*(turbulence-.5)
              +sin(streamCross*7.5+uTime*.55)*1.9
              +sin(streamCross*16.+uTime*.81+medium*3.)*.78;
  phase+=length(velocity)*sin(streamCross*22.-uTime*1.2)*2.;
  float goldContours=pow(1.-abs(sin(phase)),10.);
  float twinContours=pow(1.-abs(sin(phase*1.83+medium*4.5)),18.);
  float brightThread=pow(max(0.,sin(phase*4.3+tiny*2.8)),23.);
  float serpentine=.5+.5*sin(phase*1.17+medium*2.3);
  float purpleRibbon=pow(max(0.,sin(phase*.47+medium*.83)),.78);
  float flowingSilk=dye*(.24+.76*purpleRibbon);
  float goldSeam=dye*(goldContours*.88+twinContours*.36+brightThread*.19);
  float line=texture(uOrnament,warped+velocity*.022).a;
  float flecks=line*dye*(.14+.27*speed);
  float etchRim=(abs(dFdx(line))+abs(dFdy(line)))*dye*.26;
  float lively=sin(dot(warped,vec2(70.,-43.))+uTime*3.+medium*9.);
  float glint=pow(max(0.,lively),30.)*goldSeam;
  // Idle pointer deliberately never creates a seal or mosaic. Clicks are handled separately.
  float mosaic=0.;
  // Liquid-gold specular lighting inside the purple body.
  float specPhase=sin(phase*2.2+tiny*5.2-uTime*1.1);
  float specular=pow(max(0.,specPhase),17.)*dye;
  float goldAmount=sat(goldSeam+flecks*.55+etchRim*.4+mosaic*.91
                        +seal*.77+fragments*.74+shock*.45);
  vec3 plum=vec3(.075,.014,.115);
  vec3 violet=vec3(.47,.075,.57);
  vec3 lilac=vec3(.78,.29,.84);
  vec3 ruby=vec3(.34,.025,.15);
  vec3 champagne=vec3(1.0,.73,.33);
  vec3 goldWhite=vec3(1.42,1.08,.67);
  // Rich internal marbling: fuchsia / midnight violet / amber / blue-green refraction.
  float colorPhase=sin(phase*.79+medium*7.2-tiny*1.6);
  vec3 silk=mix(plum,violet,sat(serpentine*.85+.10));
  silk=mix(silk,lilac,sat(colorPhase*.5+.5)*(.21+.21*speed));
  silk=mix(silk,ruby,sat(-colorPhase*.5+.5)*.31);
  float irid=sat(sin(phase*2.65+medium*5.5+uTime*.4)*.5+.5);
  silk+=mix(vec3(.10,.13,.27),vec3(.19,.035,.10),irid)*(.38+.35*speed);
  vec3 alloy=mix(vec3(.33,.105,.018),champagne,
                 sat(goldAmount*.9+goldContours*.25));
  alloy=mix(alloy,goldWhite,sat(goldAmount*.75+specular*.70));
  float flare=(glint*.85+specular*.54+heat*.17)*dye;
  vec3 surface=silk*flowingSilk*(1.12+.42*speed)
    +alloy*goldAmount*(.68+.38*heat)
    +goldWhite*(flare*.49+mosaic*.32+sealHeat*.25);
  // Micro-sparks are additive detail, not the entire material.
  if(uMode>1.5) surface+=goldWhite*sparks(uv,ink+shock+seal*.1,uTime)*.50;
  // Widen/smooth the opacity: visible silk volume plus ultra-thin gilded ridges.
  float alpha=sat(flowingSilk*.77 + goldAmount*.44 + heat*.14
                  +seal*.28+fragments*.34+shock*.17);
  alpha*=smoothstep(.009,.13,ink+heat*.20+seal*.21+shock*.10);
  surface*=alpha;

  outColor=vec4(surface,alpha);
}`;
  const blur=`#version 300 es
precision highp float;
in vec2 vUv;out vec4 outColor;
uniform sampler2D uScene;
uniform vec2 uTexel;
void main(){
 vec4 c=texture(uScene,vUv)*.20;
 for(int i=1;i<=5;i++){
  float w=.14*exp(-float(i*i)*.17);
  vec2 dx=vec2(float(i)*uTexel.x*3.0,0.),dy=vec2(0.,float(i)*uTexel.y*3.0);
  c+=texture(uScene,vUv+dx)*w;
  c+=texture(uScene,vUv-dx)*w;
  c+=texture(uScene,vUv+dy)*w;
  c+=texture(uScene,vUv-dy)*w;
 }
 outColor=c;
}`;
  // V4.3 — IMPERIAL VEIL: Gaussian-softened silk refraction + RGB dispersion.
  // Reuses V4.2's scene, existing bloom, and GPU motion-field render targets.
  // No additional shader passes and no additional source textures.
  const composite=`#version 300 es
precision highp float;
in vec2 vUv;out vec4 outColor;
uniform sampler2D uScene;
uniform sampler2D uGlow;
uniform sampler2D uState;
uniform vec2 uResolution;
uniform float uBloomStrength;
uniform float uMode;
uniform float uTime;
uniform float uDistortion;
uniform float uCursorMotion;
uniform vec2 uPointer;
uniform vec2 uPointerDirection;
uniform vec4 uProtectRects[5];
float sat(float x){return clamp(x,0.,1.);}
vec2 safe(vec2 p){return clamp(p,vec2(.002),vec2(.998));}
float shield(vec2 uv,vec4 r,vec2 feather){
  vec2 a=smoothstep(r.xy-feather,r.xy+feather,uv);
  vec2 b=1.-smoothstep(r.zw-feather,r.zw+feather,uv);
  return sat(a.x*a.y*b.x*b.y);
}
void main(){
  vec2 uv=vUv;
  vec4 state=texture(uState,uv);
  vec2 flow=(state.rg-.5)*2.;
  float ink=sat(state.b),hot=sat(state.a);
  float flowing=length(flow);
  vec2 aspect=vec2(uResolution.x/uResolution.y,1.);
  vec2 delta=(uv-uPointer)*aspect;
  // The proximity contribution drives strength, not circular refraction.
  float nearMouse=exp(-dot(delta,delta)/.029);
  float motion=sat(flowing*4.0+hot*.60+nearMouse*uCursorMotion*.70);
  float energy=sat(ink*.72+hot*.42);
  float influence=smoothstep(.025,.69,energy*(.35+.85*motion)+nearMouse*uCursorMotion*.20);
  float amount=influence*clamp(uDistortion,0.,2.);
  vec4 original=texture(uScene,uv);
  vec4 originalGlow=texture(uGlow,uv);
  vec3 combined=original.rgb+originalGlow.rgb*(1.50*uBloomStrength);
  float alpha=sat(original.a+originalGlow.a*.36*uBloomStrength);

  if(amount>.002){
    vec2 dir=mix(uPointerDirection,flow/(flowing+.0001),sat(flowing*30.));
    dir/=max(length(dir),.0001);
    vec2 side=vec2(-dir.y,dir.x);
    // Ribbon shear: folded currents and direction-biased displacement.
    // Removes the harsh radial lens/tunnel geometry found in V4.2.
    float fold1=sin(dot(uv,vec2(29.,-17.))+uTime*1.27+flow.x*12.);
    float fold2=sin(dot(uv,vec2(-21.,31.))-uTime*.91+flow.y*14.);
    vec2 bend=flow*.011+side*fold1*.0055+dir*fold2*.0038;
    vec2 source=safe(uv-bend*amount);
    // Directional Gaussian blur sampled in the SAME compositor (no new targets).
    // The fast-moving material diffuses smoothly rather than forming a bubble.
    float sigma=(7.0+12.*motion+8.*uCursorMotion)*amount;
    vec2 longitudinal=dir*sigma/uResolution;
    vec2 transverse=side*(2.4+5.*motion)*amount/uResolution;
    vec4 blurred=vec4(0.);
    float total=0.;
    for(int k=-4;k<=4;k++){
      float x=float(k);
      float weight=exp(-.5*x*x*.69);
      vec2 warp=longitudinal*x*.59+transverse*sin(x*1.25+uTime*.9)*.51;
      blurred+=texture(uScene,safe(source+warp))*weight;
      total+=weight;
    }
    blurred/=total;
    // On HIGH only, add a wide Gaussian cross for smoother silk-fiber diffusion.
    if(uMode>1.5){
      vec4 across=texture(uScene,source)*.40;
      across+=texture(uScene,safe(source+transverse*1.5))*.24;
      across+=texture(uScene,safe(source-transverse*1.5))*.24;
      across+=texture(uScene,safe(source+transverse*2.7))*.06;
      across+=texture(uScene,safe(source-transverse*2.7))*.06;
      blurred=mix(blurred,across,.22);
    }
    // Chromatic aberration sampled at opposite sides of the CURRENT flowing silk.
    // Warm gold stays predominant; moving folds show a translucent spectral tint.
    float dispersion=(4.5+8.5*motion+4.*uCursorMotion)*amount;
    vec2 prism=(dir*.48+side*.88)*dispersion/uResolution;
    vec4 r=texture(uScene,safe(source+prism));
    vec4 g=texture(uScene,safe(source+side*dispersion*.15/uResolution));
    vec4 b=texture(uScene,safe(source-prism));
    float fringing=sat(abs(r.a-b.a)*2.8+.24);
    vec3 spectrum=vec3(r.r*1.07+b.b*.10, g.g*.91+r.r*.025, b.b*1.18+r.r*.11);
    float rgbMix=sat((.25+.52*fringing)*motion*amount);
    vec3 liquid=mix(blurred.rgb,spectrum,rgbMix);
    // A continuous glow/gaussian mist that remains locked to the moving gold.
    vec4 mist=texture(uGlow,safe(source-longitudinal*.24));
    mist=mix(mist,texture(uGlow,safe(source+transverse*.90)),.35);
    liquid+=mist.rgb*uBloomStrength*(1.30+.58*motion);
    combined=mix(combined,liquid,sat(amount*.91));
    alpha=mix(alpha,sat(blurred.a+mist.a*.25),sat(amount*.76));
  }
  // The original loader stays crisp. Under the CTA only, the silk becomes
  // heavily Gaussian-softened and nearly transparent, fading out smoothly.
  vec2 feather=vec2(35.)/uResolution;
  float titleShield=shield(uv,uProtectRects[0],feather);
  float hintShield=shield(uv,uProtectRects[2],feather)*.65;
  float buttonShield=shield(uv,uProtectRects[1],vec2(63.)/uResolution);
  // Soft exclusion zones on and just outside the card boundaries. The fade
  // prevents luminous swirls from making the illustrations hard to read.
  float blueprintShield=shield(uv,uProtectRects[3],vec2(47.)/uResolution);
  float merchantShield=shield(uv,uProtectRects[4],vec2(47.)/uResolution);
  float cardsShield=max(blueprintShield,merchantShield);
  float minorShield=max(titleShield,hintShield);
  if(minorShield>.001){
    vec2 stepv=vec2(19.)/uResolution;
    vec4 soft=texture(uGlow,uv)*.36;
    soft+=texture(uGlow,safe(uv+vec2(stepv.x,0.)))*.16;
    soft+=texture(uGlow,safe(uv-vec2(stepv.x,0.)))*.16;
    soft+=texture(uGlow,safe(uv+vec2(0.,stepv.y)))*.16;
    soft+=texture(uGlow,safe(uv-vec2(0.,stepv.y)))*.16;
    combined=mix(combined,soft.rgb*.36,minorShield*.91);
    alpha=mix(alpha,sat(soft.a*.17),minorShield*.91);
  }
  if(buttonShield>.001){
    vec2 p=vec2(48.)/uResolution;
    vec4 soft=texture(uGlow,uv)*.28;
    soft+=texture(uGlow,safe(uv+vec2(p.x,0.)))*.12;
    soft+=texture(uGlow,safe(uv-vec2(p.x,0.)))*.12;
    soft+=texture(uGlow,safe(uv+vec2(0.,p.y)))*.12;
    soft+=texture(uGlow,safe(uv-vec2(0.,p.y)))*.12;
    soft+=texture(uGlow,safe(uv+p*.72))*.12;
    soft+=texture(uGlow,safe(uv-p*.72))*.12;
    combined=mix(combined,soft.rgb*.07,buttonShield*.99);
    alpha=mix(alpha,sat(soft.a*.045),buttonShield*.99);
  }
  if(cardsShield>.001){
    // Apply a deep, Gaussian-softened shadow to the PRISMATIC LIQUID only;
    // DOM cards, borders and lettering render in a separate sharp layer.
    vec2 spread=vec2(34.)/uResolution;
    vec4 soft=texture(uGlow,uv)*.36;
    soft+=texture(uGlow,safe(uv+vec2(spread.x,0.)))*.12;
    soft+=texture(uGlow,safe(uv-vec2(spread.x,0.)))*.12;
    soft+=texture(uGlow,safe(uv+vec2(0.,spread.y)))*.12;
    soft+=texture(uGlow,safe(uv-vec2(0.,spread.y)))*.12;
    soft+=texture(uGlow,safe(uv+spread*.7))*.08;
    soft+=texture(uGlow,safe(uv-spread*.7))*.08;
    // Card interiors are nearly empty of magic; outer feather remains gentle.
    float fade=smoothstep(.03,.93,cardsShield);
    combined=mix(combined,soft.rgb*.045,fade*.997);
    alpha=mix(alpha,sat(soft.a*.02),fade*.997);
  }
  vec3 mapped=vec3(1.)-exp(-max(combined,vec3(0.))*1.27);
  outColor=vec4(mapped,sat(alpha));
}`;
  function shader(type,src){const o=gl.createShader(type);gl.shaderSource(o,src);gl.compileShader(o);
    if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw Error('Shader: '+gl.getShaderInfoLog(o));return o;}
  function program(source){const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,vs));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,source));gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error('Link: '+gl.getProgramInfoLog(p));
    return { id:p, attrib:gl.getAttribLocation(p,'aPosition'), uniform:{} };}
  function uni(p,name){return p.uniform[name] ??= gl.getUniformLocation(p.id,name);}
  function texture(w,h,image=null){const tx=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tx);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
    if(image)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
    else gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
    return tx;
  }
  function target(w,h){let t=texture(w,h);let f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Framebuffer incomplete');return {texture:t,framebuffer:f,width:w,height:h};}
  function disposeTarget(t){if(t){gl.deleteFramebuffer(t.framebuffer);gl.deleteTexture(t.texture);}}
  function ensureClickTexture(required){
    if(!maxTextureSize)maxTextureSize=gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if(clickTexture && required<=clickCapacity)return;
    const minCapacity=Math.max(32,required);
    // Grow the texture capacity, not the number of active seals; every click
    // contributes until its own 3.05-second expiration.
    let targetCapacity=Math.max(32,clickCapacity||32);
    while(targetCapacity<minCapacity)targetCapacity*=2;
    const width=Math.min(targetCapacity,maxTextureSize);
    const height=Math.ceil(targetCapacity/width);
    if(height>maxTextureSize)throw new Error('Hardware texture limit exceeded for click events');
    if(clickTexture)gl.deleteTexture(clickTexture);
    clickTexture=gl.createTexture();
    gl.activeTexture(gl.TEXTURE0+2);
    gl.bindTexture(gl.TEXTURE_2D,clickTexture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    // RGBA32F is core WebGL2 when sampled as a texture (no float FBO needed).
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,width,height,0,gl.RGBA,gl.FLOAT,null);
    clickTextureWidth=width;clickTextureHeight=height;
    clickCapacity=targetCapacity;
  }
  function uploadClicks(){
    clicks=clicks.filter(c=>elapsed-c.t<3.05);
    ensureClickTexture(Math.max(1,clicks.length));
    if(!clicks.length)return;
    const data=new Float32Array(clickTextureWidth*clickTextureHeight*4);
    clicks.forEach((c,i)=>{
      const age=elapsed-c.t;
      const j=i*4;
      data[j]=c.x;data[j+1]=c.y;
      data[j+2]=age;data[j+3]=Math.exp(-age*.40);
    });
    gl.activeTexture(gl.TEXTURE0+2);
    gl.bindTexture(gl.TEXTURE_2D,clickTexture);
    gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,clickTextureWidth,clickTextureHeight,gl.RGBA,gl.FLOAT,data);
  }

  function bind(p,target){gl.useProgram(p.id);gl.bindFramebuffer(gl.FRAMEBUFFER,target?.framebuffer||null);gl.viewport(0,0,target?.width||dw,target?.height||dh);
    gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.enableVertexAttribArray(p.attrib);gl.vertexAttribPointer(p.attrib,2,gl.FLOAT,false,0,0);}
  function sampler(p,name,unit,tx){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tx);gl.uniform1i(uni(p,name),unit);}
  function draw(){gl.drawArrays(gl.TRIANGLES,0,6);}
  function updateProtectedAreas(){
    protectedAreas.fill(0);
    const sel=[
      ['.loader-module__y9w63G__header',27,25,43,27],
      ['[data-testid="loader-enter"]',82,68,82,68],
      ['#gilded-hint',26,17,26,17],
      ['.loader-module__y9w63G__cornerImage',17,17,17,17],
      ['.loader-module__y9w63G__ticketCard',17,17,17,17]
    ];
    sel.forEach(([selector,left,top,right,bottom],i)=>{
      const el=document.querySelector(selector);
      if(!el)return;
      const r=el.getBoundingClientRect();
      if(r.width<1||r.height<1)return;
      const x0=clamp((r.left-left)/Math.max(1,vw),0,1);
      const x1=clamp((r.right+right)/Math.max(1,vw),0,1);
      // WebGL has bottom-left origin; DOM has top-left origin.
      const y0=clamp(1-(r.bottom+bottom)/Math.max(1,vh),0,1);
      const y1=clamp(1-(r.top-top)/Math.max(1,vh),0,1);
      protectedAreas.set([x0,y0,x1,y1],i*4);
    });
  }
  function resize(){
    const dpr=Math.min(devicePixelRatio||1,1.5); vw=window.innerWidth;vh=window.innerHeight;
    updateProtectedAreas();
    const cfg=profiles[quality];
    dw=Math.max(1,Math.round(vw*dpr*cfg.scale));dh=Math.max(1,Math.round(vh*dpr*cfg.scale));
    sw=Math.round(cfg.simHeight*vw/vh);sh=cfg.simHeight;sw=Math.min(sw,830);
    bw=Math.max(1,Math.round(dw*.44));bh=Math.max(1,Math.round(dh*.44));
    canvas.width=dw;canvas.height=dh;
    if(!gl)return;
    if(state){disposeTarget(state[0]);disposeTarget(state[1]);}disposeTarget(output);disposeTarget(glow);
    state=[target(sw,sh),target(sw,sh)];output=target(dw,dh);glow=target(bw,bh);
    for(let i=0;i<2;i++){gl.bindFramebuffer(gl.FRAMEBUFFER,state[i].framebuffer);gl.viewport(0,0,sw,sh);gl.clearColor(.5,.5,0,0);gl.clear(gl.COLOR_BUFFER_BIT);}gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  }
  function init(){
    if(lowMotion){setStatus('MOTION REDUCED — STATIC GRID');return;}
    gl=canvas.getContext('webgl2',{antialias:false,alpha:true,premultipliedAlpha:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
    if(!gl){setStatus('WEBGL2 UNAVAILABLE — STATIC GRID');canvas.style.display='none';return;}
    programs.sim=program(simulate);programs.scene=program(scene);programs.blur=program(blur);programs.composite=program(composite);
    quad=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    goldPattern=texture(1,1,makePattern());resize();ready=true;document.body.classList.add('gpu-grid');setStatus('ARCANE SILK V4.6 // ORIGINAL SEALS');
    if(active)raf=requestAnimationFrame(tick);
  }
  function tick(now){raf=0;if(!active||!ready)return;
    const cfg=profiles[quality];const minFrame=1000/cfg.fps;
    if(now-last<minFrame-.8){raf=requestAnimationFrame(tick);return;}
    const dt=clamp((now-last)/1000||.016,.005,.045);last=now;elapsed+=dt;frames++;
    cursorMotion*=Math.exp(-dt*5.0);
    animateButton();
    if(now-fpsStart>1250){const measured=Math.round(frames*1000/(now-fpsStart));fpsLabel.textContent=measured+' FPS';frames=0;fpsStart=now;}
    const x=pointer.x,y=pointer.y;
    const activePointer=pointer.active&&now-pointer.last<140;
    const prevX=pointer.px,prevY=pointer.py;
    // Simulation uses one dynamic RGBA8 field for dye and velocity, no fluid Jacobi passes.
    let p=programs.sim;bind(p,state[1]);sampler(p,'uState',0,state[0].texture);
    gl.uniform2f(uni(p,'uPointer'),x,y);gl.uniform2f(uni(p,'uPrevious'),prevX,prevY);
    gl.uniform2f(uni(p,'uVelocity'),clamp(pointer.dx,-1,1),clamp(pointer.dy,-1,1));
    gl.uniform2f(uni(p,'uAspect'),vw/vh,1);
    gl.uniform1f(uni(p,'uDelta'),dt);gl.uniform1f(uni(p,'uTime'),elapsed);
    gl.uniform1f(uni(p,'uPressed'),pointer.down?1:0);gl.uniform1f(uni(p,'uActive'),activePointer?1:0);draw();
    [state[0],state[1]]=[state[1],state[0]];
    pointer.px=x;pointer.py=y;pointer.dx*=.22;pointer.dy*=.22;
    // Artistic surface: procedural gilding responds to flow + travelling metallic glints.
    p=programs.scene;bind(p,output);sampler(p,'uState',0,state[0].texture);sampler(p,'uOrnament',1,goldPattern);
    gl.uniform2f(uni(p,'uResolution'),dw,dh);gl.uniform2f(uni(p,'uPointer'),x,y);gl.uniform1f(uni(p,'uTime'),elapsed);
    gl.uniform2f(uni(p,'uSimTexel'),1/sw,1/sh);
    gl.uniform2f(uni(p,'uHoverPos'),x,y);
    gl.uniform1f(uni(p,'uHoverAge'),0);
    gl.uniform1f(uni(p,'uMode'),cfg.mode);
    uploadClicks();
    sampler(p,'uClickData',2,clickTexture);
    gl.uniform1i(uni(p,'uClickCount'),clicks.length);
    gl.uniform1i(uni(p,'uClickDataWidth'),clickTextureWidth);
    gl.uniform1f(uni(p,'uBloomStrength'),cfg.bloom);draw();
    p=programs.blur;bind(p,glow);sampler(p,'uScene',0,output.texture);gl.uniform2f(uni(p,'uTexel'),1/dw,1/dh);draw();
    p=programs.composite;bind(p,null);sampler(p,'uScene',0,output.texture);sampler(p,'uGlow',1,glow.texture);sampler(p,'uState',2,state[0].texture);
    gl.uniform1f(uni(p,'uBloomStrength'),cfg.bloom);gl.uniform2f(uni(p,'uResolution'),dw,dh);gl.uniform1f(uni(p,'uMode'),cfg.mode);gl.uniform1f(uni(p,'uTime'),elapsed);
    gl.uniform4fv(uni(p,'uProtectRects[0]'),protectedAreas);
    gl.uniform1f(uni(p,'uDistortion'),({subtle:.48,cinematic:1.07,extreme:1.65})[distortionPreset]);
    gl.uniform1f(uni(p,'uCursorMotion'),cursorMotion);
    gl.uniform2f(uni(p,'uPointer'),x,y);
    gl.uniform2f(uni(p,'uPointerDirection'),pointerDirection.x,pointerDirection.y);
    gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);draw();gl.disable(gl.BLEND);
    raf=requestAnimationFrame(tick);
  }
  function move(e){const xx=clamp(e.clientX/Math.max(1,vw),0,1),yy=1-clamp(e.clientY/Math.max(1,vh),0,1);
    if(!pointer.active){pointer.px=xx;pointer.py=yy;}
    const previous=pointer.active?pointer:{x:xx,y:yy};
    const d=Math.hypot(xx-previous.x,yy-previous.y);
    const timestamp=performance.now();
    const deltaMs=recentPointerTime?Math.max(8,timestamp-recentPointerTime):16;
    recentPointerTime=timestamp;
    const perSec=d*Math.max(vw,vh)*1000/deltaMs;
    cursorMotion=Math.max(cursorMotion,clamp(perSec/1200,0,1.7));
    if(d>.0003){const vx=xx-previous.x,vy=yy-previous.y,den=Math.hypot(vx,vy)||1;pointerDirection={x:vx/den,y:vy/den};}
    pointer.dx=clamp((xx-previous.x)*2.8,-.7,.7);
    pointer.dy=clamp((yy-previous.y)*2.8,-.7,.7);
    if(d>.2){pointer.px=xx;pointer.py=yy;}
    pointer.x=xx;pointer.y=yy;pointer.active=true;pointer.last=performance.now();pointerEvents++;
    if(hint && pointerEvents>4)hint.classList.add('is-active');
  }
  // Small real-time 3D perspective movement for the CTA; its lettering stays true HTML.
  // The same pointer supplies the gold shader, but no WebGPU/React dependency is introduced.
  const cta=document.querySelector('[data-testid="loader-enter"]');
  cta?.querySelector('.loader-module__y9w63G__ctaLabel')?.setAttribute('data-shine-text','ENTER THE EXPERIENCE');
  cta?.querySelectorAll('.loader-module__y9w63G__ctaChar').forEach((letter,index)=>{
    letter.style.setProperty('--pp-letter-index',index);
  });
  let shine=32,shineGoal=32,ctaPitch=0,ctaYaw=0,ctaX=0,ctaY=0;
  function animateButton(){
    if(!cta || lowMotion)return;
    shineGoal=(shineGoal+.14)%110;
    shine+=(shineGoal-shine)*.035;
    // prevent wrapped phase from causing a reverse streak
    if(Math.abs(shineGoal-shine)>54)shine=shineGoal;
    cta.style.setProperty('--pp-sheen',shine.toFixed(2)+'%');
    const x=(pointer.x>=0&&pointer.x<=1?pointer.x:.5)-.5;
    const y=(pointer.y>=0&&pointer.y<=1?pointer.y:.5)-.5;
    const targetYaw=clamp(x*4.2,-2.1,2.1),targetPitch=clamp(y*2.8,-1.4,1.4);
    ctaYaw+=(targetYaw-ctaYaw)*.08;ctaPitch+=(targetPitch-ctaPitch)*.08;
    ctaX+=(x*2.5-ctaX)*.09;ctaY+=(-y*1.5-ctaY)*.09;
    cta.style.setProperty('--pp-yaw',ctaYaw.toFixed(2)+'deg');
    cta.style.setProperty('--pp-pitch',ctaPitch.toFixed(2)+'deg');
    cta.style.setProperty('--pp-x',ctaX.toFixed(2)+'px');
    cta.style.setProperty('--pp-y',ctaY.toFixed(2)+'px');
  }
  function addClick(x,y){clicks.push({x,y,t:elapsed});pointer.down=true;pointer.last=performance.now();pointer.active=true;
    pointer.x=x;pointer.y=y;pointer.px=x-.0001;pointer.py=y;}
  function setActive(on){active=on;canvas.classList.toggle('off',!on);document.body.dataset.paused=on?'false':'true';
    document.body.classList.toggle('gpu-grid',on && ready);
    toggle?.setAttribute('aria-pressed',String(on));if(toggle)toggle.textContent=on?'↘  LITE VERSION':'↗  ENABLE LIVING GOLD';
    if(active && ready&&!raf){last=performance.now();raf=requestAnimationFrame(tick);}else if(!active&&raf){cancelAnimationFrame(raf);raf=0;}}
  function configure(q){if(!profiles[q])return;quality=q;setting.value=q;
    if(ready)resize();setStatus('LIVE MATERIAL // '+q.toUpperCase());}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;active=false;document.body.classList.remove('gpu-grid');setStatus('GPU CONTEXT LOST — STATIC GRID');});
  window.addEventListener('pointermove',move,{passive:true});
  function onBackgroundPointerDown(e){
    if(e.button!==0 || !active || !ready)return;
    const t=e.target;
    if(!(t instanceof Element))return;
    // Every control, card and text region is excluded from click-to-seal behavior.
    if(t.closest('button,a,input,select,textarea,label,#gpu-panel,'+
      '.loader-module__y9w63G__header,.loader-module__y9w63G__progressZone,'+
      '.loader-module__y9w63G__ticketCard,.loader-module__y9w63G__cornerImage,'+
      '.loader-module__y9w63G__bigPercent,#gilded-hint,#standalone-note'))return;
    move(e);addClick(pointer.x,pointer.y);
  }
  window.addEventListener('pointerdown',onBackgroundPointerDown,{passive:true});
  window.addEventListener('pointerup',()=>{pointer.down=false},{passive:true});
  window.addEventListener('pointercancel',()=>{pointer.down=false;pointer.active=false},{passive:true});
  window.addEventListener('blur',()=>{pointer.active=false;pointer.down=false});
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else if(active&&ready){last=performance.now();raf=requestAnimationFrame(tick);}});
  toggle?.addEventListener('click',e=>{e.stopPropagation();setActive(!active);});
  setting?.addEventListener('change',e=>configure(e.target.value));
  distortionSelect?.addEventListener('change',e=>{distortionPreset=e.target.value;});
  window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='q'){const values=Object.keys(profiles);configure(values[(values.indexOf(quality)+1)%values.length]);}});
  const enter=document.querySelector('[data-testid="loader-enter"]');
  enter?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(note){note.textContent='THE IMPERIAL GATEWAY IS READY — STANDALONE MATERIAL STUDY';note.classList.add('show');setTimeout(()=>note.classList.remove('show'),2200);}});
  if(setting)setting.value=quality;
  if(distortionSelect)distortionSelect.value=distortionPreset;
  document.fonts?.ready?.then(updateProtectedAreas).catch(()=>{});
  if(lowMotion){setActive(false);setStatus('REDUCED MOTION — STATIC GRID');}else{
    try{init();}catch(e){console.error('[Living Gold]',e);setStatus('GPU NOT READY — STATIC FALLBACK');canvas.style.display='none';localError=String(e);}
  }
  window.__LIVING_GOLD_STATUS=()=>({ready,quality,distortionPreset,cursorMotion,active,events:pointerEvents,liveSeals:clicks.length,fps:fpsLabel?.textContent,sim:sw+'x'+sh,canvas:dw+'x'+dh,webgl2:!!gl,error:localError||status?.textContent,features:['liquid metal','growing filigree','elastic grid','click-only tesserae','spectral reflections','original shader seals with uncapped active events','hover letter roll'],grid:'original CSS grid restored',textShield:'GPU bloom-derived blur plus full-frame card exclusion',motionFX:'marbled violet silk + molten gold + Gaussian chromatic motion + CTA parallax + original hover letter roll' ,protectedAreas:Array.from(protectedAreas),support});
})();
