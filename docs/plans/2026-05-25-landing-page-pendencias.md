# Landing Page Pendências — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver todas as pendências da landing page Byrd Ronin: bug fix de ID duplicado, remoção de código YouTube morto, webmanifest, sitemap, self-hosting de fontes, analytics Umami, SEO completo com copy PT-BR e página 404 temática.

**Architecture:** Astro 5 com React para componentes interativos, Tailwind via plugin Vite. Modificações cirúrgicas em componentes existentes — sem novos padrões ou abstrações. Tasks são independentes e ordenadas por risco crescente (infra → conteúdo → nova página).

**Tech Stack:** Astro 5, React 19, Framer Motion, Tailwind CSS 4, @fontsource, @astrojs/sitemap, Umami Analytics

---

## File Map

| Arquivo | Operação |
|---|---|
| `src/components/SteamStatusBadge.astro` | Editar — remover `id="status"` |
| `src/components/react/NavbarClient.tsx` | Editar — remover link "Status" |
| `src/components/StatusSection.astro` | **Deletar** |
| `src/consts.ts` | Editar — remover `YOUTUBE_TRAILER_ID`, adicionar tag "Indie" |
| `src/components/TrailerSection.astro` | Editar — remover prop `youtubeId`, corrigir copy |
| `src/components/react/TrailerPlayer.tsx` | Editar — remover toda lógica YouTube |
| `public/site.webmanifest` | **Criar** |
| `public/robots.txt` | **Criar** |
| `astro.config.mjs` | Editar — adicionar sitemap |
| `src/styles/global.css` | Editar — imports fontsource |
| `src/layouts/BaseLayout.astro` | Editar — remover Google Fonts, analytics, SEO, manifest |
| `.env.example` | **Criar** |
| `src/components/react/HeroAnimations.tsx` | Editar — "Available on Steam" → PT-BR |
| `src/components/react/FinalCTAClient.tsx` | Editar — "Available on Steam" → PT-BR |
| `src/pages/404.astro` | **Criar** |

---

## Task 1: Instalar dependências

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Instalar pacotes**

```bash
pnpm add @fontsource-variable/inter @fontsource/pixelify-sans @astrojs/sitemap
```

Saída esperada: `packages linked` sem erros.

- [ ] **Step 2: Verificar node_modules**

```bash
ls node_modules/@fontsource-variable/inter
ls node_modules/@fontsource/pixelify-sans
ls node_modules/@astrojs/sitemap
```

Esperado: diretórios existem.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install fontsource, sitemap deps"
```

---

## Task 2: Bug Fix — SteamStatusBadge + NavbarClient

**Files:**
- Modify: `src/components/SteamStatusBadge.astro`
- Modify: `src/components/react/NavbarClient.tsx`

**Problema:** `SteamStatusBadge.astro` tem `id="status"` mas o navbar também observa `#status` via IntersectionObserver. O badge flutuante no hero intercepta o seletor antes da seção real, impedindo que o link fique ativo no momento certo.

- [ ] **Step 1: Remover `id="status"` do badge**

Em `src/components/SteamStatusBadge.astro`, linha 6, mudar:

```astro
<div
  id="status"
  class="status-badge-wrap absolute bottom-0 left-0 right-0 z-20 flex justify-center px-5 translate-y-1/2 pointer-events-none"
>
```

para:

```astro
<div
  class="status-badge-wrap absolute bottom-0 left-0 right-0 z-20 flex justify-center px-5 translate-y-1/2 pointer-events-none"
>
```

- [ ] **Step 2: Remover link "Status" do navbar**

Em `src/components/react/NavbarClient.tsx`, substituir o array `NAV_LINKS`:

```ts
const NAV_LINKS = [
  { href: "#status", label: "Status" },
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];
```

por:

