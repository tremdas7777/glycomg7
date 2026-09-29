import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import logo from "@/assets/aidex-logo.png";
import { getBundle } from "@/lib/bundles";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { createPixCharge, FRETE_FULL, PIX_DISCOUNT, type PixCharge } from "@/lib/pix.functions";
import { savePixSession } from "@/lib/pix-session";
import { trackCheckoutClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { brl, Card, CardHead, CheckoutFooter, Field, GreenButton, PixIcon } from "@/components/checkout/parts";
import { SummaryDesktop, SummaryMobile } from "@/components/checkout/Summary";

export const Route = createFileRoute("/checkout")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Checkout Seguro | AiDEX" },
      { name: "description", content: "Finalize sua compra AiDEX com segurança. Pix com 10% de desconto e frete grátis." },
      { property: "og:title", content: "Checkout Seguro | AiDEX" },
      { property: "og:description", content: "Pix com 10% de desconto e frete grátis para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const digits = (v: string) => v.replace(/\D/g, "");
const maskCpf = (v: string) =>
  digits(v).slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskPhone = (v: string) => digits(v).slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
const maskCep = (v: string) => digits(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Step = 1 | 2 | 3;
type Addr = { cep: string; rua: string; numero: string; bairro: string; complemento: string; cidade: string; uf: string };

function Page() {
  const navigate = useNavigate();
  const bundle = getBundle(bundleIdFromSearch(Route.useSearch()));
  const [step, setStep] = useState<Step>(1);
  const [id, setId] = useState({ name: "", email: "", cpf: "", phone: "" });
  const [addr, setAddr] = useState<Addr>({ cep: "", rua: "", numero: "", bairro: "", complemento: "", cidade: "", uf: "" });
  const [frete, setFrete] = useState<"gratis" | "full">("gratis");
  const [method, setMethod] = useState<"pix" | "card">("pix");
  const createFn = useServerFn(createPixCharge);

  const freteValue = frete === "full" ? FRETE_FULL : 0;
  const discount = step >= 2 && method === "pix" ? Math.round(bundle.price * PIX_DISCOUNT * 100) / 100 : 0;
  const pixTotal = bundle.price - Math.round(bundle.price * PIX_DISCOUNT * 100) / 100 + freteValue;

  // Busca de endereço pelo CEP (ViaCEP, API pública)
  useEffect(() => {
    const c = digits(addr.cep);
    if (c.length !== 8) return;
    let alive = true;
    fetch(`https://viacep.com.br/ws/${c}/json/`)
      .then((r) => r.json())
      .then((j) => {
        if (!alive || j.erro) return;
        setAddr((a) => ({ ...a, rua: a.rua || j.logradouro, bairro: a.bairro || j.bairro, cidade: j.localidade, uf: j.uf }));
      })
      .catch(() => undefined);
    return () => { alive = false; };
  }, [addr.cep]);

  const idValid = id.name.trim().split(" ").length >= 2 && emailOk(id.email) && digits(id.cpf).length === 11 && digits(id.phone).length >= 10;
  const addrValid = digits(addr.cep).length === 8 && addr.rua && addr.numero && addr.bairro;

  const mutation = useMutation({
    mutationFn: () =>
      createFn({
        data: {
          ...id,
          plano: bundle.id,
          frete,
          origin: window.location.origin,
          endereco: `${addr.rua}, ${addr.numero} ${addr.complemento} - ${addr.bairro}, ${addr.cidade}/${addr.uf} ${addr.cep}`,
        },
      }),
    onSuccess: (c) => {
      savePixSession({
        id: c.id,
        qrcode: c.qrcode,
        amount: c.amount,
        email: id.email,
        name: id.name,
        bundleId: bundle.id,
        bundleName: bundle.name,
        sensors: bundle.sensors,
        months: bundle.months,
        productPrice: bundle.price,
        frete: freteValue,
        discount,
        createdAt: Date.now(),
      });
      trackCheckoutClick({ source: "pix_generated", bundleId: bundle.id, bundleName: bundle.name, value: pixTotal });
      navigate({ to: "/pedido/$id", params: { id: c.id }, replace: true });
    },
  });

  const submitId = (e: FormEvent) => { e.preventDefault(); if (idValid) setStep(addrValid ? 3 : 2); };
  const submitAddr = (e: FormEvent) => { e.preventDefault(); if (addrValid) setStep(3); };

  const idCard =
    step === 1 ? (
      <Card>
        <CardHead title="Identificação" step="1 de 3" sub="Preencha seus dados para envio do pedido." />
        <form onSubmit={submitId} className="mt-6 space-y-4">
          <Field label="Nome completo" autoComplete="name" required value={id.name} ok={id.name.trim().split(" ").length >= 2} onChange={(e) => setId({ ...id, name: e.target.value })} />
          <Field label="E-mail" type="email" autoComplete="email" required value={id.email} ok={emailOk(id.email)} onChange={(e) => setId({ ...id, email: e.target.value })} />
          <Field label="CPF" wrap="sm:max-w-[240px]" inputMode="numeric" required value={id.cpf} ok={digits(id.cpf).length === 11} onChange={(e) => setId({ ...id, cpf: maskCpf(e.target.value) })} />
          <Field label="Celular/Whatsapp" wrap="sm:max-w-[240px]" prefix="+55" inputMode="tel" required value={id.phone} ok={digits(id.phone).length >= 10} onChange={(e) => setId({ ...id, phone: maskPhone(e.target.value) })} />
          <GreenButton type="submit" disabled={!idValid}>Ir Para Entrega</GreenButton>
        </form>
      </Card>
    ) : (
      <Card done>
        <CardHead title="Identificação" onEdit={() => setStep(1)} />
        <p className="mt-3 text-[13px] font-semibold">{id.name}</p>
        <p className="mt-1 text-[13px]">{id.email}</p>
        <p className="mt-1 text-[13px]">{id.phone}</p>
      </Card>
    );

  const addrCard =
    step === 2 ? (
      <Card>
        <CardHead title="Entrega" step="2 de 3" sub="Informe o endereço de entrega" />
        <form onSubmit={submitAddr} className="mt-6 space-y-4">
          <div className="flex items-end gap-4">
            <Field label="CEP" wrap="w-2/3" inputMode="numeric" required value={addr.cep} ok={digits(addr.cep).length === 8} onChange={(e) => setAddr({ ...addr, cep: maskCep(e.target.value) })} />
            {addr.uf && <span className="pb-3.5 text-xs">{addr.uf}/{addr.cidade}</span>}
          </div>
          <Field label="Endereço" required value={addr.rua} ok={!!addr.rua} onChange={(e) => setAddr({ ...addr, rua: e.target.value })} />
          <div className="flex gap-2">
            <Field label="N°" wrap="w-1/4" required value={addr.numero} ok={!!addr.numero} onChange={(e) => setAddr({ ...addr, numero: e.target.value })} />
            <Field label="Bairro" wrap="flex-1" required value={addr.bairro} ok={!!addr.bairro} onChange={(e) => setAddr({ ...addr, bairro: e.target.value })} />
          </div>
          <Field label={<>Complemento <span className="text-[11px] text-muted-foreground">(Opcional)</span></>} value={addr.complemento} onChange={(e) => setAddr({ ...addr, complemento: e.target.value })} />
          <p className="pt-2 text-base font-medium">Escolha o frete:</p>
          {([
            ["gratis", "Frete Grátis", "5 a 8 dias", "Grátis"],
            ["full", "Frete Full", "3 a 5 dias", brl(FRETE_FULL)],
          ] as const).map(([v, t, d, p]) => (
            <button key={v} type="button" onClick={() => setFrete(v)} className={cn("flex w-full items-center gap-4 rounded-lg border px-4 py-5 text-left", frete === v ? "border-[var(--ck-blue)] bg-muted/60" : "border-border")}>
              <Radio on={frete === v} />
              <span className="flex-1"><span className="block text-[13px] font-medium">{t}</span><span className="text-[11px] text-muted-foreground">{d}</span></span>
              <span className="text-[13px] font-semibold">{p}</span>
            </button>
          ))}
          <GreenButton type="submit" disabled={!addrValid}>Ir Para Pagamento</GreenButton>
        </form>
      </Card>
    ) : step === 3 ? (
      <Card done>
        <CardHead title="Enviar para" onEdit={() => setStep(2)} />
        <p className="mt-3 text-[13px]">{addr.rua}, {addr.numero}{addr.complemento && ` - ${addr.complemento}`}</p>
        <p className="mt-1 text-[13px]">{addr.bairro}, {addr.cidade}/{addr.uf} {addr.cep}</p>
        <p className="mt-4 text-[13px] font-semibold">Frete selecionado</p>
        <p className="text-[13px]">{frete === "full" ? `Frete Full - ${brl(FRETE_FULL)}` : "Frete Grátis - Grátis"}</p>
      </Card>
    ) : (
      <Card muted>
        <CardHead title="Entrega" step="2 de 3" sub="Preencha os dados pessoais para continuar" muted />
      </Card>
    );

  const payCard =
    step < 3 ? (
      <Card muted={step === 1}>
        <CardHead title="Pagamento" step="3 de 3" muted={step === 1} sub={step === 1 ? "Preencha os dados de entrega para continuar" : "Todas as transações são seguras e criptografadas."} />
      </Card>
    ) : (
      <Card>
        <CardHead title="Pagamento" step="3 de 3" sub="Todas as transações são seguras e criptografadas." />
        {charge ? (
          <PixPanel charge={charge} />
        ) : (
          <div className="mt-6 space-y-6">
            <div className={cn("relative rounded-lg border", method === "pix" ? "border-[var(--ck-blue)] bg-muted/60" : "border-border")}>
              <span className="absolute -top-2.5 right-1.5 rounded-full bg-[var(--ck-badge)] px-3 py-0.5 text-[9px] font-semibold tracking-wide">10% DE DESCONTO</span>
              <button type="button" onClick={() => setMethod("pix")} className="flex w-full items-center gap-3 p-3">
                <Radio on={method === "pix"} />
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"><PixIcon className="h-5 w-5" /></span>
                <span className="text-[15px]">PIX</span>
              </button>
              {method === "pix" && (
                <div className="px-3 pb-3">
                  <p className="px-4 pt-4 text-sm text-muted-foreground">O código Pix expira em 30 minutos após finalizar a compra.</p>
                  <p className="px-4 py-4 text-sm text-muted-foreground">Valor no Pix: <b className="text-[var(--ck-green)]">{brl(pixTotal)}</b></p>
                  {mutation.isError && <p role="alert" className="px-4 pb-3 text-sm text-destructive">Não foi possível gerar o Pix agora. Confira seus dados e tente novamente.</p>}
                  <GreenButton type="button" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Finalizar Compra
                  </GreenButton>
                </div>
              )}
            </div>
            <div className={cn("rounded-lg border", method === "card" ? "border-[var(--ck-blue)] bg-muted/60" : "border-border")}>
              <button type="button" onClick={() => setMethod("card")} className="flex w-full items-center gap-3 p-3">
                <Radio on={method === "card"} />
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"><CreditCard className="h-4 w-4" /></span>
                <span className="text-[15px]">Cartão de crédito</span>
              </button>
              {method === "card" && (
                <p className="px-6 pb-5 text-sm text-muted-foreground">Pagamento com cartão indisponível no momento. Pague com Pix e ganhe 10% de desconto.</p>
              )}
            </div>
          </div>
        )}
      </Card>
    );

  return (
    <div className="ck flex min-h-screen flex-col text-foreground">
      <header className="flex justify-center py-6 md:py-10">
        <img src={logo} alt="AiDEX" className="h-10 w-auto md:h-12" />
      </header>
      <SummaryMobile bundle={bundle} frete={freteValue} discount={discount} />
      <main className="mx-auto grid w-full max-w-[1160px] gap-4 px-3 pb-24 pt-2 md:px-4 lg:grid-cols-3 lg:gap-4">
        <div className="space-y-5">{idCard}{addrCard}</div>
        <div>{payCard}</div>
        <SummaryDesktop bundle={bundle} frete={freteValue} discount={discount} />
      </main>
      <CheckoutFooter />
    </div>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={cn("flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border", on ? "border-[var(--ck-blue)]" : "border-muted-foreground/50")}>
      {on && <span className="h-2.5 w-2.5 rounded-full bg-[var(--ck-blue)]" />}
    </span>
  );
}

function PixPanel({ charge }: { charge: PixCharge }) {
  const statusFn = useServerFn(getPixStatus);
  const [img, setImg] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    QRCode.toDataURL(charge.qrcode, { width: 240, margin: 1 }).then(setImg).catch(() => setImg(""));
  }, [charge.qrcode]);
  const { data } = useQuery({
    queryKey: ["pix-status", charge.id],
    queryFn: () => statusFn({ data: { id: charge.id } }),
    refetchInterval: (q) => (q.state.data?.status === "paid" ? false : 5000),
  });
  if (data?.status === "paid" || data?.status === "approved") {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ck-green)] text-primary-foreground"><Check className="h-7 w-7" /></div>
        <p className="mt-4 text-lg font-semibold">Pagamento confirmado!</p>
        <p className="mt-1 text-sm text-muted-foreground">Você receberá a confirmação e o rastreio por e-mail.</p>
      </div>
    );
  }
  const copy = async () => { await navigator.clipboard.writeText(charge.qrcode); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-muted-foreground">Escaneie o QR Code no app do seu banco ou use o Pix Copia e Cola.</p>
      <div className="mx-auto mt-4 flex h-[240px] w-[240px] items-center justify-center rounded-lg border border-border">
        {img ? <img src={img} alt="QR Code Pix" width={240} height={240} /> : <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
      <p className="mt-3 text-lg font-semibold text-[var(--ck-green)]">{brl(charge.amount / 100)}</p>
      <div className="mt-3 break-all rounded-lg bg-muted p-3 text-left text-[11px] text-muted-foreground">{charge.qrcode}</div>
      <div className="mt-4"><GreenButton type="button" onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Código copiado!" : "Copiar código Pix"}</GreenButton></div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Aguardando pagamento… a confirmação é automática.</p>
    </div>
  );
}
