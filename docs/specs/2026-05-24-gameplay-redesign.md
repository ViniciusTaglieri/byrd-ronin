# Spec: Gameplay Section Redesign + Background Unification

**Date:** 2026-05-24  
**Scope:** GameplayGrid, FeaturesSection, TrailerSection (background only)

---

## Goal

Redesign the gameplay section to present each clip individually with an alternating text+video layout, add descriptive gameplay copy, remove the blue background (`bg-ink`), and unify the visual background across the Trailer → Features → Gameplay strip using a progressive forest→black gradient.

---

## Background Unification (Opção A — Progressive tonal shift)

Each section carries its own background tone. No shared wrapper needed.

| Section | Current | New | Notes |
|---|---|---|---|
| TrailerSection | `bg-forest` | `bg-forest` (unchanged) | Add subtle bottom fade overlay |
| FeaturesSection | `bg-black` | `bg-[#070b07]` | Remove `border-t border-bamboo/15` |
| GameplayGrid | `bg-ink` | `bg-black` | Remove `border-t border-bamboo/15` |

The sequence reads: dark green → near-black green → pure black, creating a seamless visual progression without borders.

---

## GameplayGrid — New Structure

### Section Header (unchanged, minor tweaks)
- Eyebrow label: `Veja a Ação`
- Headline: `Beats de gameplay para decisões rápidas.`
- Centered, `max-w-2xl`

### Intro Text Block (new)
Full-width centered block (`max-w-3xl mx-auto`), placed between header and clips.

> O combate em Byrd Ronin é rápido, agressivo e recompensador.
> Sobreviver significa atacar e contra-atacar no momento certo, desviar com precisão e manter o fluxo do combate que é tão importante quanto causar dano.
>
> Seu combo cresce a medida que o caos se intensifica, seguir no controle é o único caminho, pois, sem ele é o mesmo que perder a run.

### Clip 1 — Text left / Video right
Layout: `grid grid-cols-[5fr_7fr]`, gap-12, items-center.

- **Eyebrow badge:** `Mobilidade & Combate`
- **Number decoration:** `01` — large font-display, very low opacity (`text-white/[0.04]`), absolute positioned behind text
- **Title:** `Cortes em alta velocidade`
- **Body text:**
  > Mobilidade é parte central da experiência.
  > Dash, posicionamento e timing definem como você atravessa o campo de batalha e lida com o perigo constante.
  >
  > Cada escolha muda o ritmo da luta — avançar, recuar ou insistir pode ser a diferença entre sobreviver ou cair.
- **Video:** `/gameplay1.webm` — rounded-xl, no card wrapper, dark background, hover scale(1.01)
- **HUD badge overlay:** small absolute label on video top-left corner (`01 — Mobilidade`)

### Divider
`<hr>` with `border-bamboo/20`, `my-16`

### Clip 2 — Video left / Text right
Layout: `grid grid-cols-[7fr_5fr]`, gap-12, items-center. (video column first)

- **Eyebrow badge:** `Evolução & Roguelike`
- **Number decoration:** `02` — same treatment as above
- **Title:** `Sobrevivendo à pressão inimiga`
- **Body text:**
  > Cada run é uma oportunidade de evolução.
  > Desbloqueie upgrades, habilidades e ferramentas que alteram a forma de jogar. Efeitos se combinam, estilos emergem e nenhuma tentativa é igual à anterior.
- **Video:** `/gameplay2.webm` — same treatment as clip 1
- **HUD badge overlay:** `02 — Evolução`

### Closing Statement (new)
Full-width centered line, font-display, `text-bamboo`, separated by `mt-16`.

> Mesmo ao falhar, você volta mais forte — como um verdadeiro Ronin.

---

## UI Improvements — GameplayGrid

1. **Number decorations:** `01` / `02` as absolute background text behind each clip's text column. `font-display`, `text-[clamp(6rem,18vw,14rem)]`, `text-white/[0.04]`, positioned so it doesn't interfere with readability.

2. **HUD badge overlay on video:** Small absolute chip on top-left of each video — `font-display text-[9px] tracking-widest uppercase bg-black/60 text-bamboo px-2 py-1 rounded`. Acts like a game HUD label.

3. **Video hover:** `transition-transform duration-300`, `hover:scale-[1.01]` on the video wrapper. Remove `bg-panel` card background — video sits directly on section background.

4. **Section background:** Pure black (`bg-black`), no blue tint.

5. **Closing statement:** Styled with a thin `border-t border-bamboo/20` above it and centered text. Font-display, italic-like style (`<em>`), `text-bamboo`.

6. **Responsive:** Below 768px, clips stack vertically (video above text). Number decorations hidden on mobile. Alternation collapses to single column.

---

## Files to Change

| File | Changes |
|---|---|
| `src/components/GameplayGrid.astro` | Full restructure with new layout, text blocks, divider, closing statement |
| `src/components/react/GameplayGridClient.tsx` | Rewrite to alternating layout with individual clip components |
| `src/components/FeaturesSection.astro` | `bg-black` → `bg-[#070b07]`, remove `border-t` |
| `src/consts.ts` | Add per-clip text fields to `GameplayClip` interface and `GAMEPLAY_CLIPS` data |

---

## Out of Scope

- TrailerSection content/layout changes
- FinalCTA changes
- Adding new video clips
