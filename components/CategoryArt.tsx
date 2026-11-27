import type { ReactElement } from "react";
import type { Category } from "@/config/site";
import { cn } from "@/lib/utils";

type CategoryArtProps = {
  variant: Category["art"];
  className?: string;
};

const backgrounds: Record<Category["art"], string> = {
  films:
    "bg-[radial-gradient(ellipse_at_75%_20%,rgba(40,185,255,0.25),transparent_55%),linear-gradient(145deg,#0B1D38_0%,#050B16_70%)]",
  series:
    "bg-[radial-gradient(ellipse_at_25%_20%,rgba(8,123,255,0.28),transparent_58%),linear-gradient(145deg,#0C1B35_0%,#050A14_72%)]",
  channels:
    "bg-[radial-gradient(ellipse_at_80%_15%,rgba(40,185,255,0.24),transparent_56%),linear-gradient(145deg,#091C36_0%,#040A14_72%)]",
  sports:
    "bg-[radial-gradient(ellipse_at_50%_0%,rgba(40,185,255,0.22),transparent_50%),linear-gradient(145deg,#071B28_0%,#040A12_72%)]",
  kids:
    "bg-[radial-gradient(ellipse_at_70%_20%,rgba(40,185,255,0.3),transparent_52%),linear-gradient(145deg,#101A46_0%,#050916_72%)]",
  family:
    "bg-[radial-gradient(ellipse_at_50%_10%,rgba(8,123,255,0.24),transparent_55%),linear-gradient(145deg,#0B1A2D_0%,#04090F_72%)]",
};

function SharedDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#8FE4FF" />
        <stop offset="1" stopColor="#087BFF" />
      </linearGradient>
      <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#0C3D73" />
        <stop offset="0.55" stopColor="#07254A" />
        <stop offset="1" stopColor="#020812" />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop stopColor="#28B9FF" stopOpacity="0.7" />
        <stop offset="1" stopColor="#087BFF" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter id={`${id}-glow-filter`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="#28B9FF" strokeOpacity="0.08" />
      </pattern>
    </defs>
  );
}

function FilmsArt() {
  const id = "cat-films";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="365" cy="170" rx="250" ry="150" fill={`url(#${id}-glow)`} opacity="0.32" />
      <path d="M285 0L220 360H340L370 0H285Z" fill="#28B9FF" opacity="0.055" />
      <path d="M330 0L275 360H430L402 0H330Z" fill="#28B9FF" opacity="0.045" />

      <g transform="rotate(-8 300 270)" opacity="0.9">
        <rect x="72" y="246" width="456" height="58" rx="8" fill="#061326" stroke="#1B4C7F" />
        <rect x="72" y="246" width="456" height="58" rx="8" fill={`url(#${id}-screen)`} opacity="0.65" />
        {Array.from({ length: 9 }).map((_, index) => (
          <g key={index}>
            <rect x={90 + index * 49} y="254" width="17" height="8" rx="2" fill="#071B33" stroke="#2A5F91" strokeWidth="0.6" />
            <rect x={90 + index * 49} y="288" width="17" height="8" rx="2" fill="#071B33" stroke="#2A5F91" strokeWidth="0.6" />
          </g>
        ))}
        <rect x="145" y="266" width="24" height="18" rx="3" fill="#28B9FF" opacity="0.25" />
        <rect x="180" y="266" width="24" height="18" rx="3" fill="#28B9FF" opacity="0.18" />
        <rect x="215" y="266" width="24" height="18" rx="3" fill="#28B9FF" opacity="0.12" />
      </g>

      <g transform="rotate(-13 185 148)">
        <rect x="90" y="96" width="174" height="120" rx="12" fill="#06162C" stroke="#28699E" />
        <rect x="101" y="107" width="152" height="98" rx="7" fill="#020812" />
        <path d="M101 107H253V132H101V107Z" fill="#0B2B4C" />
        <path d="M115 107L101 132H123L137 107H115Z" fill="#28B9FF" opacity="0.25" />
        <path d="M163 107L149 132H171L185 107H163Z" fill="#28B9FF" opacity="0.25" />
        <path d="M211 107L197 132H219L233 107H211Z" fill="#28B9FF" opacity="0.25" />
        <circle cx="177" cy="163" r="20" fill="#087BFF" opacity="0.15" stroke="#28B9FF" strokeOpacity="0.5" />
        <path d="M172 154L186 163L172 172V154Z" fill="#DDF7FF" />
      </g>

      <g filter={`url(#${id}-glow-filter)`}>
        <circle cx="405" cy="140" r="66" fill="#06182D" fillOpacity="0.45" stroke="#5BCFFF" strokeOpacity="0.55" />
        <path d="M388 108L438 140L388 172V108Z" fill={`url(#${id}-line)`} />
      </g>

      <g opacity="0.55">
        <path d="M90 70L260 70" stroke="#28B9FF" strokeWidth="1" />
        <path d="M380 70L520 70" stroke="#28B9FF" strokeWidth="1" />
        <circle cx="90" cy="70" r="2" fill="#8FE4FF" />
        <circle cx="520" cy="70" r="2" fill="#8FE4FF" />
      </g>
    </>
  );
}

