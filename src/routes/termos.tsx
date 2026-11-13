import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/termos")({
  component: Page,
});

function Page() {
  return (
    <Shell>
      <article className="max-w-3xl space-y-4 leading-relaxed">
        <p className="kicker">Documento legal</p>
        <h1 className="serif text-4xl">Termos de uso</h1>
        <p>
          Ao usar o Já Deu Certo você concorda que as manchetes são um índice, não a reportagem original.
          Títulos, trechos e imagens embarcadas pertencem aos veículos citados. O link “abrir na fonte” é parte do serviço.
        </p>
        <p>
          Não garantimos que um feed externo esteja completo, atualizado ou livre de erro. Decisões pessoais,
          financeiras ou de saúde não devem se basear só num resumo deste portal.
        </p>
        <p>
          É proibido usar o site para gerar cliques artificiais em anúncios, copiar o acervo para outro produto
          sem crédito, ou publicar comentários ilegais. Não há seção de comentários aberta nesta versão.
        </p>
        <p>
          Publicidade, quando existir, será marcada como publicidade e seguirá as políticas de editores do Google.
          Conteúdo de azar não licenciado não faz parte deste produto.
        </p>
        <p>Foro: comarca de domicílio do responsável pelo domínio, no Brasil, quando o site estiver publicado.</p>
      </article>
    </Shell>
  );
}
