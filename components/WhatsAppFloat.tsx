import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <div className="group fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <WhatsAppLink
        messageKey="general"
        eventName="whatsapp_click"
        placement="floating_button"
        variant="plain"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#6df59d]/45 bg-[#25D366] text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 hover:bg-[#2ee06f] focus-visible:outline-offset-4 sm:h-16 sm:w-16"
        ariaLabel="Falar com a NEXPLAY pelo WhatsApp"
      >
        <span
          className="absolute inset-0 -z-10 animate-pulse-glow rounded-full"
          aria-hidden="true"
        />
        <WhatsAppIcon className="h-7 w-7" />
      </WhatsAppLink>

      <span className="pointer-events-none absolute right-[4.4rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-ink/90 px-3 py-1.5 text-[0.65rem] font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Fale com a NEXPLAY
      </span>
    </div>
  );
}
