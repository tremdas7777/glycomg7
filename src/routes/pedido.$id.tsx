import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import QRCode from "qrcode";
import logo from "@/assets/aidex-logo.png";
import pixWaiting from "@/assets/pix-waiting.png";
import { getPixStatus } from "@/lib/pix.functions";
import { loadPixSession, type PixSession } from "@/lib/pix-session";
import { trackCheckoutClick } from "@/lib/analytics";
import { brl, CheckoutFooter } from "@/components/checkout/parts";

export const Route = createFileRoute("/pedido/$id")({
  head: () => ({
    meta: [
      { title: "Pedido | AiDEX" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const EXPIRES_MS = 30 * 60 * 1000;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (event: string, data?: Record<string, unknown>) => void };
};

function Page() {
  const { id } = Route.useParams();
  const [session] = useState<PixSession | null>(() => loadPixSession(id));
  const statusFn = useServerFn(getPixStatus);

  const { data } = useQuery({
    queryKey: ["pix-status", id],
    queryFn: () => statusFn({ data: { id } }),
    refetchInterval: 5000,
    enabled: !!id,
  });

  const status = data?.status ?? "waiting_payment";
  const paid = status === "paid" || status === "approved";
  const refused = status === "failed" || status === "refused" || status === "canceled" || status === "cancelled";

  // Dispara os eventos de compra uma única vez quando o pagamento cai.
  useEffect(() => {
    if (!paid) return;
    const value = (session?.amount ?? 0) / 100;
    const w = window as DataLayerWindow;
    try {
      w.fbq?.("track", "Purchase", { value, currency: "BRL" });
      w.ttq?.track("CompletePayment", { value, currency: "BRL" });
      w.dataLayer?.push({ event: "purchase", currency: "BRL", value });
    } catch {
      // pixels indisponíveis
    }
    if (session) {
      trackCheckoutClick({
        source: "pix_paid",
        bundleId: session.bundleId as never,
        bundleName: session.bundleName,
        value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  if (paid) return <ThankYou session={session} />;
  if (refused) return <Refused />;
  return <WaitingPix session={session} />;
}

function Pill({ variant }: { variant: "waiting" | "approved" | "refused" }) {
  const map = {
    waiting: { text: "Aguardando pagamento", cls: "bg-[#fdf3d1] text-[#8a6a12]" },
    approved: { text: "Aprovado", cls: "bg-[var(--ck-badge)] text-[var(--ck-ok)]" },
    refused: { text: "Pagamento não aprovado", cls: "bg-red-100 text-red-700" },
  } as const;
  const v = map[variant];
  return <span className={`inline-block rounded-full px-5 py-2 text-[13px] font-semibold ${v.cls}`}>{v.text}</span>;
}

/** Tela "Quase lá..." — igual à do checkout antigo enquanto o Pix não cai. */
function WaitingPix({ session }: { session: PixSession | null }) {
  const [img, setImg] = useState("");
  const [copied, setCopied] = useState(false);
  // Começa como null para o HTML do servidor e a primeira renderização do
  // navegador serem idênticas (evita erro de hidratação na contagem regressiva).
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!session?.qrcode) return;
    QRCode.toDataURL(session.qrcode, { width: 240, margin: 1 }).then(setImg).catch(() => setImg(""));
  }, [session?.qrcode]);

  const remaining = useMemo(() => {
    if (!session || now === null) return EXPIRES_MS;
    return Math.max(0, EXPIRES_MS - (now - session.createdAt));
  }, [now, session]);

  const mmss = `${String(Math.floor(remaining / 60000)).padStart(2, "0")}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}`;

  const copy = async () => {
    if (!session?.qrcode) return;
    await navigator.clipboard.writeText(session.qrcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-4 pb-20 text-center">
        <h1 className="text-[28px] font-bold tracking-tight">Quase lá...</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pague via pix em até <b className="text-foreground">{mmss}</b> para confirmar seu pedido.
        </p>
        <div className="mt-4">
          <Pill variant="waiting" />
        </div>

        <img src={pixWaiting} alt="" width={220} height={220} className="mx-auto mt-4 h-[220px] w-[220px]" loading="lazy" />

        {session ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">Aponte a câmera do seu celular</p>
            <div className="mx-auto mt-3 flex h-[240px] w-[240px] items-center justify-center rounded-lg border border-border bg-white">
              {img ? <img src={img} alt="QR Code Pix" width={240} height={240} /> : <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Total via Pix: <b className="text-[15px] text-[var(--ck-ok)]">{brl(session.amount / 100)}</b>
            </p>
            <div className="mt-4 truncate rounded-lg bg-muted px-4 py-3 text-left text-[12px] text-muted-foreground">{session.qrcode}</div>
            <button
              type="button"
              onClick={copy}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ck-green)] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:opacity-90"
            >
              <Copy className="h-4 w-4" /> {copied ? "Código copiado!" : "Copiar código"}
            </button>

            <div className="mt-10 text-left">
              <h2 className="text-[17px] font-bold">Como pagar o pix</h2>
              <ol className="mt-4 space-y-4">
                {[
                  <>Clique em <b>cópiar o código</b>, logo acima</>,
                  <>Abra o <b>aplicativo</b> do seu banco</>,
                  <>Selecione a opção <b>PIX</b></>,
                  <>Toque em <b>"Pix Copia e Cola"</b></>,
                  <>Insira o código copiado e finalize seu pagamento</>,
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ck-green)] text-[13px] font-semibold text-white">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-lg border border-border p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Sessão do Pix não encontrada neste dispositivo.</p>
            <p className="mt-2">Estamos acompanhando seu pagamento. Assim que for confirmado, esta página se atualiza sozinha.</p>
            <Link to="/checkout" className="mt-4 inline-block text-[var(--ck-ok)] underline">Voltar ao checkout</Link>
          </div>
        )}
      </div>
    </Shell>
  );
}

/** Página de obrigado — mostrada assim que o pagamento é reconhecido. */
function ThankYou({ session }: { session: PixSession | null }) {
  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-4 pb-20 text-center">
        <div className="mt-2"><Pill variant="approved" /></div>
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ck-ok)] text-white">
          <Check className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-[28px] font-bold tracking-tight">Pedido confirmado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Você receberá em instantes um e-mail em <b className="text-foreground">{session?.email ?? "seu e-mail"}</b> com os detalhes do seu pedido.
        </p>

        {session && (
          <div className="mt-8 rounded-lg border border-border bg-white p-6 text-left">
            <h2 className="mb-4 text-[15px] font-semibold">Resumo do pedido</h2>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Produtos</span><span>{brl(session.productPrice)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-[var(--ck-ok)]">{session.frete ? brl(session.frete) : "Grátis"}</span></div>
              {session.discount > 0 && (
                <div className="flex justify-between"><span className="text-muted-foreground">Descontos</span><span className="text-[var(--ck-ok)]">-{brl(session.discount)}</span></div>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><span>Total</span><span>{brl(session.amount / 100)}</span></div>
            </div>
            <div className="mt-5 border-t border-border pt-5 text-[13px]">
              <p className="font-medium">{session.bundleName} — Monitoramento Contínuo de Glicose</p>
              <p className="mt-1 text-muted-foreground">{session.months} {session.months > 1 ? "Meses" : "Mês"} · {session.sensors} Sensores</p>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          Obrigado pela compra! Seu pedido será preparado e você acompanhará o envio pelo e-mail de confirmação.
        </p>
      </div>
    </Shell>
  );
}

function Refused() {
  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-4 pb-20 text-center">
        <div className="mt-2"><Pill variant="refused" /></div>
        <h1 className="mt-6 text-[24px] font-bold">Pagamento não aprovado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Analise todos os dados informados para o pagamento.</p>
        <Link
          to="/checkout"
          className="mt-6 inline-block rounded-lg bg-[var(--ck-green)] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:opacity-90"
        >
          Revisar dados
        </Link>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ck flex min-h-screen flex-col bg-white text-foreground">
      <header className="flex justify-center py-6 md:py-8">
        <img src={logo} alt="AiDEX" className="h-10 w-auto md:h-12" />
      </header>
      <main className="flex-1 pt-4">{children}</main>
      <CheckoutFooter />
    </div>
  );
}
