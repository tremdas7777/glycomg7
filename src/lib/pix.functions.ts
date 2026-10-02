import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getBundle, parseBundleId } from "@/lib/bundles";
import { saveOrder, fetchGatewayStatus, reportPaidOnce } from "@/lib/pix-orders.server";
import { getRequest } from "@tanstack/react-start/server";

const utmSchema = z
  .record(z.string(), z.string().max(300).nullable())
  .optional()
  .default({});

const API = "https://app.pixgateip.com/api";

function apiKey(): string {
  const key = process.env["PIXGATE_API_KEY"];
  if (!key) throw new Error("Pagamento indisponível no momento.");
  return key;
}

function isValidCpf(raw: string): boolean {
  const c = raw.replace(/\D/g, "");
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  for (const t of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(c[i]) * (t + 1 - i);
    const d = ((sum * 10) % 11) % 10;
    if (d !== Number(c[t])) return false;
  }
  return true;
}

const customerSchema = z.object({
  plano: z.string(),
  name: z.string().trim().min(3).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().transform((v) => v.replace(/\D/g, "")).pipe(z.string().min(10).max(11)),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidCpf, "CPF inválido"),
  origin: z.string().url(),
  frete: z.enum(["gratis", "padrao", "express"]).default("gratis"),
  endereco: z.string().max(300).optional(),
  utm: utmSchema,
});

/** Regras de preço do checkout (espelhadas no cliente só para exibição). */
export const FRETES = [
  { id: "gratis", name: "Frete Grátis", eta: "7 a 10 dias úteis", price: 0 },
  { id: "padrao", name: "Frete Padrão", eta: "5 dias úteis", price: 20 },
  { id: "express", name: "Frete Express", eta: "1 a 2 dias úteis", price: 37.53 },
] as const;
export type FreteId = (typeof FRETES)[number]["id"];
export const getFrete = (id: FreteId) => FRETES.find((f) => f.id === id) ?? FRETES[0];

export type PixCharge = { id: string; qrcode: string; amount: number; status: string };

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => customerSchema.parse(d))
  .handler(async ({ data }): Promise<PixCharge> => {
    // Preço sempre definido no servidor — nunca confiar no cliente.
    const bundle = getBundle(parseBundleId(data.plano) ?? "30");
    const frete = getFrete(data.frete).price;
    const amount = Math.round((bundle.price + frete) * 100);
    // PixGate recebe o valor em reais (decimal); internamente seguimos em centavos.
    const valor = Number((amount / 100).toFixed(2));
    const res = await fetch(`${API}/v1/cashin`, {
      method: "POST",
      headers: { Apikey: apiKey(), "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nome: data.name,
        cpf: data.cpf,
        valor,
        // Nome genérico enviado ao gateway — sem detalhes do produto real.
        descricao: "Glicomax",
        postback: `${new URL(data.origin).origin}/api/public/pix-webhook`,
      }),
    });
    const json = (await res.json().catch(() => null)) as any;
    const txId = json?.id;
    const qrcode = json?.pix;
    if (!res.ok || !txId || !qrcode) {
      console.error("PixGate error", res.status, JSON.stringify(json)?.slice(0, 500));
      throw new Error("Não foi possível gerar o Pix. Confira seus dados e tente novamente.");
    }
    const h = getRequest()?.headers;
    const ip = h?.get("cf-connecting-ip") ?? h?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    // Guarda o pedido no servidor para reportar a aprovação mesmo sem o cliente na página.
    await saveOrder({
      id: String(txId),
      amountCents: amount,
      customer: { name: data.name, email: data.email, phone: data.phone, cpf: data.cpf },
      bundleId: bundle.id,
      bundleName: bundle.name,
      utm: data.utm,
      ip,
      ua: h?.get("user-agent") ?? null,
    });
    return { id: String(txId), qrcode, amount, status: String(json?.status ?? "pending").toLowerCase() };
  });

export const getPixStatus = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().regex(/^[\w-]{1,64}$/),
        report: z
          .object({
            name: z.string().max(120),
            email: z.string().max(160),
            phone: z.string().max(20),
            cpf: z.string().max(14),
            bundleId: z.string().max(10),
            bundleName: z.string().max(80),
            createdAt: z.number(),
            utm: utmSchema,
            fbp: z.string().max(200).nullable().optional(),
            fbc: z.string().max(300).nullable().optional(),
            url: z.string().max(1000).optional(),
          })
          .optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ status: string }> => {
    const { status, amount } = await fetchGatewayStatus(data.id);
    // Status confirmado pelo gateway (servidor) — reporta uma única vez.
    if (status === "paid" || status === "approved") {
      const h = getRequest()?.headers;
      await reportPaidOnce(data.id, amount, {
        fbp: data.report?.fbp,
        fbc: data.report?.fbc,
        url: data.report?.url,
        ip: h?.get("cf-connecting-ip") ?? h?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        ua: h?.get("user-agent") ?? null,
      });
    }
    return { status };
  });
