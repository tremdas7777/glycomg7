import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ShieldCheck, Lock, Truck, CreditCard, Check } from "lucide-react";
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
      <section className="py-12 md:py-16">
        <div className="container-edge grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Checkout</h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5" /> SSL Seguro
              </div>
            </div>

            <div className="flex items-center gap-2 mb-10">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full grid place-items-center text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
                  {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
                </div>
              ))}
            </div>

            <form
              className="space-y-5"
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
                  <div className="rounded-2xl border border-border p-5 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">Cartão de crédito</span>
                    <span className="ml-auto text-xs text-muted-foreground">Até 12x sem juros</span>
                  </div>
                  <Field label="Número do cartão" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Validade" placeholder="MM/AA" />
                    <Field label="CVV" />
                  </div>
                  <Field label="Nome no cartão" />
                </>
              )}

              <button className="btn-primary w-full !py-4 text-base mt-4">
                {step < 2 ? "Continuar" : "Finalizar Compra"}
              </button>
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Pagamento processado com criptografia de ponta
              </p>
            </form>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h2 className="text-sm font-semibold mb-5">Resumo do pedido</h2>
              <div className="flex gap-4 pb-5 border-b border-border">
                <img src={heroSensor} alt="Glycom G7" className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Kit 60 Dias</div>
                  <div className="text-xs text-muted-foreground">4 Sensores Glycom G7 CGM</div>
                </div>
                <div className="text-sm font-semibold">R$697</div>
              </div>
              <dl className="space-y-2 py-5 border-b border-border text-sm">
                <Row k="Subtotal" v="R$697,00" />
                <Row k="Frete" v="Grátis" muted />
                <Row k="Desconto" v="—" muted />
              </dl>
              <div className="flex justify-between items-baseline pt-5">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-semibold">R$697</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] text-center text-muted-foreground">
                <div className="rounded-lg border border-border p-2"><Lock className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />SSL</div>
                <div className="rounded-lg border border-border p-2"><Truck className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />Rastreado</div>
                <div className="rounded-lg border border-border p-2"><ShieldCheck className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />Garantia</div>
              </div>
              <Link to="/produto" className="block text-center text-xs text-muted-foreground hover:text-foreground mt-5">
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
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={muted ? "text-muted-foreground" : ""}>{v}</dd>
    </div>
  );
}
