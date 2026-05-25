# Visual Redesign v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply targeted visual improvements across all sections of the Byrd Ronin landing page — fixing layout bugs, redesigning Features/Gameplay/Trailer sections, and adding site-wide pixel-art themed decorations.

**Architecture:** Each task touches isolated files; tasks are ordered so later tasks can safely reference components created in earlier tasks. All changes stay in the `improve-ui` branch. No test suite exists — verification is via `npm run dev` and visual inspection.

**Tech Stack:** Astro 5, React 19, Framer Motion 12, Tailwind CSS v4, TypeScript

---

## File Map

| File | Action |
|---|---|
| `src/layouts/BaseLayout.astro` | Add `mode="ambient" count={16}` to existing FallingLeaves; add WideScreenDecor |
| `src/components/HeroSection.astro` | Remove FallingLeaves; fix grid to `1fr 1fr` |
| `src/components/react/HeroAnimations.tsx` | Fix HeroCharacter to fill column without negative overflow |
| `src/components/react/NavbarClient.tsx` | Fix rootMargin; reduce rounded classes |
| `src/components/TrailerSection.astro` | New layout `4fr 7fr`; kanji SVG; HUD scan lines + coordinates |
| `src/components/react/TrailerPlayer.tsx` | Remove glow hover; add video controls; reduce rounded |
| `src/components/FeaturesSection.astro` | New title; use AnimatedSectionHeader |
| `src/components/react/FeatureGrid.tsx` | Rewrite as horizontal strips with PNG icons |
| `src/components/react/AnimatedSectionHeader.tsx` | **NEW** — animated eyebrow+title component |
| `src/components/GameplayGrid.astro` | New title; remove intro text; use AnimatedSectionHeader |
| `src/components/react/GameplayGridClient.tsx` | Clip proportions `3fr/5fr` |
| `src/components/Footer.astro` | Fix itch.io icon: inline SVG → `<img>` |
| `src/components/react/WideScreenDecor.tsx` | **NEW** — fixed shuriken + katana for screens ≥ 1400px |
| `src/components/react/FinalCTAClient.tsx` | `rounded-2xl` → `rounded` on container |

---

## Task 1: Create branch + fix navbar scrollspy

**Files:**
- Modify: `src/components/react/NavbarClient.tsx`

- [ ] **Step 1: Create branch**

```bash
git checkout -b improve-ui
```

Expected: `Switched to a new branch 'improve-ui'`

- [ ] **Step 2: Fix rootMargin in NavbarClient.tsx**

Find the `IntersectionObserver` instantiation (around line 30) and change `rootMargin`:

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    });
  },
  { rootMargin: "-50% 0px -50% 0px" },
);
```

- [ ] **Step 3: Commit**

```bash
git add src/components/react/NavbarClient.tsx
git commit -m "fix: navbar scrollspy activates at viewport midpoint"
```

---

## Task 2: FallingLeaves site-wide + Hero cleanup

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/HeroSection.astro`

- [ ] **Step 1: Update BaseLayout FallingLeaves**

In `src/layouts/BaseLayout.astro`, the FallingLeaves line currently reads:
```astro
<FallingLeaves client:load />
```

Change to:
```astro
<FallingLeaves mode="ambient" count={16} client:load />
```

- [ ] **Step 2: Remove FallingLeaves from HeroSection**

In `src/components/HeroSection.astro`, remove the import line:
```astro
import { FallingLeaves } from "./react/FallingLeaves";
```

And remove the usage line:
```astro
<FallingLeaves mode="ambient" count={12} client:load />
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open http://localhost:4321 — leaves should fall across entire page, not just hero.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/HeroSection.astro
git commit -m "feat: move FallingLeaves to BaseLayout, cover full page"
```

---

## Task 3: Hero 50/50 layout + character fix

**Files:**
- Modify: `src/components/HeroSection.astro`
- Modify: `src/components/react/HeroAnimations.tsx`

- [ ] **Step 1: Update Hero grid in HeroSection.astro**

Change the container `div` class from:
```astro
class="w-[min(1160px,calc(100%_-_40px))] mx-auto relative grid grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)] max-[980px]:grid-cols-1 items-center gap-[22px]"
```
to:
```astro
class="w-[min(1160px,calc(100%_-_40px))] mx-auto relative grid grid-cols-[1fr_1fr] max-[980px]:grid-cols-1 items-start gap-10"
```

