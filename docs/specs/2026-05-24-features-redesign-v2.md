# Features Section Redesign v2 — Placa Pendurada

**Date:** 2026-05-24  
**Status:** Approved  
**Replaces:** `2026-05-24-features-redesign.md`

## Overview

Redesign completo dos cards da seção Features. Abandona as imagens de gameplay, CRT filters e clip-path. Adota o conceito de "placa de madeira pendurada" com ícones pixel art temáticos (katana, máscara oni, shurikens), decoração de bambu nas laterais, shuriken giratório no canto, e animação de swing no hover. Card central (Inimigos) é mais alto e em destaque. Título não é repetido — apenas `h3`, sem badge duplicado.

## Layout

**Grid:** 3 colunas, `items-end`.  
- Cards laterais (Upgrades, Caos): `height: 380px`  
- Card central (Inimigos, `featured: true`): `height: 480px`  
- Mobile (`< 980px`): coluna única, `height: auto`

**Ordem:** Upgrades → Inimigos → Caos

## Card Structure

```
     ●         ●         ← furos pixel art (SVG, absolute top-center)
┌─────────────────────┐  ← border: 2px solid #3d2509
│                 [✦] │  ← shuriken decorativo (absolute top-right)
│                     │
│      [ ÍCONE ]      │  ← SVG pixel art 96×96, centralizado, cor temática
│                     │
│ ─────────────────── │  ← separador 1px rgba(255,255,255,0.08)
│      Título         │  ← h3 font-display, cor branca (ÚNICO lugar do título)
│      texto...       │  ← p text-muted, body font
│                     │
│  🎋             🎋  │  ← hastes de bambu (absolute bottom, aparecem no hover)
└─────────────────────┘
```

**Card central (featured):** furos 10×10px (vs 8×8px nos laterais), espaçamento de furo levemente maior, `box-shadow` extra para mais peso visual.

## Visual: Textura de Madeira

**Background (CSS):**
```css
background: repeating-linear-gradient(
  168deg,
  #5c3d1e 0px, #6b4826 2px, #7a5530 4px,
  #5c3d1e 7px, #6b4826 9px, #5c3d1e 12px
);
```

**Borda e profundidade:**
```css
border: 2px solid #3d2509;
box-shadow: 2px 4px 0 #2a1a05, 0 8px 24px rgba(0,0,0,0.5);
```
O `box-shadow` sólido 2×4px simula espessura de madeira.  
Card featured: adiciona `0 12px 40px rgba(0,0,0,0.6)` ao shadow.

**Border-radius:** `4px` (canto levemente arredondado, madeira rústica).

## Ícones Pixel Art (96×96px)

Todos com `viewBox="0 0 32 32"`, `shapeRendering="crispEdges"`, `fill="currentColor"`.

### Katana — Upgrades (`accentColor: #bfb52c`, gold)
Lâmina longa na diagonal (inferior-esquerda → superior-direita), tsuba (guarda) circular no terço inferior, cabo com fita.

### Máscara Oni — Inimigos (`accentColor: #49c2f2`, blue-light)
Rosto oval com dois chifres no topo, olhos grandes iluminados (retângulos brilhantes), boca aberta com dentes. Referência ao visual do jogo.

### Shurikens — Caos (`accentColor: #f21313`, red)
Três shurikens em formação triangular (grande no centro, dois menores no entorno), linhas de movimento pixel art (traços curtos) ao redor indicando rotação.

## Elementos Decorativos

### Furos no Topo
Dois `<circle>`-equivalentes SVG (retângulos 8×8px arredondados), `fill="#1a0d00"`, `stroke="#2a1a05"`. Posição `absolute`, top `-4px`, distribuídos horizontalmente. Card featured usa 10×10px.

### Shuriken Decorativo (canto superior-direito)
SVG pixel art 20×20px. `position: absolute`, `top: 10px`, `right: 10px`. Cor: `accentColor` com `opacity: 0.4` em repouso.

### Hastes de Bambu (laterais)
Dois SVGs estreitos (12×64px) com segmentos de bambu pixel art — retângulos verdes alternando `#4a7c3f` e `#3d6633`, com nós (`#2d4d27`) entre segmentos. Posição: `absolute bottom-0 left-3` e `absolute bottom-0 right-3`. Em repouso: `opacity: 0, y: 16`. No hover: `opacity: 1, y: 0`.

## Animações

### Entrada na Viewport (framer-motion)
Container: `staggerChildren: 0.15, delayChildren: 0.05`.
- Cards laterais: `hidden: { opacity: 0, y: 40 }` → `visible: { opacity: 1, y: 0, duration: 0.55 }`
- Card central: `hidden: { opacity: 0, y: 20 }` → `visible: { opacity: 1, y: 0, duration: 0.55 }`

### Hover — Swing da Placa
`motion.article` com `whileHover`:
```js
rotate: [-1.5, 1, -0.4, 0],
transition: { type: "spring", stiffness: 280, damping: 12 }
```
Balanço rápido que amorece, como placa pendurada.

### Hover — Shuriken Giratório
`motion.div` do shuriken decorativo no hover:
```js
rotate: 360,
opacity: 0.9,
transition: { duration: 0.6, ease: "linear" }
```

### Hover — Bambu
`motion.div` de cada haste via variant `hover`:
```js
opacity: 1, y: 0,
transition: { type: "spring", stiffness: 200, damping: 20 }
```

### Hover — Ícone Principal
```js
scale: 1.08,
transition: { type: "spring", stiffness: 300, damping: 15 }
```

## Variants Strategy

Usar três estados nomeados: `hidden`, `visible`, `hover`. O `motion.article` define `initial="hidden"`, responde ao container `whileInView="visible"`, e tem `whileHover="hover"`. Todos os filhos animados (`motion.div` do shuriken, bambu, ícone) definem os três estados para receber propagação correta do framer-motion.

## Data Shape

```ts
const features = [
  {
    title: "Upgrades",
    text: "Monte sua run com upgrades que mudam como você corta, sobrevive e domina cada onda.",
    accentColor: "#bfb52c",
    Icon: KatanaIcon,
    featured: false,
  },
  {
    title: "Inimigos",
    text: "Enfrente inimigos agressivos que forçam movimento, timing e decisões rápidas.",
    accentColor: "#49c2f2",
    Icon: OniMaskIcon,
    featured: true,
  },
  {
    title: "Caos",
    text: "Corte bambus, esquive da pressão e mantenha o momentum enquanto a tela vira caos controlado.",
    accentColor: "#f21313",
    Icon: ShurikenChaosIcon,
    featured: false,
  },
] as const;
```

## Files Changed

| File | Ação |
|------|------|
| `src/components/react/FeatureGrid.tsx` | Rewrite completo |
| `src/components/react/FeatureIcons.tsx` | Recriar com KatanaIcon, OniMaskIcon, ShurikenChaosIcon, ShurikenSmallIcon, BambooStalk |
| `src/components/FeaturesSection.astro` | Sem alteração |

## Assets

As imagens `features_*.png` não são mais usadas neste design. Permanecem em `/public/` mas não são referenciadas.
