/**
 * Regras de preço por forma de pagamento (usadas no servidor para cobrar e no cliente só para exibir).
 * Preço de tabela = cartão. Pix tem desconto sobre os produtos (o frete não entra no desconto).
 */
export const PIX_DISCOUNT = 0.1;
export const CARD_MAX_INSTALLMENTS = 12;

export type PayMethod = "pix" | "card";

/** Valores em centavos. `products` = plano + order bump, já sem desconto. */
export function checkoutTotals(o: { products: number; frete: number; method: PayMethod }) {
  const products = Math.round(o.products * 100);
  const frete = Math.round(o.frete * 100);
  const discount = o.method === "pix" ? Math.round(products * PIX_DISCOUNT) : 0;
  return { products, frete, discount, total: products - discount + frete };
}
