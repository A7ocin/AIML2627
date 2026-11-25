(() => {
  'use strict';

  const format = value => String(Math.abs(value));
  const signed = value => (value < 0 ? '−' : value > 0 ? '+' : '') + format(value);
  const plain = value => (value < 0 ? '−' : '') + format(value);

  for (const lab of document.querySelectorAll('[data-nlsvm-sum]')) {
    const multiplierInput = lab.querySelector('[data-sum-input="multiplier"]');
    const labelInput = lab.querySelector('[data-sum-input="label"]');
    const scoreInput = lab.querySelector('[data-sum-input="score"]');
    const display = key => lab.querySelector('[data-sum-value="' + key + '"]');

    function render() {
      const multiplier = Number(multiplierInput.value);
      const label = Number(labelInput.value);
      const score = Number(scoreInput.value);
      const signedScore = label * score;
      const term = -multiplier * (signedScore - 1);
      display('multiplier').value = plain(multiplier);
      display('score').value = plain(score);
      display('signed-score').textContent = '(' + signed(label) + ') × ' + (score < 0 ? '(' + plain(score) + ')' : plain(score)) + ' = ' + plain(signedScore);
      display('total').textContent = plain(-multiplier) + ' × (' + plain(signedScore) + ' − 1) = ' + signed(term);
    }

    multiplierInput.addEventListener('input', render);
    labelInput.addEventListener('change', render);
    scoreInput.addEventListener('input', render);
    render();
  }
})();
