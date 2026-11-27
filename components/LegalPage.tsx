import Link from "next/link";
import { ArrowLeft, FileText, LockKeyhole } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalPageProps = {
  kind: "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

export function LegalPage({
  kind,
  eyebrow,
  title,
  description,
  sections,
}: LegalPageProps) {
  const Icon = kind === "privacy" ? LockKeyhole : FileText;

  return (
    <div className="relative overflow-hidden pb-20 pt-[calc(var(--header-height)+3rem)] sm:pb-24 sm:pt-[calc(var(--header-height)+4rem)]">
      <div
        className="grid-surface absolute inset-x-0 top-0 -z-10 h-[30rem] opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-electric/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="shell">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-mist transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Voltar para o início
        </Link>

        <div className="mt-8 flex flex-col gap-5">
          <span className="eyebrow">
            <Icon className="h-3 w-3" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="display-title max-w-4xl text-[clamp(2rem,6vw,3.6rem)] text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-[0.96rem] leading-relaxed text-mist">
            {description}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-mist/50">
            Última atualização: {siteConfig.legal.lastUpdated}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <nav aria-label="Nesta página">
              <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/50">
                Nesta página
              </p>
              <ol className="mt-3 space-y-1.5 border-l border-white/10 pl-4">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block py-0.5 text-[0.72rem] leading-snug text-mist transition-colors hover:text-white"
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-7 rounded-2xl border border-neon/15 bg-white/[0.025] p-4">
              <p className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.08em] text-white">
                Responsável pelo serviço
              </p>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-mist">
                {siteConfig.legal.companyName}
              </p>
              <p className="mt-1 text-[0.65rem] leading-relaxed text-mist/60">
                {siteConfig.legal.identificationNote}
              </p>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="rounded-2xl border border-neon/15 bg-[linear-gradient(145deg,rgba(8,123,255,0.08),rgba(6,12,23,0.72))] p-4 text-[0.78rem] leading-relaxed text-mist sm:p-5">
              {siteConfig.legal.responsibility}
            </div>

            <div className="mt-8 space-y-9">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="font-display text-[1.02rem] font-extrabold uppercase tracking-[0.03em] text-white">
                    <span className="mr-2 text-neon/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.85rem] leading-relaxed text-mist"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[0.85rem] leading-relaxed text-mist"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <h2 className="font-display text-[0.9rem] font-extrabold uppercase tracking-[0.04em] text-white">
                Fale com a NEXPLAY
              </h2>
              <p className="mt-2 max-w-xl text-[0.82rem] leading-relaxed text-mist">
                Para dúvidas sobre este documento, privacidade ou condições do
                serviço, use o canal oficial de atendimento pelo WhatsApp.
              </p>
              <WhatsAppLink
                messageKey="support"
                eventName="support_click"
                placement={`legal_${kind}`}
                variant="secondary"
                size="compact"
                className="mt-4"
                ariaLabel="Falar com a NEXPLAY sobre dúvidas legais ou de privacidade"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {siteConfig.whatsapp.display}
              </WhatsAppLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
