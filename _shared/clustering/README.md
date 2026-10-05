# AIML — Lesson 7: Clustering

Open `index.html` in Chrome, Edge, or another modern browser. The 54-slide presentation includes all assets locally and needs no server, login, or network connection.

The lecture follows the visual style of the preceding AIML packs. Its 14 interactive sections retain all eight original course charts and add six teaching experiments. The original K-means animation includes all five frames. All four preprocessing panels remain available through a view selector.

## Navigation and controls

- Use the arrow keys or bottom navigation buttons to change slides. Overview shows the slide grid; Escape also toggles it.
- Use a chart's Zoom or Pan button to choose the pointer interaction. Reset view restores the complete chart.
- Use Step, Play/Pause, and Reset in the K-means and EM demonstrations. Playback pauses when leaving a slide.
- Select K and initialization in the added K-means trace; its assignment and mean-update operations are shown separately.
- Inspect individual observations in the silhouette and Gaussian-mixture labs.
- Change linkage and merge count in the hierarchy lab. A horizontal cut is shown where consecutive merge heights permit it.
- Rotate the PCA projection, choose Best PC, and toggle projection lines.
- Reference links are optional external reading; the presentation itself runs offline.

## Contents

1. Clustering without supplied labels
2. K-means: objective, assignment, updates, initialization, limitations
3. Choosing K: distortion, elbow, Euclidean silhouette
4. Gaussian mixtures: densities, probabilities, responsibilities
5. Expectation–maximization: weighted updates and limitations
6. Hierarchical clustering: dendrograms and four linkage methods
7. PCA: centering, covariance, eigenvectors, projection, reconstruction
8. Scaling and whitening

`_review/index.html` is the rendered preview gallery. `_review/AIML-Clustering-reviewed.pdf` is a static 54-page handout. Use the HTML presentation for interaction.

`notes/source-map.md` documents source assets, added experiments and content corrections. `notes/slide-notes.md` contains teaching notes, and `notes/slide-manifest.json` lists the slides.

## Rebuilding and verification

The authored content lives in `tools/content.py`. Run `python tools/build-deck.py` to rebuild the HTML and notes.

`tools/prepare-models.py` reproduces the added numerical data from the supplied local JSON; it requires NumPy, SciPy and scikit-learn. The recorded versions are in `notes/numerical-review.json`. The browser itself does not require Python or those libraries.

`node tests/engine.test.js` checks numerical calculations against independently prepared references. `node tests/render-review.js` renders all slides, tests interactive states and real controls, verifies offline loading, and exports the gallery and PDF. The render harness uses locally installed Chrome and Puppeteer; adjust its executable and module paths for another workstation. `python tools/contact-sheets.py` generates compact visual review sheets and requires Pillow.

Original course: Alessandro Torcinovich, [7 — Clustering](https://www.aretor.it/courses/aiml2526/lessons/07_clustering/). Local Reveal and Plotly distributions retain their license headers. The course attribution and its stated license are recorded in the source map.
