"use client";

import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  getWhatsAppUrl,
  whatsAppLinkProps,
  type WhatsAppMessageKey,
} from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  messageKey: WhatsAppMessageKey;
  eventName?: AnalyticsEventName;
  placement: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "green" | "plain";
  size?: "default" | "compact";
  className?: string;
  ariaLabel?: string;
};

const variantClasses = {
  primary: "cta cta-primary",
  secondary: "cta cta-secondary",
  green:
    "cta border border-[#4ee383]/40 bg-[#25D366] text-[#04140a] shadow-[0_14px_38px_rgba(37,211,102,0.24)] hover:bg-[#2ee06f] hover:shadow-[0_18px_44px_rgba(37,211,102,0.34)]",
  plain: "",
} as const;

export function WhatsAppLink({
  messageKey,
  eventName = "whatsapp_click",
  placement,
  children,
  variant = "primary",
  size = "default",
  className,
  ariaLabel,
}: WhatsAppLinkProps) {
  const href = getWhatsAppUrl(messageKey);

  function handleTracking() {
    trackEvent(eventName, { placement, message_key: messageKey });
  }

  return (
    <a
      href={href}
      {...whatsAppLinkProps}
      onClick={handleTracking}
      onAuxClick={handleTracking}
      className={cn(
        variantClasses[variant],
        variant !== "plain" && size === "compact" && "cta-compact",
        className,
      )}
      aria-label={ariaLabel}
      data-whatsapp-link="true"
      data-message-key={messageKey}
      data-tracking-event={eventName}
    >
      {children}
    </a>
  );
}
