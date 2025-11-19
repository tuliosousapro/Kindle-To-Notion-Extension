#!/bin/bash

# GitHub Issues Creator Script
# Run with: ./create_issues.sh YOUR_GITHUB_TOKEN

if [ -z "$1" ]; then
    echo "Usage: ./create_issues.sh YOUR_GITHUB_TOKEN"
    exit 1
fi

TOKEN=$1
REPO="tuliosousapro/Kindle-To-Notion-Extension"
API="https://api.github.com"

echo "Creating labels..."

# Create labels
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"priority-critical","color":"d73a4a","description":"Must do immediately"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"priority-high","color":"ff7619","description":"Important, do soon"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"priority-medium","color":"fbca04","description":"Should do"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"priority-low","color":"0e8a16","description":"Nice to have"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"marketing","color":"5319e7","description":"Marketing tasks"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"seo","color":"1d76db","description":"SEO optimization"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"content","color":"d4c5f9","description":"Content creation"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"community","color":"bfdadc","description":"Community building"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"product","color":"f9d0c4","description":"Product/feature work"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"technical","color":"bfd4f2","description":"Technical tasks"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"partnership","color":"c2e0c6","description":"Partnership opportunities"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"design","color":"ff9999","description":"Design work"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"analytics","color":"e4e669","description":"Analytics/tracking"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"i18n","color":"006b75","description":"Internationalization"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"ongoing","color":"cccccc","description":"Recurring tasks"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"launch","color":"ff0000","description":"Launch activities"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"video","color":"9966ff","description":"Video content"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"social","color":"00ccff","description":"Social media"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"growth","color":"00ff00","description":"Growth initiatives"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"social-proof","color":"ff6600","description":"Social proof"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"ux","color":"cc99ff","description":"User experience"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"performance","color":"00cc99","description":"Performance"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"distribution","color":"ff99cc","description":"Distribution"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"platform","color":"9999ff","description":"Platform expansion"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"research","color":"999999","description":"Research tasks"}' > /dev/null
curl -s -X POST "$API/repos/$REPO/labels" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d '{"name":"feature","color":"0066ff","description":"New features"}' > /dev/null

echo "Labels created!"

echo "Creating milestones..."

milestone1=$(curl -s -X POST "$API/repos/$REPO/milestones" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d '{"title":"Phase 1: Foundation","description":"Chrome Web Store optimization, landing page completion, technical SEO setup","due_on":"2025-12-03T00:00:00Z"}' | grep -o '"number":[0-9]*' | grep -o '[0-9]*')

milestone2=$(curl -s -X POST "$API/repos/$REPO/milestones" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d '{"title":"Phase 2: Content Marketing","description":"Core content pieces, SEO content strategy, content calendar execution","due_on":"2025-12-31T00:00:00Z"}' | grep -o '"number":[0-9]*' | grep -o '[0-9]*')

milestone3=$(curl -s -X POST "$API/repos/$REPO/milestones" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d '{"title":"Phase 3: Community Building","description":"Reddit strategy, Twitter presence, Product Hunt launch, Notion community","due_on":"2026-01-14T00:00:00Z"}' | grep -o '"number":[0-9]*' | grep -o '[0-9]*')

milestone4=$(curl -s -X POST "$API/repos/$REPO/milestones" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d '{"title":"Phase 4: Growth and Partnerships","description":"Partnership outreach, review campaigns, influencer marketing","due_on":"2026-02-11T00:00:00Z"}' | grep -o '"number":[0-9]*' | grep -o '[0-9]*')

milestone5=$(curl -s -X POST "$API/repos/$REPO/milestones" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -d '{"title":"Phase 5: Expansion","description":"Feature development, internationalization, alternative distribution","due_on":"2026-05-13T00:00:00Z"}' | grep -o '"number":[0-9]*' | grep -o '[0-9]*')

echo "Milestones created! (M1=$milestone1, M2=$milestone2, M3=$milestone3, M4=$milestone4, M5=$milestone5)"

echo "Creating Phase 1 issues..."