function SeriesArt() {
  const id = "cat-series";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="300" cy="160" rx="270" ry="150" fill={`url(#${id}-glow)`} opacity="0.3" />

      <g opacity="0.55" transform="translate(-8 12)">
        <rect x="90" y="85" width="152" height="190" rx="14" fill="#061426" stroke="#1A4168" />
        <rect x="102" y="98" width="128" height="126" rx="8" fill={`url(#${id}-screen)`} />
        <rect x="102" y="235" width="96" height="6" rx="3" fill="#1A4168" />
        <rect x="102" y="248" width="62" height="5" rx="2.5" fill="#123251" />
      </g>

      <g opacity="0.62" transform="translate(8 4)">
        <rect x="358" y="78" width="152" height="190" rx="14" fill="#061426" stroke="#1A4168" />
        <rect x="370" y="91" width="128" height="126" rx="8" fill={`url(#${id}-screen)`} />
        <rect x="370" y="228" width="96" height="6" rx="3" fill="#1A4168" />
        <rect x="370" y="241" width="62" height="5" rx="2.5" fill="#123251" />
      </g>

      <g>
        <rect x="208" y="62" width="184" height="236" rx="16" fill="#061426" stroke="#2A689F" />
        <rect x="221" y="76" width="158" height="164" rx="9" fill={`url(#${id}-screen)`} />
        <path d="M221 174C253 142 286 162 314 133C338 108 360 121 379 143V240H221V174Z" fill="#020A16" opacity="0.82" />
        <path d="M229 176C260 149 289 169 315 143C337 121 356 128 371 144" stroke="#28B9FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        <circle cx="300" cy="157" r="23" fill="#06182D" fillOpacity="0.55" stroke="#8FE4FF" strokeOpacity="0.6" />
        <path d="M294 146L308 157L294 168V146Z" fill="#EAF9FF" />
        <rect x="221" y="253" width="104" height="6" rx="3" fill="#1A4168" />
        <rect x="221" y="266" width="72" height="5" rx="2.5" fill="#123251" />
        <circle cx="369" cy="257" r="8" fill="#087BFF" opacity="0.18" />
        <path d="M366 253L372 257L366 261V253Z" fill="#8FE4FF" />
      </g>

      <g opacity="0.65">
        <path d="M120 52H180" stroke="#28B9FF" strokeWidth="1" />
        <path d="M420 322H480" stroke="#28B9FF" strokeWidth="1" />
        <circle cx="120" cy="52" r="2" fill="#8FE4FF" />
        <circle cx="480" cy="322" r="2" fill="#8FE4FF" />
      </g>
    </>
  );
}

