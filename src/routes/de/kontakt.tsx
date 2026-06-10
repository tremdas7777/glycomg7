import { createFileRoute } from "@tanstack/react-router";
import { DeSiteLayout } from "@/components/de/Layout";
import { deBrand } from "@/lib/locale/de/brand";
import { dePaths } from "@/lib/locale/de/paths";

export const Route = createFileRoute("/de/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | AiDEX" },
      { name: "description", content: "Kontaktieren Sie das AiDEX Team. Persönlicher Support." },
      { property: "og:title", content: "AiDEX Kontakt" },
      { property: "og:description", content: "Kontaktieren Sie das AiDEX Team." },
      { property: "og:url", content: dePaths.contact },
    ],
    links: [{ rel: "canonical", href: dePaths.contact }],
  }),
  component: Page,
});

function Page() {
  return (
    <DeSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)]">Support</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-6 text-balance">
              Wir sind <br />
              <span className="italic">für Sie da.</span>
            </h1>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed max-w-sm">
              Unser Team antwortet innerhalb von 24 Stunden an Werktagen.
            </p>
            <ul className="mt-12 space-y-6 text-sm">
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">E-Mail</div>
                <div>{deBrand.email}</div>
              </li>
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Standort</div>
                <div>Deutschland</div>
              </li>
            </ul>
          </div>

          <form
            className="lg:col-span-7 bg-white p-10 md:p-12 border border-[rgba(13,13,13,0.08)] rounded-xl space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Nachricht gesendet!");
            }}
          >
            <Field label="Name" />
            <Field label="E-Mail" type="email" />
            <Field label="Nachricht" textarea />
            <button className="w-full bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Nachricht senden
            </button>
          </form>
        </div>
      </section>
    </DeSiteLayout>
  );
}

function Field({
  label,
  type = "text",
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-3 w-full border-0 border-b border-[rgba(13,13,13,0.2)] bg-transparent px-0 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors text-base";
  return (
    <label className="block">
      <span className="eyebrow text-[var(--ink)]/60">{label}</span>
      {textarea ? (
        <textarea required rows={5} className={cls} />
      ) : (
        <input required type={type} className={cls} />
      )}
    </label>
  );
}
