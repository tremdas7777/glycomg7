/** MX store routes — /mx prefix on the same domain */
export const mxPaths = {
  home: "/mx",
  product: "/mx/producto",
  faq: "/mx/faq",
  contact: "/mx/contacto",
  about: "/mx/nosotros",
  tracking: "/mx/rastreo",
  shipping: "/mx/envios",
  privacy: "/mx/privacidad",
  refund: "/mx/reembolsos",
  checkout: "/mx/checkout",
} as const;

export type MxPath = (typeof mxPaths)[keyof typeof mxPaths];
