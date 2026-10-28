# Teaching notes · Introduction to machine learning

Part 2 original definitions and mathematical boxes audited on 27 October 2026. Stable IDs are used because inserted questions change displayed slide numbers.

## 07_Intro_ML_Part_1 · part-cover · How does a machine learn?

Start from the ordinary meaning of learning. The lesson follows the original student/teacher analogy, then compares supervision, structure discovery and learning through actions.

## 07_Intro_ML_Part_1 · learning-story · Think about learning with a teacher

Introduce four roles, not three stages or rules. Study material supplies examples. The student learns a method through practice. The teacher provides feedback. Assessment uses new questions to check whether learning transfers.

## 07_Intro_ML_Part_1 · components · Machine learning has four corresponding roles

The model has a fixed structure and adjustable parameters. The training algorithm changes the parameters using the data and objective; the evaluator measures performance. Data quality matters. Held-out means not used for that training step.

## 07_Intro_ML_Part_1 · learning-goal · Can examples help predict the next harvest?

Use field and field trial rather than plot, which could mean a chart. Each historical field trial supplies an input and measured output. Fit a prediction model from those pairs, then estimate yield for a new field from its fertilizer amount. This is an association, not a causal agricultural recommendation.

## 07_Intro_ML_Part_1 · training-inference · Learning a rule and using it are different steps

In the crop example, changing parameters from fertilizer/yield examples is training. Predicting yield for a new field with the fitted parameters is inference. Online systems can alternate these stages.

## 07_Intro_ML_Part_1 · part-roadmap · One thread through six chapters

Use the chapter map after the opening story. It separates types of feedback from application domains and shows how the mixed-label chapter connects supervised and unsupervised methods.

## 07_Intro_ML_Part_1 · signals · The key question: where does feedback come from?

These are broad families, not disjoint boxes. Semi-supervised methods combine labeled and unlabeled examples. Self-supervised methods derive targets from observations. Both receive their own place in the chapter map.

## 07_Intro_ML_Part_1 · supervised · Supervised learning: compare with a known answer

Both examples are supervised because a reference target is available during training. Introduce ground truth as the reference measurement or annotation, not a promise that it is error-free. The function is f, the parameters are θ, x is input, y is target and ŷ is prediction.

## 07_Intro_ML_Part_1 · regression · Regression predicts a numerical magnitude

The output scale is illustrative: 3.2 kg shows the format of a quantitative prediction. The photograph is context, not its measured source. The original 25 observations and fitted-curve illustration are explored in Part 2.

## 07_Intro_ML_Part_1 · classification · Classification predicts one of the named categories

Reveal the reference label after students identify the output type. This is a photo-based concept check, not a running classifier. The target categories are known in advance. A numeric code for a category still represents a class.

## 07_Intro_ML_Part_1 · regression-classification · The target’s meaning decides the task

The kilogram value is an invented output-format example, separate from the source chart whose physical units are unspecified. Numerical storage alone does not decide whether a target is quantitative.

## 07_Intro_ML_Part_1 · label-cost · Useful examples need useful labels

Labels may be produced by people, records or instruments. Cost, expertise and measurement delays can limit the quantity and quality of labels. This motivates the unsupervised and self-supervised chapters; it does not imply that their training is always cheaper.

## 07_Intro_ML_Part_1 · unsupervised · Unsupervised learning: start without task labels

The photographs have no supplied task labels in this illustrative pool. The following two slides separate grouping from generation. Unsupervised learning still requires objectives, representations and choices about useful structure.

## 07_Intro_ML_Part_1 · clustering · Clustering groups similar observations

Each dot stands for one observation in a chosen representation. Distance expresses a chosen similarity. These are schematic points, not features computed from the photographs. Clusters need not correspond to species or other human categories.

## 07_Intro_ML_Part_1 · generative-modeling · Generative modeling learns patterns for new samples

Use the varied roof and size to distinguish generating a new sample from assigning a class. These drawings are a schematic illustration, not outputs of a running model. Generative modeling need not reconstruct every input or simply copy a training example.

## 07_Intro_ML_Part_1 · self-supervised · Self-supervised learning: create a target from the data

A mask is an overlay on the source photograph. The withheld original content supplies a target without human task annotation. The next interaction constructs the same idea with text. A token may be a word or part of a word.

## 07_Intro_ML_Part_1 · mask-lab · Build a self-supervised training pair

Added target-construction demonstration. This does not train or run a language model: it separates the observed input from the known training target. The correct target is what occurred in the source sentence, not the only plausible completion.

