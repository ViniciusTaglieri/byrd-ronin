# Friendly Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o site de dark/premium para uma estética friendly, clara e aconchegante — paleta mint+sky, fundos claros com cards escuros de contraste, navbar branca com bambu estrutural animado, e refatoração completa de valores arbitrários.

**Architecture:** Cada seção recebe um fundo da nova paleta (cream/sky/white). Conteúdo de destaque (cards, CTA) mantém tons escuros de contraste. A navbar é completamente reescrita com fundo branco e decoração de bambu inline. Nenhuma classe CSS customizada — apenas Tailwind + Motion.

**Tech Stack:** Astro, React, Tailwind v4, Framer Motion, CVA

**Spec:** `docs/specs/2026-05-22-friendly-redesign.md`

---

## Task 1: Color Tokens

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Adicionar novos tokens de cor ao tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        black:        "#050505",
        ink:          "#0b1220",
        panel:        "#18181b",
        "blue-deep":  "#0367a6",
        blue:         "#0788d9",
        "blue-light": "#49c2f2",
        gold:         "#bfb52c",
        red:          "#f21313",
        scarlet:      "#ff3b2e",
        white:        "#f8fafc",
        muted:        "#b8cadb",
        bamboo:       "#6b8f5e",
        earth:        "#8b6f47",
        mist:         "rgba(180,210,180,0.08)",
        cream:        "#f4f9f4",
        sky:          "#eaf4fb",
        forest:       "#0d1a0f",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        body:    ['"Inter"',          "system-ui", "sans-serif"],
      },
    },
  },
};
```

- [ ] **Step 2: Verificar que o build compila sem erros**

```bash
cd /home/vini/Desenvolvimento/Projetos/birdyronin-claude/ByrdRoninWebsite
pnpm build 2>&1 | tail -20
```
Esperado: sem erros de compilação.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: adicionar tokens cream, sky, forest, scarlet ao tailwind"
```

---

## Task 2: BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Atualizar BaseLayout**

Substituir o body class e adicionar `scroll-smooth` ao html:

```astro
<!doctype html>
<html lang="pt-BR" class="scroll-smooth">
  <head>
    <!-- (conteúdo existente sem alteração) -->
  </head>
  <body class="antialiased min-h-dvh text-ink font-body bg-cream">
    <slot />
    <!-- (script analytics existente sem alteração) -->
  </body>
</html>
```

Apenas as duas linhas alteradas:
- `<html lang="pt-BR">` → `<html lang="pt-BR" class="scroll-smooth">`
- `class="antialiased min-h-dvh text-white font-body bg-black"` → `class="antialiased min-h-dvh text-ink font-body bg-cream"`

- [ ] **Step 2: Iniciar dev server e verificar visualmente**

