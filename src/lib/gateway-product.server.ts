import { resolveGatewayProductName } from "./gateway-product";

export const GATEWAY_PRODUCT_SETTING = "gateway_product_name";

/** Private server read, without caching: applies to the next charge. */
export async function getGatewayProductName(): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("private_settings").select("value").eq("key", GATEWAY_PRODUCT_SETTING).maybeSingle();
  if (error) throw new Error("Não foi possível consultar o nome do produto para o pagamento.");
  return resolveGatewayProductName(data?.value);
}