/* ============================================================
   PINES ENERGY GROUP LLC - Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scrolled nav shadow -------------------------------- */
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Mobile nav toggle ---------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      // Animate hamburger bars
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  /* ---- Active nav link ------------------------------------ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Emission bars animate on scroll ------------------- */
  const bars = document.querySelectorAll('.emission-bar-fill');
  if (bars.length) {
    bars.forEach(function (bar) {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
    });
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (bar) { observer.observe(bar); });
  }

  /* ---- Contact form mock submit --------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formWrap = contactForm.closest('.contact-form-wrap');
      const success = formWrap.querySelector('.form-success');
      if (success) {
        contactForm.style.display = 'none';
        success.classList.add('show');
      }
    });
  }

  /* ---- Fade-in on scroll (light) ------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  }

})();
