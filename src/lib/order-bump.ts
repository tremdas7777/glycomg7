/** Order bump do checkout. Preço usado no servidor — o cliente só exibe. */
export const ORDER_BUMP = {
  id: "vivicap",
  name: "VIVI Cap",
  fullName: "VIVI Cap — Protetor Térmico de Insulina",
  price: 47.9,
  compareAt: 119.9,
  img: "https://descontovivcarp.tempramedbr.shop/__l5e/assets-v1/df7109a7-fa04-414d-a793-e02b5cca8e76/taper1.webp",
} as const;

export const bumpPrice = (on: boolean) => (on ? ORDER_BUMP.price : 0);
