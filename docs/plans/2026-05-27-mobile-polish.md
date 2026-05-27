# Mobile Polish + Tailwind Semantic Tokens — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor todos os valores arbitrários do Tailwind para tokens semânticos no `tailwind.config.js` e aplicar correções de layout mobile em 9 seções da landing page do Byrd Ronin.

**Architecture:** Duas fases sequenciais — primeiro, adicionar tokens nomeados (screens, fontSizes, widths, grids, shadows, z-index) ao `tailwind.config.js` e `global.css`; segundo, substituir todos os valores arbitrários pelos novos tokens e aplicar os fixes mobile por componente. `FeatureGrid.tsx` ganha um carrossel Framer Motion embutido para mobile.

**Tech Stack:** Astro, React 18, Framer Motion, Tailwind CSS v4, TypeScript, pnpm

**Spec:** `docs/specs/2026-05-27-mobile-polish-design.md`

---

## File Map

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `tailwind.config.js` | Modificar | Adicionar screens, fontSizes, widths, gridTemplateColumns, zIndex, boxShadow, dropShadow |
| `src/styles/global.css` | Modificar | Adicionar `@utility` para text-shadow (sem suporte nativo Tailwind) |
| `src/components/react/NavbarClient.tsx` | Modificar | Refatorar tokens + layout mobile (grid 3 colunas, menu bg, remover CTA do menu) |
| `src/components/react/HeroAnimations.tsx` | Modificar | Refatorar tokens + remover opacity-35 do personagem |
| `src/components/HeroSection.astro` | Modificar | Refatorar breakpoints arbitrários |
| `src/components/SteamWidget.astro` | Modificar | Refatorar + posicionamento estático no mobile |
| `src/components/react/SteamButtonAnimated.tsx` | Modificar | Refatorar shadow da CVA |
| `src/components/react/TrailerPlayer.tsx` | Modificar | Refatorar shadow |
| `src/components/TrailerSection.astro` | Modificar | Refatorar + corrigir ordem texto→vídeo no mobile |
| `src/components/react/FeatureGrid.tsx` | Modificar | Refatorar + adicionar `FeatureCarousel` inline + render condicional por CSS |
| `src/components/react/GameplayGridClient.tsx` | Modificar | Refatorar + forçar ordem texto→vídeo no mobile |
| `src/components/react/FinalCTAClient.tsx` | Modificar | Refatorar + `bg-left` no mobile |
| `src/components/RoninQuote.astro` | Modificar | Refatorar + espaço entre aspas e header no mobile |
| `src/components/Footer.astro` | Modificar | Refatorar + centralizar colunas nav/redes no mobile |
| `src/pages/404.astro` | Modificar | Refatorar breakpoints e font-size |

---

## Task 1: Criar branch `claude/mobile`

**Arquivos:** nenhum

- [ ] **Criar e acessar a branch**

```bash
git checkout -b claude/mobile
```

Expected: `Switched to a new branch 'claude/mobile'`

---

## Task 2: `tailwind.config.js` — tokens semânticos

**Arquivos:**
- Modificar: `tailwind.config.js`

- [ ] **Substituir o conteúdo completo de `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      screens: {
        mobile:  { max: "640px" },
        phablet: { max: "768px" },
        tablet:  { max: "980px" },
        wide:    { min: "1200px" },
      },
      width: {
        "container-page":  "min(1160px, calc(100% - 40px))",
        "container-narrow":"min(860px, calc(100% - 40px))",
        "navbar":          "min(1180px, calc(100% - 28px))",
        "cta-section":     "min(1200px, calc(100% - 48px))",
        "cta-col":         "48%",
      },
      maxWidth: {
        "container-page": "min(1160px, calc(100% - 40px))",
      },
      fontSize: {
        "3xs":         ["0.5625rem",               { lineHeight: "0.875rem" }],
        "2xs":         ["0.625rem",                { lineHeight: "1rem" }],
        "hero":        ["clamp(54px,7vw,96px)",    { lineHeight: "0.88" }],
        "hero-mobile": ["clamp(46px,18vw,68px)",   { lineHeight: "0.88" }],
        "section-xl":  ["clamp(2.8rem,5vw,4.5rem)",{ lineHeight: "0.88" }],
        "section-md":  ["clamp(1.8rem,3vw,2.8rem)",{ lineHeight: "1.15" }],
        "quote":       ["clamp(1.6rem,4vw,3rem)",  { lineHeight: "1.15" }],
        "deco-kanji":  ["clamp(3rem,4.5vw,5rem)",  { lineHeight: "1" }],
        "deco-quote":  ["clamp(5rem,14vw,9rem)",   { lineHeight: "1" }],
        "display-404": ["clamp(96px,20vw,200px)",  { lineHeight: "1" }],
      },
      letterSpacing: {
        "ui-tight":   "0.06em",
        "ui-label":   "0.18em",
        "ui-hint":    "0.2em",
        "ui-caption": "0.22em",
        "ui-hud":     "0.28em",
        "ui-wide":    "0.3em",
        "ui-hero":    "0.4em",
      },
      lineHeight: {
        tighter: "0.88",
      },
      colors: {
        red:          "#f21313",
        black:        "#050505",
        panel:        "#18181b",
        "blue-light": "#49c2f2",
        white:        "#f8fafc",
        muted:        "#b8cadb",
        bamboo:       "#6b8f5e",
        scarlet:      "#ff3b2e",
        forest:       "#0d1a0f",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        body:    ['"Inter"', "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        "navbar":        "auto 1fr auto",
        "trailer":       "4fr 7fr",
        "gameplay-even": "3fr 5fr",
        "gameplay-odd":  "5fr 3fr",
      },
      zIndex: {
        menu: "39",
      },
      boxShadow: {
        "video":     "4px 4px 0 rgba(191,181,44,0.25), 0 32px 80px rgba(0,0,0,0.48)",
        "steam-btn": "0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.32)",
      },
      dropShadow: {
        character: "0 36px 48px rgba(0,0,0,0.5)",
      },
    },
  },
};
```

