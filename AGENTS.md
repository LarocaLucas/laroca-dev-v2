# LarocaDev v2

Site da laroca.dev, no ar em https://laroca.dev desde 08/10/2026. A versão anterior está em `E:\Arquivos\Projetos\LarocaDev\laroca-dev` (repositório `LarocaLucas/laroca-dev`).

## Diretrizes
- Stack: Vite + React 18 + TypeScript + Tailwind 3 + Motion (`motion/react`) + Lucide. Sem backend.
- Design: segue o prompt de referência escolhido pelo dono (`docs/prompt-referencia.md`, do motionsites.ai, "3D Jack portfolio hero"): fundo `#0C0C0C`, fonte Kanit, títulos gigantes em degradê cinza, seção branca de serviços, cartões de projeto empilhados. Mantenha essa linguagem; não trocar fontes nem paleta sem o dono pedir.
- Todo o conteúdo (textos, links, projetos) fica em `src/site.ts`. Componentes em `src/components`; peças reutilizadas em `base.tsx`.
- Imagens de terceiros da referência não são usadas. O emblema do topo e os enfeites são desenhados em SVG por `Iso.tsx` (caixas em projeção isométrica). Logotipo: `public/logo.svg` e `public/favicon.svg`.
- Decisões do dono (07/10/2026): sem preços no site; portfólio com sites no ar, sistemas como produto **sem citar clientes**, projetos do GitHub e os próximos sistemas; WhatsApp novo `5542998041396`.
- Voz: a laroca.dev fala como **empresa** ("desenvolvemos", "nossa"), nunca como "eu" nem citando o Lucas. Diferencial a destacar: sistemas totalmente personalizados, sob medida e sob demanda.
- Capturas dos sites: uma por espaço, no formato exato dele (`-hero` 11:10, `-a` 1440:775, `-b` 1280:1016, `-m1..3` 14:9 para a faixa). Não reaproveitar uma captura em espaço de outro formato, senão ela sai cortada.
- Texto em pt-BR. Movimento respeita `prefers-reduced-motion`.
- **Produção: https://laroca.dev**, no Worker `laroca-dev` da Cloudflare (o mesmo que servia o site antigo). Publicar com `pnpm deploy` (`scripts/deploy.mjs`: build com `BASE=/` e `wrangler deploy`). `worker.js` redireciona `www` para o domínio principal. No Git Bash não use `BASE=/ pnpm build`: o terminal converte a barra num caminho do Windows.
- Prévia: GitHub Pages em https://larocalucas.github.io/laroca-dev-v2/ (workflow `pages.yml`, a cada push). A prévia sai com `noindex` e canonical para laroca.dev.
- SEO: o build pré-renderiza a página (`src/entry-server.tsx` + `scripts/prerender.mjs`), então o HTML já vem com todo o texto. Título, descrição, canonical, Open Graph e JSON-LD (`ProfessionalService` com área atendida) ficam no `index.html`; `robots.txt`, `sitemap.xml`, `_headers`, `404.html`, `og.png` e ícones em `public/`. Ao mudar conteúdo relevante, atualize o `lastmod` do sitemap.
- Commits: Conventional Commits em pt-BR.

## Estado atual
- v0.1.0: página única com topo, faixa de telas, sobre, serviços, projetos e contato.
- Sistema Moda e Sistema Odonto aparecem com telas reais, tiradas dos sistemas rodando localmente com dados de demonstração inventados (loja de teste "Pijamas da Ana" e clínica de teste "Clínica Bella Face"). Nenhum dado de cliente.

## Como rodar
- `pnpm install`, `pnpm dev` (local), `pnpm build` (confere tipos e gera `dist`), `pnpm preview`.

