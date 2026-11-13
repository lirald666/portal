import { createFileRoute } from "@tanstack/react-router";
import { Shell, AdSlot } from "@/components/shell";
import { Card, Rail } from "@/components/news-ui";
import { loadNews, type Article } from "@/lib/news";

export const Route = createFileRoute("/")({
  loader: () => loadNews(),
  component: Home,
});

function pick(items: Article[], key: "region" | "section", value: string) {
  return items.filter((item) => item[key] === value);
}

function Home() {
  const pack = Route.useLoaderData();
  const [lead, ...rest] = pack.items;
  return (
    <Shell>
      <p className="text-sm text-muted mb-4">{pack.note}</p>
      {lead && <Card article={lead} featured />}
      <AdSlot />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {rest.slice(0, 4).map((article) => (
          <Card key={article.slug} article={article} />
        ))}
      </div>
      <Rail title="Paraíba" section="paraiba" items={pick(pack.items, "region", "paraiba")} />
      <Rail title="Brasil" section="brasil" items={pick(pack.items, "region", "brasil")} />
      <Rail title="Mundo" section="mundo" items={pick(pack.items, "region", "mundo")} />
      <Rail title="Economia" section="economia" items={pick(pack.items, "section", "economia")} />
      <Rail title="Esportes" section="esportes" items={pick(pack.items, "section", "esportes")} />
    </Shell>
  );
}