# Issue 1
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Update Chrome Web Store Extension Title\",
    \"body\": \"## Description\\nUpdate the Chrome Web Store extension title for better SEO and conversion.\\n\\n**Current**: Kindle to Notion Extension – Export Kindle Highlights to Notion\\n**New**: Kindle to Notion - Export Highlights in 1 Click Free\\n\\n## Acceptance Criteria\\n- [ ] Title updated in Chrome Web Store\\n- [ ] Title is under 50 characters\\n- [ ] Contains primary keywords\\n- [ ] Includes benefit: 1 Click Free\",
    \"labels\": [\"marketing\", \"seo\", \"priority-critical\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 2
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Rewrite Chrome Web Store Short Description\",
    \"body\": \"## Description\\nOptimize the 132-character short description for search and conversion.\\n\\n**New Description**:\\nExport Kindle highlights to Notion instantly. One-click sync for book notes, annotations and reading insights. Free, no signup required.\\n\\n## Acceptance Criteria\\n- [ ] Description is exactly 132 characters or less\\n- [ ] Contains keywords: export, Kindle, highlights, Notion, sync, notes\\n- [ ] Emphasizes benefits: instant, one-click, free, no signup\",
    \"labels\": [\"marketing\", \"seo\", \"priority-critical\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 3
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Optimize Chrome Web Store Long Description\",
    \"body\": \"## Description\\nRewrite the full description with keyword optimization and conversion focus.\\n\\n## Requirements\\n- Lead with primary keywords in first paragraph\\n- Include use cases for each persona (students, researchers, knowledge workers, writers)\\n- Add feature list with keyword-rich headers\\n- Emphasize FREE during beta vs competitors pricing\\n- Include call-to-action\\n\\n## Acceptance Criteria\\n- [ ] First paragraph contains all primary keywords\\n- [ ] 4 persona use cases included\\n- [ ] Feature list has 6+ items with headers\\n- [ ] Competitor pricing mentioned\\n- [ ] Clear CTA at the end\",
    \"labels\": [\"marketing\", \"seo\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 4
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Update Chrome Web Store Screenshots\",
    \"body\": \"## Description\\nCreate and upload optimized screenshots with keyword-rich captions.\\n\\n## Screenshot Captions\\n1. Export Kindle highlights to Notion in one click\\n2. Organized reading notes with book covers and metadata\\n3. Colored highlights preserved automatically\\n4. Simple setup - just add your Notion token\\n5. Works with Amazon Kindle worldwide (12 regions)\\n\\n## Acceptance Criteria\\n- [ ] 5 screenshots uploaded\\n- [ ] Each screenshot has descriptive caption\\n- [ ] Captions contain target keywords\\n- [ ] Screenshots show key features clearly\",
    \"labels\": [\"marketing\", \"design\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 5
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Optimize Chrome Web Store Category and Tags\",
    \"body\": \"## Description\\nEnsure proper categorization and tagging for discoverability.\\n\\n## Settings\\n- Primary Category: Productivity\\n- Tags: kindle, notion, highlights, export, notes, second brain, reading, annotations\\n\\n## Acceptance Criteria\\n- [ ] Category set to Productivity\\n- [ ] All relevant tags added\\n- [ ] Tags include both functional and aspirational keywords\",
    \"labels\": [\"marketing\", \"seo\", \"priority-medium\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 6
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Readwise Comparison Landing Page\",
    \"body\": \"## Description\\nCreate a dedicated comparison page at /docs/alternative/readwise.html to capture competitor search traffic.\\n\\n## Content Requirements\\n- Feature-by-feature comparison table\\n- Price comparison (Free beta vs 8-15/month)\\n- Unique advantages of Kindle to Notion\\n- Clear CTA to install\\n\\n## Target Keywords\\n- readwise alternative\\n- readwise free alternative\\n- kindle to notion vs readwise\\n\\n## Acceptance Criteria\\n- [ ] Page created at correct URL\\n- [ ] Comparison table with 6+ features\\n- [ ] Price clearly highlighted\\n- [ ] Meta tags optimized for target keywords\\n- [ ] CTA button to Chrome Web Store\",
    \"labels\": [\"marketing\", \"seo\", \"content\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 7
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Clippings.io Comparison Landing Page\",
    \"body\": \"## Description\\nCreate a dedicated comparison page at /docs/alternative/clippings-io.html.\\n\\n## Key Differentiators to Highlight\\n- Native Notion integration (they do not have it)\\n- No signup required\\n- 100% local/private data processing\\n- Free during beta\\n\\n## Acceptance Criteria\\n- [ ] Page created at correct URL\\n- [ ] Highlights Notion integration gap\\n- [ ] Meta tags optimized\\n- [ ] CTA to install\",
    \"labels\": [\"marketing\", \"seo\", \"content\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 8
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Submit Sitemap to Google Search Console\",
    \"body\": \"## Description\\nCreate and submit sitemap for GitHub Pages site.\\n\\n## Tasks\\n1. Create sitemap.xml with all pages\\n2. Submit to Google Search Console\\n3. Verify indexing\\n\\n## Acceptance Criteria\\n- [ ] sitemap.xml created in /docs\\n- [ ] Submitted to Google Search Console\\n- [ ] All pages indexed within 1 week\",
    \"labels\": [\"seo\", \"technical\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 9
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Set Up Google Analytics 4\",
    \"body\": \"## Description\\nImplement GA4 tracking on landing pages.\\n\\n## Events to Track\\n- Page views\\n- CTA clicks (Install buttons)\\n- Scroll depth\\n- Video plays\\n- Outbound link clicks\\n\\n## Acceptance Criteria\\n- [ ] GA4 property created\\n- [ ] Tracking code added to all pages\\n- [ ] Custom events configured\\n- [ ] Goals/conversions set up\",
    \"labels\": [\"analytics\", \"technical\", \"priority-high\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 10
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Set Up Microsoft Clarity\",
    \"body\": \"## Description\\nAdd heatmap and session recording with Microsoft Clarity (free).\\n\\n## Acceptance Criteria\\n- [ ] Clarity project created\\n- [ ] Tracking code added to all pages\\n- [ ] Heatmaps visible after 24 hours\",
    \"labels\": [\"analytics\", \"technical\", \"priority-medium\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 11
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Test Core Web Vitals\",
    \"body\": \"## Description\\nEnsure landing page passes Core Web Vitals for SEO.\\n\\n## Metrics to Optimize\\n- LCP (Largest Contentful Paint) < 2.5s\\n- FID (First Input Delay) < 100ms\\n- CLS (Cumulative Layout Shift) < 0.1\\n\\n## Acceptance Criteria\\n- [ ] Test with PageSpeed Insights\\n- [ ] All metrics in green zone\\n- [ ] Mobile and desktop passing\",
    \"labels\": [\"technical\", \"performance\", \"priority-medium\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 12
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create robots.txt\",
    \"body\": \"## Description\\nAdd robots.txt to /docs folder.\\n\\n## Acceptance Criteria\\n- [ ] robots.txt created\\n- [ ] Sitemap URL correct\\n- [ ] No important pages blocked\",
    \"labels\": [\"seo\", \"technical\", \"priority-low\"],
    \"milestone\": $milestone1
}" > /dev/null

