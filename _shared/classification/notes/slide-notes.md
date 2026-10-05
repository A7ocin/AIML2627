# Lesson 5 — Classification 1

## 1. Classification 1

Based on course lesson 05_classification. The four original Plotly resources are preserved locally. Added labs use explicit illustrative assumptions; they are not medical decision tools.

## 2. Three routes to a class prediction

Discuss the example and relate it to the model’s assumptions.

## 3. A numeric predictor, a categorical outcome

Source lr_logreg.json: 100 training observations; its test trace is empty. Labels and coordinates preserved. The course describes a cholesterol/disease illustration but provides no validated provenance or physical measurement definition. The displayed x scale is identified as illustrative.

## 4. A class label is not a continuous quantity

A linear probability model is possible, but its predictions can fall outside [0,1] and its error variance depends on the mean. Category numbers need not have quantitative spacing.

## 5. The same observed x may have different labels

Refines the source definitions. Improving measurements or observing new features can change the conditional task and its residual uncertainty. Finite-sample model uncertainty differs from inherent outcome variability under a fixed model.

## 6. Estimate the class distribution at x

This deck uses p for a true distribution and p̂ for an estimate. Probability at a continuous X is described by a conditional distribution, not by dividing two positive point probabilities.

## 7. Under equal error costs, choose the largest probability

Discuss the example and relate it to the model’s assumptions.

## 8. Minimize error separately at each x

Recasts the source expandable derivation using the law of total expectation. For C classes the conditional minimum error is 1−max_c p_c(x).

## 9. Even the ideal classifier can make mistakes

Bayes risk is E[1−max_c p_c(X)]. It is not necessarily zero; overlapping class distributions create irreducible error for the given features.

## 10. Change the costs and the best decision changes

Added binary decision-theory lab. False-positive cost is fixed at 1; false-negative cost ranges 1–10, correct decisions have zero cost. These are hypothetical costs, not medical recommendations. The Bayes cost threshold is C_FP/(C_FP+C_FN).

## 11. Accuracy counts correct labels

Accuracy is an empirical estimate of performance for a representative evaluation distribution, not a guarantee about deployment.

## 12. A confusion matrix adds the missing detail

A brief addition to support threshold interpretation. Recall is sensitivity for the positive class; precision depends on the class prevalence in the evaluated population.

## 13. Reverse the direction with Bayes’ theorem

Discuss the example and relate it to the model’s assumptions.

## 14. “Naive” means independent given the class

Naive Bayes uses mutual conditional independence of the features given the class. Pairwise independence alone is not sufficient for the full factorization.

## 15. Compare log scores to avoid tiny products

Discuss the example and relate it to the model’s assumptions.

## 16. Choose a likelihood suited to each feature

The source includes parametric Gaussian, nonparametric density and categorical options. Gaussian parameters depend on both feature and class; source notation omitted the class subscript.

## 17. One unseen category should not erase a class

Added numerical stability and zero-frequency clarification. Gaussian Naive Bayes instead requires positive variances; implementations commonly apply variance smoothing.

## 18. Watch two features update a class probability

Added Gaussian Naive Bayes lab with explicitly specified independent conditional normals: class 0 means (−1,−1), class 1 means (1,1), all standard deviations 1. It illustrates assumed distributions, not a fit to course observations. The posterior log odds is logit(prior)+2x₁+2x₂.

## 19. Simple assumptions can work—and still mislead

Discuss the example and relate it to the model’s assumptions.

## 20. A linear score becomes a probability

Discuss the example and relate it to the model’s assumptions.

## 21. The log odds are linear in the features

Logistic regression is a generalized linear model. The probabilities are nonlinear in beta, but the log odds are linear. Intercept column x_i0=1 is explicit in the formula.

## 22. Explore a sigmoid and its decision threshold

Added explorer using the original 100 binary observations. Parameterization z=slope×(x−midpoint); β₀=−slope×midpoint and β₁=slope. Slider settings are illustrative and are not claimed to be an optimized fit. Training log loss and confusion counts are computed live.

## 23. Reward the probability assigned to each observed label

Corrects max to argmax in the source estimator definition. Max is the objective value; argmax is a parameter vector attaining it.

