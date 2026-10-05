# Lesson 6 — Classification 2

## 1. Classification 2

Adapted from course 06_classification2. All nine original Plotly charts are retained locally, including the rotatable 3D feature map. Five added labs explain thresholds, perceptron updates, margins, a kernel identity and fitted SVM decision regions.

## 2. Three questions about a decision boundary

Explain the displayed relationship and connect it to the preceding example.

## 3. Start with the four cases of logical AND

Original cls_and.json: all four observations, labels and coordinates preserved.

## 4. Aggregate the inputs, then apply a step

Uses theta for the source’s threshold b to distinguish it from an additive bias. The original historical neuron model has more structure; this is the simplified teaching version in the resource.

## 5. Move the threshold and change the logic

Added exact truth-table explorer with fixed weights (1,1), threshold −0.5 to 2.5 and AND/OR targets. A filled region shows x₁+x₂≥θ; all four predictions and their accuracy update.

## 6. Inspect the source’s AND separator

Original cls_and_mod.json, including the exact supplied separator endpoints. The line equation is x₁+x₂=1.9.

## 7. Let the weights and bias adapt

Following the source’s 0/1 perceptron convention. In two dimensions s(x)=0 is a line. The score is not passed through a sigmoid and is not a class probability.

## 8. Replace ideal corners with noisy observations

Original cls_and_noisy.json: 270 class-0 and 90 class-1 observations. All 360 original points retained.

## 9. Correct mistakes in the direction of the example

The source describes inspiration from Hebbian learning; the implemented rule is a supervised error-correction update using the observed label.

## 10. The score moves by a squared input length

Makes the source intuition precise without implying a single update always fixes an error or improves total accuracy.

## 11. Step through the perceptron’s learning process

Added exact 0/1 perceptron implementation using original AND, noisy AND or XOR points. Zero initialization; η=0.25,1,4; source or reversed order. A complete epoch without updates certifies convergence. Runs stop at 25 epochs if that has not occurred. Animation pauses when leaving the slide.

## 12. Compare with the supplied trained perceptron

Original cls_and_noisy_mod.json. The finite endpoints and observations are unchanged. This supplied line is distinguished from the learning trace in the preceding lab; source training settings are not provided.

## 13. A complete quiet epoch is the stopping signal

A finite dataset, a positive separating margin and cycling through all examples support the classical convergence guarantee. The source’s approximate single-weight-change stopping description is replaced by a no-update full pass.

## 14. A larger η does not always mean faster learning

Corrects the source’s universal claim that smaller η requires more updates and larger η speeds convergence. In the zero-initialized, unregularized standard perceptron, a constant positive factor rescales every iterate. The lab uses powers of two to avoid introducing rounding-driven differences between its η choices.

## 15. XOR exposes the limit of one linear separator

Original cls_xor.json: four original XOR points. The training lab can also be switched to these exact observations.

## 16. The required inequalities contradict one another

This proof uses the deck’s predict-1-at-zero convention. Nonlinear features or multiple units can represent XOR. A multilayer perceptron is deferred to the later part of the course.

## 17. Equal training accuracy can hide different geometry

Original cls_svm_both_mod.json: 180 observations per class and both source separators. The source calls the second line more vulnerable; the deck treats margin as a geometric criterion, not a guaranteed ordering of future test errors.

## 18. The weight vector is normal to the boundary

Clarifies the source’s notation switch: augmented weights are useful for the perceptron update, but the SVM regularizer and geometric norm exclude the bias.

## 19. Inspect the source’s margin construction

Original cls_svm_margin.json: ten observations, polygon, separator, both margin lines and weights-vector endpoints preserved. The source fixed viewport is retained to show the intended geometry rather than remote polygon vertices.

## 20. Normalize the score by the length of w

Explain the displayed relationship and connect it to the preceding example.

## 21. The two support planes are 2 / ‖w‖ apart

Explain the displayed relationship and connect it to the preceding example.

## 22. Rotate a separator and measure its clearance

Added geometric explorer using all ten source margin observations. The unit normal is (cos θ,sin θ); h=uᵀx+d. Signed clearance is min_i t_i h(x_i). Positive clearance yields full symmetric empty-strip width 2×clearance. Nonpositive clearance is explicitly not a separating margin. The optimum is solved and checked independently in Python.

## 23. Minimize weight length subject to separation

Explain the displayed relationship and connect it to the preceding example.

## 24. Support vectors carry the boundary information