```bash
pnpm dev
```
Abrir `http://127.0.0.1:4321`. O fundo da página deve ser mint claro (#f4f9f4). O Hero ainda aparece escuro (tem background próprio).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: body bg-cream, html scroll-smooth"
```

---

## Task 3: Navbar — Redesign com Bambu Estrutural

**Files:**
- Modify: `src/components/react/NavbarClient.tsx`

- [ ] **Step 1: Reescrever NavbarClient.tsx completo**

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

// Folha SVG reutilizável
function Leaf({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="currentColor"
      className="text-bamboo/70"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path d="M0,4.5 Q5,0 16,2 Q5,5.5 0,4.5Z" />
    </svg>
  );
}

// Haste de bambu vertical — decoração estrutural da navbar
function BambooNavStalk({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <div
      className={`absolute top-0 bottom-0 ${isRight ? "right-0" : "left-0"} w-10 flex flex-col items-center pointer-events-none`}
      aria-hidden="true"
    >
      {/* Segmento superior */}
      <div className="w-2.5 flex-1 bg-bamboo/40 rounded-t-sm" />

      {/* Nó 1 com folha */}
      <div className="relative flex-none w-5 h-5 border-2 border-bamboo/60 rounded-full bg-bamboo/15 z-10">
        <motion.div
          className={`absolute top-0.5 ${isRight ? "-left-5" : "-right-5"}`}
          animate={{ rotate: isRight ? [3, -3, 3] : [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          style={{ originX: isRight ? 1 : 0 }}
        >
          <Leaf flipped={isRight} />
        </motion.div>
      </div>

      {/* Segmento do meio */}
      <div className="w-2.5 flex-1 bg-bamboo/40" />

      {/* Nó 2 com folha menor */}
      <div className="relative flex-none w-4 h-4 border-2 border-bamboo/50 rounded-full bg-bamboo/10 z-10">
        <motion.div
          className={`absolute top-0 ${isRight ? "-left-4" : "-right-4"}`}
          animate={{ rotate: isRight ? [4, -4, 4] : [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 1.1, ease: "easeInOut" }}
          style={{ originX: isRight ? 1 : 0 }}
        >
          <Leaf flipped={isRight} />
        </motion.div>
      </div>

      {/* Segmento inferior */}
      <div className="w-2.5 flex-1 bg-bamboo/40 rounded-b-sm" />
    </div>
  );
}

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
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 grid grid-cols-[auto_1fr_auto] max-[980px]:grid-cols-[auto_auto] items-center gap-6 w-[min(1180px,calc(100%-28px))] min-h-18 mt-3.5 px-10 max-[640px]:px-4 py-2.5 border border-bamboo/20 rounded-xl overflow-hidden"
        style={{
          background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(107,143,94,0.15)"
            : "0 8px 32px rgba(0,0,0,0.06)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <BambooNavStalk side="left" />
        <BambooNavStalk side="right" />

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

        {/* Links centrais — desktop */}
        <nav
          className="flex justify-end gap-6 max-[980px]:hidden"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative pb-0.5 text-ink font-display text-base tracking-wide transition-colors duration-150 hover:text-bamboo group"
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
            className="hidden max-[980px]:flex items-center justify-center w-11 h-11 p-2 border-2 border-bamboo/30 rounded-lg text-ink bg-transparent cursor-pointer transition-colors duration-150 hover:border-bamboo hover:bg-bamboo/10"
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
            className="fixed top-24 max-[640px]:top-20 left-1/2 -translate-x-1/2 z-39 flex flex-col gap-1 w-[min(1180px,calc(100%-28px))] p-4 border border-bamboo/25 rounded-xl bg-cream shadow-xl"
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
                className="px-4 py-3.5 rounded-lg text-ink font-display text-xl transition-colors duration-150 hover:bg-bamboo/10 hover:text-bamboo"
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

- [ ] **Step 2: Verificar visualmente**

Com o dev server rodando, verificar:
- Navbar aparece branca/cream com borda sutil
- Hastes de bambu visíveis nos cantos esquerdo/direito
- Folhas animam suavemente (balanço contínuo)
- Links são escuros (ink), hover vira bamboo com underline
- Scroll adiciona sombra

- [ ] **Step 3: Commit**

```bash
git add src/components/react/NavbarClient.tsx
git commit -m "feat: navbar branca com hastes de bambu animadas, links à direita"
```

---

## Task 4: Status Section

**Files:**
- Modify: `src/components/StatusSection.astro`

- [ ] **Step 1: Reescrever StatusSection.astro**

```astro
---
import { GAME } from "../consts";
import { SteamButtonAnimated } from "./react/SteamButtonAnimated";
import { StatusAnimations } from "./react/StatusAnimations";
---

<section id="status" class="relative z-5 -mt-18 bg-cream pt-24 pb-16">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <StatusAnimations client:visible>
      <div
        class="relative grid grid-cols-2 max-[980px]:grid-cols-1 gap-8 p-8 max-[640px]:p-6 border border-bamboo/30 rounded-2xl bg-gradient-to-br from-forest to-ink shadow-2xl overflow-hidden"
      >
        <!-- Coluna esquerda: texto principal -->
        <div class="flex flex-col justify-center gap-4">
          <p class="text-blue-light font-display text-sm uppercase tracking-widest">
            Available on Steam
          </p>
          <h2 class="font-display text-4xl md:text-5xl xl:text-7xl text-white leading-tight">
            Fast cuts, upgrades and bamboo-fueled chaos.
          </h2>
          <p class="text-muted text-base leading-relaxed">
            {GAME.descriptionShort}
          </p>
        </div>

        <!-- Coluna direita: meta + tags + CTA -->
        <div class="grid gap-5 content-center">
          <!-- Tags -->
          <div class="flex flex-wrap gap-2" aria-label="Steam tags">
            {
              GAME.tags.map((tag) => (
                <span class="inline-block px-3 py-1 border border-bamboo/40 rounded-full text-bamboo bg-bamboo/20 text-sm font-semibold transition-colors duration-150 hover:border-bamboo/70 hover:bg-bamboo/30 cursor-default">
                  {tag}
                </span>
              ))
            }
          </div>

          <!-- dl com ícones -->
          <dl class="grid grid-cols-2 max-[640px]:grid-cols-1 gap-3">
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
            className="max-[640px]:w-full"
            client:visible
          />
        </div>
      </div>
    </StatusAnimations>
  </div>
</section>
```

- [ ] **Step 2: Verificar visualmente**

Verificar:
- Fundo da seção é cream claro
- Card escuro (forest→ink) contrasta bem sobre o fundo
- Tags aparecem como chips verde arredondados
- dt tem ícone + texto azul-claro em uppercase pequeno
- dd em branco bold abaixo
- Hierarquia clara: kicker → h2 → descrição → tags → dl → CTA

- [ ] **Step 3: Commit**

```bash
git add src/components/StatusSection.astro
git commit -m "feat: status section bg-cream, hierarquia visual, tags chips, dl com ícones"
```

---

## Task 5: Trailer Section

**Files:**
- Modify: `src/components/TrailerSection.astro`
- Modify: `src/components/react/TrailerPlayer.tsx`

- [ ] **Step 1: Reescrever TrailerSection.astro**

```astro
---
import { TrailerPlayer } from "./react/TrailerPlayer";
import { YOUTUBE_TRAILER_ID } from "../consts";
---

<section id="trailer" class="bg-sky py-24">
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
        <h3 class="font-display text-2xl text-ink leading-tight">
          Veja o ritmo da lâmina antes da sua primeira run.
        </h3>
        <p class="text-slate-600 text-sm leading-relaxed">
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

- [ ] **Step 2: Limpar valores arbitrários no TrailerPlayer.tsx**

Substituir:
- `border-bamboo/[0.35]` → `border-bamboo/35`
- `w-[88px] h-[88px]` → `w-22 h-22`
- `right-[18px] bottom-[18px] left-[18px]` → `right-4.5 bottom-4.5 left-4.5`
- `px-[14px]` → `px-3.5`
- `border-white/[0.24]` → `border-white/25`
- `bg-black/[0.74]` → `bg-black/75`

Arquivo completo:

```tsx
import { motion, AnimatePresence } from "framer-motion";
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
        className="relative w-full overflow-hidden border border-bamboo/35 rounded-xl bg-black shadow-[4px_4px_0_rgba(191,181,44,0.5),0_32px_80px_rgba(0,0,0,0.48)] cursor-pointer"
        whileHover={{
          boxShadow:
            "10px 10px 0 rgba(191,181,44,0.9), 0 0 32px rgba(73,194,242,0.35), 0 32px 80px rgba(0,0,0,0.5)",
        }}
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
                poster="/page_bg_raw_gpt.png"
                muted
                loop
                playsInline
                autoPlay
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(1.2) brightness(0.65)",
                }}
              />

              {youtubeId && (
                <motion.button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 flex items-center justify-center border-4 border-white rounded-full bg-red shadow-[0_12px_0_#870707] cursor-pointer"
                  aria-label="Assistir trailer completo no YouTube"
                  onClick={() => setPlaying(true)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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

              <span className="absolute right-4.5 bottom-4.5 left-4.5 px-3.5 py-3 border border-white/25 rounded-lg text-white bg-black/75 font-extrabold">
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

- [ ] **Step 3: Verificar visualmente**

Verificar:
- Seção tem fundo sky (azul muito claro)
- Vídeo ocupa ~2/3 da largura
- Texto à direita: kicker bamboo + h3 ink + parágrafo slate + link bamboo
- Não há botão ghost — apenas link de texto

- [ ] **Step 4: Commit**

```bash
git add src/components/TrailerSection.astro src/components/react/TrailerPlayer.tsx
git commit -m "feat: trailer bg-sky, vídeo 2/3, texto complementar, cleanup arbitrary values"
```

---

## Task 6: Features Section — Redesign Alternado

**Files:**
- Modify: `src/components/FeaturesSection.astro`
- Modify: `src/components/react/FeatureGrid.tsx`

- [ ] **Step 1: Atualizar FeaturesSection.astro**

```astro
---
import { FeatureGrid } from "./react/FeatureGrid";
---

<section
  id="features"
  class="bg-white py-24"
>
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <div class="max-w-2xl mb-14">
      <p class="mb-3.5 text-bamboo font-display text-xl uppercase">
        Features
      </p>
      <h2 class="font-display text-4xl md:text-6xl xl:text-7xl text-ink leading-tight">
        Cada run pede timing mais afiado.
      </h2>
    </div>
    <FeatureGrid client:visible />
  </div>
</section>
```

- [ ] **Step 2: Reescrever FeatureGrid.tsx com layout alternado**

```tsx
import { motion } from "framer-motion";
import React from "react";
import { UpgradeIcon, EnemyIcon, ChaosIcon } from "./FeatureIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const features: Array<{
  Icon: () => React.ReactElement;
  title: string;
  text: string;
  iconColor: string;
}> = [
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
];

