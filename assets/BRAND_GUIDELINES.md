# Brand & UI/UX Style Guidelines

## 1. Brand Essence
Kindle To Notion is a premium, seamless, and magical tool bridging the gap between raw reading and structured knowledge.

- **Voice & Tone:**
  - **Premium & Professional:** The language should be concise, confident, and clear.
  - **Frictionless & Magical:** Emphasize the ease of use ("1-click", "zero-setup", "wizardry").
  - **Direct (Blunt but Helpful):** Provide instructions without fluff. Respect the user's intelligence and time.

---

## 2. Color Palette & Gradients

The design relies heavily on a vibrant gradient contrasting with deep blacks and clean whites.

### Primary Gradient (The "Magic" Gradient)
Used for key accents, iconic backgrounds, and highlights.

- **Start:** `#6366F1` (Indigo-500)
- **End:** `#F59E0B` (Amber-500)
- **CSS Variable:** `--brand-gradient: linear-gradient(135deg, var(--brand-gradient-start), var(--brand-gradient-end));`

### Core Colors

- **Canvas White:** `#FFFFFF` (`--canvas-white`) - Used for primary backgrounds when not glassmorphic.
- **Jet Black:** `#1A1A1A` (`--jet-black`) - Used for primary text on light backgrounds and primary solid buttons.
- **Carbon Gray:** `#37352F` (`--carbon-gray`) - Used for secondary text, mimicking Notion's aesthetic.
- **Muted Slate:** `#6B7280` (`--muted-slate`) - Used for tertiary text, placeholders, and borders.

### Functional Colors

- **Success:** Background `#DCFCE7` (`--success-bg`), Text `#166534` (`--success-text`)
- **Warning:** Background `#FEF9C3` (`--warning-bg`), Text `#854D0E` (`--warning-text`)
- **Error:** Background `#FEE2E2` (`--error-bg`), Text `#991B1B` (`--error-text`)

---

## 3. Ambient Background & Glassmorphism

To create a premium, "living" interface, the UI employs ambient, floating blobs behind a frosted glass layer.

### Ambient Blobs
Large, slow-moving, blurred, colored orbs that sit fixed in the background.

- **Peach Blob:** `rgba(255, 228, 214, 0.6)` (`--blob-peach`)
- **Periwinkle Blob:** `rgba(199, 210, 254, 0.4)` (`--blob-periwinkle`)
- **Effect:** Must be heavily blurred (`filter: blur(60px)` to `blur(80px)`) and animated with a slow `float` keyframe (10s ease-in-out infinite).

### Glassmorphism System
Used for primary containers, cards, and sticky headers.

- **Glass Background:** `rgba(255, 255, 255, 0.85)` (`--glass-bg`)
- **Glass Blur:** `8px` to `12px` (`--glass-blur`, `backdrop-filter: blur(var(--glass-blur))`)
- **Border Light:** `rgba(229, 231, 235, 0.6)` (`--border-light`) - Applied as a 1px solid border to glass elements to give structure.

---

## 4. Typography System

**Primary Font:** `Inter`, falling back to `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

- **Headings (h1-h6):** Weighted heavily (`800` or `700`), colored Jet Black, with tight letter spacing (`letter-spacing: -0.02em;` to `-0.04em;`).
- **Body Text:** Weighted normally (`400` or `500`), colored Carbon Gray or Muted Slate.
- **Line Height:** Relaxed leading for body text (`1.6`), tighter leading for headings (`1.1`).

---

## 5. UI Components

### Variables Mapping

#### Spacing (`--space-*`)

- `xs`: 8px
- `sm`: 12px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

#### Border Radius (`--radius-*`)

- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- **Pills (Buttons):** `9999px`

#### Shadows (`--shadow-*`)

- `sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` (Subtle depth)
- `md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` (Hover states)
- `lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` (Elevated popups/modals)
- `2xl`: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` (Major page focal points, hero images)

### Buttons

- **Primary Button:**
  - Background: Jet Black (`--jet-black`)
  - Text: Canvas White (`--canvas-white`)
  - Shape: Pill (`border-radius: 9999px`)
  - Hover: Transform translateY(-2px), add `shadow-lg`, darken background to `#000000`.
- **Secondary Button:**
  - Background: Semi-transparent white (`rgba(255, 255, 255, 0.5)`)
  - Text: Jet Black
  - Border: 1px solid `--border-light`
  - Shape: Pill (`border-radius: 9999px`)

### Forms & Inputs

- **Inputs:** Semi-transparent white background, subtle border.
- **Focus State:** White background, Indigo ring (`box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);`), border color transitions to `--brand-gradient-start`.

### Layout

- Utilize CSS Grid and Flexbox exclusively.
- Central alignments for landing pages (Hero, Features, Testimonials).
- Clean, vertical stacks for the extension popup UI.

---

## 6. Implementation Notes for Developers

1. **NEVER use raw CSS colors.** Always use the CSS custom properties (`var(--<name>)`) defined in `:root`.
2. **Extensions Architecture:** Since this extension runs across Chrome, Edge, and Firefox without a build step, do not introduce SCSS, Tailwind, or complex build tools. Maintain vanilla CSS with variable usage.
3. **Animations:** Keep animations purposeful. Micro-interactions on hover (scale, translateY, shadow increase) and ambient background floats are required; excessive motion is discouraged. Use the predefined `--transition-fast` (200ms) and `--transition-normal` (300ms) cubic-beziers.