# Issue 13
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Custom 404 Page\",
    \"body\": \"## Description\\nCreate a branded 404 page that helps users find what they need.\\n\\n## Requirements\\n- Match site design\\n- Link to main pages\\n- Include navigation\\n- CTA to install extension\\n\\n## Acceptance Criteria\\n- [ ] 404.html created\\n- [ ] Matches site branding\\n- [ ] Contains helpful links\\n- [ ] Has install CTA\",
    \"labels\": [\"ux\", \"seo\", \"priority-low\"],
    \"milestone\": $milestone1
}" > /dev/null

echo "Phase 1 issues created!"

echo "Creating Phase 2 issues..."

# Issue 14
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Write Medium Article - Export Guide\",
    \"body\": \"## Description\\nWrite comprehensive guide: How to Export Kindle Highlights to Notion (2025 Guide)\\n\\n## Target Keywords\\n- export kindle to notion\\n- kindle highlights to notion\\n- how to export kindle highlights\\n\\n## Outline\\n1. Why export Kindle highlights to Notion\\n2. What you need (Notion account, extension)\\n3. Step-by-step tutorial with screenshots\\n4. Tips for organizing highlights\\n5. CTA to install\\n\\n## Acceptance Criteria\\n- [ ] 1,500+ words\\n- [ ] 5+ screenshots\\n- [ ] Published on Medium\\n- [ ] Cross-posted to blog if exists\\n- [ ] Shared on social media\",
    \"labels\": [\"content\", \"seo\", \"priority-critical\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 15
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Record YouTube Tutorial\",
    \"body\": \"## Description\\nCreate 5-7 minute screen recording tutorial.\\n\\n## Video Outline\\n1. Intro - what we are solving (30s)\\n2. Install extension (1min)\\n3. Connect Notion (1min)\\n4. Export highlights (2min)\\n5. Show results in Notion (1min)\\n6. Tips and CTA (1min)\\n\\n## Requirements\\n- Clear voiceover\\n- Good audio quality\\n- Captions/subtitles\\n- End screen with CTA\\n\\n## Acceptance Criteria\\n- [ ] Video recorded and edited\\n- [ ] Uploaded to YouTube\\n- [ ] SEO-optimized title/description\\n- [ ] Thumbnail created\\n- [ ] Embedded on landing page\",
    \"labels\": [\"content\", \"video\", \"priority-critical\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 16
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Notion Reading Notes Template\",
    \"body\": \"## Description\\nCreate a free Notion template that works perfectly with the extension export.\\n\\n## Template Features\\n- Database for books\\n- Properties matching export (Title, Author, Highlights, etc.)\\n- Views: Gallery, Table, Calendar (reading log)\\n- Instructions for use with extension\\n\\n## Distribution\\n- Notion template gallery\\n- Gumroad (free)\\n- Link from extension/landing page\\n\\n## Acceptance Criteria\\n- [ ] Template created and tested\\n- [ ] Works seamlessly with export\\n- [ ] Submitted to Notion gallery\\n- [ ] Download link on landing page\\n- [ ] Instructions included\",
    \"labels\": [\"content\", \"partnership\", \"priority-high\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 17
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Write Comparison Article - vs Readwise vs Clippings.io\",
    \"body\": \"## Description\\nCreate detailed comparison: Kindle to Notion vs Readwise vs Clippings.io (2025)\\n\\n## Sections\\n1. Overview of each tool\\n2. Feature comparison table\\n3. Pricing breakdown\\n4. Best for (use cases)\\n5. Verdict\\n\\n## Target Keywords\\n- kindle to notion vs readwise\\n- clippings io alternative\\n- best kindle highlight export\\n\\n## Acceptance Criteria\\n- [ ] 2,000+ words\\n- [ ] Comparison table\\n- [ ] Published on Medium/blog\\n- [ ] Shared on Reddit\",
    \"labels\": [\"content\", \"seo\", \"priority-high\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 18
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Post to r/Notion - Show and Tell\",
    \"body\": \"## Description\\nCreate valuable Show and Tell post for r/Notion (1.2M members).\\n\\n## Post Requirements\\n- Lead with value, not promotion\\n- Show demo/screenshots\\n- Explain the problem you solved\\n- Be authentic about building it\\n- Respond to every comment\\n\\n## Acceptance Criteria\\n- [ ] Post created with proper flair\\n- [ ] Includes demo GIF or screenshots\\n- [ ] 50+ upvotes target\\n- [ ] All comments answered within 24h\",
    \"labels\": [\"community\", \"marketing\", \"priority-high\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 19
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Submit to r/productivity\",
    \"body\": \"## Description\\nCross-post or create unique post for r/productivity (2.5M members).\\n\\n## Angle\\nFocus on time saved and reading workflow optimization.\\n\\n## Acceptance Criteria\\n- [ ] Post follows subreddit rules\\n- [ ] Value-first approach\\n- [ ] 30+ upvotes target\",
    \"labels\": [\"community\", \"marketing\", \"priority-medium\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 20
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Submit to r/Kindle\",
    \"body\": \"## Description\\nShare with r/Kindle community (250K members).\\n\\n## Angle\\nFinally solved my highlight export problem\\n\\n## Acceptance Criteria\\n- [ ] Post approved by mods\\n- [ ] Helpful tone, not promotional\\n- [ ] Engage with comments\",
    \"labels\": [\"community\", \"marketing\", \"priority-medium\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 21
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Write Academic Use Case Article\",
    \"body\": \"## Description\\nWrite: Best Kindle Tools for Students and Researchers (2025)\\n\\n## Target Keywords\\n- student reading notes\\n- academic kindle highlights\\n- literature review tools\\n\\n## Acceptance Criteria\\n- [ ] 1,500+ words\\n- [ ] Focus on academic workflow\\n- [ ] Published and shared in student communities\",
    \"labels\": [\"content\", \"seo\", \"priority-medium\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 22
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Write Second Brain Article\",
    \"body\": \"## Description\\nWrite: Building a Second Brain with Kindle Highlights and Notion\\n\\n## Target Keywords\\n- second brain kindle\\n- PKM tools\\n- knowledge management kindle\\n\\n## Sections\\n1. What is a second brain\\n2. Why Kindle highlights matter\\n3. How to connect Kindle to your second brain\\n4. Workflow examples\\n5. Tools needed (including extension)\\n\\n## Acceptance Criteria\\n- [ ] 2,000+ words\\n- [ ] References Building a Second Brain methodology\\n- [ ] Published on Medium\\n- [ ] Shared in PKM communities\",
    \"labels\": [\"content\", \"seo\", \"priority-medium\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 23
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Infographic for Social\",
    \"body\": \"## Description\\nDesign shareable infographic: Kindle to Notion in 3 Steps\\n\\n## Use on\\n- Pinterest\\n- Twitter/X\\n- Instagram\\n- Reddit posts\\n\\n## Acceptance Criteria\\n- [ ] Infographic designed\\n- [ ] Multiple formats (square, vertical)\\n- [ ] Posted on 3+ platforms\",
    \"labels\": [\"content\", \"design\", \"priority-low\"],
    \"milestone\": $milestone2
}" > /dev/null

