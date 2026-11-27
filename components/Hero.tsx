import { ArrowRight, Check, ChevronDown, Play } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HeroVisual } from "@/components/HeroVisual";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pb-20 pt-[calc(var(--header-height)+2.5rem)] sm:pb-24 lg:pb-32 lg:pt-[calc(var(--header-height)+4.5rem)]"
    >
      <div
        className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_72%_20%,rgba(8,123,255,0.22),transparent_46%),radial-gradient(ellipse_at_16%_75%,rgba(40,185,255,0.07),transparent_32%)]"
        aria-hidden="true"
      />
      <div
        className="grid-surface absolute inset-x-0 top-0 -z-20 h-[42rem] opacity-70"
        aria-hidden="true"
      />
      <div
        className="noise-overlay pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 top-10 -z-20 h-[32rem] w-[32rem] rounded-full bg-electric/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell grid items-center gap-14 xl:grid-cols-[1.02fr_0.98fr] xl:gap-10 2xl:gap-16">
        <div className="max-w-[42rem]">
          <div className="hero-enter">
            <span className="eyebrow">
              <Play className="h-3 w-3 fill-current" aria-hidden="true" />
              {siteConfig.hero.eyebrow}
            </span>
          </div>

          <h1 className="hero-enter hero-enter-delay-1 mt-6 font-display text-[clamp(2.35rem,6.6vw,4rem)] font-extrabold uppercase leading-[0.97] tracking-[-0.045em] text-white sm:mt-7">
            <span className="block">{siteConfig.hero.titleLines[0]}</span>
            <span className="text-gradient block pb-1">
              {siteConfig.hero.titleLines[1]}
            </span>
            <span className="block">{siteConfig.hero.titleLines[2]}</span>
          </h1>

          <p className="hero-enter hero-enter-delay-2 mt-6 max-w-xl text-[1rem] leading-relaxed text-mist sm:text-[1.08rem]">
            {siteConfig.hero.subtitle}
          </p>

          <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppLink
              messageKey="general"
              eventName="whatsapp_click"
              placement="hero_primary"
              variant="primary"
              className="w-full sm:w-auto"
              ariaLabel="Quero conhecer os planos da NEXPLAY pelo WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {siteConfig.hero.primaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </WhatsAppLink>

            <a
              href="#planos"
              className="cta cta-secondary w-full sm:w-auto"
              aria-label="Ver planos e preços da NEXPLAY"
            >
              {siteConfig.hero.secondaryCta}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="hero-enter hero-enter-delay-4 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              {siteConfig.hero.supportNote}
            </p>
            <a
              href="#planos"
              className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-neon/90 transition-colors hover:text-white"
            >
              {siteConfig.hero.scrollNote}
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="hero-enter hero-enter-delay-4 mt-8 grid max-w-xl grid-cols-1 gap-2.5 border-t border-white/[0.07] pt-6 sm:grid-cols-3">
            {siteConfig.hero.trust.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[0.72rem] font-medium leading-snug text-mist/90"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-neon/20 bg-neon/10 text-neon">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-enter hero-enter-delay-2 relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
