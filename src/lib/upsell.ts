import type { Bundle } from "@/lib/bundles";

/** Upsell pós-compra (Pix e cartão): mais 1 kit igual ao comprado, com desconto. */
export const UPSELL_DISCOUNT = 0.5;

/** Nome do produto enviado ao gateway na cobrança de upsell no cartão. */
export const UPSELL_GATEWAY_NAME = "Glycom T";

export const upsellPrice = (bundle: Bundle) =>
  Math.round(bundle.price * (1 - UPSELL_DISCOUNT) * 100) / 100;