## 24. Minimize negative log likelihood

For a linear score the negative log likelihood is convex, but uniqueness and existence need conditions. Use stable softplus(z)−y*z in code. Multiclass extensions are deferred to later material.

## 25. Inspect the source’s supplied logistic curve

Source lr_logreg_mod.json: original 100-point curve and 100 training observations retained. Test trace is empty. The source does not provide its fitting code, penalty or exact parameter settings, so the curve is labeled supplied rather than claimed to be a freshly computed unregularized MLE.

## 26. Fitting and threshold selection are different steps

Discuss the example and relate it to the model’s assumptions.

## 27. Two features create a geometric problem

Source cls_two_class.json: 25 observations in each of two classes. All coordinates and labels preserved. Axis notation translated from source X_0,X_1 into slide-wide feature 1,feature 2 labels.

## 28. Let nearby training cases vote

Discuss the example and relate it to the model’s assumptions.

## 29. The original 1-neighbor decision regions

Source cls_two_class_mod.json: all original coordinates and the full 200×200 contour grid preserved. This is the source K=1 boundary, not a refit on a subsample.

## 30. Move a query and inspect the neighbors that vote

Added exact nearest-neighbor lab using all 50 source observations. Uniform and inverse-distance voting are available. Distance ties are broken by stable source order; vote ties choose class 0. Exact coordinate matches receive all weight under inverse-distance voting. Feature 2 scaling changes the metric and the colored decision regions.

## 31. Distance depends on units and relevance

Discuss the example and relate it to the model’s assumptions.

## 32. Odd K does not solve every tie

Corrects the blanket source tie advice. This deck uses source order for distance ties, the lowest label for tied votes, and only zero-distance neighbors when any are present under inverse-distance weighting.

## 33. A local density argument explains the vote

The source treats the estimated fraction as the true posterior; this is an estimate. For a fixed region, the point count is binomial. In adaptive KNN the radius is random and K is fixed, so that fixed-region argument is heuristic rather than an exact finite-sample proof.

## 34. For regression, average their outcomes

Discuss the example and relate it to the model’s assumptions.

## 35. See a neighbor average become smoother

Added deterministic synthetic one-dimensional regression illustration with 25 points, y=sin(1.5x)+0.18cos(8x). No real-world units or empirical noise distribution are claimed. The curve is the actual uniform KNN prediction on a dense grid.

## 36. Small and large neighborhoods make different compromises

The endpoint claims are for uniform weights. Duplicate coordinates with conflicting labels can prevent perfect K=1 training classification. Bias is task-dependent; larger K does not mathematically guarantee a monotone bias increase on every dataset.

## 37. Keep the final test set out of model selection

Discuss the example and relate it to the model’s assumptions.

## 38. Select K before revealing the test score

Added reproducible class-stratified 30/10/10 split of the 50 source points. Candidates K=1,3,5,7,9,15,29. Uniform Euclidean voting. Ties in validation accuracy prefer smaller K. The selected classifier remains trained on the same 30 cases. Test labels never affect selection. Locking disables candidate changes; resetting is explicitly a fresh classroom demonstration, not a new independent test.

## 39. A small validation win may be unstable

Discuss the example and relate it to the model’s assumptions.

## 40. Compare what each method must store and assume

Discuss the example and relate it to the model’s assumptions.

## 41. Neighbor search can become expensive

Full sorting adds O(n log n); partial selection or a heap can reduce that part. A precomputed all-pairs distance matrix requires quadratic storage and does not remove the need to compute distances for arbitrary new queries.

## 42. Make the entire prediction procedure reviewable

Predictive performance, probability calibration and causal explanation are different goals. A classifier trained on observational data is not by itself evidence of a causal mechanism.

## 43. Four questions before you leave

Discuss the example and relate it to the model’s assumptions.

## 44. What a strong answer includes

Discuss the example and relate it to the model’s assumptions.

## 45. Estimate uncertainty. Make a decision. Check it.

Discuss the example and relate it to the model’s assumptions.

## 46. Follow the derivations and the original examples

Adapted for the user’s existing course presentation. Attribution and the source site license notice are recorded in notes/source-map.md. No third-party decorative photographs are used.

