# Byrd Ronin — Plano de Implementação

> Referência: [`docs/specs/landing-page-spec.md`](../specs/landing-page-spec.md)  
> Data: 2026-05-22 | Branch: `claude/landing-page`

---

## Visão de Fases

```
FASE 1 — Fundação         Setup do stack (Tailwind, React, Framer Motion)
FASE 2 — Design System    Tokens, tipografia, componentes base reutilizáveis
FASE 3 — Navbar           Fixed navbar com scroll-aware e mobile menu
FASE 4 — HeroSection      Hero completo com partículas e animações de entrada
FASE 5 — StatusSection    Card Steam com dados reais e animações
FASE 6 — TrailerSection   Player com embed e animações
FASE 7 — FeaturesSection  Cards com ícones SVG e sword slash
FASE 8 — GameplayGrid     Grid de imagens Steam com animações
FASE 9 — FinalCTA         Parallax + particle burst
FASE 10 — Footer & SEO    Footer, schema.org, meta tags, analytics
FASE 11 — Polimento       Responsividade, performance, lighthouse, ajustes finais
```

---

## FASE 1 — Fundação

**Objetivo**: Configurar Tailwind v4, React e Framer Motion sem quebrar o que já existe.

### Tarefas

#### 1.1 Instalar dependências
```bash
npx astro add tailwind
npx astro add react
npm install framer-motion
npm install @radix-ui/react-slot
```

**O que cada comando faz:**
- `astro add tailwind` — instala `@tailwindcss/vite`, cria `src/styles/tailwind.css`, atualiza `astro.config.mjs`
- `astro add react` — instala `@astrojs/react`, `react`, `react-dom`, atualiza `astro.config.mjs`
- `framer-motion` — biblioteca de animações (já depende do React)
- `@radix-ui/react-slot` — utilitário para composição de componentes acessíveis

#### 1.2 Configurar Tailwind v4

Criar/atualizar `src/styles/tailwind.css`:
```css
@import "tailwindcss";

@theme {
  --color-black: #050505;
  --color-ink: #0b1220;
  --color-panel: #18181b;
  --color-blue-deep: #0367a6;
  --color-blue: #0788d9;
  --color-blue-light: #49c2f2;
  --color-gold: #bfb52c;
  --color-red: #f21313;
  --color-white: #f8fafc;
  --color-muted: #b8cadb;

  --font-display: "Pixelify Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  --shadow-pixel-blue: 8px 8px 0 rgba(3, 103, 166, 0.6);
  --shadow-pixel-gold: 8px 8px 0 rgba(191, 181, 44, 0.85);
}
```

Importar no `BaseLayout.astro` no lugar de (ou junto com) o `global.css`.

#### 1.3 Atualizar `astro.config.mjs`
```ts
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://byrdronin.com",
  integrations: [tailwind(), react()],
});
```

#### 1.4 Atualizar `src/consts.ts`
Expandir com todos os dados do jogo:
```ts
export const STEAM_URL = "https://store.steampowered.com/app/4378340/Byrd_Ronin/";
export const STEAM_APP_ID = "4378340";

export const GAME = {
  title: "Byrd Ronin",
  developer: "RDB's Studio",
  publisher: "RDB's Studio",
  releaseDate: "Fevereiro 2026",
  price: "R$ 9,99",
  tags: ["Ação", "Roguelike de Ação", "Hack and Slash", "Difícil", "2D"],
  description:
    "Byrd Ronin mistura ação 2D intensa com controles precisos e ritmo acelerado. Como um pássaro Ronin, avance destruindo tudo até alcançar a cerejeira que guarda seu juramento.",
} as const;
```

#### 1.5 Verificar build
```bash
npm run dev
```
Confirmar que o dev server sobe sem erros antes de prosseguir.

---

## FASE 2 — Design System & Componentes Base

**Objetivo**: Consolidar tokens, criar os componentes React reutilizáveis de animação.

### Tarefas

#### 2.1 Criar `AnimatedSection.tsx`

Wrapper React que aplica `whileInView` com variants configuráveis via props:

```tsx
// src/components/react/AnimatedSection.tsx
// Props: variant ("fadeUp" | "fadeIn" | "stagger"), delay, children
// Usa LazyMotion + domAnimation para reduzir bundle
// viewport: { once: true, amount: 0.2 }
```

Variantes disponíveis:
- `fadeUp`: `y: 40 → 0`, opacity 0 → 1
- `fadeIn`: apenas opacity 0 → 1
- `stagger`: container que distribui animação nos filhos com `staggerChildren: 0.1`
- `scaleIn`: `scale: 0.9 → 1`, opacity 0 → 1

