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