## 07_Intro_ML_Part_1 · pretrain-transfer · Learn broadly first; adapt to a task next

Pretraining can use self-supervised targets from a large unlabeled pool. Fine-tuning continues training on task-specific examples, often with fewer labels than training from scratch. Transfer depends on relevance to the new task and still requires evaluation.

## 07_Intro_ML_Part_1 · semi-supervised-intro · Few labels, many examples: semi-supervised learning

Explain the motivation and define the training-data mixture before naming prediction goals. The counts and photo labels are illustrative. Semi-supervised methods use both supplied targets and information from unlabeled observations; improvement is not guaranteed.

## 07_Intro_ML_Part_1 · semi-supervised · Two goals: label this batch, or label future photos

Transduction targets the particular unlabeled batch supplied now. Induction learns a function to apply to new inputs beyond that batch. Induction is not defined as also labeling the batch. Both goals can use a labeled/unlabeled mixture. These are goals, not guarantees that a method has succeeded.

## 07_Intro_ML_Part_1 · weak-shift · Weak supervision: learn from imperfect labels

The same photograph is repeated with deliberately different teaching annotations. Weak supervision covers incomplete, inexact and inaccurate signals. Domain shift is a different issue and follows next.

## 07_Intro_ML_Part_1 · domain-shift · The same task can arrive in different-looking data

The same original photo is displayed twice, with a darker display on the right. It illustrates acquisition change rather than depicting actual website A/B datasets. Adaptation can involve normalization or representation alignment. New target classes are an additional problem, not just changed lighting.

## 07_Intro_ML_Part_1 · reinforcement · Reinforcement learning: improve by acting

Chess motivates learning from interaction instead of a correct move label for each state. State is the current situation; policy is an action-selection rule; reward evaluates an outcome. RL can also use previously collected experience.

## 07_Intro_ML_Part_1 · explore-exploit · Use what you know—or try what you do not?

Epsilon is the exploration probability. Current reward estimates come from observations and may be wrong. Exploration buys information, not guaranteed immediate improvement. The next bandit isolates this tradeoff without a changing board state.

## 07_Intro_ML_Part_1 · bandit-intro · What is a bandit arm?

The slot-machine picture explains the terminology, not a gambling activity. In the demonstration, each arm has a fixed but unknown probability of reward 1. Outcomes vary from pull to pull. Only the chosen outcome is observed. The learner estimates each rate from its own observations and balances immediate reward against information. Unlike chess, this bandit has no changing board state.

## 07_Intro_ML_Part_1 · bandit-lab · Explore or exploit? Try three uncertain actions

Added stationary three-armed Bernoulli bandit with reward probabilities 0.25, 0.50 and 0.75. It is a simple reinforcement-learning setting without state transitions or delayed rewards. Each arm is tried once before automated epsilon-greedy selection. Ties use seeded randomness. The finite run need not identify the best arm.

## 07_Intro_ML_Part_1 · signal-lab · Identify the signal, then reveal the reasoning

Added six-scenario concept check, including classification, regression, clustering, masking, semi-supervised data and reward-based action selection. Answers are fixed explanations, not model-generated judgments.

## 07_Intro_ML_Part_1 · domains · The learning setting and the data domain are different

A domain says what data/task we work with. A learning setting says how feedback is obtained. A vision system could be supervised, self-supervised or use several stages.

## 07_Intro_ML_Part_1 · vision · One scene, three kinds of visual output

The vector scene is a conceptual illustration. Its boxes and regions are hand-authored teaching annotations, not outputs of a trained vision model. Semantic segmentation assigns class labels; instance segmentation additionally separates individual objects.

## 07_Intro_ML_Part_1 · language · Context changes both a word’s role and its meaning

Part-of-speech tagging identifies grammatical roles. Word-sense disambiguation identifies intended meaning. Document topic classification predicts a document-level category. Tokens may be words or parts of words.

## 07_Intro_ML_Part_1 · multimodal · Multimodal learning connects different kinds of data

Multimodal means combining data types, such as image/text or audio/video. Matching an image and caption illustrates a cross-modal relation. The data domain alone does not decide the learning signal.

## 07_Intro_ML_Part_1 · part-references · Continue exploring



## 08_Intro_ML_Part_2 · part-cover · From data to predictions



## 08_Intro_ML_Part_2 · recap-signal · Now make the prediction task precise

