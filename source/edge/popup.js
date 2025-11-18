document.addEventListener('DOMContentLoaded', () => {
  // Check if this is the user's first time opening the main popup
  chrome.storage.local.get(['firstTimeMainPopup', 'onboardingCompleted'], (result) => {
    if (result.onboardingCompleted && !result.firstTimeMainPopup) {
      chrome.storage.local.set({ firstTimeMainPopup: true });
    }
  });

  // DOM Elements
  const tabExportBtn = document.getElementById('tab-export-btn');
  const tabSettingsBtn = document.getElementById('tab-settings-btn');
  const exportPanel = document.getElementById('export-panel');
  const settingsPanel = document.getElementById('settings-panel');

  const tokenInput = document.getElementById('token');
  const databaseIdInput = document.getElementById('databaseId');
  const titlePropertyInput = document.getElementById('titleProperty');
  const authorPropertyInput = document.getElementById('authorProperty');
  const kindleRegionInput = document.getElementById('kindleRegion');
  const saveButton = document.getElementById('save');
  const exportButton = document.getElementById('export');
  const navigateButton = document.getElementById('navigateHighlights');
  const toggleTokenIcon = document.getElementById('toggleToken');
  const spinner = document.getElementById('spinner');
  const spinnerText = document.querySelector('.spinner-text');
  const versionInfo = document.getElementById('versionInfo');
  const amazonStatusDot = document.getElementById('amazonStatusDot');
  const notionStatusDot = document.getElementById('notionStatusDot');
  const toast = document.getElementById('toast');

  // Load saved settings
  chrome.storage.local.get(['token', 'databaseId', 'titleProperty', 'authorProperty', 'kindleRegion'], (result) => {
    tokenInput.value = result.token || '';
    databaseIdInput.value = result.databaseId || '';
    titlePropertyInput.value = result.titleProperty || 'Book Title';
    authorPropertyInput.value = result.authorProperty || 'Author';
    kindleRegionInput.value = result.kindleRegion || 'https://read.amazon.com/notebook';

    // Update status indicators
    if (result.token && result.databaseId) {
      notionStatusDot.classList.add('connected');
    }
  });

  // Load version
  fetch(chrome.runtime.getURL('manifest.json'))
    .then((response) => response.json())
    .then((manifest) => {
      versionInfo.textContent = `v${manifest.version}`;
    });

  // Tab switching
  function switchTab(targetTab) {
    // Update buttons
    const allTabs = [tabExportBtn, tabSettingsBtn];
    allTabs.forEach(tab => tab.classList.remove('active'));

    // Update panels
    const allPanels = [exportPanel, settingsPanel];
    allPanels.forEach(panel => panel.classList.remove('active'));

    if (targetTab === 'export') {
      tabExportBtn.classList.add('active');
      exportPanel.classList.add('active');
    } else {
      tabSettingsBtn.classList.add('active');
      settingsPanel.classList.add('active');
    }
  }

  tabExportBtn.addEventListener('click', () => switchTab('export'));
  tabSettingsBtn.addEventListener('click', () => switchTab('settings'));

  // Toggle token visibility
  toggleTokenIcon.addEventListener('click', () => {
    const eyeOpen = toggleTokenIcon.querySelector('.eye-open');
    const eyeClosed = toggleTokenIcon.querySelector('.eye-closed');

    if (tokenInput.type === 'password') {
      tokenInput.type = 'text';
      eyeOpen.classList.add('hidden');
      eyeClosed.classList.remove('hidden');
    } else {
      tokenInput.type = 'password';
      eyeOpen.classList.remove('hidden');
      eyeClosed.classList.add('hidden');
    }
  });

  // Navigate to highlights
  navigateButton.addEventListener('click', () => {
    chrome.storage.local.get(['kindleRegion'], (result) => {
      const region = result.kindleRegion || 'https://read.amazon.com/notebook';
      chrome.tabs.update({ url: region }, () => {
        showToast('Navigating to Kindle highlights...');
      });
    });
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const token = tokenInput.value.trim();
    let databaseId = databaseIdInput.value.trim();
    const titleProperty = titlePropertyInput.value.trim();
    const authorProperty = authorPropertyInput.value.trim();
    const kindleRegion = kindleRegionInput.value;

    // Validate and extract database ID from URL if needed
    const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
    if (databaseId.startsWith('https://www.notion.so/')) {
      const match = databaseId.match(urlPattern);
      if (match) {
        databaseId = match[1].replace(/-/g, '');
        databaseIdInput.value = databaseId;
      }
    }

    // Validation
    if (!token) {
      showToast('Please enter your Notion API Token');
      return;
    }

    if (!databaseId) {
      showToast('Please enter your Database ID');
      return;
    }

    if (!databaseId.match(/^[0-9a-f]{32}$/i)) {
      showToast('Invalid Database ID format');
      return;
    }

    // Save settings
    chrome.storage.local.set({ token, databaseId, titleProperty, authorProperty, kindleRegion }, () => {
      notionStatusDot.classList.add('connected');
      showToast('Settings saved successfully!');
      tokenInput.type = 'password';
      document.querySelector('.eye-open').classList.remove('hidden');
      document.querySelector('.eye-closed').classList.add('hidden');
    });
  });

  // Export to Notion
  exportButton.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        showToast('Error: No active tab found');
        return;
      }

      const supportedUrls = Array.from(document.querySelectorAll('#kindleRegion option')).map(opt => opt.value);
      const onSupportedPage = supportedUrls.some(url => tab.url.startsWith(url));

      if (onSupportedPage) {
        exportWithRetry(tab.id);
      } else {
        showToast('Please navigate to a Kindle highlights page first');
      }
    } catch (error) {
      console.error('Error getting active tab:', error);
      showToast('Error: Failed to get active tab');
    }
  });

  // Export with retry
  async function exportWithRetry(tabId, attempt = 1, maxAttempts = 4) {
    const baseDelay = 1000;
    spinnerText.textContent = `Exporting to Notion${attempt > 1 ? ` (Attempt ${attempt}/${maxAttempts})` : ''}...`;
    spinner.classList.remove('hidden');

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { action: 'export' }, (response) => {
        if (chrome.runtime.lastError || !response || !response.status) {
          if (attempt < maxAttempts) {
            const delay = baseDelay * Math.pow(2, attempt - 1);
            setTimeout(() => exportWithRetry(tabId, attempt + 1, maxAttempts).then(resolve), delay);
          } else {
            spinner.classList.add('hidden');
            showToast('Export failed. Please check your settings.');
            resolve();
          }
        } else {
          spinner.classList.add('hidden');
          showToast(response.status);
          console.log('Export response:', response.status);
          resolve();
        }
      });
    });
  }

  // Toast notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Update status on message
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'progress') {
      spinnerText.textContent = msg.status;
    }
  });
});
