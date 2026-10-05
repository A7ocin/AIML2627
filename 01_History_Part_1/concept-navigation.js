/* Keep this lecture's original bookmarks and checks aligned with expanded topics. */
(() => {
  'use strict';
  const originalSlides = ["part-cover", "part-roadmap", "aiml", "eras", "div-era-i", "era-stat", "bayes", "linreg", "logreg", "markov", "probit", "div-era-ii", "era2-stat", "churchturing", "turochamp", "imitation", "div-era-iii", "era3-stat", "mp-neuron", "cybernetics", "hebb", "div-era-iv", "era4-stat", "logic-theorist", "dartmouth", "perceptron", "lisp-ml", "part-takeaways", "part-references", "course-navigation"];
  const legacy = location.hash.match(/^#\/(\d+)(\/.*)?$/);
  if (legacy && originalSlides[Number(legacy[1])]) {
    history.replaceState(null, '', '#/' + originalSlides[Number(legacy[1])] + (legacy[2] || ''));
  }
  const lecture = window.AIML_WOOCLAP?.lectures.find(item => item.pack === '01_History_Part_1');
  const topicEnds = { imitation: 'behavior-evaluation', perceptron: 'perceptron-boundary', logreg: 'logistic-probability' };
  for (const question of lecture?.questions || []) {
    if (question.when === 'after' && topicEnds[question.slide]) question.slide = topicEnds[question.slide];
  }
})();
