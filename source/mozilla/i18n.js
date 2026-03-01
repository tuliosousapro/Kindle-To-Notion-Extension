// Global I18n helper to support custom UI language selection
window.I18n = {
  customMessages: null,

  // Initialize the I18n object by checking preferred language
  init: async function () {
    return new Promise((resolve) => {
      chrome.storage.local.get(['ui_language'], async (result) => {
        const lang = result.ui_language;
        if (lang && lang !== 'browser_default') {
          try {
            // Fetch custom language from extension files
            const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
            const response = await fetch(url);
            if (response.ok) {
              this.customMessages = await response.json();
              console.log(`[I18n] Loaded custom language: ${lang}`);
            } else {
              console.warn(`[I18n] Custom language ${lang} not found, falling back to browser default`);
              this.customMessages = null;
            }
          } catch (e) {
            console.error('[I18n] Error loading custom language:', e);
            this.customMessages = null;
          }
        } else {
          this.customMessages = null; // Use browser default
        }
        resolve();
      });
    });
  },

  // Get localized string, prioritizing custom dictionary over browser built-in
  getMessage: function (key, substitutions) {
    if (this.customMessages && this.customMessages[key]) {
      let msg = this.customMessages[key].message;
      if (substitutions) {
        if (!Array.isArray(substitutions)) {
          substitutions = [substitutions];
        }
        // Replace placeholders $1$, $2$, etc.
        substitutions.forEach((sub, i) => {
          msg = msg.replace(new RegExp(`\\$${i + 1}\\$`, 'g'), sub);
        });
      }
      return msg;
    }
    // Fallback to native Chrome i18n
    return chrome.i18n.getMessage(key, substitutions);
  },

  // Apply translations to data-i18n elements across the DOM
  applyToDOM: function () {
    // Basic text content elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const message = this.getMessage(key);
        if (message) {
          element.innerHTML = message; // Using innerHTML if translations intentionally hold tags
        }
      }
    });

    // Elements with placeholders (like inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key) {
        const message = this.getMessage(key);
        if (message) {
          element.placeholder = message;
        }
      }
    });

    // Elements with titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      if (key) {
        const message = this.getMessage(key);
        if (message) {
          element.title = message;
        }
      }
    });
  }
};
