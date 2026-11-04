# laroca.dev — site da empresa

Site institucional da laroca.dev: sistemas e sites sob medida. Apresenta serviços, portfólio e contato.

- **Status:** no ar
- **Endereço:** https://laroca.dev

## Principais funções

- Hero em 3D isométrico desenhado em SVG, títulos em degradê e cartões de projeto empilhados.
- Portfólio com sites no ar e sistemas como produto, sem citar clientes.
- Todo o conteúdo (textos, links, projetos) em `src/site.ts`.

## Stack

Vite, React 18, TypeScript, Tailwind 3, Motion e Lucide; servido por um Cloudflare Worker de arquivos estáticos. Sem backend.

## Estrutura

```
src/site.ts          textos, links e projetos
src/components/      componentes (base.tsx, Iso.tsx...)
public/              logo, favicons e capturas dos sites
worker.js            Worker que serve o build
docs/                referência de design
```

## Rodar localmente

```bash
pnpm install
pnpm dev
```

## Publicar

```bash
pnpm deploy   # build com BASE=/ e wrangler deploy (domínio laroca.dev)
```

## Licença

Proprietário — todos os direitos reservados.

## Contato

Desenvolvido pela [laroca.dev](https://laroca.dev) · contato@laroca.dev
