(() => {
  const cards = [...document.querySelectorAll('.project-card')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setPanelState = (card, open) => {
    const trigger = card.querySelector('.project-trigger');
    const panel = card.querySelector('.project-links');
    card.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.hidden = false;
    } else {
      const finish = () => {
        if (!card.classList.contains('is-open')) panel.hidden = true;
      };
      panel.addEventListener('transitionend', finish, { once: true });
      if (reducedMotion) finish();
    }
  };

  cards.forEach((card) => {
    const trigger = card.querySelector('.project-trigger');
    trigger.addEventListener('click', () => {
      setPanelState(card, !card.classList.contains('is-open'));
    });
  });

  document.querySelectorAll('.destination-icon img').forEach((image) => {
    image.addEventListener('error', () => image.parentElement.classList.add('is-fallback'), { once: true });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }
})();
