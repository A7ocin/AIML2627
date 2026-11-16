# Classification Parts 1 and 2 — coverage and provenance

Revised 5 November 2026 after reading the complete classification chapter, including both expandable mathematical arguments, at https://www.aretor.it/courses/aiml2526/lessons/05_classification/ (Alessandro Torcinovich). This private maintenance file retains attribution and the source’s CC BY-NC-ND 4.0 site notice. It is not included in the student-facing slides or handouts.

## Coverage by stable slide anchor

| Source chapter | Pack | Slides and corresponding handout sections |
| --- | --- | --- |
| 5.1 · A classification problem | 1 | `classification-story`, `hospital-task`, `data-lab`, `regression-to-probabilities`, `classification` |
| 5.2 · Probabilistic interpretation of machine learning | 1 | `uncertainty`, `posterior` |
| 5.3 · Optimal Bayes classifier and complete risk argument | 1 | `bayes-rule`, `bayes-proof`, `bayes-risk`, `bayes-derivation`, `bayes-error` |
| 5.3.1 · Evaluation | 1 | `accuracy`, `confusion` |
| 5.4 · Naive Bayes classifier | 1 | `bayes-theorem`, `bayes-example` |
| 5.5 · Estimating distributions and complete log derivation | 1 | `independence`, `nb-score`, `nb-log-derivation`, `estimate` |
| 5.5.1 · Estimating class-conditional feature likelihoods | 1 | `gaussian-model`, `smoothing`, `naive-lab` |
| 5.6 · Logistic regression | 1 | `logistic-bridge`, `logistic`, `logistic-intuition`, `log-odds`, `decision-threshold`, `logistic-lab` |
| 5.6.1 · Maximum likelihood estimation | 1 | `likelihood-intuition`, `likelihood`, `likelihood-combined`, `fit-lab` |
| 5.7 · K-Nearest Neighbors | 2 | `knn-intro`, `plane-lab`, `knn-rule`, `boundary-lab`, `metric`, `knn-weighted`, `neighbors-lab`, `ties` |
| 5.7.1 · Bayesian derivation | 2 | `knn-density-intro`, `knn-derivation-goal`, `knn-density-count`, `knn-density`, `density-lab` |
| 5.7.2 · KNN regressor | 2 | `knn-regression`, `regression-lab` |
| 5.7.3 · Validation | 2 | `complexity`, `splits`, `validation-metrics`, `validation-lab`, `validation-notes` |
| 5.7.4 · Characteristics | 2 | `tradeoffs`, `cost`, `workflow` |

## Mathematical clarifications

- True probabilities use p, estimates use a hat. Risk is expected 0–1 error. The binary and multiclass Bayes rules and total-expectation derivation are explicit.
- Gaussian means and variances carry both feature and class indices. The handout also supplies the density and parameter estimates.
- Logistic fitting uses argmax/argmin to return coefficients, rather than max/min values. Both sigmoid expressions and both Bernoulli product forms are covered.
- The supplied finite logistic curve is illustrative. Separable unregularized data need not have a finite MLE.
- KNN density expressions and the resulting posterior are estimates. A fixed-region random count K_R is distinguished from the selected K of an adaptive KNN neighborhood. Binomial mean, variance and the handout PMF are included.
- K=n gives a global mean or majority under uniform weights. Test data are reserved until development choices are fixed. Regression and classification validation metrics are distinguished.

## Data and interactions

The four supplied Plotly payloads lr_logreg, lr_logreg_mod, cls_two_class and cls_two_class_mod retain all numerical arrays. No engine or dataset values were changed. The dataset scales are illustrative.

Part 1 has four interactive examples: point inspection, cost-sensitive decisions, specified Gaussian Naive Bayes, and a manual sigmoid/threshold explorer. Part 2 has seven: supplied logistic curve inspection, 2D point inspection, K=1 contour inspection, computed KNN regions, a new local-density/cancellation explorer, KNN regression, and validation with test locking. The three derivation walkthroughs additionally reveal equations with changing explanations.

