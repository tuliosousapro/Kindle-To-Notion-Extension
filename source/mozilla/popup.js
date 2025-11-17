document.addEventListener('DOMContentLoaded', () => {
  // Check if this is the user's first time opening the main popup
  chrome.storage.local.get(['firstTimeMainPopup', 'onboardingCompleted'], (result) => {
    if (result.onboardingCompleted && !result.firstTimeMainPopup) {
      // First time opening main popup after onboarding, show guided tour
      chrome.storage.local.set({ firstTimeMainPopup: true }, () => {
        setTimeout(() => {
          startGuidedTour();
        }, 1000); // Delay to ensure DOM is fully loaded
      });
    }
  });
  // Tab logic
  const tabActionBtn = document.getElementById('tab-action-btn');
  const tabOptionsBtn = document.getElementById('tab-options-btn');
  const tabAction = document.getElementById('tab-action');
  const tabOptions = document.getElementById('tab-options');

  tabActionBtn.addEventListener('click', () => {
    tabActionBtn.classList.add('active');
    tabOptionsBtn.classList.remove('active');
    tabAction.classList.remove('hidden');
    tabOptions.classList.add('hidden');
  });

  tabOptionsBtn.addEventListener('click', () => {
    tabOptionsBtn.classList.add('active');
    tabActionBtn.classList.remove('active');
    tabOptions.classList.remove('hidden');
    tabAction.classList.add('hidden');
  });

  // Accessibility: allow tab switching with keyboard
  [tabActionBtn, tabOptionsBtn].forEach((btn, idx) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = idx === 0 ? tabOptionsBtn : tabActionBtn;
        next.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        btn.click();
      }
    });
  });

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
  const spinnerIcon = document.querySelector('.spinner');
  const eyeIcon = toggleTokenIcon.querySelector('.eye-icon:not(.hidden)');
  const slashedEyeIcon = toggleTokenIcon.querySelector('.eye-icon.hidden');
  const versionInfo = document.getElementById('versionInfo');

  chrome.storage.local.get(['token', 'databaseId', 'titleProperty', 'authorProperty', 'kindleRegion'], (result) => {
    tokenInput.value = result.token || '';
    databaseIdInput.value = result.databaseId || '';
    titlePropertyInput.value = result.titleProperty || 'Título do Livro';
    authorPropertyInput.value = result.authorProperty || 'Autor';
    kindleRegionInput.value = result.kindleRegion || 'https://read.amazon.com/notebook';
    if (result.token) {
      tokenInput.type = 'password';
      eyeIcon.classList.add('hidden');
      slashedEyeIcon.classList.remove('hidden');
      console.log('Token loaded, set to password with slashed-eye icon');
    } else {
      console.log('No token, set to text with eye icon');
    }
  });

  fetch(chrome.runtime.getURL('manifest.json'))
    .then((response) => response.json())
    .then((manifest) => {
      versionInfo.textContent = `v${manifest.version}`;
    });

  toggleTokenIcon.addEventListener('click', () => {
    if (tokenInput.type === 'password') {
      tokenInput.type = 'text';
      eyeIcon.classList.remove('hidden');
      slashedEyeIcon.classList.add('hidden');
      console.log('Toggled to visible: text, eye icon');
    } else {
      tokenInput.type = 'password';
      eyeIcon.classList.add('hidden');
      slashedEyeIcon.classList.remove('hidden');
      console.log('Toggled to hidden: password, slashed-eye icon');
    }
  });

  navigateButton.addEventListener('click', () => {
    chrome.storage.local.get(['kindleRegion'], (result) => {
      const region = result.kindleRegion || 'https://read.amazon.com/notebook';
      chrome.tabs.update({ url: region }, () => {
        spinner.classList.remove('hidden');
        spinnerIcon.classList.add('hidden');
        spinnerText.textContent = 'Navigating to Kindle highlights...';
        setTimeout(() => {
          spinner.classList.add('hidden');
          spinnerText.textContent = '';
        }, 2000);
      });
    });
  });

  saveButton.addEventListener('click', () => {
    const token = tokenInput.value;
    let databaseId = databaseIdInput.value.trim();
    const titleProperty = titlePropertyInput.value;
    const authorProperty = authorPropertyInput.value;
    const kindleRegion = kindleRegionInput.value;

    const urlPattern = /([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})/i;
    if (databaseId.startsWith('https://www.notion.so/')) {
      const match = databaseId.match(urlPattern);
      if (match) {
        databaseId = match[1].replace(/-/g, '');
        databaseIdInput.value = databaseId;
        spinner.classList.remove('hidden');
        spinnerIcon.classList.add('hidden');
        spinnerText.textContent = 'Valid Database ID extracted!';
        setTimeout(() => {
          spinner.classList.add('hidden');
          spinnerText.textContent = '';
        }, 2000);
      } else {
        spinner.classList.remove('hidden');
        spinnerIcon.classList.add('hidden');
        spinnerText.textContent = 'Oops! Please enter a valid Notion URL or Database ID.';
        setTimeout(() => {
          spinner.classList.add('hidden');
          spinnerText.textContent = '';
        }, 2000);
        return;
      }
    }

    if (!databaseId.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
      spinner.classList.remove('hidden');
      spinnerIcon.classList.add('hidden');
      spinnerText.textContent = 'Oops! Please enter a valid 32-character Database ID.';
      setTimeout(() => {
        spinner.classList.add('hidden');
        spinnerText.textContent = '';
      }, 2000);
      return;
    }

    if (!titleProperty || !authorProperty) {
      spinner.classList.remove('hidden');
      spinnerIcon.classList.add('hidden');
      spinnerText.textContent = 'Oops! Please fill in both Title and Author property names.';
      setTimeout(() => {
        spinner.classList.add('hidden');
        spinnerText.textContent = '';
      }, 2000);
      return;
    }

    chrome.storage.local.set({ token, databaseId, titleProperty, authorProperty, kindleRegion }, () => {
      spinner.classList.remove('hidden');
      spinnerIcon.classList.add('hidden');
      spinnerText.textContent = 'Settings saved successfully!';
      tokenInput.type = 'password';
      eyeIcon.classList.add('hidden');
      slashedEyeIcon.classList.remove('hidden');
      console.log('Settings saved, token masked with slashed-eye icon');
      setTimeout(() => {
        spinner.classList.add('hidden');
        spinnerText.textContent = '';
      }, 2000);
    });
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'progress') {
      spinnerText.textContent = msg.status;
    }
  });

  async function exportWithRetry(tabId, attempt = 1, maxAttempts = 4) {
    const baseDelay = 1000;
    spinnerText.textContent = `Exporting to Notion${attempt > 1 ? ` (Attempt ${attempt}/${maxAttempts})...` : '...'}`;
    spinner.classList.remove('hidden');
    spinnerIcon.classList.remove('hidden');

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { action: 'export' }, (response) => {
        if (chrome.runtime.lastError || !response || !response.status) {
          if (attempt < maxAttempts) {
            const delay = baseDelay * Math.pow(2, attempt - 1);
            setTimeout(() => exportWithRetry(tabId, attempt + 1, maxAttempts).then(resolve), delay);
          } else {
            spinnerIcon.classList.add('hidden');
            spinnerText.textContent = 'Oops! Export failed after 4 attempts. Please check your internet or Notion settings.';
            setTimeout(() => {
              spinner.classList.add('hidden');
              spinnerText.textContent = '';
            }, 5000);
            resolve();
          }
        } else {
          spinnerIcon.classList.add('hidden');
          spinnerText.textContent = response.status;
          console.log('Popup received final response:', response.status);
          setTimeout(() => {
            spinner.classList.add('hidden');
            spinnerText.textContent = '';
          }, 5000);
          resolve();
        }
      });
    });
  }

  // Status badge logic (simulate for now)
  function updateStatus() {
    // Simulate: check if user is logged in to Amazon/Notion
    // Replace with real logic if available
    document.getElementById('amazonStatus').querySelector('.status-dot').classList.add('connected');
    document.getElementById('notionStatus').querySelector('.status-dot').classList.add('connected');
  }
  updateStatus();

  // Toast feedback
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // Show spinner and feedback during export
  exportButton.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        showToast('Error: No active tab found');
        return;
      }
      exportWithRetry(tab.id);
    } catch (error) {
      console.error('Error getting active tab:', error);
      showToast('Error: Failed to get active tab');
    }
  });
  // Guided Tour for Main Popup
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

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'guide-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'guide-tooltip';
    tooltip.style.cssText = `
      position: fixed;
      z-index: 1001;
      max-width: 280px;
      background: var(--bg, #fff);
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border: 1px solid var(--input-border, #ccc);
      color: var(--fg, #222);
    `;

    tooltip.innerHTML = `
      <div style="position: relative;">
        <div class="tooltip-arrow" style="
          position: absolute;
          width: 0;
          height: 0;
          border: 8px solid transparent;
        "></div>
        <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${step.title}</h4>
        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.4; color: var(--fg-secondary, #666);">${step.description}</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button class="guide-skip" style="
            background: transparent;
            color: var(--button-bg, #007bff);
            border: 1px solid var(--input-border, #ccc);
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
          ">Skip Tour</button>
          <button class="guide-next" style="
            background: var(--button-bg, #007bff);
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          ">${currentGuideStep === guideSteps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    positionTooltip(element, tooltip, step);

    // Highlight element
    element.style.position = 'relative';
    element.style.zIndex = '1002';
    element.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.3)';
    element.style.borderRadius = '4px';

    // Event listeners
    tooltip.querySelector('.guide-next').addEventListener('click', nextGuideStep);
    tooltip.querySelector('.guide-skip').addEventListener('click', endGuidedTour);
  }

  function positionTooltip(element, tooltip, step) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    switch (step.position) {
      case 'top':
        top = rect.top - tooltipRect.height - 10;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        document.querySelector('.tooltip-arrow').style.cssText = `
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: var(--bg, #fff);
          border-bottom: none;
        `;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        document.querySelector('.tooltip-arrow').style.cssText = `
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-bottom-color: var(--bg, #fff);
          border-top: none;
        `;
        break;
    }

    // Ensure tooltip stays within viewport
    if (left < 10) left = 10;
    if (left + tooltip.offsetWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltip.offsetWidth - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltip.offsetHeight > window.innerHeight - 10) {
      top = window.innerHeight - tooltip.offsetHeight - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  function nextGuideStep() {
    // Clear previous highlighting
    const prevElement = document.querySelector(guideSteps[currentGuideStep]?.element);
    if (prevElement) {
      prevElement.style.boxShadow = '';
      prevElement.style.zIndex = '';
    }

    // Remove previous overlay and tooltip
    const overlay = document.getElementById('guide-overlay');
    const tooltip = document.getElementById('guide-tooltip');
    if (overlay) document.body.removeChild(overlay);
    if (tooltip) document.body.removeChild(tooltip);

    currentGuideStep++;
    showGuideStep();
  }

  function endGuidedTour() {
    // Clear all highlighting
    guideSteps.forEach(step => {
      const element = document.querySelector(step.element);
      if (element) {
        element.style.boxShadow = '';
        element.style.zIndex = '';
      }
    });

    // Remove overlay and tooltip
    const overlay = document.getElementById('guide-overlay');
    const tooltip = document.getElementById('guide-tooltip');
    if (overlay) document.body.removeChild(overlay);
    if (tooltip) document.body.removeChild(tooltip);
  }

  // Add keyboard support for guided tour
  document.addEventListener('keydown', (e) => {
    const tooltip = document.getElementById('guide-tooltip');
    if (!tooltip) return;

    if (e.key === 'Escape') {
      endGuidedTour();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextGuideStep();
    }
  });
});