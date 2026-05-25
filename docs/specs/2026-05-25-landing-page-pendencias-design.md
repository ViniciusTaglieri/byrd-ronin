# Design Spec — Byrd Ronin Landing Page: Pendências

**Data:** 2026-05-25  
**Branch:** improve-ui  
**Escopo:** Resolução de todas as pendências do `docs/pending.md` + SEO extremo + copy PT-BR

---

## Contexto

Landing page do jogo Byrd Ronin (Astro + React + Tailwind). Stack: Astro 5, React, Framer Motion, Tailwind via Vite plugin. O site está funcional mas tem bugs, itens de qualidade pendentes e copy mista EN/PT-BR. Este spec cobre a resolução completa antes do lançamento.

---

## Seção 1 — Infraestrutura Técnica

### 1.1 Bug SteamStatusBadge — ID Duplicado

**Problema:** `SteamStatusBadge.astro` tem `id="status"` (linha 6). O `NavbarClient.tsx` usa `IntersectionObserver` com `document.getElementById("status")` para detectar seção ativa — mas esse ID aponta para o badge flutuante, não para uma seção de conteúdo real.

**Fix:**
- Remover `id="status"` de `SteamStatusBadge.astro`
- Remover o link `{ href: "#status", label: "Status" }` do array `NAV_LINKS` em `src/components/react/NavbarClient.tsx`
- Navbar fica com 3 links: `Trailer | Features | Gameplay`

### 1.2 Remoção do StatusSection

`src/components/StatusSection.astro` existe no filesystem mas não está importada em nenhuma página. Deletar o arquivo.

### 1.3 Limpeza YouTube

`YOUTUBE_TRAILER_ID` é string vazia e nunca será preenchida.

**Fix:**
- Remover `export const YOUTUBE_TRAILER_ID` de `src/consts.ts`
- Remover import e uso de `YOUTUBE_TRAILER_ID` em `src/components/TrailerSection.astro`
- Simplificar `src/components/react/TrailerPlayer.tsx`: remover toda lógica de iframe YouTube, manter apenas o player do `trailer.mp4` local
- O botão "Assistir Trailer" no hero permanece — rola para `#trailer` que ainda exibe o vídeo local

### 1.4 Webmanifest

**Criar** `public/site.webmanifest`:
```json
{
  "name": "Byrd Ronin",
  "short_name": "Byrd Ronin",
  "description": "Action roguelite hack and slash 2D. Disponível na Steam.",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#050505",
  "background_color": "#050505",
  "icons": [
    { "src": "/favicon.ico", "sizes": "any", "type": "image/x-icon" }
  ]
}
```

**Adicionar** em `BaseLayout.astro` `<head>`:
```html
<link rel="manifest" href="/site.webmanifest" />
```

### 1.5 Sitemap + robots.txt

**`astro.config.mjs`:** adicionar `@astrojs/sitemap` às integrações:
```js
import sitemap from "@astrojs/sitemap";
// integrations: [react(), sitemap()]
```
Instalar: `npm install @astrojs/sitemap`. O `site: "https://byrdronin.com"` já está configurado.

**Criar** `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://byrdronin.com/sitemap-index.xml
```

### 1.6 Self-hosting Fontes

**Instalar:**
```
npm install @fontsource-variable/inter @fontsource/pixelify-sans
```

**`src/styles/global.css`:** substituir quaisquer imports de Google Fonts por:
```css
@import "@fontsource-variable/inter";
@import "@fontsource/pixelify-sans/600.css";
@import "@fontsource/pixelify-sans/700.css";
```

**`BaseLayout.astro`:** remover os 3 `<link>` do Google Fonts (preconnect googleapis, preconnect gstatic, stylesheet) — zero dependência externa de fontes.

O `tailwind.config.js` usa `'"Inter"'` e `'"Pixelify Sans"'` — sem mudança.

---

## Seção 2 — Analytics (Umami)

### Configuração via variáveis de ambiente

**Criar/atualizar** `.env` (e documentar em `.env.example`):
```
PUBLIC_UMAMI_SRC=https://sua-instancia.umami.is/script.js
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

O deploy do Umami pode ser feito via Railway ou Vercel (self-hosted gratuito).

### Integração em `BaseLayout.astro`

**No `<head>`** — script condicional:
```astro
{import.meta.env.PUBLIC_UMAMI_WEBSITE_ID && (
  <script
    is:inline
    defer
    src={import.meta.env.PUBLIC_UMAMI_SRC}
    data-website-id={import.meta.env.PUBLIC_UMAMI_WEBSITE_ID}
  />
)}
```

**No `<body>`** — listener para eventos `data-event`:
```html
<script is:inline>
  document.addEventListener("click", function(e) {
    var el = e.target.closest("[data-event]");
    if (!el) return;
    if (window.umami) window.umami.track(el.getAttribute("data-event"));
  });
