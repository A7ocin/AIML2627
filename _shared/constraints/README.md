# AIML · Lesson 2 · Constraint Satisfaction Problems

Open `index.html` in Chrome or Edge. The 38-slide presentation and all six labs work directly from disk, without a server or an internet connection. Its theme, typography, navigation and slide dimensions follow the approved History and Search packs.

Use the arrow keys or bottom navigation to move between slides; Escape opens the overview. Inside a lab, use its controls. Playback pauses when leaving the slide, opening the overview or hiding the browser tab.

| Slide | Interactive lab | Controls |
| --- | --- | --- |
| 8 | Assignment evaluator | Set or clear each variable; see true, false and pending constraints |
| 12 | Original course DFS tree | Play, Back, Next, Reset, speed and value order; hover or focus a node to inspect its context |
| 18 | Original course GAC network | Play, Back, Next, Reset, speed and three examples; inspect domains, worklist and support witnesses |
| 23 | GAC with domain splitting | Step through branching and propagation for the same three examples |
| 29 | Local search on graph coloring | Compare strict improvement, random sampling, random walk, tabu and annealing; change initialization and random seed |
| 32 | Annealing acceptance | Change score difference, temperature and test draw; see the exact probability and decision |

The local-search lab uses reproducible seeded runs with a 40-step budget. Reset repeats the selected run. A run that does not find a solution does not prove that none exists.

## Review and teaching material

- `_review/index.html`: gallery of all rendered slides.
- `_review/AIML-Constraints-reviewed.pdf`: 38-page static handout. Use the HTML presentation for interactivity.
- `_review/audit.json`: browser, layout and interaction validation results.
- `notes/slide-notes.md`: explanations and teaching notes for each slide; these are also embedded in the HTML.
- `notes/source-map.md`: source coverage, retained interactions and corrections.

## Editing and rebuilding

Edit slide content in `tools/build-deck.py`, then run `python tools/build-deck.py`. Layout lives in `css/csp.css`; inherited theme files are `css/theme-base.css` and `css/search.css`. The engine, SVG drawings and widgets live in `js/csp-engine.js`, `js/visuals.js` and `js/widgets.js`.

Run `node tests/engine.test.js` for algorithm checks. The optional browser review script, `node tests/render-review.js`, requires Chrome and `puppeteer-core` at the path configured near the top of that script. It regenerates screenshots, gallery, PDF and audit. `python tools/contact-sheets.py` requires Pillow and regenerates contact sheets.

All runtime assets are included. Developer review tools require their separately installed dependencies. `js/source-tree.js` retains the source tree as a regression fixture; it is not loaded by the presentation.
