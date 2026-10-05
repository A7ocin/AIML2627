# AIML — Lesson 6: Classification 2

Open **index.html** in Chrome or Edge. The 47-slide pack matches the existing AIML theme and runs offline, including all 14 interactive sections. Keep this folder together when moving it.

- Arrow keys and the bottom buttons navigate slides; Overview opens the slide grid. Click outside a focused control before using arrow keys for slide navigation.
- The nine original charts retain hover and legend controls. Two-dimensional charts support zoom, pan and Reset view.
- The original 3D chart supports pointer rotation, pan, scroll zoom, camera reset and a toggle for an added separating plane. A browser with WebGL support is required for this chart.
- The perceptron lab has Step, Epoch, Play/Pause and Reset. It pauses automatically when you leave the slide.
- Added labs explore AND/OR thresholds, actual perceptron updates, geometric margin, the quadratic kernel identity and 15 fitted SVM models.
- `_review/index.html` is the static preview gallery. `_review/AIML-Classification-2-reviewed.pdf` is the static handout. Use the main HTML for interactivity.
- `notes/slide-notes.md` contains speaker notes; they are also embedded in the HTML. `notes/source-map.md` records source coverage, data provenance, assumptions and corrections.

## Development

Rebuild slide content with `python tools/build-deck.py`. Regenerate fitted model assets with `python tools/fit-models.py` (NumPy, SciPy and scikit-learn) and the independent perceptron references with `python tools/verify-perceptron.py`. `node tests/engine.test.js` checks numerical behavior.

`node tests/render-review.js` renders the deck and audits layouts and interactions using Chrome and the existing workspace's Puppeteer installation. `python tools/contact-sheets.py` creates visual contact sheets using Pillow. These development dependencies are not needed to view the presentation.
