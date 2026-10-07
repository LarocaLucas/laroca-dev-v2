import { SERVICOS } from "../site";
import { FadeIn } from "./base";

export default function Services() {
  return (
    <section id="servicos" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Serviços
        </h2>
      </FadeIn>
      <ol className="mx-auto max-w-5xl list-none">
        {SERVICOS.map(([nome, texto], i) => (
          <li key={nome} style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}>
            <FadeIn delay={i * 0.1} className="flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12">
              <span aria-hidden="true" className="w-[1.25em] flex-none font-black leading-none text-[#0C0C0C]" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2 text-[#0C0C0C]">
                <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                  {nome}
                </h3>
                <p className="max-w-2xl font-light leading-relaxed" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", color: "rgba(12, 12, 12, 0.72)" }}>
                  {texto}
                </p>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
