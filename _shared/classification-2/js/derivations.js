(() => {
  'use strict';
  for (const walk of document.querySelectorAll('[data-c34-walk]')) {
    const steps = [...walk.querySelectorAll('[data-c34-step]')];
    const panels = [...walk.querySelectorAll('[data-c34-panel]')];
    const [back, next] = walk.querySelectorAll('[data-c34-shift]');
    const status = walk.querySelector('[data-c34-status]');
    let current = 0;

    if (walk.hasAttribute('data-c34-previous')) {
      const startingFormula = document.getElementById(walk.dataset.c34StartFormula)?.querySelector('.c34-equation');
      for (const [i, panel] of panels.entries()) {
        const heading = panel.querySelector('h3');
        const header = document.createElement('div');
        header.className = 'c34-panel-header';
        heading.before(header);
        header.append(heading);
        const formula = i === 0
          ? startingFormula
          : [...panels[i - 1].querySelectorAll(':scope > .c34-equation')].at(-1);
        if (!formula) continue;

        const previous = document.createElement('div');
        previous.className = 'c34-panel-previous';
        const label = document.createElement('span');
        label.textContent = i === 0 ? 'Weight update rule' : `Previous step ${i}`;
        previous.append(label, formula.cloneNode(true));
        header.append(previous);
      }
    }

    function show(index) {
      current = Math.max(0, Math.min(panels.length - 1, index));
      for (const [i, panel] of panels.entries()) {
        panel.hidden = i !== current;
        steps[i].setAttribute('aria-pressed', String(i === current));
      }
      back.disabled = current === 0;
      next.disabled = current === panels.length - 1;
      status.textContent = `Step ${current + 1} of ${panels.length}`;
    }

    for (const [i, step] of steps.entries()) step.addEventListener('click', () => show(i));
    back.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    walk.classList.add('c34-enhanced');
    show(0);
  }
})();
