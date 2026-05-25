# Features Section Redesign — Spec

**Date:** 2026-05-24  
**Status:** Approved

## Overview

Redesign the Features section cards to use the new game image assets (`features_upgrades.png`, `features_inimigos.png`, `features_caos.png`), replacing the existing SVG pixel art icons. Cards get a game-UI aesthetic: diagonal clip-path corners, scan lines + noise overlay on the image, thematic accent colors per card, and a featured (taller) center card.

## Layout

**Grid**: 3 equal-width columns. Cards do not change width, only height varies.
- Side cards (Upgrades, Caos): `height: 420px`
- Center card (Inimigos): `height: 520px` — `featured: true` prop

**Mobile (`< 980px`)**: single column, all cards `height: auto`, featured sizing disabled.

**Card order**: Upgrades → Inimigos → Caos (left to right).

## Card Structure

Each card is a `motion.article` with the following internal structure (top to bottom):

```
┌─────────────────────────────┐  ← clip-path diagonal on top-right corner
│  [image — object-fit:cover] │  ← ~55% of card height
│  [scan lines overlay]       │  ← CSS repeating-linear-gradient, static
│  [noise overlay]            │  ← SVG feTurbulence filter, opacity ~0.06
│  [badge label]              │  ← bottom-left of image area, thematic color bg
├─────────────────────────────┤  ← 1px separator, thematic color
│  [title — font-display]     │  ← white, 1.5rem
│  [body text — font-body]    │  ← text-muted, base size, relaxed leading
└─────────────────────────────┘
```

## Clip-path

Applied via `style={{ clipPath: "..." }}` on the `motion.article` to avoid Tailwind purge issues.

- Side cards: `polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)`
- Center card: `polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)`

## Thematic Colors

| Card     | Color token  | Hex       |
|----------|-------------|-----------|
| Upgrades | `gold`       | `#bfb52c` |
| Inimigos | `blue-light` | `#49c2f2` |
| Caos     | `red`        | `#f21313` |

Used for: badge background, card border, hover glow.

## Visual Effects

### Scan Lines (CSS)
Absolute overlay on the image area:
```css
background: repeating-linear-gradient(
  to bottom,
  transparent 0px, transparent 3px,
  rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px
);
```
Static, no animation.

### Noise/Grain (SVG filter)
Single `<svg style={{display:'none'}}>` at top of `FeatureGrid.tsx` with:
```svg
<filter id="noise-filter">
  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter>
```
Overlay `div` on the image with `filter: url(#noise-filter)` and `opacity: 0.06`.

### Card Border
`border: 1px solid rgba(<accentColor>, 0.2)` at rest.  
On hover: `rgba(<accentColor>, 0.6)`.

### Hover (framer-motion `whileHover`)
- `y: -6`
- `boxShadow: "0 0 0 1px <accentColor>, 0 20px 40px rgba(0,0,0,0.5)"`
- Image `brightness`: `0.85` → `1.0` via CSS transition on the `<img>` tag (0.3s ease)
- Badge: subtle opacity pulse via `whileHover` on the badge element

### Enter Animation
Preserves existing stagger pattern (`staggerChildren: 0.15`, `delayChildren: 0.05`).
- Side cards: `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`
- Center card: `{ opacity: 0, y: 28 }` → `{ opacity: 1, y: 0 }` (smaller offset matches its featured prominence)

## Files Changed

| File | Change |
|------|--------|
| `src/components/react/FeatureGrid.tsx` | Full rewrite — new card structure, image, scan lines, noise, clip-path, thematic colors |
| `src/components/react/FeatureIcons.tsx` | Deleted — SVG pixel art icons removed, replaced by image assets |
| `src/components/FeaturesSection.astro` | No changes |

## Assets Used

- `/public/features_upgrades.png`
- `/public/features_inimigos.png`
- `/public/features_caos.png`

## Data Shape (inside FeatureGrid.tsx)

```ts
const features = [
  {
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    image: "/features_upgrades.png",
    accentColor: "#bfb52c",
    featured: false,
  },
  {
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    image: "/features_inimigos.png",
    accentColor: "#49c2f2",
    featured: true,
  },
  {
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    image: "/features_caos.png",
    accentColor: "#f21313",
    featured: false,
  },
] as const;
```
