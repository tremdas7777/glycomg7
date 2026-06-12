/**
 * UK checkout — separate URLs from the BR store.
 * Replace IDs and credentials when UK checkout links are ready.
 */
export const UK_SHOPIFY_EXTERNAL_CHECKOUT_URL = import.meta.env.VITE_UK_SHOPIFY_CHECKOUT_URL ?? "";
export const UK_SHOPIFY_EXTERNAL_STORE_ID = import.meta.env.VITE_UK_SHOPIFY_STORE_ID ?? "";

/** Product IDs for the UK checkout — set via env or directly here */
export const UK_SHOPIFY_PRODUCT_IDS = {
  "30": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_30 ?? "",
  "60": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_60 ?? "",
  "90": import.meta.env.VITE_UK_SHOPIFY_PRODUCT_90 ?? "",
} as const;

export function buildUkShopifyCheckoutUrl(productId: string): string {
  if (!UK_SHOPIFY_EXTERNAL_CHECKOUT_URL || !UK_SHOPIFY_EXTERNAL_STORE_ID || !productId) {
    return "";
  }
  const url = new URL(UK_SHOPIFY_EXTERNAL_CHECKOUT_URL);
  url.searchParams.set("product", productId);
  url.searchParams.set("store", UK_SHOPIFY_EXTERNAL_STORE_ID);
  return url.toString();
}

export function isUkCheckoutConfigured(): boolean {
  return Boolean(
    UK_SHOPIFY_EXTERNAL_CHECKOUT_URL &&
    UK_SHOPIFY_EXTERNAL_STORE_ID &&
    UK_SHOPIFY_PRODUCT_IDS["30"] &&
    UK_SHOPIFY_PRODUCT_IDS["60"] &&
    UK_SHOPIFY_PRODUCT_IDS["90"],
  );
}
