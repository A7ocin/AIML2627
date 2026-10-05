# Lesson 7 — Clustering

## 1. Clustering

Final course lecture. All eight original Plotly resources are retained locally, including all five original K-means animation frames. Added labs use the original observations.

## 2. Four views of the same question

Explain the displayed relationship and connect it to the preceding example.

## 3. The labels are no longer supplied

Explain the displayed relationship and connect it to the preceding example.

## 4. Look for structure in the original observations

Original kmeans_data.json, all coordinates retained.

## 5. A cluster is a useful modeling choice

Internal scores, stability and domain knowledge can evaluate unlabeled results. External labels, when available for evaluation, provide another perspective.

## 6. Represent K groups with K centroids

Explain the displayed relationship and connect it to the preceding example.

## 7. Minimize squared distances within clusters

Explain the displayed relationship and connect it to the preceding example.

## 8. Choose the nearest centroid

Explain the displayed relationship and connect it to the preceding example.

## 9. The derivative explains why the mean appears

Corrects the sign of the source derivative. The stationary mean remains the same. The added trace retains an empty center; none of its displayed runs needs this fallback.

## 10. Replay the course’s K-means animation

Original kmeans_steps.json data and all five frames. Frame numbers are source snapshot indices, not our new half-step trace.

## 11. Separate assignment from centroid movement

Added Lloyd trace on the original 240 points: K=2,3,4; seeds 0,7,19; 79 states in total. Each update and assignment is separate. Final objectives independently checked with sklearn KMeans.

## 12. The same data can lead to different endpoints

Explain the displayed relationship and connect it to the preceding example.

## 13. K-means favors compact Euclidean groups

Explain the displayed relationship and connect it to the preceding example.

## 14. The objective alone cannot choose K

Splitting a cluster cannot increase the globally optimal squared-error objective. If every observation has its own center, distortion is zero. That does not make n clusters useful.

## 15. Inspect the original elbow curve

Original elbow.json, including its highlighted point and all ten supplied distortion values. Source fitting settings are not supplied.

## 16. An elbow suggests a tradeoff

Explain the displayed relationship and connect it to the preceding example.

## 17. Compare cohesion with the nearest other group

This deck uses ordinary Euclidean distances, the standard default. The source writes squared distances; that is a different dissimilarity choice and produces different numerical scores. When both a and b are zero, use zero.

## 18. Silhouette is a geometric diagnostic

Explain the displayed relationship and connect it to the preceding example.

## 19. Compare K using the same fitted partitions

Added sklearn KMeans fits K=1…10, 30 starts each, random_state=42, raw source points. The new curve is distinguished from the original elbow resource.

## 20. Inspect silhouette one observation at a time

Added exact Euclidean silhouette explorer using the preceding fitted partitions. Browser values checked against sklearn silhouette_samples for all observations and K=2…10.

## 21. Replace one-hot assignments with responsibilities

Explain the displayed relationship and connect it to the preceding example.

## 22. A Gaussian needs a mean and a covariance

A covariance is generally positive semidefinite; an invertible covariance is required by the standard nonsingular Gaussian density. Regularization prevents singular fitted components.

## 23. Mix densities with nonnegative weights

Explain the displayed relationship and connect it to the preceding example.

## 24. Normalize each component’s weighted density

Explain the displayed relationship and connect it to the preceding example.

## 25. Maximize the observed-data log likelihood

Explain the displayed relationship and connect it to the preceding example.

## 26. Use the current model to improve the next one

Corrects wording that suggests taking an expectation of likelihood rather than log likelihood. Exact EM has a nondecreasing observed likelihood, but not a global-optimum guarantee.

## 27. The M-step is a soft version of averaging

Explain the displayed relationship and connect it to the preceding example.

## 28. Watch EM reshape three Gaussian components

Added full-covariance, three-component EM on all original 240 points. Forty updates; diagonal covariance regularization 10⁻⁶. Ellipses are one Mahalanobis-radius contours, not 68% regions in 2D. Soft probabilities update for the chosen point.

## 29. A rising likelihood still needs interpretation

Explain the displayed relationship and connect it to the preceding example.

## 30. K-means is related to a limiting mixture model

Ordinary Lloyd K-means is not literally unrestricted Gaussian-mixture EM. Describe it as a hard-assignment or small-variance connection rather than conflating the two algorithms.

## 31. Build a family of nested groups

Explain the displayed relationship and connect it to the preceding example.

## 32. Read the course’s original dendrogram

Original hc_dendogram.json: all points, labels, branch coordinates and heights retained. Layout and contrast corrected. The supplied tree matches average linkage on these observations.

## 33. Choose a height, then cut across the tree

Explain the displayed relationship and connect it to the preceding example.

## 34. The linkage rule changes the tree

Average linkage weights each observation pair equally. It is not the same as equally averaging distances between merged clusters regardless of their sizes.

## 35. Change the linkage and the merge budget

Added exact SciPy linkages on the six source points. Merge-count selection is valid even for centroid inversions. Shows the resulting cluster count and most recent merge height.

## 36. A tree makes structure inspectable

Explain the displayed relationship and connect it to the preceding example.

## 37. Change the coordinate system

Explain the displayed relationship and connect it to the preceding example.

## 38. Start with variation aligned to an axis

Original gaussian_points.json, all 300 observations retained. Equal axis units preserve geometry.

## 39. The largest variation can lie between the axes

Original gaussian_points_rot30.json, all 300 observations retained.

## 40. Subtract the mean and measure covariance

Corrects the source mean denominator n−1. This deck consistently uses sample covariance (ddof=1), including its added PCA variance calculations.

## 41. Maximize variance with a unit vector

Explain the displayed relationship and connect it to the preceding example.

## 42. The answer is an eigenvector

Explain the displayed relationship and connect it to the preceding example.

## 43. Rotate a projection and find the first component

Added live centered 2D PCA projection on either original 300-point Gaussian dataset. Sample variance and squared reconstruction error computed directly. Best PC comes from independent NumPy eigh.

## 44. Keep d directions, then map back approximately

Ud has orthonormal columns. Explained variance is not predictive accuracy or evidence that discarded directions are irrelevant to a downstream task.

## 45. A compact representation can serve several tasks

Explain the displayed relationship and connect it to the preceding example.

## 46. Feature units can dominate a distance

Original two_gaussian_blobs.json: both 300-point groups retained. Source colors identify generating groups only for illustration, not labels supplied to a clustering fit.

## 47. Rescaling does not make a feature Gaussian

Standardization does not turn an arbitrary distribution into a normal distribution. New observations can lie outside a fitted min–max range. Sample vs population variance conventions must be stated.

## 48. Compare every original preprocessing panel

Original two_gaussian_blobs_panel.json: every coordinate in all eight traces retained. Four panels are presented one at a time to keep labels and geometry legible; axes use equal units. Source transformations are shown as supplied.

## 49. Identity covariance comes at a price

The identity assumes positive retained eigenvalues and a consistent covariance convention. A truncated transform whitens only the retained subspace.

## 50. Make the representation and the grouping explicit

Explain the displayed relationship and connect it to the preceding example.

## 51. Five questions to connect the ideas

Explain the displayed relationship and connect it to the preceding example.

## 52. The distinctions that matter

Explain the displayed relationship and connect it to the preceding example.

## 53. Structure depends on the question you ask

Explain the displayed relationship and connect it to the preceding example.

## 54. Course resources and technical references

Explain the displayed relationship and connect it to the preceding example.

