import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// No GitHub Pages o site fica em /laroca-dev-v2/. Ao ir para o domínio próprio, rode com BASE=/.
export default defineConfig({
  base: process.env.BASE ?? "/laroca-dev-v2/",
  plugins: [react()],
});
