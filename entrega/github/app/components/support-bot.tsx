import { useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const TOPICS: { id: string; label: string; answer: string }[] = [
  {
    id: "paraiba",
    label: "Paraíba",
    answer: "A editoria Paraíba reúne manchetes do Jornal da Paraíba, Paraíba Online e Portal Correio. Cada card leva à página interna com resumo e o link da matéria original.",
  },
  {
    id: "brasil",
    label: "Brasil",
    answer: "Brasil usa a Agência Brasil (EBC), veículo público. Política, economia e cotidiano nacional aparecem também pelos filtros do menu.",
  },
  {
    id: "mundo",
    label: "Mundo",
    answer: "Mundo vem da BBC News Brasil. O texto integral fica no site da BBC; aqui publicamos título, trecho curto e autoria da fonte.",
  },
  {
    id: "adsense",
    label: "Anúncios",
    answer: "Os espaços dizem PUBLICIDADE. Não há aposta, cassino nem jogo do bicho — isso costuma reprovar ou derrubar conta no AdSense. Cookies de anúncio estão descritos na Política de Privacidade.",
  },
  {
    id: "auto",
    label: "Automação",
    answer: "A página Automação explica a planilha e o Google Apps Script que gravam os mesmos feeds e publicam um JSON. O site ao vivo já busca os RSS no servidor a cada poucos minutos.",
  },
  {
    id: "contato",
    label: "Contato",
    answer: "Fale pela página Contato: redacao@jadeucerto.com. Para correção de uma manchete, use o link da fonte — a alteração do texto original é do veículo que publicou.",
  },
  {
    id: "privacidade",
    label: "Privacidade",
    answer: "Medimos audiência com o Google Analytics informado no site e, quando os anúncios forem ativados, o Google pode usar cookies. Detalhes e como recusar estão em Privacidade.",
  },
];

export function SupportBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Olá. Sou o apoio do Já Deu Certo. Posso explicar as editorias, anúncios, privacidade e a automação das notícias." },
  ]);

  function reply(text: string) {
    const n = text.toLowerCase();
    const hit = TOPICS.find((t) => n.includes(t.label.toLowerCase()) || n.includes(t.id));
    const extra = TOPICS.find((t) => t.answer.toLowerCase().split(" ").some((w) => w.length > 5 && n.includes(w)));
    const chosen = hit ?? extra;
    const answer = chosen
      ? chosen.answer
      : "Posso falar sobre Paraíba, Brasil, Mundo, anúncios, automação, contato e privacidade. Escolha um assunto abaixo ou escreva a palavra.";
    setMsgs((m) => [...m, { from: "user", text }, { from: "bot", text: answer }]);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[min(100%-2rem,22rem)]">
      {open && (
        <div className="mb-2 rounded-2xl border border-line bg-card shadow-xl flex flex-col h-[26rem]">
          <div className="px-3 py-2 border-b border-line flex items-center justify-between bg-forest text-paper rounded-t-2xl">
            <div>
              <p className="text-sm font-semibold">Apoio do portal</p>
              <p className="text-[11px] text-paper/80">Editorias, anúncios e privacidade</p>
            </div>
            <button className="text-sm" onClick={() => setOpen(false)} type="button">Fechar</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {msgs.map((m, i) => (
              <p key={i} className={`rounded-2xl px-3 py-2 ${m.from === "bot" ? "bg-paper" : "bg-forest text-paper ml-6"}`}>
                {m.text}
              </p>
            ))}
            <div className="flex flex-wrap gap-1 pt-1">
              {TOPICS.map((t) => (
                <button key={t.id} type="button" className="rounded-full border border-line px-2 py-1 text-xs hover:bg-paper" onClick={() => reply(t.label)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <form
            className="p-2 border-t border-line flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const text = input.trim();
              if (!text) return;
              setInput("");
              reply(text);
            }}
          >
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-full border border-line px-3 py-2 text-sm outline-none" placeholder="Escreva um tema" />
            <button className="rounded-full bg-forest text-paper px-3 text-sm" type="submit">Enviar</button>
          </form>
        </div>
      )}
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="ml-auto flex items-center gap-2 rounded-full bg-forest text-paper px-4 py-3 shadow-lg text-sm font-semibold">
          Apoio
        </button>
      )}
    </div>
  );
}
