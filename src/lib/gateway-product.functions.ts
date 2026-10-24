import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { assertGatewayProductAdmin, gatewayProductNameSchema } from "./gateway-product";

const credentials = z.object({ password: z.string().min(1).max(200) });

export const getGatewayProductNameFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => credentials.parse(input))
  .handler(async ({ data }) => {
    assertGatewayProductAdmin(data.password, process.env["ADMIN_PASSWORD"]);
    const { getGatewayProductName } = await import("./gateway-product.server");
    return { name: await getGatewayProductName() };
  });

export const saveGatewayProductNameFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => credentials.extend({ name: gatewayProductNameSchema }).parse(input))
  .handler(async ({ data }) => {
    assertGatewayProductAdmin(data.password, process.env["ADMIN_PASSWORD"]);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { GATEWAY_PRODUCT_SETTING } = await import("./gateway-product.server");
    const { error } = await supabaseAdmin.from("private_settings").upsert({ key: GATEWAY_PRODUCT_SETTING, value: data.name, updated_at: new Date().toISOString() });
    if (error) throw new Error("Não foi possível salvar o nome. Tente novamente.");
    return { name: data.name };
  });