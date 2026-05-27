# Byrd Ronin — Landing Page Specification

> Versão: 1.0 | Data: 2026-05-22  
> Steam App ID: `4378340` | URL: https://store.steampowered.com/app/4378340/Byrd_Ronin/

---

## 1. Visão Geral

Landing page de marketing para **Byrd Ronin**, um action roguelite 2D pixel art desenvolvido pela RDB's Studio. O objetivo é converter visitantes em wishlists/compras na Steam através de uma experiência visual imersiva que transmite a energia caótica e precisa do jogo.

### Dados oficiais da Steam

| Campo                     | Valor                                                    |
| ------------------------- | -------------------------------------------------------- |
| Título                    | Byrd Ronin                                               |
| Desenvolvedor / Publisher | RDB's Studio                                             |
| Gênero                    | Ação, Indie                                              |
| Tags                      | Ação · Roguelike de Ação · Hack and Slash · Difícil · 2D |
| Preço                     | R$ 9,99                                                  |
| Data de lançamento        | Fevereiro/2026                                           |
| Steam App ID              | 4378340                                                  |
| Classificação indicativa  | 6+ (Brasil)                                              |

### Descrição oficial (Steam)

> "Byrd Ronin mistura ação 2D intensa com controles precisos e ritmo acelerado. Como um pássaro Ronin, avance destruindo tudo até alcançar a cerejeira que guarda seu juramento. Evolua a cada run, desbloqueando itens e habilidades, domine o fluxo de combate. O combate em Byrd Ronin é rápido, agressivo e recompensador — saber o momento certo de atacar e contra-atacar é a única constante."

---

## 2. Stack Técnica

### Atual (base de partida)

- **Astro 5.8** — framework principal, SSG
- **CSS custom properties** — design system atual em `src/styles/global.css`
- **TypeScript** — tipagem nos componentes Astro
- **Pixelify Sans + Inter** — fontes Google (já configuradas)

### A adicionar (durante implementação)

| Pacote              | Versão      | Propósito                                                 |
| ------------------- | ----------- | --------------------------------------------------------- |
| `@astrojs/tailwind` | Tailwind v4 | Utility classes, substituir CSS custom nos componentes    |
| `@astrojs/react`    | —           | Habilita componentes React para Framer Motion             |
| `@radix-ui`         | —           | Habilita o radix ui para criação de componentes           |
| `framer-motion`     | latest      | Animações de scroll, entrada, micro-interações            |
| `motion`            | latest      | API imperativa para efeitos especiais (partículas, slash) |

### Comandos de setup

```bash
npx astro add tailwind react
npm install framer-motion
```

### Configuração Tailwind v4 (`tailwind.config` via CSS)

Tailwind v4 usa `@import "tailwindcss"` em CSS — não precisa de `tailwind.config.js`.  
Tokens customizados do design system migram para variáveis CSS + `@theme` block.

---

## 3. Design System

### Paleta de cores

```css
--color-black: #050505 /* fundo principal */ --color-ink: #0b1220
  /* fundo de cards escuros */ --color-panel: #18181b /* painéis internos */
  --color-blue-deep: #0367a6 /* acento profundo */ --color-blue: #0788d9
  /* azul primário */ --color-blue-light: #49c2f2 /* destaque / kickers */
  --color-gold: #bfb52c /* acento dourado / botões secundários */
  --color-red: #f21313 /* CTA primário / play button */ --color-white: #f8fafc
  /* texto principal */ --color-muted: #b8cadb /* texto secundário */
  --color-border: rgba(248, 250, 252, 0.18) /* bordas sutis */;
```

### Tipografia

| Role    | Font          | Weight             | Uso                         |
| ------- | ------------- | ------------------ | --------------------------- |
| Display | Pixelify Sans | 600, 700           | Headings, nav, tags, botões |
| Body    | Inter         | 400, 500, 700, 800 | Parágrafos, metadados       |

