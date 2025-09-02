<p align="center">
  <img src="https://github.com/tuliosousapro/Kindle-To-Notion-Extension/blob/main/docs/Leonardo_Phoenix_10_Create_a_banner_image_for_the_GitHub_repos_2.jpg?raw=true" alt="Kindle To Notion Extension Banner" width="100%" />
</p>

<h1 align="center">Kindle To Notion Extension v1.4.9</h1>
<p align="center"><em>Easily export your Kindle highlights into Notion databases</em></p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">  <img src="https://img.shields.io/badge/Made%20with-JavaScript-blue">  <img src="https://img.shields.io/badge/Notion-API-blue">  <img src="https://img.shields.io/badge/Platform-Chromium%20Extension-green">  <img src="https://img.shields.io/chrome-web-store/v/camgnmkmolfidaefoidblkkloimnmalo?label=Chrome%20Web%20Store">  <img src="https://img.shields.io/github/issues/tuliosousapro/Kindle-To-Notion-Extension">  <img src="https://img.shields.io/github/stars/tuliosousapro/Kindle-To-Notion-Extension?style=social">


Have you ever used a Kindle to read your books?
Have you ever tried to work on your notes?
Maybe tried to organize for further reference?

Well, I have. And it happens to be the most boring task in the world. Copy and pasting just sucks. It's time-consuming and definitely gives you more work than organization.

> Kindle To Notion was created to solve your note-taking problems. 

It's your ultimate tool for organizing reading insights. It exports highlights and notes from your Kindle notebook pages directly to your Notion database. With just a few clicks, it extracts book titles, authors, cover images, and colored annotations.

<h1 align="center">🧙‍♂️YOU... SHALL TAKE NOTES!!!⭐</h1>

## ⚡Quick Installation
**Get it from the Chrome Web Store** for Chrome, Brave, Arc, Orion, and other Chromium-based browsers. 
<a href="https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo?authuser=0&hl=pt-BR">
    <img src="https://img.shields.io/badge/Chrome-Click_here-red?style=for-the-badge&logo=googlechrome&color=googlechrome" alt="Chrome Extension Badge">
  </a>

**Get it from Edge Add-ons** for Edge LoL -> <a href="https://microsoftedge.microsoft.com/addons/detail/enbikfmjfocokoeoieljbdpkfimnpjdb">
    <img src="https://img.shields.io/badge/Edge-Click_here-blue?style=for-the-badge" alt="Edge Extension Badge">
  </a>
Who cares? Just use Chrome Web Store.
> By the way, I do use Edge :)

**Get it from the Mozilla Add-ons**
<a href="https://addons.mozilla.org/pt-BR/firefox/addon/kindle-to-notion/">
    <img src="https://img.shields.io/badge/Mozilla-Click_here-orange?style=for-the-badge&logo=mozilla&color=orange" alt="Mozilla Extension Badge">
  </a>


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
5. Click **"Save Settings."🎉**
> **👉Need a step-by-step help?** [**Click here**](https://machina-labs.gitbook.io/kindle-to-notion/getting-started/getting-started)

## 🚀Getting Started
1. Open the extension popup and click **"Go to Highlights"**
- > Alternatively, navigate to [ler.amazon.com.br/notebook](https://ler.amazon.com.br/notebook) or [read.amazon.com/notebook](https://read.amazon.com/notebook) in your browser.
2. Once in the highlights page, open the extension popup and click **"Export to Notion."**
3. Check the status message in the pop-up for success or errors.
4. Verify the new page in your Notion database.
#### Supported Kindle Regions
- 🇧🇷 **Brazil:** `ler.amazon.com.br/notebook`
- 🇺🇸 **United States:** `read.amazon.com/notebook`

## 🧙‍♂️Features
#### 📖 Kindle Integration
- Extracts highlights and notes directly from the Kindle notebook page (`read.amazon.com/notebook` or `ler.amazon.com.br/notebook`).
- Supports highlights with color coding (blue, yellow, orange, pink, etc.) and associated notes.
- Extracts book title, author, highlight count, note count, and high-resolution cover images from Kindle notebook pages.

#### 🧠 Notion Export
- Exports highlights as Notion quote blocks with color mapping.
- Adds a summary count at the top of the Notion page (e.g., `265 Destaque(s) | 10 Nota(s)`).
- Supports custom property names for book title and author.
- Prevents duplicate highlights by checking existing Notion database entries.
- Smart batching to respect Notion’s 100-block API limit.

#### 🛡️ Security & Privacy
- Notion API Token is masked with a blink-eye icon for visibility toggle.
- Securely stores token using `chrome.storage.local`.
- No data collection, ads, or tracking.

#### 🧰 UI & UX Enhancements
- Simple pop-up UI for configuration and export actions.
- "Go to Highlights" button to easily navigate to Kindle notebook.
- Dual-ring spinner for export feedback.
- Centered text for notifications and error messages.
- Tooltips for Notion API Token and Database ID fields.
- Supports dark/light mode via matchMedia and WCAG 2.1-compliant UI.

# THE NERD ZONE AKA DEVELOPERS AND AFFICIONADOS

## 🛠️Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
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

## 🤝Contributing <img src="https://img.shields.io/github/contributors/tuliosousapro/Kindle-To-Notion-Extension">
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

## 🔐License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 🔒 Privacy & Security
- ✅ **Local processing** - No data sent to third parties
- ✅ **Encrypted storage** - Notion token stored securely
- ✅ **Minimal permissions** - Only accesses Kindle and Notion
- ✅ **HTTPS only** - Secure communication
- ✅ **No tracking** - Zero analytics or data collection

## 👾Issues
Found a bug or have a feature idea? Open an issue right here in this repo.
- [GitHub Issues](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/discussions)

**Common Issues**

| Issue | Solution |
|-------|----------|
| "Not on Kindle page" | Navigate to your Kindle notebook first |
| "Invalid token" | Check your Notion integration token |
| "Database not found" | Verify database ID and sharing permissions |
| "No highlights found" | Ensure the page has loaded completely |
| "Connection failed" | Use the "Test" button to diagnose issues |

## 🎈FAQ
💡 Curious how it works or have questions? 
- Browse the [FAQ CALABRESO EDITION](FAQ.MD) for answers, tips, and more.
- Visit our documentation page in GitBook [Documentation](https://machina-labs.gitbook.io/kindle-to-notion/)
- **Wiki**: [Project Wiki](https://github.com/tuliosousapro/Kindle-To-Notion-Extension/wiki)

---

## 🧙Kindle wizardry deserves a star
Smash that star button <img src="https://img.shields.io/github/stars/tuliosousapro/Kindle-To-Notion-Extension?style=social"> — it costs you nothing and means the world to this humble repo. Oh, and don’t be shy: If this extension casts a productivity spell on your Kindle chaos, hit that ⭐ and summon a tweet, post, or shout from the nearest rooftop.

<p align="center">
<a href="https://www.producthunt.com/products/kindle2notion-extension?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-kindle2notion&#0045;extension" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004546&theme=dark&t=1755527287444" alt="Kindle2notion&#0032;extension - An&#0032;extension&#0032;easy&#0032;save&#0032;your&#0032;kindle&#0032;highlights&#0032;into&#0032;Notion | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>
