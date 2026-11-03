## Active split packs · review of 2 November 2026

The teaching files are `../../09_Regression_Part_1/` and `../../10_Regression_Part_2/`, each with `index.html` and `handout.html`. Edit these files directly; the historical combined-deck builder below must not regenerate them. The current packs contain 46 and 42 rendered slides, 40 and 39 reading sections, and 6 and 7 interactive examples.

`css/review.css` provides shared card spacing, native MathML layout and reading styles. `js/review.js` controls the six-step normal-equation walkthrough. Each mathematical slide has a local symbol key; both handouts have full symbol reference tables. Their JSON-encoded standalone labs use the same runtime and their static print previews were refreshed. Keep mathematical panels synchronized between slides and handouts.

`notes/coverage-review-20261029.json` records the topic-by-topic mathematical review. The seven chart datasets retain their original coordinates. The numerical engine now also supports a controlled two-predictor regression example; all 711 engine checks pass, including independent NumPy/SciPy references for its three samples. The twelve regression questions in the local bank and existing live event RBCJRAP were strengthened and verified after reload. Preserve their stable IDs, URLs, question types and answer positions. Changes to question wording require both regeneration of the local artifacts and an in-browser edit of the existing live form. Placement-only changes require local regeneration.

Part 2 now moves from a short recap and repeated-prediction diagrams through bias–variance, sampling uncertainty, slope tests and confidence intervals, then multiple regression, conditional interpretation, confounding and LINE assumptions. Its seven labs and handout print previews share the revised controls and calculations. The p-value and adjustment questions follow their worked examples. The review includes all 42 rendered slides, all formula panels, seven embedded handout examples, and narrow-screen reading checks.

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

Part 2 discussion notes revision: two slides now introduce the purpose of the slope test and a matched height–weight scatter comparison before the observed t formula. Both plots have n = 16, identical heights and axes, fitted slope 0.60 kg/cm, and independently checked slope SEs 0.06 and 0.30 kg/cm (t = 10 and 2). The sampling standardization is explicitly theoretical. The SE walkthrough explains the rise/run analogy and distinguishes estimated uncertainty from realized error. A static p-value explanation separates random repeated-study T from fixed observed t, including observed t = 0 and p = 1. Its dedicated interactive exploration follows on the next slide. The handout retains eight distinct labs, refreshed previews, expanded explanations and a matching notation reference. Question wording is unchanged, with local placements regenerated for the two-slide shift.

The Part 2 correlation principle slide uses the ice-cream/shark example and a cartoon innocent cone beside a shark. It introduces hot weather as a possible common cause before the ice-cream/shark association lab. Its title is “Correlation does not imply causation”. The same explanation and diagram appear in the handout. The pack now has 45 rendered slides, 38 reading sections and eight labs.

Part 2 slide 15 introduces the height–weight observations before the slope-test purpose slide. The updated simulated adult examples use 16 irregular heights from 155 to 195 cm and plausible weights. Their fitted slope is 0.60 kg/cm, their slope SEs are 0.06 and 0.30 kg/cm, and t remains 10 and 2. All three plots, the sample rows, the explanations and both handout chapters use the recalculated data in `data/height-weight-teaching.json`. Part 2 now has 45 rendered slides, 38 reading sections and eight labs.

Part 2 slide 17 visualizes the three-step slope-test reasoning immediately after its explanation: assume a flat population mean, fit 500 hypothetical noisy samples at the same 16 heights, then compare their slope histogram with the observed +0.60 kg/cm. Five fitted lines are shown in the middle panel. This is an illustrative plug-in noise simulation rather than an exact p-value calculation; the handout explains the later Student t test and the simulation limits.

The Part 2 p-value lab now selects n (observations) instead of degrees of freedom and defines n in the widget footer. It still uses n − 2 internally. An explicit REJECT label is red for p < α, and DON'T REJECT is yellow for p ≥ α, using unrounded probabilities. Loading the actual 90-point result restores n = 90. The handout runtime, explanation and static poster share the revised controls and decision labels.

The complete-fit lab now explains its conclusion in three live steps below the chart: divide the fitted slope minus zero by its SE, compare the resulting two-sided p-value with α = 0.05, and explain the evidence in plain language. Native MathML formulas and red/yellow decisions update with sample settings. Null samples that reject retain an explicit false-positive explanation. The mean-only RSS remains available in the comparison view. The numerical engine is unchanged, and the handout explanation and poster are synchronized.

Part 2 omits the p-value interpretation question L04-C07 from its presentation using `data-wooclap-exclude` on the slides container. The remaining five questions retain their order. There are now 44 rendered slides; the reusable bank, existing live question and handout are unchanged.

Part 2 also omits the former slides 23–24: the confidence-interval teaching section `interval` has Reveal native hidden visibility, and its question `L04-O02` is excluded from presentation. The deck now moves directly from `uncertainty-lab` to `multiple-intro`, with 42 rendered slides and four class/discussion questions. Retaining the hidden source section preserves reusable bank mappings. Handout sections and labs are unchanged.

Part 2 slide 27 now introduces the normalized ice-cream sales/shark-attack observations, fitted OLS line and metric table immediately before the correlation/causation cartoon. All 80 training and 20 test points are retained. The table recomputes R² = 0.5300, RSE = 0.1525, test RMSE = 0.1487 and slope t = 9.3792, with p < 0.01. The displayed t is calculated from those points. The new handout section matches the plot, results and interpretation. The active pack has 43 rendered slides, 39 reading sections and eight handout labs.

Part 2 omits the former slide 25 (`L04-O03`) using its existing question-exclusion setting. The correlation principle slide is now 27, with the rebuilt native SVG beach scene and a link to Tyler Vigen’s Spurious Correlations. The same illustration and link appear in the handout. Both regression packs’ slides, handouts and embedded lab sources were audited: old-course links and section references were already absent. General textbook/documentation references remain. The active Part 2 deck has 42 rendered slides.

Part 2 slide 31 labels the ice-cream sales and temperature coefficients with per-unit predicted-change explanations. Shark risk is fixed on Y. Sales only fixes X to ice-cream sales; Sales + temperature allows X to switch between sales and temperature. Returning to Sales only resets X to sales. The same 80 observations and fitted coefficients are preserved when X changes. Conditional slices hold the other included predictor at its sample mean, and point color shows the other predictor. All nine valid model/sample/view combinations were checked in the browser. Slide 30, handout explanations and the lab preview use the same coefficient definitions.

Part 2 LINE revision (3 November 2026): rendered slides 33 and 34 split the four assumptions into L/I and N/E. Each block includes an editable schematic, an intuitive explanation and its purpose. The introduction connects the assumptions to standard errors and p-values. Symbol keys and notes explain conditional mean zero, equal variance, normality, independence and the separate full-column-rank requirement. The former slide 34 residual explorer and its corresponding handout lab were removed. The residual-reading section remains. Handout contents and both LINE sections match the slides. Counts remain 42 rendered slides and 39 reading sections, with seven labs.