### Escala tipográfica (clamp)

- `h1`: `clamp(54px, 7vw, 96px)` — linha 0.86
- `h2`: `clamp(40px, 5vw, 68px)` — linha 0.9
- `h3`: `34px`
- `kicker/tags`: `20px` Pixelify Sans uppercase
- `body`: `18px` / `21px` (hero e CTA)

### Efeito visual "pixel art"

- Bordas com offset sombra dura (box-shadow `8px 8px 0`) em azul ou dourado
- Bordas `2–4px solid` com cores de acento
- Backdrop-filter `blur(16px)` na navbar
- Fundo dark com radial-gradient em azul suave

---

## 4. Arquitetura de Componentes

```
src/
├── layouts/
│   └── BaseLayout.astro        ← head, fontes, meta OG, body wrapper
├── components/
│   ├── Navbar.astro             ← fixed, glassmorphism, scroll-aware
│   ├── HeroSection.astro        ← hero com partículas e personagem
│   ├── StatusSection.astro      ← card com dados da Steam
│   ├── TrailerSection.astro     ← player com YouTube embed
│   ├── FeaturesSection.astro    ← 3 cards: Upgrades / Enemies / Chaos
│   ├── GameplayGrid.astro       ← grid de GIFs de gameplay
│   ├── FinalCTA.astro           ← CTA final com parallax
│   └── Footer.astro             ← navegação + créditos
├── components/react/             ← componentes React (Framer Motion)
│   ├── PixelParticles.tsx        ← canvas de partículas pixel
│   ├── SwordSlash.tsx            ← efeito de corte de espada
│   ├── AnimatedSection.tsx       ← wrapper de scroll animation
│   ├── FeatureCard.tsx           ← card com hover animation
│   └── NavbarClient.tsx          ← lógica de scroll da navbar
├── styles/
│   └── global.css               ← tokens CSS + base styles + Tailwind import
└── consts.ts                    ← STEAM_URL, STEAM_APP_ID, dados do jogo
```

### Regra de islands

- Componentes Astro para estrutura estática (HTML + CSS)
- Componentes React com `client:load` apenas para: navbar scroll, partículas, slash, animações Framer Motion
- `client:visible` para seções fora do fold (features, gameplay, cta)

---

## 5. Seções — Spec Detalhada

### 5.1 Navbar

