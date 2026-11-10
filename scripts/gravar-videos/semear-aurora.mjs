// Dados FICTÍCIOS da "Casa Aurora" (casa noturna inventada) no Sys Door LOCAL, para os vídeos do site.
// Só roda contra localhost. Uso: node semear-aurora.mjs
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
const API = "http://localhost:3011/api";

async function api(m, caminho, corpo, tipo = "application/json") {
  const r = await fetch(API + caminho, { method: m, headers: corpo !== undefined ? { "Content-Type": tipo } : {}, body: corpo === undefined ? undefined : tipo === "application/json" ? JSON.stringify(corpo) : corpo });
  const t = await r.text();
  if (!r.ok) throw new Error(`${m} ${caminho} -> ${r.status} ${t.slice(0, 300)}`);
  return t ? JSON.parse(t) : null;
}
const sp = (data, hh) => new Date(`${data}T${hh}:00-03:00`).toISOString();
const reais = (v) => v.toFixed(2);
let semente = 7;
const rnd = (a, b) => { semente = (semente * 9301 + 49297) % 233280; return a + (semente / 233280) * (b - a); };

// ---------- Ingressos: 4 eventos à venda
const EVENTOS_ING = [
  ["Aurora Sessions", "2026-11-13", "23:30", "aurora-sessions", "Deep house a noite toda com o line-up residente da casa."],
  ["Baile Neon", "2026-11-14", "23:00", "baile-neon", "Funk e pop com pista iluminada em neon e open de energético até 1h."],
  ["Festival Horizonte", "2026-11-21", "18:00", "festival-horizonte", "Open air com dois palcos, food trucks e pôr do sol na área externa."],
  ["Noite Retrô", "2026-11-27", "23:00", "noite-retro", "Os hits dos anos 80 e 90 com telão de clipes."],
];
for (const [titulo, data, hh, capa, descricao] of process.env.SEM_INGRESSOS ? [] : EVENTOS_ING) {
  const ev = await api("POST", "/ingressos/eventos", { titulo, data: sp(data, hh), abertura: sp(data, hh), local: "Casa Aurora · Curitiba, PR", taxaServicoPct: "10.00", limitePorPedido: 8, limiteCortesias: 20, whatsapp: "5541999990000" });
  await api("PATCH", `/ingressos/eventos/${ev.id}`, { descricao }).catch(() => {});
  await api("PUT", `/ingressos/eventos/${ev.id}/setores`, { setores: [
    { nome: "Pista", descricao: null, lotes: [
      { nome: "1º lote", preco: "45.00", quantidade: 150, inicio: null, fim: null, ativo: true },
      { nome: "2º lote", preco: "60.00", quantidade: 200, inicio: null, fim: null, ativo: true },
      { nome: "3º lote", preco: "75.00", quantidade: 150, inicio: null, fim: null, ativo: true },
    ] },
    { nome: "Área VIP", descricao: "Mezanino com bar exclusivo e vista para o palco", lotes: [
      { nome: "Lote único", preco: "120.00", quantidade: 80, inicio: null, fim: null, ativo: true },
    ] },
    { nome: "Open bar", descricao: "Cerveja, drinks e energético até 3h", lotes: [
      { nome: "Lote único", preco: "180.00", quantidade: 60, inicio: null, fim: null, ativo: true },
    ] },
  ] });
  await api("POST", `/ingressos/eventos/${ev.id}/fotos`, readFileSync(`capas/${capa}.jpg`), "application/octet-stream");
  await api("POST", `/ingressos/eventos/${ev.id}/publicar`);
  console.log("ingressos:", titulo);
}

// ---------- Sys Door: cargos, equipe, noites fechadas e agenda
const cargos = Object.fromEntries((await api("GET", "/cargos")).map((c) => [c.nome, c.id]));
for (const [nome, cacheBase, artistico] of [["DJ", "600.00", true], ["Bartender", "180.00", false], ["Caixa", "160.00", false], ["Hostess", "150.00", false], ["Fotógrafo", "250.00", false]]) {
  cargos[nome] ??= (await api("POST", "/cargos", { nome, cacheBase, artistico })).id;
}
const PESSOAS = [
  ["Rafael Monteiro", "DJ Rafa M", "DJ"], ["Bianca Torres", "DJ Bia T", "DJ"], ["Gustavo Lins", "DJ Guga", "DJ"],
  ["Larissa Prado", null, "Bartender"], ["Thiago Rocha", null, "Bartender"], ["Camila Duarte", null, "Bartender"],
  ["Pedro Alves", null, "Caixa"], ["Juliana Reis", null, "Caixa"], ["Marina Costa", null, "Hostess"], ["Felipe Nunes", null, "Fotógrafo"],
];
const equipe = [];
for (const [nome, apelido, cargo] of PESSOAS) {
  const c = await api("POST", "/colaboradores", { nome, apelido, cargoId: cargos[cargo], telefone: "41999990000" });
  equipe.push({ id: c.id, cargo });
}
const djs = equipe.filter((e) => e.cargo === "DJ");
const fixos = equipe.filter((e) => e.cargo !== "DJ");

