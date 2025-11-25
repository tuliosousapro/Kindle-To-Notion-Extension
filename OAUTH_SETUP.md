# OAuth Integration Setup Guide

This guide explains how to set up OAuth authentication for the Kindle to Notion Extension. OAuth provides a more secure and user-friendly authentication method compared to manual API token entry.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Configuration](#configuration)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)

## Overview

### Why OAuth?

- **Better User Experience**: Users can authorize with one click instead of manually copying tokens
- **More Secure**: No need to manually handle API tokens
- **Workspace Selection**: Users can choose which Notion workspace to connect
- **Automatic Token Management**: The extension handles token storage automatically

### How it Works

```
┌─────────────────┐
│  User clicks    │
│ "Connect with   │
│    Notion"      │
└────────┬────────┘
         │
         v
┌─────────────────────────────┐
│ Extension opens Notion      │
│ authorization page          │
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│ User authorizes access      │
│ in Notion                   │
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│ Notion redirects with       │
│ authorization code          │
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│ Extension sends code to     │
│ your proxy server           │
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│ Proxy server exchanges      │
│ code for access token       │
│ using client secret         │
└────────┬────────────────────┘
         │
         v
┌─────────────────────────────┐
│ Extension receives token    │
│ and stores it securely      │
└─────────────────────────────┘
```

## Architecture

The OAuth implementation consists of three main components:

1. **Browser Extension (Client)**: Initiates OAuth flow using `chrome.identity.launchWebAuthFlow()`
2. **Proxy Server (Backend)**: Handles secure token exchange with Notion API
3. **Notion API**: Provides OAuth endpoints and issues access tokens

### Why a Proxy Server?

Browser extensions are public code that anyone can inspect. The Notion OAuth flow requires a **Client Secret** that MUST be kept secure. The proxy server:
- Keeps the Client Secret secure on the server side
- Exchanges authorization codes for access tokens
- Returns only the access token to the extension

## Prerequisites

Before setting up OAuth, you need:

1. **Node.js** 14 or higher (for proxy server)
2. **Notion Account** with access to create integrations
3. **Hosting Service** for the proxy server:
   - Vercel (recommended - free tier available)
   - Heroku
   - AWS Lambda
   - Google Cloud Functions
   - Your own server

## Step-by-Step Setup

### Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in the details:
   - **Name**: `Kindle to Notion Extension`
   - **Type**: Select **"Public"** (for OAuth)
   - **Associated workspace**: Choose your workspace
4. Click **"Submit"**

### Step 2: Configure OAuth Settings

1. In your integration settings, find the **"OAuth Domain & URIs"** section
2. Add the following **Redirect URIs**:
   ```
   https://YOUR_PROXY_SERVER_URL.com/oauth/callback
   https://YOUR_EXTENSION_ID.chromiumapp.org/oauth
   ```
   *Note: You'll get the extension ID after installing the extension*
3. Copy and save:
   - **Client ID** (visible)
   - **Client Secret** (click "Show" to reveal - KEEP THIS SECRET!)

### Step 3: Set Up the Proxy Server

#### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the proxy server directory:
   ```bash
   cd oauth-proxy-server
   npm install
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to deploy

5. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `NOTION_CLIENT_ID` = your client ID
     - `NOTION_CLIENT_SECRET` = your client secret

#### Option B: Deploy to Heroku

1. Create a Heroku account and install Heroku CLI

2. Create a new Heroku app:
   ```bash
   cd oauth-proxy-server
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set NOTION_CLIENT_ID=your_client_id
   heroku config:set NOTION_CLIENT_SECRET=your_client_secret
   ```

4. Deploy:
   ```bash
   git add oauth-proxy-server
   git commit -m "Add OAuth proxy server"
   git push heroku main
   ```

#### Option C: Run Locally (Development Only)

1. Navigate to proxy server directory:
   ```bash
   cd oauth-proxy-server
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your credentials:
   ```env
   NOTION_CLIENT_ID=your_client_id_here
   NOTION_CLIENT_SECRET=your_client_secret_here
   PORT=3000
   ```

4. Run the server:
   ```bash
   npm start
   ```

### Step 4: Configure the Extension

1. Open `/source/chrome/oauth-config.js`

2. Update the configuration:
   ```javascript
   const OAUTH_CONFIG = {
     authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',
     clientId: 'YOUR_CLIENT_ID_HERE',  // Your Notion Client ID
     proxyServerUrl: 'https://your-deployed-server.com',  // Your proxy server URL
     responseType: 'code',
     ownerType: 'user'
   };
   ```

3. Alternatively, you can store these in `chrome.storage.local` via the extension's settings UI

### Step 5: Update Notion Integration Redirect URIs

After installing the extension:

1. Get your extension ID:
   - Go to `chrome://extensions`
   - Find "Kindle to Notion Extension"
   - Copy the ID (e.g., `abcdefghijklmnop`)

2. Add to Notion integration redirect URIs:
   ```
   https://abcdefghijklmnop.chromiumapp.org/oauth
   ```

## Configuration

### Extension Configuration

The extension can be configured in two ways:

#### 1. Direct in Code (`oauth-config.js`)

```javascript
const OAUTH_CONFIG = {
  clientId: 'your-client-id',
  proxyServerUrl: 'https://your-server.com'
};
```

#### 2. Via Extension Storage (Recommended for Distribution)

Users can configure OAuth settings through a settings page:

```javascript
chrome.storage.local.set({
  oauthClientId: 'your-client-id',
  oauthProxyUrl: 'https://your-server.com'
});
```

### Proxy Server Configuration

All configuration is done via environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NOTION_CLIENT_ID` | Yes | Your Notion integration Client ID |
| `NOTION_CLIENT_SECRET` | Yes | Your Notion integration Client Secret (KEEP SECRET!) |
| `PORT` | No | Server port (default: 3000) |
| `ALLOWED_ORIGINS` | No | Additional CORS origins (comma-separated) |

## Testing

### Test the Proxy Server

1. Health check:
   ```bash
   curl https://your-server.com/health
   ```

   Expected response:
   ```json
   {
     "status": "ok",
     "message": "Notion OAuth Proxy Server is running",
     "timestamp": "2025-11-25T12:00:00.000Z"
   }
   ```

### Test OAuth Flow

1. Load the extension in Chrome
2. Open onboarding or settings
3. Click "Connect with Notion"
4. Authorize in Notion
5. Verify you're redirected back to the extension
6. Check that the token is stored:
   ```javascript
   chrome.storage.local.get(['token', 'workspace_name'], console.log)
   ```

### Debugging

Enable logging in:
- **Extension**: Check browser console in extension popup
- **Background script**: Inspect service worker in `chrome://extensions`
- **Proxy server**: Check server logs

## Deployment Checklist

Before deploying to production:

- [ ] Proxy server is deployed and accessible via HTTPS
- [ ] Environment variables are set correctly
- [ ] Notion integration is configured with correct redirect URIs
- [ ] Extension ID is added to Notion redirect URIs
- [ ] OAuth configuration in extension is updated
- [ ] Testing completed successfully
- [ ] Client Secret is never committed to version control
- [ ] Server logs are monitored
- [ ] CORS is properly configured
- [ ] HTTPS is enforced (no HTTP)

## Troubleshooting

### Error: "OAuth not configured"

**Cause**: Client ID or Proxy Server URL is not set

**Solution**:
1. Check `oauth-config.js` has correct values
2. Or ensure values are stored in `chrome.storage.local`
3. Verify proxy server is deployed and running

### Error: "OAuth state mismatch"

**Cause**: CSRF protection detected a potential attack or session expired

**Solution**:
1. Try the OAuth flow again
2. Clear extension storage and retry
3. Check for browser extensions interfering with cookies

### Error: "token_exchange_failed"

**Cause**: Proxy server couldn't exchange code for token

**Solution**:
1. Verify Client ID and Secret are correct
2. Check redirect URI matches exactly what's in Notion
3. Ensure authorization code hasn't expired (they're single-use)
4. Check proxy server logs for detailed error

