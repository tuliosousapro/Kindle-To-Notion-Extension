<p align="center">
  <img src="https://github.com/tuliosousapro/Kindle-To-Notion-Extension/blob/480e8b64c0543e412d64665dc5ad3a11124101e1/assets/Leonardo_Phoenix_10_Create_a_banner_image_for_the_GitHub_repos_2.jpg" alt="Kindle To Notion Extension Banner" width="100%" />
</p>

<h1 align="center">Kindle To Notion Extension v1.7.0</h1>
<p align="center"><em>Export Kindle highlights to Notion with automatic chapter grouping, bookmarks, and page references</em></p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">  <img src="https://img.shields.io/badge/Made%20with-JavaScript-blue">  <img src="https://img.shields.io/badge/Notion-API-blue">  <img src="https://img.shields.io/badge/Platform-Chromium%20Extension-green">  <img src="https://img.shields.io/chrome-web-store/v/camgnmkmolfidaefoidblkkloimnmalo?label=Chrome%20Web%20Store">  <img src="https://img.shields.io/github/issues/tuliosousapro/Kindle-To-Notion-Extension">  <img src="https://img.shields.io/github/stars/tuliosousapro/Kindle-To-Notion-Extension?style=social">

> Don't just clone it! Gives a star if it helped you...

<p align="center">
<a href="https://www.producthunt.com/products/kindle2notion-extension?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-kindle2notion&#0045;extension" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004546&theme=dark&t=1755527287444" alt="Kindle2notion&#0032;extension - An&#0032;extension&#0032;easy&#0032;save&#0032;your&#0032;kindle&#0032;highlights&#0032;into&#0032;Notion | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

Have you ever used a Kindle to read your books?
Have you ever tried to work on your notes?
Maybe tried to organize for further reference?

Well, I have. And it happens to be the most boring task in the world. Copy and pasting just sucks. It's time-consuming and definitely gives you more work than organization.

> Kindle To Notion was created to solve your note-taking problems. 

It's your ultimate tool for organizing reading insights. It exports highlights and notes from your Kindle notebook pages directly to your Notion database. With just a few clicks, it extracts book titles, authors, cover images, and colored annotations.

<h1 align="center">🧙‍♂️YOU... SHALL TAKE NOTES!!!⭐</h1>

---

## ⚡Quick Installation

<p><strong>Get it from the Chrome Web Store</strong> for Chrome, Brave, Arc, Orion, and other Chromium-based browsers.</p>
<p>
  <a href="https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo?authuser=0&hl=pt-BR">
    <img src="https://img.shields.io/badge/Chrome-Click_here-red?style=for-the-badge&logo=googlechrome&color=googlechrome" alt="Chrome Extension Badge">
  </a>
</p>

<p><strong>Get it from Edge Add-ons</strong> for Edge LoL → Who cares? Just use Chrome Web Store.</p>
<p>
  <a href="https://microsoftedge.microsoft.com/addons/detail/enbikfmjfocokoeoieljbdpkfimnpjdb">
    <img src="https://img.shields.io/badge/Edge-Click_here-blue?style=for-the-badge" alt="Edge Extension Badge">
  </a>
</p>
<blockquote>By the way, I do use Edge :)</blockquote>

<p><strong>Get it from the Mozilla Add-ons</strong></p>
<p>
  <a href="https://addons.mozilla.org/pt-BR/firefox/addon/kindle-to-notion/">
    <img src="https://img.shields.io/badge/Mozilla-Click_here-orange?style=for-the-badge&logo=mozilla&color=orange" alt="Mozilla Extension Badge">
  </a>
</p>

## 🧠 Recommended Notion Template

To make the most of your Kindle highlights, use this free Notion template built by Machina Labs:

