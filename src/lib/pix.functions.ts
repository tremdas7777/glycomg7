import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getBundle, parseBundleId } from "@/lib/bundles";
import { saveOrder, fetchGatewayStatus, reportPaidOnce } from "@/lib/pix-orders.server";
import { getRequest } from "@tanstack/react-start/server";

const utmSchema = z
  .record(z.string(), z.string().max(300).nullable())
  .optional()
  .default({});

const API = "https://api.solutionpayments.com.br";

function authHeader(): string {
  const sk = process.env["SOLUTION_PAYMENTS_SECRET_KEY"];
  if (!sk) throw new Error("Pagamento indisponível no momento.");
  return "Basic " + Buffer.from(`x:${sk}`).toString("base64");
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
  frete: z.enum(["gratis", "full"]).default("gratis"),
  endereco: z.string().max(300).optional(),
  utm: utmSchema,
});

/** Regras de preço do checkout (espelhadas no cliente só para exibição). */
export const PIX_DISCOUNT = 0.1;
export const FRETE_FULL = 27.9;

export type PixCharge = { id: string; qrcode: string; amount: number; status: string };

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => customerSchema.parse(d))
  .handler(async ({ data }): Promise<PixCharge> => {
    // Preço sempre definido no servidor — nunca confiar no cliente.
    const bundle = getBundle(parseBundleId(data.plano) ?? "30");
    const frete = data.frete === "full" ? FRETE_FULL : 0;
    const amount = Math.round((bundle.price * (1 - PIX_DISCOUNT) + frete) * 100);
    const res = await fetch(`${API}/v1/transactions.php`, {
      method: "POST",
      headers: { Authorization: authHeader(), "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        paymentMethod: "pix",
        amount,
        postbackUrl: `${new URL(data.origin).origin}/api/public/pix-webhook`,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          document: { number: data.cpf, type: "cpf" },
        },
        // Nome genérico enviado ao gateway — sem detalhes do produto real.
        items: [{ title: "Glicomax", description: "Glicomax", unitPrice: amount, quantity: 1 }],
      }),
    });
    const json = (await res.json().catch(() => null)) as any;
    const tx = json?.body?.transaction ?? json?.transaction;
    const qrcode = tx?.pix?.qrcode ?? tx?.pix?.qrCode;
    if (!res.ok || !tx?.id || !qrcode) {
      console.error("Solution Payments error", res.status, JSON.stringify(json)?.slice(0, 500));
      throw new Error("Não foi possível gerar o Pix. Confira seus dados e tente novamente.");
    }
    const h = getRequest()?.headers;
    const ip = h?.get("cf-connecting-ip") ?? h?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    // Guarda o pedido no servidor para reportar a aprovação mesmo sem o cliente na página.
    await saveOrder({
      id: String(tx.id),
      amountCents: amount,
      customer: { name: data.name, email: data.email, phone: data.phone, cpf: data.cpf },
      bundleId: bundle.id,
      bundleName: bundle.name,
      utm: data.utm,
      ip,
      ua: h?.get("user-agent") ?? null,
    });
    return { id: String(tx.id), qrcode, amount, status: String(tx.status ?? "waiting_payment") };
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
