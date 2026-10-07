# LarocaDev v2

Nova versão do site laroca.dev, em avaliação pelo dono antes de substituir a atual (`E:\Arquivos\Projetos\LarocaDev\laroca-dev`).

## Diretrizes
- Stack: Vite + React 18 + TypeScript + Tailwind 3 + Motion (`motion/react`) + Lucide. Sem backend.
- Design: segue o prompt de referência escolhido pelo dono (`docs/prompt-referencia.md`, do motionsites.ai, "3D Jack portfolio hero"): fundo `#0C0C0C`, fonte Kanit, títulos gigantes em degradê cinza, seção branca de serviços, cartões de projeto empilhados. Mantenha essa linguagem; não trocar fontes nem paleta sem o dono pedir.
- Todo o conteúdo (textos, links, projetos) fica em `src/site.ts`. Componentes em `src/components`; peças reutilizadas em `base.tsx`.
- Imagens de terceiros da referência não são usadas. O emblema do topo e os enfeites são desenhados em SVG por `Iso.tsx` (caixas em projeção isométrica). Logotipo: `public/logo.svg` e `public/favicon.svg`.
- Decisões do dono (07/10/2026): sem preços no site; portfólio com sites no ar, sistemas como produto **sem citar clientes**, projetos do GitHub e os próximos sistemas; WhatsApp novo `5542998041396`.
- Texto em pt-BR. Movimento respeita `prefers-reduced-motion`.
- Publicação de prévia: GitHub Pages pelo workflow `.github/workflows/pages.yml` (repositório público `LarocaLucas/laroca-dev-v2`), em https://larocalucas.github.io/laroca-dev-v2/. O `base` do Vite vem da variável `BASE` (padrão `/laroca-dev-v2/`); no domínio próprio usar `BASE=/`.
- Commits: Conventional Commits em pt-BR.

## Estado atual
- v0.1.0: página única com topo, faixa de telas, sobre, serviços, projetos e contato.
- Sistema Moda e Sistema Odonto aparecem com capas de texto, sem capturas de tela.

## Como rodar
- `pnpm install`, `pnpm dev` (local), `pnpm build` (confere tipos e gera `dist`), `pnpm preview`.

## Registro de andamento
### 2026-10-07 22:40 · Claude Code
- Feito: primeira versão a partir do prompt de referência, com o conteúdo do site atual. Emblema 3D e logotipo novos. Capturas reais de doorpg.com.br, djlaroca.com.br, djreinaldo.com.br e arrancatocopg.com.br em `public/img` (WebP, 343 KB no total).
- Não feito: capturas de tela dos sistemas Moda e Odonto. O Docker Desktop não iniciou nesta sessão, então não deu para subir os sistemas com dados de demonstração; ficaram capas de texto.
- Testes: `pnpm build` sem erros de tipo. Prévia local fotografada com Playwright (Edge) em 1440×900 e 390×844: sem erros no console e sem rolagem horizontal. Não testado: navegação por teclado, leitores de tela e Safari/iOS.
- Próximo passo: o dono avaliar a prévia online; depois, capturas dos sistemas e troca do site atual.
