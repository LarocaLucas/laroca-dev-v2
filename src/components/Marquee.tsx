import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { TILES } from "../site";

type Tile = (typeof TILES)[number][number];

/** Vídeo de uma tela da faixa: só baixa e toca enquanto aparece. */
function Tela({ t, parado }: { t: Tile; parado: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting));
    obs.observe(ref.current!);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current!;
    if (visivel && !parado) v.play().catch(() => {});
    else v.pause();
  }, [visivel, parado]);

  return (
    <div className="flex-none pr-3">
      <video ref={ref} src={t.mp4} poster={t.poster} muted loop playsInline preload="none" aria-hidden="true" className="h-[170px] w-[264px] rounded-2xl object-cover sm:h-[270px] sm:w-[420px]" />
    </div>
  );
}

function Fila({ telas, reverso, parado }: { telas: Tile[]; reverso?: boolean; parado: boolean }) {
  return (
    <div className="faixa flex w-max" style={{ animationDirection: reverso ? "reverse" : "normal", animationPlayState: parado ? "paused" : "running" }}>
      {[...telas, ...telas, ...telas].map((t, i) => (
        <Tela key={i} t={t} parado={parado} />
      ))}
    </div>
  );
}

/** Legenda discreta de cada fileira. */
function Rotulo({ children }: { children: string }) {
  return <p className="px-4 text-xs font-light uppercase tracking-[0.3em] text-[#D7E2EA]/45 sm:px-8 md:px-10">{children}</p>;
}

/** Duas fileiras de vídeos dos projetos que rodam sozinhas, em sentidos opostos. */
export default function Marquee() {
  const [parado, setParado] = useState(false);

  // Quem prefere menos movimento recebe a faixa parada (o CSS também desliga a animação).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setParado(true);
  }, []);

  return (
    <section className="relative flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-16 pt-24 sm:pt-32 md:pt-40">
      <Rotulo>Sites</Rotulo>
      <Fila telas={TILES[0]} parado={parado} />
      <Fila telas={TILES[1]} reverso parado={parado} />
      <Rotulo>Sistemas</Rotulo>
      <button type="button" onClick={() => setParado(!parado)} aria-label={parado ? "Reproduzir a faixa de projetos" : "Pausar a faixa de projetos"} className="absolute bottom-2 right-4 grid h-11 w-11 place-items-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:right-8 md:right-10">
        {parado ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
      </button>
    </section>
  );
}
