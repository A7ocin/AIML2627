# AIML · Constraint Satisfaction Problems

The active decks are `AIML/05_Constraints_Part_1/index.html` and `AIML/06_Constraints_Part_2/index.html`, each with a companion `handout.html`. Open either in Chrome or Edge; the included assets allow examples to work from disk. The packs contain 37 and 41 source slides, plus six and three inserted Wooclap questions: 43 and 44 rendered slides.

Arrow keys and bottom navigation move between slides; Escape opens the overview. Playback pauses when leaving a lab, opening the overview or hiding the browser tab.

| Pack | Stable slide ID | Interactive example |
| --- | --- | --- |
| 5 | `assignment-lab` | Set or clear values; distinguish true, false and pending rules |
| 5 | `dfs-lab` | Follow the original course DFS tree and inspect contexts |
| 5 | `support` | Remove partners and observe the loss of the last support |
| 5 | `gac-lab` | Inspect domains, supports and the changing worklist |
| 6 | `split-lab` | Follow propagation and branching for three CSP examples |
| 6 | `improvement` | Escape a coloring plateau through a sideways move |
| 6 | `local-lab` | Compare strict improvement, sampling, walk, tabu and annealing |
| 6 | `anneal-lab` | Change score difference, temperature and test draw |

All twelve examples are embedded in handout chapters, with static print previews. The local-search lab uses reproducible seeded runs and a 40-step budget. An unsuccessful run does not prove that no solution exists.

## Editing

Edit the active pack HTML files directly and retain stable IDs for handouts, navigation and quiz placements. Revise each matching handout chapter and supporting excerpt together. Update embedded lab titles in `data-title`, visible headings, poster descriptions and the encoded `.lab-source` documents.

Shared layouts live in `css/theme-base.css`, `css/search.css`, `css/csp.css`, `css/clarity.css` and `css/math-definitions.css`. Algorithms are in `js/csp-engine.js`; full labs use `js/visuals.js` and `js/widgets.js`. The focused support and plateau experiments use `js/clarity-widgets.js`. Refresh asset cache-version queries when shared assets change. Update source hashes in `AIML/wooclap/validation.json`; content edits alone do not require quiz-bank changes.

`tools/build-deck.py`, `notes/` and `_review/` describe the earlier combined 38-slide lecture. They are historical material, not the authoring source for the two split packs. The legacy builder does not update the active packs.

## Verification

Run `node tests/engine.test.js` for algorithm checks. Review every rendered slide in a browser for clipping, and exercise controls through their actual UI. Check handout embeds, chapter links and navigation. `js/source-tree.js` retains the original tree as a regression fixture and is not loaded by the presentation.

