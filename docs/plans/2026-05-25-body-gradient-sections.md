# Body Gradient + Section Backgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o fundo sólido preto do body por um gradiente vertical bamboo→forest→black e tornar todas as sections transparentes, enriquecendo cada uma com padrões e elementos decorativos.

**Architecture:** Gradiente aplicado via Tailwind diretamente no `body` em `BaseLayout.astro`. Cada section Astro/React tem seu `bg-*` sólido removido; overlays semi-transparentes e decorações existentes são mantidos/ajustados para preservar profundidade visual sem bloquear o fluxo do gradiente global.

**Tech Stack:** Astro, React, Tailwind CSS (arbitrary values), Framer Motion (sem mudanças)

> **Nota sobre testes:** Estas são mudanças puramente visuais/CSS. Não há unit tests aplicáveis. Cada task inclui verificação visual no browser com `npm run dev`.

---

## Arquivos modificados

| Arquivo | O que muda |
|---|---|
| `src/layouts/BaseLayout.astro` | `body`: remove `bg-black`, adiciona gradient Tailwind |
| `src/components/TrailerSection.astro` | remove `bg-forest`, adiciona dot grid |
| `src/components/FeaturesSection.astro` | remove `bg-[#070b07]` |
| `src/components/GameplayGrid.astro` | remove `bg-black`, adiciona scanline central |
| `src/components/RoninQuote.astro` | substitui radial gradient opaco por overlay leve |
| `src/components/Footer.astro` | `bg-black` → `bg-black/80` |

---

### Task 1: Gradiente global no body

**Files:**
- Modify: `src/layouts/BaseLayout.astro:81`

- [ ] **Step 1: Aplicar gradiente no body**

Em `src/layouts/BaseLayout.astro`, linha 81, substituir a classe `bg-black` no `body`:

```astro
<body class="antialiased min-h-dvh text-white font-body bg-[linear-gradient(to_bottom,#6b8f5e_0%,#0d1a0f_20%,#050505_55%,#050505_100%)]">
```

- [ ] **Step 2: Verificar no browser**

Rodar `npm run dev` e abrir `http://localhost:4321`.

Esperado:
- Topo da página (hero): fundo verde bamboo visível atrás da imagem de fundo do hero
- Meio da página (features/gameplay): fundo verde escuro / forest
- Final da página (footer): fundo preto
- Scroll suave de cima pra baixo mostra a transição de cor

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add bamboo-forest-black vertical gradient to body"
```

---

### Task 2: TrailerSection — remover bg sólido + adicionar dot grid

**Files:**
- Modify: `src/components/TrailerSection.astro:5`

- [ ] **Step 1: Remover bg-forest e adicionar dot grid**

Em `src/components/TrailerSection.astro`, linha 5, substituir a classe `bg-forest` na tag `section`:

```astro
<section id="trailer" class="relative overflow-hidden py-24 pt-20">
```

Logo após a abertura da tag `section`, adicionar o div do dot grid como primeiro elemento (antes das scanlines existentes):

```astro
<section id="trailer" class="relative overflow-hidden py-24 pt-20">
  <!-- Dot grid background -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle,rgba(107,143,94,0.07)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
    aria-hidden="true"
  />
  <!-- HUD scan lines -->