Introduce predictor as an input used for prediction and outcome/target as what is predicted, before later slides use predictor indices. In this task fertilizer level is the predictor and crop yield is the outcome. The subsequent chapters formalize the observations, function and assessment for this supervised regression task.

## 08_Intro_ML_Part_2 · part-roadmap · Formulating a regression task: three chapters

Follow the original Formulating a regression task section: Variables and datasets, Models and hypotheses, then Generalization. Fit scores, held-out evaluation and leakage are taught within the final chapter.

## 08_Intro_ML_Part_2 · fertilizer · One observation is one field trial

An observation in the original example is one field trial: one field receives a recorded fertilizer level, and its yield is measured later. A dataset row joins those values for the same trial. This identifies the unit of observation before introducing formulas. The original illustration contains 25 trials and one predictor. Its physical dosage and yield units are not specified. Later, a clearly marked two-predictor toy example adds measured soil moisture to illustrate vectors and matrices; it is separate from the original observations.

## 08_Intro_ML_Part_2 · measurements · Variables name quantities; indexed values name records

Use the shared three-record toy example to introduce indices before the general dataset notation. Select trial 2: x₂₁=0.6 reads predictor 1 (fertilizer), x₂₂=0.5 reads predictor 2 (soil moisture), and y₂=1.1 is the measured target for the same trial. The first index selects the row and the second selects the input column. Uppercase names variables and lowercase indexes their recorded values. This example is separate from the original one-predictor observations.

## 08_Intro_ML_Part_2 · variable-types · Variable types: magnitudes and categories

A quantitative variable expresses a magnitude for which numerical differences have meaning. Continuous variables are modeled as ranging along a continuum, such as temperature or yield. Discrete quantitative variables take separate values, such as the integer count of plants in a field. A categorical variable names a category. Nominal categories, such as species, have no natural order. Ordinal categories, such as low, medium and high, have an order but not necessarily equally spaced differences. Binary means there are two categories; a binary variable may also have an ordering. These meanings survive changes in storage. Coding low, medium and high as 0, 1 and 2 does not establish equal distances between the categories. Decide how to represent a variable from its meaning and the intended model.

## 08_Intro_ML_Part_2 · roles · Predictors are inputs; the outcome is the target

Predictors X₁, …, Xₘ are the input variables; m is their number. The outcome Y is the variable whose value we want to predict. Other names for predictors include features, explanatory variables and independent variables. Other names for the outcome include target, response and dependent variable. These names describe roles in the prediction task. “Independent variable” does not establish statistical independence, and “explanatory” does not prove a causal effect. A variable can be an input in one task and the target in another. Every predictor must be available at prediction time. Soil moisture measured before planting is a possible input for predicting yield. Future realized rainfall is unavailable if the prediction is made before that rainfall occurs. A forecast of rainfall is different from its later realized value.

## 08_Intro_ML_Part_2 · dataset · Collect the observed input–target pairs

The supervised dataset 𝓓 = {(xᵢ, yᵢ)}ᵢ₌₁ⁿ is a collection of n recorded input–target pairs. Here i identifies a trial, xᵢ records its input and yᵢ its target. With one predictor, xᵢ can be displayed as a single number; with several predictors it will be a vector. The original fertilizer illustration contains n = 25 observations and m = 1 predictor. The table displays its first three rows, rounded to four decimal places. The observations example at the start of Models and hypotheses retains all 25 observations.

## 08_Intro_ML_Part_2 · input-output-spaces · Domains contain values; input spaces contain combinations

The domain 𝓧ⱼ is the set of values allowed for predictor Xⱼ. The outcome domain is 𝓨. For quantitative regression, 𝓨 is typically a subset of the real numbers ℝ; for classification it is a finite set of class labels. The full input space is the Cartesian product 𝓧 = 𝓧₁ × ··· × 𝓧ₘ. Here × means that we form tuples by choosing one value from each domain; it is not multiplication of measured values. With fertilizer and soil moisture as predictors, one input is a pair consisting of one fertilizer value and one moisture value. The notation x ∈ 𝓧 means that x belongs to the input space. A space describes possible cases; a dataset contains only the particular cases we recorded. A suitable encoding is needed before categorical, image or text inputs can be used in a numerical design matrix.

## 08_Intro_ML_Part_2 · observation-vector · One input vector collects one value per predictor

