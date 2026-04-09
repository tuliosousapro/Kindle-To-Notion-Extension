# Kindle To Notion Extension

## What Is It

Kindle To Notion is a browser extension that bridges Amazon's Kindle reading ecosystem with Notion's knowledge management platform. It extracts highlights, notes, bookmarks, and book metadata directly from Kindle's web-based notebook and exports them into a structured Notion database — in a single click.

It is a free, open-source tool built with vanilla JavaScript (no frameworks, no build step) that runs natively on Chrome, Edge, and Firefox via Manifest V3.

---

## The Problem It Solves

Kindle captures reading insights — highlights, notes, bookmarks — but locks them inside Amazon's ecosystem with no practical export path. Readers who want to review, organize, or build upon their reading notes are forced into a painful manual process: opening Amazon's notebook page, copying each highlight one at a time, pasting into another app, then manually tagging and organizing.

This friction kills the feedback loop between reading and thinking. The more you read, the more unprocessed knowledge piles up. Eventually, you stop highlighting altogether because the effort to retrieve and organize those highlights isn't worth it.

**Kindle To Notion eliminates that entire workflow.** One click replaces hours of copy-paste labor. Your highlights flow from Kindle into Notion — structured, organized, and ready for review.

---

## What It Does

### Core Function

The extension reads the currently open Kindle notebook page in your browser, extracts all available data, and creates a formatted Notion page inside your chosen database.

### Spaced Repetition Review

Beyond just exporting, the extension includes a built-in **Review** tab that surfaces a daily curated set of your past highlights, helping you retain and interact with your old notes. It tracks your daily review streak and allows you to star your favorite highlights.

### Batch Export

Instead of exporting one book at a time, users can choose to export their entire Kindle library with a single click.

### Data Extraction

From each Kindle book, the extension captures:

| Data Point | Description |
|---|---|
| **Book Title** | Extracted from the notebook page header |
| **Author** | Extracted from the notebook metadata |
| **Cover Image** | High-resolution book cover pulled via Amazon ASIN |
| **Highlights** | Full text of every highlight, color-coded |
| **Notes** | Personal annotations attached to highlights |
| **Bookmarks** | Saved positions with page/location references |
| **Chapter Grouping** | Highlights organized under their respective chapters |
| **Location Data** | 5-tier detection system for page numbers and Kindle locations |
| **Highlight Colors** | Blue, yellow, green, red, pink, orange mapped to Notion backgrounds |

### Notion Output

Each export creates or updates a Notion page containing:

- **Page properties:** Book title, author (mapped to your custom property names)
- **Cover image:** High-resolution book cover
- **Summary block:** Total counts of highlights, notes, and bookmarks
- **Chapter headers:** Dividing content by book sections
- **Quote blocks:** Each highlight rendered as a styled quote with its original color
- **Note callouts:** Personal annotations displayed inline beneath their highlight
- **Bookmark markers:** Saved positions with precise page/location references
- **De-duplication:** Re-exporting the same book updates the existing page instead of creating duplicates

### Regional Support

The extension supports 12 Amazon Kindle regional domains:

| Region | Domain |
|---|---|
| Australia | `read.amazon.com.au` |
| Brazil | `ler.amazon.com.br` |
| Canada | `read.amazon.ca` |
| France | `read.amazon.fr` |
| Germany | `read.amazon.de` |
| India | `read.amazon.in` |
| Italy | `read.amazon.it` |
| Japan | `read.amazon.co.jp` |
| Mexico | `read.amazon.com.mx` |
| Spain | `read.amazon.es` |
| United Kingdom | `read.amazon.co.uk` |
| United States | `read.amazon.com` |

---

## How It Works

```
┌──────────────┐     ┌────────────────┐     ┌──────────────────┐     ┌──────────────┐
│  User opens  │────▶│  Content Script │────▶│  Service Worker  │────▶│  Notion API  │
│  Kindle page │     │  extracts data  │     │  formats & sends │     │  creates page│
└──────────────┘     └────────────────┘     └──────────────────┘     └──────────────┘
```

1. **User** opens their Kindle notebook page in the browser and clicks "Export to Notion" in the extension popup.
2. **Content Script** (`contentScript.js`) injects into the Kindle page, traverses the DOM, and extracts all highlights, notes, bookmarks, chapters, and book metadata using a multi-selector fallback strategy.
3. **Service Worker** (`background.js`) receives the extracted data via Chrome messaging, formats it into Notion API block structures, and batches the request (100 blocks per API call).
4. **Notion API** receives the payload and creates/updates the page in the user's database.

---

## Who It's For

- **Avid Kindle readers** who highlight and annotate while reading but never revisit those notes because retrieval is painful.
- **Students and researchers** who need their reading highlights in a structured, searchable, and linkable system.
- **Knowledge workers** who use Notion as their second brain and want their reading inputs to flow into it automatically.
- **Book clubs and content creators** who extract quotes and insights from their reading for discussion or publishing.

---

## Architecture

**Zero dependencies.** No npm packages, no bundler, no transpiler. Pure ES6+ JavaScript served directly to the browser.

```
source/
├── chrome/           # Primary implementation
│   ├── manifest.json     # Extension config (Manifest V3)
│   ├── popup.html/js/css # Extension UI
│   ├── contentScript.js  # Kindle page data extraction
│   ├── background.js     # Notion API integration (service worker)
│   ├── onboarding.*      # First-time setup wizard
│   └── _locales/         # i18n translations
├── edge/             # Edge-specific manifest + shared code
└── mozilla/          # Firefox-specific manifest + shared code
```

| Layer | File | Responsibility |
|---|---|---|
| **UI** | `popup.js` | Settings management, export trigger, status display |
| **Extraction** | `contentScript.js` | DOM parsing, highlight/note/chapter extraction |
| **API** | `background.js` | Notion API calls, block formatting, batch management |
| **Auth** | `background.js` | Notion OAuth flow and token management |

---

## Security & Privacy

- **Zero data collection.** No analytics, no tracking, no telemetry.
- **Local-only processing.** All data extraction happens in your browser. Nothing passes through third-party servers.
- **Encrypted storage.** API tokens stored via `chrome.storage.local`, never transmitted except directly to `api.notion.com` over HTTPS.
- **Minimal permissions.** Only requests access to Kindle notebook pages and the Notion API.
- **Open source.** MIT licensed. Every line of code is auditable.

---

## What It Is Not

- **Not a Kindle reader.** It does not render books. It reads the Kindle notebook page that Amazon already provides.
- **Not a Notion alternative.** It requires an existing Notion workspace and database.
- **Not a sync service.** It exports on user command. There is no background polling or automatic sync.
- **Not a data harvester.** It does not store, transmit, or analyze your reading data beyond delivering it to your Notion database.

---

## Project Status

**Current version:** v1.9.1

| Milestone | Status |
|---|---|
| Chrome Web Store | Published |
| Edge Add-ons | Published |
| Mozilla Add-ons | Published |
| Product Hunt | Featured |
| Batch Export | Shipped (v1.9.0) |
| Spaced Repetition | Shipped (v1.9.0) |
| Notion OAuth | Shipped (v1.8.0) |
| Chapter Grouping | Shipped (v1.7.0) |
| i18n / Multi-language | Shipped (v1.8.0) |
| Glassmorphic UI | Shipped (v1.6.0) |

**License:** MIT

**Author:** [Túlio Sousa](https://github.com/tuliosousapro)
