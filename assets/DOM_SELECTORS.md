# DOM Selectors Reference

> Verified April 2026. Amazon frequently changes its Kindle Notebook DOM. Test selectors before relying on them.

This document catalogues every DOM selector the extension depends on to extract data from Amazon Kindle Notebook pages (`read.amazon.com/notebook`).

---

## Book Metadata

| Data Point | Selector | Fallback | Source |
|---|---|---|---|
| Book Title | `h3.kp-notebook-metadata` | `.kp-notebook-title` | `contentScript.js`, `batchExport.js` |
| Author | `p.kp-notebook-metadata:nth-of-type(2)` | `p.a-color-secondary.kp-notebook-metadata`, `.kp-notebook-author` | `contentScript.js`, `batchExport.js` |
| Amazon Store Link | `a.a-link-normal.kp-notebook-printable[href*="amazon."]` | URL `?asin=` param | `contentScript.js`, `batchExport.js` |
| Highlight Count | `#kp-notebook-highlights-count` | — | `contentScript.js` |
| Note Count | `#kp-notebook-notes-count` | — | `contentScript.js` |

---

## Highlight Extraction

Selectors tried **in order** — first match with results wins.

| Priority | Selector | Notes |
|---|---|---|
| 1 | `.kp-notebook-highlight` | Primary highlight container |
| 2 | `.highlight-item` | Alternative class |
| 3 | `div[data-testid="highlight"]` | Data attribute fallback |

### Highlight Text (inside container)

| Priority | Selector | Notes |
|---|---|---|
| 1 | `#highlight` | ID-based, most common |
| 2 | `.highlight-text` | Class fallback |

### Highlight Color

Derived from the container's class list:

| Class Pattern | Extracted Color |
|---|---|
| `kp-notebook-highlight-{color}` | `{color}` (blue, yellow, green, red, pink, orange) |
| `highlight-color-{color}` | `{color}` (alternative pattern) |
| No match | `default` |

---

## Note Extraction

Notes are detected as the **next sibling element** of a highlight container.

| Priority | Selector | Notes |
|---|---|---|
| 1 | `.kp-notebook-note` | Primary note container |
| 2 | `.note-item` | Alternative class |
| 3 | `div[data-testid="note"]` | Data attribute fallback |

### Note Text (inside container)

| Priority | Selector | Notes |
|---|---|---|
| 1 | `#note` | ID-based |
| 2 | `.note-text` | Class fallback |

---

## Location / Page Number

Extracted via `extractLocation()`. Searches within the closest ancestor container.

### Ancestor Container (closest match)

| Priority | Selector |
|---|---|
| 1 | `.kp-notebook-row-separator` |
| 2 | `.a-row.a-spacing-base` |
| 3 | `parentElement.parentElement` |

### Location Selectors (by priority)

| Priority | Selector / Method | Format Example |
|---|---|---|
| 1 | `#annotationHighlightHeader` | `"Blue highlight \| Page: 35"` |
| 2 | `#kr-scrubber-bar` (`aria-label`) | `aria-label="Page 97"` |
| 3 | `.kp-notebook-page-number` | `"Page 35"` |
| 3 | `.page-number` | `"Page 35"` |
| 3 | `[id*="page"]` | Wildcard ID match |
| 3 | `[class*="page"]` | Wildcard class match |
| 4 | `#kp-annotation-location` (hidden input `value`) | `"Posição 1234"` |
| 5 | `.kp-notebook-location` | Location text |
| 5 | `.a-size-base-plus.a-color-secondary` | Location text |
| 5 | `[id*="location"]` | Wildcard ID match |
| 5 | `.kp-notebook-metadata span` | Location text |

### Regex Patterns for Text Extraction

```
Page/Página:  /\|\s*(página|page):\s*(\d+)/i
Page label:   /(página|page)\s*(\d+)/i
Short page:   /(página|page|p\.)\s*(\d+)/i
Location:     /(location|posição|position)\s*\d+/i
```

---

## Chapter Extraction

Extracted via `extractChapter()`. Traverses DOM upward from highlight element.

### Chapter Selectors (by priority)

| Priority | Selector | UI Version |
|---|---|---|
| 1 | `.notebook-chapter--title` | New Kindle UI |
| 1 | `.notebook-chapter` (parent container) | New Kindle UI |
| 2 | `.kp-notebook-chapter-title` | Legacy |
| 2 | `.chapter-title` | Legacy |
| 2 | `h2.kp-notebook-selectable` | Legacy |
| 2 | `.kp-notebook-annotation-section-header` | Legacy |
| 2 | `[class*="chapter"]` | Wildcard fallback |
| 2 | `.a-text-bold` | Text-based fallback |

### Chapter Container (for traversal)

| Selector | Notes |
|---|---|
| `.kp-notebook-annotation-container` | Primary container |
| `.a-spacing-base` | Fallback container |

### Excluded Headings (not actual chapters)

These page headings are skipped in all locales:

- `Livros com notas em sua biblioteca` (pt-BR)
- `Books with notes in your library` (en)
- `Libros con notas en tu biblioteca` (es)
- `Livres avec des notes dans votre bibliothèque` (fr)
- `Bücher mit Notizen in deiner Bibliothek` (de)
- `あなたのライブラリのメモ付き書籍` (ja)

---

## Bookmark Extraction

