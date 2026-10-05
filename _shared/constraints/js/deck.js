CSPVisuals.mount();CSPWidgets.mount();
Reveal.initialize({width:1920,height:1080,margin:.04,hash:true,controls:false,progress:true,center:false,slideNumber:'c/t',transition:'fade',transitionSpeed:'fast',backgroundTransition:'fade'});
Reveal.on('slidechanged',()=>CSPWidgets.pauseAll());Reveal.on('overviewshown',()=>CSPWidgets.pauseAll());
document.addEventListener('visibilitychange',()=>{if(document.hidden)CSPWidgets.pauseAll();});
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.nav==='overview')Reveal.toggleOverview();else if(b.dataset.nav==='prev')Reveal.prev();else Reveal.next();}));
