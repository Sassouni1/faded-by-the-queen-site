(() => {
  const modal = document.querySelector('#lead-modal');
  const form = document.querySelector('#inline-qnYVwmMkihrvHnMzBMIj');
  const triggers = document.querySelectorAll('a[href="#contact"]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  let lastTrigger = null;

  if (!modal || !form) return;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  };

  const openModal = trigger => {
    lastTrigger = trigger;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    form.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    openModal(trigger);
  }));

  closeButtons.forEach(button => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

})();
