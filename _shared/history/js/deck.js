/* Deck initialization — AIML course, Lesson 0: History of AI */
const MAIN_SLIDE_COUNT = document.querySelectorAll('.reveal .slides > section').length;

// Keep the chapter label outside the centered content area.
document.querySelectorAll('.reveal .slides > section').forEach(section => {
  const body = document.createElement('div');
  body.className = 'slide-body';
  [...section.childNodes].forEach(node => {
    if (!(node.nodeType === 1 && node.classList.contains('kicker'))) body.appendChild(node);
  });
  section.appendChild(body);
});

Reveal.initialize({
  width: 1920,
  height: 1080,
  margin: 0.04,
  hash: true,
  controls: false,
  progress: true,          // native progress bar (bottom)
  center: false,
  slideNumber: 'c/t',
  transition: 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: 'fade',
});

/* Custom bottom-left lesson tag + chapter indicator */
(() => {
  const tag = document.createElement('div');
  tag.className = 'lesson-tag';
  tag.innerHTML = 'AIML · Lesson 0 — History of AI';
  document.body.appendChild(tag);
})();
