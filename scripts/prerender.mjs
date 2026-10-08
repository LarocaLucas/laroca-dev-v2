// Depois do build: renderiza o site em HTML e grava dentro de dist/index.html.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const arquivo = resolve("dist/index.html");
const html = readFileSync(arquivo, "utf8");
if (!html.includes("<!--app-->")) throw new Error("Marcador <!--app--> não encontrado em dist/index.html");
const corpo = render();
if (!corpo.includes("<h1")) throw new Error("O HTML renderizado não tem o título principal");
writeFileSync(arquivo, html.replace("<!--app-->", corpo));
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`pré-renderizado: ${(corpo.length / 1024).toFixed(0)} KB de HTML`);