Observation i consists of an input vector xᵢ and, in supervised training data, a target value yᵢ. The vector xᵢ = (xᵢ₁, …, xᵢₘ)ᵀ collects one value for each of the m predictors. The superscript T denotes transpose; we use it here to write the listed values as a column vector. For an illustrative two-predictor example, let x₁ = (0.2, 0.4)ᵀ and y₁ = 0.8. The first input entry is fertilizer level and the second is soil moisture; the target is yield. These toy values illustrate vector and matrix notation. They are separate from the original 25-observation plot, which has only one predictor. In xᵢⱼ, i identifies the observation and j identifies the predictor. The notation xᵢ ∈ 𝓧 and yᵢ ∈ 𝓨 states that recorded inputs and targets belong to their respective spaces.

## 08_Intro_ML_Part_2 · matrix · A design matrix stores input rows; a vector stores targets

The design matrix X stores input observations as rows and predictors as columns. For n observations and m numerical predictors, X ∈ ℝ n×m . Entry Xᵢⱼ is predictor j in observation i. Since xᵢ is a column vector, row i of the matrix is xᵢᵀ. The target vector Y = (y₁, …, yₙ)ᵀ has one entry for each row. In the three-row toy example, the input matrix has rows (0.2, 0.4), (0.6, 0.5), (0.9, 0.3), and the target vector is (0.8, 1.1, 0.7)ᵀ. It has n = 3 and m = 2, unlike the original one-predictor chart. Bold X names the whole matrix; Xⱼ names a predictor variable; xᵢ names an observed input vector. Bold Y names the vector of recorded targets, while Y names the outcome variable and yᵢ one recorded target. Matrix notation assumes suitable numerical representations: raw text, images or categories may need encoding.

## 08_Intro_ML_Part_2 · matrix-notation · General matrix notation: n rows and m predictors

This expands the source matrix formula in full. Each xᵢ is a column vector, so its transpose xᵢᵀ must be used as a row of X. The source abbreviates these rows as xᵢ. The matrix contains every xᵢⱼ in the indicated row and predictor column; the target vector aligns yᵢ with that row. Dots continue the same pattern to n rows and m columns.

## 08_Intro_ML_Part_2 · observations-lab · Inspect the original fertilizer observations

Original nonlinear.json scatter plot, all 25 x/y coordinates preserved. Plotly remains fully interactive offline. The slide adds explicit zoom/pan/reset controls and a keyboard-accessible point inspector. The original horizontal axis title is retained; its physical interpretation is unspecified.

## 08_Intro_ML_Part_2 · prediction-function · Training fits predictions to recorded targets

The source first visualizes the observations, then introduces a function that fits them. Preserve its full fitting equation yᵢ ≈ ŷᵢ = f(xᵢ) for recorded pairs (xᵢ,yᵢ) ∈ D. Training is the search for such a useful fitted function; its model family specifies the assumed form. This is regression because the outcome is quantitative.

## 08_Intro_ML_Part_2 · hypotheses · A model fixes a form; a hypothesis chooses its parameters

Follow the source convention: model means the assumed functional form, and a hypothesis θ is one allowed parameter setting when that form is fixed. The hypothesis space Θ lists the allowed settings. A full function also depends on its form; parameters alone do not specify it without that assumption. This family allows degree at most two, including linear or constant cases when a=0.

## 08_Intro_ML_Part_2 · hypothesis-space · A hypothesis space contains the allowed choices

The parameter setting θ selects one candidate function. The hypothesis space Θ is the set of allowed parameter settings, following the parameter-based convention used in the course. In the unrestricted quadratic example, Θ = ℝ³: every triple (a, b, c) of real coefficients is allowed. For θ = (1, 0, 0), the selected function is f θ (x) = x². For θ = (2, −1, 0.5), it is f θ (x) = 2x² − x + 0.5. Both choices belong to the same space Θ and use the same functional form. Another common convention calls the functions themselves hypotheses and calls their set the hypothesis space. Here θ names the coefficients and f θ names the corresponding function, so the distinction stays explicit. Fitting chooses a θ; model selection can compare families or complexity settings.

## 08_Intro_ML_Part_2 · hypothesis-lab · Compare the original observations and hypothesis

Original nonlinear_mod.json: both 25-point traces retained exactly, including the illustrative hypothesis curve. Interactive hover, trace toggles, pan and zoom are preserved. The sidebar computes residuals and mean squared error against the provided curve, without claiming the source used a particular fitting algorithm.

## 08_Intro_ML_Part_2 · noise · Why does the curve miss some observed points?

