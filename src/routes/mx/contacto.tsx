import { createFileRoute } from "@tanstack/react-router";
import { MxSiteLayout } from "@/components/mx/Layout";
import { mxBrand } from "@/lib/locale/mx/brand";
import { mxPaths } from "@/lib/locale/mx/paths";

export const Route = createFileRoute("/mx/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | AiDEX" },
      { name: "description", content: "Contacta al equipo de AiDEX. Atención personal." },
      { property: "og:title", content: "Contacto AiDEX" },
      { property: "og:description", content: "Contacta al equipo de AiDEX." },
      { property: "og:url", content: mxPaths.contact },
    ],
    links: [{ rel: "canonical", href: mxPaths.contact }],
  }),
  component: Page,
});

function Page() {
  return (
    <MxSiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)]">Soporte</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-6 text-balance">
              Estamos <br />
              <span className="italic">contigo.</span>
            </h1>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed max-w-sm">
              Nuestro equipo responde en menos de 24 horas en días hábiles.
            </p>
            <ul className="mt-12 space-y-6 text-sm">
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Email</div>
                <div>{mxBrand.email}</div>
              </li>
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Ubicación</div>
                <div>México</div>
              </li>
            </ul>
          </div>

          <form
            className="lg:col-span-7 bg-white p-10 md:p-12 border border-[rgba(13,13,13,0.08)] rounded-xl space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("¡Mensaje enviado!");
            }}
          >
            <Field label="Nombre" />
            <Field label="Email" type="email" />
            <Field label="Mensaje" textarea />
            <button className="w-full bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </MxSiteLayout>
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