# Issue 24
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Guest Post Outreach\",
    \"body\": \"## Description\\nPitch guest posts to Notion-focused blogs and productivity sites.\\n\\n## Target Sites\\n- Notion VIP\\n- Productivity blogs\\n- PKM newsletters\\n\\n## Acceptance Criteria\\n- [ ] 5 sites pitched\\n- [ ] 1+ guest post published\",
    \"labels\": [\"content\", \"partnership\", \"priority-medium\"],
    \"milestone\": $milestone2
}" > /dev/null

echo "Phase 2 issues created!"

echo "Creating Phase 3 issues..."

# Issue 25
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Reddit Weekly Engagement Strategy\",
    \"body\": \"## Description\\nEstablish consistent Reddit presence for organic growth.\\n\\n## Weekly Tasks\\n- Answer 5+ questions about Kindle/Notion integration\\n- Post 1 valuable tutorial or tip\\n- Engage with community (comments, upvotes)\\n\\n## Target Subreddits\\n- r/Notion\\n- r/productivity\\n- r/Kindle\\n- r/PKMS\\n- r/Zettelkasten\\n\\n## Acceptance Criteria\\n- [ ] Create tracking spreadsheet\\n- [ ] Week 1: 5 helpful comments\\n- [ ] Week 2: 10 helpful comments\\n- [ ] Track karma growth\",
    \"labels\": [\"community\", \"ongoing\", \"priority-high\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 26
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Twitter/X Content Strategy\",
    \"body\": \"## Description\\nBuild Twitter presence in PKM/Notion community.\\n\\n## Content Calendar\\n- Monday: Reading tip\\n- Wednesday: Feature highlight\\n- Friday: User testimonial or use case\\n\\n## Engagement\\n- Follow Notion creators\\n- Engage with #NotionTips, #PKM, #SecondBrain\\n- Reply to relevant conversations\\n\\n## Acceptance Criteria\\n- [ ] Content calendar created\\n- [ ] 3 posts per week minimum\\n- [ ] 100 followers in first month\",
    \"labels\": [\"community\", \"social\", \"priority-medium\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 27
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Twitter Thread - Second Brain\",
    \"body\": \"## Description\\nWrite viral-potential thread: How I built my second brain with Kindle and Notion\\n\\n## Thread Structure\\n1. Hook - the problem\\n2. My reading workflow before\\n3. The solution I built\\n4. Step-by-step how it works\\n5. Results\\n6. CTA\\n\\n## Acceptance Criteria\\n- [ ] 8-10 tweet thread\\n- [ ] Includes images/GIFs\\n- [ ] Posted at optimal time\\n- [ ] 50+ likes target\",
    \"labels\": [\"content\", \"social\", \"priority-medium\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 28
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Product Hunt Launch Preparation\",
    \"body\": \"## Description\\nPrepare all assets for Product Hunt launch.\\n\\n## Required Assets\\n- Tagline (60 chars): The free bridge between your Kindle and your second brain\\n- Description (260 chars)\\n- 5 screenshots + 1 video\\n- Maker story\\n- First comment ready\\n- Launch day social posts\\n\\n## Pre-Launch\\n- Build hunter network (reach out 2 weeks before)\\n- Notify existing users\\n- Schedule for Tuesday-Thursday\\n\\n## Acceptance Criteria\\n- [ ] All assets created\\n- [ ] Hunter secured (or self-hunt)\\n- [ ] Email to existing users drafted\\n- [ ] Social posts scheduled\\n- [ ] Launch date set\",
    \"labels\": [\"marketing\", \"launch\", \"priority-critical\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 29
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Product Hunt Launch Execution\",
    \"body\": \"## Description\\nExecute Product Hunt launch day.\\n\\n## Launch Day Tasks\\n- Post at 12:01 AM PT\\n- Share on all social channels\\n- Email existing users\\n- Post to Reddit with PH link\\n- Respond to EVERY comment\\n- Thank supporters\\n\\n## Acceptance Criteria\\n- [ ] Launched on schedule\\n- [ ] 100+ upvotes\\n- [ ] Top 10 of the day\\n- [ ] All comments answered\",
    \"labels\": [\"marketing\", \"launch\", \"priority-critical\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 30
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"List Notion Template in Gallery\",
    \"body\": \"## Description\\nSubmit reading notes template to official Notion template gallery.\\n\\n## Submission Requirements\\n- High-quality template\\n- Good documentation\\n- Screenshots\\n- Use case description\\n\\n## Acceptance Criteria\\n- [ ] Template polished\\n- [ ] Submitted to Notion\\n- [ ] Approved and listed\",
    \"labels\": [\"partnership\", \"distribution\", \"priority-high\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 31
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Partner with Notion Template Creators\",
    \"body\": \"## Description\\nReach out to top Notion template creators for cross-promotion.\\n\\n## Value Proposition\\nYour reading templates work even better with our extension - lets recommend each other\\n\\n## Target\\n- Top 10 reading/book templates on Notion gallery\\n- Notion template creators on Twitter\\n\\n## Acceptance Criteria\\n- [ ] 10 creators contacted\\n- [ ] 3+ partnerships established\\n- [ ] Cross-promotion live\",
    \"labels\": [\"partnership\", \"priority-medium\"],
    \"milestone\": $milestone3
}" > /dev/null

