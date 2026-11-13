import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/mapa")({
  component: Page,
});

const LINKS = [
  ["/", "Capa"],
  ["/secao/paraiba", "Paraíba"],
  ["/secao/brasil", "Brasil"],
  ["/secao/mundo", "Mundo"],
  ["/secao/politica", "Política"],
  ["/secao/economia", "Economia"],
  ["/secao/esportes", "Esportes"],
  ["/secao/cultura", "Cultura"],
  ["/busca", "Busca"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
  ["/privacidade", "Privacidade"],
  ["/termos", "Termos"],
  ["/automacao", "Automação"],
] as const;

function Page() {
  return (
    <Shell>
      <h1 className="serif text-4xl">Mapa do site</h1>
      <ul className="mt-4 columns-1 sm:columns-2 gap-8 space-y-2">
        {LINKS.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="hover:text-moss">{label}</Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
