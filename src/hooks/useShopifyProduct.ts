import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct, type ShopifyVariant } from "@/lib/shopify";
import type { BundleId } from "@/lib/bundles";

/** Maps SKU → BundleId */
const SKU_TO_BUNDLE: Record<string, BundleId> = {
  "AIDEX-30": "30",
  "AIDEX-60": "60",
  "AIDEX-90": "90",
};

export function useShopifyProduct() {
  return useQuery({
    queryKey: ["shopify", "aidex-product"],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 5, query: "vendor:AiDEX" });
      const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
      return products[0] ?? null;
    },
    staleTime: 60_000,
  });
}

export function useShopifyVariants() {
  const { data: product, ...rest } = useShopifyProduct();
  const variantsByBundle: Partial<Record<BundleId, ShopifyVariant>> = {};
  if (product) {
    for (const edge of product.node.variants.edges) {
      const v = edge.node;
      const bid = v.sku ? SKU_TO_BUNDLE[v.sku] : undefined;
      if (bid) variantsByBundle[bid] = v;
    }
  }
  return { product, variantsByBundle, ...rest };
}
