/**
 * Main JavaScript - Progressive Enhancements
 * Mobile navigation, FAQ accordion, lightbox, etc.
 */

(function() {
  'use strict';

  // Mobile Navigation Toggle
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (!navToggle || !nav) {
      return;
    }
    
    navToggle.addEventListener('click', function() {
      const isExpanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', !isExpanded);
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        nav.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close nav on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.getAttribute('aria-expanded') === 'true') {
        nav.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // FAQ Accordion Enhancement (for browsers that don't support <details> well)
  function initFAQAccordion() {
    const faqs = document.querySelectorAll('.faq');
    
    faqs.forEach(function(faq) {
      const summary = faq.querySelector('.faq__question');
      
      if (!summary || faq.tagName === 'DETAILS') {
        return; // Native <details> support
      }
      
      // Enhance non-details FAQ items
      summary.setAttribute('role', 'button');
      summary.setAttribute('aria-expanded', 'false');
      
      summary.addEventListener('click', function(event) {
        event.preventDefault();
        const isExpanded = summary.getAttribute('aria-expanded') === 'true';
        const answer = faq.querySelector('.faq__answer');
        
        if (isExpanded) {
          summary.setAttribute('aria-expanded', 'false');
          if (answer) {
            answer.style.display = 'none';
          }
          faq.classList.remove('faq--open');
        } else {
          summary.setAttribute('aria-expanded', 'true');
          if (answer) {
            answer.style.display = 'block';
          }
          faq.classList.add('faq--open');
        }
      });
      
      // Keyboard support
      summary.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          summary.click();
        }
      });
    });
  }

  // Lightbox for Gallery Images (simple implementation)
  function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery__item img');
    
    if (galleryItems.length === 0) {
      return;
    }
    
    galleryItems.forEach(function(img) {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function() {
        // Simple lightbox - create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;
        
        overlay.appendChild(lightboxImg);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Close on click
        overlay.addEventListener('click', function() {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        });
        
        // Close on escape
        function closeOnEscape(event) {
          if (event.key === 'Escape') {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
              document.body.style.overflow = '';
            }
            document.removeEventListener('keydown', closeOnEscape);
          }
        }
        document.addEventListener('keydown', closeOnEscape);
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#main-content') {
          return;
        }
        
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMobileNav();
      initFAQAccordion();
      initLightbox();
      initSmoothScroll();
    });
  } else {
    initMobileNav();
    initFAQAccordion();
    initLightbox();
    initSmoothScroll();
  }
})();
