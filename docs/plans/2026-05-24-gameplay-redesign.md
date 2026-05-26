# Gameplay Section Redesign + Background Unification — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the gameplay section with alternating text+video layout, add gameplay copy, remove the blue `bg-ink` background, and unify trailer→features→gameplay with a progressive forest→black gradient.

**Architecture:** Four files change. `consts.ts` gains a `description` field on `GameplayClip`. `GameplayGridClient.tsx` is rewritten as an alternating two-clip layout with per-clip text, HUD badges, and number decorations. `GameplayGrid.astro` gains intro text and closing statement and changes background. `FeaturesSection.astro` changes background and removes its top border.

**Tech Stack:** Astro 5, React 19, Framer Motion 12, Tailwind CSS 4, TypeScript 5

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/consts.ts` | Modify | Add `description` field to `GameplayClip`; populate per-clip text |
| `src/components/react/GameplayGridClient.tsx` | Rewrite | Alternating layout, HUD badges, number decorations, hover effects |
| `src/components/GameplayGrid.astro` | Modify | Intro text block, closing statement, `bg-black`, remove border |
| `src/components/FeaturesSection.astro` | Modify | `bg-[#070b07]`, remove `border-t border-bamboo/15` |

---

## Task 1: Extend GameplayClip type and data in consts.ts

**Files:**
- Modify: `src/consts.ts`

- [ ] **Step 1: Add `description` field to `GameplayClip` interface and update `GAMEPLAY_CLIPS`**

Replace the `GameplayClip` interface and `GAMEPLAY_CLIPS` constant in `src/consts.ts`:

```typescript
export interface GameplayClip {
  src: string;
  title: string;
  context: string;
  eyebrow: string;
  description: string;
}

// Vídeos nativos: 1170×658px (ratio 585:329 ≈ 16:9)
export const GAMEPLAY_CLIPS: GameplayClip[] = [
  {
    src: "/gameplay1.webm",
    title: "Cortes em alta velocidade",
    context: "Cada swing elimina bambus e inimigos ao mesmo tempo — o ritmo não para.",
    eyebrow: "Mobilidade & Combate",
    description:
      "Mobilidade é parte central da experiência. Dash, posicionamento e timing definem como você atravessa o campo de batalha e lida com o perigo constante.\n\nCada escolha muda o ritmo da luta — avançar, recuar ou insistir pode ser a diferença entre sobreviver ou cair.",
  },
  {
    src: "/gameplay2.webm",
    title: "Sobrevivendo à pressão inimiga",
    context: "Inimigos avançam de todos os lados. Timing e posicionamento são tudo.",
    eyebrow: "Evolução & Roguelike",
    description:
      "Cada run é uma oportunidade de evolução. Desbloqueie upgrades, habilidades e ferramentas que alteram a forma de jogar. Efeitos se combinam, estilos emergem e nenhuma tentativa é igual à anterior.",
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/vini/Desenvolvimento/Projetos/birdyronin-claude/ByrdRoninWebsite
pnpm exec astro check 2>&1 | tail -20
```

Expected: zero errors (or only pre-existing errors unrelated to `GameplayClip`).

- [ ] **Step 3: Commit**

```bash
git add src/consts.ts
git commit -m "feat: add eyebrow and description fields to GameplayClip"
```

---

## Task 2: Rewrite GameplayGridClient.tsx — alternating layout

**Files:**
- Rewrite: `src/components/react/GameplayGridClient.tsx`

- [ ] **Step 1: Replace the entire file content**

```tsx
import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_RATIO = "585 / 329";

const clipVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease, delay: 0.1 },
  },
};

const textVariantsRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease, delay: 0.1 },
  },
};

interface ClipRowProps {
  clip: GameplayClip;
  index: number;
}

function ClipRow({ clip, index }: ClipRowProps) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  const videoCol = (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      variants={clipVariants}
      style={{ aspectRatio: VIDEO_RATIO }}
    >
      {/* HUD badge overlay */}
      <div className="absolute top-3 left-3 z-10 font-display text-[9px] tracking-[0.3em] uppercase bg-black/60 text-bamboo px-2.5 py-1 rounded backdrop-blur-sm">
        {number} — {clip.eyebrow}
      </div>

      <motion.video
        src={clip.src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover block"
        style={{
          background: "var(--color-black, #050505)",
          filter: "saturate(1.1) brightness(0.9)",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="relative flex flex-col gap-4"
      variants={isEven ? textVariants : textVariantsRight}
    >
      {/* Number decoration — background */}
      <span
        className="absolute -top-6 font-display leading-none text-white/[0.04] select-none pointer-events-none"
        style={{ fontSize: "clamp(5rem,16vw,12rem)", left: isEven ? "-0.1em" : "auto", right: isEven ? "auto" : "-0.1em" }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Eyebrow */}
      <p className="relative font-display text-xs uppercase tracking-[0.28em] text-bamboo/70">
        {clip.eyebrow}
      </p>

      {/* Title */}
      <h3 className="relative font-display text-[clamp(1.6rem,3vw,2.4rem)] text-white leading-tight">
        {clip.title}
      </h3>

      {/* Description */}
      <div className="relative flex flex-col gap-3">
        {clip.description.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="grid grid-cols-[5fr_7fr] max-[768px]:grid-cols-1 gap-12 items-center"
      style={isEven ? {} : { direction: "rtl" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Reset direction for children so text stays LTR */}
      <div style={{ direction: "ltr" }}>{isEven ? textCol : videoCol}</div>
      <div style={{ direction: "ltr" }}>{isEven ? videoCol : textCol}</div>
    </motion.div>
  );
}

export function GameplayGridClient() {
  return (
    <div className="flex flex-col gap-0">
      {GAMEPLAY_CLIPS.map((clip, index) => (
        <div key={clip.src}>
          <ClipRow clip={clip} index={index} />
          {index < GAMEPLAY_CLIPS.length - 1 && (
            <hr className="border-bamboo/20 my-16" />
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm exec astro check 2>&1 | tail -20
```

Expected: zero new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/GameplayGridClient.tsx
git commit -m "feat: rewrite GameplayGridClient with alternating text+video layout"
```

---

## Task 3: Update GameplayGrid.astro — intro text, closing statement, background

**Files:**
- Modify: `src/components/GameplayGrid.astro`

- [ ] **Step 1: Replace the file content**

```astro
---
import { GameplayGridClient } from "./react/GameplayGridClient";
---

<section id="gameplay" class="bg-black py-24">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">

    <!-- Header -->
    <div class="max-w-2xl mx-auto text-center mb-10">
      <p class="mb-3.5 text-bamboo font-display text-xl uppercase">
        Veja a Ação
      </p>
      <h2 class="font-display text-4xl md:text-6xl xl:text-7xl text-white leading-tight">
        Beats de gameplay para decisões rápidas.
      </h2>
    </div>

    <!-- Intro text block -->
    <div class="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
      <p class="text-muted text-base leading-relaxed">
        O combate em Byrd Ronin é rápido, agressivo e recompensador.
        Sobreviver significa atacar e contra-atacar no momento certo, desviar com precisão e manter o fluxo do combate que é tão importante quanto causar dano.
      </p>
      <p class="text-muted text-base leading-relaxed">
        Seu combo cresce a medida que o caos se intensifica, seguir no controle é o único caminho, pois, sem ele é o mesmo que perder a run.
      </p>
    </div>

    <!-- Clips -->
    <GameplayGridClient client:visible />

    <!-- Closing statement -->
    <div class="mt-16 pt-10 border-t border-bamboo/20 text-center">
      <p class="font-display text-lg md:text-2xl text-bamboo italic">
        Mesmo ao falhar, você volta mais forte — como um verdadeiro Ronin.
      </p>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Verify TypeScript/Astro compiles**

```bash
pnpm exec astro check 2>&1 | tail -20
```

Expected: zero new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/GameplayGrid.astro
git commit -m "feat: add intro text, closing statement, bg-black to gameplay section"
```

---

## Task 4: Update FeaturesSection.astro — background and border

**Files:**
- Modify: `src/components/FeaturesSection.astro`

- [ ] **Step 1: Change background and remove top border**

In `src/components/FeaturesSection.astro`, change the `<section>` opening tag from:

```astro
<section id="features" class="bg-black py-24 border-t border-bamboo/15">
```

to:

```astro
<section id="features" class="bg-[#070b07] py-24">
```

- [ ] **Step 2: Verify TypeScript/Astro compiles**

```bash
pnpm exec astro check 2>&1 | tail -20
```

Expected: zero new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturesSection.astro
git commit -m "feat: update features section background to dark forest, remove top border"
```

---

## Task 5: Visual verification

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

Open: `http://127.0.0.1:4321`

- [ ] **Step 2: Verify trailer → features → gameplay gradient**

Check that the three sections flow visually: dark green (forest) → near-black green → pure black, with no jarring borders or color jumps between sections.

- [ ] **Step 3: Verify gameplay section layout**

- Intro text block appears below header, centered, readable
- Clip 1 shows: text left (number `01` decoration, eyebrow "Mobilidade & Combate", title, description), video right with HUD badge
- Divider line appears between clips
- Clip 2 shows: video left with HUD badge, text right (number `02` decoration, eyebrow "Evolução & Roguelike", title, description)
- Closing statement appears at bottom with bamboo border above
- No blue background anywhere in gameplay/features sections

- [ ] **Step 4: Verify responsive (resize to 375px width)**

- Clips stack vertically (video above text) on mobile
- Number decorations do not overflow or cause horizontal scroll
- Text remains readable

- [ ] **Step 5: Final commit if any visual tweaks were needed**

```bash
git add -p
git commit -m "fix: visual tweaks after gameplay redesign verification"
```

---

## Self-Review Checklist

- [x] `consts.ts` gains `eyebrow` + `description` → used in Task 2's `ClipRow`
- [x] Background unification: Trailer (forest) → Features (#070b07) → Gameplay (black) covered in Tasks 3 & 4
- [x] Intro text block covered in Task 3
- [x] Alternating layout covered in Task 2 — clip 1 text-left/video-right, clip 2 video-left/text-right
- [x] HUD badge overlay on videos covered in Task 2
- [x] Number decorations (`01`/`02`) covered in Task 2
- [x] Closing statement covered in Task 3
- [x] `border-t border-bamboo/15` removed from both FeaturesSection (Task 4) and GameplayGrid (Task 3)
- [x] No placeholders — all code is complete and explicit
- [x] Types consistent: `GameplayClip` defined once in Task 1, consumed in Task 2 via same field names