### New UI Bookmarks

| Selector | Purpose |
|---|---|
| `.notebook-editable-item` | All editable items (highlights + bookmarks) |
| `.grouped-annotation_title` | Title element inside item |
| `.notebook-editable-item-black` | Text content inside bookmark |

**Detection logic:** item is a bookmark if `.grouped-annotation_title` text matches `/^(bookmarks|favoritos)/i`.

### Legacy Bookmark Selectors (fallback)

| Priority | Selector |
|---|---|
| 1 | `.kp-notebook-bookmark` |
| 2 | `.bookmark-item` |
| 3 | `[data-testid="bookmark"]` |
| 4 | `.a-row.bookmark` |

---

## HTML Parsing (fetched page — `parseChapterDataFromHTML`)

Used when the extension fetches the Kindle notebook HTML server-side for chapter mapping.

| Selector | Purpose |
|---|---|
| `.notebook-chapter` | Chapter container in fetched HTML |
| `.notebook-chapter--title` | Chapter title text |
| `.notebook-editable-item` | Highlight/bookmark items |
| `.grouped-annotation_title` | Annotation title (bookmark detection) |
| `.notebook-editable-item-black` | Item text content |
| `#highlight` | Highlight text |
| `.kp-notebook-highlight` | Highlight text (fallback) |

### Fallback Chapter Selectors (fetched HTML)

| Selector |
|---|
| `[class*="notebook-chapter"]` |
| `.kp-notebook-chapter-title` |
| `h2.kp-notebook-selectable` |
| `.chapter-title` |
| `[class*="chapter"]` |

---

## Amazon Product Page (Cover Extraction — `background.js`)

Used to scrape high-res book cover from Amazon store pages.

| Regex Pattern | Target |
|---|---|
| `data-old-hires="([^"]*_SL1500_\.jpg)"` | High-res image attribute |
| `"hiRes":"([^"]*_SL1500_\.jpg)"` | JSON embedded high-res URL |
| `src="([^"]*_SL1500_\.jpg)"` | Direct `src` attribute |
| `"large":"([^"]*_SL1500_\.jpg)"` | JSON "large" image URL |
| `/dp/([A-Z0-9]{10})/` | ASIN extraction from URL |

---

## Extension UI Selectors (`popup.html`)

Internal extension elements, **not** Amazon DOM.

| Element ID | Purpose |
|---|---|
| `#tab-export-btn` | Export tab button |
| `#tab-settings-btn` | Settings tab button |
| `#tab-review-btn` | Review tab button |
| `#export-panel` | Export panel container |
| `#settings-panel` | Settings panel container |
| `#token` | Notion API token input |
| `#databaseId` | Database ID input |
| `#databasePicker` | Database dropdown picker |
| `#databasePickerGroup` | Database picker wrapper |
| `#databaseIdGroup` | Database ID manual input wrapper |
| `#titleProperty` | Book title property name |
| `#authorProperty` | Author property name |
| `#kindleRegion` | Kindle region selector |
| `#uiLanguage` | UI language selector |
| `#save` | Save settings button |
| `#export` | Export button |
| `#navigateHighlights` | Navigate to highlights button |
| `#toggleToken` | Token visibility toggle |
| `#spinner` | Loading spinner |
| `#versionInfo` | Version display |
| `#amazonStatusDot` | Amazon connection indicator |
| `#notionStatusDot` | Notion connection indicator |
| `#toast` | Toast notification container |
| `#connectNotion` | OAuth connect button |
| `#connectedBadge` | Connected state badge |
| `#connectedWorkspaceName` | Workspace name display |
| `#disconnectNotion` | Disconnect button |
| `#manualSetupToggle` | Manual setup toggle |
| `.manual-token-group` | Manual token input group |
| `.spinner-text` | Spinner status text |
| `.divider-text` | Divider label |
| `.tab-btn` | All tab buttons |
| `.tab-panel` | All tab panels |
| `.eye-open` / `.eye-closed` | Token visibility icons |

### Batch Export UI

| Element ID | Purpose |
|---|---|
| `#batchExportSection` | Batch export button container |
| `#batchExportBtn` | Main batch export trigger button |
| `#batchProgressPanel` | Batch progress UI container |
| `#batchProgressCount` | Batch current/total progress text |
| `#batchProgressFill` | Batch visual progress bar |
| `#batchCurrentBook` | Current book title in batch run |
| `#batchSuccessCount` | Batch success tally |
| `#batchFailCount` | Batch failure tally |
| `#cancelBatchBtn` | Cancel / Done batch button |

### SRS Review Tab

| Element ID | Purpose |
|---|---|
| `#reviewCard` | Review card container |
| `#reviewEmpty` | Empty vault state |
| `#reviewDone` | All-reviewed state |
| `#reviewProgress` | Progress counter text |
| `#reviewColorDot` | Highlight color indicator |
| `#reviewQuote` | Highlight text display |
| `#reviewBook` | Book title display |
| `#reviewChapter` | Chapter name display |
| `#reviewNote` | Note display |
| `#reviewDismiss` | Dismiss action button |
| `#reviewStar` | Star action button |
| `#reviewForgot` | Forgot action button |
| `#streakCount` | Current streak display |
| `#vaultCount` | Total highlights count |
| `#starredCount` | Starred highlights count |