# Issue 32
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Submit to Hacker News\",
    \"body\": \"## Description\\nPost Show HN for technical audience.\\n\\n## Requirements\\n- Technical angle (how it works)\\n- Problem-solution focus\\n- Be ready for critical feedback\\n\\n## Acceptance Criteria\\n- [ ] Posted with proper format\\n- [ ] Responds to all comments\\n- [ ] 30+ points target\",
    \"labels\": [\"community\", \"marketing\", \"priority-medium\"],
    \"milestone\": $milestone3
}" > /dev/null

echo "Phase 3 issues created!"

echo "Creating Phase 4 issues..."

# Issue 33
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Review Campaign - In-App Prompt\",
    \"body\": \"## Description\\nAdd review prompt in extension after user success.\\n\\n## Trigger\\nAfter 10th successful export\\n\\n## Message\\nEnjoying Kindle to Notion? A 5-star review helps other readers find us!\\n\\n## Acceptance Criteria\\n- [ ] Prompt implemented\\n- [ ] Links to Chrome Web Store review\\n- [ ] Only shows once\\n- [ ] Dismissable\",
    \"labels\": [\"product\", \"growth\", \"priority-high\"],
    \"milestone\": $milestone4
}" > /dev/null

# Issue 34
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Review Campaign - Email Outreach\",
    \"body\": \"## Description\\nEmail power users for reviews and testimonials.\\n\\n## Email Template\\n- Thank them for using\\n- Ask for honest review\\n- Offer feature on landing page for testimonial\\n\\n## Acceptance Criteria\\n- [ ] Email template created\\n- [ ] 50 users contacted\\n- [ ] 10+ reviews received\\n- [ ] 5+ testimonials collected\",
    \"labels\": [\"marketing\", \"growth\", \"priority-high\"],
    \"milestone\": $milestone4
}" > /dev/null

