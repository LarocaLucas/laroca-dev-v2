import { CONTATO, EMAIL, INSTAGRAM, WHATSAPP } from "../site";
import { ContactButton, FadeIn } from "./base";

export default function Contact() {
  const links = [
    ["WhatsApp", WHATSAPP],
    ["Instagram", INSTAGRAM],
    ["E-mail", `mailto:${EMAIL}`],
  ] as const;
  return (
    <section id="contato" className="rounded-t-[40px] bg-white px-5 pb-10 pt-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center sm:gap-14">
        <FadeIn y={40}>
          <h2 className="font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.6rem, 10.5vw, 150px)" }}>
            Vamos conversar?
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="max-w-xl font-light leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "rgba(12, 12, 12, 0.72)" }}>
            {CONTATO}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <ContactButton label="Chamar no WhatsApp" />
        </FadeIn>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-6 pt-8 sm:mt-28 sm:flex-row" style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}>
        <p className="text-lg font-black uppercase tracking-tight">
          laroca<span className="text-[#B600A8]">.</span>dev
        </p>
        <nav aria-label="Contatos" className="flex gap-6 sm:gap-10">
          {links.map(([nome, href]) => (
            <a key={nome} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-60 sm:text-base">
              {nome}
            </a>
          ))}
        </nav>
        <p className="text-sm font-light" style={{ color: "rgba(12, 12, 12, 0.72)" }}>
          Castro e Ponta Grossa, PR
        </p>
      </footer>
    </section>
  );
}
