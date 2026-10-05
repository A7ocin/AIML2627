# Lesson 2 — Constraint satisfaction problems

## 1. Constraint satisfaction problems

Follows course lesson 02_constraint. The original DFS and GAC interactions are retained in locally implemented widgets. Additional labs explore assignments, domain splitting, local search and simulated annealing. All presentation assets are local.

## 2. Three ways to reason about possibilities

Use the slide to connect the preceding definitions and examples.

## 3. Constraints turn a task into a model

The source introduces scheduling, robot planning and scene understanding. Rules such as “sky above ground” can have exceptions; distinguish useful preferences from inviolable constraints. This lesson focuses on finite-domain hard CSPs, with local-search conflict scores used to seek feasibility.

## 4. A variable chooses one value from its domain

Use dom(X)={...}, not dom(X)∈{...}. Variables describe potential assignments; a chosen total assignment represents one state at a time. Unequal domain sizes produce the product of their cardinalities.

## 5. Partial and total assignments

A single assignment and a total assignment are also partial assignments in the inclusive mathematical sense. Restricting a total assignment to a constraint’s scope supplies the values needed to evaluate that constraint.

## 6. A constraint has a scope and a truth value

The basic DFS solver evaluates a constraint when all variables in its scope are assigned. Pending is not false. Propagation can nevertheless reason about domains before a complete scope is assigned, by looking for support.

## 7. A CSP is variables, domains and constraints

The solutions are (X1,X2,X3)=(1,1,0) and (1,2,0). We retain this example throughout the original DFS and GAC demonstrations. Finding one solution, finding all solutions and proving unsatisfiability are distinct stopping requirements.

## 8. Try an assignment · which rules can be checked?

Added interactive assignment evaluator for the original three-variable CSP. The selectors include an unassigned value. Every constraint reports true, false or pending, and the summary distinguishes total solutions from consistent partial contexts.

## 9. Generate-and-test checks complete candidates

Generate-and-test is complete for finite domains when all assignments are enumerated. Worst-case candidate count is the product of domain sizes; evaluating constraints adds per-candidate cost. Backtracking gains efficiency by evaluating failures earlier.

## 10. Backtracking rejects bad branches early

Use the slide to connect the preceding definitions and examples.

## 11. A recursive solver for all solutions

All branch contexts are copied or correctly restored, so sibling branches do not inherit assignments. In the basic algorithm, satisfied fully assigned constraints need not be re-evaluated below that context. The implementation keeps predicate functions rather than evaluating source strings.

## 12. DFS solver · inspect the assignment tree

Preserves the original 22-node pruned assignment tree, ascending value order, constraint inspection, current context and accumulated solution list. Failed branches have no descendants. Back restores the historical solution list. Reverse value order is an added comparison setting; default reproduces the source tree.

## 13. Good ordering exposes contradictions sooner

MRV, degree and least-constraining value are supplemental heuristics. They are not implemented in the small DFS demo; its toggle only reverses value order. Correct exhaustive backtracking with finite domains remains complete regardless of ordering.

## 14. Remove impossible values before branching

Do not say A=4 is intrinsically false. It is unsupported relative to the current domain of B and constraint A<B. Domain pruning preserves solutions and can trigger deductions elsewhere.

## 15. A constraint network is bipartite

The source shows A<B and B<C as a bipartite factor-style network. These arcs indicate participation in a constraint, not legal actions or a path-search direction. The GAC lab uses the original three-variable network with four variable–constraint arcs.

## 16. Every remaining value needs some support

Generalized arc consistency applies to arbitrary constraint arity. Unary support is just satisfaction of that unary rule. For k-ary constraints the support search considers the other k−1 domains; the teaching engine uses exhaustive support enumeration because its examples are small.

## 17. GAC revises arcs until no more pruning occurs

The page’s algorithm output heading suggests assignments, but GAC returns domains. We implement the re-enqueue rule for changed domains, rather than a hard-coded four-step demonstration. Stop early on an empty domain, or reach a fixed point when the worklist is empty.

## 18. GAC · prune values and update the worklist

Retains the original GAC example, four arcs, worklist, domain display and highlighted selected arc. The full algorithm also supports the source chain example and the source arc-consistent contradiction. The sidebar shows actual support witnesses for the selected arc. Back restores domains and queue exactly.

## 19. A changed domain can invalidate old support

