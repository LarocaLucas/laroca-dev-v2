// Telas paradas dos cartões novos: -a (1440×775) e -b (1280×1016), no formato exato de cada espaço.
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { casaAurora, festival, montarFestival } from "./roteiros.mjs";
const saida = process.argv[2] ?? "saida";
const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const TELAS = [
  ["ingressos-a", 1440, 775, casaAurora, async (p) => { await p.goto("http://localhost:5174/", { waitUntil: "networkidle" }); }],
  ["ingressos-b", 1280, 1016, casaAurora, async (p) => { await p.goto("http://localhost:5174/", { waitUntil: "networkidle" }); await p.click("text=Festival Horizonte"); await p.waitForLoadState("networkidle"); await p.evaluate(() => window.scrollTo(0, 260)); }],
  ["eventos-a", 1440, 775, casaAurora, async (p) => { await p.goto("http://localhost:5183/dashboard", { waitUntil: "networkidle" }); }],
  ["eventos-b", 1280, 1016, casaAurora, async (p) => { await p.goto("http://localhost:5183/agenda", { waitUntil: "networkidle" }); }],
  ["mapa3d-a", 1440, 775, festival, async (p) => { await p.goto("http://localhost:8150/"); await p.waitForTimeout(1500); await p.evaluate(montarFestival); await p.click("#b-noite"); }],
  ["mapa3d-b", 1280, 1016, festival, async (p) => { await p.goto("http://localhost:8150/"); await p.waitForTimeout(1500); await p.evaluate(montarFestival); await p.evaluate(() => { A.vistaPlanta(true); A.enquadrar(); }); }],
];
for (const [nome, w, h, antes, abrir] of TELAS) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, locale: "pt-BR" });
  const p = await ctx.newPage();
  await antes(p, ctx);
  await abrir(p);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `quadros/${nome}.png` });
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", `quadros/${nome}.png`, "-vf", `scale=${Math.round(w * 0.75)}:-2:flags=lanczos`, "-quality", "78", `${saida}/${nome}.webp`]);
  console.log(nome);
  await ctx.close();
}
await b.close();