```

- [ ] **Step 2: Verificar no browser**

Esperado:
- TrailerSection não tem mais o fundo verde sólido (#0d1a0f) — o gradiente do body flui por baixo
- Padrão de pontos sutil (bamboo/7% opacidade) visível na section
- Kanjis decorativos, scanlines e vinheta inferior continuam presentes
- SlashDivider entre TrailerSection e FeaturesSection não mostra mais quadrado preto

- [ ] **Step 3: Commit**

```bash
git add src/components/TrailerSection.astro
git commit -m "feat: remove solid bg from TrailerSection, add dot grid overlay"
```

---

### Task 3: FeaturesSection — remover bg sólido

**Files:**
- Modify: `src/components/FeaturesSection.astro:7`

- [ ] **Step 1: Remover bg-[#070b07]**

Em `src/components/FeaturesSection.astro`, linha 7, remover a classe `bg-[#070b07]` da tag `section`:

```astro
<section id="features" class="relative py-24">
```

- [ ] **Step 2: Verificar no browser**

Esperado:
- FeaturesSection não tem mais fundo sólido — gradiente do body flui por baixo
- Dot grid existente (`bg-[radial-gradient(circle,rgba(107,143,94,0.07)...]`) e BambooDecor continuam visíveis
- Transição visual entre TrailerSection → SlashDivider → FeaturesSection é fluida

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturesSection.astro
git commit -m "feat: remove solid bg from FeaturesSection"
```

---

### Task 4: GameplayGrid — remover bg sólido + adicionar scanline

**Files:**
- Modify: `src/components/GameplayGrid.astro:7`

- [ ] **Step 1: Remover bg-black e adicionar scanline central**

Em `src/components/GameplayGrid.astro`, linha 7, remover `bg-black` da tag `section`:

```astro
<section id="gameplay" class="relative py-24">
```

Dentro da section, adicionar uma scanline horizontal no centro logo após o fade-top existente:

```astro
<section id="gameplay" class="relative py-24">
  <div
    class="absolute inset-0 bg-[linear-gradient(180deg,rgba(107,143,94,0.04)_0%,transparent_40%)] pointer-events-none"
    aria-hidden="true"
  >
  </div>
  <!-- Scanline central -->
  <div
    class="absolute top-1/2 left-0 right-0 h-px bg-bamboo/8 pointer-events-none"
    aria-hidden="true"
  />
```

- [ ] **Step 2: Verificar no browser**

Esperado:
- GameplayGrid sem fundo sólido preto — gradiente do body flui por baixo
- BambooDecor e fade-top gradient ainda presentes
- Scanline central sutil visível (baixíssima opacidade, decorativa)
- SlashDivider entre FeaturesSection e GameplayGrid fluido

- [ ] **Step 3: Commit**

```bash
git add src/components/GameplayGrid.astro
git commit -m "feat: remove solid bg from GameplayGrid, add center scanline"
```

---

### Task 5: RoninQuote — substituir radial gradient opaco por overlay leve

**Files:**
- Modify: `src/components/RoninQuote.astro:5`

- [ ] **Step 1: Substituir classe de background**

Em `src/components/RoninQuote.astro`, linha 5, substituir o `bg-[radial-gradient(...)]` opaco na tag `section`:

Antes:
```astro
<section class="relative py-20 px-6 overflow-hidden bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(13,26,15,0.95)_0%,rgba(5,5,5,1)_100%)]">
```

Depois:
```astro
<section class="relative py-20 px-6 overflow-hidden">
  <div
    class="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(13,26,15,0.4)_0%,transparent_100%)] pointer-events-none"
    aria-hidden="true"
  />
```

> Nota: o `</div>` de fechamento deste novo div deve ser inserido antes do `</section>` de fechamento do arquivo.

- [ ] **Step 2: Verificar no browser**

Esperado:
- RoninQuote não bloqueia mais o gradiente do body
- Ainda tem profundidade visual — o overlay radial leve (40% opacidade) escurece sutilmente o centro
- Texto da citação permanece legível com contraste adequado

- [ ] **Step 3: Commit**

```bash
git add src/components/RoninQuote.astro
git commit -m "feat: replace opaque radial gradient in RoninQuote with transparent overlay"
```

---

### Task 6: Footer — suavizar fundo

**Files:**
- Modify: `src/components/Footer.astro:12`

- [ ] **Step 1: Substituir bg-black por bg-black/80**

Em `src/components/Footer.astro`, linha 12, substituir `bg-black` por `bg-black/80`:

```astro
<footer class="border-t border-bamboo/20 bg-black/80 py-12">
```

- [ ] **Step 2: Verificar no browser**

Esperado:
- Footer tem uma leve transparência — não corta bruscamente o gradiente do body
- Conteúdo do footer permanece legível
- Borda superior `border-bamboo/20` ainda visível

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: soften footer background to allow body gradient to bleed through"
```

---

### Task 7: Verificação final integrada

- [ ] **Step 1: Rodar o servidor e verificar o fluxo completo**

Rodar `npm run dev` e abrir `http://localhost:4321`.

Checklist visual:
- [ ] Topo (hero): verde bamboo visível
- [ ] Scroll para trailer: transição verde bamboo → forest
- [ ] SlashDivider após trailer: sem quadrado preto, blenda com o fundo
- [ ] Features: dot grid sobre gradiente forest
- [ ] SlashDivider após features: fluido
- [ ] Gameplay: scanline central sutil, gradiente escurecendo
- [ ] RoninQuote: citação legível, fundo não bloqueia gradiente
- [ ] Footer: fundo semi-transparente, sem corte brusco
- [ ] Responsivo: verificar em viewport mobile (380px) e tablet (768px) — gradiente deve fluir igualmente

- [ ] **Step 2: Verificar FallingLeaves e Navbar**

As `FallingLeaves` rodam com `position: fixed` e a Navbar tem `backdrop-filter`. Confirmar que o gradiente do body não interfere com esses elementos visuais.

Esperado: FallingLeaves e glassmorphism da Navbar continuam funcionando normalmente.

- [ ] **Step 3: Commit final se necessário**

Se houver ajustes finos de opacidade ou stops do gradiente feitos durante a verificação:

```bash
git add -p
git commit -m "fix: fine-tune gradient stops and section overlay opacities"
```
