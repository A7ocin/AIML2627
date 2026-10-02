(() => {
  const isPrintPdf = /[?&]print-pdf(?=&|$)/.test(location.search);
  const wantsAutoPrint = /(?:^|[?&])autoprint=1(&|$)/.test(location.search);

  // History decks share the same controls as the later lecture packs.
  // Existing controls are already wired by each subject's deck initializer.
  let navigationReady = false;
  const initNavigation = () => {
    if (navigationReady || isPrintPdf || !window.Reveal?.isReady()) return;
    navigationReady = true;
    if (!document.querySelector('.deck-nav')) {
      const nav = document.createElement('nav');
      nav.className = 'deck-nav';
      nav.setAttribute('aria-label', 'Slide navigation');
      for (const [action, label, text] of [
        ['prev', 'Previous slide', '←'],
        ['overview', 'Slide overview', 'Overview'],
        ['next', 'Next slide', '→'],
      ]) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.nav = action;
        button.setAttribute('aria-label', label);
        button.textContent = text;
        button.addEventListener('click', () => {
          if (action === 'overview') Reveal.toggleOverview();
          else if (action === 'prev') Reveal.prev();
          else Reveal.next();
        });
        nav.append(button);
      }
      document.body.append(nav);
    }

    // One navigation step per wheel gesture, including Reveal fragments.
    // Keep zoom, form controls, scrollable panels and interactive plots native.
    let lastWheel = -Infinity, lastStep = -Infinity, accumulated = 0, stepped = false;
    document.addEventListener('wheel', event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey ||
          Reveal.isOverview() || Reveal.isPaused() || document.querySelector('dialog[open]') ||
          Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.target.closest('input, select, textarea, [contenteditable="true"], iframe, video, .video-card, .search-demo, .cp-widget, .ml-widget, .rg-widget, .js-plotly-plot, .wc-live, [data-no-slide-wheel]')) return;
      for (let node = event.target; node && node !== document.body; node = node.parentElement) {
        if (node.scrollHeight > node.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(node).overflowY)) return;
      }
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) { accumulated = 0; stepped = false; }
      lastWheel = now;
      if (stepped) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.sign(delta) !== Math.sign(accumulated)) accumulated = 0;
      accumulated += delta;
      if (Math.abs(accumulated) < 36 || now - lastStep < 450) return;
      if (accumulated > 0) Reveal.next(); else Reveal.prev();
      lastStep = now;
      stepped = true;
    }, { passive:false });
  };

  // Keep the lesson tag synced with the lecture label.
  const updateLessonTag = () => {
    document.querySelectorAll('.lesson-tag').forEach(tag => {
      const label = (document.body && document.body.dataset && document.body.dataset.lectureLabel) || '';
      tag.textContent = label;
      if (tag.title !== undefined) tag.title = label;
    });
  };

  // The build script uses Reveal's PDF layout. Keep one complete slide per
  // page and retain support for manually opened print-pdf URLs. This script
  // loads before deck.js so styles are captured before Reveal wraps slides.
  if (isPrintPdf && window.Reveal) {
    document.querySelectorAll('.reveal .slides > section').forEach(slide => {
      const style = getComputedStyle(slide);
      slide.style.setProperty('--pdf-slide-padding', style.padding);
      slide.style.setProperty('--pdf-slide-align', style.textAlign);
    });
    Reveal.configure({ pdfSeparateFragments: false, pdfMaxPagesPerSlide: 1 });
    Reveal.on('pdf-ready', async () => {
      await document.fonts.ready;
      await window.deckReady;
      if (window.Plotly) {
        await Promise.all(Array.from(document.querySelectorAll('.js-plotly-plot'), plot => Plotly.Plots.resize(plot)));
      }
      await Promise.all(Array.from(document.images, img => img.decode().catch(() => {})));
      document.documentElement.dataset.pdfReady = 'true';
      if (wantsAutoPrint) window.print();
    });
  }

  // ---------------------------------------------------------------------
  // Open the browser's Save as PDF flow, shown only on the first slide.
  // ---------------------------------------------------------------------

  const buildButton = () => {
    if (document.querySelector('.course-print-button')) return null;

    const btn = document.createElement('a');
    btn.className = 'course-print-button';
    const printUrl = new URL(window.location.href);
    printUrl.hash = '';
    printUrl.search = '?print-pdf&autoprint=1';
    btn.href = printUrl.href;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.title = 'Open the browser dialog to save this lecture as a PDF.';

    const NS = 'http://www.w3.org/2000/svg';
    const icon = document.createElementNS(NS, 'svg');
    icon.setAttribute('aria-hidden', 'true'); icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor'); icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round'); icon.setAttribute('stroke-width', '1.7');
    icon.setAttribute('viewBox', '0 0 24 24'); icon.style.width = '16px'; icon.style.height = '16px';
    const bodyP = document.createElementNS(NS, 'path');
    bodyP.setAttribute('d', 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5');
    icon.appendChild(bodyP);
    btn.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = 'Download slides (PDF)';
    btn.appendChild(span);

    return btn;
  };

  let printBtnEl = null;

  const currentSlideIndex = () => {
    try {
      if (window.Reveal && typeof Reveal.getIndices === 'function') {
        const inds = Reveal.getIndices() || {};
        if (typeof inds.h === 'number') return inds.h;
        if (typeof inds.indexh === 'number') return inds.indexh;
      }
    } catch (_e) {}
    try { const h = (location.hash.match(/\/(\d+)/) || [])[1]; return h != null ? +h : 0; } catch (_e) { return 0; }
  };

  const syncVisibility = () => {
    if (!printBtnEl) return;
    printBtnEl.classList.toggle('is-visible', currentSlideIndex() === 0);
  };

  const initButton = () => {
    // Never show the floating button inside the export page itself.
    if (isPrintPdf || document.querySelector('.course-print-button')) return;
    printBtnEl = buildButton();
    if (!printBtnEl) return;
    document.body.appendChild(printBtnEl);
    syncVisibility();

    if (window.Reveal && typeof Reveal.on === 'function') {
      Reveal.on('slidechanged', syncVisibility);
      Reveal.on('ready', () => setTimeout(syncVisibility, 120));
    }
    // Fallback re-check shortly after load.
    setTimeout(() => { if (printBtnEl) syncVisibility(); }, 180);
  };

  updateLessonTag();
  if (window.Reveal && typeof Reveal.on === 'function') {
    Reveal.on('ready', updateLessonTag);
    Reveal.on('ready', initNavigation);
  }
  initNavigation();

  // Start the button once Reveal has initialized its DOM.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButton);
  } else {
    setTimeout(initButton, 0);
  }

})();
