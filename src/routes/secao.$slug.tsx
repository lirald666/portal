import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, AdSlot } from "@/components/shell";
import { Card, sectionLabel } from "@/components/news-ui";
import { loadNews } from "@/lib/news";

const IDS = ["paraiba", "brasil", "mundo", "politica", "economia", "esportes", "cultura"] as const;

export const Route = createFileRoute("/secao/$slug")({
  loader: () => loadNews(),
  component: SectionPage,
});

function SectionPage() {
  const { slug } = Route.useParams();
  const pack = Route.useLoaderData();
  const known = IDS.includes(slug as (typeof IDS)[number]);
  const byRegion = slug === "paraiba" || slug === "brasil" || slug === "mundo";
  const items = pack.items.filter((item) => (byRegion ? item.region === slug : item.section === slug));
  return (
    <Shell>
      <p className="kicker">Editoria</p>
      <h1 className="serif text-4xl mt-1">{known ? sectionLabel(slug) : "Editoria"}</h1>
      <p className="text-muted mt-2 max-w-2xl">
        {known
          ? "Seleção automática dos feeds. O texto completo permanece no veículo que apurou a notícia."
          : "Esta editoria não existe."}
      </p>
      <AdSlot />
      {!known && (
        <Link to="/" className="text-moss font-semibold">Voltar à capa</Link>
      )}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {items.map((article) => (
          <Card key={article.slug} article={article} />
        ))}
      </div>
      {known && items.length === 0 && <p className="mt-6 text-muted">Nenhuma manchete nesta editoria nesta atualização. A capa segue com as outras seções.</p>}
    </Shell>
  );
}
