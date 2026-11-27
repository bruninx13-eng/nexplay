"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";
import {
  getStoredConsent,
  subscribeToConsent,
  subscribeToConsentReset,
  type ConsentState,
} from "@/lib/analytics";

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const unsubscribeConsent = subscribeToConsent(() => onStoreChange());
  const unsubscribeReset = subscribeToConsentReset(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === siteConfig.analytics.consentStorageKey) onStoreChange();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    unsubscribeConsent();
    unsubscribeReset();
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot(): ConsentState | null {
  // Evita exibir aviso ou carregar scripts antes da hidratação.
  return "denied";
}

export function useConsent(): ConsentState | null {
  return useSyncExternalStore(
    subscribe,
    getStoredConsent,
    getServerSnapshot,
  );
}
