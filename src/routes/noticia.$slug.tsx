import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, AdSlot, whenLabel } from "@/components/shell";
import { sectionLabel } from "@/components/news-ui";
import { loadNews } from "@/lib/news";

export const Route = createFileRoute("/noticia/$slug")({
  loader: () => loadNews(),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const pack = Route.useLoaderData();
  const article = pack.items.find((item) => item.slug === slug);
  if (!article) {
    return (
      <Shell>
        <h1 className="serif text-3xl">Manchete não está nesta edição</h1>
        <p className="mt-2 text-muted">Ela pode ter saído da lista das últimas atualizações.</p>
        <Link to="/" className="text-moss font-semibold mt-4 inline-block">Voltar à capa</Link>
      </Shell>
    );
  }
  const related = pack.items.filter((item) => item.slug !== article.slug && (item.section === article.section || item.region === article.region)).slice(0, 4);
  return (
    <Shell>
      <article className="max-w-3xl">
        <p className="kicker">{sectionLabel(article.section)} · {article.region === "paraiba" ? "Paraíba" : article.region === "brasil" ? "Brasil" : "Mundo"}</p>
        <h1 className="serif text-4xl leading-tight mt-2">{article.title}</h1>
        <p className="text-sm text-muted mt-3">{article.source} · {whenLabel(article.publishedAt)}</p>
        {article.image && <img src={article.image} alt="" className="mt-4 w-full max-h-[420px] object-cover rounded-2xl border border-line" />}
        <p className="mt-5 text-lg leading-relaxed">{article.excerpt}</p>
        <div className="mt-5 rounded-2xl border border-line bg-card p-4">
          <p className="font-semibold">Leia a matéria completa na fonte</p>
          <p className="text-sm text-muted mt-1">O Já Deu Certo não copia o texto integral. A apuração, as fotos e as atualizações pertencem a {article.source}.</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 rounded-full bg-forest text-paper px-4 py-2 text-sm font-semibold">
            Abrir em {article.source}
          </a>
        </div>
        <AdSlot label="Publicidade · meio da página" />
        <h2 className="serif text-2xl mt-8">Na mesma editoria</h2>
        <ul className="mt-3 space-y-2">
          {related.map((item) => (
            <li key={item.slug}>
              <Link to="/noticia/$slug" params={{ slug: item.slug }} className="hover:text-moss">
                {item.title}
              </Link>
              <span className="text-muted text-sm"> · {item.source}</span>
            </li>
          ))}
        </ul>
      </article>
    </Shell>
  );
}
