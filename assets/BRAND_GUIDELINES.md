# Brand & UI/UX Style Guidelines

## 1. Brand Essence

Kindle To Notion is a premium tool bridging the gap between raw reading and structured knowledge. It positions itself as the ultimate, free, local-first alternative to Readwise and similar cloud-based services.

- **Voice & Tone:**
  - **Premium & Professional:** The language should be concise, confident, and clear.
  - **Frictionless:** Emphasize the ease of use and instant setup without signups.
  - **Direct (Blunt but Helpful):** Provide instructions without fluff. Respect the user's intelligence and time. Focus on speed, privacy, and zero monthly costs.

---

## 2. Color Palette & Theming

The design relies on a striking contrast between Jet Black, Canvas White, and vibrant Kindle Orange to guide the user's eyes and create a premium feel.

### Core Colors (Tailwind v4 Theme)

- **Canvas White:** `#FFFFFF` (`--color-canvas-white`) - Primary background and default container background.
- **Jet Black:** `#1A1A1A` (`--color-jet-black`) - Primary action buttons, primary text on light backgrounds, strong headings.
- **Carbon Gray:** `#37352F` (`--color-carbon-gray`) - Secondary text, standard body copy, closely mimicking Notion's aesthetic.
- **Muted Slate:** `#6B7280` (`--color-muted-slate`) - Tertiary text, placeholders, light borders, and dividers.
- **Kindle Orange:** `#FF9900` (`--color-kindle-orange`) - Primary brand accent color, used for CTA backgrounds, icons, ambient glow, badges, and highlights.

---

## 3. Ambient Background & UI Treatments

To create a premium, "living" interface, the UI employs ambient, floating blobs rather than solid linear gradients.

### Ambient Blobs

Large, slow-moving, blurred, colored orbs that sit fixed in the background to provide a sense of depth and life.

- **Orange Blob:** `bg-kindle-orange/10` or `bg-kindle-orange/5` (`rgba(255, 153, 0, 0.1)`)
- **Effect:** Must be heavily blurred (`blur-[100px]` to `blur-[120px]`) and given animated keyframes `(scale, x, y)` over slow durations (20s to 25s infinite loop) to float effortlessly in the background.

### UI Containers & Glassmorphism

- **Cards & Features:** Utilize `bg-white/5` with `backdrop-blur-sm`, or solid `bg-white` with a crisp `border-muted-slate/10` border.
- **Shadows:** Very subtle shadow for resting states, shifting to deep, colorful shadows `shadow-kindle-orange/5` or `shadow-xl` on hover to emphasize interactivity.

---

## 4. Typography System

The typographical scale utilizes a modern sans-serif paired with a highly distinctive display font to give a tech-forward yet approachable feel.

- **Display/Headings Font:** `Space Grotesk` (`--font-display`). Used for h1, h2, bold hero text, numbers, and important visual markers.
- **Primary Body Font:** `Inter` (`--font-sans`). Used for paragraph text, lists, and secondary elements.
- **Font Stack:** Both fallback to `ui-sans-serif, system-ui, sans-serif`.
- **Styling:** Headings are tightly tracked (negative letter-spacing or `tracking-tight`), and body copy relies on a relaxed leading (`leading-relaxed`) to improve readability of reading-centric text.

---

## 5. UI Components

### Buttons & Links

- **Primary Button (Dark):** 
  - Background: Jet Black
  - Text: Canvas White
  - Shape: Fully rounded corners (`rounded-2xl` or larger)
  - Hover: Accent transition, optionally bringing in Kindle Orange or increasing shadow depth (`hover:shadow-kindle-orange/20`).
- **Accent Badges (Pills):**
  - Background: `bg-kindle-orange/10`
  - Text: `text-kindle-orange`
  - Padding: Typically `px-4 py-2`
  - Icon integration: Always pair short text labels with an elegant icon (e.g., Zap `w-4 h-4`).
  - Shape: Fully rounded (`rounded-full`)

### Structural Shapes

- **Border Radius:** Heavy use of exaggerated rounded corners for a modern, approachable aesthetic.
  - General cards: `rounded-2xl`
  - Standard feature containers: `rounded-3xl`
  - Large wrapper containers: `rounded-[2.5rem]` or `rounded-[3rem]`
  - Icons and inner avatars: `rounded-full` or slightly squared `rounded-[1.2rem]` or `rounded-xl`

### Animations

- **Scroll animations:** Continuous marquees using CSS `@keyframes scroll` (e.g., Social Proof testimonials).
- **Hover micro-interactions:** Gentle translation (e.g., `group-hover:translate-x-1` on arrows) or icon scaling (`group-hover:scale-110`). Avoid jarring jumps.
- **3D & Spatial:** Use nested `perspective` and `transformStyle: "preserve-3d"` setups on visual showcases (like book carousels) with slow infinite rotations.

---

## 6. Implementation Notes for Developers

1. **Colors & Theming:** Use Tailwind CSS variables (`--color-*`) consistently for all component styling (e.g., `text-jet-black`, `bg-canvas-white`) instead of raw hardcoded HEX colors.
2. **Typography Setup:** Ensure Google fonts (`Inter` and `Space Grotesk`) are imported in the root CSS context. Use `font-display` utility classes for titles.
3. **Animations:** Keep motion purposeful. Micro-interactions on hover (scale, shadow increase) and ambient background floats are required to elevate the UI to a premium level. Excessive motion should be avoided; ensure a harmonious flow.
