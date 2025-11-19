# GitHub Issues - Market Domination Plan

Copy each issue below into GitHub Issues. Labels and milestones are specified for each.

---

## Phase 1: Foundation (Weeks 1-2)

---

### Issue #1: Update Chrome Web Store Extension Title
**Labels**: `marketing`, `seo`, `priority-critical`
**Milestone**: Phase 1: Foundation

**Description**:
Update the Chrome Web Store extension title for better SEO and conversion.

**Current**: "Kindle to Notion Extension – Export Kindle Highlights to Notion"
**New**: "Kindle to Notion - Export Highlights in 1 Click Free"

**Acceptance Criteria**:
- [ ] Title updated in Chrome Web Store
- [ ] Title is under 50 characters
- [ ] Contains primary keywords: "Kindle to Notion", "Export Highlights"
- [ ] Includes benefit: "1 Click Free"

---

### Issue #2: Rewrite Chrome Web Store Short Description
**Labels**: `marketing`, `seo`, `priority-critical`
**Milestone**: Phase 1: Foundation

**Description**:
Optimize the 132-character short description for search and conversion.

**New Description**:
```
Export Kindle highlights to Notion instantly. One-click sync for book notes, annotations & reading insights. Free, no signup required.
```

**Acceptance Criteria**:
- [ ] Description is exactly 132 characters or less
- [ ] Contains keywords: export, Kindle, highlights, Notion, sync, notes
- [ ] Emphasizes benefits: instant, one-click, free, no signup

---

### Issue #3: Optimize Chrome Web Store Long Description
**Labels**: `marketing`, `seo`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Rewrite the full description with keyword optimization and conversion focus.

**Requirements**:
- Lead with primary keywords in first paragraph
- Include use cases for each persona (students, researchers, knowledge workers, writers)
- Add feature list with keyword-rich headers
- Emphasize FREE vs competitors' pricing
- Include call-to-action

**Acceptance Criteria**:
- [ ] First paragraph contains all primary keywords
- [ ] 4 persona use cases included
- [ ] Feature list has 6+ items with headers
- [ ] Competitor pricing mentioned
- [ ] Clear CTA at the end

---

### Issue #4: Update Chrome Web Store Screenshots
**Labels**: `marketing`, `design`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Create and upload optimized screenshots with keyword-rich captions.

**Screenshot Captions**:
1. "Export Kindle highlights to Notion in one click"
2. "Organized reading notes with book covers and metadata"
3. "Colored highlights preserved automatically"
4. "Simple setup - just add your Notion token"
5. "Works with Amazon Kindle worldwide (12 regions)"

**Acceptance Criteria**:
- [ ] 5 screenshots uploaded
- [ ] Each screenshot has descriptive caption
- [ ] Captions contain target keywords
- [ ] Screenshots show key features clearly

---

### Issue #5: Optimize Chrome Web Store Category & Tags
**Labels**: `marketing`, `seo`, `priority-medium`
**Milestone**: Phase 1: Foundation

**Description**:
Ensure proper categorization and tagging for discoverability.

**Settings**:
- Primary Category: Productivity
- Tags: kindle, notion, highlights, export, notes, second brain, reading, annotations

**Acceptance Criteria**:
- [ ] Category set to Productivity
- [ ] All relevant tags added
- [ ] Tags include both functional and aspirational keywords

---

### Issue #6: Create Readwise Comparison Landing Page
**Labels**: `marketing`, `seo`, `content`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Create a dedicated comparison page at `/docs/alternative/readwise.html` to capture competitor search traffic.

**Content Requirements**:
- Feature-by-feature comparison table
- Price comparison (Free vs $8-15/month)
- Unique advantages of Kindle to Notion
- Clear CTA to install

**Target Keywords**:
- "readwise alternative"
- "readwise free alternative"
- "kindle to notion vs readwise"

