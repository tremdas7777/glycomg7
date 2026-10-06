import { getBundle, type Bundle } from "@/lib/bundles";

/** Upsell pós-compra no Pix: mais 1 kit igual ao comprado, com desconto. */
export const UPSELL_DISCOUNT = 0.5;

/** Nome do produto enviado ao gateway na cobrança de upsell no cartão. */
export const UPSELL_GATEWAY_NAME = "Glycom T";

export const upsellPrice = (bundle: Bundle) =>
  Math.round(bundle.price * (1 - UPSELL_DISCOUNT) * 100) / 100;

/** Valor do upsell de quem comprou no cartão (kit de 3 meses), em reais. */
export const CARD_UPSELL_PRICE = 490;

/**
 * Oferta do upsell conforme a forma de pagamento do upsell:
 * - no mesmo cartão: kit de 3 meses (R$ 597) por CARD_UPSELL_PRICE, para todo mundo;
 * - Pix (como sempre foi): mais 1 kit igual ao comprado com UPSELL_DISCOUNT.
 */
export function upsellOffer(bought: Bundle, method: "card" | "pix") {
  const bundle = method === "card" ? getBundle("90") : bought;
  const price = method === "card" ? CARD_UPSELL_PRICE : upsellPrice(bundle);
  const off = Math.round((1 - price / bundle.price) * 100);
  return { bundle, price, off };
}