Defines support vectors through nonzero dual multipliers and avoids asserting that every margin-touching observation must have a strictly positive alpha.

## 25. Slack variables make room for violations

Added bridge from the source’s hard-margin derivation to the practical SVM examples. C does not directly prescribe an exact number of classification errors.

## 26. A margin violation need not be a wrong label

For soft-margin SVM the dual box constraints are 0≤alpha_i≤C. Those with 0<alpha_i<C are on a support plane; points at alpha_i=C may lie within the margin or be misclassified.

## 27. Some class arrangements need a curved boundary

Original cls_circle_clusters.json. The squared-radius ranges of the two classes are disjoint, which allows the particular horizontal separating plane used later.

## 28. Lift a circle into a third coordinate

The source data are centered around the origin. A different center would require using centered coordinates or an appropriate feature map. The illustrative horizontal plane is not claimed to be the unique maximum-margin plane in the full three-dimensional space.

## 29. Rotate the original data in the lifted space

Original cls_circle_clusters_3d.json: all x,y,z arrays preserved and independently checked against z=x²+y². An optional added plane is placed midway between the maximum inner squared radius and minimum outer squared radius. The plane is a valid separator, not a claim to reproduce an unknown SVM fit.

## 30. A feature map offers a possibility, not a guarantee

Explain the displayed relationship and connect it to the preceding example.

## 31. Replace x with ψ(x) in the constraints

Explain the displayed relationship and connect it to the preceding example.

## 32. Explicit polynomial features grow quickly

The count is binomial(110,10)=46,897,636,623,981 including the constant, or one less if the constant is handled as a separate intercept. Kernel computation does not remove dependence on sample size.

## 33. Attach one multiplier to each margin constraint

Corrects the source’s unconstrained-problem description. Feasibility and convexity support strong duality here; zero gradients of the Lagrangian alone do not constitute all KKT conditions.

## 34. Eliminate the feature-space weights

The bias stationarity equation is an equality constraint on alpha, not an expression that sets b=0. Bias is recovered separately from KKT conditions.

## 35. Only pairwise inner products remain

The input dimension is hidden in pairwise mapped inner products, but the dual has one coefficient per training observation. The bias is not included in the feature inner product unless a different model is explicitly defined.

## 36. Compute the inner product without the feature vector

This homogeneous quadratic map differs from the earlier paraboloid lift (x₁,x₂,x₁²+x₂²). Its associated kernel is the squared dot product. The paraboloid lift instead induces xᵀz+‖x‖²‖z‖².

## 37. Check the quadratic kernel identity numerically

Added live exact-formula explorer for ψ(x)=(x₁²,√2x₁x₂,x₂²). The chart shows contributions from its three coordinates; both calculations use the displayed vectors and agree to floating-point tolerance.

## 38. Evaluate the boundary in terms of training cases

For a hard-margin support vector with positive alpha, t_k s(x_k)=1. For soft margin use a free support vector 0<alpha_k<C; if none exists, a bias can be chosen from the KKT-compatible interval.

## 39. Different kernels encode different geometry

Explain the displayed relationship and connect it to the preceding example.

## 40. Compare fitted boundaries on the same circular data

Added offline explorer of 15 independently fitted scikit-learn SVC models on all 300 source circular observations. Linear and homogeneous degree-2 polynomial kernels each use C=0.1,1,100; RBF uses all nine C×gamma combinations, gamma=0.1,1,10. Raw coordinates, no hidden standardization. Support vectors and dual coefficients are stored; browser decision scores are evaluated from them and checked against Python references. Scores displayed are training scores, not validation estimates.

## 41. The Gram matrix must be positive semidefinite

Explain the displayed relationship and connect it to the preceding example.

## 42. Avoid huge feature vectors, keep an eye on n

Corrects the source’s exact 2m operation count and its conflation of feature count with operation count. Big-O expresses the relevant difference. Efficient solvers and approximate feature maps can reduce practical costs.

## 43. Validate the representation and the classifier

Neither a visually clean boundary nor perfect training accuracy establishes generalization. Kernel and C settings in this deck are demonstrations, not selected recommendations.

## 44. Four questions about separators

Explain the displayed relationship and connect it to the preceding example.

## 45. What the answers should make clear

Explain the displayed relationship and connect it to the preceding example.

## 46. Learn the line. Choose the margin. Change the space.

Explain the displayed relationship and connect it to the preceding example.

## 47. Return to the original charts and derivations

Explain the displayed relationship and connect it to the preceding example.

