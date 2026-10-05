# Lesson 3 — Introduction to Machine Learning

## 1. Introduction to Machine Learning

Follows the next course resource, 03_intro. Both original interactive plots retain all source coordinates. Four additional labs explore learning signals, self-supervised targets, exploration/exploitation and generalization.

## 2. Three questions organize the lecture

Discuss the examples before moving on.

## 3. Learning needs more than a model

The student/teacher analogy is helpful, but the model is not the entire learning system. The training procedure defines how evidence changes parameters; evaluation measures an explicitly chosen task.

## 4. Training changes the model; inference uses it

Discuss the examples before moving on.

## 5. Ask where the learning signal comes from

Self-supervision is often grouped under unsupervised learning because labels are not manually provided. Generative modeling can use supervised conditioning or self-supervised objectives. This taxonomy is a guide rather than a disjoint partition.

## 6. Supervised learning compares a prediction to a target

Labels may come from instruments, logs, expert annotation or other processes. They are not necessarily perfect or manually produced.

## 7. The output determines the prediction task

The course focuses on continuous-response regression. Count prediction is also possible with appropriate regression models; numerical storage alone does not identify a task.

## 8. Without task labels, look for structure

Clustering depends on representation, distance and modeling choices. Generative training is not universally reconstruction. Avoid claiming that unlabeled data always makes training cheaper or inherently harder.

## 9. Identify the signal, then reveal the reasoning

Added six-scenario concept check, including classification, regression, clustering, masking, semi-supervised data and reward-based action selection. Answers are fixed explanations, not model-generated judgments.

## 10. Create a target from the observation itself

Self-supervised objectives include generative and contrastive approaches. Masked reconstruction and next-token prediction are examples, not the whole category. Pretraining may be followed by supervised adaptation.

## 11. Build a self-supervised training pair

Added target-construction demonstration. This does not train or run a language model: it separates the observed input from the known training target. The correct target is what occurred in the source sentence, not the only plausible completion.

## 12. Use the labeled and unlabeled parts together

Semi-supervised learning uses both labeled and unlabeled data. Transduction and induction describe prediction goals; they are not restricted to this learning setting.

## 13. Weak labels and domain shift are different issues

Corrects the course subsection that describes weak supervision primarily as distribution alignment. Zhou distinguishes incomplete, inexact and inaccurate supervision. The website A/B example describes domain shift; adaptation addresses this change. A changed distribution does not automatically imply failure.

## 14. Reinforcement learning learns which actions to take

The course motivates reinforcement learning through chess. This presentation avoids the unsupported comparison of chess states with atoms in the universe. Offline reinforcement learning also exists; interaction is not required during every training procedure.

## 15. Explore or exploit? Try three uncertain actions

Added stationary three-armed Bernoulli bandit with reward probabilities 0.25, 0.50 and 0.75. It is a simple reinforcement-learning setting without state transitions or delayed rewards. Each arm is tried once before automated epsilon-greedy selection. Ties use seeded randomness. The finite run need not identify the best arm.

## 16. Learning setting and data domain are separate axes

Discuss the examples before moving on.

## 17. One scene, three kinds of visual output

The vector scene is a conceptual illustration. Its boxes and regions are hand-authored teaching annotations, not outputs of a trained vision model. Semantic segmentation assigns class labels; instance segmentation additionally separates individual objects.

## 18. Language tasks depend on context

The source uses genre and topic interchangeably; these are distinct label schemes. The slide explicitly uses topic classification.

## 19. Predict yield before the crop grows

Retains the agronomy example. Source numerical axes do not document physical units or data provenance. The deck treats the 25 points as course illustration data and does not claim measured field results or convert the original 0–1 fertilizer coordinates to physical doses.

## 20. Variable type describes what values mean

Age may be measured continuously or recorded in completed years; it is not intrinsically discrete. Binary variables may be nominal or ordinal depending on interpretation. Avoid using yes/no degree status as a general ordinal example.

## 21. Predictors are inputs; the outcome is the target

Predictor does not imply statistical independence, and explanatory-variable terminology does not imply causation. Rainfall observed after prediction time cannot be used as if it were already known; forecasts and past measurements must be distinguished.

## 22. A dataset pairs each observation with its target

The first three rows reproduce the source values to four decimal places. Targets are available for supervised training; they are unknown for a new inference case.

## 23. Rows are observations; columns are features

Corrects the source display that stacks column observations without explicit transposes. Numerical matrix form requires a suitable representation for categorical, image or text data; raw categories do not automatically have a meaningful real-valued encoding.

## 24. Inspect the original fertilizer observations

Original nonlinear.json scatter plot, all 25 x/y coordinates preserved. Plotly remains fully interactive offline. The slide adds explicit zoom/pan/reset controls and a keyboard-accessible point inspector. The original horizontal axis title is retained; its physical interpretation is unspecified.

## 25. A model family contains many possible functions

The course calls a parameter setting a hypothesis. More commonly, the corresponding function is the hypothesis; both conventions are clarified here. The course curve is illustrative and is not asserted to be an optimal fit or quadratic.

## 26. Compare the original observations and hypothesis

Original nonlinear_mod.json: both 25-point traces retained exactly, including the illustrative hypothesis curve. Interactive hover, trace toggles, pan and zoom are preserved. The sidebar computes residuals and mean squared error against the provided curve, without claiming the source used a particular fitting algorithm.

## 27. Residuals measure disagreement on the observed data

MSE is a supplemental concrete score that prepares for the next Regression lecture. It has squared target units and is not appropriate for every task.

## 28. The same input can have different outcomes

The source emphasizes measurement error. This slide broadens the explanation to omitted predictors, irreducible variation and misspecification. No claim of zero-mean or independent noise is made without an assumption.

## 29. Generalization is performance on new cases

Corrects the source domain-wide approximation statement. In noisy problems the same input can have several possible targets. Generalization concerns expected or otherwise specified performance under a relevant distribution, not uniform exactness throughout the Cartesian product.

## 30. Give training, validation and testing different jobs

Supplemental practical evaluation guidance. Repeated use of test results for model choice compromises a final independent assessment. Use the validation set in the following interactive lab; it is intentionally not called a test set.

## 31. Fit the training points; compare unseen validation points

Added synthetic regression experiment. Training and validation are disjoint samples from y=2+1.2x−0.9x² plus independent seeded noise, on x in [−1,1]. Degrees 0,1,2,5,9 are fitted by least squares using Householder QR. Validation outcomes never enter fitting. Displaying and comparing validation results makes this model development, not a final test evaluation.

## 32. Evaluation must match the intended use

Data leakage and domain shift are distinct failure modes. This summary follows scikit-learn common-pitfalls guidance for split-before-fit preprocessing and the course website A/B example for domain shift.

## 33. Name the signal, shape and evaluation target

Discuss the examples before moving on.

## 34. Explain the choices

Discuss the examples before moving on.

## 35. Define the task before choosing the algorithm

Discuss the examples before moving on.

## 36. Continue exploring

Discuss the examples before moving on.

