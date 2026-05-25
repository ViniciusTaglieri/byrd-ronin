# Visual Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add animated dot grids (per-section color), katana slash on feature card hover, and thematic canvas particles (shurikens in Features, falling leaves in Gameplay).

**Architecture:** CSS custom classes + IntersectionObserver for dot grids (no JS animation loops), Framer Motion SVG `pathLength` for the katana slash via variant propagation, canvas 2D + rAF for particles following the existing `PixelParticles` pattern.

**Tech Stack:** Framer Motion 11, React 19, Astro 5, plain CSS (global.css), canvas 2D

**Spec:** `docs/specs/2026-05-25-visual-effects-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/styles/global.css` | Add `.dot-grid` base class, color variants, `@keyframes dotPulse`, reduced-motion override |
| Modify | `src/components/react/FeatureGrid.tsx` | Add `KatanaSlash` sub-component; refactor `whileHover` to named variant `"hovered"` for propagation |
| Create | `src/components/react/ShurikenParticles.tsx` | Canvas 4-pointed star particles floating upward with rotation |
| Create | `src/components/react/LeafParticles.tsx` | Canvas 3×1px leaf particles falling diagonally with sinusoidal drift |
| Modify | `src/components/FeaturesSection.astro` | Replace static dot grid → animated; add ShurikenParticles; add IntersectionObserver script |
| Modify | `src/components/GameplayGrid.astro` | Add animated dot grid (blue); add LeafParticles; add IntersectionObserver script |
| Modify | `src/components/TrailerSection.astro` | Replace static dot grid → animated (gold); add IntersectionObserver script |
| Modify | `src/components/react/FinalCTAClient.tsx` | Add animated dot grid div (red) managed by useEffect + IntersectionObserver |

---

## Task 1: Animated Dot Grid — CSS foundation

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add dot grid CSS to global.css**

Open `src/styles/global.css`. The file currently contains only `@import` lines. Append:

```css
/* ─── Animated dot grid ──────────────────────────────────────────────── */
.dot-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.4;
  background-size: 22px 22px;
  will-change: opacity, background-size;
}

.dot-grid.is-visible {
  animation: dotPulse 4s ease-in-out infinite;
}

@keyframes dotPulse {
  0%   { opacity: 0.4; background-size: 22px 22px; }
  50%  { opacity: 1;   background-size: 24px 24px; }
  100% { opacity: 0.4; background-size: 22px 22px; }
}

.dot-grid-bamboo {
  background-image: radial-gradient(circle, rgba(107,143,94,0.09) 1px, transparent 1px);
}
.dot-grid-blue {
  background-image: radial-gradient(circle, rgba(7,136,217,0.09) 1px, transparent 1px);
}
.dot-grid-gold {
  background-image: radial-gradient(circle, rgba(191,181,44,0.09) 1px, transparent 1px);
}
.dot-grid-red {
  background-image: radial-gradient(circle, rgba(242,19,19,0.09) 1px, transparent 1px);
}

@media (prefers-reduced-motion: reduce) {
  .dot-grid.is-visible {
    animation: none;
    opacity: 0.6;
  }
}
```

- [ ] **Step 2: Build to verify no errors**

```bash
npm run build
```

Expected: build completes without errors (CSS changes don't cause TS errors).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add animated dot-grid CSS classes with per-section color variants"
```

---

## Task 2: Katana Slash — FeatureGrid

**Files:**
- Modify: `src/components/react/FeatureGrid.tsx`

- [ ] **Step 1: Add KatanaSlash sub-component and refactor card variants**

Replace the entire content of `src/components/react/FeatureGrid.tsx` with:

```tsx
import { motion } from "framer-motion";
import { ease } from "../../lib/motion";

const features = [
  {
    icon: "/images/features_upgrades.png",
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: "/images/features_inimigos.png",
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: "/images/features_caos.png",
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  hovered: {
    y: -4,
    borderColor: "rgba(107,143,94,0.55)",
    boxShadow: "4px 4px 0 rgba(107,143,94,0.45)",
    transition: { duration: 0.15 },
  },
};

const slashVariants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 0, opacity: 0 },
  hovered: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const shadowSlashVariants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 0, opacity: 0 },
  hovered: {
    pathLength: 1,
    opacity: 0.3,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function KatanaSlash() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <motion.path
        d="M 6,2 L 98,94"
        stroke="rgba(73,194,242,0.2)"
        strokeWidth="3"
        fill="none"
        variants={shadowSlashVariants}
      />
      <motion.path
        d="M 2,2 L 98,98"
        stroke="rgba(73,194,242,0.6)"
        strokeWidth="1.5"
        fill="none"
        variants={slashVariants}
      />
    </svg>
  );
}

function CornerDecor() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-bamboo/50 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-bamboo/50 pointer-events-none" />
    </>
  );
}

