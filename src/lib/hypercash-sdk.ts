/**
 * SDK da HyperCash (FastSoft) no navegador: transforma o cartão em token (com 3DS quando disponível).
 * Os dados do cartão vão direto do navegador para o gateway — nunca para o nosso servidor.
 */
const SDK_URL = "https://js.fastsoftbrasil.com/security.js";

type FastSoftSdk = {
  setPublicKey(key: string): Promise<void>;
  encrypt(card: CardInput): Promise<string>;
  isThreeDSEnabled(): boolean | Promise<boolean>;
  initializeThreeDS(d: unknown): Promise<void>;
  authenticateThreeDS(d: unknown): Promise<{ type: string }>;
  finalizeThreeDS(): Promise<void>;
};

export type CardInput = {
  number: string;
  holderName: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

let ready: Promise<FastSoftSdk> | null = null;

export function loadHypercash(publicKey: string): Promise<FastSoftSdk> {
  if (ready) return ready;
  ready = new Promise<FastSoftSdk>((resolve, reject) => {
    const w = window as unknown as { FastSoft?: FastSoftSdk };
    const init = () =>
      w.FastSoft
        ? w.FastSoft.setPublicKey(publicKey).then(() => resolve(w.FastSoft!), reject)
        : reject(new Error("SDK indisponível"));
    if (w.FastSoft) return void init();
    const s = document.createElement("script");
    s.src = SDK_URL;
    s.async = true;
    s.onload = init;
    s.onerror = () => reject(new Error("Falha ao carregar o SDK"));
    document.head.appendChild(s);
  }).catch((e) => {
    ready = null; // permite tentar de novo
    throw e;
  });
  return ready;
}

export async function tokenizeCard(
  publicKey: string,
  card: CardInput,
  ctx: {
    amount: number; // centavos — o mesmo valor que o servidor vai cobrar
    installments: number;
    customer: { name: string; email: string; phoneNumber: string };
    address: {
      street: string;
      streetNumber: string;
      complement: string;
      zipCode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: "BR";
    };
  },
): Promise<string> {
  const sdk = await loadHypercash(publicKey);
  if (await sdk.isThreeDSEnabled()) {
    try {
      await sdk.initializeThreeDS({
        amount: ctx.amount,
        currency: "BRL",
        installments: ctx.installments,
        card: {
          number: card.number,
          holderName: card.holderName,
          expMonth: card.expMonth,
          expYear: card.expYear,
        },
      });
      // Mesmo com "failure" o fluxo segue: o gateway decide aprovar ou recusar.
      await sdk.authenticateThreeDS({ customer: ctx.customer, address: ctx.address });
      await sdk.finalizeThreeDS();
    } catch (e) {
      console.warn("3DS indisponível, seguindo sem autenticação", e);
    }
  }
  return sdk.encrypt(card);
}
