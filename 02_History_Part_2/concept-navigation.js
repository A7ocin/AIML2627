/* Stable bookmarks and question placement for the expanded History Part 2. */
(() => {
  'use strict';
  const originalSlides = ["part-cover", "part-roadmap", "div-era-v", "era5-stat", "winter1", "div-era-vi", "era6-stat", "experts", "fifth-gen", "div-era-vii", "era7-stat", "neocognitron", "hopfield", "backprop", "div-era-viii", "era8-stat", "winter2", "mlturn", "div-era-ix", "era9-stat", "imagenet", "alexnet", "div-era-x", "era10-stat", "alphago-transformers", "gpt3", "bitter", "chatgpt", "summary", "part-takeaways", "part-references", "course-navigation"];
  const legacy = location.hash.match(/^#\/(\d+)(\/.*)?$/);
  if (legacy && originalSlides[Number(legacy[1])]) {
    history.replaceState(null, '', '#/' + originalSlides[Number(legacy[1])] + (legacy[2] || ''));
  }
  const lecture = window.AIML_WOOCLAP?.lectures.find(item => item.pack === '02_History_Part_2');
  // Keep the supplied replacement URL while using the current bank prompt in
  // the slide preview. This lecture-specific URL survives data regeneration.
  const reflection = lecture?.questions.find(question => question.id === 'L00-C07');
  if (reflection) Object.assign(reflection, {
    src: 'https://app.wooclap.com/events/GMSPICB/questions/6ab4e526d75f73dfb39db42a',
    type: 'MCQ',
    purpose: 'Exit / synthesize the historical pattern',
    stem: 'Which sequence best captures a recurring pattern in the history of AI?',
    choices: [
      'A strong result on one benchmark proves general intelligence, so funding then rises without interruption.',
      'More computing power eventually removes the need for algorithms, data and careful evaluation.',
      'A narrow success inspires broad claims; exposed limits reduce confidence; later progress combines new methods and resources.',
      'An AI winter means research stops completely until the same system is rediscovered unchanged.',
    ],
  });
  // Reuse all three History optional questions after the wrap-up. Keep the
  // Part 1 copies available there; move Part 2's AlphaGo question to this group.
  if (lecture) {
    const optionalIds = ['L00-O01', 'L00-O02', 'L00-O03'];
    const historyQuestions = window.AIML_WOOCLAP.lectures
      .filter(item => /^0[12]_History_Part_/.test(item.pack))
      .flatMap(item => item.questions);
    const optional = optionalIds.map(id => historyQuestions.find(question => question.id === id));
    if (optional.some(question => !question)) throw new Error('Missing optional History question');
    lecture.questions = lecture.questions.filter(question => !optionalIds.includes(question.id));
    lecture.questions.push(...optional.map(question => ({ ...question, slide: 'part-takeaways', when: 'after' })));
  }
  const topicEnds = { winter2: 'gradient-remedies', 'alphago-transformers': 'alphago-search', summary: 'history-threads' };
  for (const question of lecture?.questions || []) {
    if (question.when === 'after' && topicEnds[question.slide]) question.slide = topicEnds[question.slide];
  }
})();
