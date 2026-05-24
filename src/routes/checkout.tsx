import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { bundles, getBundle, brl, type BundleId } from "@/lib/bundles";
import heroSensor from "@/assets/hero-sensor.jpg";
import { Lock, Sparkles } from "lucide-react";

const searchSchema = z.object({
  kit: z.enum(["30", "60", "90"]).optional(),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
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
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/checkout" });
  const [step, setStep] = useState(0);
  const bundle = getBundle(search.kit);

  // Upsell: suggest the next-bigger bundle
  const upsellTarget =
    bundle.id === "30" ? getBundle("60") : bundle.id === "60" ? getBundle("90") : null;

  return (
    <SiteLayout>
      <section className="pt-28 md:pt-36 pb-24">
        <div className="container-edge grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">
          <div>
            <span className="eyebrow text-[var(--ink)]/40">Pagamento Seguro</span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-10">Checkout.</h1>

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
                else alert(`Pedido confirmado! ${bundle.name} — ${brl(bundle.price)}`);
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

              <button className="w-full bg-[var(--primary)] text-white py-5 text-xs font-bold uppercase tracking-[0.22em] hover:bg-[var(--ink)] transition-all duration-300 mt-6 flex items-center justify-center gap-3">
                <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                {step < 2 ? "Continuar" : `Finalizar · ${brl(bundle.price)}`}
              </button>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/40 text-center">
                Pagamento criptografado · SSL · Compra 100% segura
              </p>
            </form>
          </div>

          {/* ====== Order summary ====== */}
          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <div className="border border-[rgba(13,13,13,0.1)] bg-white p-7">
              <h2 className="eyebrow text-[var(--ink)]/40 mb-6">Resumo do Pedido</h2>
              <div className="flex gap-4 pb-6 border-b border-[rgba(13,13,13,0.08)]">
                <img src={heroSensor} alt="Glycom G7" className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Glycom G7 CGM</div>
                  <div className="text-[11px] text-[var(--ink)]/60 mt-1">{bundle.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/45 mt-1">
                    {bundle.sensors} sensores · {bundle.days} dias
                  </div>
                </div>
                <div className="font-display text-xl">{brl(bundle.price)}</div>
              </div>

              {/* Change kit */}
              <div className="py-4 border-b border-[rgba(13,13,13,0.08)]">
                <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[var(--ink)]/60 mb-3">
                  Alterar kit
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {bundles.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => navigate({ search: { kit: b.id }, replace: true })}
                      className={`py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                        b.id === bundle.id
                          ? "bg-[var(--primary)] text-white"
                          : "border border-[rgba(13,13,13,0.15)] hover:border-[var(--ink)]"
                      }`}
                    >
                      {b.days}d
                    </button>
                  ))}
                </div>
              </div>

              <dl className="py-5 border-b border-[rgba(13,13,13,0.08)] space-y-2.5 text-sm">
                <Row k="Subtotal" v={brl(bundle.price)} />
                <Row k="Frete" v="Grátis" />
                {bundle.originalPrice && (
                  <Row k="Desconto" v={`− ${brl(bundle.originalPrice - bundle.price)}`} accent />
                )}
              </dl>

              <div className="flex justify-between items-baseline pt-5">
                <span className="text-xs font-bold uppercase tracking-[0.18em]">Total</span>
                <div className="text-right">
                  <div className="font-display text-4xl leading-none">{brl(bundle.price)}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 mt-1.5">
                    ou {bundle.installment}
                  </div>
                </div>
              </div>

              <Link to="/produto" search={{ kit: bundle.id }} className="block text-center text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/50 hover:text-[var(--ink)] mt-6">
                ← Continuar comprando
              </Link>
            </div>

            {/* Upsell card */}
            {upsellTarget && (
              <button
                onClick={() => navigate({ search: { kit: upsellTarget.id }, replace: true })}
                className="w-full text-left bg-[var(--primary)] text-white p-6 hover:bg-[var(--ink)] transition-colors group"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold opacity-70 mb-3">
                  <Sparkles className="w-3 h-3" />
                  Upgrade recomendado
                </div>
                <div className="font-display text-2xl leading-tight">
                  Leve {upsellTarget.days} dias e economize mais
                </div>
                <div className="mt-3 text-xs opacity-70">
                  +{upsellTarget.sensors - bundle.sensors} sensores · {upsellTarget.savings}
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold group-hover:tracking-[0.24em] transition-all">
                    Trocar kit →
                  </span>
                  <span className="font-display text-xl">{brl(upsellTarget.price)}</span>
                </div>
              </button>
            )}
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

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--ink)]/60">{k}</dt>
      <dd className={accent ? "text-[var(--primary)] font-semibold" : "text-[var(--ink)]/80"}>{v}</dd>
    </div>
  );
}
