# Polish Pass — Byrd Ronin Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar a qualidade visual do site para pronto de lançamento — polish nos Feature Cards, cleanup do TrailerPlayer, melhoria de hierarquia no GameplayGrid, espaçamento consistente entre seções e ativação do SlashDivider.

**Architecture:** Cinco tarefas independentes em arquivos isolados. Cada tarefa é verificada visualmente via `npm run dev` antes do commit. Nenhuma tarefa depende da anterior para ser executada, mas a ordem abaixo minimiza risco.

**Tech Stack:** Astro 5.8, React, Framer Motion, Tailwind CSS v4, TypeScript

---

## File Map

| Arquivo | Tarefa |
|---|---|
| `src/components/react/TrailerPlayer.tsx` | Task 1 — cleanup atributos vídeo |
| `src/components/react/FeatureGrid.tsx` | Task 2 — redesign visual dos cards |
| `src/components/react/GameplayGridClient.tsx` | Task 3 — hierarquia visual |
| `src/components/FeaturesSection.astro` | Task 4 — espaçamento |
| `src/components/GameplayGrid.astro` | Task 4 — espaçamento |
| `src/components/RoninQuote.astro` | Task 4 — espaçamento + border |
| `src/components/react/FinalCTAClient.tsx` | Task 4 — espaçamento |
| `src/components/TrailerSection.astro` | Task 4 — espaçamento |
| `src/pages/index.astro` | Task 5 — SlashDivider |

---

## Task 1: TrailerPlayer — Cleanup de Atributos

**Files:**
- Modify: `src/components/react/TrailerPlayer.tsx`

O componente já usa `/videos/trailer.mp4`. Problema: `autoPlay` + `loop` num vídeo com `controls` é UX ruim (toca sozinho, repete sem avisar). O filtro `brightness(0.65)` deixa o vídeo muito escuro.

- [ ] **Step 1: Aplicar as mudanças no TrailerPlayer**

Substituir o elemento `<video>` atual pelo seguinte (linhas 17–33 do arquivo atual):

```tsx
<video
  src="/videos/trailer.mp4"
  poster="/images/hero_bg.png"
  preload="none"
  playsInline
  controls
  style={{
    width: "100%",
    aspectRatio: "16/9",
    objectFit: "cover",
    display: "block",
    filter: "saturate(1.1) brightness(0.92)",
  }}
/>
```

Mudanças: removidos `autoPlay` e `loop`, adicionado `preload="none"`, filtro ajustado.

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:4321`. Na seção Trailer, o vídeo deve aparecer estático (sem tocar automaticamente), mostrar o poster do hero como thumbnail e os controles nativos. Clicar play deve reproduzir normalmente.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/TrailerPlayer.tsx
git commit -m "fix: trailer uses preload=none, remove autoPlay/loop, fix brightness"
```

---

## Task 2: Feature Cards — Redesign Visual

**Files:**
- Modify: `src/components/react/FeatureGrid.tsx`

Problema: cards com baixo peso visual — padding pequeno, ícones miúdos, hover quase imperceptível.

- [ ] **Step 1: Atualizar `cardVariants` — hover mais pronunciado**

Localizar `cardVariants` (linhas 22–35) e substituir por:

```tsx
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
```

- [ ] **Step 2: Atualizar `CornerDecor` — bordas maiores e mais visíveis**

Localizar a função `CornerDecor` (linhas 38–47) e substituir por:

```tsx
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
```

- [ ] **Step 3: Atualizar `FeatureCard` — tamanho, espaçamento e fundo**

Localizar o `motion.article` dentro de `FeatureCard` (linha 51 em diante) e substituir pelo seguinte. A mudança principal é `p-7` → `p-9`, adicionar `group` para o hover das `CornerDecor`, ícone maior, título maior, separador maior e gradiente de fundo sutil:

```tsx
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
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:4321` e rolar até a seção Features. Os cards devem ter presença visual clara: ícones maiores, títulos em `text-3xl`, background com gradiente sutil. Hover deve mostrar elevação + brilho verde + cantos totalmente visíveis.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/FeatureGrid.tsx
git commit -m "feat: redesign feature cards — larger icons, bolder hover, gradient bg"
```

---

## Task 3: GameplayGrid — Hierarquia Visual

**Files:**
- Modify: `src/components/react/GameplayGridClient.tsx`

Problema: imagens flutuam sem peso, eyebrows somem no fundo escuro, títulos poderiam ser maiores.

- [ ] **Step 1: Adicionar box-shadow no wrapper do vídeo**

Localizar a `motion.div` com `className="relative overflow-hidden rounded-xl"` (linha 35) e adicionar `style` com box-shadow pixel offset:

```tsx
<motion.div
  className="relative overflow-hidden rounded-xl"
  variants={clipVariants}
  style={{
    aspectRatio: VIDEO_RATIO,
    boxShadow: "8px 8px 0 rgba(107,143,94,0.15)",
  }}
