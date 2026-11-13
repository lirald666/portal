import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/automacao")({
  component: Page,
});

function Page() {
  return (
    <Shell>
      <article className="max-w-3xl space-y-4 leading-relaxed">
        <p className="kicker">Operação</p>
        <h1 className="serif text-4xl">Automação da edição</h1>
        <p>
          O site que você está vendo já busca os RSS no servidor e renova a capa a cada cinco minutos.
          O pacote para download separa três peças para você publicar no seu domínio e guardar histórico:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>GitHub.</strong> Código do portal (rotas, capa, apoio, páginas legais). É o que sobe no repositório do jadeucerto.com.
          </li>
          <li>
            <strong>Planilha Google.</strong> Modelo com as colunas id, titulo, resumo, regiao, editoria, fonte, url, imagem, publicado_em, status.
            Status “publicado” entra no JSON; “revisar” fica de fora.
          </li>
          <li>
            <strong>Apps Script.</strong> A cada execução ele lê os mesmos feeds, grava linhas novas na planilha e responde um JSON em doGet.
            No gatilho de tempo, rode de 15 em 15 minutos.
          </li>
        </ol>
        <h2 className="serif text-2xl">Ordem sugerida</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Crie a planilha e importe o CSV do pacote para herdar o cabeçalho.</li>
          <li>Extensões → Apps Script, cole o Code.gs, salve e autorize.</li>
          <li>Implantar → Novo aplicativo da web → executar como você → acesso: qualquer pessoa.</li>
          <li>No AdSense, crie unidades reais e só então troque o espaço tracejado por anúncio. Não use slot inventado.</li>
          <li>Publique Sobre, Contato, Privacidade e Termos no domínio antes de pedir a revisão.</li>
        </ol>
        <p>
          O botão de download do pacote está no fim da capa do arquivo que acompanha esta versão, e também nesta página quando o arquivo está publicado junto do site.
        </p>
        <a className="inline-block rounded-full bg-forest text-paper px-4 py-2 text-sm font-semibold" href="/pacote-jadeucerto.zip">
          Baixar pacote GitHub + Script + Planilha
        </a>
      </article>
    </Shell>
  );
}
