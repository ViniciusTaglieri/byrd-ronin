# Pendências — Byrd Ronin Landing Page

Atualizado em 2026-05-25 após implementação completa das pendências.

---

## Resolvido

| Item | Status |
|---|---|
| Analytics | Umami integrado via variáveis de ambiente (`PUBLIC_UMAMI_SRC` + `PUBLIC_UMAMI_WEBSITE_ID`) |
| Trailer YouTube | Removido — TrailerPlayer simplificado para vídeo local apenas |
| Imagem OG | `og_image.png` presente em `/public` |
| Página 404 | `src/pages/404.astro` com visual temático "RUN ENCERRADA" |
| Webmanifest | `public/site.webmanifest` criado |
| SteamStatusBadge bug | `id="status"` removido do badge, link "Status" removido do navbar |
| Self-hosting fontes | `@fontsource-variable/inter` + `@fontsource/pixelify-sans` — sem Google Fonts |
| Sitemap | `@astrojs/sitemap` integrado — gera `sitemap-index.xml` no build |
| robots.txt | `public/robots.txt` criado |
| SEO + copy PT-BR | Metadados, schema.org, copy PT-BR em todos os componentes |
| StatusSection | Deletada (não estava sendo usada) |

---

## Pendentes (ação necessária fora do código)

| Item | O que fazer |
|---|---|
| Umami deploy | Deploy da instância Umami (Railway ou Vercel) + preencher `.env` com `PUBLIC_UMAMI_SRC` e `PUBLIC_UMAMI_WEBSITE_ID` |
| Host 404 | Configurar o servidor/CDN para servir `404.html` em erros 404 (Cloudflare Pages faz isso automaticamente) |
