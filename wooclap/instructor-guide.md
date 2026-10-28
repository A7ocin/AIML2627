# AIML · Wooclap instructor guide

These are instructor materials with answer keys. The 68 core questions are distributed across sixteen lectures; the 24 optional questions are separate imports. All questions are in English. Each MCQ has one correct answer; open responses are ungraded and have a suggested rubric here. Times include voting and a brief debrief, and are planning estimates, not automatic Wooclap timer settings.

For a “before” question, collect responses before showing the explanatory slide or running the demonstration. For an “after” question, check whether the explanation transfers to a concrete case. Ask students to commit individually, optionally discuss a split vote in pairs, then explain the reasoning. This is a first undergraduate introduction. Before-topic questions use everyday examples or ideas explicitly explained earlier; invite guesses and explain the answer after voting. Optional questions are basic extensions, not prerequisites or trick questions. Treat opening questions as ungraded diagnostics, not presumed prior mastery. Skip an optional item when the core question already provides sufficient evidence.

## Import instructions

In a Wooclap event, choose Import questions → Import from an Excel file and select that lecture’s core workbook. Import the optional workbook only if you want those additional items. Question IDs connect the imported titles to this guide; the slide placement and timing are teaching instructions, not fields imported by Wooclap. Open questions have blank Correct cells intentionally. After importing, preview the answer key, mathematical characters and question order, and check the question settings. The existing course events have already been imported. For those events, update questions in place to retain embed links; importing again would add duplicate questions. Revised live content is checked separately in live-revision-validation.json.

The official help page documents template-based Excel import. The workbooks use its published Type / Title / Correct / Choice schema, checked against an archived template copy provided by Université de Poitiers (June 2024). The current help page does not expose the template download without entering the event workflow. Only the two verified basic types, MCQ and OpenQuestion, are used. Single-answer MCQ keys use one-based choice positions. The AI Importer is not required for these files.

