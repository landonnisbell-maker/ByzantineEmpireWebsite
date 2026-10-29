/* V46: permanent silence inside MARKET frames only. The main site is unaffected. */
(()=>{
'use strict';
if(window.__BYZ_MARKET_AUDIO_DISABLED__)return;
window.__BYZ_MARKET_AUDIO_DISABLED__=true;
// Web Audio nodes may run for animation timing, but must never connect to speakers.
if(window.AudioNode?.prototype?.connect){
  const connect=AudioNode.prototype.connect;
  AudioNode.prototype.connect=function(target,...rest){
    if(target && this.context && (target===this.context.destination ||
      (window.AudioDestinationNode && target instanceof AudioDestinationNode))){
      return target;
    }
    return connect.call(this,target,...rest);
  };
}
// Silence <audio> and <video>, including elements created after app hydration.
if(window.HTMLMediaElement){
  const proto=HTMLMediaElement.prototype;
  const muted=Object.getOwnPropertyDescriptor(proto,'muted');
  if(muted?.configurable && muted.set && muted.get){
    Object.defineProperty(proto,'muted',{
      configurable:true,enumerable:muted.enumerable,
      get(){return muted.get.call(this)},
      set(){return muted.set.call(this,true)}
    });
  }
  const volume=Object.getOwnPropertyDescriptor(proto,'volume');
  if(volume?.configurable && volume.set && volume.get){
    Object.defineProperty(proto,'volume',{
      configurable:true,enumerable:volume.enumerable,
      get(){return volume.get.call(this)},
      set(){return volume.set.call(this,0)}
    });
  }
  const play=proto.play;
  if(play)proto.play=function(...args){
    try{this.muted=true;this.volume=0}catch(_){}
    return play.apply(this,args);
  };
  const silence=(root)=>{
    if(root?.matches?.('audio,video')){try{root.muted=true;root.volume=0;root.defaultMuted=true}catch(_){}}
    root?.querySelectorAll?.('audio,video').forEach(el=>{try{el.muted=true;el.volume=0;el.defaultMuted=true}catch(_){}});
  };
  document.addEventListener('play',ev=>silence(ev.target),true);
  document.addEventListener('volumechange',ev=>silence(ev.target),true);
  const start=()=>{
    silence(document);
    new MutationObserver(records=>{for(const rec of records)for(const el of rec.addedNodes)if(el.nodeType===1)silence(el)}).observe(document.documentElement,{subtree:true,childList:true});
  };
  if(document.documentElement)start();else document.addEventListener('DOMContentLoaded',start,{once:true});
}
})();