- [ ] **Step 2: Fix HeroCharacter in HeroAnimations.tsx**

Replace the entire `HeroCharacter` function:

```tsx
export function HeroCharacter() {
  return (
    <motion.div
      className="relative min-h-[520px] max-[980px]:min-h-[360px] max-[640px]:min-h-[260px]"
      aria-hidden="true"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease }}
    >
      <motion.img
        src="/hero-character.png"
        alt=""
        width="1536"
        height="864"
        className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_36px_48px_rgba(0,0,0,0.5)] max-[640px]:opacity-35"
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify**

Open http://localhost:4321 — hero should show copy left / character right, both centered within the container. Character should not overflow outside its column.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.astro src/components/react/HeroAnimations.tsx
git commit -m "fix: hero 50/50 grid, character fills column without negative overflow"
```

---

## Task 4: Trailer section redesign

**Files:**
- Modify: `src/components/TrailerSection.astro`
- Modify: `src/components/react/TrailerPlayer.tsx`

- [ ] **Step 1: Rewrite TrailerSection.astro**

Replace the entire file content:

```astro
---
import { YOUTUBE_TRAILER_ID } from "../consts";
import { TrailerPlayer } from "./react/TrailerPlayer";
---

<section id="trailer" class="relative bg-forest overflow-hidden py-24 pt-20">
  <!-- HUD scan lines -->
  <div
    class="absolute top-[32%] left-0 right-0 h-px bg-bamboo/8 pointer-events-none"
    aria-hidden="true"
  />
  <div
    class="absolute top-[68%] left-0 right-0 h-px bg-bamboo/8 pointer-events-none"
    aria-hidden="true"
  />

  <!-- Vinheta inferior -->
  <div
    class="absolute bottom-0 left-0 right-0 h-40 [background:linear-gradient(0deg,rgba(5,5,5,0.55)_0%,transparent_100%)]"
    aria-hidden="true"
  />

  <!-- Kanji decorativos -->
  <div
    class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 right-[-0.5vw] flex flex-col gap-1 font-display text-[clamp(3rem,4.5vw,5rem)] text-white/[0.025] leading-none"
    aria-hidden="true"
  >
    <span>忍</span>
    <span>侍</span>
    <span>剣</span>
    <span>道</span>
    <span>竹</span>
    <span>波</span>
  </div>

  <!-- Coordenadas HUD -->
  <div
    class="absolute bottom-6 right-6 font-display text-[9px] text-bamboo/20 tracking-[0.2em] pointer-events-none select-none hidden min-[1200px]:flex flex-col items-end gap-0.5"
    aria-hidden="true"
  >
    <span>座標</span>
    <span>00.44 · 12.81</span>
  </div>

  <div class="relative z-10 w-[min(1160px,calc(100%-40px))] mx-auto">
    <div
      class="grid grid-cols-[4fr_7fr] max-[980px]:grid-cols-1 gap-14 max-[980px]:gap-10 items-center"
    >
      <!-- Coluna de texto -->
      <div class="flex flex-col gap-5 max-[980px]:order-2">
        <p class="font-display text-xs uppercase tracking-[0.22em] text-bamboo/75">
          Assista ao Trailer
        </p>
        <h2
          class="font-display text-[clamp(2.8rem,5vw,4.5rem)] text-white leading-[0.88] [text-shadow:3px_3px_0_rgba(0,0,0,0.6)]"
        >
          Veja o ritmo<br />
          da lâmina<br />
          <em class="text-bamboo not-italic">em ação.</em>
        </h2>
        <p class="text-muted text-base leading-relaxed max-w-xs max-[980px]:max-w-none">
          Cortes rápidos, pressure constante e upgrades que mudam tudo a cada
          rodada. Cada run é uma nova chance de dominar o caos.
        </p>
        <a
          class="self-start mt-2 flex items-center gap-2 text-bamboo font-display text-sm font-bold uppercase tracking-widest hover:text-white transition-colors duration-200 group"
          href="#gameplay"
        >
          Ver gameplay
          <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <!-- Coluna do vídeo -->
      <div class="max-[980px]:order-1">
        <TrailerPlayer youtubeId={YOUTUBE_TRAILER_ID} client:visible />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update TrailerPlayer.tsx**

Replace the entire file content:

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  youtubeId?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TrailerPlayer({ youtubeId }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)] cursor-pointer"
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.25 }}
      >
        <AnimatePresence mode="wait">
          {playing && youtubeId ? (
            <motion.iframe
              key="youtube"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="Byrd Ronin Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                aspectRatio: "16/9",
                border: "none",
                display: "block",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="thumb"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => youtubeId && setPlaying(true)}
            >
              <video
                src="/trailer.mp4"
                poster="/hero-bg.png"
                muted
                loop
                playsInline
                autoPlay
                controls
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(1.2) brightness(0.65)",
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {youtubeId && (
                <motion.button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 flex items-center justify-center border-4 border-white rounded-full bg-red shadow-[0_12px_0_#870707] cursor-pointer"
                  aria-label="Assistir trailer completo no YouTube"
                  onClick={() => setPlaying(true)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, backgroundColor: "#bfb52c" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="26"
                    height="36"
                    viewBox="0 0 26 36"
                    fill="white"
                    aria-hidden="true"
                    style={{ marginLeft: "4px" }}
                  >
                    <polygon points="0,0 26,18 0,36" />
                  </svg>
                </motion.button>
              )}

              <span className="absolute right-4.5 bottom-4.5 left-4.5 px-3.5 py-3 border border-white/25 rounded-sm text-white bg-black/75 font-extrabold">
                {youtubeId
                  ? "Clique para assistir o trailer completo"
                  : "Trailer de gameplay — Byrd Ronin"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify**

Open http://localhost:4321#trailer — video should be the dominant column, kanji visible on the right edge, scan lines across the section. Hover on the player: no neon glow. Video preview has native controls.

- [ ] **Step 4: Commit**

```bash
git add src/components/TrailerSection.astro src/components/react/TrailerPlayer.tsx
git commit -m "feat: trailer section — video-dominant layout, kanji bg, HUD elements, clean hover"
```

---

## Task 5: Features section redesign

**Files:**
- Create: `src/components/react/AnimatedSectionHeader.tsx`
- Modify: `src/components/FeaturesSection.astro`
- Modify: `src/components/react/FeatureGrid.tsx`

- [ ] **Step 1: Create AnimatedSectionHeader.tsx**

```tsx
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function AnimatedSectionHeader({ eyebrow, title, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <motion.div
      className={`max-w-2xl mb-10 ${isCenter ? "mx-auto text-center" : ""}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p
        className="mb-3.5 text-bamboo font-display text-xl uppercase"
        variants={itemVariants}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-6xl xl:text-7xl text-white leading-tight"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
```

- [ ] **Step 2: Update FeaturesSection.astro**

Replace entire file content:

```astro
---
import { AnimatedSectionHeader } from "./react/AnimatedSectionHeader";
import { FeatureGrid } from "./react/FeatureGrid";
---

<section id="features" class="bg-[#070b07] py-24">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <AnimatedSectionHeader
      eyebrow="Features"
      title="Domine cada run."
      client:visible
    />
    <FeatureGrid client:visible />
  </div>
</section>
```

- [ ] **Step 3: Rewrite FeatureGrid.tsx**

Replace entire file content:

```tsx
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: "/features_upgrades.png",
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: "/features_inimigos.png",
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: "/features_caos.png",
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

export function FeatureGrid() {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {features.map((f, i) => (
        <motion.article
          key={f.title}
          className={[
            "grid grid-cols-[40px_1fr_2fr] max-[640px]:grid-cols-[40px_1fr] gap-x-6 gap-y-2 items-center",
            "py-8 px-2 -mx-2 rounded-sm",
            "cursor-default transition-colors duration-200 hover:bg-bamboo/[0.04]",
            i < features.length - 1 ? "border-b border-bamboo/15" : "",
          ].join(" ")}
          variants={rowVariants}
        >
          <img
            src={f.icon}
            alt=""
            width="40"
            height="40"
            aria-hidden="true"
            className="w-10 h-10 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <h3 className="font-display text-xl text-white">{f.title}</h3>
          <p className="text-muted text-base leading-relaxed max-[640px]:col-span-2 max-[640px]:col-start-2">
            {f.text}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 4: Verify**

Open http://localhost:4321#features — three horizontal strips with PNG icons (pixelated), title in center column, description on right. Subtle green tint on hover. No rounded cards.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/AnimatedSectionHeader.tsx src/components/FeaturesSection.astro src/components/react/FeatureGrid.tsx
git commit -m "feat: features section — horizontal strips with PNG icons, animated header"
```

---

## Task 6: Gameplay section updates

**Files:**
- Modify: `src/components/GameplayGrid.astro`
- Modify: `src/components/react/GameplayGridClient.tsx`

- [ ] **Step 1: Update GameplayGrid.astro**

Replace entire file content:

```astro
---
import { AnimatedSectionHeader } from "./react/AnimatedSectionHeader";
import { GameplayGridClient } from "./react/GameplayGridClient";
---

<section id="gameplay" class="bg-black pt-24">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <AnimatedSectionHeader
      eyebrow="Veja a Ação"
      title="Corte. Avance. Repita."
      align="center"
      client:visible
    />
    <GameplayGridClient client:visible />
  </div>
</section>
```

- [ ] **Step 2: Update clip proportions in GameplayGridClient.tsx**

Find the `ClipRow` component's return statement. Change the grid `className` from:

```tsx
className={`relative grid max-[768px]:grid-cols-1 gap-12 items-center ${isEven ? "grid-cols-[5fr_7fr]" : "grid-cols-[7fr_5fr]"}`}
```

to:

```tsx
className={`relative grid max-[768px]:grid-cols-1 gap-12 items-center ${isEven ? "grid-cols-[3fr_5fr]" : "grid-cols-[5fr_3fr]"}`}
```

- [ ] **Step 3: Verify**

Open http://localhost:4321#gameplay — title "Corte. Avance. Repita." with no intro paragraphs. Video columns visibly wider than text columns.

- [ ] **Step 4: Commit**

```bash
git add src/components/GameplayGrid.astro src/components/react/GameplayGridClient.tsx
git commit -m "feat: gameplay section — shorter title, remove intro text, video-dominant clips"
```

---

## Task 7: Footer itch.io icon fix

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Replace itch.io inline SVG with img tag**

In `src/components/Footer.astro`, find the itch.io `<a>` element. It currently has a large `<svg>` block with an incorrect path. Replace the entire SVG inside that anchor with:

```astro
<img
  src="/itchio-logo-textless-white.svg"
  width="16"
  height="16"
  alt=""
  aria-hidden="true"
  class="w-4 h-4 object-contain"
/>
```

The `<a>` element itself stays unchanged — only replace the inner `<svg>...</svg>` with the `<img>` above.

- [ ] **Step 2: Verify**

Open http://localhost:4321 and scroll to footer — itch.io icon should render correctly as the white textless logo.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "fix: footer itch.io icon — use correct SVG from public/"
```

---

## Task 8: WideScreenDecor component

**Files:**
- Create: `src/components/react/WideScreenDecor.tsx`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create WideScreenDecor.tsx**

```tsx
import { motion } from "framer-motion";

function ShurikenSVG() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      {/* Blade vertical */}
      <path d="M26 3 L31 26 L26 49 L21 26 Z" fill="currentColor" />
      {/* Blade horizontal */}
      <path d="M3 26 L26 21 L49 26 L26 31 Z" fill="currentColor" />
      {/* Center dot */}
      <circle cx="26" cy="26" r="4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function KatanaSVG() {
  return (
    <svg
      width="14"
      height="200"
      viewBox="0 0 14 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Blade */}
      <path d="M7 0 L10 165 L7 182 L4 165 Z" fill="currentColor" />
      {/* Tsuba / guard */}
      <rect x="0" y="165" width="14" height="5" rx="1" fill="currentColor" />
      {/* Handle */}
      <rect x="5" y="170" width="4" height="30" rx="1" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function WideScreenDecor() {
  return (
    <>
      {/* Left — shuriken, slowly rotating */}
      <motion.div
        className="fixed left-5 top-[38%] hidden min-[1400px]:block text-white pointer-events-none select-none z-0"
        style={{ opacity: 0.055 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <ShurikenSVG />
      </motion.div>

      {/* Right — katana, tilted */}
      <div
        className="fixed right-6 top-[28%] hidden min-[1400px]:block text-white pointer-events-none select-none z-0"
        style={{ opacity: 0.055, transform: "rotate(-18deg)" }}
      >
        <KatanaSVG />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Add WideScreenDecor to BaseLayout.astro**

In `src/layouts/BaseLayout.astro`, add the import at the top of the frontmatter:

```astro
import { WideScreenDecor } from "../components/react/WideScreenDecor";
```

In the `<body>`, add after the FallingLeaves line:

```astro
<WideScreenDecor client:load />
```

- [ ] **Step 3: Verify**

Resize browser to > 1400px wide — a faint shuriken (slowly spinning) should appear on the left, and a faint tilted katana on the right. Both invisible on narrower screens.

- [ ] **Step 4: Commit**

```bash
git add src/components/react/WideScreenDecor.tsx src/layouts/BaseLayout.astro
git commit -m "feat: add WideScreenDecor (shuriken + katana) for screens ≥ 1400px"
```

---

## Task 9: Global border-radius pass

**Files:**
- Modify: `src/components/react/NavbarClient.tsx`
- Modify: `src/components/react/FinalCTAClient.tsx`

> Note: TrailerPlayer container was already updated to `rounded` in Task 4. FeatureGrid no longer has cards. The following cleans up remaining oversized rounded classes.

- [ ] **Step 1: Reduce rounded in NavbarClient.tsx**

Apply these replacements (use find+replace in the file):

| Old | New | Where |
|---|---|---|
| `rounded-xl overflow-hidden` (header `motion.header`) | `rounded overflow-hidden` | floating header container |
| `rounded-xl` (mobile menu `motion.div`) | `rounded` | mobile menu |
| `rounded-lg` (hamburger `button`) | `rounded-sm` | hamburger button |
| `rounded-md` (nav link active bg `motion.span`) | `rounded-sm` | active nav link bg |
| `rounded-lg` (mobile menu links `motion.a`) | `rounded-sm` | mobile nav links |

- [ ] **Step 2: Reduce rounded in FinalCTAClient.tsx**

Find the line with `rounded-2xl min-h-120` and change `rounded-2xl` to `rounded`:

```tsx
className="relative overflow-hidden rounded min-h-120 max-[768px]:min-h-140"
```

- [ ] **Step 3: Verify**

Navbar, mobile menu, and Final CTA container should have subtler rounded corners (≤ 4px), consistent with the pixel-art aesthetic.

- [ ] **Step 4: Commit**

```bash
git add src/components/react/NavbarClient.tsx src/components/react/FinalCTAClient.tsx
git commit -m "fix: reduce border-radius to 2-4px across navbar and CTA for pixel-art consistency"
```

---

## Self-Review Checklist

- [x] **Navbar scrollspy** → Task 1 rootMargin fix
- [x] **Hero 50/50 layout** → Task 3 grid + HeroCharacter
- [x] **FallingLeaves site-wide** → Task 2 BaseLayout
- [x] **Trailer video-dominant layout** → Task 4 grid `4fr_7fr`
- [x] **Trailer kanji + HUD elements** → Task 4 TrailerSection.astro
- [x] **Trailer hover: no glow** → Task 4 TrailerPlayer.tsx
- [x] **Trailer video controls** → Task 4 `controls` + `stopPropagation`
- [x] **Features horizontal strips** → Task 5 FeatureGrid.tsx
- [x] **Features PNG icons pixelated** → Task 5 `imageRendering: pixelated`
- [x] **Features new title** → Task 5 AnimatedSectionHeader
- [x] **Gameplay title "Corte. Avance. Repita."** → Task 6
- [x] **Gameplay remove intro text** → Task 6 GameplayGrid.astro
- [x] **Gameplay video-dominant clips** → Task 6 `3fr/5fr`
- [x] **Footer itch.io fix** → Task 7
- [x] **WideScreenDecor shuriken + katana** → Task 8
- [x] **Border-radius 2–4px** → Task 9 (+ Task 4 TrailerPlayer)
- [x] **AnimatedSectionHeader** used in Tasks 5 and 6 with matching prop names
- [x] **Branch: improve-ui** → Task 1 step 1
