# Release Notes - Version 1.8.0

**Release Date:** 2026-03-27
**Type:** Major Feature Update

## 🎉 What's New

### 🚀 Major Features

1. **Notion OAuth Integration** - Connect to Notion seamlessly with one click, without needing to manually copy and paste integration tokens.
2. **First-Time Setup Onboarding** - A new, streamlined onboarding experience to guide users through the setup process.
3. **Multi-Browser Support** - Full structural support for Chrome, Edge, and Firefox extensions.
4. **Comprehensive Internationalization (i18n)** - The extension now fully supports multiple languages in the popup UI.

### ✨ Key Features

#### 1. Notion OAuth Authentication

- Seamless connection flow replacing manual Notion integration tokens.
- Secure token handling via background scripts.

#### 2. Enhanced UI & Onboarding

- Fresh glassmorphic popup UI.
- Step-by-step onboarding guide.

#### 3. Cross-Browser Architecture

- Unified codebase supporting Chrome, Edge, and Firefox extensions natively.

## 🔧 Technical Improvements

- Structuring of background scripts and service workers for robust API interaction.
- Translation coverage for JS context and HTML UI.
- Added a 10-second timeout to all Notion API and proxy server requests to prevent UI hangs.
