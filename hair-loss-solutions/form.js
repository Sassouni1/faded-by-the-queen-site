(() => {
  const modal = document.querySelector('#lead-modal');
  const form = document.querySelector('#consultation-form');
  const status = document.querySelector('#form-status');
  const triggers = document.querySelectorAll('a[href="#contact"]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const businessNumber = '+17042912784';
  let lastTrigger = null;

  if (!modal || !form || !status) return;

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
    form.elements.firstName.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    openModal(trigger);
  }));

  closeButtons.forEach(button => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      status.textContent = 'Please enter your phone number and email address.';
      return;
    }

    const data = new FormData(form);
    const message = [
      "New Faded By the Queen hair system consultation request",
      data.get('firstName') ? `Name: ${data.get('firstName')}` : '',
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      'Request: Hair consultation ($25)'
    ].filter(Boolean).join('\n');

    status.textContent = "Opening your pre-filled text message to Faded By the Queen…";
    window.location.href = `sms:${businessNumber}?&body=${encodeURIComponent(message)}`;
  });
})();
