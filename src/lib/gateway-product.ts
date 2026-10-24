import { z } from "zod";

export const DEFAULT_GATEWAY_PRODUCT_NAME = "Glicomax";
export const gatewayProductNameSchema = z.string().trim().min(1, "Informe o nome do produto.").max(80, "Use até 80 caracteres.").refine((value) => !/[\u0000-\u001f\u007f<>]/.test(value), "Use um nome sem quebras de linha ou símbolos < e >.");

/** Never fall back to the storefront's real product name. */
export function resolveGatewayProductName(value: unknown): string {
  const parsed = gatewayProductNameSchema.safeParse(value);
  return parsed.success ? parsed.data : DEFAULT_GATEWAY_PRODUCT_NAME;
}

export function gatewayBumpTitle(name: string, bumpId: "vivicap" | "adesivos"): string {
  return `${name} ${bumpId === "vivicap" ? "Cap" : "Adesivo"}`;
}

export function assertGatewayProductAdmin(password: string, expected: string | undefined): void {
  if (!expected || password !== expected) throw new Error("Não autorizado");
}