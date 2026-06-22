/**
 * MX checkout — direct payment links or Shopify product IDs.
 */
export const MX_SHOPIFY_EXTERNAL_CHECKOUT_URL = import.meta.env.VITE_MX_SHOPIFY_CHECKOUT_URL ?? "";
export const MX_SHOPIFY_EXTERNAL_STORE_ID = import.meta.env.VITE_MX_SHOPIFY_STORE_ID ?? "";

/** Direct checkout links — one per plan */
export const MX_CHECKOUT_URLS = {
  "30": import.meta.env.VITE_MX_CHECKOUT_URL_30 ?? "",
  "60": import.meta.env.VITE_MX_CHECKOUT_URL_60 ?? "",
  "90": import.meta.env.VITE_MX_CHECKOUT_URL_90 ?? "",
} as const;

/** Product IDs for the MX checkout */
export const MX_SHOPIFY_PRODUCT_IDS = {
  "30": import.meta.env.VITE_MX_SHOPIFY_PRODUCT_30 ?? "",
  "60": import.meta.env.VITE_MX_SHOPIFY_PRODUCT_60 ?? "",
  "90": import.meta.env.VITE_MX_SHOPIFY_PRODUCT_90 ?? "",
} as const;

export type MxCheckoutPlanId = keyof typeof MX_CHECKOUT_URLS;

export function buildMxShopifyCheckoutUrl(productId: string): string {
  if (!MX_SHOPIFY_EXTERNAL_CHECKOUT_URL || !MX_SHOPIFY_EXTERNAL_STORE_ID || !productId) {
    return "";
  }
  const url = new URL(MX_SHOPIFY_EXTERNAL_CHECKOUT_URL);
  url.searchParams.set("product", productId);
  url.searchParams.set("store", MX_SHOPIFY_EXTERNAL_STORE_ID);
  return url.toString();
}

export function resolveMxCheckoutUrl(id: MxCheckoutPlanId): string {
  const direct = MX_CHECKOUT_URLS[id];
  if (direct) return direct;
  return buildMxShopifyCheckoutUrl(MX_SHOPIFY_PRODUCT_IDS[id]);
}

export function isMxCheckoutConfigured(): boolean {
  return (["30", "60", "90"] as const).every((id) => Boolean(resolveMxCheckoutUrl(id)));
}
