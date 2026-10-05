# Source coverage and editorial notes

Primary source: [AIML 2025/26 · Lesson 03 · Introduction to Machine Learning](https://www.aretor.it/courses/aiml2526/lessons/03_intro/), accessed on 11 September 2026 using the user's authorized course access. This is the lecture linked after Constraint Satisfaction. Credentials are not stored in the presentation.

| Course section | Slides |
| --- | --- |
| 3.1: data, learner, training algorithm and evaluator | 3–4 |
| 3.2: learning settings | 5–15 |
| Supervised regression and classification | 6–7 |
| Unsupervised and self-supervised learning | 8–11 |
| Semi-supervision, transduction, induction and weak supervision | 12–13 |
| Reinforcement learning and exploration/exploitation | 14–15 |
| 3.3: computer vision, NLP and multimodal data | 16–18 |
| 3.4.1: fertilizer example, variables, observations and dataset matrices | 19–24 |
| 3.4.2: models, hypotheses and predictions | 25–26 |
| 3.4.3: noise and generalization | 27–32 |
| Exercises, answers, summary and references | 33–36 |

## Preserved interactive source charts

The page loads two Plotly charts from static JSON resources. Both are retained with all original numerical coordinates and trace names:

- [nonlinear.json](https://www.aretor.it/json/aiml2526/intro/nonlinear.json): 25 fertilizer/yield observations, shown on slide 24.
- [nonlinear_mod.json](https://www.aretor.it/json/aiml2526/intro/nonlinear_mod.json): the same observations and the original 25-point illustrative hypothesis, shown on slide 26.

Plotly itself is bundled locally, so hover, drag-to-zoom, panning and legend toggling do not depend on the course login or a CDN. Explicit Zoom, Pan and Reset view controls replace the small default modebar. A native point selector provides keyboard-accessible numerical inspection. Slide 26 adds residual and MSE calculations for the supplied curve. Its MSE on these observations is approximately 0.0195. No fitting algorithm, optimality claim or polynomial degree is attributed to the original curve.

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
