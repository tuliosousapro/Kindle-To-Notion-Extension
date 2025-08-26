document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('token');
  const databaseIdInput = document.getElementById('databaseId');
  const titlePropertyInput = document.getElementById('titleProperty');
  const authorPropertyInput = document.getElementById('authorProperty');
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

  // Load saved settings
  chrome.storage.local.get(['token', 'databaseId', 'titleProperty', 'authorProperty'], (result) => {
    tokenInput.value = result.token || '';
    databaseIdInput.value = result.databaseId || '';
    titlePropertyInput.value = result.titleProperty || 'Título do Livro';
    authorPropertyInput.value = result.authorProperty || 'Autor';
    if (result.token) {
      tokenInput.type = 'password';
      eyeIcon.classList.add('hidden');
      slashedEyeIcon.classList.remove('hidden');
      console.log('Token loaded, set to password with slashed-eye icon');
    } else {
      console.log('No token, set to text with eye icon');
    }
  });

  // Set version info from manifest
  fetch(chrome.runtime.getURL('manifest.json'))
    .then((response) => response.json())
    .then((manifest) => {
      versionInfo.textContent = `v${manifest.version}`;
    });

  // Toggle token visibility
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

  // Navigate to highlights page
  navigateButton.addEventListener('click', () => {
    chrome.tabs.update({ url: 'https://read.amazon.com/notebook' }, () => {
      spinner.classList.remove('hidden');
      spinnerIcon.classList.add('hidden');
      spinnerText.textContent = 'Navigating to Kindle highlights...';
      setTimeout(() => {
        spinner.classList.add('hidden');
        spinnerText.textContent = '';
      }, 2000);
    });
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const token = tokenInput.value;
    let databaseId = databaseIdInput.value.trim();
    const titleProperty = titlePropertyInput.value;
    const authorProperty = authorPropertyInput.value;

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

    chrome.storage.local.set({ token, databaseId, titleProperty, authorProperty }, () => {
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

  // Export to Notion
  exportButton.addEventListener('click', () => {
    spinner.classList.remove('hidden');
    spinnerIcon.classList.remove('hidden');
    spinnerText.textContent = 'Exporting to Notion...';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url.startsWith('https://ler.amazon.com.br/notebook') || tabs[0].url.startsWith('https://read.amazon.com/notebook')) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'export' }, (response) => {
          spinner.classList.remove('hidden');
          spinnerIcon.classList.add('hidden');
          if (chrome.runtime.lastError) {
            spinnerText.textContent = 'Oops! Unable to connect to the Kindle page. Please try again.';
          } else if (response && response.status) {
            spinnerText.textContent = response.status;
          } else {
            spinnerText.textContent = 'Oops! Something went wrong during export. Please check your settings and try again.';
          }
          setTimeout(() => {
            spinner.classList.add('hidden');
            spinnerText.textContent = '';
          }, 2000);
        });
      } else {
        spinner.classList.remove('hidden');
        spinnerIcon.classList.add('hidden');
        spinnerText.textContent = 'Oops! Please navigate to the Kindle highlights page first.';
        setTimeout(() => {
          spinner.classList.add('hidden');
          spinnerText.textContent = '';
        }, 2000);
      }
    });
  });
});