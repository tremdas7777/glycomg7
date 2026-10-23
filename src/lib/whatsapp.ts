import { brand } from "@/lib/brand";

/**
 * Mensagem que o cliente já encontra escrita no campo do WhatsApp — ele só
 * aperta enviar. Deve funcionar sozinha, sem o cliente precisar preencher nada.
 */
export const WHATSAPP_MESSAGE = [
  "Olá! Vim pelo site da AiDEX e quero saber mais sobre o AiDEX G7.",
  "",
  "Gostaria de entender qual plano combina comigo, como funciona a entrega e se o sensor precisa de transmissor separado.",
  "",
  "Pode me ajudar?",
].join("\n");

/** Link wa.me com a mensagem pronta (ou uma mensagem própria). */
export function whatsappHref(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${brand.whatsapp.phoneE164}?text=${encodeURIComponent(message)}`;
}
