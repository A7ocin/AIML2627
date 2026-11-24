(() => {
  'use strict';

  const engine = window.C2Engine;
  const bounds = [-2, 4, -2, 4];
  const colors = { zero: '#83b6ff', one: '#ffb37c', boundary: '#62ddcb', input: '#c49aff', normal: '#ffd166' };
  const configurations = {
    inputs: { w1: 1, w2: 1, bias: -2, x1: 1, x2: 2 },
    weights: { w1: 1, w2: 1, bias: 0, x1: 1, x2: 2 },
    bias: { w1: 1, w2: 1, bias: -2, x1: 1, x2: 2 },
    sign: { w1: 1, w2: 1, bias: -2, x1: 2, x2: 1 },
    distance: { w1: 2, w2: 1, bias: -2, x1: 2, x2: 2, scale: 1 },
  };

  const number = value => String(Number(value.toFixed(3))).replace('-', '−');
  const math = body => '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' + body + '</math>';
  const numeric = value => value < 0 ? '<mrow><mo>−</mo><mn>' + number(-value) + '</mn></mrow>' : '<mn>' + number(value) + '</mn>';
  const subscript = (name, index) => '<msub><mi>' + name + '</mi><mn>' + index + '</mn></msub>';
  const box = (title, body) => '<div class="pg-box"><h3>' + title + '</h3>' + body + '</div>';
  const range = (key, label, min, max, step, value) =>
    '<label>' + label + '<input aria-label="' + label + '" data-pg-setting="' + key +
    '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value +
    '"><output data-pg-output="' + key + '">' + number(value) + '</output></label>';

  function halfPlane(weights, bias, positive) {
    const corners = [[-2, -2], [4, -2], [4, 4], [-2, 4]];
    const polygon = [];
    corners.forEach((point, index) => {
      const next = corners[(index + 1) % corners.length];
      const score = engine.dot(weights, point) + bias;
      const nextScore = engine.dot(weights, next) + bias;
      const inside = positive ? score >= 0 : score < 0;
      const nextInside = positive ? nextScore >= 0 : nextScore < 0;
      if (inside) polygon.push(point);
      if (inside !== nextInside) {
        const ratio = score / (score - nextScore);
        polygon.push(point.map((value, coordinate) => value + ratio * (next[coordinate] - value)));
      }
    });
    return polygon;
  }

  function lineTrace(points, color, width = 3, dash = 'solid') {
    return {
      type: 'scatter', mode: 'lines', x: points.map(p => p[0]), y: points.map(p => p[1]),
      line: { color, width, dash }, hoverinfo: 'skip', showlegend: false,
    };
  }

  class PerceptronGeometry {
    constructor(element) {
      this.element = element;
      this.focus = element.dataset.focus;
      this.state = { ...configurations[this.focus] };
      this.ready = Promise.resolve();
      let controls = '';
      if (this.focus === 'weights') {
        controls = range('w1', 'Weight w₁', -2, 2, 0.25, 1) + range('w2', 'Weight w₂', -2, 2, 0.25, 1);
      }
      if (this.focus === 'bias') controls = range('bias', 'Bias w₀', -4, 2, 0.25, -2);
      if (['inputs', 'sign', 'distance'].includes(this.focus)) {
        controls += range('x1', 'Input x₁', -1, 3, 0.25, this.state.x1);
        controls += range('x2', 'Input x₂', -1, 3, 0.25, this.state.x2);
      }
      if (this.focus === 'sign') controls += '<button type="button" data-pg-action="boundary">Put the point on the line</button>';
      if (this.focus === 'distance') {
        controls += '<label>Multiplier<select aria-label="Multiplier for both weights and the bias" data-pg-setting="scale">' +
          '<option value="1">×1</option><option value="2">×2</option><option value="3">×3</option>' +
          '<option data-pg-point-scale hidden disabled></option></select></label>' +
          '<button type="button" data-pg-action="normalize">Set |score| to 1</button>';
      }
      controls += '<button type="button" data-pg-action="reset" class="pg-reset">Reset</button>';
      const key = this.focus === 'inputs'
        ? '<span style="--pg-key-color:' + colors.input + '">Input vector x</span>'
        : '<span style="--pg-key-color:' + colors.zero + '">Predict 0</span>' +
          '<span style="--pg-key-color:' + colors.one + '">Predict 1</span>' +
          '<span style="--pg-key-color:' + colors.boundary + '">Score-zero line</span>' +
          '<span style="--pg-key-color:' + colors.normal + '">w direction (fixed arrow length)</span>' +
          (['sign', 'distance'].includes(this.focus) ? '<span style="--pg-key-color:' + colors.input + '">Input x</span>' : '') +
          (this.focus === 'distance' ? '<span style="--pg-key-color:#edf4fa">Shortest distance</span>' : '');
      element.innerHTML = '<div class="pg-controls">' + controls + '</div>' +
        '<div class="pg-main"><div class="pg-plot" role="img"></div><div class="pg-reading" aria-live="polite"></div></div>' +
        '<div class="pg-key">' + key + '</div>';
      this.plot = element.querySelector('.pg-plot');
      this.reading = element.querySelector('.pg-reading');
      this.normalizeButton = element.querySelector('[data-pg-action="normalize"]');
      this.pointScaleOption = element.querySelector('[data-pg-point-scale]');
      element.querySelectorAll('[data-pg-setting]').forEach(control => {
        control.addEventListener(control.type === 'range' ? 'input' : 'change', () => {
          this.state[control.dataset.pgSetting] = Number(control.value);
          this.render();
        });
      });
      element.querySelectorAll('[data-pg-action]').forEach(button => {
        button.addEventListener('click', () => {
          switch (button.dataset.pgAction) {
            case 'reset':
              this.state = { ...configurations[this.focus] };
              if (this.pointScaleOption) {
                this.pointScaleOption.hidden = true;
                this.pointScaleOption.disabled = true;
              }
              break;
            case 'boundary':
              Object.assign(this.state, { x1: 1, x2: 1 });
              break;
            case 'normalize': {
              const magnitude = Math.abs(this.unscaledScore());
              if (magnitude === 0) return;
              const scale = 1 / magnitude;
              this.state.scale = scale;
              this.pointScaleOption.value = scale;
              this.pointScaleOption.textContent = '×' + number(scale) + ' (from point)';
              this.pointScaleOption.hidden = [1, 2, 3].includes(scale);
              this.pointScaleOption.disabled = this.pointScaleOption.hidden;
              break;
            }
          }
          this.syncControls();
          this.render();
        });
      });
      this.render();
      this.observer = new ResizeObserver(() => {
        if (this.plot.clientWidth) this.ready = this.ready.then(() => Plotly.Plots.resize(this.plot));
      });
      this.observer.observe(this.plot);
    }

    unscaledScore() {
      const { w1, w2, bias, x1, x2 } = this.state;
      return w1 * x1 + w2 * x2 + bias;
    }

    syncControls() {
      this.element.querySelectorAll('[data-pg-setting]').forEach(control => {
        control.value = this.state[control.dataset.pgSetting];
      });
    }

    render() {
      const state = this.state;
      this.element.querySelectorAll('[data-pg-output]').forEach(output => {
        output.textContent = number(state[output.dataset.pgOutput]);
      });
      const scale = state.scale || 1;
      const weights = [state.w1 * scale, state.w2 * scale];
      const bias = state.bias * scale;
      const point = [state.x1, state.x2];
      const originalScore = this.unscaledScore();
      const score = originalScore * scale;
      const norm = Math.hypot(...weights);
      const prediction = score >= 0 ? 1 : 0;
      if (this.normalizeButton) this.normalizeButton.disabled = originalScore === 0;
      const traces = [];
      const annotations = [];
      let title = '';

      if (this.focus === 'inputs') {
        traces.push(lineTrace([[0, 0], point], colors.input, 4));
        traces.push(lineTrace([[point[0], 0], point, [0, point[1]]], '#8d9ab0', 2, 'dot'));
        annotations.push({ x: point[0], y: point[1], ax: 0, ay: 0, axref: 'x', ayref: 'y', text: '', arrowhead: 3, arrowwidth: 3, arrowcolor: colors.input });
        title = 'A point has one coordinate per feature';
        this.reading.innerHTML = box('Read the coordinates',
          math('<mi mathvariant="bold">x</mi><mo>=</mo><mo>(</mo>' + numeric(point[0]) + '<mo>,</mo>' + numeric(point[1]) + '<mo>)</mo>') +
          '<p>Move ' + number(point[0]) + ' along the horizontal axis and ' + number(point[1]) + ' along the vertical axis.</p>') +
          box('The arrow is the same input', '<p>The input vector starts at the origin and ends at this point. Its two components are the two feature values.</p>');
      } else {
        for (const positive of [false, true]) {
          const polygon = halfPlane(weights, bias, positive);
          traces.push({
            ...lineTrace(polygon, 'transparent', 0), fill: 'toself',
            fillcolor: positive ? 'rgba(255,179,124,.14)' : 'rgba(131,182,255,.14)',
          });
        }
        const boundary = engine.clippedLine(weights, bias, bounds);
        traces.push(lineTrace(boundary, colors.boundary, 4));
        if (norm > 0) {
          const anchor = weights.map(value => -bias * value / (norm * norm));
          const tip = weights.map((value, index) => anchor[index] + 1.2 * value / norm);
          annotations.push({ x: tip[0], y: tip[1], ax: anchor[0], ay: anchor[1], axref: 'x', ayref: 'y', text: '', arrowhead: 3, arrowwidth: 3, arrowcolor: colors.normal });
          annotations.push({ x: tip[0], y: tip[1], text: 'w direction', showarrow: false, xshift: 35, yshift: -22, font: { color: colors.normal, size: 18 } });
          if (this.focus === 'distance') {
            const foot = point.map((value, index) => value - score * weights[index] / (norm * norm));
            traces.push(lineTrace([point, foot], '#edf4fa', 3, 'dash'));
            traces.push({ type: 'scatter', mode: 'markers', x: [foot[0]], y: [foot[1]], marker: { size: 8, color: '#edf4fa' }, hoverinfo: 'skip', showlegend: false });
            const unit = weights.map(value => value / norm);
            const direction = score >= 0 ? 1 : -1;
            const tangent = [-unit[1] * 0.18, unit[0] * 0.18];
            const corner = foot.map((value, index) => value + direction * unit[index] * 0.18);
            traces.push(lineTrace([corner, corner.map((value, index) => value + tangent[index]), foot.map((value, index) => value + tangent[index])], '#edf4fa', 2));
          }
        }
        title = number(weights[0]) + ' x₁ ' + (weights[1] < 0 ? '− ' : '+ ') + number(Math.abs(weights[1])) +
          ' x₂ ' + (bias < 0 ? '− ' : '+ ') + number(Math.abs(bias)) + ' = 0';
        this.renderExplanation(weights, bias, point, score, norm, prediction);
      }
      if (['inputs', 'sign', 'distance'].includes(this.focus)) {
        const textPosition = (point[1] >= 2.5 ? 'bottom' : 'top') + ' ' + (point[0] >= 1.5 ? 'left' : 'right');
        traces.push({
          type: 'scatter', mode: 'markers+text', x: [point[0]], y: [point[1]],
          text: ['x = (' + number(point[0]) + ', ' + number(point[1]) + ')'], textposition: textPosition,
          textfont: { size: 19, color: colors.input }, marker: { color: colors.input, size: 15, line: { color: '#e9d6ff', width: 2 } },
          hovertemplate: 'x₁ = %{x}<br>x₂ = %{y}<extra></extra>', showlegend: false,
        });
      }
      const axis = label => ({
        title: { text: label, standoff: 12 }, range: [-2, 4], dtick: 1,
        gridcolor: '#293548', zerolinecolor: '#9aa9bc', zerolinewidth: 2, constrain: 'domain', fixedrange: true,
      });
      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: '#101722',
        font: { family: 'Segoe UI, sans-serif', color: '#edf4fa', size: 18 },
        margin: { l: 65, r: 45, t: 48, b: 65 },
        title: { text: title, font: { size: 19, color: '#b9c8d7' } },
        xaxis: axis('First feature x₁'), yaxis: { ...axis('Second feature x₂'), scaleanchor: 'x', scaleratio: 1 },
        showlegend: false, annotations, dragmode: false,
      };
      this.plot.setAttribute('aria-label', this.focus === 'inputs'
        ? 'Input point at ' + point.join(', ')
        : 'Decision boundary with weights ' + weights.join(', ') + ' and bias ' + bias + '. Score ' + score + '.');
      this.ready = this.ready.then(() => Plotly.react(this.plot, traces, layout, { displayModeBar: false, responsive: false, scrollZoom: false, staticPlot: true }));
    }

    renderExplanation(weights, bias, point, score, norm, prediction) {
      if (norm === 0) {
        this.reading.innerHTML = box('Both feature weights are zero', '<p>The score equals the bias. Choose a nonzero feature weight to draw a separating line.</p>');
        return;
      }
      if (this.focus === 'weights') {
        const lineEquation = weights[1] === 0
          ? math(subscript('x', 1) + '<mo>=</mo><mn>0</mn>')
          : math(subscript('x', 2) + '<mo>=</mo><mo>−</mo><mfrac>' + subscript('w', 1) + subscript('w', 2) + '</mfrac>' + subscript('x', 1));
        this.reading.innerHTML = box('Weights define a normal',
          math('<mi mathvariant="bold">w</mi><mo>=</mo><mo>(</mo>' + numeric(weights[0]) + '<mo>,</mo>' + numeric(weights[1]) + '<mo>)</mo>') +
          '<p>The yellow arrow is perpendicular to the line and points toward increasing score.</p>') +
          box('Read this line’s slope', lineEquation + '<p>For w₂ ≠ 0, the slope is −w₁/w₂. Setting w₂ = 0 gives a vertical line. Setting w₁ = 0 gives a horizontal line.</p>') +
          box('A common positive scale', '<p>Doubling both weights keeps their direction and this score-zero line.</p>');
      } else if (this.focus === 'bias') {
        this.reading.innerHTML = box('Keep w = (1, 1) fixed', '<p>The yellow normal keeps the same direction. The boundary moves parallel to itself.</p>') +
          box('Rearrange the boundary',
            math(subscript('x', 1) + '<mo>+</mo>' + subscript('x', 2) + '<mo>=</mo>' + numeric(-bias))) +
          box('Read the shift', '<p>When w₀ = 0, the line passes through the origin. Increasing w₀ moves the line against the yellow arrow and expands the class-1 region.</p>');
      } else if (this.focus === 'sign') {
        const expansion = numeric(weights[0]) + '<mo>×</mo>' + numeric(point[0]) + '<mo>+</mo>' +
          numeric(weights[1]) + '<mo>×</mo>' + numeric(point[1]) + '<mo>+</mo><mo>(</mo>' + numeric(bias) + '<mo>)</mo>';
        this.reading.innerHTML = box('Compute the score', math('<mi>s</mi><mo>=</mo>' + expansion + '<mo>=</mo>' + numeric(score))) +
          box('Apply the sign rule', '<div class="pg-result pg-class-' + prediction + '">Predict class ' + prediction + '</div><p>' +
            (score >= 0 ? 'The score is zero or positive.' : 'The score is negative.') + '</p>') +
          box('Find the boundary', '<p>Every point with score 0 lies on the green line. Our perceptron assigns points on the line to class 1.</p>');
      } else {
        const distance = score / norm;
        const originalScore = this.unscaledScore();
        this.reading.innerHTML = box('Find the perpendicular distance',
          math('<msub><mi>d</mi><mtext>signed</mtext></msub><mo>≈</mo><mfrac>' + numeric(score) + numeric(norm) + '</mfrac><mo>≈</mo>' + numeric(distance)) +
          '<p>The white segment meets the line at a right angle. Its length is |d' + '<sub>signed</sub>| = ' + number(Math.abs(distance)) + '.</p>') +
          box('Compare score and distance', '<p>Score s = ' + number(score) + '<br>Weight vector length ‖w‖ = ' + number(norm) + '<br>Signed distance = ' + number(distance) + '</p>') +
          box('Choose a scale for the score', originalScore === 0
            ? '<p>The point is on the boundary. Its score stays 0 at every scale.</p>'
            : '<p>Original score: ' + number(originalScore) + '. To get ' + (originalScore > 0 ? '+1' : '−1') +
              ', use 1 ÷ ' + number(Math.abs(originalScore)) + ' as the multiplier for both weights and the bias. The line and distance stay fixed.</p>');
      }
    }
  }

  const widgets = Array.from(document.querySelectorAll('.c34-geometry'), element => new PerceptronGeometry(element));
  if (widgets.length) window.deckReady = Promise.all([window.deckReady, ...widgets.map(widget => widget.ready)]);
})();