```ts
const NAV_LINKS = [
  { href: "#trailer", label: "Trailer" },
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "Gameplay" },
];
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: build sem erros. Navbar deve aparecer com 3 links.

- [ ] **Step 4: Commit**

```bash
git add src/components/SteamStatusBadge.astro src/components/react/NavbarClient.tsx
git commit -m "fix: remove duplicate id=status from badge, drop Status nav link"
```

---

## Task 3: Deletar StatusSection

**Files:**
- Delete: `src/components/StatusSection.astro`

**Contexto:** Arquivo existe no filesystem mas não está importado em nenhuma página. Nunca é renderizado.

- [ ] **Step 1: Deletar o arquivo**

```bash
rm src/components/StatusSection.astro
```

- [ ] **Step 2: Verificar que nenhum arquivo o importa**

```bash
grep -r "StatusSection" src/
```

Esperado: nenhuma saída (zero ocorrências).

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: build limpo.

- [ ] **Step 4: Commit**

```bash
git add -u src/components/StatusSection.astro
git commit -m "chore: delete unused StatusSection component"
```

---

## Task 4: Limpeza YouTube — TrailerPlayer + consts + TrailerSection

**Files:**
- Modify: `src/consts.ts`
- Modify: `src/components/react/TrailerPlayer.tsx`
- Modify: `src/components/TrailerSection.astro`

**Contexto:** `YOUTUBE_TRAILER_ID` é string vazia e nunca será preenchida. O `TrailerPlayer` tem lógica condicional de iframe YouTube desnecessária.

- [ ] **Step 1: Remover `YOUTUBE_TRAILER_ID` de `src/consts.ts`**

Remover a linha:

```ts
export const YOUTUBE_TRAILER_ID = ""; // preencher quando disponível
```

O arquivo também tem `STEAM_URL` e `STEAM_APP_ID` — manter esses.

- [ ] **Step 2: Reescrever `src/components/react/TrailerPlayer.tsx`**

Substituir o conteúdo completo do arquivo por:

```tsx
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function TrailerPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-bamboo/35 rounded bg-black shadow-[4px_4px_0_rgba(191,181,44,0.25),0_32px_80px_rgba(0,0,0,0.48)]"
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.25 }}
      >
        <video
          src="/trailer.mp4"
          poster="/hero-bg.png"
          muted
          loop
          playsInline
          autoPlay
          controls
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            display: "block",
            filter: "saturate(1.2) brightness(0.65)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Atualizar `src/components/TrailerSection.astro`**

Remover o import de `YOUTUBE_TRAILER_ID` e a prop `youtubeId`. Também corrigir `"pressure"` → `"pressão"`.

No frontmatter, mudar:

```astro
---
import { YOUTUBE_TRAILER_ID } from "../consts";
import { TrailerPlayer } from "./react/TrailerPlayer";
---
```

para:

```astro
---
import { TrailerPlayer } from "./react/TrailerPlayer";
---
```

Na linha que renderiza o TrailerPlayer, mudar:

```astro
<TrailerPlayer youtubeId={YOUTUBE_TRAILER_ID} client:visible />
```

para:

```astro
<TrailerPlayer client:visible />
```

No corpo do texto (linha com "pressure"), mudar:

```
Cortes rápidos, pressure constante e upgrades que mudam tudo a cada
rodada. Cada run é uma nova chance de dominar o caos.
```

para:

```
Cortes rápidos, pressão constante e upgrades que mudam tudo a cada
rodada. Cada run é uma nova chance de dominar o caos.
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Esperado: sem erros TypeScript. O trailer section deve renderizar o vídeo local.

- [ ] **Step 5: Commit**

```bash
git add src/consts.ts src/components/react/TrailerPlayer.tsx src/components/TrailerSection.astro
git commit -m "chore: remove YouTube trailer integration, simplify TrailerPlayer"
```

---

## Task 5: Webmanifest + robots.txt

**Files:**
- Create: `public/site.webmanifest`
- Create: `public/robots.txt`

- [ ] **Step 1: Criar `public/site.webmanifest`**

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
    {
      "src": "/favicon.ico",
      "sizes": "any",
      "type": "image/x-icon"
    }
  ]
}
```

- [ ] **Step 2: Criar `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://byrdronin.com/sitemap-index.xml
```

- [ ] **Step 3: Commit**

```bash
git add public/site.webmanifest public/robots.txt
git commit -m "feat: add webmanifest and robots.txt"
```

---

## Task 6: Sitemap (astro.config.mjs)

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Atualizar `astro.config.mjs`**

Substituir o conteúdo completo por:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://byrdronin.com",

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["docs/*"],
      },
    },
  },

  integrations: [react(), sitemap()],
});
```

- [ ] **Step 2: Verificar build gera o sitemap**

```bash
npm run build
```

Depois verificar:

```bash
ls dist/sitemap*
```

Esperado: `dist/sitemap-index.xml` e `dist/sitemap-0.xml` existem.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: add sitemap integration"
```

