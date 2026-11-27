import { Film, Play, Radio, Users } from "lucide-react";

/**
 * Cena vetorial original: uma televisão em uma sala cinematográfica escura.
 * O SVG é leve, nítido em qualquer tela e não depende de imagens externas.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[650px]">
      <div
        className="absolute -inset-12 -z-10 rounded-full bg-electric/20 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-4 top-6 -z-10 h-40 w-40 rounded-full bg-neon/20 blur-[70px]"
        aria-hidden="true"
      />

      <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.025] p-2.5 shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_0_1px_rgba(40,185,255,0.05)] backdrop-blur-sm sm:p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-[#040912]">
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Ilustração de uma televisão em uma sala moderna com iluminação azul cinematográfica"
          >
            <defs>
              <linearGradient id="hero-wall" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0B1424" />
                <stop offset="0.55" stopColor="#070D18" />
                <stop offset="1" stopColor="#03060C" />
              </linearGradient>
              <linearGradient id="hero-screen" x1="150" y1="120" x2="650" y2="420" gradientUnits="userSpaceOnUse">
                <stop stopColor="#03142B" />
                <stop offset="0.45" stopColor="#062752" />
                <stop offset="1" stopColor="#02060D" />
              </linearGradient>
              <linearGradient id="hero-neon" x1="170" y1="350" x2="660" y2="170" gradientUnits="userSpaceOnUse">
                <stop stopColor="#087BFF" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#28B9FF" />
                <stop offset="1" stopColor="#8FE4FF" />
              </linearGradient>
              <linearGradient id="hero-floor" x1="400" y1="430" x2="400" y2="600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0B1424" stopOpacity="0.5" />
                <stop offset="1" stopColor="#03060C" />
              </linearGradient>
              <radialGradient id="hero-glow" cx="0" cy="0" r="1" gradientTransform="translate(400 250) rotate(90) scale(270 390)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#087BFF" stopOpacity="0.35" />
                <stop offset="0.6" stopColor="#087BFF" stopOpacity="0.08" />
                <stop offset="1" stopColor="#087BFF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hero-screen-glow" cx="0" cy="0" r="1" gradientTransform="translate(540 170) rotate(120) scale(260 200)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#28B9FF" stopOpacity="0.5" />
                <stop offset="1" stopColor="#28B9FF" stopOpacity="0" />
              </radialGradient>
              <filter id="hero-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <filter id="hero-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="hero-screen-clip">
                <rect x="128" y="102" width="544" height="313" rx="9" />
              </clipPath>
              <pattern id="hero-slats" width="46" height="600" patternUnits="userSpaceOnUse">
                <rect width="2" height="600" fill="#1B3554" opacity="0.3" />
              </pattern>
            </defs>

            <rect width="800" height="600" fill="url(#hero-wall)" />
            <rect width="800" height="430" fill="url(#hero-slats)" opacity="0.55" />
            <ellipse cx="400" cy="254" rx="365" ry="270" fill="url(#hero-glow)" />

            <g opacity="0.5">
              <path d="M0 455H800" stroke="#173052" strokeWidth="1" />
              <path d="M0 466H800" stroke="#10233C" strokeWidth="1" />
            </g>

            <ellipse cx="400" cy="514" rx="290" ry="18" fill="#087BFF" opacity="0.08" filter="url(#hero-blur)" />

            <g>
              <rect x="111" y="83" width="578" height="353" rx="17" fill="#02050A" stroke="#1D3E66" strokeWidth="2" />
              <rect x="120" y="92" width="560" height="330" rx="12" fill="#050B16" />
              <rect x="128" y="102" width="544" height="313" rx="9" fill="url(#hero-screen)" />

              <g clipPath="url(#hero-screen-clip)">
                <rect x="128" y="102" width="544" height="313" fill="url(#hero-screen)" />
                <ellipse cx="540" cy="180" rx="260" ry="210" fill="url(#hero-screen-glow)" />

                <g opacity="0.72">
                  <path d="M128 322C222 258 292 302 365 257C430 217 493 230 566 277C613 307 647 292 672 273V415H128V322Z" fill="#020A16" />
                  <path d="M128 358C214 314 297 350 373 308C449 266 519 292 586 326C625 346 654 337 672 326V415H128V358Z" fill="#03101F" opacity="0.85" />
                </g>

                <g filter="url(#hero-soft-glow)">
                  <path d="M142 329C231 260 309 320 377 268C454 208 514 224 590 284C632 317 657 304 674 292" stroke="url(#hero-neon)" strokeWidth="2.4" strokeLinecap="round" opacity="0.9" />
                  <path d="M148 358C242 300 316 345 392 298C469 250 530 264 601 315C635 339 658 328 672 319" stroke="#28B9FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.38" />
                  <path d="M162 385C250 335 325 370 403 326C477 284 538 298 612 341" stroke="#087BFF" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
                </g>

                <g opacity="0.8">
                  <circle cx="186" cy="151" r="1.7" fill="#B9EEFF" />
                  <circle cx="238" cy="184" r="1.2" fill="#68D5FF" />
                  <circle cx="589" cy="144" r="1.4" fill="#B9EEFF" />
                  <circle cx="633" cy="205" r="1.7" fill="#68D5FF" />
                  <circle cx="539" cy="347" r="1.2" fill="#B9EEFF" />
                  <circle cx="308" cy="153" r="1" fill="#B9EEFF" />
                </g>

                <g opacity="0.8">
                  <circle cx="400" cy="255" r="41" fill="#06162C" fillOpacity="0.6" stroke="#8FD8FF" strokeOpacity="0.55" />
                  <path d="M392 239L416 255L392 271V239Z" fill="#EAF9FF" />
                </g>

                <g opacity="0.45">
                  <path d="M190 118V399" stroke="#28B9FF" strokeWidth="0.6" />
                  <path d="M610 118V399" stroke="#28B9FF" strokeWidth="0.6" />
                  <path d="M128 178H672" stroke="#28B9FF" strokeWidth="0.5" />
                  <path d="M128 332H672" stroke="#28B9FF" strokeWidth="0.5" />
                </g>

                <rect x="128" y="102" width="544" height="313" fill="url(#hero-screen-glow)" opacity="0.16" />
              </g>

              <rect x="111" y="83" width="578" height="353" rx="17" fill="none" stroke="#2C5D93" strokeOpacity="0.45" strokeWidth="1" />
              <path d="M363 443H437" stroke="#1A3554" strokeWidth="3" strokeLinecap="round" />
              <circle cx="400" cy="427" r="1.5" fill="#28B9FF" opacity="0.7" />
            </g>

            <g>
              <rect x="286" y="461" width="228" height="13" rx="6.5" fill="#08111F" stroke="#173354" />
              <circle cx="400" cy="467.5" r="1.5" fill="#28B9FF" opacity="0.7" />
            </g>

            <g>
              <rect x="94" y="512" width="612" height="17" rx="8.5" fill="#07101C" stroke="#132A45" />
              <rect x="117" y="516" width="568" height="2" rx="1" fill="#28B9FF" opacity="0.22" />
            </g>

            <g opacity="0.78">
              <path d="M714 512V480" stroke="#16314F" strokeWidth="2" />
              <ellipse cx="714" cy="512" rx="18" ry="5" fill="#0B1424" />
              <path d="M714 480C700 465 697 447 707 432C714 445 718 461 714 480Z" fill="#0D2B43" />
              <path d="M714 480C729 466 735 451 729 437C719 449 714 462 714 480Z" fill="#10354D" />
              <path d="M714 490C701 484 692 474 690 462C702 466 711 476 714 490Z" fill="#0B2438" />
            </g>

            <g opacity="0.42">
              <path d="M148 548H652" stroke="#087BFF" strokeWidth="1" />
              <path d="M188 558H612" stroke="#087BFF" strokeWidth="0.6" opacity="0.5" />
            </g>
          </svg>

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.035] to-transparent"
            aria-hidden="true"
          />

          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[#4ee383]/25 bg-[#04150b]/75 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#8ff5b4] backdrop-blur-md sm:left-4 sm:top-4">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
            Ao vivo
          </div>

          <div className="animate-float-slow absolute right-3 top-16 hidden items-center gap-2 rounded-xl border border-white/10 bg-ink/80 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-frost shadow-xl backdrop-blur-md sm:flex">
            <Film className="h-3.5 w-3.5 text-neon" aria-hidden="true" />
            Filmes
          </div>

          <div className="animate-float-slower absolute right-4 top-36 hidden items-center gap-2 rounded-xl border border-white/10 bg-ink/80 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-frost shadow-xl backdrop-blur-md sm:flex">
            <Radio className="h-3.5 w-3.5 text-neon" aria-hidden="true" />
            Canais
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/[0.78] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon/25 bg-electric/15 text-neon">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-white sm:text-[0.78rem]">
                Entretenimento para todos
              </p>
              <p className="mt-0.5 truncate text-[0.64rem] text-mist sm:text-[0.7rem]">
                Filmes, séries, esportes e mais.
              </p>
            </div>
            <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.12em] text-mist sm:flex">
              <Users className="h-3 w-3 text-neon" aria-hidden="true" />
              Família
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-4 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full bg-electric/20 blur-3xl"
        aria-hidden="true"
      />
    </div>
  );
}
