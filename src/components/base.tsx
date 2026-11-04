import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { EMAIL, EMPRESA, INSTAGRAM, LEGAIS, MSG_ORCAMENTO, WHATSAPP, zap } from "../site";

/** Rodapé das páginas (fundo branco): contatos, páginas legais e identificação do fornecedor (Decreto 7.962/2013, art. 2º, I e II). */
export function Rodape({ className = "" }: { className?: string }) {
  const contatos = [
    ["WhatsApp", WHATSAPP],
    ["Instagram", INSTAGRAM],
    ["E-mail", `mailto:${EMAIL}`],
  ] as const;
  const suave = { color: "rgba(12, 12, 12, 0.72)" };
  return (
    <footer className={`mx-auto max-w-6xl text-[#0C0C0C] ${className}`} style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}>
      <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
        <a href={import.meta.env.BASE_URL} className="text-lg font-black uppercase tracking-tight">
          laroca<span className="text-[#B600A8]">.</span>dev
        </a>
        <nav aria-label="Contatos" className="flex gap-6 sm:gap-10">
          {contatos.map(([nome, href]) => (
            <a key={nome} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-60 sm:text-base">
              {nome}
              {href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
            </a>
          ))}
        </nav>
        <p className="text-sm font-light" style={suave}>
          Castro e Ponta Grossa, PR
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs font-light sm:flex-row sm:text-left sm:text-sm" style={suave}>
        <p>
          {EMPRESA.nome} · CNPJ {EMPRESA.cnpj} · {EMPRESA.cidade} · {EMAIL}
        </p>
        <nav aria-label="Informações legais" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {LEGAIS.map(([nome, caminho]) => (
            <a key={caminho} href={`${import.meta.env.BASE_URL}${caminho}`} className="underline-offset-4 hover:underline">
              {nome}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/** Entrada suave quando o elemento aparece na tela. */
export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className, style }: { children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string; style?: CSSProperties }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "50px", amount: 0 }} transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/** Efeito magnético: o conteúdo acompanha o mouse quando ele chega perto. */
export function Magnet({ children, padding = 150, strength = 3, className }: { children: ReactNode; padding?: number; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mover = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const perto = Math.abs(cx - e.clientX) < r.width / 2 + padding && Math.abs(cy - e.clientY) < r.height / 2 + padding;
      setAtivo(perto);
      setPos(perto ? { x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength } : { x: 0, y: 0 });
    };
    window.addEventListener("mousemove", mover, { passive: true });
    return () => window.removeEventListener("mousemove", mover);
  }, [padding, strength]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, transition: ativo ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out", willChange: "transform" }}>{children}</div>
    </div>
  );
}

function Letra({ c, progresso, faixa }: { c: string; progresso: MotionValue<number>; faixa: [number, number] }) {
  const opacity = useTransform(progresso, faixa, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{c}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {c}
      </motion.span>
    </span>
  );
}

/** Texto que acende letra por letra conforme a página rola; termina com o parágrafo ainda inteiro na tela. */
export function AnimatedText({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.75"] });
  const total = text.length;
  let i = 0;
  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((palavra, p) => {
        const inicio = i;
        i += palavra.length + 1;
        return (
          <span key={p} aria-hidden="true" className="inline-block whitespace-nowrap">
            {[...palavra].map((c, k) => (
              <Letra key={k} c={c} progresso={scrollYProgress} faixa={[(inicio + k) / total, (inicio + k + 1) / total]} />
            ))}
            {" "}
          </span>
        );
      })}
    </p>
  );
}

export function ContactButton({ label = "Fale conosco", texto = MSG_ORCAMENTO }: { label?: string; texto?: string }) {
  return (
    <a
      href={zap(texto)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid #fff",
        outlineOffset: "-3px",
      }}
    >
      {label}
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

export function GhostButton({ href, children, escuro = false }: { href: string; children: ReactNode; escuro?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block whitespace-nowrap rounded-full border-2 px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-200 sm:px-10 sm:py-3.5 sm:text-base ${escuro ? "border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C]/10" : "border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10"}`}
    >
      {children}
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}