**Acceptance Criteria**:
- [ ] Page created at correct URL
- [ ] Comparison table with 6+ features
- [ ] Price clearly highlighted
- [ ] Meta tags optimized for target keywords
- [ ] CTA button to Chrome Web Store

---

### Issue #7: Create Clippings.io Comparison Landing Page
**Labels**: `marketing`, `seo`, `content`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Create a dedicated comparison page at `/docs/alternative/clippings-io.html`.

**Key Differentiators to Highlight**:
- Native Notion integration (they don't have it)
- No signup required
- 100% local/private data processing
- Free during beta

**Acceptance Criteria**:
- [ ] Page created at correct URL
- [ ] Highlights Notion integration gap
- [ ] Meta tags optimized
- [ ] CTA to install

---

### Issue #8: Submit Sitemap to Google Search Console
**Labels**: `seo`, `technical`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Create and submit sitemap for GitHub Pages site.

**Tasks**:
1. Create sitemap.xml with all pages
2. Submit to Google Search Console
3. Verify indexing

**Acceptance Criteria**:
- [ ] sitemap.xml created in /docs
- [ ] Submitted to Google Search Console
- [ ] All pages indexed within 1 week

---

### Issue #9: Set Up Google Analytics 4
**Labels**: `analytics`, `technical`, `priority-high`
**Milestone**: Phase 1: Foundation

**Description**:
Implement GA4 tracking on landing pages.

**Events to Track**:
- Page views
- CTA clicks (Install buttons)
- Scroll depth
- Video plays
- Outbound link clicks

**Acceptance Criteria**:
- [ ] GA4 property created
- [ ] Tracking code added to all pages
- [ ] Custom events configured
- [ ] Goals/conversions set up

---

### Issue #10: Set Up Microsoft Clarity
**Labels**: `analytics`, `technical`, `priority-medium`
**Milestone**: Phase 1: Foundation

**Description**:
Add heatmap and session recording with Microsoft Clarity (free).

**Acceptance Criteria**:
- [ ] Clarity project created
- [ ] Tracking code added to all pages
- [ ] Heatmaps visible after 24 hours

---

### Issue #11: Test Core Web Vitals
**Labels**: `technical`, `performance`, `priority-medium`
**Milestone**: Phase 1: Foundation

**Description**:
Ensure landing page passes Core Web Vitals for SEO.

**Metrics to Optimize**:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

**Acceptance Criteria**:
- [ ] Test with PageSpeed Insights
- [ ] All metrics in "green" zone
- [ ] Mobile and desktop passing

---

### Issue #12: Create robots.txt
**Labels**: `seo`, `technical`, `priority-low`
**Milestone**: Phase 1: Foundation

**Description**:
Add robots.txt to /docs folder.

**Content**:
```
User-agent: *
Allow: /
Sitemap: https://tuliosousapro.github.io/Kindle-To-Notion-Extension/sitemap.xml
```

**Acceptance Criteria**:
- [ ] robots.txt created
- [ ] Sitemap URL correct
- [ ] No important pages blocked

---

### Issue #13: Create Custom 404 Page
**Labels**: `ux`, `seo`, `priority-low`
**Milestone**: Phase 1: Foundation

**Description**:
Create a branded 404 page that helps users find what they need.

**Requirements**:
- Match site design
- Link to main pages
- Include search or navigation
- CTA to install extension

**Acceptance Criteria**:
- [ ] 404.html created
- [ ] Matches site branding
- [ ] Contains helpful links
- [ ] Has install CTA

---

## Phase 2: Content Marketing (Weeks 3-6)

---

### Issue #14: Write Medium Article - Export Guide
**Labels**: `content`, `seo`, `priority-critical`
**Milestone**: Phase 2: Content Marketing

**Description**:
Write comprehensive guide: "How to Export Kindle Highlights to Notion (2025 Guide)"

**Target Keywords**:
- export kindle to notion
- kindle highlights to notion
- how to export kindle highlights

**Outline**:
1. Why export Kindle highlights to Notion
2. What you need (Notion account, extension)
3. Step-by-step tutorial with screenshots
4. Tips for organizing highlights
5. CTA to install

**Acceptance Criteria**:
- [ ] 1,500+ words
- [ ] 5+ screenshots
- [ ] Published on Medium
- [ ] Cross-posted to blog if exists
- [ ] Shared on social media

---

### Issue #15: Record YouTube Tutorial
**Labels**: `content`, `video`, `priority-critical`
**Milestone**: Phase 2: Content Marketing

**Description**:
Create 5-7 minute screen recording tutorial.

**Video Outline**:
1. Intro - what we're solving (30s)
2. Install extension (1min)
3. Connect Notion (1min)
4. Export highlights (2min)
5. Show results in Notion (1min)
6. Tips and CTA (1min)

**Requirements**:
- Clear voiceover
- Good audio quality
- Captions/subtitles
- End screen with CTA

**Acceptance Criteria**:
- [ ] Video recorded and edited
- [ ] Uploaded to YouTube
- [ ] SEO-optimized title/description
- [ ] Thumbnail created
- [ ] Embedded on landing page

---

### Issue #16: Create Notion Reading Notes Template
**Labels**: `content`, `partnership`, `priority-high`
**Milestone**: Phase 2: Content Marketing

**Description**:
Create a free Notion template that works perfectly with the extension export.

**Template Features**:
- Database for books
- Properties matching export (Title, Author, Highlights, etc.)
- Views: Gallery, Table, Calendar (reading log)
- Instructions for use with extension

**Distribution**:
- Notion template gallery
- Gumroad (free)
- Link from extension/landing page

**Acceptance Criteria**:
- [ ] Template created and tested
- [ ] Works seamlessly with export
- [ ] Submitted to Notion gallery
- [ ] Download link on landing page
- [ ] Instructions included

---

### Issue #17: Write Comparison Article - vs Readwise vs Clippings.io
**Labels**: `content`, `seo`, `priority-high`
**Milestone**: Phase 2: Content Marketing

**Description**:
Create detailed comparison: "Kindle to Notion vs Readwise vs Clippings.io (2025)"

**Sections**:
1. Overview of each tool
2. Feature comparison table
3. Pricing breakdown
4. Best for (use cases)
5. Verdict

**Target Keywords**:
- kindle to notion vs readwise
- clippings io alternative
- best kindle highlight export

**Acceptance Criteria**:
- [ ] 2,000+ words
- [ ] Comparison table
- [ ] Published on Medium/blog
- [ ] Shared on Reddit

---

### Issue #18: Post to r/Notion - Show & Tell
**Labels**: `community`, `marketing`, `priority-high`
**Milestone**: Phase 2: Content Marketing

**Description**:
Create valuable Show & Tell post for r/Notion (1.2M members).

**Post Requirements**:
- Lead with value, not promotion
- Show demo/screenshots
- Explain the problem you solved
- Be authentic about building it
- Respond to every comment

**Acceptance Criteria**:
- [ ] Post created with proper flair
- [ ] Includes demo GIF or screenshots
- [ ] 50+ upvotes target
- [ ] All comments answered within 24h

---

### Issue #19: Submit to r/productivity
**Labels**: `community`, `marketing`, `priority-medium`
**Milestone**: Phase 2: Content Marketing

**Description**:
Cross-post or create unique post for r/productivity (2.5M members).

**Angle**: Focus on time saved and reading workflow optimization.

**Acceptance Criteria**:
- [ ] Post follows subreddit rules
- [ ] Value-first approach
- [ ] 30+ upvotes target

---

### Issue #20: Submit to r/Kindle
**Labels**: `community`, `marketing`, `priority-medium`
**Milestone**: Phase 2: Content Marketing

**Description**:
Share with r/Kindle community (250K members).

**Angle**: "Finally solved my highlight export problem"

**Acceptance Criteria**:
- [ ] Post approved by mods
- [ ] Helpful tone, not promotional
- [ ] Engage with comments

---

### Issue #21: Write Academic Use Case Article
**Labels**: `content`, `seo`, `priority-medium`
**Milestone**: Phase 2: Content Marketing

**Description**:
Write: "Best Kindle Tools for Students and Researchers (2025)"

**Target Keywords**:
- student reading notes
- academic kindle highlights
- literature review tools

**Acceptance Criteria**:
- [ ] 1,500+ words
- [ ] Focus on academic workflow
- [ ] Published and shared in student communities

---

### Issue #22: Write Second Brain Article
**Labels**: `content`, `seo`, `priority-medium`
**Milestone**: Phase 2: Content Marketing

**Description**:
Write: "Building a Second Brain with Kindle Highlights & Notion"

**Target Keywords**:
- second brain kindle
- PKM tools
- knowledge management kindle

**Sections**:
1. What is a second brain
2. Why Kindle highlights matter
3. How to connect Kindle to your second brain
4. Workflow examples
5. Tools needed (including extension)

**Acceptance Criteria**:
- [ ] 2,000+ words
- [ ] References Building a Second Brain methodology
- [ ] Published on Medium
- [ ] Shared in PKM communities

---

### Issue #23: Create Infographic for Social
**Labels**: `content`, `design`, `priority-low`
**Milestone**: Phase 2: Content Marketing

**Description**:
Design shareable infographic: "Kindle to Notion in 3 Steps"

**Use on**:
- Pinterest
- Twitter/X
- Instagram
- Reddit posts

**Acceptance Criteria**:
- [ ] Infographic designed
- [ ] Multiple formats (square, vertical)
- [ ] Posted on 3+ platforms

---

### Issue #24: Guest Post Outreach
**Labels**: `content`, `partnership`, `priority-medium`
**Milestone**: Phase 2: Content Marketing

**Description**:
Pitch guest posts to Notion-focused blogs and productivity sites.

**Target Sites**:
- Notion VIP
- Productivity blogs
- PKM newsletters

**Acceptance Criteria**:
- [ ] 5 sites pitched
- [ ] 1+ guest post published

---

## Phase 3: Community Building (Weeks 4-8)

---

### Issue #25: Reddit Weekly Engagement Strategy
**Labels**: `community`, `ongoing`, `priority-high`
**Milestone**: Phase 3: Community Building

**Description**:
Establish consistent Reddit presence for organic growth.

**Weekly Tasks**:
- Answer 5+ questions about Kindle/Notion integration
- Post 1 valuable tutorial or tip
- Engage with community (comments, upvotes)

**Target Subreddits**:
- r/Notion
- r/productivity
- r/Kindle
- r/PKMS
- r/Zettelkasten

**Acceptance Criteria**:
- [ ] Create tracking spreadsheet
- [ ] Week 1: 5 helpful comments
- [ ] Week 2: 10 helpful comments
- [ ] Track karma growth

---

### Issue #26: Twitter/X Content Strategy
**Labels**: `community`, `social`, `priority-medium`
**Milestone**: Phase 3: Community Building

**Description**:
Build Twitter presence in PKM/Notion community.

**Content Calendar**:
- Monday: Reading tip
- Wednesday: Feature highlight
- Friday: User testimonial or use case

**Engagement**:
- Follow Notion creators
- Engage with #NotionTips, #PKM, #SecondBrain
- Reply to relevant conversations

**Acceptance Criteria**:
- [ ] Content calendar created
- [ ] 3 posts per week minimum
- [ ] 100 followers in first month

---

### Issue #27: Create Twitter Thread - Second Brain
**Labels**: `content`, `social`, `priority-medium`
**Milestone**: Phase 3: Community Building

**Description**:
Write viral-potential thread: "How I built my second brain with Kindle & Notion"

**Thread Structure**:
1. Hook - the problem
2. My reading workflow before
3. The solution I built
4. Step-by-step how it works
5. Results
6. CTA

**Acceptance Criteria**:
- [ ] 8-10 tweet thread
- [ ] Includes images/GIFs
- [ ] Posted at optimal time
- [ ] 50+ likes target

---

### Issue #28: Product Hunt Launch Preparation
**Labels**: `marketing`, `launch`, `priority-critical`
**Milestone**: Phase 3: Community Building

**Description**:
Prepare all assets for Product Hunt launch.

**Required Assets**:
- Tagline (60 chars): "The free bridge between your Kindle and your second brain"
- Description (260 chars)
- 5 screenshots + 1 video
- Maker story
- First comment ready
- Launch day social posts

**Pre-Launch**:
- Build hunter network (reach out 2 weeks before)
- Notify existing users
- Schedule for Tuesday-Thursday

**Acceptance Criteria**:
- [ ] All assets created
- [ ] Hunter secured (or self-hunt)
- [ ] Email to existing users drafted
- [ ] Social posts scheduled
- [ ] Launch date set

---

### Issue #29: Product Hunt Launch Execution
**Labels**: `marketing`, `launch`, `priority-critical`
**Milestone**: Phase 3: Community Building

**Description**:
Execute Product Hunt launch day.

**Launch Day Tasks**:
- Post at 12:01 AM PT
- Share on all social channels
- Email existing users
- Post to Reddit with PH link
- Respond to EVERY comment
- Thank supporters

**Acceptance Criteria**:
- [ ] Launched on schedule
- [ ] 100+ upvotes
- [ ] Top 10 of the day
- [ ] All comments answered

---

### Issue #30: List Notion Template in Gallery
**Labels**: `partnership`, `distribution`, `priority-high`
**Milestone**: Phase 3: Community Building

**Description**:
Submit reading notes template to official Notion template gallery.

**Submission Requirements**:
- High-quality template
- Good documentation
- Screenshots
- Use case description

**Acceptance Criteria**:
- [ ] Template polished
- [ ] Submitted to Notion
- [ ] Approved and listed

---

### Issue #31: Partner with Notion Template Creators
**Labels**: `partnership`, `priority-medium`
**Milestone**: Phase 3: Community Building

**Description**:
Reach out to top Notion template creators for cross-promotion.

**Value Proposition**:
"Your reading templates work even better with our extension - let's recommend each other"

**Target**:
- Top 10 reading/book templates on Notion gallery
- Notion template creators on Twitter

**Acceptance Criteria**:
- [ ] 10 creators contacted
- [ ] 3+ partnerships established
- [ ] Cross-promotion live

---

### Issue #32: Submit to Hacker News
**Labels**: `community`, `marketing`, `priority-medium`
**Milestone**: Phase 3: Community Building

**Description**:
Post "Show HN" for technical audience.

**Requirements**:
- Technical angle (how it works)
- Problem-solution focus
- Be ready for critical feedback

**Acceptance Criteria**:
- [ ] Posted with proper format
- [ ] Responds to all comments
- [ ] 30+ points target

---

## Phase 4: Growth & Partnerships (Weeks 8-12)

---

### Issue #33: Review Campaign - In-App Prompt
**Labels**: `product`, `growth`, `priority-high`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Add review prompt in extension after user success.

**Trigger**: After 10th successful export

**Message**: "Enjoying Kindle to Notion? A 5-star review helps other readers find us!"

**Acceptance Criteria**:
- [ ] Prompt implemented
- [ ] Links to Chrome Web Store review
- [ ] Only shows once
- [ ] Dismissable

---

### Issue #34: Review Campaign - Email Outreach
**Labels**: `marketing`, `growth`, `priority-high`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Email power users for reviews and testimonials.

**Email Template**:
- Thank them for using
- Ask for honest review
- Offer feature on landing page for testimonial

**Acceptance Criteria**:
- [ ] Email template created
- [ ] 50 users contacted
- [ ] 10+ reviews received
- [ ] 5+ testimonials collected

---

### Issue #35: Collect Video Testimonials
**Labels**: `marketing`, `social-proof`, `priority-medium`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Get 3+ video testimonials from power users.

**Incentive**: Feature prominently on landing page

**Acceptance Criteria**:
- [ ] 5 users asked
- [ ] 3+ videos received
- [ ] Added to landing page

---

### Issue #36: Influencer Outreach - Tier 1
**Labels**: `partnership`, `marketing`, `priority-medium`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Reach out to productivity YouTubers and bloggers (10K-100K followers).

**Target List**:
- Notion YouTubers
- PKM bloggers
- Book reviewers who use Notion

**Outreach Template**:
```
Subject: Free tool for your Notion audience

Hi [Name],

I built Kindle to Notion - exports Kindle highlights to Notion in one click.
Free during beta, no signup required.

Would love for you to try it and share if useful.

[Link]
```

**Acceptance Criteria**:
- [ ] 20 influencers contacted
- [ ] 5+ responses
- [ ] 2+ features/mentions

---

### Issue #37: Partnership with Student Organizations
**Labels**: `partnership`, `growth`, `priority-low`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Reach out to university clubs and student organizations.

**Angle**: "Free tool for academic reading"

**Acceptance Criteria**:
- [ ] 5 organizations contacted
- [ ] 1+ partnership established

---

### Issue #38: Create Case Study from Power User
**Labels**: `content`, `social-proof`, `priority-medium`
**Milestone**: Phase 4: Growth & Partnerships

**Description**:
Write detailed case study with a power user.

**Structure**:
- User background
- Problem they had
- How they use the extension
- Results/benefits
- Quote

**Acceptance Criteria**:
- [ ] Power user interviewed
- [ ] Case study written
- [ ] Published on landing page/blog

---

## Phase 5: Expansion (Weeks 12-24)

---

### Issue #39: Feature - Custom Notion Templates
**Labels**: `feature`, `product`, `priority-high`
**Milestone**: Phase 5: Expansion

**Description**:
Allow users to select different Notion database templates for export.

**Options**:
- Simple (current)
- Academic (with citation fields)
- Reading tracker (with dates, ratings)
- Custom (user-defined)

**Acceptance Criteria**:
- [ ] Template selector in options
- [ ] 3+ templates available
- [ ] Documentation updated

---

### Issue #40: Feature - Batch Export Multiple Books
**Labels**: `feature`, `product`, `priority-high`
**Milestone**: Phase 5: Expansion

**Description**:
Allow exporting multiple books at once.

**Requirements**:
- Select multiple books from list
- Export all with one click
- Progress indicator

**Acceptance Criteria**:
- [ ] Multi-select UI
- [ ] Batch processing works
- [ ] Progress shown to user

---

### Issue #41: Safari Extension
**Labels**: `feature`, `platform`, `priority-medium`
**Milestone**: Phase 5: Expansion

**Description**:
Create Safari version of extension.

**Notes**:
- Different extension format
- Apple Developer account needed
- Test on macOS and iOS

**Acceptance Criteria**:
- [ ] Safari extension created
- [ ] Submitted to App Store
- [ ] Listed on landing page

---

### Issue #42: Spanish Landing Page
**Labels**: `i18n`, `growth`, `priority-medium`
**Milestone**: Phase 5: Expansion

**Description**:
Create Spanish version of landing page for Spanish-speaking market.

**Requirements**:
- Professional translation
- Localized keywords
- Same design/structure

**Acceptance Criteria**:
- [ ] Translation completed
- [ ] Page live at /es/
- [ ] Meta tags localized

---

### Issue #43: Portuguese Landing Page
**Labels**: `i18n`, `growth`, `priority-medium`
**Milestone**: Phase 5: Expansion

**Description**:
Create Portuguese version (your home market).

**Acceptance Criteria**:
- [ ] Translation completed
- [ ] Page live at /pt/
- [ ] Meta tags localized

---

### Issue #44: German Landing Page
**Labels**: `i18n`, `growth`, `priority-low`
**Milestone**: Phase 5: Expansion

**Description**:
Create German version (strong Notion adoption market).

**Acceptance Criteria**:
- [ ] Translation completed
- [ ] Page live at /de/
- [ ] Meta tags localized

---

### Issue #45: Firefox Add-ons Store Optimization
**Labels**: `marketing`, `seo`, `priority-medium`
**Milestone**: Phase 5: Expansion

**Description**:
Optimize Firefox listing similar to Chrome.

**Tasks**:
- Update title
- Optimize description
- Add screenshots
- Encourage reviews

**Acceptance Criteria**:
- [ ] Title updated
- [ ] Description optimized
- [ ] 5 screenshots added
- [ ] 10+ reviews

---

### Issue #46: Edge Add-ons Store Optimization
**Labels**: `marketing`, `seo`, `priority-medium`
**Milestone**: Phase 5: Expansion

**Description**:
Optimize Edge listing similar to Chrome.

**Acceptance Criteria**:
- [ ] Title updated
- [ ] Description optimized
- [ ] Screenshots added

---

### Issue #47: Feature - Reading Stats Dashboard
**Labels**: `feature`, `product`, `priority-low`
**Milestone**: Phase 5: Expansion

**Description**:
Add statistics about reading habits.

**Stats to Show**:
- Total books exported
- Total highlights
- Most highlighted books
- Export history

**Notes**: Could be premium feature for monetization.

**Acceptance Criteria**:
- [ ] Stats page in extension
- [ ] Visualizations included
- [ ] Data stored locally

---

### Issue #48: Feature - Daily Highlights Email
**Labels**: `feature`, `product`, `priority-low`
**Milestone**: Phase 5: Expansion

**Description**:
Send daily email with random highlights (like Readwise).

**Notes**:
- Requires email infrastructure
- Could be premium feature
- User opt-in required

**Acceptance Criteria**:
- [ ] Email system set up
- [ ] User preference in options
- [ ] Unsubscribe works

---

## Ongoing / Maintenance

---

### Issue #49: Weekly KPI Tracking
**Labels**: `analytics`, `ongoing`, `priority-high`
**Milestone**: None (ongoing)

**Description**:
Track key metrics weekly.

**Metrics**:
- Weekly active users
- Chrome Store rating
- Review count
- Landing page visitors
- Install rate

**Acceptance Criteria**:
- [ ] Tracking spreadsheet created
- [ ] Updated every Monday
- [ ] Monthly analysis report

---

### Issue #50: Monitor Competitor Updates
**Labels**: `research`, `ongoing`, `priority-medium`
**Milestone**: None (ongoing)

**Description**:
Keep track of competitor changes.

**Competitors to Monitor**:
- Readwise
- Clippings.io
- CollabWriting
- New entrants

**What to Track**:
- Feature updates
- Pricing changes
- Marketing campaigns
- User complaints

**Acceptance Criteria**:
- [ ] Monthly competitor review
- [ ] Document in notion/doc
- [ ] Respond to threats

---

## Labels Reference

Create these labels in your repository:

| Label | Color | Description |
|-------|-------|-------------|
| `priority-critical` | #d73a4a | Must do immediately |
| `priority-high` | #ff7619 | Important, do soon |
| `priority-medium` | #fbca04 | Should do |
| `priority-low` | #0e8a16 | Nice to have |
| `marketing` | #5319e7 | Marketing tasks |
| `seo` | #1d76db | SEO optimization |
| `content` | #d4c5f9 | Content creation |
| `community` | #bfdadc | Community building |
| `product` | #f9d0c4 | Product/feature work |
| `technical` | #bfd4f2 | Technical tasks |
| `partnership` | #c2e0c6 | Partnership opportunities |
| `design` | #ff9999 | Design work |
| `analytics` | #e4e669 | Analytics/tracking |
| `i18n` | #006b75 | Internationalization |
| `ongoing` | #ffffff | Recurring tasks |
