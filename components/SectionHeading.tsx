import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading",
        align === "center" && "section-heading--center",
        className,
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={cn(
          "display-title text-[clamp(1.8rem,5.2vw,3rem)] text-white",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-[0.98rem] leading-relaxed text-mist sm:text-[1.05rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
