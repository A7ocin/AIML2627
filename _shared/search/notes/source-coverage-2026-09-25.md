# Original handout coverage: Search Parts 1 and 2

Compared on 25 September 2026 with the authenticated [original Search Algorithms handout](https://www.aretor.it/courses/aiml2526/lessons/01_search/). The page reports a last update of 8 October 2024. No login details or authenticated page copy are stored in this repository.

## Result

The two packs already covered all named search strategies and their main intuitions. They did **not** explicitly retain every formal definition and mathematical selection rule. This revision restores those formulations and explains their symbols. It also makes several implementation details explicit rather than reproducing the original's ambiguous statements.

Pack 3 now has 43 teaching/navigation slides plus 6 Wooclap questions (49 total); pack 4 has 38 plus 6 questions (44 total). The new slides are `path-mathematics`, `dags-and-trees` and `branch-bound-code`. Existing slide IDs and question placements are preserved. In particular, the five-step procedure still precedes generic pseudocode, and the iterative-deepening sums retain the layout requested by the instructor.

The table uses stable slide IDs, since later insertions change slide numbers. Companion handout sections use `chapter-` followed by the indicated ID, unless another chapter is specified.

## Coverage by source section

| Original material | Pack and slide anchors | Handout coverage / revision |
|---|---|---|
| Introduction; video games, navigation, delivery, traveling salesperson; objectives and costs | 3: `problem-contract`, `state-sufficiency`, `state-space` | `chapter-state-space`: retained state examples; added original objectives and the assumptions needed to use distance as an energy proxy. |
| 1.1: directed versus undirected graphs; vertices, arcs, ordered pairs; G = (V, E), E ⊆ V × V | 3: `directed-graphs` | `chapter-directed-graphs`: added explicit vertex/edge sets and explained Cartesian product and subset notation. |
| Ordered path p = ⟨v₁, …, vₖ⟩; legal vertices and successive edges | 3: `paths-costs`, **`path-mathematics`** | `chapter-paths-costs`: formal definition, all index ranges, k vertices versus k − 1 edges. |
| Edge weights: G = (V, E, ωE), ωE: E → ℝ | 3: **`path-mathematics`** | `chapter-paths-costs`: definition, example, sum and empty-path cost. Real-valued graph models are distinguished from assumptions required by particular algorithms. |
| Vertex and edge weights: G = (V, E, ωV, ωE) | 4: `heuristic` | `chapter-heuristic`: both weight functions, vertex-only notation and unit edge weights. |
| 1.2: start and goal; solution endpoints; alternative routes and their costs | 3: `problem-contract`, `paths-costs`, **`path-mathematics`** | `chapter-paths-costs`: endpoints, cost summation, 6-versus-18 example and fixed goal versus goal predicate. |
| DAGs; connected, acyclic underlying graph; outward root reachability; root, leaves and depth | 3: **`dags-and-trees`**, `trees` | `chapter-trees`: restored the three conditions, quantified reachability statements and symbol explanations; diamond DAG distinguishes acyclicity from the tree property. |
| Cyclic graphs need additional bookkeeping | 3: `graph-versus-tree`, `cycle-vs-duplicates`; 4: `graph-cautions`, `reopen-example` | Matching chapters explain cycle pruning separately from duplicate handling and cheaper routes. |
| Generic search: inputs/outputs, initialization, selection, removal, goal test, set-based extension, exhaustion | 3: `frontier`, `generic-search-steps`, **revised `generic-search`**, `frontier-trace` | `chapter-generic-search`: mathematical pseudocode, symbol glossary, set difference/union/comprehension, worked frontier update and implementation ordering. The original contains one formal pseudocode block: this algorithm. |
| 1.3: uninformed exploration and frontier selection | 3: `uninformed`, `criteria` | Matching chapters and `chapter-frontier`. |
| 1.3.1: BFS, oldest path, FIFO, layer order, branching/memory, fewest edges | 3: `bfs`, `bfs-lab`, `bfs-why`, `branching-growth`, `search-memory` | `chapter-bfs`, `chapter-bfs-lab`, `chapter-breadth-depth`; cost optimality distinguished from fewest edges. |
| 1.3.2: DFS, newest path, LIFO or recursion, backtracking, branch order, small frontier, nonoptimality and nearby goal B | 3: `dfs`, `dfs-lab`, `dfs-backtracking`, `breadth-depth`, `search-memory` | `chapter-dfs`, `chapter-dfs-lab`, `chapter-breadth-depth`: recursion made explicit; an infinite branch need not contain a cycle. |
| 1.3.3: IDS, increasing limits from zero, restarted DFS, stack/recursion, shallowest solution and repeated work | 3: `ids`, `ids-outcomes`, `ids-lab`, `ids-overhead` | Matching chapters; recursion/restarts explicit. Existing visit sums explain why overhead depends on branching, not depth alone. |
| 1.3.4: lowest-cost-first, accumulated path cost, priority queue and optimality | 3: **revised `ucs`**, `ucs-stop`, `ucs-lab`, `ucs-duplicates`, `ucs-termination` | `chapter-ucs`: added arg min with variable meanings and the path-extension cost equation; corrected whole-path priority and cost/termination conditions. |
| 1.4: goal-dependent heuristic h: V → ℝ, estimated remaining cost, Euclidean-distance example | 4: **revised `heuristic`**, `heuristic-units`, `relaxed-problem` | `chapter-informed`, `chapter-heuristic`: explicit function domain, goal dependence and weighted representation; added the coordinate formula for Euclidean distance as supporting explanation. |
| 1.4.1: greedy arg min over endpoint h, global competition, example sequence, no optimality guarantee | 4: **revised `greedy`**, `greedy-lab`, `greedy-counterexample` | `chapter-greedy`: formula and glossary, A/B/E then F example. Interactive tree retains O/P/S continuation. |
| 1.4.2: HDFS, stack, ordering new paths by −h, A's children C/D/B, nonoptimality | 4: **revised `heuristic-dfs`**, `local-vs-global`, `heuristic-dfs-lab` | `chapter-heuristic-dfs`: inequality, push/pop sequence, equivalence to ascending −h and concrete C/D/B example. |
| 1.4.3: A* arg min, cost plus estimate, unit edge costs, initial and subsequent numerical scores | 4: **revised `astar`**, `astar-scores`, `astar-frontier`, `astar-lab` | `chapter-astar`, `chapter-astar-scores`: restored source-to-current notation mapping and all original arithmetic. |
| A* conditional optimality, memory demand and negative costs | 4: `admissibility`, `astar-proof`, `heuristic-quality`, `consistency`, `consistency-monotone`, `graph-cautions`, `negative-costs` | Matching chapters explain stronger, precise conditions than the original, plus reopening improved states. Negative edges are not made safe merely by detecting cycles. |
| 1.4.4: depth-first branch-and-bound, initial finite/infinite bound, strict lower-bound comparison, save goal and lower bound, continue DFS | 4: `branch-bound`, **`branch-bound-code`**, `bound-trace`, `branch-bound-lab`, `bound-equality`, `bound-termination` | `chapter-branch-bound`: source's mathematical steps expanded into one complete pseudocode loop with line explanations; current solution distinguished from numeric cutoff. |
| For every vertex, nonnegative and admissible h; h* is optimal remaining cost | 4: `admissibility`, **`branch-bound-code`** | `chapter-branch-bound`: explicit 0 ≤ h(v) ≤ h*(v), goal value zero, finite-graph termination and safe path-cycle checks. |
| Source's six interactive demonstrations and reference | Both packs' corresponding labs and references | BFS, DFS, IDS, GBFS, HDFS and A* remain local interactive examples; additional UCS and branch-and-bound labs are retained. Original page and Poole/Mackworth references remain linked. |

## Notation and intentional corrections

| Original | Current packs | Meaning |
|---|---|---|
| c(p) | g(p) | Accumulated edge cost |
| g(p) = c(p) + h(p[end]) | f(p) = g(p) + h(end(p)) | Estimated total solution cost through p |
| f (frontier) | F | Collection of waiting paths |
| p[end] | end(p) | Last vertex of the path |
| ⟨p, v⟩ | p ⊕ v | Append vertex v to the sequence p |
| b (branch-and-bound cutoff) | B | Current upper bound, distinct from branching factor b |

The mathematical definitions, algorithms and supporting explanations are now represented across both formats. This is a coverage check, not a literal reproduction: the original's spelling, duplicate section numbering, visual styling and loose/incorrect claims are not copied. Corrections include:

- A cycle must contain at least one edge; the zero-edge start path does not make every graph cyclic. “No cycle” in an underlying undirected tree uses the ordinary undirected-cycle definition.
- All material uses the executable source tree, where S is a child of P. The source's static diagram instead places it below O. This previously documented discrepancy remains resolved consistently in favor of the widgets.
- BFS and IDS minimize edge count; weighted-cost optimality requires appropriate equal costs. IDS overhead is not necessarily large just because the goal is deep.
- Lowest-cost-first orders cumulative path cost, not individual edge weights. Standard stopping guarantees need nonnegative costs; infinite spaces need additional termination assumptions.
- Cycle detection alone does not establish UCS/A* correctness with negative edges. Admissibility, consistency and reopening are distinguished.
- Branch-and-bound searches strictly below a finite initial cutoff unless a solution at the cutoff is already saved. Optimality on completion is distinct from guaranteed termination.

## Validation

- Both complete decks checked in Chromium at 1920×1080, 1366×768 and 1024×768; changed slides visually inspected and formula indices checked after Reveal's CSS reset.
- No page script errors, duplicate HTML IDs, clipped slide content or overflowing pseudocode in the browser checks.
- Nine interactive examples run to completion: the six source strategies plus UCS, the weighted comparison and branch-and-bound; expected goal paths/costs retained.
- Both slide PDFs regenerated from the final HTML, with page counts matching the rendered decks, including Wooclap questions.

The earlier [source-mapping.md](source-mapping.md) describes the original unsplit 43-slide deck. Its slide numbers are historical; use the stable anchors in this audit for the current packs.
