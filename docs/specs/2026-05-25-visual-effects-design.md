# Visual Effects — Byrd Ronin Landing Page

**Date:** 2026-05-25  
**Scope:** Katana slash on feature cards, animated dot grids per section, thematic particles (shurikens + bamboo leaves)

---

## 1. Katana Slash — Feature Cards

### Trigger
`whileHover` on each `FeatureCard` in `FeatureGrid.tsx`.

### Implementation
Add an absolutely-positioned SVG inside each card. The SVG contains two parallel diagonal paths (`M 2,2 L 98,98` and `M 6,2 L 98,94`) to simulate blade thickness.

On hover entry:
- `pathLength`: `0 → 1` over 180ms, easing `[0.22, 1, 0.36, 1]`
- `opacity`: stays at `1` during draw

On hover exit (after draw completes):
- `opacity`: `1 → 0` over 120ms

### Visual spec
- SVG: `absolute inset-0 w-full h-full pointer-events-none overflow-hidden`
- `viewBox="0 0 100 100" preserveAspectRatio="none"`
- Primary stroke: `rgba(73,194,242,0.6)`, `strokeWidth: 1.5`, `fill: none`
- Shadow stroke: same path, `rgba(73,194,242,0.2)`, `strokeWidth: 3`, drawn behind primary
- Existing hover effects (`y: -4`, `borderColor`, `boxShadow`) remain unchanged

### Files changed
- `src/components/react/FeatureGrid.tsx` — add `KatanaSlash` sub-component and wire into `FeatureCard`

---

## 2. Animated Dot Grid — Per Section

### Concept
Each section gets a `div.dot-grid` overlay with CSS-animated dots that "breathe" when the section enters the viewport. Color is unique per section. No canvas, no JS animation loop — pure CSS custom properties + IntersectionObserver.

### Section color map

| Section | Dot color | Notes |
|---------|-----------|-------|
| `#features` | `rgba(107,143,94, var(--dot-opacity))` | replaces existing static dot grid |
| `#gameplay` | `rgba(7,136,217, var(--dot-opacity))` | new |
| `#trailer` | `rgba(191,181,44, var(--dot-opacity))` | new |
| `#cta` (FinalCTA) | `rgba(242,19,19, var(--dot-opacity))` | new |

### Animation states

**Default (resting):**
```css
--dot-opacity: 0.035;
--dot-size: 22px;
```

**Active (`.is-visible`):**
```css
@keyframes dotPulse {
  0%   { --dot-opacity: 0.035; --dot-size: 22px; }
  50%  { --dot-opacity: 0.09;  --dot-size: 24px; }
  100% { --dot-opacity: 0.035; --dot-size: 22px; }
}
animation: dotPulse 4s ease-in-out infinite;
```

`.is-visible` is toggled by an IntersectionObserver (`threshold: 0.15`) added via an inline `<script>` in each Astro section.

### Dot grid CSS pattern
```css
background-image: radial-gradient(circle, <color> 1px, transparent 1px);
background-size: var(--dot-size) var(--dot-size);
```

### Files changed
- `src/components/FeaturesSection.astro` — replace static dot grid div, add observer script
- `src/components/GameplayGrid.astro` — add dot grid div + observer
- `src/components/TrailerSection.astro` — add dot grid div + observer
- `src/components/FinalCTA.astro` (or `FinalCTAClient.tsx`) — add dot grid div + observer
- `src/styles/global.css` — add `.dot-grid`, `@keyframes dotPulse`, section color variants

---

## 3. Thematic Particles

### 3a. `ShurikenParticles` — FeaturesSection

**File:** `src/components/react/ShurikenParticles.tsx`

**Canvas approach:** `absolute inset-0 w-full h-full pointer-events-none`, `client:visible`.

**Particle spec:**
- Count: 7
- Shape: 4-pointed star drawn via canvas path (8 vertices, alternating outer radius R and inner radius R×0.4)
- Size: 4–10px (random per particle, integer — pixel art feel)
- Color: alternates between `rgba(73,194,242,0.18)` and `rgba(191,181,44,0.12)`
- Velocity: `vy: -0.3 to -0.8` (float upward), `vx: -0.15 to 0.15`
- Rotation: `rotation += 0.012 * speed` per frame
- Respawn: when `y < -size`, reset to `y = canvas.height + size`, random `x`

**Draw loop:** `requestAnimationFrame`, clears canvas each frame, draws each star rotated at its current angle.

### 3b. `LeafParticles` — GameplayGrid

**File:** `src/components/react/LeafParticles.tsx`

**Canvas approach:** same as above.

**Particle spec:**
- Count: 12
- Shape: 3×1px rect rotated 45° — bamboo leaf pixel art
- Color: `rgba(107,143,94,0.2)`
- Velocity: `vy: 0.5–1.2`, `vx: ±0.3`
- Oscillation: `x += Math.sin(t * 0.8 + phase) * 0.4` — gentle drift
- Respawn: when `y > canvas.height + size`, reset to `y = -size`, random `x`

### Integration points
- `FeaturesSection.astro`: add `<ShurikenParticles client:visible />`
- `GameplayGrid.astro`: add `<LeafParticles client:visible />`

---

## Constraints

- No new npm dependencies
- All canvas particles pause when `document.visibilityState === 'hidden'` (use existing PixelParticles pattern)
- Dot grid observer uses `disconnect()` when section is unmounted (Astro page navigation)
- Slash SVG uses `overflow-hidden` on the card to clip the path at card boundaries
