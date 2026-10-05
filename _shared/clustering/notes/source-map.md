# Source map — Clustering

## Main resource

Alessandro Torcinovich, [7 — Clustering, AIML 2025–26](https://www.aretor.it/courses/aiml2526/lessons/07_clustering/), retrieved 12 September 2026 using the user's authorized course access. The site's footer credits Alessandro Torcinovich and states CC BY-NC-ND 4.0. The original resource remains the source of the lecture and supplied chart data. Credentials are not included in this pack.

The resource has eight Plotly JSON charts, one with five animation frames. It contains no lesson images, video elements, or embedded video players. The presentation therefore uses the original data visualizations and new SVG teaching diagrams instead of unrelated media.

## Original interactive resources

The original JSON files are copied into `data/` without numerical changes. `js/course-data.js` embeds the same data so that local file opening does not depend on fetch permissions.

| File | Preserved content | Slide |
| --- | --- | --- |
| `kmeans_data.json` | All 240 observations | 4, `data-lab` |
| `kmeans_steps.json` | Base data and all five source animation frames, including every centroid coordinate and point assignment color | 10, `source-animation` |
| `elbow.json` | Ten distortion values and original highlighted point | 15, `elbow-source` |
| `hc_dendogram.json` | Six observations, labels, five branches and exact merge heights | 32, `dendrogram-source` |
| `gaussian_points.json` | All 300 Gaussian observations | 38, `aligned-lab` |
| `gaussian_points_rot30.json` | All 300 rotated observations | 39, `rotated-lab` |
| `two_gaussian_blobs.json` | Both 300-point source groups | 46, `scale-source` |
| `two_gaussian_blobs_panel.json` | All eight traces: 600 observations in each of four transformations | 48, `preprocessing-lab` |

See `source-assets.json` for exact original asset URLs and SHA-256 hashes. The source's spelling `hc_dendogram` is kept in filenames; slide text uses “dendrogram.”

Presentation changes include the established dark theme, legible labels, brighter point colors, consistent chart controls and equal axis units for point-cloud plots. The five-frame animation uses local Step, Play/Pause, Reset and frame selection. Its assignment colors are mapped one-to-one onto the deck palette. Source snapshots are distinguished from the added half-step Lloyd trace. The four preprocessing panels are shown individually through a selector so each can be read and explored at full size; no traces are omitted.

The supplied dendrogram corresponds to average linkage on its six points. Tied pairwise distances permit more than one equivalent initial leaf ordering; the added SciPy tree may order leaves differently. Merge heights and partitions, rather than leaf positions alone, determine the hierarchy.

## Added interactive experiments

All added fits use original course observations. They do not claim to recover the source author's fitting settings.

| Slide | Experiment | Method |
| --- | --- | --- |
| 11 | K-means half-step trace | K=2,3,4; NumPy random seeds 0,7,19; 79 states across nine runs. Initial centers are distinct sampled observations. Nearest-center ties choose the lowest index. Empty centers would be retained. Each mean update and assignment is shown separately. Stop on stable assignments, with a 50-iteration cap. Final distortion checked against scikit-learn Lloyd KMeans initialized at the same centers. |
| 19 | Number-of-clusters comparison | K=1…10, 30 initializations each, random_state=42, tol=10⁻⁸. Best fitted distortion retained. All 240 raw observations; no hidden scaling. Partition, distortion and silhouette views are selectable. |
| 20 | Silhouette explorer | Euclidean distances on those fitted partitions; all 2,160 pointwise scores for K=2…10 checked against scikit-learn. Singletons receive zero. K=1 is undefined. |
| 28 | Gaussian mixture / EM | Three full-covariance components on the 240 original observations. Initialize means at source indices 0,1,5; equal weights; common sample covariance. Forty EM updates with 10⁻⁶ added to each covariance diagonal. Evaluate responsibilities stably in log space. Record parameters, probabilities and observed-data log likelihood at all 41 states. One-radius ellipses are not 68% probability regions in two dimensions. |
| 35 | Hierarchy explorer | SciPy single, complete, average and centroid linkages on all six source observations, Euclidean distance. Every merge-count partition is available. A cut line is shown between strictly different consecutive heights. At tied heights, an intermediate merge-count partition may have no corresponding strict horizontal cut. |
| 43 | PCA projection | Both original 300-point Gaussian datasets, centered using the sample mean. Compute projections, sample variance, explained variance and reconstruction SSE live in JavaScript. NumPy's symmetric eigensolver supplies independent optimal directions and eigenvalues. |

The cover shows the actual 240-point dataset with the added K=3 fitted partition. The assignment, Gaussian-ellipse, EM and hierarchy diagrams are newly authored SVGs. Diagram 31 is schematic; the following charts carry the measured merge distances.

## Technical clarifications and corrections

- Clustering has evaluation methods even without supplied labels: internal diagnostics, stability and domain assessment. A pattern or favorable score does not establish a unique true partition.
- The K-means centroid derivative is `2 Σ rᵢₖ(μₖ−xᵢ)`, correcting the sign in the source. The stationary mean formula is unchanged. Empty clusters require an explicit policy.
- Globally optimal distortion is nonincreasing in K. Independently obtained local fits need not be monotone. An elbow is a heuristic, not a guaranteed optimal K.
- The deck uses ordinary Euclidean silhouette. The source formulas use squared Euclidean dissimilarities; these lead to different numerical results. A score is calculated for each candidate partition and averaged over observations; only then may K be selected by comparison.
- A full-dimensional Gaussian density requires positive-definite covariance. General covariance matrices may be semidefinite, but singular density formulas require separate treatment.
- Responsibilities are posterior probabilities; mixture weights are priors; density values are not probabilities and need not lie in [0,1].
- EM maximizes expected complete-data **log** likelihood. Its exact monotonicity guarantee is local and does not promise a global maximum. Regularized practical updates and a fixed iteration budget are stated explicitly. The displayed regularized trace is numerically checked to have nondecreasing observed likelihood.
- Lloyd K-means is connected to hard assignments or a small-variance limit with equal spherical Gaussian covariances; it is not identical to unrestricted soft Gaussian-mixture EM.
- Hierarchical clustering postpones selection of a resolution. Centroid linkage can invert merge heights. The explorer uses merge count so partitions remain well-defined in that case.
- PCA's sample mean divides by **n**, correcting the source's n−1 denominator. Sample covariance divides by n−1. Projection acts on centered data.
- PCA eigenvector signs are arbitrary, and repeated eigenvalues can make a basis nonunique. Large variance does not automatically identify useful signal. PCA is not a clustering algorithm.
- Standardization changes mean and variance, not distributional shape; it does not make arbitrary data Gaussian. New points may leave a fitted min–max range.
- The supplied standardized and whitened panels use population variance. Their sample covariance diagonals are approximately 600/599 = 1.001669, while their population variances are approximately one. The displayed sidebar explicitly reports sample covariance.
- Whitening decorrelates and rescales retained components when eigenvalues are positive. Uncorrelated variables are not generally independent; small eigenvalues can amplify noise. Scaling and whitening choices depend on the analysis.

## References

- [Course lecture](https://www.aretor.it/courses/aiml2526/lessons/07_clustering/)
- James, Witten, Hastie, Tibshirani and Taylor, *An Introduction to Statistical Learning with Applications in Python*, Chapter 12, 2023. [Book website](https://www.statlearning.com/).
- Bishop, *Pattern Recognition and Machine Learning*, Chapters 9 and 12, 2006. [Microsoft Research](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/).
- scikit-learn's primary documentation: [clustering](https://scikit-learn.org/stable/modules/clustering.html), [mixtures](https://scikit-learn.org/stable/modules/mixture.html), [PCA](https://scikit-learn.org/stable/modules/decomposition.html), [preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html). Checked 12 September 2026.

The fitted-data generator records actual installed numerical-library versions in `numerical-review.json`; these need not match the online documentation's latest release. All original data and new fitted states are stored locally for reproducibility.