The diagram now zooms the original course observations over fertilizer levels 0.20–0.55, with the supplied curve and a highlighted same-input gap. At x=0.25 the measured value is 2.225 and the supplied prediction is 2.475. Blue dots are measurements; the purple line is the original supplied curve. A gap does not by itself distinguish measurement noise, unrecorded conditions or model mismatch. The following residual/MSE slide quantifies such gaps.

## 08_Intro_ML_Part_2 · residuals · A residual is the gap between observation and prediction

The prediction for observation i is ŷᵢ = f θ (xᵢ). Its residual is rᵢ = yᵢ − ŷᵢ, the observed target minus the prediction. A positive residual means the model predicted too low; a negative one means it predicted too high. Mean squared error (MSE) averages the squared residuals over n observations: MSE = (1/n) ∑ᵢ₌₁ⁿ (yᵢ − ŷᵢ)². The summation symbol ∑ means add the terms for i = 1 through n. Squaring prevents positive and negative residuals from cancelling and gives larger disagreements more weight. MSE is one concrete score for regression, used here as a bridge to the regression lecture. Its units are squared target units. A lower training MSE means a closer fit to these recorded targets, not necessarily more accurate predictions on new cases.

## 08_Intro_ML_Part_2 · generalization · Generalization means predicting relevant new cases

Retain both source scopes: approximate agreement on recorded pairs in D and extension to new cases in X×Y. Membership in a Cartesian product specifies valid input/output types; it does not mean every arbitrarily combined x and y should agree with a single function. Read y as the outcome associated with x in the task. Generalization is performance on relevant unseen cases, with approximate rather than exact agreement when outcomes are noisy.

## 08_Intro_ML_Part_2 · splits · Training, validation and test sets have different jobs

Supplemental practical evaluation guidance. Repeated use of test results for model choice compromises a final independent assessment. Use the validation set in the following interactive lab; it is intentionally not called a test set. The diagram is an illustrative 60/20/20 partition of 50 observations: 30 training, 10 validation and 10 test. Training has three times the width and three times the dot count of each held-out set. These percentages are not a fixed rule.

## 08_Intro_ML_Part_2 · generalization-lab · Fit the training points; compare unseen validation points

Added synthetic regression experiment. Training and validation are disjoint samples from y=2+1.2x−0.9x² plus independent seeded noise, on x in [−1,1]. Degrees 0,1,2,5,9 are fitted by least squares using Householder QR. Validation outcomes never enter fitting. Displaying and comparing validation results makes this model development, not a final test evaluation.

## 08_Intro_ML_Part_2 · leakage · Data leakage lets evaluation information enter preparation

Data leakage and domain shift are distinct failure modes. This summary follows scikit-learn common-pitfalls guidance for split-before-fit preprocessing and the course website A/B example for domain shift.

## 08_Intro_ML_Part_2 · practice · Use the notation to reason about four cases

These cases apply the notation and evaluation concepts introduced in Part 2. They concern the shape of input data, membership in a parameter space, the interpretation and units of residuals, and a split that matches deployment. State the definition you use, then apply it to the case. The following worked answers explain the reasoning rather than only giving a number.

## 08_Intro_ML_Part_2 · answers · Reason from the definition, then apply it

With 80 observations and four predictor columns, the design matrix has shape 80 × 4 and the target vector has 80 entries. The lookup ID is not an input merely because it is stored alongside the measurements. Both (1,0,0) and (2,−1,0.5) belong to Θ = ℝ³. Fitting a negative coefficient changes the parameter setting without changing the allowed space or quadratic form. In the toy yield case the residual is observed minus predicted: 4 − 6 = −2 kg. A negative residual means overprediction. Its square is 4 kg², illustrating why mean squared error has squared target units. For future months and unseen fields, the held-out data should be later in time and contain different field identities. A row shuffle alone does not enforce either requirement.

## 08_Intro_ML_Part_2 · summary · A complete prediction problem follows this chain

A prediction problem begins with an observation unit, available predictors and an outcome. A dataset records input–target pairs; a matrix and vector organize their values. A model family and allowed parameter space then specify the candidate prediction rules. Training fits a parameter setting. Validation compares development choices, and a held-out test assesses the selected procedure for the intended future use. The next regression lecture develops specific fitting methods within this framework.

## 08_Intro_ML_Part_2 · references · Sources for the data, notation and evaluation

The course lesson supplies the regression formulation, notation and original fertilizer illustrations. The scikit-learn guidance provides further examples of preprocessing leakage and evaluation mistakes. Learning-setting readings belong to Part 1; these references support Part 2’s data and evaluation topics. Original course lesson · Common pitfalls and data leakage
