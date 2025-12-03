// OAuth Configuration for Notion Integration
// IMPORTANT: This configuration requires a backend proxy server to handle token exchange
// The client secret CANNOT be stored in the extension code (it's public)

export const OAUTH_CONFIG = {
  // Notion OAuth endpoints
  authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',

  // Your Notion Integration Client ID
  // Get this from: https://www.notion.so/my-integrations
  clientId: '292d872b-594c-80bc-abbb-0037789b7b0c',

  // OAuth Proxy Server URL
  // This is YOUR backend server that will handle token exchange
  // See /oauth-proxy-server/ directory for implementation example
  proxyServerUrl: 'https://kindle2notion-drab.vercel.app',

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
export function getOAuthRedirectUri() {
  const extensionId = chrome.runtime.id;
  return `https://${extensionId}.chromiumapp.org/oauth`;
}

// Generate random state for CSRF protection
export function generateRandomState() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Build the authorization URL
export function buildAuthorizationUrl() {
  const redirectUri = getOAuthRedirectUri();
  const state = generateRandomState();

  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.clientId,
    response_type: OAUTH_CONFIG.responseType,
    owner: OAUTH_CONFIG.ownerType,
    redirect_uri: redirectUri,
    state: state
  });

  return {
    url: `${OAUTH_CONFIG.authorizationUrl}?${params.toString()}`,
    state: state
  };
}
