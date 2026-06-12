/** UK store routes — /uk prefix on the same domain */
export const ukPaths = {
  home: "/uk",
  product: "/uk/product",
  faq: "/uk/faq",
  contact: "/uk/contact",
  about: "/uk/about",
  tracking: "/uk/tracking",
  shipping: "/uk/shipping",
  privacy: "/uk/privacy",
  refund: "/uk/refund",
  checkout: "/uk/checkout",
} as const;

export type UkPath = (typeof ukPaths)[keyof typeof ukPaths];
