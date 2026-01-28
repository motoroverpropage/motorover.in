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

  // Custom fullscreen gallery lightbox: play/pause, thumbnails bottom middle, exit bottom right
  function initLightbox() {
    const galleryLinks = document.querySelectorAll('.gallery-item-wrapper a[data-lightbox="gallery"]');
    if (galleryLinks.length === 0) {
      return;
    }

    const items = Array.from(galleryLinks).map(function(link) {
      const img = link.querySelector('img');
      return {
        href: link.getAttribute('href'),
        alt: img ? img.getAttribute('alt') || '' : '',
        thumbSrc: link.getAttribute('href')
      };
    });

    const SLIDESHOW_INTERVAL_MS = 4000;
    let currentIndex = 0;
    let slideshowTimer = null;
    let lightboxEl = null;
    let mainImageEl = null;
    let captionEl = null;
    let playPauseBtn = null;
    let thumbStrip = null;

    function buildLightbox() {
      if (lightboxEl) {
        return lightboxEl;
      }
      const overlay = document.createElement('div');
      overlay.className = 'gallery-lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Image gallery');

      const mainWrap = document.createElement('div');
      mainWrap.className = 'gallery-lightbox__main';
      mainImageEl = document.createElement('img');
      mainImageEl.className = 'gallery-lightbox__image';
      mainImageEl.setAttribute('alt', '');
      captionEl = document.createElement('p');
      captionEl.className = 'gallery-lightbox__caption';
      mainWrap.appendChild(mainImageEl);
      mainWrap.appendChild(captionEl);

      const bottomBar = document.createElement('div');
      bottomBar.className = 'gallery-lightbox__bottom-bar';

      playPauseBtn = document.createElement('button');
      playPauseBtn.type = 'button';
      playPauseBtn.className = 'gallery-lightbox__play-pause';
      playPauseBtn.setAttribute('aria-label', 'Play slideshow');
      playPauseBtn.innerHTML = '<span class="gallery-lightbox__play-icon" aria-hidden="true"></span><span class="gallery-lightbox__pause-icon" aria-hidden="true"></span>';
      playPauseBtn.addEventListener('click', togglePlayPause);

      thumbStrip = document.createElement('div');
      thumbStrip.className = 'gallery-lightbox__thumbs';
      thumbStrip.setAttribute('role', 'tablist');
      items.forEach(function(item, i) {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'gallery-lightbox__thumb';
        thumb.setAttribute('role', 'tab');
        thumb.setAttribute('aria-label', 'Image ' + (i + 1));
        thumb.setAttribute('data-index', String(i));
        const thumbImg = document.createElement('img');
        thumbImg.src = item.thumbSrc;
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        thumb.appendChild(thumbImg);
        thumb.addEventListener('click', function() {
          goToIndex(i);
        });
        thumbStrip.appendChild(thumb);
      });

      const exitBtn = document.createElement('button');
      exitBtn.type = 'button';
      exitBtn.className = 'gallery-lightbox__exit';
      exitBtn.setAttribute('aria-label', 'Exit full screen');
      exitBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
      exitBtn.addEventListener('click', closeLightbox);

      const thumbsCenter = document.createElement('div');
      thumbsCenter.className = 'gallery-lightbox__thumbs-center';
      thumbsCenter.appendChild(thumbStrip);

      bottomBar.appendChild(playPauseBtn);
      bottomBar.appendChild(thumbsCenter);
      bottomBar.appendChild(exitBtn);

      overlay.appendChild(mainWrap);
      overlay.appendChild(bottomBar);
      document.body.appendChild(overlay);
      lightboxEl = overlay;
      return overlay;
    }

    function updateMainImage() {
      if (!mainImageEl || !captionEl) {
        return;
      }
      const item = items[currentIndex];
      mainImageEl.src = item.href;
      mainImageEl.alt = item.alt;
      captionEl.textContent = item.alt || '';
      captionEl.style.display = item.alt ? 'block' : 'none';
      updateThumbActive();
    }

    function updateThumbActive() {
      if (!thumbStrip) {
        return;
      }
      const thumbs = thumbStrip.querySelectorAll('.gallery-lightbox__thumb');
      thumbs.forEach(function(thumb, i) {
        thumb.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
        thumb.classList.toggle('gallery-lightbox__thumb--active', i === currentIndex);
      });
    }

    function goToIndex(index) {
      currentIndex = (index + items.length) % items.length;
      updateMainImage();
    }

    function next() {
      goToIndex(currentIndex + 1);
    }

    function prev() {
      goToIndex(currentIndex - 1);
    }

    function startSlideshow() {
      if (slideshowTimer) {
        return;
      }
      slideshowTimer = setInterval(next, SLIDESHOW_INTERVAL_MS);
      if (playPauseBtn) {
        playPauseBtn.classList.add('gallery-lightbox__play-pause--playing');
        playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
      }
    }

    function stopSlideshow() {
      if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
      }
      if (playPauseBtn) {
        playPauseBtn.classList.remove('gallery-lightbox__play-pause--playing');
        playPauseBtn.setAttribute('aria-label', 'Play slideshow');
      }
    }

    function togglePlayPause() {
      if (slideshowTimer) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    }

    function openLightbox(index) {
      buildLightbox();
      currentIndex = (index + items.length) % items.length;
      updateMainImage();
      lightboxEl.classList.add('gallery-lightbox--open');
      stopSlideshow();
      document.body.style.overflow = 'hidden';
      if (lightboxEl.requestFullscreen) {
        lightboxEl.requestFullscreen().catch(function() {});
      }
      lightboxEl.addEventListener('keydown', handleLightboxKeydown);
    }

    function closeLightbox() {
      if (!lightboxEl) {
        return;
      }
      if (document.fullscreenElement === lightboxEl && document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
      }
      lightboxEl.classList.remove('gallery-lightbox--open');
      document.body.style.overflow = '';
      stopSlideshow();
      lightboxEl.removeEventListener('keydown', handleLightboxKeydown);
    }

    function handleLightboxKeydown(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    }

    galleryLinks.forEach(function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        openLightbox(index);
      });
    });

    document.addEventListener('fullscreenchange', function() {
      if (!document.fullscreenElement && lightboxEl && lightboxEl.classList.contains('gallery-lightbox--open')) {
        closeLightbox();
      }
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

  // Carousel functionality
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
      return;
    }
    
    const track = carousel.querySelector('.carousel__track');
    const prevButton = carousel.querySelector('.carousel__button--prev');
    const nextButton = carousel.querySelector('.carousel__button--next');
    const cards = carousel.querySelectorAll('.card--tour');
    
    if (!track || !prevButton || !nextButton || cards.length === 0) {
      return;
    }
    
    let currentIndex = 0;
    
    function calculateDimensions() {
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 24;
      const cardWidthWithGap = cardWidth + gap;
      const containerWidth = carousel.querySelector('.carousel__container').offsetWidth;
      const visibleCards = Math.floor(containerWidth / cardWidthWithGap);
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      return { cardWidthWithGap, maxIndex };
    }
    
    function updateCarousel() {
      const { cardWidthWithGap, maxIndex } = calculateDimensions();
      const translateX = -currentIndex * cardWidthWithGap;
      track.style.transform = `translateX(${translateX}px)`;
      
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex || maxIndex === 0;
    }
    
    function scrollToIndex(index) {
      const { maxIndex } = calculateDimensions();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }
    
    prevButton.addEventListener('click', function() {
      scrollToIndex(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', function() {
      scrollToIndex(currentIndex + 1);
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        const { maxIndex } = calculateDimensions();
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }
        updateCarousel();
      }, 250);
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const { maxIndex } = calculateDimensions();
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < maxIndex) {
          scrollToIndex(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          scrollToIndex(currentIndex - 1);
        }
      }
    }
    
    // Initialize after a short delay to ensure layout is complete
    setTimeout(function() {
      updateCarousel();
    }, 100);
  }
  
  // Card favorite functionality
  function initCardFavorites() {
    const favoriteButtons = document.querySelectorAll('.card__favorite');
    
    favoriteButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const isPressed = this.getAttribute('aria-pressed') === 'true';
        this.setAttribute('aria-pressed', !isPressed);
        
        // Visual feedback
        if (!isPressed) {
          this.style.transform = 'scale(1.2)';
          setTimeout(function() {
            button.style.transform = '';
          }, 200);
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
      initCarousel();
      initCardFavorites();
    });
  } else {
    initMobileNav();
    initFAQAccordion();
    initLightbox();
    initSmoothScroll();
    initCarousel();
    initCardFavorites();
  }
})();
