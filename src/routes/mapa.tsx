import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/mapa")({
  component: Page,
});

const PAGES = [
  ["/", "Capa"],
  ["/busca", "Busca"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
  ["/privacidade", "Privacidade"],
  ["/termos", "Termos"],
  ["/automacao", "Automação"],
  ["/mapa", "Mapa do site"],
] as const;

const SECTIONS = [
  ["paraiba", "Paraíba"],
  ["brasil", "Brasil"],
  ["mundo", "Mundo"],
  ["politica", "Política"],
  ["economia", "Economia"],
  ["esportes", "Esportes"],
  ["cultura", "Cultura"],
] as const;

function Page() {
  return (
    <Shell>
      <h1 className="serif text-4xl">Mapa do site</h1>
      <ul className="mt-4 space-y-2">
        {PAGES.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="hover:text-moss">{label}</Link>
          </li>
        ))}
        {SECTIONS.map(([slug, label]) => (
          <li key={slug}>
            <Link to="/secao/$slug" params={{ slug }} className="hover:text-moss">{label}</Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
