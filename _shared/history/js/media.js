/* Load third-party players only on request; stop them when leaving the slide. */
(() => {
  const originals = new Map();
  document.querySelectorAll('.video-card').forEach(card => {
    originals.set(card, card.innerHTML);
    card.addEventListener('click', event => {
      const button=event.target.closest('button');
      if(!button)return;
      const id=card.dataset.youtube;
      // YouTube requires a web referrer for embeds. Local-file decks use the
      // watch page instead, keeping playback functional without a web server.
      if(location.protocol==='file:') {
        window.open('https://www.youtube.com/watch?v='+id,'_blank','noopener,noreferrer');
        return;
      }
      const player=document.createElement('iframe');
      player.title=button.getAttribute('aria-label');
      player.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&origin='+encodeURIComponent(location.origin);
      player.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.referrerPolicy='strict-origin-when-cross-origin';
      player.allowFullscreen=true;
      card.replaceChildren(player);
    });
  });
  Reveal.on('slidechanged', () => {
    originals.forEach((markup,card)=>{
      if(!Reveal.getCurrentSlide().contains(card)&&card.querySelector('iframe'))card.innerHTML=markup;
    });
  });
})();