function ChannelsArt() {
  const id = "cat-channels";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="395" cy="155" rx="260" ry="170" fill={`url(#${id}-glow)`} opacity="0.28" />

      <g transform="translate(70 84)">
        <rect x="0" y="0" width="268" height="168" rx="14" fill="#061426" stroke="#23517D" />
        <rect x="12" y="13" width="244" height="128" rx="8" fill={`url(#${id}-screen)`} />
        <path d="M12 107C61 76 97 99 132 72C169 43 201 62 256 94V141H12V107Z" fill="#020A16" opacity="0.75" />
        <path d="M28 93C68 70 99 86 132 64C166 41 199 53 244 84" stroke="#28B9FF" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
        <rect x="12" y="13" width="244" height="128" rx="8" fill="none" stroke="#2D6D9F" strokeOpacity="0.6" />
        <g transform="translate(34 35)">
          <rect width="64" height="20" rx="10" fill="#05150C" stroke="#25D366" strokeOpacity="0.35" />
          <circle cx="11" cy="10" r="2.5" fill="#25D366" />
          <rect x="20" y="8" width="33" height="4" rx="2" fill="#8FF5B4" opacity="0.7" />
        </g>
        <rect x="0" y="181" width="92" height="6" rx="3" fill="#1A4168" />
        <rect x="0" y="194" width="56" height="5" rx="2.5" fill="#123251" />
      </g>

      <g transform="translate(390 62)" filter={`url(#${id}-glow-filter)`}>
        <path d="M86 0V54" stroke="#28B9FF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="86" cy="62" r="8" fill="#8FE4FF" />
        <path d="M58 32C72 18 100 18 114 32" stroke="#28B9FF" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M42 16C65 -7 107 -7 130 16" stroke="#28B9FF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65" />
        <path d="M26 0C59 -33 113 -33 146 0" stroke="#28B9FF" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M48 92L86 68L124 92V206H48V92Z" fill="#07182E" stroke="#28699E" />
        <rect x="62" y="110" width="48" height="34" rx="5" fill="#020812" stroke="#1B4C7F" />
        <path d="M72 140L86 119L100 140" fill="none" stroke="#28B9FF" strokeWidth="1.3" />
        <rect x="66" y="158" width="40" height="5" rx="2.5" fill="#1A4168" />
        <rect x="72" y="170" width="28" height="4" rx="2" fill="#123251" />
        <circle cx="86" cy="193" r="5" fill="#28B9FF" opacity="0.5" />
      </g>

      <g opacity="0.55">
        <path d="M65 302H535" stroke="#28B9FF" strokeWidth="1" />
        <circle cx="65" cy="302" r="2" fill="#8FE4FF" />
        <circle cx="535" cy="302" r="2" fill="#8FE4FF" />
      </g>
    </>
  );
}

