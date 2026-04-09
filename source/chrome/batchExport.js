/**
 * Batch Export Content Script
 * Scans the Kindle Notebooks library page and coordinates full library export.
 */

console.log("Batch Export script loaded");

/**
 * Scans the Kindle library page to find all books with highlights.
 * @returns {Array} List of book objects {title, author, asin, url}
 */
function scanLibrary() {
  console.log("🔍 Scanning library for books...");
  const books = [];
  
  // Kindle Library uses .kp-notebook-library-each-book for each row
  const bookElements = document.querySelectorAll('.kp-notebook-library-each-book');
  
  console.log(`📊 Found ${bookElements.length} book elements in the library.`);

  bookElements.forEach((el) => {
    try {
      const titleEl = el.querySelector('h2.kp-notebook-searchable') || el.querySelector('.kp-notebook-title');
      const authorElsFound = el.querySelectorAll('p.kp-notebook-metadata');
      let authorName = 'Unknown Author';
      
      if (authorElsFound.length >= 2) {
        authorName = authorElsFound[1].textContent.trim();
      } else {
        const authorEl = el.querySelector('.kp-notebook-author') || el.querySelector('.a-color-secondary');
        authorName = authorEl ? authorEl.textContent.trim() : 'Unknown Author';
      }
      const asin = el.id || ''; // Often the ID of the div is the ASIN
      
      if (titleEl) {
        books.push({
          title: titleEl.textContent.trim(),
          author: authorName,
          asin: asin,
          url: window.location.origin + window.location.pathname + '?asin=' + asin
        });
      }
    } catch (err) {
      console.warn("Error scanning book element:", err);
    }
  });

  return books;
}

/**
 * Parses a single book's notebook from its HTML content.
 * Reuses logic patterns from contentScript.js but adapted for a DOM fragment.
 * @param {string} html The fetched HTML of the notebook page
 * @returns {Object} Data ready for sendToNotion
 */
function parseNotebookHTML(html, bookInfo) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Metadata fallbacks
  const title = doc.querySelector('h3.kp-notebook-metadata')?.textContent.trim() || bookInfo.title;
  let author = bookInfo.author;
  
  // Try to find the exact author element, avoiding the "Your Kindle Notes For:" paragraph
  const authorEls = doc.querySelectorAll('p.kp-notebook-metadata');
  if (authorEls.length >= 2) {
    author = authorEls[1].textContent.trim(); 
  } else {
    author = doc.querySelector('p.a-color-secondary.kp-notebook-metadata')?.textContent.trim() || 
             doc.querySelector('.kp-notebook-author')?.textContent.trim() || 
             bookInfo.author;
  }
  
  // Link extraction (supporting regional domains)
  let amazonLink = '';
  const asin = bookInfo.asin || doc.querySelector('a.kp-notebook-printable')?.href.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
  
  if (asin) {
    const currentDomain = window.location.hostname;
    const domainMap = {
      'read.amazon.com': 'www.amazon.com',
      'ler.amazon.com.br': 'www.amazon.com.br',
      'read.amazon.ca': 'www.amazon.ca',
      'read.amazon.co.uk': 'www.amazon.co.uk',
      'read.amazon.de': 'www.amazon.de',
      'read.amazon.fr': 'www.amazon.fr',
      'read.amazon.es': 'www.amazon.es',
      'read.amazon.it': 'www.amazon.it',
      'read.amazon.co.jp': 'www.amazon.co.jp',
      'read.amazon.com.au': 'www.amazon.com.au',
      'read.amazon.in': 'www.amazon.in',
      'read.amazon.com.mx': 'www.amazon.com.mx'
    };
    const storeDomain = domainMap[currentDomain] || 'www.amazon.com';
    amazonLink = `https://${storeDomain}/dp/${asin}`;
  }

  const highlightCount = doc.querySelector('#kp-notebook-highlights-count')?.textContent.trim().match(/\d+/)?.[0] || '0';
  const noteCount = doc.querySelector('#kp-notebook-notes-count')?.textContent.trim().match(/\d+/)?.[0] || '0';

  const highlights = [];
  const highlightElements = doc.querySelectorAll('.kp-notebook-highlight, .highlight-item');
  
  highlightElements.forEach((highlight) => {
    const text = highlight.querySelector('#highlight')?.textContent.trim() || '';
    if (!text) return;

    const colorClass = Array.from(highlight.classList).find(cls => cls.startsWith('kp-notebook-highlight-')) || 'default';
    const color = colorClass.split('-').pop();

    // Extract location info (simplified for batch)
    const container = highlight.closest('.kp-notebook-row-separator') || highlight.parentElement;
    let location = '';
    const headerElement = container?.querySelector('#annotationHighlightHeader');
    if (headerElement) {
      const pageMatch = headerElement.textContent.trim().match(/\|\s*(página|page):\s*(\d+)/i);
      if (pageMatch) location = `${pageMatch[1]} ${pageMatch[2]}`;
    }

    // Extract note
    let note = '';
    const nextSibling = highlight.nextElementSibling;
    if (nextSibling && (nextSibling.classList.contains('kp-notebook-note') || nextSibling.id === 'note')) {
      note = nextSibling.querySelector('#note')?.textContent.trim() || '';
    }

    highlights.push({ text, color, note, location, type: 'highlight' });
  });

  return {
    title,
    author,
    amazonLink,
    highlights,
    highlightCount,
    noteCount,
    bookmarks: [] // Bookmarks are harder to parse correctly without full interactive DOM, skipping for now to prioritize stability
  };
}

/**
 * Message listener for batch export requests
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "batchScan") {
    const books = scanLibrary();
    sendResponse({ success: true, books });
  }

  if (message.action === "batchExportItem") {
    const { url, bookInfo } = message;
    
    // 1. Fetch the book's notebook page
    let isTimedOut = false;
    const fetchTimeout = setTimeout(() => {
      isTimedOut = true;
      sendResponse({ success: false, error: "Timeout: Failed to fetch notebook HTML within 15 seconds." });
    }, 15000); // 15 second timeout

    chrome.runtime.sendMessage({ action: 'fetchChapterData', url }, (response) => {
      if (isTimedOut) return;
      clearTimeout(fetchTimeout);

      if (!response || !response.success || !response.html) {
        sendResponse({ success: false, error: "Failed to fetch notebook HTML" });
        return;
      }

      try {
        // 2. Parse the HTML
        const data = parseNotebookHTML(response.html, bookInfo);
        
        if (!data.highlights || data.highlights.length === 0) {
          sendResponse({ success: false, error: "No highlights found in this book" });
          return;
        }

        // 3. Send to Notion using existing background handler
        chrome.runtime.sendMessage({ action: 'sendToNotion', data }, (notionResp) => {
          sendResponse(notionResp || { status: "Done" });
        });
      } catch (err) {
        console.error("Error in batch export item processing:", err);
        sendResponse({ success: false, error: err.message });
      }
    });

    return true; // Keep channel open
  }
});