# Issue 35
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Collect Video Testimonials\",
    \"body\": \"## Description\\nGet 3+ video testimonials from power users.\\n\\n## Incentive\\nFeature prominently on landing page\\n\\n## Acceptance Criteria\\n- [ ] 5 users asked\\n- [ ] 3+ videos received\\n- [ ] Added to landing page\",
    \"labels\": [\"marketing\", \"social-proof\", \"priority-medium\"],
    \"milestone\": $milestone4
}" > /dev/null

# Issue 36
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Influencer Outreach - Tier 1\",
    \"body\": \"## Description\\nReach out to productivity YouTubers and bloggers (10K-100K followers).\\n\\n## Target List\\n- Notion YouTubers\\n- PKM bloggers\\n- Book reviewers who use Notion\\n\\n## Acceptance Criteria\\n- [ ] 20 influencers contacted\\n- [ ] 5+ responses\\n- [ ] 2+ features/mentions\",
    \"labels\": [\"partnership\", \"marketing\", \"priority-medium\"],
    \"milestone\": $milestone4
}" > /dev/null

# Issue 37
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Partnership with Student Organizations\",
    \"body\": \"## Description\\nReach out to university clubs and student organizations.\\n\\n## Angle\\nFree tool for academic reading\\n\\n## Acceptance Criteria\\n- [ ] 5 organizations contacted\\n- [ ] 1+ partnership established\",
    \"labels\": [\"partnership\", \"growth\", \"priority-low\"],
    \"milestone\": $milestone4
}" > /dev/null