**Layout**: `position: fixed`, cor solida, flutuante com `margin-top: 14px`, border-radius 8px.  
**Conteúdo**: Logo (link #top) | Links de âncora | Botão Steam CTA.

**Animações**:

- **Entrada**: Slide-down de -20px + fade in ao carregar a página (Framer Motion, delay 0.2s)
- **Scroll-aware**: Ao scrollar > 80px, aumenta `background: rgba(5,5,5,0.92)` e adiciona `box-shadow` mais pesado (transição suave 300ms)
- **Link hover**: `color` muda para `blue-light`, underline slide-in da esquerda com pseudo-element
- **Micro-interação**: Ao clicar num link de âncora, o indicador ativo pisca 1x em dourado (Flash pixel)

**Mobile** (< 980px):

- Menu hamburguer com ícone de espada/katana
- Ao abrir: efeito de **sword slash** diagonal na tela + menu desliza de cima

---

### 5.2 HeroSection

**Layout**: `min-height: 100svh`, fundo com imagem de bambuzal + gradiente, grid 2 colunas (copy | personagem).

**Conteúdo**:

- Logo do jogo (PNG) com drop-shadow
- Kicker: "Available on Steam"
- `h1`: "Slice Through Chaos. Become the Ronin."
- Parágrafo descritivo
- CTAs: Botão Steam primário + ghost button "Watch Trailer"
- Proof text: "Action roguelite bamboo slasher..."

**Efeito de fundo — Pixel Particles** (`PixelParticles.tsx`):

- Canvas absoluto full-width, z-index 1, atrás do conteúdo
- Partículas: quadrados 2×2px e 4×4px em `blue-light` e `gold` com 20–40% opacity
- Comportamento: flutuam lentamente para cima, velocidade aleatória 0.3–0.8px/frame
- Spawn: aleatório na largura, reaparecem na base quando saem do topo
- Count: ~60 partículas no desktop, 25 no mobile
- `requestAnimationFrame` puro para performance (sem biblioteca)

**Animações de entrada** (Framer Motion, stagger):

1. Logo: scale 0.8 → 1.0 + fade, delay 0.1s
2. Kicker: y 20px → 0 + fade, delay 0.3s
3. h1: y 30px → 0 + fade, delay 0.5s
4. Parágrafo: y 20px → 0 + fade, delay 0.7s
5. Botões: y 20px → 0 + fade, delay 0.9s, stagger 0.1s entre eles

**Personagem**:

- Float animation: `y: [0, -12, 0]` loop infinito, duration 3s, ease "easeInOut"
- Ao entrar na página: slide da direita (x: 100px → 0) + fade

**Botão Steam (micro-interação)**:

- `whileHover`: `scale: 1.04`, `boxShadow` mais intenso
- `whileTap`: `scale: 0.97`, translateY 2px (simula press físico)
- Ao hover: shimmer horizontal em gold passa pelo botão (CSS animation)

---

### 5.3 StatusSection (Steam Status)

**Layout**: Card sobre o hero section (`margin-top: -56px`), grid 2 colunas, border `3px solid blue-light`, box-shadow gold offset.

**Conteúdo** (dados oficiais da Steam):

```
Kicker:       "Available on Steam"
Heading:      "Fast cuts, upgrades and bamboo-fueled chaos."
Descrição:    (descrição PT da Steam)
Tags:         Ação · Roguelike de Ação · Hack and Slash · Difícil · 2D
Developer:    RDB's Studio
Publisher:    RDB's Studio
Release:      Fevereiro 2026
Preço:        R$ 9,99
Avaliações:   6 análises de usuários
```

**Animações** (`client:visible`):

- Card inteiro: `whileInView`, y 60px → 0 + fade, `viewport: { once: true, amount: 0.3 }`
- Tags: stagger 0.05s entre cada tag (slide-up + fade)
- `dt/dd` pairs: stagger 0.1s (slide-left + fade)
- Border glow: pulse em `blue-light` ao entrar na view (1 ciclo, 1s)

---

### 5.4 TrailerSection

**Layout**: Fundo `#070b10`, container narrow (960px), heading centrado + player frame.

**Embed**: YouTube iframe do trailer oficial (quando disponível).  
**Fallback**: Frame com thumbnail + play button (já implementado).

**Player frame**:

- Border `4px solid blue-light`, border-radius 8px
- Box-shadow `10px 10px 0 gold`, `0 32px 80px rgba(0,0,0,0.48)`
- **Hover**: borda muda para `blue` com glow externo (`box-shadow: 0 0 24px blue-light`)

**Play button**:

- Pulse animation: scale 1.0 → 1.1 → 1.0 loop, 2s interval
- `whileHover`: scale 1.15, background muda de red para gold
- `whileTap`: scale 0.9

**Animação de entrada**:

- Heading: y 30px → 0, fade, `whileInView`
- Frame: scale 0.95 → 1.0 + fade, delay 0.2s

---

### 5.5 FeaturesSection

**Layout**: Fundo gradiente escuro (`#091c2c → #050505`), grid 3 colunas.

**Cards**:

| #   | Ícone SVG     | Título       | Texto                                                                                             |
| --- | ------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| 1   | Espada pixel  | **Upgrades** | "Build your run with upgrades that change how you slice, survive and dominate each wave."         |
| 2   | Inimigo pixel | **Enemies**  | "Face aggressive enemies that force movement, timing and fast decisions."                         |
| 3   | Explosão/caos | **Chaos**    | "Cut through bamboo, dodge pressure and keep momentum as the screen turns into controlled chaos." |

**Ícones**: SVGs pixel art embutidos (substituem os placeholders "UP", "EN", "CH" atuais).  
Cada ícone em fundo dourado `62×62px` com borda pixel.

**Animações** (stagger com `AnimatedSection.tsx`):

- Container: `variants` com `staggerChildren: 0.15`
- Cada card: y 40px → 0 + fade, `hidden → visible`
- Ícone: no hover do card, rotação leve (-5° → 5°) e scale 1.1
- Card hover: `translateY(-6px)`, box-shadow mais intenso, borda muda para `blue-light`

**Efeito Sword Slash entre seções**:

- Ao entrar nesta seção via scroll, um `SwordSlash.tsx` executa:
  - SVG de linha diagonal passa da esq-topo para dir-baixo em 400ms
  - Partículas de luz (sparkles em gold) explodem no ponto final da linha
  - Opacidade vai a 0 após 600ms total

---

### 5.6 GameplayGrid

**Layout**: Fundo `#070b10`, grid 4 colunas (2×2 no mobile).

**Conteúdo**: 4 GIFs/imagens de gameplay da Steam.  
URLs dos assets Steam CDN (quando disponíveis):

```
https://cdn.cloudflare.steamstatic.com/steam/apps/4378340/ss_*.jpg
```

Fallback: usar screenshots da página Steam para as 4 imagens.

**Card structure**:

- Número indexado (label pixel em red)
- Caption em Pixelify Sans
- `figcaption` com texto descritivo do clip

**Animações**:

- Grid: `staggerChildren: 0.1`, cards revelados em sequência
- Cada card: scale 0.9 → 1.0 + fade, `whileInView`
- Hover: `scale: 1.04`, img zoom interno `scale: 1.08`, border glow em blue-light
- Overlay sutil: ao hover, aparece um gradiente `blue-deep` no bottom do thumb com texto

---

### 5.7 FinalCTA

**Layout**: Fundo parallax com a imagem do bambuzal, overlay escuro, texto centralizado.

**Conteúdo**:

- `h2`: "Ready to Enter the Bamboo Storm?"
- Parágrafo: "Add Byrd Ronin to your Steam wishlist and be ready for fast runs, sharp cuts and escalating chaos."
- Botão Steam (variante primary)

**Parallax**:

- Background image `y` transformado via `useScroll` + `useTransform`: ao scrollar para esta seção, a imagem move `-20px` a `+20px` (movimento suave)

**Partículas de pixel** (mesmo sistema do Hero):

- 30 partículas em gold + white, flutuam para cima
- Interagem com o botão: ao hover no botão, um burst de 10 partículas explode do centro

**Animações de entrada**:

- `h2`: y 30px → 0 + fade
- Parágrafo: y 20px → 0 + fade, delay 0.2s
- Botão: y 20px → 0 + scale 0.9 → 1.0, delay 0.4s

---

### 5.8 Footer

**Layout**: border-top sutil, grid 3 colunas (logo | nav links | meta).

**Conteúdo**:

- Logo (PNG, `132px`)
- Links de âncora: Status · Trailer · Features · Gameplay
- Links externos: Steam Page
- Studio: RDB's Studio
- Copyright: © 2026 Byrd Ronin

**Animação**: fade-in suave ao entrar em view (opacity 0 → 1, 0.5s).

---

## 6. Efeitos Especiais

### 6.1 Pixel Particles (`PixelParticles.tsx`)

```tsx
// Configuração
interface ParticleConfig {
  count: number; // 25 mobile / 60 desktop
  colors: string[]; // ['#49c2f2', '#bfb52c', '#f8fafc']
  sizes: number[]; // [2, 4] px
  speedRange: [number, number]; // [0.3, 0.8]
  opacityRange: [number, number]; // [0.15, 0.45]
}

// Renderização: Canvas 2D com requestAnimationFrame
// Performance: usar OffscreenCanvas quando disponível
// Cleanup: cancelAnimationFrame no unmount
```

**Comportamento**:

- Spawn aleatório em `x: 0..width`, `y: height..height+50` (abaixo do fundo)
- Move: `y -= speed` por frame
- Quando `y < -10`: reset para `y = height + random(0, 50)`
- Opacidade pulsa suavemente: `Math.sin(Date.now() * 0.001 + offset) * 0.1 + baseOpacity`

---

### 6.2 Sword Slash (`SwordSlash.tsx`)

Efeito visual que ocorre em transições entre seções ao scrollar.

```tsx
// Trigger: IntersectionObserver quando target section entra em view
// Implementação: SVG animado com motion.path

const slashPath = "M 0 0 L 100 100"; // diagonal da tela
// animate: pathLength 0 → 1 em 300ms, então opacity 1 → 0 em 200ms
// Cor: white com blur filter (glow)
// Após o slash: sparkles em gold (3–5 divs pequenos) se espalham
```

**Variações**:

- Hero entry: slash diagonal grande (full-viewport), espessura 3px
- Mobile menu open: slash diagonal médio (50% viewport), 2px
- Feature section trigger: slash horizontal rápido, espessura 2px

---

### 6.3 Micro-interações de Botão

```tsx
// SteamButton com Framer Motion variants
const buttonVariants = {
  rest: { scale: 1, boxShadow: "0 8px 0 #870707" },
  hover: {
    scale: 1.04,
    boxShadow: "0 12px 0 #870707, 0 0 24px rgba(242,19,19,0.4)",
    transition: { duration: 0.15 },
  },
  tap: {
    scale: 0.97,
    y: 3,
    boxShadow: "0 4px 0 #870707",
    transition: { duration: 0.08 },
  },
};

// Shimmer: pseudo-element CSS animation, linear-gradient branco
// passa da esq para dir em 600ms ao hover
```

---

### 6.4 Scroll Progress Indicator

Barra de progresso fina no topo da página:

- `height: 2px`, gradiente `blue-light → gold → red`
- `scaleX: scrollYProgress` via Framer Motion `useScroll`
- `transformOrigin: "left"`
- `position: fixed`, `z-index: 100`

---

## 7. Responsividade

| Breakpoint  | Layout                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| `< 640px`   | Mobile: single column, hero coluna única, feature grid 1 col, gameplay grid 2 cols |
| `640–980px` | Tablet: feature grid 2 cols, gameplay grid 2 cols, nav sem links (hamburguer)      |
| `> 980px`   | Desktop: layouts completos descritos acima                                         |

### Mobile-specific

- Navbar: logo + hamburger (katana icon) + steam button reduzido
- Hero: personagem se move para atrás do texto, opacity 0.5
- Particle count: reduz para 25
- Sword slash: desabilitado em < 640px (performance)
- Trailer: iframe com `aspect-ratio: 16/9`, fullwidth

---

## 8. Performance

- Imagens: `loading="lazy"` em tudo fora do hero; hero usa `fetchpriority="high"`
- Partículas: canvas com `willReadFrequently: false`; pausa quando tab não está visível (`visibilitychange`)
- Framer Motion: usar `LazyMotion` com `domAnimation` features (reduz bundle)
- Tailwind: purge automático via Astro build
- GIFs: considerar `<video autoplay loop muted playsinline>` como fallback se GIFs forem pesados
- Font: `display=swap` já configurado, preconnect no `<head>`

---

## 9. SEO & Meta

```html
<!-- Já configurado no BaseLayout, verificar/atualizar: -->
<title>Byrd Ronin - Action Roguelite on Steam</title>
<meta
  name="description"
  content="Slice through bamboo, survive enemy waves and master chaotic roguelite runs in Byrd Ronin. Available now on Steam."
/>
<meta property="og:title" content="Byrd Ronin - Action Roguelite on Steam" />
<meta property="og:image" content="/page_bg_raw_gpt.png" />
<meta property="og:type" content="website" />

<!-- A adicionar: -->
<meta name="theme-color" content="#050505" />
<link rel="canonical" href="https://byrdronin.com" />
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Byrd Ronin",
    "description": "...",
    "publisher": { "@type": "Organization", "name": "RDB's Studio" },
    "genre": ["Action", "Roguelite", "Hack and Slash"],
    "operatingSystem": "Windows",
    "url": "https://store.steampowered.com/app/4378340/Byrd_Ronin/"
  }
</script>
```

---

## 10. Analytics & Tracking

Todos os CTAs já têm `data-event` attributes. Implementar listener global:

```ts
// src/scripts/analytics.ts
document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest("[data-event]");
  if (el) {
    const event = el.getAttribute("data-event");
    // gtag / plausible / umami call aqui
    console.log("[analytics]", event);
  }
});
```

**Eventos mapeados**:

- `steam_cta_hero_click` — hero section CTA
- `steam_cta_navbar_click` — navbar CTA
- `steam_cta_strip_click` — status section CTA
- `steam_cta_final_click` — final CTA
- `trailer_play_click` — play do trailer

---

## 11. Assets Necessários

| Asset                         | Status         | Ação                                |
| ----------------------------- | -------------- | ----------------------------------- |
| `/public/logo.png`            | ✅ Presente    | OK                                  |
| `/public/personagem.png`      | ✅ Presente    | OK                                  |
| `/public/page_bg_raw_gpt.png` | ✅ Presente    | OK — substituir por arte final      |
| Trailer YouTube/Steam         | ❌ Pendente    | Aguardar URL do dev                 |
| GIFs de gameplay (4x)         | ❌ Pendente    | Extrair da página Steam ou fornecer |
| SVG ícones das features       | ❌ Pendente    | Criar pixel art SVGs inline         |
| Favicon 32×32, 180×180        | ⚠️ Só logo.png | Gerar variantes                     |
| OG Image 1200×630             | ⚠️ Usa bg GPT  | Criar arte final                    |

---

## 12. Convenções de Código

- **Astro components**: Pascal case, `.astro` extension, slots para conteúdo variável
- **React components**: Em `src/components/react/`, sempre `client:visible` exceto navbar (`client:load`)
- **CSS**: Tailwind classes nos componentes Astro; CSS Module ou inline style apenas para valores dinâmicos
- **Animações**: Toda lógica de Framer Motion fica nos componentes React (`/react/`)
- **Constantes**: `src/consts.ts` — STEAM_URL, STEAM_APP_ID, dados do jogo tipados
- **Sem comentários**: exceto WHY não-óbvios (workarounds de browser, invariantes)

---

## 13. Checklist de Entrega

- [ ] Tailwind v4 integrado e design tokens migrados
- [ ] React integration configurada
- [ ] Framer Motion instalado e `LazyMotion` configurado
- [ ] `PixelParticles.tsx` — canvas funcional com configuração por props
- [ ] `SwordSlash.tsx` — animação SVG com sparkles
- [ ] `AnimatedSection.tsx` — wrapper reutilizável de scroll animation
- [ ] `NavbarClient.tsx` — scroll-aware background
- [ ] `FeatureCard.tsx` — hover animations
- [ ] HeroSection — animações de entrada staggeradas + float do personagem
- [ ] StatusSection — dados reais da Steam + animações
- [ ] TrailerSection — YouTube embed + play button animado
- [ ] FeaturesSection — ícones SVG + cards animados
- [ ] GameplayGrid — imagens Steam CDN + grid animado
- [ ] FinalCTA — parallax + particle burst no botão
- [ ] Scroll progress bar
- [ ] Schema.org VideoGame no `<head>`
- [ ] Responsividade testada nos 3 breakpoints
- [ ] Build sem erros TypeScript
- [ ] Lighthouse Performance > 85
