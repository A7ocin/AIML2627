# Classification 2 — final review

Reviewed 12 September 2026.

The deck contains 47 slides and 14 interactive sections: all nine original course charts and five added teaching labs. Source data, Plotly, Reveal, model parameters, and presentation assets are included locally. The HTML presentation works offline; the PDF is a static handout. The original 3D chart requires WebGL.

## Visual and browser review

- Rendered and visually reviewed all 47 slides; the numbered PNGs and contact sheets record the final layout.
- Browser audit passed at three viewport sizes, with no reported slide, responsive-layout, or interactive-state issues.
- Checked 455 interactive configurations and 27 interaction groups, including keyboard sliders, perceptron stepping and playback, chart panning and zooming, reset buttons, legends, tooltips, and actual pointer rotation of the 3D plot.
- Checked keyboard navigation and direct slide links. The browser reported no errors or attempted external network requests.
- Fixed reset behavior after mouse zoom on charts with linked axes. Preserved the live 3D camera when changing data visibility or toggling the added separating plane.
- Adjusted plot sizing, axis labels, margin legends, card alignment, and diagram geometry. The cover uses the lecture's actual margin data.

## Numerical and content review

- Numerical engine checks passed 57,064 assertions, including 5,715 independently calculated decision scores across 15 fitted SVM models.
- Compared 18 perceptron training configurations with independent Python reference traces.
- Verified all 300 lifted source points satisfy z = x² + y² and retain their original coordinates and labels.
- Checked the added maximum-margin example against an independent linear SVM solution.
- Distinguished source examples from added model fits and explained threshold/bias conventions, convergence assumptions, soft margins, kernel validity, and the limitations of training accuracy.

See `audit.json`, `engine-audit.json`, and `../notes/source-map.md` for detailed evidence and provenance. The PDF contains all 47 slides; use `../index.html` for interaction.
