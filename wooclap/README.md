# Wooclap questions for the 16-lecture course

[Instructor guide](instructor-guide.html) · [Course structure](../course-structure.md)

The 92 introductory undergraduate questions (68 core, 24 optional) are distributed across the 16 lecture parts. The question bank is the editable source. Each part has core and optional Excel workbooks linked in the guide.

The eight existing live events are reused. **Do not re-import into those events**: the slide decks open existing questions. Stable question IDs retain the original L00–L07 prefixes; use the guide for their original lecture placement. New workbooks are for fresh events or future reuse. Older eight-pack imports are retained under legacy-imports for compatibility.

History Part 2 has presentation overrides in [concept-navigation.js](../02_History_Part_2/concept-navigation.js): `L00-C07` opens the replacement question `6ab4e526d75f73dfb39db42a`, and `L00-O01`, `L00-O02`, `L00-O03` appear together after `part-takeaways` (the former slide 58). The Part 1 copies remain available there. The replacement keeps its live URL while its slide preview uses the current prompt from the question bank. The question bank, guide and import workbooks retain the source prompt and placements; these deck overrides survive regeneration of the shared question data. With the two Jev slides, the replacement is slide 58, wrap-up is 59, and optional questions are 60–62.

Regenerate the guide, imports, placement map and slide prompts with `python tools/build.py --course-root ..` from this folder (requires openpyxl and beautifulsoup4). Use the guide's **Print / save PDF** control when a local PDF is needed; generated PDFs are ignored by Git.

Before-topic questions invite intuitive predictions; do not grade students on material not yet introduced. Optional questions are short extensions. Suggested timings include a debrief and are not automatic Wooclap timers.

Search Part 1's teaching sequence is adjusted in [the search navigation script](../_shared/search/js/concept-navigation.js): the BFS, DFS and lowest-cost-first prediction questions precede their rule introductions, and the iterative-deepening check follows its lab, before the repeated-work calculation. These presentation placements override the original placements in the import guide.
