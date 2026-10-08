import { CHAMADA, NAV } from "../site";
import { ContactButton, FadeIn, Magnet } from "./base";
import { Emblema } from "./Iso";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[560px] flex-col" style={{ overflowX: "clip" }}>
      <a href="#sobre" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#D7E2EA] focus:px-5 focus:py-2 focus:font-medium focus:text-[#0C0C0C]">
        Pular para o conteúdo
      </a>
      <FadeIn delay={0} y={-20}>
        <nav aria-label="Seções" className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV.map(([nome, href]) => (
            <a key={href} href={href} className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]">
              {nome}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[15.5vw] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-2 lg:text-[16vw]">laroca.dev</h1>
        </FadeIn>
      </div>

      <div className="flex-1" />

      <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            {CHAMADA}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-[42%] sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} className="pointer-events-auto">
            <Emblema className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
