# AIML · Lesson 3 · Introduction to Machine Learning

Open `index.html` in Chrome or Edge. This 36-slide deck follows the approved History, Search and Constraint Satisfaction style. All assets and interactive charts work directly from disk, without a server or internet connection.

Use arrow keys or the bottom navigation to change slides. Escape opens the overview. Within a lab, use its controls. Bandit playback pauses when leaving the slide, opening the overview or hiding the browser tab.

| Slide | Interactive section | What you can do |
| --- | --- | --- |
| 9 | Learning signals | Classify six scenarios and reveal the reasoning |
| 11 | Self-supervised targets | Change the sentence and hidden word; reveal its recorded target |
| 15 | Exploration and exploitation | Pull one of three arms, run an epsilon-greedy policy, change seed or epsilon, inspect true rates, and replay history |
| 24 | Original course observations | Hover, zoom, pan, reset the view and inspect any of the 25 points using a selector |
| 26 | Original course hypothesis | Compare the two original traces, toggle them with the legend, and inspect predictions and residuals |
| 31 | Generalization | Fit different polynomial degrees to training data, change noise or seed, and compare training and validation error |

The original chart coordinates are retained exactly. The additional bandit and regression examples use seeded data so demonstrations can be repeated. Back in the bandit replays the recorded history; manual pulls become available again at the latest state. Reset starts the same chosen seed again. Each run is limited to 60 pulls.

## Included material

- `_review/index.html`: rendered preview gallery.
- `_review/AIML-Intro-ML-reviewed.pdf`: 36-page static handout. The HTML deck contains the working interactions.
- `_review/audit.json`: layout and browser checks.
- `notes/slide-notes.md`: teaching notes and qualifications for each slide, also embedded in the HTML.
- `notes/source-map.md`: source coverage, original interactive assets and editorial corrections.
- `data/nonlinear.json` and `data/nonlinear_mod.json`: unchanged original chart payloads, serialized locally.

## Editing and checks

Edit slide content in `tools/build-deck.py`, then run `python tools/build-deck.py`. Styling lives in `css/ml.css` alongside the inherited theme. `js/ml-engine.js` contains the numerical routines; `js/widgets.js` handles controls and plots; `js/visuals.js` draws the vector illustrations. `js/course-data.js` embeds the chart payloads so local-file viewing needs no fetch request. If the JSON data is intentionally edited, regenerate the corresponding embedded data too.

Run `node tests/engine.test.js` for numerical checks. The optional browser review script, `node tests/render-review.js`, requires Chrome and `puppeteer-core` at the paths specified at the top of the script. It regenerates the screenshots, gallery, PDF and audit. `python tools/contact-sheets.py` uses Pillow to build the contact sheets. The numerical reference fixture was generated independently with NumPy; NumPy is not required to view the slides or run the JavaScript checks.

Runtime libraries are bundled in `lib/`: Reveal.js and Plotly.js 3.2.0. Their copyright/license headers are retained. Developer review dependencies are separate from the presentation runtime.
