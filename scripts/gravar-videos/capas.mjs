// Gera capas 16:9 de eventos FICTÍCIOS da "Casa Aurora" (casa inventada) em HTML -> JPG.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
mkdirSync("capas", { recursive: true });

export const CAPAS = [
  { arq: "aurora-sessions", titulo: "AURORA<br>SESSIONS", sub: "deep house · sexta 13.11", a: "#ff3d8b", b: "#5b2bff", c: "#0b0618" },
  { arq: "baile-neon", titulo: "BAILE<br>NEON", sub: "funk · pop · sábado 14.11", a: "#00e5ff", b: "#b6ff00", c: "#050b12" },
  { arq: "festival-horizonte", titulo: "FESTIVAL<br>HORIZONTE", sub: "open air · sábado 21.11", a: "#ffb000", b: "#ff4d1f", c: "#140804" },
  { arq: "noite-retro", titulo: "NOITE<br>RETRÔ", sub: "80s · 90s · sexta 27.11", a: "#c86bff", b: "#ff6bd5", c: "#0d0614" },
];

const html = (c) => `<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0}body{width:1600px;height:900px;overflow:hidden;background:${c.c};font-family:'Space Grotesk';position:relative}
.b{position:absolute;border-radius:50%;filter:blur(90px);opacity:.85}
.g{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.05) 79px 80px),repeating-linear-gradient(0deg,transparent 0 79px,rgba(255,255,255,.05) 79px 80px)}
h1{position:absolute;left:110px;bottom:170px;font-family:Anton;font-size:190px;line-height:.92;color:#fff;letter-spacing:2px;text-transform:uppercase}
p{position:absolute;left:116px;bottom:100px;font-size:34px;color:rgba(255,255,255,.85);letter-spacing:6px;text-transform:uppercase}
.m{position:absolute;right:110px;top:90px;font-size:26px;letter-spacing:10px;color:#fff;opacity:.9}
.r{position:absolute;right:-120px;bottom:-160px;width:760px;height:760px;border-radius:50%;border:2px solid rgba(255,255,255,.25)}
.r2{position:absolute;right:20px;bottom:-20px;width:480px;height:480px;border-radius:50%;border:2px solid rgba(255,255,255,.18)}
</style></head><body>
<div class="b" style="width:900px;height:900px;left:620px;top:-300px;background:${c.a}"></div>
<div class="b" style="width:800px;height:700px;left:-200px;top:380px;background:${c.b}"></div>
<div class="g"></div><div class="r"></div><div class="r2"></div>
<div class="m">CASA AURORA</div><h1>${c.titulo}</h1><p>${c.sub}</p></body></html>`;

if (process.argv[1].endsWith("capas.mjs")) {
  const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  for (const c of CAPAS) {
    await p.setContent(html(c), { waitUntil: "networkidle" });
    await p.screenshot({ path: `capas/${c.arq}.jpg`, type: "jpeg", quality: 88 });
  }
  await b.close();
  console.log("capas ok");
}
