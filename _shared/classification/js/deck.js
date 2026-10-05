CLVisuals.mount();window.deckReady=CLWidgets.mount();
Reveal.initialize({width:1920,height:1080,margin:.04,hash:true,controls:false,progress:true,center:false,slideNumber:'c/t',transition:'fade',transitionSpeed:'fast',backgroundTransition:'fade'}).then(()=>CLWidgets.resize());
Reveal.on('slidechanged',()=>CLWidgets.resize());window.addEventListener('resize',()=>CLWidgets.resize());
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.nav==='overview')Reveal.toggleOverview();else if(b.dataset.nav==='prev')Reveal.prev();else Reveal.next();}));