---

## Task 7: Self-hosting Fontes

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Atualizar `src/styles/global.css`**

Substituir o conteúdo completo por:

```css
@import "@fontsource-variable/inter";
@import "@fontsource/pixelify-sans/600.css";
@import "@fontsource/pixelify-sans/700.css";
@import "tailwindcss";
@config "../../tailwind.config.js";
```

- [ ] **Step 2: Remover Google Fonts do `src/layouts/BaseLayout.astro`**

No `<head>`, remover estas 3 linhas:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Pixelify+Sans:wght@600;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 3: Verificar build e fontes**

```bash
npm run build
```

Esperado: build limpo. As fontes Inter e Pixelify Sans devem estar nos assets do build (`dist/_astro/`). Verificar:

```bash
ls dist/_astro/*.woff2
```

Esperado: arquivos woff2 presentes.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: self-host Inter and Pixelify Sans via fontsource"
```

---

## Task 8: Analytics Umami

**Files:**
- Create: `.env.example`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Criar `.env.example`**

```
# Umami Analytics
# Deploy: https://railway.app ou https://vercel.com
# Após criar seu site no painel Umami, preencha:
PUBLIC_UMAMI_SRC=https://sua-instancia.umami.is/script.js
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

- [ ] **Step 2: Adicionar variáveis no frontmatter de `src/layouts/BaseLayout.astro`**

No bloco `---` (frontmatter), adicionar após os imports existentes:

```astro
const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
const umamiSrc = import.meta.env.PUBLIC_UMAMI_SRC;
```

- [ ] **Step 3: Adicionar script Umami no `<head>`**

No `<head>` de `BaseLayout.astro`, após a tag `<title>`, adicionar:

```astro
{umamiId && (
  <script is:inline defer src={umamiSrc} data-website-id={umamiId} />
)}
```

- [ ] **Step 4: Adicionar listener de eventos no `<body>`**

Em `BaseLayout.astro`, no `<body>`, antes do `<slot />`, adicionar:

```html
<script is:inline>
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-event]");
    if (!el) return;
    if (window.umami) window.umami.track(el.getAttribute("data-event"));
  });
</script>
```

- [ ] **Step 5: Verificar build**

```bash
npm run build
```

Esperado: build sem erros. Sem `.env`, o script Umami não é injetado (condicional). Com `.env` preenchido, o script aparece no HTML gerado.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro .env.example
git commit -m "feat: add Umami analytics integration with data-event listener"
```

---

## Task 9: SEO + Metadados PT-BR em BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Atualizar título e descrição default no frontmatter**

No bloco `---`, substituir:

```astro
const {
  title = "Byrd Ronin - Action Roguelite on Steam",
  description = "Slice through bamboo, survive enemy waves and master chaotic roguelite runs in Byrd Ronin. Available now on Steam.",
} = Astro.props;
```

por:

```astro
const {
  title = "Byrd Ronin — Roguelite Hack and Slash 2D | Steam",
  description = "Corte bambus, enfrente ondas de inimigos e domine runs caóticas. Byrd Ronin é um roguelite hack and slash 2D no Steam — combate preciso, upgrades intensos, caos garantido.",
} = Astro.props;
```

- [ ] **Step 2: Atualizar OG description**

Substituir:

```html
<meta
  property="og:description"
  content="Fast cuts, upgrades, enemies and chaos. Byrd Ronin now on Steam."
/>
```

por:

```html
<meta
  property="og:description"
  content="Action roguelite 2D com combate preciso e progressão intensa. Disponível agora na Steam."
