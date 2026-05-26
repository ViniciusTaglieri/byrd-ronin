# Friendly Redesign — Design Spec
Date: 2026-05-22

## Overview

Transform the Byrd Ronin website from a dark/premium aesthetic to a friendly, warm, light-first design similar to Stardew Valley and Flappy Bird. Dark elements are used only for contrast and emphasis (cards, hero, key CTAs).

## Color System

### New Tokens (add to tailwind.config.js)
- `cream: #f4f9f4` — base background for light sections (soft mint)
- `sky: #eaf4fb` — alternate section background (light blue)
- `slate: #4a5568` — body text on light backgrounds

### Existing tokens kept
- `ink #0b1220` — headline text on light backgrounds (already exists)
- `bamboo #6b8f5e` — primary accent
- `gold #bfb52c` — secondary accent
- `blue-light #49c2f2` — tertiary accent
- `panel` / `ink` dark backgrounds for cards

### Section background map

| Section    | Background |
|------------|-----------|
| Hero       | dark (image, unchanged) |
| Status     | cream      |
| Trailer    | sky        |
| Features   | white      |
| Gameplay   | cream      |
| Final CTA  | sky        |
| Footer     | ink (dark) |

### Typography on light backgrounds
- Headings: `text-ink`
- Body paragraphs: `text-slate`
- Kickers: `text-bamboo font-display uppercase`
- Links/accents: `text-blue` or `text-bamboo`

---

## Navbar

### Layout
- `bg-white/95 backdrop-blur-sm` base, `shadow-md` on scroll
- Grid: `[auto_1fr_auto]` — logo left, nav links center on desktop, steam button right
- Links aligned to right side of the center column (justify-end)
- On mobile: `[auto_auto]` — logo left, hamburger right

### Bamboo Structural Decoration
- Two vertical bamboo "stalks" rendered in-component (no separate component), positioned absolute at left and right edges of navbar
- Each stalk: 2–3 segments (`div` with `bg-bamboo/60 rounded-sm w-3`) separated by nodes (`div` with `border-2 border-bamboo/80 rounded-full w-4 h-4`)
- Leaves: small SVG leaf shapes (`path`) hanging from nodes, animated with Framer Motion `animate={{ rotate: [-4, 4, -4] }}` `transition={{ repeat: Infinity, duration: 2.5 }}` with staggered delays per leaf
- Stalk opacity: `opacity-50` to stay decorative, pointer-events none

### Color on scroll
- Unscrolled: `bg-white/90 shadow-none`
- Scrolled: `bg-white/98 shadow-md border-b border-bamboo/20`

### Links
- `text-ink` default, `hover:text-bamboo` transition
- Underline slide-in on hover (existing pattern, keep with Tailwind classes)
- Font: `font-display text-base tracking-wide`

### Mobile menu
- `bg-cream` background
- Links: `font-display text-xl text-ink hover:text-bamboo`

---

## Hero Section

No structural changes. The hero stays dark (image background) as the dramatic anchor.
Adjust body background to `bg-cream` in BaseLayout so no bleed occurs.

---

## Status Section

### Layout
- Section background: `bg-cream py-16`
- The existing dark card keeps its gradient but gains `shadow-2xl`

