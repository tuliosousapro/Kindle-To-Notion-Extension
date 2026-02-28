document.addEventListener('DOMContentLoaded', () => {
    // Basic text content elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const message = chrome.i18n.getMessage(key);
        if (message) {
          element.textContent = message;
        }
      }
    });
  
    // Elements with placeholders (like inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key) {
        const message = chrome.i18n.getMessage(key);
        if (message) {
          element.placeholder = message;
        }
      }
    });

    // Elements with titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (key) {
          const message = chrome.i18n.getMessage(key);
          if (message) {
            element.title = message;
          }
        }
      });
  });
