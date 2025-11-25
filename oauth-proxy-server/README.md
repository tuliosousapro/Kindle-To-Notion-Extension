# Notion OAuth Proxy Server

This is a secure proxy server for handling OAuth token exchange for the Kindle to Notion Extension. The client secret must be kept secure on the server side and cannot be stored in the browser extension.

## Why is this needed?

Browser extensions are public code that anyone can inspect. If we included the Notion Client Secret in the extension, anyone could extract it and use it maliciously. This proxy server keeps the secret secure while still allowing the extension to use OAuth.

## Setup Instructions

### 1. Prerequisites

- Node.js 14 or higher
- A Notion integration (create at https://www.notion.so/my-integrations)
- A hosting service (Vercel, Heroku, AWS, etc.) or your own server

### 2. Configure Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Fill in the integration details:
   - **Name**: Kindle to Notion Extension
   - **Type**: Public
   - **OAuth Domain & URIs**:
     - **Redirect URI**: Add your server URL + `/oauth/callback` (e.g., `https://your-server.com/oauth/callback`)
     - Also add: `https://YOUR_EXTENSION_ID.chromiumapp.org/oauth`
4. Copy your **Client ID** and **Client Secret**

### 3. Install Dependencies

```bash
cd oauth-proxy-server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
NOTION_CLIENT_ID=your_actual_client_id
NOTION_CLIENT_SECRET=your_actual_client_secret
PORT=3000
```

### 5. Run Locally (Development)

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 6. Deploy to Production

#### Option A: Vercel (Recommended - Free)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard:
   - `NOTION_CLIENT_ID`
   - `NOTION_CLIENT_SECRET`

#### Option B: Heroku

1. Create a Heroku app: `heroku create`
2. Set environment variables:
   ```bash
   heroku config:set NOTION_CLIENT_ID=your_client_id
   heroku config:set NOTION_CLIENT_SECRET=your_client_secret
   ```
3. Deploy: `git push heroku main`

#### Option C: Your Own Server

1. Copy files to your server
2. Install dependencies: `npm install`
3. Set environment variables
4. Run with PM2 or similar: `pm2 start server.js`

### 7. Update Extension Configuration

After deploying, update the extension's OAuth configuration:

1. Open `/source/chrome/oauth-config.js`
2. Set `proxyServerUrl` to your deployed server URL (e.g., `https://your-server.com`)
3. Set `clientId` to your Notion Client ID

## API Endpoints

### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Notion OAuth Proxy Server is running",
  "timestamp": "2025-11-25T12:00:00.000Z"
}
```

### `POST /oauth/token`
Exchange authorization code for access token

**Request:**
```json
{
  "code": "authorization_code_from_notion",
  "redirect_uri": "https://extension_id.chromiumapp.org/oauth"
}
```

**Response:**
```json
{
  "access_token": "secret_...",
  "workspace_id": "...",
  "workspace_name": "My Workspace",
  "workspace_icon": "🚀",
  "bot_id": "...",
  "owner": {...}
}
```

## Security Considerations

1. **Never commit `.env` file** - It contains your client secret
2. **Use HTTPS in production** - Required for OAuth security
3. **Keep dependencies updated** - Run `npm audit` regularly
4. **Monitor server logs** - Check for suspicious activity
5. **Rate limiting** - Consider adding rate limiting in production
6. **CORS configuration** - The server only accepts requests from browser extensions by default

## Testing

Test the health endpoint:

```bash
curl http://localhost:3000/health
```

Test token exchange (requires valid code from Notion OAuth flow):

```bash
curl -X POST http://localhost:3000/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "code": "test_code",
    "redirect_uri": "https://test.chromiumapp.org/oauth"
  }'
```

## Troubleshooting

### Error: "NOTION_CLIENT_ID and NOTION_CLIENT_SECRET must be set"
- Make sure your `.env` file exists and contains valid values
- Check that you're running the server from the correct directory

### Error: "Not allowed by CORS"
- This is expected for non-extension origins
- Extensions are automatically allowed
- For testing from localhost, add it to `ALLOWED_ORIGINS`

### Error: "token_exchange_failed"
- Check that your Client ID and Secret are correct
- Verify the redirect_uri matches what's configured in Notion
- Ensure the authorization code hasn't expired (they're single-use and short-lived)

## Support

For issues or questions:
- Check the main extension README
- Open an issue on GitHub
- Review Notion's OAuth documentation: https://developers.notion.com/docs/authorization
