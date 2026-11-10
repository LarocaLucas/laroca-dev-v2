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


// Marca fictícia "Casa Aurora" por cima do Sys Door e do site de ingressos (os dados também são fictícios).
const casaAurora = async (p, ctx) => {
  await ctx.addInitScript(() => {
    const trocas = [["Sys Door", "Casa Aurora"], ["Door PG", "Casa Aurora"], ["redes da Door", "redes da Casa Aurora"], ["Door", "Casa Aurora"]];
    const aplicar = () => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode()); ) {
        if (!n.nodeValue.includes("Door")) continue;
        let t = n.nodeValue;
        for (const [a, b] of trocas) t = t.split(a).join(b);
        n.nodeValue = t;
      }
      document.title = document.title.replace(/Sys Door/g, "Casa Aurora").replace(/Door PG/g, "Casa Aurora");
      for (const img of document.querySelectorAll('.ds-sidebar__brand img, .ds-sidebar__brand svg')) img.remove();
      for (const img of document.querySelectorAll('img[src*="/marca/"]')) {
        const s = document.createElement("span");
        s.textContent = "CASA AURORA";
        s.style.cssText = "font-weight:700;letter-spacing:.32em;font-size:15px;color:#fff;white-space:nowrap";
        img.replaceWith(s);
      }
      // eventos de teste que já existiam no banco local ficam fora do vídeo
      for (const tr of document.querySelectorAll("tr, li, a")) if (/Sim ·|Teste/.test(tr.textContent) && tr.textContent.length < 400) tr.style.display = "none";
      // faixa "ambiente de teste" (pagamento simulado do banco local)
      for (const el of document.querySelectorAll("div,p")) if (/^TESTE/i.test(el.textContent.trim()) && el.children.length < 3 && el.textContent.length < 200) el.style.display = "none";
    };
    document.addEventListener("DOMContentLoaded", () => {
      const st = document.createElement("style");
      st.textContent = ".ds-sidebar__brand svg,.ds-sidebar__brand img{display:none!important}";
      document.head.append(st);
      aplicar();
      new MutationObserver(aplicar).observe(document.body, { subtree: true, childList: true, characterData: true });
    });
  });
};

// Festival fictício montado no construtor do Mapas 3D (página local, nada vai para a nuvem).
const festival = async (p, ctx) => {
  await ctx.addInitScript(() => localStorage.clear());
};
const montarFestival = () => {
  A.st.itens.splice(0); A.desenharTudo();
  const por = (tp, x, z, rot = 0) => { A.adicionar(tp); const it = A.st.itens.at(-1); Object.assign(it, { x, z, rot }); A.desenhar(it); };
  por("palco", 0, -18); por("cobertura_palco", 0, -18); por("telao", 0, -23);
  por("line_array", -9, -16); por("line_array", 9, -16); por("sub", -4, -12); por("sub", 4, -12);
  por("moving_beam", -5, -17); por("moving_beam", 5, -17); por("laser", 0, -15);
  por("barricada", -5, -10); por("barricada", 0, -10); por("barricada", 5, -10);
  por("multidao", -7, -3); por("multidao", 7, -3); por("multidao", 0, 4);
  por("mesa_som", 0, 13); por("torre_luz", -15, 10); por("torre_luz", 15, 10);
  por("bar", -22, -2, 90); por("bar", 22, -2, -90); por("bistro", -18, 4); por("bistro", -18, 8); por("bistro", 18, 4); por("bistro", 18, 8);
  por("tenda", -16, 22); por("tenda", -8, 24); por("tenda", 8, 24); por("tenda", 16, 22);
  por("tenda_galpao", 0, 22); por("banheiro", 26, 16); por("banheiro", 26, 19); por("banheiro", 26, 22);
  por("gerador", -24, -20); por("container", 15, -21); por("container", 21, -21);
  por("portal", 0, 34); por("cabine", -6, 33); por("cabine", 6, 33);
  por("palmeira", -28, 28); por("palmeira", 28, 28); por("arvore", -30, -6); por("arvore", 30, -6); por("arvore", -26, 14);
  A.selecionar(null); A.enquadrar();
};
// Gira a câmera em volta do centro da cena.
const orbitar = (graus, ms, subir = 0) => `new Promise((ok) => {
  const t = A.ctl.target, c = A.cam.position, dx = c.x - t.x, dz = c.z - t.z, r = Math.hypot(dx, dz), a0 = Math.atan2(dz, dx), y0 = c.y, t0 = performance.now();
  const e = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const passo = (agora) => { const k = Math.min(1, (agora - t0) / ${ms}), a = a0 + e(k) * ${graus} * Math.PI / 180;
    c.set(t.x + r * Math.cos(a), y0 + e(k) * ${subir}, t.z + r * Math.sin(a)); A.ctl.update(); k < 1 ? requestAnimationFrame(passo) : ok(); };
  requestAnimationFrame(passo);
})`;

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
  ingressos: {
    arquivo: `ingressos-nav-${v}`,
    url: "http://localhost:5174/",
    antes: casaAurora,
    passos: [
      ["esperar", 1800],
      ["rolar", 400, 1200], ["esperar", 700],
      ["clicar", "text=Aurora Sessions", 1800],
      ["rolar", 520, 1500], ["esperar", 1400],
      ["rolar", 1000, 1300], ["esperar", 1200],
      ["clicar", "text=Eventos", 1200],
      ["rolar", 0, 800], ["esperar", 400],
    ],
  },
  sysdoor: {
    arquivo: `eventos-nav-${v}`,
    largura: 1320, altura: 1200, // abaixo de ~1280 px o menu lateral recolhe
    url: "http://localhost:5183/",
    antes: async (p, ctx) => {
      await casaAurora(p, ctx);
      for (const a of ["/dashboard", "/agenda", "/ingressos", "/"]) { await p.goto("http://localhost:5183" + a, { waitUntil: "networkidle" }); }
    },
    passos: [
      ["esperar", 1800],
      ["clicar", 'a[href="/dashboard"]', 2400],
      ["clicar", 'a[href="/agenda"]', 2200],
      ["clicar", 'a[href="/ingressos"]', 2200],
      ["clicar", 'a[href="/"]', 900],
    ],
  },
  mapa3d: {
    arquivo: `mapa3d-nav-${v}`,
    url: "http://localhost:8150/",
    antes: festival,
    depoisDeAbrir: async (p) => { await p.waitForTimeout(1500); await p.evaluate(montarFestival); },
    passos: [
      ["esperar", 1200],
      ["js", orbitar(70, 3500, 4), 200],
      ["clicar", "#b-noite", 900],
      ["js", orbitar(70, 3500, -4), 300],
      ["js", "A.vistaPlanta(true); A.enquadrar()", 1600],
      ["js", "A.vistaPlanta(false); A.enquadrar()", 600],
      ["clicar", "#b-noite", 600],
    ],
  },
  portfolio: {
    arquivo: `portfolio-nav-${v}`,
    url: "https://larocalucas.github.io/",
    esperaAbrir: 3500,
    passos: [
      ["esperar", 1500],
      ["rolar", "#projetos", 1700], ["esperar", 900],
      ["clicar", "button:text-is('Sistemas')", 1300],
      ["clicar", "button:text-is('3D')", 1200],
      ["clicar", "button:text-is('Todos')", 800],
      ["rolar", "#trajetoria", 1600], ["esperar", 900],
      ["rolar", 0, 1600], ["esperar", 500],
    ],
  },
};
export { casaAurora, festival, montarFestival };
