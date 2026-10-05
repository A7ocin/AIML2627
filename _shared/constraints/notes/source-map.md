# Source coverage and editorial notes

Primary source: [AIML 2025/26 · Lesson 02 · Constraint Satisfaction Problems](https://www.aretor.it/courses/aiml2526/lessons/02_constraint/), accessed with the user's authorized course access on 11 September 2026. This is the lesson linked after the completed Search lecture. Login credentials are not included in the presentation.

| Course topic | Slides |
| --- | --- |
| Applications, variables, domains, assignments and constraint scopes | 3–8 |
| Generate-and-test, contexts, recursive depth-first solver | 9–12 |
| Domain pruning, constraint networks, arc support and GAC | 14–20 |
| Arc-consistent but unsatisfiable example | 21 |
| Domain splitting | 22–23 |
| Local search, conflicts, random sampling, random walk and improvement | 24–29 |
| Restarts, random steps, tabu and simulated annealing | 30–33 |
| Comparison, exercises, answers and recap | 34–37 |

## Original interactive material

Both original interactive blocks are preserved as local, editable implementations, restyled to match the earlier decks.

**DFS (slide 12).** Uses the original CSP: domains `{0,1,2}`, constraints `X1 < 2`, `X2 > 0`, `X3 < X1`. The default ascending traversal reproduces the source's 22-node pruned tree and its two solutions `(1,1,0)` and `(1,2,0)`. Node inspection, constraint evaluations, selected context, accumulated solutions, playback and stepping are retained. The original tree data is preserved in `js/source-tree.js` and checked against the generated default tree. Keyboard focus inspection, reverse value order and exact historical state restoration are additions.

**GAC (slide 18).** Retains the original three-variable network, four variable–constraint arcs, domain updates, worklist and highlighted active arc. The source block uses a fixed four-step sequence and a heading mentioning domain splitting. Here GAC uses a complete support-checking worklist algorithm; domain splitting is demonstrated separately on slide 23. The source's chain `A < B < C` and equality/equality/inequality contradiction are also selectable examples. Support witnesses and backward state restoration are additions.

## Added interactive material and illustrations

The assignment evaluator, genuine GAC-plus-splitting solver, graph-coloring local-search lab and annealing probability explorer extend the lecture's examples. Native SVG diagrams show networks, trees, conflicts, probabilities and cooling. They remain sharp when scaled and update with the simulations. No stock portraits or unrelated media are used.

The coloring example has edges AB, BC, CD, DA and AC, with three colors. Its default assignment has one conflict and no strictly improving single-variable neighbor. The local lab supports two initializations, three seeds and five movement policies. Tabu uses variable-based tenure two and aspiration for a new best score. Annealing uses uniform one-variable proposals and `T_k = 2 * 0.92^k`. These are teaching choices, not claimed optimal settings. Random restarts are explained; automatic repeated-restart runs are not implemented. MRV, degree and least-constraining-value ordering on slide 13 are supplemental theory; the DFS lab's ordering control only reverses values.

## Corrections and clarifications

- Write domains as sets, with equality. A compact CSP description still permits an exponentially large assignment space.
- Distinguish unevaluated constraints from violated ones. The basic DFS checks a rule once its whole scope is assigned; propagation can reason about domains sooner.
- GAC returns reduced domains, not a list of assignments. Processing an arc removes it from the worklist, not from the constraint network.
- Changed domains can require re-enqueuing affected arcs. The implementation uses FIFO processing and avoids duplicate queued arcs.
- A nonempty fixed point can have no singleton domains and need not be globally satisfiable. The source contradiction remains arc-consistent but has no solution.
- Splitting uses disjoint subsets covering the original domain, independent branch domains and complete propagation. Exhaustive finite splitting finds all solutions or establishes that none exists.
- Finite random sampling is not guaranteed to succeed. With independent uniform draws and solution fraction q, success after N draws is `1 - (1-q)^N`.
- The course's improvement method is presented explicitly as strict descent. Other best-neighbor policies can allow equal or worse moves.
- Annealing uses an acceptance probability `min(1, exp(-deltaE/T))` for positive temperature. The plotted test draw is user-controlled; the local-search lab samples seeded draws.
- A finite cooling schedule or exhausted local-search budget does not prove optimality or unsatisfiability.
- Scene relationships such as sky above ground may be preferences with exceptions, rather than universal hard constraints.

Algorithm semantics were cross-checked against Poole and Mackworth, *Artificial Intelligence: Foundations of Computational Agents*, third edition: [Consistency Algorithms](https://artint.info/3e/html/ArtInt3e.Ch4.S3.html), [Domain Splitting](https://artint.info/3e/html/ArtInt3e.Ch4.S4.html), and [Local Search](https://artint.info/3e/html/ArtInt3e.Ch4.S6.html).

The implementation stores snapshots for teaching playback. Its memory usage should not be interpreted as the space complexity of a production DFS or GAC solver.
