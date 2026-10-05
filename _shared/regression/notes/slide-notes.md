# Lesson 4 — Regression

## 1. Regression

Follows course 04_regression. All seven source Plotly charts are retained locally, with additional interactive labs for residuals, repeated-sample bias/variance, t tails and residual diagnostics.

## 2. Three decisions behind a regression model

Discuss the example and connect it to the preceding result.

## 3. Inspect the original linear-looking data

Original lr_scatter.json: all 25 observation coordinates preserved. The source fertilizer and yield scales are illustrative and lack documented physical units.

## 4. Simple linear regression has two parameters

An intercept is also sometimes called a bias parameter; that usage differs from estimator bias. A zero-mean conditional error assumption connects the function to E[Y|X=x].

## 5. Move the line and watch the residuals change

Added live parameter explorer using the original lr_scatter data. Vertical segments show y minus prediction; RSS and R-squared update. The Fit OLS action uses the analytic slope and intercept, not a precomputed source line.

## 6. Least squares penalizes large residuals

RSS is a sum of squared deviations, not itself a variance. OLS fits a conditional-mean model; it does not make the data noiseless.

## 7. The best line has a closed-form solution

The sums are over all n training observations. The analytic solution agrees with a full-rank QR least-squares solution.

## 8. Convexity does not by itself imply uniqueness

Corrects the source claim that convexity alone implies one global minimizer. With an intercept and one predictor, full rank is equivalent to nonconstant predictor values.

## 9. Compare the supplied line with a fresh OLS fit

Original lr_scatter_mod.json preserved exactly. The supplied line is close to, but not identical to, OLS on its plotted training points. Recomputed OLS intercept 2.13386187 and slope 2.82610678; the source line slope is 2.85208755. The overlay is explicitly distinguished.

## 10. Different metrics answer different questions

RSE formula here assumes a full-column-rank OLS fit and n>q. The general denominator is n minus design rank. RMSE can be computed on any set; it is not defined exclusively for testing.

## 11. Residual standard error estimates a noise scale

For polynomial degree p the full-rank parameter count is p+1, so use n−p−1. Under homoscedastic zero-mean errors, RSS divided by residual degrees of freedom is unbiased for the error variance; taking the square root does not preserve exact unbiasedness.

## 12. R² compares squared error to a baseline

If all outcomes are constant, TSS=0 and this ratio is undefined. A zero score is not a universal judgment that a task is unlearnable. R-squared has no universal acceptable threshold.

## 13. Fit, compare and assess on different data

Extends the source train/test distinction to preserve the validation role already introduced in the previous deck. Choosing the minimum final-test error repeatedly makes the test set part of development.

## 14. Evaluate the original line on held-out points

Original lr_scatter_mod_with_test.json, retaining 25 training points, 10 test points and the supplied line. Metrics are computed for that line using its endpoint slope/intercept. The line is not fitted using test targets.

## 15. Curved in x can still be linear in the parameters

Discuss the example and connect it to the preceding result.

## 16. Feature expansion creates the design matrix

Corrects the source parameter space R^p to R^(p+1). Matrix X here denotes the expanded design, not only the raw predictor column.

## 17. The gradient yields the normal equations

This condenses the source expandable derivation into an explicit slide. Expanding gives yᵀy−2βᵀXᵀy+βᵀXᵀXβ. Use argmin for the minimizing coefficients; min denotes the objective value.

## 18. Use the inverse formula only when it exists

The pseudoinverse exists for every matrix. The expression (XᵀX)^−1Xᵀ is one full-column-rank special case, not the only setting in which least squares has a solution. High powers of raw x may be severely ill-conditioned.

## 19. A degree is selected; coefficients are fitted

Discuss the example and connect it to the preceding result.

## 20. Explore the original high-degree curves

Original lr_scatter_polymods_with_test.json, including degree 1,5,15,23 curves and train/test points. All sampled curve coordinates are retained. Metrics displayed here are explicitly source-reported; the degree-23 curve does not match a unique stable full-rank degree-23 OLS fit, whose behavior is substantially more extreme. No undocumented fitting implementation is asserted.

## 21. A better training score can accompany worse prediction

The first three rows agree with independent polynomial fits to the provided data. For degree 23, stable full-rank Legendre-basis OLS gives training R²≈0.99947 and held-out RMSE≈51.19; the supplied curve and reported row likely reflect a different numerical treatment, but the exact method is unavailable. Preserve the demonstration without presenting its row as universal degree-23 behavior.

## 22. Compare constant, linear and quadratic models

Original lr_underfitting.json retained. Its original fixed y-range 0–6 clipped observations near 8; the deck defaults to autorange. Reported R² and RMSE agree with independent fits. RSE is recomputed using n−(p+1), correcting a fixed n−2 denominator for other degrees.

## 23. Training and held-out error need interpretation

Corrects the source implications that poor training performance necessarily means underfitting and poor test performance necessarily means overfitting.

