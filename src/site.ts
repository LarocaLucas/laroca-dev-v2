// Conteúdo do site num lugar só: textos, links e projetos.
// Voz: a laroca.dev fala como empresa ("nós"), nunca em primeira pessoa do singular.
const img = (nome: string) => `${import.meta.env.BASE_URL}img/${nome}.webp`;

export const WHATSAPP = "https://wa.me/5542998041396";
export const zap = (texto: string) => `${WHATSAPP}?text=${encodeURIComponent(texto)}`;
export const EMAIL = "contato@laroca.dev";
export const GITHUB = "https://github.com/LarocaLucas";
export const INSTAGRAM = "https://instagram.com/dev.laroca";

export const NAV = [
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Projetos", "#projetos"],
  ["Contato", "#contato"],
] as const;

export const CHAMADA = "sites, sistemas e automações sob medida para destacar o seu negócio";

export const SOBRE =
  "A laroca.dev desenvolve sites, sistemas de gestão e automações para negócios que querem se destacar e vender mais. Somos de Castro, no Paraná, com mais de cinco anos de experiência em TI. Cada projeto é feito sob medida para o cliente, do levantamento ao deploy, com atendimento direto de quem desenvolve. Vamos construir algo incrível juntos!";

export const SERVICOS = [
  ["Sistemas sob medida", "Sistemas totalmente personalizados, desenvolvidos sob demanda para o jeito que a sua empresa trabalha. Levantamos os requisitos com você e construímos do zero, sem obrigar o negócio a se adaptar a um software pronto."],
  ["Sistemas prontos por segmento", "Produtos próprios para lojas de roupas e calçados e para clínicas: PDV, estoque, agenda, prontuário e nota fiscal, configurados para a sua operação."],
  ["Sites institucionais", "Site profissional para apresentar a sua empresa, captar clientes e gerar autoridade: design próprio, celular em primeiro lugar, WhatsApp integrado e pronto para o Google."],
  ["Landing pages", "Páginas de alta conversão para campanhas, produtos e lançamentos, rápidas e medidas, com foco em transformar visita em contato."],
  ["Automações e integrações", "Tarefas repetitivas que passam a rodar sozinhas: WhatsApp, planilhas, cobranças, notas fiscais e sistemas conversando entre si."],
  ["Consultoria de TI", "Diagnóstico e orientação para escolher ferramentas, organizar a infraestrutura e tirar o projeto do papel sem desperdício."],
] as const;

export const CONTATO = "Conte o que a sua empresa precisa. Levantamos os requisitos com você e enviamos um orçamento com escopo, prazo e valor.";
export const MSG_ORCAMENTO = "Olá! Vi o site da laroca.dev e quero um orçamento.";

export type Projeto = {
  nome: string;
  categoria: string;
  resumo: string;
  botao: string;
  link: string;
  /** Capturas no formato de cada espaço: [larga, média, principal, principal para celular] */
  imagens?: [string, string, string, string];
  /** Sem capturas de tela: três destaques em texto. */
  capa?: [string, string, string];
};

const telas = (site: string): [string, string, string, string] => [img(`${site}-a`), img(`${site}-b`), img(`${site}-hero`), img(`${site}-m1`)];

export const PROJETOS: Projeto[] = [
  { nome: "Door PG", categoria: "Site · Balada", resumo: "Countdown de lançamento, agenda da semana, galeria de fotos com download e reservas.", botao: "Ver no ar", link: "https://doorpg.com.br", imagens: telas("door") },
  { nome: "DJ Laroca", categoria: "Site · Música", resumo: "Site oficial com estética neon, galeria de eventos e contratação pelo WhatsApp.", botao: "Ver no ar", link: "https://djlaroca.com.br", imagens: telas("djlaroca") },
  { nome: "DJ Reinaldo", categoria: "Site · Institucional", resumo: "Site editorial para um DJ com mais de 30 anos de carreira, em grafite e dourado.", botao: "Ver no ar", link: "https://djreinaldo.com.br", imagens: telas("djreinaldo") },
  { nome: "Arranca Toco", categoria: "Site · Evento", resumo: "Página do evento com contagem regressiva, ingressos por lote e localização.", botao: "Ver no ar", link: "https://arrancatocopg.com.br", imagens: telas("arrancatoco") },
  { nome: "Sistema Moda", categoria: "Produto · Lojas de roupas e calçados", resumo: "PDV, estoque por grade de tamanho e cor, trocas e nota fiscal, do caixa ao fechamento.", botao: "Pedir demonstração", link: zap("Olá! Quero uma demonstração do Sistema Moda."), imagens: telas("moda") },
  { nome: "Sistema Odonto", categoria: "Produto · Clínicas e harmonização", resumo: "Agenda, prontuário, mapa facial com lote, termos assinados e orçamentos com aceite por link.", botao: "Pedir demonstração", link: zap("Olá! Quero uma demonstração do Sistema Odonto."), imagens: telas("odonto") },
];

export const MAIS: { nome: string; tipo: string; texto: string; link?: string }[] = [
  { nome: "HelpDesk CLI", tipo: "GitHub · Python", texto: "Sistema de tickets de suporte com SQLite, relatórios e interface no terminal.", link: `${GITHUB}/helpdesk-cli` },
  { nome: "AWS Dev Environment", tipo: "GitHub · Infraestrutura", texto: "Ambiente de desenvolvimento na nuvem montado como código.", link: `${GITHUB}/aws-dev-environment` },
  { nome: "Sistema Revenda", tipo: "Em desenvolvimento", texto: "Gestão de revenda de veículos com o site da loja integrado ao estoque." },
  { nome: "Sistema Imobiliária", tipo: "Em desenvolvimento", texto: "Imóveis, portais, CRM e locação, com o site da imobiliária atualizado sozinho." },
  { nome: "Sistema Eventos", tipo: "Em desenvolvimento", texto: "Ingressos, portaria, bar e caixa para casas noturnas e produtoras." },
];

/**
 * Faixa de telas: só cenas com imagem forte (páginas iniciais e galerias), sem blocos de texto.
 * Cada fileira é centralizada, então as telas do meio da lista são as que aparecem primeiro:
 * por isso as páginas iniciais dos sites ficam no meio.
 */
export const TILES = [
  "djlaroca-m2", "door-m3", "door-m1", "djlaroca-m1", "djreinaldo-m2", "moda-m1",
  "door-m2", "odonto-m1", "djreinaldo-m1", "arrancatoco-m1", "djlaroca-m3",
].map(img);
