/* Click-to-enlarge for course illustrations, including generated SVG diagrams. */
(() => {
  'use strict';
  if (/[?&]print-pdf(?:[=&]|$)/.test(location.search)) return;
  const candidates = 'img, svg[role="img"], svg.diagram, svg.turing-machine-diagram, figure > svg';
  const excluded = '.video-card, .js-plotly-plot, .lab, .widget, .search-demo, .cp-widget, .ml-widget, .rg-widget, button, a, [data-no-image-viewer], #course-image-viewer';
  let dialog, largeImage, caption, error, opener, objectURL;

  const description = element => element.getAttribute('alt') || element.getAttribute('aria-label') ||
    element.querySelector('title')?.textContent || 'Course illustration';

  function register(root) {
    const items = [...root.querySelectorAll(candidates)];
    if (root.matches?.(candidates)) items.unshift(root);
    for (const element of items) {
      if (element.hasAttribute('data-image-viewer') || element.closest(excluded)) continue;
      // Diagrams that contain their own controls retain their original behavior.
      if (element.querySelector('a, button, input, [tabindex], [onclick]')) continue;
      element.setAttribute('data-image-viewer', '');
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
      element.setAttribute('aria-haspopup', 'dialog');
      element.setAttribute('aria-description', 'Open enlarged image');
      if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
        element.setAttribute('aria-label', description(element));
      }
    }
  }

  function createViewer() {
    dialog = document.createElement('dialog');
    dialog.id = 'course-image-viewer';
    dialog.setAttribute('aria-labelledby', 'image-viewer-title');
    dialog.innerHTML = '<div class="image-viewer-toolbar"><h2 id="image-viewer-title" class="image-viewer-title">Enlarged image</h2><button type="button" class="image-viewer-close" autofocus aria-label="Close enlarged image">Close ×</button></div><div class="image-viewer-stage"><img class="image-viewer-image" alt=""><p class="image-viewer-error" hidden>Unable to load this image.</p></div><p class="image-viewer-caption"></p>';
    document.body.append(dialog);
    largeImage = dialog.querySelector('img');
    caption = dialog.querySelector('.image-viewer-caption');
    error = dialog.querySelector('.image-viewer-error');
    largeImage.addEventListener('error', () => { largeImage.hidden = true; error.hidden = false; });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    // A backdrop press is delivered to the dialog, outside its bounding box.
    let backdropPress = false;
    const outside = event => {
      const bounds = dialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    dialog.addEventListener('pointerdown', event => { backdropPress = outside(event); });
    dialog.addEventListener('click', event => {
      if (backdropPress && outside(event)) dialog.close();
      backdropPress = false;
    });
    dialog.addEventListener('close', () => {
      // The native close event is queued; a new image may already be open.
      if (dialog.open) return;
      document.documentElement.classList.remove('image-viewer-open');
      largeImage.removeAttribute('src');
      if (objectURL) URL.revokeObjectURL(objectURL);
      objectURL = null;
      if (opener?.isConnected) opener.focus({ preventScroll:true });
    });
  }

  function svgImage(source) {
    const copy = source.cloneNode(true);
    // Inline inherited styles so a diagram looks the same outside the deck or handout.
    const properties = ['color', 'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width',
      'stroke-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin',
      'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor', 'dominant-baseline',
      'letter-spacing', 'opacity', 'visibility', 'display', 'paint-order', 'marker-start', 'marker-mid', 'marker-end'];
    const originals = [source, ...source.querySelectorAll('*')];
    const clones = [copy, ...copy.querySelectorAll('*')];
    originals.forEach((element, index) => {
      const computed = getComputedStyle(element);
      for (const property of properties) {
        // Computed SVG references may contain the page URL; use the local fragment.
        const value = computed.getPropertyValue(property).replace(/url\(["']?[^)]*#([^"')]+)["']?\)/g, 'url(#$1)');
        clones[index].style.setProperty(property, value);
      }
      clones[index].removeAttribute('data-image-viewer');
      clones[index].removeAttribute('tabindex');
    });
    const viewBox = source.viewBox.baseVal;
    const width = viewBox.width || source.getBoundingClientRect().width;
    const height = viewBox.height || source.getBoundingClientRect().height;
    copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    copy.setAttribute('width', width);
    copy.setAttribute('height', height);
    if (!viewBox.width) copy.setAttribute('viewBox', `0 0 ${width} ${height}`);
    copy.style.width = `${width}px`;
    copy.style.height = `${height}px`;
    copy.style.maxWidth = 'none';
    copy.style.maxHeight = 'none';
    copy.style.margin = '0';
    copy.style.padding = '0';
    copy.style.opacity = '1';
    copy.style.visibility = 'visible';
    return URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)], { type:'image/svg+xml' }));
  }

  function open(element) {
    if (!dialog) createViewer();
    if (objectURL) URL.revokeObjectURL(objectURL);
    objectURL = null;
    opener = element;
    largeImage.hidden = false;
    error.hidden = true;
    largeImage.alt = description(element);
    const sourceCaption = element.closest('figure')?.querySelector('figcaption');
    caption.textContent = sourceCaption?.innerText.trim().replace(/\s*\n\s*/g, ' · ') || description(element);
    const isSVG = element.tagName.toLowerCase() === 'svg';
    if (isSVG) objectURL = svgImage(element);
    largeImage.src = isSVG ? objectURL : element.currentSrc || element.src;
    document.documentElement.classList.add('image-viewer-open');
    dialog.showModal();
  }

  document.addEventListener('click', event => {
    const element = event.target.closest('[data-image-viewer]');
    if (!element || dialog?.open) return;
    event.preventDefault();
    event.stopPropagation();
    open(element);
  }, true);
  // Capture on window before Reveal's document handlers: Escape must close only
  // the viewer; arrows/space must not advance the slide behind an open modal.
  window.addEventListener('keydown', event => {
    if (dialog?.open) {
      event.stopImmediatePropagation();
      if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
      if (event.key === 'Tab') {
        event.preventDefault();
        dialog.querySelector('.image-viewer-close').focus();
      }
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-image-viewer]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      open(event.target);
    }
  }, true);
  window.addEventListener('beforeprint', () => { if (dialog?.open) dialog.close(); });
  register(document);
  // Some decks generate diagrams after data loads; process only new subtrees.
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === 1 && !node.closest('#course-image-viewer')) register(node);
    }
  }).observe(document.body, { childList:true, subtree:true });
})();