function FeatureCard({ icon, title, text }: (typeof features)[number]) {
  return (
    <motion.article
      className="relative bg-panel border border-bamboo/15 p-7 flex flex-col items-center gap-5 cursor-default overflow-hidden"
      variants={cardVariants}
      whileHover="hovered"
    >
      <CornerDecor />
      <KatanaSlash />

      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-black/40 border border-bamboo/15">
        <img
          src={icon}
          alt=""
          width="48"
          height="48"
          aria-hidden="true"
          className="w-12 h-12 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <h3 className="relative z-10 font-display text-2xl text-white text-center leading-tight">
        {title}
      </h3>

      <div className="relative z-10 w-10 h-px bg-bamboo/35" />

      <p className="relative z-10 text-muted text-sm leading-relaxed text-center">{text}</p>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <motion.div
      className="grid grid-cols-3 max-[768px]:grid-cols-1 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </motion.div>
  );
}
```

Key changes from original:
- `cardVariants` gains a `hovered` key with the old inline `whileHover` styles
- `whileHover={{...}}` → `whileHover="hovered"` (enables variant propagation to children)
- Added `overflow-hidden` to card className (clips slash at card edge)
- Added `relative z-10` to card content children (keeps content above slash SVG)
- Added `KatanaSlash` component with two `motion.path` elements that respond to `"hovered"` variant propagation

- [ ] **Step 2: Build to verify TypeScript**

```bash
npm run build
```

Expected: build completes. If TypeScript complains about `as const` on the ease array inside variants, wrap it: `transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }` (without `as const` inside the object literal).

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Open `http://127.0.0.1:4321`. Scroll to Features section. Hover each card:
- Diagonal blue line should draw from top-left to bottom-right in ~200ms
- Card should still lift (y: -4) and get green border
- Line should fade when hovering off

- [ ] **Step 4: Commit**

```bash
git add src/components/react/FeatureGrid.tsx
git commit -m "feat: add katana slash SVG animation on feature card hover"
```

---

## Task 3: ShurikenParticles component

**Files:**
- Create: `src/components/react/ShurikenParticles.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/react/ShurikenParticles.tsx`:

```tsx
import { useEffect, useRef } from "react";

interface Shuriken {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  rotation: number;
  opacity: number;
  color: string;
}

const COLORS = ["rgba(73,194,242,0.18)", "rgba(191,181,44,0.12)"];
const COUNT = 7;

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  const points = 4;
  const outerR = size;
  const innerR = size * 0.4;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points + rotation;
    ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
}

function createShuriken(width: number, height: number, randomY = false): Shuriken {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 60,
    size: Math.floor(4 + Math.random() * 7),
    speed: 0.3 + Math.random() * 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    opacity: 0.5 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function ShurikenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Shuriken[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () =>
        createShuriken(canvas.width, canvas.height, true)
      );
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    window.addEventListener("resize", onResize);

    function draw() {
      if (!canvas || !ctx) return;
      animRef.current = requestAnimationFrame(draw);
      if (document.visibilityState === "hidden") return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.vx;
        p.rotation += 0.012 * p.speed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        drawStar(ctx, Math.round(p.x), Math.round(p.y), p.size, p.rotation);
        ctx.fill();
        ctx.restore();

        if (p.y < -p.size * 2) {
          p.y = canvas.height + Math.random() * 40;
          p.x = Math.random() * canvas.width;
          p.rotation = Math.random() * Math.PI * 2;
        }
      }
    }

    draw();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") draw();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
```

- [ ] **Step 2: Build to verify TypeScript**

```bash
npm run build
```

