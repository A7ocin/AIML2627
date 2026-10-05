MLVisuals.mount();window.deckReady=MLWidgets.mount();
Reveal.initialize({width:1920,height:1080,margin:.04,hash:true,controls:false,progress:true,center:false,slideNumber:'c/t',transition:'fade',transitionSpeed:'fast',backgroundTransition:'fade'}).then(()=>{MLWidgets.resize();});
Reveal.on('slidechanged',()=>{MLWidgets.pauseAll();MLWidgets.resize();});Reveal.on('overviewshown',()=>MLWidgets.pauseAll());
document.addEventListener('visibilitychange',()=>{if(document.hidden)MLWidgets.pauseAll();});window.addEventListener('resize',()=>MLWidgets.resize());
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.nav==='overview')Reveal.toggleOverview();else if(b.dataset.nav==='prev')Reveal.prev();else Reveal.next();}));
