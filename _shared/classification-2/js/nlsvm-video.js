(() => {
  'use strict';

  // File URLs cannot supply the web referrer required by the YouTube player.
  if (!['http:', 'https:'].includes(location.protocol)) return;

  for (const figure of document.querySelectorAll('[data-nlsvm-player]')) {
    const template = figure.querySelector('template');
    figure.prepend(template.content.cloneNode(true));
    figure.dataset.embedded = 'true';
  }
})();
