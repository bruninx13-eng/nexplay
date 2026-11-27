import {
  Box,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  type LucideIcon,
} from "lucide-react";
import { siteConfig, type Device } from "@/config/site";
import { DeviceShowcase } from "@/components/DeviceShowcase";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const deviceIcons: Record<Device["icon"], LucideIcon> = {
  tv: Tv,
  box: Box,
  phone: Smartphone,
  tablet: Tablet,
  monitor: Monitor,
};

export function Devices() {
  return (
    <section id="dispositivos" className="section overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-electric/[0.08] blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={siteConfig.devices.eyebrow}
            title={siteConfig.devices.title}
            subtitle={siteConfig.devices.subtitle}
            align="left"
          />
        </Reveal>

        <div className="mt-11 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {siteConfig.devices.items.map((device, index) => {
                const Icon = deviceIcons[device.icon];

                return (
                  <Reveal
                    key={device.title}
                    delay={Math.min(index * 55, 220)}
                    className={index === 4 ? "sm:col-span-2" : undefined}
                  >
                    <div className="feature-card flex h-full items-center gap-3.5 p-4">
                      <span className="icon-box h-10 w-10 rounded-xl">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[0.78rem] font-extrabold uppercase tracking-[0.055em] text-white">
                          {device.title}
                        </h3>
                        <p className="mt-0.5 text-[0.72rem] leading-relaxed text-mist">
                          {device.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={100}>
              <div className="mt-6 flex flex-col gap-4">
                <WhatsAppLink
                  messageKey="compatibility"
                  eventName="compatibility_click"
                  placement="devices"
                  variant="primary"
                  className="w-full sm:w-auto"
                  ariaLabel="Consultar compatibilidade do meu dispositivo pelo WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {siteConfig.devices.cta}
                </WhatsAppLink>
                <p className="max-w-xl text-xs leading-relaxed text-mist/70">
                  {siteConfig.devices.note}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full">
            <DeviceShowcase />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
