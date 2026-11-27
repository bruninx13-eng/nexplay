"use client";

import { resetConsent } from "@/lib/analytics";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-left transition-colors hover:text-white"
    >
      Preferências de cookies
    </button>
  );
}
