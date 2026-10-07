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

**Placement:** [Before slide 3: aiml](../01_History_Part_1/index.html#/2) · [Handout](../01_History_Part_1/handout.html#chapter-aiml)  
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

**Placement:** [Before slide 8: Bayes' Theorem](../01_History_Part_1/index.html#/7) · [Handout](../01_History_Part_1/handout.html#chapter-bayes)  
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

**Placement:** [After slide 29: From “thinking” to an observable test](../01_History_Part_1/index.html#/28) · [Handout](../01_History_Part_1/handout.html#chapter-imitation)  
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

**Placement:** [After slide 45: Perceptron · 1957 — Frank Rosenblatt](../01_History_Part_1/index.html#/44) · [Handout](../01_History_Part_1/handout.html#chapter-perceptron)  
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

**Placement:** [After slide 15: From the logistic curve to logistic regression](../01_History_Part_1/index.html#/14) · [Handout](../01_History_Part_1/handout.html#chapter-logreg)  
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

**Placement:** [Before slide 5: Minsky & Papert — “Perceptrons” (1969)](../02_History_Part_2/index.html#/4) · [Handout](../02_History_Part_2/handout.html#chapter-winter1)  
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

**Placement:** [After slide 25: When the learning signal fades](../02_History_Part_2/index.html#/24) · [Handout](../02_History_Part_2/handout.html#chapter-winter2)  
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

**Placement:** [Before slide 45: GPT-3 · 2020 — “Generative Pre-trained Transformer 3”](../02_History_Part_2/index.html#/44) · [Handout](../02_History_Part_2/handout.html#chapter-gpt3)  
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

**Placement:** [After slide 53: A history of interacting ideas and changing expectations](../02_History_Part_2/index.html#/52) · [Handout](../02_History_Part_2/handout.html#chapter-summary)  
**Time:** 150 seconds, including debrief.

Choose two milestones from different eras in this lecture. In two sentences, explain how the later milestone addressed a limitation or opportunity left by the earlier one, and name one limitation that still remained.


**Answer:** Suggested rubric (no automatic answer key)

Accept any accurate cross-era connection supported by the lecture. For example, multilayer networks with backpropagation addressed the representational and training limits of single-layer perceptrons, while vanishing gradients still made deep learning difficult.

**Misconception:** Treating AI history as an isolated list of names rather than a sequence of partial solutions with remaining limitations.

**Facilitation:** Ask for one explicit connection and one remaining limitation. Compare two responses that use different eras and discuss whether the claimed link is causal, conceptual or enabled by new resources.

### L00-O02 · Optional · Optional / synthesis

**Placement:** [After slide 40: The modern turning points](../02_History_Part_2/index.html#/39) · [Handout](../02_History_Part_2/handout.html#chapter-alphago-transformers)  
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

5 core + 1 optional. Core budget: approximately 5.5 minutes.

[Core import](imports/03_Search_Part_1.xlsx) · [Optional import](imports/optional/03_Search_Part_1_optional.xlsx)

### L01-C01 · Core · Opening / everyday intuition

**Placement:** [Before slide 8: A solution path reaches a goal; its cost measures quality](../03_Search_Part_1/index.html#/7) · [Handout](../03_Search_Part_1/handout.html#chapter-paths-costs)  
**Time:** 60 seconds, including debrief.

One route takes two roads of 3 minutes each. Another takes three roads of 1 minute each. Which route is faster?

- **A.** The second route: 3 minutes in total.
- **B.** The first route: fewer roads always means less travel time.
- **C.** Both routes take 3 minutes.
- **D.** The first route: 3 minutes in total.

**Answer:** A. The second route: 3 minutes in total.

Add the travel times: the routes take 6 and 3 minutes. Fewer steps need not mean lower cost.

**Misconception:** Confusing the number of steps with their total cost.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-C02 · Core · Prediction / intuition

**Placement:** [Before slide 21: BFS · watch the queue expand](../03_Search_Part_1/index.html#/20) · [Handout](../03_Search_Part_1/handout.html#chapter-bfs-lab)  
**Time:** 60 seconds, including debrief.

A search uses a waiting line: the first item added is the first served. B is waiting before C. Which is served first?

- **A.** B.
- **B.** C.
- **C.** The item with the longest name.
- **D.** Both must be served at once.

**Answer:** A. B.

A first-in, first-out queue serves B first. Connect this familiar waiting-line rule to breadth-first search.

**Misconception:** Confusing a queue with a last-in, first-out stack.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-C03 · Core · Prediction / intuition

**Placement:** [Before slide 24: DFS · follow the stack](../03_Search_Part_1/index.html#/23) · [Handout](../03_Search_Part_1/handout.html#chapter-dfs-lab)  
**Time:** 60 seconds, including debrief.

You put book B on a pile, then put book C on top. If you remove the top book first, which comes out first?

- **A.** B.
- **B.** Whichever book was cheaper.
- **C.** Both books must come out at once.
- **D.** C.

**Answer:** D. C.

The last book added is the first removed. A stack uses this rule, as depth-first search does.

**Misconception:** Mixing up stack and queue order.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-C04 · Core · Check / core understanding

**Placement:** [After slide 33: Repeated work can be a reasonable price](../03_Search_Part_1/index.html#/32) · [Handout](../03_Search_Part_1/handout.html#chapter-ids-overhead)  
**Time:** 90 seconds, including debrief.

How does iterative deepening search work?

- **A.** It searches only the start state and then stops.
- **B.** It stores every possible path before starting.
- **C.** It repeats depth-limited search, gradually allowing greater depth.
- **D.** It chooses roads only by their names.

**Answer:** C. It repeats depth-limited search, gradually allowing greater depth.

It first searches shallowly, then increases the depth limit. Repeating some work allows it to use little memory.

**Misconception:** Thinking the depth limit stays fixed throughout iterative deepening.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L01-C05 · Core · Prediction / intuition

**Placement:** [Before slide 36: Lowest-cost-first · compare cumulative costs](../03_Search_Part_1/index.html#/35) · [Handout](../03_Search_Part_1/handout.html#chapter-ucs-lab)  
**Time:** 60 seconds, including debrief.

You found a route to the destination that costs 10. Another route has cost 2 so far and needs one final step costing 1. Which is cheaper?

- **A.** The first route, because it was found first.
- **B.** The second route, with total cost 2.
- **C.** The second route, with total cost 3.
- **D.** Both routes cost 10.

**Answer:** C. The second route, with total cost 3.

The second complete route costs 2+1=3. Finding a destination once does not prove you found the cheapest route.

**Misconception:** Stopping at the first discovered route without comparing costs.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-O02 · Optional · Optional / basic extension

**Placement:** [After slide 12: A search tree can repeat a graph state](../03_Search_Part_1/index.html#/11) · [Handout](../03_Search_Part_1/handout.html#chapter-graph-versus-tree)  
**Time:** 60 seconds, including debrief.

A robot can move A → B → A. If it never checks where it has already been, what problem could occur?

- **A.** It must reach every goal immediately.
- **B.** The two locations automatically become one location.
- **C.** It could keep going around the same loop.
- **D.** The robot can never return to A.

**Answer:** C. It could keep going around the same loop.

Repeatedly following a cycle can waste work or continue indefinitely. This motivates checking repeated states.

**Misconception:** Assuming a small map cannot lead to repeated search work.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 04 · Search algorithms · Part 2

4 core + 2 optional. Core budget: approximately 5.5 minutes.

[Core import](imports/04_Search_Part_2.xlsx) · [Optional import](imports/optional/04_Search_Part_2_optional.xlsx)

### L01-C06 · Core · Prediction / intuition

**Placement:** [Before slide 14: The first A* decision](../04_Search_Part_2/index.html#/13) · [Handout](../04_Search_Part_2/handout.html#chapter-astar-scores)  
**Time:** 60 seconds, including debrief.

A journey has cost 4 so far. You estimate that the remaining journey will cost 3. What is your estimate of the total cost?

- **A.** 1.
- **B.** 3.
- **C.** 7.
- **D.** 4.

**Answer:** C. 7.

Add cost so far and estimated cost still to come: 4+3=7. This introduces the scoring idea used by A*.

**Misconception:** Considering only the remaining cost or only the cost already paid.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-C07 · Core · Check / core understanding

**Placement:** [After slide 22: Graph search must keep better routes alive](../04_Search_Part_2/index.html#/21) · [Handout](../04_Search_Part_2/handout.html#chapter-graph-cautions)  
**Time:** 90 seconds, including debrief.

A search finds a cheaper route to a place it has already reached. What information should it keep?

- **A.** Only the first route, even when it is more expensive.
- **B.** Only the name of the place, with no cost information.
- **C.** A claim that no route to this place exists.
- **D.** The new, lower cost and the route that achieves it.

**Answer:** D. The new, lower cost and the route that achieves it.

Keeping the best known route avoids throwing away useful improvements. Some search methods must also revisit the state.

**Misconception:** Thinking that reaching a state once settles its best cost forever.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L01-C08 · Core · Prediction / intuition

**Placement:** [Before slide 28: Branch-and-bound · watch the incumbent improve](../04_Search_Part_2/index.html#/27) · [Handout](../04_Search_Part_2/handout.html#chapter-branch-bound-lab)  
**Time:** 60 seconds, including debrief.

Your best complete route costs 6. Another route already costs 8, and every extra step adds a nonnegative cost. Can it beat your best route?

- **A.** Yes. Taking more steps always makes a route cheaper.
- **B.** Yes. An unfinished route always beats a finished one.
- **C.** No. Continuing cannot bring its total below 6.
- **D.** There is not enough information, even with the stated cost rule.

**Answer:** C. No. Continuing cannot bring its total below 6.

Its final cost will be at least 8, so it cannot improve on 6. This is the intuition behind pruning unpromising branches.

**Misconception:** Thinking every unfinished route must be explored to completion.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L01-C09 · Core · Exit / one takeaway

**Placement:** [After slide 35: Search is controlled exploration](../04_Search_Part_2/index.html#/34) · [Handout](../04_Search_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

In one sentence, explain the main difference between breadth-first and depth-first search.


**Answer:** Suggested rubric (no automatic answer key)

Breadth-first explores one depth level before the next; depth-first follows a branch deeper before returning. Either everyday wording is acceptable.

**Misconception:** Treating all search algorithms as using the same exploration order.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L01-O01 · Optional · Optional / basic extension

**Placement:** [After slide 17: Admissible means “never overestimate”](../04_Search_Part_2/index.html#/16) · [Handout](../04_Search_Part_2/handout.html#chapter-admissibility)  
**Time:** 60 seconds, including debrief.

An estimate must never be greater than the true remaining cost. The true cost is 5. Which estimate breaks this rule?

- **A.** 0.
- **B.** 3.
- **C.** 5.
- **D.** 7.

**Answer:** D. 7.

Seven exceeds five. A heuristic that never overestimates is called admissible.

**Misconception:** Confusing an optimistic estimate with an overestimate.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L01-O03 · Optional · Optional / basic extension

**Placement:** [After slide 20: Consistency checks each edge](../04_Search_Part_2/index.html#/19) · [Handout](../04_Search_Part_2/handout.html#chapter-consistency)  
**Time:** 90 seconds, including debrief.

Why can an estimate of the remaining distance help a search algorithm?

- **A.** It removes the need for a destination.
- **B.** Every estimate guarantees the shortest route.
- **C.** It replaces the map with a list of correct answers.
- **D.** It can help the algorithm choose promising places to explore first.

**Answer:** D. It can help the algorithm choose promising places to explore first.

A heuristic guides the order of exploration. Whether a method guarantees the cheapest route depends on additional conditions.

**Misconception:** Thinking a helpful estimate is automatically an exact answer.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 05 · Constraint satisfaction · Part 1

4 core + 2 optional. Core budget: approximately 5 minutes.

[Core import](imports/05_Constraints_Part_1.xlsx) · [Optional import](imports/optional/05_Constraints_Part_1_optional.xlsx)

### L02-C01 · Core · Opening / everyday intuition

**Placement:** [Before slide 7: A CSP is variables, domains and constraints](../05_Constraints_Part_1/index.html#/6) · [Handout](../05_Constraints_Part_1/handout.html#chapter-definition)  
**Time:** 60 seconds, including debrief.

Two exams must use different rooms. Each can use room 1 or room 2. Which room assignment is allowed?

- **A.** Both exams in room 1.
- **B.** Both exams in room 2.
- **C.** Exam A in room 1; exam B in room 2.
- **D.** Exam A in room 3; exam B in room 1.

**Answer:** C. Exam A in room 1; exam B in room 2.

The assignment must use available rooms and satisfy the different-room rule.

**Misconception:** Checking one rule but forgetting another.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-C02 · Core · Prediction / intuition

**Placement:** [Before slide 12: DFS solver · inspect the assignment tree](../05_Constraints_Part_1/index.html#/11) · [Handout](../05_Constraints_Part_1/handout.html#chapter-dfs-lab)  
**Time:** 90 seconds, including debrief.

While making a timetable, you put two classes in the same room at the same time. What is a sensible next step?

- **A.** Undo one of those choices and try another.
- **B.** Keep the clash and assume a later choice will remove it.
- **C.** Conclude that no timetable could ever work.
- **D.** Stop checking room conflicts for the remaining classes.

**Answer:** A. Undo one of those choices and try another.

Backtracking revises a choice when it creates a conflict. One failed choice does not prove that all choices fail.

**Misconception:** Confusing a failed partial attempt with an impossible problem.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-C03 · Core · Prediction / intuition

**Placement:** [Before slide 18: GAC · prune values and update the worklist](../05_Constraints_Part_1/index.html#/17) · [Handout](../05_Constraints_Part_1/handout.html#chapter-gac-lab)  
**Time:** 60 seconds, including debrief.

A task must finish before 3 pm. Its possible finish times are 1 pm, 2 pm and 3 pm. Which time can you rule out?

- **A.** 1 pm.
- **B.** 3 pm.
- **C.** 2 pm.
- **D.** None of them.

**Answer:** B. 3 pm.

Finishing at 3 pm is not finishing before 3 pm. Removing a forbidden option leaves fewer choices to search.

**Misconception:** Failing to remove a value that cannot satisfy a rule.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-C04 · Core · Prediction / intuition

**Placement:** [Before slide 21: Local support does not imply global agreement](../05_Constraints_Part_1/index.html#/20) · [Handout](../05_Constraints_Part_1/handout.html#chapter-consistent-unsat)  
**Time:** 90 seconds, including debrief.

Three exams must all use different rooms, but only two rooms are available. Can you assign a room to every exam?

- **A.** Yes, by putting all three exams in room 1.
- **B.** Yes, because each pair of exams could fit in two rooms when considered alone.
- **C.** No. Three different rooms would be needed.
- **D.** Yes, as long as the rooms have different names.

**Answer:** C. No. Three different rooms would be needed.

Checking pairs separately does not guarantee a solution to the whole problem. Three mutually different choices need at least three options.

**Misconception:** Assuming that local checks guarantee a complete solution.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-O01 · Optional · Optional / basic extension

**Placement:** [After slide 13: Good ordering exposes contradictions sooner](../05_Constraints_Part_1/index.html#/12) · [Handout](../05_Constraints_Part_1/handout.html#chapter-ordering)  
**Time:** 60 seconds, including debrief.

One unassigned exam has 2 possible time slots; another has 5. Which does the “fewest remaining choices first” rule select?

- **A.** The exam with 5 possible time slots.
- **B.** The exam with 2 possible time slots.
- **C.** Always the exam with the longer name.
- **D.** It cannot choose unless both have the same number of options.

**Answer:** B. The exam with 2 possible time slots.

The most constrained choice is tackled first, which can reveal conflicts early.

**Misconception:** Reversing the fewest-remaining-choices rule.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L02-O02 · Optional · Optional / basic extension

**Placement:** [After slide 19: A changed domain can invalidate old support](../05_Constraints_Part_1/index.html#/18) · [Handout](../05_Constraints_Part_1/handout.html#chapter-requeue)  
**Time:** 90 seconds, including debrief.

A class loses one of its possible time slots. Should you recheck related room and teacher rules?

- **A.** No. A rule can only be checked once.
- **B.** No. Removing an option can never affect another class.
- **C.** Yes. Fewer options for one class can affect the options for others.
- **D.** Yes, because removing a slot adds every previously rejected slot back.

**Answer:** C. Yes. Fewer options for one class can affect the options for others.

Constraints connect choices. A reduction in one set of options may trigger reductions elsewhere.

**Misconception:** Thinking constraints can always be checked independently once.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 06 · Constraint satisfaction · Part 2

4 core + 1 optional. Core budget: approximately 6 minutes.

[Core import](imports/06_Constraints_Part_2.xlsx) · [Optional import](imports/optional/06_Constraints_Part_2_optional.xlsx)

### L02-C05 · Core · Prediction / intuition

**Placement:** [Before slide 4: Domain splitting · turn pruning into a solver](../06_Constraints_Part_2/index.html#/3) · [Handout](../06_Constraints_Part_2/handout.html#chapter-split-lab)  
**Time:** 60 seconds, including debrief.

You must try all four choices 1, 2, 3 and 4. Which split covers every choice exactly once?

- **A.** Try {1,2} in one branch and {3,4} in the other.
- **B.** Try {1,2} and {2,3}.
- **C.** Try {1} and {2}.
- **D.** Try {1,2,3} and {3,4}.

**Answer:** A. Try {1,2} in one branch and {3,4} in the other.

The first split includes all four choices, with no overlap. This lets two branches cover the original possibilities.

**Misconception:** Missing or unnecessarily repeating choices when splitting a search.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-C06 · Core · Check / core understanding

**Placement:** [After slide 5: Start complete. Repair what is wrong.](../06_Constraints_Part_2/index.html#/4) · [Handout](../06_Constraints_Part_2/handout.html#chapter-local-intro)  
**Time:** 90 seconds, including debrief.

In local search for a timetable, what might the starting timetable look like?

- **A.** Only a timetable already proved to have no clashes.
- **B.** A complete timetable with some clashes that we try to repair.
- **C.** A list of every possible correct timetable.
- **D.** A proof that making a timetable is impossible.

**Answer:** B. A complete timetable with some clashes that we try to repair.

Local search often starts with a complete but imperfect assignment and changes parts of it to reduce conflicts.

**Misconception:** Thinking every search method builds only conflict-free partial assignments.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L02-C07 · Core · Prediction / intuition

**Placement:** [Before slide 13: Annealing · temperature changes the decision](../06_Constraints_Part_2/index.html#/12) · [Handout](../06_Constraints_Part_2/handout.html#chapter-anneal-lab)  
**Time:** 90 seconds, including debrief.

You are rearranging a timetable and seem stuck. Why might you briefly accept a change that adds a clash?

- **A.** It guarantees the very next change solves everything.
- **B.** It proves the current timetable is already the best possible one.
- **C.** Adding a clash is the final goal of timetable construction.
- **D.** It might let you reach a better arrangement after later changes.

**Answer:** D. It might let you reach a better arrangement after later changes.

A temporarily worse move can help escape a stuck arrangement, but does not guarantee success. Simulated annealing uses this idea.

**Misconception:** Thinking every useful search step must immediately improve the score.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L02-C08 · Core · Exit / one takeaway

**Placement:** [After slide 18: Represent, prune, branch — or repair](../06_Constraints_Part_2/index.html#/17) · [Handout](../06_Constraints_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

Your timetable search runs out of time without finding a solution. Does that prove no valid timetable exists? Briefly explain.


**Answer:** Suggested rubric (no automatic answer key)

No. This attempt may simply not have found one. A timeout without a complete impossibility proof is not proof that no solution exists.

**Misconception:** Confusing “not found” with “does not exist”.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L02-O03 · Optional · Optional / basic extension

**Placement:** [After slide 14: Cooling shifts the balance toward improvement](../06_Constraints_Part_2/index.html#/13) · [Handout](../06_Constraints_Part_2/handout.html#chapter-cooling)  
**Time:** 90 seconds, including debrief.

Why might you restart a local search from a different initial timetable?

- **A.** Every restart guarantees a valid timetable.
- **B.** A different starting point may lead to a better result.
- **C.** The rules of the problem stop applying after a restart.
- **D.** All starting points must produce the same sequence of changes.

**Answer:** B. A different starting point may lead to a better result.

Local search can depend on its starting point. Restarts offer another attempt, not a guarantee.

**Misconception:** Assuming all local searches reach the same result.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 07 · Introduction to machine learning · Part 1

4 core + 1 optional. Core budget: approximately 5.5 minutes.

[Core import](imports/07_Intro_ML_Part_1.xlsx) · [Optional import](imports/optional/07_Intro_ML_Part_1_optional.xlsx)

### L03-C01 · Core · Opening / everyday intuition

**Placement:** [Before slide 4: Training changes the model; inference uses it](../07_Intro_ML_Part_1/index.html#/3) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-training-inference)  
**Time:** 90 seconds, including debrief.

An app is shown many photos marked “cat” or “dog”. It then labels a new photo. Which part is learning from examples?

- **A.** Displaying the app’s logo.
- **B.** Saving the new photo’s file name.
- **C.** Simply opening the app on a phone.
- **D.** Using the marked photos to adjust how it recognizes cats and dogs.

**Answer:** D. Using the marked photos to adjust how it recognizes cats and dogs.

Training uses examples to adjust a model. Applying the trained model to the new photo is prediction, or inference.

**Misconception:** Confusing the learning stage with every action performed by the app.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L03-C02 · Core · Prediction / intuition

**Placement:** [Before slide 9: Identify the signal, then reveal the reasoning](../07_Intro_ML_Part_1/index.html#/8) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-signal-lab)  
**Time:** 90 seconds, including debrief.

You want to teach a computer to tell cats from dogs using examples. Which training collection gives it the most useful feedback?

- **A.** Photos paired only with random file names.
- **B.** Photos paired with the correct “cat” or “dog” label.
- **C.** A list of camera prices with no animal photos.
- **D.** Only the words “cat” and “dog”, with no examples.

**Answer:** B. Photos paired with the correct “cat” or “dog” label.

The correct labels tell the model which answer to learn for each example. This introduces supervised learning.

**Misconception:** Overlooking the role of correct example labels.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L03-C03 · Core · Prediction / intuition

**Placement:** [Before slide 11: Build a self-supervised training pair](../07_Intro_ML_Part_1/index.html#/10) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-mask-lab)  
**Time:** 60 seconds, including debrief.

We hide one word from an existing sentence and ask a model to guess it. Where can we find the correct answer?

- **A.** In the original sentence before the word was hidden.
- **B.** Only by asking someone to write an entirely new sentence.
- **C.** In the model’s guess, which must always be right.
- **D.** Nowhere: hiding a word removes all possibility of checking it.

**Answer:** A. In the original sentence before the word was hidden.

The original text supplies its own training target. This is an example of self-supervised learning.

**Misconception:** Thinking every training target must be a newly written human label.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L03-C04 · Core · Prediction / intuition

**Placement:** [Before slide 15: Explore or exploit? Try three uncertain actions](../07_Intro_ML_Part_1/index.html#/14) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-bandit-lab)  
**Time:** 90 seconds, including debrief.

You usually choose a restaurant you like. Why might you try a new one?

- **A.** Because a new restaurant is guaranteed to be better.
- **B.** To learn whether it might be even better.
- **C.** Because trying something new guarantees a good meal.
- **D.** Because previous experience tells you exactly how every new restaurant tastes.

**Answer:** B. To learn whether it might be even better.

Trying an unfamiliar option gives information. Exploration trades some immediate certainty for the chance to discover a better option.

**Misconception:** Expecting exploration to guarantee an immediate improvement.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L03-O01 · Optional · Optional / basic extension

**Placement:** [After slide 12: Use the labeled and unlabeled parts together](../07_Intro_ML_Part_1/index.html#/11) · [Handout](../07_Intro_ML_Part_1/handout.html#chapter-semi-supervised)  
**Time:** 90 seconds, including debrief.

A training collection has a few labeled photos and many unlabeled photos. Learning from both is called what?

- **A.** Semi-supervised learning.
- **B.** Testing only.
- **C.** Reinforcement learning because every photo gives a reward.
- **D.** Supervised learning that ignores all unlabeled photos.

**Answer:** A. Semi-supervised learning.

Semi-supervised methods combine labeled and unlabeled examples during training.

**Misconception:** Thinking unlabeled examples can never contribute to learning.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 08 · Introduction to machine learning · Part 2

3 core + 2 optional. Core budget: approximately 4.5 minutes.

[Core import](imports/08_Intro_ML_Part_2.xlsx) · [Optional import](imports/optional/08_Intro_ML_Part_2_optional.xlsx)

### L03-C05 · Core · Check / core understanding

**Placement:** [After slide 7: Rows are observations; columns are features](../08_Intro_ML_Part_2/index.html#/6) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-matrix)  
**Time:** 60 seconds, including debrief.

A table has one row per house and columns for area, number of rooms and price. Which column is the target when predicting price?

- **A.** Area.
- **B.** Price.
- **C.** Number of rooms.
- **D.** The row number.

**Answer:** B. Price.

The target is what we want to predict. Area and room count are possible input features.

**Misconception:** Mixing up input features and the prediction target.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L03-C06 · Core · Prediction / intuition

**Placement:** [Before slide 16: Evaluation must match the intended use](../08_Intro_ML_Part_2/index.html#/15) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-leakage)  
**Time:** 90 seconds, including debrief.

You want a fair test of whether a student can solve new exercises. Which set should you use for the test?

- **A.** Only the exercises they have memorized.
- **B.** The practice sheet with the answers printed next to each question.
- **C.** Whichever practice exercises gave the highest score.
- **D.** Exercises the student has not already practiced or used to choose a strategy.

**Answer:** D. Exercises the student has not already practiced or used to choose a strategy.

A fresh test checks transfer beyond practice. Similarly, model evaluation needs data kept separate from training and model selection.

**Misconception:** Using familiar practice cases as if they were an independent final test.

**Facilitation:** Invite a guess before teaching the idea. Ask one student for their reasoning, then use the next explanation or demonstration to revisit the answer. Do not grade prior knowledge.

### L03-C07 · Core · Exit / one takeaway

**Placement:** [After slide 19: Define the task before choosing the algorithm](../08_Intro_ML_Part_2/index.html#/18) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

Why do we test a machine-learning model on examples it did not learn from? Answer in one sentence.


**Answer:** Suggested rubric (no automatic answer key)

To check whether it works on new cases rather than only on remembered training cases. Accept equivalent plain-language answers.

**Misconception:** Treating a good training score as sufficient evidence of future performance.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L03-O02 · Optional · Optional / basic extension

**Placement:** [After slide 9: A model family contains many possible functions](../08_Intro_ML_Part_2/index.html#/8) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-hypotheses)  
**Time:** 90 seconds, including debrief.

Which is a setting you choose before fitting a polynomial model, rather than a coefficient learned during fitting?

- **A.** The fitted intercept.
- **B.** The fitted coefficient of x.
- **C.** The fitted coefficient of x squared.
- **D.** The polynomial degree: for example, choosing a line or a quadratic curve.

**Answer:** D. The polynomial degree: for example, choosing a line or a quadratic curve.

The degree is a model setting, or hyperparameter. Fitting then estimates the coefficients for that choice.

**Misconception:** Treating a chosen model setting and a learned coefficient as the same thing.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

### L03-O03 · Optional · Optional / basic extension

**Placement:** [After slide 13: Generalization is performance on new cases](../08_Intro_ML_Part_2/index.html#/12) · [Handout](../08_Intro_ML_Part_2/handout.html#chapter-generalization)  
**Time:** 90 seconds, including debrief.

You want to predict next month’s sales. Which test best resembles that use?

- **A.** Learn from next month’s actual sales before predicting them.
- **B.** Learn from earlier months and test on a later month.
- **C.** Report only how well the model fits its training months.
- **D.** Include the answer for each test month among its inputs.

**Answer:** B. Learn from earlier months and test on a later month.

Testing later observations after training on earlier ones resembles forecasting and avoids using future answers.

**Misconception:** Letting future information enter a forecasting evaluation.

**Facilitation:** Give students a moment to answer, then explain the correct choice in everyday language and address the misconception.

## 09 · Regression · Part 1

5 core + 1 optional. Core budget: approximately 6.5 minutes.

[Core import](imports/09_Regression_Part_1.xlsx) · [Optional import](imports/optional/09_Regression_Part_1_optional.xlsx)

### L04-C01 · Core · Opening / everyday intuition

**Placement:** [Before slide 5: Move the line and watch the residuals change](../09_Regression_Part_1/index.html#/4) · [Handout](../09_Regression_Part_1/handout.html#chapter-residual-lab)  
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

**Placement:** [Before slide 9: Compare the supplied line with a fresh OLS fit](../09_Regression_Part_1/index.html#/8) · [Handout](../09_Regression_Part_1/handout.html#chapter-fit-lab)  
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

**Placement:** [After slide 12: R² compares squared error to a baseline](../09_Regression_Part_1/index.html#/11) · [Handout](../09_Regression_Part_1/handout.html#chapter-r2)  
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

**Placement:** [Before slide 15: Curved in x can still be linear in the parameters](../09_Regression_Part_1/index.html#/14) · [Handout](../09_Regression_Part_1/handout.html#chapter-polynomial)  
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

**Placement:** [Before slide 20: Explore the original high-degree curves](../09_Regression_Part_1/index.html#/19) · [Handout](../09_Regression_Part_1/handout.html#chapter-overfit-lab)  
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

**Placement:** [After slide 4: Simple linear regression has two parameters](../09_Regression_Part_1/index.html#/3) · [Handout](../09_Regression_Part_1/handout.html#chapter-line)  
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

**Placement:** [After slide 4: Repeat the experiment: how much do fits move?](../10_Regression_Part_2/index.html#/3) · [Handout](../10_Regression_Part_2/handout.html#chapter-bias-lab)  
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

**Placement:** [After slide 11: A p-value is conditional on the null model](../10_Regression_Part_2/index.html#/10) · [Handout](../10_Regression_Part_2/handout.html#chapter-pvalues)  
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

**Placement:** [After slide 17: Adjustment can change the apparent relationship](../10_Regression_Part_2/index.html#/16) · [Handout](../10_Regression_Part_2/handout.html#chapter-adjustment)  
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

**Placement:** [After slide 24: Fit carefully. Evaluate separately. Interpret precisely.](../10_Regression_Part_2/index.html#/23) · [Handout](../10_Regression_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

In one sentence, explain what overfitting would look like when comparing training results with results on new data.


**Answer:** Suggested rubric (no automatic answer key)

A model fits training data very well but performs noticeably worse on new data. One clear comparison is sufficient.

**Misconception:** Judging a model only by its training fit.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L04-O02 · Optional · Optional / basic extension

**Placement:** [After slide 12: A confidence interval expresses coefficient precision](../10_Regression_Part_2/index.html#/11) · [Handout](../10_Regression_Part_2/handout.html#chapter-interval)  
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

**Placement:** [After slide 13: Multiple regression adds one coefficient per feature](../10_Regression_Part_2/index.html#/12) · [Handout](../10_Regression_Part_2/handout.html#chapter-multiple)  
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

**Placement:** [Before slide 4: A class label is not a continuous quantity](../11_Classification_Part_1/index.html#/3) · [Handout](../11_Classification_Part_1/handout.html#chapter-classification)  
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

**Placement:** [Before slide 9: Even the ideal classifier can make mistakes](../11_Classification_Part_1/index.html#/8) · [Handout](../11_Classification_Part_1/handout.html#chapter-bayes-error)  
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

**Placement:** [After slide 13: Reverse the direction with Bayes’ theorem](../11_Classification_Part_1/index.html#/12) · [Handout](../11_Classification_Part_1/handout.html#chapter-bayes-theorem)  
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

**Placement:** [After slide 14: “Naive” means independent given the class](../11_Classification_Part_1/index.html#/13) · [Handout](../11_Classification_Part_1/handout.html#chapter-independence)  
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

**Placement:** [Before slide 22: Explore a sigmoid and its decision threshold](../11_Classification_Part_1/index.html#/21) · [Handout](../11_Classification_Part_1/handout.html#chapter-logistic-lab)  
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

**Placement:** [After slide 10: Change the costs and the best decision changes](../11_Classification_Part_1/index.html#/9) · [Handout](../11_Classification_Part_1/handout.html#chapter-decision-lab)  
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

**Placement:** [After slide 17: One unseen category should not erase a class](../11_Classification_Part_1/index.html#/16) · [Handout](../11_Classification_Part_1/handout.html#chapter-smoothing)  
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

**Placement:** [Before slide 4: Minimize negative log likelihood](../12_Classification_Part_2/index.html#/3) · [Handout](../12_Classification_Part_2/handout.html#chapter-log-loss)  
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

**Placement:** [Before slide 10: Move a query and inspect the neighbors that vote](../12_Classification_Part_2/index.html#/9) · [Handout](../12_Classification_Part_2/handout.html#chapter-neighbors-lab)  
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

**Placement:** [Before slide 18: Select K before revealing the test score](../12_Classification_Part_2/index.html#/17) · [Handout](../12_Classification_Part_2/handout.html#chapter-validation-lab)  
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

**Placement:** [After slide 25: Estimate uncertainty. Make a decision. Check it.](../12_Classification_Part_2/index.html#/24) · [Handout](../12_Classification_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

A spam filter wrongly blocks an important email. In one sentence, explain why counting only its correct predictions might miss something important.


**Answer:** Suggested rubric (no automatic answer key)

Different mistakes have different consequences. Overall accuracy can hide harmful false alarms or missed spam; accept a clear practical explanation.

**Misconception:** Thinking accuracy alone describes every consequence of a classifier.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L05-O03 · Optional · Optional / basic extension

**Placement:** [After slide 15: See a neighbor average become smoother](../12_Classification_Part_2/index.html#/14) · [Handout](../12_Classification_Part_2/handout.html#chapter-regression-lab)  
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

**Placement:** [Before slide 5: Move the threshold and change the logic](../13_Classification_Part_3/index.html#/4) · [Handout](../13_Classification_Part_3/handout.html#chapter-threshold-lab)  
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

**Placement:** [After slide 10: The score moves by a squared input length](../13_Classification_Part_3/index.html#/9) · [Handout](../13_Classification_Part_3/handout.html#chapter-update-intuition)  
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

**Placement:** [Before slide 11: Step through the perceptron’s learning process](../13_Classification_Part_3/index.html#/10) · [Handout](../13_Classification_Part_3/handout.html#chapter-training-lab)  
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

**Placement:** [Before slide 15: XOR exposes the limit of one linear separator](../13_Classification_Part_3/index.html#/14) · [Handout](../13_Classification_Part_3/handout.html#chapter-xor-lab)  
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

**Placement:** [Before slide 20: Normalize the score by the length of w](../13_Classification_Part_3/index.html#/19) · [Handout](../13_Classification_Part_3/handout.html#chapter-distance)  
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

**Placement:** [After slide 25: Slack variables make room for violations](../13_Classification_Part_3/index.html#/24) · [Handout](../13_Classification_Part_3/handout.html#chapter-soft-margin)  
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

**Placement:** [After slide 26: A margin violation need not be a wrong label](../13_Classification_Part_3/index.html#/25) · [Handout](../13_Classification_Part_3/handout.html#chapter-hinge)  
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

**Placement:** [Before slide 5: Rotate the original data in the lifted space](../14_Classification_Part_4/index.html#/4) · [Handout](../14_Classification_Part_4/handout.html#chapter-lift-lab)  
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

**Placement:** [Before slide 13: Check the quadratic kernel identity numerically](../14_Classification_Part_4/index.html#/12) · [Handout](../14_Classification_Part_4/handout.html#chapter-kernel-lab)  
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

**Placement:** [After slide 22: Learn the line. Choose the margin. Change the space.](../14_Classification_Part_4/index.html#/21) · [Handout](../14_Classification_Part_4/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

An SVM gets every training example right. What would you check before trusting it on new examples?


**Answer:** Suggested rubric (no automatic answer key)

Evaluate on suitable held-out data. Accept a short answer about checking new cases rather than relying only on training success.

**Misconception:** Equating a perfect training score with reliable generalization.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L06-O02 · Optional · Optional / basic extension

**Placement:** [After slide 11: Only pairwise inner products remain](../14_Classification_Part_4/index.html#/10) · [Handout](../14_Classification_Part_4/handout.html#chapter-dual)  
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

**Placement:** [After slide 17: The Gram matrix must be positive semidefinite](../14_Classification_Part_4/index.html#/16) · [Handout](../14_Classification_Part_4/handout.html#chapter-valid-kernel)  
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

**Placement:** [Before slide 3: The labels are no longer supplied](../15_Clustering_Part_1/index.html#/2) · [Handout](../15_Clustering_Part_1/handout.html#chapter-unlabeled)  
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

**Placement:** [Before slide 11: Separate assignment from centroid movement](../15_Clustering_Part_1/index.html#/10) · [Handout](../15_Clustering_Part_1/handout.html#chapter-kmeans-lab)  
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

**Placement:** [Before slide 14: The objective alone cannot choose K](../15_Clustering_Part_1/index.html#/13) · [Handout](../15_Clustering_Part_1/handout.html#chapter-choose-k)  
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

**Placement:** [Before slide 20: Inspect silhouette one observation at a time](../15_Clustering_Part_1/index.html#/19) · [Handout](../15_Clustering_Part_1/handout.html#chapter-silhouette-lab)  
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

**Placement:** [Before slide 28: Watch EM reshape three Gaussian components](../15_Clustering_Part_1/index.html#/27) · [Handout](../15_Clustering_Part_1/handout.html#chapter-gmm-lab)  
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

**Placement:** [Before slide 29: A rising likelihood still needs interpretation](../15_Clustering_Part_1/index.html#/28) · [Handout](../15_Clustering_Part_1/handout.html#chapter-em-limits)  
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

**Placement:** [After slide 9: The derivative explains why the mean appears](../15_Clustering_Part_1/index.html#/8) · [Handout](../15_Clustering_Part_1/handout.html#chapter-update)  
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

**Placement:** [Before slide 7: Change the linkage and the merge budget](../16_Clustering_Part_2/index.html#/6) · [Handout](../16_Clustering_Part_2/handout.html#chapter-hierarchy-lab)  
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

**Placement:** [Before slide 15: Rotate a projection and find the first component](../16_Clustering_Part_2/index.html#/14) · [Handout](../16_Clustering_Part_2/handout.html#chapter-pca-lab)  
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

**Placement:** [After slide 19: Rescaling does not make a feature Gaussian](../16_Clustering_Part_2/index.html#/18) · [Handout](../16_Clustering_Part_2/handout.html#chapter-scaling)  
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

**Placement:** [After slide 25: Structure depends on the question you ask](../16_Clustering_Part_2/index.html#/24) · [Handout](../16_Clustering_Part_2/handout.html#chapter-summary)  
**Time:** 120 seconds, including debrief.

In one sentence, explain one reason why a clustering result should be interpreted rather than automatically accepted as the truth.


**Answer:** Suggested rubric (no automatic answer key)

Accept one reason: selected features, scaling, number of groups, distance rule, initialization, or whether groups make sense for the task.

**Misconception:** Treating computed groups as guaranteed natural categories.

**Facilitation:** Accept a short answer in the student’s own words. Use a few responses to identify what needs revisiting; do not grade terminology.

### L07-O02 · Optional · Optional / basic extension

**Placement:** [After slide 16: Keep d directions, then map back approximately](../16_Clustering_Part_2/index.html#/15) · [Handout](../16_Clustering_Part_2/handout.html#chapter-reconstruct)  
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

**Placement:** [After slide 8: A tree makes structure inspectable](../16_Clustering_Part_2/index.html#/7) · [Handout](../16_Clustering_Part_2/handout.html#chapter-hierarchy-limits)  
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