# Issue 38
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Create Case Study from Power User\",
    \"body\": \"## Description\\nWrite detailed case study with a power user.\\n\\n## Structure\\n- User background\\n- Problem they had\\n- How they use the extension\\n- Results/benefits\\n- Quote\\n\\n## Acceptance Criteria\\n- [ ] Power user interviewed\\n- [ ] Case study written\\n- [ ] Published on landing page/blog\",
    \"labels\": [\"content\", \"social-proof\", \"priority-medium\"],
    \"milestone\": $milestone4
}" > /dev/null

echo "Phase 4 issues created!"

echo "Creating Phase 5 issues..."

# Issue 39
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Feature - Custom Notion Templates\",
    \"body\": \"## Description\\nAllow users to select different Notion database templates for export.\\n\\n## Options\\n- Simple (current)\\n- Academic (with citation fields)\\n- Reading tracker (with dates, ratings)\\n- Custom (user-defined)\\n\\n## Acceptance Criteria\\n- [ ] Template selector in options\\n- [ ] 3+ templates available\\n- [ ] Documentation updated\",
    \"labels\": [\"feature\", \"product\", \"priority-high\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 40
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Feature - Batch Export Multiple Books\",
    \"body\": \"## Description\\nAllow exporting multiple books at once.\\n\\n## Requirements\\n- Select multiple books from list\\n- Export all with one click\\n- Progress indicator\\n\\n## Acceptance Criteria\\n- [ ] Multi-select UI\\n- [ ] Batch processing works\\n- [ ] Progress shown to user\",
    \"labels\": [\"feature\", \"product\", \"priority-high\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 41
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Safari Extension\",
    \"body\": \"## Description\\nCreate Safari version of extension.\\n\\n## Notes\\n- Different extension format\\n- Apple Developer account needed\\n- Test on macOS and iOS\\n\\n## Acceptance Criteria\\n- [ ] Safari extension created\\n- [ ] Submitted to App Store\\n- [ ] Listed on landing page\",
    \"labels\": [\"feature\", \"platform\", \"priority-medium\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 42
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Spanish Landing Page\",
    \"body\": \"## Description\\nCreate Spanish version of landing page for Spanish-speaking market.\\n\\n## Requirements\\n- Professional translation\\n- Localized keywords\\n- Same design/structure\\n\\n## Acceptance Criteria\\n- [ ] Translation completed\\n- [ ] Page live at /es/\\n- [ ] Meta tags localized\",
    \"labels\": [\"i18n\", \"growth\", \"priority-medium\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 43
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Portuguese Landing Page\",
    \"body\": \"## Description\\nCreate Portuguese version (your home market).\\n\\n## Acceptance Criteria\\n- [ ] Translation completed\\n- [ ] Page live at /pt/\\n- [ ] Meta tags localized\",
    \"labels\": [\"i18n\", \"growth\", \"priority-medium\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 44
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"German Landing Page\",
    \"body\": \"## Description\\nCreate German version (strong Notion adoption market).\\n\\n## Acceptance Criteria\\n- [ ] Translation completed\\n- [ ] Page live at /de/\\n- [ ] Meta tags localized\",
    \"labels\": [\"i18n\", \"growth\", \"priority-low\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 45
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Firefox Add-ons Store Optimization\",
    \"body\": \"## Description\\nOptimize Firefox listing similar to Chrome.\\n\\n## Tasks\\n- Update title\\n- Optimize description\\n- Add screenshots\\n- Encourage reviews\\n\\n## Acceptance Criteria\\n- [ ] Title updated\\n- [ ] Description optimized\\n- [ ] 5 screenshots added\\n- [ ] 10+ reviews\",
    \"labels\": [\"marketing\", \"seo\", \"priority-medium\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 46
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Edge Add-ons Store Optimization\",
    \"body\": \"## Description\\nOptimize Edge listing similar to Chrome.\\n\\n## Acceptance Criteria\\n- [ ] Title updated\\n- [ ] Description optimized\\n- [ ] Screenshots added\",
    \"labels\": [\"marketing\", \"seo\", \"priority-medium\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 47
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Feature - Reading Stats Dashboard\",
    \"body\": \"## Description\\nAdd statistics about reading habits.\\n\\n## Stats to Show\\n- Total books exported\\n- Total highlights\\n- Most highlighted books\\n- Export history\\n\\n## Notes\\nCould be premium feature for monetization.\\n\\n## Acceptance Criteria\\n- [ ] Stats page in extension\\n- [ ] Visualizations included\\n- [ ] Data stored locally\",
    \"labels\": [\"feature\", \"product\", \"priority-low\"],
    \"milestone\": $milestone5
}" > /dev/null

