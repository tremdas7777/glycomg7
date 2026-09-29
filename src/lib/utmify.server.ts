// Envio de vendas para a UTMify (API de credenciais). Somente servidor.
export type UtmParams = Partial<
  Record<"src" | "sck" | "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string | null>
>;

export type UtmifyOrder = {
  orderId: string;
  status: "waiting_payment" | "paid" | "refused";
  createdAt: number; // epoch ms
  approvedAt?: number | null;
  customer: { name: string; email: string; phone: string; document: string; ip?: string | null };
  product: { id: string; name: string };
  amountCents: number;
  utm?: UtmParams;
  isTest?: boolean;
};

/** Formato "YYYY-MM-DD HH:MM:SS" em UTC, exigido pela UTMify. */
function fmt(ms: number): string {
  return new Date(ms).toISOString().replace("T", " ").slice(0, 19);
}

export function isUtmifyConfigured(): boolean {
  return Boolean(process.env["UTMIFY_API_TOKEN"]);
}

/** Nunca lança erro: falha na UTMify não pode quebrar o checkout. */
export async function sendUtmifyOrder(o: UtmifyOrder): Promise<{ ok: boolean; status?: number; error?: string }> {
  const token = process.env["UTMIFY_API_TOKEN"];
  if (!token) return { ok: false, error: "Token não configurado" };
  const u = o.utm ?? {};
  try {
    const res = await fetch("https://api.utmify.com.br/api-credentials/orders", {
      method: "POST",
      headers: { "x-api-token": token, "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: o.orderId,
        platform: "GlycomCheckout",
        paymentMethod: "pix",
        status: o.status,
        createdAt: fmt(o.createdAt),
        approvedDate: o.status === "paid" ? fmt(o.approvedAt ?? Date.now()) : null,
        refundedAt: null,
        customer: {
          name: o.customer.name,
          email: o.customer.email,
          phone: o.customer.phone,
          document: o.customer.document,
          country: "BR",
          ip: o.customer.ip ?? null,
        },
        products: [
          {
            id: o.product.id,
            name: o.product.name,
            planId: null,
            planName: null,
            quantity: 1,
            priceInCents: o.amountCents,
          },
        ],
        trackingParameters: {
          src: u.src ?? null,
          sck: u.sck ?? null,
          utm_source: u.utm_source ?? null,
          utm_campaign: u.utm_campaign ?? null,
          utm_medium: u.utm_medium ?? null,
          utm_content: u.utm_content ?? null,
          utm_term: u.utm_term ?? null,
        },
        commission: {
          totalPriceInCents: o.amountCents,
          gatewayFeeInCents: 0,
          userCommissionInCents: o.amountCents,
        },
        isTest: o.isTest ?? false,
      }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("UTMify error", res.status, txt.slice(0, 300));
      return { ok: false, status: res.status, error: txt.slice(0, 200) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    console.error("UTMify fetch failed", e);
    return { ok: false, error: "Falha de conexão" };
  }
}
