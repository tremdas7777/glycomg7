import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { deleteUtmifyToken, getUtmifyToken, saveUtmifyToken, sendUtmifyOrder } from "./utmify.server";

const pw = z.object({ password: z.string().min(1).max(200) });

function assertAdmin(password: string) {
  if (password !== process.env["ADMIN_PASSWORD"]) throw new Error("Não autorizado");
}

function mask(token: string): string {
  if (token.length <= 8) return "••••";
  return `${token.slice(0, 4)}••••${token.slice(-4)}`;
}

export const getUtmifyStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const token = await getUtmifyToken();
    return { configured: Boolean(token), maskedToken: token ? mask(token) : null };
  });

export const saveUtmifyTokenFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.extend({ token: z.string().min(10).max(200) }).parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    await saveUtmifyToken(data.token.trim());
    return { ok: true };
  });

export const deleteUtmifyTokenFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    await deleteUtmifyToken();
    return { ok: true };
  });

export const sendUtmifyTest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    // Venda pendente real (sem isTest): a UTMify não notifica vendas de teste.
    return sendUtmifyOrder({
      orderId: `teste-${Date.now()}`,
      status: "waiting_payment",
      createdAt: Date.now(),
      customer: { name: "Maria Teste Silva", email: "maria.teste@exemplo.com", phone: "11999999999", document: "52998224725" },
      product: { id: "60", name: "Kit 60 dias" },
      amountCents: 44730,
      utm: { utm_source: "teste" },
    });
  });
