# Visual Improvements — Byrd Ronin Landing Page

**Date:** 2026-05-22  
**Status:** Approved  
**Scope:** Full visual overhaul across all 10 sections + global components

---

## Context

The landing page for Byrd Ronin (Astro + React + Tailwind v4 + Framer Motion) is functionally complete but needs a visual polish pass. The goal is to:

- Maintain the pixel art DNA of the game
- Add bamboo/nature thematic elements consistent with the game world
- Evolve harsh diagonal box-shadows to refined pixel-art shadows
- Improve layout, hierarchy, and visual rhythm across all sections

The implementation follows **Approach A: Global Components First** — build reusable pieces (`BambooDecor`, `FallingLeaves`, `SteamIcon`, `SectionWave`) before applying them to sections.

---

## 1. Design System Evolution

**File:** `src/styles/global.css`

### Shadow System (applied per-component, not a single CSS var)
Replace current `8px 8px 0` offsets throughout with smaller pixel offsets. The pixel-art feel is preserved at more elegant sizes:
- Blue accent context: `4px 4px 0 rgba(73,194,242,0.55)` / hover `6px 6px 0 rgba(73,194,242,0.75)`
- Gold accent context: `4px 4px 0 rgba(191,181,44,0.50)` / hover `6px 6px 0 rgba(191,181,44,0.70)`
- Bamboo accent context: `4px 4px 0 rgba(107,143,94,0.45)` / hover `6px 6px 0 rgba(107,143,94,0.65)`

### New Palette Tokens (add to `@theme` and `:root`)
```css
--color-bamboo: #6b8f5e;   /* natural bamboo green */
--color-earth:  #8b6f47;   /* wood / earth */
--color-mist:   rgba(180, 210, 180, 0.08); /* subtle background warmth */
```
These complement the existing blue/gold/red palette without replacing it.

### Border Evolution
- Remove high-contrast solid borders (e.g. `3px solid rgba(73,194,242,0.55)`)
- Replace with `1px solid rgba(107,143,94, 0.25–0.35)` (bamboo at low opacity)
- Border radius: `8–14px` depending on component (cards: 8px, status card: 14px, CTA container: 16px)

### Typography
- Nav links: add `letter-spacing: 0.08em`
- Feature card titles: `letter-spacing: 0.04em`

---

## 2. Global Components

All in `src/components/react/`.

### `SteamIcon.tsx`
- Renders `public/steam_logo.svg` as an inline SVG component
- Props: `size?: number` (default 20), `className?: string`
- Replaces `<span className="steam-mark">STEAM</span>` in `SteamButtonAnimated`
- Used in: Navbar button, Hero button, StatusSection button, FinalCTA button, Footer column 3

### `BambooDecor.tsx`
- SVG React component: 2–3 segmented bamboo stalks with nodes and simple leaves
- Props: `side: "left" | "right"`, `opacity?: number` (default 0.20), `className?: string`
- Style: clean pixel-art lines, monochromatic
- Used in: Navbar (both sides, opacity 0.20), StatusSection card (right side, opacity 0.12), Features section (horizontal separator, opacity 0.15), Footer (horizontal separator above copyright)
- `pointer-events: none`, `position: absolute`, `aria-hidden`

### `FallingLeaves.tsx`
- Pure React + CSS `@keyframes`, no external library
- ~15 SVG leaf elements, 3 shape variations, random size/speed/delay per element
- Props: `mode: "ambient" | "section"`, `count?: number` (default 15)
  - `ambient`: always active (used in Hero, FinalCTA)
  - `section`: activates via `IntersectionObserver` when section enters viewport
- Performance: `will-change: transform`, `pointer-events: none`, `position: absolute`, `z-index` between background and content
- Opacity range: 0.4–0.7 per leaf
- Parallax: 3 speed layers via different `animation-duration` values (8s, 13s, 19s)
- Respects `prefers-reduced-motion` — skips animation if enabled