- [ ] **Verificar build**

```bash
pnpm build
```

Expected: build concluído sem erros.

- [ ] **Commit**

```bash
git add tailwind.config.js
git commit -m "feat(tailwind): add semantic screen, font, grid, shadow and z-index tokens"
```

---

## Task 3: `global.css` — @utility text-shadow

**Arquivos:**
- Modificar: `src/styles/global.css`

Tailwind não tem suporte nativo a `text-shadow`. Adicionar como `@utility` no CSS.

- [ ] **Adicionar utilities ao final de `src/styles/global.css`**

Append após as linhas existentes:

```css
@utility text-shadow-hero {
  text-shadow: 5px 5px 0 rgba(0, 0, 0, 0.74);
}

@utility text-shadow-section {
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.6);
}

@utility text-shadow-404 {
  text-shadow: 6px 6px 0 rgba(0, 0, 0, 0.7), 0 0 80px rgba(255, 59, 46, 0.25);
}
```

- [ ] **Verificar build**

```bash
pnpm build
```

Expected: build sem erros.

- [ ] **Commit**

```bash
git add src/styles/global.css
git commit -m "feat(css): add text-shadow utility classes"
```

---

## Task 4: `NavbarClient.tsx` — refatorar tokens + fixes mobile

**Arquivos:**
- Modificar: `src/components/react/NavbarClient.tsx`

**Mudanças:**
- `w-[min(1180px,calc(100%-28px))]` → `w-navbar`
- `z-39` → `z-menu`
- Grid row: sempre `grid-cols-navbar` (3 colunas); coluna central mostra nav links no desktop e CTA centralizado no tablet/mobile
- `max-[980px]:` → `tablet:`, `max-[640px]:` → `mobile:`
- Menu: `bg-ink` → `bg-black`, `max-[640px]:top-20` → `mobile:top-20`
- Menu: remover bloco com `<SteamButtonAnimated>` no final da lista

- [ ] **Substituir o conteúdo de `src/components/react/NavbarClient.tsx`**

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SteamButtonAnimated } from "./SteamButtonAnimated";
import { ease } from "../../lib/motion";

const NAV_LINKS = [
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];

