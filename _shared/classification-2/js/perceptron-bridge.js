(function () {
  'use strict';

  const engine = window.C2Engine;

  document.querySelectorAll('[data-c34-learning-demo]').forEach(demo => {
    const switches = Array.from(demo.querySelectorAll('[role="switch"]'));
    const switchValues = demo.querySelectorAll('[data-switch-value]');
    const andLabel = demo.querySelector('[data-and-label]');
    const comparison = demo.querySelector('[data-learning-comparison]');
    const scale = demo.querySelector('.c34-learning-scale');
    const arrow = scale.querySelector('.c34-learning-scale-arrow');
    const updatedMark = scale.querySelector('[data-updated-mark]');
    const updatedScore = scale.querySelector('[data-updated-score]');
    const result = demo.querySelector('[data-learning-result]');

    function render() {
      const [x, y] = switches.map(toggle => Number(toggle.getAttribute('aria-checked') === 'true'));
      const label = x * y;
      const { states: [, updated] } = engine.training([{ x, y, c: label }], 1, false, 1);
      const score = engine.dot(updated.w, [1, x, y]);
      const changed = updated.last.error !== 0;
      const position = 50 + score * (100 / 6);

      switchValues[0].textContent = x ? 'On (1)' : 'Off (0)';
      switchValues[1].textContent = y ? 'On (1)' : 'Off (0)';
      andLabel.textContent = label;
      andLabel.classList.toggle('c34-learning-class-0', label === 0);
      andLabel.classList.toggle('c34-learning-class-1', label === 1);
      comparison.textContent = changed ? 'Mismatch' : 'Match';

      arrow.hidden = updatedMark.hidden = updatedScore.hidden = !changed;
      arrow.style.left = updatedMark.style.left = updatedScore.style.left = `${position}%`;
      arrow.style.width = `${50 - position}%`;
      updatedScore.textContent = score < 0 ? `−${-score}` : score;
      scale.setAttribute('aria-label', changed ? `The score moves from 0 to ${score}.` : 'The score stays at 0.');
      result.textContent = changed ? `Now predicts class ${engine.predict(updated.w, { x, y })}.` : 'Weights stay the same.';
    }

    switches.forEach(toggle => {
      toggle.addEventListener('keydown', event => {
        if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
      });
      toggle.addEventListener('click', () => {
        toggle.setAttribute('aria-checked', toggle.getAttribute('aria-checked') !== 'true');
        render();
      });
    });

    render();
  });
})();