// Separador de bambu entre features
function BambooDivider() {
  return (
    <div className="flex items-center gap-4 my-8" aria-hidden="true">
      <div className="flex-1 border-t border-bamboo/20" />
      <div className="w-5 h-5 rounded-full bg-bamboo/20 border-2 border-bamboo/40 flex-none" />
      <div className="flex-1 border-t border-bamboo/20" />
    </div>
  );
}

function FeatureRow({
  Icon,
  title,
  text,
  iconColor,
  index,
}: (typeof features)[number] & { index: number }) {
  const isEven = index % 2 === 1;

  return (
    <motion.article
      className="bg-ink rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease }}
      whileHover={{
        y: -4,
        boxShadow: "4px 4px 0 rgba(107,143,94,0.5), 0 32px 60px rgba(0,0,0,0.35)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Bloco ícone */}
      <div
        className={`bg-bamboo/10 p-12 flex items-center justify-center flex-none lg:w-80 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <motion.span
          className={`flex items-center justify-center w-24 h-24 ${iconColor}`}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon />
        </motion.span>
      </div>

      {/* Bloco texto */}
      <div
        className={`p-10 flex flex-col justify-center gap-4 flex-1 ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        <h3 className="font-display text-3xl text-white">{title}</h3>
        <p className="text-muted text-base leading-relaxed">{text}</p>
      </div>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <div className="flex flex-col">
      {features.map((feature, i) => (
        <React.Fragment key={feature.title}>
          <FeatureRow {...feature} index={i} />
          {i < features.length - 1 && <BambooDivider />}
        </React.Fragment>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

Verificar:
- Fundo da seção é branco
- 3 features em layout vertical alternado (ícone esquerda/direita)
- Cards escuros (ink) com sombra
- Ícones: Upgrades dourado, Inimigos azul-claro, Caos vermelho
- Separador de bambu entre features
- Animação de entrada ao scroll

- [ ] **Step 4: Commit**

```bash
git add src/components/FeaturesSection.astro src/components/react/FeatureGrid.tsx
git commit -m "feat: features section redesign — layout alternado editorial, cards escuros, separador bambu"
```

---

## Task 7: Gameplay Section

**Files:**
- Modify: `src/components/GameplayGrid.astro`
- Modify: `src/components/react/GameplayGridClient.tsx`

- [ ] **Step 1: Atualizar GameplayGrid.astro**

```astro
---
import { GameplayGridClient } from "./react/GameplayGridClient";
---

<section id="gameplay" class="bg-cream py-24">
  <div class="w-[min(1160px,calc(100%-40px))] mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-10">
      <p class="mb-3.5 text-bamboo font-display text-xl uppercase">
        Veja a Ação
      </p>
      <h2 class="font-display text-4xl md:text-6xl xl:text-7xl text-ink leading-tight">
        Beats de gameplay para decisões rápidas.
      </h2>
    </div>
    <GameplayGridClient client:visible />
  </div>
</section>
```

- [ ] **Step 2: Atualizar GameplayGridClient.tsx — caption slide-up**

```tsx
import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_RATIO = "585 / 329";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

function GameplayCard({ src, title, context }: GameplayClip) {
  return (
    <motion.figure
      className="relative overflow-hidden m-0 border border-bamboo/25 rounded-xl bg-ink"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      style={{ cursor: "default" }}
    >
      {/* Vídeo */}
      <div
        className="relative overflow-hidden bg-panel"
        style={{ aspectRatio: VIDEO_RATIO }}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "var(--color-black, #050505)",
            filter: "saturate(1.1) brightness(0.9)",
          }}
        />
        {/* Gradiente inferior permanente (mais suave) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Caption slide-up */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 py-3.5 bg-ink/95"
        variants={{
          rest: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.25, ease }}
      >
        <span className="text-bamboo font-display text-lg leading-snug">
          {title}
        </span>
        <span className="text-muted text-sm leading-normal">{context}</span>
      </motion.div>
    </motion.figure>
  );
}

export function GameplayGridClient() {
  return (
    <motion.div
      className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {GAMEPLAY_CLIPS.map((clip) => (
        <GameplayCard key={clip.src} {...clip} />
      ))}
    </motion.div>
  );
}
```

**Nota:** O `whileHover="hover"` no `motion.figure` propaga o estado `hover` para os filhos com `variants`, disparando o slide-up do caption via propagação de variantes do Framer Motion.

- [ ] **Step 3: Verificar visualmente**

Verificar:
- Seção tem fundo cream, heading em ink
- Hover nos cards: caption sobe de baixo com título bamboo
- Cards têm `rounded-xl` e borda sutil bamboo

- [ ] **Step 4: Commit**

```bash
git add src/components/GameplayGrid.astro src/components/react/GameplayGridClient.tsx
git commit -m "feat: gameplay bg-cream, caption slide-up animado, texto ink"
```

---

## Task 8: Final CTA — Imagem como Background

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
      className="relative overflow-hidden bg-sky py-16"
    >
      <div className="w-[min(1160px,calc(100%-40px))] mx-auto relative z-10">
        <div className="relative grid grid-cols-2 max-[768px]:grid-cols-1 rounded-2xl overflow-hidden shadow-2xl border border-bamboo/20">
          {/* Coluna esquerda — imagem com parallax */}
          <motion.div
            className="bg-cover bg-center min-h-80 max-[768px]:min-h-48"
            style={{
              backgroundImage: "url('/final_cta_background 1.png')",
              y: bgY,
            }}
            aria-hidden="true"
          />

          {/* Coluna direita — conteúdo */}
          <div className="relative overflow-hidden flex flex-col justify-center gap-6 px-10 py-12 max-[768px]:px-6 max-[768px]:py-8 bg-gradient-to-br from-forest to-ink">
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
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Verificar:
- Seção tem fundo sky
- Container: imagem à esquerda, texto à direita (similar à Hero)
- Imagem tem parallax ao scroll
- Coluna de conteúdo tem fundo escuro (forest→ink)
- Elementos entram com animação ao aparecer no viewport

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FinalCTAClient.tsx
git commit -m "feat: final CTA bg-sky, imagem como coluna esquerda com parallax"
```

---

## Task 9: Cleanup Global — Valores Arbitrários Restantes

**Files:**
- Modify: `src/components/react/SteamButtonAnimated.tsx`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/react/HeroAnimations.tsx`

- [ ] **Step 1: Limpar SteamButtonAnimated.tsx (CVA + classes)**

```tsx
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { STEAM_URL } from "../../consts";
import { SteamIcon } from "./SteamIcon";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 border-2 border-transparent rounded-md font-display text-lg font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-150 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-gradient-to-b from-scarlet to-red shadow-[0_8px_0_#870707,0_18px_36px_rgba(242,19,19,0.32)]",
        secondary: "text-black bg-gold",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface Props extends VariantProps<typeof buttonVariants> {
  label?: string;
  event?: string;
  className?: string;
}

export function SteamButtonAnimated({
  label = "JOGAR AGORA",
  variant = "primary",
  event = "steam_cta_click",
  className,
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={STEAM_URL}
      target="_blank"
      rel="noreferrer"
      data-event={event}
      className={[buttonVariants({ variant }), className].filter(Boolean).join(" ")}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: {
          scale: 1,
          y: 0,
          boxShadow: isPrimary
            ? "0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.28)"
            : "0 6px 0 #7a740d",
        },
        hover: {
          scale: 1.04,
          y: -2,
          boxShadow: isPrimary
            ? "0 10px 0 #870707, 0 22px 44px rgba(242,19,19,0.42)"
            : "0 8px 0 #7a740d, 0 16px 32px rgba(191,181,44,0.3)",
          transition: { duration: 0.15, ease: "easeOut" },
        },
        tap: {
          scale: 0.97,
          y: 3,
          boxShadow: isPrimary ? "0 4px 0 #870707" : "0 3px 0 #7a740d",
          transition: { duration: 0.08 },
        },
      }}
    >
      <SteamIcon size={18} />
      <span>{label}</span>

      {/* Shimmer overlay */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "200% 0",
          pointerEvents: "none",
        }}
        variants={{
          rest: { backgroundPosition: "200% 0" },
          hover: {
            backgroundPosition: "-100% 0",
            transition: { duration: 0.55, ease: "easeInOut" },
          },
        }}
      />
    </motion.a>
  );
}
```

Mudanças aplicadas:
- `min-h-[48px]` → `min-h-12`
- `gap-[10px]` → `gap-2.5`
- `py-[13px]` → `py-3`
- `text-[18px]` → `text-lg`
- `duration-[160ms]` → `duration-150`
- `from-[#ff3b2e]` → `from-scarlet` (token adicionado no Task 1)

- [ ] **Step 2: Limpar valores arbitrários em HeroAnimations.tsx**

Verificar e corrigir o parágrafo da descrição (já tem `text-muted text-[19px]`):

Linha com `text-[19px]` → `text-lg`:
```tsx
      <motion.p
        variants={itemVariants}
        className="max-w-[610px] text-muted text-lg leading-relaxed"
      >
```

`max-w-[610px]` → `max-w-2xl` (672px — próximo o suficiente) ou manter como está se crítico ao layout.

Para o botão ghost inline:
```tsx
className="inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 border-2 border-white/40 rounded-md text-white bg-black/30 font-display text-lg font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-150 hover:-translate-y-0.5 max-[640px]:w-full max-[640px]:justify-center"
```

- [ ] **Step 3: Verificar build limpo**

```bash
pnpm build 2>&1 | grep -E "(error|warning)" | head -30
```

Esperado: sem erros de TypeScript ou Astro.

- [ ] **Step 4: Verificar visualmente — revisão completa**

Com `pnpm dev`, percorrer toda a página verificando:
1. Navbar branca com bambu e links alinhados à direita
2. Hero mantém fundo escuro
3. Status: cream + card escuro com hierarquia clara
4. Trailer: sky + vídeo grande + texto complementar pequeno
5. Features: branco + 3 rows alternados escuros com ícones coloridos
6. Gameplay: cream + caption slide-up ao hover
7. Final CTA: sky + imagem esquerda + texto direita
8. Footer: mantém escuro

- [ ] **Step 5: Commit final**

```bash
git add src/components/react/SteamButtonAnimated.tsx src/components/react/HeroAnimations.tsx
git commit -m "refactor: cleanup valores arbitrários — SteamButton, HeroAnimations"
```

---

## Checklist de Cobertura do Spec

- [x] Tokens cream, sky, forest, scarlet adicionados — Task 1
- [x] BaseLayout bg-cream, scroll-smooth — Task 2
- [x] Navbar branca, links direita, bambu estrutural animado — Task 3
- [x] Status bg-cream, hierarquia, tags chips, dl com ícones — Task 4
- [x] Trailer bg-sky, vídeo 2/3, h3 complementar — Task 5
- [x] Features bg-white, layout alternado flex, dark cards — Task 6
- [x] Gameplay bg-cream, text-ink, caption slide-up — Task 7
- [x] Final CTA bg-sky, imagem como coluna parallax — Task 8
- [x] SteamButton sem valores arbitrários, usa scarlet — Task 9
- [x] HeroAnimations cleanup — Task 9
