# Background Patterns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar padrões de fundo sutis e temáticos a quatro seções da landing page — grid quadriculado nas seções de ação, scanlines diagonais na seção de gameplay, e ghost kanjis na seção narrativa.

**Architecture:** Cada tarefa modifica um único arquivo. Os padrões CSS são aplicados via atributo `style` inline (Astro) ou propriedade `style` do React — sem novos componentes, sem novas classes Tailwind. Ghost kanjis seguem o padrão já existente na TrailerSection.

**Tech Stack:** Astro 5.8, React, Tailwind CSS v4, CSS `repeating-linear-gradient`

---

## File Map

| Arquivo | Tarefa |
|---|---|
| `src/components/FeaturesSection.astro` | Task 1 — grid quadriculado |
| `src/components/react/FinalCTAClient.tsx` | Task 2 — grid quadriculado |
| `src/components/GameplayGrid.astro` | Task 3 — scanlines diagonais |
| `src/components/RoninQuote.astro` | Task 4 — ghost kanjis |

---

## Task 1: Grid Quadriculado — FeaturesSection

**Files:**
- Modify: `src/components/FeaturesSection.astro`

- [ ] **Step 1: Aplicar grid no `<section>`**

Substituir a tag de abertura da seção (linha 7):

```astro
<section
  id="features"
  class="relative py-20"
  style="background-image: repeating-linear-gradient(0deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(107,143,94,0.07) 0px, rgba(107,143,94,0.07) 1px, transparent 1px, transparent 40px);"
>
```

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:4321` e rolar até a seção Features. Inspecionar o fundo: deve aparecer um grid de células `40×40px` com linhas verde-bamboo quase invisíveis. O conteúdo (cards, header) deve dominar completamente — o grid é perceptível apenas se olhado diretamente ao fundo.

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturesSection.astro
git commit -m "feat: add grid pattern background to FeaturesSection"
```

---

## Task 2: Grid Quadriculado — FinalCTA

**Files:**
- Modify: `src/components/react/FinalCTAClient.tsx`

O `FinalCTAClient` usa `<motion.section>` com propriedade `style` do React. O `style` existente é apenas `className` — adicionar `style` como objeto React.

- [ ] **Step 1: Adicionar `style` com grid no `<motion.section>`**

Localizar o `<motion.section>` (linha 21). Ele atualmente tem apenas `className`. Adicionar a prop `style`:

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

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Rolar até a seção FinalCTA ("Pronto para Entrar na Tempestade de Bambu?"). O grid deve aparecer no fundo da seção, atrás da imagem do ronin e do gradiente overlay. Como a seção tem um `background-image` para a imagem do ronin e overlays com `position: absolute`, o grid fica na camada mais abaixo — visível nas bordas escuras da seção onde a imagem não cobre.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/FinalCTAClient.tsx
git commit -m "feat: add grid pattern background to FinalCTA"
```

---

## Task 3: Scanlines Diagonais — GameplayGrid

**Files:**
- Modify: `src/components/GameplayGrid.astro`

- [ ] **Step 1: Aplicar scanlines no `<section>`**

Substituir a tag de abertura da seção (linha 7):

```astro
<section
  id="gameplay"
  class="relative py-20"
  style="background-image: repeating-linear-gradient(45deg, rgba(107,143,94,0.05) 0px, rgba(107,143,94,0.05) 1px, transparent 1px, transparent 6px);"
>
```

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Rolar até "Corte. Avance. Repita." O fundo deve ter linhas diagonais finíssimas a 45°, espaçadas 6px, quase imperceptíveis. A seção tem GIFs de gameplay como conteúdo dominante — as scanlines devem ser sentidas, não vistas conscientemente. Se parecerem muito fortes, a opacidade `0.05` pode ser reduzida para `0.04`.

- [ ] **Step 3: Commit**

```bash
git add src/components/GameplayGrid.astro
git commit -m "feat: add diagonal scanlines background to GameplayGrid"
```

---

## Task 4: Ghost Kanjis — RoninQuote

**Files:**
- Modify: `src/components/RoninQuote.astro`

O padrão de ghost kanjis já existe na TrailerSection — seguir exatamente a mesma estrutura. A TrailerSection usa `right-[-0.5vw]` e `text-white/2.5`. A RoninQuote usará `left-[-0.5vw]` e `text-white/3` (levemente mais visível para compensar o fundo mais escuro sem imagem).

- [ ] **Step 1: Adicionar coluna de kanjis à esquerda**

Dentro do `<section>` da RoninQuote, antes do `<div class="absolute inset-0 ...">` (ou como primeiro filho do `<section>`), adicionar:

```astro
<div
  class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 left-[-0.5vw] flex flex-col gap-1 font-display text-[clamp(3rem,4.5vw,5rem)] text-white/3 leading-none hidden min-[1200px]:flex"
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

O arquivo completo resultante de `RoninQuote.astro`:

```astro
---

---

<section class="relative py-20 border-t border-bamboo/10 overflow-hidden">
  <!-- Ghost kanjis — esquerda -->
  <div
    class="absolute select-none pointer-events-none top-1/2 -translate-y-1/2 left-[-0.5vw] flex flex-col gap-1 font-display text-[clamp(3rem,4.5vw,5rem)] text-white/3 leading-none hidden min-[1200px]:flex"
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
      class="absolute -top-4 left-0 font-display leading-none text-bamboo/20 select-none pointer-events-none"
      style="font-size: clamp(5rem, 14vw, 9rem); line-height: 1;"
      aria-hidden="true">"</span
    >

    <!-- Linha decorativa superior -->
    <div class="flex items-center gap-4 mb-10 justify-center">
      <div class="h-px w-12 bg-bamboo/30"></div>
      <span
        class="font-display text-sm tracking-ui-hero uppercase text-bamboo/50"
        >O Caminho do Ronin</span
      >
      <div class="h-px w-12 bg-bamboo/30"></div>
    </div>

    <blockquote class="relative z-10">
      <p
        class="font-display text-[clamp(1.6rem,4vw,3rem)] text-white leading-[1.15] tracking-tight"
      >
        Mesmo ao falhar,<br />
        você volta mais forte —<br />
        <em class="text-bamboo not-italic">como um verdadeiro Ronin.</em>
      </p>
    </blockquote>

    <!-- Aspas decorativas fechamento -->
    <span
      class="absolute -bottom-10 right-0 font-display leading-none text-bamboo/20 select-none pointer-events-none"
      style="font-size: clamp(5rem, 14vw, 9rem); line-height: 1;"
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

- [ ] **Step 2: Verificar no browser em tela larga (≥ 1200px)**

```bash
npm run dev
```

Abrir `http://localhost:4321` em janela ≥ 1200px de largura. Rolar até a citação "Mesmo ao falhar...". Na borda esquerda da seção devem aparecer os kanjis 心 力 魂 命 夢 道 empilhados verticalmente, quase transparentes. Em telas menores que 1200px não devem aparecer (testado com DevTools resize).

- [ ] **Step 3: Build final**

```bash
npm run build
```

Expected: build completa sem erros. O warning de `hero-bg.png` é pré-existente e pode ser ignorado.

- [ ] **Step 4: Commit**

```bash
git add src/components/RoninQuote.astro
git commit -m "feat: add ghost kanji column to RoninQuote section"
```