#### 2.2 Criar `SteamButtonAnimated.tsx`

Versão React do `SteamButton.astro` com Framer Motion:
```tsx
// Variants: rest / hover / tap (descritos na spec §6.3)
// Shimmer: CSS keyframe via className
// Props: label, variant ("primary" | "secondary"), event
```

#### 2.3 Criar `PixelParticles.tsx`

Canvas 2D com `requestAnimationFrame`:
```tsx
// Props: count (default 60), colors, pause-on-hidden (visibilitychange)
// Lógica: spawn na base, float para cima, reset ao sair do topo
// Performance: OffscreenCanvas quando disponível
// Retorna: <canvas> com position absolute, inset 0, pointer-events none
```

#### 2.4 Criar `SwordSlash.tsx`

SVG animado com Framer Motion `motion.path`:
```tsx
// Props: trigger (boolean), variant ("full" | "medium" | "horizontal")
// Sequência: pathLength 0→1 (300ms) → opacity 1→0 (200ms) → sparkles
// Sparkles: 4 divs pequenos em gold que se espalham do ponto final
// Reset automático para próximo trigger
```

#### 2.5 Configurar `LazyMotion` no BaseLayout

Envolver o `<body>` com `LazyMotion` usando `domAnimation` para reduzir o bundle de Framer Motion de ~50kb para ~18kb.

```tsx
// src/components/react/MotionProvider.tsx
import { LazyMotion, domAnimation } from "framer-motion"
export function MotionProvider({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
```

---

## FASE 3 — Navbar

**Objetivo**: Navbar fixed com glassmorphism, scroll-aware, mobile menu com sword slash.

### Tarefas

#### 3.1 Criar `NavbarClient.tsx`

Componente React que controla estado de scroll:
```tsx
// useScroll → scrollY > 80: adicionar classe "scrolled"
// Transição: background rgba(5,5,5,0.78) → rgba(5,5,5,0.96)
// box-shadow cresce ao scrollar
// Animação de entrada: y: -30 → 0, opacity 0 → 1, delay 0.2s
```

#### 3.2 Atualizar `Navbar.astro`

- Substituir CSS puro por Tailwind classes
- Importar `NavbarClient.tsx` com `client:load`
- Importar `SteamButtonAnimated.tsx` com `client:load`
- Adicionar hamburguer menu button com ícone de katana (SVG inline)

#### 3.3 Mobile Menu

Estado local no `NavbarClient.tsx`:
- `isOpen`: toggle ao clicar hamburguer
- Ao abrir: disparar `SwordSlash` (variant "medium") antes de animar o menu
- Menu: desliza de `y: -20 → 0` com links empilhados verticalmente
- Fechar ao clicar fora ou em qualquer link

#### 3.4 Link hover effect

CSS: pseudo-element underline que cresce da esquerda (`scaleX: 0 → 1`) ao hover, cor `blue-light`.

#### 3.5 Scroll progress bar

No topo do `<body>`, antes da navbar:
```tsx
// ProgressBar.tsx: position fixed, top 0, z-index 100
// height: 2px, background: linear-gradient(blue-light → gold → red)
// style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
```

---

## FASE 4 — HeroSection

**Objetivo**: Hero imersivo com partículas, personagem flutuante e animações de entrada staggeradas.

### Tarefas

#### 4.1 Atualizar estrutura do `HeroSection.astro`

- Adicionar slot para `PixelParticles` (island)
- Adicionar slot para `SwordSlash` de entrada
- Manter estrutura HTML semântica existente
- Migrar estilos para Tailwind

#### 4.2 Animações de entrada (`HeroAnimations.tsx`)

Componente React que engloba o conteúdo do hero com variants staggerados:
```
Sequência (todas com ease "easeOut", spring stiffness 300):
[0.0s] PixelParticles aparece
[0.1s] Logo: scale 0.8→1.0 + opacity 0→1
[0.3s] Kicker: y 20→0 + opacity 0→1
[0.5s] h1: y 30→0 + opacity 0→1
[0.7s] Parágrafo: y 20→0 + opacity 0→1
[0.9s] Botões: y 20→0 + opacity 0→1 (stagger 0.1s entre eles)
[0.2s] Personagem (em paralelo): x 80→0 + opacity 0→1
```

#### 4.3 Float do personagem

`motion.div` com `animate={{ y: [0, -12, 0] }}`, `transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }`.

#### 4.4 `PixelParticles.tsx` no hero

