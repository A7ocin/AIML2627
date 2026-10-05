/* Insert course questions before Reveal initializes. No account data or API calls. */
(() => {
  'use strict';
  const config = window.AIML_WOOCLAP;
  const slides = document.querySelector('.reveal .slides');
  if (!config || !slides || slides.dataset.wooclapMounted) return;
  const pack = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  const lecture = config.lectures.find(item => item.pack === pack);
  if (!lecture) return;
  slides.dataset.wooclapMounted = 'true';
  const originals = [...slides.children].filter(el => el.tagName === 'SECTION');
  originals.forEach((section, index) => {
    if (!section.id) section.id = `lecture-${section.dataset.slide || index}`;
  });
  // Keep old numeric bookmarks and existing handout/guide links pointing at
  // their original instructional slide, despite the inserted question slides.
  const legacyHash = location.hash.match(/^#\/(\d+)(\/.*)?$/);
  if (legacyHash && originals[Number(legacyHash[1])]) {
    history.replaceState(null, '', `#/${originals[Number(legacyHash[1])].id}${legacyHash[2] || ''}`);
  }
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const afterTail = new Map();
  for (const question of lecture.questions) {
    const anchor = originals.find(el => el.dataset.slide === question.slide);
    if (!anchor) throw new Error(`Missing slide for ${question.id}`);
    const section = make('section', 'wc-question');
    section.id = `wooclap-${question.id}`;
    section.dataset.slide = section.id;
    section.dataset.wooclapId = question.id;
    const kicker = make('span', 'kicker', `${question.id} · ${question.core ? 'Class question' : 'Optional discussion'} · ${question.purpose}`);
    section.append(kicker);
    const shell = make('div', 'wc-shell');
    const preview = make('div', 'wc-preview');
    const heading = make('h2', 'wc-stem', question.stem);
    preview.append(heading);
    if (question.choices?.length) {
      const choices = make('ol', 'wc-choices');
      question.choices.forEach((choice, index) => {
        const item = make('li', 'wc-choice');
        item.append(make('span', 'wc-letter', String.fromCharCode(65 + index)), make('span', 'wc-choice-text', choice));
        choices.append(item);
      });
      preview.append(choices);
    } else {
      preview.append(make('p', 'wc-reflection', question.previewText || 'Think for a moment, then share a short explanation in your own words.'));
    }
    const live = make('div', 'wc-live');
    live.hidden = true;
    const toolbar = make('div', 'wc-toolbar');
    const actions = make('div', 'wc-actions');
    const open = make('button', 'wc-button wc-primary', 'Open live question');
    open.type = 'button';
    open.setAttribute('aria-expanded', 'false');
    open.setAttribute('aria-controls', `${section.id}-live`);
    live.id = `${section.id}-live`;
    const external = make('a', 'wc-button', 'Open in Wooclap ↗');
    external.href = question.src;
    external.target = '_blank';
    external.rel = 'noopener noreferrer';
    const next = make('button', 'wc-button', 'Continue lecture →');
    next.type = 'button';
    next.addEventListener('click', () => Reveal.next());
    actions.append(open, external, next);
    const join = make('div', 'wc-join');
    join.append(make('span', 'wc-time', `Suggested time: ${Math.round(question.seconds / 30) / 2} min`));
    const joinLink = make('a', '', `Join at wooclap.com · ${lecture.eventCode}`);
    joinLink.href = `https://www.wooclap.com/${lecture.eventCode}`;
    joinLink.target = '_blank';
    joinLink.rel = 'noopener noreferrer';
    join.append(joinLink);
    toolbar.append(actions, join);
    const help = make('p', 'wc-help', 'Open the live question to present and collect responses. If sign-in or embedding is blocked, use “Open in Wooclap”.');
    const reset = () => {
      live.replaceChildren();
      live.hidden = true;
      preview.hidden = false;
      open.textContent = 'Open live question';
      open.setAttribute('aria-expanded', 'false');
    };
    open.addEventListener('click', () => {
      if (!live.hidden) { reset(); return; }
      const frame = make('iframe', 'wc-frame');
      frame.title = `Wooclap ${question.id}: ${question.stem}`;
      frame.allowFullscreen = true;
      frame.src = question.src;
      live.append(frame);
      live.hidden = false;
      preview.hidden = true;
      open.textContent = 'Back to question text';
      open.setAttribute('aria-expanded', 'true');
    });
    section.wcReset = reset;
    shell.append(preview, live, toolbar, help);
    section.append(shell);
    if (question.when === 'before') anchor.before(section);
    else {
      (afterTail.get(anchor) || anchor).after(section);
      afterTail.set(anchor, section);
    }
  }
  const unloadInactive = () => {
    slides.querySelectorAll(':scope > .wc-question').forEach(section => {
      if (section !== Reveal.getCurrentSlide()) section.wcReset();
    });
  };
  Reveal.on('slidechanged', unloadInactive);
  Reveal.on('overviewshown', () => slides.querySelectorAll(':scope > .wc-question').forEach(section => section.wcReset()));
})();
