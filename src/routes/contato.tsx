import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Glycom" },
      { name: "description", content: "Fale com a equipe Glycom. Suporte dedicado, atendimento humano." },
      { property: "og:title", content: "Contato Glycom" },
      { property: "og:description", content: "Fale com a equipe Glycom." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="pt-32 md:pt-44 pb-24">
        <div className="container-edge grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow text-[var(--primary)]">Suporte Médico</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-6 text-balance">
              Estamos aqui <br /><span className="italic">para ajudar.</span>
            </h1>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed max-w-sm">
              Nossa equipe clínica responde em até 24 horas em dias úteis.
            </p>
            <ul className="mt-12 space-y-6 text-sm">
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Email</div>
                <div>contato@glycom.com.br</div>
              </li>
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">WhatsApp</div>
                <div>+55 (11) 90000-0000</div>
              </li>
              <li className="border-b border-[rgba(13,13,13,0.08)] pb-5">
                <div className="eyebrow text-[var(--ink)]/40 mb-2">Endereço</div>
                <div>São Paulo, SP — Brasil</div>
              </li>
            </ul>
          </div>

          <form
            className="lg:col-span-7 bg-white p-10 md:p-12 border border-[rgba(13,13,13,0.08)] rounded-xl space-y-8"
            onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada!"); }}
          >
            <Field label="Nome" />
            <Field label="Email" type="email" />
            <Field label="Mensagem" textarea />
            <button className="w-full bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-colors">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", textarea }: { label: string; type?: string; textarea?: boolean }) {
  const cls = "mt-3 w-full border-0 border-b border-[rgba(13,13,13,0.2)] bg-transparent px-0 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors text-base";
  return (
    <label className="block">
      <span className="eyebrow text-[var(--ink)]/60">{label}</span>
      {textarea ? <textarea required rows={5} className={cls} /> : <input required type={type} className={cls} />}
    </label>
  );
}
