import { CONTATO } from "../site";
import { ContactButton, FadeIn, Rodape } from "./base";

export default function Contact() {
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

      <Rodape className="mt-20 sm:mt-28" />
    </section>
  );
}
