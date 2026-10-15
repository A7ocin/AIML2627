# AIML · Constraint Satisfaction Problems

The active decks are `AIML/05_Constraints_Part_1/index.html` and `AIML/06_Constraints_Part_2/index.html`, each with a companion `handout.html`. Open either in Chrome or Edge; the included assets allow examples to work from disk. The packs contain 24 and 21 source slides, plus six and five inserted Wooclap questions: 30 and 26 rendered slides.

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

All eight examples are embedded in handout chapters, with static print previews. The local-search lab uses reproducible seeded runs and a 40-step budget. An unsuccessful run does not prove that no solution exists.

## Editing

Edit the active pack HTML files directly and retain stable IDs for handouts, navigation and quiz placements. Revise each matching handout chapter and supporting excerpt together. Update embedded lab titles in `data-title`, visible headings, poster descriptions and the encoded `.lab-source` documents.

Shared layouts live in `css/theme-base.css`, `css/search.css`, `css/csp.css` and `css/clarity.css`. Algorithms are in `js/csp-engine.js`; full labs use `js/visuals.js` and `js/widgets.js`. The focused support and plateau experiments use `js/clarity-widgets.js`. Refresh asset cache-version queries when shared assets change. Update source hashes in `AIML/wooclap/validation.json`; content edits alone do not require quiz-bank changes.

`tools/build-deck.py`, `notes/` and `_review/` describe the earlier combined 38-slide lecture. They are historical material, not the authoring source for the two split packs. The legacy builder does not update the active packs.

## Verification

Run `node tests/engine.test.js` for algorithm checks. Review every rendered slide in a browser for clipping, and exercise controls through their actual UI. Check handout embeds, chapter links and navigation. `js/source-tree.js` retains the original tree as a regression fixture and is not loaded by the presentation.

Primary reference: [AIML Lesson 02 · Constraint Satisfaction Problems](https://www.aretor.it/courses/aiml2526/lessons/02_constraint/). The packs preserve its course CSP and algorithm sequence while adding clearer illustrations and precise statements of what each method establishes.