Expected: build completes. No errors (file is created but not yet imported anywhere — Astro/TS won't error on unused components).

- [ ] **Step 3: Commit**

```bash
git add src/components/react/ShurikenParticles.tsx
git commit -m "feat: add ShurikenParticles canvas component"
```

---

## Task 4: LeafParticles component

**Files:**
- Create: `src/components/react/LeafParticles.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/react/LeafParticles.tsx`:

```tsx
import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  opacity: number;
}

const COUNT = 12;

function createLeaf(width: number, height: number, randomY = false): Leaf {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -(Math.random() * 60),
    vx: (Math.random() - 0.5) * 0.6,
    vy: 0.5 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.1 + Math.random() * 0.15,
  };
}

export function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Leaf[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () =>
        createLeaf(canvas.width, canvas.height, true)
      );
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    window.addEventListener("resize", onResize);

    function draw() {
      if (!canvas || !ctx) return;
      animRef.current = requestAnimationFrame(draw);
      if (document.visibilityState === "hidden") return;

      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(107,143,94,1)";

      for (const p of particlesRef.current) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.8 + p.phase) * 0.4;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(Math.round(p.x), Math.round(p.y));
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(0, 0, 3, 1);
        ctx.restore();

        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
          p.y = -(Math.random() * 40);
          p.x = Math.random() * canvas.width;
          p.phase = Math.random() * Math.PI * 2;
        }
      }
    }

    draw();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") draw();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
```

- [ ] **Step 2: Build to verify TypeScript**

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/LeafParticles.tsx
git commit -m "feat: add LeafParticles canvas component"
```

---

## Task 5: Wire FeaturesSection

**Files:**
- Modify: `src/components/FeaturesSection.astro`

- [ ] **Step 1: Update FeaturesSection.astro**

Replace the entire content of `src/components/FeaturesSection.astro` with:

```astro
---
import { AnimatedSectionHeader } from "./react/AnimatedSectionHeader";
import { BambooDecor } from "./react/BambooDecor";
import { FeatureGrid } from "./react/FeatureGrid";
import { ShurikenParticles } from "./react/ShurikenParticles";
---

<section id="features" class="relative py-24">
  <div
    class="dot-grid dot-grid-bamboo"
    aria-hidden="true"
  ></div>

  <ShurikenParticles client:visible />

  <BambooDecor
    side="left"
    opacity={0.12}
    className="hidden min-[1400px]:block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
    client:visible
  />
  <BambooDecor
    side="right"
    opacity={0.1}
    className="hidden min-[1400px]:block absolute right-4 top-1/3 -translate-y-1/2 pointer-events-none"
    client:visible
  />

  <div class="w-container-page mx-auto relative z-10">
    <AnimatedSectionHeader
      eyebrow="Features"
      title="Domine cada run."
      client:visible
    />
    <FeatureGrid client:visible />
  </div>
</section>

<script>
  const section = document.getElementById("features");
  const dotGrid = section?.querySelector(".dot-grid");
  if (section && dotGrid) {
    const observer = new IntersectionObserver(
      ([entry]) => dotGrid.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    document.addEventListener("astro:before-swap", () => observer.disconnect(), { once: true });
  }
</script>
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: build completes.

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Open `http://127.0.0.1:4321`. Scroll to Features section. Verify:
- Small 4-pointed star shapes floating upward at low opacity (blue/gold tinted)
- Background dot grid breathes (opacity pulses) while section is in view

- [ ] **Step 4: Commit**

```bash
git add src/components/FeaturesSection.astro
git commit -m "feat: animated dot grid + ShurikenParticles in FeaturesSection"
```

---

## Task 6: Wire GameplayGrid

**Files:**
- Modify: `src/components/GameplayGrid.astro`

- [ ] **Step 1: Update GameplayGrid.astro**

Replace the entire content of `src/components/GameplayGrid.astro` with:

```astro
---
import { AnimatedSectionHeader } from "./react/AnimatedSectionHeader";
import { BambooDecor } from "./react/BambooDecor";
import { GameplayGridClient } from "./react/GameplayGridClient";
import { LeafParticles } from "./react/LeafParticles";
---

<section id="gameplay" class="relative py-24">
  <div
    class="dot-grid dot-grid-blue"
    aria-hidden="true"
  ></div>

  <LeafParticles client:visible />

  <BambooDecor
    side="right"
    opacity={0.11}
    className="hidden min-[1400px]:block absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
    client:visible
  />
  <div class="w-container-page mx-auto relative z-10">
    <AnimatedSectionHeader
      eyebrow="Veja a Ação"
      title="Corte. Avance. Repita."
      align="center"
      client:visible
    />
    <GameplayGridClient client:visible />
  </div>
</section>

<script>
  const section = document.getElementById("gameplay");
  const dotGrid = section?.querySelector(".dot-grid");
  if (section && dotGrid) {
    const observer = new IntersectionObserver(
      ([entry]) => dotGrid.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    document.addEventListener("astro:before-swap", () => observer.disconnect(), { once: true });
  }
</script>
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: build completes.

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Scroll to Gameplay section. Verify:
- Small diagonal 3×1px green leaves falling gently
- Blue dot grid pulses while section is visible

- [ ] **Step 4: Commit**

```bash
git add src/components/GameplayGrid.astro
git commit -m "feat: animated dot grid (blue) + LeafParticles in GameplayGrid"
```

---

## Task 7: Wire TrailerSection

**Files:**
- Modify: `src/components/TrailerSection.astro`

- [ ] **Step 1: Replace static dot grid with animated version**

In `src/components/TrailerSection.astro`, find the existing static dot grid div:

```html
  <!-- Dot grid background -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle,rgba(107,143,94,0.07)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"
    aria-hidden="true"
  >
  </div>
```

Replace it with:

```html
  <div class="dot-grid dot-grid-gold" aria-hidden="true"></div>
```

Then add the IntersectionObserver `<script>` block at the end of the file (after the closing `</section>`):

```html
<script>
  const section = document.getElementById("trailer");
  const dotGrid = section?.querySelector(".dot-grid");
  if (section && dotGrid) {
    const observer = new IntersectionObserver(
      ([entry]) => dotGrid.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    document.addEventListener("astro:before-swap", () => observer.disconnect(), { once: true });
  }
</script>
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: build completes.

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Scroll to Trailer section. Verify:
- Gold/yellow dot grid pulses while section is in view (was previously static green)

- [ ] **Step 4: Commit**

```bash
git add src/components/TrailerSection.astro
git commit -m "feat: animated dot grid (gold) in TrailerSection"
```

---

## Task 8: Wire FinalCTA

**Files:**
- Modify: `src/components/react/FinalCTAClient.tsx`

- [ ] **Step 1: Add animated dot grid inside FinalCTAClient**

In `src/components/react/FinalCTAClient.tsx`, add `useEffect` and a `dotGridRef`. The full updated file:

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "../../lib/motion";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-28px", "28px"]);

  useEffect(() => {
    const dotGrid = dotGridRef.current;
    const section = ref.current;
    if (!dotGrid || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => dotGrid.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section ref={ref} className="relative border-t border-bamboo/15 py-24">
      <div ref={dotGridRef} className="dot-grid dot-grid-red" aria-hidden="true" />

      <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <div className="relative overflow-hidden rounded min-h-120 max-[768px]:min-h-140">
          {/* Background image with parallax */}
          <motion.div
            aria-hidden="true"
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/final_cta_background.png')",
              top: -32,
              left: 0,
              right: 0,
              bottom: -32,
              y: bgY,
            }}
          />

          {/* Desktop gradient: transparent left → dark right */}
          <div
            className="absolute inset-0 max-[768px]:hidden"
            style={{
              background:
                "linear-gradient(to right, transparent 20%, rgba(5,5,5,0.75) 52%, rgba(5,5,5,0.96) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Mobile gradient: transparent top → dark bottom */}
          <div
            className="absolute inset-0 hidden max-[768px]:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.9) 55%)",
            }}
            aria-hidden="true"
          />

          {/* Content row */}
          <div className="relative z-10 flex items-center min-h-120 max-[768px]:min-h-140">
            {/* Spacer — expõe a imagem na esquerda */}
            <div className="flex-1 max-[768px]:hidden" />

            {/* Coluna de conteúdo */}
            <div className="w-[48%] flex flex-col gap-6 px-12 py-16 max-[768px]:w-full max-[768px]:px-6 max-[768px]:py-10">
              <motion.p
                className="text-blue-light font-display text-sm uppercase tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease }}
              >
                Disponível na Steam
              </motion.p>

              <motion.h2
                className="font-display text-4xl xl:text-5xl text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease }}
              >
                Pronto para Entrar na Tempestade de Bambu?
              </motion.h2>

              <motion.p
                className="text-muted text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.15, ease }}
              >
                Runs rápidas, cortes afiados e caos crescente — cada rodada é
                diferente. Domine o fluxo de combate e veja até onde você chega.
              </motion.p>

              <motion.div
                className="pt-2 border-t border-bamboo/15"
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.3, ease }}
              >
                <SteamButtonAnimated
                  label="JOGAR AGORA"
                  variant="primary"
                  size="lg"
                  event="steam_cta_final_click"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
```

Key changes from original:
- Added `dotGridRef = useRef<HTMLDivElement>(null)` 
- Added `useEffect` with `IntersectionObserver` (cleanup via `return () => observer.disconnect()`)
- Added `className="relative"` to outer `motion.section` (dot grid needs a positioned parent)
- Added `<div ref={dotGridRef} className="dot-grid dot-grid-red" aria-hidden="true" />` as first child of section

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: build completes without TypeScript errors.

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Scroll to the final CTA section. Verify:
- Red dot grid pulses subtly in the background while section is visible
- Parallax on the background image still works
- All existing content renders correctly

- [ ] **Step 4: Commit**

```bash
git add src/components/react/FinalCTAClient.tsx
git commit -m "feat: animated dot grid (red) in FinalCTA via IntersectionObserver"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Katana slash on cards ✓ | Animated dot grid (bamboo/blue/gold/red) ✓ | ShurikenParticles ✓ | LeafParticles ✓ | `prefers-reduced-motion` handled ✓ | `visibilityState` pause ✓ | Observer cleanup ✓
- [x] **No placeholders:** All steps have complete code
- [x] **Type consistency:** `Shuriken` interface matches all usages in Task 3; `Leaf` interface matches all usages in Task 4; `dotGridRef` is `useRef<HTMLDivElement>` matching the `div` element in Task 8
- [x] **Build command correct:** `npm run build` (per package.json — no test runner in this project)
