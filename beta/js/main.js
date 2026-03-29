/* ============================================================
   MotoRover Beta — Global JavaScript
   ProPage.in | 2026-03-29
   Strictly: Vanilla JavaScript only, no frameworks
   ============================================================ */

(function () {
  'use strict';

  /* === THEME TOGGLE: Dark / Light mode === */
  const THEME_KEY = 'mr-theme';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    // Update all toggle button icons on the page
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      btn.setAttribute('title', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  };

  // Load saved preference; default to dark
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  // Wire up all toggle buttons (multiple may exist on a page)
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* === NAV: Scroll behaviour === */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* === NAV: Mobile hamburger === */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* === HERO: Ken Burns effect === */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    // Trigger the scale-down once page has loaded
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* === SCROLL REVEAL === */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* === TESTIMONIALS SLIDER === */
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    const track = slider.querySelector('.testimonials-track');
    const cards = slider.querySelectorAll('.testimonial-card');
    const dots  = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-btn--prev');
    const nextBtn = slider.querySelector('.slider-btn--next');

    let current = 0;
    let autoInterval;

    const goTo = (index) => {
      current = (index + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

    const resetAuto = () => {
      clearInterval(autoInterval);
      autoInterval = setInterval(() => goTo(current + 1), 5000);
    };

    if (cards.length > 1) {
      goTo(0);
      resetAuto();
    }
  }

  /* === FAQ ACCORDION === */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* === GALLERY LIGHTBOX === */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    // Create lightbox
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lb-overlay"></div>
      <div class="lb-inner">
        <button class="lb-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        <button class="lb-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="lb-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
        <img class="lb-img" src="" alt="" />
      </div>
    `;
    document.body.appendChild(lb);

    const lbImg    = lb.querySelector('.lb-img');
    const lbOverlay = lb.querySelector('.lb-overlay');
    const lbClose  = lb.querySelector('.lb-close');
    const lbPrev   = lb.querySelector('.lb-prev');
    const lbNext   = lb.querySelector('.lb-next');
    let currentIdx = 0;

    const openLb = (idx) => {
      currentIdx = idx;
      const img = galleryItems[idx].querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLb = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLb(i));
    });

    lbClose.addEventListener('click', closeLb);
    lbOverlay.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', () => openLb((currentIdx - 1 + galleryItems.length) % galleryItems.length));
    lbNext.addEventListener('click', () => openLb((currentIdx + 1) % galleryItems.length));

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openLb((currentIdx - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === 'ArrowRight') openLb((currentIdx + 1) % galleryItems.length);
    });
  }

  /* === SMOOTH SCROLL for anchor links === */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* === COUNTER ANIMATION for stats === */
  const statNumbers = document.querySelectorAll('.stat-item__number[data-count]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const start = performance.now();
          const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach(el => countObserver.observe(el));
  }

  /* === CONTACT FORM: basic validation === */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#FF5252';
        } else {
          field.style.borderColor = '';
        }
      });
      if (valid) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        // Simulate — in production connect to Formspree or email worker
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#4CAF50';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
          }, 3000);
        }, 1200);
      }
    });
  }

})();

/* === LIGHTBOX STYLES injected by JS === */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    #lightbox {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; visibility: hidden;
      transition: opacity 250ms ease, visibility 250ms ease;
    }
    #lightbox.open { opacity: 1; visibility: visible; }
    .lb-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.92);
    }
    .lb-inner {
      position: relative; z-index: 1;
      max-width: 90vw; max-height: 90vh;
      display: flex; align-items: center; justify-content: center;
    }
    .lb-img {
      max-width: 90vw; max-height: 85vh;
      object-fit: contain; border-radius: 8px;
      box-shadow: 0 8px 48px rgba(0,0,0,0.8);
    }
    .lb-close, .lb-prev, .lb-next {
      position: absolute;
      background: rgba(17,17,17,0.9);
      border: 1px solid #333;
      color: #F0EDE8;
      border-radius: 50%;
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background 150ms ease, color 150ms ease;
      font-size: 1rem;
    }
    .lb-close:hover, .lb-prev:hover, .lb-next:hover {
      background: #E05A00; border-color: #E05A00; color: #fff;
    }
    .lb-close { top: -20px; right: -20px; }
    .lb-prev  { left: -60px; top: 50%; transform: translateY(-50%); }
    .lb-next  { right: -60px; top: 50%; transform: translateY(-50%); }
    @media (max-width: 768px) {
      .lb-prev  { left: 8px; }
      .lb-next  { right: 8px; }
      .lb-close { top: 8px; right: 8px; }
    }
  `;
  document.head.appendChild(style);
})();