>
```

Remover o `style={{ aspectRatio: VIDEO_RATIO }}` que estava isolado — agora está junto no mesmo objeto.

- [ ] **Step 2: Atualizar eyebrow — mais visível**

Localizar a linha do eyebrow dentro de `textCol` (linha 75):

```tsx
<p className="relative font-display text-xs uppercase tracking-ui-hud text-bamboo/70">
```

Substituir por:

```tsx
<p className="relative font-display text-xs uppercase tracking-widest text-bamboo/90">
```

- [ ] **Step 3: Aumentar o título de cada bloco**

Localizar a linha do `h3` dentro de `textCol` (linha 80):

```tsx
<h3 className="relative font-display text-[clamp(1.6rem,3vw,2.4rem)] text-white leading-tight">
```

Substituir por:

```tsx
<h3 className="relative font-display text-[clamp(1.8rem,3vw,2.8rem)] text-white leading-tight">
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```

Rolar até "Corte. Avance. Repita." As imagens devem ter uma sombra verde sutil offset. Os eyebrows ("Mobilidade & Combate", "Evolução & Desafio") devem estar mais legíveis. Os títulos devem ter mais presença.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/GameplayGridClient.tsx
git commit -m "feat: gameplay grid — box-shadow on clips, bolder eyebrows and titles"
```

---

## Task 4: Espaçamento Global entre Seções

**Files:**
- Modify: `src/components/FeaturesSection.astro`
- Modify: `src/components/GameplayGrid.astro`
- Modify: `src/components/RoninQuote.astro`
- Modify: `src/components/react/FinalCTAClient.tsx`
- Modify: `src/components/TrailerSection.astro`

Problema: seções usam `py-8` de forma inconsistente, criando seções "coladas". Padrão alvo: `py-20` nas seções de conteúdo.

- [ ] **Step 1: FeaturesSection — py-8 → py-20**

Em `src/components/FeaturesSection.astro`, linha 7:

```astro
<section id="features" class="relative py-20">
```

- [ ] **Step 2: GameplayGrid — py-8 → py-20**

Em `src/components/GameplayGrid.astro`, linha 7:

```astro
<section id="gameplay" class="relative py-20">
```

- [ ] **Step 3: RoninQuote — py-8 → py-20 + border-t**

Em `src/components/RoninQuote.astro`, linha 5:

```astro
<section class="relative py-20 border-t border-bamboo/10 overflow-hidden">
```

- [ ] **Step 4: FinalCTAClient — py-8 → py-20**

Em `src/components/react/FinalCTAClient.tsx`, linha 23, a `motion.section`:

```tsx
<motion.section
  ref={ref}
  className="relative border-t border-bamboo/15 py-20"
>
```

- [ ] **Step 5: TrailerSection — pb-8 → pb-20**

Em `src/components/TrailerSection.astro`, linha 5 (manter o `pt-36` que separa o hero):

```astro
<section id="trailer" class="relative overflow-hidden pt-36 pb-20">
```

- [ ] **Step 6: Verificar no browser**

```bash
npm run dev
```

Rolar pela página inteira. As seções devem ter respiro uniforme entre si — sem seções "grudadas". A RoninQuote deve ter uma linha tênue acima separando-a do GameplayGrid.

- [ ] **Step 7: Commit**

```bash
git add src/components/FeaturesSection.astro src/components/GameplayGrid.astro src/components/RoninQuote.astro src/components/react/FinalCTAClient.tsx src/components/TrailerSection.astro
git commit -m "feat: normalize section vertical spacing to py-20"
```

---

## Task 5: SlashDivider — Ativar nas Transições

**Files:**
- Modify: `src/pages/index.astro`

O componente `SlashDivider` existe mas não está sendo usado. Ele renderiza uma linha animada com o símbolo `／` — marca as transições entre seções temáticas.

- [ ] **Step 1: Importar SlashDivider em index.astro**

No bloco frontmatter de `src/pages/index.astro` (entre os `---`), adicionar a importação:

```astro
import { SlashDivider } from "../components/react/SlashDivider";
```

- [ ] **Step 2: Inserir SlashDivider nas transições Hero→Trailer e Features→Gameplay**

O `<main>` atual ficará assim:

```astro
<main>
  <div class="relative">
    <HeroSection />
    <SteamWidget />
  </div>
  <SlashDivider client:visible />
  <TrailerSection />
  <FeaturesSection />
  <SlashDivider client:visible />
  <GameplayGrid />
  <RoninQuote />
  <FinalCTA />
  <FAQSection client:visible />
</main>
```

- [ ] **Step 3: Verificar no browser**

```bash
npm run dev
```

Rolar pela página. Deve aparecer uma linha com `／` animada entre Hero→Trailer e entre Features→Gameplay. A animação dispara quando a linha entra na viewport.

- [ ] **Step 4: Build final sem erros**

```bash
npm run build
```

Expected: build completa sem erros ou warnings críticos. Se houver warnings de TypeScript, investigar antes de commitar.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: activate SlashDivider between Hero/Trailer and Features/Gameplay"
```

---

## Verificação Final

Após todas as tarefas:

- [ ] Rodar `npm run build` — zero erros
- [ ] Abrir `npm run preview` e checar cada seção:
  - Trailer: vídeo estático até clicar play, brilho correto
  - Features: cards com presença visual, hover pronunciado
  - Gameplay: eyebrows legíveis, imagens com sombra offset
  - Espaçamento: todas as seções com respiro uniforme
  - SlashDividers: visíveis e animados nos dois pontos de transição
- [ ] Inspecionar `<head>` no DevTools — confirmar `og:image`, `og:title`, `twitter:card` presentes
- [ ] Verificar que `/public/images/og_image.png` existe — se não existir, criar issue: asset pendente (1200×630px, arte do hero ou da FinalCTA)
