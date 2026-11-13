import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Card } from "@/components/news-ui";
import { loadNews } from "@/lib/news";

export const Route = createFileRoute("/busca")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loader: () => loadNews(),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const pack = Route.useLoaderData();
  const query = q.trim().toLowerCase();
  const items = query
    ? pack.items.filter((item) => `${item.title} ${item.excerpt} ${item.source}`.toLowerCase().includes(query))
    : [];
  return (
    <Shell>
      <p className="kicker">Busca</p>
      <h1 className="serif text-4xl mt-1">{query ? `Resultados para “${q}”` : "Busque uma palavra da edição"}</h1>
      <p className="text-sm text-muted mt-2">{items.length} manchete(s) nesta atualização.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {items.map((article) => (
          <Card key={article.slug} article={article} />
        ))}
      </div>
      {query && items.length === 0 && (
        <p className="mt-4">Nada com esse termo. <Link to="/" className="text-moss font-semibold">Voltar à capa</Link></p>
      )}
    </Shell>
  );
}