### Error: "Not allowed by CORS"

**Cause**: Request is being blocked by CORS policy

**Solution**:
1. Verify the request is coming from the extension (should be allowed automatically)
2. Check `ALLOWED_ORIGINS` environment variable if testing from web page
3. Ensure server is properly configured for CORS

### OAuth Button Doesn't Respond

**Cause**: JavaScript error or missing dependencies

**Solution**:
1. Check browser console for errors
2. Verify all OAuth files are loaded correctly
3. Ensure `chrome.identity` permission is in manifest.json

## Security Considerations

### DO:
✅ Keep Client Secret on server side only
✅ Use HTTPS for all production servers
✅ Validate state parameter for CSRF protection
✅ Store tokens securely in `chrome.storage.local`
✅ Monitor server logs for suspicious activity
✅ Rotate Client Secret periodically
✅ Use environment variables for secrets
✅ Implement rate limiting on proxy server

### DON'T:
❌ Never commit Client Secret to version control
❌ Never expose Client Secret in extension code
❌ Don't log access tokens in server logs
❌ Don't store tokens in localStorage (use chrome.storage)
❌ Don't disable HTTPS in production
❌ Don't share your Client Secret publicly

## Additional Resources

- [Notion OAuth Documentation](https://developers.notion.com/docs/authorization)
- [Chrome Extension Identity API](https://developer.chrome.com/docs/extensions/reference/identity/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [Proxy Server README](./oauth-proxy-server/README.md)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs for errors
3. Open an issue on GitHub
4. Check Notion's developer documentation

---

**Note**: This OAuth implementation requires a backend server to keep the Client Secret secure. This is a standard practice for OAuth in browser extensions and ensures your integration remains secure.