```tsx
<PixelParticles 
  count={60}
  colors={["#49c2f2", "#bfb52c", "#f8fafc"]}
  client:load
/>
```

#### 4.5 SteamButton animado no hero

Substituir `SteamButton.astro` pelo `SteamButtonAnimated.tsx` com `client:load`.

---

## FASE 5 — StatusSection

**Objetivo**: Card com dados reais da Steam, animações ao entrar em view.

### Tarefas

#### 5.1 Atualizar dados em `StatusSection.astro`

Importar de `consts.ts` (fase 1.4) e usar os dados do `GAME` object:
- Tags dinâmicas via `GAME.tags.map()`
- Developer, publisher, release, price do objeto tipado

#### 5.2 Adicionar campo "Preço" e "Avaliações"

```html
<dl>
  <div><dt>Desenvolvedor</dt><dd>RDB's Studio</dd></div>
  <div><dt>Publisher</dt><dd>RDB's Studio</dd></div>
  <div><dt>Lançamento</dt><dd>Fevereiro 2026</dd></div>
  <div><dt>Preço</dt><dd>R$ 9,99</dd></div>
</dl>
```

#### 5.3 Animações (`StatusAnimations.tsx`)

```tsx
// whileInView, viewport: { once: true, amount: 0.3 }
// Card inteiro: y 60→0 + opacity 0→1
// Tags: stagger 0.05s (slideUp individual)
// dl items: stagger 0.1s (slideLeft)
// Border glow pulse na entrada: 1 ciclo de boxShadow pulsando blue-light
```

#### 5.4 Tag hover

Cada tag com `whileHover`: `scale: 1.05`, `borderColor: blue-light`, `background: rgba(73,194,242,0.1)`.

---

## FASE 6 — TrailerSection

**Objetivo**: Player de trailer com animações e embed YouTube preparado.

### Tarefas

#### 6.1 Estrutura do player

Manter o placeholder atual mas preparar para YouTube embed:
```tsx
// Se YOUTUBE_ID definido em consts.ts: renderiza iframe
// Fallback: thumbnail + play button (atual)
```

Adicionar a `consts.ts`:
```ts
export const YOUTUBE_TRAILER_ID = ""; // preencher quando disponível
```

#### 6.2 `TrailerPlayer.tsx`

Componente React:
- Play button com `animate={{ scale: [1, 1.1, 1] }}` loop (pulse)
- `whileHover` do frame: `boxShadow` mais intenso com glow
- Ao clicar play: se fallback, exibe overlay "Trailer em breve"
- Se YouTube ID disponível: substitui thumbnail por iframe com `allowFullScreen`

#### 6.3 Animações de entrada

```tsx
// Heading: whileInView, y 30→0 + opacity 0→1
// Frame: whileInView, scale 0.95→1.0 + opacity 0→1, delay 0.2s
// viewport: { once: true, amount: 0.3 }
```

---

## FASE 7 — FeaturesSection

**Objetivo**: 3 cards com ícones SVG pixel art, sword slash trigger, hover animations.

### Tarefas

#### 7.1 Criar ícones SVG pixel art

Três SVGs inline para `Upgrades`, `Enemies`, `Chaos` — estilo pixel art (linhas retas, sem anti-aliasing, grade de pixels).

**Upgrades** — ícone de espada/katana com seta para cima  
**Enemies** — ícone de máscara de inimigo/ninja  
**Chaos** — ícone de explosão/raio pixelizado

Cada SVG: `viewBox="0 0 32 32"`, `fill` em `currentColor` ou cores fixas do design system.

#### 7.2 Criar `FeatureCard.tsx`

```tsx
// Props: icon (ReactNode), title, text, index
// motion.article com variants (slideUp)
// whileHover: y -6, boxShadow intenso, borderColor blue-light
// Ícone: whileHover do card → rotate [-5, 5], scale 1.1
// transition: spring, stiffness 400, damping 25
```

#### 7.3 Atualizar `FeaturesSection.astro`

- Substituir feature-grid por `FeatureGrid.tsx` com `client:visible`
- `FeatureGrid.tsx`: container com `staggerChildren: 0.15`, renderiza 3 `FeatureCard`

#### 7.4 Sword slash trigger

`SwordSlash.tsx` com `variant: "horizontal"` disparado quando a seção entra em view:
```tsx
// useInView → quando section entra: setSlashActive(true)
// Reset após 700ms: setSlashActive(false)
// Posição: no topo da seção, horizontal da esq para dir
```

---

## FASE 8 — GameplayGrid

