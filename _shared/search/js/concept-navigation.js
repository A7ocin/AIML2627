/* Question placement and stable bookmarks for the expanded search packs. */
(() => {
  'use strict';
  const originals = {"03_Search_Part_1": ["part-cover", "part-roadmap", "state-space", "directed-graphs", "paths-costs", "trees", "graph-versus-tree", "generic-search", "frontier", "criteria", "uninformed", "bfs", "bfs-lab", "dfs", "dfs-lab", "breadth-depth", "ids", "ids-lab", "ids-overhead", "ucs", "ucs-lab", "weighted-lab", "uninformed-summary", "part-takeaways", "part-references", "course-navigation"], "04_Search_Part_2": ["part-cover", "part-roadmap", "informed", "heuristic", "greedy", "greedy-lab", "heuristic-dfs", "heuristic-dfs-lab", "astar", "astar-scores", "astar-lab", "admissibility", "consistency", "graph-cautions", "branch-bound", "branch-bound-lab", "selection-matrix", "choose", "practice", "answers", "summary", "references", "part-takeaways", "course-navigation"]};
  const pack = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  const ids = originals[pack];
  if (!ids) return;
  const legacy = location.hash.match(/^#\/(\d+)(\/.*)?$/);
  if (legacy && ids[Number(legacy[1])]) {
    history.replaceState(null, '', '#/' + ids[Number(legacy[1])] + (legacy[2] || ''));
  }
  const ends = pack === '03_Search_Part_1'
    ? { 'graph-versus-tree': 'cycle-vs-duplicates' }
    : { 'graph-cautions': 'reopen-example', admissibility: 'astar-proof', consistency: 'consistency-monotone' };
  const lecture = window.AIML_WOOCLAP?.lectures.find(item => item.pack === pack);
  // Ask the everyday prediction questions before naming or explaining the rule.
  if (pack === '03_Search_Part_1') {
    const predictions = { 'L01-C02': 'bfs', 'L01-C03': 'dfs', 'L01-C05': 'ucs' };
    for (const question of lecture?.questions || []) {
      if (predictions[question.id]) {
        question.slide = predictions[question.id];
        question.when = 'before';
      }
      if (question.id === 'L01-C04') {
        question.slide = 'ids-lab';
        question.when = 'after';
      }
    }
  }
  for (const question of lecture?.questions || []) {
    if (question.when === 'after' && ends[question.slide]) question.slide = ends[question.slide];
  }
})();
