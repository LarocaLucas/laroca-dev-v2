import { EMAIL, EMPRESA, TELEFONE, WHATSAPP } from "../site";
import { Ext, FONTE, Interno, PaginaLegal, type Secao } from "./ui";

export const VERSAO = "1.0";
export const VIGENCIA = "4 de novembro de 2026";

const secoes: Secao[] = [
  {
    id: "quem-somos",
    titulo: "Quem somos e o que estes termos regulam",
    corpo: (
      <>
        <p>
          Estes Termos de Uso regulam o uso do site <strong>laroca.dev</strong> e dos aplicativos que a laroca.dev registra nas plataformas Meta (Instagram e Facebook), TikTok e Google (YouTube). O site e os aplicativos pertencem a <strong>{EMPRESA.nome}</strong>, CNPJ <strong>{EMPRESA.cnpj}</strong>, com sede em {EMPRESA.cidade}, que usa o nome comercial laroca.dev (<Ext href={FONTE.dec7962}>Decreto nº 7.962/2013, art. 2º</Ext>).
        </p>
        <p>
          Contato: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · WhatsApp <Ext href={WHATSAPP}>{TELEFONE}</Ext>.
        </p>
        <p>
          Ao navegar no site você declara ter lido estes termos e a <Interno para="privacidade">Política de Privacidade</Interno>, que faz parte deles. Se não concordar, não use o site.
        </p>
      </>
    ),
  },
  {
    id: "servicos",
    titulo: "O site é informativo; contratos são feitos à parte",
    corpo: (
      <>
        <p>
          O site apresenta a laroca.dev, os serviços e os projetos que já fizemos. Nele <strong>não há venda, cadastro nem pagamento</strong>. Pedidos de orçamento são feitos por WhatsApp ou e-mail.
        </p>
        <ul>
          <li>As descrições de serviços são gerais. Escopo, prazo, valor, forma de pagamento, garantia e suporte de cada projeto são definidos numa <strong>proposta ou contrato por escrito</strong>, que prevalece sobre estes termos naquilo que regular de forma diferente.</li>
          <li>Os resultados citados nos projetos se referem àqueles projetos e não são promessa de resultado igual para outros negócios.</li>
          <li>As telas de sistemas mostradas no site usam dados de demonstração inventados; nenhum dado real de cliente é exibido.</li>
        </ul>
      </>
    ),
  },
  {
    id: "uso",
    titulo: "Uso permitido",
    corpo: (
      <>
        <p>Você pode navegar, ler, compartilhar links e citar trechos do site com indicação da fonte. Não é permitido:</p>
        <ul>
          <li>usar o site para fins ilícitos, ou de forma que prejudique a laroca.dev ou terceiros;</li>
          <li>tentar invadir, sobrecarregar ou burlar a segurança do site e dos sistemas, ou fazer testes de intrusão sem autorização por escrito;</li>
          <li>coletar o conteúdo em massa por robôs, salvo os mecanismos de busca que respeitam o nosso <code>robots.txt</code>;</li>
          <li>copiar o site, o código, o design ou os textos para criar páginas ou produtos semelhantes, ou exibi-lo dentro de outro site (moldura);</li>
          <li>usar o nome, a marca ou o logotipo da laroca.dev de forma que sugira parceria, patrocínio ou endosso que não existe, ou fazer-se passar pela laroca.dev.</li>
        </ul>
        <p>
          Encontrou uma falha de segurança? Avise-nos pelo endereço indicado em <Ext href="https://laroca.dev/.well-known/security.txt">security.txt</Ext>, sem explorar a falha nem acessar dados de terceiros. Agradecemos a quem age de boa-fé.
        </p>
      </>
    ),
  },
  {
    id: "propriedade",
    titulo: "Propriedade intelectual",
    corpo: (
      <>
        <p>
          Textos, layout, design, ilustrações, logotipos, marca, fotos e o código-fonte do site são da laroca.dev ou usados com autorização, e são protegidos pela <Ext href={FONTE.direitosAutorais}>Lei de Direitos Autorais (Lei nº 9.610/1998, arts. 7º e 29)</Ext> e, quanto ao software, pela <Ext href={FONTE.software}>Lei do Software (Lei nº 9.609/1998, art. 2º)</Ext>. Usar essas obras sem autorização prévia e expressa é proibido e pode gerar responsabilidade civil e penal (Lei nº 9.609/1998, art. 12; Lei nº 9.610/1998, arts. 102 a 110).
        </p>
        <ul>
          <li>
            Nomes, marcas e telas de sites de clientes aparecem no portfólio com a autorização deles e continuam pertencendo a seus titulares.
          </li>
          <li>
            Nada nestes termos transfere qualquer direito sobre o site. O direito de uso dos sistemas e sites que entregamos a clientes é regulado pelo contrato de cada projeto (Lei nº 9.609/1998, art. 9º). Componentes de código aberto seguem as próprias licenças.
          </li>
          <li>Se você acredita que algo no site viola um direito seu, escreva para {EMAIL}: analisamos e, se for o caso, retiramos o conteúdo.</li>
        </ul>
      </>
    ),
  },
  {
    id: "informacoes",
    titulo: "Informações do site",
    corpo: (
      <p>
        Mantemos o conteúdo correto e atualizado, mas ele pode mudar sem aviso e conter imprecisões pontuais. As informações são gerais e não substituem uma conversa sobre o seu caso. Se encontrar algo errado, avise-nos e corrigiremos.
      </p>
    ),
  },
  {
    id: "terceiros",
    titulo: "Links e serviços de terceiros",
    corpo: (
      <p>
        O site tem links para WhatsApp, Instagram, sites de clientes e outros serviços que não controlamos. Ao acessá-los, valem os termos e as políticas de cada um. Não respondemos pelo conteúdo, pela disponibilidade ou pelas práticas de privacidade desses serviços.
      </p>
    ),
  },
  {
    id: "disponibilidade",
    titulo: "Disponibilidade",
    corpo: (
      <p>
        Trabalhamos para manter o site no ar, mas ele pode ficar indisponível por manutenção, falhas de fornecedores de internet e hospedagem, ataques ou caso fortuito e força maior (<Ext href={FONTE.codigoCivil}>Código Civil, art. 393</Ext>). Podemos alterar, suspender ou encerrar o site ou partes dele.
      </p>
    ),
  },
  {
    id: "responsabilidade",
    titulo: "Responsabilidade",
    corpo: (
      <>
        <p>A laroca.dev responde pelos danos que causar, nos termos da lei. Como o site é gratuito e informativo, não responde por:</p>
        <ul>
          <li>danos decorrentes do uso do site em desacordo com estes termos ou com a lei;</li>
          <li>falhas de equipamentos, conexões ou programas do próprio usuário, ou de serviços de terceiros fora do nosso controle;</li>
          <li>decisões tomadas apenas com base em informações gerais do site, sem contratação de um serviço;</li>
          <li>conteúdo e práticas de sites e serviços de terceiros acessados por links.</li>
        </ul>
        <p className="destaque">
          Nada nestes termos exclui ou reduz direitos que a lei garante e que não podem ser afastados por contrato. Em relações de consumo, valem integralmente as regras do <Ext href={FONTE.cdc}>Código de Defesa do Consumidor</Ext>, que proíbe cláusulas que impossibilitem, exonerem ou atenuem a responsabilidade do fornecedor (arts. 25 e 51, I). Em contratos de adesão, são nulas as cláusulas de renúncia antecipada a direitos (<Ext href={FONTE.codigoCivil}>Código Civil, art. 424</Ext>).
        </p>
        <p>
          Quem usar o site de forma ilícita ou contrária a estes termos responde pelos danos que causar à laroca.dev ou a terceiros (Código Civil, arts. 186, 187 e 927).
        </p>
      </>
    ),
  },
  {
    id: "integracoes",
    titulo: "Termos dos aplicativos nas plataformas (Central laroca.dev)",
    corpo: (
      <>
        <p>
          A laroca.dev mantém aplicativos registrados na Meta (Instagram e Facebook), no TikTok e no Google (YouTube), usados pela <strong>Central laroca.dev</strong>, nossa ferramenta interna, para:
        </p>
        <ul>
          <li>agendar e publicar conteúdo nas contas da própria laroca.dev e do seu titular;</li>
          <li>acompanhar métricas dessas publicações;</li>
          <li>responder comentários e mensagens recebidos por essas contas, inclusive com respostas automáticas por palavra-chave.</li>
        </ul>
        <p>Sobre esses aplicativos:</p>
        <ul>
          <li>
            <strong>Uso interno:</strong> não são oferecidos ao público e só podem ser usados por quem a laroca.dev autorizar, em contas próprias. Ninguém mais pode conectar contas a eles.
          </li>
          <li>
            <strong>Regras das plataformas:</strong> o uso segue os <Ext href="https://developers.facebook.com/terms/">Termos da Plataforma da Meta</Ext>, as <Ext href="https://developers.facebook.com/devpolicy/">Políticas para Desenvolvedores da Meta</Ext>, os <Ext href="https://help.instagram.com/581066165581870">Termos de Uso do Instagram</Ext>, os <Ext href="https://www.tiktok.com/legal/page/global/tik-tok-developer-terms-of-service/en">Termos para Desenvolvedores do TikTok</Ext>, os <Ext href="https://developers.google.com/youtube/terms/api-services-terms-of-service">Termos dos Serviços de API do YouTube</Ext> e a <Ext href="https://developers.google.com/terms/api-services-user-data-policy">Política de Dados do Usuário dos Serviços de API do Google</Ext>. Quem interage com recursos ligados ao YouTube concorda com os <Ext href="https://www.youtube.com/t/terms">Termos de Serviço do YouTube</Ext>.
          </li>
          <li>
            <strong>Sem vínculo com as plataformas:</strong> a laroca.dev não é afiliada, patrocinada nem endossada pela Meta, pelo TikTok ou pelo Google. As marcas pertencem aos seus titulares.
          </li>
          <li>
            <strong>Mensagens automáticas:</strong> as respostas automáticas são enviadas só a quem comenta ou escreve para os nossos perfis, dentro dos limites e das janelas de mensagens de cada plataforma. Não enviamos mensagens em massa não solicitadas.
          </li>
          <li>
            <strong>Dados:</strong> o tratamento está descrito na <Interno para="privacidade">Política de Privacidade</Interno> e a exclusão, em <Interno para="exclusao-de-dados">Exclusão de dados</Interno>.
          </li>
          <li>
            <strong>Mudanças das plataformas:</strong> as integrações dependem das APIs de cada plataforma, que podem mudar, limitar ou encerrar o acesso. Nesses casos, os recursos afetados podem parar sem aviso.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comunicacoes",
    titulo: "Comunicações",
    corpo: (
      <p>
        As comunicações com a laroca.dev são feitas pelos canais indicados no início destes termos. Mensagens de e-mail e WhatsApp trocadas com esses canais são aceitas como meio válido de comunicação entre as partes. Desconfie de mensagens em nosso nome vindas de outros endereços ou números e confirme pelos canais oficiais.
      </p>
    ),
  },
  {
    id: "alteracoes",
    titulo: "Alterações destes termos",
    corpo: (
      <p>
        Podemos atualizar estes termos. A versão e a data de vigência ficam no topo da página, e a versão nova vale a partir da publicação, sem efeito sobre fatos anteriores. Histórico: versão 1.0, de {VIGENCIA}, primeira publicação.
      </p>
    ),
  },
  {
    id: "gerais",
    titulo: "Disposições gerais",
    corpo: (
      <ul>
        <li>Se alguma cláusula for considerada inválida, as demais continuam valendo.</li>
        <li>Deixar de exigir um direito previsto aqui não significa renunciar a ele.</li>
        <li>Estes termos não criam sociedade, vínculo de emprego, representação ou parceria entre você e a laroca.dev.</li>
      </ul>
    ),
  },
  {
    id: "lei-foro",
    titulo: "Lei aplicável e foro",
    corpo: (
      <p>
        Estes termos seguem a legislação brasileira. Se você for consumidor, pode propor ação no seu domicílio (<Ext href={FONTE.cdc}>CDC, art. 101, I</Ext>). Nos demais casos, as partes elegem o foro da comarca de Castro – PR, sede da laroca.dev (<Ext href={FONTE.cpc}>Código de Processo Civil, art. 63</Ext>). Antes de qualquer medida, procure-nos pelos canais de contato para uma solução amigável.
      </p>
    ),
  },
];

export default function Termos() {
  return (
    <PaginaLegal
      caminho="termos"
      titulo="Termos de uso"
      chamada="Regras para usar o site laroca.dev e os aplicativos que a laroca.dev mantém no Instagram, Facebook, TikTok e YouTube."
      versao={VERSAO}
      vigencia={VIGENCIA}
      resumo={[
        "O site é informativo e gratuito; não vende nada. Cada projeto é contratado por proposta ou contrato próprio.",
        "Textos, design, marca e código do site são da laroca.dev; não copie sem autorização.",
        "Nossos aplicativos nas plataformas são de uso interno, só nas nossas contas, e seguem as regras de cada plataforma.",
        "Respondemos pelo que a lei manda; nada aqui reduz os seus direitos de consumidor.",
        "Se você for consumidor, pode buscar seus direitos na sua cidade; nos demais casos, o foro é Castro – PR.",
      ]}
      secoes={secoes}
    />
  );
}