const NOITES = [
  ["2026-10-09", "Sexta Aurora"], ["2026-10-10", "Sábado Neon"], ["2026-10-16", "Sexta Aurora"], ["2026-10-17", "Baile das Máscaras"],
  ["2026-10-23", "Sexta Aurora"], ["2026-10-24", "Sábado Neon"], ["2026-10-30", "Halloween Aurora"], ["2026-10-31", "Halloween Aurora II"],
  ["2026-11-06", "Sexta Aurora"], ["2026-11-07", "Sábado Neon"],
];
for (const [data, nome] of NOITES) {
  const ev = await api("POST", "/eventos", { nome, data });
  const pista = Math.round(rnd(260, 520)), camarote = Math.round(rnd(30, 70));
  const maq = (n, f) => ({ id: randomUUID(), nome: n, colaboradorId: null, debito: reais(rnd(2500, 6000) * f), credito: reais(rnd(3500, 8000) * f), pix: reais(rnd(4000, 9000) * f), dinheiro: reais(rnd(300, 1200) * f) });
  const portaria = [maq("Portaria 1", 1), maq("Portaria 2", 0.7)];
  const bar = [maq("Bar central", 2.2), maq("Bar VIP", 1.1), maq("Garçons", 0.8)];
  const soma = (k) => reais([...portaria, ...bar].reduce((t, m) => t + +m[k], 0));
  await api("PUT", `/eventos/${ev.id}/portaria`, {
    maquinas: portaria, maquinasVendas: bar, gavetaDinheiro: reais(portaria.reduce((t, m) => t + +m.dinheiro, 0)),
    sistema: { debito: soma("debito"), credito: soma("credito"), pix: soma("pix"), dinheiro: soma("dinheiro") },
    publico: { pista, camarote, cortesiaPista: Math.round(rnd(10, 40)), cortesiaCamarote: Math.round(rnd(2, 10)) },
  });
  await api("POST", `/eventos/${ev.id}/equipe`, { colaboradorIds: [...fixos.map((e) => e.id), djs[NOITES.findIndex((n) => n[0] === data) % 3].id] }).catch((e) => console.log("equipe:", e.message));
  await api("PUT", `/eventos/${ev.id}/despesas`, { despesas: [
    ["Gelo e copos", rnd(380, 650)], ["Energéticos (reposição)", rnd(900, 1800)], ["Limpeza", rnd(250, 400)], ["Divulgação nas redes", rnd(300, 900)],
  ].map(([descricao, v]) => ({ id: randomUUID(), descricao, valor: reais(v), colaboradorId: null, sangria: false, dataPagamento: data })) });
  await api("PUT", `/eventos/${ev.id}/seguranca`, { quantidade: 8, valorUnitario: "150.00", quantidadeSupervisor: 1, valorSupervisor: "220.00", colaboradorId: null }).catch((e) => console.log("seg:", e.message));
  await api("POST", `/eventos/${ev.id}/folha`, { itens: [...fixos, djs[0]].map((e) => ({ colaboradorId: e.id })) }).catch((e) => console.log("folha:", e.message));
  if (data < "2026-11-07") await api("POST", `/eventos/${ev.id}/consolidar`).catch((e) => console.log("consolidar:", e.message));
  console.log("noite:", data, nome);
}

// agenda das próximas noites
for (const [data, nome, k] of [["2026-11-13", "Aurora Sessions", 0], ["2026-11-14", "Baile Neon", 1], ["2026-11-20", "Sexta Aurora", 2], ["2026-11-21", "Festival Horizonte", 0], ["2026-11-27", "Noite Retrô", 1], ["2026-11-28", "Sábado Neon", 2]]) {
  await api("PUT", `/agenda/${data}`, { nome, itens: [
    { id: randomUUID(), colaboradorId: djs[k].id, entrada: "23:30", saida: "02:00", cache: "600.00", status: "CONFIRMADO" },
    { id: randomUUID(), colaboradorId: djs[(k + 1) % 3].id, entrada: "02:00", saida: "05:00", cache: "600.00", status: k ? "CONFIRMADO" : "PENDENTE" },
  ] }).catch((e) => console.log("agenda:", e.message));
}
console.log("pronto");
