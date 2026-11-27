import Link from "next/link";
import { ArrowUpRight, Globe, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";
import { Logo } from "@/components/Logo";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#04070d]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-electric/[0.08] blur-[100px]"
        aria-hidden="true"
      />

      <div className="shell relative py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div>
            <Link href="/">
              <Logo idSuffix="footer" />
            </Link>
            <p className="mt-5 font-display text-[0.78rem] font-bold uppercase tracking-[0.1em] text-frost/90">
              {siteConfig.slogan}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-mist">
              {siteConfig.footer.statement}
            </p>

            <WhatsAppLink
              messageKey="general"
              eventName="whatsapp_click"
              placement="footer"
              variant="plain"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/25 bg-[#25D366]/[0.07] px-3.5 py-2 text-[0.72rem] font-bold text-[#7FF0A8] transition-colors hover:border-[#25D366]/50 hover:bg-[#25D366]/10"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {siteConfig.whatsapp.display}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </WhatsAppLink>
          </div>

          <div>
            <h2 className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <WhatsAppLink
                  messageKey="general"
                  eventName="whatsapp_click"
                  placement="footer_nav"
                  variant="plain"
                  className="inline-flex items-center gap-1.5 text-xs text-mist transition-colors hover:text-white"
                  ariaLabel="Abrir conversa com a NEXPLAY no WhatsApp"
                >
                  WhatsApp
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </WhatsAppLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white">
              Informações
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="text-xs text-mist">
                <CookiePreferencesButton />
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white">
              Atendimento
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-xs leading-relaxed text-mist">
                <MessageCircle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon"
                  aria-hidden="true"
                />
                <span>
                  WhatsApp comercial
                  <br />
                  <WhatsAppLink
                    messageKey="general"
                    eventName="whatsapp_click"
                    placement="footer_contact"
                    variant="plain"
                    className="text-frost/90 transition-colors hover:text-white"
                  >
                    {siteConfig.whatsapp.display}
                  </WhatsAppLink>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-xs leading-relaxed text-mist">
                <Globe
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon"
                  aria-hidden="true"
                />
                <span>Atendimento digital pelo WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs leading-relaxed text-mist">
                <MessageCircle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon"
                  aria-hidden="true"
                />
                <span>Dúvidas e suporte pelo canal oficial de atendimento.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.07] pt-6">
          <p className="text-[0.7rem] leading-relaxed text-mist/80">
            {siteConfig.legal.responsibility} {siteConfig.legal.identificationNote}
          </p>
          <p className="mt-2 text-[0.65rem] leading-relaxed text-mist/70">
            Este produto usa a API do TMDB, mas não é endossado nem certificado
            pelo TMDB. Metadados, capas e sinopses fornecidos pelo{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline"
            >
              The Movie Database
            </a>
            .
          </p>
          <div className="mt-4 flex flex-col justify-between gap-3 text-[0.68rem] text-mist/80 sm:flex-row sm:items-center">
            <p>
              © {currentYear} NEXPLAY. Todos os direitos reservados.
            </p>
            <p>
              Conteúdos e disponibilidade sujeitos a confirmação no atendimento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
