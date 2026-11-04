import { EMAIL, EMPRESA, TELEFONE, WHATSAPP } from "../site";
import { Ext, Ficha, FONTE, Interno, PaginaLegal, type Secao } from "./ui";

export const VERSAO = "1.0";
export const VIGENCIA = "4 de novembro de 2026";

const Lgpd = ({ art }: { art: string }) => <Ext href={FONTE.lgpd}>LGPD, {art}</Ext>;

const secoes: Secao[] = [
  {
    id: "quem-somos",
    titulo: "Quem somos e como falar conosco",
    corpo: (
      <>
        <p>
          A <strong>laroca.dev</strong> é o nome comercial de <strong>{EMPRESA.nome}</strong>, inscrita no CNPJ sob o nº <strong>{EMPRESA.cnpj}</strong>, com sede em {EMPRESA.cidade}. Desenvolvemos sites, sistemas sob medida e automações para empresas.
        </p>
        <p>
          Nos tratamentos descritos nesta política, a laroca.dev é a <strong>controladora</strong>, ou seja, quem decide como e por que os dados pessoais são usados (<Lgpd art="art. 5º, VI" />). Quando desenvolvemos ou hospedamos sistemas para clientes, nosso papel muda: veja a seção <a href="#operadora">“Quando tratamos dados em nome de clientes”</a>.
        </p>
        <h3>Canal de privacidade</h3>
        <ul>
          <li>
            E-mail: <a href={`mailto:${EMAIL}?subject=Privacidade`}>{EMAIL}</a>, com o assunto <strong>“Privacidade”</strong> (é o canal oficial e o que deixa registro);
          </li>
          <li>
            WhatsApp: <Ext href={WHATSAPP}>{TELEFONE}</Ext>.
          </li>
        </ul>
        <h3>Encarregado (DPO)</h3>
        <p>
          A laroca.dev é um <strong>agente de tratamento de pequeno porte</strong> (Resolução CD/ANPD nº 2/2022, art. 2º) e não realiza tratamento de alto risco nos termos do art. 4º da mesma resolução. Por isso, está dispensada de indicar formalmente um encarregado (art. 11 da resolução, que excepciona o art. 41 da LGPD). Mesmo assim, mantemos o canal acima para receber pedidos dos titulares e comunicações da Autoridade Nacional de Proteção de Dados (ANPD). Os pedidos são respondidos diretamente pelo responsável legal da laroca.dev.
        </p>
      </>
    ),
  },
  {
    id: "alcance",
    titulo: "A quem esta política se aplica",
    corpo: (
      <>
        <p>Esta política vale para:</p>
        <ul>
          <li>quem visita o site <strong>laroca.dev</strong>;</li>
          <li>quem fala conosco por WhatsApp, e-mail, telefone ou redes sociais, para tirar dúvidas, pedir orçamento ou contratar;</li>
          <li>nossos clientes e os representantes das empresas clientes;</li>
          <li>quem interage com os perfis que administramos nas redes sociais (comentários, mensagens diretas e menções), cujos dados recebemos pelas integrações oficiais das plataformas;</li>
          <li>
            os dados obtidos pela <strong>Central laroca.dev</strong>, nossa ferramenta interna, e pelos aplicativos que registramos na Meta (Instagram e Facebook), no TikTok e no Google (YouTube) para gerenciar as nossas próprias contas.
          </li>
        </ul>
        <p>
          Ela <strong>não</strong> se aplica aos sites e sistemas que fazemos para clientes (cada cliente tem a própria política, como controlador) nem às plataformas de terceiros (WhatsApp, Instagram, Facebook, TikTok, YouTube, Google), que tratam dados segundo as próprias políticas.
        </p>
      </>
    ),
  },
  {
    id: "termos-basicos",
    titulo: "Termos usados aqui",
    corpo: (
      <ul>
        <li>
          <strong>Dado pessoal:</strong> informação relacionada a pessoa natural identificada ou identificável (<Lgpd art="art. 5º, I" />).
        </li>
        <li>
          <strong>Titular:</strong> a pessoa a quem os dados se referem (art. 5º, V).
        </li>
        <li>
          <strong>Tratamento:</strong> qualquer operação com dados pessoais, como coleta, uso, armazenamento, compartilhamento e eliminação (art. 5º, X).
        </li>
        <li>
          <strong>Controlador</strong> e <strong>operador:</strong> quem decide sobre o tratamento e quem trata em nome do controlador (art. 5º, VI e VII).
        </li>
        <li>
          <strong>Plataformas:</strong> Instagram e Facebook (Meta), TikTok e YouTube (Google).
        </li>
      </ul>
    ),
  },
  {
    id: "dados",
    titulo: "Quais dados tratamos, para quê e com qual base legal",
    corpo: (
      <>
        <p>
          Só tratamos dados com finalidade definida e na medida do necessário (<Lgpd art="art. 6º" />). Cada tratamento abaixo indica a base legal do <Lgpd art="art. 7º" />. Não tratamos dados pessoais sensíveis nestas atividades e não vendemos, alugamos nem cedemos dados pessoais a ninguém.
        </p>

        <Ficha
          titulo="1. Visita ao site laroca.dev"
          itens={[
            [
              "O que acontece",
              <>
                O site é informativo e estático: <strong>não tem formulário, cadastro, login, cookies próprios, pixels de redes sociais, ferramentas de publicidade nem de análise de audiência</strong> (conferido em 04/11/2026). Não guardamos registros de acesso próprios do site.
              </>,
            ],
            [
              "Dados técnicos",
              <>
                Para entregar as páginas, o seu navegador se conecta à <strong>Cloudflare</strong> (hospedagem e proteção do site), que recebe dados técnicos como endereço IP, data e hora, página pedida, navegador e sistema, e pode gerar relatórios de erro de rede. Para exibir a fonte do site (Kanit), o navegador a baixa do <strong>Google Fonts</strong>, que recebe o IP e os dados do navegador.
              </>,
            ],
            ["Finalidade", "Entregar o site com rapidez e segurança, prevenir ataques e abusos."],
            ["Base legal", <>Legítimo interesse (art. 7º, IX, e art. 10), limitado ao necessário para o funcionamento e a segurança.</>],
            ["Por quanto tempo", "Pelos prazos de cada fornecedor, que tratam esses dados também como controladores independentes segundo as próprias políticas."],
          ]}
        />

        <Ficha
          titulo="2. Contato, dúvidas e pedidos de orçamento"
          itens={[
            ["Dados", "Nome, telefone, e-mail, nome da empresa, cidade, o conteúdo das mensagens e os arquivos que você decidir nos enviar."],
            ["Como chegam", "Por WhatsApp, e-mail, telefone ou mensagem direta nas redes sociais. Você escolhe o que informar."],
            ["Finalidade", "Responder, entender o que você precisa, preparar e enviar a proposta e manter o histórico da conversa."],
            ["Base legal", <>Procedimentos preliminares a contrato, a seu pedido (art. 7º, V), e legítimo interesse em responder a quem nos procura (art. 7º, IX).</>],
            ["Por quanto tempo", "Até 12 meses depois do último contato, se não houver contratação; depois, eliminamos ou anonimizamos."],
          ]}
        />

        <Ficha
          titulo="3. Clientes: contratação, execução e cobrança"
          itens={[
            ["Dados", "Nome e dados de contato do representante; nome empresarial, CNPJ ou CPF, endereço; dados de cobrança e comprovantes de pagamento; histórico do projeto, aprovações e acessos que você nos conceder."],
            ["Finalidade", "Formalizar e cumprir o contrato, emitir documentos fiscais, cobrar, dar suporte e garantia, e nos defender em eventual disputa."],
            ["Base legal", <>Execução de contrato (art. 7º, V), cumprimento de obrigação legal ou regulatória, como a fiscal e a contábil (art. 7º, II), e exercício regular de direitos (art. 7º, VI).</>],
            ["Por quanto tempo", <>Durante o contrato e por mais <strong>5 anos</strong> depois do fim, prazo de prescrição do <Ext href={FONTE.cdc}>CDC (art. 27)</Ext> e de guarda de documentos fiscais. Prazos legais maiores prevalecem.</>],
          ]}
        />

        <Ficha
          titulo="4. Interações com os nossos perfis nas redes sociais"
          itens={[
            [
              "Dados",
              "Quando alguém comenta, envia mensagem direta ou menciona um perfil que administramos, a plataforma nos entrega pela integração oficial: o identificador da conta (gerado pela plataforma para o nosso aplicativo), o nome de usuário, o nome e a foto de perfil quando a plataforma os fornece, o texto do comentário ou da mensagem, data e hora, e a publicação relacionada.",
            ],
            [
              "Finalidade",
              "Responder comentários e mensagens; enviar, quando pedido, a informação solicitada (por exemplo, quem comenta uma palavra-chave numa publicação recebe o link por mensagem direta); organizar o atendimento e a lista de interessados em nossos serviços.",
            ],
            ["Base legal", <>Legítimo interesse em atender quem fala conosco pelas redes (art. 7º, IX) e, quando a pessoa pede orçamento, procedimentos preliminares a contrato (art. 7º, V).</>],
            [
              "Limites",
              "As respostas automáticas seguem regras simples definidas por nós (palavra-chave → resposta pronta). Não montamos perfis de comportamento, não usamos esses dados para publicidade, não os vendemos e não os usamos para treinar inteligência artificial.",
            ],
            ["Por quanto tempo", "Até 12 meses depois da última interação, ou menos se você pedir a exclusão. Os dados que ficam na própria plataforma (o seu comentário, por exemplo) seguem as regras dela."],
          ]}
        />

        <Ficha
          titulo="5. Central laroca.dev e as integrações com as plataformas"
          itens={[
            [
              "O que é",
              <>
                A <strong>Central laroca.dev</strong> (central.laroca.dev) é uma ferramenta <strong>interna</strong>, usada apenas pela laroca.dev, para agendar e publicar conteúdo <strong>nas nossas próprias contas</strong> (os perfis @dev.laroca) e acompanhar os resultados. Ela não é oferecida ao público e não acessa contas de terceiros. O acesso é protegido por login com verificação de e-mail (Cloudflare Access).
              </>,
            ],
            [
              "Dados recebidos",
              "Das nossas contas: identificador e nome de usuário da conta, tipo de conta, tokens de acesso e de renovação, as mídias e legendas que publicamos, os identificadores e o status das publicações, e métricas agregadas (alcance, visualizações, curtidas, comentários, salvamentos e compartilhamentos). Das pessoas que interagem com os perfis: os dados descritos no item 4.",
            ],
            ["Finalidade", "Planejar, agendar e publicar o nosso conteúdo, lembrar das publicações manuais, acompanhar o desempenho e operar o atendimento do item 4."],
            ["Base legal", <>Legítimo interesse na divulgação da própria atividade (art. 7º, IX). As contas conectadas são nossas.</>],
            [
              "Por quanto tempo",
              "Tokens: até desconectarmos a conta, até expirarem ou até o acesso ser revogado. Publicações, mídias e legendas: enquanto úteis ao nosso histórico. Métricas e outros dados obtidos do YouTube: atualizados ou excluídos em até 30 dias, como exigem as políticas do YouTube.",
            ],
          ]}
        />
        <p>
          Se você aparece numa foto ou num vídeo que publicamos e quer a retirada, peça pelo canal de privacidade: avaliamos e respondemos no prazo da seção <a href="#como-exercer">“Como exercer seus direitos”</a>.
        </p>

        <Ficha
          titulo="6. Segurança, prevenção de fraudes e defesa de direitos"
          itens={[
            ["Dados", "Registros técnicos das nossas aplicações (data, hora, IP, ação realizada) e as evidências necessárias de pedidos, contratos e atendimentos."],
            ["Finalidade", "Proteger os sistemas, investigar incidentes, comprovar o atendimento de pedidos e nos defender em processos."],
            ["Base legal", <>Cumprimento de obrigação legal (art. 7º, II, inclusive o <Ext href={FONTE.marcoCivil}>Marco Civil da Internet, art. 15</Ext>), exercício regular de direitos (art. 7º, VI) e legítimo interesse (art. 7º, IX).</>],
            ["Por quanto tempo", "Registros de acesso a aplicações: 6 meses, sob sigilo, quando a lei exigir a guarda. Registro de pedidos de titulares: 5 anos."],
          ]}
        />
      </>
    ),
  },
  {
    id: "cookies",
    titulo: "Cookies e tecnologias parecidas",
    corpo: (
      <>
        <p>
          <strong>No site laroca.dev não usamos cookies próprios</strong>, nem de publicidade ou de análise de audiência. Por isso não exibimos aviso de cookies: não há o que aceitar ou recusar.
        </p>
        <ul>
          <li>
            A Cloudflare pode, se identificar tráfego suspeito, gravar um cookie técnico de segurança (como <code>__cf_bm</code> ou <code>cf_clearance</code>). Ele serve só para diferenciar pessoas de robôs, não identifica você e não é usado para publicidade.
          </li>
          <li>
            Na Central laroca.dev (uso interno), o login da Cloudflare Access usa cookies estritamente necessários (<code>CF_Authorization</code> e <code>CF_AppSession</code>) para manter a sessão.
          </li>
          <li>Você pode apagar ou bloquear cookies nas configurações do navegador; o site continua funcionando.</li>
        </ul>
        <p>Se um dia passarmos a usar cookies não essenciais, atualizaremos esta política e pediremos o seu consentimento antes.</p>
      </>
    ),
  },
  {
    id: "compartilhamento",
    titulo: "Com quem compartilhamos",
    corpo: (
      <>
        <p>Compartilhamos dados apenas com fornecedores necessários para prestar os serviços (nossos operadores) ou quando a lei obriga:</p>
        <ul>
          <li>
            <strong>Cloudflare</strong>: hospedagem e proteção do site, encaminhamento de e-mails do domínio, banco de dados, armazenamento de arquivos e login da Central.
          </li>
          <li>
            <strong>Google</strong>: caixa de e-mail (Gmail), fontes do site (Google Fonts) e, na integração com o YouTube, as APIs do YouTube.
          </li>
          <li>
            <strong>Resend</strong>: envio dos e-mails que mandamos a partir do domínio laroca.dev.
          </li>
          <li>
            <strong>Meta</strong> (WhatsApp, Instagram, Facebook) e <strong>TikTok</strong>: as conversas e interações acontecem nessas plataformas, que também tratam os dados como controladoras.
          </li>
          <li>
            <strong>Servidor de automação</strong> em nuvem (Oracle Cloud), quando a automação de comentários e mensagens estiver ativa, e o serviço de notificações <strong>ntfy</strong>, que avisa o nosso celular sobre publicações agendadas.
          </li>
          <li>
            <strong>Contabilidade e meios de pagamento</strong>: dados de clientes necessários para emitir notas e receber pagamentos.
          </li>
          <li>
            <strong>Autoridades públicas</strong>: quando houver ordem judicial ou requisição legal (<Ext href={FONTE.marcoCivil}>Marco Civil da Internet, arts. 10 e 22</Ext>).
          </li>
        </ul>
        <p>
          Exigimos dos fornecedores medidas de segurança compatíveis com a LGPD e usamos cada um só para a finalidade contratada. Se a laroca.dev for incorporada ou vendida, os dados seguem com as mesmas proteções desta política.
        </p>
      </>
    ),
  },
  {
    id: "internacional",
    titulo: "Transferência internacional",
    corpo: (
      <>
        <p>
          Vários fornecedores acima mantêm servidores fora do Brasil, principalmente nos Estados Unidos e na União Europeia. Essas transferências se apoiam no <Lgpd art="art. 33" />: são necessárias para executar o contrato ou os procedimentos preliminares que você pediu e para o exercício regular de direitos (art. 33, IX); contam com as garantias contratuais oferecidas pelos fornecedores (art. 33, II); e, para a União Europeia, com o reconhecimento de nível adequado de proteção feito pela ANPD (Resolução CD/ANPD nº 32/2026; art. 33, I). Seguimos a Resolução CD/ANPD nº 19/2024 sempre que um contrato permitir a adoção das cláusulas-padrão.
        </p>
      </>
    ),
  },
  {
    id: "retencao",
    titulo: "Por quanto tempo guardamos",
    corpo: (
      <>
        <p>
          Guardamos os dados só pelo tempo das finalidades indicadas na seção <a href="#dados">“Quais dados tratamos”</a>. Terminado o tratamento, eliminamos ou anonimizamos (<Lgpd art="arts. 15 e 16" />), salvo quando a lei permite manter: obrigação legal, exercício regular de direitos ou uso exclusivo nosso com os dados anonimizados. Cópias de segurança automáticas são substituídas em até 30 dias.
        </p>
      </>
    ),
  },
  {
    id: "operadora",
    titulo: "Quando tratamos dados em nome de clientes",
    corpo: (
      <>
        <p>
          Quando desenvolvemos, mantemos ou hospedamos sites e sistemas para clientes (lojas, clínicas, casas de eventos e outros), <strong>o cliente é o controlador</strong> dos dados dos usuários dele e a laroca.dev atua como <strong>operadora</strong>: tratamos os dados só conforme as instruções do cliente e a lei (<Lgpd art="art. 39" />). As regras desse tratamento (finalidade, segurança, suboperadores, incidentes, devolução e eliminação ao fim do contrato) ficam no contrato específico com cada cliente.
        </p>
        <ul>
          <li>Se você é usuário de um site ou sistema de um cliente nosso, dirija os seus pedidos a ele, conforme a política de privacidade dele.</li>
          <li>
            Se o pedido chegar a nós, avisamos que não somos o controlador e indicamos quem é (<Lgpd art="art. 18, § 4º, I" />), além de repassar o pedido ao cliente.
          </li>
          <li>Nesses projetos podemos usar suboperadores de infraestrutura, como Cloudflare, Vercel, Supabase e Resend, conforme o contrato de cada cliente.</li>
        </ul>
      </>
    ),
  },
  {
    id: "direitos",
    titulo: "Seus direitos",
    corpo: (
      <>
        <p>
          A qualquer momento, e de graça, você pode pedir (<Lgpd art="art. 18" />):
        </p>
        <ol>
          <li>confirmação de que tratamos dados seus;</li>
          <li>acesso aos dados;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;</li>
          <li>portabilidade a outro fornecedor, nos termos da regulamentação da ANPD;</li>
          <li>eliminação dos dados tratados com o seu consentimento, quando for o caso;</li>
          <li>informação sobre com quem compartilhamos os dados;</li>
          <li>informação sobre a possibilidade de não dar consentimento e as consequências;</li>
          <li>revogação do consentimento.</li>
        </ol>
        <p>
          Você também pode se <strong>opor</strong> a um tratamento feito sem consentimento, se ele descumprir a lei (art. 18, § 2º), e pedir a revisão de decisões tomadas só por tratamento automatizado que afetem os seus interesses (art. 20). Hoje não tomamos decisões desse tipo: as respostas automáticas nas redes só enviam mensagens prontas.
        </p>
        <p>
          Se não ficar satisfeito, pode reclamar à <Ext href={FONTE.anpd}>ANPD</Ext> (art. 18, § 1º) ou aos órgãos de defesa do consumidor (art. 18, § 8º).
        </p>
      </>
    ),
  },
  {
    id: "como-exercer",
    titulo: "Como exercer seus direitos",
    corpo: (
      <>
        <ol>
          <li>
            Escreva para <a href={`mailto:${EMAIL}?subject=Privacidade`}>{EMAIL}</a> com o assunto <strong>“Privacidade”</strong> (ou fale pelo WhatsApp {TELEFONE}), dizendo o que deseja.
          </li>
          <li>Para proteger você, podemos pedir uma confirmação de identidade proporcional ao pedido, como responder do mesmo e-mail ou telefone usado conosco, ou enviar uma mensagem pela conta da rede social em questão. Nunca pedimos senha.</li>
          <li>
            Confirmamos o recebimento e, quando possível, respondemos de imediato em formato simplificado. A resposta completa sai em até <strong>15 dias</strong> (<Lgpd art="art. 19" />). Mesmo podendo usar prazos maiores como agente de pequeno porte (Resolução CD/ANPD nº 2/2022, art. 14), assumimos o prazo de 15 dias.
          </li>
          <li>Se algo impedir a providência imediata, explicamos o motivo de fato ou de direito (art. 18, § 4º, II).</li>
        </ol>
        <p>
          Para excluir dados obtidos das plataformas (Instagram, Facebook, TikTok, YouTube), veja o passo a passo em <Interno para="exclusao-de-dados">Exclusão de dados</Interno>.
        </p>
      </>
    ),
  },
  {
    id: "seguranca",
    titulo: "Como protegemos os dados",
    corpo: (
      <>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados (<Lgpd art="art. 46" />; <Ext href={FONTE.dec8771}>Decreto nº 8.771/2016, arts. 13 e 16</Ext>), entre elas:
        </p>
        <ul>
          <li>conexão sempre criptografada (HTTPS obrigatório, HSTS e TLS 1.2 ou superior);</li>
          <li>ferramentas internas atrás de login com verificação de e-mail, e verificação em duas etapas nas contas de fornecedores, quando disponível;</li>
          <li>tokens de acesso das plataformas guardados cifrados e senhas e chaves fora do código-fonte, com verificação automática contra vazamento de segredos a cada alteração do código;</li>
          <li>acesso restrito a quem precisa, com as menores permissões possíveis em cada integração;</li>
          <li>cópias de segurança e registros de atividade para detectar e corrigir problemas.</li>
        </ul>
        <p>Nenhum sistema é totalmente imune a falhas. Por isso também temos um procedimento para incidentes, descrito a seguir.</p>
      </>
    ),
  },
  {
    id: "incidentes",
    titulo: "Incidentes de segurança",
    corpo: (
      <p>
        Se ocorrer um incidente que possa causar risco ou dano relevante aos titulares, comunicaremos a ANPD e as pessoas afetadas (<Lgpd art="art. 48" />) no prazo da Resolução CD/ANPD nº 15/2024 (3 dias úteis), observado o prazo diferenciado do agente de pequeno porte (Resolução CD/ANPD nº 2/2022, art. 14, II), que não se aplica quando houver risco à integridade física ou moral dos titulares. A comunicação informa o que aconteceu, os dados envolvidos, os riscos e as medidas tomadas. Mantemos registro de todos os incidentes por 5 anos. Como operadora, avisamos o cliente controlador sem demora.
      </p>
    ),
  },
  {
    id: "criancas",
    titulo: "Crianças e adolescentes",
    corpo: (
      <p>
        Nossos serviços são voltados a empresas e não são dirigidos a crianças e adolescentes. Não coletamos, de propósito, dados de menores de 18 anos. Se percebermos que recebemos dados de criança ou adolescente sem o consentimento ou a participação exigidos (<Lgpd art="art. 14" />; <Ext href={FONTE.ecaDigital}>Estatuto Digital da Criança e do Adolescente, Lei nº 15.211/2025</Ext>), eliminaremos esses dados. Pais e responsáveis podem nos procurar pelo canal de privacidade. As plataformas sociais têm idade mínima própria para uso.
      </p>
    ),
  },
  {
    id: "plataformas",
    titulo: "Regras específicas das plataformas",
    corpo: (
      <>
        <p>
          Nossos aplicativos nas plataformas são usados só pela laroca.dev, nas nossas próprias contas. Os dados recebidos delas são tratados apenas como descrito nesta política, nunca são vendidos, não são usados para publicidade nem para treinar inteligência artificial, e são excluídos quando pedido, quando o acesso é revogado ou quando deixam de ser necessários.
        </p>
        <h3>Meta (Instagram e Facebook)</h3>
        <p>
          Seguimos os <Ext href="https://developers.facebook.com/terms/">Termos da Plataforma</Ext> e as <Ext href="https://developers.facebook.com/devpolicy/">Políticas para Desenvolvedores</Ext> da Meta (versão de 3 de fevereiro de 2026). Você pode remover o acesso do nosso aplicativo nas configurações do Instagram ou do Facebook (Apps e sites) e pedir a exclusão dos dados em <Interno para="exclusao-de-dados">Exclusão de dados</Interno>. Os dados também tratados pela Meta seguem a <Ext href="https://privacycenter.instagram.com/policy">Política de Privacidade da Meta</Ext>.
        </p>
        <h3>TikTok</h3>
        <p>
          Seguimos os <Ext href="https://www.tiktok.com/legal/page/global/tik-tok-developer-terms-of-service/en">Termos de Serviço para Desenvolvedores do TikTok</Ext> (última alteração em 26 de dezembro de 2025). O acesso pode ser removido no aplicativo do TikTok, nas configurações de segurança e permissões de apps. Os dados tratados pelo TikTok seguem a <Ext href="https://www.tiktok.com/legal/page/row/privacy-policy/pt-BR">Política de Privacidade do TikTok</Ext>.
        </p>
        <h3>YouTube e Google</h3>
        <p>
          Nossa integração usa os <strong>Serviços de API do YouTube</strong>. Ao usar recursos ligados ao YouTube, valem os <Ext href="https://www.youtube.com/t/terms">Termos de Serviço do YouTube</Ext> e a <Ext href="http://www.google.com/policies/privacy">Política de Privacidade do Google</Ext>. O acesso pode ser revogado a qualquer momento na{" "}
          <Ext href="https://security.google.com/settings/security/permissions">página de configurações de segurança do Google</Ext>. Os dados obtidos do YouTube são atualizados ou excluídos em até 30 dias, e excluídos em até 7 dias após um pedido de exclusão (Políticas para Desenvolvedores do YouTube, seções III.D e III.E).
        </p>
        <p className="destaque">
          O uso e a transferência, para qualquer outro aplicativo, de informações recebidas das APIs do Google pela laroca.dev seguem a <Ext href="https://developers.google.com/terms/api-services-user-data-policy">Política de Dados do Usuário dos Serviços de API do Google</Ext>, incluindo os requisitos de Uso Limitado (<em>Limited Use</em>).
          <br />
          <span lang="en">
            laroca.dev’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
          </span>
        </p>
        <p>Na prática, isso quer dizer que usamos os dados do Google só para o recurso visível na Central (publicar e acompanhar os nossos vídeos), não os transferimos a terceiros, salvo para segurança, cumprimento da lei ou nas hipóteses permitidas pela política, e nenhuma pessoa os lê, salvo com autorização, por segurança ou por exigência legal.</p>
      </>
    ),
  },
  {
    id: "alteracoes",
    titulo: "Alterações desta política",
    corpo: (
      <>
        <p>
          Podemos atualizar esta política quando os tratamentos, os fornecedores ou a lei mudarem. A versão e a data de vigência ficam no topo da página. Mudanças relevantes serão destacadas no site e, para clientes, avisadas por e-mail. Se uma mudança exigir consentimento, ele será pedido antes.
        </p>
        <p>Histórico: versão 1.0, de {VIGENCIA}, primeira publicação.</p>
      </>
    ),
  },
  {
    id: "lei-foro",
    titulo: "Lei aplicável e foro",
    corpo: (
      <p>
        Esta política segue a legislação brasileira, em especial a <Ext href={FONTE.lgpd}>Lei nº 13.709/2018 (LGPD)</Ext>, o <Ext href={FONTE.marcoCivil}>Marco Civil da Internet (Lei nº 12.965/2014)</Ext> e o seu <Ext href={FONTE.dec8771}>Decreto nº 8.771/2016</Ext>, e o <Ext href={FONTE.cdc}>Código de Defesa do Consumidor</Ext>. Se você for consumidor, pode propor ação no seu domicílio (CDC, art. 101, I). Nos demais casos, fica eleito o foro da comarca de Castro – PR. Antes de qualquer medida, procure-nos: a maioria das questões se resolve rápido pelo canal de privacidade.
      </p>
    ),
  },
];

export default function Privacidade() {
  return (
    <PaginaLegal
      caminho="privacidade"
      titulo="Política de privacidade"
      chamada="Como a laroca.dev trata dados pessoais no site, no atendimento, nos projetos para clientes e nas integrações com Instagram, Facebook, TikTok e YouTube."
      versao={VERSAO}
      vigencia={VIGENCIA}
      resumo={[
        "O site laroca.dev não tem formulário, cadastro, cookies próprios, publicidade nem ferramentas de rastreamento.",
        "Usamos os dados que você nos manda por WhatsApp, e-mail ou redes só para responder, orçar e cumprir contratos.",
        "Nossos aplicativos no Instagram, Facebook, TikTok e YouTube servem só para gerenciar as nossas próprias contas e responder a quem interage com elas.",
        "Não vendemos dados, não fazemos publicidade com eles e não os usamos para treinar inteligência artificial.",
        <>
          Você pode pedir acesso, correção ou exclusão a qualquer momento em <a href={`mailto:${EMAIL}?subject=Privacidade`}>{EMAIL}</a> (assunto “Privacidade”). Respondemos em até 15 dias.
        </>,
      ]}
      secoes={secoes}
    />
  );
}
