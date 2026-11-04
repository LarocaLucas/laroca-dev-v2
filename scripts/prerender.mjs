// Depois do build: renderiza cada página em HTML. O início vai para dist/index.html; as outras para dist/<caminho>.html,
// que a Cloudflare e o GitHub Pages servem em /<caminho>, sem extensão.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render, ROTAS } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const modelo = readFileSync(resolve("dist/index.html"), "utf8");
if (!modelo.includes("<!--app-->")) throw new Error("Marcador <!--app--> não encontrado em dist/index.html");

const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
/** Troca o conteúdo de uma tag do <head> e falha se ela não existir, para o build não sair com metadados da página inicial. */
const trocar = (html, regex, valor) => {
  if (!regex.test(html)) throw new Error(`Não achei ${regex} no index.html`);
  return html.replace(regex, (_, antes, depois) => `${antes}${valor}${depois}`);
};

for (const [caminho, { titulo, descricao }] of Object.entries(ROTAS)) {
  const corpo = render(caminho);
  if (!corpo.includes("<h1")) throw new Error(`A página "${caminho}" não tem título principal`);
  let html = modelo.replace("<!--app-->", corpo);
  if (caminho) {
    const url = `https://laroca.dev/${caminho}`;
    html = trocar(html, /(<title>)[^<]*(<\/title>)/, attr(titulo));
    for (const nome of ["description", "twitter:description"]) html = trocar(html, new RegExp(`(<meta name="${nome}" content=")[^"]*(")`), attr(descricao));
    html = trocar(html, /(<meta property="og:description" content=")[^"]*(")/, attr(descricao));
    html = trocar(html, /(<meta property="og:title" content=")[^"]*(")/, attr(titulo));
    html = trocar(html, /(<meta name="twitter:title" content=")[^"]*(")/, attr(titulo));
    html = trocar(html, /(<link rel="canonical" href=")[^"]*(")/, url);
    html = trocar(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  }
  writeFileSync(resolve(`dist/${caminho || "index"}.html`), html);
  console.log(`pré-renderizado /${caminho}: ${(corpo.length / 1024).toFixed(0)} KB de HTML`);
}
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
