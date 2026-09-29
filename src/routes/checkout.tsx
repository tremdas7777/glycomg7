import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import QRCode from "qrcode";
import { Check, Copy, Loader2, Lock, ShieldCheck, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { getBundle } from "@/lib/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { createPixCharge, getPixStatus, type PixCharge } from "@/lib/pix.functions";
import { trackCheckoutClick } from "@/lib/analytics";

export const Route = createFileRoute("/checkout")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Checkout Seguro — Pagamento via Pix | AiDEX" },
      { name: "description", content: "Finalize sua compra AiDEX com segurança via Pix. Frete grátis para todo o Brasil." },
      { property: "og:title", content: "Checkout Seguro | AiDEX" },
      { property: "og:description", content: "Pagamento via Pix com aprovação imediata." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const maskCpf = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskPhone = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");

const inputCls =
  "w-full rounded-xl border border-[var(--ink)]/15 bg-background px-4 py-3.5 text-[15px] outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20";

function Page() {
  const bundle = getBundle(bundleIdFromSearch(Route.useSearch()));
  const createFn = useServerFn(createPixCharge);
  const [form, setForm] = useState({ name: "", email: "", phone: "", cpf: "" });
  const [charge, setCharge] = useState<PixCharge | null>(null);

  const mutation = useMutation({
    mutationFn: () => createFn({ data: { ...form, plano: bundle.id, origin: window.location.origin } }),
    onSuccess: (c) => {
      setCharge(c);
      trackCheckoutClick({ source: "pix_generated", bundleId: bundle.id, bundleName: bundle.name, value: bundle.price });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-20">
        <div className="container-edge max-w-5xl grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="order-2 lg:order-1 rounded-2xl border border-[var(--ink)]/10 bg-card p-5 md:p-8">
            {charge ? (
              <PixPanel charge={charge} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h1 className="font-display text-3xl md:text-4xl">Seus dados</h1>
                <p className="text-sm text-[var(--ink)]/60">Preencha para gerar o Pix. Leva menos de 1 minuto.</p>
                <Field label="Nome completo">
                  <input required className={inputCls} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="E-mail">
                  <input required type="email" className={inputCls} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Celular (WhatsApp)">
                    <input required inputMode="tel" className={inputCls} placeholder="(11) 90000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })} />
                  </Field>
                  <Field label="CPF">
                    <input required inputMode="numeric" className={inputCls} placeholder="000.000.000-00" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })} />
                  </Field>
                </div>
                {mutation.isError && (
                  <p role="alert" className="text-sm text-destructive">
                    {mutation.error instanceof Error && !mutation.error.message.startsWith("[")
                      ? mutation.error.message
                      : "Confira seus dados (CPF, e-mail e celular) e tente novamente."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground hover:opacity-90 disabled:opacity-60"
                >
                  {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                  {mutation.isPending ? "Gerando Pix…" : `Pagar ${brl(bundle.price)} com Pix`}
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-[var(--ink)]/50">
                  <ShieldCheck className="h-4 w-4" /> Pagamento 100% seguro · dados criptografados
                </p>
              </form>
            )}
          </div>

          <aside className="order-1 lg:order-2 h-fit rounded-2xl border border-[var(--ink)]/10 bg-card p-5 md:p-6 lg:sticky lg:top-28">
            <span className="eyebrow text-[var(--primary)]">Resumo do pedido</span>
            <p className="mt-3 font-semibold">{bundle.checkoutProductName}</p>
            <p className="text-sm text-[var(--ink)]/60">{bundle.description}</p>
            <div className="mt-5 space-y-2 border-t border-[var(--ink)]/10 pt-4 text-sm">
              {bundle.compareAtPrice && (
                <Row label="Subtotal" value={<s className="text-[var(--ink)]/50">{brl(bundle.compareAtPrice)}</s>} />
              )}
              <Row label="Frete" value={<span className="font-semibold text-[var(--primary)]">Grátis</span>} />
              <Row label={<strong>Total</strong>} value={<strong className="text-lg">{brl(bundle.price)}</strong>} />
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-[var(--ink)]/60">
              <Truck className="h-4 w-4" /> Envio com código de rastreio
            </p>
            {!charge && (
              <Link to="/produto" search={{ plano: bundle.id }} className="mt-4 inline-block text-xs underline text-[var(--ink)]/60">
                Alterar plano
              </Link>
            )}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function PixPanel({ charge }: { charge: PixCharge }) {
  const statusFn = useServerFn(getPixStatus);
  const [img, setImg] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(charge.qrcode, { width: 280, margin: 1 }).then(setImg).catch(() => setImg(""));
  }, [charge.qrcode]);

  const { data } = useQuery({
    queryKey: ["pix-status", charge.id],
    queryFn: () => statusFn({ data: { id: charge.id } }),
    refetchInterval: (q) => (q.state.data?.status === "paid" ? false : 5000),
  });
  const paid = data?.status === "paid" || data?.status === "approved";

  if (paid) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-primary-foreground">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-3xl">Pagamento confirmado!</h2>
        <p className="mt-2 text-[var(--ink)]/70">Você receberá a confirmação e o código de rastreio por e-mail.</p>
      </div>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(charge.qrcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl">Pague com Pix</h2>
      <p className="mt-2 text-sm text-[var(--ink)]/60">Abra o app do seu banco e escaneie o QR Code ou use o Pix Copia e Cola.</p>
      <div className="mx-auto mt-6 flex h-[280px] w-[280px] items-center justify-center rounded-xl border border-[var(--ink)]/10 bg-background">
        {img ? <img src={img} alt="QR Code Pix" width={280} height={280} /> : <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
      <p className="mt-4 text-2xl font-semibold">{brl(charge.amount / 100)}</p>
      <div className="mt-4 break-all rounded-xl bg-muted p-3 text-left text-xs text-[var(--ink)]/70 select-all">{charge.qrcode}</div>
      <button
        type="button"
        onClick={copy}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground hover:opacity-90"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Código copiado!" : "Copiar código Pix"}
      </button>
      <p className="mt-5 flex items-center justify-center gap-2 text-sm text-[var(--ink)]/60">
        <Loader2 className="h-4 w-4 animate-spin" /> Aguardando pagamento… a confirmação é automática.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/60">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {value}
    </div>
  );
}
