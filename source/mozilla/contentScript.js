console.log("Content script loaded");

// Helper function to find location/page info for a highlight
function extractLocation(highlightElement) {
  // Look for location in the annotation container (parent elements)
  // Priority: Page number > Position/Location
  const container = highlightElement.closest('.kp-notebook-row-separator') ||
                   highlightElement.closest('.a-row.a-spacing-base') ||
                   highlightElement.parentElement?.parentElement;

  if (!container) return '';

  // PRIORITY 1: Try to find page number from annotationHighlightHeader
  // Format: "Azul destaque | Página: 35" or "Blue highlight | Page: 35"
  try {
    const headerElement = container.querySelector('#annotationHighlightHeader');
    if (headerElement) {
      const headerText = headerElement.textContent.trim();
      console.log('Found annotation header:', headerText);

      // Extract page number from format "... | Página: 35" or "... | Page: 35"
      const pageMatch = headerText.match(/\|\s*(página|page):\s*(\d+)/i);
      if (pageMatch) {
        return `Página ${pageMatch[2]}`;
      }
    }
  } catch (error) {
    console.warn('Error extracting from annotationHighlightHeader:', error);
  }

  // PRIORITY 2: Try other page number selectors
  try {
    const pageSelectors = [
      '.kp-notebook-page-number',
      '.page-number',
      '[id*="page"]',
      '[class*="page"]'
    ];

    for (const selector of pageSelectors) {
      const pageElement = container.querySelector(selector);
      if (pageElement) {
        const pageText = pageElement.textContent.trim();
        const pageMatch = pageText.match(/(página|page|p\.)\s*(\d+)/i);
        if (pageMatch) {
          return `Página ${pageMatch[2]}`;
        }
      }
    }

    // Check all text content for page number patterns
    const allText = container.textContent;
    const pageMatch = allText.match(/(página|page|p\.)\s*(\d+)/i);
    if (pageMatch) {
      return `Página ${pageMatch[2]}`;
    }
  } catch (error) {
    console.warn('Error extracting page number, falling back to position:', error);
  }

  // PRIORITY 3: Fall back to position from hidden input
  try {
    const locationInput = container.querySelector('#kp-annotation-location');
    if (locationInput && locationInput.value) {
      const locationNum = locationInput.value.trim();
      return `Posição ${locationNum}`;
    }
  } catch (error) {
    console.warn('Error extracting position from hidden input:', error);
  }

  // PRIORITY 4: Fall back to other location patterns
  try {
    const locationSelectors = [
      '.kp-notebook-location',
      '.a-size-base-plus.a-color-secondary',
      '[id*="location"]',
      '.kp-notebook-metadata span'
    ];

    let locationText = '';
    locationSelectors.some(selector => {
      const element = container.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text.match(/(location|página|posição|position|loc\.|p\.)\s*\d+/i)) {
          locationText = text;
          return true;
        }
      }
      return false;
    });

    if (locationText) return locationText;

    // Final fallback: search all text in container for location pattern
    const locationMatch = allText.match(/(location|posição|position)\s*\d+/i);
    if (locationMatch) {
      return locationMatch[0];
    }
  } catch (error) {
    console.warn('Error in final location fallback:', error);
  }

  return '';
}

// Helper function to find chapter heading for a highlight
function extractChapter(highlightElement) {
  // Common Kindle page headings to exclude (not actual chapters)
  const excludedHeadings = [
    'Livros com notas em sua biblioteca',
    'Books with notes in your library',
    'Libros con notas en tu biblioteca',
    'Livres avec des notes dans votre bibliothèque',
    'Bücher mit Notizen in deiner Bibliothek',
    'あなたのライブラリのメモ付き書籍'
  ];

  // Look for chapter heading in parent annotation containers
  let current = highlightElement;

  // Chapter heading selectors
  const chapterSelectors = [
    '.kp-notebook-chapter-title',
    '.chapter-title',
    'h2.kp-notebook-selectable',
    '.kp-notebook-annotation-section-header',
    '[class*="chapter"]',
    '.a-text-bold'
  ];

  // Walk up the DOM to find the chapter container
  while (current && current !== document.body) {
    const container = current.closest('.kp-notebook-annotation-container') ||
                     current.closest('.a-spacing-base') ||
                     current.parentElement;

    if (container) {
      // Look for chapter heading before this highlight
      let sibling = container.previousElementSibling;
      while (sibling) {
        for (const selector of chapterSelectors) {
          const chapterElement = sibling.matches(selector) ? sibling : sibling.querySelector(selector);
          if (chapterElement) {
            const chapterText = chapterElement.textContent.trim();
            // Verify it looks like a chapter (not just any text)
            // and exclude common Kindle page headings
            if (chapterText &&
                chapterText.length < 200 &&
                !excludedHeadings.includes(chapterText)) {
              return chapterText;
            }
          }
        }
        sibling = sibling.previousElementSibling;
      }
    }
    current = current.parentElement;
  }

  return '';
}

