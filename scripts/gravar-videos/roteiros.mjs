// Roteiros de navegação. Cada vídeo termina de volta no topo para emendar em loop.
const v = "v1"; // troque ao regravar (cache de 30 dias em /img)

// Sistemas locais: entra, pula o tour, liga o tema escuro, esconde o indicador do Next
// e abre cada aba uma vez antes de gravar (o modo dev compila a rota no primeiro acesso).
const sistema = (base, prefixo, email, abas) => async (p, ctx) => {
  await ctx.addInitScript(([prefixo]) => {
    localStorage.setItem(`${prefixo}.tutorial.v1`, "feito");
    localStorage.setItem(`${prefixo}.tema`, "escuro");
    document.addEventListener("DOMContentLoaded", () => {
      const s = document.createElement("style");
      s.textContent = "nextjs-portal{display:none!important}";
      document.head.append(s);
    });
  }, [prefixo]);
  await p.goto(`${base}/login`, { waitUntil: "networkidle", timeout: 120000 });
  await p.fill("input[type=email]", email);
  await p.fill("input[type=password]", "senha-forte-123");
  await p.keyboard.press("Enter");
  await p.waitForURL(`${base}/`, { timeout: 60000 });
  for (const a of abas) { await p.click(a, { timeout: 30000 }).catch(async (e) => { await p.screenshot({ path: "erro-antes.png" }); console.log("falhou em", a); throw e; }); await p.waitForLoadState("networkidle"); await p.waitForTimeout(1500); }
};
const link = (nome) => `:is(a,button):text-is("${nome}")`;
const MODA = ["Produtos", "Vendas", "Painel"].map(link);
const ODONTO = ["Agenda", "Pacientes", "Injetáveis e lotes", "Orçamentos", "Financeiro", "Painel"].map(link);

export const ROTEIROS = {
  moda: {
    arquivo: `moda-nav-${v}`,
    url: "http://localhost:3000/",
    antes: sistema("http://localhost:3000", "moda", "ana@pijamas.test", MODA),
    passos: [
      ["esperar", 1800],
      ["rolar", 500, 1300], ["esperar", 500], ["rolar", 0, 900],
      ["clicar", link("Produtos"), 2300],
      ["clicar", link("Vendas"), 2300],
      ["clicar", link("Painel"), 900],
    ],
  },
  odonto: {
    arquivo: `odonto-nav-${v}`,
    url: "http://localhost:3001/",
    antes: sistema("http://localhost:3001", "odonto", "dra@bella.test", ODONTO),
    passos: [
      ["esperar", 1800],
      ["clicar", link("Agenda"), 2200],
      ["clicar", link("Pacientes"), 1700],
      ["clicar", link("Injetáveis e lotes"), 1700],
      ["clicar", link("Orçamentos"), 1600],
      ["clicar", link("Financeiro"), 1700],
      ["clicar", link("Painel"), 900],
    ],
  },
  door: {
    arquivo: `door-nav-${v}`,
    url: "https://doorpg.com.br",
    passos: [
      ["esperar", 2200],
      ["rolar", "#conheca", 1600], ["esperar", 900],
      ["rolar", "#agenda", 1600], ["esperar", 1200],
      ["rolar", "#reservas", 1300], ["esperar", 900],
      ["ir", "https://doorpg.com.br/galeria.html"],
      ["esperar", 1400],
      ["rolar", 500, 1400], ["esperar", 1400],
      ["rolar", 0, 1000], ["esperar", 400],
    ],
  },
  djlaroca: {
    arquivo: `djlaroca-nav-${v}`,
    url: "https://djlaroca.com.br",
    esperaAbrir: 4000,
    passos: [
      ["esperar", 1500],
      ["rolar", "#som", 1700], ["esperar", 900],
      ["rolar", "#agenda", 1600], ["esperar", 1300],
      ["rolar", "#galeria", 1600], ["esperar", 1600],
      ["rolar", 0, 1600], ["esperar", 500],
    ],
  },
  djreinaldo: {
    arquivo: `djreinaldo-nav-${v}`,
    url: "https://djreinaldo.com.br",
    passos: [
      ["esperar", 2000],
      ["rolar", "#eventos", 1600], ["esperar", 1100],
      ["rolar", "#sobre", 1400], ["esperar", 800],
      ["rolar", "#galeria", 1600], ["esperar", 1600],
      ["rolar", 0, 1600], ["esperar", 500],
    ],
  },
  arrancatoco: {
    arquivo: `arrancatoco-nav-${v}`,
    url: "https://arrancatocopg.com.br",
    passos: [
      ["esperar", 2000],
      ["rolar", "#sobre", 1500], ["esperar", 800],
      ["rolar", "#artistas", 1600], ["esperar", 1200],
      ["rolar", "#ingressos", 1500], ["esperar", 1300],
      ["rolar", 0, 1500], ["esperar", 500],
    ],
  },
};
