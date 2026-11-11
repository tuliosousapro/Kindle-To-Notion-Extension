/**
 * Test case for XSS vulnerability mitigation in i18n
 */

describe('I18n XSS Mitigation', () => {
  beforeEach(() => {
    // Basic setup for testing `setSafeHTML` logic which was extracted to a string here for ease of testing
    document.body.innerHTML = '<div data-i18n="test"></div>';
  });

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

  it('should allow simple allowed tags', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, 'Hello <b>World</b> <i>Test</i>');
    expect(el.innerHTML).toBe('Hello <b>World</b> <i>Test</i>');
  });

  it('should strip disallowed tags but keep inner text', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, 'Hello <script>alert(1)</script> <img src="x" onerror="alert(2)"> World');
    expect(el.innerHTML).toBe('Hello alert(1)  World'); // <script> inner text is kept
  });

  it('should process A tags properly and sanitize attributes', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, 'Click <a href="https://example.com" onclick="alert(1)">Here</a>');

    const a = el.querySelector('a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('https://example.com');
    expect(a.hasAttribute('onclick')).toBe(false);
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should block javascript: protocols in A tags', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, '<a href="javascript:alert(1)">XSS</a>');

    const a = el.querySelector('a');
    expect(a).not.toBeNull();
    expect(a.hasAttribute('href')).toBe(false);
  });

  it('should block javascript: protocols with leading whitespaces', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, '<a href=" javascript:alert(1)">XSS</a>');

    const a = el.querySelector('a');
    expect(a).not.toBeNull();
    expect(a.hasAttribute('href')).toBe(false);
  });

  it('should block javascript: protocols with control characters', () => {
    const el = document.querySelector('div');
    setSafeHTML(el, '<a href="java\x09script:alert(1)">XSS</a>');

    const a = el.querySelector('a');
    expect(a).not.toBeNull();
    expect(a.hasAttribute('href')).toBe(false);
  });
});
