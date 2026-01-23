/**
 * Theme Toggle - Light/Dark Mode
 * Respects prefers-color-scheme and stores user preference
 */

(function() {
  'use strict';

  const THEME_KEY = 'motorover-theme';
  const THEME_ATTRIBUTE = 'data-theme';
  
  // Get stored theme or system preference
  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  // Apply theme
  function applyTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Update toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      
      // Update icon visibility
      const lightIcon = toggle.querySelector('.theme-icon-light');
      const darkIcon = toggle.querySelector('.theme-icon-dark');
      
      if (lightIcon && darkIcon) {
        if (theme === 'dark') {
          lightIcon.style.display = 'none';
          darkIcon.style.display = 'block';
        } else {
          lightIcon.style.display = 'block';
          darkIcon.style.display = 'none';
        }
      }
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    const current = document.documentElement.getAttribute(THEME_ATTRIBUTE) || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }
  
  // Initialize
  function init() {
    // Apply initial theme
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Set up toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes (if no manual preference)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(event) {
        // Only auto-switch if user hasn't manually set a preference
        const stored = localStorage.getItem(THEME_KEY);
        if (!stored) {
          applyTheme(event.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
