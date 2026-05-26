# Body Gradient + Section Backgrounds Redesign

## Objetivo

Substituir o fundo preto sólido do `body` por um gradiente vertical temático, tornar todas as sections transparentes e enriquecer seus backgrounds com padrões e elementos decorativos — sem alterar as cores/tom de cada section.

## Gradiente do Body

Aplicado via Tailwind no elemento `body` em `src/layouts/BaseLayout.astro`:

```
bg-[linear-gradient(to_bottom,#6b8f5e_0%,#0d1a0f_20%,#050505_55%,#050505_100%)]
```

- `#6b8f5e` (bamboo) no topo — coincide com o hero
- `#0d1a0f` (forest) ~20% — zona do trailer/features
- `#050505` (black) a partir de ~55% — gameplay, quote, CTA, footer

O `html` recebe `h-full` para garantir que o body se estenda pelo tamanho real da página (sem repeat do gradiente).

Remove: `bg-black` do `body`.

## Sections — Mudanças por Componente

### HeroSection (`src/components/HeroSection.astro`)
Sem mudança. Já não tem `bg-*` próprio; tem bg-image e overlays absolutos. ✓

### TrailerSection (`src/components/TrailerSection.astro`)
- Remove: `bg-forest`
- Mantém: kanjis decorativos, scanlines horizontais, vinheta inferior
- Adiciona: padrão de pontos `bg-[radial-gradient(circle,rgba(107,143,94,0.07)_1px,transparent_1px)] bg-[size:24px_24px]` (mesmo padrão da FeaturesSection)

### FeaturesSection (`src/components/FeaturesSection.astro`)
- Remove: `bg-[#070b07]`
- Mantém: dot grid e BambooDecor existentes — praticamente sem mudança visual

### GameplayGrid (`src/components/GameplayGrid.astro`)
- Remove: `bg-black`
- Mantém: BambooDecor e fade-top gradient existentes
- Adiciona: scanline horizontal fina no centro (consistente com TrailerSection)

### RoninQuote (`src/components/RoninQuote.astro`)
- Remove: `bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(13,26,15,0.95)_0%,rgba(5,5,5,1)_100%)]` opaco
- Adiciona: overlay radial leve `bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(13,26,15,0.4)_0%,transparent_100%)]` para manter profundidade sem bloquear o body

### FinalCTA (`src/components/react/FinalCTAClient.tsx`)
- Sem mudança necessária. O `section` já não tem `bg-*`; tem uma card interna com bg-image (parallax) e gradientes de overlay que devem ser mantidos. ✓

### Footer (`src/components/Footer.astro`)
- Substitui `bg-black` por `bg-black/80` — suaviza o corte visual no fim da página

### SlashDivider (`src/components/react/SlashDivider.tsx`)
- Sem mudança de código — blenda automaticamente com o body ao remover o contexto sólido ao redor

## Resultado Esperado

- Scroll top→bottom: verde bamboo → verde floresta → preto
- Cada section tem textura/decoração própria sem interromper o fluxo do gradiente
- SlashDivider funciona naturalmente sem fundo preto visível
