import { EMAIL, TELEFONE, WHATSAPP } from "../site";
import { Ext, FONTE, Interno, PaginaLegal, type Secao } from "./ui";

export const VERSAO = "1.0";
export const VIGENCIA = "4 de novembro de 2026";

const assunto = `mailto:${EMAIL}?subject=${encodeURIComponent("Exclusão de dados")}`;

const secoes: Secao[] = [
  {
    id: "quem-pode",
    titulo: "Quem pode pedir",
    corpo: (
      <p>
        Qualquer pessoa cujos dados tenhamos recebido: quem comentou, mandou mensagem ou mencionou um perfil que administramos no Instagram, Facebook, TikTok ou YouTube, quem falou conosco por WhatsApp ou e-mail, e clientes. O pedido é gratuito (<Ext href={FONTE.lgpd}>LGPD, art. 18, VI e § 5º</Ext>) e pode ser feito por você ou por representante legal.
      </p>
    ),
  },
  {
    id: "remover-acesso",
    titulo: "Opção 1: remover o acesso do nosso aplicativo na plataforma",
    corpo: (
      <>
        <p>Se você autorizou algum aplicativo da laroca.dev numa plataforma, pode revogar o acesso a qualquer momento. Os nomes dos menus podem variar conforme a versão do aplicativo:</p>
        <h3>Instagram</h3>
        <ol>
          <li>Abra o seu perfil e toque no menu (≡).</li>
          <li>Entre em <strong>Configurações e atividade</strong> → <strong>Permissões de sites e apps</strong> → <strong>Apps e sites</strong>.</li>
          <li>Em <strong>Ativos</strong>, toque no aplicativo da laroca.dev e em <strong>Remover</strong>.</li>
        </ol>
        <h3>Facebook</h3>
        <ol>
          <li>
            Abra <strong>Configurações e privacidade</strong> → <strong>Configurações</strong> → <strong>Apps e sites</strong> (ou acesse <Ext href="https://www.facebook.com/settings?tab=applications">facebook.com/settings?tab=applications</Ext>).
          </li>
          <li>Escolha o aplicativo da laroca.dev e toque em <strong>Remover</strong>. Marque a opção de apagar as publicações e atividades feitas pelo app, se quiser.</li>
        </ol>
        <h3>TikTok</h3>
        <ol>
          <li>Abra o perfil, toque no menu (≡) e entre em <strong>Configurações e privacidade</strong> → <strong>Segurança e permissões</strong> → <strong>Permissões de apps</strong>.</li>
          <li>Escolha o aplicativo da laroca.dev e toque em <strong>Remover acesso</strong>.</li>
        </ol>
        <h3>YouTube e Google</h3>
        <ol>
          <li>
            Abra a <Ext href="https://security.google.com/settings/security/permissions">página de permissões da sua Conta do Google</Ext>.
          </li>
          <li>Escolha o aplicativo da laroca.dev e clique em <strong>Excluir todas as conexões</strong> (ou <strong>Remover acesso</strong>).</li>
        </ol>
        <p>
          Quando o acesso é revogado, deixamos de receber dados novos e excluímos os dados ligados a essa autorização nos prazos da seção <a href="#prazos">“Prazos”</a>. Para garantir que também os dados já recebidos sejam apagados, faça o pedido da Opção 2.
        </p>
      </>
    ),
  },
  {
    id: "pedir",
    titulo: "Opção 2: pedir a exclusão diretamente",
    corpo: (
      <>
        <ol>
          <li>
            Envie um e-mail para <a href={assunto}>{EMAIL}</a> com o assunto <strong>“Exclusão de dados”</strong>, ou fale pelo WhatsApp <Ext href={WHATSAPP}>{TELEFONE}</Ext>.
          </li>
          <li>
            Informe:
            <ul>
              <li>a plataforma (Instagram, Facebook, TikTok, YouTube, WhatsApp ou e-mail);</li>
              <li>o seu nome de usuário ou o número/e-mail usado conosco;</li>
              <li>se quer excluir tudo ou só uma parte (por exemplo, uma conversa).</li>
            </ul>
          </li>
          <li>Para confirmar que o pedido é seu, podemos pedir que você mande uma mensagem pela própria conta em questão. Nunca pedimos senha nem códigos de verificação.</li>
          <li>Você recebe um <strong>número de protocolo</strong> e, ao final, a confirmação da exclusão.</li>
        </ol>
        <p className="destaque">
          Exemplo de mensagem: “Peço a exclusão de todos os meus dados pessoais tratados pela laroca.dev. Plataforma: Instagram. Usuário: @seunome.”
        </p>
      </>
    ),
  },
  {
    id: "prazos",
    titulo: "Prazos",
    corpo: (
      <ul>
        <li>
          <strong>Confirmação do recebimento:</strong> em até 2 dias úteis, com o número de protocolo.
        </li>
        <li>
          <strong>Exclusão dos dados recebidos das plataformas</strong> (Instagram, Facebook, TikTok, YouTube): em até <strong>7 dias corridos</strong> depois do pedido ou da revogação do acesso, como exigem as políticas da Meta (exclusão imediata após o pedido) e do YouTube (até 7 dias).
        </li>
        <li>
          <strong>Demais dados</strong> (WhatsApp, e-mail, clientes): resposta completa em até <strong>15 dias</strong> (<Ext href={FONTE.lgpd}>LGPD, art. 19, II</Ext>).
        </li>
        <li>
          <strong>Cópias de segurança:</strong> substituídas automaticamente em até 30 dias; até lá, ficam isoladas e não são usadas.
        </li>
      </ul>
    ),
  },
  {
    id: "o-que-sai",
    titulo: "O que é excluído e o que pode ficar",
    corpo: (
      <>
        <p>Excluímos dos nossos sistemas: identificadores e nome de usuário da sua conta, comentários e mensagens recebidos, registros na lista de interessados, métricas e qualquer token de acesso ligado a você.</p>
        <p>Podemos manter apenas o que a lei autoriza (<Ext href={FONTE.lgpd}>LGPD, art. 16</Ext>), e informaremos isso na resposta:</p>
        <ul>
          <li>dados que precisamos guardar por obrigação legal ou regulatória, como documentos fiscais de clientes;</li>
          <li>dados necessários ao exercício regular de direitos em processo judicial, administrativo ou arbitral;</li>
          <li>um registro mínimo do próprio pedido (data, protocolo, plataforma e o que foi excluído), por 5 anos, para comprovar que ele foi atendido.</li>
        </ul>
        <p>
          O que está <strong>nas plataformas</strong>, como um comentário seu numa publicação nossa, fica sob controle da plataforma: você pode apagá-lo diretamente nela, e nós também podemos ocultar ou apagar o comentário nas publicações que administramos, se você pedir.
        </p>
      </>
    ),
  },
  {
    id: "mais",
    titulo: "Dúvidas e reclamações",
    corpo: (
      <p>
        Os detalhes sobre quais dados tratamos e por quê estão na <Interno para="privacidade">Política de Privacidade</Interno>. Se o pedido não for atendido, você pode reclamar à <Ext href={FONTE.anpd}>Autoridade Nacional de Proteção de Dados (ANPD)</Ext> ou aos órgãos de defesa do consumidor (<Ext href={FONTE.lgpd}>LGPD, art. 18, §§ 1º e 8º</Ext>).
      </p>
    ),
  },
];

export default function Exclusao() {
  return (
    <PaginaLegal
      caminho="exclusao-de-dados"
      titulo="Exclusão de dados"
      chamada="Como pedir que a laroca.dev apague os seus dados, inclusive os recebidos do Instagram, Facebook, TikTok e YouTube."
      versao={VERSAO}
      vigencia={VIGENCIA}
      resumo={[
        <>
          Mande um e-mail para <a href={assunto}>{EMAIL}</a> com o assunto “Exclusão de dados”, informando a plataforma e o seu usuário.
        </>,
        "Você também pode remover o acesso do nosso aplicativo nas configurações do Instagram, Facebook, TikTok ou Google.",
        "Dados recebidos das plataformas são apagados em até 7 dias; os demais pedidos são respondidos em até 15 dias.",
        "É gratuito, e você recebe um protocolo e a confirmação no final.",
      ]}
      secoes={secoes}
    />
  );
}
