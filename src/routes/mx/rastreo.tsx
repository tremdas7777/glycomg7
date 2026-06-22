import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { useState } from "react";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/rastreo")({
  head: () => ({
    meta: [
      { title: "Rastrear envío | AiDEX" },
      { name: "description", content: "Rastrea el envío de tu pedido AiDEX." },
      { property: "og:title", content: "Rastrear envío" },
      { property: "og:description", content: "Da seguimiento a tu pedido." },
      { property: "og:url", content: mxPaths.tracking },
    ],
    links: [{ rel: "canonical", href: mxPaths.tracking }],
  }),
  component: Page,
});

function Page() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <MxSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge max-w-2xl">
          <span className="eyebrow text-[var(--primary)] block mb-6">Rastreo de pedido</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
            Rastrea <span className="italic">tu pedido.</span>
          </h1>
          <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
            Ingresa el código de seguimiento que recibiste por email después del envío.
          </p>

          <form
            className="mt-12 border-y border-[rgba(13,13,13,0.1)] py-6 flex gap-4 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="MX123456789"
              className="flex-1 bg-transparent border-0 outline-none text-lg placeholder:text-[var(--ink)]/30"
            />
            <button className="bg-[var(--primary)] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Rastrear
            </button>
          </form>

          {searched && (
            <div className="mt-16">
              <div className="eyebrow text-[var(--ink)]/40 mb-4">Estado</div>
              <div className="font-display text-3xl mb-2">Pedido en tránsito.</div>
              <p className="text-sm text-[var(--ink)]/50 mb-10">Actualizado hace 2 horas</p>
              <ol className="space-y-px bg-[rgba(13,13,13,0.08)]">
                {[
                  ["Enviado", "Centro de distribución", true],
                  ["En tránsito", "En camino a tu ciudad", true],
                  ["En reparto", "Pendiente", false],
                  ["Entregado", "Pendiente", false],
                ].map(([title, sub, done], i) => (
                  <li key={i} className="bg-white p-6 flex items-center gap-6">
                    <span
                      className={`font-display italic text-2xl ${done ? "text-[var(--primary)]" : "text-[var(--ink)]/30"}`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <div
                        className={`text-sm font-semibold ${done ? "" : "text-[var(--ink)]/40"}`}
                      >
                        {title}
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink)]/40 mt-1">
                        {sub}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    </MxSiteLayout>
  );
}