/>
```

- [ ] **Step 3: Adicionar link manifest no `<head>`**

Após a linha `<link rel="canonical" ...>`, adicionar:

```html
<link rel="manifest" href="/site.webmanifest" />
```

- [ ] **Step 4: Melhorar Schema.org**

No frontmatter, substituir o objeto `schemaOrg` por:

```astro
const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: GAME.title,
  description: GAME.descriptionShort,
  inLanguage: "pt-BR",
  applicationCategory: "Game",
  keywords:
    "roguelite, hack and slash, jogo indie, 2D, Steam, ação, roguelike, jogo brasileiro",
  publisher: { "@type": "Organization", name: GAME.publisher },
  developer: { "@type": "Organization", name: GAME.developer },
  genre: ["Action", "Roguelite", "Hack and Slash", "Indie"],
  operatingSystem: "Windows",
  url: STEAM_URL,
  audience: { "@type": "Audience", audienceType: "gamers" },
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
});
```

- [ ] **Step 5: Verificar build**

```bash
npm run build
```

Esperado: build limpo. Verificar no HTML gerado que o `<title>` e `<meta name="description">` têm os novos valores:

```bash
grep -i "roguelite hack and slash" dist/index.html
```

Esperado: linha encontrada.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: SEO — PT-BR meta tags, manifest link, schema.org improvements"
```

---

## Task 10: Copy PT-BR — HeroAnimations + FinalCTAClient + consts.ts

**Files:**
- Modify: `src/components/react/HeroAnimations.tsx`
- Modify: `src/components/react/FinalCTAClient.tsx`
- Modify: `src/consts.ts`

- [ ] **Step 1: HeroAnimations — "Available on Steam" → PT-BR**

Em `src/components/react/HeroAnimations.tsx`, na função `HeroCopy`, substituir:

```tsx
<motion.p
  variants={itemVariants}
  className="mb-3.5 text-blue-light font-display text-xl uppercase"
>
  Available on Steam
</motion.p>
```

por:

```tsx
<motion.p
  variants={itemVariants}
  className="mb-3.5 text-blue-light font-display text-xl uppercase"
>
  Disponível na Steam
</motion.p>
```

- [ ] **Step 2: FinalCTAClient — "Available on Steam" → PT-BR**

Em `src/components/react/FinalCTAClient.tsx`, substituir:

```tsx
<motion.p
  className="text-blue-light font-display text-sm uppercase tracking-widest"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.5, ease }}
>
  Available on Steam
</motion.p>
```

por:

```tsx
<motion.p
  className="text-blue-light font-display text-sm uppercase tracking-widest"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.5, ease }}
>
  Disponível na Steam
</motion.p>
```

- [ ] **Step 3: consts.ts — adicionar tag "Indie"**

Em `src/consts.ts`, substituir o array `tags`:

```ts
tags: [
  "Ação",
  "Roguelike de Ação",
  "Hack and Slash",
  "Difícil",
  "2D",
] as const,
```

por:

```ts
tags: [
  "Ação",
  "Roguelike de Ação",
  "Hack and Slash",
  "Difícil",
  "2D",
  "Indie",
] as const,
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Esperado: build limpo.

- [ ] **Step 5: Commit**

```bash
git add src/components/react/HeroAnimations.tsx src/components/react/FinalCTAClient.tsx src/consts.ts
git commit -m "feat: translate copy to PT-BR, add Indie tag for SEO"
```

---

## Task 11: Página 404 Temática

**Files:**
- Create: `src/pages/404.astro`

**Conceito visual:** "RUN ENCERRADA" — o jogador morreu e caiu em página inexistente. Usa estilo HUD do jogo, pixel shadow no 404, FallingLeaves via BaseLayout.

- [ ] **Step 1: Criar `src/pages/404.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { SteamButtonAnimated } from "../components/react/SteamButtonAnimated";
---

<BaseLayout
  title="404 — Run Encerrada | Byrd Ronin"
  description="Esta página não existe — mas sua próxima run sim. Volte ao início ou jogue Byrd Ronin na Steam."
