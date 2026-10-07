import { SOBRE } from "../site";
import { AnimatedText, ContactButton, FadeIn } from "./base";
import { Cena, ENFEITES } from "./Iso";

const CANTOS = [
  { cena: ENFEITES.degraus, pos: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[110px] sm:w-[150px] md:w-[200px]", delay: 0.1, x: -80 },
  { cena: ENFEITES.bloco, pos: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]", delay: 0.25, x: -80 },
  { cena: ENFEITES.janela, pos: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]", delay: 0.15, x: 80 },
  { cena: ENFEITES.servidor, pos: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[110px] sm:w-[150px] md:w-[200px]", delay: 0.3, x: 80 },
] as const;

export default function About() {
  return (
    <section id="sobre" className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10">
      {CANTOS.map((c, i) => (
        <div key={i} className={`pointer-events-none absolute ${c.pos}`}>
          <FadeIn delay={c.delay} x={c.x} y={0} duration={0.9}>
            <Cena caixas={c.cena} className="h-auto w-full" />
          </FadeIn>
        </div>
      ))}

      <div className="relative flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
              Sobre
            </h2>
          </FadeIn>
          <AnimatedText text={SOBRE} className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }} />
        </div>
        <ContactButton />
      </div>
    </section>
  );
}
