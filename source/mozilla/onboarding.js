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
      connectOAuthBtn.textContent = 'Connecting...';
      connectOAuthBtn.disabled = true;

      // Send message to background to start OAuth flow
      chrome.runtime.sendMessage({ action: 'startOAuth' }, (response) => {
        if (response && response.success) {
          // OAuth successful
          oauthStatus.style.display = 'block';
          workspaceName.textContent = response.workspace_name || 'Notion Workspace';
          connectOAuthBtn.style.display = 'none';
          showToast('Successfully connected to Notion!', 'success');

          // Fetch databases after successful OAuth
          showToast('Fetching your databases...', 'info');
          fetchAndDisplayDatabases();
        } else {
          // OAuth failed
          connectOAuthBtn.textContent = 'Connect with Notion';
          connectOAuthBtn.disabled = false;
          const errorMsg = response && response.error ? response.error : 'OAuth connection failed';
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
            showToast(`Found ${databases.length} database(s)`, 'success');
          } else {
            showToast('No databases found. Please create a database in Notion first.', 'info');
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
          showToast('Please select a database', 'error');
          return;
        }

        // Remove hyphens from database ID (Notion returns UUID format with hyphens)
        // Extension expects format without hyphens
        const databaseId = selectedDatabaseId.replace(/-/g, '');

        // Save database ID to storage
        chrome.storage.local.set({ databaseId }, () => {
          showToast('Database selected!', 'success');

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
          showToast('Please enter a database ID', 'error');
          return;
        }

        // Database ID URL pattern extraction
        const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
        if (databaseId.startsWith('https://www.notion.so/')) {
          const match = databaseId.match(urlPattern);
          if (match) {
            databaseId = match[1].replace(/-/g, '');
          } else {
            showToast('Please enter a valid Notion database URL or ID', 'error');
            return;
          }
        }

        // Validate database ID format
        if (!databaseId.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
          showToast('Please enter a valid 32-character Database ID', 'error');
          return;
        }

        // Save database ID to storage
        chrome.storage.local.set({ databaseId }, () => {
          showToast('Database ID saved!', 'success');

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
        showToast('Please enter a valid Notion database URL or ID', 'error');
        return;
      }
    }

    // Validate database ID format
    if (!databaseId.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
      showToast('Please enter a valid 32-character Database ID', 'error');
      return;
    }

    // Validate required fields
    if (!titleProperty || !authorProperty) {
      showToast('Please fill in both Title and Author property names', 'error');
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

          showToast('Settings saved successfully! Starting guided tour...', 'success');

          setTimeout(() => {
            // Redirect to main popup - it will detect first-time user and show guided tour
            window.location.href = 'popup.html';
          }, 1500);
        });
      });
    }, 2000);
  }

  // Guided Tour Functionality
    let currentGuideStep = 0;
    const guideSteps = [
      {
        element: '#tab-action-btn',
        title: 'Highlights Tab',
        description: 'This is where you\'ll export your Kindle highlights to Notion.',
        position: 'bottom'
      },
      {
        element: '#export',
        title: 'Export Button',
        description: 'Click this button when you\'re on your Kindle highlights page to sync your notes.',
        position: 'top'
      },
      {
        element: '#navigateHighlights',
        title: 'Go to Highlights',
        description: 'Quickly navigate to your Kindle highlights page from here.',
        position: 'top'
      },
      {
        element: '#tab-options-btn',
        title: 'Settings Tab',
        description: 'Configure your Notion integration, database settings, and preferences here.',
        position: 'bottom'
      }
    ];
    
    function startGuidedTour() {
      currentGuideStep = 0;
      showGuideStep();
    }
    
    function showGuideStep() {
      if (currentGuideStep >= guideSteps.length) {
        endGuidedTour();
        return;
      }
      
      const step = guideSteps[currentGuideStep];
      const element = document.querySelector(step.element);
      
      if (!element) {
        currentGuideStep++;
        showGuideStep();
        return;
      }
      
      // Position tooltip
      positionTooltip(element, step);
      
      // Update tooltip content
      tooltipTitle.textContent = step.title;
      tooltipDescription.textContent = step.description;
      
      // Show tooltip
      guideTooltip.classList.remove('hidden');
      highlightOverlay.classList.remove('hidden');
      
      // Highlight element
      element.style.position = 'relative';
      element.style.zIndex = '1002';
      element.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.3)';
    }
    
    function positionTooltip(element, step) {
      const rect = element.getBoundingClientRect();
      const tooltipRect = guideTooltip.getBoundingClientRect();
      
      let top, left;
      
      switch (step.position) {
        case 'top':
          top = rect.top - tooltipRect.height - 10;
          left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
          document.querySelector('.tooltip-arrow').className = 'tooltip-arrow bottom';
          break;
        case 'bottom':
          top = rect.bottom + 10;
          left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
          document.querySelector('.tooltip-arrow').className = 'tooltip-arrow top';
          break;
        case 'left':
          top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
          left = rect.left - tooltipRect.width - 10;
          document.querySelector('.tooltip-arrow').className = 'tooltip-arrow right';
          break;
        case 'right':
          top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
          left = rect.right + 10;
          document.querySelector('.tooltip-arrow').className = 'tooltip-arrow left';
          break;
      }
      
      // Ensure tooltip stays within viewport
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top < 10) top = 10;
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipRect.height - 10;
      }
      
      guideTooltip.style.top = `${top}px`;
      guideTooltip.style.left = `${left}px`;
    }
    
    function nextGuideStep() {
      // Clear previous highlighting
      const prevElement = document.querySelector(guideSteps[currentGuideStep]?.element);
      if (prevElement) {
        prevElement.style.boxShadow = '';
        prevElement.style.zIndex = '';
      }
      
      currentGuideStep++;
      showGuideStep();
    }
    
    function endGuidedTour() {
      guideTooltip.classList.add('hidden');
      highlightOverlay.classList.add('hidden');
      
      // Clear all highlighting
      guideSteps.forEach(step => {
        const element = document.querySelector(step.element);
        if (element) {
          element.style.boxShadow = '';
          element.style.zIndex = '';
        }
      });
    }
    
    // Event listeners for guided tour
    tooltipNext.addEventListener('click', nextGuideStep);
    tooltipSkip.addEventListener('click', endGuidedTour);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (guideTooltip.classList.contains('hidden')) return;
      
      if (e.key === 'Escape') {
        endGuidedTour();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextGuideStep();
      }
    });
    
    // Utility functions
    function showToast(message, type = 'info') {
      // Create toast element
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6b7280'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: toastSlideIn 0.3s ease;
      `;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }
    
    // Add toast animations to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes toastSlideOut {
        from {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    `;
    document.head.appendChild(style);
  });