// Helper function to extract bookmarks
function extractBookmarks() {
  const bookmarks = [];

  // Bookmark selectors
  const bookmarkSelectors = [
    '.kp-notebook-bookmark',
    '.bookmark-item',
    '[data-testid="bookmark"]',
    '.a-row.bookmark'
  ];

  let bookmarkElements = [];
  bookmarkSelectors.some(selector => {
    bookmarkElements = Array.from(document.querySelectorAll(selector));
    return bookmarkElements.length > 0;
  });

  bookmarkElements.forEach(bookmark => {
    const location = extractLocation(bookmark);
    const chapter = extractChapter(bookmark);

    if (location) {
      bookmarks.push({
        type: 'bookmark',
        location,
        chapter
      });
    }
  });

  console.log('Extracted bookmarks:', bookmarks);
  return bookmarks;
}

// Debug function to inspect DOM structure
function debugDOMStructure() {
  console.log('=== DEBUG: Kindle Page DOM Structure ===');

  // Find first highlight element
  const highlightSelectors = ['.kp-notebook-highlight', '.highlight-item', 'div[data-testid="highlight"]'];
  let firstHighlight = null;

  highlightSelectors.some(selector => {
    firstHighlight = document.querySelector(selector);
    if (firstHighlight) {
      console.log('Found highlight with selector:', selector);
      return true;
    }
    return false;
  });

  if (firstHighlight) {
    console.log('First highlight element:', firstHighlight);
    console.log('First highlight HTML:', firstHighlight.outerHTML.substring(0, 500));

    // Check parent elements
    let parent = firstHighlight.parentElement;
    let level = 1;
    while (parent && level <= 5) {
      console.log(`Parent level ${level}:`, parent.className, parent.id);
      console.log(`Parent ${level} HTML:`, parent.outerHTML.substring(0, 300));
      parent = parent.parentElement;
      level++;
    }

    // Check for location/page info in siblings and children
    console.log('All text in highlight container:', firstHighlight.parentElement?.textContent);
    console.log('Next sibling:', firstHighlight.nextElementSibling);
    console.log('Previous sibling:', firstHighlight.previousElementSibling);
  }

  // Look for any elements with "location", "page", "chapter" in class/id
  const allElements = document.querySelectorAll('*');
  const locationElements = [];
  const chapterElements = [];
  const bookmarkElements = [];

  allElements.forEach(el => {
    const className = el.className?.toString().toLowerCase() || '';
    const id = el.id?.toLowerCase() || '';
    const text = el.textContent?.trim() || '';

    if (className.includes('location') || id.includes('location') || text.match(/location\s*\d+/i)) {
      locationElements.push({ el, className, id, text: text.substring(0, 100) });
    }
    if (className.includes('chapter') || id.includes('chapter') || text.match(/chapter\s*\d+/i)) {
      chapterElements.push({ el, className, id, text: text.substring(0, 100) });
    }
    if (className.includes('bookmark') || id.includes('bookmark')) {
      bookmarkElements.push({ el, className, id, text: text.substring(0, 100) });
    }
  });

  console.log('Found location-related elements:', locationElements);
  console.log('Found chapter-related elements:', chapterElements);
  console.log('Found bookmark-related elements:', bookmarkElements);

  console.log('=== END DEBUG ===');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'export') {
    console.log("Export message received");

    // Run debug to help identify correct selectors
    debugDOMStructure();

    // Enhanced metadata extraction with fallbacks
    const title = document.querySelector('h3.kp-notebook-metadata')?.textContent.trim() ||
                 document.querySelector('.kp-notebook-title')?.textContent.trim() ||
                 'Unknown Title';
    const author = document.querySelector('p.a-spacing-none.a-spacing-top-micro.a-size-base.a-color-secondary.kp-notebook-selectable.kp-notebook-metadata')?.textContent.trim() ||
                  document.querySelector('.kp-notebook-author')?.textContent.trim() ||
                  'Unknown Author';

    // Extract Amazon store link for the current book (supporting all regions)
    // First, try to get ASIN from URL and construct proper regional link
    let amazonLink = '';
    const urlParams = new URLSearchParams(window.location.search);
    const asin = urlParams.get('asin');

    if (asin) {
      // Detect regional domain from current page
      const currentDomain = window.location.hostname; // e.g., "ler.amazon.com.br"
      console.log('🌎 Current Kindle domain:', currentDomain);

      // Map reading domains to store domains (Brazil uses "ler" instead of "read")
      const domainMap = {
        'read.amazon.com': 'www.amazon.com',
        'ler.amazon.com.br': 'www.amazon.com.br',     // Brazil
        'read.amazon.com.br': 'www.amazon.com.br',    // Brazil fallback
        'read.amazon.ca': 'www.amazon.ca',
        'read.amazon.co.uk': 'www.amazon.co.uk',
        'read.amazon.de': 'www.amazon.de',
        'read.amazon.fr': 'www.amazon.fr',
        'read.amazon.es': 'www.amazon.es',
        'read.amazon.it': 'www.amazon.it',
        'read.amazon.co.jp': 'www.amazon.co.jp',
        'read.amazon.com.au': 'www.amazon.com.au',
        'read.amazon.in': 'www.amazon.in',
        'read.amazon.com.mx': 'www.amazon.com.mx',
        'leer.amazon.com.mx': 'www.amazon.com.mx'     // Mexico uses "leer"
      };

      const storeDomain = domainMap[currentDomain] || 'www.amazon.com';
      amazonLink = `https://${storeDomain}/dp/${asin}`;
      console.log('📚 ASIN:', asin);
      console.log('🔗 Constructed Amazon link:', amazonLink);
      console.log('✅ Domain mapping:', currentDomain, '→', storeDomain);
    }

    // Fallback: try to extract from page if ASIN construction failed
    if (!amazonLink) {
      const amazonLinkElement = document.querySelector('a.a-link-normal.kp-notebook-printable[href*="amazon."]');
      amazonLink = amazonLinkElement?.href || '';
    }

    console.log('Final Amazon link:', amazonLink);

    const highlightCount = document.querySelector('#kp-notebook-highlights-count')?.textContent.trim().match(/\d+/)?.[0] || '0';
    const noteCount = document.querySelector('#kp-notebook-notes-count')?.textContent.trim().match(/\d+/)?.[0] || '0';

    const highlights = [];
    const highlightSelectors = [
      '.kp-notebook-highlight',
      '.highlight-item',
      'div[data-testid="highlight"]'
    ];
    let highlightElements = [];
    highlightSelectors.some(selector => {
      highlightElements = Array.from(document.querySelectorAll(selector));
      return highlightElements.length > 0;
    });

    console.log(`Found ${highlightElements.length} highlight elements`);

    highlightElements.forEach((highlight, index) => {
      const textElement = highlight.querySelector('#highlight') || highlight.querySelector('.highlight-text');
      const text = textElement?.textContent.trim() || '';
      if (!text) return; // Skip if no text is found
      const colorClass = Array.from(highlight.classList).find(cls => cls.startsWith('kp-notebook-highlight-')) ||
                        Array.from(highlight.classList).find(cls => cls.includes('highlight-color-'));
      const color = colorClass ? colorClass.split('-').pop() : 'default';

      // Extract location and chapter info
      const location = extractLocation(highlight);
      const chapter = extractChapter(highlight);

      // Debug log for first 3 highlights
      if (index < 3) {
        console.log(`Highlight ${index + 1}:`, {
          text: text.substring(0, 50) + '...',
          location,
          chapter,
          parentHTML: highlight.parentElement?.outerHTML.substring(0, 300)
        });
      }

      let note = '';
      const nextSibling = highlight.nextElementSibling;
      const noteSelectors = ['.kp-notebook-note', '.note-item', 'div[data-testid="note"]'];
      let noteElement = null;
      noteSelectors.some(selector => {
        if (nextSibling && nextSibling.matches(selector)) {
          noteElement = nextSibling;
          return true;
        }
        return false;
      });
      if (noteElement) {
        note = noteElement.querySelector('#note')?.textContent.trim() ||
              noteElement.querySelector('.note-text')?.textContent.trim() ||
              '';
      }
      highlights.push({ text, color, note, location, chapter, type: 'highlight' });
    });

    // Extract bookmarks
    const bookmarks = extractBookmarks();

    const data = {
      title,
      author,
      amazonLink,
      highlights,
      bookmarks,
      highlightCount,
      noteCount
    };
    console.log('Sending data to background:', data);
    chrome.runtime.sendMessage({ action: 'sendToNotion', data }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending to background:', chrome.runtime.lastError);
        sendResponse({ status: 'Error: Failed to send data to background' });
      } else {
        console.log('Response from background:', response);
        sendResponse(response);
      }
    });
    return true;
  }
});