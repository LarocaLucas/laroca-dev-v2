import { useRef } from "react";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MAIS, PROJETOS, type Projeto } from "../site";
import { FadeIn, GhostButton } from "./base";

const RAIO = "rounded-[28px] sm:rounded-[50px] md:rounded-[60px]";

function Capa({ texto, className, style }: { texto: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`flex items-end p-5 sm:p-8 ${RAIO} ${className ?? ""}`} style={{ background: "linear-gradient(140deg, #18011F 0%, #4A1474 55%, #B600A8 130%)", ...style }}>
      <span className="font-medium uppercase leading-tight text-[#D7E2EA]" style={{ fontSize: "clamp(0.8rem, 1.9vw, 1.7rem)" }}>
        {texto}
      </span>
    </div>
  );
}

function Cartao({ p, i, total, progresso }: { p: Projeto; i: number; total: number; progresso: MotionValue<number> }) {
  const escala = useTransform(progresso, [i / total, 1], [1, 1 - (total - 1 - i) * 0.03]);
  const alturas = [{ height: "clamp(130px, 16vw, 230px)" }, { height: "clamp(160px, 22vw, 340px)" }];
  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article style={{ scale: escala, top: `${i * 28}px` }} className={`relative w-full max-w-6xl origin-top border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 ${RAIO}`}>
        <div className="mb-4 flex items-center gap-4 sm:mb-6 sm:gap-8">
          <span aria-hidden="true" className="font-black leading-none text-[#D7E2EA]" style={{ fontSize: "clamp(2.6rem, 8vw, 110px)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">{p.categoria}</p>
            <h3 className="font-medium uppercase leading-tight text-[#D7E2EA]" style={{ fontSize: "clamp(1.1rem, 2.6vw, 2.4rem)" }}>
              {p.nome}
            </h3>
            <p className="mt-1 hidden max-w-xl text-sm font-light leading-snug text-[#D7E2EA]/70 md:block lg:text-base">{p.resumo}</p>
          </div>
          <div className="hidden sm:block">
            <GhostButton href={p.link}>{p.botao}</GhostButton>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            {[0, 1].map((k) => (p.imagens ? <img key={k} src={p.imagens[k]} alt="" loading="lazy" className={`w-full object-cover object-top ${RAIO}`} style={alturas[k]} /> : <Capa key={k} texto={p.capa![k]} style={alturas[k]} />))}
          </div>
          <div className="w-[60%]">{p.imagens ? <img src={p.imagens[2]} alt={`Tela inicial de ${p.nome}`} loading="lazy" className={`h-full w-full object-cover object-top ${RAIO}`} /> : <Capa texto={p.capa![2]} className="h-full" />}</div>
        </div>
        <div className="mt-4 sm:hidden">
          <GhostButton href={p.link}>{p.botao}</GhostButton>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="projetos" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn>
        <h2 className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-16" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Projetos
        </h2>
      </FadeIn>

      <div ref={ref}>
        {PROJETOS.map((p, i) => (
          <Cartao key={p.nome} p={p} i={i} total={PROJETOS.length} progresso={scrollYProgress} />
        ))}
      </div>

      <div className="mx-auto max-w-5xl pb-20 pt-10 sm:pb-28">
        <FadeIn>
          <h3 className="mb-6 font-medium uppercase tracking-widest text-[#D7E2EA]/70">Mais projetos e o que vem por aí</h3>
        </FadeIn>
        <ul className="list-none">
          {MAIS.map((m, i) => {
            const linha = (
              <FadeIn delay={i * 0.06} className="flex items-center gap-4 py-5 sm:gap-8 sm:py-6">
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">{m.tipo}</p>
                  <p className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}>
                    {m.nome}
                  </p>
                  <p className="max-w-2xl font-light text-[#D7E2EA]/70">{m.texto}</p>
                </div>
                {m.link && <ArrowUpRight aria-hidden="true" className="h-7 w-7 flex-none text-[#D7E2EA] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-9 sm:w-9" />}
              </FadeIn>
            );
            return (
              <li key={m.nome} style={{ borderTop: "1px solid rgba(215, 226, 234, 0.18)" }}>
                {m.link ? (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" className="group block">
                    {linha}
                  </a>
                ) : (
                  linha
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