>
  <div class="relative min-h-dvh flex flex-col">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-[url('/hero-bg.png')] bg-center bg-cover"
      style="opacity: 0.18"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-black/70 to-black"
      aria-hidden="true"
    />

    <!-- Logo header -->
    <header class="relative z-10 px-8 py-6 max-[640px]:px-5">
      <a href="/" aria-label="Byrd Ronin — home">
        <img
          src="/logo.png"
          alt="Byrd Ronin"
          width="192"
          height="108"
          class="w-28 max-[640px]:w-20 h-auto"
        />
      </a>
    </header>

    <!-- Content -->
    <main
      class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 pb-16"
    >
      <!-- Eyebrow HUD -->
      <p class="font-display text-bamboo text-xs uppercase tracking-[0.35em]">
        [ RUN ENCERRADA ]
      </p>

      <!-- 404 -->
      <h1
        class="font-display text-scarlet leading-none select-none"
        style="font-size: clamp(96px, 20vw, 200px); text-shadow: 6px 6px 0 rgba(0,0,0,0.7), 0 0 80px rgba(255,59,46,0.25);"
      >
        404
      </h1>

      <!-- Mensagem -->
      <p class="font-display text-white text-xl max-[640px]:text-lg">
        Você caiu no caos errado.
      </p>
      <p class="text-muted text-sm leading-relaxed max-w-xs">
        Esta página não existe — mas sua próxima run sim.
      </p>

      <!-- Ações -->
      <div class="flex flex-wrap gap-4 justify-center mt-4">
        <a
          href="/"
          class="inline-flex min-h-12 items-center gap-2 px-6 py-3 border-2 border-bamboo/50 rounded-sm text-bamboo font-display text-sm uppercase tracking-wide hover:border-bamboo hover:bg-bamboo/10 transition-all duration-150"
        >
          ← Voltar ao início
        </a>
        <SteamButtonAnimated
          label="JOGAR AGORA"
          event="steam_cta_404_click"
          client:load
        />
      </div>
    </main>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Esperado: `dist/404.html` gerado. Verificar:

```bash
ls dist/404.html
```

- [ ] **Step 3: Visualizar no browser**

```bash
npm run preview
```

Navegar para `http://127.0.0.1:4321/404` e verificar:
- Background com hero-bg.png em opacidade baixa
- FallingLeaves animando (herdado do BaseLayout)
- "[ RUN ENCERRADA ]" em bamboo
- "404" em scarlet gigante com pixel shadow
- Botões funcionais

- [ ] **Step 4: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add 404 page with game-themed design"
```

---

## Task 12: Atualizar docs/pending.md

**Files:**
- Modify: `docs/pending.md`

- [ ] **Step 1: Marcar todos os itens resolvidos em `docs/pending.md`**

Substituir o conteúdo completo por:

```markdown
# Pendências — Byrd Ronin Landing Page

Atualizado em 2026-05-25 após implementação das pendências.

---

## ✅ Resolvido

| Item | Status |
|---|---|
| Analytics | ✅ Umami integrado via variáveis de ambiente |
| Trailer YouTube | ✅ Removido — TrailerPlayer simplificado para vídeo local |
| Imagem OG | ✅ og_image.png presente em /public |
| Página 404 | ✅ src/pages/404.astro com visual temático do jogo |
| Webmanifest | ✅ public/site.webmanifest criado |
| SteamStatusBadge bug | ✅ id="status" removido, link "Status" removido do navbar |
| Self-hosting fontes | ✅ @fontsource-variable/inter + @fontsource/pixelify-sans |
| Sitemap | ✅ @astrojs/sitemap integrado |
| robots.txt | ✅ public/robots.txt criado |
| SEO + copy PT-BR | ✅ Metadados, schema.org, copy PT-BR em todos os componentes |
| StatusSection | ✅ Deletada (não estava sendo usada) |

## 🔲 Pendentes (decisão do time)

| Item | Decisão necessária |
|---|---|
| Umami deploy | Deploy da instância Umami (Railway/Vercel) + preencher .env |
| 404 da Cloudflare/host | Configurar o host para servir 404.html no erro 404 |
```

- [ ] **Step 2: Commit final**

```bash
git add docs/pending.md
git commit -m "docs: mark all pending items as resolved"
```

---

## Verificação Final

Após todos os tasks:

```bash
npm run build && npm run preview
```

Checklist manual:
- [ ] Navbar tem 3 links: Trailer | Features | Gameplay
- [ ] Navbar destaca o link correto ao scrollar
- [ ] Trailer section mostra apenas o vídeo local (sem botão YouTube)
- [ ] Fontes carregam sem request para fonts.googleapis.com (verificar Network tab)
- [ ] `<title>` é "Byrd Ronin — Roguelite Hack and Slash 2D | Steam"
- [ ] "Disponível na Steam" aparece no hero e no FinalCTA
- [ ] Navegar para `/qualquer-coisa-invalida` → página 404 temática aparece
- [ ] FallingLeaves animam na página 404
- [ ] `dist/sitemap-index.xml` existe
- [ ] `dist/robots.txt` existe
