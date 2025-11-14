// js/nav.js — accessible hamburger toggle (final)
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;
  const firstLink = nav.querySelector('a');

  function openNav() {
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
    if (firstLink) firstLink.focus();
    document.documentElement.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
    btn.focus();
    document.documentElement.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeNav(); else openNav();
  });

  btn.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });

  document.addEventListener('click', function (e) {
    if (btn.getAttribute('aria-expanded') === 'true') {
      const inside = nav.contains(e.target) || btn.contains(e.target);
      if (!inside) closeNav();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      nav.hidden = false;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation');
      document.documentElement.style.overflow = '';
    } else {
      nav.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation');
    }
  }, { passive: true });

  // initialize state
  if (window.innerWidth > 767) {
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'false');
  } else {
    nav.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }
});