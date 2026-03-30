# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
