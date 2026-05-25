import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "75vwsw-dc.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN = "50132edd5922c28659417177a5e2dc86";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_ONLINE_STORE_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`;

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) {
    edges {
      node {
        id
        title
        sku
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: pagamento necessário", {
      description: "Sua loja Shopify precisa de um plano ativo. Acesse admin.shopify.com.",
    });
    return null;
  }
  if (!response.ok) throw new Error(`Shopify HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  return data;
}

export const CART_QUERY = `query cart($id: ID!) { cart(id: $id) { id totalQuantity } }`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function shopifyVariantNumericId(variantId: string): string {
  return variantId.split("/").pop() ?? variantId;
}

export function buildExternalCheckoutUrl(
  lines: Array<{ variantId: string; quantity: number }>,
): string | null {
  const validLines = lines.filter((line) => line.variantId && line.quantity > 0);

  if (validLines.length === 0) return null;

  if (validLines.length === 1) {
    const [line] = validLines;
    const url = new URL("/cart/add", SHOPIFY_ONLINE_STORE_URL);
    url.searchParams.set("id", shopifyVariantNumericId(line.variantId));
    url.searchParams.set("quantity", String(line.quantity));
    // Theme checkout apps usually attach to the Online Store cart page.
    url.searchParams.set("return_to", "/cart");
    url.searchParams.set("channel", "online_store");
    return url.toString();
  }

  const items = validLines
    .map((line) => `${shopifyVariantNumericId(line.variantId)}:${line.quantity}`)
    .join(",");

  const url = new URL(`/cart/${items}`, SHOPIFY_ONLINE_STORE_URL);
  url.searchParams.set("channel", "online_store");
  return url.toString();
}

export function isCartNotFoundError(errs: Array<{ field: string[] | null; message: string }>): boolean {
  return errs.some((e) => {
    const m = e.message.toLowerCase();
    return m.includes("cart not found") || m.includes("does not exist");
  });
}
