# Clustering — final review

Reviewed 12 September 2026.

The final lecture contains 54 slides and 14 interactive sections. All eight original chart resources are included, with all five source K-means animation frames and all four preprocessing views. Six added experiments use the original course observations. No images or videos are embedded in the source lecture; the deck uses data graphics and newly authored SVG diagrams.

## Visual and browser review

- Rendered and visually reviewed every slide. Numbered PNGs, 14 contact sheets and the preview gallery record the final layout.
- Checked the complete deck at 1920×1080, 1440×900 and 1280×720. No reported overlap, clipping, overflow or responsive-layout issues.
- Checked 395 interactive configurations and 22 control groups: all original animation frames, every added K-means state, every EM iteration, all four linkage methods, PCA angles and projection visibility, and all preprocessing views.
- Exercised actual pointer zoom and reset on every chart, pan mode, keyboard sliders, playback/pause/reset, pause on slide exit, legends, point tooltips, keyboard slide navigation and direct slide links.
- Verified original displayed coordinates against the local source JSON in every original chart, all five frames and each preprocessing view.
- No browser errors or attempted external requests in the full audit. The HTML presentation works offline.
- Improved source animation contrast, initial K-means demonstration, PCA plot framing and covariance captions. A final targeted review checked all four preprocessing captions, refreshed seven representative alternate-state images, confirmed chart tips are disabled, and regenerated the PDF without browser or network errors.

## Numerical review

The JavaScript engine passed 274,266 numeric assertions. These include 2,160 silhouette comparisons against scikit-learn, 9,840 responsibility vectors against SciPy-based calculations, PCA variance and orthogonality checks over 543 directions/datasets, all 79 K-means states, and independent distance checks for four hierarchies. Counts of assertions include repeated arithmetic invariants and should not be read as independent experiments.

All nine added K-means endpoints match independently fitted Lloyd KMeans objectives from the same initial centers. The displayed regularized EM trace has nondecreasing observed-data log likelihood. Source coordinates remain exact; the dark theme changes presentation only.

## Artifacts and limits

`audit.json` records the full browser run; `final-visual-audit.json` records the final caption and export check; `engine-audit.json` records numerical verification. Additional provenance and conceptual corrections are in `../notes/source-map.md`.

`AIML-Clustering-reviewed.pdf` contains all 54 slides as a static handout. Use `../index.html` for interactive controls. Added model fits demonstrate the algorithms; their training metrics are not independent validation results.
