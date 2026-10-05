# Review results

- All 46 slides rendered at 1920 × 1080 and visually inspected in 12 contact sheets. The enlarged confounding diagram and corrected chart-axis layout also received full-size inspection.
- Text bounds, overlap, SVG labels, chart labels and footer clearances checked on every slide at 1920 × 1080, 1366 × 768 and 1024 × 768.
- 558 interactive configurations inspected: every original observation selector, source set/degree/overlay choices, parameter extremes, exact OLS behavior, repeated-sample settings, t-tail settings and diagnostic scenarios.
- Pointer-driven checks exercised drag zoom, Pan and Reset view on all ten charts that expose those controls. Original chart legend toggling and hover tooltips were checked. The residual lab's exact OLS result remains unchanged when residual segments are toggled. The t lab's source button reproduces the independently checked p-value.
- Full-deck keyboard navigation and direct entry to selected slide URLs checked.
- Browser tests blocked external HTTP requests. The final run reported zero external requests and zero JavaScript errors.
- 660 numerical checks passed, including independent SciPy slope statistics, p-values, confidence limits and t densities; analytic OLS versus QR; rank-deficient and constant-response cases; finite-ensemble bias/variance identities; and diagnostic residual equations.
- Browser checks verified that every original x/y array remains numerically identical after styling and interaction.

Review corrected a crowded corner between the bias plot's x/y tick labels, separated the dense source-chart legend from its axis title, and enlarged the causal diagram. The original underfitting chart's fixed range was removed to expose all observations. Source numerical discrepancies are documented separately in `notes/source-map.md` and `notes/numerical-review.json`.

These checks cover the supplied examples, interactions and viewport sizes in Chrome. They do not claim exhaustive browser compatibility or validate the source data's provenance. The PDF and gallery are static; the HTML deck contains the working demonstrations.
