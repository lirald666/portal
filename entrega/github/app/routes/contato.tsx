import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/contato")({
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <div className="max-w-xl">
        <p className="kicker">Fale com a redação</p>
        <h1 className="serif text-4xl mt-1">Contato</h1>
        <p className="mt-3 text-muted">
          Correções de uma notícia devem ir primeiro ao veículo de origem. Use este formulário para erro no portal,
          parceria editorial ou dúvida sobre anúncios. E-mail: redacao@jadeucerto.com.
        </p>
        {sent ? (
          <p className="mt-6 rounded-2xl bg-card border border-line p-4">Mensagem registrada neste navegador. Responderemos pelo e-mail informado quando o domínio estiver no ar.</p>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const note = {
                nome: String(data.get("nome") ?? ""),
                email: String(data.get("email") ?? ""),
                assunto: String(data.get("assunto") ?? ""),
                mensagem: String(data.get("mensagem") ?? ""),
                em: new Date().toISOString(),
              };
              const prev = JSON.parse(localStorage.getItem("jdc-contato") || "[]");
              localStorage.setItem("jdc-contato", JSON.stringify([note, ...prev].slice(0, 30)));
              setSent(true);
            }}
          >
            <input name="nome" required placeholder="Nome" className="w-full rounded-xl border border-line bg-card px-3 py-2" />
            <input name="email" type="email" required placeholder="E-mail" className="w-full rounded-xl border border-line bg-card px-3 py-2" />
            <input name="assunto" required placeholder="Assunto" className="w-full rounded-xl border border-line bg-card px-3 py-2" />
            <textarea name="mensagem" required rows={5} placeholder="Mensagem" className="w-full rounded-xl border border-line bg-card px-3 py-2" />
            <button className="rounded-full bg-forest text-paper px-5 py-2 font-semibold" type="submit">Enviar</button>
          </form>
        )}
      </div>
    </Shell>
  );
}
