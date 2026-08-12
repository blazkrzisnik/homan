// Nav toggle (mobile)
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Scroll reveal
const revealEls = document.querySelectorAll('section > .container, section > div');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Menu category tabs (works on meni.html once menu.js renders items with data-cat)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-tab');
  if (!btn) return;
  document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.cat;
  document.querySelectorAll('[data-menu-cat]').forEach(row => {
    row.style.display = row.dataset.menuCat === cat ? '' : 'none';
  });
});
