import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { SupportBot } from "@/components/support-bot";

const NAV = [
  { label: "Capa", slug: "" },
  { label: "Paraíba", slug: "paraiba" },
  { label: "Brasil", slug: "brasil" },
  { label: "Mundo", slug: "mundo" },
  { label: "Política", slug: "politica" },
  { label: "Economia", slug: "economia" },
  { label: "Esportes", slug: "esportes" },
  { label: "Cultura", slug: "cultura" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="bg-forest text-paper text-center text-[12px] tracking-wide py-1.5 px-3">
        Já Deu Certo · jadeucerto.com · notícias da Paraíba, do Brasil e do mundo
      </div>
      <header className="border-b border-line bg-card/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <span className="block text-[11px] tracking-[0.22em] uppercase text-moss font-bold">Portal</span>
            <span className="serif text-[1.55rem] leading-none text-forest">Já Deu Certo</span>
          </Link>
          <form
            className="hidden md:flex flex-1 max-w-md ml-auto"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/busca", search: { q: q.trim() } });
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar na edição"
              className="w-full rounded-l-full border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-moss"
              aria-label="Buscar"
            />
            <button className="rounded-r-full bg-forest text-paper px-4 text-sm font-semibold" type="submit">
              Buscar
            </button>
          </form>
          <button className="md:hidden ml-auto border border-line rounded-full px-3 py-1 text-sm" onClick={() => setOpen((v) => !v)}>
            Menu
          </button>
        </div>
        <nav className={`${open ? "block" : "hidden"} md:block border-t border-line`}>
          <ul className="max-w-6xl mx-auto px-3 py-2 flex gap-1 overflow-x-auto">
            {NAV.map((item) => {
              const active = item.slug === "" ? path === "/" : path === `/secao/${item.slug}`;
              return (
                <li key={item.label}>
                  {item.slug === "" ? (
                    <Link to="/" onClick={() => setOpen(false)} className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${active ? "bg-forest text-paper" : "text-ink hover:bg-paper"}`}>
                      {item.label}
                    </Link>
                  ) : (
                    <Link to="/secao/$slug" params={{ slug: item.slug }} onClick={() => setOpen(false)} className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${active ? "bg-forest text-paper" : "text-ink hover:bg-paper"}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-line mt-8 bg-forest text-paper">
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <p className="serif text-2xl">Já Deu Certo</p>
            <p className="text-paper/80 mt-2">Agregador editorial com crédito obrigatório à fonte. Não republicamos a matéria inteira.</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/sobre" className="hover:underline">Sobre</Link>
            <Link to="/contato" className="hover:underline">Contato</Link>
            <Link to="/privacidade" className="hover:underline">Privacidade</Link>
            <Link to="/termos" className="hover:underline">Termos</Link>
            <Link to="/automacao" className="hover:underline">Automação</Link>
            <Link to="/mapa" className="hover:underline">Mapa do site</Link>
          </div>
          <div className="text-paper/80">
            <p>Publicidade identificada como anúncio. Conteúdo de apostas, cassino e jogo do bicho não é publicado neste portal.</p>
            <p className="mt-2">© {new Date().getFullYear()} Já Deu Certo</p>
          </div>
        </div>
      </footer>
      <SupportBot />
    </div>
  );
}

export function AdSlot({ label = "Publicidade" }: { label?: string }) {
  return (
    <aside className="ad-slot my-4 px-4" aria-label={label}>
      {label} · espaço reservado até a unidade do AdSense ser criada
    </aside>
  );
}

export function whenLabel(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}
