/**
 * Internationalization (i18n) Support
 * Lightweight translation system without frameworks
 */

(function() {
  'use strict';

  const LOCALE_KEY = 'motorover-locale';
  const DEFAULT_LOCALE = 'en-IN';
  const TRANSLATIONS_PATH = '/i18n/';
  
  let translations = {};
  let currentLocale = DEFAULT_LOCALE;
  
  // Load translation file
  async function loadTranslations(locale) {
    try {
      const response = await fetch(`${TRANSLATIONS_PATH}${locale}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${locale}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Could not load translations for ${locale}:`, error);
      return {};
    }
  }
  
  // Get translation for a key
  function t(key, params = {}) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    // Replace parameters
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, function(match, param) {
        return params[param] || match;
      });
    }
    
    return value || key;
  }
  
  // Update all elements with data-i18n attribute
  function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(function(element) {
      const key = element.getAttribute('data-i18n');
      const translation = t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.hasAttribute('aria-label')) {
        element.setAttribute('aria-label', translation);
      } else if (element.hasAttribute('title')) {
        element.setAttribute('title', translation);
      } else {
        element.textContent = translation;
      }
    });
  }
  
  // Set locale
  async function setLocale(locale) {
    currentLocale = locale;
    translations = await loadTranslations(locale);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', locale);
    
    // Store preference
    localStorage.setItem(LOCALE_KEY, locale);
    
    // Update translations
    updateTranslations();
    
    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('localechange', {
      detail: { locale: locale }
    }));
  }
  
  // Get current locale
  function getLocale() {
    return currentLocale;
  }
  
  // Initialize
  async function init() {
    // Get stored locale or use default
    const stored = localStorage.getItem(LOCALE_KEY);
    const initialLocale = stored || DEFAULT_LOCALE;
    
    // Load and apply translations
    await setLocale(initialLocale);
    
    // Expose API
    window.i18n = {
      setLocale: setLocale,
      getLocale: getLocale,
      t: t
    };
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
