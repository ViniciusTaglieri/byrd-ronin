# Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar o site de "friendly/claro" para dark theme coeso com três zonas escuras (black/ink/forest), corrigindo todos os bugs visuais identificados.

**Architecture:** Cada seção recebe um fundo da paleta escura (black/ink/forest). Navbar volta ao dark glassmorphism. Feature icons corrigidos (SVG size bug). Status sem overlap negativo. Feature layout vira grid 3 colunas. Final CTA sem card wrapper.

**Tech Stack:** Astro, React, Tailwind v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-05-22-dark-redesign.md`

---

## Task 1: BaseLayout — bg-black

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Atualizar body class**

```astro
<body class="antialiased min-h-dvh text-white font-body bg-black">
```

Apenas uma linha muda: `text-ink bg-cream` → `text-white bg-black`.

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

Esperado: `[build] Complete!` sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: body bg-black text-white — dark base"
```

---

## Task 2: Navbar — Dark Glassmorphism

**Files:**
- Modify: `src/components/react/NavbarClient.tsx`

- [ ] **Step 1: Reescrever NavbarClient.tsx**

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const NAV_LINKS = [
  { href: "#status", label: "Status" },
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 grid grid-cols-[auto_1fr_auto] max-[980px]:grid-cols-[auto_auto] items-center gap-6 w-[min(1180px,calc(100%-28px))] min-h-18 mt-3.5 px-8 max-[640px]:px-4 py-2.5 border border-bamboo/20 rounded-xl overflow-hidden"
        style={{
          background: scrolled ? "rgba(5,5,5,0.96)" : "rgba(5,5,5,0.85)",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(107,143,94,0.12)"
            : "0 8px 32px rgba(0,0,0,0.3)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a href="#top" aria-label="Byrd Ronin home">
          <img
            src="/logo.png"
            alt="Byrd Ronin"
            width="192"
            height="108"
            className="w-28 max-[640px]:w-24 h-auto"
          />
        </a>

        {/* Links — desktop */}
        <nav
          className="flex justify-end gap-6 max-[980px]:hidden"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative pb-0.5 text-white/80 font-display text-base tracking-wide transition-colors duration-150 hover:text-bamboo group"
            >
              {label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-bamboo scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Direita: Steam + hamburger */}
        <div className="flex items-center gap-3">
          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_navbar_click"
            className="max-[640px]:min-h-11 max-[640px]:px-3 max-[640px]:text-sm"
          />

          <button
            className="hidden max-[980px]:flex items-center justify-center w-11 h-11 p-2 border-2 border-white/20 rounded-lg text-white bg-transparent cursor-pointer transition-colors duration-150 hover:border-bamboo hover:bg-bamboo/10"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
              <motion.rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-24 max-[640px]:top-20 left-1/2 -translate-x-1/2 z-39 flex flex-col gap-1 w-[min(1180px,calc(100%-28px))] p-4 border border-bamboo/25 rounded-xl bg-ink shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                className="px-4 py-3.5 rounded-lg text-white/80 font-display text-xl transition-colors duration-150 hover:bg-bamboo/10 hover:text-bamboo"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
            <div className="mt-2 pt-3 border-t border-bamboo/20">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_mobile_click"
                className="w-full justify-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

Esperado: `[build] Complete!`

- [ ] **Step 3: Commit**

```bash
git add src/components/react/NavbarClient.tsx
git commit -m "feat: navbar dark glassmorphism, remover bambu lateral"
```

---

## Task 3: Hero — overlay + ghost button

**Files:**
- Modify: `src/components/HeroSection.astro`
- Modify: `src/components/react/HeroAnimations.tsx`

- [ ] **Step 1: Atualizar overlay do HeroSection.astro**

Substituir a div com overlay pelo seguinte (mais respiro para o personagem):

```astro
  <div
    class="absolute inset-0 [background:linear-gradient(90deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.60)_40%,rgba(5,5,5,0.15)_100%),linear-gradient(180deg,rgba(5,5,5,0.15)_0%,rgba(5,5,5,0.85)_100%)]"
    aria-hidden="true"
  >
  </div>
```

- [ ] **Step 2: Atualizar botão ghost em HeroAnimations.tsx**

Localizar a linha do `motion.a` com `href="#trailer"` e substituir a className:

```tsx
          className="inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 border-2 border-white/30 rounded-md text-white bg-white/5 font-display text-lg font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-150 hover:-translate-y-0.5 max-[640px]:w-full max-[640px]:justify-center"
```

Mudanças: `border-white/40 bg-black/30` → `border-white/30 bg-white/5`

- [ ] **Step 3: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.astro src/components/react/HeroAnimations.tsx
git commit -m "feat: hero overlay mais suave, ghost button bg-white/5"
```

---

## Task 4: Status Section — bg-ink sem overlap

**Files:**
- Modify: `src/components/StatusSection.astro`

- [ ] **Step 1: Reescrever StatusSection.astro**

```astro
---
import { GAME } from "../consts";
import { SteamButtonAnimated } from "./react/SteamButtonAnimated";
import { StatusAnimations } from "./react/StatusAnimations";
---

<section id="status" class="bg-ink py-24 border-t border-bamboo/20">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <StatusAnimations client:visible>
      <div class="grid grid-cols-2 max-[980px]:grid-cols-1 gap-12">

        <!-- Coluna esquerda: texto principal -->
        <div class="flex flex-col justify-center gap-5">
          <p class="text-blue-light font-display text-sm uppercase tracking-widest">
            Available on Steam
          </p>
          <h2 class="font-display text-5xl xl:text-7xl text-white leading-tight">
            Fast cuts, upgrades and bamboo-fueled chaos.
          </h2>
          <p class="text-muted text-base leading-relaxed">
            {GAME.descriptionShort}
          </p>
        </div>

        <!-- Coluna direita: tags + dl + CTA -->
        <div class="grid gap-6 content-center">

          <!-- Tags -->
          <div class="flex flex-wrap gap-2" aria-label="Steam tags">
            {
              GAME.tags.map((tag) => (
                <span class="inline-block px-3 py-1 border border-bamboo/40 rounded-full text-bamboo bg-bamboo/10 text-sm font-semibold transition-colors duration-150 hover:border-bamboo/70 hover:bg-bamboo/20 cursor-default">
                  {tag}
                </span>
              ))
            }
          </div>

          <!-- dl com ícones -->
          <dl class="grid grid-cols-2 max-[640px]:grid-cols-1 gap-4">
            <div>
              <dt class="font-display text-blue-light text-xs uppercase tracking-widest flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                Desenvolvedor
              </dt>
              <dd class="mt-1 text-white font-bold text-base">{GAME.developer}</dd>
            </div>
            <div>
              <dt class="font-display text-blue-light text-xs uppercase tracking-widest flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                Publisher
              </dt>
              <dd class="mt-1 text-white font-bold text-base">{GAME.publisher}</dd>
            </div>
            <div>
              <dt class="font-display text-blue-light text-xs uppercase tracking-widest flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M6 1L6 11M1 6L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                Lançamento
              </dt>
              <dd class="mt-1 text-white font-bold text-base">{GAME.releaseDate}</dd>
            </div>
            <div>
              <dt class="font-display text-blue-light text-xs uppercase tracking-widest flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Preço
              </dt>
              <dd class="mt-1 text-white font-bold text-base">{GAME.price}</dd>
            </div>
          </dl>

          <SteamButtonAnimated
            label="JOGAR AGORA"
            event="steam_cta_strip_click"
            className="max-[640px]:w-full self-start"
            client:visible
          />
        </div>

      </div>
    </StatusAnimations>
  </div>
</section>
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/StatusSection.astro
git commit -m "feat: status bg-ink, remover overlap -mt-18, layout direto na seção"
```

---

## Task 5: Trailer Section — bg-forest

**Files:**
- Modify: `src/components/TrailerSection.astro`

- [ ] **Step 1: Atualizar TrailerSection.astro**

Apenas a classe da section e as classes de texto mudam:

```astro
---
import { TrailerPlayer } from "./react/TrailerPlayer";
import { YOUTUBE_TRAILER_ID } from "../consts";
---

<section id="trailer" class="bg-forest py-24 border-t border-bamboo/15">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <div class="grid grid-cols-[2fr_1fr] max-[980px]:grid-cols-1 gap-10 items-center">
      <!-- Vídeo — ocupa 2/3 -->
      <div>
        <TrailerPlayer youtubeId={YOUTUBE_TRAILER_ID} client:visible />
      </div>

      <!-- Texto complementar — ocupa 1/3 -->
      <div class="flex flex-col gap-4">
        <p class="text-bamboo font-display text-sm uppercase tracking-widest">
          Assista ao Trailer
        </p>
        <h3 class="font-display text-2xl text-white leading-tight">
          Veja o ritmo da lâmina antes da sua primeira run.
        </h3>
        <p class="text-muted text-sm leading-relaxed">
          Cortes rápidos, pressure constante e upgrades que mudam tudo a cada rodada.
        </p>
        <a
          class="text-bamboo font-display text-sm font-bold hover:underline self-start transition-colors duration-150"
          href="#gameplay"
        >
          Ver mais gameplay →
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TrailerSection.astro
git commit -m "feat: trailer bg-forest, texto branco/muted"
```

---

## Task 6: Features — fix ícones + grid 3 colunas

**Files:**
- Modify: `src/components/FeaturesSection.astro`
- Modify: `src/components/react/FeatureIcons.tsx`
- Modify: `src/components/react/FeatureGrid.tsx`

- [ ] **Step 1: Atualizar FeaturesSection.astro**

```astro
---
import { FeatureGrid } from "./react/FeatureGrid";
---

<section id="features" class="bg-black py-24 border-t border-bamboo/15">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <div class="max-w-2xl mb-14">
      <p class="mb-3.5 text-bamboo font-display text-xl uppercase">
        Features
      </p>
      <h2 class="font-display text-4xl md:text-6xl xl:text-7xl text-white leading-tight">
        Cada run pede timing mais afiado.
      </h2>
    </div>
    <FeatureGrid client:visible />
  </div>
</section>
```

- [ ] **Step 2: Corrigir SVG sizes em FeatureIcons.tsx**

Remover `width="32" height="32"` dos três ícones — manter apenas `viewBox`. Os SVGs passarão a preencher o container (`w-16 h-16`) definido no FeatureGrid.

```tsx
export function UpgradeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="14" y="2" width="4" height="14" fill="currentColor" />
      <rect x="12" y="4" width="8" height="2" fill="currentColor" />
      <rect x="10" y="12" width="12" height="3" fill="currentColor" opacity="0.6" />
      <rect x="14" y="15" width="4" height="10" fill="currentColor" opacity="0.8" />
      <rect x="13" y="24" width="6" height="3" fill="currentColor" opacity="0.5" />
      <rect x="15" y="0" width="2" height="3" fill="currentColor" opacity="0.7" />
      <rect x="13" y="1" width="2" height="2" fill="currentColor" opacity="0.7" />
      <rect x="17" y="1" width="2" height="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function EnemyIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="8" y="6" width="16" height="14" fill="currentColor" opacity="0.15" />
      <rect x="6" y="8" width="20" height="10" fill="currentColor" opacity="0.15" />
      <rect x="10" y="10" width="4" height="4" fill="currentColor" />
      <rect x="18" y="10" width="4" height="4" fill="currentColor" />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="19" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="6" y="6" width="20" height="4" fill="currentColor" opacity="0.7" />
      <rect x="4" y="8" width="2" height="4" fill="currentColor" opacity="0.7" />
      <rect x="26" y="8" width="2" height="4" fill="currentColor" opacity="0.7" />
      <rect x="12" y="16" width="8" height="2" fill="currentColor" opacity="0.4" />
      <rect x="14" y="18" width="4" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function ChaosIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="14" y="2" width="4" height="4" fill="currentColor" />
      <rect x="10" y="4" width="4" height="4" fill="currentColor" opacity="0.7" />
      <rect x="18" y="4" width="4" height="4" fill="currentColor" opacity="0.7" />
      <rect x="6" y="8" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="22" y="8" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="8" y="12" width="16" height="10" fill="currentColor" opacity="0.8" />
      <rect x="6" y="14" width="20" height="6" fill="currentColor" opacity="0.6" />
      <rect x="10" y="10" width="12" height="14" fill="currentColor" opacity="0.9" />
      <rect x="12" y="13" width="8" height="6" fill="currentColor" opacity="0.3" />
      <rect x="2" y="12" width="6" height="2" fill="currentColor" />
      <rect x="24" y="12" width="6" height="2" fill="currentColor" />
      <rect x="14" y="24" width="4" height="6" fill="currentColor" />
      <rect x="4" y="22" width="4" height="4" fill="currentColor" opacity="0.6" />
      <rect x="24" y="22" width="4" height="4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
```

**Nota:** Usar `fill="currentColor"` em todos os rects para herdar a cor do wrapper (`text-gold`, `text-blue-light`, `text-red`). `style={{ width: "100%", height: "100%" }}` garante que o SVG preencha o container.

- [ ] **Step 3: Reescrever FeatureGrid.tsx com grid 3 colunas**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    Icon: UpgradeIcon,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    iconColor: "text-gold",
  },
  {
    Icon: EnemyIcon,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    iconColor: "text-blue-light",
  },
  {
    Icon: ChaosIcon,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    iconColor: "text-red",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function FeatureCard({
  Icon,
  title,
  text,
  iconColor,
}: (typeof features)[number]) {
  return (
    <motion.article
      className="bg-panel border border-bamboo/20 rounded-2xl p-8 flex flex-col gap-5"
      variants={cardVariants}
      whileHover={{
        y: -4,
        borderColor: "rgba(107,143,94,0.5)",
        boxShadow: "4px 4px 0 rgba(107,143,94,0.4), 0 24px 48px rgba(0,0,0,0.4)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.span
        className={`flex items-center justify-center w-16 h-16 ${iconColor}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon />
      </motion.span>
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="text-muted text-base leading-relaxed">{text}</p>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <motion.div
      className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6"
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

- [ ] **Step 4: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturesSection.astro src/components/react/FeatureIcons.tsx src/components/react/FeatureGrid.tsx
git commit -m "feat: features bg-black, grid 3 colunas, fix SVG icons fill container"
```

---

## Task 7: Gameplay Section — bg-ink

**Files:**
- Modify: `src/components/GameplayGrid.astro`

- [ ] **Step 1: Atualizar GameplayGrid.astro**

```astro
---
import { GameplayGridClient } from "./react/GameplayGridClient";
---

<section id="gameplay" class="bg-ink py-24 border-t border-bamboo/15">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-10">
      <p class="mb-3.5 text-bamboo font-display text-xl uppercase">
        Veja a Ação
      </p>
      <h2 class="font-display text-4xl md:text-6xl xl:text-7xl text-white leading-tight">
        Beats de gameplay para decisões rápidas.
      </h2>
    </div>
    <GameplayGridClient client:visible />
  </div>
</section>
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GameplayGrid.astro
git commit -m "feat: gameplay bg-ink, heading text-white"
```

---

## Task 8: Final CTA — bg-forest sem card wrapper

**Files:**
- Modify: `src/components/react/FinalCTAClient.tsx`

- [ ] **Step 1: Reescrever FinalCTAClient.tsx**

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-24px", "24px"]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden bg-forest border-t border-bamboo/15"
    >
      <div className="grid grid-cols-2 max-[768px]:grid-cols-1">
        {/* Coluna esquerda — imagem com parallax */}
        <motion.div
          className="bg-cover bg-center min-h-96 max-[768px]:min-h-52"
          style={{
            backgroundImage: "url('/final_cta_background 1.png')",
            y: bgY,
          }}
          aria-hidden="true"
        />

        {/* Coluna direita — conteúdo */}
        <div className="flex flex-col justify-center gap-6 px-12 py-16 max-[768px]:px-6 max-[768px]:py-10">
          <motion.p
            className="text-blue-light font-display text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease }}
          >
            Available on Steam
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
              event="steam_cta_final_click"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FinalCTAClient.tsx
git commit -m "feat: final CTA bg-forest, layout full-width sem card wrapper"
```

---

## Task 9: Verificação Final

- [ ] **Step 1: Build de produção limpo**

```bash
pnpm build 2>&1 | grep -E "(error|Error)" | head -20
```

Esperado: nenhuma linha de output (zero erros).

- [ ] **Step 2: Verificar ritmo de cores no HTML gerado**

```bash
grep -E "bg-(black|ink|forest)" dist/index.html | head -20
```

Esperado: sequência alternada `bg-black` (hero) → `bg-ink` (status) → `bg-forest` (trailer) → `bg-black` (features) → `bg-ink` (gameplay) → `bg-forest` (final CTA).

- [ ] **Step 3: Commit final se necessário**

```bash
git add -A
git status
```

Se houver arquivos não commitados, commitar com mensagem descritiva.
