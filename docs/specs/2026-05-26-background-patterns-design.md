# Background Patterns — Byrd Ronin Landing Page

**Date:** 2026-05-26
**Branch:** improve-ui
**Goal:** Adicionar textura visual sutil às seções da landing page usando padrões baseados no "clima" de cada seção — sem alterar o body global, sem sobrecarregar seções já ricas visualmente.

---

## Princípio

Padrão baseado no clima de cada seção. Três categorias:

| Clima | Padrão | Seções |
|---|---|---|
| Mecânico / Ação | Grid quadriculado | FeaturesSection, FinalCTA |
| Dinâmico / Tensão | Scanlines diagonais 45° | GameplayGrid |
| Narrativo / Contemplativo | Ghost kanjis verticais | RoninQuote, TrailerSection (reforço) |
| Neutro | Sem padrão | Hero, FAQSection, Footer |

---

## 1. Grid Quadriculado — FeaturesSection e FinalCTA

**Arquivos:**
- `src/components/FeaturesSection.astro`
- `src/components/react/FinalCTAClient.tsx`

### Especificação

`background-image` com dois `repeating-linear-gradient` perpendiculares, criando grid de células quadradas:

```css
background-image:
  repeating-linear-gradient(
    0deg,
    rgba(107,143,94,0.07) 0px,
    rgba(107,143,94,0.07) 1px,
    transparent 1px,
    transparent 40px
  ),
  repeating-linear-gradient(
    90deg,
    rgba(107,143,94,0.07) 0px,
    rgba(107,143,94,0.07) 1px,
    transparent 1px,
    transparent 40px
  );
```

- **Célula:** `40×40px` (múltiplo de 8 — escala pixel art)
- **Cor das linhas:** `rgba(107,143,94,0.07)` — bamboo a 7% de opacidade
- **Espessura:** `1px`

### Aplicação

**FeaturesSection.astro:** aplicar diretamente no `<section id="features">` via atributo `style`:

```astro
<section
  id="features"
  class="relative py-20"
  style="background-image: repeating-linear-gradient(0deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px);"
>
```

**FinalCTAClient.tsx:** aplicar no `<motion.section>` via propriedade `style` do React:

```tsx
<motion.section
  ref={ref}
  className="relative border-t border-bamboo/15 py-20"
  style={{
    backgroundImage: [
      "repeating-linear-gradient(0deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px)",
      "repeating-linear-gradient(90deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px)",
    ].join(", "),
  }}
>
```

---

## 2. Scanlines Diagonais — GameplayGrid

**Arquivo:** `src/components/GameplayGrid.astro`

### Especificação

Linhas diagonais a `45°` criando sensação de velocidade e movimento:

```css
background-image: repeating-linear-gradient(
  45deg,
  rgba(107,143,94,0.05) 0px,
  rgba(107,143,94,0.05) 1px,
  transparent 1px,
  transparent 6px
);
```

- **Ângulo:** `45°`
- **Espaçamento:** `6px` entre linhas
- **Cor:** `rgba(107,143,94,0.05)` — bamboo a 5% (mais sutil que o grid, pois a seção já tem conteúdo visual denso com os GIFs)

### Aplicação

```astro
<section
  id="gameplay"
  class="relative py-20"
  style="background-image: repeating-linear-gradient(45deg, rgba(107,143,94,0.05) 0px, rgba(107,143,94,0.05) 1px, transparent 1px, transparent 6px);"
>
```

---

## 3. Ghost Kanjis — RoninQuote

**Arquivo:** `src/components/RoninQuote.astro`

### Especificação

Coluna vertical de kanjis temáticos na borda **esquerda** da seção. Temática: mente, força, alma — complementa a citação do Ronin.

- **Caracteres:** 心 力 魂 命 夢 道
- **Opacidade:** `0.03` (mais discreta que a TrailerSection que usa `~0.025`)
- **Font:** `font-display` (Pixelify Sans) — consistente com o padrão existente
- **Tamanho:** `clamp(3rem, 4.5vw, 5rem)` — igual ao da TrailerSection
- **Posição:** `absolute`, lado esquerdo (`left: [-0.5vw]`), verticalmente centrado
- **Visibilidade:** oculto abaixo de `1200px` (igual ao padrão da TrailerSection)

```astro
<div
  class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 left-[-0.5vw] flex flex-col gap-1 font-display text-[clamp(3rem,4.5vw,5rem)] text-white/3 leading-none hidden min-[1200px]:flex flex-col"
  aria-hidden="true"
>
  <span>心</span>
  <span>力</span>
  <span>魂</span>
  <span>命</span>
  <span>夢</span>
  <span>道</span>
</div>
```

### TrailerSection — sem alteração

A TrailerSection já possui ghost kanjis (忍 侍 剣 道 竹 波) na direita em `text-white/2.5`. Está correto — não alterar.

---

## Critério de "Pronto"

- FeaturesSection e FinalCTA exibem grid quadriculado sutil ao inspecionar o fundo
- GameplayGrid exibe linhas diagonais a 45° quase imperceptíveis
- RoninQuote exibe coluna de kanjis na esquerda em telas ≥ 1200px
- Nenhum padrão compete visualmente com o conteúdo das seções
- Build sem erros (`npm run build`)
