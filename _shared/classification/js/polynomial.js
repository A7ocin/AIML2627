(function () {
  'use strict';
  const data = window.CL_POLYNOMIAL_DATA;
  document.querySelectorAll('.cl-polynomial-widget').forEach(root => {
    const plot = root.querySelector('.cl-polynomial-plot');
    const summary = root.querySelector('.cl-polynomial-summary');
    const controls = [...root.querySelectorAll('[data-poly-degree]')];
    const pointColors = ['#6ea8fe', '#f4a261'];
    function render() {
      const selected = controls.filter(c => c.checked).map(c => Number(c.dataset.polyDegree));
      const traces = [0, 1].map(c => ({
        type: 'scatter', mode: 'markers', name: 'Observed class ' + c,
        x: data.x.filter((x, i) => data.y[i] === c),
        y: data.y.filter(y => y === c),
        marker: { color: pointColors[c], size: 8, opacity: 0.85 },
        hovertemplate: 'Input %{x:.3f}<br>Observed class %{y}<extra></extra>'
      }));
      selected.forEach(degree => {
        const fit = data.fits[degree];
        traces.push({ type: 'scatter', mode: 'lines', name: 'Degree ' + degree,
          x: data.grid, y: fit.values, line: { color: fit.color, width: 3 },
          hovertemplate: 'Input %{x:.3f}<br>Fitted value %{y:.3f}<extra>Degree ' + degree + '</extra>' });
      });
      const layout = {
        paper_bgcolor: 'transparent', plot_bgcolor: '#0c1320',
        font: { family: 'Segoe UI, Arial', size: 22, color: '#e8ecf4' },
        margin: { l: 90, r: 25, t: 18, b: 112 },
        xaxis: { title: { text: 'Cholesterol measurement (illustrative scale)', standoff: 14 }, range: [0, 1],
          tickvals: [0, 0.25, 0.5, 0.75, 1], gridcolor: '#273144', zeroline: false },
        yaxis: { title: { text: 'Observed class / fitted value', standoff: 15 }, range: [-0.35, 1.4],
          tickvals: [0, 0.5, 1], gridcolor: '#273144', zeroline: false },
        legend: { orientation: 'h', y: -0.24, x: 0, font: { size: 20 }, itemclick: false, itemdoubleclick: false },
        shapes: [
          { type: 'rect', xref: 'paper', x0: 0, x1: 1, y0: -0.35, y1: 0, fillcolor: '#ef7188', opacity: 0.10, line: { width: 0 }, layer: 'below' },
          { type: 'rect', xref: 'paper', x0: 0, x1: 1, y0: 1, y1: 1.4, fillcolor: '#ef7188', opacity: 0.10, line: { width: 0 }, layer: 'below' },
          ...[0, 1].map(y => ({ type: 'line', xref: 'paper', x0: 0, x1: 1, y0: y, y1: y, line: { color: '#aebed0', width: 1, dash: 'dot' }, layer: 'below' }))
        ],
        annotations: [{ xref: 'paper', x: 0.99, y: 1.33, text: 'Outside probability range',
          showarrow: false, xanchor: 'right', font: { size: 18, color: '#f5b3bd' } }]
      };
      root.ready = Plotly.react(plot, traces, layout, { displayModeBar: false, responsive: true });
      summary.replaceChildren();
      const span = text => { const s = document.createElement('span'); s.textContent = text; summary.append(s); };
      if (!selected.length) {
        span('Select one or more degrees to compare. The patient observations stay unchanged.');
      } else {
        const values = selected.flatMap(d => data.fits[d].values);
        span('Selected degrees: ' + selected.join(', '));
        span('Lowest fitted value: ' + Math.min(...values).toFixed(3));
        span('Highest fitted value: ' + Math.max(...values).toFixed(3));
      }
    }
    controls.forEach(c => c.addEventListener('change', render));
    root.querySelector('[data-poly-compare]').addEventListener('click', () => {
      controls.forEach(c => { c.checked = [1, 3, 9].includes(Number(c.dataset.polyDegree)); }); render();
    });
    root.querySelector('[data-poly-reset]').addEventListener('click', () => {
      controls.forEach(c => { c.checked = Number(c.dataset.polyDegree) === 1; }); render();
    });
    render();
    const resize = () => { if (plot.getBoundingClientRect().width) Plotly.Plots.resize(plot); };
    if (window.Reveal) Reveal.on('slidechanged', () => {
      if (Reveal.getCurrentSlide()?.contains(root)) resize();
    });
    new ResizeObserver(resize).observe(root);
  });
})();
