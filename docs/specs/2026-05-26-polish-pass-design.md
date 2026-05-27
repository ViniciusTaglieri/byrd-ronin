# Polish Pass — Byrd Ronin Landing Page

**Date:** 2026-05-26  
**Branch:** improve-ui  
**Goal:** Elevar a qualidade visual do site de "funcional" para "pronto para lançamento", com foco nos Feature Cards, correção do TrailerPlayer e polish global de hierarquia, espaçamento e SEO.

---

## Escopo

Quatro áreas de trabalho independentes, em ordem de prioridade:

1. TrailerPlayer → vídeo MP4 local
2. Feature Cards → redesign visual
3. GameplayGrid → hierarquia e peso visual
4. Polish global → espaçamento, transições, SEO

---

## 1. TrailerPlayer — Cleanup de Atributos

**Arquivo:** `src/components/react/TrailerPlayer.tsx`

### Contexto
O componente já usa `/videos/trailer.mp4` corretamente. O que precisa de ajuste são os atributos do `<video>` e o filtro CSS.

### O que muda
- Remover `autoPlay` e `loop` — um trailer com `controls` não deve tocar sozinho nem repetir
- Adicionar `preload="none"` — evita download do vídeo no carregamento da página
- Ajustar o filtro CSS: `brightness(0.65)` está muito escuro, alterar para `brightness(0.92) saturate(1.1)`
- O `poster` atual usa `hero_bg.png`; manter ou substituir por um frame dedicado se disponível

### O que não muda
- Layout da seção TrailerSection (texto à esquerda, vídeo à direita)
- Wrapper com borda, sombra pixel offset e animação Framer Motion
- Proporções e breakpoints responsivos

---

## 2. Feature Cards — Redesign Visual

**Arquivo:** `src/components/react/FeatureGrid.tsx`

### Problema
Cards pequenos, baixo contraste com o fundo da página, hover sutil demais, sem presença visual.

### O que muda

**Tamanho e espaçamento:**
- Padding interno: `p-7` → `p-9`
- Container do ícone: `w-16 h-16` → `w-20 h-20`
- Ícone: `w-12 h-12` → `w-16 h-16`
- Título: `text-2xl` → `text-3xl`
- Separador horizontal: `w-10` → `w-14`, opacidade `bg-bamboo/35` → `bg-bamboo/50`

**Background do card:**
- Adicionar gradiente sutil diagonal: `background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(107,143,94,0.04) 100%)`
- Mantém a borda `border-bamboo/15` existente

**CornerDecor:**
- Tamanho: `w-3 h-3` → `w-4 h-4`
- Opacidade: `border-bamboo/50` → `border-bamboo/70`
- No hover, transicionar para `border-bamboo/100`

**Hover (whileHover="hovered"):**
- Manter `y: -4`
- Adicionar `backgroundColor: "rgba(107,143,94,0.06)"` para inner glow sutil
- Box shadow mais pronunciado: `6px 6px 0 rgba(107,143,94,0.50)`

### O que não muda
- Conteúdo (textos e ícones são finais)
- Grid de 3 colunas com breakpoint `max-[768px]:grid-cols-1`
- Animações de entrada com Framer Motion (`staggerChildren`, `whileInView`)

---

## 3. GameplayGrid — Hierarquia Visual

**Arquivo:** `src/components/react/GameplayGridClient.tsx`

### Problema
Blocos texto+imagem parecem planos — sem tensão visual entre linhas, eyebrows somem no fundo escuro, imagens flutuam sem peso.

### O que muda

**Imagens de gameplay:**
- Adicionar `box-shadow: 8px 8px 0 rgba(107,143,94,0.15)` nas imagens (pixel offset, consistente com o design system)

**Eyebrow de cada bloco** ("Mobilidade & Combate", "Evolução & Desafio"):
- Aumentar `letter-spacing` para `tracking-widest`
- Aumentar opacidade de `bamboo/75` para `bamboo/90`

**Título de cada bloco:**
- Crescer levemente: verificar tamanho atual e subir um step (ex: `text-2xl` → `text-3xl`, ajustar conforme o que estiver definido)

**Separador entre blocos:**
- Já existe `<hr className="border-bamboo/20 my-16" />` entre os clips — está correto, não alterar

### O que não muda
- Layout alternado texto esquerda/direita
- Conteúdo (GIFs são finais)
- Animações existentes

---

## 4. Polish Global — Espaçamento, Transições e SEO

### 4a. Espaçamento entre seções

**Arquivo:** múltiplos `.astro`

- Auditar `py-*` de cada seção: `TrailerSection`, `FeaturesSection`, `GameplayGrid`, `RoninQuote`, `FinalCTA`
- Padronizar seções principais para `py-20` (de `py-8` inconsistente)
- `RoninQuote`: adicionar `border-t border-bamboo/10` + `py-20`

### 4b. SlashDivider

**Arquivo:** `src/components/react/SlashDivider.tsx`

- Verificar se o componente está sendo usado em `index.astro`
- Ativar nos pontos de transição: Hero→Trailer e Features→Gameplay

### 4c. FinalCTA

**Arquivo:** `src/components/FinalCTA.astro` ou `src/components/react/FinalCTAClient.tsx`

- Verificar tamanho do `SteamButtonAnimated` na seção — garantir que usa variante `lg` ou equivalente
- O botão deve ser o elemento de maior destaque visual da seção

### 4d. SEO / Open Graph

**Arquivo:** `src/layouts/BaseLayout.astro`

Adicionar no `<head>`:

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Byrd Ronin — Slice Through Chaos" />
<meta property="og:description" content="Action roguelite 2D pixel art. Cada corte, upgrade e onda de inimigos empurra sua run mais fundo no caos do bambu. R$ 9,99 na Steam." />
<meta property="og:image" content="/images/og_image.jpg" />
<meta property="og:url" content="https://byrdronin.com" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Byrd Ronin — Slice Through Chaos" />
<meta name="twitter:description" content="Action roguelite 2D pixel art. Disponível agora na Steam por R$ 9,99." />
<meta name="twitter:image" content="/images/og_image.jpg" />
```

**Asset necessário:** `/public/images/og_image.jpg` — imagem 1200×630px, idealmente a arte do hero ou da FinalCTA. Se não existir, documentar como pendência de asset.

---

## Ordem de Execução

1. TrailerPlayer (isolado, sem risco)
2. Feature Cards (maior impacto visual, arquivo único)
3. GameplayGrid (hierarquia visual)
4. Polish global (espaçamento + SlashDivider + FinalCTA + SEO)

---

## Critério de "Pronto"

- Trailer reproduz via MP4 local sem erros no console
- Feature Cards têm presença visual clara, hover pronunciado, ícones maiores
- GameplayGrid tem ritmo visual entre blocos, imagens com peso
- Todas as seções com espaçamento consistente (`py-20`)
- Tags OG/Twitter presentes no `<head>` do HTML gerado
- Nenhum erro de build (`astro build` sem warnings críticos)
