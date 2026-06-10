/**
 * Checkout alemão — URLs separadas da loja BR.
 * Substitua os IDs e credenciais quando os links de checkout DE estiverem prontos.
 */
export const DE_SHOPIFY_EXTERNAL_CHECKOUT_URL = import.meta.env.VITE_DE_SHOPIFY_CHECKOUT_URL ?? "";
export const DE_SHOPIFY_EXTERNAL_STORE_ID = import.meta.env.VITE_DE_SHOPIFY_STORE_ID ?? "";

/** IDs dos produtos no checkout alemão — preencher via env ou diretamente aqui */
export const DE_SHOPIFY_PRODUCT_IDS = {
  "30": import.meta.env.VITE_DE_SHOPIFY_PRODUCT_30 ?? "",
  "60": import.meta.env.VITE_DE_SHOPIFY_PRODUCT_60 ?? "",
  "90": import.meta.env.VITE_DE_SHOPIFY_PRODUCT_90 ?? "",
} as const;

export function buildDeShopifyCheckoutUrl(productId: string): string {
  if (!DE_SHOPIFY_EXTERNAL_CHECKOUT_URL || !DE_SHOPIFY_EXTERNAL_STORE_ID || !productId) {
    return "";
  }
  const url = new URL(DE_SHOPIFY_EXTERNAL_CHECKOUT_URL);
  url.searchParams.set("product", productId);
  url.searchParams.set("store", DE_SHOPIFY_EXTERNAL_STORE_ID);
  return url.toString();
}

export function isDeCheckoutConfigured(): boolean {
  return Boolean(
    DE_SHOPIFY_EXTERNAL_CHECKOUT_URL &&
    DE_SHOPIFY_EXTERNAL_STORE_ID &&
    DE_SHOPIFY_PRODUCT_IDS["30"] &&
    DE_SHOPIFY_PRODUCT_IDS["60"] &&
    DE_SHOPIFY_PRODUCT_IDS["90"],
  );
}
