# Source coverage and editorial notes

Primary source: [AIML 2025/26 · Lesson 03 · Introduction to Machine Learning](https://www.aretor.it/courses/aiml2526/lessons/03_intro/), rechecked on 24 October 2026 using the user’s authorized access. Credentials are not stored in the teaching files. The table uses stable IDs in the active split packs; displayed slide numbers also include inserted questions.

The lecture sequence follows the source: components → learning settings → application domains → regression formulation (variables, data, functions, hypotheses and generalization). Part 2 adds a short recap; the mixed learning-signal exercise comes after all settings are introduced. Technical definitions appear in both slides and corresponding handout chapters. Scientific corrections are recorded below rather than reproducing ambiguous claims from the source.

| Original topic | Part | Slide IDs (and matching handout chapters) | Coverage |
| --- | --- | --- | --- |
| Learning components | 1 | learning-story, components, learning-goal, training-inference | Data, model structure and parameters, training algorithm, held-out evaluator. |
| Supervised learning | 1 | supervised, regression, classification, regression-classification, label-cost | Input–target pairs; ground truth; continuous magnitude versus category; annotation and measurement cost. |
| Unsupervised learning | 1 | unsupervised, clustering, generative-modeling | Clustering and generative modeling. |
| Self-supervised learning | 1 | self-supervised, mask-lab, pretrain-transfer | Targets from recorded data; masking and next-token tasks; pretraining and task adaptation/fine-tuning. |
| Semi-supervised learning | 1 | semi-supervised | Labeled and unlabeled observations together; transductive and inductive prediction goals. |
| Weak signals and domain change | 1 | weak-shift, domain-shift | Incomplete/coarse/noisy supervision; A/B image distributions; normalization/alignment; unfamiliar classes as a separate issue. |
| Reinforcement learning | 1 | reinforcement, explore-exploit, bandit-lab | State/action/reward/policy; accumulated and delayed reward; exploration versus exploitation; simplified bandit. |
| Applications | 1 | domains, vision, language, multimodal, multimodal | Vision classification/detection/semantic segmentation; document topic/POS/word meaning; multimodal image–text example. |
| Experimental problem and variables | 2 | fertilizer, measurements, variable-types, roles | Fertilizer/yield; variable versus value; continuous/discrete; nominal/ordinal/binary; predictor/outcome synonyms. |
| Spaces and observations | 2 | input-output-spaces, observation-vector | Predictor domains; input Cartesian product; outcome domain; indexed column vector and target; all symbols explained. |
| Dataset and design matrix | 2 | dataset, matrix, observations-lab | Dataset of n pairs with m predictors; rows/columns; transpose; target vector; 25 original observations. |
| Function and hypothesis | 2 | prediction-function, hypotheses, hypothesis-space, hypothesis-lab | Function domain/codomain; prediction versus target; approximate fit; quadratic family; θ and Θ = ℝ³; original illustrative curve. |
| Noise and generalization | 2 | residuals, noise, generalization, splits, generalization-lab, leakage | Recorded residuals, measurement and omitted-condition variation, performance beyond recorded pairs, held-out assessment. |

## Preserved interactive source charts

The page loads two Plotly charts from static JSON resources. Both are retained with all original numerical coordinates and trace names:

- [nonlinear.json](https://www.aretor.it/json/aiml2526/intro/nonlinear.json): 25 fertilizer/yield observations, shown in Part 2 at `observations-lab`.
- [nonlinear_mod.json](https://www.aretor.it/json/aiml2526/intro/nonlinear_mod.json): the same observations and the original 25-point illustrative hypothesis, shown in Part 2 at `hypothesis-lab`.

Plotly itself is bundled locally, so hover, drag-to-zoom, panning and legend toggling do not depend on the course login or a CDN. Explicit Zoom, Pan and Reset view controls replace the small default modebar. A native point selector provides keyboard-accessible numerical inspection. The `hypothesis-lab` adds residual and MSE calculations for the supplied curve. Its MSE on these observations is approximately 0.0195. No fitting algorithm, optimality claim or polynomial degree is attributed to the original curve.

The source x-axis says “% Fertilizer” and uses coordinates from 0 to 1. The deck retains those coordinates and adds “source scale” to the title. The source does not specify physical yield units, physical dosage conversion or whether these data came from actual trials. The deck treats them as course illustration data, not empirical agronomic evidence.

## Added interactive examples

- **Learning-signal quiz:** six scenarios with deterministic explanations. It distinguishes a prediction task (such as regression) from its learning setting (such as supervision).
- **Masking:** constructs an input/target pair from one of three short sentences. It is a demonstration of self-supervised target construction; it does not run a language model. Other plausible completions can exist, but the recorded token is the training target.
- **Three-armed bandit:** independent Bernoulli rewards with fixed probabilities 0.25, 0.50 and 0.75. Automated play samples each arm once, then uses epsilon-greedy action selection. Epsilon choices are 0, 0.1, 0.3 and 1, with seeds 1, 7 and 23. Manual choices use the same reward generator. True probabilities can be revealed for teaching but are never passed to the action-selection policy. The budget is 60 pulls. This is a simple decision problem without state transitions or delayed rewards, not a chess simulator or a guarantee of optimal decisions.
- **Generalization:** the generating function is `2 + 1.2x - 0.9x²`, with seeded Gaussian noise. The 16 training and 40 validation points are disjoint. Degree choices are 0, 1, 2, 5 and 9; noise standard deviations are 0, 0.25 and 0.6. A Householder QR solver fits least-squares coefficients using training observations only. Validation data is for comparison during development. This is deliberately not called a final test set.

## Editorial corrections and qualifications

1. **Weak supervision versus domain adaptation.** The original weak-supervision subsection describes differing website distributions and alignment. That example is retained but identified as domain shift/adaptation. Weak supervision concerns incomplete, inexact or inaccurate signals; these issues can coexist. New classes raise additional open-set questions. See [Zhou, A Brief Introduction to Weakly Supervised Learning](https://doi.org/10.1093/nsr/nwx106).
2. **Self-supervision and generative modeling.** Targets can be derived from observations; no manual labels does not mean no objective. Generative modeling need not reconstruct every input, and generative and self-supervised categories overlap. See [Liu et al., Self-supervised Learning: Generative or Contrastive](https://arxiv.org/abs/2006.08218).
3. **Labels and cost.** Targets are not necessarily manually annotated or perfectly correct. Unlabeled data does not imply universally cheaper training or an inherently harder objective.
4. **Task taxonomy.** Numerical category IDs are not regression targets merely because they are numbers. Topic classification and genre classification use different label schemes. Transduction and induction are goals that extend beyond semi-supervised learning.
5. **Variable types.** Age can be continuous or recorded discretely. Ordinal categories have order without implied equal spacing. Binary variables have two values and need not always be nominal. Predictor terminology does not establish independence or causation.
6. **Matrix notation.** If each observation is a column vector, the design matrix stacks its transpose as a row. A numerical matrix requires appropriate feature representation.
7. **Hypotheses.** The source calls parameter choices hypotheses; the associated functions are also commonly called hypotheses. A quadratic family and its coefficients are shown separately. The original curve is only described as the supplied illustrative hypothesis.
8. **Noise.** Deviations may reflect measurement error, omitted conditions, intrinsic variation or model mismatch. They are not all errors that should be memorized.
9. **Generalization.** Replace the requirement to approximate every pair in the full input/output Cartesian product with performance on new cases under a relevant distribution. Noisy targets make exact prediction of every possible pair inappropriate.
10. **Evaluation.** Training, validation and final test roles are separated. Fit preprocessing on training data and choose time/group splits when appropriate. The added lab uses validation for model selection. See [scikit-learn, Common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html).
11. **Reinforcement learning.** The deck avoids an unsupported numerical comparison of chess states and atoms, and does not suggest that every RL training method requires fresh online interaction.

All supplementary diagrams are native SVG teaching illustrations. The vision slide uses a hand-drawn scene with conceptual labels, boxes and regions; these are not claimed to be model predictions. The deck introduces the next lecture's regression ideas without attempting to replace its detailed treatment.

## Part 1 narrative and chapter review · 26 October 2026

The opening now restores the source’s human-learning analogy before naming machine-learning components. A crop-yield goal bridges that analogy to training and inference. Six chapters follow: how learning works; supervised learning; unsupervised learning; semi-supervised learning; reinforcement learning; application domains. Regression, classification, clustering and generative modeling have their own visual explanations. Self-supervision is nested under the unsupervised chapter, with target construction and pretraining/adaptation as further subsections. Weak supervision and domain shift remain explicitly distinguished in the semi-supervised chapter. The mixed learning-signal exercise follows the four learning-setting chapters.

The slide chapter bar, clickable chapter map and handout’s nested contents share the same organization. The three original interactive labs and all existing source IDs are retained. Seven short source slides were added, giving 32 source slides and 37 displayed slides including five questions. The handout contains six chapters and 29 reading sections.

Four photographs are stored locally with author/source/license links in [the image credits](../images/credits.html). They provide context and teaching examples, not empirical evidence or model outputs. Whole-image display, the self-supervised masking overlay and the simulated domain-shift darkening are identified. Original image files are retained. The Part 1 regression SVG now uses an illustrative quantity ruler. The original 25 observations and supplied curve remain in Part 2 without altered coordinates or an optimal-fit claim.

## Both-pack sequence and visual review · 26 October 2026

Part 1 covers learning components, learning settings and applications; Part 2 covers observations, notation, prediction functions, fit and evaluation. Part 2 starts with a brief bridge rather than repeating the taxonomy, then follows four matching slide/handout chapters: measurements and data; prediction functions and models; fit and generalization; evaluation. The original one-predictor observations come before the explicitly separate two-predictor toy notation. The quadratic example explicitly returns to one predictor. Part 1's duplicate numerical chart illustration is replaced by a quantity ruler. Part 2's practice now applies its own data, parameter-space, residual and evaluation concepts.

All existing technical definitions are retained in the relevant handout chapters. The Cartesian-product diagram explicitly distinguishes nine possible input pairs from three recorded toy inputs. Symbols, formulas and short diagrams agree with those definitions. All six original embedded standalone lab documents are unchanged. Part 2 has 27 source slides, 32 displayed slides, four chapters and 25 reading sections. The removed duplicate takeaway section has bookmark aliases at the final summary.

Photographs use their complete original aspect ratio and are centered in their stages in both slides and handouts. Masking/label overlays are anchored to the actual image bounds. All 37 Part 1 and 32 Part 2 displayed slides were rendered and visually inspected, including the inserted question slides. No live question changes were needed for this layout review.

## Part 1 terminology and prerequisite introductions · 26 October 2026

The crop example now says field trial and explicitly separates historical input–target pairs, fitting and prediction for a new field. Training and inference have parallel three-step flows with distinct parameter-update and fixed-model prediction icons. Semi-supervised learning is defined and motivated before the transductive/inductive distinction; a fixed unlabeled batch and a future photo upload illustrate their different prediction goals. Weak supervision is motivated as learning from imperfect available signals, with incomplete, coarse and noisy examples. A new three-arm machine illustration defines the bandit terminology and round sequence before the question and lab use it. Handout sections and nested contents mirror these additions.

Stable added IDs: `semi-supervised-intro` and `bandit-intro`. Part 1 now has 34 source slides, 39 displayed slides and 31 reading sections. Existing technical examples, original numerical payloads, standalone lab documents and all question text are retained.

## Part 2 chapter alignment, layout and local notation · 27 October 2026

The original lesson's Formulating a regression task section has three subsections: Variables and datasets, Models and hypotheses, and Generalization. Those exact names now organize the active deck and handout. Residual/error measurement, training/validation/test roles and leakage are subsections of Generalization rather than a separately renamed fourth chapter. Existing section IDs and question anchors remain stable.

All mathematical teaching slides now contain local symbol keys so an isolated slide can be read without reconstructing notation from earlier pages. Lab prompts define their own displayed quantities. Green notes use new lines (with balanced columns for longer keys) and contain no middle-dot separators. Cards and notes have equal top/bottom and left/right padding. The final 32-slide render was reviewed for clipping, alignment, legibility and preservation of interactive plots. Handout headings, chapter order, diagrams and explanatory keys match the slides; its three standalone lab documents remain unchanged. No Wooclap question text or live question content was changed by this review.

## Complete original definition-box and mathematics audit · 27 October 2026

See [the itemized coverage audit](original-math-coverage.json) for the three original light-blue definitions (variable types; predictor/outcome; dataset) and three display-math blocks (matrix/vector; training fit; generalization). The full symbolic matrix and target column are restored in `matrix-notation`, after the numerical example. The original data plots now open Models and hypotheses and Generalization respectively. The two questions about improving fit and scoring fit without a plot are explicit before residuals/MSE. Model/form, hypothesis/parameter setting and hypothesis space/allowed settings follow the original convention in the slides as well as the handout.

The source mathematical content is retained with explicit explanations of every symbol. Column-vector observations are transposed when stacked as rows. The domain-level equation uses an outcome associated with its input; membership in the input/output Cartesian product describes its type, not a requirement to fit all arbitrary pairs. The original examples and terminology flexibility are included in the reading material. All three embedded handout lab documents, original chart coordinates and question text remain unchanged. Part 2 now has 28 source / 33 displayed slides and 26 reading sections.
