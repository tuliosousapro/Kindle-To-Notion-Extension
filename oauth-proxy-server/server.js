/**
 * OAuth Proxy Server for Kindle to Notion Extension
 *
 * This server acts as a secure proxy for OAuth token exchange.
 * It keeps the Notion Client Secret secure on the server side.
 *
 * Deploy this to your preferred hosting service:
 * - Vercel (serverless)
 * - Heroku
 * - AWS Lambda
 * - Google Cloud Functions
 * - Your own server
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables - MUST be set
const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Validate environment variables
if (!NOTION_CLIENT_ID || !NOTION_CLIENT_SECRET) {
  console.error('❌ ERROR: NOTION_CLIENT_ID and NOTION_CLIENT_SECRET must be set in environment variables');
  process.exit(1);
}

// CORS configuration - only allow requests from your extension
app.use(cors({
  origin: function(origin, callback) {
    // Allow Chrome extension origins
    if (!origin || origin.startsWith('chrome-extension://') || origin.startsWith('moz-extension://')) {
      callback(null, true);
    }
    // Allow configured origins (for development/testing)
    else if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Notion OAuth Proxy Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Token Exchange Endpoint
 * POST /oauth/token
 *
 * Exchanges authorization code for access token
 */
app.post('/oauth/token', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body;

    // Validate request
    if (!code) {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'Missing authorization code'
      });
    }

    if (!redirect_uri) {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'Missing redirect_uri'
      });
    }

    console.log('📝 Token exchange request received');
    console.log('   Code:', code.substring(0, 10) + '...');
    console.log('   Redirect URI:', redirect_uri);

    // Exchange code for token with Notion
    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Notion token exchange failed:', errorText);
      return res.status(tokenResponse.status).json({
        error: 'token_exchange_failed',
        error_description: errorText
      });
    }

    const tokenData = await tokenResponse.json();

    console.log('✅ Token exchange successful');
    console.log('   Workspace:', tokenData.workspace_name);
    console.log('   Bot ID:', tokenData.bot_id);

    // Return token data to extension
    res.json({
      access_token: tokenData.access_token,
      workspace_id: tokenData.workspace_id,
      workspace_name: tokenData.workspace_name,
      workspace_icon: tokenData.workspace_icon,
      bot_id: tokenData.bot_id,
      owner: tokenData.owner
    });

  } catch (error) {
    console.error('❌ Error during token exchange:', error);
    res.status(500).json({
      error: 'server_error',
      error_description: error.message
    });
  }
});

/**
 * OAuth Callback Endpoint (Optional)
 * GET /oauth/callback
 *
 * This endpoint receives the OAuth callback from Notion
 * and redirects back to the extension with the code
 */
app.get('/oauth/callback', (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    console.error('❌ OAuth error:', error);
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head><title>OAuth Error</title></head>
        <body>
          <h1>OAuth Error</h1>
          <p>Error: ${error}</p>
          <p>You can close this window.</p>
        </body>
      </html>
    `);
  }

  if (!code) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head><title>OAuth Error</title></head>
        <body>
          <h1>OAuth Error</h1>
          <p>No authorization code received</p>
          <p>You can close this window.</p>
        </body>
      </html>
    `);
  }

  // Redirect back to extension
  // The extension should be listening for this
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>OAuth Success</title>
        <script>
          // Send message to extension
          window.opener.postMessage({
            type: 'oauth-callback',
            code: '${code}',
            state: '${state}'
          }, '*');

          // Close window after 2 seconds
          setTimeout(() => {
            window.close();
          }, 2000);
        </script>
      </head>
      <body>
        <h1>✅ Authorization Successful</h1>
        <p>You can close this window.</p>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    error: 'server_error',
    error_description: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Notion OAuth Proxy Server started');
  console.log(`   Port: ${PORT}`);
  console.log(`   Client ID: ${NOTION_CLIENT_ID}`);
  console.log(`   Allowed Origins: ${ALLOWED_ORIGINS.join(', ') || 'Chrome/Firefox extensions only'}`);
  console.log('\n📝 Endpoints:');
  console.log(`   GET  /health         - Health check`);
  console.log(`   POST /oauth/token    - Token exchange`);
  console.log(`   GET  /oauth/callback - OAuth callback (optional)`);
});
