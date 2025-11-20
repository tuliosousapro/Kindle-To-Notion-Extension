console.log("Content script loaded");

// Helper function to find location/page info for a highlight
function extractLocation(highlightElement) {
  // Look for location in the annotation container (parent elements)
  const container = highlightElement.closest('.kp-notebook-row-separator') ||
                   highlightElement.closest('.a-row') ||
                   highlightElement.parentElement?.parentElement;

  if (!container) return '';

  // Multiple selector patterns for location
  const locationSelectors = [
    '#kp-annotation-location',
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
      // Match patterns like "Location 123", "Page 45", "Página 45", "Posição 123"
      if (text.match(/(location|page|página|posição|position|loc\.|p\.)\s*\d+/i)) {
        locationText = text;
        return true;
      }
    }
    return false;
  });

  // Fallback: search all text in container for location pattern
  if (!locationText) {
    const allText = container.textContent;
    const locationMatch = allText.match(/(location|page|página|posição|position)\s*\d+/i);
    if (locationMatch) {
      locationText = locationMatch[0];
    }
  }

  return locationText;
}

// Helper function to find chapter heading for a highlight
function extractChapter(highlightElement) {
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
            if (chapterText && chapterText.length < 200) {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'export') {
    console.log("Export message received");
    // Enhanced metadata extraction with fallbacks
    const title = document.querySelector('h3.kp-notebook-metadata')?.textContent.trim() ||
                 document.querySelector('.kp-notebook-title')?.textContent.trim() ||
                 'Unknown Title';
    const author = document.querySelector('p.a-spacing-none.a-spacing-top-micro.a-size-base.a-color-secondary.kp-notebook-selectable.kp-notebook-metadata')?.textContent.trim() ||
                  document.querySelector('.kp-notebook-author')?.textContent.trim() ||
                  'Unknown Author';

    // Extract Amazon store link for the current book (supporting all regions)
    const amazonLinkElement = document.querySelector('a.a-link-normal.kp-notebook-printable[href*="amazon."]');
    const amazonLink = amazonLinkElement?.href || '';
    console.log('Extracted Amazon link:', amazonLink);

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

    highlightElements.forEach(highlight => {
      const textElement = highlight.querySelector('#highlight') || highlight.querySelector('.highlight-text');
      const text = textElement?.textContent.trim() || '';
      if (!text) return; // Skip if no text is found
      const colorClass = Array.from(highlight.classList).find(cls => cls.startsWith('kp-notebook-highlight-')) ||
                        Array.from(highlight.classList).find(cls => cls.includes('highlight-color-'));
      const color = colorClass ? colorClass.split('-').pop() : 'default';

      // Extract location and chapter info
      const location = extractLocation(highlight);
      const chapter = extractChapter(highlight);

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