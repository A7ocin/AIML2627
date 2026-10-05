# Classification 2 — source map and teaching notes

Adapted from Alessandro Torcinovich, [6 — Classification 2](https://www.aretor.it/courses/aiml2526/lessons/06_classification2/), accessed 11 September 2026. The page reports an update on 17 November 2025 and displays a CC BY-NC-ND 4.0 site notice. This local teaching adaptation retains attribution and does not replace the source notice. The existing AIML packs provide the presentation design.

## Course coverage

| Original section | Slides |
| --- | --- |
| 6.1 McCulloch–Pitts neuron; AND derivation | 3–6 |
| 6.2 Perceptron; update intuition | 7–13 |
| 6.2.1 Learning rate | 14 and the training lab on 11 |
| 6.2.2 XOR and limitations | 15–16 |
| 6.3 Linear SVM, margin, primal constraints | 17–24 |
| Added soft-margin bridge | 25–26 |
| 6.4 Nonlinear SVM and paraboloid map | 27–31 |
| 6.4.1 Kernel trick, Lagrangian, dual and quadratic identity | 32–39 |
| Added fitted-kernel explorer | 40 |
| Kernel validity and computational trade-offs | 41–42 |
| Added workflow, questions, answers and recap | 43–46 |
| References | 47 |

The source's expandable AND proof, perceptron update argument and quadratic-kernel derivation are incorporated into explicit slides, labs and speaker notes. All course subsections are covered. The lesson had no videos, external images, iframe simulations or Plotly animation frames; its interactive material consisted of the nine charts below.

## Original charts preserved

The exact JSON files are in `data/` and are embedded in `js/course-data.js` for offline use. No original x, y or z array is modified. Plot styling, readable axis labels, camera defaults and legend spacing are adapted to the dark theme. Source line endpoints are retained even when the visible axes focus on the observations and clip extrapolated line segments.

| Slide | Original resource | Content |
| --- | --- | --- |
| 3 | [cls_and.json](https://www.aretor.it/json/aiml2526/classifier/cls_and.json) | Four AND inputs and their labels |
| 6 | [cls_and_mod.json](https://www.aretor.it/json/aiml2526/classifier/cls_and_mod.json) | Same inputs and x₁+x₂=1.9 separator |
| 8 | [cls_and_noisy.json](https://www.aretor.it/json/aiml2526/classifier/cls_and_noisy.json) | 270 class-0 and 90 class-1 observations |
| 12 | [cls_and_noisy_mod.json](https://www.aretor.it/json/aiml2526/classifier/cls_and_noisy_mod.json) | Same 360 observations and supplied perceptron line |
| 15 | [cls_xor.json](https://www.aretor.it/json/aiml2526/classifier/cls_xor.json) | Four XOR inputs and their labels |
| 17 | [cls_svm_both_mod.json](https://www.aretor.it/json/aiml2526/classifier/cls_svm_both_mod.json) | 360 observations and both supplied separators |
| 19 | [cls_svm_margin.json](https://www.aretor.it/json/aiml2526/classifier/cls_svm_margin.json) | Ten observations, margin polygon, separator, support planes and normal arrow |
| 27 | [cls_circle_clusters.json](https://www.aretor.it/json/aiml2526/classifier/cls_circle_clusters.json) | 150 inner and 150 outer observations |
| 29 | [cls_circle_clusters_3d.json](https://www.aretor.it/json/aiml2526/classifier/cls_circle_clusters_3d.json) | All 300 points lifted with z=x₁²+x₂² |

The margin source's intended axis ranges are retained as the requested view; equal-scale axis constraints may expand one axis to preserve geometry. The polygon has deliberately distant vertices and is clipped by the plotting viewport. Other source views focus on data extents rather than remote extrapolated line endpoints. These are viewing changes only.

Original charts keep hover, legend toggling, pan, zoom and reset. Point selectors provide keyboard-readable coordinates. The original 3D chart remains rotatable and zoomable, with a camera reset and an optional added plane. The plane is placed between the two observed squared-radius ranges; it is an illustrative valid separator, not a claim to reproduce an unknown SVM fit.

## Added interactive sections

### Slide 5 — Threshold logic

Fixed weights (1,1), original four input coordinates and an adjustable threshold θ. Choose AND or OR as the target. Predict 1 exactly when x₁+x₂≥θ. AND works for 1<θ≤2; OR works for 0<θ≤1. The truth table and region update from that rule, including threshold endpoints.

### Slide 11 — Perceptron learning

Uses the original AND, noisy AND or XOR observations. Weight order is (b,w₁,w₂), initialization is zero, and the rule is w̃←w̃+η(y−ŷ)x̃ with x̃=(1,x₁,x₂). At score zero, the prediction is 1. The dataset is traversed in source class/point order or its reversal. Learning rates are 0.25, 1 and 4.

Step processes one observation; Epoch finishes the next epoch boundary; Play animates steps. Reset returns to zero initialization. Changing a training setting restarts the run. Animation pauses on slide exit. A complete epoch with no updates certifies training convergence. A 25-epoch cap prevents nonseparable demonstrations from running indefinitely. Reaching the cap is not presented as a general proof of nonseparability.

The independent implementation gives:

| Dataset | Order | Observations processed | Updates | Result |
| --- | --- | ---: | ---: | --- |
| AND | Source | 24 | 11 | Converged |
| AND | Reverse | 32 | 15 | Converged |
| Noisy AND | Source | 2,520 | 13 | Converged |
| Noisy AND | Reverse | 3,240 | 17 | Converged |
| XOR | Source | 100 | 98 | Budget reached |
| XOR | Reverse | 100 | 97 | Budget reached |

These counts are identical for the three learning-rate choices. A constant positive rate rescales this zero-initialized perceptron's weights without changing its mistake sequence in exact arithmetic. Powers of two also preserve the scaling relation well in floating-point calculations here. The source's supplied trained line is kept separately from this new trace because its original training settings were not provided.

### Slide 22 — Geometric margin

Uses the ten source margin observations and a unit normal u=(cos θ,sin θ). For h(x)=uᵀx+d, clearance is min_i t_i h(x_i), where t_i=2y_i−1. Positive clearance gives a symmetric empty strip of width 2×clearance. Nonpositive clearance is explicitly labeled nonseparating.

Fit max-margin restores an independently optimized hard-margin solution. The button uses the full-precision solution even though the sliders display rounded settings; moving a slider returns to the slider-defined configuration. The optimum was found by SciPy constrained optimization and checked against a high-C linear SVC on this separable dataset:

- w=(1.5384615385, 0.4615384615), b=−0.6615384615.
- Unit-normal offset d≈−0.4118653026.
- Full margin width≈1.2451741708.
- Three observations touch the support planes.

### Slide 37 — Quadratic kernel identity

Two adjustable vectors x,z∈ℝ². Compute ψ(x)=(x₁²,√2x₁x₂,x₂²) and its dot product with ψ(z), then compare it with (xᵀz)². Bars display each feature-coordinate contribution. Negative cross contributions are valid; their sum equals the nonnegative squared dot product up to rounding. Formatting removes misleading negative zero while the numerical difference remains visible.

### Slide 40 — Fitted SVM boundaries

All 300 source circular observations are used without hidden standardization. Fifteen models are fitted using scikit-learn SVC:

- Linear kernel and homogeneous quadratic kernel, each with C=0.1,1,100.
- RBF kernel with all combinations of C=0.1,1,100 and γ=0.1,1,10.

The quadratic kernel is (xᵀz)² (degree=2, gamma=1, coef0=0). Tolerance is 1e−9; all fits report successful completion. The controls select these actual fitted models. Their support vectors, signed dual coefficients and bias are stored in `data/fitted-models.json` and embedded in `js/models.js`. The browser computes s(x)=Σ_i α_i t_i κ(x_i,x)+b. The 81×81 displayed decision grid is sampled from that score; the contour interpolates its zero boundary. Circles and distances use equal axis scales.

The γ control is disabled for non-RBF models because it is fixed or unused in these demonstrations. Support-vector rings correspond to the selected model. Displayed accuracies are training accuracies; no model is recommended from these scores. Final model selection belongs on validation data.

## Corrections and qualifications

1. The source's threshold b is renamed θ, reserving b for an additive bias. For the simplified threshold unit, b=−θ.
2. Perceptron learning is described as supervised error correction. A single unchanged update is not convergence; a whole error-free pass is required.
3. An update moves the current example's score in the desired direction but need not fix that example in one step or improve overall training accuracy immediately.
4. The universal learning-rate speed claim is replaced by the exact zero-initialization scaling argument and an interactive comparison.
5. The XOR limitation is proved under the displayed zero-score tie rule. Nonlinear features or multiple units can solve XOR; one affine threshold in its original inputs cannot.
6. A larger training margin is a geometric criterion, not a guarantee of fewer future errors. Both supplied separators classify their training data perfectly; their minimum clearances differ.
7. The SVM geometric norm excludes the bias. A raw decision score must be divided by the feature-weight norm to become a distance.
8. Hard-margin constraints require separability. Soft-margin SVM and hinge loss are added to bridge the source derivation to practical fitted examples. A margin violation need not be a classification error.
9. Nonzero hard-margin multipliers identify support vectors, but degeneracy can put a point on the margin with a zero multiplier. Soft-margin bias recovery uses a free support vector (0<α<C) when available.
10. A chosen feature map does not guarantee separability for arbitrary data. The displayed radial map works here because the observed squared-radius ranges are disjoint.
11. The paraboloid lift (x₁,x₂,x₁²+x₂²) and the later homogeneous quadratic map are different maps with different induced kernels. The latter induces (xᵀz)²; the former induces xᵀz+‖x‖²‖z‖².
12. The dual is constrained: nonnegative multipliers and Σ_i α_i t_i=0 remain. Soft-margin SVM adds upper bounds α_i≤C. Stationarity alone is not the whole KKT system.
13. The degree-at-most-10 polynomial feature count for 100 inputs is binomial(110,10)=46,897,636,623,981, including the constant coordinate. Excluding it subtracts one.
14. The kernel validity condition is symmetry and positive semidefiniteness for every finite Gram matrix, rather than symmetry alone. Mercer results require additional hypotheses.
15. Kernel savings are stated as O(m) versus O(m²) for the quadratic example rather than an overly specific operation count. The sample-size cost remains: dense kernel matrices need O(n²) storage, and prediction depends on the support-vector count.
16. Decision scores are not automatically calibrated probabilities. Kernel, C, preprocessing and other choices require validation; perfect training accuracy is not held-out evidence.

## Independent checks and sources

`tools/fit-models.py` fits the models and writes reference scores, margin/lift calculations and `notes/numerical-review.json`. `tools/verify-perceptron.py` provides a separate Python trace implementation. The numerical suite compares all 300 training scores and 81 query scores for each of 15 models, checks 18 perceptron configurations, verifies learning-rate scaling across full traces, checks line clipping and verifies all 300 original lifted coordinates. It passed 57,064 assertions. Development versions: scikit-learn 1.8.0, SciPy 1.15.1 and NumPy 2.2.6. None is required to view the slides.

Source separator measurements:

- Supplied noisy-AND perceptron: accuracy 1.0, minimum signed clearance≈0.096635.
- Separator 1: accuracy 1.0, minimum signed clearance≈0.253737.
- Separator 2: accuracy 1.0, minimum signed clearance≈0.060042.
- Largest inner squared radius≈0.3465754974; smallest outer squared radius≈0.3612651186. The added plane uses their midpoint≈0.3539203080.

Supporting primary references:

- [Bishop, Pattern Recognition and Machine Learning](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/), chapters 4 and 7 — also the course's textbook reference.
- [Cornell CS4780: The Perceptron](https://www.cs.cornell.edu/courses/cs4780/2018fa/lectures/lecturenote03.html) — update intuition and separability assumptions.
- [scikit-learn: Support Vector Machines](https://scikit-learn.org/stable/modules/svm.html) — primal/dual formulations, kernels, practical parameters and support-vector prediction.

All decorative diagrams are native SVG. Reveal and Plotly are bundled locally with their existing license headers. No unrelated photographs, placeholder portraits, credentials or external runtime assets are included.
