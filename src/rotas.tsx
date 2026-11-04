import type { ComponentType } from "react";
import App from "./App";
import Privacidade from "./legal/Privacidade";
import Termos from "./legal/Termos";
import Exclusao from "./legal/Exclusao";

/** Páginas do site. A chave é o caminho sem a base ("" = início); título e descrição só valem para as páginas internas. */
export const ROTAS: Record<string, { Pagina: ComponentType; titulo?: string; descricao?: string }> = {
  "": { Pagina: App },
  privacidade: {
    Pagina: Privacidade,
    titulo: "Política de privacidade | laroca.dev",
    descricao: "Como a laroca.dev trata dados pessoais no site, no atendimento, nos projetos para clientes e nas integrações com Instagram, Facebook, TikTok e YouTube, conforme a LGPD.",
  },
  termos: {
    Pagina: Termos,
    titulo: "Termos de uso | laroca.dev",
    descricao: "Regras de uso do site laroca.dev e dos aplicativos que a laroca.dev mantém no Instagram, Facebook, TikTok e YouTube.",
  },
  "exclusao-de-dados": {
    Pagina: Exclusao,
    titulo: "Exclusão de dados | laroca.dev",
    descricao: "Como pedir a exclusão dos seus dados pela laroca.dev, inclusive os recebidos do Instagram, Facebook, TikTok e YouTube, com prazos e passo a passo.",
  },
};

/** Caminho do endereço atual sem a base, sem barra final e sem ".html". */
export const caminhoAtual = (pathname: string, base: string) => pathname.slice(base.length).replace(/(\.html|\/)$/, "");
