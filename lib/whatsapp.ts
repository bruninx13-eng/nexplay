import { siteConfig } from "@/config/site";

export type WhatsAppMessageKey = keyof typeof siteConfig.whatsapp.messages;

const WHATSAPP_PHONE_PATTERN = /^\d{10,15}$/;

/**
 * Gera uma URL segura e codificada para o WhatsApp comercial.
 * O número é validado para evitar links malformados.
 */
export function buildWhatsAppUrl(message: string): string {
  const phone = siteConfig.whatsapp.number.replace(/\D/g, "");

  if (!WHATSAPP_PHONE_PATTERN.test(phone)) {
    throw new Error("Número de WhatsApp inválido na configuração da NEXPLAY.");
  }

  const safeMessage = message.trim().slice(0, 1000);
  return `https://wa.me/${phone}?text=${encodeURIComponent(safeMessage)}`;
}

export function getWhatsAppMessage(key: WhatsAppMessageKey): string {
  return siteConfig.whatsapp.messages[key];
}

export function getWhatsAppUrl(key: WhatsAppMessageKey): string {
  return buildWhatsAppUrl(getWhatsAppMessage(key));
}

/** Link externo seguro, usado em âncoras comerciais. */
export const whatsAppLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
