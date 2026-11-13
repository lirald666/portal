import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/sobre")({
  component: Page,
});

function Page() {
  return (
    <Shell>
      <article className="max-w-3xl space-y-4 text-[17px] leading-relaxed">
        <p className="kicker">Quem faz</p>
        <h1 className="serif text-4xl">Sobre o Já Deu Certo</h1>
        <p>
          O Já Deu Certo é um portal de manchetes para quem acompanha a Paraíba sem perder o Brasil e o mundo.
          O endereço previsto do projeto é jadeucerto.com. A redação não inventa furos: puxa feeds públicos,
          organiza por editoria e manda o leitor para o veículo que apurou o fato.
        </p>
        <h2 className="serif text-2xl pt-2">De onde vêm as notícias</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Jornal da Paraíba, Paraíba Online e Portal Correio — estado.</li>
          <li>Agência Brasil (EBC) — Brasil.</li>
          <li>BBC News Brasil — internacional em português.</li>
        </ul>
        <h2 className="serif text-2xl pt-2">O que este site não é</h2>
        <p>
          Não é banca de apostas, não indica jogo do bicho, cassino ou “cotação de milhar”, e não usa o chat
          para empurrar aplicativos de aposta. Esse tipo de página entra em conflito com as políticas de
          editor do Google AdSense e com a regra de conteúdo de baixo valor.
        </p>
        <h2 className="serif text-2xl pt-2">Como a capa é montada</h2>
        <p>
          Um processo no servidor lê os RSS, remove HTML, guarda no máximo um trecho de 280 caracteres,
          classifica por região e por palavras de política, economia, esportes e cultura, e renova a lista
          a cada cinco minutos. Títulos e trechos continuam sendo dos autores originais.
        </p>
      </article>
    </Shell>
  );
}
