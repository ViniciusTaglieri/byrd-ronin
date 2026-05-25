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
