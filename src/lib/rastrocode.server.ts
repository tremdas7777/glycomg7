// Integração RastroCode — somente servidor. Envia o pedido pago para gerar
// o rastreio. A chave NUNCA vai para o frontend: lemos process.env aqui,
// e este arquivo é importado apenas por módulos *.server.ts.
const API = "https://app.rastrocode.site/api/v1/orders";

export type RastroAddress = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
};

export type RastroResult = { ok: boolean; trackingCode?: string; error?: string };

/** Envia o pedido pago à RastroCode. Nunca lança: devolve ok/erro para gravar em report_result.rastro. */
export async function sendRastrocodeOrder(o: {
  orderId: string;
  customer: { name: string; email: string; phone: string; document: string };
  address?: RastroAddress;
  items: { name: string; quantity: number; priceCents: number }[];
  amountCents: number;
}): Promise<RastroResult> {
  const key = process.env["RASTROCODE_API_KEY"];
  if (!key) return { ok: false, error: "RASTROCODE_API_KEY não configurada" };
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "X-API-Key": key,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        external_id: o.orderId,
        status: "paid",
        customer: o.customer,
        ...(o.address ? { address: o.address } : {}),
        items: o.items,
        total: Number((o.amountCents / 100).toFixed(2)),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json().catch(() => null)) as any;
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}: ${JSON.stringify(json ?? {}).slice(0, 300)}` };
    }
    const trackingCode =
      json?.tracking_code ?? json?.code ?? json?.data?.tracking_code ?? json?.order?.tracking_code;
    return { ok: true, ...(trackingCode ? { trackingCode: String(trackingCode) } : {}) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
