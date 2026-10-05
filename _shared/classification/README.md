# AIML — Lesson 5: Classification 1

Open **index.html** in Chrome or Edge. This 46-slide pack matches the existing AIML theme and runs offline, including all ten interactive sections. Keep the folder together when moving it.

- Arrow keys navigate; the bottom buttons also provide navigation and overview. Click outside a focused slider before using arrows to advance slides.
- Charts support hover, legend toggling, zoom, pan and Reset view. Sliders and selectors have keyboard support.
- The validation lab locks the selected K before showing a test score. Restart repeats the same classroom split.
- `_review/index.html` is the static preview gallery. `_review/AIML-Classification-1-reviewed.pdf` is the static 46-page handout. Interactivity is available in the main HTML presentation.
- `notes/slide-notes.md` contains speaker notes, also embedded in the HTML. `notes/source-map.md` documents course coverage, data provenance and technical clarifications.

The four original chart payloads are in `data/`; local copies are embedded for direct file opening. Six additional labs demonstrate decision costs, Gaussian Naive Bayes, logistic parameters/thresholds, KNN classification, KNN regression and validation.

Rebuild content with `python tools/build-deck.py`. Check numerical behavior with `node tests/engine.test.js`; regenerate the independent reference values with `python tools/verify-source.py` (NumPy/SciPy required). Rendering uses the existing workspace's Puppeteer installation and Chrome through `node tests/render-review.js`. Create contact sheets with `python tools/contact-sheets.py` (Pillow required). These development dependencies are not needed to view the deck.
