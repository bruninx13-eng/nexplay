"use client";

import { Cookie } from "lucide-react";
import { saveConsent } from "@/lib/analytics";
import { useConsent } from "@/lib/useConsent";

export function ConsentBanner() {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    <aside
      className="fixed bottom-4 left-4 right-20 z-[60] max-w-[24rem] rounded-2xl border border-white/10 bg-[#07101d]/95 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:right-auto sm:w-[23rem]"
      aria-labelledby="cookie-title"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-electric/10 text-neon">
          <Cookie className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2
            id="cookie-title"
            className="font-display text-[0.72rem] font-extrabold uppercase tracking-[0.06em] text-white"
          >
            Sua privacidade
          </h2>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-mist">
            Usamos cookies de medição para entender o acesso ao site. Nenhum
            rastreador é carregado antes do seu consentimento.{" "}
            <a
              href="/politica-de-privacidade/"
              className="font-semibold text-neon underline-offset-2 hover:underline"
            >
              Saiba mais
            </a>
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => saveConsent("granted")}
          className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-electric-deep px-3 text-[0.72rem] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-neon hover:text-ink"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => saveConsent("denied")}
          className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-white/15 px-3 text-[0.72rem] font-bold uppercase tracking-[0.05em] text-mist transition-colors hover:border-white/30 hover:text-white"
        >
          Recusar
        </button>
      </div>
    </aside>
  );
}
