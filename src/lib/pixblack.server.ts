// Gateway Pix Black. Somente servidor.
// A chave da API pode vir do painel (private_settings) ou do secret PIXBLACK_API_KEY.
// O segredo de assinatura deve permanecer em PIXBLACK_WEBHOOK_SECRET.
export const PIXBLACK_API = "https://pixxblack.com/api/v1";
const KEY = "pixblack_api_key";
const CACHE_MS = 60_000;
let cache: { value: string | null; at: number } | null = null;

type PixBlackCharge = {
  id?: string;
  status?: string;
  amount_cents?: number | string;
  message?: string;
  issues?: unknown;
  pix?: { copy_paste?: string };
};

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

export async function getPixBlackKey(): Promise<string | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
  const value = (await savedKey()) || process.env["PIXBLACK_API_KEY"] || null;
  cache = { value, at: Date.now() };
  return value;
}

export async function getPixBlackKeySource(): Promise<{
  key: string | null;
  source: "admin" | "secret" | null;
}> {
  const saved = await savedKey();
  if (saved) return { key: saved, source: "admin" };
  const env = process.env["PIXBLACK_API_KEY"] || null;
  return { key: env, source: env ? "secret" : null };
}

export async function savePixBlackKey(value: string): Promise<void> {
  const { error } = await (
    await db()
  )
    .from("private_settings")
    .upsert({ key: KEY, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  cache = null;
}

export async function deletePixBlackKey(): Promise<void> {
  const { error } = await (await db()).from("private_settings").delete().eq("key", KEY);
  if (error) throw new Error(error.message);
  cache = null;
}

async function headers(): Promise<Record<string, string>> {
  const key = await getPixBlackKey();
  if (!key) throw new Error("Pagamento indisponível no momento.");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function apiError(json: PixBlackCharge | null, status: number): string {
  return json?.message ? json.message.slice(0, 300) : `Pix Black HTTP ${status}`;
}

export async function pixBlackCashin(o: {
  amountCents: number;
  customer: { name: string; cpf: string; email: string };
  description: string;
  externalReference: string;
}): Promise<{ id: string; qrcode: string; status: string }> {
  const res = await fetch(`${PIXBLACK_API}/charges`, {
    method: "POST",
    headers: { ...(await headers()), "Idempotency-Key": o.externalReference },
    body: JSON.stringify({
      amount_cents: o.amountCents,
      description: o.description.slice(0, 140),
      external_reference: o.externalReference,
      payer: {
        name: o.customer.name.slice(0, 120),
        document: o.customer.cpf.replace(/\D/g, ""),
        email: o.customer.email,
      },
    }),
  });
  const json = (await res.json().catch(() => null)) as PixBlackCharge | null;
  const qrcode = json?.pix?.copy_paste;
  if (!res.ok || !json?.id || !qrcode) {
    console.error("Pix Black create error", res.status, JSON.stringify(json)?.slice(0, 1000));
    throw new Error(`Não foi possível gerar o Pix (Pix Black: ${apiError(json, res.status)}).`);
  }
  return {
    id: String(json.id),
    qrcode: String(qrcode),
    status: String(json.status ?? "pending").toLowerCase(),
  };
}

export async function pixBlackStatus(id: string): Promise<{ status: string; amount: number }> {
  const res = await fetch(`${PIXBLACK_API}/charges/${encodeURIComponent(id)}`, {
    headers: await headers(),
  });
  const json = (await res.json().catch(() => null)) as PixBlackCharge | null;
  if (!res.ok) throw new Error(`Pix Black HTTP ${res.status}: ${apiError(json, res.status)}`);
  return {
    status: String(json?.status ?? "pending").toLowerCase(),
    amount: Math.round(Number(json?.amount_cents ?? 0)),
  };
}

/** Consulta um UUID inexistente: 404 confirma a chave sem criar cobrança. */
export async function testPixBlackKey(): Promise<{
  ok: boolean;
  status?: number;
  error?: string;
}> {
  const key = await getPixBlackKey();
  if (!key) return { ok: false, error: "Nenhuma chave cadastrada" };
  try {
    const res = await fetch(`${PIXBLACK_API}/charges/00000000-0000-4000-8000-000000000000`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    if (res.status === 404 || res.ok) return { ok: true, status: res.status };
    const json = (await res.json().catch(() => null)) as PixBlackCharge | null;
    return { ok: false, status: res.status, error: apiError(json, res.status) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Falha de conexão" };
  }
}

export function getPixBlackWebhookSecret(): string | null {
  return process.env["PIXBLACK_WEBHOOK_SECRET"] || null;
}

export async function verifyPixBlackSignature(
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