## Registro de andamento
### 2026-10-09 · Claude Code
- Pedido do dono: (1) "Sites sob demanda" como serviço nº 2, mantendo os demais abaixo; (2) no celular, o texto do "Sobre" só terminava de acender com a tela já em Serviços; (3) "Sobre" dizendo sede em Castro, atendimento na região de Ponta Grossa e Curitiba e em todo o Brasil; (4) telas do DJ Laroca e do DJ Reinaldo nas versões novas dos sites.
- Feito: serviço novo em `SERVICOS` (agora 7) e no JSON-LD; texto do "Sobre" reescrito; `areaServed` ganhou Curitiba e Brasil; `lastmod` do sitemap. `AnimatedText` passou de `["start 0.8", "end 0.2"]` para `["start 0.9", "end 0.75"]`: o texto termina de acender com o parágrafo ainda inteiro na tela. Capturas refeitas no formato de cada espaço e gravadas com nome novo por causa do cache de 30 dias de `/img` (`djlaroca3-*`, 6 telas; `djreinaldo2-*`, 5 telas); as antigas foram apagadas. O resumo do cartão do DJ Laroca foi atualizado para a v3.
- Testes: `pnpm build` sem erros. Prévia local no Edge (Playwright) em 390×844 e 1440×900: no fim da animação do "Sobre" a última letra está com opacidade 1 e o topo de Serviços ainda fica ~75 px abaixo da tela (celular) e ~30 px (desktop); 7 serviços na ordem certa; nenhuma imagem quebrada, sem erro no console e sem rolagem horizontal. Não testado: celular real.
- Publicado em 09/10 com o ok do dono (versão 6b20dfcc); conferido no ar: serviço novo, texto do Sobre e imagens novas respondendo 200.
### 2026-10-08 14:40 · Claude Code
- Pedido do dono: revisão de acessibilidade. Auditoria com axe-core (WCAG 2.2 A/AA + boas práticas) no site publicado, em 1440 e 390 de largura, e percurso por teclado.
- Encontrado e corrigido: `aria-label` num parágrafo (uso proibido) no texto animado do "Sobre", trocado por texto oculto visualmente para leitores de tela; faltava atalho "Pular para o conteúdo"; links que abrem em nova aba agora avisam isso aos leitores de tela.
- Aprovado sem mudança: ordem do Tab segue a página, todo elemento focado tem contorno visível, hierarquia de títulos correta (um h1, h2 por seção, h3 nos itens), imagens com texto alternativo, contraste, idioma da página, animações desligadas com `prefers-reduced-motion`.
- Também hoje: registro DMARC do domínio em modo de observação (`p=none`), com relatórios para `dmarc@laroca.dev`, que encaminha ao Gmail da marca.
- Não testado: leitor de tela de verdade (NVDA/VoiceOver) e Safari no iPhone.
### 2026-10-08 12:10 · Claude Code
- O dono verificou o domínio no Search Console (registro `google-site-verification` no DNS) e enviou o sitemap; o painel mostrou "não foi possível buscar". Conferido do lado do servidor: `sitemap.xml` responde 200 como `application/xml`, XML válido, também para o agente do Googlebot; robots libera tudo; a Cloudflare não tem proteção contra robôs ligada. É o estado inicial comum de propriedade nova.
- Achado e corrigido: `http://laroca.dev` respondia 200 sem redirecionar. Ligado o "Always Use HTTPS" na zona da Cloudflare (vale para todos os subdomínios).
### 2026-10-08 11:30 · Claude Code
- Pedido do dono: colocar a nova versão no domínio e configurar o SEO, com foco em buscas por desenvolvedores e empresas de tecnologia da região.
- Feito: publicado em laroca.dev (Worker `laroca-dev`, versão 65cf2b47). `www` redireciona com 301. Pré-renderização do HTML; título e descrição com Castro e Ponta Grossa; canonical; Open Graph e imagem de compartilhamento 1200×630; JSON-LD de empresa local com endereço em Castro e área atendida (Castro, Ponta Grossa, Carambeí, Campos Gerais, Paraná); robots, sitemap, página 404, manifest, ícones, cabeçalhos de cache e segurança; textos alternativos nas telas dos projetos; região citada no topo e no "Sobre".
- Não feito: Google Search Console e Perfil da Empresa no Google, que exigem login na conta Google do dono. Falta ele criar a propriedade e passar o código de verificação para entrar no DNS.
- Aviso do revisor de design (texto em degradê) dispensado para `src/index.css` e `public/404.html`: vem do prompt de referência.
- Testes: build com `BASE=/` sem erros; no Edge, sem mensagens no console nem erro de hidratação, sem rolagem horizontal em 1440 e 390 de largura. No ar: início 200, `www` 301, robots/sitemap/og/ícones 200, página inexistente 404, JSON-LD válido, nenhuma imagem sem `alt`, calculadora em precos.laroca.dev intacta (401 sem senha).
- Como voltar atrás: `npx wrangler rollback` neste projeto, ou publicar de novo a partir da pasta do site antigo.
### 2026-10-08 10:05 · Claude Code
- O dono criou um Gmail exclusivo da marca, `dev.laroca@gmail.com`. O encaminhamento de `contato@laroca.dev` na Cloudflare passou do Gmail pessoal para ele, depois de o destino ser verificado. O site continua mostrando `contato@laroca.dev`; nada mudou no código.
- Testes: a API da Cloudflare devolveu a regra ativa com o destino novo e o roteamento `ready`. Não testado: a entrega de uma mensagem real.
### 2026-10-08 09:40 · Claude Code
- Pedido do dono: a tela da galeria no cartão do Door PG deve mostrar a seleção de álbuns e de dias. Recapturada mais acima na página (`door-albuns`), com os filtros e duas fileiras de fotos.
- Testes: `pnpm build` sem erros; captura conferida antes de publicar.
### 2026-10-08 09:10 · Claude Code
- Pedido do dono: no cartão do Door PG, trocar a tela "01 A Door" por uma da galeria de fotos, na posição de cima, e descer a agenda; e dar espaço entre o último cartão e a lista "Mais projetos", que ficava colada. Feito: `door-galeria` (página `galeria.html` do site) em cima e `door-agenda` embaixo, ambas capturadas no formato do espaço; a lista ganhou respiro maior no desktop (`sm:pt-56`), porque o último cartão empilhado avança além do próprio bloco.
- Testes: `pnpm build` sem erros; cartão do Door e fim da pilha fotografados em 1440×900 e 390×844.
### 2026-10-08 02:50 · Claude Code
- Erro apontado pelo dono: o Sistema Moda continuava branco. Causas: (1) só a tela da faixa tinha sido refeita no tema escuro, as três do cartão de projetos continuavam claras; (2) a imagem nova da faixa tinha o mesmo nome da antiga, então o navegador podia mostrar a versão em cache. Correção: as quatro telas do Moda foram recapturadas no tema escuro e gravadas com nome novo (`modaescuro-*`).
- Regra: ao trocar o conteúdo de uma imagem, trocar também o nome do arquivo.
### 2026-10-08 02:20 · Claude Code
- Pedido do dono: a faixa mostrava partes vazias ou cheias de texto dos sites; ele quer as páginas iniciais em destaque. Saíram as 9 cenas de texto (história, reservas, localização, estilos, contato etc.) e ficaram 11 telas com imagem forte: páginas iniciais e galerias dos sites, com as iniciais no meio de cada fileira. A tela do Sistema Moda foi refeita no tema escuro do próprio sistema, para não destoar.
- Regra para a faixa: só entra cena com foto ou composição forte; bloco de texto não.
- Testes: `pnpm build` sem erros; faixa fotografada em 1440×900 e 390×844.
### 2026-10-08 01:50 · Claude Code
- Pedido do dono: na faixa de telas abaixo do topo havia sistemas demais; ele quer mais dos sites Door PG, DJ Laroca e DJ Reinaldo, e pouca coisa do Arranca Toco e dos sistemas. Capturadas mais 8 cenas desses três sites (`-m4` a `-m6`). A faixa passou a ter 20 telas: Door 6, DJ Laroca 6, DJ Reinaldo 5, Arranca Toco 1, Sistema Moda 1, Sistema Odonto 1. A lista fica em `TILES`, em `src/site.ts`. Seis imagens que deixaram de ser usadas foram apagadas.
- Testes: `pnpm build` sem erros; faixa fotografada em 1440×900.
### 2026-10-08 01:15 · Claude Code
- O dono configurou o "Enviar e-mail como" no Gmail. SPF do domínio passou a incluir o Google: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`. Não há registro DMARC.
- Foto de perfil da marca criada em `docs/marca/avatar.svg` e `avatar-1024.png` (símbolo dentro da área segura do recorte circular); cópia na área de trabalho do dono.
### 2026-10-08 00:50 · Claude Code
- Pedido do dono: e-mail com cara de empresa sem criar conta nova. Ativado o Email Routing da Cloudflare no domínio laroca.dev (registros MX, SPF e DKIM criados pela própria Cloudflare) com a regra `contato@laroca.dev` → Gmail do dono. O site passou a mostrar `contato@laroca.dev`.
- Não feito: envio pelo Gmail como `contato@laroca.dev` ("Enviar e-mail como"), que depende de uma senha de app criada pelo dono na conta Google.
- Testes: API da Cloudflare devolveu roteamento `ready` e destino verificado; os MX aparecem na consulta pública. Não testado: a entrega de uma mensagem real.
### 2026-10-08 00:20 · Claude Code
- Pedido do dono: Docker aberto para fotografar os sistemas; rodapé sem GitHub e com Instagram @dev.laroca.
- Feito: Moda e Odonto subidos localmente (bancos no Docker, API e web já compilados). Os bancos locais estavam quase vazios, então cadastrei dados de demonstração pela API: no Moda, 1 grade, 5 cores, 8 produtos (68 variações), estoque inicial e 14 vendas com NFC-e de homologação; no Odonto, 12 pacientes fictícios e 19 agendamentos na semana. Telas capturadas no formato de cada espaço e trocadas pelas capas; entraram também na faixa de telas. Rodapé: WhatsApp, Instagram e e-mail.
- Atenção: esses dados de demonstração ficaram gravados nos bancos locais dos projetos Sistema Moda e Sistema Odonto (não nos de teste automatizado `moda_test`/`odonto_test`).
- Testes: `pnpm build` sem erros; ver registro da publicação no resumo da sessão.
### 2026-10-07 23:40 · Claude Code
- Pedido do dono: (1) textos em voz de empresa, sem citar o Lucas; (2) diferencial de sistemas totalmente personalizados, sob medida e sob demanda; (3) capturas melhores, porque várias saíam cortadas.
- Feito: textos reescritos em `src/site.ts` (sobre, chamada do topo, contato, mensagens do WhatsApp, descrição da página); serviços passaram de 5 para 6, com "Sistemas sob medida" em primeiro e "Sistemas prontos por segmento" em segundo. Capturas refeitas: cada cena agora é fotografada no formato do espaço onde aparece e alinhada à seção do site, depois de rolar a página toda para disparar as animações (24 imagens, 690 KB). Cartões usam proporção fixa em vez de altura fixa; no celular mostram a tela principal (14:9) e a larga, com o botão logo abaixo do título para o cartão seguinte não cobri-lo.
- Motivo de mexer em parte concluída: a causa dos cortes era usar uma captura 16:10 em espaços de proporções diferentes.
- Testes: `pnpm build` sem erros; cartões e seção de serviços fotografados em 1440×900 e 390×844, sem rolagem horizontal nem erros.
### 2026-10-07 22:40 · Claude Code
- Feito: primeira versão a partir do prompt de referência, com o conteúdo do site atual. Emblema 3D e logotipo novos. Capturas reais de doorpg.com.br, djlaroca.com.br, djreinaldo.com.br e arrancatocopg.com.br em `public/img` (WebP, 343 KB no total).
- Não feito: capturas de tela dos sistemas Moda e Odonto. O Docker Desktop não iniciou nesta sessão, então não deu para subir os sistemas com dados de demonstração; ficaram capas de texto.
- Testes: `pnpm build` sem erros de tipo. Prévia local fotografada com Playwright (Edge) em 1440×900 e 390×844: sem erros no console e sem rolagem horizontal. Não testado: navegação por teclado, leitores de tela e Safari/iOS.
- Próximo passo: o dono avaliar a prévia online; depois, capturas dos sistemas e troca do site atual.