Both handouts contain the same formulas, worked examples, eleven live widgets with updated print previews, notation glossaries, and all twelve revised questions with explanations. Twelve existing Wooclap forms were edited in place; IDs, types, correct-answer positions and settings were preserved.

## Opening narrative follow-up

The opening now moves from familiar categories to a hospital research task, explicitly defines the cholesterol input and binary disease outcome, inspects the unchanged data, and uses an actual OLS line on those observations to motivate class probabilities. The input scale is illustrative rather than a literal clinical percentage. The companion handout follows the same sequence. Two explanatory slides were added; existing question IDs and wording are unchanged.


## Probability narrative follow-up (2026-11-05)
Expanded the Part 1 probabilistic interpretation into random observations, contradictory recorded inputs, epistemic/aleatoric uncertainty, overall frequencies and conditional class probabilities. Follows the supplied section 5.2 narrative, with hospital, die and hair-colour examples. Hair-colour counts and the 70/30 diagram are explicitly hypothetical. Keeps the context-dependent uncertainty distinction accurate (Gal, Uncertainty in Deep Learning, chapter 6: https://www.cs.ox.ac.uk/people/yarin.gal/website/thesis/6_deep_insights.pdf). No links to old course material appear in teaching content.


## Class probability and Bayes narrative (2026-11-05)
Expanded the supplied sections 5.2.1 and 5.3 narrative: categorical uncertainty and cloth example, conditional class probabilities, smooth learning objectives and confidence, ideal binary Bayes rule, multiclass argmax and observed versus predicted labels, expected 0–1 risk, two conditional errors, and a dedicated five-step proof with dynamic comments. Preserved existing anchors, question IDs and the population Bayes-risk expression. The proof uses p(X)=P(Y=1|X) with an explicit alias to p₁(X). The total-expectation argument and integral justification are explained in the handout. No references to old course material appear in teaching content.


## Opening simplification (2026-11-05)
Merged the general introduction into the hospital task, categorical uncertainty into the same-input example, and the conditional 70/30 intuition into the probability-notation slide. The opening through probability benefits is reduced from 16 to 13 rendered slides. The exact uncertainty definitions requested by the lecturer appear in both slide and handout blocks with a context note. The regression ε analogy distinguishes a random numerical error from a conditional distribution over labels. Introductory notation uses P(Y=yᵢ|X=xᵢ)=p(yᵢ|xᵢ). All bottom variable explanations in Part 1 are green boxes with spaced columns and no dot separators. Existing 7 questions and 4 labs are retained, as is the five-step interactive Bayes proof. Legacy anchor links resolve to merged content. Full explanations and normalisation formulas are retained in the handout.


## Original Bayes notation and persistent reference (2026-11-05)
Matched the supplied derivation: E_XY without a comma, 𝟙(A) with parentheses, scalar x, p(X)=P(Y=1|X), f without a star, and the chained conditional-error and 0.5 decision rule. Synchronized neighbouring Bayes equations and the handout. The interactive proof keeps its green heading at the top left, the main equation centered, and a small muted copy of the immediately preceding equation at a fixed top-right inset. All five states and Back, direct jumps and reset were verified, including fixed corner coordinates and absence of overlap. No questions, slide counts or labs changed.


## Expanded Bayes step explanations (2026-11-05)
Made the formula block narrower and shorter, compacted its step navigation, and expanded the full-width explanation box. Rewrote all five explanations to describe the operation and its reason, including a numeric two-error example and the intermediate inequality 1≤2p(x). Handout step explanations match. Original equations, centered formula, fixed top-left heading, fixed top-right previous equation, counts and questions are preserved. All five rendered states fit without overlap.


## Polynomial comparison and probability examples (2026-11-06)
Slide 4 overlays degree 1,2,3,5,9,15 least-squares polynomial fits of the same 100 supplied hospital observations. Fits use a scaled polynomial basis, and the degree-1 predictions match the closed-form OLS line to numerical precision. Controls support multiple selections, a comparison preset, no selection and reset. The live handout uses the same widget, with the initial OLS view as a static print preview. The epistemic panel now shows illustrative measurement distributions with different precision. The hair-colour slide explicitly states its population-frequency estimation task. The conditional-probability formula now has a plain-English caption and an ℙ operator definition. Updated home counts to 5 Part 1 labs and 79 course-wide labs. Original uncertainty definitions and Bayes derivation retained. No questions or live Wooclap IDs changed.


## Sentence and formula scope review (2026-11-07)
Compared every source sentence and formula from the introduction through section 5.6, excluding 5.6.1. The private review records 81 prose units, 13 display-formula groups and 58 inline-formula occurrences. Restored the full Naive Bayes factorization and the complete logarithmic argmax chain, with five interactive explanatory steps. Matched distribution subscripts, p_Y(c)=n_c/n, Acc(X,Y), and the original sigma(x_i) logistic notation, including both exponential forms and the fixed 0.5 class rule. Explicitly explained the probability operator versus function notation, the proof-specific p(X) abbreviation, and class-specific Gaussian parameters. Retained scientific corrections: illustrative hospital measurement scale, a Gaussian distribution for the random feature rather than for a density function, and the finite sigmoid range (0,1) within [0,1].

Removed out-of-scope cost-sensitive decisions, confusion/precision/recall material, smoothing, calibration extensions, log odds, threshold-selection advice, explicit Gaussian MLE estimates, log-sum-exp implementation details and later-part glossary entries. Numerical illustrations that explain the covered concepts remain. The three corresponding beyond-scope question prompts are omitted locally; reusable bank/live event entries remain available. No question wording or live Wooclap forms changed in this pass.

Part 1 now has 36 content sections and 4 active question slides (40 rendered), 4 labs, 34 handout chapters and 4 self-checks. Both five-step walkthroughs and all 40 rendered slides were checked. Handout formula fit, live controls and updated print previews were verified. Course-home counts were synchronized. Source sentence/formula inventory and visual evidence are in the private nov7-source-review folder.


## Part 2 sentence and formula scope review (2026-11-07)
Reviewed every source sentence and formula from 5.6.1 through 5.7.4: the private inventory maps 73 prose units, 14 displayed formula groups and 83 inline formula occurrences. The chapter order and notation now follow MLE, KNN, Bayesian derivation, KNN regression, validation and characteristics. Uses sigma(x_i), explicit positive/negative-label likelihood products, original target-label neighborhoods, full majority and weighted-vote formulas, p_X and p_X|Y density names, region mass P_R, binomial count K, expected count/fraction and variance, and every Bayes substitution/cancellation step. Two five-step walkthroughs retain the previous formula at a fixed top-right position with explanatory comments below. The variance step explicitly shows division by n² and cancellation.

Preserved correctness qualifications: argmax returns fitted coefficients, density and posterior fractions estimate true distributions, the binomial argument fixes the region whereas KNN fixes K, target collections retain repeated labels, odd K only guarantees a non-tied binary uniform vote, exact matches require an inverse-distance convention, global-mean/majority limits assume equal weights, and evaluation uses accuracy for class labels and RMSE for numbers. All quantities have explanations in green notation blocks without dot or semicolon separators.

Removed combined Bernoulli-product/log-loss extensions, threshold-selection procedure, detailed implementation edge-case slide, weighted KNN regression, binomial PMF expansion, cross-validation, formal asymptotic complexity/sorting details, high-dimensional/calibration extensions and deployment/preprocessing workflow. Kept numerical examples and metric/optimizer explanations that clarify the covered material. The reusable question bank and live Wooclap content are unchanged; L05-C09 and L05-O03 are omitted locally. L05-C06 is moved before the likelihood example.

Part 2 now has 32 content sections plus 3 active questions (35 rendered), 30 handout chapters, 7 live labs and 3 self-checks. All slides rendered; both walkthroughs, voting, local-density calculations, test-set locking and matching handout controls checked. Handout formulas fit without horizontal clipping; changed examples have refreshed print previews. Home counts match 82 active question slides and 78 labs across the course. Private evidence is in nov7-part2-review.
