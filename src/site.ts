// Conteúdo do site num lugar só: textos, links e projetos.
const img = (nome: string) => `${import.meta.env.BASE_URL}img/${nome}.webp`;

export const WHATSAPP = "https://wa.me/5542998041396";
export const zap = (texto: string) => `${WHATSAPP}?text=${encodeURIComponent(texto)}`;
export const EMAIL = "lucas.laroca.campos@gmail.com";
export const GITHUB = "https://github.com/LarocaLucas";

export const NAV = [
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Projetos", "#projetos"],
  ["Contato", "#contato"],
] as const;

export const SOBRE =
  "Sou o Lucas, desenvolvedor em Castro, no Paraná. Há mais de cinco anos em TI, crio sites, sistemas de gestão e automações para negócios que querem se destacar e vender mais. Do briefing ao deploy, você fala direto comigo. Vamos construir algo incrível juntos!";

export const SERVICOS = [
  ["Sites institucionais", "Site profissional para apresentar o seu negócio, captar clientes e gerar autoridade: design próprio, celular em primeiro lugar, WhatsApp integrado e pronto para o Google."],
  ["Landing pages", "Páginas de alta conversão para campanhas, produtos e lançamentos, rápidas e medidas, com foco em transformar visita em contato."],
  ["Sistemas web", "Sistemas de gestão sob medida e produtos prontos: PDV e estoque para lojas, agenda e prontuário para clínicas, painéis, APIs e relatórios."],
  ["Automações e integrações", "Tarefas repetitivas que passam a rodar sozinhas: WhatsApp, planilhas, cobranças, notas fiscais e sistemas conversando entre si."],
  ["Consultoria de TI", "Diagnóstico e orientação para escolher ferramentas, organizar a infraestrutura e tirar o projeto do papel sem desperdício."],
] as const;

export type Projeto = {
  nome: string;
  categoria: string;
  resumo: string;
  botao: string;
  link: string;
  /** [esquerda em cima, esquerda embaixo, direita alta] */
  imagens?: [string, string, string];
  /** Sem capturas de tela: três destaques em texto. */
  capa?: [string, string, string];
};

export const PROJETOS: Projeto[] = [
  { nome: "Door PG", categoria: "Site · Balada", resumo: "Countdown de lançamento, agenda, galeria de fotos com download e reservas.", botao: "Ver no ar", link: "https://doorpg.com.br", imagens: [img("door-2"), img("door-3"), img("door-1")] },
  { nome: "DJ Laroca", categoria: "Site · Música", resumo: "Site oficial com estética neon, galeria em mosaico e contratação pelo WhatsApp.", botao: "Ver no ar", link: "https://djlaroca.com.br", imagens: [img("djlaroca-2"), img("djlaroca-3"), img("djlaroca-1")] },
  { nome: "DJ Reinaldo", categoria: "Site · Institucional", resumo: "Site editorial para um DJ com mais de 30 anos de carreira, em grafite e dourado.", botao: "Ver no ar", link: "https://djreinaldo.com.br", imagens: [img("djreinaldo-2"), img("djreinaldo-3"), img("djreinaldo-1")] },
  { nome: "Arranca Toco", categoria: "Site · Evento", resumo: "Página do evento com contagem regressiva, ingressos por lote e localização.", botao: "Ver no ar", link: "https://arrancatocopg.com.br", imagens: [img("arrancatoco-2"), img("arrancatoco-3"), img("arrancatoco-1")] },
  { nome: "Sistema Moda", categoria: "Produto · Lojas de roupas e calçados", resumo: "PDV, estoque por grade de tamanho e cor, trocas e nota fiscal, do caixa ao fechamento.", botao: "Pedir demonstração", link: zap("Olá Lucas! Quero uma demonstração do Sistema Moda."), capa: ["PDV que funciona sem internet", "Estoque por grade", "NFC-e e NF-e"] },
  { nome: "Sistema Odonto", categoria: "Produto · Clínicas e harmonização", resumo: "Agenda, prontuário, mapa facial com lote, termos assinados e orçamentos com aceite por link.", botao: "Pedir demonstração", link: zap("Olá Lucas! Quero uma demonstração do Sistema Odonto."), capa: ["Agenda e prontuário", "Mapa facial com lote", "Orçamento com aceite por link"] },
];

export const MAIS: { nome: string; tipo: string; texto: string; link?: string }[] = [
  { nome: "HelpDesk CLI", tipo: "GitHub · Python", texto: "Sistema de tickets de suporte com SQLite, relatórios e interface no terminal.", link: `${GITHUB}/helpdesk-cli` },
  { nome: "AWS Dev Environment", tipo: "GitHub · Infraestrutura", texto: "Ambiente de desenvolvimento na nuvem montado como código.", link: `${GITHUB}/aws-dev-environment` },
  { nome: "Sistema Revenda", tipo: "Em desenvolvimento", texto: "Gestão de revenda de veículos com o site da loja integrado ao estoque." },
  { nome: "Sistema Imobiliária", tipo: "Em desenvolvimento", texto: "Imóveis, portais, CRM e locação, com o site da imobiliária atualizado sozinho." },
  { nome: "Sistema Eventos", tipo: "Em desenvolvimento", texto: "Ingressos, portaria, bar e caixa para casas noturnas e produtoras." },
];

export const TILES = PROJETOS.flatMap((p) => p.imagens ?? []);
