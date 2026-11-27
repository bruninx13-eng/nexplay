import {
  CalendarClock,
  Headphones,
  MessageCircle,
  MonitorSmartphone,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { siteConfig, type Benefit } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const benefitIcons: Record<Benefit["icon"], LucideIcon> = {
  whatsapp: MessageCircle,
  install: Wrench,
  calendar: CalendarClock,
  devices: MonitorSmartphone,
  support: Headphones,
  audience: Users,
};

export function Benefits() {
  return (
    <section id="vantagens" className="section overflow-hidden">
      <div
        className="absolute right-0 top-1/4 -z-10 h-[30rem] w-[30rem] translate-x-1/3 rounded-full bg-electric/[0.07] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow={siteConfig.benefits.eyebrow}
              title={siteConfig.benefits.title}
              subtitle={siteConfig.benefits.subtitle}
              align="left"
            />
          </Reveal>

          <Reveal delay={100} className="lg:justify-self-end">
            <div className="flex max-w-md items-center gap-3 rounded-2xl border border-neon/15 bg-white/[0.025] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#25D366]/25 bg-[#25D366]/10 text-[#5DE68F]">
                <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-white">
                  Atendimento direto
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-mist">
                  Nossa equipe responde pelo WhatsApp comercial.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {siteConfig.benefits.items.map((benefit, index) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <Reveal key={benefit.title} delay={Math.min(index * 60, 240)}>
                <article className="feature-card group h-full p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-box">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[0.68rem] font-bold tracking-[0.18em] text-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[0.92rem] font-extrabold uppercase leading-snug tracking-[0.04em] text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-mist">
                    {benefit.description}
                  </p>

                  <div
                    className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-electric via-neon to-transparent transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
