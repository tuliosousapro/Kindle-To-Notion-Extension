# CLAUDE.md - AI Assistant Guide for Kindle-To-Notion-Extension

## Project Overview

Kindle to Notion Extension is a browser extension (v1.6.0) that exports Kindle highlights and notes directly to Notion databases with a single click. Built with vanilla JavaScript, it supports Chrome, Edge, and Firefox.

**Key Characteristics:**
- No build process required - pure vanilla JavaScript
- Zero external npm dependencies
- Manifest V3 (WebExtension API)
- Supports 12 Kindle regional domains

## Architecture

```
Kindle-To-Notion-Extension/
├── source/                    # Main extension source code
│   ├── chrome/               # Chrome extension (primary)
│   ├── edge/                 # Edge extension
│   └── mozilla/              # Firefox extension
├── docs/                     # Static marketing website
├── gitbook/                  # Technical documentation
├── assets/                   # Marketing images
├── release notes/            # Version history
└── .github/                  # GitHub templates & config
```

## Core Files (per browser)

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration (MV3) |
| `popup.html/js/css` | Main extension UI |
| `contentScript.js` | Data extraction from Kindle pages |
| `background.js` | Service worker - Notion API integration |
| `onboarding.html/js/css` | First-time setup wizard |
| `welcome.html/js/css` | Installation welcome page |
| `icons/` | Extension icons (16, 48, 96, 128px) |

## Data Flow

1. User opens Kindle notebook page
2. `contentScript.js` extracts highlights, notes, colors, book metadata
3. User clicks "Export to Notion" in popup
4. `popup.js` sends message to content script
5. Content script sends data to `background.js` (service worker)
6. `background.js` calls Notion API to create/update pages
7. Toast notification shows result

## Code Conventions

### JavaScript Standards

- **ES6+** syntax required
- **No inline scripts** (Content Security Policy compliance)
- Clear, descriptive commit messages
- All scripts use `console.log()` for debugging

### File Naming

- Use camelCase for JS files: `contentScript.js`, `background.js`
- HTML/CSS pairs: `popup.html` + `popup.js` + `popup.css`
- Icon naming: `iconXX.png` (XX = size in pixels)

### CSS Conventions

- Use CSS custom properties (variables) for theming
- Glassmorphic design with backdrop-filter
- Naming convention: descriptive class names
- Key CSS variable categories:
  - `--gradient-*` for colors
  - `--glass-*` for transparency effects
  - `--space-*` for spacing scale
  - `--radius-*` for border radius
  - `--transition-*` for animations

### Error Handling

- Retry logic with exponential backoff (1s, 2s, 4s, 8s)
- 10-second timeout on fetch calls
- User-facing toast notifications for errors
- Console logging for debugging

## Important Patterns

### DOM Selector Strategy

`contentScript.js` uses multiple fallback selectors for robustness:

```javascript
// Primary selector
let element = document.querySelector('.primary-selector');
// Fallback
if (!element) element = document.querySelector('.fallback-selector');
```

### Notion API Integration

- API version: `2022-06-28`
- Batch limit: 100 blocks per request
- Color mapping:
  - blue → blue_background
  - yellow → yellow_background
  - green → green_background
  - red → red_background
  - pink → pink_background
  - orange → orange_background
  - default → gray_background

### Storage

Uses `chrome.storage.local` for:
- `notionToken` - Notion API key
- `databaseId` - Notion database ID
- `bookTitleProperty` - Custom property name
- `authorProperty` - Custom property name
- `kindleRegion` - Selected Kindle region
- `onboardingCompleted` - Boolean flag

### Message Passing

```javascript
// Content script → Background
chrome.runtime.sendMessage({ action: 'exportToNotion', data: {...} });

// Popup → Content script
chrome.tabs.sendMessage(tabId, { action: 'getHighlights' });
```

## Development Workflow

### Local Testing

1. Open `chrome://extensions` (or browser equivalent)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `/source/chrome/` (or edge/mozilla)

