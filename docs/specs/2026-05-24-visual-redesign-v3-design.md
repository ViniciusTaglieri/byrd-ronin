# Visual Redesign v3 — Design Spec

**Branch:** `improve-ui`  
**Date:** 2026-05-24  
**Approach:** B — Redesign Dirigido

---

## 1. Hero Section

**Files:** `src/components/HeroSection.astro`, `src/components/react/HeroAnimations.tsx`

- Grid `50/50` centrado dentro do container de 1160px: `grid-cols-[1fr_1fr]`
- Coluna esquerda: copy completa (badge, h1, descrição, CTAs)
- Coluna direita: personagem com `position: relative`, sem overflow negativo. Imagem ocupa a coluna com `object-fit: contain` alinhado ao fundo
- Mobile: coluna única, personagem acima do copy
- Floating animation `y: [0,-14,0]` permanece
- `FallingLeaves` **removido** daqui (movido para BaseLayout)

---

## 2. Navbar

**File:** `src/components/react/NavbarClient.tsx`

- `rootMargin` do `IntersectionObserver` muda de `"-35% 0px -35% 0px"` para `"-50% 0px -50% 0px"`
- Isso faz o active state mudar quando a seção cruza exatamente o meio da viewport
- Nenhuma outra alteração na navbar

---

## 3. Trailer Section

**Files:** `src/components/TrailerSection.astro`, `src/components/react/TrailerPlayer.tsx`

### Layout
- Proporção das colunas: `grid-cols-[7fr_4fr]` (vídeo dominante, texto de apoio)
- Hoje é `5fr_6fr` — inverte a hierarquia visual

### Player hover
- Remove `boxShadow` com glow azul e sombra sólida dourada do `whileHover`
- Substitui por `filter: brightness(1.05)` no vídeo — sutil, sem efeito neon

### Controles do vídeo preview
- `<video>` do thumbnail ganha `controls` visíveis no hover via CSS (`hover:[&_video]:opacity-100` nos controles nativos)
- Usuário pode pausar/dar play no preview local antes de abrir o YouTube

### Background decorativo
- Remove `<p>` com texto "RONIN" fantasma
- Substitui por `<svg>` com 6 kanji empilhados verticalmente: `忍 侍 剣 道 竹 波`
  - `fill: white`, `opacity: 0.025`, fonte display, posicionado no canto direito
- Elementos de HUD pixel art adicionados:
  - Duas linhas horizontais finas (`h-px bg-bamboo/8`) ao longo da seção
  - Bloco de coordenadas falsas em fonte display tiny no canto inferior direito fora do container: `座標 / 00.44 · 12.81` em `text-bamboo/20 text-[9px]`

---

## 4. Features Section

**Files:** `src/components/FeaturesSection.astro`, `src/components/react/FeatureGrid.tsx`

### Título
- De: "Cada run pede timing mais afiado."
- Para: **"Domine cada run."**

### Layout — faixas horizontais
- Abandona os 3 cards arredondados
- 3 faixas horizontais separadas por `border-b border-bamboo/15`
- Grid interno por faixa: `grid-cols-[40px_1fr_2fr]` — ícone | título | descrição
- Alinhamento `items-center`, padding `py-8`

### Ícones
- Usa imagens PNG do `/public`: `features_upgrades.png`, `features_inimigos.png`, `features_caos.png`
- Renderizadas em `40×40px` com `image-rendering: pixelated`
- Sem números 01/02/03

### Hover
- `background` vai de transparente para `rgba(107,143,94,0.04)` no hover
- Sem lift, sem shadow, sem glow
- `border-radius: 2px` no hover state

---

## 5. Gameplay Section

**Files:** `src/components/GameplayGrid.astro`

### Título
- De: "Beats de gameplay para decisões rápidas."
- Para: **"Corte. Avance. Repita."**

### Remoções
- Bloco de intro text (dois parágrafos longos) **removido**
- Eyebrow "Veja a Ação" permanece acima do título

### Proporção dos ClipRows
- Coluna de texto: `3fr`, coluna de vídeo: `5fr`
- Vídeos dominam visualmente cada linha

---

## 6. Footer

**File:** `src/components/Footer.astro`

- Ícone do itch.io: substitui o `<svg>` inline (path incorreto) por `<img src="/itchio-logo-textless-white.svg" width="16" height="16">`
- Usa o arquivo já existente em `/public/itchio-logo-textless-white.svg`

---

## 7. Site-wide

### FallingLeaves
- Movido de `HeroSection.astro` para `BaseLayout.astro`
- `mode="ambient"`, `count={16}`, `client:load`
- Cobre toda a página

### Background por seção
- Gradientes CSS sutis por seção baseados na paleta existente (`forest`, `black`, `ink`)
- Sem imagens de background novas

### Elementos decorativos (telas > 1400px)
- Componente `BambooDecor.tsx` (já existe) posicionado como `absolute` fora do container em seções chave (hero, features, final CTA)
- Visível apenas via `hidden min-[1400px]:block`
- Shuriken SVG com rotação lenta (`animation: spin 8s linear infinite`), `opacity-[0.06]`
- Silhueta de katana inclinada em SVG, `opacity-[0.06]`
- Ambos fora do container, nas laterais da página

### Border-radius global
- `rounded-2xl` → `rounded` (2px) em badges, labels, divisores
- `rounded-2xl` → `rounded-sm` (4px) em cards, containers de vídeo, nav links
- Botão Steam mantém `rounded-md` (6px) — elemento de ação principal
- Botão secundário "Assistir Trailer" → `rounded-sm` (4px)

### Micro-animações
- `FeaturesSection` header: `whileInView` fade+slide-up (consistente com padrão existente)
- `GameplayGrid` header: idem
- Padrão: `opacity: 0 → 1`, `y: 24 → 0`, `duration: 0.55`, `viewport: { once: true }`

---

## Arquivos a modificar

| Arquivo | Tipo de mudança |
|---|---|
| `src/layouts/BaseLayout.astro` | Adicionar FallingLeaves |
| `src/components/HeroSection.astro` | Remover FallingLeaves, ajustar grid |
| `src/components/react/HeroAnimations.tsx` | Corrigir HeroCharacter (sem overflow negativo) |
| `src/components/react/NavbarClient.tsx` | Fix rootMargin scroll spy |
| `src/components/TrailerSection.astro` | Grid 7fr/4fr, kanji SVG, HUD elements |
| `src/components/react/TrailerPlayer.tsx` | Remover hover glow, adicionar controles |
| `src/components/FeaturesSection.astro` | Novo título |
| `src/components/react/FeatureGrid.tsx` | Novo layout em faixas horizontais |
| `src/components/GameplayGrid.astro` | Novo título, remover intro text, ajustar proporções |
| `src/components/Footer.astro` | Fix itch.io icon |
| Novo: `src/components/react/WideScreenDecor.tsx` | Shuriken + katana SVG para telas largas |
