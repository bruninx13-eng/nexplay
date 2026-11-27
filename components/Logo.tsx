import { cn } from "@/lib/utils";

type LogoProps = {
  idSuffix: string;
  className?: string;
  compact?: boolean;
  wordmarkClassName?: string;
};

/**
 * Logotipo original NEXPLAY: monograma N com um símbolo de reprodução
 * integrado ao traço, em azul elétrico e neon.
 */
export function Logo({
  idSuffix,
  className,
  compact = false,
  wordmarkClassName,
}: LogoProps) {
  const gradientId = `nexplay-mark-${idSuffix}`;
  const glowId = `nexplay-glow-${idSuffix}`;
  const maskId = `nexplay-play-${idSuffix}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0 drop-shadow-[0_0_14px_rgba(8,123,255,0.28)] sm:h-10 sm:w-10"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="12"
            y1="8"
            x2="38"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#28B9FF" />
            <stop offset="1" stopColor="#087BFF" />
          </linearGradient>
          <filter id={glowId} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="1.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id={maskId}>
            <rect width="48" height="48" fill="white" />
            <path d="M21.1 18.9L28 23.2L21.1 27.5V18.9Z" fill="black" />
          </mask>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="46.5"
          height="46.5"
          rx="12.75"
          fill="#071120"
          stroke="#16467C"
          strokeWidth="1.5"
        />
        <path
          d="M13 34V14L35 34V14"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          mask={`url(#${maskId})`}
        />
        <path d="M21.1 18.9L28 23.2L21.1 27.5V18.9Z" fill="#FFFFFF" />
      </svg>

      <span className="flex min-w-0 flex-col justify-center">
        <span
          className={cn(
            "font-display text-[1.08rem] font-extrabold leading-none tracking-[0.15em] text-white sm:text-[1.2rem]",
            wordmarkClassName,
          )}
        >
          NEXPLAY
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[0.43rem] font-semibold uppercase leading-none tracking-[0.28em] text-mist/80 sm:block">
            Entretenimento digital
          </span>
        )}
      </span>
    </span>
  );
}
