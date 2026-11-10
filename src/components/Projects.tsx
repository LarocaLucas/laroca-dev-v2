import { useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { MAIS, PROJETOS, type Projeto } from "../site";
import { FadeIn, GhostButton } from "./base";

const RAIO = "rounded-[28px] sm:rounded-[50px] md:rounded-[60px]";

/**
 * Vídeo da navegação: só baixa e toca quando está na tela e o cartão é o da frente da pilha
 * (o de trás continua "visível" para o navegador, embora coberto). Com movimento reduzido fica no pôster.
 */
function Navegacao({ p, ativo, className }: { p: Projeto; ativo: boolean; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const parado = useRef(false); // pausado pela pessoa (ou por preferir menos movimento)
  const [visivel, setVisivel] = useState(false);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    parado.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    obs.observe(ref.current!);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current!;
    if (visivel && ativo && !parado.current) v.play().catch(() => {});
    else v.pause();
  }, [visivel, ativo]);

  const alternar = () => {
    const v = ref.current!;
    parado.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className={`relative overflow-hidden ${RAIO} ${className}`}>
      <video ref={ref} src={p.video.mp4} poster={p.video.poster} muted loop playsInline preload="none" aria-label={`${p.nome}: vídeo navegando pelas telas do projeto`} onPlay={() => setTocando(true)} onPause={() => setTocando(false)} className="h-full w-full object-cover" />
      <button type="button" onClick={alternar} aria-label={tocando ? `Pausar vídeo do ${p.nome}` : `Reproduzir vídeo do ${p.nome}`} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#0C0C0C]/70 text-[#D7E2EA] backdrop-blur transition-colors hover:bg-[#0C0C0C] sm:right-6 sm:top-6">
        {tocando ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Cartao({ p, i, total, progresso, ativo }: { p: Projeto; i: number; total: number; progresso: MotionValue<number>; ativo: boolean }) {
  const escala = useTransform(progresso, [i / total, 1], [1, 1 - (total - 1 - i) * 0.03]);
  const formatos = ["aspect-[1440/775]", "aspect-[1280/1016]"];
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
        <div className="mb-4 sm:hidden">
          <GhostButton href={p.link}>{p.botao}</GhostButton>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="hidden w-[40%] flex-col gap-3 sm:flex sm:gap-4">
            {formatos.map((f, k) => (
              <img key={k} src={p.imagens[k]} alt={`${p.nome}: tela ${k + 2} do projeto`} loading="lazy" className={`w-full object-cover ${f} ${RAIO}`} />
            ))}
          </div>
          <Navegacao p={p} ativo={ativo} className="hidden sm:block sm:w-[60%]" />
          <Navegacao p={p} ativo={ativo} className="aspect-[11/10] sm:hidden" />
          <img src={p.imagens[0]} alt="" loading="lazy" className={`w-full object-cover sm:hidden ${formatos[0]} ${RAIO}`} />
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [ativo, setAtivo] = useState(0);
  // Cartão da frente: o último cujo topo já passou de 60% da altura da janela.
  useMotionValueEvent(scrollYProgress, "change", () => {
    const cartoes = [...(ref.current?.querySelectorAll("article") ?? [])];
    setAtivo(cartoes.reduce((a, c, k) => (c.getBoundingClientRect().top < window.innerHeight * 0.6 ? k : a), 0));
  });
  return (
    <section id="projetos" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn>
        <h2 className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-16" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Projetos
        </h2>
      </FadeIn>

      <div ref={ref}>
        {PROJETOS.map((p, i) => (
          <Cartao key={p.nome} p={p} i={i} total={PROJETOS.length} progresso={scrollYProgress} ativo={i === ativo} />
        ))}
      </div>

      <div className="mx-auto max-w-5xl pb-20 pt-20 sm:pb-28 sm:pt-72">
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
                {m.link && <span className="sr-only">(abre em nova aba)</span>}
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
