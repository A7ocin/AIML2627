## Active split packs · review of 2 November 2026

The teaching files are `../../09_Regression_Part_1/` and `../../10_Regression_Part_2/`, each with `index.html` and `handout.html`. Edit these files directly; the historical combined-deck builder below must not regenerate them. The current packs contain 46 and 42 rendered slides, 40 and 35 reading sections, and 6 and 8 interactive examples.

`css/review.css` provides shared card spacing, native MathML layout and reading styles. `js/review.js` controls the six-step normal-equation walkthrough. Each mathematical slide has a local symbol key; both handouts have full symbol reference tables. Their JSON-encoded standalone labs use the same runtime and their static print previews were refreshed. Keep mathematical panels synchronized between slides and handouts.

`notes/coverage-review-20261029.json` records the topic-by-topic mathematical review. The seven chart datasets retain their original coordinates. The numerical engine now also supports a controlled two-predictor regression example; all 711 engine checks pass, including independent NumPy/SciPy references for its three samples. The twelve regression questions in the local bank and existing live event RBCJRAP were strengthened and verified after reload. Preserve their stable IDs, URLs, question types and answer positions. Changes to question wording require both regeneration of the local artifacts and an in-browser edit of the existing live form. Placement-only changes require local regeneration.

Part 2 now moves from a short recap and repeated-prediction diagrams through bias–variance, sampling uncertainty, slope tests and confidence intervals, then multiple regression, conditional interpretation, confounding and LINE assumptions. Its eight labs and handout print previews share the revised controls and calculations. The p-value and adjustment questions follow their worked examples. The review includes all 42 rendered slides, all formula panels, eight embedded handout examples, and narrow-screen reading checks.

Part 1 slides 32–36 explain the matrix objective, a three-observation residual example, the gradient intuition, a six-step derivation ending in the inverse formula, and degree versus coefficient selection. The separate independent-column/inverse slide was removed; its detailed handout section remains. Their handout sections preserve the full explanation and all six derivation comments.

The Part 2 bias–variance section uses `f(x;𝒟)` for the prediction learned from dataset `𝒟`, blackboard `𝔼` for expectation and `Var(ε)` for the noise term. All symbols in its equations, inline explanations and handout reference are native MathML. Preserve this convention when editing the decomposition or example notes.

A shared five-metric recap answers “What does it show me?” for RSS, TSS, RSE, R² and test RMSE. It appears at the end of Part 1 (slide 44) and in the existing opening recap of Part 2 (slide 3), with matching handout tables.

The five-metric recap tables now include native MathML formulas and a symbol key. RSE uses n − q, with q the number of independent fitted coefficients including the intercept (q = 2 for a line); test RMSE uses the separate test-case count. The handout tables stack by metric on narrow screens.

---

# AIML · Lesson 4 · Regression

Open `index.html` in Chrome or Edge. The 46-slide deck follows the style of the previous four lectures. All charts, data and libraries are local, so it works directly from disk without a server, course login or internet connection.

Use arrow keys or the bottom navigation to change slides. Escape opens the overview. Inside an interactive section, use its controls; sliders and selectors support the keyboard. Charts support hover, drag-to-zoom, Pan, Reset view and legend toggling where relevant.

| Slide | Interactive section | Included behavior |
| --- | --- | --- |
| 3 | Original linear-looking observations | Inspect all 25 source points |
| 5 | Residual and parameter explorer | Move the line, show residuals, fit exact OLS |
| 9 | Original supplied line | Compare source line and recomputed OLS |
| 14 | Original train/test chart | Inspect either set and compare RMSE |
| 20 | Original overfitting chart | Select degrees 1, 5, 15, 23 or show all curves |
| 22 | Original underfitting chart | Compare degrees 0, 1, 2 with all observations visible |
| 25 | Repeated-sample bias and variance | Change degree, sample size, seed and inspected x |
| 28 | Original uncertain-slope example | Inspect 90 points and recomputed coefficient statistics |
| 31 | Student t tails | Change t and degrees of freedom; load the source statistic |
| 36 | Original ice-cream/shark example | Explore the association and recomputed statistics |
| 40 | Residual diagnostics | Compare four synthetic patterns on two horizontal axes |

All seven original chart payloads retain their original numerical coordinates. Their visual styling is adapted to the deck. The added labs calculate their results locally. Repeated-sample and diagnostic examples use reproducible seeded randomness.

## Review and teaching material

- `_review/index.html`: gallery of all rendered slides.
- `_review/AIML-Regression-reviewed.pdf`: static 46-page handout. Use the HTML deck for the working interactions.
- `_review/audit.json`: browser, layout and interaction checks.
- `notes/slide-notes.md`: teaching explanations and qualifications, also embedded in the HTML.
- `notes/source-map.md`: source coverage and documented corrections.
- `tests/reference.json`: independent SciPy reference statistics used to check the browser calculations.
- `notes/numerical-review.json`: independently recomputed source-data statistics, including polynomial fits.

The course text and its plotted data disagree in several places. The deck labels the supplied line separately from recomputed OLS, recalculates slope tests from the actual observations, corrects the underfitting chart's clipped range, and distinguishes reported high-degree metrics from a newly computed fit. Details are in the source map.

## Editing and verification

Edit content in `tools/build-deck.py`, then run `python tools/build-deck.py`. The main styles are in `css/regression.css`; inherited theme files are alongside it. `js/engine.js` contains the numerical routines, `js/widgets.js` the controls and Plotly views, and `js/visuals.js` the SVG illustrations.

Source JSON files live in `data/`. `js/course-data.js` embeds the same data so local-file viewing needs no fetch call. If intentionally changing the JSON files, regenerate the embedded payload too.

Run `node tests/engine.test.js` for numerical checks. `node tests/render-review.js` regenerates the screenshots, gallery, PDF and audit; it requires Chrome and `puppeteer-core` at the paths near the top of that script. `python tools/contact-sheets.py` requires Pillow. Developer review dependencies are separate from the slide runtime.

`python tools/verify-source.py` regenerates the independent numerical review using NumPy and SciPy. It evaluates the local source payloads and does not require network access.

Reveal.js and Plotly.js 3.2.0 are bundled in `lib/`, with their copyright/license headers retained. No runtime installation is needed.

The linear-regression introduction now uses three consecutive slides: an approximate prediction rule, a worked same-input/different-response illustration, and the observation equation with a random-error term. Their handout sections explain the meaning of approximately equal, the intercept and slope, the zero conditional error mean assumption, and the distinction between unobserved errors and fitted residuals.

Part 2 inference controls now use `js/inference-models.js` and `js/inference-interactions.js`: an adjustable t ruler, a two-sided tail probability, configurable sampled data with OLS/mean-only comparison, and repeated 95% slope intervals. `js/review.js` also supports a progressive row of equivalent standard-error formulas. The original 90 observations and numerical engine remain unchanged.

Part 2 discussion notes revision: two slides now introduce the purpose of the slope test and a matched height–weight scatter comparison before the observed t formula. Both plots have n = 16, identical heights and axes, fitted slope 1 kg/cm, and independently checked slope SEs 0.10 and 0.50 kg/cm (t = 10 and 2). The sampling standardization is explicitly theoretical. The SE walkthrough explains the rise/run analogy and distinguishes estimated uncertainty from realized error. A static p-value explanation separates random repeated-study T from fixed observed t, including observed t = 0 and p = 1. Its dedicated interactive exploration follows on the next slide. The handout retains eight distinct labs, refreshed previews, expanded explanations and a matching notation reference. Question wording is unchanged, with local placements regenerated for the two-slide shift.
