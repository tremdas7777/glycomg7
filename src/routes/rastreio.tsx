import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";

export const Route = createFileRoute("/rastreio")({
  head: () => ({
    meta: [
      { title: "Rastrear Pedido | Glycom" },
      { name: "description", content: "Acompanhe a entrega do seu pedido Glycom." },
      { property: "og:title", content: "Rastrear Pedido" },
      { property: "og:description", content: "Acompanhe a entrega do seu pedido." },
      { property: "og:url", content: "/rastreio" },
    ],
    links: [{ rel: "canonical", href: "/rastreio" }],
  }),
  component: Page,
});

function Page() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <SiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge max-w-2xl">
          <span className="eyebrow text-[var(--primary)] block mb-6">Rastreio</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
            Acompanhe o <span className="italic">seu pedido.</span>
          </h1>
          <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
            Informe o código de rastreio enviado por email após o despacho.
          </p>

          <form
            className="mt-12 border-y border-[rgba(13,13,13,0.1)] py-6 flex gap-4 items-center"
            onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="GLY123456789BR"
              className="flex-1 bg-transparent border-0 outline-none text-lg placeholder:text-[var(--ink)]/30"
            />
            <button className="bg-[var(--ink)] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-colors">
              Rastrear
            </button>
          </form>

          {searched && (
            <div className="mt-16">
              <div className="eyebrow text-[var(--ink)]/40 mb-4">Status</div>
              <div className="font-display text-3xl mb-2">Pedido em trânsito.</div>
              <p className="text-sm text-[var(--ink)]/50 mb-10">Atualizado há 2 horas</p>
              <ol className="space-y-px bg-[rgba(13,13,13,0.08)]">
                {[
                  ["Despachado", "Centro de distribuição SP", true],
                  ["Em trânsito", "A caminho da sua cidade", true],
                  ["Saiu para entrega", "Aguardando", false],
                  ["Entregue", "Aguardando", false],
                ].map(([title, sub, done], i) => (
                  <li key={i} className="bg-white p-6 flex items-center gap-6">
                    <span className={`font-display italic text-2xl ${done ? "text-[var(--primary)]" : "text-[var(--ink)]/30"}`}>
                      0{i + 1}
                    </span>
                    <div>
                      <div className={`text-sm font-semibold ${done ? "" : "text-[var(--ink)]/40"}`}>{title}</div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">{sub}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
