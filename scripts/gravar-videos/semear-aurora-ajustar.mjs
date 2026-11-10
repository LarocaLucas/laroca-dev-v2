// Reduz os valores das noites fictícias da Casa Aurora para uma faixa plausível e reconsolida.
const API = "http://localhost:3011/api";
async function api(m, caminho, corpo) {
  const r = await fetch(API + caminho, { method: m, headers: corpo ? { "Content-Type": "application/json" } : {}, body: corpo && JSON.stringify(corpo) });
  const t = await r.text();
  if (!r.ok) throw new Error(`${m} ${caminho} -> ${r.status} ${t.slice(0, 300)}`);
  return t ? JSON.parse(t) : null;
}
const F = 0.4;
const lista = await api("GET", "/eventos?de=2026-10-01&ate=2026-11-30");
for (const e of (lista.itens ?? lista.eventos ?? lista).filter((e) => /Aurora|Neon|Máscaras/.test(e.nome))) {
  let d = await api("GET", `/eventos/${e.id}`);
  if (d.status === "CONSOLIDADO") { await api("POST", `/eventos/${e.id}/reabrir`, { motivo: "Ajuste dos dados de demonstração" }).catch(async () => api("POST", `/eventos/${e.id}/reabrir`)); d = await api("GET", `/eventos/${e.id}`); }
  const p = d.portaria;
  const esc = (ms) => ms.map((m) => ({ ...m, debito: (m.debito * F).toFixed(2), credito: (m.credito * F).toFixed(2), pix: (m.pix * F).toFixed(2), dinheiro: (m.dinheiro * F).toFixed(2) }));
  const maquinas = esc(p.maquinas), vendas = esc(p.maquinasVendas ?? []);
  const soma = (k) => [...maquinas, ...vendas].reduce((t, m) => t + +m[k], 0);
  // sistema um pouco abaixo do físico: sobra pequena e realista
  await api("PUT", `/eventos/${e.id}/portaria`, { maquinas, maquinasVendas: vendas, gavetaDinheiro: soma("dinheiro").toFixed(2),
    sistema: { debito: soma("debito").toFixed(2), credito: soma("credito").toFixed(2), pix: (soma("pix") - 120).toFixed(2), dinheiro: soma("dinheiro").toFixed(2) }, publico: p.publico });
  const data = String(d.data).slice(0, 10);
  if (data < "2026-11-07") await api("POST", `/eventos/${e.id}/consolidar`).catch((x) => console.log("falhou", data, x.message));
  console.log("ok", data);
}
