// Introductory undergraduate question prompts; no answer keys.
window.AIML_WOOCLAP = {
  "lectures": [
    {
      "pack": "01_History_Part_1",
      "eventCode": "GMSPICB",
      "questions": [
        {
          "id": "L00-C01",
          "core": true,
          "type": "MCQ",
          "slide": "aiml",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "Which example shows a computer learning from examples?",
          "seconds": 90,
          "choices": [
            "A spam filter improves after being shown emails marked spam or not spam.",
            "A calculator follows its built-in rule for adding two numbers.",
            "A lamp switches on at a time you set.",
            "A document is sorted alphabetically using a fixed rule."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11605"
        },
        {
          "id": "L00-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bayes",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You think it will stay dry. Then you see dark clouds approaching. What is a reasonable response?",
          "seconds": 90,
          "choices": [
            "Keep your original belief unchanged, whatever you see.",
            "Decide that rain is now absolutely certain.",
            "Conclude that your earlier information never mattered.",
            "Become more confident that it might rain."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1160a"
        },
        {
          "id": "L00-C03",
          "core": true,
          "type": "MCQ",
          "slide": "imitation",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "What does the Turing imitation game focus on?",
          "seconds": 90,
          "choices": [
            "Whether a machine looks like a human.",
            "Whether a machine calculates faster than a human.",
            "Whether a machine’s conversation can be distinguished from a human’s.",
            "Whether a machine has been proved to feel emotions."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1160f"
        },
        {
          "id": "L00-O01",
          "core": false,
          "type": "MCQ",
          "slide": "perceptron",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "During perceptron training, why do we show the model the correct answer?",
          "seconds": 90,
          "choices": [
            "So it can avoid making any prediction.",
            "So its weights never need to change.",
            "So we no longer need any training examples.",
            "So it can adjust its weights when its prediction is wrong."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d94334"
        },
        {
          "id": "L00-O03",
          "core": false,
          "type": "MCQ",
          "slide": "logreg",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Two models use a similar S-shaped curve. Must they describe the same real-world problem?",
          "seconds": 90,
          "choices": [
            "No. A similar mathematical shape can be useful for different problems.",
            "Yes. A curve can have only one application.",
            "Yes. Similar curves must have been developed for the same purpose.",
            "No. The two models therefore cannot both be useful."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d9433e"
        }
      ]
    },
    {
      "pack": "02_History_Part_2",
      "eventCode": "GMSPICB",
      "questions": [
        {
          "id": "L00-C04",
          "core": true,
          "type": "MCQ",
          "slide": "winter1",
          "when": "before",
          "purpose": "Prediction / causal reasoning",
          "stem": "A system performs well on a narrow benchmark. Its promoters claim that it is close to general intelligence, but deployments expose failures outside the benchmark. Which consequence could help produce an AI winter?",
          "seconds": 90,
          "choices": [
            "Success on one benchmark proves broad intelligence, so expectations no longer matter.",
            "The gap between the claims and demonstrated capability may erode confidence and funding.",
            "Failures outside the benchmark show that no AI technique can ever work.",
            "Researchers must discard every useful result produced by the system."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11614"
        },
        {
          "id": "L00-C05",
          "core": true,
          "type": "MCQ",
          "slide": "winter2",
          "when": "after",
          "purpose": "Synthesis / compare eras",
          "stem": "Which account best explains the two AI winters discussed in this lecture?",
          "seconds": 90,
          "choices": [
            "One decisive paper proved that every AI approach was impossible.",
            "In each case, expectations met technical and economic limits; confidence and funding fell, but research continued.",
            "Hardware stopped improving, causing all AI research to end until the next boom.",
            "Both winters were planned pauses after AI systems had met their promises."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11619"
        },
        {
          "id": "L00-C06",
          "core": true,
          "type": "MCQ",
          "slide": "gpt3",
          "when": "before",
          "purpose": "Prediction / distinguish mechanisms",
          "stem": "The same fixed language model receives two prompts. One gives only an instruction; the other also gives two input-output examples. The second follows the requested format more reliably. What is the best interpretation?",
          "seconds": 90,
          "choices": [
            "The examples permanently updated the model’s weights for all future users.",
            "Following the format proves that every fact in the response is correct.",
            "The examples changed the model’s context and guided this response; they did not by themselves retrain its weights.",
            "The examples changed the model’s software, so future prompts no longer matter."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1161e"
        },
        {
          "id": "L00-C07",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / connect eras",
          "stem": "Choose two milestones from different eras in this lecture. In two sentences, explain how the later milestone addressed a limitation or opportunity left by the earlier one, and name one limitation that still remained.",
          "seconds": 150,
          "choices": [],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11623"
        },
        {
          "id": "L00-O02",
          "core": false,
          "type": "MCQ",
          "slide": "alphago-transformers",
          "when": "after",
          "purpose": "Optional / synthesis",
          "stem": "AlphaGo combined learned components with search. Which conclusion is best supported by its success?",
          "seconds": 90,
          "choices": [
            "Learning made search unnecessary once enough games had been observed.",
            "Combining learning with structured search can be powerful on a well-defined task without proving general intelligence.",
            "Beating expert players shows that the same system can solve unrelated intellectual tasks.",
            "Once a system outperforms humans, the method and task boundaries no longer matter."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d94339"
        }
      ]
    },
    {
      "pack": "03_Search_Part_1",
      "eventCode": "GLDXPMN",
      "questions": [
        {
          "id": "L01-C01",
          "core": true,
          "type": "MCQ",
          "slide": "paths-costs",
          "when": "before",
          "purpose": "Opening / compare objectives",
          "stem": "Three routes reach the same destination: P has road times 4 + 4, Q has 1 + 2 + 2, and R has 6 + 1 minutes. Which comparison of road count and total time is correct?",
          "seconds": 90,
          "choices": [
            "P and R tie for fewest roads; Q is fastest at 5 minutes.",
            "P and R tie for fewest roads; R is fastest at 1 minute.",
            "Q uses the fewest roads and is fastest at 5 minutes.",
            "P and R tie for fewest roads and must tie for fastest time."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a94"
        },
        {
          "id": "L01-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bfs-lab",
          "when": "before",
          "purpose": "Prediction / trace a queue",
          "stem": "A search removes the oldest waiting path and adds children at the back. Its queue is [B, C, D], next first. B is expanded, adding E then F; C is then expanded, adding H. No node is a goal. Which two nodes are selected next?",
          "seconds": 90,
          "choices": [
            "D, then E.",
            "E, then F.",
            "H, then D.",
            "D, then H."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a99"
        },
        {
          "id": "L01-C03",
          "core": true,
          "type": "MCQ",
          "slide": "dfs-lab",
          "when": "before",
          "purpose": "Prediction / trace a stack",
          "stem": "A search removes the most recently added path. It pushes B, then C, then D onto an empty stack. After selecting D, it pushes J, then K. J and K have no children; K is then selected. No node is a goal. Which two nodes are selected next?",
          "seconds": 90,
          "choices": [
            "C, then B.",
            "C, then J.",
            "J, then B.",
            "J, then C."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a9e"
        },
        {
          "id": "L01-C04",
          "core": true,
          "type": "MCQ",
          "slide": "ids-overhead",
          "when": "after",
          "purpose": "Check / distinguish guarantees",
          "stem": "In a finite tree, the only goals are G at depth 3 with path cost 12, and H at depth 4 with path cost 4. All edge costs are positive. Iterative deepening increases its limit from 0 by one each time and stops at its first goal. What does it return, and why?",
          "seconds": 120,
          "choices": [
            "H: positive edge costs make the deeper goal cheaper to find.",
            "H: iterative deepening compares total costs across all limits.",
            "G: the depth-3 pass reaches it before H is allowed; fewest edges need not mean lowest cost.",
            "G: the first goal found must have minimum cost whenever all edge costs are positive."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aa3"
        },
        {
          "id": "L01-C05",
          "core": true,
          "type": "MCQ",
          "slide": "ucs-lab",
          "when": "before",
          "purpose": "Prediction / frontier versus solution cost",
          "stem": "Only these directed edges exist: S→G costs 9, S→A costs 2, A→G costs 8, S→B costs 4, and B→G costs 1. After expanding S, a search selects the waiting path with the lowest cost so far. Which path comes next, and which complete route is cheapest?",
          "seconds": 120,
          "choices": [
            "Next S→G; cheapest S→G, because a goal has already been discovered.",
            "Next S→B; cheapest S→B→G, because its final edge is cheapest.",
            "Next S→A; cheapest S→B→G, with total cost 5.",
            "Next S→A; cheapest S→A→G, because A is selected first."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aa8"
        },
        {
          "id": "L01-O02",
          "core": false,
          "type": "MCQ",
          "slide": "graph-versus-tree",
          "when": "after",
          "purpose": "Optional / cycle versus duplicate",
          "stem": "The only directed edges are S→A, S→B, A→X and B→X. A search rejects a child only if its state already appears on that same path; it has no global visited set. What happens to S→A→X and S→B→X?",
          "seconds": 90,
          "choices": [
            "The second path is rejected as a cycle because X was reached on the first path.",
            "Both paths are rejected because a state may have only one parent.",
            "Both paths are kept: neither contains a cycle, though both end at X.",
            "The second path is automatically merged with the first by the path cycle check."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d96954"
        }
      ]
    },
    {
      "pack": "04_Search_Part_2",
      "eventCode": "GLDXPMN",
      "questions": [
        {
          "id": "L01-C06",
          "core": true,
          "type": "MCQ",
          "slide": "astar-scores",
          "when": "before",
          "purpose": "Prediction / compare frontier scores",
          "stem": "The frontier contains paths P, Q and R. Their costs so far g and remaining estimates h are: P (6, 1), Q (2, 4), R (4, 3). Greedy selects minimum h; A* selects minimum g + h. Which paths do they select next?",
          "seconds": 90,
          "choices": [
            "Both select P, because its remaining estimate is smallest.",
            "Both select Q, because its cost so far is smallest.",
            "Greedy selects P; A* selects Q, whose total estimate is 6.",
            "Greedy selects P; A* ties P and R at a total estimate of 7."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aad"
        },
        {
          "id": "L01-C07",
          "core": true,
          "type": "MCQ",
          "slide": "graph-cautions",
          "when": "after",
          "purpose": "Check / reopen and propagate",
          "stem": "Graph A* has expanded X at cost g = 6 and found X→G with cost 3. Later it finds a route to X at g = 4. Its heuristic is admissible but inconsistent; G is the goal. Which action preserves the cheaper route through X?",
          "seconds": 120,
          "choices": [
            "Keep X closed: an admissible heuristic makes its first expansion final.",
            "Update X to g = 4, but do not revisit its outgoing edge; keep G at cost 9.",
            "Reopen X at g = 4, but keep G at cost 9 because a goal was already discovered.",
            "Update X’s cost and parent, reopen it, and propagate the improvement to G at cost 7."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3ab2"
        },
        {
          "id": "L01-C08",
          "core": true,
          "type": "MCQ",
          "slide": "branch-bound-lab",
          "when": "before",
          "purpose": "Prediction / lower bounds and equality",
          "stem": "Branch-and-bound already holds a complete route costing 6. Waiting path P has g = 4, h = 3; Q has g = 2, h = 4. The estimates are admissible and costs nonnegative. If the aim is to return one cheapest route, which paths may be pruned?",
          "seconds": 120,
          "choices": [
            "Only P: a lower bound equal to 6 must always be explored.",
            "Only Q: its remaining estimate is larger than P’s.",
            "Both P and Q: neither lower bound is below 6, and the saved route is retained.",
            "Neither: their costs so far are below 6, so both must be completed."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3ab7"
        },
        {
          "id": "L01-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / explain a guarantee",
          "stem": "A graph A* search uses an admissible but inconsistent heuristic and never reopens expanded states. Can its first selected goal be suboptimal? Explain using the reopening example, where cost 6 improves to 5, and state the repair.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3abc"
        },
        {
          "id": "L01-O01",
          "core": false,
          "type": "MCQ",
          "slide": "admissibility",
          "when": "after",
          "purpose": "Optional / justify a relaxed bound",
          "stem": "A robot moves horizontally or vertically on a grid, one unit per move, and must avoid obstacles. Which proposed heuristic is guaranteed admissible for every reachable state?",
          "seconds": 90,
          "choices": [
            "The length of any legal route already found from that state to the goal.",
            "Manhattan distance plus 1, to compensate for possible obstacles.",
            "Twice Manhattan distance when the map contains many obstacles.",
            "Manhattan distance to the goal with the obstacles ignored."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d9694f"
        },
        {
          "id": "L01-O03",
          "core": false,
          "type": "MCQ",
          "slide": "consistency",
          "when": "after",
          "purpose": "Optional / test an edge condition",
          "stem": "An edge u→v costs 2. The heuristic values are h(u) = 5 and h(v) = 2; the current path to u has cost g = 3. After extending that path to v, how does its A* score f = g + h change, and is this edge consistent?",
          "seconds": 90,
          "choices": [
            "f rises from 8 to 9; the edge is consistent because the step costs 2.",
            "f falls from 8 to 7; the edge is consistent because its cost is positive.",
            "f stays at 8; the increase in g always exactly cancels the change in h.",
            "f falls from 8 to 7; the edge is inconsistent because 5 > 2 + 2."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d96959"
        }
      ]
    },
    {
      "pack": "05_Constraints_Part_1",
      "eventCode": "JCKQKTX",
      "questions": [
        {
          "id": "L02-C01",
          "core": true,
          "type": "MCQ",
          "slide": "definition",
          "when": "before",
          "purpose": "Check / partial assignment and scope",
          "stem": "A, B and C each have domain {1,2,3}. The rules are A < B and B ≠ C. Only A = 2 is assigned. Which statement about this partial assignment is correct?",
          "seconds": 90,
          "choices": [
            "It already violates A < B, because B has no assigned value.",
            "It is a solution, because no rule has been violated yet.",
            "Neither rule is evaluable yet; one possible completion is B = 3, C = 1.",
            "Both rules are satisfied, because each has at least one possible supporting pair."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a758f"
        },
        {
          "id": "L02-C02",
          "core": true,
          "type": "MCQ",
          "slide": "dfs-lab",
          "when": "before",
          "purpose": "Prediction / trace a pruned branch",
          "stem": "X₁, X₂ and X₃ each have domain {0,1,2}. The rules are X₁ < 2, X₂ > 0 and X₃ < X₁. DFS assigns X₁ first and tries X₁ = 2. What can it prune immediately, without propagation?",
          "seconds": 90,
          "choices": [
            "All 9 completions of this branch: X₁ < 2 is already false.",
            "Only the 3 completions with X₂ = 0: X₃ is still unassigned.",
            "All 27 assignments: a false unary rule makes the whole CSP impossible.",
            "Nothing yet: every rule must wait until all three variables are assigned."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a7594"
        },
        {
          "id": "L02-C03",
          "core": true,
          "type": "MCQ",
          "slide": "gac-lab",
          "when": "before",
          "purpose": "Prediction / propagation to a fixed point",
          "stem": "A, B and C each start with domain {1,2,3,4}; the rules are A < B and B < C. Repeatedly remove values with no support in a rule, until no domain changes. What remains?",
          "seconds": 120,
          "choices": [
            "A = {1,2,3}, B = {2,3}, C = {2,3,4}.",
            "A = {1,2}, B = {2,3}, C = {3,4}.",
            "A = {1}, B = {2}, C = {3}: propagation chooses the smallest solution.",
            "A = {1,2,3}, B = {1,2,3,4}, C = {2,3,4}."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a7599"
        },
        {
          "id": "L02-C04",
          "core": true,
          "type": "MCQ",
          "slide": "consistent-unsat",
          "when": "before",
          "purpose": "Prediction / local support versus solution",
          "stem": "A, B and C each have domain {1,2}. The three separate binary rules are A = B, B = C and A ≠ C. What happens if we enforce arc consistency on each rule?",
          "seconds": 120,
          "choices": [
            "All domains become empty: arc consistency combines the two equalities into A = C.",
            "A = 1 is removed, but A = 2 remains as a solution.",
            "All values remain supported in each rule, although no total assignment satisfies all three.",
            "All values remain, which proves that a solution exists."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a759e"
        },
        {
          "id": "L02-O01",
          "core": false,
          "type": "MCQ",
          "slide": "ordering",
          "when": "after",
          "purpose": "Optional / justify value ordering",
          "stem": "We have already selected variable A. The only rule is A ≠ B, with dom(A) = {1,2} and dom(B) = {1,3}. Which value should least-constraining-value ordering try first, and why?",
          "seconds": 90,
          "choices": [
            "A = 1: it uses the smaller value and therefore removes fewer choices.",
            "A = 2: both values of B remain available, whereas A = 1 removes B = 1.",
            "A = 1: leaving B only one value is the aim of least-constraining-value ordering.",
            "Either value: A has two choices, so both must affect B equally."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b6a"
        },
        {
          "id": "L02-O02",
          "core": false,
          "type": "MCQ",
          "slide": "requeue",
          "when": "after",
          "purpose": "Optional / trace a lost support",
          "stem": "The rules are A < B and B < C. Currently A = {1,2,3}, B = {2,3,4}, C = {3,4}. Checking B < C removes B = 4. When A < B is rechecked, which value of A loses its last support?",
          "seconds": 90,
          "choices": [
            "A = 1, because B = 1 is unavailable.",
            "A = 2, because B must use the same value as A.",
            "A = 3, because its only larger partner was B = 4.",
            "No value: A’s domain has not changed yet."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b6f"
        }
      ]
    },
    {
      "pack": "06_Constraints_Part_2",
      "eventCode": "JCKQKTX",
      "questions": [
        {
          "id": "L02-C05",
          "core": true,
          "type": "MCQ",
          "slide": "split-lab",
          "when": "before",
          "purpose": "Prediction / independent split branches",
          "stem": "At a propagation fixed point, dom(X) = {1,2,3,4}. We split into X ∈ {1,2} and X ∈ {3,4}. Propagation makes Y’s domain empty in the first branch. To find every solution, what should happen next?",
          "seconds": 90,
          "choices": [
            "Reject the first branch; propagate the second using its own copy of the parent domains.",
            "Reject the whole CSP: an empty domain in either branch proves both impossible.",
            "Explore the second branch, carrying over Y’s empty domain from the first.",
            "Restore X to {1,2,3,4} in the second branch so that no value is missed."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75a3"
        },
        {
          "id": "L02-C06",
          "core": true,
          "type": "MCQ",
          "slide": "local-intro",
          "when": "after",
          "purpose": "Check / score the whole candidate",
          "stem": "Three exams A, B and C use slots {1,2}. The only clash rules are A ≠ B and B ≠ C. Local search starts at (A,B,C) = (1,1,2) and changes only B to 2. How does the number of violated rules change?",
          "seconds": 90,
          "choices": [
            "It falls from 1 to 0: the clash between A and B disappears.",
            "It stays at 1: the clash moves from A–B to B–C.",
            "It rises from 1 to 2: both rules are now violated.",
            "The move is forbidden: local search cannot visit an assignment with a clash."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75a8"
        },
        {
          "id": "L02-C07",
          "core": true,
          "type": "MCQ",
          "slide": "anneal-lab",
          "when": "before",
          "purpose": "Prediction / apply annealing acceptance",
          "stem": "An annealing move raises the conflict count from 1 to 3. For this move, acceptance probability is 0.61 at T = 4 and 0.02 at T = 0.5. Accept when a random draw u is below that probability. Using u = 0.40, what happens?",
          "seconds": 90,
          "choices": [
            "Accept at both temperatures, because every proposed move is allowed.",
            "Reject at both temperatures, because the conflict count increases.",
            "Accept only at T = 0.5: cooling makes uphill moves easier.",
            "Accept at T = 4; reject at T = 0.5. Cooling makes this uphill move less likely."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75ad"
        },
        {
          "id": "L02-C08",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / compare evidence from two solvers",
          "stem": "Solver A exhaustively explores all branches of a finite CSP using sound pruning and finds no solution. Solver B makes 10,000 local-search moves, with restarts, and finds no solution. Which can conclude that the CSP is unsatisfiable, and why? Answer in two sentences.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75b2"
        },
        {
          "id": "L02-O03",
          "core": false,
          "type": "MCQ",
          "slide": "cooling",
          "when": "after",
          "purpose": "Optional / escape a plateau",
          "stem": "A local-search candidate has 1 conflict. Every one-variable neighbor has at least 1. One neighbor also has 1 conflict, and from it a move reaches 0. Which conclusion follows for strict improvement, which accepts only lower scores?",
          "seconds": 90,
          "choices": [
            "Strict improvement takes the equal-score move, then reaches 0.",
            "Strict improvement stops here; allowing the equal-score move could reach a solution in two steps.",
            "The current candidate is globally optimal because no immediate move improves it.",
            "A restart is guaranteed to reach the zero-conflict candidate on its next move."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b74"
        }
      ]
    },
    {
      "pack": "07_Intro_ML_Part_1",
      "eventCode": "JCBAAQM",
      "questions": [
        {
          "id": "L03-C01",
          "core": true,
          "type": "MCQ",
          "slide": "training-inference",
          "when": "before",
          "purpose": "Opening / distinguish stages",
          "stem": "A crop model predicts a new field’s yield without changing its parameters. Later, an optimizer updates those parameters using the measured yield. How should we describe these two stages?",
          "seconds": 90,
          "choices": [
            "Both are inference because the model family stays unchanged.",
            "Both are training because both stages use data.",
            "The prediction is training; the later parameter update is inference.",
            "The fixed-model prediction is inference; the parameter update is training."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d408"
        },
        {
          "id": "L03-C02",
          "core": true,
          "type": "MCQ",
          "slide": "regression-classification",
          "when": "after",
          "purpose": "Check / interpret the target",
          "stem": "One dataset records plant species as codes {0,1,2}; another records crop yield in kg. Both targets are numbers. Which task choice follows from what those targets mean?",
          "seconds": 90,
          "choices": [
            "Regression for both, because both targets are stored as numbers.",
            "Classification for species; regression for yield.",
            "Regression for species; classification for yield, because yield was measured.",
            "Classification for both, because each training example has a known target."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d40d"
        },
        {
          "id": "L03-C03",
          "core": true,
          "type": "MCQ",
          "slide": "mask-lab",
          "when": "before",
          "purpose": "Prediction / distinguish target from guess",
          "stem": "The recorded sentence is “The crop needs water”. We hide “water”; a model predicts the plausible word “sunlight”. Which statement about this self-supervised training pair is correct?",
          "seconds": 90,
          "choices": [
            "“Water” is the target; a plausible alternative can still disagree with this recorded target.",
            "“Sunlight” becomes the target because the model predicted it.",
            "Any plausible word automatically counts as the recorded correct target.",
            "A person must annotate a new target because the original word was hidden."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d412"
        },
        {
          "id": "L03-C04",
          "core": true,
          "type": "MCQ",
          "slide": "bandit-lab",
          "when": "before",
          "purpose": "Prediction / reason about uncertainty",
          "stem": "A bandit arm A rewarded 6 of 10 pulls, B rewarded 1 of 2, and C rewarded 0 of 1. Rewards are noisy. A rule now always picks A and never samples the other arms. What can go wrong?",
          "seconds": 120,
          "choices": [
            "The 6/10 rate establishes A’s true reward probability exactly, so no better arm can be missed.",
            "Early noisy results may hide a better arm; occasionally sampling other arms can reveal it.",
            "C’s one zero reward proves that it cannot be the best arm.",
            "Trying B instead guarantees a larger reward on the very next pull."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d417"
        },
        {
          "id": "L03-O01",
          "core": false,
          "type": "MCQ",
          "slide": "domain-shift",
          "when": "after",
          "purpose": "Optional / separate two learning issues",
          "stem": "A system learns from labeled scans at hospital A and unlabeled scans at hospital B. B uses a different scanner. Which interpretation is justified?",
          "seconds": 120,
          "choices": [
            "Using both pools can be semi-supervised learning, while the scanner difference introduces domain shift.",
            "Semi-supervised learning guarantees that both hospitals have the same input distribution.",
            "A scanner difference by itself proves the training labels are noisy.",
            "Adding unlabeled B scans automatically corrects every scanner-related performance difference."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99a9e"
        }
      ]
    },
    {
      "pack": "08_Intro_ML_Part_2",
      "eventCode": "JCBAAQM",
      "questions": [
        {
          "id": "L03-C05",
          "core": true,
          "type": "MCQ",
          "slide": "matrix",
          "when": "after",
          "purpose": "Check / construct a dataset",
          "stem": "60 field trials record fertilizer and soil moisture to predict yield. A trial ID is kept only for lookup. With one row per trial, which input/target representation is correct?",
          "seconds": 90,
          "choices": [
            "X has shape 60×3 because the lookup ID must also be a predictor; Y has 60 entries.",
            "X has shape 60×2 for the two predictors; Y has the 60 measured yields.",
            "X has shape 2×60 and Y has two entries, one per predictor.",
            "X has shape 60×3 including measured yield; Y repeats that same yield column."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d41c"
        },
        {
          "id": "L03-C06",
          "core": true,
          "type": "MCQ",
          "slide": "leakage",
          "when": "before",
          "purpose": "Prediction / detect evaluation leakage",
          "stem": "An engineer computes a feature mean from all 1,000 rows, uses it to scale the inputs, and only then splits into training and test sets. Test targets never enter fitting. Is the final test independent of model preparation?",
          "seconds": 120,
          "choices": [
            "Yes: preprocessing cannot leak information unless it uses test targets.",
            "Yes: a random split makes every earlier preparation step independent.",
            "Yes, provided the best model is also selected using the test score.",
            "No: test inputs influenced learned preprocessing; fit that preprocessing on training data only."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d421"
        },
        {
          "id": "L03-C07",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / justify model selection and evaluation",
          "stem": "Two polynomial models have training/validation errors: degree 2 = (0.08, 0.10), degree 9 = (0.01, 0.35). Choose a model for new fields, justify your choice, and say which data should provide the final performance estimate.",
          "seconds": 150,
          "choices": [],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d426"
        },
        {
          "id": "L03-O02",
          "core": false,
          "type": "MCQ",
          "slide": "hypothesis-space",
          "when": "after",
          "purpose": "Optional / distinguish θ from Θ",
          "stem": "We choose the family fθ(x)=ax²+bx+c, then fitting changes θ from (1,0,0) to (2,−1,0.5). What changed?",
          "seconds": 90,
          "choices": [
            "The family changed from quadratic to cubic.",
            "The polynomial degree was learned, but the coefficients stayed fixed.",
            "A new parameter space was required because a coefficient became negative.",
            "The parameter setting changed within the same Θ=ℝ³; allowing a different degree would change the family."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99aa3"
        },
        {
          "id": "L03-O03",
          "core": false,
          "type": "MCQ",
          "slide": "leakage",
          "when": "after",
          "purpose": "Optional / design a realistic evaluation",
          "stem": "A yield model is trained on fields A–D using data from 2021–2023. We want to predict yields in 2024 for new fields. Which test set best checks this?",
          "seconds": 120,
          "choices": [
            "2024 records from fields A–D.",
            "2024 records from different fields, E–H.",
            "2021–2023 records from different fields, E–H.",
            "Unused 2021–2023 records from fields A–D, selected at random."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99aa8"
        }
      ]
    },
    {
      "pack": "09_Regression_Part_1",
      "eventCode": "RBCJRAP",
      "questions": [
        {
          "id": "L04-C01",
          "core": true,
          "type": "MCQ",
          "slide": "residual-lab",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "A house costs 7 units, but a model predicts 5. Using error = actual value minus prediction, what is the error?",
          "seconds": 60,
          "choices": [
            "-2.",
            "12.",
            "+2.",
            "4."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d96b"
        },
        {
          "id": "L04-C02",
          "core": true,
          "type": "MCQ",
          "slide": "fit-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A line predicts every training value exactly. What is its sum of squared prediction errors?",
          "seconds": 60,
          "choices": [
            "0.",
            "1.",
            "The number of training examples.",
            "We cannot tell even though every prediction is exact."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d970"
        },
        {
          "id": "L04-C03",
          "core": true,
          "type": "MCQ",
          "slide": "r2",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "On the same nonconstant dataset, model A has R²=0.8 and model B has R²=0.3. Which has the smaller sum of squared errors?",
          "seconds": 90,
          "choices": [
            "Model A.",
            "Model B.",
            "They must have equal errors.",
            "R² only tells us whether the slope is positive."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d975"
        },
        {
          "id": "L04-C04",
          "core": true,
          "type": "MCQ",
          "slide": "polynomial",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A scatterplot shows a clear U-shaped pattern. Which model could follow that shape better than a straight line?",
          "seconds": 90,
          "choices": [
            "A horizontal line only.",
            "The same straight line with a different color.",
            "A curve that includes an x-squared term.",
            "Deleting the response values before fitting."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d97a"
        },
        {
          "id": "L04-C05",
          "core": true,
          "type": "MCQ",
          "slide": "overfit-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A student memorizes every practice answer but struggles with new exercises. Which model behavior is this most like?",
          "seconds": 90,
          "choices": [
            "Doing poorly on both practice and new examples.",
            "Doing equally well on every new example.",
            "Having too little flexibility to fit any practice example.",
            "Doing very well on training examples but poorly on new examples."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d97f"
        },
        {
          "id": "L04-O01",
          "core": false,
          "type": "MCQ",
          "slide": "line",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a straight-line model y ≈ intercept + slope × x, what does the slope describe?",
          "seconds": 90,
          "choices": [
            "The total number of observations.",
            "The prediction when x is zero.",
            "The color of the plotted line.",
            "The predicted change in y when x increases by one unit."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f2411259"
        }
      ]
    },
    {
      "pack": "10_Regression_Part_2",
      "eventCode": "RBCJRAP",
      "questions": [
        {
          "id": "L04-C06",
          "core": true,
          "type": "MCQ",
          "slide": "bias-lab",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "You fit a model again using a slightly different training sample, and its curve changes a lot. What does this suggest?",
          "seconds": 90,
          "choices": [
            "The model must make identical predictions on every dataset.",
            "The fitted model is sensitive to which training examples it receives.",
            "The training sample has no effect on the fit.",
            "The target must be a category rather than a number."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d984"
        },
        {
          "id": "L04-C07",
          "core": true,
          "type": "MCQ",
          "slide": "pvalues",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A regression slope has a small p-value. Does that alone prove that changing the input causes the output to change?",
          "seconds": 90,
          "choices": [
            "Yes. Every small p-value proves causation.",
            "No. Evidence of an association is not by itself proof of causation.",
            "Yes, provided the graph uses a straight line.",
            "No, because a small p-value means the slope must be exactly zero."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d989"
        },
        {
          "id": "L04-C08",
          "core": true,
          "type": "MCQ",
          "slide": "adjustment",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Ice-cream sales and swimming incidents both rise in warm weather. What could help explain their association?",
          "seconds": 90,
          "choices": [
            "Warm weather can affect both ice-cream buying and swimming activity.",
            "Buying ice cream has been proved to cause every incident.",
            "An association guarantees that one variable causes the other.",
            "Two quantities that rise together cannot share another cause."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d98e"
        },
        {
          "id": "L04-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "In one sentence, explain what overfitting would look like when comparing training results with results on new data.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d993"
        },
        {
          "id": "L04-O02",
          "core": false,
          "type": "MCQ",
          "slide": "interval",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Two confidence intervals for the same slope are computed using the same confidence level. What does the wider interval communicate?",
          "seconds": 90,
          "choices": [
            "Greater precision about the slope.",
            "Proof that the slope causes the outcome.",
            "Less precision about the slope.",
            "A guarantee that every future observation lies in the interval."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f241125e"
        },
        {
          "id": "L04-O03",
          "core": false,
          "type": "MCQ",
          "slide": "multiple",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A model uses house area and number of rooms to predict price. How does this differ from using area alone?",
          "seconds": 90,
          "choices": [
            "It uses more than one input feature.",
            "It no longer predicts a number.",
            "It cannot be a regression model.",
            "It is guaranteed to make every prediction correctly."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f2411263"
        }
      ]
    },
    {
      "pack": "11_Classification_Part_1",
      "eventCode": "LQMJZRC",
      "questions": [
        {
          "id": "L05-C01",
          "core": true,
          "type": "MCQ",
          "slide": "classification",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "Which task predicts a category rather than a number?",
          "seconds": 60,
          "choices": [
            "Predicting a house price.",
            "Deciding whether an email is spam or not spam.",
            "Predicting tomorrow’s temperature.",
            "Predicting the duration of a journey."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d89"
        },
        {
          "id": "L05-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bayes-error",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A model says an email has a 70% chance of being spam. Can that email still turn out not to be spam?",
          "seconds": 60,
          "choices": [
            "No. Anything above 50% is certain.",
            "No. A model’s most likely answer is always correct.",
            "Yes. A probability below 100% leaves room for another outcome.",
            "Yes, but only if 70% is less than 50%."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d8e"
        },
        {
          "id": "L05-C03",
          "core": true,
          "type": "MCQ",
          "slide": "bayes-theorem",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "An email contains a word that is more common in spam than in ordinary mail. What can this word provide?",
          "seconds": 90,
          "choices": [
            "Evidence that can increase the estimated chance of spam.",
            "Proof that the email is certainly spam.",
            "Proof that the email is certainly ordinary mail.",
            "A reason to ignore every other piece of information."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d93"
        },
        {
          "id": "L05-C04",
          "core": true,
          "type": "MCQ",
          "slide": "independence",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "What simplifying assumption does Naive Bayes make about input features once the class is known?",
          "seconds": 90,
          "choices": [
            "It assumes every feature has exactly the same value.",
            "It assumes features contain no information about the class.",
            "It treats the features as independent within that class.",
            "It assumes every possible class is always equally common."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d98"
        },
        {
          "id": "L05-C05",
          "core": true,
          "type": "MCQ",
          "slide": "logistic-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A spam filter flags emails when their spam score is at least 0.5. If we lower the cutoff to 0.2 and keep all scores fixed, what can happen?",
          "seconds": 90,
          "choices": [
            "Fewer emails must be flagged as spam.",
            "Every email’s score is automatically recalculated.",
            "The cutoff can never affect a decision.",
            "More emails may be flagged as spam."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d9d"
        },
        {
          "id": "L05-O01",
          "core": false,
          "type": "MCQ",
          "slide": "decision-lab",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a screening task, missing a real problem is much more costly than a false alarm. What tradeoff might we accept?",
          "seconds": 90,
          "choices": [
            "More missed problems just to avoid every false alarm.",
            "A guarantee of making neither kind of mistake.",
            "Ignoring the different costs of the two errors.",
            "More false alarms in order to miss fewer real problems."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1c6"
        },
        {
          "id": "L05-O02",
          "core": false,
          "type": "MCQ",
          "slide": "smoothing",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why might Naive Bayes use smoothing for a word that never appeared in one class’s training examples?",
          "seconds": 90,
          "choices": [
            "To avoid treating that unseen word as completely impossible in the class.",
            "To guarantee that all future messages are classified correctly.",
            "To delete all the other words from the model.",
            "To avoid needing any labeled training messages."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1cb"
        }
      ]
    },
    {
      "pack": "12_Classification_Part_2",
      "eventCode": "LQMJZRC",
      "questions": [
        {
          "id": "L05-C06",
          "core": true,
          "type": "MCQ",
          "slide": "log-loss",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "The correct label for a training photo is “cat”. Which prediction gives the correct label more probability?",
          "seconds": 60,
          "choices": [
            "Cat: 10%; dog: 90%.",
            "Cat: 90%; dog: 10%.",
            "Cat: 30%; dog: 70%.",
            "Cat: 50%; dog: 50%."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472da2"
        },
        {
          "id": "L05-C07",
          "core": true,
          "type": "MCQ",
          "slide": "neighbors-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A new point’s three nearest labeled neighbors are two cats and one dog. What does a simple majority vote predict?",
          "seconds": 60,
          "choices": [
            "Dog.",
            "A new third category.",
            "There is a tie.",
            "Cat."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472da7"
        },
        {
          "id": "L05-C08",
          "core": true,
          "type": "MCQ",
          "slide": "validation-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You are choosing among several classifiers. Which data should you use to compare choices while keeping a final test fair?",
          "seconds": 90,
          "choices": [
            "The final test set after every change, keeping only the best score.",
            "Only the examples each model trained on.",
            "A validation set, leaving the final test set unused until the choice is made.",
            "The final test answers as extra training features."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472dac"
        },
        {
          "id": "L05-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "A spam filter wrongly blocks an important email. In one sentence, explain why counting only its correct predictions might miss something important.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472db1"
        },
        {
          "id": "L05-O03",
          "core": false,
          "type": "MCQ",
          "slide": "regression-lab",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A nearest-neighbor regressor averages two nearby examples with values 2 and 6. What does it predict?",
          "seconds": 60,
          "choices": [
            "2.",
            "6.",
            "8.",
            "4."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1d0"
        }
      ]
    },
    {
      "pack": "13_Classification_Part_3",
      "eventCode": "LQCRNNR",
      "questions": [
        {
          "id": "L06-C01",
          "core": true,
          "type": "MCQ",
          "slide": "threshold-lab",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "An alarm should activate only when BOTH switches are on. Which input should activate it?",
          "seconds": 60,
          "choices": [
            "Switch 1 on and switch 2 on.",
            "Switch 1 on and switch 2 off.",
            "Switch 1 off and switch 2 on.",
            "Both switches off."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f90"
        },
        {
          "id": "L06-C02",
          "core": true,
          "type": "MCQ",
          "slide": "update-intuition",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A perceptron predicts the wrong class for a training example. What is the purpose of its weight update?",
          "seconds": 90,
          "choices": [
            "To move its decision rule toward giving this example the correct label.",
            "To make its prediction on this example even less correct on purpose.",
            "To remove every other training example.",
            "To prove it will now classify every possible example correctly."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f95"
        },
        {
          "id": "L06-C03",
          "core": true,
          "type": "MCQ",
          "slide": "training-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A classifier gets one training example right. Is that enough to know it gets every training example right?",
          "seconds": 60,
          "choices": [
            "Yes. One correct example proves the whole dataset is correct.",
            "No. The other examples must also be checked.",
            "Yes, if that example was shown first.",
            "No, because no classifier can ever get more than one example right."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f9a"
        },
        {
          "id": "L06-C04",
          "core": true,
          "type": "MCQ",
          "slide": "xor-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Two classes are arranged so that no straight line can separate them. What kind of change could help?",
          "seconds": 90,
          "choices": [
            "Draw the same straight line in a different color.",
            "Use a model that can make a curved or more complex boundary.",
            "Repeat the same straight-line attempt and assume geometry will change.",
            "Rename the two classes without moving any points."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f9f"
        },
        {
          "id": "L06-C05",
          "core": true,
          "type": "MCQ",
          "slide": "distance",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point lies very close to a classifier’s dividing line. What could a small change to that point’s measured features do?",
          "seconds": 90,
          "choices": [
            "Guarantee that its class prediction stays the same.",
            "Remove the need for a dividing line.",
            "Move it across the line and change its predicted class.",
            "Force every other point to change class too."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fa4"
        },
        {
          "id": "L06-C06",
          "core": true,
          "type": "MCQ",
          "slide": "soft-margin",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Why does a soft-margin SVM allow some training points to violate the margin?",
          "seconds": 90,
          "choices": [
            "Its goal is to misclassify every point.",
            "Real data may overlap or contain noise, so a perfect separation can be too rigid.",
            "It ignores all training labels.",
            "Allowing a violation guarantees perfect predictions on future data."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fa9"
        },
        {
          "id": "L06-O01",
          "core": false,
          "type": "MCQ",
          "slide": "hinge",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "For an SVM, can a correctly classified point still lie too close to the boundary to satisfy the desired margin?",
          "seconds": 90,
          "choices": [
            "Yes. A point can be on the correct side but still inside the margin.",
            "No. Every correct prediction must be far from the boundary.",
            "No. Only misclassified points have a distance to the boundary.",
            "Yes, but only when the model has no features."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f241330a"
        }
      ]
    },
    {
      "pack": "14_Classification_Part_4",
      "eventCode": "LQCRNNR",
      "questions": [
        {
          "id": "L06-C07",
          "core": true,
          "type": "MCQ",
          "slide": "lift-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Points near the center belong to one class; points in a surrounding ring belong to another. Which extra feature could help describe this pattern?",
          "seconds": 90,
          "choices": [
            "The order in which the points were typed into the file.",
            "Distance from the center.",
            "A random name assigned to each point.",
            "The color used to draw the page background."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fae"
        },
        {
          "id": "L06-C08",
          "core": true,
          "type": "MCQ",
          "slide": "kernel-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "What is the main benefit of a kernel in the SVM examples?",
          "seconds": 90,
          "choices": [
            "It guarantees that no training data are needed.",
            "It guarantees that every training fit will work on new data.",
            "It helps the model represent more complex boundaries through suitable similarity calculations.",
            "It turns every class label into a measured distance."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fb3"
        },
        {
          "id": "L06-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "An SVM gets every training example right. What would you check before trusting it on new examples?",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fb8"
        },
        {
          "id": "L06-O02",
          "core": false,
          "type": "MCQ",
          "slide": "dual",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why are support vectors important in an SVM?",
          "seconds": 90,
          "choices": [
            "They are new test points that supply the correct answer.",
            "They are arbitrary names assigned to the classes.",
            "They are training points that help determine the fitted boundary.",
            "They are the axes used to draw every plot."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f241330f"
        },
        {
          "id": "L06-O03",
          "core": false,
          "type": "MCQ",
          "slide": "valid-kernel",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why should we compare a flexible kernel model with a simpler model on validation data?",
          "seconds": 90,
          "choices": [
            "Extra flexibility can fit training details that do not help on new cases.",
            "A more flexible model is always better on every dataset.",
            "Validation removes the need to train either model.",
            "A simpler model cannot make any correct predictions."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f2413314"
        }
      ]
    },
    {
      "pack": "15_Clustering_Part_1",
      "eventCode": "IZOXLUG",
      "questions": [
        {
          "id": "L07-C01",
          "core": true,
          "type": "MCQ",
          "slide": "unlabeled",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "You have a folder of unlabeled photos and want to group similar ones. Which information is missing compared with supervised classification?",
          "seconds": 90,
          "choices": [
            "The photos themselves.",
            "Every possible similarity between photos.",
            "The correct category label for each training photo.",
            "The ability to store photos on a computer."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b5d"
        },
        {
          "id": "L07-C02",
          "core": true,
          "type": "MCQ",
          "slide": "kmeans-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Three points lie at positions 0, 2 and 4 on a line. Where is their average position?",
          "seconds": 60,
          "choices": [
            "2.",
            "0.",
            "4.",
            "6."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b62"
        },
        {
          "id": "L07-C03",
          "core": true,
          "type": "MCQ",
          "slide": "choose-k",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You group 20 photos. If you put each photo in its own group, have you necessarily found a useful summary?",
          "seconds": 90,
          "choices": [
            "Yes. More groups always make a better summary.",
            "No. Twenty separate groups may tell us little about shared patterns.",
            "Yes. One-photo groups prove there are exactly 20 natural categories.",
            "No. A group is never allowed to contain only one photo."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b67"
        },
        {
          "id": "L07-C04",
          "core": true,
          "type": "MCQ",
          "slide": "silhouette-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point is close to others in its own group and far from other groups. Does it appear well placed?",
          "seconds": 90,
          "choices": [
            "No. A good grouping requires it to be far from its own group.",
            "No. Every point must be equally close to all groups.",
            "We can conclude its group is certainly a real-world category.",
            "Yes. Its own group seems a better geometric match."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b6c"
        },
        {
          "id": "L07-C05",
          "core": true,
          "type": "MCQ",
          "slide": "gmm-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point sits between two overlapping groups. What could a soft assignment say?",
          "seconds": 90,
          "choices": [
            "The point has some membership probability in each group.",
            "The point must belong to neither group because groups overlap.",
            "Every point must have exactly the same membership probabilities.",
            "The groups must immediately be given known ground-truth labels."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b71"
        },
        {
          "id": "L07-C06",
          "core": true,
          "type": "MCQ",
          "slide": "em-limits",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A fitting method stops because its result is no longer changing much. Does this prove it found the best possible result?",
          "seconds": 90,
          "choices": [
            "Yes. Stopping always proves a global best solution.",
            "No. A different starting point might lead to a better result.",
            "Yes. Any unchanged result must match the real-world categories.",
            "No. A fitting method is never allowed to stop."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b76"
        },
        {
          "id": "L07-O01",
          "core": false,
          "type": "MCQ",
          "slide": "update",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "What does a K-means centroid represent?",
          "seconds": 90,
          "choices": [
            "Always the very first point in the file.",
            "The number of labels supplied by a teacher.",
            "A point that must be outside every cluster.",
            "The average location of the points assigned to a nonempty cluster."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa117"
        }
      ]
    },
    {
      "pack": "16_Clustering_Part_2",
      "eventCode": "IZOXLUG",
      "questions": [
        {
          "id": "L07-C07",
          "core": true,
          "type": "MCQ",
          "slide": "hierarchy-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A grouping method starts with each point alone and repeatedly joins the closest groups. What does it build?",
          "seconds": 90,
          "choices": [
            "A list of known correct class labels.",
            "A hierarchy of groups, from smaller groups to larger ones.",
            "A rule that never changes the number of groups.",
            "A model that must predict a numeric target."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b7b"
        },
        {
          "id": "L07-C08",
          "core": true,
          "type": "MCQ",
          "slide": "pca-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A cloud of points is stretched along a diagonal. Which line would usually preserve more of its spread when the points are projected onto it?",
          "seconds": 90,
          "choices": [
            "A line following the cloud’s long direction.",
            "A line across the cloud’s narrow direction.",
            "Any line: the direction never matters.",
            "A line chosen only from the points’ row numbers."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b80"
        },
        {
          "id": "L07-C09",
          "core": true,
          "type": "MCQ",
          "slide": "scaling",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Why can feature scaling matter before clustering?",
          "seconds": 90,
          "choices": [
            "Scaling supplies the missing correct class labels.",
            "A feature with much larger numerical values can dominate the distance calculation.",
            "Scaling guarantees that every group has a real-world meaning.",
            "Distances are always unchanged when just one feature is rescaled."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b85"
        },
        {
          "id": "L07-C10",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "In one sentence, explain one reason why a clustering result should be interpreted rather than automatically accepted as the truth.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b8a"
        },
        {
          "id": "L07-O02",
          "core": false,
          "type": "MCQ",
          "slide": "reconstruct",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "PCA keeps only a few directions from a dataset with many features. What is a possible tradeoff?",
          "seconds": 90,
          "choices": [
            "Guaranteed perfect reconstruction using any number of directions.",
            "New correct class labels are automatically created.",
            "Every discarded detail is proved irrelevant to every task.",
            "A simpler representation, with some information lost."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa11c"
        },
        {
          "id": "L07-O03",
          "core": false,
          "type": "MCQ",
          "slide": "hierarchy-limits",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a clustering tree, two observations join together early, at a small merge distance. What does that suggest under the chosen method?",
          "seconds": 90,
          "choices": [
            "They have been proved to share a known class label.",
            "They are necessarily the most different observations.",
            "Their row numbers must be consecutive.",
            "The method regards them as relatively similar."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa121"
        }
      ]
    }
  ]
};
