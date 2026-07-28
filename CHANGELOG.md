# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.3] - 2026-07-28

### Added
- Root `package.json`, `package-lock.json` and `eslint.config.js` configuration for CI/CD linting.
- Browser global definitions in `eslint.config.js` to support WebExtensions shared global scope.

### Fixed
- Fixed ReferenceError in `contentScript.js` where undefined variable `allText` was referenced outside its block scope.
- Restored ESLint devDependencies and the `"lint"` script to `package.json` that were lost during the `main` branch merge.
- Renamed `eslint.config.js` to `eslint.config.mjs` to support ES module parsing within a CommonJS environment.

## [1.9.2] - 2026-04-11

### Added

- **Extension Feedback System**: Integrated a smart engagement engine that triggers review prompts based on export activity, along with a persistent feedback/share footer in settings.
- **Starred Highlights Browsing**: Implemented a dedicated view in the review tab to navigate through favorited highlights using next/previous controls.
- Added `repository-metadata.json` for structured repository documentation.
- Created a centralized reference document for all Kindle DOM Selectors.
- Created formal `BRAND_GUIDELINES.md` to ensure consistent visual and tonal identity across features.
- Added `humans.txt` file to the repository root.

### Changed

- **Landing Page Overhaul**: Upgraded the documentation site with scroll-triggered animations, animated counters, FAQ accordion, new animated hero background, glassmorphism enhancements, and sticky nav features.
- **Batch Export Reliability**: Replaced the hardcoded delay with a dynamic rate-limiting mechanism and implemented a timeout for network requests (`fetchChapterData`) to prevent the extension from hanging indefinitely on slow networks.
- Deployed documentation and marketing site to GitHub Pages for production-ready hosting.
- Improved UI alignment and spacing in the extension popup and onboarding screens.
- Fixed contrast issues for inactive tabs, improved baseline alignment in the header, and addressed various padding/margin inconsistencies for a polished glassmorphism design.
- Updated Google Privacy Policy to accurately reflect the extension's tech stack and permission requirements.
- Updated `ABOUT.md` extension documentation to align with current features and settings (v1.9.1).
- Revised Chrome Web Store description to highlight new features like batch export and the UI/UX redesign.

## [1.9.1] - 2026-04-04

### Fixed

- Fixed an issue where the batch export author extraction inadvertently captured the "Your Kindle Notes For:" string instead of the actual author's name by leveraging strict `nth-of-type` fallback strategies.

## [1.9.0] - 2026-04-02

### Added

- **One-Click Batch Export**: Introduced the ability to export the entire Kindle highlights library to Notion in a single batch operation directly from the Kindle notebook library list page.
- Added a real-time batch progress dashboard inside the popup with success/failure counters and cancel functionality.

## [1.8.0] - 2026-03-27

### Added

- New multi-browser popup UI with comprehensive internationalization support.
- Initial onboarding flow for new users.
- Notion OAuth authentication integration to replace manual token entry.
- Background script enhancements to handle OAuth and Notion API interactions securely.
- Cross-browser extension structure supporting Chrome, Edge, and Mozilla seamlessly.

### Fixed

- Added a 10-second timeout to all Notion API and proxy server requests using `AbortController` to prevent the extension from hanging on slow networks.

## [1.7.0] - 2026-03-13

### Added

- **Intelligent Organization**: Highlights are now automatically grouped by Chapter, and Bookmarks (📌) are extracted with precise page/location references.
- **Deep Kindle Integration**: Full support for all 12 regional domains. Extracts highlights (with color mapping), notes, ASIN links, and high-resolution book covers.
- **Notion Sync**: 1-click export using quote blocks. Includes summary counts, custom property mapping, and smart de-duplication to prevent clutter.
- **Precision Tracking**: A 5-tier location detection system ensures every highlight includes its exact page or position, supporting multiple languages.
- **Security & Privacy**: Zero data collection. Your Notion API token is stored securely via `chrome.storage.local` and never leaves your device.
- **UI/UX**: Accessible (WCAG 2.1) compliant UI for accessibility. Smooth transitions, toast notifications, and a streamlined workflow.
