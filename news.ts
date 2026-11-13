import { createServerFn } from "@tanstack/react-start";

export type Region = "paraiba" | "brasil" | "mundo";
export type Section = "paraiba" | "brasil" | "mundo" | "politica" | "economia" | "esportes" | "cultura";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  region: Region;
  section: Section;
  publishedAt: string;
  image?: string;
};

export type NewsPack = {
  updatedAt: string;
  live: boolean;
  note: string;
  items: Article[];
};

const FEEDS: { url: string; source: string; region: Region }[] = [
  { url: "https://www.jornaldaparaiba.com.br/feed", source: "Jornal da Paraíba", region: "paraiba" },
  { url: "https://paraibaonline.com.br/feed/", source: "Paraíba Online", region: "paraiba" },
  { url: "https://portalcorreio.com.br/feed/", source: "Portal Correio", region: "paraiba" },
  { url: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml", source: "Agência Brasil", region: "brasil" },
  { url: "https://feeds.bbci.co.uk/portuguese/rss.xml", source: "BBC News Brasil", region: "mundo" },
];

const SECTION_RULES: { section: Section; re: RegExp }[] = [
  { section: "esportes", re: /futebol|campeonato|treze|botafogo|esporte|olimp|basquete|vôlei|volei|nba|libertadores|brasileir[aã]o/i },
  { section: "economia", re: /economia|d[oó]lar|infla|emprego|sal[aá]rio|pib|imposto|mercado|safra|juros|bolsa|selic/i },
  { section: "politica", re: /pol[ií]tica|prefeit|govern|c[aâ]mara|deputad|elei[cç]|assembleia|stf|senado|ministro|lula/i },
  { section: "cultura", re: /cultura|show|m[uú]sica|festival|cinema|forr[oó]|s[aã]o jo[aã]o|teatro|livro|arte/i },
];

let cache: { at: number; pack: NewsPack } | null = null;

function decodeEntities(input: string) {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/'|&#39;/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&hellip;/g, "…");
}

function plain(html: string) {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(block: string) {
  const media = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (media?.[1]) return media[1];
  const enc = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image/i);
  if (enc?.[1]) return enc[1];
  const img = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  return img?.[1];
}

function tag(block: string, name: string) {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  return m ? plain(m[1]) : "";
}

function hashSlug(link: string) {
  let h = 2166136261;
  for (let i = 0; i < link.length; i++) {
    h ^= link.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function classify(region: Region, title: string, excerpt: string): Section {
  const text = `${title} ${excerpt}`;
  for (const rule of SECTION_RULES) {
    if (rule.re.test(text)) return rule.section;
  }
  return region;
}

function parseFeed(xml: string, source: string, region: Region): Article[] {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const out: Article[] = [];
  for (const block of items.slice(0, 14)) {
    const title = tag(block, "title");
    const url = (block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
    if (!title || !url.startsWith("http")) continue;
    const rawDesc = tag(block, "description") || tag(block, "content:encoded");
    const excerpt = rawDesc.replace(title, "").trim().slice(0, 280);
    const dateRaw = tag(block, "pubDate") || tag(block, "dc:date");
    const published = dateRaw ? new Date(dateRaw) : new Date();
    const publishedAt = Number.isNaN(published.getTime()) ? new Date().toISOString() : published.toISOString();
    out.push({
      slug: hashSlug(url),
      title,
      excerpt: excerpt || "Abra a matéria na fonte original para ler o texto completo.",
      url,
      source,
      region,
      section: classify(region, title, excerpt),
      publishedAt,
      image: firstImage(block),
    });
  }
  return out;
}

const FALLBACK: Article[] = [
  {
    slug: "demo-cagepa",
    title: "Como a redação acompanha serviços públicos na Grande João Pessoa",
    excerpt: "Enquanto o feed ao vivo não responde, esta edição de demonstração explica o método: checar Cagepa, prefeitura e defesa civil antes de publicar alertas de água, chuva ou trânsito.",
    url: "https://jadeucerto.com/sobre",
    source: "Redação Já Deu Certo",
    region: "paraiba",
    section: "paraiba",
    publishedAt: new Date().toISOString(),
  },
  {
    slug: "demo-metodo",
    title: "Mundo e Brasil entram por agências públicas, com link para a fonte",
    excerpt: "Agência Brasil e BBC News Brasil abastecem as editorias nacional e internacional. O site mostra título, resumo curto e o link original — sem copiar a matéria inteira.",
    url: "https://jadeucerto.com/sobre",
    source: "Redação Já Deu Certo",
    region: "brasil",
    section: "brasil",
    publishedAt: new Date().toISOString(),
  },
];

async function pull(): Promise<NewsPack> {
  const batches = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          headers: { "User-Agent": "JadeuCertoNews/1.0 (+https://jadeucerto.com)", Accept: "application/rss+xml, application/xml, text/xml" },
          signal: AbortSignal.timeout(9000),
        });
        if (!res.ok) return [];
        const xml = await res.text();
        return parseFeed(xml, feed.source, feed.region);
      } catch {
        return [];
      }
    }),
  );
  const seen = new Set<string>();
  const items = batches
    .flat()
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  if (items.length < 4) {
    return {
      updatedAt: new Date().toISOString(),
      live: false,
      note: "Os feeds públicos não responderam agora. Mostramos a edição de método da redação.",
      items: FALLBACK,
    };
  }
  return {
    updatedAt: new Date().toISOString(),
    live: true,
    note: "Manchetes puxadas agora de veículos da Paraíba, Agência Brasil e BBC News Brasil. O texto completo fica na fonte.",
    items: items.slice(0, 60),
  };
}

export const loadNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsPack> => {
  if (cache && Date.now() - cache.at < 5 * 60 * 1000) return cache.pack;
  const pack = await pull();
  cache = { at: Date.now(), pack };
  return pack;
});
