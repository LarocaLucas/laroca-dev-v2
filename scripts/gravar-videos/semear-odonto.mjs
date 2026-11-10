// Cria agendamentos de demonstração nesta semana no Odonto LOCAL (clínica de teste "Clínica Bella Face").
// Uso: node semear-odonto.mjs sondar | node semear-odonto.mjs agendar
import { chromium } from "playwright-core";
const modo = process.argv[2] ?? "sondar";
const b = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const p = await b.newPage();
await p.goto("http://localhost:3001/login", { waitUntil: "networkidle", timeout: 120000 });
await p.fill("input[type=email]", "dra@bella.test");
await p.fill("input[type=password]", "senha-forte-123");
await p.keyboard.press("Enter");
await p.waitForURL("http://localhost:3001/", { timeout: 60000 });
await p.waitForTimeout(2000);
const out = await p.evaluate(async (modo) => {
  const tenant = localStorage.getItem("odonto.tenant");
  const api = async (url, body) => {
    const r = await fetch("/api" + url, { method: body ? "POST" : "GET", headers: { "x-tenant-id": tenant, "content-type": "application/json" }, body: body && JSON.stringify(body), credentials: "include" });
    const t = await r.text();
    try { return { s: r.status, j: JSON.parse(t) }; } catch { return { s: r.status, j: t.slice(0, 300) }; }
  };
  const clinica = (await api("/consultas/clinica")).j;
  const pacientes = (await api("/consultas/pacientes")).j;
  if (modo === "sondar") return { clinica: JSON.stringify(clinica).slice(0, 1500), pacientes: JSON.stringify(pacientes).slice(0, 400) };
  const lista = pacientes.items ?? pacientes;
  const unitId = clinica.units[0].id;
  const profs = clinica.professionals;
  const procs = clinica.procedures;
  // Segunda 09/11 a sábado 14/11/2026, horário de Brasília (-03:00).
  const grade = [["09", ["09:00", "10:30", "14:00", "16:00"]], ["10", ["08:30", "11:00", "15:00"]], ["11", ["09:30", "13:30", "15:30", "17:00"]],
    ["12", ["10:00", "14:30", "16:30"]], ["13", ["09:00", "11:30", "15:00"]], ["14", ["09:00", "10:30"]]];
  const res = [];
  let k = 0;
  for (const [dia, horas] of grade) for (const h of horas) {
    const r = await api("/agenda", { unitId, patientId: lista[k % lista.length].id, professionalId: profs[k % profs.length].id, startsAt: `2026-11-${dia}T${h}:00-03:00`, procedureIds: [procs[k % procs.length].id], source: ["recepcao", "whatsapp", "online"][k % 3] });
    res.push(`${dia} ${h} ${r.s}${r.s >= 300 ? " " + JSON.stringify(r.j).slice(0, 150) : ""}`);
    k++;
  }
  return res;
}, modo);
console.log(JSON.stringify(out, null, 1));
await b.close();
