import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import heroSensor from "@/assets/hero-sensor.jpg";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout Seguro | Glycom" },
      { name: "description", content: "Finalize sua compra Glycom com segurança." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Page,
});

const steps = ["Identificação", "Entrega", "Pagamento"];

function Page() {
  const [step, setStep] = useState(0);

  return (
    <SiteLayout>
      <section className="pt-32 md:pt-40 pb-24">
        <div className="container-edge grid lg:grid-cols-[1fr_400px] gap-16">
          <div>
            <span className="eyebrow text-[var(--ink)]/40">Pagamento Seguro</span>
            <h1 className="font-display text-5xl md:text-6xl mt-4 mb-12">Checkout.</h1>

            <div className="flex items-center gap-2 mb-12 border-t border-b border-[rgba(13,13,13,0.1)] py-5">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3 flex-1">
                  <span className={`font-display italic text-2xl ${i <= step ? "text-[var(--primary)]" : "text-[var(--ink)]/30"}`}>
                    0{i + 1}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.18em] font-bold ${i === step ? "text-[var(--ink)]" : "text-[var(--ink)]/40"}`}>
                    {s}
                  </span>
                  {i < steps.length - 1 && <div className="flex-1 h-px bg-[rgba(13,13,13,0.1)]" />}
                </div>
              ))}
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 2) setStep(step + 1);
                else alert("Pedido confirmado!");
              }}
            >
              {step === 0 && (
                <>
                  <Field label="Email" type="email" />
                  <Field label="Nome completo" />
                  <Field label="CPF" />
                  <Field label="Telefone" />
                </>
              )}
              {step === 1 && (
                <>
                  <Field label="CEP" />
                  <Field label="Endereço" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Número" />
                    <Field label="Complemento" />
                  </div>
                  <Field label="Cidade" />
                </>
              )}
              {step === 2 && (
                <>
                  <div className="border border-[rgba(13,13,13,0.1)] p-5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.18em]">Cartão de Crédito</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50">Até 12x sem juros</span>
                  </div>
                  <Field label="Número do cartão" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Validade" placeholder="MM/AA" />
                    <Field label="CVV" />
                  </div>
                  <Field label="Nome no cartão" />
                </>
              )}

              <button className="w-full bg-[var(--ink)] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-colors mt-6">
                {step < 2 ? "Continuar" : "Finalizar Compra"}
              </button>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/40 text-center">
                Pagamento criptografado · SSL
              </p>
            </form>
          </div>

          <aside className="lg:sticky lg:top-32 self-start">
            <div className="border border-[rgba(13,13,13,0.1)] bg-white p-8">
              <h2 className="eyebrow text-[var(--ink)]/40 mb-6">Resumo do Pedido</h2>
              <div className="flex gap-4 pb-6 border-b border-[rgba(13,13,13,0.08)]">
                <img src={heroSensor} alt="Glycom G7" className="w-16 h-16 object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Kit Bio 60</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 mt-1">4 Sensores Glycom G7</div>
                </div>
                <div className="font-display text-xl">R$697</div>
              </div>
              <dl className="py-6 border-b border-[rgba(13,13,13,0.08)] space-y-3 text-sm">
                <Row k="Subtotal" v="R$697,00" />
                <Row k="Frete" v="Grátis" />
                <Row k="Desconto" v="—" />
              </dl>
              <div className="flex justify-between items-baseline pt-6">
                <span className="text-xs font-bold uppercase tracking-[0.18em]">Total</span>
                <span className="font-display text-4xl">R$697</span>
              </div>
              <Link to="/produto" className="block text-center text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 hover:text-[var(--ink)] mt-8">
                ← Continuar comprando
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[var(--ink)]/60">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full border-0 border-b border-[rgba(13,13,13,0.2)] bg-transparent px-0 py-3 text-base focus:outline-none focus:border-[var(--ink)] transition-colors"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[var(--ink)]/70">
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
