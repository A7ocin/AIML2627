(() => {
  'use strict';
  const moved = new Set([
    "answers",
    "circle-lab",
    "dual",
    "feature-explosion",
    "feature-map",
    "kernel-cost",
    "kernel-families",
    "kernel-identity",
    "kernel-lab",
    "kernel-prediction",
    "lagrangian",
    "lift-lab",
    "mapped-primal",
    "mapping-limits",
    "practice",
    "stationarity",
    "summary",
    "svm-lab",
    "valid-kernel",
    "wooclap-L06-C07",
    "wooclap-L06-C08",
    "wooclap-L06-C09",
    "wooclap-L06-O02",
    "wooclap-L06-O03",
    "dual-dot-expansion",
    "solve-toy-dual",
    "stationarity-example",
    "kernel-score-example",
    "signed-margin-example",
    "margin-objective-example",
    "workflow"
]);
  const removedTopics = {
    'kernel-prediction': 'kernel-replacement',
    'wooclap-L06-C08': 'kernel-replacement',
    'signed-margin-example': 'mapped-primal',
    'margin-objective-example': 'mapped-primal',
    'stationarity-example': 'stationarity',
    'dual-dot-expansion': 'dual',
    'solve-toy-dual': 'dual',
    'kernel-score-example': 'kernel-replacement',
    'workflow': 'summary',
    'wooclap-L06-O03': 'summary',
    'kernel-identity': 'kernel-replacement',
    'kernel-lab': 'kernel-replacement',
    'kernel-families': 'kernel-replacement',
    'valid-kernel': 'kernel-replacement',
    'kernel-cost': 'kernel-replacement',
    'svm-lab': 'summary',
  };
  function followMovedTopic() {
    const anchor = location.hash.replace(/^#(?:\/|chapter-)?/, '');
    if (!moved.has(anchor)) return;
    const alreadyInPart5 = location.pathname.includes('/15_Classification_Part_5/');
    if (alreadyInPart5 && !Object.hasOwn(removedTopics, anchor)) return;
    const file = location.pathname.endsWith('/handout.html') ? 'handout.html' : 'index.html';
    const prefix = location.hash.startsWith('#chapter-') ? '#chapter-' : '#/';
    const destination = removedTopics[anchor] || anchor;
    location.replace('../15_Classification_Part_5/' + file + location.search + prefix + destination);
  }
  followMovedTopic();
  addEventListener('hashchange', followMovedTopic);
})();
