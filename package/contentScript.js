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
    const coverUrl = document.querySelector('img.kp-notebook-cover-image-border')?.src ||
                    document.querySelector('.kp-notebook-cover img')?.src ||
                    '';
    const highlightCount = document.querySelector('#kp-notebook-highlights-count')?.textContent.trim() ||
                          document.querySelector('.highlight-count')?.textContent.trim() ||
                          '0';
    const noteCount = document.querySelector('#kp-notebook-notes-count')?.textContent.trim() ||
                     document.querySelector('.note-count')?.textContent.trim() ||
                     '0';

    const highlights = [];
    // Multiple selector strategies for highlight elements
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
      const text = highlight.querySelector('#highlight')?.textContent.trim() ||
                  highlight.querySelector('.highlight-text')?.textContent.trim() ||
                  '';
      const colorClass = Array.from(highlight.classList).find(cls => cls.startsWith('kp-notebook-highlight-')) ||
                        Array.from(highlight.classList).find(cls => cls.includes('highlight-color-'));
      const color = colorClass ? colorClass.split('-').pop() : 'default';
      let note = '';
      const nextSibling = highlight.nextElementSibling;
      const noteSelectors = ['.kp-notebook-note', '.note-item', 'div[data-testid="note"]'];
      let noteElement = null;
      noteSelectors.some(selector => {
        noteElement = nextSibling?.querySelector(selector);
        return noteElement !== null;
      });
      if (noteElement) {
        note = noteElement.querySelector('#note')?.textContent.trim() ||
              noteElement.querySelector('.note-text')?.textContent.trim() ||
              '';
      }
      highlights.push({ text, color, note });
    });

    const data = { title, author, coverUrl, highlights, highlightCount, noteCount };
    chrome.runtime.sendMessage({ action: 'sendToNotion', data }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending to background:', chrome.runtime.lastError);
        sendResponse({ status: 'Error: Failed to send data to background' });
      } else {
        sendResponse(response);
      }
    });
    return true; // Keep the channel open for async response
  }
});