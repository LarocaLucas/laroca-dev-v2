// Objetos 3D desenhados em SVG por projeção isométrica: o emblema do laroca.dev e os enfeites.
type Tom = "aco" | "escuro" | "rosa" | "roxo" | "laranja";
// [topo claro, topo base, face esquerda, face direita]
const TONS: Record<Tom, [string, string, string, string]> = {
  aco: ["#F4F8FB", "#C9D6DF", "#7F8A97", "#535A64"],
  escuro: ["#4A4E57", "#33363D", "#1F2126", "#131417"],
  rosa: ["#FF7BE6", "#E23CD0", "#B600A8", "#730A72"],
  roxo: ["#C08BF0", "#9A4FDD", "#7621B0", "#47136E"],
  laranja: ["#FFB877", "#F08A3C", "#BE4C00", "#7C3200"],
};

export type Caixa = { x: number; y: number; z: number; w: number; d: number; h: number; tom: Tom; flutua?: boolean };

const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);

/** As caixas são desenhadas na ordem da lista: as do fundo primeiro. */
export function Cena({ caixas, unidade = 40, className, brilho = false, titulo }: { caixas: Caixa[]; unidade?: number; className?: string; brilho?: boolean; titulo?: string }) {
  const p = (x: number, y: number, z: number): [number, number] => [(x - y) * C * unidade, (x + y) * S * unidade - z * unidade];
  const faces = caixas.map((b) => {
    const { x, y, z, w, d, h } = b;
    return {
      b,
      topo: [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)],
      esq: [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)],
      dir: [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)],
    };
  });
  const pts = faces.flatMap((f) => [...f.topo, ...f.esq, ...f.dir]);
  const xs = pts.map((q) => q[0]);
  const ys = pts.map((q) => q[1]);
  const m = unidade * (brilho ? 1.1 : 0.4);
  const minX = Math.min(...xs) - m;
  const minY = Math.min(...ys) - m;
  const larg = Math.max(...xs) - minX + m;
  const alt = Math.max(...ys) - minY + m;
  const pol = (q: [number, number][]) => q.map(([a, c]) => `${a.toFixed(1)},${c.toFixed(1)}`).join(" ");
  const id = (t: Tom) => `iso-${t}`;
  const usados = [...new Set(caixas.map((b) => b.tom))];

  return (
    <svg viewBox={`${minX} ${minY} ${larg} ${alt}`} className={className} role={titulo ? "img" : "presentation"} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      <defs>
        {usados.map((t) => (
          <linearGradient key={t} id={id(t)} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={TONS[t][0]} />
            <stop offset="1" stopColor={TONS[t][1]} />
          </linearGradient>
        ))}
        {brilho && (
          <radialGradient id="iso-brilho" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#B600A8" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#7621B0" stopOpacity="0.2" />
            <stop offset="1" stopColor="#7621B0" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      {brilho && <ellipse cx={minX + larg / 2} cy={minY + alt * 0.8} rx={larg * 0.5} ry={alt * 0.16} fill="url(#iso-brilho)" />}
      {faces.map(({ b, topo, esq, dir }, i) => (
        <g key={i} className={b.flutua ? "iso-flutua" : undefined} strokeLinejoin="round">
          <polygon points={pol(esq)} fill={TONS[b.tom][2]} stroke={TONS[b.tom][2]} strokeWidth="1" />
          <polygon points={pol(dir)} fill={TONS[b.tom][3]} stroke={TONS[b.tom][3]} strokeWidth="1" />
          <polygon points={pol(topo)} fill={`url(#${id(b.tom)})`} stroke={TONS[b.tom][0]} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/** Emblema: o "L" de laroca em bloco, com o ponto do ".dev" flutuando. */
const EMBLEMA: Caixa[] = [
  { x: -0.7, y: -0.7, z: -0.45, w: 5.2, d: 3.2, h: 0.45, tom: "escuro" },
  { x: 0, y: 0, z: 0, w: 1.4, d: 1.8, h: 4.6, tom: "aco" },
  { x: 1.4, y: 0, z: 0, w: 2.4, d: 1.8, h: 1.4, tom: "aco" },
  { x: 2.3, y: 0.35, z: 2.5, w: 1.1, d: 1.1, h: 1.1, tom: "rosa", flutua: true },
];

export function Emblema({ className }: { className?: string }) {
  return <Cena caixas={EMBLEMA} unidade={52} brilho className={className} titulo="Emblema do laroca.dev: a letra L em bloco com um cubo rosa" />;
}

export const ENFEITES: Record<"degraus" | "servidor" | "bloco" | "janela", Caixa[]> = {
  degraus: [
    { x: 0, y: 0, z: 0, w: 1, d: 1.2, h: 1, tom: "aco" },
    { x: 1, y: 0, z: 0, w: 1, d: 1.2, h: 2, tom: "roxo" },
    { x: 2, y: 0, z: 0, w: 1, d: 1.2, h: 3, tom: "rosa" },
  ],
  servidor: [
    { x: 0, y: 0, z: 0, w: 2.4, d: 1.7, h: 0.7, tom: "escuro" },
    { x: 0, y: 0, z: 1, w: 2.4, d: 1.7, h: 0.7, tom: "aco" },
    { x: 0, y: 0, z: 2, w: 2.4, d: 1.7, h: 0.7, tom: "escuro" },
    { x: 1.6, y: 0.9, z: 2.7, w: 0.5, d: 0.5, h: 0.5, tom: "laranja", flutua: true },
  ],
  bloco: [
    { x: 0, y: 0, z: 0, w: 2.6, d: 1.5, h: 1.1, tom: "laranja" },
    { x: 0.3, y: 0.4, z: 1.1, w: 0.75, d: 0.75, h: 0.35, tom: "laranja" },
    { x: 1.55, y: 0.4, z: 1.1, w: 0.75, d: 0.75, h: 0.35, tom: "laranja" },
  ],
  janela: [
    { x: 0, y: 0, z: 0, w: 2.8, d: 0.35, h: 1.9, tom: "escuro" },
    { x: 0, y: 0, z: 1.9, w: 2.8, d: 0.35, h: 0.45, tom: "aco" },
    { x: 0.5, y: 0.35, z: 0, w: 0.9, d: 0.9, h: 0.9, tom: "roxo" },
    { x: 1.9, y: 0.35, z: 0, w: 0.6, d: 0.6, h: 0.6, tom: "rosa", flutua: true },
  ],
};
