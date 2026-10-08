import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Produção (laroca.dev) usa BASE=/. Sem BASE, o site sai para a prévia do GitHub Pages em /laroca-dev-v2/.
const base = process.env.BASE ?? "/laroca-dev-v2/";

/** A prévia não deve concorrer com o domínio no Google. */
const previaSemIndexar: Plugin = {
  name: "previa-sem-indexar",
  transformIndexHtml: (html) => (base === "/" ? html : html.replace("<meta charset=\"UTF-8\" />", "<meta charset=\"UTF-8\" />\n    <meta name=\"robots\" content=\"noindex, nofollow\" />")),
};

export default defineConfig({ base, plugins: [react(), previaSemIndexar] });
