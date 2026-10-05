# Source coverage and numerical review

Primary source: [AIML 2025/26 · Lesson 04 · Regression](https://www.aretor.it/courses/aiml2526/lessons/04_regression/), accessed on 11 September 2026 with the user's authorized course access. This is the next lecture after Introduction to Machine Learning. Credentials are not stored in the deck.

| Source topic | Slides |
| --- | --- |
| Introductory scatter and 4.2: simple linear regression | 3–5 |
| 4.3: training, RSS and OLS | 6–9 |
| 4.4: training and test evaluation | 10–14 |
| 4.5: polynomial features, matrix OLS and derivation | 15–19 |
| 4.5.1–4.5.2: overfitting and underfitting | 20–23 |
| 4.5.3: bias, variance and selection | 24–27 |
| 4.6: coefficient uncertainty and hypothesis tests | 28–33 |
| 4.7: multiple regression and causation | 34–38 |
| 4.8: LINE assumptions | 39–41 |
| Workflow, exercises, answers, summary and references | 42–46 |

## Preserved interactive charts

Each source JSON resource is stored in `data/` and embedded in `js/course-data.js`. All original x/y coordinates, curve samples and point sets are retained. The local Plotly runtime provides the interactions offline. Native point selectors supplement pointer hover for keyboard inspection. Explicit Zoom, Pan and Reset view controls replace the small source modebar.

| Original resource | Slide | Retained contents |
| --- | --- | --- |
| [lr_scatter.json](https://www.aretor.it/json/aiml2526/regression/lr_scatter.json) | 3 | 25 observations |
| [lr_scatter_mod.json](https://www.aretor.it/json/aiml2526/regression/lr_scatter_mod.json) | 9 | Supplied line and 25 training points |
| [lr_scatter_mod_with_test.json](https://www.aretor.it/json/aiml2526/regression/lr_scatter_mod_with_test.json) | 14 | Supplied line, 25 training and 10 test points |
| [lr_scatter_polymods_with_test.json](https://www.aretor.it/json/aiml2526/regression/lr_scatter_polymods_with_test.json) | 20 | Four supplied degree curves, 25 training and 10 test points |
| [lr_underfitting.json](https://www.aretor.it/json/aiml2526/regression/lr_underfitting.json) | 22 | Three supplied degree curves, 25 training and 10 test points |
| [lr_maybe.json](https://www.aretor.it/json/aiml2526/regression/lr_maybe.json) | 28 | 90 observations |
| [lr_corcau.json](https://www.aretor.it/json/aiml2526/regression/lr_corcau.json) | 36 | Supplied line, 80 training and 20 test points |

The original axes use fertilizer/yield illustration scales without documented physical units or empirical provenance. The deck does not turn them into claimed field measurements. The ice-cream/shark variables are presented as the normalized illustration in the course, not causal evidence about real populations.

## Numerical discrepancies and corrections

### Supplied line versus OLS

The line in `lr_scatter_mod` and `lr_scatter_mod_with_test` has slope 2.85208755. Regressing their 25 training points yields intercept **2.1338618697** and slope **2.8261067810**. The source line is therefore preserved as the supplied line, with an optional recomputed OLS overlay on slide 9. Its training RSS is approximately 0.3174, compared with 0.3106 for OLS. The residual explorer uses actual analytic OLS for its Fit action. Slide 14 evaluates the supplied line on both sets without refitting it.

### Slope test in the 90-point example

The text reports t approximately 2.16 and p approximately 0.03. These do not match `lr_maybe.json`. Independent SciPy `linregress` calculations and the browser engine agree on:

| Quantity | Recomputed value |
| --- | --- |
| n | 90 |
| Intercept | 0.4954535392 |
| Slope | 0.1075379991 |
| Slope standard error | 0.0179471258 |
| t on 88 df | 5.9919343351 |
| Two-sided p | 4.4453437123 × 10⁻⁸ |
| 95% slope interval | [0.0718718580, 0.1432041403] |

Slides 28, 31 and 33 use these recomputed quantities under the classical normal-error inference assumptions. A numerical calculation alone does not verify those assumptions.

### Ice-cream/shark association

For the 80 plotted training points, R² is **0.5300353268**, agreeing with the source's 0.5300. The recomputed slope t statistic is **9.3792282024** on 78 df, rather than the text's approximately 4.7057. The deck displays the recomputed value.

No temperature observations are supplied with the chart. The source's adjusted results (ice cream t≈0.9300, p≈0.3553; temperature t≈4.8203, p<0.01) therefore cannot be reconstructed from the available payload. Slide 38 explains the reported qualitative change and the missing evidence instead of presenting those adjusted values as verified calculations.

### Polynomial fits and numerical rank

Independent least-squares calculations confirm the source-reported training R² and test RMSE rows for overfitting degrees 1, 5 and 15, and underfitting degrees 0, 1 and 2.

The degree-23 row is different: full-rank OLS in a scaled Legendre basis on the supplied 25 training points yields training R² approximately **0.9994717376** and test RMSE approximately **51.1907**. This differs substantially from the supplied degree-23 curve and reported R² 0.9938 / RMSE 0.3052. The exact numerical fitting method used to produce the source curve is unavailable. The original sampled curve is retained and its metrics are explicitly labeled **source-reported**, rather than claiming that all degree-23 least-squares implementations reproduce them. Conditioning and effective numerical rank matter at such high degrees.

The underfitting source fixes its vertical axis at 0–6 despite observations approaching 8. The deck uses the complete automatic range. Its RSE calculations use **n − (p + 1)** for a full-rank degree-p fit, rather than retaining n−2 for every degree.

## Conceptual corrections

- RSS is convex, but the coefficient minimizer is unique only with full column rank. Rank deficiency does not remove all least-squares solutions. The pseudoinverse exists for every matrix and selects the minimum-norm least-squares solution. The inverse normal-equation formula is a full-column-rank special case. See [NumPy least squares](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html).
- A degree-p polynomial has p+1 parameters, including the intercept. Use argmin for the minimizing coefficients, not min for the optimum objective value. QR or SVD avoids explicitly forming a potentially unstable normal-equation inverse.
- RSE is a residual standard-deviation estimate; its square is the variance estimate. RSS and TSS are sums of squares. RMSE can be computed on any evaluation set and is not defined only for testing.
- With nonconstant outcomes, training OLS with an intercept has nonnegative R². Held-out R² may be negative without a fitting bug. The raw ratio is undefined for constant outcomes. There is no universal good-score threshold. See [scikit-learn R² definition](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html).
- Poor training or test performance does not uniquely diagnose underfitting or overfitting. Inspect optimization, feature suitability, sampling, leakage and distribution change too.
- Hyperparameter choices use validation or cross-validation. The final test set assesses the fixed procedure. The original “Test points” labels are retained for provenance, without endorsing repeated selection on them.
- The bias–variance identity is stated pointwise with squared loss, a true conditional mean and independent zero-mean fresh noise. The intercept's informal name “bias” is a different concept.
- A slope test concerns linear association under the model, not causal influence. The p-value conditions on H₀ and assumptions. Its magnitude does not measure practical effect size or P(H₀|data). A centered Student t distribution has mean zero only when df>1. See [Penn State STAT 501](https://online.stat.psu.edu/stat501/).
- The multiple-regression observation model retains its error term. “Multiple” or “multivariable” is used for several predictors and one response. A two-predictor regression plane can be visualized, so multiple regression is not inherently impossible to plot.
- Classical estimation, exact inference and prediction require different assumptions. OLS can be computed without Gaussian errors. Zero conditional error mean is stated separately, and normality is tied to exact small-sample t/F inference. Residuals are not the unobserved errors and are not mutually independent merely because the underlying errors are.

The overall mathematical treatment follows the course's cited [Introduction to Statistical Learning](https://www.statlearning.com/), Chapter 3, supplemented by the primary references linked above. The source's expandable normal-equation derivation is presented as a dedicated slide, with the expansion recorded in the teaching notes.

## Added interactive material

1. **Line and residual explorer:** original 25-point scatter, adjustable intercept and slope, vertical residuals, RSS, R² and exact analytic Fit OLS action. These are genuine recalculations, not animations of stored answers.
2. **Repeated-sample bias/variance:** 60 independently seeded training samples, truth `2 + 1.2x − 0.9x²`, Gaussian noise σ=0.3, degrees 0/1/2/5/9, sample sizes 12/25/60, seeds 1/7/23 and inspected x values −0.8/0/0.8. Fits use Householder QR. The first 15 individual curves and the mean of all 60 are drawn. Empirical variance uses divisor 60 so the finite-ensemble identity holds exactly; population quantities remain Monte Carlo approximations.
3. **Student t tails:** observed t from −8 to 8, df 3/10/23/88, exact two-sided p from the regularized incomplete beta function and visible tail shading. The complete probability includes mass beyond the finite plotting window. A source button loads the independently checked 90-point example.
4. **Residual diagnostics:** 60 synthetic points with well-behaved errors, omitted curvature, unequal variance or AR(1) serial error structure. The line is actually fitted in each case; either fitted response or observation order can be selected. These examples illustrate patterns and do not certify assumptions or replace formal diagnostics.

All added drawings are native SVG or computed plots. The confounding graph is explicitly a proposed causal explanation, not a discovered model.
