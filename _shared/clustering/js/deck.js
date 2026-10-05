C2Visuals.mount();window.deckReady=C2Widgets.mount();
Reveal.initialize({width:1920,height:1080,margin:.04,hash:true,controls:false,progress:true,center:false,slideNumber:'c/t',transition:'fade',transitionSpeed:'fast',backgroundTransition:'fade'}).then(()=>C2Widgets.resize());
Reveal.on('slidechanged',()=>{C2Widgets.pause();C2Widgets.resize();});window.addEventListener('resize',()=>C2Widgets.resize());
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.nav==='overview')Reveal.toggleOverview();else if(b.dataset.nav==='prev')Reveal.prev();else Reveal.next();}));
