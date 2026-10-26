# Introduction to machine learning · split packs

The active teaching material is in `../../07_Intro_ML_Part_1/` and `../../08_Intro_ML_Part_2/`. Each contains `index.html` (slides) and `handout.html` (reading material with standalone interactive examples). Open these files directly in a browser or through the course home page. All teaching assets work offline.

Part 1 moves from learning components to learning settings, then application domains. Part 2 recaps supervised regression, introduces variables and spaces, organizes observations, defines functions and hypotheses, then explains fit and generalization. The 24 October 2026 review restores technical definitions from the original lesson, with concise symbol keys on the slides and fuller explanations in the handouts.

| Pack | Interactive slide IDs | Purpose |
| --- | --- | --- |
| Part 1 | `mask-lab` | Construct a self-supervised pair from recorded text |
| Part 1 | `bandit-lab` | Explore uncertain actions and compare an ε-greedy policy |
| Part 1 | `signal-lab` | Classify six scenarios after the settings have been introduced |
| Part 2 | `observations-lab` | Inspect all 25 original fertilizer observations |
| Part 2 | `hypothesis-lab` | Compare observations with the original illustrative curve |
| Part 2 | `generalization-lab` | Fit training data and compare held-out validation error |

Use the arrow keys or bottom controls to navigate. Escape opens the overview. Bandit playback pauses when the slide or browser is hidden. The original chart coordinates and numerical engine are preserved. Toy two-predictor examples on the notation slides are explicitly separate from the original one-predictor chart.

Part 1 was reorganized on 26 October 2026 into six numbered chapters, with regression/classification, clustering/generative modeling, self-supervision and reinforcement-learning subsections. It opens with the student-learning analogy and a crop-yield goal before introducing training, inference and the taxonomy. `css/story.css` provides the illustrated layouts; `images/credits.html` and `images/photo-credits.json` record the photograph sources, licenses and display adaptations. All photos and diagrams are local.

## Editing and checks

Edit the active split HTML files in place. Shared styling lives in `css/ml.css`, `css/review.css`, `css/story.css` and `css/layout-review.css`; numerical routines and controls live in `js/ml-engine.js` and `js/widgets.js`. `js/course-data.js` embeds the two original chart payloads for offline viewing. The JSON-encoded standalone labs inside each handout must remain valid HTML strings.

The old `tools/build-deck.py` and `_review` material belong to the earlier combined deck; do not use them to rebuild the active split packs. Current source coverage is documented in `notes/source-map.md`, using stable slide IDs rather than changing displayed slide numbers.

Question text is maintained in `../../wooclap/question-bank.json`. From this folder, `python ../../wooclap/tools/build.py --course-root ../..` regenerates local quiz slides, placement metadata, guides and import workbooks. Live Wooclap forms also require a separate edit and save; generating a workbook does not update the live event.

Run `node tests/engine.test.js` for the numerical checks. The runtime bundles Reveal.js and Plotly.js with their license headers. No authoring tools are required to view the material.

## Both-pack layout and sequence review · 26 October 2026

Part 1 has a typography-only opening and introduces learning settings and applications in six chapters. Part 2 follows the same chapter bars, maps, diagrams and matching reading structure, with four chapters: measurements and data; prediction functions and models; fit and generalization; evaluation. It contains 27 source slides and 32 displayed slides including five questions. Its handout has 25 reading sections. Redundant Part 1 practice questions and the duplicate Part 2 takeaway slide were removed. A short bridge and the shared crop-yield context connect the lectures.

Photographs are displayed whole and centered, with annotations positioned relative to the displayed image. Compact caption bands and separate portrait/landscape layouts prevent clipping and unnecessary empty space. The Part 1 regression illustration is a quantity ruler; Part 2 owns the original numerical chart walkthrough. New Part 2 diagrams explain domains and Cartesian products, variable types, model families, residuals, noise, generalization, data splits and leakage. The original numerical engine, chart payloads and all six standalone interactive labs remain unchanged.

All 69 rendered slides were visually reviewed at 1280 × 720. Frame aspect ratios, centering, slide bounds, handout counterparts, local links and interactive controls were checked. `notes/slide-manifest.json` and `notes/slide-notes.md` reflect the final sequence.

## Part 1 teaching refinements · 26 October 2026

Part 1 now has 34 source slides, 39 displayed slides and 31 handout reading sections. The agricultural example uses field trials rather than the ambiguous word plot, with a full-width examples → learning → prediction sequence. Training and inference use equal parallel layouts and separate shared icons: parameter adjustment versus prediction through a fitted model. Those meanings are reused on the related example slides.

A new semi-supervised introduction motivates the labeled/unlabeled mixture. The following slide distinguishes labeling a particular batch (transduction) from learning a rule for future photos (induction), using the same 100 labeled and 10,000 unlabeled photos. Weak supervision is introduced through the cost and limitations of labels. A pictured bandit setup precedes the bandit question and lab, defining arm, pull, reward and the repeated decision loop. The companion handout includes both new sections, updated examples and contents. All three Part 1 standalone labs and question text are unchanged.
