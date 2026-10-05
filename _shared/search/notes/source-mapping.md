# Source mapping and editorial decisions

For the current split packs and the mathematical coverage review, see [the 25 September 2026 coverage audit](source-coverage-2026-09-25.md). Slide numbers below refer to the earlier unsplit deck.

Primary source: [AIML 2025/26 — Lesson 01: Search](https://www.aretor.it/courses/aiml2526/lessons/01_search/), accessed 10 September 2026 using the user's authorized course access. Credentials are not included in this deck.

Design source: the reviewed `00_History` pack, originally based on `directional_hash_encoding_presentation`.

## Coverage

| Course section | Slides | Treatment |
|---|---|---|
| Introduction and applications | 1–3 | Navigation, games, delivery, and traveling salesperson; clarify what belongs in the state. |
| 1.1 Directed graphs | 4–5 | Directed edges, paths, weighted path costs; native SVG diagrams. |
| 1.2 Graph searching and generic algorithm | 6–10 | Rooted trees, graph-state repetition, frontier, goal test, expansion and evaluation criteria. |
| 1.3.1 BFS | 12–13 | FIFO rule, conditional guarantees, original interactive tree. |
| 1.3.2 DFS | 14–16 | LIFO rule, ordering, memory trade-off, original interactive tree. |
| 1.3.3 IDS | 17–19 | Depth-limited DFS, original interactive tree, repeated-work example. |
| 1.3.4 Lowest-cost-first | 20–23 | Accumulated cost, new live course-tree demo and comparison lab. |
| 1.4 Heuristics | 24–25 | Estimated remaining cost, lower bounds and units. |
| 1.4.1 Greedy best-first | 26–27 | Global minimum-h selection and original interactive tree. |
| 1.4.2 Heuristic DFS | 28–29 | Local sibling ordering and original interactive tree. |
| 1.4.3 A* | 30–35 | Combined score, original interactive tree, admissibility, consistency and graph-search handling. |
| 1.4.4 Depth-first branch-and-bound | 36–37 | Incumbent, strict bound and pruning; new live example. |
| Synthesis | 38–43 | Comparison, algorithm choice, exercises, answers and references. |

## Preserved interactive material

The original page has six widgets: BFS, DFS, IDS, GBFS, HDFS and A*. These remain interactive in slides 13, 15, 18, 27, 29 and 32. The 19-node `TREE_DATA` is retained, including child order, h values and incoming edge costs. The controls are adapted to the deck rather than embedded as an authenticated external page. No D3 or network request is needed at presentation time.

Preserved capabilities: automatic playback, reset, previous/next step, tree coloring, waiting paths, status and highlighted solution. Added capabilities: pause, speed selection, alternate uninformed goals, full state restoration, stopping on slide leave, and the A* zero-heuristic switch. The displayed frontier is always ordered next-selection first; DFS's underlying stack is therefore shown top-first.

The course-tree solution is `A → B → F → P → S`, four edges with weighted cost `1 + 6 + 2 + 3 = 12`. Plain BFS, DFS and IDS treat its edges as unit cost. The weighted comparison keeps actual edge costs even when BFS ignores those costs for selection.

## Corrections and clarifications

1. **Static tree versus executable tree:** the source's static Mermaid tree places S below O, while the actual widgets place S below P. All slides use the executable widget topology, with S below P.
2. **Notation:** the deck uses `g(p)` for cost paid, `h(n)` for remaining estimate and `f(p) = g(p) + h(end(p))`. The source uses `c(p)` and calls the combined score `g(p)`.
3. **BFS and IDS:** fewest edges means minimum weighted cost only when edge costs are equal and positive. Completeness statements specify finite branching and a finite-depth goal.
4. **DFS ordering:** the source inserts B, C, D in that order, so a LIFO stack selects D first. The demos preserve this convention. HDFS instead places the best heuristic child on top.
5. **Lowest-cost-first:** priority is the entire accumulated path cost, not just the next edge weight. Goal testing occurs on selection.
6. **IDS control flow:** distinguish a depth cutoff from an exhausted search space; remove the original fixed depth-10 cap. Restore the depth limit correctly when rewinding. Explain why repeated work can be modest on branching trees.
7. **Stopping and rewind:** all ordinary searches stop immediately when the goal is selected, even if other paths remain. Rewinding and replaying restores the same state and does not retain a stale completion flag. Branch-and-bound deliberately continues after finding a goal.
8. **A* conditions:** state sufficient optimality and termination assumptions. Explain admissibility and consistency separately. The supplied h is admissible for goal S but inconsistent (for example, `h(A)=5 > 1+h(B)=3`). On a graph, improved paths may require reopening expanded states.
9. **Negative costs:** cycle detection alone does not restore ordinary UCS/A* guarantees. Negative edges require different reasoning; a relevant negative cycle can remove the existence of a finite optimum.
10. **Branch-and-bound:** a finite initial strict bound must exceed the optimum to guarantee discovering a solution when no incumbent is supplied. Failure with bound 6 in the added example means no solution strictly below 6, not no solution at all.
11. **State modeling:** inventory, completed tasks, carried items or visited cities may be part of the state. The standard salesperson tour returns to its origin.

## Added weighted example

The comparison and branch-and-bound labs use an original small tree with three acceptable goal nodes:

- `A → B → G1`: weights 1, 8; cost 9.
- `A → C → D → G2`: weights 2, 2, 2; cost 6.
- `A → E → G3`: weights 3, 9; cost 12.

Heuristics: A=4, B=7, C=4, D=2, E=1, and each goal=0. They are admissible and consistent. BFS finds cost 9; greedy finds cost 12; lowest-cost-first and A* find cost 6. With the preserved stack convention, branch-and-bound first finds 12, then 6, then prunes B using its lower bound 8. This is explicitly an added example with multiple acceptable exits, not a modification of the original course tree.

## Supporting reference checks

The course itself cites Poole and Mackworth. The following primary textbook sections were used to verify the corrections; slide text and new figures are original adaptations of the supplied course lesson:

- [Uninformed search, Chapter 3.5](https://artint.info/3e/html/ArtInt3e.Ch3.S5.html): frontier rules, depth-limited failure/cutoff distinction, IDS and path costs.
- [Informed search, Chapter 3.6](https://artint.info/3e/html/ArtInt3e.Ch3.S6.html): heuristic interpretation, A* sufficient conditions, incumbent-based pruning and strict bounds.
- [Pruning, Chapter 3.7](https://artint.info/3e/html/ArtInt3e.Ch3.S7.html): cycle pruning, multiple paths and heuristic consistency.

No photographs or videos are added: the subject is best illustrated with native graph diagrams and interactive algorithm traces. All visual assets used in this pack are generated locally from code and the supplied graph data.
