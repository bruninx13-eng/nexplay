import { siteConfig } from "@/config/site";

export type AnalyticsEventName =
  | "whatsapp_click"
  | "plan_monthly_click"
  | "plan_quarterly_click"
  | "plan_semestral_click"
  | "plan_annual_click"
  | "compatibility_click"
  | "support_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export type ConsentState = "granted" | "denied";

const CONSENT_EVENT = "nexplay:consent";
const CONSENT_RESET_EVENT = "nexplay:consent-reset";

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(
      siteConfig.analytics.consentStorageKey,
    );
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      siteConfig.analytics.consentStorageKey,
      state,
    );
    window.dispatchEvent(
      new CustomEvent(CONSENT_EVENT, { detail: { state } }),
    );
  } catch {
    // O site continua funcionando mesmo quando o armazenamento é bloqueado.
  }
}

export function resetConsent(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(siteConfig.analytics.consentStorageKey);
  } catch {
    // Ignora armazenamento indisponível.
  }

  window.dispatchEvent(new Event(CONSENT_RESET_EVENT));
}

export function subscribeToConsentReset(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener(CONSENT_RESET_EVENT, listener);
  return () => window.removeEventListener(CONSENT_RESET_EVENT, listener);
}

export function getStoredConsent(): ConsentState | null {
  return readConsent();
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "granted";
}

export function subscribeToConsent(
  listener: (state: ConsentState) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handler = (event: Event) => {
    const state = (event as CustomEvent<{ state?: ConsentState }>).detail?.state;
    if (state === "granted" || state === "denied") listener(state);
  };

  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

/**
 * Dispara o evento somente após consentimento explícito.
 * A estrutura funciona com GTM (dataLayer), GA4 (gtag) e Meta Pixel (fbq).
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {},
): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const payload = {
    event: eventName,
    ...params,
    page_location: window.location.href,
  };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.gtag?.("event", eventName, params);
    window.fbq?.("trackCustom", eventName, params);
  } catch {
    // Rastreamento nunca deve interromper a navegação ou a conversão.
  }
}
