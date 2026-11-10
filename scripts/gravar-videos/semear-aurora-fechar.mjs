// Completa as noites fictícias da Casa Aurora (responsáveis das máquinas e da segurança) e consolida.
import { randomUUID } from "node:crypto";
const API = "http://localhost:3011/api";
async function api(m, caminho, corpo) {
  const r = await fetch(API + caminho, { method: m, headers: corpo ? { "Content-Type": "application/json" } : {}, body: corpo && JSON.stringify(corpo) });
  const t = await r.text();
  if (!r.ok) throw new Error(`${m} ${caminho} -> ${r.status} ${t.slice(0, 400)}`);
  return t ? JSON.parse(t) : null;
}
let pessoas = await api("GET", "/colaboradores?ativo=todos");
if (!pessoas.some((p) => p.nome === "Rodrigo Fontes")) {
  const cargos = await api("GET", "/cargos");
  const cargo = cargos.find((c) => c.nome === "Segurança")?.id ?? (await api("POST", "/cargos", { nome: "Segurança", cacheBase: "150.00", artistico: false })).id;
  await api("POST", "/colaboradores", { nome: "Rodrigo Fontes", apelido: "Supervisor de segurança", cargoId: cargo });
  pessoas = await api("GET", "/colaboradores?ativo=todos");
}
const por = (n) => pessoas.find((p) => p.nome === n).id;
const resp = { "Portaria 1": por("Pedro Alves"), "Portaria 2": por("Juliana Reis"), "Bar central": por("Larissa Prado"), "Bar VIP": por("Thiago Rocha"), "Garçons": por("Camila Duarte") };
const lista = await api("GET", "/eventos?de=2026-10-01&ate=2026-11-30");
const eventos = (lista.itens ?? lista.eventos ?? lista).filter((e) => /Aurora|Neon|Máscaras/.test(e.nome));
for (const e of eventos) {
  const d = await api("GET", `/eventos/${e.id}`);
  const p = d.portaria;
  const fix = (ms) => ms.map((m) => ({ ...m, colaboradorId: resp[m.nome] ?? m.colaboradorId }));
  await api("PUT", `/eventos/${e.id}/portaria`, { maquinas: fix(p.maquinas), maquinasVendas: fix(p.maquinasVendas ?? []), gavetaDinheiro: p.gavetaDinheiro, sistema: p.sistema, publico: p.publico });
  await api("PUT", `/eventos/${e.id}/seguranca`, { quantidade: 8, valorUnitario: "150.00", quantidadeSupervisor: 1, valorSupervisor: "220.00", colaboradorId: por("Rodrigo Fontes") });
  const data = String(d.data).slice(0, 10);
  if (data < "2026-11-07" && d.status !== "CONSOLIDADO") await api("POST", `/eventos/${e.id}/consolidar`).then(() => console.log("consolidado", data)).catch((x) => console.log("falhou", data, x.message.slice(0, 300)));
}
const djs = ["Rafael Monteiro", "Bianca Torres", "Gustavo Lins"].map(por);
for (const [data, nome, k] of [["2026-11-13", "Aurora Sessions", 0], ["2026-11-21", "Festival Horizonte", 0]]) {
  await api("PUT", `/agenda/${data}`, { nome, itens: [
    { id: randomUUID(), colaboradorId: djs[k], entrada: "23:30", saida: "02:00", cache: "600.00", status: "CONFIRMADO" },
    { id: randomUUID(), colaboradorId: djs[k + 1], entrada: "02:00", saida: "05:00", cache: "600.00", status: "A_CONFIRMAR" },
  ] });
}
console.log("eventos:", eventos.length);
