"use client";

import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/4 -z-10 h-[26rem] w-[26rem] translate-x-1/3 rounded-full bg-electric/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={siteConfig.faq.eyebrow}
              title={siteConfig.faq.title}
              subtitle={siteConfig.faq.subtitle}
              align="left"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 rounded-2xl border border-neon/15 bg-white/[0.025] p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neon/20 bg-electric/10 text-neon">
                  <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-[0.74rem] font-extrabold uppercase tracking-[0.07em] text-white">
                    Ainda tem dúvidas?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    Converse com nossa equipe e receba orientação pelo WhatsApp.
                  </p>
                  <WhatsAppLink
                    messageKey="support"
                    eventName="support_click"
                    placement="faq"
                    variant="plain"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-bold text-neon transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Falar com a equipe
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-2.5">
          {siteConfig.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;

            return (
              <Reveal key={item.question} delay={Math.min(index * 35, 180)}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-neon/30 bg-[linear-gradient(145deg,rgba(8,123,255,0.09),rgba(6,12,23,0.88))]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                    >
                      <span
                        className={cn(
                          "text-[0.88rem] font-semibold leading-snug transition-colors sm:text-[0.93rem]",
                          isOpen ? "text-white" : "text-frost/85",
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-neon/30 bg-neon/10 text-neon"
                            : "border-white/10 bg-white/[0.035] text-mist",
                        )}
                        aria-hidden="true"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 text-[0.83rem] leading-relaxed text-mist sm:px-5 sm:text-[0.87rem]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
