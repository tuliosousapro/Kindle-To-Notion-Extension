// OAuth Configuration for Notion Integration
// IMPORTANT: This configuration requires a backend proxy server to handle token exchange
// The client secret CANNOT be stored in the extension code (it's public)

const OAUTH_CONFIG = {
  // Notion OAuth endpoints
  authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',

  // Your Notion Integration Client ID
  // Get this from: https://www.notion.so/my-integrations
  clientId: 'YOUR_CLIENT_ID_HERE',

  // OAuth Proxy Server URL
  // This is YOUR backend server that will handle token exchange
  // See /oauth-proxy-server/ directory for implementation example
  proxyServerUrl: 'YOUR_PROXY_SERVER_URL_HERE', // e.g., 'https://your-server.com/oauth'

  // Redirect URI - must match what's configured in Notion integration settings
  // For Chrome extensions, this should be: https://<extension-id>.chromiumapp.org/oauth
  // The extension ID will be automatically determined at runtime
  redirectUri: '', // Will be set dynamically

  // OAuth response type
  responseType: 'code',

  // Owner type for the integration
  ownerType: 'user'
};

// Get the redirect URI dynamically based on extension ID
function getOAuthRedirectUri() {
  const extensionId = chrome.runtime.id;
  return `https://${extensionId}.chromiumapp.org/oauth`;
}

// Build the authorization URL
function getAuthorizationUrl() {
  const redirectUri = getOAuthRedirectUri();
  const state = generateRandomState();

  // Store state in session storage for CSRF protection
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.clientId,
    response_type: OAUTH_CONFIG.responseType,
    owner: OAUTH_CONFIG.ownerType,
    redirect_uri: redirectUri,
    state: state
  });

  return `${OAUTH_CONFIG.authorizationUrl}?${params.toString()}`;
}

// Generate random state for CSRF protection
function generateRandomState() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate OAuth configuration
function validateOAuthConfig() {
  const errors = [];

  if (!OAUTH_CONFIG.clientId || OAUTH_CONFIG.clientId === 'YOUR_CLIENT_ID_HERE') {
    errors.push('Client ID not configured. Please set your Notion integration Client ID in oauth-config.js');
  }

  if (!OAUTH_CONFIG.proxyServerUrl || OAUTH_CONFIG.proxyServerUrl === 'YOUR_PROXY_SERVER_URL_HERE') {
    errors.push('Proxy server URL not configured. Please deploy the OAuth proxy server and set the URL in oauth-config.js');
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    OAUTH_CONFIG,
    getOAuthRedirectUri,
    getAuthorizationUrl,
    generateRandomState,
    validateOAuthConfig
  };
}
