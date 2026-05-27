import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://taglieri.me",
  base: "/byrd-ronin/",

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