### `SectionWave.tsx`
- SVG wave/diagonal shape positioned absolutely at top or bottom of a section
- Props: `position: "top" | "bottom"`, `color: string`, `className?: string`
- Used as transition between: Hero→Status, TrailerSection top/bottom, FeaturesSection top
- Color matches the adjacent section's background to avoid hard cuts

---

## 3. Navbar

**File:** `src/components/react/NavbarClient.tsx`  
**CSS:** `src/styles/global.css` (`.navbar`, `.nav-links`, `.mobile-menu`)

### Changes
- Background: `linear-gradient(135deg, #0d1a0f 0%, #0b1210 100%)` (dark bamboo green, near-black)
- On scroll: slightly darker, maintains `backdrop-filter: blur(12px)`
- Border: `1px solid rgba(107,143,94,0.30)` replacing current `2px solid rgba(248,250,252,0.14)`
- `<BambooDecor side="left" opacity={0.20} />` and `<BambooDecor side="right" opacity={0.20} />` absolutely positioned at navbar edges
- Nav link `letter-spacing: 0.08em`
- Mobile menu border: `rgba(107,143,94,0.35)` replacing blue tint
- `SteamButtonAnimated` already uses "JOGAR AGORA" label — integrate `<SteamIcon />` as icon

---

## 4. Hero Section

**File:** `src/components/react/HeroAnimations.tsx`

### Changes
- **Remove logo** from `HeroCopy`: delete `<motion.img>` for `/logo.png` — already in navbar
- **Title keywords**: wrap `Chaos` and `Ronin` in `<em>` or `<span>` with `color: var(--gold)` and `font-style: italic`
- **Remove forced line breaks**: delete `<br />` from H1; let `max-width` control wrapping
- **Description**: change `color: #eff8ff` → `color: var(--muted)`, `font-size: 19px`, `line-height: 1.7`
- **Column height cap**: add `max-height: 45vh` to `.hero-copy` at desktop breakpoint
- **`<FallingLeaves mode="ambient" />`**: add to `HeroParticles` or directly in `HeroSection.astro`, positioned between `hero-shade` (z-index 1) and `hero-grid` (z-index 2), so z-index 1.5 effectively
- **`<SectionWave position="bottom" />`**: add at the bottom of the hero section in `HeroSection.astro`

---

## 5. StatusSection

**File:** `src/components/StatusSection.astro`  
**CSS:** `.status-section`, `.status-card`

### Changes
- Overlap: increase `margin-top` from `-56px` to `-72px` for more pronounced badge overlap
- `z-index: 5` maintained
- Card `border-radius`: `8px` → `14px`
- Card border: `3px solid rgba(73,194,242,0.55)` → `1px solid rgba(107,143,94,0.35)`
- Card background: `linear-gradient(135deg, rgba(13,26,15,0.97), rgba(11,18,16,0.97))`
- Card shadow: remove `8px 8px 0 rgba(191,181,44,0.85)` → use `4px 4px 0 rgba(107,143,94,0.45), 0 32px 80px rgba(0,0,0,0.5)`
- Tags border/hover: `rgba(107,143,94,0.30)` and `rgba(107,143,94,0.12)` background on hover
- `<BambooDecor side="right" opacity={0.12} />` as absolute decoration on card's right edge
- Content (kicker, H2, description, tags, metadata DL, button) fully maintained

---

## 6. Trailer Section

**File:** `src/components/TrailerSection.astro`  
**CSS:** `.trailer-section`, `.trailer-frame`

### Changes
- Layout: refactor from `narrow` single-column to 2-column grid inside `container`:
  - Left column (~60%): `TrailerPlayer`
  - Right column (~40%): text content
  - Mobile: stacked, trailer first
- Remove existing centered `.section-heading` — move text to right column
- Right column content:
  - Kicker: "Assista ao Trailer"
  - H2: "Veja o ritmo da lâmina antes da sua primeira run."
  - 2 short paragraphs about what the trailer shows
  - Secondary CTA: `ghost-button` linking to `#gameplay` — "Ver mais gameplay →"