**Objetivo**: Grid 4×1 com imagens/GIFs da Steam, animações staggeradas.

### Tarefas

#### 8.1 Mapear assets de gameplay

Atualizar `consts.ts` com os clips disponíveis:
```ts
export const GAMEPLAY_CLIPS = [
  {
    src: "/gameplay/slash-bamboo.gif",   // ou jpg fallback
    caption: "Slash bamboo at full speed",
    label: "01",
  },
  // ... 3 mais
] as const;
```

Até os GIFs reais estarem disponíveis, usar as screenshots da página Steam como placeholder de qualidade.

#### 8.2 Criar `GameplayCard.tsx`

```tsx
// motion.figure com variants (scaleIn)
// whileHover: scale 1.04, borderColor blue-light, glow
// img interno: scale 1.0 → 1.08 ao hover do card (via motion.img)
// Overlay de hover: gradiente blue-deep no bottom com caption em destaque
// Número index: badge red com Pixelify Sans
```

#### 8.3 Criar `GameplayGrid.tsx`

```tsx
// motion.div container com staggerChildren: 0.1
// viewport: { once: true, amount: 0.1 }
// 4 GameplayCard em grid
```

#### 8.4 Atualizar `GameplayGrid.astro`

Importar `GameplayGrid.tsx` com `client:visible`.

---

## FASE 9 — FinalCTA

**Objetivo**: Seção de fechamento com parallax, partículas e particle burst no botão.

### Tarefas

#### 9.1 Criar `FinalCTAClient.tsx`

Componente React que engloba toda a seção final:

**Parallax do fundo**:
```tsx
const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], [-30, 30])
// Aplicar y no motion.div do background image
```

**Partículas**:
```tsx
<PixelParticles count={30} colors={["#bfb52c", "#f8fafc", "#49c2f2"]} />
```

#### 9.2 Particle burst no botão

Ao hover/click do botão Steam final:
```tsx
// Estado: burst (boolean)
// Ao hover: criar 8 partículas que explodem radialmente do centro do botão
// Cada partícula: motion.div, animate para posição aleatória em arco 360°
// opacity 1 → 0, scale 1 → 0, duration 0.6s
// Sem biblioteca extra — apenas motion.div com valores calculados
```

#### 9.3 Animações de entrada

```tsx
// Sequência whileInView staggerada:
// h2: y 30→0, delay 0
// p: y 20→0, delay 0.2s
// Botão: y 20→0, scale 0.9→1, delay 0.4s
```

---

## FASE 10 — Footer, SEO & Analytics

**Objetivo**: Footer animado, schema.org, meta tags completas, analytics hook.

### Tarefas

#### 10.1 Animar `Footer.astro`

```tsx
// FooterClient.tsx: motion.footer com whileInView
// opacity 0→1, y 20→0, viewport: { once: true, amount: 0.5 }
// Link hover: color blue-light com transição 160ms
```