## 24. Bias and variance describe different kinds of error

A low-complexity family often trades higher approximation bias for lower variance; this is a tendency, not a universal monotonic law for every modern model. Bias here is unrelated to the intercept parameter.

## 25. Repeat the experiment: how much do fits move?

Added repeated-sample experiment: fixed evenly spaced x in [−1,1], truth 2+1.2x−0.9x², independent Gaussian errors with σ=0.3. Fit 60 samples using Householder QR, display the first 15 curves plus their 60-fit mean. The variance uses divisor 60 to give the exact finite-ensemble decomposition around the empirical mean; this approximates the population decomposition.

## 26. Squared prediction error has three components

The identity is pointwise in x and uses squared loss. The lab computes the finite-ensemble bias and variance and adds the known fresh-noise variance 0.09. It does not claim to estimate these quantities from an unknown real-world data-generating function.

## 27. Use validation to select; reserve testing for assessment

Corrects the source recommendation to select the model minimizing test MSE. The original chart labels “Test points” are preserved for provenance; the deck does not recommend repeatedly optimizing their score.

## 28. Recompute the slope evidence from the source points

Original lr_maybe.json. The source text reports t≈2.16 and p≈0.03, but the plotted data yield slope≈0.10754, SE≈0.01795, t≈5.99193 on 88 df, two-sided p≈4.4453e−8. The slide uses statistics recomputed from the actual data. Exact t inference assumes the classical normal, independent, equal-variance error model.

## 29. A slope test asks about linear association

A nonlinear relationship may have a zero simple-regression slope. Replace causal “influences” wording with association under a specified model.

## 30. A coefficient estimate has a sampling standard error

The estimated slope is normally distributed under normal errors with conditional variance σ²/Sxx. Replacing unknown σ by the residual estimate produces the exact t pivot. A centered t distribution has mean zero only when its degrees of freedom exceed one.

## 31. A two-sided p-value is the area in both tails

Added interactive Student t density with both tails shaded, exact p-value calculated through the regularized incomplete beta function. This probability is conditional on the null model, not the probability that the null is true. A button loads the statistic and df recomputed from the original lr_maybe points.

## 32. A p-value is conditional on the null model

The p-value is not P(H0|data), not the probability that the result is due to chance, and not a posterior probability of an effect. Prespecify tests and account for multiplicity when applicable.

## 33. A confidence interval expresses coefficient precision

Added interval interpretation to accompany the corrected source test. This is not a claim of a 95% posterior probability for a fixed parameter. It is a slope interval, not a prediction interval for an individual future crop.

## 34. Multiple regression adds one coefficient per feature

Corrects the source omission of the error term in the multiple-regression observation model. “Multivariate” often specifically refers to several response variables. With two predictors a fitted plane can be visualized; beyond that, partial plots and summaries are useful.

## 35. A coefficient is conditional on the included features

No causal interpretation follows from a coefficient alone. Include predictors based on task timing and study design; indiscriminate adjustment can also introduce bias.

## 36. Inspect the original ice-cream and shark example

Original lr_corcau.json: line, 80 training and 20 test points. Recomputed training R²≈0.5300, slope t≈9.3792 on 78 df; the source text t≈4.7057 does not match these plotted observations. No temperature observations are supplied, so adjusted regression values cannot be independently reconstructed.

## 37. A common cause can create an association

Retains the illustrative causal explanation from the source. The directed graph is a proposed mechanism, not an empirical result established by the supplied scatter plot.

## 38. Adjustment can change the apparent relationship

The source reports adjusted t≈0.9300, p≈0.3553 for ice cream and t≈4.8203, p<0.01 for temperature. These are discussed qualitatively rather than asserted as independently validated statistics. Lack of significance is not proof of no causal effect.

## 39. LINE describes classical regression assumptions

OLS can be computed without normal errors; normality is not a prerequisite to minimize RSS. Full-rank design, zero conditional error mean and variance assumptions play different roles in estimation, inference and prediction.

## 40. Read residual patterns, not just one score

Added deterministic diagnostic examples: well-behaved errors, omitted curvature, heteroscedasticity and serial structure. Each sample receives an OLS line; plotted values are actual residuals. These are visual teaching examples, not formal tests or automatic assumption certification.

## 41. Residual plots suggest the next question

Residuals from an OLS fit are not mutually independent even if the underlying errors are. The diagnostic goal is evidence about the underlying error process and conditional mean, not a requirement that observed residuals be independent.

## 42. A defensible regression workflow

Discuss the example and connect it to the preceding result.

## 43. Reason before calculating

Discuss the example and connect it to the preceding result.

## 44. Explain the distinctions

Discuss the example and connect it to the preceding result.

## 45. Fit carefully. Evaluate separately. Interpret precisely.

Discuss the example and connect it to the preceding result.

## 46. Continue exploring

Discuss the example and connect it to the preceding result.

