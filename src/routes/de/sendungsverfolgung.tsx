import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { useState } from "react";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/sendungsverfolgung")({
  head: () => ({
    meta: [
      { title: "Sendung verfolgen | AiDEX" },
      { name: "description", content: "Verfolgen Sie die Lieferung Ihrer AiDEX Bestellung." },
      { property: "og:title", content: "Sendung verfolgen" },
      { property: "og:description", content: "Verfolgen Sie Ihre Bestellung." },
      { property: "og:url", content: dePaths.tracking },
    ],
    links: [{ rel: "canonical", href: dePaths.tracking }],
  }),
  component: Page,
});

function Page() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <DeSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge max-w-2xl">
          <span className="eyebrow text-[var(--primary)] block mb-6">Sendungsverfolgung</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance">
            Verfolgen Sie <span className="italic">Ihre Bestellung.</span>
          </h1>
          <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
            Geben Sie den Sendungsverfolgungscode ein, den Sie per E-Mail nach dem Versand erhalten
            haben.
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
              placeholder="DE123456789"
              className="flex-1 bg-transparent border-0 outline-none text-lg placeholder:text-[var(--ink)]/30"
            />
            <button className="bg-[var(--primary)] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Verfolgen
            </button>
          </form>

          {searched && (
            <div className="mt-16">
              <div className="eyebrow text-[var(--ink)]/40 mb-4">Status</div>
              <div className="font-display text-3xl mb-2">Bestellung unterwegs.</div>
              <p className="text-sm text-[var(--ink)]/50 mb-10">Vor 2 Stunden aktualisiert</p>
              <ol className="space-y-px bg-[rgba(13,13,13,0.08)]">
                {[
                  ["Versendet", "Verteilzentrum", true],
                  ["Unterwegs", "Auf dem Weg zu Ihrer Stadt", true],
                  ["Zur Zustellung", "Ausstehend", false],
                  ["Zugestellt", "Ausstehend", false],
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
    </DeSiteLayout>
  );
}