Primary reference: [AIML Lesson 02 · Constraint Satisfaction Problems](https://www.aretor.it/courses/aiml2526/lessons/02_constraint/). The packs preserve its course CSP and algorithm sequence while adding clearer illustrations and precise statements of what each method establishes.

## Course mathematics

The definition slides now follow the primary lesson more closely: assignment restriction, the evaluation function, the CSP tuple and solution predicate, context evaluability and the checked set, the bipartite network, quantified arc consistency, GAC retention and requeueing, domain partitions, the consistency solver, local-search controls, conflict scoring and Gibbs acceptance. The handouts give the full meanings and worked examples. There are 34 and 39 reading chapters.

Part 2 opens with six short recap slides before its roadmap: `recap-model`, `recap-logic`, `recap-assignments`, `recap-methods`, `recap-support` and `recap-handoff`. They reuse the course's three-variable CSP to recall terminology, distinguish assignments from solutions, compare Part 1 methods, explain support/GAC and recover the filtered domains before domain splitting. The matching handout chapters follow the same order. Existing slide and question IDs remain stable.

The course-flow review adds explicit introductions to consistency algorithms (`consistency-algorithms`) and local-search neighborhoods (`local-neighborhood`). Handout reading routes connect DFS to filtering, GAC to splitting, and the generic local-search loop to sampling, walk, improvement and annealing. Keep these transitions synchronized when editing. Legacy lesson citations and section numbers were removed from the active slides and handouts on 2026-10-20; keep the student materials self-contained.

The GAC worklist uses `E`, matching the original course. `E₀` denotes the fixed full network edge set, and `E` begins as a copy of it. Local search consistently uses `h(a)` for the conflict score and `Δh` for its change, following the original lesson. The slides, handouts and widgets use these same labels; `E` remains the GAC worklist. Acceptance probability is `p`.

The Part 2 local-search sequence is: generic search, random sampling, random walk, iterative best improvement (IBI), and simulated annealing. `local-methods` gives the reading map; `random` and `random-walk` separate the two random policies; `ibi-best` names and explains IBI; `tabu` introduces its memory variant before `improvement` demonstrates a plateau and `escaping` explains random restarts/steps. Matching handout chapters and contents use the same method names and order.

Both packs explicitly introduce ∧ (AND/conjunction) and inclusive ∨ (OR/disjunction) in `logic-connectives` and `recap-logic`. The handouts include truth tables, grouped formulas and the distinction from set union/intersection. The course CSP is a conjunction; OR illustrates alternatives within a rule and the X₂ branches after propagation. Preserve the three original constraints and the distinction between pending and false.

`gac-introduction` now introduces the full name, purpose and support example for generalized arc consistency before the network diagram in Part 1. The handout distinguishes the consistency property from its filtering algorithm; Part 2 names and explains GAC at its first recap mention.

The GAC section follows: overview → network → support/property → notation (`gac-notation`) → numbered pseudocode and flow (`gac`) → interactive lab → lost-support example → rechecking formula → outcomes. Keep `E`, `E₀`, `N_X`, `X`/`x`, `c`/`c′` and `Z` consistent in both packs and handouts. The source uses E for both the initial edges and pending checks; the subscript 0 distinguishes those roles without introducing a second worklist name.

The GAC widget compares dom(X) before a revision with the retained set N_X; its network shows the updated domains. After a deletion, the instantiated E union update appears and affected work items are labelled Added now or Already pending, without duplicates. These displays use existing trace snapshots; the algorithm is unchanged. Static handout previews and live embeds show the same controls.

`why-local-search` introduces the size of the assignment space and the efficiency/completeness trade-off before `local-intro` in Part 2. It distinguishes the finite worked examples from possible infinite-domain CSPs.

Part 2 ends each of the five local-search topics with the same coloring lab: `generic-lab`, `sampling-lab`, `walk-lab`, `ibi-lab`, and `local-lab` (annealing plus final comparison). Presets use data-policy, data-policies, data-start and data-seed. Generic search demonstrates guided repairs from All red; method-specific copies hide untaught policies. Tabu uses the simple last-two-variables rule without aspiration. Sampling probability calculations, Gibbs normalization/Metropolis derivations and convergence discussion have been removed; the core score, control functions and annealing acceptance formula remain.

Slide `conflicts` uses full-width rows for the complete conjunction and the concrete coloring assignment. Do not reintroduce `E(a)`/`ΔE` aliases in local-search teaching materials or static previews.

`local-controls` was merged into `local-loop` on 2026-10-20. The 16-line General local search algorithm follows the supplied original pseudocode. Its comments reveal one line at a time via local-search-code.js/css, in both slide and handout; printing shows every comment. Keep `stop()` (one attempt) distinct from `terminate()` (whole search). The symbol key explains quantifiers, evaluation, value lookup and assignment syntax.

`consistency-solver` (Part 2 slide 11) uses the same line-by-line reading component as `local-loop`, with 15 lines using the full original variable/constraint notation, a domain/worklist/solution-set key and synchronized handout comments. Counts and quiz placements are unchanged.

The consistency solver explicitly uses `Con_Solve(𝓧,𝓒,E)`, `GAC(𝓧,𝓒,E)`, quantified base cases, the singleton solution-set comprehension, both branch-domain definitions, the affected-edge set and `𝓧[domⱼ]` recursive calls. Its handout explains how this full signature relates to Part 1’s domain-argument shorthand.

Part 2 excludes `L02-C07` (the annealing-probability question) from its rendered deck through `data-wooclap-exclude`; its reusable question-bank and live event entry remain available. The annealing introduction explicitly distinguishes the same proposed score increase from the acceptance/rejection decision.

Part 2 also excludes `L02-O03`, the strict-improvement/plateau question formerly displayed on slide 36. The next slide is now the annealing/comparison coloring lab.
