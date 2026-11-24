(() => {
  'use strict';

  for (const demo of document.querySelectorAll('[data-svm-prediction]')) {
    const x1Control = demo.querySelector('[data-svm-input="x1"]');
    const x2Control = demo.querySelector('[data-svm-input="x2"]');
    const w1 = 2;
    const w2 = 1;
    const bias = -2;
    const show = (key, text) => { demo.querySelector('[data-svm-' + key + ']').textContent = text; };
    const format = value => String(value).replace('-', '−');
    const factor = value => value < 0 ? '(' + format(value) + ')' : format(value);

    function render() {
      const x1 = Number(x1Control.value);
      const x2 = Number(x2Control.value);
      const term1 = w1 * x1;
      const term2 = w2 * x2;
      const score = term1 + term2 + bias;
      const sign = Math.sign(score);
      demo.querySelector('[data-svm-value="x1"]').value = format(x1);
      demo.querySelector('[data-svm-value="x2"]').value = format(x2);
      show('expansion', w1 + ' × ' + factor(x1) + ' + ' + w2 + ' × ' + factor(x2) + ' − 2');
      show('sum', format(term1) + ' + ' + factor(term2) + ' − 2 = ' + format(score));
      show('sign', 'sgn(' + format(score) + ') = ' + (sign > 0 ? '+1' : format(sign)));
      show('label', score === 0 ? 'Class +1 (tie on the separator)' : score > 0 ? 'Class +1' : 'Class −1');
    }

    x1Control.addEventListener('input', render);
    x2Control.addEventListener('input', render);
    demo.querySelector('[data-svm-boundary]').addEventListener('click', () => {
      x1Control.value = 1;
      x2Control.value = 0;
      render();
    });
    render();
  }
})();
