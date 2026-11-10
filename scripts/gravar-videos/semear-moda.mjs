// Cria vendas de demonstração dos últimos dias no Moda LOCAL (loja de teste "Pijamas da Ana").
// Uso: node semear-moda.mjs sondar | node semear-moda.mjs vender
import { chromium } from "playwright-core";
const modo = process.argv[2] ?? "sondar";
const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const p = await b.newPage();
await p.goto("http://localhost:3000/login", { waitUntil: "networkidle", timeout: 120000 });
await p.fill("input[type=email]", "ana@pijamas.test");
await p.fill("input[type=password]", "senha-forte-123");
await p.keyboard.press("Enter");
await p.waitForURL("http://localhost:3000/", { timeout: 60000 });
await p.waitForTimeout(2000);
const out = await p.evaluate(async (modo) => {
  const tenant = localStorage.getItem("moda.tenant");
  const api = async (url, body) => {
    const r = await fetch("/api" + url, { method: body ? "POST" : "GET", headers: { "x-tenant-id": tenant, "content-type": "application/json" }, body: body && JSON.stringify(body), credentials: "include" });
    const t = await r.text();
    try { return { s: r.status, j: JSON.parse(t) }; } catch { return { s: r.status, j: t.slice(0, 300) }; }
  };
  const caixas = await api("/consultas/caixas-abertos");
  const cat = await api("/catalogo/pdv-offline");
  if (modo === "sondar") return { caixas, empresa: await api("/consultas/empresa"), cat: JSON.stringify(cat.j).slice(0, 900) };
  let sessao = caixas.j?.[0]?.id;
  if (!sessao) {
    const emp = await api("/consultas/empresa");
    const unitId = emp.j?.units?.[0]?.id ?? emp.j?.unidades?.[0]?.id;
    const ab = await api("/pdv/caixas", { unitId, registerName: "Caixa 1", openingAmount: 20000 });
    sessao = ab.j?.id;
    if (!sessao) return { erro: "abrir caixa", ab, emp };
  }
  const itens = (cat.j.variants ?? cat.j.variantes ?? cat.j.items ?? cat.j).filter((v) => (v.price ?? v.preco ?? 0) > 0);
  const metodos = ["pix", "credito", "debito", "dinheiro", "pix"];
  const res = [];
  for (let i = 0; i < 9; i++) {
    const escolha = [itens[(i * 7) % itens.length], ...(i % 3 === 0 ? [itens[(i * 11 + 3) % itens.length]] : [])];
    const total = escolha.reduce((s, v) => s + (v.price ?? v.preco), 0);
    const r = await api("/pdv/vendas", { sessionId: sessao, items: escolha.map((v) => ({ variantId: v.id ?? v.variantId, qty: 1 })), payments: [{ method: metodos[i % 5], amount: total }] });
    res.push(r.s + " " + (r.s >= 300 ? JSON.stringify(r.j).slice(0, 200) : total));
  }
  return res;
}, modo);
console.log(JSON.stringify(out, null, 1));
await b.close();