export function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed z-40 top-0 left-1/2 -translate-x-1/2 w-navbar mt-3.5 rounded overflow-hidden border border-bamboo/20"
        style={{
          background: scrolled ? "rgba(5,5,5,0.97)" : "rgba(5,5,5,0.86)",
          backdropFilter: "blur(18px)",
          boxShadow: scrolled
            ? "0 4px 28px rgba(0,0,0,0.55), 0 1px 0 rgba(107,143,94,0.15)"
            : "0 8px 36px rgba(0,0,0,0.35)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: ease }}
      >
        {/* Main row — always 3-col: logo | center | right */}
        <div className="grid grid-cols-navbar items-center gap-4 px-7 mobile:px-5 py-4">
          {/* Col 1: Logo */}
          <a href="#top" aria-label="Byrd Ronin home">
            <img
              src={`${import.meta.env.BASE_URL}logos/logo_byrdronin.png`}
              alt="Byrd Ronin"
              width="192"
              height="108"
              className="w-32 mobile:w-24 h-auto"
            />
          </a>

          {/* Col 2: Nav links (desktop) / CTA centered (tablet+mobile) */}
          <div className="flex items-center">
            {/* Desktop: nav links right-aligned */}
            <nav
              className="w-full flex items-center justify-end tablet:hidden"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }, i) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <div key={href} className="flex items-center">
                    {i > 0 && (
                      <div className="w-px h-4.5 bg-bamboo/18 mx-1 shrink-0" />
                    )}
                    <a
                      href={href}
                      className={`relative px-4 py-2 font-display text-sm tracking-wide rounded-sm transition-colors duration-200 hover:text-bamboo group ${
                        isActive ? "text-bamboo" : "text-white/72"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-bg"
                          className="absolute inset-0 rounded-sm"
                          style={{ background: "rgba(107,143,94,0.13)" }}
                          transition={{ duration: 0.22, ease: ease }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-4 right-4 h-px bg-bamboo scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
                      />
                    </a>
                  </div>
                );
              })}
            </nav>

            {/* Tablet/Mobile: CTA centered */}
            <div className="w-full hidden tablet:flex justify-center">
              <SteamButtonAnimated
                label="JOGAR AGORA"
                event="steam_cta_navbar_click"
                className="mobile:min-h-11 mobile:px-4 mobile:text-sm"
              />
            </div>
          </div>

          {/* Col 3: CTA (desktop only) + hamburger (tablet/mobile only) */}
          <div className="flex items-center gap-3 justify-self-end">
            <SteamButtonAnimated
              label="JOGAR AGORA"
              event="steam_cta_navbar_click"
              className="tablet:hidden"
            />

            <button
              className="hidden tablet:flex items-center justify-center w-11 h-11 p-2 border-2 border-white/20 rounded-sm text-white bg-transparent cursor-pointer transition-colors duration-150 hover:border-bamboo hover:bg-bamboo/10"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
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
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-22 mobile:top-20 left-1/2 -translate-x-1/2 z-menu flex flex-col gap-1 w-navbar p-4 border border-bamboo/25 rounded bg-black shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.a
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3.5 rounded-sm text-white/80 font-display text-xl transition-colors duration-150 hover:bg-bamboo/10 hover:text-bamboo"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <span className="font-display text-sm text-bamboo/45 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Verificar build**

```bash
pnpm build
```

Expected: sem erros TypeScript.

- [ ] **Commit**

```bash
git add src/components/react/NavbarClient.tsx
git commit -m "feat(navbar): semantic tokens + mobile 3-col layout + fix menu bg"
```

---

## Task 5: `HeroAnimations.tsx` — refatorar tokens + fix opacidade

**Arquivos:**
- Modificar: `src/components/react/HeroAnimations.tsx`

**Mudanças:**
- `text-[clamp(54px,7vw,96px)]` → `text-hero`
- `max-[640px]:text-[clamp(46px,18vw,68px)]` → `mobile:text-hero-mobile`
- `leading-tighter` permanece (reduntante com o token mas explícito — remover)
- `[text-shadow:5px_5px_0_rgba(0,0,0,0.74)]` → `text-shadow-hero`
- `max-[640px]:w-full` → `mobile:w-full`, `max-[640px]:justify-center` → `mobile:justify-center`
- `max-[640px]:opacity-35` — **remover** (fix: personagem visível no mobile)
- `max-[980px]:min-h-90` → `tablet:min-h-90`, `max-[640px]:min-h-65` → `mobile:min-h-65`
- `drop-shadow-[0_36px_48px_rgba(0,0,0,0.5)]` → `drop-shadow-character`

- [ ] **Substituir o conteúdo de `src/components/react/HeroAnimations.tsx`**

```tsx
import { motion } from "framer-motion";
import { ease } from "../../lib/motion";
import { PixelParticles } from "./particles/PixelParticles";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="w-full"
      variants={copyVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="mb-3.5 text-blue-light font-display text-xl uppercase"
      >
        Disponível na Steam
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="font-display text-hero mobile:text-hero-mobile max-w-205 text-shadow-hero"
      >
        Slice Through <em className="text-scarlet italic">Chaos.</em> Become the{" "}
        <em className="text-scarlet italic">Ronin.</em>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="max-w-2xl text-muted text-xl leading-relaxed"
      >
        Byrd Ronin é um action roguelite onde cada corte, upgrade e onda de
        inimigos empurra sua run mais fundo no caos de bambu.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4 mt-8 mb-4.5"
      >
        <SteamButtonAnimated
          label="JOGAR AGORA"
          variant="primary"
          event="steam_cta_hero_click"
          className="mobile:w-full"
        />
        <motion.a
          className="inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 border-2 border-white/30 rounded-md text-white bg-white/5 font-display text-lg font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-150 hover:-translate-y-0.5 mobile:w-full mobile:justify-center"
          href="#trailer"
          data-event="trailer_play_click"
          whileHover={{ scale: 1.03, borderColor: "rgba(73,194,242,0.7)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          Assistir Trailer
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function HeroCharacter() {
  return (
    <motion.div
      className="relative min-h-130 tablet:min-h-90 mobile:min-h-65"
      aria-hidden="true"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/hero_character.png`}
        alt=""
        width="1536"
        height="864"
        className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-character z-10"
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

export function HeroParticles() {
  return <PixelParticles colors={["#49c2f2", "#bfb52c", "#f8fafc"]} />;
}
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/react/HeroAnimations.tsx
git commit -m "feat(hero): semantic tokens + remove mobile character opacity"
```

---

## Task 6: `HeroSection.astro` — refatorar breakpoints

**Arquivos:**
- Modificar: `src/components/HeroSection.astro`

**Mudança:** `max-[980px]:grid-cols-1` → `tablet:grid-cols-1`

- [ ] **Editar `src/components/HeroSection.astro`**

Linha 26, substituir:
```astro
class="w-container-page mx-auto relative grid grid-cols-[1fr_1fr] max-[980px]:grid-cols-1 items-center gap-10"
```
Por:
```astro
class="w-container-page mx-auto relative grid grid-cols-2 tablet:grid-cols-1 items-center gap-10"
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/HeroSection.astro
git commit -m "refactor(hero): replace arbitrary breakpoints with semantic tokens"
```

---

## Task 7: `SteamWidget.astro` — refatorar + fix mobile

**Arquivos:**
- Modificar: `src/components/SteamWidget.astro`

**Mudanças:**
- No desktop: mantém posicionamento `absolute` com `translate-y-1/2`
- No mobile: `static`, sem translate, com `mt-4 px-4` para espaçamento

- [ ] **Substituir o conteúdo de `src/components/SteamWidget.astro`**

```astro
---
import { STEAM_APP_ID } from "../consts";
---

<div
  class="absolute -bottom-5 left-0 right-0 z-20 translate-y-1/2 max-w-4xl mx-auto mobile:static mobile:translate-y-0 mobile:mt-4 mobile:px-4"
>
  <iframe
    src={`https://store.steampowered.com/widget/${STEAM_APP_ID}/`}
    class="w-full"
    height="190"
    loading="lazy"
    title="Byrd Ronin no Steam"></iframe>
</div>
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/SteamWidget.astro
git commit -m "feat(steam-widget): mobile static positioning + horizontal padding"
```

---

## Task 8: `SteamButtonAnimated.tsx` e `TrailerPlayer.tsx` — refatorar shadows

**Arquivos:**
- Modificar: `src/components/react/SteamButtonAnimated.tsx`
- Modificar: `src/components/react/TrailerPlayer.tsx`

### SteamButtonAnimated.tsx

**Mudança:** `shadow-[0_8px_0_#870707,0_18px_36px_rgba(242,19,19,0.32)]` → `shadow-steam-btn`

- [ ] **Editar `src/components/react/SteamButtonAnimated.tsx`**

Linha 12, substituir:
```tsx
          "text-white bg-linear-to-b from-scarlet to-red shadow-[0_8px_0_#870707,0_18px_36px_rgba(242,19,19,0.32)]",
```
Por:
```tsx
          "text-white bg-linear-to-b from-scarlet to-red shadow-steam-btn",
```

### TrailerPlayer.tsx

**Mudança:** `shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)]` → `shadow-video`

- [ ] **Editar `src/components/react/TrailerPlayer.tsx`**

Linha 22, substituir:
```tsx
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)]"
```
Por:
```tsx
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-video"
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/react/SteamButtonAnimated.tsx src/components/react/TrailerPlayer.tsx
git commit -m "refactor: replace arbitrary shadow values with semantic tokens"
```

---

## Task 9: `TrailerSection.astro` — refatorar + corrigir ordem mobile

**Arquivos:**
- Modificar: `src/components/TrailerSection.astro`

**Mudanças:**
- `text-[clamp(3rem,4.5vw,5rem)]` → `text-deco-kanji`
- `min-[1200px]:flex` → `wide:flex`
- `grid-cols-[4fr_7fr]` → `grid-cols-trailer`
- `max-[980px]:grid-cols-1` → `tablet:grid-cols-1`
- `max-[980px]:gap-10` → `tablet:gap-10`
- `text-[clamp(2.8rem,5vw,4.5rem)]` → `text-section-xl`
- `[text-shadow:3px_3px_0_rgba(0,0,0,0.6)]` → `text-shadow-section`
- `max-[980px]:max-w-none` → `tablet:max-w-none`
- **Fix ordem mobile:** remover `max-[980px]:order-2` da coluna de texto e `max-[980px]:order-1` da coluna de vídeo — o fluxo natural do HTML (texto → vídeo) é a ordem correta

- [ ] **Substituir o conteúdo de `src/components/TrailerSection.astro`**

```astro
---
import { TrailerPlayer } from "./react/TrailerPlayer";
---

<section id="trailer" class="relative overflow-hidden pt-36 pb-20">
  <!-- Kanji decorativos -->
  <div
    class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 right-[-0.5vw] flex flex-col gap-1 font-display text-deco-kanji text-white/2.5 leading-none"
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
    class="absolute bottom-6 right-6 font-display text-3xs text-bamboo/20 tracking-ui-hint pointer-events-none select-none hidden wide:flex flex-col items-end gap-0.5"
    aria-hidden="true"
  >
    <span>座標</span>
    <span>00.44 · 12.81</span>
  </div>

  <div class="relative z-10 w-container-page mx-auto">
    <div
      class="grid grid-cols-trailer tablet:grid-cols-1 gap-14 tablet:gap-10 items-center"
    >
      <!-- Coluna de texto — primeiro no HTML = primeiro no mobile -->
      <div class="flex flex-col gap-5">
        <p
          class="font-display text-xs uppercase tracking-ui-caption text-bamboo/75"
        >
          Assista ao Trailer
        </p>
        <h2
          class="font-display text-section-xl text-white text-shadow-section"
        >
          Veja o ritmo<br />
          da lâmina<br />
          <em class="text-bamboo not-italic">em ação.</em>
        </h2>
        <p
          class="text-muted text-lg leading-relaxed max-w-xs tablet:max-w-none"
        >
          Cortes rápidos, pressão constante e upgrades que mudam tudo a cada
          rodada. Cada run é uma nova chance de dominar o caos.
        </p>
        <a
          class="self-start mt-2 flex items-center gap-2 text-bamboo font-display text-sm font-bold uppercase tracking-widest hover:text-white transition-colors duration-200 group"
          href="#gameplay"
        >
          Ver gameplay
          <span
            class="transition-transform duration-200 group-hover:translate-x-1"
            >→</span
          >
        </a>
      </div>

      <!-- Coluna do vídeo — segundo no HTML = segundo no mobile -->
      <div>
        <TrailerPlayer client:visible />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/TrailerSection.astro
git commit -m "feat(trailer): semantic tokens + fix mobile text-before-video order"
```

---

## Task 10: `FeatureGrid.tsx` — refatorar + carousel inline para mobile

**Arquivos:**
- Modificar: `src/components/react/FeatureGrid.tsx`

**Mudanças:**
- `grid-cols-3 max-[768px]:grid-cols-1` → grid apenas no desktop, escondido no mobile
- Adicionar `FeatureCarousel` como função interna (sem novo arquivo para evitar deps circulares)
- Carousel renderizado via CSS hide/show (`phablet:hidden` no grid, `hidden phablet:block` no carousel)
- Importar `animate`, `useMotionValue`, `PanInfo` do Framer Motion
- `features` e `FeatureCard` permanecem no mesmo arquivo, `FeatureCarousel` adicionado abaixo

- [ ] **Substituir o conteúdo de `src/components/react/FeatureGrid.tsx`**

```tsx
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import { ease } from "../../lib/motion";

const features = [
  {
    icon: `${import.meta.env.BASE_URL}images/features_upgrades.png`,
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_inimigos.png`,
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
  },
  {
    icon: `${import.meta.env.BASE_URL}images/features_caos.png`,
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  hovered: {
    y: -4,
    borderColor: "rgba(107,143,94,0.55)",
    backgroundColor: "rgba(107,143,94,0.06)",
    boxShadow: "6px 6px 0 rgba(107,143,94,0.50)",
    transition: { duration: 0.15 },
  },
};

function CornerDecor() {
  return (
    <>
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-bamboo/70 pointer-events-none transition-colors duration-150 group-hover:border-bamboo" />
    </>
  );
}

function FeatureCard({ icon, title, text }: (typeof features)[number]) {
  return (
    <motion.article
      className="group relative border border-bamboo/15 p-9 flex flex-col items-center gap-5 cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(107,143,94,0.04) 100%)",
      }}
      variants={cardVariants}
      whileHover="hovered"
    >
      <CornerDecor />

      <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-black/40 border border-bamboo/15">
        <img
          src={icon}
          alt=""
          width="64"
          height="64"
          aria-hidden="true"
          className="w-16 h-16 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <h3 className="relative z-10 font-display text-3xl text-white text-center leading-tight">
        {title}
      </h3>

      <div className="relative z-10 w-14 h-px bg-bamboo/50" />

      <p className="relative z-10 text-muted text-sm leading-relaxed text-center">
        {text}
      </p>
    </motion.article>
  );
}

function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function getWidth() {
    return containerRef.current?.offsetWidth ?? 320;
  }

  function snapTo(index: number) {
    const clamped = Math.max(0, Math.min(features.length - 1, index));
    animate(x, -(clamped * getWidth()), { duration: 0.35, ease });
    setActive(clamped);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = getWidth() * 0.25;
    if (info.offset.x < -threshold && active < features.length - 1) snapTo(active + 1);
    else if (info.offset.x > threshold && active > 0) snapTo(active - 1);
    else snapTo(active);
  }

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        className="flex"
        drag="x"
        style={{ x }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {features.map((f) => (
          <div key={f.title} className="w-full shrink-0">
            <FeatureCard {...f} />
          </div>
        ))}
      </motion.div>

      <div
        className="flex justify-center gap-2.5 mt-6"
        role="tablist"
        aria-label="Feature navigation"
      >
        {features.map((f, i) => (
          <button
            key={f.title}
            role="tab"
            aria-selected={i === active}
            aria-label={f.title}
            onClick={() => snapTo(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === active ? "bg-bamboo" : "bg-bamboo/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export function FeatureGrid() {
  return (
    <>
      {/* Desktop grid — oculto no phablet */}
      <motion.div
        className="grid grid-cols-3 gap-6 phablet:hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>

      {/* Mobile carousel — oculto no desktop */}
      <div className="hidden phablet:block">
        <FeatureCarousel />
      </div>
    </>
  );
}
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/react/FeatureGrid.tsx
git commit -m "feat(features): add Framer Motion carousel for mobile + semantic tokens"
```

---

## Task 11: `GameplayGridClient.tsx` — refatorar + ordem mobile

**Arquivos:**
- Modificar: `src/components/react/GameplayGridClient.tsx`

**Mudanças:**
- `text-[clamp(1.8rem,3vw,2.8rem)]` → `text-section-md`
- `max-[768px]:grid-cols-1` → `phablet:grid-cols-1`
- `grid-cols-[3fr_5fr]` → `grid-cols-gameplay-even`
- `grid-cols-[5fr_3fr]` → `grid-cols-gameplay-odd`
- **Fix ordem mobile:** adicionar `phablet:order-first` no `textCol` e `phablet:order-last` no `videoCol` para garantir texto antes do vídeo independente de `isEven`

- [ ] **Substituir o conteúdo de `src/components/react/GameplayGridClient.tsx`**

```tsx
import { motion } from "framer-motion";
import { GAMEPLAY_CLIPS, type GameplayClip } from "../../consts";
import { ease } from "../../lib/motion";

const VIDEO_RATIO = "585 / 329";

const clipVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

function makeTextVariants(dir: 1 | -1) {
  return {
    hidden: { opacity: 0, x: -24 * dir },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease, delay: 0.1 } },
  };
}
const textVariants = makeTextVariants(1);
const textVariantsRight = makeTextVariants(-1);

interface ClipRowProps {
  clip: GameplayClip;
  index: number;
}

function ClipRow({ clip, index }: ClipRowProps) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  const videoCol = (
    <motion.div
      className="relative overflow-hidden rounded-xl phablet:order-last"
      variants={clipVariants}
      style={{
        aspectRatio: VIDEO_RATIO,
        boxShadow: "8px 8px 0 rgba(107,143,94,0.15)",
      }}
    >
      <div className="absolute top-3 left-3 z-10 font-display text-3xs tracking-ui-wide uppercase bg-black/60 text-bamboo px-2.5 py-1 rounded backdrop-blur-sm">
        {number} — {clip.eyebrow}
      </div>

      <motion.video
        src={clip.src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="w-full h-full object-cover block"
        style={{
          background: "var(--color-black, #050505)",
          filter: "saturate(1.1) brightness(0.9)",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="relative flex flex-col gap-4 phablet:order-first"
      variants={isEven ? textVariants : textVariantsRight}
    >
      <p className="relative font-display text-xs uppercase tracking-widest text-bamboo/90">
        {clip.eyebrow}
      </p>

      <h3 className="relative font-display text-section-md text-white leading-tight">
        {clip.title}
      </h3>

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
      className={`relative grid phablet:grid-cols-1 gap-12 items-center ${
        isEven ? "grid-cols-gameplay-even" : "grid-cols-gameplay-odd"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {isEven ? (
        <>
          {textCol}
          {videoCol}
        </>
      ) : (
        <>
          {videoCol}
          {textCol}
        </>
      )}
    </motion.div>
  );
}

export function GameplayGridClient() {
  return (
    <div className="flex flex-col">
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

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/react/GameplayGridClient.tsx
git commit -m "feat(gameplay): semantic tokens + force text-before-video on mobile"
```

---

## Task 12: `FinalCTAClient.tsx` — refatorar + bg-left mobile

**Arquivos:**
- Modificar: `src/components/react/FinalCTAClient.tsx`

**Mudanças:**
- `w-[min(1200px,calc(100%-48px))]` → `w-cta-section`
- `max-[768px]:min-h-140` → `phablet:min-h-140`
- `max-[768px]:hidden` → `phablet:hidden`
- `hidden max-[768px]:block` → `hidden phablet:block`
- `max-[768px]:min-h-140` (na div de conteúdo) → `phablet:min-h-140`
- `max-[768px]:hidden` (spacer) → `phablet:hidden`
- `w-[48%]` → `w-cta-col`
- `max-[768px]:w-full` → `phablet:w-full`
- `max-[768px]:px-6` → `phablet:px-6`, `max-[768px]:py-10` → `phablet:py-10`
- **Fix:** no mobile gradient div (já usa `hidden phablet:block`), adicionar `bg-left` ao elemento de background para alinhar imagem à esquerda no mobile

- [ ] **Substituir o conteúdo de `src/components/react/FinalCTAClient.tsx`**

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ease } from "../../lib/motion";
import { SteamButtonAnimated } from "./SteamButtonAnimated";

const BG_75 = "rgba(5,5,5,0.75)";
const BG_96 = "rgba(5,5,5,0.96)";
const BG_25 = "rgba(5,5,5,0.25)";
const BG_90 = "rgba(5,5,5,0.9)";

export function FinalCTAClient() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-28px", "28px"]);

  return (
    <motion.section
      ref={ref}
      className="relative border-t border-bamboo/15 py-20"
    >
      <div className="w-cta-section mx-auto">
        <div className="relative overflow-hidden rounded min-h-120 phablet:min-h-140">
          {/* Background image with parallax */}
          <motion.div
            aria-hidden="true"
            className="absolute bg-cover bg-center phablet:bg-left"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}images/final_cta_background.png')`,
              top: -32,
              left: 0,
              right: 0,
              bottom: -32,
              y: bgY,
            }}
          />

          {/* Desktop gradient: transparent left → dark right */}
          <div
            className="absolute inset-0 phablet:hidden"
            style={{
              background: `linear-gradient(to right, transparent 20%, ${BG_75} 52%, ${BG_96} 100%)`,
            }}
            aria-hidden="true"
          />
          {/* Mobile gradient: transparent top → dark bottom */}
          <div
            className="absolute inset-0 hidden phablet:block"
            style={{
              background: `linear-gradient(to bottom, ${BG_25} 0%, ${BG_90} 55%)`,
            }}
            aria-hidden="true"
          />

          {/* Content row */}
          <div className="relative z-10 flex items-center min-h-120 phablet:min-h-140">
            {/* Spacer — expõe a imagem na esquerda */}
            <div className="flex-1 phablet:hidden" />

            {/* Coluna de conteúdo */}
            <div className="w-cta-col flex flex-col gap-6 px-12 py-16 phablet:w-full phablet:px-6 phablet:py-10">
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
                className="text-muted text-lg leading-relaxed"
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

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/react/FinalCTAClient.tsx
git commit -m "feat(final-cta): semantic tokens + bg-left on mobile"
```

---

## Task 13: `RoninQuote.astro` — refatorar + espaço entre aspas e header

**Arquivos:**
- Modificar: `src/components/RoninQuote.astro`

**Mudanças:**
- `text-[clamp(3rem,4.5vw,5rem)]` → `text-deco-kanji`
- `min-[1200px]:flex` → `wide:flex`
- `font-size: clamp(5rem, 14vw, 9rem)` (inline style) → classe `text-deco-quote`
- `text-[clamp(1.6rem,4vw,3rem)]` → `text-quote`
- `leading-[1.15]` — remover (já incluso no token `text-quote`)
- **Fix:** adicionar `mobile:mt-8` ao `div` do header decorativo para criar espaço abaixo das aspas abertura

- [ ] **Substituir o conteúdo de `src/components/RoninQuote.astro`**

```astro
---

---

<section class="relative py-20 border-t border-bamboo/10 overflow-hidden">
  <!-- Ghost kanjis — esquerda -->
  <div
    class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 left-[-0.5vw] flex-col gap-1 font-display text-deco-kanji text-white/3 leading-none hidden wide:flex"
    aria-hidden="true"
  >
    <span>心</span>
    <span>力</span>
    <span>魂</span>
    <span>命</span>
    <span>夢</span>
    <span>道</span>
  </div>

  <div
    class="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(13,26,15,0.4)_0%,transparent_100%)] pointer-events-none"
    aria-hidden="true"
  >
  </div>
  <div class="w-container-narrow mx-auto text-center relative">
    <!-- Aspas decorativas abertura -->
    <span
      class="absolute -top-4 left-0 font-display leading-none text-bamboo/20 select-none pointer-events-none text-deco-quote"
      aria-hidden="true">"</span
    >

    <!-- Linha decorativa superior — mobile:mt-8 cria espaço abaixo das aspas -->
    <div class="flex items-center gap-4 mb-10 justify-center mobile:mt-8">
      <div class="h-px w-12 bg-bamboo/30"></div>
      <span
        class="font-display text-sm tracking-ui-hero uppercase text-bamboo/50"
        >O Caminho do Ronin</span
      >
      <div class="h-px w-12 bg-bamboo/30"></div>
    </div>

    <blockquote class="relative z-10">
      <p
        class="font-display text-quote text-white tracking-tight"
      >
        Mesmo ao falhar,<br />
        você volta mais forte —<br />
        <em class="text-bamboo not-italic">como um verdadeiro Ronin.</em>
      </p>
    </blockquote>

    <!-- Aspas decorativas fechamento -->
    <span
      class="absolute -bottom-10 right-0 font-display leading-none text-bamboo/20 select-none pointer-events-none text-deco-quote"
      aria-hidden="true">"</span
    >

    <!-- Linha decorativa inferior -->
    <div class="flex items-center gap-4 mt-10 justify-center">
      <div class="h-px w-20 bg-bamboo/20"></div>
      <div class="w-1 h-1 rounded-full bg-bamboo/40"></div>
      <div class="h-px w-20 bg-bamboo/20"></div>
    </div>
  </div>
</section>
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/RoninQuote.astro
git commit -m "feat(ronin-quote): semantic tokens + mobile spacing fix for quote overlap"
```

---

## Task 14: `Footer.astro` — refatorar + centralizar colunas no mobile

**Arquivos:**
- Modificar: `src/components/Footer.astro`

**Mudanças:**
- `max-[980px]:grid-cols-2` → `tablet:grid-cols-2`
- `max-[640px]:grid-cols-1` → `mobile:grid-cols-1`
- `max-[980px]:mt-2` → `tablet:mt-2`
- `max-[640px]:flex-col` → `mobile:flex-col`, `max-[640px]:gap-2` → `mobile:gap-2`
- **Fix:** coluna Navegação (col 2): adicionar `mobile:items-center mobile:text-center`
- **Fix:** coluna Redes (col 3): adicionar `mobile:items-center`

- [ ] **Substituir o conteúdo de `src/components/Footer.astro`**

```astro
---
import { GAME } from "../consts";
import { SteamButtonAnimated } from "./react/SteamButtonAnimated";

const STEAM_DEVELOPER_URL =
  "https://store.steampowered.com/search/?developer=RDB%27s+Studio";
const ITCHIO_URL = "https://rdb-studio.itch.io/";
const INSTAGRAM_URL = "https://www.instagram.com/rdbs_studio/";
const YOUTUBE_URL = "https://www.youtube.com/@RDBsStudios";
---

<footer class="border-t border-bamboo/20 bg-black/80 py-12">
  <div class="w-container-page mx-auto">
    <div
      class="grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 items-start"
    >
      <!-- Col 1: Identity -->
      <div class="flex flex-col gap-4 items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}logos/logo_byrdronin.png`}
          alt="Byrd Ronin"
          class="w-full max-w-48 h-auto"
          loading="lazy"
        />
        <img
          src={`${import.meta.env.BASE_URL}logos/logo_rdbstudios.png`}
          alt="RDB's Studio"
          class="w-full max-w-40 h-auto"
          loading="lazy"
        />
      </div>

      <!-- Col 2: Site Map -->
      <nav
        class="flex flex-col gap-1 tablet:mt-2 mobile:items-center mobile:text-center"
        aria-label="Footer navigation"
      >
        <p
          class="text-2xs font-display tracking-ui-label uppercase text-bamboo/50 mb-2"
        >
          Navegação
        </p>
        {
          (
            [
              ["#top", "Início"],
              ["#trailer", "Trailer"],
              ["#features", "Features"],
              ["#gameplay", "Gameplay"],
            ] as const
          ).map(([href, label]) => (
            <a
              href={href}
              class="group flex items-center gap-2 py-1 text-muted font-display text-base tracking-ui-tight hover:text-bamboo transition-colors duration-200"
            >
              <span class="w-3 h-px bg-muted/30 group-hover:bg-bamboo/60 group-hover:w-5 transition-all duration-200 inline-block" />
              {label}
            </a>
          ))
        }
      </nav>

      <!-- Col 3: Studio & Social -->
      <div class="flex flex-col gap-2 mobile:items-center">
        <p
          class="text-2xs font-display tracking-ui-label uppercase text-bamboo/50 mb-2"
        >
          Redes
        </p>
        <!-- Instagram -->
        <a
          href={INSTAGRAM_URL}
          class="py-1 inline-flex items-center gap-3 text-muted font-display text-base tracking-ui-tight hover:text-bamboo"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/instagram_icon.svg`}
            width="20"
            height="20"
            alt=""
            aria-hidden="true"
            class="w-5 h-5 object-contain shrink-0"
          />
          <span class="font-display text-sm tracking-wide">Instagram</span>
        </a>

        <!-- YouTube -->
        <a
          href={YOUTUBE_URL}
          class="py-1 inline-flex items-center gap-3 text-muted font-display text-base tracking-ui-tight hover:text-bamboo"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/youtube_icon.svg`}
            width="20"
            height="20"
            alt=""
            aria-hidden="true"
            class="w-5 h-5 object-contain shrink-0"
          />
          <span class="font-display text-sm tracking-wide">YouTube</span>
        </a>

        <!-- Steam Developer -->
        <a
          href={STEAM_DEVELOPER_URL}
          class="py-1 inline-flex items-center gap-3 text-muted font-display text-base tracking-ui-tight hover:text-bamboo"
          aria-label="Steam — Página do desenvolvedor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/steam_icon.svg`}
            width="20"
            height="20"
            alt=""
            aria-hidden="true"
            class="w-5 h-5 object-contain shrink-0"
          />
          <span class="font-display text-sm tracking-wide">Steam</span>
        </a>

        <!-- itch.io -->
        <a
          href={ITCHIO_URL}
          class="py-1 inline-flex items-center gap-3 text-muted font-display text-base tracking-ui-tight hover:text-bamboo"
          aria-label="itch.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${import.meta.env.BASE_URL}icons/itchio_icon.svg`}
            width="20"
            height="20"
            alt=""
            aria-hidden="true"
            class="w-5 h-5 object-contain shrink-0"
          />
          <span class="font-display text-sm tracking-wide">itch.io</span>
        </a>
      </div>

      <!-- Col 4: CTA -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <p
            class="text-2xs font-display tracking-ui-label uppercase text-bamboo/50"
          >
            Jogar
          </p>
          <p class="text-muted/75 text-base leading-snug font-body">
            Comece sua jornada como o pássaro Ronin. Disponível agora na Steam
          </p>
        </div>
        <SteamButtonAnimated
          label="JOGAR AGORA"
          event="steam_cta_footer_click"
          client:visible
        />
      </div>
    </div>
  </div>

  <!-- Copyright -->
  <div class="border-t border-bamboo/10 mt-10 pt-6">
    <div
      class="w-container-page mx-auto flex items-center justify-center mobile:flex-col mobile:gap-2"
    >
      <p class="m-0 text-2xs text-muted/35 font-body">
        © {new Date().getFullYear()}
        {GAME.title} · {GAME.developer}. Todos os direitos reservados.
      </p>
    </div>
  </div>
</footer>
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(footer): semantic tokens + center nav/social columns on mobile"
```

---

## Task 15: `404.astro` — refatorar breakpoints e font-size

**Arquivos:**
- Modificar: `src/pages/404.astro`

**Mudanças:**
- `max-[640px]:px-5` → `mobile:px-5`
- `max-[640px]:w-20` → `mobile:w-20`
- `style="font-size: clamp(96px, 20vw, 200px); text-shadow: ..."` → classes `text-display-404 text-shadow-404`
- `max-[640px]:text-lg` → `mobile:text-lg`

- [ ] **Ler o arquivo para localizar as linhas exatas**

```bash
# Verificar linha com style inline do 404
grep -n "clamp\|max-\[640" src/pages/404.astro
```

- [ ] **Aplicar substituições em `src/pages/404.astro`**

Linha com `max-[640px]:px-5`:
```astro
<!-- antes -->
<header class="relative z-10 px-8 py-6 max-[640px]:px-5">
<!-- depois -->
<header class="relative z-10 px-8 py-6 mobile:px-5">
```

Linha com `max-[640px]:w-20`:
```astro
<!-- antes -->
          class="w-28 max-[640px]:w-20 h-auto"
<!-- depois -->
          class="w-28 mobile:w-20 h-auto"
```

Elemento com style inline de font-size + text-shadow (remover `style=` e adicionar classes):
```astro
<!-- antes -->
        style="font-size: clamp(96px, 20vw, 200px); text-shadow: 6px 6px 0 rgba(0,0,0,0.7), 0 0 80px rgba(255,59,46,0.25);"
<!-- depois -->
        class="text-display-404 text-shadow-404"
```

Linha com `max-[640px]:text-lg`:
```astro
<!-- antes -->
      <p class="font-display text-white text-xl max-[640px]:text-lg">
<!-- depois -->
      <p class="font-display text-white text-xl mobile:text-lg">
```

- [ ] **Verificar build**

```bash
pnpm build
```

- [ ] **Commit**

```bash
git add src/pages/404.astro
git commit -m "refactor(404): replace arbitrary values with semantic tokens"
```

---

## Task 16: Verificação final e push

**Arquivos:** nenhum

- [ ] **Build limpo**

```bash
pnpm build
```

Expected: Build concluído sem warnings ou erros.

- [ ] **Confirmar que não há valores arbitrários restantes**

```bash
grep -rn "max-\[" src/ --include="*.astro" --include="*.tsx"
grep -rn "min-\[" src/ --include="*.astro" --include="*.tsx"
grep -rn "text-\[clamp" src/ --include="*.astro" --include="*.tsx"
grep -rn "grid-cols-\[" src/ --include="*.astro" --include="*.tsx"
grep -rn "w-\[min(" src/ --include="*.astro" --include="*.tsx"
grep -rn "\[text-shadow" src/ --include="*.astro" --include="*.tsx"
grep -rn "shadow-\[" src/ --include="*.astro" --include="*.tsx"
grep -rn "drop-shadow-\[" src/ --include="*.astro" --include="*.tsx"
```

Expected: todos os comandos sem output.

- [ ] **Commit do plano**

```bash
git add docs/plans/2026-05-27-mobile-polish.md
git commit -m "docs: add mobile polish implementation plan"
```

---

## Self-review do plano

**Cobertura do spec:**
- ✅ tailwind.config.js — screens, fontSize, width, gridTemplateColumns, zIndex, boxShadow, dropShadow
- ✅ global.css — text-shadow utilities
- ✅ Navbar — grid 3-col, fundo menu, remoção CTA do menu expandido
- ✅ Hero — opacidade personagem
- ✅ SteamWidget — posicionamento mobile, padding
- ✅ Trailer — ordem texto→vídeo
- ✅ Features — carousel Framer Motion com dots
- ✅ Gameplay — ordem texto→vídeo mobile
- ✅ RoninQuote — sobreposição aspas/header
- ✅ FinalCTA — bg-left mobile
- ✅ Footer — centralização nav/social
- ✅ 404 — refatoração breakpoints

**Sem placeholders:** todas as tasks têm código completo.

**Consistência de tipos:** `PanInfo` importado de `framer-motion` no Task 10; `FeatureCard` e `features` definidos e usados no mesmo arquivo.
