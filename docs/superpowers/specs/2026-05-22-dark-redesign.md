# Dark Redesign — Spec

**Goal:** Refatoração visual completa para dark theme coeso e harmonioso. Eliminar identidade dividida do redesign "friendly" anterior. Corrigir todos os bugs visuais identificados na screenshot.

**Approach:** Dark Zones — alternância sutil de três escuros (`black`, `ink`, `forest`) com sistema de acento unificado (`bamboo`, `gold`, `blue-light`).

---

## Sistema de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `black` | `#050505` | Hero, Features, Footer — base mais escura |
| `ink` | `#0b1220` | Status, Gameplay — navy escuro |
| `forest` | `#0d1a0f` | Trailer, Final CTA — verde escuro |
| `panel` | `#18181b` | Cards, surfaces elevadas |
| `bamboo` | `#6b8f5e` | Fio condutor: bordas, kickers, hovers |
| `gold` | `#bfb52c` | Destaque, títulos especiais |
| `blue-light` | `#49c2f2` | Labels, kickers secundários |
| `muted` | `#b8cadb` | Texto de corpo |
| `white` | `#f8fafc` | Títulos principais |

**Ritmo de seções:** black (Hero) → ink (Status) → forest (Trailer) → black (Features) → ink (Gameplay) → forest (Final CTA) → black (Footer)

---

## Navbar

- Background: `rgba(5,5,5,0.85)` + `backdrop-blur-xl`
- Borda: `border-bamboo/20`
- Links: `text-white/80`, hover `text-bamboo` + underline bamboo slide
- CTA: SteamButtonAnimated variant primary (mantido)
- **Remover** BambooNavStalk — era para navbar branca
- Menu mobile: `bg-ink`, borda `border-bamboo/25`
- Scroll: sombra aumenta, background escurece para `rgba(5,5,5,0.96)`

---

## Hero

Sem mudança estrutural — já funciona visualmente.

- Ajuste do overlay: `from-black/95 via-black/60 to-transparent` (mais respiro para o personagem)
- Botão ghost: `border-white/30 bg-white/5`, hover `border-bamboo/60 bg-white/10`
- Sem outras mudanças

---

## Status Section

**Bug corrigido:** remover `-mt-18` (overlap awkward com hero).

- `bg-ink py-24`
- Separador visual no topo: `border-t border-bamboo/20`
- `StatusAnimations` wrapper mantido — o que muda é o `div` interno: sem `bg-gradient`, sem `border`, sem `shadow-2xl` — layout direto no fundo da seção
- Grid 2 colunas: texto principal esquerda, meta + tags + CTA direita
- Kicker: `text-blue-light text-sm uppercase tracking-widest`
- Título: `text-white font-display text-5xl xl:text-7xl leading-tight`
- Parágrafo: `text-muted`
- Tags: `border-bamboo/40 text-bamboo bg-bamboo/10` (chips arredondadas mantidas)
- dl: ícones SVG + label `text-blue-light text-xs uppercase` + valor `text-white font-bold`

---

## Trailer Section

- `bg-forest py-24`
- Grid `2fr 1fr`, vídeo esquerda, texto direita
- TrailerPlayer: `border-bamboo/30`, sombra `shadow-[4px_4px_0_rgba(107,143,94,0.4)]`
- Kicker: `text-bamboo`
- Título: `text-white font-display text-2xl`
- Parágrafo: `text-muted`
- Link: `text-bamboo font-bold hover:underline`

---

## Features Section

**Bug corrigido:** SVGs de ícone têm `width="32" height="32"` hardcoded → remover atributos width/height, manter apenas `viewBox`. Container é `w-16 h-16`.

**Layout corrigido:** trocar 3 linhas horizontais alternadas por **grid 3 colunas**.

- `bg-black py-24`
- Heading: `text-white`, kicker: `text-bamboo`
- Grid: `grid-cols-3 max-[980px]:grid-cols-1 gap-6`
- Cada card: `bg-panel border border-bamboo/20 rounded-2xl p-8 flex flex-col gap-5`
- Ícone: container `w-16 h-16`, cor aplicada via `className` no wrapper (`text-gold`, `text-blue-light`, `text-red`)
- Hover: `border-bamboo/50`, `y: -4`, `boxShadow: "4px 4px 0 rgba(107,143,94,0.4)"`
- Animação de entrada: stagger com `whileInView`
- Remover `BambooDivider`

---

## Gameplay Section

- `bg-ink py-24`
- Kicker: `text-bamboo`, heading: `text-white`
- Cards mantidos: `bg-panel border-bamboo/25 rounded-xl`
- Caption slide-up mantido (funciona bem)
- Sem mudanças estruturais

---

## Final CTA

- `bg-forest py-24`
- **Remover** `rounded-2xl` card wrapper interno — layout full-width dentro da seção
- Grid `2 colunas`: imagem esquerda com parallax, conteúdo direita
- Coluna direita: `bg-transparent` (herda forest da seção, sem gradiente redundante)
- Kicker: `text-blue-light`, título: `text-white text-4xl xl:text-5xl`, parágrafo: `text-muted`
- Divisor antes do CTA: `border-t border-bamboo/15 pt-6`

---

## Footer

Mantido como está — já é dark. Polimentos:
- `border-t border-bamboo/20` (já existe)
- Logo: `w-36` (reduzir levemente se muito grande)

---

## Bugs Corrigidos

1. **FeatureIcons SVG size** — `width/height` hardcoded `32` → remover, ícones passam a preencher container
2. **Status `-mt-18` overlap** — removido, seção ocupa posição normal no fluxo
3. **Body bg-cream** → `bg-black`
4. **Navbar branca** → dark glassmorphism
5. **bg-cream / bg-sky / bg-white nas seções** → `bg-ink` / `bg-forest` / `bg-black`
6. **Feature layout horizontal esparso** → grid 3 colunas compacto com cards menores

---

## Arquivos Modificados

- `src/layouts/BaseLayout.astro` — body `bg-black text-white`
- `src/components/react/NavbarClient.tsx` — dark glassmorphism, remover BambooNavStalk
- `src/components/HeroSection.astro` — ajuste de overlay
- `src/components/StatusSection.astro` — bg-ink, sem overlap, sem card wrapper
- `src/components/TrailerSection.astro` — bg-forest
- `src/components/FeaturesSection.astro` — bg-black
- `src/components/react/FeatureGrid.tsx` — grid 3 cols, fix ícone size
- `src/components/react/FeatureIcons.tsx` — remover width/height dos SVGs
- `src/components/GameplayGrid.astro` — bg-ink
- `src/components/react/FinalCTAClient.tsx` — bg-forest, sem card wrapper
