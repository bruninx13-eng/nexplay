"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "border-b border-white/[0.07] bg-ink/90 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-height)] items-center justify-between gap-5">
        <Link
          href="/#inicio"
          className="relative z-10 rounded-xl focus-visible:outline-offset-8"
          onClick={() => setIsOpen(false)}
        >
          <Logo idSuffix="header" />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.76rem] font-semibold transition-colors duration-200 hover:bg-white/[0.05] hover:text-white",
                isActive(item.href) ? "bg-white/[0.07] text-white" : "text-mist",
              )}
            >
              {item.shortLabel}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <WhatsAppLink
            messageKey="general"
            eventName="whatsapp_click"
            placement="header"
            variant="primary"
            size="compact"
            className="hidden sm:inline-flex"
            ariaLabel="Falar com a NEXPLAY pelo WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp</span>
          </WhatsAppLink>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-neon/40 hover:bg-white/[0.07] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={cn(
          "overflow-hidden border-t border-white/[0.06] bg-ink/95 backdrop-blur-2xl transition-[max-height,opacity] duration-300 lg:hidden",
          isOpen ? "max-h-[calc(100dvh-var(--header-height))] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="shell flex max-h-[calc(100dvh-var(--header-height))] flex-col gap-1 overflow-y-auto py-5"
          aria-label="Navegação móvel"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-12 items-center justify-between rounded-xl px-3 text-[0.95rem] font-semibold transition-colors hover:bg-white/[0.05] hover:text-white",
                isActive(item.href) ? "bg-white/[0.06] text-white" : "text-frost/90",
              )}
            >
              {item.label}
              <span className="text-neon/60" aria-hidden="true">
                →
              </span>
            </Link>
          ))}

          <WhatsAppLink
            messageKey="general"
            eventName="whatsapp_click"
            placement="mobile_menu"
            variant="primary"
            className="mt-4 w-full"
            ariaLabel="Falar com a NEXPLAY pelo WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar com a NEXPLAY
          </WhatsAppLink>

          <p className="mt-3 pb-1 text-center text-xs leading-relaxed text-mist">
            {siteConfig.hero.supportNote}
          </p>
        </nav>
      </div>
    </header>
  );
}
