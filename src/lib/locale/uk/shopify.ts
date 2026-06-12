/**
 * UK checkout — direct payment links or Shopify product IDs.
 */
export const UK_SHOPIFY_EXTERNAL_CHECKOUT_URL = import.meta.env.VITE_UK_SHOPIFY_CHECKOUT_URL ?? "";
export const UK_SHOPIFY_EXTERNAL_STORE_ID = import.meta.env.VITE_UK_SHOPIFY_STORE_ID ?? "";

/** Direct checkout links (pay.aidexbrasil.com) — one per plan */
export const UK_CHECKOUT_URLS = {
  "30":
    import.meta.env.VITE_UK_CHECKOUT_URL_30 ??
    "https://pay.aidexbrasil.com/r/nmb6tsefx3lqicjch0nue2lc",
  "60":
    import.meta.env.VITE_UK_CHECKOUT_URL_60 ??
    "https://pay.aidexbrasil.com/r/g0h4w0fusmb37epn1utackxg",
  "90":
    import.meta.env.VITE_UK_CHECKOUT_URL_90 ??
    "https://pay.aidexbrasil.com/r/evsia5xazmu33xuf9eml834y",
} as const;

/** Product IDs for the UK checkout — set via env or directly here */
export const UK_SHOPIFY_PRODUCT_IDS = {
  "30": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_30 ?? "",
  "60": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_60 ?? "",
  "90": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_90 ?? "",
} as const;

export type UkCheckoutPlanId = keyof typeof UK_CHECKOUT_URLS;

export function buildUkShopifyCheckoutUrl(productId: string): string {
  if (!UK_SHOPIFY_EXTERNAL_CHECKOUT_URL || !UK_SHOPIFY_EXTERNAL_STORE_ID || !productId) {
    return "";
  }
  const url = new URL(UK_SHOPIFY_EXTERNAL_CHECKOUT_URL);
  url.searchParams.set("product", productId);
  url.searchParams.set("store", UK_SHOPIFY_EXTERNAL_STORE_ID);
  return url.toString();
}

export function resolveUkCheckoutUrl(id: UkCheckoutPlanId): string {
  const direct = UK_CHECKOUT_URLS[id];
  if (direct) return direct;
  return buildUkShopifyCheckoutUrl(UK_SHOPIFY_PRODUCT_IDS[id]);
}

export function isUkCheckoutConfigured(): boolean {
  return (["30", "60", "90"] as const).every((id) => Boolean(resolveUkCheckoutUrl(id)));
}
