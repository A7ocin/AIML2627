(() => {
  'use strict';

  const training = [
    { x: [0, 0], y: -1, a: 0.25, color: 'negative', index: '₁' },
    { x: [0, 2], y: -1, a: 0.25, color: 'negative', index: '₂' },
    { x: [2, 1], y: 1, a: 0.50, color: 'positive', index: '₃' },
  ];

  const zero = [0, 0];
  const add = ([x, y], [u, v]) => [x + u, y + v];
  const scale = ([x, y], c) => [x * c, y * c];
  const signedVectors = training.map(point => scale(point.x, point.y));
  const weightedVectors = signedVectors.map((vector, i) => scale(vector, training[i].a));
  const normal = weightedVectors.reduce(add, zero);
  const bias = -1;
  const normalLength = Math.hypot(...normal);
  const format = (number, places = 2) => Number(number.toFixed(places)).toString().replace('-', '−');

  const math = (contents, display = 'block') =>
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="' + display + '"><mrow>' + contents + '</mrow></math>';
  const mi = value => '<mi>' + value + '</mi>';
  const mn = value => '<mn>' + value + '</mn>';
  const op = (value, stretchy = false) => '<mo stretchy="' + stretchy + '">' + value + '</mo>';
  const sub = (value, index) => '<msub>' + mi(value) + (typeof index === 'number' ? mn(index) : mi(index)) + '</msub>';
  const fraction = (a, b) => '<mfrac><mrow>' + a + '</mrow><mrow>' + b + '</mrow></mfrac>';
  const squared = expression => '<msup><mrow>' + expression + '</mrow>' + mn(2) + '</msup>';
  const sum = '<munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover>';
  const tuple = vector => op('(') + (vector[0] < 0 ? op('−') : '') + mn(format(Math.abs(vector[0]))) +
    op(',') + (vector[1] < 0 ? op('−') : '') + mn(format(Math.abs(vector[1]))) + op(')');
  const ai = sub('a', 'i');
  const yi = sub('y', 'i');
  const xi = sub('𝐱', 'i');
  const w = mi('𝐰');
  const wTranspose = '<msup>' + w + '<mo>⊤</mo></msup>';
  const w0 = sub('w', 0);
  const norm = expression => op('‖', true) + expression + op('‖', true);
  const wNorm = norm(w);
  const weighted = ai + yi + xi;
  const score = wTranspose + mi('𝐱') + op('+') + w0;
  const vectorEquation = extra => math(w + op('=') + sum + ai + yi + extra);
  const vectorRows = (name, vectors) => '<div class="dual-vector-rows">' +
    vectors.map((vector, i) => math(sub(name, i + 1) + op('=') + tuple(vector))).join('') + '</div>';
  const pointRows = training.map(point =>
    '<tr class="' + point.color + '"><th scope="row">𝐱' + point.index + '</th><td>' +
    '(' + point.x.join(', ') + ')</td><td>' + (point.y < 0 ? '−1' : '+1') + '</td></tr>'
  ).join('');

  const stages = [
    {
      title: 'The training observations',
      body: '<p>Use <i>n</i> = 3 points in two dimensions. The identity feature map keeps both coordinates as given.</p>' +
        '<table class="dual-points-table"><thead><tr><th>Point</th><th>Coordinates</th><th>Class label</th></tr></thead><tbody>' + pointRows + '</tbody></table>',
    },
    {
      title: 'Draw each point as a vector',
      body: '<p>Draw an arrow from the origin to each observation. The arrow gives the point’s position.</p>' +
        vectorRows('𝐱', training.map(point => point.x)) +
        '<p>The ring at the origin marks the zero vector. It has no length or direction.</p>',
    },
    {
      title: 'Multiply by the class label',
      body: '<p>A label of −1 flips the arrow. A label of +1 leaves it pointing the same way. Zero stays zero.</p>' +
        math(sub('𝐯', 'i') + op('=') + yi + xi) + vectorRows('𝐯', signedVectors) +
        '<p>The faded points stay where they were. We’re changing the contributions used in the sum.</p>',
    },
    {
      title: 'Scale each signed vector',
      body: '<p>The dual learns one nonnegative multiplier per training point. These are the optimal values for this dataset.</p>' +
        math(training.map((point, i) => sub('a', i + 1) + op('=') + mn(format(point.a))).join('<mspace width="0.8em"/>')) +
        math(sub('𝐮', 'i') + op('=') + ai + yi + xi) + vectorRows('𝐮', weightedVectors) +
        '<p>The origin contributes a zero vector. Its multiplier still counts toward the balance between classes.</p>' +
        math(sum + ai + yi + op('=') + op('−') + mn('0.25') + op('−') + mn('0.25') + op('+') + mn('0.50') + op('=') + mn(0)),
    },
    {
      title: 'Add the scaled vectors tip to tail',
      body: '<p>The orange copy starts at the tip of the blue arrow. Its vertical rise cancels the blue arrow’s drop.</p>' +
        vectorEquation(xi) +
        '<div class="dual-addition-values">' + math(op('=') + weightedVectors.map(tuple).join(op('+'))) + '</div>' +
        '<div class="dual-confirm dual-addition-result">' + math(w + op('=') + tuple(normal)) + '</div>' +
        '<p>The teal arrow runs from the origin to the final tip. It is the normal vector of the separator.</p>',
    },
    {
      title: 'Place the separating line',
      body: '<p>The normal is horizontal, so the separator is vertical. Put it halfway between the opposing training points at first coordinates 0 and 2.</p>' +
        math(w0 + op('=') + op('−') + mn(1)) +
        '<div class="dual-confirm">' + math(score + op('=') + mn(0)) +
        math(sub('x', 1) + op('−') + mn(1) + op('=') + mn(0)) + '</div>' +
        '<p>Here <i>x</i>₁ is the first coordinate of any input. The right-angle mark shows how the line meets its normal.</p>',
    },
    {
      title: 'Mark the two edges of the margin',
      body: '<p>The dashed lines pass through scores −1 and +1. The training points on those lines are the support vectors in this example.</p>' +
        math(score + op('=') + op('±') + mn(1) + '<mspace width="1em"/>' + op('⟹') + '<mspace width="1em"/>' +
          sub('x', 1) + op('=') + mn(0) + op(',') + mn(2)) +
        '<div class="dual-confirm">' + math(mi('M') + op('=') + fraction(mn(2), wNorm) + op('=') + fraction(mn(2), mn(1)) + op('=') + mn(2)) + '</div>' +
        '<p>The shaded strip is the full margin. Each edge is one unit from the center line.</p>',
    },
    {
      title: 'Shorter normal, wider margin',
      body: '<p>Scale the example’s normal and bias together by <i>c</i>. The line at <i>x</i>₁ = 1 stays put. With a shorter normal, the score changes more slowly, so reaching ±1 takes more distance.</p>' +
        '<div class="dual-scale-formula">' + math(wNorm + op('=') + mi('c') + op(',') + '<mspace width="0.5em"/>' +
          w0 + op('=') + op('−') + mi('c') + op(',') + '<mspace width="0.5em"/>' + mi('M') + op('=') + fraction(mn(2), mi('c'))) + '</div>' +
        '<div class="dual-range"><label>Normal magnitude <input type="range" min="0.5" max="2" step="0.05" value="1" data-dual-scale></label>' +
        '<output data-dual-scale-value>1</output></div>' +
        '<div class="dual-presets" aria-label="Compare three normal magnitudes">' +
        '<button type="button" data-dual-preset="2">2 · Narrower</button>' +
        '<button type="button" data-dual-preset="1">1 · Optimal</button>' +
        '<button type="button" data-dual-preset="0.5">0.5 · Wider</button></div>' +
        '<p>Each point must satisfy ' + math(yi + op('(') + wTranspose +
          xi + op('+') + w0 + op(')') + op('≥') + mn(1), 'inline') + '.</p>' +
        '<div class="dual-readout"><span>Margin <strong data-dual-width>2</strong></span>' +
        '<span>Smallest signed score <strong data-dual-score>1</strong></span></div>' +
        '<p class="dual-status" data-dual-status aria-live="polite"></p>' +
        '<table class="dual-print-cases"><thead><tr><th>Normal magnitude</th><th>Margin</th><th>All signed scores ≥ 1?</th></tr></thead>' +
        '<tbody><tr><td>2</td><td>1</td><td>Yes</td></tr><tr><td>1</td><td>2</td><td>Yes, optimal</td></tr>' +
        '<tr><td>0.5</td><td>4</td><td>No</td></tr></tbody></table>',
    },
    {
      title: 'What the dual is optimizing',
      body: '<p>The <strong>primal</strong> chooses <b>𝐰</b> and <i>w</i>₀ directly. The <strong>dual</strong> chooses the multipliers that build <b>𝐰</b>.</p>' +
        math('<munder><mo>max</mo><mi>𝒂</mi></munder><mspace width="0.4em"/>' + op('[', true) +
          sum + ai + op('−') + fraction(mn(1), mn(2)) + squared(norm(sum + weighted)) + op(']', true)) +
        math('<mtext>subject to</mtext><mspace width="0.75em"/>' + ai + op('≥') + mn(0) + op(',') + '<mspace width="0.6em"/>' + sum + ai + yi + op('=') + mn(0)) +
        '<p>The first term rewards multiplier weight. The second penalizes the squared length of the resulting normal. Here the optimum scores 0.5, while all-zero multipliers score 0.</p>' +
        '<div class="dual-confirm"><p>A nonlinear SVM combines the mapped points.</p>' +
        vectorEquation(mi('ψ') + op('(') + xi + op(')')) + '</div>',
    },
  ];

  const svgNS = 'http://www.w3.org/2000/svg';
  const xPixel = x => 198 + x * 100;
  const yPixel = y => 267 - y * 100;
  const bounds = { left: 68, right: 528, top: 37, bottom: 497 };

  function element(parent, tag, attributes = {}, text = '') {
    const node = document.createElementNS(svgNS, tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    if (text) node.textContent = text;
    parent.append(node);
    return node;
  }

  function line(parent, className, x1, y1, x2, y2) {
    return element(parent, 'line', { class: className, x1, y1, x2, y2 });
  }

  function linePosition(node, x1, y1, x2, y2) {
    node.setAttribute('x1', x1);
    node.setAttribute('y1', y1);
    node.setAttribute('x2', x2);
    node.setAttribute('y2', y2);
  }

  function drawChart(svg) {
    const { left, right, top, bottom } = bounds;
    element(svg, 'rect', {
      class: 'dual-grid-frame', x: left, y: top, width: right - left, height: bottom - top,
    });
    const band = element(svg, 'rect', { class: 'dual-margin-band', y: top, height: bottom - top });
    for (let x = -1; x <= 3; x++) {
      line(svg, x === 0 ? 'dual-axis' : 'dual-grid', xPixel(x), top, xPixel(x), bottom);
      element(svg, 'text', { class: 'dual-tick', x: xPixel(x), y: bottom + 21, 'text-anchor': 'middle' }, format(x));
    }
    for (let y = -2; y <= 2; y++) {
      line(svg, y === 0 ? 'dual-axis' : 'dual-grid', left, yPixel(y), right, yPixel(y));
      element(svg, 'text', { class: 'dual-tick', x: left - 11, y: yPixel(y) + 5, 'text-anchor': 'end' }, format(y));
    }
    element(svg, 'text', { class: 'dual-axis-label', x: right + 9, y: bottom + 23 }, 'x₁');
    element(svg, 'text', {
      class: 'dual-axis-label', x: left - 29, y: top + 16, 'text-anchor': 'end',
    }, 'x₂');

    const negativeEdge = line(svg, 'dual-edge negative', xPixel(0), top, xPixel(0), bottom);
    const positiveEdge = line(svg, 'dual-edge positive', xPixel(2), top, xPixel(2), bottom);
    const boundary = line(svg, 'dual-boundary', xPixel(1), top, xPixel(1), bottom);
    const edgeLabels = [0, 2].map((x, i) => element(svg, 'text', {
      class: 'dual-edge-label ' + (i ? 'positive' : 'negative'),
      x: xPixel(x), y: top - 11, 'text-anchor': i ? 'start' : 'end',
    }, i ? 'score +1' : 'score −1'));
    const separatorLabel = element(svg, 'text', {
      class: 'dual-boundary-label', x: xPixel(1), y: top - 11, 'text-anchor': 'middle',
    }, 'separator');
    const rightAngle = element(svg, 'path', { class: 'dual-right-angle', d: 'M 298 385 h 17 v 17' });
    const cancellation = line(svg, 'dual-cancellation', xPixel(1), yPixel(0), xPixel(1), yPixel(-0.5));
    const bracket = element(svg, 'path', { class: 'dual-width-bracket' });
    const bracketLabel = element(svg, 'text', {
      class: 'dual-width-label', x: xPixel(1), y: yPixel(-2.15), 'text-anchor': 'middle',
    });

    function arrow(color, result = false) {
      const group = element(svg, 'g', { class: 'dual-vector ' + color + (result ? ' resultant' : '') });
      return { group, shaft: line(group, 'shaft', 0, 0, 0, 0), head: element(group, 'polygon') };
    }

    const origins = training.slice(1).map(point => arrow(point.color));
    const copies = training.slice(1).map(point => arrow(point.color));
    const resultant = arrow('teal', true);
    const normalLabel = element(svg, 'text', { class: 'dual-normal-label' }, 'w');
    const zeroRing = element(svg, 'circle', { class: 'dual-zero-vector', cx: xPixel(0), cy: yPixel(0), r: 12 });

    const points = training.map((point, i) => {
      const [x, y] = point.x;
      const cx = xPixel(x);
      const cy = yPixel(y);
      const group = element(svg, 'g', { class: 'dual-point ' + point.color, 'data-point': i + 1 });
      const halo = element(group, 'circle', { class: 'dual-violation', cx, cy, r: 14 });
      const dot = element(group, 'circle', { class: 'dual-point-dot', cx, cy, r: 7 });
      element(group, 'text', {
        class: 'dual-point-label', x: cx + (i === 1 ? -14 : 14),
        y: cy + (i === 1 ? 5 : -14), 'text-anchor': i === 1 ? 'end' : 'start',
      }, 'x' + point.index);
      return { group, halo, dot };
    });
    return { band, negativeEdge, positiveEdge, boundary, edgeLabels, separatorLabel,
      rightAngle, cancellation, bracket, bracketLabel, origins, copies, resultant, normalLabel, zeroRing, points };
  }

  function drawArrow(nodes, [x, y, u, v, opacity]) {
    const dx = u - x;
    const dy = v - y;
    const length = Math.hypot(dx, dy);
    nodes.group.style.opacity = length < 0.015 ? 0 : opacity;
    if (length < 0.015) return;
    const startX = xPixel(x);
    const startY = yPixel(y);
    const endX = xPixel(u);
    const endY = yPixel(v);
    const head = Math.min(13, length * 45);
    const ux = dx / length;
    const uy = -dy / length;
    const baseX = endX - head * ux;
    const baseY = endY - head * uy;
    linePosition(nodes.shaft, startX, startY, baseX + 2 * ux, baseY + 2 * uy);
    nodes.head.setAttribute('points', endX + ',' + endY + ' ' +
      (baseX - head * 0.45 * uy) + ',' + (baseY + head * 0.45 * ux) + ' ' +
      (baseX + head * 0.45 * uy) + ',' + (baseY - head * 0.45 * ux));
  }

  function stateFor(step, magnitude) {
    const vector = step === 0 ? [zero, zero, zero] : step === 1
      ? training.map(point => point.x) : step === 2 ? signedVectors : weightedVectors;
    const arrowOpacity = step >= 1 && step <= 4 ? (step === 4 ? 0.40 : 1) : 0;
    const start3 = add(weightedVectors[0], weightedVectors[1]);
    const c = step === 7 ? magnitude : 1;
    return {
      v2: [0, 0, ...vector[1], arrowOpacity],
      v3: [0, 0, ...vector[2], arrowOpacity],
      copy2: [0, 0, ...weightedVectors[1], Number(step === 4)],
      copy3: step === 4 ? [...start3, ...add(start3, weightedVectors[2]), 1] : [0, 0, ...weightedVectors[2], 0],
      resultant: step >= 5 ? [1, -1.35, 1 + c * normal[0], -1.35, 1] : [0, 0, ...normal, Number(step === 4)],
      marks: [Number(step >= 5), Number(step >= 6), Number(step === 4), Number(step >= 1 && step <= 4),
        step >= 2 && step <= 4 ? 0.35 : 1, c, Number(step === 7 && c < 1)],
    };
  }

  function setup(lab) {
    lab.innerHTML = '<div class="dual-layout">' +
      '<figure class="dual-figure"><svg viewBox="0 0 568 542" role="img" aria-label="Plot of the training points and SVM construction"></svg>' +
      '<figcaption><span class="negative">● Class −1</span><span class="positive">● Class +1</span>' +
      '<span class="teal dual-normal-key" hidden>➝ Normal 𝐰</span><span class="dual-red-key" hidden>○ Margin violation</span></figcaption></figure>' +
      '<div class="dual-body">' + stages.map((stage, i) =>
        '<div class="dual-stage" data-dual-stage="' + (i + 1) + '"' + (i ? ' hidden' : '') +
        '><h3>' + stage.title + '</h3>' + stage.body + '</div>').join('') + '</div></div>' +
      '<div class="dual-controls"><div><button type="button" data-dual-prev>← Previous</button>' +
      '<button type="button" data-dual-next>Next →</button><button type="button" data-dual-reset>Reset</button></div>' +
      '<span class="dual-counter" aria-live="polite"></span></div>';

    const svg = lab.querySelector('svg');
    const chart = drawChart(svg);
    const panels = [...lab.querySelectorAll('[data-dual-stage]')];
    const slider = lab.querySelector('[data-dual-scale]');
    const status = lab.querySelector('[data-dual-status]');
    const counter = lab.querySelector('.dual-counter');
    const previous = lab.querySelector('[data-dual-prev]');
    const next = lab.querySelector('[data-dual-next]');
    const reset = lab.querySelector('[data-dual-reset]');
    const redKey = lab.querySelector('.dual-red-key');
    const normalKey = lab.querySelector('.dual-normal-key');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let step = 0;
    let magnitude = 1;
    let animation;
    let current = stateFor(0, magnitude);

    function draw(state) {
      const [separatorAlpha, marginAlpha, cancelAlpha, zeroAlpha, pointAlpha, c, violationAlpha] = state.marks;
      const limit = 1 / (normalLength * c);
      const left = xPixel(1 - limit);
      const right = xPixel(1 + limit);
      const bracketY = yPixel(-1.85);
      chart.boundary.style.opacity = separatorAlpha;
      chart.rightAngle.style.opacity = separatorAlpha;
      chart.separatorLabel.style.opacity = separatorAlpha;
      chart.cancellation.style.opacity = cancelAlpha;
      chart.zeroRing.style.opacity = zeroAlpha;
      chart.band.setAttribute('x', left);
      chart.band.setAttribute('width', right - left);
      chart.band.style.opacity = marginAlpha;
      linePosition(chart.negativeEdge, left, bounds.top, left, bounds.bottom);
      linePosition(chart.positiveEdge, right, bounds.top, right, bounds.bottom);
      chart.edgeLabels[0].setAttribute('x', left - 7);
      chart.edgeLabels[1].setAttribute('x', right + 7);
      chart.bracket.setAttribute('d', 'M ' + left + ' ' + (bracketY - 7) + ' v 14 m 0 -7 H ' + right + ' m 0 -7 v 14');
      chart.bracketLabel.textContent = 'M = ' + format(2 * limit);
      for (const node of [chart.negativeEdge, chart.positiveEdge, ...chart.edgeLabels, chart.bracket, chart.bracketLabel]) {
        node.style.opacity = marginAlpha;
      }
      drawArrow(chart.origins[0], state.v2);
      drawArrow(chart.origins[1], state.v3);
      drawArrow(chart.copies[0], state.copy2);
      drawArrow(chart.copies[1], state.copy3);
      drawArrow(chart.resultant, state.resultant);
      chart.normalLabel.setAttribute('x', xPixel(state.resultant[2]) + 8);
      chart.normalLabel.setAttribute('y', yPixel(state.resultant[3]) - 12);
      chart.normalLabel.style.opacity = state.resultant[4];
      for (const point of chart.points) {
        point.group.style.opacity = pointAlpha;
        point.halo.style.opacity = violationAlpha;
        point.dot.classList.toggle('violated', violationAlpha > 0.5);
      }
    }

    function animate(target, duration, delayAddition = false) {
      cancelAnimationFrame(animation);
      if (motion.matches || !duration) {
        current = target;
        draw(current);
        return;
      }
      const start = current;
      const now = performance.now();
      function frame(time) {
        const t = Math.min(1, (time - now) / duration);
        const eased = t * t * (3 - 2 * t);
        current = {};
        for (const key of Object.keys(target)) {
          current[key] = target[key].map((end, i) => {
            const delayed = delayAddition && (key === 'resultant' && i === 4 || key === 'marks' && i === 2);
            const blend = delayed ? Math.max(0, (eased - 0.65) / 0.35) : eased;
            return start[key][i] + (end - start[key][i]) * blend;
          });
        }
        draw(current);
        if (t < 1) animation = requestAnimationFrame(frame);
      }
      animation = requestAnimationFrame(frame);
    }

    function updateScale() {
      slider.value = magnitude;
      lab.querySelector('[data-dual-scale-value]').value = format(magnitude);
      lab.querySelector('[data-dual-width]').textContent = format(2 / (magnitude * normalLength));
      const scores = training.map(({ x, y }) => y * magnitude * (normal[0] * x[0] + normal[1] * x[1] + bias));
      const minimum = Math.min(...scores);
      const violations = scores.filter(score => score < 1).length;
      lab.querySelector('[data-dual-score]').textContent = format(minimum);
      status.dataset.feasible = String(violations === 0);
      status.textContent = violations
        ? 'Violates the constraints. All three points have signed score below 1.'
        : magnitude === 1
          ? 'Feasible and optimal. The three points sit exactly on the margin.'
          : 'Feasible. The points are beyond the margin, and the strip is narrower.';
      for (const button of lab.querySelectorAll('[data-dual-preset]')) {
        button.setAttribute('aria-pressed', String(Number(button.dataset.dualPreset) === magnitude));
      }
      redKey.hidden = step !== 7 || violations === 0;
    }

    function show(index, instant = false) {
      const oldStep = step;
      step = Math.min(stages.length - 1, Math.max(0, index));
      lab.dataset.step = step + 1;
      panels.forEach((panel, i) => { panel.hidden = i !== step; });
      normalKey.hidden = step < 4;
      previous.disabled = step === 0;
      next.disabled = step === stages.length - 1;
      counter.textContent = 'Step ' + (step + 1) + ' of ' + stages.length;
      svg.setAttribute('aria-label', stages[step].title + '. ' +
        'Training points (0, 0), (0, 2) and (2, 1).');
      if (step === 4 && oldStep < step) {
        const initial = stateFor(3, magnitude);
        current.copy2 = initial.copy2.slice();
        current.copy3 = initial.copy3.slice();
      }
      updateScale();
      animate(stateFor(step, magnitude), instant ? 0 : (step === 4 ? 720 : 360), step === 4 && oldStep < step);
    }

    previous.addEventListener('click', () => show(step - 1));
    next.addEventListener('click', () => show(step + 1));
    reset.addEventListener('click', () => {
      magnitude = 1;
      show(0);
    });
    slider.addEventListener('input', () => {
      magnitude = Number(slider.value);
      updateScale();
      animate(stateFor(step, magnitude), 150);
    });
    for (const button of lab.querySelectorAll('[data-dual-preset]')) {
      button.addEventListener('click', () => {
        magnitude = Number(button.dataset.dualPreset);
        updateScale();
        animate(stateFor(step, magnitude), 370);
      });
    }
    show(0, true);
  }

  document.querySelectorAll('[data-dual-geometry]').forEach(setup);
})();