- Trailer frame border: `4px solid var(--blue-light)` → `1px solid rgba(107,143,94,0.35)`
- Trailer frame shadow: `10px 10px 0 rgba(191,181,44,0.9)` → `4px 4px 0 rgba(191,181,44,0.5)`
- Background: retain `#070b10` + add diagonal gradient overlay using `--color-bamboo` at `opacity: 0.04`
- `<SectionWave position="top" />` and `<SectionWave position="bottom" />`

---

## 7. Features Section

**File:** `src/components/react/FeatureGrid.tsx`  
**CSS:** `.features-section`, `.feature-card`, `.feature-icon`

### Changes
- Icon container: `62×62px` → `80×80px`, background `rgba(107,143,94,0.15)`, border `1px solid rgba(107,143,94,0.35)` — replaces solid gold background
- Icon SVG color: retain `--color-gold`
- Card border: `2px solid var(--border)` → `1px solid rgba(107,143,94,0.20)`
- Card background: retain `rgba(248,250,252,0.07)` — subtle, works with new border
- Card hover: border `rgba(107,143,94,0.55)`, shadow `4px 4px 0 rgba(107,143,94,0.45)` — replacing blue offsets
- H3 `letter-spacing: 0.04em`
- Description text: `var(--muted)`, `font-size: 17px`
- **Alternating layout (≥1024px)**: `grid-cols-1` with 3 rows; odd rows have icon-left/text-right, even rows have text-left/icon-right
- `<BambooDecor />` as horizontal separator above the grid, `opacity: 0.15`

---

## 8. Gameplay Section

**File:** `src/components/react/GameplayGridClient.tsx`  
**File:** `src/consts.ts` (update `GAMEPLAY_CLIPS`)  
**CSS:** `.gameplay-card`, `.gameplay-thumb`, `.gameplay-label`

### Changes
- **Remove** `<span className="gameplay-label">` badge (number badge in corner)
- **Update `GAMEPLAY_CLIPS`** in `consts.ts`: add `title: string` and `context: string` fields per clip; remove `as const` from array and add explicit `GameplayClip` interface to preserve TypeScript typing
- **Figcaption**: render `title` (display font, white, 18px) + `context` (muted, 14px) instead of single `caption`
- **Gradient overlay**: add `::after` pseudo-element on `.gameplay-thumb` with `background: linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 40%)` — softens frame-to-caption transition
- **Card entry animation**: add `filter: blur(4px) → blur(0)` to `cardVariants` in Framer Motion
- **Card border**: `2px solid var(--border)` → `1px solid rgba(107,143,94,0.25)`
- **Card hover**: border and shadow align with bamboo system (`rgba(107,143,94,0.55)`, `4px 4px 0 rgba(107,143,94,0.45)`)

---

## 9. Final CTA

**File:** `src/components/react/FinalCTAClient.tsx`  
**CSS:** `.final-cta`, `.final-bg`, `.final-content`

### Changes
- **Section layout**: retain fullwidth section, but introduce `max-w-5xl` centered container with `border-radius: 16px`, `overflow: hidden`
- **2-column grid inside container** (50/50):
  - Left column: `final_cta_background 1.png` as `background-image`, `background-size: cover`, `background-position: center`
  - Right column: background `linear-gradient(135deg, rgba(13,26,15,0.98), rgba(11,18,16,0.96))`, padding `48px`
- **Container styling**: `border: 1px solid rgba(107,143,94,0.25)`, `box-shadow: 0 40px 80px rgba(0,0,0,0.6), 4px 4px 0 rgba(107,143,94,0.3)`
- **Right column content**: H2, subtitle paragraph (`var(--muted)`), "JOGAR AGORA" button with `<SteamIcon />`
- **CTA label**: update from "WISHLIST NA STEAM" to "JOGAR AGORA"
- **`<FallingLeaves mode="section" />`**: activate via IntersectionObserver when section is visible
- Retain `PixelParticles` and particle burst on button hover
- Mobile: image column stacks on top with `height: 200px`, content below

