# AIML content audit

Reviewed on 13–14 September 2026. Applies to the eight lecture `index.html` files and their eight `handout.html` companions in this directory.

## Finding and scope

The review found substantive mistakes and misleading shortcuts, predominantly in the History slides, plus several missing technical qualifications. Those issues have been corrected in the HTML materials. The History handout already distinguished several concepts correctly; the slides now agree with it, and the handout supplies the corrected dates and additional explanation.

The audit covered all 364 instructional slides, their 364 handout chapters, equations, explanatory notes, worked examples and answer sections. It also checked the numerical implementations behind the 70 interactive examples. The eight closing navigation slides bring the presentation total to 372.

“Complete” here means coverage of the supplied eight-lecture curriculum, with the assumptions needed to interpret its central claims. It does not mean an exhaustive account of AI or ML, a proof that no error remains, or validation of every claim in every externally linked video or reading. History is explicitly a selection of milestones through 2022, rather than a current survey through 2026. Era boundaries are approximate and overlapping.

## Curriculum coverage

Fresh copies of all eight authenticated course resources were compared with the local materials. No missing major section was found in their topic outlines. The local handouts expand the source material and retain the original examples while distinguishing new demonstrations from supplied plots.

| Lecture | Instructional slides / handout chapters | Interactive examples | Coverage checked |
|---|---:|---:|---|
| [00 — History](00_History/handout.html) | 54 | 0 algorithm labs | Statistics, computability, cybernetics, early AI, expert systems, neural learning, AI winters, deep learning and generative systems; images, diagrams and three video controls retained. |
| [01 — Search](01_Search/handout.html) | 43 | 9 | Graphs and frontiers; BFS, DFS, iterative deepening, uniform cost, greedy best first, heuristic DFS, A*, branch-and-bound; completeness, optimality and pruning assumptions. |
| [02 — Constraints](02_Constraints/handout.html) | 38 | 6 | Variables, domains, constraints, generate-and-test, backtracking, generalized arc consistency, domain splitting, local search and annealing. No new factual correction was required in this pass. |
| [03 — Introduction to ML](03_Intro_ML/handout.html) | 36 | 6 | Learning components, supervised/unsupervised/semi-supervised/reinforcement learning, domains, regression formulation, datasets, hypotheses, fitting and generalization. No new factual correction was required in this pass. |
| [04 — Regression](04_Regression/handout.html) | 46 | 11 | Least squares, metrics, polynomial features, rank and numerical fitting, under/overfitting, bias–variance, coefficient inference, multiple regression, causation and diagnostics. |
| [05 — Classification](05_Classification/handout.html) | 46 | 10 | Bayes decisions and risk, error costs, confusion metrics, Naive Bayes, conditional distributions, logistic likelihood, KNN classification/regression and validation. |
| [06 — Classification 2](06_Classification_2/handout.html) | 47 | 14 | Threshold units, perceptron updates and convergence, XOR, margin geometry, hard/soft-margin SVM, feature maps, primal/dual derivations, kernels and computational costs. |
| [07 — Clustering](07_Clustering/handout.html) | 54 | 14 | K-means, initialization and K selection, silhouette, Gaussian mixtures, EM, hierarchies/linkage, PCA, reconstruction, scaling and whitening. |

