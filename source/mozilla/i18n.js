/**
 * Safely parses HTML and appends allowed elements to the target node,
 * preventing XSS vulnerabilities from unsanitized translations.
 */
function setSafeHTML(element, htmlString) {
  element.textContent = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function sanitizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent);
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toUpperCase();
      const allowedTags = ['B', 'I', 'A', 'STRONG', 'EM'];
      if (allowedTags.includes(tag)) {
        const el = document.createElement(tag);
        if (tag === 'A') {
          const href = node.getAttribute('href');
          if (href) {
            // Trim whitespace and control characters to prevent bypasses like " javascript:"
            // eslint-disable-next-line no-control-regex
              const sanitizedHref = href.replace(/^[\s\x00-\x1F\x7F-\x9F]+/, '');
            let isAllowedProtocol;
            try {
              const url = new URL(sanitizedHref, window.location.href);
              const allowedProtocols = ['http:', 'https:', 'chrome-extension:', 'moz-extension:', 'edge-extension:'];
              isAllowedProtocol = allowedProtocols.includes(url.protocol);
            } catch (e) {
              // If it's not a valid URL (e.g., a relative path), we check if it starts with a valid character and no malicious protocol
              isAllowedProtocol = /^(?:[a-zA-Z0-9\-_.!~*'();/?:@&=+$,]|%[0-9a-fA-F]{2})+$/.test(sanitizedHref) && !/^[a-z0-9]+:/i.test(sanitizedHref);
            }

            if (isAllowedProtocol) {
              el.setAttribute('href', sanitizedHref);
              if (/^https?:\/\//i.test(sanitizedHref)) {
                el.setAttribute('target', '_blank');
                el.setAttribute('rel', 'noopener noreferrer');
              }
            }
          }
        }
        for (const child of node.childNodes) {
          const safeChild = sanitizeNode(child);
          if (safeChild) el.appendChild(safeChild);
        }
        return el;
      } else {
        const frag = document.createDocumentFragment();
        for (const child of node.childNodes) {
          const safeChild = sanitizeNode(child);
          if (safeChild) frag.appendChild(safeChild);
        }
        return frag;
      }
    }
    return null;
  }

  for (const child of doc.body.childNodes) {
    const safeChild = sanitizeNode(child);
    if (safeChild) element.appendChild(safeChild);
  }
}

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
          setSafeHTML(element, message);
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