### Visual Hierarchy inside the card
1. **Kicker** — `text-blue-light font-display uppercase text-sm tracking-widest`
2. **h2** — large, `font-display text-white leading-tight`
3. **Description** — `text-muted text-base leading-relaxed` directly below h2 (move from where it's currently displaced)
4. **Tags** — `bg-bamboo/20 border border-bamboo/40 text-bamboo rounded-full px-3 py-1 text-sm font-semibold`
5. **dl grid** — `dt` gets small inline SVG icon + `text-blue-light font-display text-sm uppercase tracking-wide`, `dd` is `text-white font-bold text-base mt-1`
6. **CTA button** — bottom of right column

---

## Trailer Section

### Layout
- Section background: `bg-sky py-24`
- Grid: `grid-cols-[2fr_1fr]` on desktop (was 1.5fr/1fr) — video takes 2/3
- On mobile: `grid-cols-1`
- Aspect ratio wrapper around player: `aspect-video w-full`

### Text column (right)
- Kicker + `h3` (not h2 — text is complement, not focus)
- `h3`: `font-display text-2xl text-ink leading-tight`
- Max 2–3 lines of description: `text-slate text-sm leading-relaxed`
- Link "Ver mais gameplay →": `text-bamboo font-display text-sm font-bold hover:underline`
- No ghost button

---

## Features Section

### Layout
- Section background: `bg-white py-24`
- 3 features stacked vertically, alternating layout (no grid of cards)
- Bamboo divider between features: `border-t border-bamboo/20` with centered node `w-5 h-5 rounded-full bg-bamboo/20 border border-bamboo/40`

### Each Feature Row
- Container: `bg-ink rounded-2xl overflow-hidden shadow-xl`
- Grid: odd features `grid-cols-[360px_1fr]`, even features `grid-cols-[1fr_360px]`
- On mobile: `grid-cols-1`

### Icon Block
- `bg-bamboo/10 p-12 flex items-center justify-center`
- Icon size: `w-24 h-24`
- Colors: Upgrades → `text-gold`, Enemies → `text-blue-light`, Chaos → `text-red`
- Motion: `whileHover={{ scale: 1.1, rotate: 5 }}`

### Text Block
- `p-10 flex flex-col justify-center gap-4`
- `h3`: `font-display text-3xl text-white`
- `p`: `text-muted text-base leading-relaxed`

---

## Gameplay Section

### Layout
- Section background: `bg-cream py-24`
- Heading: `text-ink` (dark on light)
- Kicker: `text-bamboo`

### Card improvements
- Hover: `border-bamboo` (instead of muted)
- Caption: slide-up with Framer Motion `initial={{ y: '100%' }} whileHover={{ y: 0 }}`
- Caption background: `bg-ink/90` with bamboo-colored title

---

## Final CTA Section

### Layout
- Section background: `bg-sky py-16`
- Container: `rounded-2xl overflow-hidden shadow-2xl` — dark card, `grid-cols-2` desktop, `grid-cols-1` mobile

### Left column (image)
- `div` with inline style `backgroundImage` pointing to existing image
- `bg-cover bg-center h-full min-h-80`
- Parallax: keep existing `useScroll + useTransform` logic

### Right column (text)
- `bg-gradient-to-br from-[#0d1a0f] to-[#0b1210] p-10 flex flex-col justify-center gap-6`
- Kicker → `h2 font-display text-4xl text-white leading-tight` → short paragraph → Steam button
- Same structure as hero copy but smaller scale

---

## Global Refactor — Remove Arbitrary Values

Replace throughout all files:

| Arbitrary | Canonical |
|-----------|-----------|
| `text-[17px]` | `text-lg` |
| `text-[18px]` | `text-lg` |
| `text-[19px]` | `text-lg` |
| `text-[20px]` | `text-xl` |
| `text-[34px]` | `text-3xl` |
| `gap-[22px]` | `gap-5` |
| `gap-[26px]` | `gap-6` |
| `gap-[34px]` | `gap-8` |
| `px-[10px]` | `px-2.5` |
| `py-[14px]` | `py-3.5` |
| `py-[13px]` | `py-3` |
| `mb-[42px]` | `mb-10` |
| `mb-[18px]` | `mb-4` |
| `text-[clamp(54px,7vw,96px)]` | `text-6xl md:text-7xl xl:text-9xl` |
| `text-[clamp(40px,5vw,68px)]` | `text-4xl md:text-6xl xl:text-7xl` |
| `text-[clamp(36px,13vw,52px)]` | `text-4xl md:text-5xl` |
| `text-[clamp(32px,3.5vw,52px)]` | `text-3xl md:text-4xl xl:text-5xl` |
| `leading-[0.86]` | `leading-none` |
| `leading-[0.9]` | `leading-tight` |
| `leading-[1.65]` | `leading-relaxed` |
| `leading-[1.7]` | `leading-relaxed` |
| `min-h-[48px]` | `min-h-12` |
| `min-h-[72px]` | `min-h-18` |

---

## Technology Constraints

- **Tailwind only** — no new CSS classes, no `@layer`, no arbitrary values
- **Radix UI** — available for any interactive primitives if needed
- **Framer Motion** — for all animations (navbar bamboo leaves, caption slide-up, card entrances)
- No new npm dependencies

---

## Files Affected

| File | Change |
|------|--------|
| `tailwind.config.js` | Add `cream`, `sky`, `slate` tokens |
| `src/layouts/BaseLayout.astro` | Body `bg-cream`, `scroll-smooth` on html |
| `src/components/react/NavbarClient.tsx` | Full redesign + inline bamboo stalks |
| `src/components/StatusSection.astro` | `bg-cream` wrapper, hierarchy fixes, tags redesign |
| `src/components/TrailerSection.astro` | `bg-sky`, grid ratio `2fr 1fr`, `h3` text column |
| `src/components/react/TrailerPlayer.tsx` | Arbitrary value cleanup |
| `src/components/FeaturesSection.astro` | `bg-white` wrapper |
| `src/components/react/FeatureGrid.tsx` | Full redesign — alternating layout |
| `src/components/GameplayGrid.astro` | `bg-cream`, `text-ink` headings |
| `src/components/react/GameplayGridClient.tsx` | Caption slide-up animation |
| `src/components/react/FinalCTAClient.tsx` | Image-as-background layout |
| `src/components/Footer.astro` | Keep dark, minor cleanup |
| All TSX/Astro files | Remove all arbitrary values |