function SportsArt() {
  const id = "cat-sports";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="300" cy="160" rx="280" ry="155" fill={`url(#${id}-glow)`} opacity="0.25" />

      <path d="M70 0L180 360H420L530 0H70Z" fill="#28B9FF" opacity="0.05" />
      <path d="M120 0L214 360H386L480 0H120Z" fill="#28B9FF" opacity="0.04" />

      <g>
        <path d="M58 316L162 222H438L542 316H58Z" fill="#061927" stroke="#1F5C6B" />
        <path d="M104 316L188 238H412L496 316H104Z" fill="#082635" opacity="0.8" />
        <path d="M300 238V316" stroke="#28B9FF" strokeOpacity="0.28" />
        <ellipse cx="300" cy="277" rx="58" ry="23" fill="none" stroke="#28B9FF" strokeOpacity="0.3" />
        <path d="M226 316L268 238H332L374 316" fill="none" stroke="#28B9FF" strokeOpacity="0.2" />
        <path d="M58 316H542" stroke="#4CC7E8" strokeOpacity="0.45" />
      </g>

      <g>
        <path d="M60 0L156 235H104L24 0H60Z" fill="#28B9FF" opacity="0.08" />
        <path d="M540 0L444 235H496L576 0H540Z" fill="#28B9FF" opacity="0.08" />
        <rect x="40" y="0" width="50" height="18" rx="4" fill="#0B2030" stroke="#1F5C6B" />
        <rect x="510" y="0" width="50" height="18" rx="4" fill="#0B2030" stroke="#1F5C6B" />
        <g fill="#8FE4FF">
          <circle cx="52" cy="8" r="2.5" />
          <circle cx="66" cy="8" r="2.5" />
          <circle cx="80" cy="8" r="2.5" />
          <circle cx="522" cy="8" r="2.5" />
          <circle cx="536" cy="8" r="2.5" />
          <circle cx="550" cy="8" r="2.5" />
        </g>
      </g>

      <g filter={`url(#${id}-glow-filter)`}>
        <circle cx="300" cy="164" r="42" fill="#071A2B" stroke="#8FE4FF" strokeOpacity="0.65" strokeWidth="1.5" />
        <path d="M300 128L325 145L316 174H284L275 145L300 128Z" fill="none" stroke="#28B9FF" strokeWidth="1.5" />
        <path d="M300 128V164M275 145L300 164L325 145M284 174L300 164L316 174" stroke="#28B9FF" strokeWidth="1.2" opacity="0.7" />
      </g>

      <g opacity="0.6">
        <path d="M110 70H170" stroke="#28B9FF" />
        <path d="M430 70H490" stroke="#28B9FF" />
        <circle cx="110" cy="70" r="2" fill="#8FE4FF" />
        <circle cx="490" cy="70" r="2" fill="#8FE4FF" />
      </g>
    </>
  );
}

function KidsArt() {
  const id = "cat-kids";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="350" cy="170" rx="270" ry="180" fill={`url(#${id}-glow)`} opacity="0.32" />

      <g fill="#8FE4FF">
        <circle cx="92" cy="92" r="2" opacity="0.8" />
        <circle cx="154" cy="58" r="1.4" opacity="0.6" />
        <circle cx="498" cy="82" r="2.2" opacity="0.8" />
        <circle cx="544" cy="155" r="1.4" opacity="0.6" />
        <circle cx="462" cy="270" r="1.7" opacity="0.5" />
        <circle cx="116" cy="250" r="1.5" opacity="0.55" />
        <circle cx="220" cy="86" r="1.2" opacity="0.45" />
        <circle cx="390" cy="48" r="1.2" opacity="0.45" />
      </g>

      <g opacity="0.9">
        <circle cx="468" cy="104" r="30" fill="#0A2346" stroke="#28B9FF" strokeOpacity="0.5" />
        <ellipse cx="468" cy="104" rx="48" ry="14" fill="none" stroke="#28B9FF" strokeOpacity="0.32" transform="rotate(-18 468 104)" />
        <circle cx="456" cy="93" r="6" fill="#1A5D9A" opacity="0.8" />
        <circle cx="478" cy="112" r="4" fill="#1A5D9A" opacity="0.7" />
      </g>

      <g transform="translate(160 58) rotate(18)">
        <path d="M118 12C126 4 140 4 148 12L178 110C184 130 166 144 148 136L128 127L108 136C90 144 72 130 78 110L108 12Z" fill="#0A1D3C" stroke="#2E73AC" />
        <path d="M118 12C126 4 140 4 148 12L160 50H106L118 12Z" fill="#28B9FF" opacity="0.25" />
        <circle cx="133" cy="86" r="18" fill="#06152B" stroke="#8FE4FF" strokeOpacity="0.65" />
        <circle cx="133" cy="86" r="9" fill="#28B9FF" opacity="0.28" />
        <path d="M108 136L98 164L126 144M158 136L168 164L140 144" fill="none" stroke="#28B9FF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M112 76L84 66L106 92M154 76L182 66L160 92" fill="#0A1D3C" stroke="#2E73AC" />
      </g>

      <g opacity="0.75">
        <path d="M72 300C92 276 126 276 146 300C166 276 200 276 220 300H72Z" fill="#0A2346" stroke="#28B9FF" strokeOpacity="0.25" />
        <path d="M380 310C398 288 428 288 446 310C464 288 494 288 512 310H380Z" fill="#0A2346" stroke="#28B9FF" strokeOpacity="0.2" />
      </g>

      <g filter={`url(#${id}-glow-filter)`}>
        <path d="M300 186L316 216L348 220L324 242L330 274L300 258L270 274L276 242L252 220L284 216L300 186Z" fill="none" stroke="#8FE4FF" strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      </g>
    </>
  );
}

