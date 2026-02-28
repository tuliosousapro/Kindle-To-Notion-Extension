document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const onboardingContainer = document.getElementById('onboarding-container');
  const progressFill = document.getElementById('progress-fill');
  const highlightOverlay = document.getElementById('highlight-overlay');
  const guideTooltip = document.getElementById('guide-tooltip');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDescription = document.getElementById('tooltip-description');
  const tooltipNext = document.getElementById('tooltip-next');
  const tooltipSkip = document.getElementById('tooltip-skip');

  // Step Elements
  const steps = document.querySelectorAll('.onboarding-step');
  const stepDots = document.querySelectorAll('.step-dot');

  // Button Elements
  const startSetupBtn = document.getElementById('start-setup');
  const skipGuideBtn = document.getElementById('skip-guide');
  const continueToSettingsBtn = document.getElementById('continue-to-settings');
  const backToWelcomeBtn = document.getElementById('back-to-welcome');
  const testConnectionBtn = document.getElementById('test-connection');
  const backToNotionBtn = document.getElementById('back-to-notion');
  const goToHighlightsBtn = document.getElementById('go-to-highlights');
  const backToSettingsBtn = document.getElementById('back-to-settings');
  const finishSetupBtn = document.getElementById('finish-setup');
  const backToKindleBtn = document.getElementById('back-to-kindle');

  // Form Input Elements
  const tokenInput = document.getElementById('onboarding-token');
  const databaseIdInput = document.getElementById('onboarding-database-id');
  const titlePropertyInput = document.getElementById('onboarding-title-prop');
  const authorPropertyInput = document.getElementById('onboarding-author-prop');
  const connectOAuthBtn = document.getElementById('connect-oauth');
  const oauthStatus = document.getElementById('oauth-status');
  const workspaceName = document.getElementById('workspace-name');

  // State
  let currentStep = 1;
  let guideCompleted = false;

  // Initialize onboarding
  initializeOnboarding();

  function initializeOnboarding() {
    // Check if user has already completed onboarding
    chrome.storage.local.get(['onboardingCompleted'], (result) => {
      if (result.onboardingCompleted) {
        // User has completed onboarding, redirect to main popup
        window.location.href = 'popup.html';
        return;
      }

      // Show onboarding
      showStep(1);
      updateProgress();
    });
  }

  // Step Navigation
  function showStep(stepNumber) {
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    stepDots.forEach(dot => dot.classList.remove('active'));

    // Show current step
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');

    currentStep = stepNumber;
    updateProgress();
  }

  function updateProgress() {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
    progressFill.style.width = `${progress}%`;
  }

  function nextStep() {
    if (currentStep < steps.length) {
      showStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  // Event Listeners for Step Navigation
  startSetupBtn.addEventListener('click', () => nextStep());

  skipGuideBtn.addEventListener('click', () => {
    completeOnboarding();
  });

  continueToSettingsBtn.addEventListener('click', () => nextStep());

  backToWelcomeBtn.addEventListener('click', () => prevStep());

  testConnectionBtn.addEventListener('click', () => {
    // Validate and save settings, then redirect to main popup with guided tour
    validateAndSaveSettings();
  });

  backToNotionBtn.addEventListener('click', () => prevStep());

  goToHighlightsBtn.addEventListener('click', () => {
    // Open Kindle highlights page
    chrome.tabs.create({ url: 'https://read.amazon.com/notebook' });
    nextStep();
  });

  backToSettingsBtn.addEventListener('click', () => prevStep());

  finishSetupBtn.addEventListener('click', () => {
    completeOnboarding();
  });

  backToKindleBtn.addEventListener('click', () => prevStep());

  // OAuth Connection
  connectOAuthBtn.addEventListener('click', () => {
    connectOAuthBtn.textContent = chrome.i18n.getMessage("toastConnecting");
    connectOAuthBtn.disabled = true;

    // Send message to background to start OAuth flow
    chrome.runtime.sendMessage({ action: 'startOAuth' }, (response) => {
      if (response && response.success) {
        // OAuth successful
        oauthStatus.style.display = 'block';
        workspaceName.textContent = response.workspace_name || 'Notion Workspace';
        connectOAuthBtn.style.display = 'none';
        showToast(chrome.i18n.getMessage("toastConnectedNotion"), 'success');

        // Fetch databases after successful OAuth
        showToast(chrome.i18n.getMessage("onboardingToastFetchingDatabases"), 'info');
        fetchAndDisplayDatabases();
      } else {
        // OAuth failed
        connectOAuthBtn.textContent = chrome.i18n.getMessage("connectWithNotion");
        connectOAuthBtn.disabled = false;
        const errorMsg = response && response.error ? response.error : chrome.i18n.getMessage("toastConnectionFailed");
        showToast(errorMsg, 'error');
      }
    });
  });

  // Fetch and display databases
  function fetchAndDisplayDatabases() {
    chrome.runtime.sendMessage({ action: 'fetchDatabases' }, (response) => {
      if (response && response.success) {
        const databases = response.databases;
        if (databases && databases.length > 0) {
          displayDatabaseSelection(databases);
          showToast(chrome.i18n.getMessage("onboardingToastFoundDatabases", [databases.length]), 'success');
        } else {
          showToast(chrome.i18n.getMessage("onboardingToastNoDatabases"), 'info');
          // Show manual entry option
          document.getElementById('database-manual-entry').style.display = 'block';
        }
      } else {
        const errorMsg = response && response.error ? response.error : 'Failed to fetch databases';
        showToast(errorMsg, 'error');
        // Fall back to manual entry
        document.getElementById('database-manual-entry').style.display = 'block';
      }
    });
  }

  // Display database selection dropdown
  function displayDatabaseSelection(databases) {
    const databaseSelection = document.getElementById('database-selection');
    const databaseDropdown = document.getElementById('database-dropdown');

    // Clear existing options
    databaseDropdown.innerHTML = '<option value="">-- Select a database --</option>';

    // Add database options
    databases.forEach(db => {
      const option = document.createElement('option');
      option.value = db.id;

      // Get database title
      let title = 'Untitled Database';
      if (db.title && db.title.length > 0 && db.title[0].plain_text) {
        title = db.title[0].plain_text;
      }

      option.textContent = title;
      databaseDropdown.appendChild(option);
    });

    // Show database selection UI
    databaseSelection.style.display = 'block';
  }

  // Handle database selection confirmation
  const confirmDatabaseBtn = document.getElementById('confirm-database');
  if (confirmDatabaseBtn) {
    confirmDatabaseBtn.addEventListener('click', () => {
      const databaseDropdown = document.getElementById('database-dropdown');
      const selectedDatabaseId = databaseDropdown.value;

      if (!selectedDatabaseId) {
        showToast(chrome.i18n.getMessage("onboardingToastSelectDatabase"), 'error');
        return;
      }

      // Remove hyphens from database ID (Notion returns UUID format with hyphens)
      // Extension expects format without hyphens
      const databaseId = selectedDatabaseId.replace(/-/g, '');

      // Save database ID to storage
      chrome.storage.local.set({ databaseId }, () => {
        showToast(chrome.i18n.getMessage("onboardingToastDatabaseSelected"), 'success');

        // Proceed to next step
        setTimeout(() => {
          nextStep();
        }, 1000);
      });
    });
  }

  // Handle manual database entry confirmation
  const confirmManualDatabaseBtn = document.getElementById('confirm-manual-database');
  if (confirmManualDatabaseBtn) {
    confirmManualDatabaseBtn.addEventListener('click', () => {
      const manualDatabaseInput = document.getElementById('manual-database-input');
      let databaseId = manualDatabaseInput.value.trim();

      if (!databaseId) {
        showToast(chrome.i18n.getMessage("onboardingToastEnterDatabaseId"), 'error');
        return;
      }

      // Database ID URL pattern extraction
      const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
      if (databaseId.startsWith('https://www.notion.so/')) {
        const match = databaseId.match(urlPattern);
        if (match) {
          databaseId = match[1].replace(/-/g, '');
        } else {
          showToast(chrome.i18n.getMessage("onboardingToastInvalidDatabaseUrl"), 'error');
          return;
        }
      }

      // Validate database ID format
      if (!databaseId.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
        showToast(chrome.i18n.getMessage("onboardingToastInvalidDatabaseId"), 'error');
        return;
      }

      // Save database ID to storage
      chrome.storage.local.set({ databaseId }, () => {
        showToast(chrome.i18n.getMessage("onboardingToastDatabaseSaved"), 'success');

        // Proceed to next step
        setTimeout(() => {
          nextStep();
        }, 1000);
      });
    });
  }

  // Complete onboarding
  function completeOnboarding() {
    guideCompleted = true;

    // Mark onboarding as completed
    chrome.storage.local.set({ onboardingCompleted: true }, () => {
      // Redirect to main popup
      window.location.href = 'popup.html';
    });
  }

  // Validate and save settings, then redirect to main popup with guided tour
  function validateAndSaveSettings() {
    const token = tokenInput.value;
    let databaseId = databaseIdInput.value.trim();
    const titleProperty = titlePropertyInput.value;
    const authorProperty = authorPropertyInput.value;

    // Database ID URL pattern extraction
    const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
    if (databaseId.startsWith('https://www.notion.so/')) {
      const match = databaseId.match(urlPattern);
      if (match) {
        databaseId = match[1].replace(/-/g, '');
        databaseIdInput.value = databaseId;
      } else {
        showToast(chrome.i18n.getMessage("onboardingToastInvalidDatabaseUrl"), 'error');
        return;
      }
    }

    // Validate database ID format
    if (!databaseId.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
      showToast(chrome.i18n.getMessage("onboardingToastInvalidDatabaseId"), 'error');
      return;
    }

    // Validate required fields
    if (!titleProperty || !authorProperty) {
      showToast(chrome.i18n.getMessage("onboardingToastFillProperties"), 'error');
      return;
    }

    // Show testing state
    testConnectionBtn.textContent = 'Testing Connection...';
    testConnectionBtn.disabled = true;

    // Simulate connection test (you could add real API validation here)
    setTimeout(() => {
      // Save settings to Chrome storage
      chrome.storage.local.set({
        token,
        databaseId,
        titleProperty,
        authorProperty
      }, () => {
        // Mark onboarding as completed
        chrome.storage.local.set({ onboardingCompleted: true }, () => {
          // Show success and redirect to main popup (which will trigger guided tour)
          testConnectionBtn.textContent = 'Setup Complete!';
          testConnectionBtn.style.background = '#10b981';

          showToast(chrome.i18n.getMessage("onboardingToastSettingsSaved"), 'success');

          setTimeout(() => {
            // Redirect to main popup - it will detect first-time user and show guided tour
            window.location.href = 'popup.html';
          }, 1500);
        });
      });
    }, 2000);
  }

  // Utility functions
  function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification show toast-${type}`;
    toast.textContent = message;

    // Apply styles matching popup.css
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(0);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#1A1A1A'};
        color: white;
        padding: 10px 20px;
        border-radius: 9999px;
        font-size: 13px;
        z-index: 10000;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
      `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
});