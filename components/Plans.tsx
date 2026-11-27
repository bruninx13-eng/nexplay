import { ArrowRight, Check, Sparkles } from "lucide-react";
import { siteConfig, type Plan } from "@/config/site";
import { formatBRL, getMonthlyEquivalentCents } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [currency, amount] = formatBRL(plan.priceCents).split(" ");
  const monthlyEquivalent = getMonthlyEquivalentCents(
    plan.priceCents,
    plan.months,
  );

  return (
    <Reveal delay={Math.min(index * 75, 280)} className="h-full">
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-5 transition-all duration-300 sm:p-6",
          plan.highlight
            ? "border-neon/45 bg-[linear-gradient(165deg,rgba(8,123,255,0.18),rgba(6,15,29,0.96)_46%,rgba(5,7,13,0.98))] shadow-[0_0_0_1px_rgba(40,185,255,0.08),0_28px_80px_rgba(8,123,255,0.18)] xl:-translate-y-2"
            : "border-white/[0.1] bg-[linear-gradient(160deg,rgba(13,28,52,0.72),rgba(5,9,18,0.9))] hover:border-neon/30 hover:shadow-[0_22px_60px_rgba(0,40,100,0.24)]",
        )}
        data-plan={plan.id}
        data-plan-price={formatBRL(plan.priceCents)}
      >
        {plan.highlight && (
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent"
            aria-hidden="true"
          />
        )}

        <div className="flex min-h-7 items-start justify-between gap-3">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-mist/70">
              Plano
            </p>
            <h3 className="mt-1 font-display text-[1.05rem] font-extrabold uppercase tracking-[0.08em] text-white">
              {plan.name}
            </h3>
          </div>

          {plan.badge ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1.5 text-[0.52rem] font-extrabold uppercase tracking-[0.1em] text-[#9BE7FF]">
              <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
              {plan.badge}
            </span>
          ) : (
            <span className="mt-1 h-2 w-2 rounded-full bg-white/15" aria-hidden="true" />
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-end gap-1.5">
            <span className="mb-1.5 font-display text-[0.95rem] font-bold text-mist">
              {currency}
            </span>
            <span
              className={cn(
                "font-display text-[2.8rem] font-extrabold leading-none tracking-[-0.05em] sm:text-[3.05rem]",
                plan.highlight ? "text-white" : "text-frost",
              )}
            >
              {amount}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[0.64rem] font-semibold text-mist">
              <Check className="h-3 w-3 text-neon" aria-hidden="true" />
              {plan.durationLabel}
            </span>
            {plan.months > 1 && (
              <span className="inline-flex rounded-full border border-electric/20 bg-electric/[0.08] px-2.5 py-1 text-[0.64rem] font-semibold text-[#8FDBFF]">
                {formatBRL(monthlyEquivalent)}/mês
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-[0.8rem] leading-relaxed text-mist">
          {plan.description}
        </p>

        <div className="mt-6 flex-1" />

        <WhatsAppLink
          messageKey={plan.messageKey}
          eventName={plan.event}
          placement={`plan_${plan.id}`}
          variant={plan.highlight ? "primary" : "secondary"}
          className="w-full"
        >
          <WhatsAppIcon className="h-4.5 w-4.5" />
          Quero esse plano
          <span className="sr-only">
            {" "}
            — plano {plan.name} por {formatBRL(plan.priceCents)}
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </WhatsAppLink>
      </article>
    </Reveal>
  );
}

export function Plans() {
  return (
    <section id="planos" className="section overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_18%,rgba(8,123,255,0.14),transparent_52%)]"
        aria-hidden="true"
      />
      <div
        className="grid-surface absolute inset-x-0 top-0 -z-10 h-[36rem] opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-electric/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={siteConfig.plans.eyebrow}
            title={siteConfig.plans.title}
            subtitle={siteConfig.plans.subtitle}
          />
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-4 md:grid-cols-2 xl:mt-16 xl:grid-cols-4 xl:gap-4">
          {siteConfig.plans.items.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-mist/70">
            {siteConfig.plans.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
