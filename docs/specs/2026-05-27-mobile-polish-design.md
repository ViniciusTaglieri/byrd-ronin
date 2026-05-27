# Design: Mobile Polish + Tailwind Semântico

**Data:** 2026-05-27  
**Branch:** `claude/mobile`  
**Escopo:** Melhorias de design mobile + refatoração completa de valores arbitrários do Tailwind para tokens semânticos no `tailwind.config.js`.

---

## Contexto

O site Byrd Ronin (Astro + React + Tailwind) apresenta vários problemas visuais em mobile. Paralelamente, o codebase usa extensivamente valores arbitrários Tailwind (`max-[640px]:`, `text-[clamp(...)]`, `grid-cols-[...]`) que serão substituídos por tokens nomeados no config para manter consistência semântica.

---

## Seção 1 — tailwind.config.js: Tokens Semânticos

### Screens

```js
screens: {
  mobile:  { max: "640px" },   // smartphones portrait
  phablet: { max: "768px" },   // large phones / small tablets
  tablet:  { max: "980px" },   // tablets / landscape
  wide:    { min: "1200px" },  // desktop large
}
```

Substitui: `max-[640px]:`, `max-[768px]:`, `max-[980px]:`, `min-[1200px]:` em todos os arquivos.

### Font Sizes

```js
fontSize: {
  "hero":        ["clamp(54px,7vw,96px)",    { lineHeight: "0.88" }],
  "hero-mobile": ["clamp(46px,18vw,68px)",   { lineHeight: "0.88" }],
  "section-xl":  ["clamp(2.8rem,5vw,4.5rem)",{ lineHeight: "0.88" }],
  "section-md":  ["clamp(1.8rem,3vw,2.8rem)",{ lineHeight: "1.15" }],
  "quote":       ["clamp(1.6rem,4vw,3rem)",  { lineHeight: "1.15" }],
  "deco-kanji":  ["clamp(3rem,4.5vw,5rem)",  { lineHeight: "1" }],
  "deco-quote":  ["clamp(5rem,14vw,9rem)",   { lineHeight: "1" }],
  "display-404": ["clamp(96px,20vw,200px)",  { lineHeight: "1" }],
}
```

Arquivos afetados: `HeroAnimations.tsx`, `GameplayGridClient.tsx`, `TrailerSection.astro`, `RoninQuote.astro`, `404.astro`.

### Widths

```js
width: {
  // já existentes — não alterar:
  // "container-page": "min(1160px, calc(100% - 40px))"
  // "container-narrow": "min(860px, calc(100% - 40px))"
  "navbar":      "min(1180px, calc(100% - 28px))",
  "cta-section": "min(1200px, calc(100% - 48px))",
}
```

Arquivos afetados: `NavbarClient.tsx` (`w-[min(1180px,...)]`), `FinalCTAClient.tsx` (`w-[min(1200px,...)]`).

### Grid Template Columns

```js
gridTemplateColumns: {
  "navbar":        "auto 1fr auto",
  "trailer":       "4fr 7fr",
  "gameplay-even": "3fr 5fr",
  "gameplay-odd":  "5fr 3fr",
}
```

Arquivos afetados: `NavbarClient.tsx`, `TrailerSection.astro`, `GameplayGridClient.tsx`.

### Z-Index

```js
zIndex: { "menu": "39" }
```

Arquivo afetado: `NavbarClient.tsx` (`z-39` → `z-menu`).

### Max Width

```js
maxWidth: { "205": "51.25rem" }
```

Arquivo afetado: `HeroAnimations.tsx` (`max-w-205`).

### CSS Utilities (global.css)

Shadows e text-shadows complexos não suportados nativamente pelo Tailwind:

```css
@utility shadow-video         { box-shadow: 4px 4px 0 rgba(191,181,44,0.25), 0 32px 80px rgba(0,0,0,0.48); }
@utility shadow-steam-btn     { box-shadow: 0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.32); }
@utility drop-shadow-character{ filter: drop-shadow(0 36px 48px rgba(0,0,0,0.5)); }
@utility text-shadow-hero     { text-shadow: 5px 5px 0 rgba(0,0,0,0.74); }
@utility text-shadow-section  { text-shadow: 3px 3px 0 rgba(0,0,0,0.6); }
```

Arquivos afetados: `SteamButtonAnimated.tsx`, `TrailerPlayer.tsx`, `HeroAnimations.tsx`, `TrailerSection.astro`.

---

## Seção 2 — Correções Mobile

### Navbar (`NavbarClient.tsx`)

**Problemas:**
1. Layout mobile da navbar: `[Logo][CTA][Hamburger]` mas CTA não está centralizado
2. Altura reduzida no mobile (`py-3`)
3. Menu dropdown com fundo transparente (`bg-ink` não existe no config)
4. Botão "JOGAR AGORA" aparece dentro do menu expandido

