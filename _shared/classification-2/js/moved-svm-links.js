(() => {
  'use strict';
  const moved = new Set([
    'separators-lab', 'hyperplane', 'margin-source-lab', 'distance',
    'margin-width', 'margin-lab', 'primal', 'support-vectors', 'soft-margin', 'hinge',
    'wooclap-L06-C05', 'wooclap-L06-C06', 'wooclap-L06-O01',
  ]);
  function followMovedSlide() {
    const anchor = location.hash.replace(/^#(?:\/|chapter-)?/, '');
    if (moved.has(anchor)) {
      const file = location.pathname.endsWith('/handout.html') ? 'handout.html' : 'index.html';
      location.replace('../14_Classification_Part_4/' + file + location.search + location.hash);
    }
  }
  followMovedSlide();
  addEventListener('hashchange', followMovedSlide);
})();