# Issue 48
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Feature - Daily Highlights Email\",
    \"body\": \"## Description\\nSend daily email with random highlights (like Readwise).\\n\\n## Notes\\n- Requires email infrastructure\\n- Could be premium feature\\n- User opt-in required\\n\\n## Acceptance Criteria\\n- [ ] Email system set up\\n- [ ] User preference in options\\n- [ ] Unsubscribe works\",
    \"labels\": [\"feature\", \"product\", \"priority-low\"],
    \"milestone\": $milestone5
}" > /dev/null

echo "Phase 5 issues created!"

echo "Creating ongoing issues..."

# Issue 49
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Weekly KPI Tracking\",
    \"body\": \"## Description\\nTrack key metrics weekly.\\n\\n## Metrics\\n- Weekly active users\\n- Chrome Store rating\\n- Review count\\n- Landing page visitors\\n- Install rate\\n\\n## Acceptance Criteria\\n- [ ] Tracking spreadsheet created\\n- [ ] Updated every Monday\\n- [ ] Monthly analysis report\",
    \"labels\": [\"analytics\", \"ongoing\", \"priority-high\"]
}" > /dev/null

# Issue 50
curl -s -X POST "$API/repos/$REPO/issues" -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -d "{
    \"title\": \"Monitor Competitor Updates\",
    \"body\": \"## Description\\nKeep track of competitor changes.\\n\\n## Competitors to Monitor\\n- Readwise\\n- Clippings.io\\n- CollabWriting\\n- New entrants\\n\\n## What to Track\\n- Feature updates\\n- Pricing changes\\n- Marketing campaigns\\n- User complaints\\n\\n## Acceptance Criteria\\n- [ ] Monthly competitor review\\n- [ ] Document findings\\n- [ ] Respond to threats\",
    \"labels\": [\"research\", \"ongoing\", \"priority-medium\"]
}" > /dev/null

echo ""
echo "========================================="
echo "All 50 issues created successfully!"
echo "========================================="
echo ""
echo "View your issues at:"
echo "https://github.com/$REPO/issues"