</script>
```

### Eventos mapeados (já existentes no HTML)

| Evento | Localização |
|---|---|
| `steam_cta_hero_click` | Botão Steam no Hero |
| `steam_cta_navbar_click` | Botão Steam no Navbar |
| `steam_cta_mobile_click` | Botão Steam no menu mobile |
| `steam_cta_final_click` | Botão Steam no FinalCTA |
| `steam_cta_footer_click` | Botão Steam no Footer |
| `steam_cta_404_click` | Botão Steam na página 404 (novo) |
| `trailer_play_click` | Botão "Assistir Trailer" no Hero |

---

## Seção 3 — SEO + Copy PT-BR

### 3.1 Metadados `BaseLayout.astro`

| Campo | Novo valor |
|---|---|
| `<title>` (default) | `Byrd Ronin — Roguelite Hack and Slash 2D \| Steam` |
| `<meta name="description">` | `Corte bambus, enfrente ondas de inimigos e domine runs caóticas. Byrd Ronin é um roguelite hack and slash 2D no Steam — combate preciso, upgrades intensos, caos garantido.` |
| `og:title` | igual ao `<title>` |
| `og:description` | `Action roguelite 2D com combate preciso e progressão intensa. Disponível agora na Steam.` |
| `twitter:title` | igual ao `<title>` |
| `twitter:description` | igual ao `<meta description>` |

### 3.2 Schema.org — melhorias

Adicionar ao objeto JSON-LD existente:
```json
{
  "inLanguage": "pt-BR",
  "applicationCategory": "Game",
  "keywords": "roguelite, hack and slash, jogo indie, 2D, Steam, ação, roguelike, jogo brasileiro",
  "audience": {
    "@type": "Audience",
    "audienceType": "gamers"
  }
}
```

### 3.3 Copy por componente

**`src/components/react/HeroAnimations.tsx` (HeroCopy):**
- `"Available on Steam"` → `"Disponível na Steam"`
- H1 `"Slice Through Chaos. Become the Ronin."` — mantém (frase de marca em EN é intencional)
- Corpo e botões já estão em PT-BR ✓

**`src/components/TrailerSection.astro`:**
- `"pressure constante"` → `"pressão constante"`
- Demais textos já estão PT-BR ✓

**`src/consts.ts` — `GAME.tags`:**
- Adicionar `"Indie"` ao array de tags para aparecer em buscas locais Steam

**`src/components/FeaturesSection.astro`, `GameplayGrid.astro`, `RoninQuote.astro`, `FinalCTA.astro`, `Footer.astro`:**
- Inspecionar durante implementação
- Qualquer texto em EN (exceto termos de gênero: Roguelite, Hack and Slash, Steam, Features, Gameplay) deve ser reescrito em PT-BR com foco em naturalidade e densidade de keyword

**Navbar labels:** `Trailer | Features | Gameplay` — mantém EN (termos universais de gênero, melhor SEO global)

---

## Seção 4 — Página 404

**Arquivo:** `src/pages/404.astro`

**`<title>`:** `"404 — Run Encerrada | Byrd Ronin"`

**Estrutura:**
```
BaseLayout (herda fontes, FallingLeaves, analytics)
└── header simples: logo linkando para /
└── main (min-h-dvh, flex center)
    ├── eyebrow: [ RUN ENCERRADA ]  — font-display, text-bamboo, tracking-widest
    ├── h1 "404"                    — font-display, text-scarlet, clamp(120px,20vw,200px), pixel shadow
    ├── p  "Você caiu no caos errado."        — text-white, font-display
    ├── p  "Esta página não existe — mas sua próxima run sim." — text-muted
    └── div (flex gap)
        ├── <a href="/"> ← Voltar ao início </a>    — botão secundário (border bamboo)
        └── SteamButtonAnimated event="steam_cta_404_click"
└── fundo: hero-bg.png opacity-20 + gradiente escuro (igual ao hero)
```

**Sem navbar** — contexto isolado de erro.  
**Com FallingLeaves** — herdado pelo BaseLayout automaticamente.

---

## Arquivos afetados

| Arquivo | Operação |
|---|---|
| `src/components/SteamStatusBadge.astro` | Editar — remover `id="status"` |
| `src/components/StatusSection.astro` | **Deletar** |
| `src/components/react/NavbarClient.tsx` | Editar — remover link "Status" |
| `src/consts.ts` | Editar — remover `YOUTUBE_TRAILER_ID`, adicionar tag "Indie" |
| `src/components/TrailerSection.astro` | Editar — remover prop `youtubeId`, "pressure" → "pressão" |
| `src/components/react/TrailerPlayer.tsx` | Editar — remover código YouTube |
| `src/layouts/BaseLayout.astro` | Editar — analytics, manifest, remover Google Fonts, SEO copy |
| `src/styles/global.css` | Editar — imports fontsource |
| `src/components/react/HeroAnimations.tsx` | Editar — "Available on Steam" → PT-BR |
| `src/components/FeaturesSection.astro` | Editar — copy EN → PT-BR |
| `src/components/GameplayGrid.astro` | Editar — copy EN → PT-BR |
| `src/components/RoninQuote.astro` | Editar — copy EN → PT-BR |
| `src/components/FinalCTA.astro` | Editar — copy EN → PT-BR |
| `src/components/Footer.astro` | Editar — copy EN → PT-BR |
| `astro.config.mjs` | Editar — adicionar sitemap integration |
| `tailwind.config.js` | Sem mudança |
| `public/site.webmanifest` | **Criar** |
| `public/robots.txt` | **Criar** |
| `src/pages/404.astro` | **Criar** |
| `.env` / `.env.example` | **Criar** |
| `docs/pending.md` | Atualizar — marcar itens resolvidos |
