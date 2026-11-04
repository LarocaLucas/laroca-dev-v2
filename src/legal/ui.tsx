import type { ReactNode } from "react";
import { LEGAIS } from "../site";
import { Rodape } from "../components/base";

export type Secao = { id: string; titulo: string; corpo: ReactNode };

/** Textos oficiais (LexML / normas.leg.br), conferidos no acervo local em 04/11/2026. */
const norma = (urn: string) => `https://normas.leg.br/?urn=urn:lex:br:federal:${urn}`;
export const FONTE = {
  lgpd: norma("lei:2018-08-14;13709"),
  marcoCivil: norma("lei:2014-04-23;12965"),
  dec8771: norma("decreto:2016-05-11;8771"),
  cdc: norma("lei:1990-09-11;8078"),
  dec7962: norma("decreto:2013-03-15;7962"),
  codigoCivil: norma("lei:2002-01-10;10406"),
  direitosAutorais: norma("lei:1998-02-19;9610"),
  software: norma("lei:1998-02-19;9609"),
  ecaDigital: norma("lei:2025-09-17;15211"),
  cpc: norma("lei:2015-03-16;13105"),
  anpd: "https://www.gov.br/anpd/pt-br",
  anpdResolucoes: "https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd",
};

/** Link para fora do site: abre em nova aba e avisa o leitor de tela. */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

/** Link para outra página legal do próprio site. */
export const Interno = ({ para, children }: { para: string; children: ReactNode }) => <a href={`${import.meta.env.BASE_URL}${para}`}>{children}</a>;

/** Cartão de uma atividade de tratamento: rótulo à esquerda, detalhe à direita. */
export function Ficha({ titulo, itens }: { titulo: string; itens: [string, ReactNode][] }) {
  return (
    <div className="ficha">
      <h3>{titulo}</h3>
      <dl>
        {itens.map(([rotulo, valor]) => (
          <div key={rotulo}>
            <dt>{rotulo}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PaginaLegal({ caminho, titulo, chamada, versao, vigencia, resumo, secoes }: { caminho: string; titulo: string; chamada: string; versao: string; vigencia: string; resumo: ReactNode[]; secoes: Secao[] }) {
  const base = import.meta.env.BASE_URL;
  return (
    <main style={{ background: "#0C0C0C", overflowX: "clip" }}>
      <a href="#texto" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#D7E2EA] focus:px-5 focus:py-2 focus:font-medium focus:text-[#0C0C0C]">
        Pular para o texto
      </a>
      <header className="mx-auto box-content max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <a href={base} className="text-lg font-black uppercase tracking-tight text-[#D7E2EA]">
            laroca<span className="text-[#B600A8]">.</span>dev
          </a>
          <a href={base} className="rounded-full border-2 border-[#D7E2EA] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:text-sm">
            Voltar ao site
          </a>
        </div>
        <h1 className="hero-heading mt-16 font-black uppercase leading-[0.95] tracking-tight sm:mt-24" style={{ fontSize: "clamp(2.4rem, 8.5vw, 112px)" }}>
          {titulo}
        </h1>
        <p className="mt-6 max-w-2xl font-light leading-relaxed text-[#D7E2EA]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>
          {chamada}
        </p>
        <p className="mt-6 text-sm font-light" style={{ color: "rgba(215, 226, 234, 0.7)" }}>
          Versão {versao} · em vigor desde {vigencia}
        </p>
        <nav aria-label="Páginas legais" className="mt-8 flex flex-wrap gap-3">
          {LEGAIS.map(([nome, c]) => (
            <a
              key={c}
              href={`${base}${c}`}
              aria-current={c === caminho ? "page" : undefined}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-colors duration-200 sm:text-sm ${c === caminho ? "border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C]" : "border-[#D7E2EA]/40 text-[#D7E2EA] hover:border-[#D7E2EA]"}`}
            >
              {nome}
            </a>
          ))}
        </nav>
      </header>

      <div className="rounded-t-[40px] bg-white px-5 pb-10 pt-14 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:pt-20 md:rounded-t-[60px] md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-labelledby="sumario" className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
            <h2 id="sumario" className="text-sm font-semibold uppercase tracking-widest">
              Sumário
            </h2>
            <ol className="mt-4 space-y-2 text-sm leading-snug" style={{ color: "rgba(12, 12, 12, 0.75)" }}>
              {secoes.map((s, i) => (
                <li key={s.id} className="flex gap-2">
                  <span aria-hidden="true" className="w-6 flex-none tabular-nums text-[#B600A8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${s.id}`} className="underline-offset-4 hover:text-[#0C0C0C] hover:underline">
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article id="texto" tabIndex={-1} className="juridico min-w-0 max-w-3xl outline-none">
            <section aria-labelledby="em-poucas-palavras" className="resumo">
              <h2 id="em-poucas-palavras">Em poucas palavras</h2>
              <ul>
                {resumo.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <p className="nota">O resumo ajuda a leitura, mas não substitui o texto completo abaixo.</p>
            </section>
            {secoes.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {s.titulo}
                </h2>
                {s.corpo}
              </section>
            ))}
          </article>
        </div>
        <Rodape className="mt-24" />
      </div>
    </main>
  );
}
