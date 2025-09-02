console.log("Content script loaded");

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
    
    // Extract Amazon store link for the current book
    const amazonLinkElement = document.querySelector('a.a-link-normal.kp-notebook-printable[href*="amazon.com"]');
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
      highlights.push({ text, color, note });
    });

    const data = { title, author, amazonLink, highlights, highlightCount, noteCount };
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