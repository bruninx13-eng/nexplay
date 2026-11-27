import { ArrowRight, Play } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Conversion() {
  return (
    <section className="relative py-10 sm:py-14 lg:py-20">
      <div className="shell">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[1.8rem] border border-neon/20 bg-[linear-gradient(145deg,rgba(8,123,255,0.17),rgba(6,16,31,0.94)_44%,rgba(5,7,13,0.98))] px-6 py-14 text-center shadow-[0_40px_120px_rgba(0,0,0,0.38)] sm:rounded-[2.2rem] sm:px-10 sm:py-16 lg:px-20 lg:py-20">
            <div
              className="grid-surface absolute inset-0 -z-10 opacity-60"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-electric/25 blur-[90px]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-16 -z-10 h-80 w-80 rounded-full bg-neon/15 blur-[100px]"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/10"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/10"
              aria-hidden="true"
            />

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neon/30 bg-electric/15 text-neon shadow-[0_0_40px_rgba(40,185,255,0.22)]">
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            </span>

            <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neon/85">
              {siteConfig.conversion.eyebrow}
            </p>

            <h2 className="display-title mx-auto mt-4 max-w-4xl text-[clamp(1.9rem,5.4vw,3.4rem)] text-white">
              {siteConfig.conversion.title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist sm:text-[1.02rem]">
              {siteConfig.conversion.description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <WhatsAppLink
                messageKey="general"
                eventName="whatsapp_click"
                placement="conversion"
                variant="primary"
                className="w-full max-w-md sm:w-auto"
                ariaLabel="Falar com a NEXPLAY agora pelo WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {siteConfig.conversion.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </WhatsAppLink>
              <p className="text-xs text-mist/70">
                {siteConfig.hero.supportNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
