(() => {
  const grids = [...document.querySelectorAll('.work-grid, .tiktok-grid')];
  const dialog = document.querySelector('.work-lightbox');
  if (!grids.length || !dialog) return;

  let photos = [];
  const enlarged = dialog.querySelector('img');
  const video = dialog.querySelector('iframe');
  const close = dialog.querySelector('.work-lightbox-close');
  let current = 0;

  function show(index) {
    current = (index + photos.length) % photos.length;
    const item = photos[current];
    const reelId = item.dataset.reel;
    const tiktokId = item.dataset.tiktok;
    video.removeAttribute('src');
    enlarged.removeAttribute('src');
    dialog.classList.toggle('is-reel', Boolean(reelId || tiktokId));
    video.hidden = !reelId && !tiktokId;
    enlarged.hidden = Boolean(reelId || tiktokId);
    if (tiktokId) {
      video.title = item.getAttribute('aria-label');
      video.src = `https://www.tiktok.com/player/v1/${tiktokId}?music_info=1&description=1`;
    } else if (reelId) {
      video.title = item.getAttribute('aria-label');
      video.src = `https://www.instagram.com/reel/${reelId}/embed/`;
    } else {
      enlarged.src = item.href;
      enlarged.alt = item.querySelector('img').alt;
    }
  }

  grids.forEach((grid) => {
    grid.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link || !grid.contains(link)) return;
      event.preventDefault();
      photos = [...grid.querySelectorAll('a[href]')];
      show(photos.indexOf(link));
      dialog.showModal();
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.querySelector('.work-lightbox-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.work-lightbox-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  dialog.addEventListener('close', () => {
    enlarged.removeAttribute('src');
    video.removeAttribute('src');
  });
})();