Source lessons: [History](https://www.aretor.it/courses/aiml2526/lessons/00_timeline/), [Search](https://www.aretor.it/courses/aiml2526/lessons/01_search/), [Constraints](https://www.aretor.it/courses/aiml2526/lessons/02_constraint/), [ML introduction](https://www.aretor.it/courses/aiml2526/lessons/03_intro/), [Regression](https://www.aretor.it/courses/aiml2526/lessons/04_regression/), [Classification](https://www.aretor.it/courses/aiml2526/lessons/05_classification/), [Classification 2](https://www.aretor.it/courses/aiml2526/lessons/06_classification2/), [Clustering](https://www.aretor.it/courses/aiml2526/lessons/07_clustering/). These pages require the course login.

## Corrections and qualifications

### History

| Locations (slide IDs; matching handout chapters) | Correction and basis |
|---|---|
| `aiml`, `title`, `eras`, `summary` | Replaced the claim that intelligence is absent from nature with an operational AI description. Learning occurs through a training/update process and does not guarantee continuous improvement during use. Removed an inevitable-progress narrative and stated the historical cutoff. |
| `era-stat`, `bayes`, `linreg` | Bayesian updating requires evidence/likelihood as well as a prior. Replaced the misleading 1794 least-squares attribution with Legendre’s 1805 publication and Gauss’s 1809 treatment; retained Galton’s 1886 height study without asserting a disputed absolute priority. See the [original Bayes essay record](https://doi.org/10.1098/rstl.1763.0053) and [archived least-squares primary texts](https://www.gtfp.cs.rhul.ac.uk/pulskamp/Least_Squares/index.html). |
| `era-stat`, `logreg`, `probit` | Separated Verhulst’s continuous logistic growth curve from binary logistic regression. Berkson’s logit work belongs to 1944. Probit remains an alternative using the normal CDF; it was not simply replaced and abandoned. See [Berkson’s 1944 paper record](https://hero.epa.gov/reference/3201/). |
| `era2-stat`, `churchturing`, `turochamp`, `imitation` | Distinguished the Church–Turing thesis from the theorem that the general logical decision problem is undecidable. Changed “first chess-playing program” to an early algorithm and distinguished hand simulation from implementation. The imitation game is an influential proposal, not a universally necessary test. See [Turing’s computability paper](https://londmathsoc.onlinelibrary.wiley.com/doi/10.1112/plms/s2-42.1.230), [Turing’s games manuscript archive](https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-7) and [Turing’s 1950 paper](https://www.cs.mcgill.ca/~dprecup/courses/AI/Materials/turing1950.pdf). |
| `era3-stat`, `mp-neuron`, `hebb`, `perceptron` | Distinguished a fixed threshold model, Hebbian activity-based adaptation, the supervised perceptron mistake rule, and delta-rule learning. Removed an invented verbatim attribution of the firing-together slogan. Identified generalized neuron graphics as teaching abstractions. See [Rosenblatt’s paper](https://www.cs.cmu.edu/~epxing/Class/10715/reading/Rosenblatt.perceptron.pdf) and the [perceptron derivation in Cornell course notes](https://www.cs.cornell.edu/~sridharan/lecnotes.pdf). |
| `era4-stat`, `dartmouth`, `logic-theorist` | The AI name already appears in the 1955 proposal; the summer study was in 1956. Added Rochester to the four proposal authors and credited Newell, Shaw and Simon for the early reasoning programs. See the [original Dartmouth proposal](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html). |
| `div-era-v`, `era5-stat`, `winter1`, `div-era-viii`, `era8-stat`, `winter2` and generated timelines | Replaced single-year/single-cause winter explanations with approximate periods and multiple technical, funding and commercial factors. The 1969 perceptron book is not the entire first winter; vanishing gradients are not an explanation of the second commercial winter. See the [Lighthill report archive](https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm) and [expert-system pioneers’ oral histories](https://computerhistory.org/blog/chm-releases-new-recordings-and-personal-stories-with-ai-expert-systems-pioneers/). |
| `era6-stat`, `experts`, `fifth-gen` | Removed an unsupported ranking of medicine as the first/main expert-system application. Distinguished chemistry, consultation and configuration examples, and replaced sweeping commercial-failure judgments with a qualified account. See the [Computer History Museum timeline](https://www.computerhistory.org/timeline/ai-robotics/) and [IPSJ’s inference-workstation record](https://museum.ipsj.or.jp/en/computer/other/0009.html). |
| `div-era-vii`, `era7-stat`, `neocognitron`, `hopfield`, `backprop` | Aligned the overview with the 1980–89 examples. Distinguished historical spatial hierarchies from exact modern CNN implementations; made Hopfield convergence conditions explicit and removed a guarantee of recall from its diagram; separated chain-rule gradient calculation from optimization and 1986 popularization from invention. Sources: [Fukushima 1980](https://redwood.berkeley.edu/wp-content/uploads/2020/08/Fukushima1980.pdf), [Hopfield 1982](https://pubmed.ncbi.nlm.nih.gov/6953413/), [Rumelhart, Hinton and Williams 1986](https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf). |
| `era8-stat`, `mlturn` | Distinguished the 1992 kernel SVM, 1995 soft-margin SVM, Ho’s 1995 forests and Breiman’s 2001 formulation. Removed the claim that forests are prized for direct interpretability like a single tree. See [Breiman’s original paper](https://www.stat.berkeley.edu/users/breiman/randomforest2001.pdf) and [SVM documentation](https://scikit-learn.org/stable/modules/svm.html). |
| `era9-stat`, `imagenet` | Separated 2006 representation-learning work, the 2009 ImageNet publication, ILSVRC starting in 2010, and AlexNet in 2012. Distinguished the full image archive from the 1,000-class task; corrected the word2vec description. See [Hinton and collaborators’ 2006 paper](https://www.cs.toronto.edu/~hinton/absps/ncfast.pdf), [ImageNet’s project description](https://image-net.org/about.php) and [the challenge archive](https://ftp.image-net.org/challenges/LSVRC/index.php). |
| `era10-stat`, `alphago-transformers`, `gpt3`, `chatgpt` | Separated Fan Hui (2015), Lee Sedol (2016), the Transformer (2017), GPT-3 (2020) and the ChatGPT launch (2022). Distinguished AlphaGo’s game decisions from generative modeling, and in-context examples from weight training. Labeled the chat illustration as invented. See [DeepMind’s AlphaGo account](https://deepmind.google/research/alphago/), [Transformer paper](https://arxiv.org/abs/1706.03762), and [GPT-3 paper](https://arxiv.org/abs/2005.14165). |
| `era10-stat` and its handout | Added brief coverage of [GANs (2014)](https://arxiv.org/abs/1406.2661) and [DDPM (2020)](https://arxiv.org/abs/2006.11239), so generative AI is not implicitly equated with language Transformers. |
| `bitter` | Replaced a purported quotation with an explicit paraphrase; treated Sutton’s argument as a research perspective, not a measured law that compute alone explains progress. See [the essay, reproduced with permission](https://bitterlesson.ai/). |

### Technical lectures

| Location | Correction / reasoning |
|---|---|
| Search `ucs` | Finite-graph optimality with nonnegative edges assumes correct duplicate handling. An unrestricted tree search can keep following zero-cost-cycle paths. The handout states standard finite-branching and positive edge-lower-bound conditions for infinite spaces. |
| Search `branch-bound` | Safe lower-bound pruning and termination are separate properties. Starting at an infinite bound can leave DFS on an infinite branch. The handout now states a sufficient finite-explored-tree condition. These qualifications agree with [Poole and Mackworth’s search chapter](https://artint.info/3e/html/ArtInt3e.Ch3.S6.html). |
| Regression `rse` | Unbiased RSS/df requires the correct conditional mean, error covariance σ²I, full column rank, and positive residual degrees of freedom. Homoscedasticity alone does not exclude correlated errors. The square root is not exactly unbiased. |
| Regression `pvalues`, `interval` | Added the need to account for data-dependent model selection and multiple testing. Ordinary prespecified-model inference does not automatically remain valid after searching models on the same outcomes. See [Shalizi’s regression text](https://www.stat.cmu.edu/~cshalizi/TALR/TALR.pdf), particularly inference and model-selection chapters. |
| Classification `classification` | Binary OLS is a linear probability model, although its predictions need not remain in [0,1]. Corrected the visible statement to agree with the already accurate handout and notes. |
| Classification 2 `distance`, `margin-width` | An arbitrary strict separator can be scaled to minimum signed functional margin one. Rescaling alone need not put both classes’ closest points on −1 and +1; both support planes touch at the hard-margin optimum with both classes present. This follows directly from scale invariance and optimization over the bias as well as the weights. |
| Clustering `mstep` | Responsibility-weighted means and covariances require positive effective count Nₖ. A zero-count component needs an explicit policy; covariance singularity is a separate issue. |
| Clustering `center`, `reconstruct` | Stated the i.i.d./finite-second-moment conditions for calling sample covariance unbiased; explained-variance ratios require positive total variance. Zero-variance data have an undefined ratio. |
| Clustering `whitening` | Replaced ambiguous population `Cov(z)=I` with fitted sample covariance `S_z=I`, using the same covariance convention and positive retained eigenvalues. Estimated whitening need not whiten unseen data exactly. See [PCA documentation](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html). |

## Numerical and browser checks

Existing numerical suites were rerun against the local engines. All passed:

| Lecture | Passing assertions |
|---|---:|
| Search | 923 |
| Constraints | 1,002 |
| ML introduction | 4,051 |
| Regression | 660 |
| Classification | 909 |
| Classification 2 | 57,064 |
| Clustering | 274,266 |
| **Total** | **338,875** |

These are assertions over finite fixtures, simulations and independently prepared reference values, not 338,875 distinct factual claims or a proof of correctness on every possible input. The checks include search paths/costs, CSP assignments/propagation, least-squares statistics, probability scores, KNN decisions, perceptron updates, SVM scores, silhouettes, responsibilities, cluster traces and PCA calculations. The regression source-verification script also reran with NumPy/SciPy, independently recomputing the stored-data statistics and polynomial-fit comparisons.

All 372 presentation pages were rendered in Chromium. All eight handouts loaded with 364 chapters and 70 retained lab containers. The browser pass found no uncaught page errors or tested slide-content overflow; mobile handouts fit the tested 390-pixel viewport. All 60 ending navigation links point to existing local targets. A persistent Course home button is also provided on all presentation pages and in each handout’s sticky toolbar; these 16 additional links return to the course welcome page. Edited layouts were captured for inspection. The JavaScript numerical engines and source datasets were not changed by this content pass.

## Limits that remain explicit in the teaching materials

| Example | What cannot be established from the supplied resource |
|---|---|
| Fertilizer/yield and cholesterol/disease illustrations | Measurement units, sampling design and validated domain provenance are absent. These demonstrate statistical mechanics, not verified agricultural or clinical conclusions. |
| High-degree polynomial source curves | The degree-23 curve and reported metrics cannot be treated as a reproducible stable full-rank OLS result without the original fitting settings. Its stored curve is distinguished from independently recomputed fits. |
| Ice cream, sharks and temperature | The two-variable association is reproducible; the temperature-adjusted claim is not, because temperature observations are absent. The common-cause explanation is explicitly illustrative. |
| Source logistic curve | Coordinates are available, but the fitting code, regularization and exact settings are not. It remains identified as a supplied curve. |
| Source perceptron/separator drawings | Geometry and predictions can be inspected, but unknown training settings prevent reproducing the original training trajectory. Added simulations have explicit conventions. |
| Source elbow plot | Original K-means initialization and fitting settings are absent. The added selection experiment uses stated settings and is distinguished from this plot. |
| Historical diagrams and linked media | Diagrams and invented exchanges are labeled as illustrations. Broad historical priority and periodization claims are qualified. This pass does not certify every statement in external readings or full video transcripts, or their future availability. |

The next useful extension, if the curriculum is expanded, would be fuller treatment of regularization and optimization, decision-tree learning, neural-network training, calibration and broader evaluation design. Those are extensions beyond the supplied lesson outlines, rather than omissions silently filled with invented source material.
