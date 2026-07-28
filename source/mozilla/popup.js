document.addEventListener('DOMContentLoaded', async () => {
  await window.I18n.init();
  window.I18n.applyToDOM();

  // Check if this is the user's first time opening the main popup
  chrome.storage.local.get(['firstTimeMainPopup', 'onboardingCompleted'], (result) => {
    if (result.onboardingCompleted && !result.firstTimeMainPopup) {
      chrome.storage.local.set({ firstTimeMainPopup: true });
    }
  });

  // Check for due engagement prompt on popup open (in-app)
  (async () => {
    const engagementType = await checkEngagement();
    if (engagementType) {
      setTimeout(() => showEngagementModal(engagementType), 800);
    }
  })();

  // DOM Elements
  const tabExportBtn = document.getElementById('tab-export-btn');
  const tabSettingsBtn = document.getElementById('tab-settings-btn');
  const exportPanel = document.getElementById('export-panel');
  const settingsPanel = document.getElementById('settings-panel');

  const tokenInput = document.getElementById('token');
  const databaseIdInput = document.getElementById('databaseId');
  const databasePicker = document.getElementById('databasePicker');
  const databasePickerGroup = document.getElementById('databasePickerGroup');
  const databaseIdGroup = document.getElementById('databaseIdGroup');
  const titlePropertyInput = document.getElementById('titleProperty');
  const authorPropertyInput = document.getElementById('authorProperty');
  const kindleRegionInput = document.getElementById('kindleRegion');
  const uiLanguageInput = document.getElementById('uiLanguage');
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

  const connectButton = document.getElementById('connectNotion');
  const connectedBadge = document.getElementById('connectedBadge');
  const connectedWorkspaceName = document.getElementById('connectedWorkspaceName');
  const disconnectButton = document.getElementById('disconnectNotion');
  const manualTokenGroup = document.querySelector('.manual-token-group');
  const manualSetupToggle = document.getElementById('manualSetupToggle');

  // Load saved settings
  chrome.storage.local.get(['token', 'databaseId', 'titleProperty', 'authorProperty', 'kindleRegion', 'ui_language', 'oauth_authenticated', 'workspace_name'], (result) => {
    tokenInput.value = result.token || '';
    databaseIdInput.value = result.databaseId || '';
    titlePropertyInput.value = result.titleProperty || 'Book Title';
    authorPropertyInput.value = result.authorProperty || 'Author';
    kindleRegionInput.value = result.kindleRegion || 'https://read.amazon.com/notebook';
    if (uiLanguageInput) uiLanguageInput.value = result.ui_language || 'browser_default';

    // Update status indicators
    if (result.token && result.databaseId) {
      notionStatusDot.classList.add('connected');
    }

    // Show OAuth status if authenticated via OAuth
    if (result.oauth_authenticated && result.workspace_name) {
      updateOAuthUI(true, result.workspace_name);
      // Auto-fetch databases if no databaseId is set yet
      if (!result.databaseId) {
        fetchAndDisplayDatabases();
      } else {
        // Show the picker pre-loaded with saved databaseId
        fetchAndDisplayDatabases(result.databaseId);
      }
    } else {
      updateOAuthUI(false);
    }
  });

  // Check if user is on a supported Kindle highlights page
  const SUPPORTED_DOMAINS = [
    'read.amazon.com', 'read.amazon.ca', 'read.amazon.co.uk',
    'read.amazon.de', 'read.amazon.fr', 'read.amazon.es',
    'read.amazon.it', 'read.amazon.co.jp', 'read.amazon.com.au',
    'read.amazon.in', 'read.amazon.com.mx', 'read.amazon.com.br'
  ];
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url) {
      const url = new URL(tab.url);
      if (SUPPORTED_DOMAINS.includes(url.hostname)) {
        amazonStatusDot.classList.add('connected');
      }
    }
  } catch (e) { /* ignore */ }

  // ... (version loading code) ...

  // Connect with Notion
  connectButton.addEventListener('click', () => {
    connectButton.disabled = true;
    connectButton.querySelector('span:last-child').textContent = 'Connecting...';

    chrome.runtime.sendMessage({ action: 'startOAuth' }, (response) => {
      connectButton.disabled = false;
      connectButton.querySelector('span:last-child').textContent = 'Connect with Notion';

      if (chrome.runtime.lastError) {
        showToast('Error: ' + chrome.runtime.lastError.message);
        return;
      }

      if (response && response.success) {
        showToast(window.I18n.getMessage("toastConnectedNotion"));
        updateOAuthUI(true, response.workspace_name);
        notionStatusDot.classList.add('connected');
        // Auto-fetch databases after successful OAuth
        fetchAndDisplayDatabases();
      } else {
        showToast(window.I18n.getMessage("toastConnectionFailed") + ': ' + (response?.error || 'Unknown error'));
      }
    });
  });

  // Disconnect from Notion
  disconnectButton.addEventListener('click', () => {
    chrome.storage.local.remove(['oauth_authenticated', 'token', 'workspace_name', 'workspace_id', 'bot_id', 'owner'], () => {
      updateOAuthUI(false);
      notionStatusDot.classList.remove('connected');
      showToast(window.I18n.getMessage("toastDisconnected"));
      tokenInput.value = '';
    });
  });

  function updateOAuthUI(isAuthenticated, workspaceName = '') {
    if (isAuthenticated) {
      connectButton.classList.add('hidden');
      connectedBadge.classList.remove('hidden');
      connectedWorkspaceName.textContent = `Connected to ${workspaceName}`;
      manualTokenGroup.classList.add('hidden');
      databaseIdGroup.style.display = 'none';
      document.querySelector('.divider-text').classList.add('hidden');
      manualSetupToggle.classList.remove('hidden');
    } else {
      connectButton.classList.remove('hidden');
      connectedBadge.classList.add('hidden');
      manualTokenGroup.classList.remove('hidden');
      databaseIdGroup.style.display = '';
      document.querySelector('.divider-text').classList.remove('hidden');
      manualSetupToggle.classList.add('hidden');
    }
  }

  // Toggle manual setup fields when OAuth is connected
  manualSetupToggle.addEventListener('click', () => {
    const isExpanded = !manualTokenGroup.classList.contains('hidden');
    const icon = manualSetupToggle.querySelector('svg');
    if (isExpanded) {
      manualTokenGroup.classList.add('hidden');
      databaseIdGroup.style.display = 'none';
      icon.innerHTML = '<path d="M12 5v14M5 12h14"></path>';
    } else {
      manualTokenGroup.classList.remove('hidden');
      databaseIdGroup.style.display = '';
      icon.innerHTML = '<line x1="5" y1="12" x2="19" y2="12"></line>';
    }
  });

  // Fetch databases from Notion and display in picker
  function fetchAndDisplayDatabases(preselectedId) {
    chrome.runtime.sendMessage({ action: 'fetchDatabases' }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        // Fall back to manual entry
        databasePickerGroup.style.display = 'none';
        databaseIdGroup.style.display = '';
        return;
      }

      const databases = response.databases;
      if (!databases || databases.length === 0) {
        databasePickerGroup.style.display = 'none';
        databaseIdGroup.style.display = '';
        return;
      }

      // If exactly 1 database and no databaseId set yet, auto-set it
      if (databases.length === 1 && !preselectedId) {
        const dbId = databases[0].id.replace(/-/g, '');
        databaseIdInput.value = dbId;
        chrome.storage.local.set({ databaseId: dbId }, () => {
          notionStatusDot.classList.add('connected');
          showToast(window.I18n.getMessage('toastDatabaseAutoSet') || 'Database auto-detected and set!');
        });
      }

      // Populate the dropdown
      databasePicker.innerHTML = '';
      if (databases.length > 1) {
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = window.I18n.getMessage('optionSelectDatabase') || '-- Select a database --';
        databasePicker.appendChild(placeholder);
      }

      databases.forEach(db => {
        const option = document.createElement('option');
        const rawId = db.id.replace(/-/g, '');
        option.value = rawId;
        let title = 'Untitled Database';
        if (db.title && db.title.length > 0 && db.title[0].plain_text) {
          title = db.title[0].plain_text;
        }
        option.textContent = title;
        databasePicker.appendChild(option);
      });

      // Pre-select the saved database ID
      const currentId = preselectedId || databaseIdInput.value;
      if (currentId) {
        databasePicker.value = currentId;
      } else if (databases.length === 1) {
        databasePicker.value = databases[0].id.replace(/-/g, '');
      }

      // Show picker, hide manual input
      databasePickerGroup.style.display = '';
      databaseIdGroup.style.display = 'none';

      // When user changes selection, update the databaseId input
      databasePicker.addEventListener('change', () => {
        const selectedId = databasePicker.value;
        if (selectedId) {
          databaseIdInput.value = selectedId;
        }
      });
    });
  }

  // ... (rest of the existing code) ...

  // Load version
  fetch(chrome.runtime.getURL('manifest.json'))
    .then((response) => response.json())
    .then((manifest) => {
      versionInfo.textContent = `v${manifest.version}`;
    });

  // Tab switching
  function switchTab(targetTab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`tab-${targetTab}-btn`).classList.add('active');
    document.getElementById(`${targetTab}-panel`).classList.add('active');

    if (targetTab === 'review') {
      loadReviewTab();
    }
  }

  tabExportBtn.addEventListener('click', () => switchTab('export'));
  tabSettingsBtn.addEventListener('click', () => switchTab('settings'));
  document.getElementById('tab-review-btn').addEventListener('click', () => switchTab('review'));

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
      chrome.tabs.create({ url: region });
      showToast(window.I18n.getMessage("toastNavigating"));
    });
  });

  // Navigate to Kindle Library
  document.getElementById('navigateLibrary').addEventListener('click', () => {
    chrome.storage.local.get(['kindleRegion'], (result) => {
      const region = result.kindleRegion || 'https://read.amazon.com/notebook';
      const libraryUrl = region.replace('/notebook', '/kindle-library');
      chrome.tabs.create({ url: libraryUrl });
      showToast(window.I18n.getMessage("toastNavigatingLibrary") || "Opening Kindle Library...");
    });
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const token = tokenInput.value.trim();
    let databaseId = databaseIdInput.value.trim();
    const titleProperty = titlePropertyInput.value.trim();
    const authorProperty = authorPropertyInput.value.trim();
    const kindleRegion = kindleRegionInput.value;
    const ui_language = uiLanguageInput ? uiLanguageInput.value : 'browser_default';

    // Validate and extract database ID from URL if needed
    const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
    if (databaseId.startsWith('https://www.notion.so/')) {
      const match = databaseId.match(urlPattern);
      if (match) {
        databaseId = match[1].replace(/-/g, '');
        databaseIdInput.value = databaseId;
      }
    }

    // Validation — skip token check if OAuth is active
    const isOAuth = connectedBadge && !connectedBadge.classList.contains('hidden');
    if (!token && !isOAuth) {
      showToast(window.I18n.getMessage("toastEnterToken"));
      return;
    }

    if (!databaseId) {
      showToast(window.I18n.getMessage("toastEnterDatabaseId"));
      return;
    }

    if (!databaseId.match(/^[0-9a-f]{32}$/i)) {
      showToast(window.I18n.getMessage("toastInvalidDatabaseId"));
      return;
    }

    // Save settings
    chrome.storage.local.set({ token, databaseId, titleProperty, authorProperty, kindleRegion, ui_language }, async () => {
      notionStatusDot.classList.add('connected');

      // Re-apply translations immediately if language changed
      await window.I18n.init();
      window.I18n.applyToDOM();

      showToast(window.I18n.getMessage("toastSettingsSaved"));
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
        showToast(window.I18n.getMessage("toastNoActiveTab"));
        return;
      }

      const supportedUrls = Array.from(document.querySelectorAll('#kindleRegion option')).map(opt => opt.value);
      const onSupportedPage = supportedUrls.some(url => tab.url.startsWith(url));

      if (onSupportedPage) {
        exportWithRetry(tab.id);
      } else {
        showToast(window.I18n.getMessage("toastNavigateFirst"));
      }
    } catch (error) {
      console.error('Error getting active tab:', error);
      showToast(window.I18n.getMessage("toastFailedGetTab"));
    }
  });

  // Export with retry
  async function exportWithRetry(tabId, attempt = 1, maxAttempts = 4) {
    const baseDelay = 1000;
    spinnerText.textContent = `Exporting to Notion${attempt > 1 ? ` (Attempt ${attempt}/${maxAttempts})` : ''}...`;
    spinner.classList.remove('hidden');

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { action: 'export' }, async (response) => {
        if (chrome.runtime.lastError || !response || !response.status) {
          if (attempt < maxAttempts) {
            const delay = baseDelay * Math.pow(2, attempt - 1);
            setTimeout(() => exportWithRetry(tabId, attempt + 1, maxAttempts).then(resolve), delay);
          } else {
            spinner.classList.add('hidden');
            showToast(window.I18n.getMessage("toastExportFailed"));
            resolve();
          }
        } else {
          spinner.classList.add('hidden');
          showToast(response.status);
          console.log('Export response:', response.status);

          // Seed engagement SRS and check for in-app prompt
          if (!response.status.startsWith('Error')) {
            seedEngagement();
            const engagementType = await checkEngagement();
            if (engagementType) {
              setTimeout(() => showEngagementModal(engagementType), 1500);
            }
          }

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

  // ========================================
  // SRS Review Tab Logic
  // ========================================

  let reviewQueue = [];
  let reviewIndex = 0;
  let totalReviewCount = 0;
  let starredMode = false;
  let starredHighlights = [];
  let starredIndex = 0;

  async function loadReviewTab() {
    // Reset mode when reloading
    starredMode = false;
    showStarredModeUI(false);

    // Load stats
    chrome.runtime.sendMessage({ action: 'srs_getStats' }, (stats) => {
      if (!stats || stats.error) return;
      document.getElementById('streakCount').textContent = stats.currentStreak || 0;
      document.getElementById('vaultCount').textContent = stats.totalHighlights || 0;
      document.getElementById('starredCount').textContent = stats.starredCount || 0;
    });

    // Load daily review queue
    chrome.runtime.sendMessage({ action: 'srs_getDailyReview' }, (queue) => {
      if (!queue || queue.error) {
        showReviewState('empty');
        return;
      }

      reviewQueue = Array.isArray(queue) ? queue : [];
      totalReviewCount = reviewQueue.length;
      reviewIndex = 0;

      if (reviewQueue.length === 0) {
        // Check if vault is empty vs all reviewed today
        chrome.runtime.sendMessage({ action: 'srs_getStats' }, (stats) => {
          if (stats && stats.totalHighlights > 0) {
            showReviewState('done');
          } else {
            showReviewState('empty');
          }
        });
      } else {
        showReviewState('card');
        renderCurrentCard();
      }
    });
  }

  function toggleStarredMode() {
    if (starredMode) {
      starredMode = false;
      showStarredModeUI(false);
      if (reviewQueue.length > 0) {
        showReviewState('card');
        renderCurrentCard();
      } else {
        loadReviewTab();
      }
      return;
    }

    chrome.runtime.sendMessage({ action: 'srs_getStarred' }, (highlights) => {
      if (!highlights || highlights.error || (Array.isArray(highlights) && highlights.length === 0)) {
        showToast(window.I18n.getMessage("toastNoStarredHighlights") || "No starred highlights found.");
        return;
      }

      starredHighlights = Array.isArray(highlights) ? highlights : [];
      starredIndex = 0;
      starredMode = true;
      
      showStarredModeUI(true);
      showReviewState('card');
      renderCurrentCard();
    });
  }

  function showStarredModeUI(active) {
    const reviewActions = document.getElementById('reviewActions');
    const starredActions = document.getElementById('starredActions');
    const backBtn = document.getElementById('backToReviewBtn');
    const card = document.getElementById('reviewCard');

    if (active) {
      reviewActions.classList.add('hidden');
      starredActions.classList.remove('hidden');
      backBtn.classList.remove('hidden');
      card.classList.add('starred-mode-card');
    } else {
      reviewActions.classList.remove('hidden');
      starredActions.classList.add('hidden');
      backBtn.classList.add('hidden');
      card.classList.remove('starred-mode-card');
    }
  }

  function showReviewState(state) {
    const card = document.getElementById('reviewCard');
    const empty = document.getElementById('reviewEmpty');
    const done = document.getElementById('reviewDone');

    card.classList.add('hidden');
    empty.classList.add('hidden');
    done.classList.add('hidden');

    if (state === 'card') card.classList.remove('hidden');
    if (state === 'empty') empty.classList.remove('hidden');
    if (state === 'done') done.classList.remove('hidden');
  }

  function renderCurrentCard() {
    const list = starredMode ? starredHighlights : reviewQueue;
    const index = starredMode ? starredIndex : reviewIndex;
    const total = list.length;

    if (index >= total && total > 0 && !starredMode) {
      showReviewState('done');
      return;
    } else if (total === 0) {
      showReviewState('empty');
      return;
    }

    const h = list[index];
    const card = document.getElementById('reviewCard');

    // Remove exit animation class
    card.classList.remove('card-exit');

    document.getElementById('reviewProgress').textContent = `${index + 1} / ${total}`;
    document.getElementById('reviewColorDot').setAttribute('data-color', h.color || 'default');
    document.getElementById('reviewQuote').textContent = h.text;
    document.getElementById('reviewBook').textContent = h.bookTitle;

    const chapterEl = document.getElementById('reviewChapter');
    if (h.chapter) {
      chapterEl.textContent = h.chapter;
      chapterEl.classList.remove('hidden');
    } else {
      chapterEl.classList.add('hidden');
    }

    const noteEl = document.getElementById('reviewNote');
    if (h.note) {
      noteEl.textContent = h.note;
      noteEl.classList.remove('hidden');
    } else {
      noteEl.classList.add('hidden');
    }
  }

  function handleReviewAction(action) {
    const h = reviewQueue[reviewIndex];
    if (!h || starredMode) return;

    const card = document.getElementById('reviewCard');
    card.classList.add('card-exit');

    // Mark reviewed in background
    chrome.runtime.sendMessage({
      action: 'srs_markReviewed',
      highlightId: h.id,
      reviewAction: action
    }, () => {
      // Refresh stats
      chrome.runtime.sendMessage({ action: 'srs_getStats' }, (stats) => {
        if (stats && !stats.error) {
          document.getElementById('streakCount').textContent = stats.currentStreak || 0;
          document.getElementById('starredCount').textContent = stats.starredCount || 0;
        }
      });
    });

    // Advance to next card after animation
    setTimeout(() => {
      reviewIndex++;
      renderCurrentCard();
    }, 350);
  }

  document.getElementById('reviewDismiss').addEventListener('click', () => handleReviewAction('dismiss'));
  document.getElementById('reviewStar').addEventListener('click', () => handleReviewAction('star'));
  document.getElementById('reviewForgot').addEventListener('click', () => handleReviewAction('forgot'));

  // Starred mode listeners
  document.getElementById('viewStarredBtn').addEventListener('click', toggleStarredMode);
  document.getElementById('backToReviewBtn').addEventListener('click', toggleStarredMode);

  document.getElementById('starredPrev').addEventListener('click', () => {
    if (starredIndex > 0) {
      starredIndex--;
      renderCurrentCard();
    }
  });

  document.getElementById('starredNext').addEventListener('click', () => {
    if (starredIndex < starredHighlights.length - 1) {
      starredIndex++;
      renderCurrentCard();
    }
  });

  // ========================================
  // Engagement Modal Logic
  // ========================================

  const engagementOverlay = document.getElementById('engagementOverlay');
  const engagementIcon = document.getElementById('engagementIcon');
  const engagementTitle = document.getElementById('engagementTitle');
  const engagementDesc = document.getElementById('engagementDesc');
  const engagementCtaContent = document.getElementById('engagementCtaContent');
  const engagementCta = document.getElementById('engagementCta');
  let currentEngagementType = null;

  const ENGAGEMENT_CONTENT = {
    rate: {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
      titleKey: 'engagementRateTitle',
      titleFallback: 'Enjoying Kindle to Notion?',
      descKey: 'engagementRateDesc',
      descFallback: 'Your review helps other readers discover this extension. It only takes a moment!',
      btnKey: 'engagementRateBtn',
      btnFallback: 'Rate on Web Store',
      action: () => chrome.tabs.create({ url: ENGAGEMENT_CONFIG.reviewUrl })
    },
    share: {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
      titleKey: 'engagementShareTitle',
      titleFallback: 'Spread the Word!',
      descKey: 'engagementShareDesc',
      descFallback: 'Know someone who reads on Kindle? Share this extension with them!',
      btnKey: 'engagementShareBtn',
      btnFallback: 'Copy Share Link',
      action: async () => {
        const ok = await copyShareLink();
        if (ok) showToast(window.I18n.getMessage('toastLinkCopied') || 'Link copied to clipboard!');
        hideEngagementModal();
      }
    }
  };

  function showEngagementModal(type) {
    const content = ENGAGEMENT_CONTENT[type];
    if (!content) return;
    currentEngagementType = type;

    engagementIcon.innerHTML = content.icon;
    engagementTitle.textContent = window.I18n.getMessage(content.titleKey) || content.titleFallback;
    engagementDesc.textContent = window.I18n.getMessage(content.descKey) || content.descFallback;
    engagementCtaContent.textContent = window.I18n.getMessage(content.btnKey) || content.btnFallback;

    engagementOverlay.classList.remove('hidden');

    // Advance SRS interval so push notifications don't duplicate
    recordEngagementShown();
  }

  function hideEngagementModal() {
    engagementOverlay.classList.add('hidden');
    currentEngagementType = null;
  }

  // CTA button
  engagementCta.addEventListener('click', () => {
    const content = ENGAGEMENT_CONTENT[currentEngagementType];
    if (content) content.action();
    if (currentEngagementType !== 'share') hideEngagementModal();
  });

  // Snooze
  document.getElementById('engagementSnooze').addEventListener('click', () => {
    snoozeEngagement();
    hideEngagementModal();
  });

  // Dismiss permanently
  document.getElementById('engagementDismiss').addEventListener('click', () => {
    dismissEngagement();
    hideEngagementModal();
  });

  // Close on overlay click (outside modal)
  engagementOverlay.addEventListener('click', (e) => {
    if (e.target === engagementOverlay) {
      snoozeEngagement();
      hideEngagementModal();
    }
  });

  // ========================================
  // Settings Footer Links
  // ========================================

  document.getElementById('footerRate').addEventListener('click', () => {
    chrome.tabs.create({ url: ENGAGEMENT_CONFIG.reviewUrl });
  });

  document.getElementById('footerFeedback').addEventListener('click', () => {
    chrome.tabs.create({ url: ENGAGEMENT_CONFIG.feedbackUrl });
  });

  document.getElementById('footerShare').addEventListener('click', async () => {
    const ok = await copyShareLink();
    if (ok) showToast(window.I18n.getMessage('toastLinkCopied') || 'Link copied to clipboard!');
  });

});
