# Lesson 1 — Search algorithms

## 01. Search algorithms

This deck follows the course lesson 01_search. The six original interactive examples are adapted into local, presentation-sized widgets. Lowest-cost-first and branch-and-bound also receive interactive examples. All diagrams, controls and Reveal.js assets are local; no login or network is needed to present.

## 02. One engine, different selection rules

Use the slide to synthesize the preceding definitions and examples.

## 03. A state must contain what matters

The source introduces games, navigation, delivery and the traveling salesperson problem. The location alone may not determine the legal next actions or whether the goal is reached. For a standard traveling salesperson tour, the final state also requires return to the origin. A search node can record the full path and cost even when its state is much smaller.

## 04. Directed edges encode legal moves

The source example uses edges A→B, A→C, B→D, C→D and D→A. This graph is cyclic. Ordered pairs matter: directed reachability is not symmetric. A directed path follows each edge in its permitted direction.

## 05. A path is a solution; its cost measures quality

We use g(p) for accumulated cost, h(n) for estimated remaining cost and f(p)=g(p)+h(end(p)). The source calls accumulated cost c(p) and the combined A* score g(p). The deck changes only the symbols to match common usage, not the selection rule. Unless explicitly stated, weighted-search guarantees assume non-negative edge costs.

## 06. A rooted tree makes the choices visible

The course web widgets contain a 19-node tree. S is a child of P in the executable widget data; the earlier static Mermaid diagram places S under O instead. This deck consistently follows the executable widget: A–B–F–P–S. Children and all original edge costs and heuristic values are retained.

## 07. A search tree can repeat a graph state

A finite cyclic graph can induce an infinite search tree. Path-cycle pruning and global duplicate detection are distinct. Later slides explain why cost-sensitive global pruning must allow improved paths. The teaching engine uses path-cycle pruning; its supplied examples are finite trees.

## 08. The generic search loop

This is a tree-search skeleton. Add appropriate cycle or duplicate handling for graph search. The goal is tested after selecting a path from the frontier. For UCS and A*, stopping when a goal is merely generated can return a more expensive path. Empty frontier represents failure, not a path.

## 09. The frontier holds paths waiting to be selected

The source widgets have separate queue and frontier displays. Here they are unified into a frontier of complete paths, with the next selection first and numerical priorities where relevant. The selected and expanded counters are distinct. A goal is selected but not expanded.

## 10. Four questions to ask of any search strategy

For implicit search trees, b denotes a finite branching bound, d the shallowest goal depth and m the maximum depth. DFS is complete on finite search spaces with suitable cycle handling, but not generally on infinite branches. We state the setting explicitly rather than assigning unconditional yes/no guarantees.

## 11. Search without an estimate of the goal

Use the slide to synthesize the preceding definitions and examples.

## 12. Breadth-first: finish the shallow layers first

For the generic goal-on-selection version, time and frontier memory can be O(b^(d+1)): nodes selected at depth d before the goal can generate depth d+1. With goal testing on generation, the familiar O(b^d) bound applies. Both express exponential growth in solution depth. Do not interpret fewest edges as minimum weighted cost.

## 13. BFS · watch the queue expand

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 14. Depth-first: commit to one branch

Depth-first search does not inherently prefer the leftmost or rightmost child. That choice follows from insertion order. The labs preserve the website’s left-to-right insertion and rightmost-first removal. O(bm) space assumes parent-linked path records; copying full paths incurs additional storage. Worst-case time is O(b^m) on a finite tree.

## 15. DFS · follow the stack

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 16. Same tree, different exploration order

The small tree is illustrative. Numbers show selection order with left-to-right child insertion. The left image uses a queue. The right image uses a stack and therefore explores the right branch first. Neither picture is a universal claim about left-to-right preference.

## 17. Iterative deepening: increase a depth limit

Depth-limited search must distinguish cutoff from exhausted failure. A cutoff means unsearched deeper successors exist; exhausted failure means none remain. The widget has no arbitrary depth-10 cap and stops if the finite tree is exhausted. Its goal check happens before the depth cutoff. Like DFS, memory bounds assume shared parent records, not a full stored animation history.

## 18. IDS · replay the search at each depth

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 19. Repeated work can be a reasonable price

These totals illustrate complete traversal of each depth limit, not the exact counts of the irregular course tree or early termination at a goal. For a full b-ary tree, iterative deepening visits sum((d+1-i)b^i) nodes; one full traversal visits sum(b^i). Their ratio tends to b/(b−1) for b>1. For b=1, IDS repeats increasingly long prefixes and has quadratic work in depth.

## 20. Lowest-cost-first: spend the smallest total so far

The course calls this LCFS. The queue must be ordered by accumulated path cost, not the individual edge weight. On finite graphs, standard UCS with best-cost duplicate handling is optimal for non-negative edges. A sufficient condition for completeness on infinite, finitely branching spaces is every edge costing at least ε>0. Negative edges invalidate the ordinary first-goal guarantee.

