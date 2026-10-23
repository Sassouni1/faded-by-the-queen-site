const moreRatesButton = document.querySelector('.rates-more');
const rateCards = [...document.querySelectorAll('.rate-card')];

moreRatesButton?.addEventListener('click', () => {
  const expanded = moreRatesButton.getAttribute('aria-expanded') === 'true';
  rateCards.slice(12).forEach((card) => {
    card.hidden = expanded;
  });
  moreRatesButton.setAttribute('aria-expanded', String(!expanded));
  moreRatesButton.textContent = expanded ? 'See More' : 'Show Less';

  if (expanded) {
    document.querySelector('#rates')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
