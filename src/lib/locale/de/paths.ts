/** Rotas da loja alemã — prefixo /de no mesmo domínio */
export const dePaths = {
  home: "/de",
  product: "/de/produkt",
  faq: "/de/faq",
  contact: "/de/kontakt",
  about: "/de/ueber-uns",
  tracking: "/de/sendungsverfolgung",
  shipping: "/de/versand",
  privacy: "/de/datenschutz",
  refund: "/de/rueckerstattung",
  checkout: "/de/checkout",
} as const;

export type DePath = (typeof dePaths)[keyof typeof dePaths];
