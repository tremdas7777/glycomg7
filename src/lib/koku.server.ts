// Gateway Pix Koku. Somente servidor.
// A chave da API pode vir do painel (private_settings) ou do secret KOKU_API_KEY.
// O segredo de assinatura do webhook deve permanecer em KOKU_WEBHOOK_SECRET.
export const KOKU_API = "https://api.kokupay.com/v1";

const KEY = "koku_api_key";
const CACHE_MS = 60_000;
let cache: { value: string | null; at: number } | null = null;

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function savedKey(): Promise<string | null> {
  const { data } = await (
    await db()
  )
    .from("private_settings")
    .select("value")
    .eq("key", KEY)
    .maybeSingle();
  return (data?.value as string | null) || null;
}

export async function getKokuKey(): Promise<string | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
  const value = (await savedKey()) || process.env["KOKU_API_KEY"] || null;
  cache = { value, at: Date.now() };
  return value;
}

export async function getKokuKeySource(): Promise<{
  key: string | null;
  source: "admin" | "secret" | null;
}> {
  const saved = await savedKey();
  if (saved) return { key: saved, source: "admin" };
  const env = process.env["KOKU_API_KEY"] || null;
  return { key: env, source: env ? "secret" : null };
}

export async function saveKokuKey(value: string): Promise<void> {
  const { error } = await (
    await db()
  )
    .from("private_settings")
    .upsert({ key: KEY, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  cache = null;
}

export async function deleteKokuKey(): Promise<void> {
  const { error } = await (await db()).from("private_settings").delete().eq("key", KEY);
  if (error) throw new Error(error.message);
  cache = null;
}

async function headers(): Promise<Record<string, string>> {
  const key = await getKokuKey();
  if (!key) throw new Error("Pagamento indisponível no momento.");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

type KokuChargeResponse = {
  id?: string;
  status?: string;
  amount_cents?: string | number;
  pix?: { qr_code_payload?: string };
  error?: { message?: string };
  message?: string;
};

function apiError(json: unknown, status: number): string {
  if (!json || typeof json !== "object") return `Koku HTTP ${status}`;
  const body = json as Record<string, unknown>;
  const error = body.error;
  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    if (typeof e.message === "string") return e.message.slice(0, 300);
  }
  return typeof body.message === "string" ? body.message.slice(0, 300) : `Koku HTTP ${status}`;
}

export async function kokuCashin(o: {
  amountCents: number;
  customer: { name: string; cpf: string; email: string; phone: string };
  description: string;
  orderReference: string;
}): Promise<{ id: string; qrcode: string; status: string }> {
  const res = await fetch(`${KOKU_API}/pix/charges`, {
    method: "POST",
    headers: { ...(await headers()), "Idempotency-Key": o.orderReference },
    body: JSON.stringify({
      order_reference: o.orderReference,
      amount_cents: o.amountCents,
      description: o.description,
      payer: {
        name: o.customer.name,
        document: o.customer.cpf.replace(/\D/g, ""),
        email: o.customer.email,
        phone: o.customer.phone.replace(/\D/g, ""),
      },
      expires_in_seconds: 1800,
      metadata: { source: "aidex-checkout" },
    }),
  });
  const json = (await res.json().catch(() => null)) as KokuChargeResponse | null;
  const qrcode = json?.pix?.qr_code_payload;
  if (!res.ok || !json?.id || !qrcode) {
    console.error("Koku create error", res.status, JSON.stringify(json)?.slice(0, 1000));
    throw new Error(`Não foi possível gerar o Pix (Koku: ${apiError(json, res.status)}).`);
  }
  return {
    id: String(json.id),
    qrcode: String(qrcode),
    status: String(json.status ?? "pending").toLowerCase(),
  };
}

export async function kokuStatus(id: string): Promise<{ status: string; amount: number }> {
  const res = await fetch(`${KOKU_API}/pix/charges/${encodeURIComponent(id)}`, {
    headers: await headers(),
  });
  const json = (await res.json().catch(() => null)) as KokuChargeResponse | null;
  if (!res.ok) throw new Error(`Koku HTTP ${res.status}: ${apiError(json, res.status)}`);
  return {
    status: String(json?.status ?? "pending").toLowerCase(),
    amount: Math.round(Number(json?.amount_cents ?? 0)),
  };
}

/** Consulta um id impossível: 404 confirma que a chave foi aceita sem criar cobrança. */
export async function testKokuKey(): Promise<{
  ok: boolean;
  status?: number;
  error?: string;
}> {
  const key = await getKokuKey();
  if (!key) return { ok: false, error: "Nenhuma chave cadastrada" };
  try {
    const res = await fetch(`${KOKU_API}/pix/charges/00000000-0000-4000-8000-000000000000`, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    });
    if (res.status === 404 || res.ok) return { ok: true, status: res.status };
    const json = await res.json().catch(() => null);
    return { ok: false, status: res.status, error: apiError(json, res.status) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Falha de conexão" };
  }
}

export function getKokuWebhookSecret(): string | null {
  return process.env["KOKU_WEBHOOK_SECRET"] || null;
}

export async function verifyKokuSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  const timestamp = /(?:^|,)\s*t=(\d+)/.exec(signatureHeader ?? "")?.[1];
  const receivedHex = /(?:^|,)\s*v1=([0-9a-f]{64})/.exec(signatureHeader ?? "")?.[1];
  if (!timestamp || !receivedHex) return false;
  const t = Number(timestamp);
  if (!Number.isSafeInteger(t) || Math.abs(nowSeconds - t) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${rawBody}`)),
  );
  if (receivedHex.length !== signature.length * 2) return false;
  let different = 0;
  for (let i = 0; i < signature.length; i++) {
    const byte = Number.parseInt(receivedHex.slice(i * 2, i * 2 + 2), 16);
    different |= signature[i]! ^ byte;
  }
  return different === 0;
}