#### 10.2 Adicionar Schema.org no `BaseLayout.astro`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Byrd Ronin",
  "description": "Byrd Ronin mistura ação 2D intensa...",
  "publisher": { "@type": "Organization", "name": "RDB's Studio" },
  "genre": ["Action", "Roguelite", "Hack and Slash"],
  "operatingSystem": "Windows",
  "url": "https://store.steampowered.com/app/4378340/Byrd_Ronin/",
  "offers": {
    "@type": "Offer",
    "price": "9.99",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

#### 10.3 Completar meta tags no `BaseLayout.astro`

```html
<meta name="theme-color" content="#050505" />
<link rel="canonical" href="https://byrdronin.com" />
<meta property="og:url" content="https://byrdronin.com" />
<meta property="og:locale" content="pt_BR" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Byrd Ronin - Action Roguelite on Steam" />
<meta name="twitter:image" content="https://byrdronin.com/og-image.jpg" />
```

#### 10.4 Analytics listener

Criar `src/scripts/analytics.ts` e carregar via `<script>` no BaseLayout:
```ts
document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest("[data-event]");
  if (!el) return;
  const event = el.getAttribute("data-event");
  // Slot para gtag / plausible / umami
  console.log("[analytics]", event);
});
```

---

## FASE 11 — Polimento & QA

**Objetivo**: Responsividade, performance, ajustes visuais, lighthouse.

### Tarefas

#### 11.1 Responsividade — Mobile (< 640px)

- [ ] Hero: personagem atrás do texto com opacity 0.4
- [ ] Particle count: 25 no mobile (via `matchMedia`)
- [ ] Navbar: hamburguer funcional, steam button reduzido (sem steam-mark)
- [ ] Features: 1 coluna
- [ ] Gameplay: 2×2
- [ ] Botões: full width nas CTAs
- [ ] Sword slash: desabilitar em mobile (performance)
- [ ] Particle burst: desabilitar em mobile

#### 11.2 Responsividade — Tablet (640–980px)

- [ ] Features: 2 colunas (último card centralizado)
- [ ] Gameplay: 2×2
- [ ] Nav links: ocultos (hamburguer)
- [ ] Status card: 1 coluna

#### 11.3 Performance

- [ ] `LazyMotion` + `domAnimation` configurado (bundle reduzido)
- [ ] Imagens com `loading="lazy"` exceto hero (já implementado)
- [ ] Canvas: pausa em `document.visibilityState === "hidden"`
- [ ] Verificar que `client:visible` está em features, gameplay, final-cta
- [ ] Apenas `client:load` no navbar e hero particles

#### 11.4 Acessibilidade

- [ ] `prefers-reduced-motion`: desabilitar partículas e sword slash
  ```css
  @media (prefers-reduced-motion: reduce) {
    /* Desabilitar via CSS custom property que o canvas lê */
  }
  ```
- [ ] Todos os botões com aria-label
- [ ] Imagens decorativas com `alt=""`
- [ ] Focus visible em todos os links e botões
- [ ] Contraste de cor: verificar muted vs black (mínimo 4.5:1)

#### 11.5 Lighthouse

Rodar `npm run build && npm run preview` e auditar:
- Performance > 85
- Accessibility > 90
- SEO > 95
- Best Practices > 90

Ajustar conforme necessário.

---

## Dependências entre Fases

```
FASE 1 (fundação)
  └─ FASE 2 (design system + componentes base)
        ├─ FASE 3 (navbar) ← depende de AnimatedSection, SteamButtonAnimated
        ├─ FASE 4 (hero)   ← depende de PixelParticles, SteamButtonAnimated
        ├─ FASE 5 (status) ← depende de AnimatedSection
        ├─ FASE 6 (trailer)← depende de AnimatedSection
        ├─ FASE 7 (features)← depende de AnimatedSection, SwordSlash, FeatureCard
        ├─ FASE 8 (gameplay)← depende de AnimatedSection
        ├─ FASE 9 (cta)    ← depende de PixelParticles, AnimatedSection
        └─ FASE 10 (seo)   ← independente após fase 1
FASE 11 (polimento) ← após todas as outras
```

A FASE 2 é o gargalo crítico — todos os componentes React base precisam estar prontos antes de prosseguir com as seções.

---

## Ordem de Execução Recomendada

| Prioridade | Fase | Motivo |
|---|---|---|
| 1° | Fase 1 | Bloqueante — sem isso nada funciona |
| 2° | Fase 2 | Bloqueante para todas as seções |
| 3° | Fase 3 + 4 | Above the fold — maior impacto visual |
| 4° | Fase 5 + 10 | Dados Steam + SEO — conteúdo crítico |
| 5° | Fase 6 | Trailer — importante mas bloqueado por asset externo |
| 6° | Fase 7 + 8 | Features + Gameplay — rich content |
| 7° | Fase 9 | Final CTA — conversão |
| 8° | Fase 11 | Polimento — sempre por último |

---

## Checklist de QA Final

### Funcional
- [ ] Todos os links de âncora funcionam (scroll suave)
- [ ] Botão Steam abre URL correta em nova aba
- [ ] Trailer placeholder mostra mensagem "em breve"
- [ ] Mobile menu abre e fecha
- [ ] Scroll progress bar acompanha scroll

### Visual
- [ ] Partículas aparecem no hero e CTA final
- [ ] Sword slash dispara ao entrar na seção Features
- [ ] Personagem do hero está flutuando
- [ ] Hover nos cards de features funciona
- [ ] Hover no gameplay zoom funciona
- [ ] Botão Steam tem shimmer e efeito de press

### Performance
- [ ] Lighthouse Performance > 85
- [ ] Sem console errors em produção
- [ ] Bundle JS < 150kb (gzipped)
- [ ] Imagens carregam com lazy loading

### Acessibilidade
- [ ] Navegação por teclado funciona
- [ ] Screen reader lê conteúdo corretamente
- [ ] `prefers-reduced-motion` desabilita animações
- [ ] Contraste de cores aprovado

### SEO
- [ ] Meta description presente
- [ ] OG image configurada
- [ ] Schema.org VideoGame válido (testar em https://validator.schema.org)
- [ ] Canonical URL correta