From domains {1,2,3,4}, chain propagation reaches A={1,2}, B={2,3}, C={3,4}. The exact worklist order is not unique. The widget processes FIFO and suppresses duplicate queued arcs. After a split, this implementation safely starts with all arcs; an optimized implementation can seed only affected arcs and still propagate onward.

## 20. Three outcomes at the fixed point

The third case does not require any singleton domain; all domains may have multiple values. All-singleton domains imply a solution only after consistency is established. Empty domains immediately certify failure in the current branch.

## 21. Local support does not imply global agreement

This is the original counterexample. Support witnesses for different constraints need not agree on a single shared total assignment. Try it in both the GAC and domain-splitting labs: GAC leaves the domains unchanged; complete splitting proves failure.

## 22. Split one domain and propagate each branch

The two sets must cover the original domain. Finite domains plus exhaustive recursion make the solver complete. It finds all solutions and can prove unsatisfiability. The implementation partitions the first non-singleton domain in half and reruns full GAC per branch.

## 23. Domain splitting · turn pruning into a solver

Added live solver using genuine GAC at every branch. Each tree node shows the split that produced it, and the sidebar shows its propagated domains. Both solutions of the course example are found; the source contradiction has zero solutions. Branch domains are independent copies.

## 24. Start complete. Repair what is wrong.

Local search uses total assignments, even when they violate constraints. Neighborhoods commonly change one variable at a time. The score E is an objective used to seek feasibility; a satisfying assignment has score zero.

## 25. Use conflicts as a score

Added graph: edges AB, BC, CD, DA and AC. There is no BD edge. Vertex labels include color initials so color is not the only cue. The graph is 3-colorable; the plateau initialization is A=red, B=green, C=red, D=blue, with one conflict on AC.

## 26. A local search loop needs stopping rules

The demos use a 40-step budget and seeded randomness for reproducible traces. A best-improvement run may stop sooner at a plateau. Reset replays the same selected seed; choosing another seed gives a new run. No finite-budget success guarantee is implied.

## 27. Random sampling and random walk

For a finite satisfiable space with full-support independent sampling, success probability tends to one as samples tend to infinity. This is not a guarantee within a finite number of draws. Random-walk reachability depends on the move graph. Each demo walk chooses a uniformly random variable and a different color; equal domain sizes make this equivalent to a uniform variable–value move.

## 28. Best improvement can stop before a solution

The course presents strict improvement, whereas the textbook also discusses best-neighbor versions that allow sideways/worse moves. Our Best improvement setting follows the course’s strict interpretation and stops on its demonstrated plateau. Tabu and annealing are separate policies and can accept non-improving changes.

## 29. Local search · compare movement policies

Added interactive coloring simulation with random sampling, random walk, strict best improvement, tabu tenure 2 with aspiration for a new best score, and simulated annealing. The default plateau stalls strict improvement at one conflict. All states retain exact scores and conflicts; Back replays the same seeded trajectory.

## 30. Ways to leave a local minimum

The local lab implements tabu tenure two. It chooses a best admissible one-variable neighbor; ties use seeded randomness. Tabu may accept equal or worse scores and is not restricted to strict descent. Random restart is explained here; choose a different initialization or seed in the lab to compare starting trajectories.

## 31. Simulated annealing sometimes accepts worse moves

This specifies an acceptance probability, rather than merely a proportional Gibbs weight. It is the standard rule for the symmetric proposal used here. Equal-score moves have probability one at positive temperature. The local lab uses uniform one-variable color proposals and geometric cooling.

## 32. Annealing · temperature changes the decision

Added interactive probability explorer. The draw is a user-controlled test value, not a newly sampled random number. The graph shows acceptance versus ΔE at the current temperature; inputs update the curve, point, probability and accept/reject decision. The live local-search lab performs actual seeded proposals and draws.

## 33. Cooling shifts the balance toward improvement

The sketch illustrates geometric cooling, not a theorem about convergence. The acceptance explorer shows exact probabilities for individual moves. Guaranteed asymptotic convergence requires restrictive conditions and very slow cooling; we do not imply that the teaching schedule provides it.

## 34. Match the solver to the required answer

Use the slide to connect the preceding definitions and examples.

## 35. Predict, then verify in a lab

Use the slide to connect the preceding definitions and examples.

## 36. Explain the deductions

Use the slide to connect the preceding definitions and examples.

## 37. Represent, prune, branch — or repair

Use the slide to connect the preceding definitions and examples.

## 38. Continue exploring

Use the slide to connect the preceding definitions and examples.

