// Simple interactivity for demo
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle active chips/pills
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.classList.contains('chip')) {
      t.closest('.chip-row')?.querySelectorAll('.chip').forEach((el) => el.classList.remove('is-active'));
      t.classList.add('is-active');
    }
    if (t.classList.contains('pill')) {
      t.closest('.pill-row')?.querySelectorAll('.pill').forEach((el) => el.classList.remove('is-active'));
      t.classList.add('is-active');
    }
  });
})();