### Debugging

- **Popup**: Right-click extension icon → Inspect
- **Content script**: DevTools on Kindle page
- **Background**: Extension menu → "Inspect views: service worker"

### Making Changes

1. Edit files in `/source/chrome/`
2. Copy changes to `/source/edge/` and `/source/mozilla/`
3. Only manifest.json differs slightly between browsers
4. Reload extension in browser to test

## Supported Kindle Regions

12 regions with unique URLs:
- US: `read.amazon.com`
- Brazil: `ler.amazon.com.br`
- Canada: `read.amazon.ca`
- UK: `read.amazon.co.uk`
- Germany: `read.amazon.de`
- France: `read.amazon.fr`
- Spain: `read.amazon.es`
- Italy: `read.amazon.it`
- Japan: `read.amazon.co.jp`
- Australia: `read.amazon.com.au`
- India: `read.amazon.in`
- Mexico: `read.amazon.com.mx`

## Common Tasks for AI Assistants

### Adding a New Feature

1. Determine which files need modification
2. For UI changes: `popup.html/js/css`
3. For data extraction: `contentScript.js`
4. For API changes: `background.js`
5. Update all three browser directories
6. Update version in all `manifest.json` files

### Fixing Bugs

1. Check console logs in appropriate context
2. Verify selectors still match Amazon's DOM
3. Test across all 12 Kindle regions if relevant
4. Ensure error handling covers the case

### Updating Notion Integration

1. Check Notion API changelog for breaking changes
2. Update API version header if needed
3. Modify `background.js` for endpoint changes
4. Update block/property formatting as needed

## Security Considerations

- Never expose API tokens in code
- Use HTTPS only for all external requests
- Follow Chrome's Content Security Policy
- No third-party tracking or analytics
- Minimal permissions in manifest

## Testing Checklist

- [ ] Extension loads without errors
- [ ] Onboarding flow completes
- [ ] Settings save and persist
- [ ] Amazon/Notion status indicators work
- [ ] Highlights extract with colors
- [ ] Notes extract properly
- [ ] Export creates/updates Notion page
- [ ] Duplicate prevention works
- [ ] Error messages display correctly
- [ ] Works across all supported browsers

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Firefox 109+
- Requires backdrop-filter support for glassmorphic effects

## API Dependencies

- Notion API v2022-06-28
- Chrome Extension APIs (storage, tabs, runtime)
- Amazon Kindle notebook DOM structure

## Version History

Current: v1.6.0 (2025-11-18)
- Complete glassmorphic UI redesign
- Code optimization (removed 615 lines)
- CSS custom properties system
- Cross-browser consistency improvements

## Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Follow JavaScript ES6+ standards
4. Ensure CSP compliance
5. Write clear commit messages
6. Open pull request with description

## Key Files to Understand First

1. `/source/chrome/manifest.json` - Extension configuration
2. `/source/chrome/popup.js` - Main UI logic
3. `/source/chrome/contentScript.js` - Data extraction
4. `/source/chrome/background.js` - Notion API calls
5. `/README.MD` - User-facing documentation

## Common Gotchas

1. **Three browser directories**: Changes must be replicated across chrome, edge, and mozilla
2. **No build step**: Files are served directly, syntax errors break everything
3. **Amazon DOM changes**: Selectors may break when Amazon updates their UI
4. **Notion API limits**: 100 blocks per request, must batch larger exports
5. **Manifest differences**: Minor variations between browser manifests
6. **Storage is async**: Always use callbacks or await for storage operations

## Useful Commands

```bash
# Check extension syntax
npx eslint source/chrome/*.js

# Format code (if prettier is available)
npx prettier --write source/chrome/*.js
```

Note: No package.json exists - these require global installs or manual setup.

## Documentation Resources

- `/gitbook/` - Full technical documentation
- `/docs/` - Marketing website
- `/FAQ.MD` - Frequently asked questions
- `/CONTRIBUTING.md` - Contribution guidelines
- `/SECURITY.md` - Security policy