---

## 10. Footer

**File:** `src/components/Footer.astro`  
**CSS:** `.footer`, `.footer-grid`

### Changes
- **Grid**: `auto 1fr auto` → `grid-cols-2 md:grid-cols-4`
- **Border-top**: `rgba(248,250,252,0.14)` → `rgba(107,143,94,0.20)`

**Column 1 — Identity:**
- Logo `/logo.png` (140px wide)
- RDB Studio logo `/rdb_studio_logo.png` (32px height, opacity 0.75)
- Tagline: "Action Roguelite · Steam 2026" — `var(--muted)`, 13px

**Column 2 — Site Map:**
- Links: Hero, Trailer, Features, Gameplay
- `font-family: var(--font-display)`, 15px, `letter-spacing: 0.06em`
- Hover color: `--color-bamboo` (replacing `--blue-light`)

**Column 3 — Download:**
- "JOGAR AGORA" button with `<SteamIcon />`, full width
- "Disponível na Steam" caption below, `var(--muted)`, 13px

**Column 4 — Studio:**
- 4 social icons SVG: Twitter/X, Instagram, Discord, YouTube — 24px, hover `--color-bamboo`
- Studio website link (URL to be confirmed with developer), `var(--muted)`, 13px

**Decorative separator:**
- `<BambooDecor />` horizontal above copyright line, `opacity: 0.15`

**Copyright row:**
- `border-top: 1px solid rgba(107,143,94,0.12)`
- "© 2026 Byrd Ronin · RDB's Studio" — centered, 12px, `rgba(184,202,219,0.45)`

---

## Implementation Order

1. **Design tokens** — update `global.css` with new CSS vars and shadow system
2. **`SteamIcon`** — integrate into `SteamButtonAnimated`
3. **`BambooDecor`** — build SVG component
4. **`FallingLeaves`** — build CSS animation component
5. **`SectionWave`** — build SVG wave component
6. **Navbar** — apply new background, border, BambooDecor, letter-spacing
7. **Hero** — remove logo, highlight keywords, add FallingLeaves + SectionWave
8. **StatusSection** — update card styles (border, shadow, bg), add BambooDecor
9. **TrailerSection** — refactor to 2-col grid, update border/shadow, add waves
10. **FeaturesSection** — update icon container, card styles, alternating layout, add BambooDecor separator
11. **GameplaySection** — remove number badge, update figcaption, add gradient overlay, update card styles
12. **FinalCTA** — refactor to 2-col container, add FallingLeaves, update button label
13. **Footer** — refactor to 4-col grid, add all columns, add BambooDecor separator

---

## Files Affected

| File | Change type |
|------|-------------|
| `src/styles/global.css` | Tokens, shadow system, border updates throughout |
| `src/components/react/SteamIcon.tsx` | New component |
| `src/components/react/BambooDecor.tsx` | New component |
| `src/components/react/FallingLeaves.tsx` | New component |
| `src/components/react/SectionWave.tsx` | New component |
| `src/components/react/SteamButtonAnimated.tsx` | Integrate SteamIcon |
| `src/components/react/NavbarClient.tsx` | New bg, border, BambooDecor |
| `src/components/react/HeroAnimations.tsx` | Remove logo, title keywords, description |
| `src/components/HeroSection.astro` | Add FallingLeaves, SectionWave |
| `src/components/StatusSection.astro` | Card styles, BambooDecor |
| `src/components/TrailerSection.astro` | 2-col layout, text column, waves |
| `src/components/react/FeatureGrid.tsx` | Icon, card, hover, alternating layout |
| `src/components/react/GameplayGridClient.tsx` | Remove badge, update figcaption, animation |
| `src/consts.ts` | Add title+context to GAMEPLAY_CLIPS |
| `src/components/react/FinalCTAClient.tsx` | 2-col container, FallingLeaves, CTA label |
| `src/components/Footer.astro` | Full 4-col refactor |
