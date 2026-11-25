(() => {
  const activeExample = new URLSearchParams(location.search).get('example');
  if (activeExample && document.body.hasAttribute('data-clustering-deck')) {
    const slides = document.querySelectorAll('.reveal .slides > section');
    const focus = Array.from(slides).find(slide => slide.id === activeExample && slide.querySelector('.rg-widget'));
    if (focus) {
      document.body.classList.add('single-clustering-example');
      focus.parentElement.dataset.wooclapMounted = 'true';
      for (const slide of slides) if (slide !== focus) slide.remove();
    }
  }

  for (const example of document.querySelectorAll('.lesson-example')) {
    const control = example.querySelector('[data-choice]');
    const output = example.querySelector('[data-choice-output]');
    const previous = example.querySelector('[data-prev]');
    const next = example.querySelector('[data-next]');
    const views = Array.from(example.querySelectorAll('[data-view]'));

    function show(index) {
      control.value = index;
      views.forEach((panel, i) => { panel.hidden = i !== index; });
      if (output) {
        output.textContent = views[index].dataset.value;
        control.setAttribute('aria-valuetext', views[index].dataset.value);
      }
      previous.disabled = index === 0;
      next.disabled = index === views.length - 1;
    }

    control.addEventListener('input', () => show(Number(control.value)));
    previous.addEventListener('click', () => show(Number(control.value) - 1));
    next.addEventListener('click', () => show(Number(control.value) + 1));
    show(0);
  }

  for (const button of document.querySelectorAll('[data-show-lab]')) {
    button.addEventListener('click', () => {
      const panel = button.parentElement;
      const frame = document.createElement('iframe');
      frame.title = panel.closest('section').querySelector('h2').textContent;
      frame.src = button.dataset.src;
      panel.append(frame);
      panel.classList.add('has-live-example');
      button.remove();
    }, { once: true });
  }
})();