function FamilyArt() {
  const id = "cat-family";
  return (
    <>
      <SharedDefs id={id} />
      <rect width="600" height="360" fill={`url(#${id}-grid)`} />
      <ellipse cx="300" cy="150" rx="265" ry="160" fill={`url(#${id}-glow)`} opacity="0.3" />

      <g>
        <rect x="188" y="44" width="224" height="132" rx="10" fill="#020812" stroke="#28699E" strokeWidth="2" />
        <rect x="198" y="54" width="204" height="112" rx="6" fill={`url(#${id}-screen)`} />
        <path d="M198 126C226 102 254 118 278 94C305 67 335 83 402 122V166H198V126Z" fill="#020A16" opacity="0.8" />
        <path d="M210 111C235 93 259 105 281 86C306 64 332 75 390 108" stroke="#28B9FF" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
        <circle cx="300" cy="105" r="17" fill="#06182D" fillOpacity="0.6" stroke="#8FE4FF" strokeOpacity="0.55" />
        <path d="M296 97L306 105L296 113V97Z" fill="#EAF9FF" />
        <rect x="188" y="44" width="224" height="132" rx="10" fill="none" stroke="#2C6A9D" strokeOpacity="0.5" />
        <path d="M300 176V188" stroke="#1A4168" strokeWidth="3" />
        <rect x="262" y="188" width="76" height="7" rx="3.5" fill="#0A1A2B" stroke="#1A4168" />
      </g>

      <g>
        <path d="M118 276C118 247 142 228 176 228H424C458 228 482 247 482 276V306H118V276Z" fill="#07182A" stroke="#245A86" />
        <path d="M118 276H482V306H118V276Z" fill="#0A2038" />
        <path d="M142 306V322M458 306V322" stroke="#245A86" strokeWidth="3" strokeLinecap="round" />
        <path d="M190 276V247C190 238 198 231 207 231H393C402 231 410 238 410 247V276" fill="#0B223B" opacity="0.75" />
      </g>

      <g fill="#0D2B4A" stroke="#2D709F" strokeOpacity="0.55">
        <circle cx="248" cy="258" r="17" />
        <path d="M222 306C222 286 233 276 248 276C263 276 274 286 274 306H222Z" />
        <circle cx="300" cy="248" r="20" />
        <path d="M270 306C270 281 283 269 300 269C317 269 330 281 330 306H270Z" />
        <circle cx="354" cy="258" r="16" />
        <path d="M330 306C330 287 340 277 354 277C368 277 378 287 378 306H330Z" />
      </g>

      <g opacity="0.55">
        <path d="M86 120H146" stroke="#28B9FF" />
        <path d="M454 76H514" stroke="#28B9FF" />
        <circle cx="86" cy="120" r="2" fill="#8FE4FF" />
        <circle cx="514" cy="76" r="2" fill="#8FE4FF" />
      </g>
    </>
  );
}

const artByVariant: Record<Category["art"], () => ReactElement> = {
  films: FilmsArt,
  series: SeriesArt,
  channels: ChannelsArt,
  sports: SportsArt,
  kids: KidsArt,
  family: FamilyArt,
};

export function CategoryArt({ variant, className }: CategoryArtProps) {
  const Art = artByVariant[variant];

  return (
    <div
      className={cn(
        "relative h-44 overflow-hidden border-b border-white/[0.07] sm:h-48",
        backgrounds[variant],
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 360"
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        preserveAspectRatio="xMidYMid slice"
      >
        <Art />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060C17] via-[#060C17]/20 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.04),transparent_30%)]" />
    </div>
  );
}
