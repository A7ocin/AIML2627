# Classification 1 — source map

Adapted from Alessandro Torcinovich, [5 — Classification 1](https://www.aretor.it/courses/aiml2526/lessons/05_classification/), accessed 11 September 2026. The source page reports an update on 7 November 2025 and displays a CC BY-NC-ND 4.0 site notice. This local teaching adaptation retains attribution and does not change that source notice. The user's existing AIML decks supply the presentation design.

## Coverage

| Course section | Slides |
| --- | --- |
| 5.1 Classification problem | 3–4 |
| 5.2 Probabilistic interpretation and uncertainty | 5–6 |
| 5.3 Optimal Bayes classifier and derivation | 7–10 |
| 5.3.1 Accuracy | 11–12 |
| 5.4 Naive Bayes | 13–15 |
| 5.5 Distribution estimation | 16–19 |
| 5.6 Logistic regression | 20–22, 25–26 |
| 5.6.1 Maximum likelihood | 23–24 |
| 5.7 K-nearest neighbors | 27–32 |
| 5.7.1 Bayesian density motivation | 33 |
| 5.7.2 KNN regression | 34–35 |
| 5.7.3 Validation | 36–39 |
| 5.7.4 Characteristics | 40–41 |
| Added workflow, practice and references | 42–46 |

The source's two expandable derivations are made explicit in the relevant slides and speaker notes. All course subsections are covered. No video, animation frames or additional algorithm controls were present in this lecture's four Plotly payloads.

## Original interactive charts

Each resource is retained in `data/` and embedded in `js/course-data.js` so that opening the HTML directly does not require a server or network. Every original x, y and z array survives runtime styling unchanged. Empty traces remain in the payload but do not occupy the legend. Color, fonts, axis text and spacing are adapted to the deck. Hover, legend toggling, drag zoom, pan and reset remain available; selectors add keyboard access to point coordinates.

| Slide | Resource | Content |
| --- | --- | --- |
| 3 | [lr_logreg.json](https://www.aretor.it/json/aiml2526/classifier/lr_logreg.json) | 100 binary training observations; empty test trace |
| 25 | [lr_logreg_mod.json](https://www.aretor.it/json/aiml2526/classifier/lr_logreg_mod.json) | Same observations and 100 samples of a supplied logistic curve |
| 27 | [cls_two_class.json](https://www.aretor.it/json/aiml2526/classifier/cls_two_class.json) | 25 points per class in two dimensions |
| 29 | [cls_two_class_mod.json](https://www.aretor.it/json/aiml2526/classifier/cls_two_class_mod.json) | Same points and original 200 × 200 K=1 contour grid |

The source calls the one-dimensional example cholesterol versus heart disease. It supplies neither validated provenance nor a defined physical scale. The adaptation retains that context in the chart sidebar and uses an explicitly illustrative predictor scale. The two-dimensional axes use Feature 1 / Feature 2 consistently instead of the original raw LaTeX X_0 / X_1 labels.

## Added interactive examples

- **Slide 10 — Cost-sensitive decision:** hypothetical binary costs, C_FP=1 and adjustable C_FN. At p=P(Y=1|x), loss of predicting 0 is C_FN p and loss of predicting 1 is 1−p. The optimal threshold is 1/(1+C_FN); equal losses choose class 1.
- **Slide 18 — Gaussian Naive Bayes:** explicitly specified conditional means (−1,−1) and (1,1), independent features, both standard deviations 1. Adjustable prior and two feature values. Class log scores and the normalized posterior are calculated live using a stable max-subtracted normalization. These distributions are an illustration, not fitted to the course dataset.
- **Slide 22 — Logistic parameters and threshold:** original binary observations with z=slope×(x−midpoint). Live probabilities, training confusion counts and mean log loss. Uses stable sigmoid and softplus computations. The adjustable curves are not labeled as optimized fits. Slider limits deliberately include zero and negative slopes.
- **Slide 30 — KNN query and boundary:** all 50 source points, adjustable K, query coordinates, uniform/inverse-distance voting and a feature-2 distance multiplier. Background displays sampled class decisions; selected neighbors and query are overlaid. Exact query results use all distances, independent of the display grid. Distance ties use stable source order. Vote ties choose class 0. With inverse-distance weighting and any exact matches among selected neighbors, only those exact matches receive weight.
- **Slide 35 — KNN regression:** 25 deterministic illustrative points with x evenly spaced on [−2,2] and y=sin(1.5x)+0.18cos(8x). Curve samples are computed from the selected K, with a live query mean and highlighted neighbors. K=25 gives the global mean.
- **Slide 38 — Validation:** class-stratified fixed split of the 50 source points into 30 train, 10 validation and 10 test cases. Within each class, a seeded Fisher–Yates permutation uses the documented LCG in `engine.js` (seeds 2026 and 2027). Compare K=1,3,5,7,9,15,29 with uniform Euclidean voting. Equal validation scores prefer the smaller K. The classifier remains trained on the same 30 cases after selection. The test score is calculated and shown only after locking K; controls then prevent changing the candidate. Restart is explicitly a classroom replay of the same split, not a new independent test. A final refit on development data is discussed on the following slide, but not silently performed in this demonstration.

## Technical clarifications

1. Aleatoric variability is outcome variation under the given information/model; epistemic uncertainty concerns limited knowledge of the model. Measurement errors do not uniquely define this distinction.
2. The Bayes classifier minimizes expected 0–1 loss when supplied the true class posterior. Unequal costs change the optimal threshold. Bayes risk may remain positive.
3. Estimated confidence is not a guarantee of correctness or calibration. Accuracy is supplemented by a small confusion-matrix explanation; no universal accuracy target is imposed.
4. With continuous predictors, likelihood and evidence are densities. The evidence cancels for class argmax, but posterior probabilities still require normalization.
5. Naive Bayes uses mutual conditional independence given the class. Gaussian parameters depend on both feature and class. Categorical additive smoothing is explained separately from Gaussian variance smoothing.
6. The sigmoid maps finite real inputs into (0,1). The log odds are linear in the features; probabilities are nonlinear. Outcomes are modeled as Bernoulli rather than with an explicit additive error.
7. The maximum-likelihood coefficient estimate is an **argmax**, not the maximum objective value. A finite unregularized optimum need not exist under separation. The original binary observations are perfectly separable; the supplied finite curve is not presented as a verified unregularized MLE.
8. KNN is nonparametric because its representation is not a fixed finite coefficient vector independent of sample size. It still learns from stored observations and requires validated hyperparameters and preprocessing.
9. Odd K avoids class-count ties only for binary uniform voting. Multiclass, weighted and equal-distance cases need explicit rules; weighting alone does not guarantee no ties.
10. The KNN fraction estimates the posterior. It is not identical to the unknown true posterior. The fixed-region binomial argument in the source is a density-estimation motivation; an adaptive K-neighbor region has random radius and fixed K.
11. The K=n global-majority/global-mean statements apply to uniform weights. A larger K usually reduces flexibility, without a universal monotonic-bias guarantee on every distribution.
12. Validation, preprocessing and threshold choice are parts of model development. Final test feedback must not select them. A small held-out sample yields an uncertain score; it does not prove future generalization.
13. Brute-force KNN computes O(nm) distances plus neighbor-selection cost. Full sorting adds O(n log n); alternative selection methods can reduce that part. Search indexes do not offer a universal improvement in high dimensions.

## Independent numerical verification

`tools/verify-source.py` uses NumPy/SciPy and writes `notes/numerical-review.json` and `tests/reference.json`.

- The 100 binary observations contain 51 zeros and 49 ones; the source test trace has zero observations.
- All 40,000 source KNN grid predictions match a fresh Euclidean nearest-neighbor calculation on the 50 source points.
- The supplied logistic curve is reconstructed to numerical precision with intercept −7.5482845613 and slope 15.5385364748. Those coefficients are inferred from the curve, not from a claimed re-run of its unknown fitting procedure. Its training accuracy is 1 and mean training log loss is approximately 0.101495.
- Independent reference cases cover 192 KNN configurations (including exact matches), 27 Gaussian Naive Bayes configurations and 27 logistic parameter/threshold configurations.
- The JavaScript suite also checks deterministic ties, zero-distance weights, sigmoid extremes, undefined precision/recall, non-overlapping stratified splits and KNN-regression endpoint behavior.

## Supporting primary references

- [James et al., An Introduction to Statistical Learning, Chapter 4](https://www.statlearning.com/) — classification framework and course reference.
- [Bishop, Pattern Recognition and Machine Learning](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/) — course reference for probabilistic modeling and classification.
- [scikit-learn: Naive Bayes](https://scikit-learn.org/stable/modules/naive_bayes.html) — conditional factorization, Gaussian likelihoods and probability-estimation limitations.
- [scikit-learn: Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html) — voting, weighted regression, metrics and search complexity.
- [scikit-learn: Logistic regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression) — logit model, optimization and regularization.

All diagrams are native SVG and charts use the local Plotly library. Reveal and Plotly retain their bundled license headers. No external image placeholders or unrelated portraits are used.