## 21. Lowest-cost-first · compare cumulative costs

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 22. One problem · compare four selection rules

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 23. The uninformed toolkit

The table describes frontier/search-record storage, not the extra snapshots a visualization records for rewind. BFS and IDS minimize total cost only with equal positive edge costs. The difference between search complexity and UI history storage is stated in implementation notes. All finite teaching examples terminate.

## 24. Give the search a useful estimate

Use the slide to synthesize the preceding definitions and examples.

## 25. A heuristic estimates the work still ahead

Straight-line distance is appropriate when route costs measure geometric distance and legal routes cannot be shorter than the straight line. For travel time, distance alone has the wrong units; divide by a valid upper bound on speed to obtain a time lower bound. It does not automatically give a bound for arbitrary energy or monetary costs.

## 26. Greedy best-first: follow the smallest estimate

Greedy best-first can also fail to terminate in infinite spaces or without cycle handling. It is complete on a finite graph with adequate duplicate/cycle handling, but the heuristic alone guarantees neither completeness in general nor minimum cost.

## 27. Greedy best-first · use h alone

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 28. Heuristic DFS: order siblings, then go deep

The implementation pushes siblings in descending h so that the smallest h is popped next. Equal heuristic siblings use source insertion order as the next-visit tie-break. This local ordering is not equivalent to sorting the complete frontier by h.

## 29. Heuristic DFS · local priority, deep commitment

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 30. A*: combine the cost paid and the cost ahead

The slides use conventional f=g+h notation. The source webpage instead names the sum g and the paid cost c. A* does not simply average BFS and greedy search; it orders by the sum of actual and estimated costs.

## 31. The first A* decision

The edge costs and h values match the webpage widget exactly. After B is expanded, C and D remain on the frontier and must still participate in the comparison. The lab shows the full frontier in sorted order rather than just B’s new children.

## 32. A* · inspect g, h and f together

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 33. Admissible means “never overestimate”

These are sufficient conditions for optimal and complete A* tree search when a solution exists. Finite graphs can use weaker termination assumptions, such as non-negative costs with suitable best-cost duplicate handling. If no route to any goal exists from n, the true remaining cost is infinite. h=0 is admissible for non-negative costs, though it gives no directional guidance.

## 34. Consistency checks each edge

For goal S, the only goal path has remaining costs A=12, B=11, F=5, P=3, S=0. The source heuristic gives 5,2,2,2,0 on those nodes, all lower bounds. All other nodes are dead ends relative to S and have infinite true remaining cost. Thus this particular h is admissible for the course tree but inconsistent on A→B and C→H. A graph-search implementation that permanently discards later better paths needs consistency or must reopen states.

## 35. Graph search must keep better routes alive

This corrects the webpage suggestion that handling negative-cost cycles is enough to support ordinary A*. Even without a negative cycle, a negative edge can break the usual first-goal stopping rule. For non-negative graph search, remember best costs and handle stale queue entries or priority updates. The lab is intentionally a tree, so a global closed set is unnecessary.

## 36. Branch-and-bound: improve, then prune

The source calls this DFBBS. We use depth-first branch-and-bound (DFBnB) in prose and BNB in code. For finite examples with non-negative costs and admissible h, exhausting all candidates proves optimality. With a strict f<B test, a supplied finite bound must be greater than the optimum to guarantee finding a solution; setting it exactly to the optimal cost without an incumbent can return no solution below the bound. Infinite spaces still require termination assumptions.

## 37. Branch-and-bound · watch the incumbent improve

Use Next to select one path and update the frontier. Back restores the entire prior state. Play can be paused; leaving the slide pauses automatically. The frontier is displayed in selection order, next path first. Course-tree children are inserted left to right; stack-based DFS and IDS therefore visit rightmost siblings first. Priority ties use insertion order. Heuristic DFS orders only newly generated siblings. Green marks processed nodes, yellow marks frontier endpoints, an orange ring marks the currently selected node, and teal marks the solution. The goal test is applied on selection, not generation.

## 38. The frontier rule explains the algorithm

Use the slide to synthesize the preceding definitions and examples.

## 39. Choose from the problem’s requirements

These are starting points, not universal recommendations. A finite tree with plentiful goals may also be well served by DFS or heuristic DFS if any solution is acceptable. Good heuristic computation has a cost, and the best practical choice depends on the actual state space.

## 40. Predict first, then use the labs

Use the slide to synthesize the preceding definitions and examples.

## 41. Explain the behavior using the frontier

Use the slide to synthesize the preceding definitions and examples.

## 42. Search is controlled exploration

Use the slide to synthesize the preceding definitions and examples.

## 43. Continue exploring

No website password or authenticated request headers are included in the presentation. The six original widgets are reimplemented with their course data and intended traversal rules, retaining play, reset, back, next, frontier and solution displays. New local controls add pause, speed, selected-goal options for uninformed examples, and A* with h=0. New examples are identified in notes. Original diagrams use native SVG, preserving the history deck’s palette and typography.

