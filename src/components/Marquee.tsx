import { useEffect, useRef, useState } from "react";
import { TILES } from "../site";

function Fila({ imagens, deslocamento }: { imagens: string[]; deslocamento: number }) {
  return (
    <div className="flex w-max gap-3" style={{ transform: `translateX(${deslocamento}px)`, willChange: "transform" }}>
      {[...imagens, ...imagens, ...imagens].map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy" width={420} height={270} className="h-[170px] w-[264px] flex-none rounded-2xl object-cover sm:h-[270px] sm:w-[420px]" />
      ))}
    </div>
  );
}

/** Duas fileiras de telas dos projetos que deslizam em sentidos opostos conforme a página rola. */
export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const rolar = () => {
      const topo = ref.current?.offsetTop ?? 0;
      setOffset((window.scrollY - topo + window.innerHeight) * 0.3);
    };
    rolar();
    window.addEventListener("scroll", rolar, { passive: true });
    return () => window.removeEventListener("scroll", rolar);
  }, []);

  const meio = Math.ceil(TILES.length / 2);
  return (
    <section ref={ref} aria-hidden="true" className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex justify-center">
        <Fila imagens={TILES.slice(0, meio)} deslocamento={offset - 200} />
      </div>
      <div className="flex justify-center">
        <Fila imagens={TILES.slice(meio)} deslocamento={-(offset - 200)} />
      </div>
    </section>
  );
}
