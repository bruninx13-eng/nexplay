import {
  Baby,
  Film,
  Info,
  MonitorPlay,
  Radio,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { siteConfig, type Category } from "@/config/site";
import { CategoryArt } from "@/components/CategoryArt";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const categoryIcons: Record<Category["icon"], LucideIcon> = {
  film: Film,
  series: MonitorPlay,
  live: Radio,
  sports: Trophy,
  kids: Baby,
  family: Users,
};

export function Entertainment() {
  return (
    <section id="entretenimento" className="section">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-electric/[0.06] blur-[110px]"
        aria-hidden="true"
      />

      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={siteConfig.entertainment.eyebrow}
            title={siteConfig.entertainment.title}
            subtitle={siteConfig.entertainment.subtitle}
          />
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {siteConfig.entertainment.categories.map((category, index) => {
            const Icon = categoryIcons[category.icon];

            return (
              <Reveal key={category.id} delay={Math.min(index * 65, 260)}>
                <article className="group feature-card h-full">
                  <div className="relative">
                    <CategoryArt variant={category.art} />
                    <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-ink/70 px-2 py-1 font-display text-[0.58rem] font-bold tracking-[0.16em] text-white/55 backdrop-blur-md">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 p-5 sm:p-6">
                    <span className="icon-box mt-0.5 h-11 w-11 rounded-xl">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[0.98rem] font-extrabold uppercase tracking-[0.055em] text-white">
                        {category.title}
                      </h3>
                      <p className="mt-1.5 text-[0.84rem] leading-relaxed text-mist">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-neon/15"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-mist/70">
            <Info
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon/70"
              aria-hidden="true"
            />
            {siteConfig.entertainment.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
