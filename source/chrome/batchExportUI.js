/**
 * Batch Export UI Controller
 * Manages the batch export process in the extension popup.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const batchExportSection = document.getElementById('batchExportSection');
  const batchExportBtn = document.getElementById('batchExportBtn');
  const batchProgressPanel = document.getElementById('batchProgressPanel');
  const batchProgressCount = document.getElementById('batchProgressCount');
  const batchProgressFill = document.getElementById('batchProgressFill');
  const batchCurrentBook = document.getElementById('batchCurrentBook');
  const batchSuccessCount = document.getElementById('batchSuccessCount');
  const batchFailCount = document.getElementById('batchFailCount');
  const cancelBatchBtn = document.getElementById('cancelBatchBtn');
  const exportPanel = document.getElementById('export-panel');

  let isBatchRunning = false;
  let batchCancelled = false;

  // 1. Check if we should show the batch export button
  async function checkLibraryPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) {
        const url = new URL(tab.url);
        const supportedDomains = [
          'read.amazon.com', 'read.amazon.ca', 'read.amazon.co.uk',
          'read.amazon.de', 'read.amazon.fr', 'read.amazon.es',
          'read.amazon.it', 'read.amazon.co.jp', 'read.amazon.com.au',
          'read.amazon.in', 'read.amazon.com.mx', 'read.amazon.com.br',
          'ler.amazon.com.br'
        ];
        
        const isNotebookPage = supportedDomains.includes(url.hostname) && url.pathname.includes('/notebook');
        const isLibraryPage = isNotebookPage && !url.searchParams.has('asin');

        if (isLibraryPage) {
          batchExportSection.classList.remove('hidden');
        } else {
          batchExportSection.classList.add('hidden');
        }
      }
    } catch (e) {
      console.error("Error checking library page:", e);
    }
  }

  // Initial check
  checkLibraryPage();

  // 2. Handle Batch Export Button Click
  batchExportBtn.addEventListener('click', async () => {
    if (isBatchRunning) return;
    
    isBatchRunning = true;
    batchCancelled = false;
    
    // Switch UI to progress mode
    batchProgressPanel.classList.remove('hidden');
    batchExportSection.classList.add('hidden');
    document.getElementById('export').classList.add('hidden'); // Hide single export button
    document.getElementById('navigateHighlights').classList.add('hidden'); // Hide navigate button
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Step A: Scan for books
      batchProgressCount.textContent = "Scanning...";
      chrome.tabs.sendMessage(tab.id, { action: "batchScan" }, async (response) => {
        if (!response || !response.success || !response.books || response.books.length === 0) {
          showToast("No books found to export.");
          resetBatchUI();
          return;
        }

        const books = response.books;
        const total = books.length;
        let successCount = 0;
        let failCount = 0;

        batchProgressCount.textContent = `0 / ${total}`;
        batchProgressFill.style.width = "0%";

        // Step B: Iterate and Export
        let currentDelay = 1500; // Base delay
        const maxRetries = 3;

        for (let i = 0; i < total; i++) {
          if (batchCancelled) break;

          const book = books[i];
          batchCurrentBook.textContent = `${book.title}`;
          batchProgressCount.textContent = `${i + 1} / ${total}`;
          batchProgressFill.style.width = `${((i + 1) / total) * 100}%`;

          let retryCount = 0;
          let isSuccess = false;
          let result = null;

          while (retryCount <= maxRetries && !isSuccess && !batchCancelled) {
            // Process one book
            result = await exportBook(tab.id, book);
            
            if (result.success) {
              isSuccess = true;
              successCount++;
              batchSuccessCount.textContent = successCount;
              // Adaptive delay: recover progressively on success, minimum 800ms
              currentDelay = Math.max(800, currentDelay - 200);
            } else {
              // Check if rate limited (HTTP 429)
              const errorText = (result.error || '').toLowerCase();
              const isRateLimited = errorText.includes('429') || errorText.includes('rate limit') || errorText.includes('too many requests');
              
              if (isRateLimited && retryCount < maxRetries) {
                retryCount++;
                console.warn(`Rate limit hit for ${book.title}. Retrying ${retryCount}/${maxRetries} after backoff...`);
                currentDelay += 2000; // Increase delay significantly to backoff
                batchCurrentBook.textContent = `${book.title} (Rate limit wait...)`;
                // Add immediate inline delay for the retry
                await new Promise(r => setTimeout(r, currentDelay));
              } else {
                failCount++;
                batchFailCount.textContent = failCount;
                console.warn(`Failed to export ${book.title}:`, result.error);
                break; // Break retry loop on permanent failure
              }
            }
          }

          // Adaptive delay between books to respect Notion's rate limits
          if (i < total - 1 && !batchCancelled) {
            await new Promise(r => setTimeout(r, currentDelay));
          }
        }

        // Show final result
        batchCurrentBook.textContent = batchCancelled ? "Export cancelled." : "Batch export complete!";
        cancelBatchBtn.textContent = "Done";
        cancelBatchBtn.classList.remove('cancel-btn');
        cancelBatchBtn.classList.add('secondary-button');

      });
    } catch (err) {
      console.error("Batch export error:", err);
      showToast("An error occurred during batch export.");
      resetBatchUI();
    }
  });

  async function exportBook(tabId, book) {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { 
        action: "batchExportItem", 
        url: book.url,
        bookInfo: book
      }, (response) => {
        if (chrome.runtime.lastError) {
          resolve({ success: false, error: chrome.runtime.lastError.message });
        } else if (response && response.status && !response.status.toLowerCase().includes('error')) {
          resolve({ success: true });
        } else {
          resolve({ success: false, error: response?.status || "Unknown error" });
        }
      });
    });
  }

  function resetBatchUI() {
    isBatchRunning = false;
    batchProgressPanel.classList.add('hidden');
    batchExportSection.classList.remove('hidden');
    document.getElementById('export').classList.remove('hidden');
    document.getElementById('navigateHighlights').classList.remove('hidden');
    
    // Reset stats
    batchSuccessCount.textContent = "0";
    batchFailCount.textContent = "0";
    batchProgressFill.style.width = "0%";
    cancelBatchBtn.textContent = "Cancel";
    cancelBatchBtn.classList.add('cancel-btn');
    cancelBatchBtn.classList.remove('secondary-button');
  }

  cancelBatchBtn.addEventListener('click', () => {
    if (cancelBatchBtn.textContent === "Done") {
      resetBatchUI();
    } else {
      batchCancelled = true;
      batchCurrentBook.textContent = "Cancelling...";
    }
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
});
