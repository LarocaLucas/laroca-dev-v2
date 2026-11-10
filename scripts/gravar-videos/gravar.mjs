// Grava a navegação de um site pelo screencast do Edge e monta um MP4 em loop + pôster WebP.
// Uso (de dentro desta pasta): node gravar.mjs <nome> ../../public/img
// Nomes em roteiros.mjs. Moda e Odonto exigem os sistemas rodando localmente (ver AGENTS.md).
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { ROTEIROS } from "./roteiros.mjs";

const [nome, saida = "saida"] = process.argv.slice(2);
const r = ROTEIROS[nome];
if (!r) throw new Error(`roteiro desconhecido: ${nome}`);
const W = r.largura ?? 1100, H = r.altura ?? 1000;
const pasta = `quadros/${nome}`;
rmSync(pasta, { recursive: true, force: true });
mkdirSync(pasta, { recursive: true });
mkdirSync(saida, { recursive: true });

const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const ctx = await b.newContext({ viewport: { width: W, height: H }, locale: "pt-BR", ...(r.contexto ?? {}) });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);

// Quadros chegam só quando a tela muda; guardamos o instante de cada um.
const quadros = [];
let gravando = false, pausadoEm = 0, deslocamento = 0;
cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
  cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  if (gravando) quadros.push({ data, t: metadata.timestamp - deslocamento });
});
const pausar = () => { gravando = false; pausadoEm = Date.now() / 1000; };
const retomar = () => { deslocamento += Date.now() / 1000 - pausadoEm; gravando = true; };

// Rolagem suave pela própria página (usa o Lenis quando o site tem).
async function rolar(alvo, ms) {
  await p.evaluate(async ([alvo, ms]) => {
    const el = typeof alvo === "string" ? document.querySelector(alvo) : null;
    const y = el ? el.getBoundingClientRect().top + scrollY : alvo;
    if (typeof window.lenis?.scrollTo === "function") { window.lenis.scrollTo(y, { duration: ms / 1000 }); await new Promise((ok) => setTimeout(ok, ms + 100)); return; }
    const de = scrollY, t0 = performance.now();
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    await new Promise((ok) => {
      const passo = (agora) => {
        const k = Math.min(1, (agora - t0) / ms);
        window.scrollTo({ top: de + (y - de) * ease(k), behavior: "instant" });
        k < 1 ? requestAnimationFrame(passo) : ok();
      };
      requestAnimationFrame(passo);
    });
  }, [alvo, ms]);
}

async function abrir(url) {
  await p.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
  if (r.depoisDeAbrir) await r.depoisDeAbrir(p);
  await p.waitForTimeout(r.esperaAbrir ?? 2500);
}

if (r.antes) await r.antes(p, ctx);
await abrir(r.url);
gravando = true;
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });

for (const [acao, a, c] of r.passos) {
  if (acao === "esperar") await p.waitForTimeout(a);
  else if (acao === "rolar") await rolar(a, c ?? 1400);
  else if (acao === "clicar") {
    await p.click(a, { timeout: 15000 }).catch(async (e) => { await p.screenshot({ path: `erro-${nome}.png` }); throw e; });
    await p.waitForTimeout(c ?? 900);
  }
  else if (acao === "ir") { pausar(); await abrir(a); retomar(); }
  else if (acao === "js") await p.evaluate(a).then(() => p.waitForTimeout(c ?? 600));
}
await p.waitForTimeout(400);
gravando = false;
const fim = Date.now() / 1000 - deslocamento;
await cdp.send("Page.stopScreencast");
await b.close();

// Monta a lista do concat com a duração real de cada quadro.
let lista = "";
quadros.forEach((q, i) => {
  const arq = `${String(i).padStart(5, "0")}.jpg`;
  writeFileSync(`${pasta}/${arq}`, Buffer.from(q.data, "base64"));
  const dur = (i + 1 < quadros.length ? quadros[i + 1].t : fim) - q.t;
  lista += `file '${arq}'\nduration ${Math.max(dur, 0.001).toFixed(4)}\n`;
});
lista += `file '${String(quadros.length - 1).padStart(5, "0")}.jpg'\n`;
writeFileSync(`${pasta}/lista.txt`, lista);

const larg = r.saidaLargura ?? 880;
const mp4 = `${saida}/${r.arquivo}.mp4`;
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", `${pasta}/lista.txt`,
  "-vf", `fps=30,scale=${larg}:-2:flags=lanczos`, "-c:v", "libx264", "-preset", "slow", "-crf", String(r.crf ?? 27),
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4]);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", `${pasta}/00000.jpg`, "-vf", `scale=${larg}:-2:flags=lanczos`, "-quality", "80", `${saida}/${r.arquivo}.webp`]);
const dur = (fim - quadros[0].t).toFixed(1);
console.log(`${nome}: ${quadros.length} quadros, ${dur}s -> ${mp4}`);
