SearchVisuals.mount();
SearchWidgets.mount();
Reveal.initialize({width:1920,height:1080,margin:.04,hash:true,controls:false,progress:true,center:false,slideNumber:'c/t',transition:'fade',transitionSpeed:'fast',backgroundTransition:'fade'});
Reveal.on('slidechanged',()=>SearchWidgets.pauseAll());
Reveal.on('overviewshown',()=>SearchWidgets.pauseAll());
document.addEventListener('visibilitychange',()=>{if(document.hidden)SearchWidgets.pauseAll();});
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.nav==='overview')Reveal.toggleOverview();
  else if(b.dataset.nav==='prev')Reveal.prev();else Reveal.next();
}));
