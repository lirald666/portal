import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/privacidade")({
  component: Page,
});

function Page() {
  return (
    <Shell>
      <article className="max-w-3xl space-y-4 leading-relaxed">
        <p className="kicker">Documento legal</p>
        <h1 className="serif text-4xl">Política de privacidade</h1>
        <p>Vigência: 13 de novembro de 2026. Controlador: redação do portal Já Deu Certo (jadeucerto.com).</p>
        <h2 className="serif text-2xl">O que coletamos</h2>
        <p>
          O formulário de contato guarda nome, e-mail, assunto e mensagem apenas no seu navegador (armazenamento local),
          até existir um servidor de e-mail. Não pedimos CPF, dados bancários nem documentos.
        </p>
        <h2 className="serif text-2xl">Medição de audiência</h2>
        <p>
          Usamos o Google Analytics 4 com o identificador G-1V0JM8J72L para saber quais editorias são lidas.
          O Google pode tratar endereço IP e identificadores de cookie conforme a política dele.
        </p>
        <h2 className="serif text-2xl">Anúncios</h2>
        <p>
          A conta de editor informada no site é ca-pub-5066020163837493. Enquanto não houver uma unidade de anúncio
          criada no AdSense, o portal só mostra um espaço reservado, sem pedido de anúncio. Quando os anúncios
          forem ligados, fornecedores terceiros, incluindo o Google, poderão usar cookies para exibir publicidade
          com base em visitas anteriores a este e a outros sites. Você pode desativar anúncios personalizados em
          https://adssettings.google.com e cookies de parceiros em https://www.aboutads.info.
        </p>
        <h2 className="serif text-2xl">Visitantes na Europa, Reino Unido e Suíça</h2>
        <p>
          Antes de anúncio personalizado para esse público é obrigatório um aviso de consentimento certificado
          (CMP). Não ative anúncios personalizados sem essa ferramenta.
        </p>
        <h2 className="serif text-2xl">Seus direitos</h2>
        <p>
          Para pedir informação ou exclusão do que tiver sido enviado à redação, escreva para redacao@jadeucerto.com.
          Mensagens que ficaram só neste aparelho podem ser apagadas limpando os dados do site no navegador.
        </p>
      </article>
    </Shell>
  );
}
