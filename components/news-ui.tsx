import { Link } from "@tanstack/react-router";
import type { Article, Section } from "@/lib/news.server";
import { whenLabel } from "@/components/shell";

const SECTION_LABEL: Record<string, string> = {
  paraiba: "Paraíba",
  brasil: "Brasil",
  mundo: "Mundo",
  politica: "Política",
  economia: "Economia",
  esportes: "Esportes",
  cultura: "Cultura",
};

export function sectionLabel(id: string) {
  return SECTION_LABEL[id] ?? id;
}

export function Card({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={`group bg-card border border-line rounded-2xl overflow-hidden flex flex-col ${featured ? "md:flex-row" : ""}`}>
      <div className={`bg-forest/10 ${featured ? "md:w-2/5 min-h-48" : "h-40"} relative`}>
        {article.image ? (
          <img src={article.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-end p-3">
            <span className="text-forest/70 text-xs tracking-widest uppercase">{article.source}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="kicker">{sectionLabel(article.section)} · {article.source}</p>
        <h2 className={`serif leading-tight ${featured ? "text-3xl" : "text-xl"}`}>
          <Link to="/noticia/$slug" params={{ slug: article.slug }} className="hover:text-moss">
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-muted line-clamp-3">{article.excerpt}</p>
        <p className="text-xs text-muted mt-auto">{whenLabel(article.publishedAt)}</p>
      </div>
    </article>
  );
}

export function Rail({ title, section, items }: { title: string; section: Section; items: Article[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between border-b border-line pb-2 mb-3">
        <h2 className="serif text-2xl">{title}</h2>
        <Link to="/secao/$slug" params={{ slug: section }} className="text-sm text-moss font-semibold">
          Ver editoria
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 3).map((article) => (
          <Card key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