👉 [Reading Center Powered by Machina Labs](https://www.notion.com/pt/templates/reading-center-powered-by-machina-labs)

This template helps you:
- Organize your books and highlights
- Track reading progress
- Capture insights and tasks from your reading

![Preview of Notion Template](https://www.notion.com/_next/image?url=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Ftemplate%2F42e933e3-954d-4a10-bc4d-c0039f52839d%2F1756346706460%2Fdesktop.jpg&w=3840&q=75)

---

## ⚙️Setup
1. **Create a Notion integration:**
   - Go to [Notion's Integrations page](https://www.notion.so/my-integrations).
   - Create a new integration and copy the "Internal Integration Token."
   - Share your target database with the integration (via the database's "Share" menu).
2. **Create or open your Notion database:**
   - Go to Notion, create or select your destination page.
   - Certify that you have a database with at least the properties for Author and Book Title.
   - Open your database as a page and copy the Notion database ID
      - **Database Link:** `https://www.notion.so/f7979b5axerequinha2f8fa?v=796edexemplokabal79a096`
      - **Database Id:** `f7979b5axerequinha2f8fa`

3. **Open the extension's pop-up (click the extension icon in Chrome).**
4. **Enter:**
   - **Notion API Token**: Your integration token. (e.g., `ntn_300224xerequinhadepilada7Xm`).
   - **Notion Database ID**: Found in the database URL (e.g., `f7979b5axerequinha2f8fa`).
   - **Title Property Name**: The exact name of your database's title property (e.g., `Título do Livro`).
   - **Author Property Name**: The exact name of your database's author property (e.g., `Autor`).
   - **Kindle Region**: Select your Amazon region (e.g., US, UK, Canada, Germany, etc.).
5. Click **"Save Settings."🎉**
> **👉Need a step-by-step help?** [**Click here**](https://machina-labs.gitbook.io/kindle-to-notion/getting-started/getting-started)

## 🚀Getting Started
1. Open the extension popup and click **"Go to Highlights"**
- > Alternatively, navigate to your region's Kindle notebook page (see supported regions below).
2. Once in the highlights page, open the extension popup and click **"Export to Notion."**
3. Check the status message in the pop-up for success or errors.
4. Verify the new page in your Notion database.
#### Supported Kindle Regions
- 🇺🇸 **United States:** `read.amazon.com/notebook`
- 🇧🇷 **Brazil:** `ler.amazon.com.br/notebook`
- 🇨🇦 **Canada:** `read.amazon.ca/notebook`
- 🇬🇧 **United Kingdom:** `read.amazon.co.uk/notebook`
- 🇩🇪 **Germany:** `read.amazon.de/notebook`
- 🇫🇷 **France:** `read.amazon.fr/notebook`
- 🇪🇸 **Spain:** `read.amazon.es/notebook`
- 🇮🇹 **Italy:** `read.amazon.it/notebook`
- 🇯🇵 **Japan:** `read.amazon.co.jp/notebook`
- 🇦🇺 **Australia:** `read.amazon.com.au/notebook`
- 🇮🇳 **India:** `read.amazon.in/notebook`
- 🇲🇽 **Mexico:** `read.amazon.com.mx/notebook`

> **Note:** You can select your preferred region in the extension's Settings tab.

## 📽️ Tutorial - How to setup and use Kindle to Notion Extension

[![Kindle To Notion – Watch Video](https://cdn.loom.com/sessions/thumbnails/142bf896d27947b3b66119317444a67c-02d768de16cc29a9-full-play.gif)](https://www.loom.com/share/142bf896d27947b3b66119317444a67c)

**Watch the video to learn:**
- How to set up the extension
- How to connect your Notion database
- How to export your Kindle highlights

---

## 🧙‍♂️Features

### ✨ v1.7.0 - Major New Features

#### 📚 Automatic Chapter Grouping
- **Organizes highlights by chapter** automatically in Notion
- Adds chapter headings (Heading 2 blocks) to group related highlights
- Falls back gracefully when chapter information isn't available
- Creates "Other Highlights" section for ungrouped content

#### 📌 Bookmark Support
- **Extracts Kindle bookmarks** and exports them to Notion
- Displays bookmarks as callout blocks with 📌 emoji
- Includes page/location information for each bookmark
- Groups bookmarks under their respective chapters

#### 📍 Page & Location References
- **Every highlight includes its page number or position**
- 5-tier priority system for location detection:
  1. Page from highlight header (`Página: 35`)
  2. Scrubber bar aria-label
  3. Generic page selectors
  4. Position from hidden input fields
  5. Pattern matching fallback
- Shows "Página X" when available, "Posição X" as fallback
- Supports multiple languages (English "Page", Portuguese "Página", etc.)

### 📖 Kindle Integration
- Extracts highlights and notes directly from the Kindle notebook page (`read.amazon.com/notebook` or `ler.amazon.com.br/notebook`).
- Supports highlights with color coding (blue, yellow, orange, pink, etc.) and associated notes.
- Extracts book title, author, highlight count, note count, and high-resolution cover images from Kindle notebook pages.
- Enhanced ASIN extraction for accurate Amazon store links
- Support for all 12 Kindle regional domains

### 🧠 Notion Export
- Exports highlights as Notion quote blocks with color mapping.
- Adds a summary count at the top of the Notion page (e.g., `265 Destaque(s) | 10 Nota(s)`).
- Supports custom property names for book title and author.
- Prevents duplicate highlights by checking existing Notion database entries.
- Smart batching to respect Notion's 100-block API limit.
- Chapter-organized output with heading blocks
- Bookmark callouts integrated with highlights

#### 🛡️ Security & Privacy
- Notion API Token is masked with a blink-eye icon for visibility toggle.
- Securely stores token using `chrome.storage.local`.
- No data collection, ads, or tracking.

#### 🧰 UI & UX Enhancements
- **Modern Glassmorphic Design**: Stunning semi-transparent glass cards with backdrop-filter blur effects for a premium feel.
- **Animated Gradient Background**: Smooth color-shifting animations that cycle through vibrant gradient schemes.
- **Icon-Based Tab Navigation**: Intuitive tab switching between Export and Settings with clean, modern icons.
- **Glowing Status Indicators**: Real-time connection status for Amazon and Notion with pulsing glow effects.
- **Enhanced Visual Feedback**: Smooth transitions, hover effects with shine animations on buttons.
- **Toast Notifications**: Elegant slide-in notification system for user feedback.
- **Streamlined Layout**: Cleaner header with logo glow, improved spacing, and better visual hierarchy.
- WCAG 2.1-compliant UI for accessibility.

---

# THE NERD ZONE AKA DEVELOPERS AND AFFICIONADOS
<p align="center">
  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFsZXh2b3Exc2Ezd2JuMDZ1ZG94MW1kZTd3MWNreGVmeDhsMHR4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uZIDWgDZCeHxuJOGl5/giphy.gif" alt="Come One Of Us" width="400"/>
</p>

---

## 🛠️Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click **"Load unpacked"** and select the folder containing the extension files.
5. Voilà — The extension will appear in your Chrome toolbar.

> **💡 Prefer a one-click install?** [**Get it from the Chrome Web Store**](https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo?authuser=0&hl=pt-BR) for Chrome, Brave, Arc, Orion, and other Chromium-based browsers.

## 🧪Development
- **File Structure**:
```
kindle2notion-extension/
├── manifest.json          # Extension configuration
├── popup.html             # User interface
├── popup.js               # UI logic and validation
├── popup.css              # Modern styling
├── contentScript.js       # Extracts data from Kindle's notebook page.
├── background.js          # Handles Notion API requests.
└── icons/                 # Extension icons
```
- **Dependencies**: None (no external libraries, `No build process required - it's vanilla JavaScript!`)
- **Debugging**:
  - Open Chrome's developer tools (F12) on the Kindle page for content script logs.
  - Inspect the background page (Right-click extension icon > "Manage Extensions" > "Inspect views: background page") for API logs. 

## 🤝Contributing
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/tuliosousapro/Kindle-To-Notion-Extension?style=for-the-badge&logo=fireship&logoColor=white&color=fc9d08)
[![Open an Issue](https://img.shields.io/badge/Open_Issue-AI_Will_Help-ff8c00?style=for-the-badge&logo=fireship&logoColor=fff&labelColor=8b0000)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues/new?template=bug_report.md)
[![Request Feature](https://img.shields.io/badge/Request_Feature-Roadmap_Idea-orange?style=for-the-badge&logo=lightbulb&logoColor=white)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues/new?template=feature_request.md)
[![Good First Issues](https://img.shields.io/badge/Good_First_Issues-Start-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)
[![Customization](https://img.shields.io/badge/Fork_&_Customize-Your_Own-purple?style=for-the-badge&logo=git&logoColor=white)](docs/customizations.md)
[![Roadmap](https://img.shields.io/badge/Open_Roadmap-View-0366d6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/wiki/Roadmap)
We welcome contributions to improve this extension! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request with a clear description of your changes.

Please ensure your code follows:
- JavaScript ES6+ standards.
- Chrome's Content Security Policy (no inline scripts).
- Clear commit messages and documentation.

## 👾Issues
Found a bug or have a feature idea? Open an issue right here in this repo.
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/tuliosousapro/Kindle-To-Notion-Extension?style=for-the-badge&logo=fireship&logoColor=white&color=fc9d08)
[![Open an Issue](https://img.shields.io/badge/Open_Issue-AI_Will_Help-ff8c00?style=for-the-badge&logo=fireship&logoColor=fff&labelColor=8b0000)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues/new?template=bug_report.md)
[![Request Feature](https://img.shields.io/badge/Request_Feature-Roadmap_Idea-orange?style=for-the-badge&logo=lightbulb&logoColor=white)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues/new?template=feature_request.md)
[![Good First Issues](https://img.shields.io/badge/Good_First_Issues-Start-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22)
- **Discussions**: [GitHub Discussions](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/discussions)

**Common Issues**

| Issue | Solution |
|-------|----------|
| "Not on Kindle page" | Navigate to your Kindle notebook first |
| "Invalid token" | Check your Notion integration token |
| "Database not found" | Verify database ID and sharing permissions |
| "No highlights found" | Ensure the page has loaded completely |
| "Connection failed" | Use the "Test" button to diagnose issues |

## 🔐License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 🔒 Privacy & Security
- ✅ **Local processing** - No data sent to third parties
- ✅ **Encrypted storage** - Notion token stored securely
- ✅ **Minimal permissions** - Only accesses Kindle and Notion
- ✅ **HTTPS only** - Secure communication
- ✅ **No tracking** - Zero analytics or data collection

## 🎈FAQ
💡 Curious how it works or have questions? 
- Browse the [FAQ CALABRESO EDITION](FAQ.MD) for answers, tips, and more.
- Visit our documentation page [Documentation](https://machina-labs.gitbook.io/kindle-to-notion/)
- **Wiki**: [Project Wiki](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/wiki)

---

## 🧙Kindle wizardry deserves a star
Smash that star button <img src="https://img.shields.io/github/stars/tuliosousapro/Kindle-To-Notion-Extension?style=social"> — it costs you nothing and means the world to this humble repo. Oh, and don’t be shy: If this extension casts a productivity spell on your Kindle chaos, hit that ⭐ and summon a tweet, post, or shout from the nearest rooftop.
