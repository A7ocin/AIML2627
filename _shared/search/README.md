# Lesson 1 — Search Algorithms

Open [index.html](index.html) in Chrome, Edge or another modern browser. The complete presentation, including every search simulation, works offline. Keep this folder intact when copying it.

The 43 slides follow the course lesson and use the reviewed history deck's theme. There are nine interactive labs: the original six algorithm examples, lowest-cost-first, a four-method comparison on a weighted tree, and depth-first branch-and-bound.

## Presenting

- Use the arrow keys or the bottom navigation buttons to change slides. **Overview** opens the slide grid.
- In a lab, **Next** performs one search step. **Back** restores the previous state, including the frontier, costs, depth limit and best solution.
- **Play** runs the simulation; the same button pauses it. Leaving a slide pauses its simulation.
- **Reset** restarts using the current settings. Speed controls playback only.
- BFS, DFS and IDS allow alternate goals. The weighted comparison allows algorithm selection. A* can use `h = 0`. Branch-and-bound has an initial bound control.
- While a lab control has focus, left/right arrows step the lab rather than changing slides. Click outside the controls or use the bottom navigation to resume slide navigation. Select boxes retain their native keyboard behavior.

The gallery and PDF in [_review](./_review/index.html) contain static snapshots of the labs. Present from the HTML file to keep the controls interactive.

## Notes and editing

- [Slide notes](notes/slide-notes.md): explanations, assumptions and teaching prompts.
- [Source mapping and corrections](notes/source-mapping.md): coverage of the original resource and all material changes.
- `index.html`: slide text and structure.
- `css/theme-base.css`: theme copied from the approved history deck.
- `css/search.css`: search-specific layouts and widget styling.
- `js/source-tree.js`: original course widget tree, heuristics and edge costs.
- `js/search-engine.js`: pure algorithm logic.
- `js/widgets.js`: controls and state displays.
- `js/visuals.js`: native SVG diagrams.

`tools/build-deck.py` regenerates the HTML and slide notes from their editable source. If you edit the HTML directly, incorporate those changes into the builder before running it again.

## Verification

From this directory, run `node tests/engine.test.js` to check algorithm behavior. `node tests/render-review.js` renders the slides and checks all simulation states, alternate settings, navigation and controls. The renderer uses the Puppeteer/Chrome installation already available on the authoring machine; adjust its two executable/module paths on another machine. Rendering dependencies are not required to present the deck.

The visualization stores snapshots and full paths to support rewind. Its memory use is therefore larger than the asymptotic frontier bounds described in the teaching slides. It is a teaching tool for the supplied small graphs, not a production search library.
