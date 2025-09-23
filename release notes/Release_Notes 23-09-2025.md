# Release Notes

## v1.5.0 - 2025-09-23

### 🎨 Major UX/UI Overhaul
- **Complete Interface Redesign**: Transformed single-view popup into a modern tabbed interface with "Highlights" and "Settings" tabs
- **Status Indicators**: Added real-time connection status badges for Amazon and Notion services
- **Enhanced Navigation**: Improved tab switching with keyboard accessibility (arrow keys, Enter, Space)
- **Modern Styling**: Updated CSS with better color schemes, spacing, and responsive design
- **Accessibility Improvements**: Added ARIA labels, keyboard navigation, and WCAG 2.1 compliance

### 🚀 New Onboarding Experience  
- **5-Step Guided Setup**: Complete onboarding flow for new users including:
  - Welcome screen with feature highlights
  - Notion integration setup
  - Database configuration
  - Connection testing
  - Kindle highlights navigation
- **Interactive Guided Tour**: First-time popup users get a highlighted walkthrough of key features
- **Progress Tracking**: Visual progress bar and step indicators throughout onboarding
- **Smart Detection**: Automatically detects if user has completed onboarding to skip redundant steps

### 🖼️ Enhanced Book Cover Support
- **High-Resolution Covers**: Automatically fetches high-quality book cover images from Amazon product pages
- **Multiple Fallback Sources**: Intelligent cover detection with multiple Amazon image URL patterns
- **Improved Metadata**: Better extraction of book title, author, and Amazon links from Kindle pages

### 🛠️ Technical Improvements
- **Extended Permissions**: Added Amazon domain access for cover image fetching (`https://www.amazon.com/*`, `https://www.amazon.com.br/*`)
- **Enhanced Error Handling**: Better error messages and retry logic for API failures
- **Improved Content Extraction**: More robust DOM selectors for Kindle highlight extraction
- **Batch Processing**: Optimized API calls with proper batching to respect Notion's rate limits

### 🐛 Bug Fixes
- **Export Button Fix**: Critical bug where export button showed UI feedback but didn't trigger actual export process
- **Tab Detection**: Improved active tab detection for content script communication
- **Memory Management**: Better cleanup of guided tour overlays and event listeners

### 📱 User Experience Enhancements
- **Loading States**: Better visual feedback during export operations with dual-ring spinners
- **Toast Notifications**: Improved success/error messaging with proper timing
- **Form Validation**: Enhanced input validation with helpful error messages
- **Dark/Light Mode Support**: Automatic theme detection and adaptation
- **Responsive Design**: Better layout adaptation across different screen sizes

### 🔧 Developer Improvements
- **Modular Code Structure**: Better separation of concerns with dedicated onboarding components
- **Enhanced Logging**: Comprehensive console logging for debugging and monitoring
- **Code Documentation**: Improved JSDoc comments and code organization
- **Testing Preparation**: Structured code ready for unit and integration testing

### 📚 Documentation Updates
- Updated version number to 1.5.0 across all documentation
- Enhanced setup instructions reflecting new onboarding flow
- Updated feature descriptions to include new UX improvements

---

**Migration Notes:**
- Existing users will see the new interface immediately upon update
- Onboarding flow only appears for new users; existing users retain their settings
- All existing functionality preserved with enhanced user experience
- No breaking changes to Notion database structure or API integration

**Known Issues:**
- None reported in this release

**Compatibility:**
- Chrome 88+, Edge 88+, Firefox 109+, Safari 15.4+
- Notion API v2022-06-28
- Kindle regions: US (read.amazon.com) and Brazil (ler.amazon.com.br)