**Fixes:**
- Grid da navbar: muda para `grid-cols-navbar` em todos os breakpoints (auto 1fr auto) — logo esquerda, CTA no centro (1fr com `justify-self-center`), hamburger direita
- Altura: remove `mobile:py-3`, usa `py-4` em todos os tamanhos
- Menu: troca `bg-ink` por `bg-black` (cor sólida `#050505`)
- Menu: remove o bloco `<div className="mt-2 pt-3 border-t ..."><SteamButtonAnimated /></div>`

### Hero (`HeroAnimations.tsx`)

**Problema:** Personagem com `mobile:opacity-35` — muito transparente.

**Fix:** Remove a classe `mobile:opacity-35` do `<img>` do personagem → opacidade 100% no mobile.

### Steam Widget (`SteamWidget.astro`)

**Problemas:**
1. Sem padding horizontal no mobile — widget cola nas bordas
2. Posicionamento absoluto sobrepõe o personagem do Hero no mobile

**Fixes:**
- Adiciona `mobile:px-4` ao container
- No mobile: troca posicionamento absoluto por `relative` com `mobile:static mobile:translate-y-0 mobile:mt-4 mobile:mb-0` — widget passa a fluir abaixo do Hero, não sobre ele

### Trailer (`TrailerSection.astro`)

**Problema:** No mobile, vídeo aparece antes do texto (`tablet:order-1` no vídeo, `tablet:order-2` no texto).

**Fix:** Remove `tablet:order-2` da coluna de texto e `tablet:order-1` da coluna de vídeo. O fluxo natural do HTML (texto → vídeo) fica correto.

### Features (`FeatureGrid.tsx` + novo `FeatureCarousel.tsx`)

**Problema:** Grid de 3 colunas colapsa para 1 coluna no mobile — cards empilhados, sem paginação.

**Fix:** Cria `src/components/react/FeatureCarousel.tsx`:
- Drag horizontal com Framer Motion (`drag="x"`, `dragConstraints`)
- Snap automático por card usando `dragElastic` + `onDragEnd` calculando card ativo
- Dots de paginação abaixo (3 dots, ativo em bamboo)
- `FeatureGrid.tsx` detecta mobile via `matchMedia("(max-width: 768px)")` em `useEffect` e renderiza `FeatureCarousel` ou o grid original

### Gameplay (`GameplayGridClient.tsx`)

**Problema:** No mobile, rows ímpares colocam vídeo antes do texto.

**Fix:** Adiciona `phablet:order-first` ao `textCol` e `phablet:order-last` ao `videoCol` em ambos os casos (even e odd), forçando sempre texto → vídeo no mobile.

### Ronin Quote (`RoninQuote.astro`)

**Problema:** Aspas decorativas abertura (`"`) com `absolute -top-4 left-0` e font-size `deco-quote` sobrepõem o header "O Caminho do Ronin" no mobile.

**Fix:** Adiciona `mobile:mt-8` ao bloco `.flex.items-center.gap-4.mb-10` (header decorativo com linha + título) para criar espaço suficiente abaixo das aspas.

### Final CTA (`FinalCTAClient.tsx`)

**Problema:** `bg-center` na imagem de fundo — no mobile o sujeito da imagem fica cortado.

**Fix:** Adiciona `mobile:bg-left` ao elemento de background para alinhar a imagem à esquerda no mobile.

### Footer (`Footer.astro`)

**Problema:** Colunas Navegação e Redes ficam alinhadas à esquerda no mobile.

**Fix:** Adiciona `mobile:items-center mobile:text-center` às colunas de Navegação (col 2) e Redes (col 3).

---

## Arquivos Modificados

| Arquivo | Tipo de mudança |
|---|---|
| `tailwind.config.js` | Adiciona tokens semânticos |
| `src/styles/global.css` | Adiciona `@utility` para shadows |
| `src/components/react/NavbarClient.tsx` | Refatora + fix mobile |
| `src/components/react/HeroAnimations.tsx` | Refatora + fix mobile |
| `src/components/react/FeatureGrid.tsx` | Refatora + usa FeatureCarousel |
| `src/components/react/FeatureCarousel.tsx` | **Novo** — carrossel Framer Motion |
| `src/components/react/GameplayGridClient.tsx` | Refatora + fix mobile ordem |
| `src/components/react/FinalCTAClient.tsx` | Refatora + fix bg-left mobile |
| `src/components/react/SteamButtonAnimated.tsx` | Refatora shadow |
| `src/components/react/TrailerPlayer.tsx` | Refatora shadow |
| `src/components/HeroSection.astro` | Refatora breakpoints |
| `src/components/SteamWidget.astro` | Fix mobile positioning |
| `src/components/TrailerSection.astro` | Refatora + fix ordem mobile |
| `src/components/FeaturesSection.astro` | Sem mudança (usa FeatureGrid) |
| `src/components/RoninQuote.astro` | Refatora + fix quote overlap |
| `src/components/Footer.astro` | Refatora + fix mobile align |
| `src/pages/404.astro` | Refatora breakpoints/fontsize |

---

## Fora de Escopo

- Mudanças em desktop/tablet (apenas mobile é afetado nas correções)
- Novos assets ou imagens
- Alterações de conteúdo (textos, links)
- Outros componentes não listados acima