[Official import documentation](https://docs.wooclap.com/en/articles/674845-how-to-import-previously-created-questions) · [Reference template](https://tuto.appli.univ-poitiers.fr/wp-content/uploads/sites/567/2024/06/Format_Import_Questions.xlsx)

## 01 · History of artificial intelligence · Part 1

3 core + 2 optional. Core budget: approximately 4.5 minutes.

[Core import](imports/01_History_Part_1.xlsx) · [Optional import](imports/optional/01_History_Part_1_optional.xlsx)

### L00-C01 · Core · Opening / everyday intuition

**Placement:** [Before “aiml”](../01_History_Part_1/index.html#/aiml) · [Handout](../01_History_Part_1/handout.html#chapter-aiml)  
**Time:** 90 seconds, including debrief.

Which example shows a computer learning from examples?

- **A.** A spam filter improves after being shown emails marked spam or not spam.
- **B.** A calculator follows its built-in rule for adding two numbers.
- **C.** A lamp switches on at a time you set.
- **D.** A document is sorted alphabetically using a fixed rule.

**Answer:** A. A spam filter improves after being shown emails marked spam or not spam.

Learning changes the way a system makes predictions using examples. The other descriptions use fixed rules.

**Misconception:** Thinking that every automatic computer task is machine learning.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L00-C02 · Core · Prediction / intuition

**Placement:** [Before “Bayes' Theorem”](../01_History_Part_1/index.html#/bayes) · [Handout](../01_History_Part_1/handout.html#chapter-bayes)  
**Time:** 90 seconds, including debrief.

You think it will stay dry. Then you see dark clouds approaching. What is a reasonable response?

- **A.** Keep your original belief unchanged, whatever you see.
- **B.** Decide that rain is now absolutely certain.
- **C.** Conclude that your earlier information never mattered.
- **D.** Become more confident that it might rain.

**Answer:** D. Become more confident that it might rain.

New evidence can change how plausible an outcome seems without making it certain. This is the everyday intuition behind updating beliefs.

**Misconception:** Thinking a belief must either stay fixed or become a certainty.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L00-C03 · Core · Check / core understanding

**Placement:** [After “From “thinking” to an observable test”](../01_History_Part_1/index.html#/imitation) · [Handout](../01_History_Part_1/handout.html#chapter-imitation)  
**Time:** 90 seconds, including debrief.

What does the Turing imitation game focus on?

- **A.** Whether a machine looks like a human.
- **B.** Whether a machine calculates faster than a human.
- **C.** Whether a machine’s conversation can be distinguished from a human’s.
- **D.** Whether a machine has been proved to feel emotions.

**Answer:** C. Whether a machine’s conversation can be distinguished from a human’s.

The test concerns conversational behavior. Passing this kind of test would not by itself prove consciousness.

**Misconception:** Confusing human-like conversation with proof of human-like feelings.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L00-O01 · Optional · Optional / basic extension

**Placement:** [After “Perceptron · 1957 — Frank Rosenblatt”](../01_History_Part_1/index.html#/perceptron) · [Handout](../01_History_Part_1/handout.html#chapter-perceptron)  
**Time:** 90 seconds, including debrief.

During perceptron training, why do we show the model the correct answer?

- **A.** So it can avoid making any prediction.
- **B.** So its weights never need to change.
- **C.** So we no longer need any training examples.
- **D.** So it can adjust its weights when its prediction is wrong.

**Answer:** D. So it can adjust its weights when its prediction is wrong.

The correct label lets the learning rule detect a mistake and adjust the model.

**Misconception:** Thinking supervised learning improves without feedback about the correct answer.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L00-O03 · Optional · Optional / basic extension

**Placement:** [After “From the logistic curve to logistic regression”](../01_History_Part_1/index.html#/logreg) · [Handout](../01_History_Part_1/handout.html#chapter-logreg)  
**Time:** 90 seconds, including debrief.

Two models use a similar S-shaped curve. Must they describe the same real-world problem?

- **A.** No. A similar mathematical shape can be useful for different problems.
- **B.** Yes. A curve can have only one application.
- **C.** Yes. Similar curves must have been developed for the same purpose.
- **D.** No. The two models therefore cannot both be useful.

**Answer:** A. No. A similar mathematical shape can be useful for different problems.

Population growth and class-probability models can use related curve shapes for different tasks.

**Misconception:** Assuming that a shared formula means an identical application.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 02 · History of artificial intelligence · Part 2

4 core + 1 optional. Core budget: approximately 7 minutes.

[Core import](imports/02_History_Part_2.xlsx) · [Optional import](imports/optional/02_History_Part_2_optional.xlsx)

### L00-C04 · Core · Prediction / causal reasoning

**Placement:** [Before “Minsky & Papert — “Perceptrons” (1969)”](../02_History_Part_2/index.html#/winter1) · [Handout](../02_History_Part_2/handout.html#chapter-winter1)  
**Time:** 90 seconds, including debrief.

A system performs well on a narrow benchmark. Its promoters claim that it is close to general intelligence, but deployments expose failures outside the benchmark. Which consequence could help produce an AI winter?

- **A.** Success on one benchmark proves broad intelligence, so expectations no longer matter.
- **B.** The gap between the claims and demonstrated capability may erode confidence and funding.
- **C.** Failures outside the benchmark show that no AI technique can ever work.
- **D.** Researchers must discard every useful result produced by the system.

**Answer:** B. The gap between the claims and demonstrated capability may erode confidence and funding.

A narrow success can be real without supporting broad claims. When deployment exposes that gap, confidence and investment may fall even though useful research continues.

**Misconception:** Treating success on one benchmark as proof of broad intelligence, or treating later disappointment as proof that all prior work was worthless.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L00-C05 · Core · Synthesis / compare eras

**Placement:** [After “When the learning signal fades”](../02_History_Part_2/index.html#/winter2) · [Handout](../02_History_Part_2/handout.html#chapter-winter2)  
**Time:** 90 seconds, including debrief.

Which account best explains the two AI winters discussed in this lecture?

- **A.** One decisive paper proved that every AI approach was impossible.
- **B.** In each case, expectations met technical and economic limits; confidence and funding fell, but research continued.
- **C.** Hardware stopped improving, causing all AI research to end until the next boom.
- **D.** Both winters were planned pauses after AI systems had met their promises.

**Answer:** B. In each case, expectations met technical and economic limits; confidence and funding fell, but research continued.

The downturns had different immediate triggers, but both involved a mismatch between expectations and practical capability alongside funding or market pressures. Neither winter ended AI research.

**Misconception:** Reducing each winter to one paper or one technical limitation, or assuming research stopped completely.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L00-C06 · Core · Prediction / distinguish mechanisms

**Placement:** [Before “GPT-3 · 2020 — “Generative Pre-trained Transformer 3””](../02_History_Part_2/index.html#/gpt3) · [Handout](../02_History_Part_2/handout.html#chapter-gpt3)  
**Time:** 90 seconds, including debrief.

The same fixed language model receives two prompts. One gives only an instruction; the other also gives two input-output examples. The second follows the requested format more reliably. What is the best interpretation?

- **A.** The examples permanently updated the model’s weights for all future users.
- **B.** Following the format proves that every fact in the response is correct.
- **C.** The examples changed the model’s context and guided this response; they did not by themselves retrain its weights.
- **D.** The examples changed the model’s software, so future prompts no longer matter.

**Answer:** C. The examples changed the model’s context and guided this response; they did not by themselves retrain its weights.

Examples can demonstrate a pattern inside the current prompt. This in-context guidance can change the response without a training update, and it does not guarantee factual correctness.

**Misconception:** Confusing temporary in-context guidance with weight updates, software changes or guaranteed accuracy.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L00-C07 · Core · Exit / connect eras

**Placement:** [After “A history of interacting ideas and changing expectations”](../02_History_Part_2/index.html#/summary) · [Handout](../02_History_Part_2/handout.html#chapter-summary)  
**Time:** 150 seconds, including debrief.

Choose two milestones from different eras in this lecture. In two sentences, explain how the later milestone addressed a limitation or opportunity left by the earlier one, and name one limitation that still remained.


**Answer:** Suggested rubric (no automatic answer key)

Accept any accurate cross-era connection supported by the lecture. For example, multilayer networks with backpropagation addressed the representational and training limits of single-layer perceptrons, while vanishing gradients still made deep learning difficult.

**Misconception:** Treating AI history as an isolated list of names rather than a sequence of partial solutions with remaining limitations.

**Facilitation:** Ask for one explicit connection and one remaining limitation. Compare two responses that use different eras and discuss whether the claimed link is causal, conceptual or enabled by new resources.

### L00-O02 · Optional · Optional / synthesis

**Placement:** [After “The modern turning points”](../02_History_Part_2/index.html#/alphago-transformers) · [Handout](../02_History_Part_2/handout.html#chapter-alphago-transformers)  
**Time:** 90 seconds, including debrief.

AlphaGo combined learned components with search. Which conclusion is best supported by its success?

- **A.** Learning made search unnecessary once enough games had been observed.
- **B.** Combining learning with structured search can be powerful on a well-defined task without proving general intelligence.
- **C.** Beating expert players shows that the same system can solve unrelated intellectual tasks.
- **D.** Once a system outperforms humans, the method and task boundaries no longer matter.

**Answer:** B. Combining learning with structured search can be powerful on a well-defined task without proving general intelligence.

AlphaGo’s achievement shows the strength of combining learned evaluation and policy components with search in the structured domain of Go. It does not establish competence on unrelated tasks.

**Misconception:** Treating exceptional performance on one difficult task as evidence of general intelligence, or assuming learning made search unnecessary.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 03 · Search algorithms · Part 1

5 core + 1 optional. Core budget: approximately 8.5 minutes.

[Core import](imports/03_Search_Part_1.xlsx) · [Optional import](imports/optional/03_Search_Part_1_optional.xlsx)

### L01-C01 · Core · Opening / compare objectives

**Placement:** [Before “A solution path reaches a goal; its cost measures quality”](../03_Search_Part_1/index.html#/paths-costs) · [Handout](../03_Search_Part_1/handout.html#chapter-paths-costs)  
**Time:** 90 seconds, including debrief.

Three routes reach the same destination: P has road times 4 + 4, Q has 1 + 2 + 2, and R has 6 + 1 minutes. Which comparison of road count and total time is correct?

- **A.** P and R tie for fewest roads; Q is fastest at 5 minutes.
- **B.** P and R tie for fewest roads; R is fastest at 1 minute.
- **C.** Q uses the fewest roads and is fastest at 5 minutes.
- **D.** P and R tie for fewest roads and must tie for fastest time.

**Answer:** A. P and R tie for fewest roads; Q is fastest at 5 minutes.

P and R each use two roads, while Q uses three. Their total times are 8, 5 and 7 minutes respectively. Minimizing the number of steps and minimizing the sum of step costs are different objectives.

**Misconception:** Using only the last edge cost, or assuming a shortest path by edge count is also cheapest.

**Facilitation:** Collect a prediction before defining path cost. Ask students to name the two objectives and show their sums. Revisit the distinction on the next slide.

### L01-C02 · Core · Prediction / trace a queue

**Placement:** [Before “BFS · watch the queue expand”](../03_Search_Part_1/index.html#/bfs-lab) · [Handout](../03_Search_Part_1/handout.html#chapter-bfs-lab)  
**Time:** 90 seconds, including debrief.

A search removes the oldest waiting path and adds children at the back. Its queue is [B, C, D], next first. B is expanded, adding E then F; C is then expanded, adding H. No node is a goal. Which two nodes are selected next?

- **A.** D, then E.
- **B.** E, then F.
- **C.** H, then D.
- **D.** D, then H.

**Answer:** A. D, then E.

After B, the queue is [C, D, E, F]. After C, it is [D, E, F, H]. Therefore D and then E are selected. Children join behind all paths that were already waiting; this is the BFS queue rule.

**Misconception:** Giving newly generated children priority over older waiting alternatives, or placing H ahead of E and F.

**Facilitation:** The selection rule is supplied, so no prior knowledge of BFS is required. Ask students to write both intermediate queues before naming the strategy on the next slide.

### L01-C03 · Core · Prediction / trace a stack

**Placement:** [Before “DFS · follow the stack”](../03_Search_Part_1/index.html#/dfs-lab) · [Handout](../03_Search_Part_1/handout.html#chapter-dfs-lab)  
**Time:** 90 seconds, including debrief.

A search removes the most recently added path. It pushes B, then C, then D onto an empty stack. After selecting D, it pushes J, then K. J and K have no children; K is then selected. No node is a goal. Which two nodes are selected next?

- **A.** C, then B.
- **B.** C, then J.
- **C.** J, then B.
- **D.** J, then C.

**Answer:** D. J, then C.

With the top written first, the stack changes from [D, C, B] to [K, J, C, B] after D is expanded. Removing leaf K leaves [J, C, B]. J is also a leaf, so C follows it; this is DFS backtracking to an older alternative.

**Misconception:** Returning to C too early, or discarding older alternatives when descending into the D branch.

**Facilitation:** Ask students to sketch the stack after each step. Use the supplied rule to predict the return from a leaf, then connect it to DFS and backtracking.

### L01-C04 · Core · Check / distinguish guarantees

**Placement:** [After “Repeated work can be a reasonable price”](../03_Search_Part_1/index.html#/ids-overhead) · [Handout](../03_Search_Part_1/handout.html#chapter-ids-overhead)  
**Time:** 120 seconds, including debrief.

In a finite tree, the only goals are G at depth 3 with path cost 12, and H at depth 4 with path cost 4. All edge costs are positive. Iterative deepening increases its limit from 0 by one each time and stops at its first goal. What does it return, and why?

- **A.** H: positive edge costs make the deeper goal cheaper to find.
- **B.** H: iterative deepening compares total costs across all limits.
- **C.** G: the depth-3 pass reaches it before H is allowed; fewest edges need not mean lowest cost.
- **D.** G: the first goal found must have minimum cost whenever all edge costs are positive.

**Answer:** C. G: the depth-3 pass reaches it before H is allowed; fewest edges need not mean lowest cost.

Limits 0, 1 and 2 cannot reach either goal. The depth-3 pass can reach G but not H, so IDS returns G and stops. It guarantees a shallowest goal under these assumptions, but equal positive edge costs would be needed to turn that guarantee into minimum total cost.

**Misconception:** Treating increasing depth limits as increasing cost limits, or confusing positive costs with equal costs.

**Facilitation:** After the IDS lab, ask which limit first permits each goal. Discuss why a shallowest solution may still be more expensive before moving to the repeated-work calculation.

### L01-C05 · Core · Prediction / frontier versus solution cost

**Placement:** [Before “Lowest-cost-first · compare cumulative costs”](../03_Search_Part_1/index.html#/ucs-lab) · [Handout](../03_Search_Part_1/handout.html#chapter-ucs-lab)  
**Time:** 120 seconds, including debrief.

Only these directed edges exist: S→G costs 9, S→A costs 2, A→G costs 8, S→B costs 4, and B→G costs 1. After expanding S, a search selects the waiting path with the lowest cost so far. Which path comes next, and which complete route is cheapest?

- **A.** Next S→G; cheapest S→G, because a goal has already been discovered.
- **B.** Next S→B; cheapest S→B→G, because its final edge is cheapest.
- **C.** Next S→A; cheapest S→B→G, with total cost 5.
- **D.** Next S→A; cheapest S→A→G, because A is selected first.

**Answer:** C. Next S→A; cheapest S→B→G, with total cost 5.

The frontier costs after S are 9, 2 and 4, so S→A is selected next. The complete routes cost 9, 10 and 5; the cheapest is S→B→G. Selection uses accumulated cost, not the final edge or hindsight about the remaining route. Discovering S→G does not justify stopping.

**Misconception:** Confusing the cheapest unfinished path with the cheapest complete route, or accepting the first generated goal.

**Facilitation:** Compute frontier priorities and complete-route costs separately. The supplied selection rule supports the prediction before UCS is named. Revisit why goals must be accepted on selection in the stopping-rule explanation.

### L01-O02 · Optional · Optional / cycle versus duplicate

**Placement:** [After “A search tree can repeat a graph state”](../03_Search_Part_1/index.html#/graph-versus-tree) · [Handout](../03_Search_Part_1/handout.html#chapter-graph-versus-tree)  
**Time:** 90 seconds, including debrief.

The only directed edges are S→A, S→B, A→X and B→X. A search rejects a child only if its state already appears on that same path; it has no global visited set. What happens to S→A→X and S→B→X?

- **A.** The second path is rejected as a cycle because X was reached on the first path.
- **B.** Both paths are rejected because a state may have only one parent.
- **C.** Both paths are kept: neither contains a cycle, though both end at X.
- **D.** The second path is automatically merged with the first by the path cycle check.

**Answer:** C. Both paths are kept: neither contains a cycle, though both end at X.

S, A and X are distinct on the first path; S, B and X are distinct on the second. Neither path repeats an ancestor, so path cycle checking accepts both. Recognizing the duplicate endpoint across routes requires additional bookkeeping and a suitable search-specific policy.

**Misconception:** Assuming path cycle checking also removes all duplicate states across different branches.

**Facilitation:** Ask students to underline repeated states within each individual path. Then compare the endpoints across paths to distinguish a cycle from a duplicate.

## 04 · Search algorithms · Part 2

4 core + 2 optional. Core budget: approximately 7.5 minutes.

[Core import](imports/04_Search_Part_2.xlsx) · [Optional import](imports/optional/04_Search_Part_2_optional.xlsx)

### L01-C06 · Core · Prediction / compare frontier scores

**Placement:** [Before “The first A* decision”](../04_Search_Part_2/index.html#/astar-scores) · [Handout](../04_Search_Part_2/handout.html#chapter-astar-scores)  
**Time:** 90 seconds, including debrief.

The frontier contains paths P, Q and R. Their costs so far g and remaining estimates h are: P (6, 1), Q (2, 4), R (4, 3). Greedy selects minimum h; A* selects minimum g + h. Which paths do they select next?

- **A.** Both select P, because its remaining estimate is smallest.
- **B.** Both select Q, because its cost so far is smallest.
- **C.** Greedy selects P; A* selects Q, whose total estimate is 6.
- **D.** Greedy selects P; A* ties P and R at a total estimate of 7.

**Answer:** C. Greedy selects P; A* selects Q, whose total estimate is 6.

Greedy compares h values 1, 4 and 3, so it selects P. A* compares f = g + h values 7, 6 and 7, so it selects Q. A tie between P and R does not matter because Q has a lower score than both.

**Misconception:** Assuming minimum remaining estimate or minimum cost so far alone determines the A* choice, or overlooking a lower-scoring candidate when two others tie.

**Facilitation:** Ask students to write all three f scores before voting, then explain why the two global selection rules can disagree. Follow with the course-tree score table.

### L01-C07 · Core · Check / reopen and propagate

**Placement:** [After “Same state, cheaper route: update the record”](../04_Search_Part_2/index.html#/graph-cautions) · [Handout](../04_Search_Part_2/handout.html#chapter-graph-cautions)  
**Time:** 120 seconds, including debrief.

Graph A* has expanded X at cost g = 6 and found X→G with cost 3. Later it finds a route to X at g = 4. Its heuristic is admissible but inconsistent; G is the goal. Which action preserves the cheaper route through X?

- **A.** Keep X closed: an admissible heuristic makes its first expansion final.
- **B.** Update X to g = 4, but do not revisit its outgoing edge; keep G at cost 9.
- **C.** Reopen X at g = 4, but keep G at cost 9 because a goal was already discovered.
- **D.** Update X’s cost and parent, reopen it, and propagate the improvement to G at cost 7.

**Answer:** D. Update X’s cost and parent, reopen it, and propagate the improvement to G at cost 7.

The earlier route via X costs 6 + 3 = 9. The improvement gives 4 + 3 = 7. With an inconsistent admissible heuristic, an expanded state may later receive a better g. Updating only its record without reprocessing outgoing edges can leave descendant costs stale. Update the parent and cost, reopen X, and propagate the improvement.

**Misconception:** Treating admissibility as permission to close states permanently, or recording a cheaper arrival without propagating it.

**Facilitation:** Ask students to distinguish recording an improvement from propagating it. Relate their answer to the preceding reopening trace, keeping the toy numbers separate from that trace.

### L01-C08 · Core · Prediction / lower bounds and equality

**Placement:** [Before “Branch-and-bound · watch the incumbent improve”](../04_Search_Part_2/index.html#/branch-bound-lab) · [Handout](../04_Search_Part_2/handout.html#chapter-branch-bound-lab)  
**Time:** 120 seconds, including debrief.

Branch-and-bound already holds a complete route costing 6. Waiting path P has g = 4, h = 3; Q has g = 2, h = 4. The estimates are admissible and costs nonnegative. If the aim is to return one cheapest route, which paths may be pruned?

- **A.** Only P: a lower bound equal to 6 must always be explored.
- **B.** Only Q: its remaining estimate is larger than P’s.
- **C.** Both P and Q: neither lower bound is below 6, and the saved route is retained.
- **D.** Neither: their costs so far are below 6, so both must be completed.

**Answer:** C. Both P and Q: neither lower bound is below 6, and the saved route is retained.

The lower bounds are f(P) = 7 and f(Q) = 6. Neither can improve the saved cost-6 solution, so both may be pruned when only one optimum is needed. Equality can exclude an alternative equal-cost route; this is safe because the incumbent route is already saved. A threshold of 6 without a saved route would be a different situation.

**Misconception:** Pruning on g or h alone, or assuming an equal lower bound must be explored even when one incumbent solution suffices.

**Facilitation:** Have students compute both lower bounds and identify the saved route as the evidence supporting equality pruning. Revisit the distinction between a strict cutoff and a saved incumbent after the lab.

### L01-C09 · Core · Exit / explain a guarantee

**Placement:** [After “Search is controlled exploration”](../04_Search_Part_2/index.html#/summary) · [Handout](../04_Search_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

A graph A* search uses an admissible but inconsistent heuristic and never reopens expanded states. Can its first selected goal be suboptimal? Explain using the reopening example, where cost 6 improves to 5, and state the repair.


**Answer:** Suggested rubric (no automatic answer key)

Suggested rubric: yes. An admissible heuristic keeps path estimates optimistic, but an inconsistent heuristic can let a cheaper route to an expanded state arrive later. If that route is discarded, the frontier loses the prefix needed for the optimality argument. In the demo, reopening X at g = 2 improves the goal cost from 6 to 5. Keep best costs and parents, reopen improved states, and propagate improvements; test goals on selection under the stated cost/termination conditions.

**Misconception:** Believing admissibility alone guarantees optimality for every graph-search implementation, regardless of duplicate handling.

**Facilitation:** Accept two or three sentences that connect the frontier argument to the concrete reopening trace. Keep the response ungraded; use it to diagnose whether students distinguish heuristic properties from implementation rules.

### L01-O01 · Optional · Optional / justify a relaxed bound

**Placement:** [After “Admissible means “never overestimate””](../04_Search_Part_2/index.html#/admissibility) · [Handout](../04_Search_Part_2/handout.html#chapter-admissibility)  
**Time:** 90 seconds, including debrief.

A robot moves horizontally or vertically on a grid, one unit per move, and must avoid obstacles. Which proposed heuristic is guaranteed admissible for every reachable state?

- **A.** The length of any legal route already found from that state to the goal.
- **B.** Manhattan distance plus 1, to compensate for possible obstacles.
- **C.** Twice Manhattan distance when the map contains many obstacles.
- **D.** Manhattan distance to the goal with the obstacles ignored.

**Answer:** D. Manhattan distance to the goal with the obstacles ignored.

Ignoring obstacles removes constraints while preserving the unit move costs, so the relaxed shortest path cannot cost more than the real shortest path. Its cost is Manhattan distance. A legal route supplies an upper bound, not necessarily a lower bound; adding 1 or multiplying by 2 can overestimate, including simple unobstructed cases.

**Misconception:** Confusing the cost of a feasible solution with an admissible lower bound, or assuming an obstacle correction is safe without proof.

**Facilitation:** Ask for the guarantee argument, not just the name Manhattan distance. Students can refute the other proposals with an unobstructed path or the goal itself.

### L01-O03 · Optional · Optional / test an edge condition

**Placement:** [After “Consistency: check how the estimate changes in one move”](../04_Search_Part_2/index.html#/consistency) · [Handout](../04_Search_Part_2/handout.html#chapter-consistency)  
**Time:** 90 seconds, including debrief.

An edge u→v costs 2. The heuristic values are h(u) = 5 and h(v) = 2; the current path to u has cost g = 3. After extending that path to v, how does its A* score f = g + h change, and is this edge consistent?

- **A.** f rises from 8 to 9; the edge is consistent because the step costs 2.
- **B.** f falls from 8 to 7; the edge is consistent because its cost is positive.
- **C.** f stays at 8; the increase in g always exactly cancels the change in h.
- **D.** f falls from 8 to 7; the edge is inconsistent because 5 > 2 + 2.

**Answer:** D. f falls from 8 to 7; the edge is inconsistent because 5 > 2 + 2.

Before the edge, f = 3 + 5 = 8. After paying the edge cost, g = 5 and f = 5 + 2 = 7. Consistency would require h(u) ≤ cost(u,v) + h(v), but 5 > 4. The falling score exposes the inconsistency; positive edge costs alone do not establish the condition.

**Misconception:** Assuming f always increases because g increases, or confusing positive edge costs with consistency of the heuristic.

**Facilitation:** Compute the new g before adding the new h. Then check the edge inequality separately and connect the two results to the monotonicity explanation.

## 05 · Constraint satisfaction · Part 1

4 core + 2 optional. Core budget: approximately 7 minutes.

[Core import](imports/05_Constraints_Part_1.xlsx) · [Optional import](imports/optional/05_Constraints_Part_1_optional.xlsx)

### L02-C01 · Core · Check / partial assignment and scope

**Placement:** [Before “The running CSP has exactly two solutions”](../05_Constraints_Part_1/index.html#/definition) · [Handout](../05_Constraints_Part_1/handout.html#chapter-definition)  
**Time:** 90 seconds, including debrief.

A, B and C each have domain {1,2,3}. The rules are A < B and B ≠ C. Only A = 2 is assigned. Which statement about this partial assignment is correct?

- **A.** It already violates A < B, because B has no assigned value.
- **B.** It is a solution, because no rule has been violated yet.
- **C.** Neither rule is evaluable yet; one possible completion is B = 3, C = 1.
- **D.** Both rules are satisfied, because each has at least one possible supporting pair.

**Answer:** C. Neither rule is evaluable yet; one possible completion is B = 3, C = 1.

Neither rule has its whole scope assigned: A < B still needs B, and B ≠ C needs B and C. Pending is different from false or true. The total assignment (A,B,C) = (2,3,1) satisfies both rules, so this partial assignment can be extended to a solution.

**Misconception:** Confusing a rule that is not yet evaluable with a failed or satisfied rule, and confusing a partial context with a solution.

**Facilitation:** Ask students to name the missing variables in each scope before voting. Then ask for a second valid completion.

### L02-C02 · Core · Prediction / trace a pruned branch

**Placement:** [Before “Follow one branch, then watch DFS undo it”](../05_Constraints_Part_1/index.html#/dfs-lab) · [Handout](../05_Constraints_Part_1/handout.html#chapter-dfs-lab)  
**Time:** 90 seconds, including debrief.

X₁, X₂ and X₃ each have domain {0,1,2}. The rules are X₁ < 2, X₂ > 0 and X₃ < X₁. DFS assigns X₁ first and tries X₁ = 2. What can it prune immediately, without propagation?

- **A.** All 9 completions of this branch: X₁ < 2 is already false.
- **B.** Only the 3 completions with X₂ = 0: X₃ is still unassigned.
- **C.** All 27 assignments: a false unary rule makes the whole CSP impossible.
- **D.** Nothing yet: every rule must wait until all three variables are assigned.

**Answer:** A. All 9 completions of this branch: X₁ < 2 is already false.

X₁ < 2 has scope {X₁}, so it is evaluable and false as soon as X₁ = 2. The 3 × 3 = 9 choices for X₂ and X₃ cannot repair that fixed value. Reject this branch, not the entire CSP: other values of X₁ remain to try.

**Misconception:** Waiting for a total assignment before checking a unary rule, or confusing one rejected branch with global unsatisfiability.

**Facilitation:** Have students identify the failed scope and count the skipped leaves. Compare the branch with X₁ = 0, where plain DFS needs a later X₃ choice to expose the conflict.

### L02-C03 · Core · Prediction / propagation to a fixed point

**Placement:** [Before “Watch domains shrink and checks return”](../05_Constraints_Part_1/index.html#/gac-lab) · [Handout](../05_Constraints_Part_1/handout.html#chapter-gac-lab)  
**Time:** 120 seconds, including debrief.

A, B and C each start with domain {1,2,3,4}; the rules are A < B and B < C. Repeatedly remove values with no support in a rule, until no domain changes. What remains?

- **A.** A = {1,2,3}, B = {2,3}, C = {2,3,4}.
- **B.** A = {1,2}, B = {2,3}, C = {3,4}.
- **C.** A = {1}, B = {2}, C = {3}: propagation chooses the smallest solution.
- **D.** A = {1,2,3}, B = {1,2,3,4}, C = {2,3,4}.

**Answer:** B. A = {1,2}, B = {2,3}, C = {3,4}.

A < B removes A = 4 and B = 1. B < C removes B = 4 and forces C ≥ 3 once B ≥ 2. Rechecking A < B then removes A = 3, which has lost B = 4 as its only support. The fixed point is A {1,2}, B {2,3}, C {3,4}; propagation retains supported alternatives rather than choosing one solution.

**Misconception:** Stopping after one pass, forgetting that a lost support can trigger another deletion, or treating filtering as value selection.

**Facilitation:** Collect predictions, then run the GAC lab and pause when B loses 4. Ask which earlier value has just lost its last support.

### L02-C04 · Core · Prediction / local support versus solution

**Placement:** [Before “A partner for each rule is not one shared solution”](../05_Constraints_Part_1/index.html#/consistent-unsat) · [Handout](../05_Constraints_Part_1/handout.html#chapter-consistent-unsat)  
**Time:** 120 seconds, including debrief.

A, B and C each have domain {1,2}. The three separate binary rules are A = B, B = C and A ≠ C. What happens if we enforce arc consistency on each rule?

- **A.** All domains become empty: arc consistency combines the two equalities into A = C.
- **B.** A = 1 is removed, but A = 2 remains as a solution.
- **C.** All values remain supported in each rule, although no total assignment satisfies all three.
- **D.** All values remain, which proves that a solution exists.

**Answer:** C. All values remain supported in each rule, although no total assignment satisfies all three.

In either equality, a value is supported by the same value at the other variable. In A ≠ C, it is supported by the other value. No individual rule removes anything. Globally the equalities imply A = C, contradicting A ≠ C. Separate local supports need not fit into one common solution.

**Misconception:** Assuming local supports can always be combined into a global solution, or attributing arbitrary logical inference to ordinary arc consistency.

**Facilitation:** Ask students to give A = 1 a support in each adjacent rule, then explain why the supporting choices cannot satisfy the whole network together.

### L02-O01 · Optional · Optional / justify value ordering

**Placement:** [After “Choose the next decision to reduce wasted work”](../05_Constraints_Part_1/index.html#/ordering) · [Handout](../05_Constraints_Part_1/handout.html#chapter-ordering)  
**Time:** 90 seconds, including debrief.

We have already selected variable A. The only rule is A ≠ B, with dom(A) = {1,2} and dom(B) = {1,3}. Which value should least-constraining-value ordering try first, and why?

- **A.** A = 1: it uses the smaller value and therefore removes fewer choices.
- **B.** A = 2: both values of B remain available, whereas A = 1 removes B = 1.
- **C.** A = 1: leaving B only one value is the aim of least-constraining-value ordering.
- **D.** Either value: A has two choices, so both must affect B equally.

**Answer:** B. A = 2: both values of B remain available, whereas A = 1 removes B = 1.

Choosing A = 2 conflicts with neither 1 nor 3, leaving two choices for B. Choosing A = 1 leaves only B = 3. LCV orders values to preserve options for other variables. MRV is a separate decision about which variable to select; A was already selected here.

**Misconception:** Confusing variable ordering with value ordering, choosing the smallest numeral, or reversing the least-constraining rule.

**Facilitation:** Ask students to write the remaining domain of B under each tentative choice. Explain why an exhaustive solver still tries the other value later if needed.

### L02-O02 · Optional · Optional / trace a lost support

**Placement:** [After “Deleting a partner can break an earlier check”](../05_Constraints_Part_1/index.html#/requeue) · [Handout](../05_Constraints_Part_1/handout.html#chapter-requeue)  
**Time:** 90 seconds, including debrief.

The rules are A < B and B < C. Currently A = {1,2,3}, B = {2,3,4}, C = {3,4}. Checking B < C removes B = 4. When A < B is rechecked, which value of A loses its last support?

- **A.** A = 1, because B = 1 is unavailable.
- **B.** A = 2, because B must use the same value as A.
- **C.** A = 3, because its only larger partner was B = 4.
- **D.** No value: A’s domain has not changed yet.

**Answer:** C. A = 3, because its only larger partner was B = 4.

A = 3 needs a B value strictly greater than 3. Its only support was B = 4, which has disappeared. A = 1 still has B = 2 or 3, and A = 2 still has B = 3. This is why a reduction in B requires checking related constraints again.

**Misconception:** Ignoring a support lost in another constraint, or replacing the strict inequality with equality.

**Facilitation:** Ask students to identify the exact supporting value before naming the affected arc. This makes the requeue rule concrete.

## 06 · Constraint satisfaction · Part 2

4 core + 1 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/06_Constraints_Part_2.xlsx) · [Optional import](imports/optional/06_Constraints_Part_2_optional.xlsx)

### L02-C05 · Core · Prediction / independent split branches

**Placement:** [Before “Turn the remaining choices into a search tree”](../06_Constraints_Part_2/index.html#/split-lab) · [Handout](../06_Constraints_Part_2/handout.html#chapter-split-lab)  
**Time:** 90 seconds, including debrief.

At a propagation fixed point, dom(X) = {1,2,3,4}. We split into X ∈ {1,2} and X ∈ {3,4}. Propagation makes Y’s domain empty in the first branch. To find every solution, what should happen next?

- **A.** Reject the first branch; propagate the second using its own copy of the parent domains.
- **B.** Reject the whole CSP: an empty domain in either branch proves both impossible.
- **C.** Explore the second branch, carrying over Y’s empty domain from the first.
- **D.** Restore X to {1,2,3,4} in the second branch so that no value is missed.

**Answer:** A. Reject the first branch; propagate the second using its own copy of the parent domains.

An empty domain proves only that the current branch has no solution. The disjoint branches cover the parent domain, so the second must still be searched. Each starts with its own copy of the parent domains; reductions caused by X ∈ {1,2} must not leak into the X ∈ {3,4} branch.

**Misconception:** Treating a failed branch as a global proof, sharing mutable domain reductions between siblings, or undoing the partition.

**Facilitation:** Draw the parent and two branches. Cross out only the first and ask students which domains the second should inherit.

### L02-C06 · Core · Check / score the whole candidate

**Placement:** [After “Local search starts complete and repairs errors”](../06_Constraints_Part_2/index.html#/local-intro) · [Handout](../06_Constraints_Part_2/handout.html#chapter-local-intro)  
**Time:** 90 seconds, including debrief.

Three exams A, B and C use slots {1,2}. The only clash rules are A ≠ B and B ≠ C. Local search starts at (A,B,C) = (1,1,2) and changes only B to 2. How does the number of violated rules change?

- **A.** It falls from 1 to 0: the clash between A and B disappears.
- **B.** It stays at 1: the clash moves from A–B to B–C.
- **C.** It rises from 1 to 2: both rules are now violated.
- **D.** The move is forbidden: local search cannot visit an assignment with a clash.

**Answer:** B. It stays at 1: the clash moves from A–B to B–C.

Initially A = B violates the first rule, while B ≠ C satisfies the second. After B changes to 2, A ≠ B holds but B = C violates the second. Both candidates are total and domain-valid, with one violated rule each. Repairing one constraint does not necessarily improve the overall score.

**Misconception:** Counting only the repaired constraint instead of all affected constraints, or applying conflict-free partial-search rules to local search.

**Facilitation:** Ask students to check both rules before and after the move. Use the unchanged count to introduce the plateau idea later in the lecture.

### L02-C07 · Core · Prediction / apply annealing acceptance

**Placement:** [Before “Keep the move fixed and change its temperature”](../06_Constraints_Part_2/index.html#/anneal-lab) · [Handout](../06_Constraints_Part_2/handout.html#chapter-anneal-lab)  
**Time:** 90 seconds, including debrief.

An annealing move raises the conflict count from 1 to 3. For this move, acceptance probability is 0.61 at T = 4 and 0.02 at T = 0.5. Accept when a random draw u is below that probability. Using u = 0.40, what happens?

- **A.** Accept at both temperatures, because every proposed move is allowed.
- **B.** Reject at both temperatures, because the conflict count increases.
- **C.** Accept only at T = 0.5: cooling makes uphill moves easier.
- **D.** Accept at T = 4; reject at T = 0.5. Cooling makes this uphill move less likely.

**Answer:** D. Accept at T = 4; reject at T = 0.5. Cooling makes this uphill move less likely.

The increase is Δh = 3 − 1 = 2. The rule p = exp(−Δh/T) gives approximately 0.61 and 0.02. Since 0.40 < 0.61 but 0.40 is not below 0.02, the hot run accepts and the cold run rejects. Higher temperature makes temporary deterioration easier to accept; acceptance does not guarantee eventual success.

**Misconception:** Treating a worse move as automatically accepted or rejected, reversing the effect of temperature, or comparing the random draw in the wrong direction.

**Facilitation:** Have students compare u with each probability before opening the lab. Use the same proposed move and draw in both runs to isolate the effect of temperature.

### L02-C08 · Core · Exit / compare evidence from two solvers

**Placement:** [After “Build systematically—or repair a candidate”](../06_Constraints_Part_2/index.html#/summary) · [Handout](../06_Constraints_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

Solver A exhaustively explores all branches of a finite CSP using sound pruning and finds no solution. Solver B makes 10,000 local-search moves, with restarts, and finds no solution. Which can conclude that the CSP is unsatisfiable, and why? Answer in two sentences.


**Answer:** Suggested rubric (no automatic answer key)

Suggested rubric: A can conclude unsatisfiability because exhaustive coverage with sound pruning rules out every possible solution. B cannot: a finite unsuccessful local search, even with restarts, may miss an existing solution. A single fully checked solution from either solver would instead prove satisfiability.

**Misconception:** Confusing a large search budget or repeated failure with exhaustive coverage and an impossibility proof.

**Facilitation:** Keep this response ungraded. Look for an explicit link between coverage and proof, rather than merely the names of the two methods.

### L02-O03 · Optional · Optional / escape a plateau

**Placement:** [After “Cooling: explore first, then become more selective”](../06_Constraints_Part_2/index.html#/cooling) · [Handout](../06_Constraints_Part_2/handout.html#chapter-cooling)  
**Time:** 90 seconds, including debrief.

A local-search candidate has 1 conflict. Every one-variable neighbor has at least 1. One neighbor also has 1 conflict, and from it a move reaches 0. Which conclusion follows for strict improvement, which accepts only lower scores?

- **A.** Strict improvement takes the equal-score move, then reaches 0.
- **B.** Strict improvement stops here; allowing the equal-score move could reach a solution in two steps.
- **C.** The current candidate is globally optimal because no immediate move improves it.
- **D.** A restart is guaranteed to reach the zero-conflict candidate on its next move.

**Answer:** B. Strict improvement stops here; allowing the equal-score move could reach a solution in two steps.

No neighbor has a lower score, so strict improvement cannot move. The stated equal-score step crosses a plateau and exposes an improving move. A sideways policy could use that route; a restart supplies another attempt but does not guarantee it. A local stopping condition is not a global impossibility proof.

**Misconception:** Confusing strict improvement with sideways moves, or interpreting a locally stuck candidate as a global optimum or proof of unsatisfiability.

**Facilitation:** Sketch three candidates labelled 1 → 1 → 0. Ask which edge strict improvement refuses and what policy change would allow it.

## 07 · Introduction to machine learning · Part 1

4 core + 1 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/07_Intro_ML_Part_1.xlsx) · [Optional import](imports/optional/07_Intro_ML_Part_1_optional.xlsx)

### L03-C01 · Core · Opening / distinguish stages

**Placement:** [Before “Learning a rule and using it are different steps”](../07_Intro_ML_Part_1/index.html#/training-inference) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-training-inference)  
**Time:** 90 seconds, including debrief.

A crop model predicts a new field’s yield without changing its parameters. Later, an optimizer updates those parameters using the measured yield. How should we describe these two stages?

- **A.** Both are inference because the model family stays unchanged.
- **B.** Both are training because both stages use data.
- **C.** The prediction is training; the later parameter update is inference.
- **D.** The fixed-model prediction is inference; the parameter update is training.

**Answer:** D. The fixed-model prediction is inference; the parameter update is training.

Inference applies the current fitted function. Training uses a learning signal to change its parameters. Keeping the model family fixed does not prevent its parameters from being learned.

**Misconception:** Confusing parameter updates with applying a model, or treating a fixed model family as a model that cannot learn.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-C02 · Core · Check / interpret the target

**Placement:** [After “The target’s meaning decides the task”](../07_Intro_ML_Part_1/index.html#/regression-classification) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-regression-classification)  
**Time:** 90 seconds, including debrief.

One dataset records plant species as codes {0,1,2}; another records crop yield in kg. Both targets are numbers. Which task choice follows from what those targets mean?

- **A.** Regression for both, because both targets are stored as numbers.
- **B.** Classification for species; regression for yield.
- **C.** Regression for species; classification for yield, because yield was measured.
- **D.** Classification for both, because each training example has a known target.

**Answer:** B. Classification for species; regression for yield.

Species codes name categories: their arithmetic differences do not measure how much species differ. Yield in kg is a quantitative magnitude. Target meaning, rather than its numerical storage format, distinguishes these tasks.

**Misconception:** Treating numerical category IDs as quantitative outcomes, or confusing known targets with classification.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-C03 · Core · Prediction / distinguish target from guess

**Placement:** [Before “Build a self-supervised training pair”](../07_Intro_ML_Part_1/index.html#/mask-lab) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-mask-lab)  
**Time:** 90 seconds, including debrief.

The recorded sentence is “The crop needs water”. We hide “water”; a model predicts the plausible word “sunlight”. Which statement about this self-supervised training pair is correct?

- **A.** “Water” is the target; a plausible alternative can still disagree with this recorded target.
- **B.** “Sunlight” becomes the target because the model predicted it.
- **C.** Any plausible word automatically counts as the recorded correct target.
- **D.** A person must annotate a new target because the original word was hidden.

**Answer:** A. “Water” is the target; a plausible alternative can still disagree with this recorded target.

Masking constructs the visible input, while the original recorded token supplies the target. Plausibility does not change which token occurred in that example. No extra manual task annotation is required.

**Misconception:** Equating a plausible generated continuation with the recorded training target, or assuming self-supervision has no targets.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-C04 · Core · Prediction / reason about uncertainty

**Placement:** [Before “Explore or exploit? Try three uncertain actions”](../07_Intro_ML_Part_1/index.html#/bandit-lab) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-bandit-lab)  
**Time:** 120 seconds, including debrief.

A bandit arm A rewarded 6 of 10 pulls, B rewarded 1 of 2, and C rewarded 0 of 1. Rewards are noisy. A rule now always picks A and never samples the other arms. What can go wrong?

- **A.** The 6/10 rate establishes A’s true reward probability exactly, so no better arm can be missed.
- **B.** Early noisy results may hide a better arm; occasionally sampling other arms can reveal it.
- **C.** C’s one zero reward proves that it cannot be the best arm.
- **D.** Trying B instead guarantees a larger reward on the very next pull.

**Answer:** B. Early noisy results may hide a better arm; occasionally sampling other arms can reveal it.

A has the highest observed rate, but finite noisy samples do not establish the arms’ true probabilities. Exploiting A forever may leave a better option poorly measured. Exploration gathers information and can cost immediate reward; it does not guarantee a better next outcome.

**Misconception:** Treating small-sample estimates as known true rewards, or expecting exploration to guarantee immediate improvement.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-O01 · Optional · Optional / separate two learning issues

**Placement:** [After “The same task can arrive in different-looking data”](../07_Intro_ML_Part_1/index.html#/domain-shift) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-domain-shift)  
**Time:** 120 seconds, including debrief.

A system learns from labeled scans at hospital A and unlabeled scans at hospital B. B uses a different scanner. Which interpretation is justified?

- **A.** Using both pools can be semi-supervised learning, while the scanner difference introduces domain shift.
- **B.** Semi-supervised learning guarantees that both hospitals have the same input distribution.
- **C.** A scanner difference by itself proves the training labels are noisy.
- **D.** Adding unlabeled B scans automatically corrects every scanner-related performance difference.

**Answer:** A. Using both pools can be semi-supervised learning, while the scanner difference introduces domain shift.

Semi-supervision describes how labeled and unlabeled examples are used. Domain shift describes a difference between training/deployment distributions. They can coexist. A different scanner does not itself establish label errors, and adaptation still needs appropriate assumptions and evaluation.

**Misconception:** Conflating supervision quality with distribution change, or assuming extra unlabeled data automatically fixes it.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

## 08 · Introduction to machine learning · Part 2

3 core + 2 optional. Core budget: approximately 6 minutes.

[Core import](imports/08_Intro_ML_Part_2.xlsx) · [Optional import](imports/optional/08_Intro_ML_Part_2_optional.xlsx)

### L03-C05 · Core · Check / construct a dataset

**Placement:** [After “A design matrix stores input rows; a vector stores targets”](../08_Intro_ML_Part_2/index.html#/matrix) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-matrix)  
**Time:** 90 seconds, including debrief.

60 field trials record fertilizer and soil moisture to predict yield. A trial ID is kept only for lookup. With one row per trial, which input/target representation is correct?

- **A.** X has shape 60×3 because the lookup ID must also be a predictor; Y has 60 entries.
- **B.** X has shape 60×2 for the two predictors; Y has the 60 measured yields.
- **C.** X has shape 2×60 and Y has two entries, one per predictor.
- **D.** X has shape 60×3 including measured yield; Y repeats that same yield column.

**Answer:** B. X has shape 60×2 for the two predictors; Y has the 60 measured yields.

n=60 is the number of observations and m=2 is the number of predictors. The design matrix X has n rows and m columns. Y contains one outcome per row. A lookup ID is not automatically a predictor, and the unknown yield must not be included as its own input.

**Misconception:** Counting targets or administrative IDs as predictors, or transposing observations and features.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-C06 · Core · Prediction / detect evaluation leakage

**Placement:** [Before “Data leakage lets evaluation information enter preparation”](../08_Intro_ML_Part_2/index.html#/leakage) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-leakage)  
**Time:** 120 seconds, including debrief.

An engineer computes a feature mean from all 1,000 rows, uses it to scale the inputs, and only then splits into training and test sets. Test targets never enter fitting. Is the final test independent of model preparation?

- **A.** Yes: preprocessing cannot leak information unless it uses test targets.
- **B.** Yes: a random split makes every earlier preparation step independent.
- **C.** Yes, provided the best model is also selected using the test score.
- **D.** No: test inputs influenced learned preprocessing; fit that preprocessing on training data only.

**Answer:** D. No: test inputs influenced learned preprocessing; fit that preprocessing on training data only.

The preprocessing mean is learned from data. Computing it before splitting lets held-out inputs influence preparation, even without using their targets. Split first, fit preprocessing and model parameters on training data, use validation for choices, and reserve the final test for assessment.

**Misconception:** Believing leakage requires target labels, or that a later random split undoes earlier information sharing.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-C07 · Core · Exit / justify model selection and evaluation

**Placement:** [After “A complete prediction problem follows this chain”](../08_Intro_ML_Part_2/index.html#/summary) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-summary)  
**Time:** 150 seconds, including debrief.

Two polynomial models have training/validation errors: degree 2 = (0.08, 0.10), degree 9 = (0.01, 0.35). Choose a model for new fields, justify your choice, and say which data should provide the final performance estimate.


**Answer:** Suggested rubric (no automatic answer key)

Suggested rubric: prefer degree 2 because its validation error is lower despite a worse training fit. Degree 9’s low training error does not establish better generalization. Once all choices are fixed, use an untouched test set representative of the intended new fields to estimate final performance.

**Misconception:** Selecting only by training error, or reusing the validation results that guided model choice as an untouched final test.

**Facilitation:** Ask for a short justification that separates training fit, validation-based choice and final testing.

### L03-O02 · Optional · Optional / distinguish θ from Θ

**Placement:** [After “A hypothesis space contains the allowed choices”](../08_Intro_ML_Part_2/index.html#/hypothesis-space) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-hypothesis-space)  
**Time:** 90 seconds, including debrief.

We choose the family fθ(x)=ax²+bx+c, then fitting changes θ from (1,0,0) to (2,−1,0.5). What changed?

- **A.** The family changed from quadratic to cubic.
- **B.** The polynomial degree was learned, but the coefficients stayed fixed.
- **C.** A new parameter space was required because a coefficient became negative.
- **D.** The parameter setting changed within the same Θ=ℝ³; allowing a different degree would change the family.

**Answer:** D. The parameter setting changed within the same Θ=ℝ³; allowing a different degree would change the family.

The family fixes the functional form and Θ describes its permitted coefficient settings. Both triples lie in ℝ³ and select functions from the same family. Choosing a different maximum polynomial degree is a model-family or hyperparameter choice rather than this coefficient update.

**Misconception:** Confusing one fitted parameter setting with the entire hypothesis space or the chosen model family.

**Facilitation:** Ask students to commit to a choice, explain the relevant evidence, and compare a plausible distractor before revealing the answer.

### L03-O03 · Optional · Optional / design a realistic evaluation

**Placement:** [After “Data leakage lets evaluation information enter preparation”](../08_Intro_ML_Part_2/index.html#/leakage) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-leakage)  
**Time:** 120 seconds, including debrief.

A yield model is trained on fields A–D using data from 2021–2023. We want to predict yields in 2024 for new fields. Which test set best checks this?

- **A.** 2024 records from fields A–D.
- **B.** 2024 records from different fields, E–H.
- **C.** 2021–2023 records from different fields, E–H.
- **D.** Unused 2021–2023 records from fields A–D, selected at random.

**Answer:** B. 2024 records from different fields, E–H.

B checks both intended changes: 2024 is later than the training years, and fields E–H do not occur in training. A checks a later year on familiar fields. C checks new fields in the same years. D checks unused records from familiar fields and years. None of A, C or D checks both requirements.

**Misconception:** Testing only a new time period or only new field identities, rather than matching both aspects of the intended use.

**Facilitation:** Ask what each option tests: later time, unseen fields, both, or neither. Then connect the test split to the intended prediction task.

## 09 · Regression · Part 1

5 core + 1 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/09_Regression_Part_1.xlsx) · [Optional import](imports/optional/09_Regression_Part_1_optional.xlsx)

### L04-C01 · Core · Opening / everyday intuition

**Placement:** [Before “Move the line and watch the residuals change”](../09_Regression_Part_1/index.html#/residual-lab) · [Handout](../09_Regression_Part_1/handout.html#chapter-residual-lab)  
**Time:** 60 seconds, including debrief.

A house costs 7 units, but a model predicts 5. Using error = actual value minus prediction, what is the error?

- **A.** -2.
- **B.** 12.
- **C.** +2.
- **D.** 4.

**Answer:** C. +2.

The signed error is 7-5=2. This is a residual for an observation used to fit the model.

**Misconception:** Reversing the stated subtraction order.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L04-C02 · Core · Prediction / intuition

**Placement:** [Before “Compare the supplied line with a fresh OLS fit”](../09_Regression_Part_1/index.html#/fit-lab) · [Handout](../09_Regression_Part_1/handout.html#chapter-fit-lab)  
**Time:** 60 seconds, including debrief.

A line predicts every training value exactly. What is its sum of squared prediction errors?

- **A.** 0.
- **B.** 1.
- **C.** The number of training examples.
- **D.** We cannot tell even though every prediction is exact.

**Answer:** A. 0.

Every error is zero, so every squared error is zero. Least squares tries to make the sum small.

**Misconception:** Thinking a perfect fit still has nonzero residual error.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L04-C03 · Core · Check / core understanding

**Placement:** [After “R² compares squared error to a baseline”](../09_Regression_Part_1/index.html#/r2) · [Handout](../09_Regression_Part_1/handout.html#chapter-r2)  
**Time:** 90 seconds, including debrief.

On the same nonconstant dataset, model A has R²=0.8 and model B has R²=0.3. Which has the smaller sum of squared errors?

- **A.** Model A.
- **B.** Model B.
- **C.** They must have equal errors.
- **D.** R² only tells us whether the slope is positive.

**Answer:** A. Model A.

With the same baseline and data, higher R² means smaller squared error. It does not by itself establish performance on other data.

**Misconception:** Confusing the fit metric with slope direction or a guarantee about future cases.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L04-C04 · Core · Prediction / intuition

**Placement:** [Before “Curved in x can still be linear in the parameters”](../09_Regression_Part_1/index.html#/polynomial) · [Handout](../09_Regression_Part_1/handout.html#chapter-polynomial)  
**Time:** 90 seconds, including debrief.

A scatterplot shows a clear U-shaped pattern. Which model could follow that shape better than a straight line?

- **A.** A horizontal line only.
- **B.** The same straight line with a different color.
- **C.** A curve that includes an x-squared term.
- **D.** Deleting the response values before fitting.

**Answer:** C. A curve that includes an x-squared term.

A quadratic term can represent curvature. Introduce polynomial regression through the shape before discussing coefficients.

**Misconception:** Thinking regression models must always be straight lines.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L04-C05 · Core · Prediction / intuition

**Placement:** [Before “Explore the original high-degree curves”](../09_Regression_Part_1/index.html#/overfit-lab) · [Handout](../09_Regression_Part_1/handout.html#chapter-overfit-lab)  
**Time:** 90 seconds, including debrief.

A student memorizes every practice answer but struggles with new exercises. Which model behavior is this most like?

- **A.** Doing poorly on both practice and new examples.
- **B.** Doing equally well on every new example.
- **C.** Having too little flexibility to fit any practice example.
- **D.** Doing very well on training examples but poorly on new examples.

**Answer:** D. Doing very well on training examples but poorly on new examples.

This is the intuition behind overfitting: a model can fit the training set without learning a relationship that transfers.

**Misconception:** Assuming the best training score always means the best model.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L04-O01 · Optional · Optional / basic extension

**Placement:** [After “Simple linear regression has two parameters”](../09_Regression_Part_1/index.html#/line) · [Handout](../09_Regression_Part_1/handout.html#chapter-line)  
**Time:** 90 seconds, including debrief.

In a straight-line model y ≈ intercept + slope × x, what does the slope describe?

- **A.** The total number of observations.
- **B.** The prediction when x is zero.
- **C.** The color of the plotted line.
- **D.** The predicted change in y when x increases by one unit.

**Answer:** D. The predicted change in y when x increases by one unit.

The slope measures predicted change per unit of x. The intercept is the prediction at x=0.

**Misconception:** Swapping the roles of slope and intercept.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 10 · Regression · Part 2

4 core + 2 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/10_Regression_Part_2.xlsx) · [Optional import](imports/optional/10_Regression_Part_2_optional.xlsx)

### L04-C06 · Core · Check / core understanding

**Placement:** [After “Repeat the experiment: how much do fits move?”](../10_Regression_Part_2/index.html#/bias-lab) · [Handout](../10_Regression_Part_2/handout.html#chapter-bias-lab)  
**Time:** 90 seconds, including debrief.

You fit a model again using a slightly different training sample, and its curve changes a lot. What does this suggest?

- **A.** The model must make identical predictions on every dataset.
- **B.** The fitted model is sensitive to which training examples it receives.
- **C.** The training sample has no effect on the fit.
- **D.** The target must be a category rather than a number.

**Answer:** B. The fitted model is sensitive to which training examples it receives.

Strong changes across training samples indicate high variability in fitted predictions.

**Misconception:** Thinking a flexible fitted curve is necessarily stable.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L04-C07 · Core · Check / core understanding

**Placement:** [After “A p-value is conditional on the null model”](../10_Regression_Part_2/index.html#/pvalues) · [Handout](../10_Regression_Part_2/handout.html#chapter-pvalues)  
**Time:** 90 seconds, including debrief.

A regression slope has a small p-value. Does that alone prove that changing the input causes the output to change?

- **A.** Yes. Every small p-value proves causation.
- **B.** No. Evidence of an association is not by itself proof of causation.
- **C.** Yes, provided the graph uses a straight line.
- **D.** No, because a small p-value means the slope must be exactly zero.

**Answer:** B. No. Evidence of an association is not by itself proof of causation.

The test concerns evidence against a specified null model under its assumptions. Causal claims need more than a small p-value.

**Misconception:** Reading causal proof into a statistical association.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L04-C08 · Core · Check / core understanding

**Placement:** [After “Adjustment can change the apparent relationship”](../10_Regression_Part_2/index.html#/adjustment) · [Handout](../10_Regression_Part_2/handout.html#chapter-adjustment)  
**Time:** 90 seconds, including debrief.

Ice-cream sales and swimming incidents both rise in warm weather. What could help explain their association?

- **A.** Warm weather can affect both ice-cream buying and swimming activity.
- **B.** Buying ice cream has been proved to cause every incident.
- **C.** An association guarantees that one variable causes the other.
- **D.** Two quantities that rise together cannot share another cause.

**Answer:** A. Warm weather can affect both ice-cream buying and swimming activity.

A common influence can produce an association. This is a possible explanation, not proof about a particular dataset.

**Misconception:** Assuming correlation establishes a direct causal link.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L04-C09 · Core · Exit / one takeaway

**Placement:** [After “Fit carefully. Evaluate separately. Interpret precisely.”](../10_Regression_Part_2/index.html#/summary) · [Handout](../10_Regression_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

In one sentence, explain what overfitting would look like when comparing training results with results on new data.


**Answer:** Suggested rubric (no automatic answer key)

A model fits training data very well but performs noticeably worse on new data. One clear comparison is sufficient.

**Misconception:** Judging a model only by its training fit.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L04-O02 · Optional · Optional / basic extension

**Placement:** [After “A confidence interval expresses coefficient precision”](../10_Regression_Part_2/index.html#/interval) · [Handout](../10_Regression_Part_2/handout.html#chapter-interval)  
**Time:** 90 seconds, including debrief.

Two confidence intervals for the same slope are computed using the same confidence level. What does the wider interval communicate?

- **A.** Greater precision about the slope.
- **B.** Proof that the slope causes the outcome.
- **C.** Less precision about the slope.
- **D.** A guarantee that every future observation lies in the interval.

**Answer:** C. Less precision about the slope.

A wider interval expresses more uncertainty about the coefficient. A coefficient interval is not a prediction interval for individual outcomes.

**Misconception:** Confusing interval width with stronger evidence or prediction coverage.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L04-O03 · Optional · Optional / basic extension

**Placement:** [After “Multiple regression adds one coefficient per feature”](../10_Regression_Part_2/index.html#/multiple) · [Handout](../10_Regression_Part_2/handout.html#chapter-multiple)  
**Time:** 90 seconds, including debrief.

A model uses house area and number of rooms to predict price. How does this differ from using area alone?

- **A.** It uses more than one input feature.
- **B.** It no longer predicts a number.
- **C.** It cannot be a regression model.
- **D.** It is guaranteed to make every prediction correctly.

**Answer:** A. It uses more than one input feature.

Multiple regression can include several input features. Adding a feature does not guarantee better prediction on new data.

**Misconception:** Thinking more predictors automatically guarantee a perfect model.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 11 · Classification · Part 1

5 core + 2 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/11_Classification_Part_1.xlsx) · [Optional import](imports/optional/11_Classification_Part_1_optional.xlsx)

### L05-C01 · Core · Opening / everyday intuition

**Placement:** [Before “A class label is not a continuous quantity”](../11_Classification_Part_1/index.html#/classification) · [Handout](../11_Classification_Part_1/handout.html#chapter-classification)  
**Time:** 60 seconds, including debrief.

Which task predicts a category rather than a number?

- **A.** Predicting a house price.
- **B.** Deciding whether an email is spam or not spam.
- **C.** Predicting tomorrow’s temperature.
- **D.** Predicting the duration of a journey.

**Answer:** B. Deciding whether an email is spam or not spam.

Spam/not spam is a category. The other tasks ask for numerical predictions.

**Misconception:** Confusing classification with regression.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-C02 · Core · Prediction / intuition

**Placement:** [Before “Even the ideal classifier can make mistakes”](../11_Classification_Part_1/index.html#/bayes-error) · [Handout](../11_Classification_Part_1/handout.html#chapter-bayes-error)  
**Time:** 60 seconds, including debrief.

A model says an email has a 70% chance of being spam. Can that email still turn out not to be spam?

- **A.** No. Anything above 50% is certain.
- **B.** No. A model’s most likely answer is always correct.
- **C.** Yes. A probability below 100% leaves room for another outcome.
- **D.** Yes, but only if 70% is less than 50%.

**Answer:** C. Yes. A probability below 100% leaves room for another outcome.

A likely outcome is not a certain outcome. Even useful probabilistic predictions can be wrong on individual cases.

**Misconception:** Treating a high probability as a guarantee.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-C03 · Core · Check / core understanding

**Placement:** [After “Reverse the direction with Bayes’ theorem”](../11_Classification_Part_1/index.html#/bayes-theorem) · [Handout](../11_Classification_Part_1/handout.html#chapter-bayes-theorem)  
**Time:** 90 seconds, including debrief.

An email contains a word that is more common in spam than in ordinary mail. What can this word provide?

- **A.** Evidence that can increase the estimated chance of spam.
- **B.** Proof that the email is certainly spam.
- **C.** Proof that the email is certainly ordinary mail.
- **D.** A reason to ignore every other piece of information.

**Answer:** A. Evidence that can increase the estimated chance of spam.

A feature can change a class probability without determining the class with certainty. Its effect depends on the other modeling assumptions.

**Misconception:** Treating one useful clue as conclusive evidence.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L05-C04 · Core · Check / core understanding

**Placement:** [After ““Naive” means independent given the class”](../11_Classification_Part_1/index.html#/independence) · [Handout](../11_Classification_Part_1/handout.html#chapter-independence)  
**Time:** 90 seconds, including debrief.

What simplifying assumption does Naive Bayes make about input features once the class is known?

- **A.** It assumes every feature has exactly the same value.
- **B.** It assumes features contain no information about the class.
- **C.** It treats the features as independent within that class.
- **D.** It assumes every possible class is always equally common.

**Answer:** C. It treats the features as independent within that class.

The “naive” assumption is conditional independence: within a given class, the model combines feature evidence as if the features were independent.

**Misconception:** Confusing conditional independence with identical features or no useful information.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L05-C05 · Core · Prediction / intuition

**Placement:** [Before “Explore a sigmoid and its decision threshold”](../11_Classification_Part_1/index.html#/logistic-lab) · [Handout](../11_Classification_Part_1/handout.html#chapter-logistic-lab)  
**Time:** 90 seconds, including debrief.

A spam filter flags emails when their spam score is at least 0.5. If we lower the cutoff to 0.2 and keep all scores fixed, what can happen?

- **A.** Fewer emails must be flagged as spam.
- **B.** Every email’s score is automatically recalculated.
- **C.** The cutoff can never affect a decision.
- **D.** More emails may be flagged as spam.

**Answer:** D. More emails may be flagged as spam.

A lower cutoff admits scores that previously fell below the threshold. It changes decisions without changing the fitted scores.

**Misconception:** Confusing a decision cutoff with model training.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-O01 · Optional · Optional / basic extension

**Placement:** [After “Change the costs and the best decision changes”](../11_Classification_Part_1/index.html#/decision-lab) · [Handout](../11_Classification_Part_1/handout.html#chapter-decision-lab)  
**Time:** 90 seconds, including debrief.

In a screening task, missing a real problem is much more costly than a false alarm. What tradeoff might we accept?

- **A.** More missed problems just to avoid every false alarm.
- **B.** A guarantee of making neither kind of mistake.
- **C.** Ignoring the different costs of the two errors.
- **D.** More false alarms in order to miss fewer real problems.

**Answer:** D. More false alarms in order to miss fewer real problems.

A decision threshold can reflect unequal error costs. Improving one error rate may worsen another.

**Misconception:** Assuming one threshold is best for every application.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L05-O02 · Optional · Optional / basic extension

**Placement:** [After “One unseen category should not erase a class”](../11_Classification_Part_1/index.html#/smoothing) · [Handout](../11_Classification_Part_1/handout.html#chapter-smoothing)  
**Time:** 90 seconds, including debrief.

Why might Naive Bayes use smoothing for a word that never appeared in one class’s training examples?

- **A.** To avoid treating that unseen word as completely impossible in the class.
- **B.** To guarantee that all future messages are classified correctly.
- **C.** To delete all the other words from the model.
- **D.** To avoid needing any labeled training messages.

**Answer:** A. To avoid treating that unseen word as completely impossible in the class.

A missing observation need not mean a truly impossible event. Smoothing avoids a zero estimate from limited data.

**Misconception:** Equating “not seen in this sample” with “impossible”.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 12 · Classification · Part 2

4 core + 1 optional. Core budget: approximately 5.5 minutes.

[Core import](imports/12_Classification_Part_2.xlsx) · [Optional import](imports/optional/12_Classification_Part_2_optional.xlsx)

### L05-C06 · Core · Prediction / intuition

**Placement:** [Before “Minimize negative log likelihood”](../12_Classification_Part_2/index.html#/log-loss) · [Handout](../12_Classification_Part_2/handout.html#chapter-log-loss)  
**Time:** 60 seconds, including debrief.

The correct label for a training photo is “cat”. Which prediction gives the correct label more probability?

- **A.** Cat: 10%; dog: 90%.
- **B.** Cat: 90%; dog: 10%.
- **C.** Cat: 30%; dog: 70%.
- **D.** Cat: 50%; dog: 50%.

**Answer:** B. Cat: 90%; dog: 10%.

The first prediction gives the observed class the highest probability. Log loss rewards this, while strongly penalizing confident wrong predictions.

**Misconception:** Thinking any confident prediction is good, even when it favors the wrong class.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-C07 · Core · Prediction / intuition

**Placement:** [Before “Move a query and inspect the neighbors that vote”](../12_Classification_Part_2/index.html#/neighbors-lab) · [Handout](../12_Classification_Part_2/handout.html#chapter-neighbors-lab)  
**Time:** 60 seconds, including debrief.

A new point’s three nearest labeled neighbors are two cats and one dog. What does a simple majority vote predict?

- **A.** Dog.
- **B.** A new third category.
- **C.** There is a tie.
- **D.** Cat.

**Answer:** D. Cat.

Two of the three neighbors vote cat, so the majority is cat. This is the basic K-nearest-neighbors rule.

**Misconception:** Ignoring the majority of the selected neighbors.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-C08 · Core · Prediction / intuition

**Placement:** [Before “Select K before revealing the test score”](../12_Classification_Part_2/index.html#/validation-lab) · [Handout](../12_Classification_Part_2/handout.html#chapter-validation-lab)  
**Time:** 90 seconds, including debrief.

You are choosing among several classifiers. Which data should you use to compare choices while keeping a final test fair?

- **A.** The final test set after every change, keeping only the best score.
- **B.** Only the examples each model trained on.
- **C.** A validation set, leaving the final test set unused until the choice is made.
- **D.** The final test answers as extra training features.

**Answer:** C. A validation set, leaving the final test set unused until the choice is made.

Validation supports model selection. Reserving a separate final test avoids choosing a model to fit that test.

**Misconception:** Repeatedly tuning on the final test while still calling it an independent test.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L05-C09 · Core · Exit / one takeaway

**Placement:** [After “Estimate uncertainty. Make a decision. Check it.”](../12_Classification_Part_2/index.html#/summary) · [Handout](../12_Classification_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

A spam filter wrongly blocks an important email. In one sentence, explain why counting only its correct predictions might miss something important.


**Answer:** Suggested rubric (no automatic answer key)

Different mistakes have different consequences. Overall accuracy can hide harmful false alarms or missed spam; accept a clear practical explanation.

**Misconception:** Thinking accuracy alone describes every consequence of a classifier.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L05-O03 · Optional · Optional / basic extension

**Placement:** [After “See a neighbor average become smoother”](../12_Classification_Part_2/index.html#/regression-lab) · [Handout](../12_Classification_Part_2/handout.html#chapter-regression-lab)  
**Time:** 60 seconds, including debrief.

A nearest-neighbor regressor averages two nearby examples with values 2 and 6. What does it predict?

- **A.** 2.
- **B.** 6.
- **C.** 8.
- **D.** 4.

**Answer:** D. 4.

The average is (2+6)/2=4. Neighbor methods can average numeric targets as well as vote on classes.

**Misconception:** Summing neighbors’ values without dividing by their number.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 13 · Classification · Part 3

6 core + 1 optional. Core budget: approximately 8 minutes.

[Core import](imports/13_Classification_Part_3.xlsx) · [Optional import](imports/optional/13_Classification_Part_3_optional.xlsx)

### L06-C01 · Core · Opening / everyday intuition

**Placement:** [Before “Move the threshold and change the logic”](../13_Classification_Part_3/index.html#/threshold-lab) · [Handout](../13_Classification_Part_3/handout.html#chapter-threshold-lab)  
**Time:** 60 seconds, including debrief.

An alarm should activate only when BOTH switches are on. Which input should activate it?

- **A.** Switch 1 on and switch 2 on.
- **B.** Switch 1 on and switch 2 off.
- **C.** Switch 1 off and switch 2 on.
- **D.** Both switches off.

**Answer:** A. Switch 1 on and switch 2 on.

Both conditions must hold. This is the AND rule that the threshold-unit demonstration will represent.

**Misconception:** Confusing “both” with “at least one”.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C02 · Core · Check / core understanding

**Placement:** [After “The score moves by a squared input length”](../13_Classification_Part_3/index.html#/update-intuition) · [Handout](../13_Classification_Part_3/handout.html#chapter-update-intuition)  
**Time:** 90 seconds, including debrief.

A perceptron predicts the wrong class for a training example. What is the purpose of its weight update?

- **A.** To move its decision rule toward giving this example the correct label.
- **B.** To make its prediction on this example even less correct on purpose.
- **C.** To remove every other training example.
- **D.** To prove it will now classify every possible example correctly.

**Answer:** A. To move its decision rule toward giving this example the correct label.

The update uses the error as feedback. Fixing one mistake does not guarantee that every other example is now correct.

**Misconception:** Expecting one update to solve the entire classification problem.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L06-C03 · Core · Prediction / intuition

**Placement:** [Before “Step through the perceptron’s learning process”](../13_Classification_Part_3/index.html#/training-lab) · [Handout](../13_Classification_Part_3/handout.html#chapter-training-lab)  
**Time:** 60 seconds, including debrief.

A classifier gets one training example right. Is that enough to know it gets every training example right?

- **A.** Yes. One correct example proves the whole dataset is correct.
- **B.** No. The other examples must also be checked.
- **C.** Yes, if that example was shown first.
- **D.** No, because no classifier can ever get more than one example right.

**Answer:** B. No. The other examples must also be checked.

One success is evidence only about that example. Checking a whole training pass is different from checking one case.

**Misconception:** Generalizing correctness from a single example.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C04 · Core · Prediction / intuition

**Placement:** [Before “XOR exposes the limit of one linear separator”](../13_Classification_Part_3/index.html#/xor-lab) · [Handout](../13_Classification_Part_3/handout.html#chapter-xor-lab)  
**Time:** 90 seconds, including debrief.

Two classes are arranged so that no straight line can separate them. What kind of change could help?

- **A.** Draw the same straight line in a different color.
- **B.** Use a model that can make a curved or more complex boundary.
- **C.** Repeat the same straight-line attempt and assume geometry will change.
- **D.** Rename the two classes without moving any points.

**Answer:** B. Use a model that can make a curved or more complex boundary.

If the boundary shape is too limited, we need a richer representation or model. More repetitions alone do not remove that limitation.

**Misconception:** Trying to solve a model-capacity problem solely by training longer.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C05 · Core · Prediction / intuition

**Placement:** [Before “Normalize the score by the length of w”](../13_Classification_Part_3/index.html#/distance) · [Handout](../13_Classification_Part_3/handout.html#chapter-distance)  
**Time:** 90 seconds, including debrief.

A point lies very close to a classifier’s dividing line. What could a small change to that point’s measured features do?

- **A.** Guarantee that its class prediction stays the same.
- **B.** Remove the need for a dividing line.
- **C.** Move it across the line and change its predicted class.
- **D.** Force every other point to change class too.

**Answer:** C. Move it across the line and change its predicted class.

A nearby point can cross the boundary after a small change. Distance to the boundary helps describe this geometric sensitivity.

**Misconception:** Assuming all predictions are equally stable to small input changes.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C06 · Core · Check / core understanding

**Placement:** [After “Slack variables make room for violations”](../13_Classification_Part_3/index.html#/soft-margin) · [Handout](../13_Classification_Part_3/handout.html#chapter-soft-margin)  
**Time:** 90 seconds, including debrief.

Why does a soft-margin SVM allow some training points to violate the margin?

- **A.** Its goal is to misclassify every point.
- **B.** Real data may overlap or contain noise, so a perfect separation can be too rigid.
- **C.** It ignores all training labels.
- **D.** Allowing a violation guarantees perfect predictions on future data.

**Answer:** B. Real data may overlap or contain noise, so a perfect separation can be too rigid.

Soft margins balance a wide separation with penalties for violations, making the model usable when perfect separation is unsuitable.

**Misconception:** Thinking a useful classifier must enforce perfect separation at any cost.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L06-O01 · Optional · Optional / basic extension

**Placement:** [After “A margin violation need not be a wrong label”](../13_Classification_Part_3/index.html#/hinge) · [Handout](../13_Classification_Part_3/handout.html#chapter-hinge)  
**Time:** 90 seconds, including debrief.

For an SVM, can a correctly classified point still lie too close to the boundary to satisfy the desired margin?

- **A.** Yes. A point can be on the correct side but still inside the margin.
- **B.** No. Every correct prediction must be far from the boundary.
- **C.** No. Only misclassified points have a distance to the boundary.
- **D.** Yes, but only when the model has no features.

**Answer:** A. Yes. A point can be on the correct side but still inside the margin.

Correct classification and satisfying the margin are different conditions. Hinge loss can penalize a correct point inside the margin.

**Misconception:** Confusing a correct label with a sufficiently large margin.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 14 · Classification · Part 4

3 core + 2 optional. Core budget: approximately 5 minutes.

[Core import](imports/14_Classification_Part_4.xlsx) · [Optional import](imports/optional/14_Classification_Part_4_optional.xlsx)

### L06-C07 · Core · Prediction / intuition

**Placement:** [Before “Rotate the original data in the lifted space”](../14_Classification_Part_4/index.html#/lift-lab) · [Handout](../14_Classification_Part_4/handout.html#chapter-lift-lab)  
**Time:** 90 seconds, including debrief.

Points near the center belong to one class; points in a surrounding ring belong to another. Which extra feature could help describe this pattern?

- **A.** The order in which the points were typed into the file.
- **B.** Distance from the center.
- **C.** A random name assigned to each point.
- **D.** The color used to draw the page background.

**Answer:** B. Distance from the center.

Distance from the center captures a useful distinction that a single straight boundary in the original plane misses.

**Misconception:** Thinking new features cannot make a difficult pattern easier to separate.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C08 · Core · Prediction / intuition

**Placement:** [Before “Check the quadratic kernel identity numerically”](../14_Classification_Part_4/index.html#/kernel-lab) · [Handout](../14_Classification_Part_4/handout.html#chapter-kernel-lab)  
**Time:** 90 seconds, including debrief.

What is the main benefit of a kernel in the SVM examples?

- **A.** It guarantees that no training data are needed.
- **B.** It guarantees that every training fit will work on new data.
- **C.** It helps the model represent more complex boundaries through suitable similarity calculations.
- **D.** It turns every class label into a measured distance.

**Answer:** C. It helps the model represent more complex boundaries through suitable similarity calculations.

A kernel can compute similarities corresponding to a richer feature representation. This can support nonlinear boundaries without explicitly listing all those features.

**Misconception:** Treating kernels as a guarantee of correctness rather than a modeling tool.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L06-C09 · Core · Exit / one takeaway

**Placement:** [After “Learn the line. Choose the margin. Change the space.”](../14_Classification_Part_4/index.html#/summary) · [Handout](../14_Classification_Part_4/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

An SVM gets every training example right. What would you check before trusting it on new examples?


**Answer:** Suggested rubric (no automatic answer key)

Evaluate on suitable held-out data. Accept a short answer about checking new cases rather than relying only on training success.

**Misconception:** Equating a perfect training score with reliable generalization.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L06-O02 · Optional · Optional / basic extension

**Placement:** [After “Only pairwise inner products remain”](../14_Classification_Part_4/index.html#/dual) · [Handout](../14_Classification_Part_4/handout.html#chapter-dual)  
**Time:** 90 seconds, including debrief.

Why are support vectors important in an SVM?

- **A.** They are new test points that supply the correct answer.
- **B.** They are arbitrary names assigned to the classes.
- **C.** They are training points that help determine the fitted boundary.
- **D.** They are the axes used to draw every plot.

**Answer:** C. They are training points that help determine the fitted boundary.

Support vectors are the training observations with a role in determining the separator; other points can have zero weight in its representation.

**Misconception:** Confusing support vectors with new predictions or plotting axes.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L06-O03 · Optional · Optional / basic extension

**Placement:** [After “The Gram matrix must be positive semidefinite”](../14_Classification_Part_4/index.html#/valid-kernel) · [Handout](../14_Classification_Part_4/handout.html#chapter-valid-kernel)  
**Time:** 90 seconds, including debrief.

Why should we compare a flexible kernel model with a simpler model on validation data?

- **A.** Extra flexibility can fit training details that do not help on new cases.
- **B.** A more flexible model is always better on every dataset.
- **C.** Validation removes the need to train either model.
- **D.** A simpler model cannot make any correct predictions.

**Answer:** A. Extra flexibility can fit training details that do not help on new cases.

Flexibility may help or may overfit. Validation provides evidence for choosing a useful level of complexity.

**Misconception:** Assuming greater complexity automatically improves prediction.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 15 · Clustering and principal components · Part 1

6 core + 1 optional. Core budget: approximately 8.5 minutes.

[Core import](imports/15_Clustering_Part_1.xlsx) · [Optional import](imports/optional/15_Clustering_Part_1_optional.xlsx)

### L07-C01 · Core · Opening / everyday intuition

**Placement:** [Before “The labels are no longer supplied”](../15_Clustering_Part_1/index.html#/unlabeled) · [Handout](../15_Clustering_Part_1/handout.html#chapter-unlabeled)  
**Time:** 90 seconds, including debrief.

You have a folder of unlabeled photos and want to group similar ones. Which information is missing compared with supervised classification?

- **A.** The photos themselves.
- **B.** Every possible similarity between photos.
- **C.** The correct category label for each training photo.
- **D.** The ability to store photos on a computer.

**Answer:** C. The correct category label for each training photo.

Clustering starts without supplied target categories and proposes groups from the available features.

**Misconception:** Assuming clusters arrive with known correct category labels.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C02 · Core · Prediction / intuition

**Placement:** [Before “Separate assignment from centroid movement”](../15_Clustering_Part_1/index.html#/kmeans-lab) · [Handout](../15_Clustering_Part_1/handout.html#chapter-kmeans-lab)  
**Time:** 60 seconds, including debrief.

Three points lie at positions 0, 2 and 4 on a line. Where is their average position?

- **A.** 2.
- **B.** 0.
- **C.** 4.
- **D.** 6.

**Answer:** A. 2.

Their average is (0+2+4)/3=2. K-means uses this average as the center of an assigned group.

**Misconception:** Confusing the sum or an extreme observation with the average.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C03 · Core · Prediction / intuition

**Placement:** [Before “The objective alone cannot choose K”](../15_Clustering_Part_1/index.html#/choose-k) · [Handout](../15_Clustering_Part_1/handout.html#chapter-choose-k)  
**Time:** 90 seconds, including debrief.

You group 20 photos. If you put each photo in its own group, have you necessarily found a useful summary?

- **A.** Yes. More groups always make a better summary.
- **B.** No. Twenty separate groups may tell us little about shared patterns.
- **C.** Yes. One-photo groups prove there are exactly 20 natural categories.
- **D.** No. A group is never allowed to contain only one photo.

**Answer:** B. No. Twenty separate groups may tell us little about shared patterns.

Very small groups can fit the data closely without giving a useful summary. This motivates choosing the number of groups carefully.

**Misconception:** Equating a tighter training fit with a more meaningful grouping.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C04 · Core · Prediction / intuition

**Placement:** [Before “Inspect silhouette one observation at a time”](../15_Clustering_Part_1/index.html#/silhouette-lab) · [Handout](../15_Clustering_Part_1/handout.html#chapter-silhouette-lab)  
**Time:** 90 seconds, including debrief.

A point is close to others in its own group and far from other groups. Does it appear well placed?

- **A.** No. A good grouping requires it to be far from its own group.
- **B.** No. Every point must be equally close to all groups.
- **C.** We can conclude its group is certainly a real-world category.
- **D.** Yes. Its own group seems a better geometric match.

**Answer:** D. Yes. Its own group seems a better geometric match.

This is the intuition behind a high silhouette score. A good geometric fit is not proof of a real-world category.

**Misconception:** Confusing geometric separation with certain semantic meaning.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C05 · Core · Prediction / intuition

**Placement:** [Before “Watch EM reshape three Gaussian components”](../15_Clustering_Part_1/index.html#/gmm-lab) · [Handout](../15_Clustering_Part_1/handout.html#chapter-gmm-lab)  
**Time:** 90 seconds, including debrief.

A point sits between two overlapping groups. What could a soft assignment say?

- **A.** The point has some membership probability in each group.
- **B.** The point must belong to neither group because groups overlap.
- **C.** Every point must have exactly the same membership probabilities.
- **D.** The groups must immediately be given known ground-truth labels.

**Answer:** A. The point has some membership probability in each group.

Soft assignments represent uncertainty about membership instead of immediately choosing a single group.

**Misconception:** Thinking every grouping method must make a fully certain assignment.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C06 · Core · Prediction / intuition

**Placement:** [Before “A rising likelihood still needs interpretation”](../15_Clustering_Part_1/index.html#/em-limits) · [Handout](../15_Clustering_Part_1/handout.html#chapter-em-limits)  
**Time:** 90 seconds, including debrief.

A fitting method stops because its result is no longer changing much. Does this prove it found the best possible result?

- **A.** Yes. Stopping always proves a global best solution.
- **B.** No. A different starting point might lead to a better result.
- **C.** Yes. Any unchanged result must match the real-world categories.
- **D.** No. A fitting method is never allowed to stop.

**Answer:** B. No. A different starting point might lead to a better result.

Stability is a stopping signal, not a global-optimality proof. Repeated starts can help assess methods such as EM.

**Misconception:** Confusing convergence with guaranteed global success.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-O01 · Optional · Optional / basic extension

**Placement:** [After “The derivative explains why the mean appears”](../15_Clustering_Part_1/index.html#/update) · [Handout](../15_Clustering_Part_1/handout.html#chapter-update)  
**Time:** 90 seconds, including debrief.

What does a K-means centroid represent?

- **A.** Always the very first point in the file.
- **B.** The number of labels supplied by a teacher.
- **C.** A point that must be outside every cluster.
- **D.** The average location of the points assigned to a nonempty cluster.

**Answer:** D. The average location of the points assigned to a nonempty cluster.

A centroid summarizes an assigned group by its mean position. It need not coincide with an observed point.

**Misconception:** Thinking a centroid must be one of the original data points.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 16 · Clustering and principal components · Part 2

4 core + 2 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/16_Clustering_Part_2.xlsx) · [Optional import](imports/optional/16_Clustering_Part_2_optional.xlsx)

### L07-C07 · Core · Prediction / intuition

**Placement:** [Before “Change the linkage and the merge budget”](../16_Clustering_Part_2/index.html#/hierarchy-lab) · [Handout](../16_Clustering_Part_2/handout.html#chapter-hierarchy-lab)  
**Time:** 90 seconds, including debrief.

A grouping method starts with each point alone and repeatedly joins the closest groups. What does it build?

- **A.** A list of known correct class labels.
- **B.** A hierarchy of groups, from smaller groups to larger ones.
- **C.** A rule that never changes the number of groups.
- **D.** A model that must predict a numeric target.

**Answer:** B. A hierarchy of groups, from smaller groups to larger ones.

Repeated merges form a hierarchy, commonly drawn as a dendrogram. The distance rule affects which merges happen.

**Misconception:** Confusing hierarchical grouping with supervised prediction.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C08 · Core · Prediction / intuition

**Placement:** [Before “Rotate a projection and find the first component”](../16_Clustering_Part_2/index.html#/pca-lab) · [Handout](../16_Clustering_Part_2/handout.html#chapter-pca-lab)  
**Time:** 90 seconds, including debrief.

A cloud of points is stretched along a diagonal. Which line would usually preserve more of its spread when the points are projected onto it?

- **A.** A line following the cloud’s long direction.
- **B.** A line across the cloud’s narrow direction.
- **C.** Any line: the direction never matters.
- **D.** A line chosen only from the points’ row numbers.

**Answer:** A. A line following the cloud’s long direction.

Projecting along the long direction preserves more variation. PCA formalizes this idea for centered data.

**Misconception:** Thinking the direction of projection has no effect on retained variation.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L07-C09 · Core · Check / core understanding

**Placement:** [After “Rescaling does not make a feature Gaussian”](../16_Clustering_Part_2/index.html#/scaling) · [Handout](../16_Clustering_Part_2/handout.html#chapter-scaling)  
**Time:** 90 seconds, including debrief.

Why can feature scaling matter before clustering?

- **A.** Scaling supplies the missing correct class labels.
- **B.** A feature with much larger numerical values can dominate the distance calculation.
- **C.** Scaling guarantees that every group has a real-world meaning.
- **D.** Distances are always unchanged when just one feature is rescaled.

**Answer:** B. A feature with much larger numerical values can dominate the distance calculation.

Distance-based results depend on the relative scales of features. Choose preprocessing to suit the task rather than applying it blindly.

**Misconception:** Assuming units cannot influence a distance-based model.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L07-C10 · Core · Exit / one takeaway

**Placement:** [After “Structure depends on the question you ask”](../16_Clustering_Part_2/index.html#/summary) · [Handout](../16_Clustering_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

In one sentence, explain one reason why a clustering result should be interpreted rather than automatically accepted as the truth.


**Answer:** Suggested rubric (no automatic answer key)

Accept one reason: selected features, scaling, number of groups, distance rule, initialization, or whether groups make sense for the task.

**Misconception:** Treating computed groups as guaranteed natural categories.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L07-O02 · Optional · Optional / basic extension

**Placement:** [After “Keep d directions, then map back approximately”](../16_Clustering_Part_2/index.html#/reconstruct) · [Handout](../16_Clustering_Part_2/handout.html#chapter-reconstruct)  
**Time:** 90 seconds, including debrief.

PCA keeps only a few directions from a dataset with many features. What is a possible tradeoff?

- **A.** Guaranteed perfect reconstruction using any number of directions.
- **B.** New correct class labels are automatically created.
- **C.** Every discarded detail is proved irrelevant to every task.
- **D.** A simpler representation, with some information lost.

**Answer:** D. A simpler representation, with some information lost.

Keeping fewer directions can compress the data, but discarded variation may contain information useful for a particular task.

**Misconception:** Thinking dimensionality reduction is always lossless.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L07-O03 · Optional · Optional / basic extension

**Placement:** [After “A tree makes structure inspectable”](../16_Clustering_Part_2/index.html#/hierarchy-limits) · [Handout](../16_Clustering_Part_2/handout.html#chapter-hierarchy-limits)  
**Time:** 90 seconds, including debrief.

In a clustering tree, two observations join together early, at a small merge distance. What does that suggest under the chosen method?

- **A.** They have been proved to share a known class label.
- **B.** They are necessarily the most different observations.
- **C.** Their row numbers must be consecutive.
- **D.** The method regards them as relatively similar.

**Answer:** D. The method regards them as relatively similar.

Early low-distance merging suggests similarity according to the features and linkage rule, not a guaranteed real-world label.

**Misconception:** Reading a method-dependent grouping as an unquestionable fact.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.
