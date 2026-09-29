import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isUtmifyConfigured, sendUtmifyOrder } from "./utmify.server";

const pw = z.object({ password: z.string().min(1).max(200) });

function assertAdmin(password: string) {
  if (password !== process.env["ADMIN_PASSWORD"]) throw new Error("Não autorizado");
}

export const getUtmifyStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    return { configured: isUtmifyConfigured() };
  });

export const sendUtmifyTest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    return sendUtmifyOrder({
      orderId: `teste-${Date.now()}`,
      status: "paid",
      createdAt: Date.now(),
      approvedAt: Date.now(),
      customer: { name: "Teste Glycom", email: "teste@exemplo.com", phone: "11999999999", document: "52998224725" },
      product: { id: "30", name: "Glycom G7 CGM - Teste" },
      amountCents: 100,
      utm: { utm_source: "teste" },
      isTest: true,
    });
  });
