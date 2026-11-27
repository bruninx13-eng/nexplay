/**
 * Composição vetorial original com os dispositivos citados na página.
 * Sem marcas, sistemas ou interfaces de terceiros.
 */
export function DeviceShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[610px]">
      <div
        className="absolute inset-10 -z-10 rounded-full bg-electric/15 blur-[80px]"
        aria-hidden="true"
      />
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3 sm:p-5">
        <div className="relative aspect-[1.06/1] overflow-hidden rounded-[1.4rem] border border-white/[0.05] bg-[radial-gradient(ellipse_at_50%_35%,rgba(8,123,255,0.12),transparent_60%),#040912]">
          <svg
            viewBox="0 0 600 566"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Ilustração de Smart TV, TV Box, smartphone Android, tablet e computador"
          >
            <defs>
              <linearGradient id="dev-screen" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#0B3B70" />
                <stop offset="0.55" stopColor="#061F42" />
                <stop offset="1" stopColor="#020812" />
              </linearGradient>
              <linearGradient id="dev-neon" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#8FE4FF" />
                <stop offset="1" stopColor="#087BFF" />
              </linearGradient>
              <radialGradient id="dev-glow">
                <stop stopColor="#28B9FF" stopOpacity="0.55" />
                <stop offset="1" stopColor="#087BFF" stopOpacity="0" />
              </radialGradient>
              <filter id="dev-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
              <filter id="dev-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="dev-grid" width="34" height="34" patternUnits="userSpaceOnUse">
                <path d="M34 0H0V34" fill="none" stroke="#28B9FF" strokeOpacity="0.055" />
              </pattern>
              <clipPath id="dev-tv-clip">
                <rect x="86" y="106" width="312" height="188" rx="6" />
              </clipPath>
            </defs>

            <rect width="600" height="566" fill="url(#dev-grid)" />
            <ellipse cx="300" cy="265" rx="285" ry="220" fill="url(#dev-glow)" opacity="0.2" />

            <g opacity="0.3">
              <ellipse cx="300" cy="275" rx="242" ry="218" fill="none" stroke="#28B9FF" strokeDasharray="3 8" />
              <ellipse cx="300" cy="275" rx="190" ry="164" fill="none" stroke="#28B9FF" strokeDasharray="2 10" opacity="0.65" />
            </g>

            <g>
              <rect x="76" y="96" width="332" height="211" rx="12" fill="#02050A" stroke="#265780" strokeWidth="2" />
              <rect x="86" y="106" width="312" height="188" rx="6" fill="url(#dev-screen)" />
              <g clipPath="url(#dev-tv-clip)">
                <ellipse cx="330" cy="150" rx="155" ry="120" fill="#28B9FF" opacity="0.13" filter="url(#dev-soft)" />
                <path d="M86 235C135 200 176 220 215 188C257 154 295 170 336 205C362 228 381 218 398 208V294H86V235Z" fill="#020A16" opacity="0.8" />
                <path d="M92 231C139 199 177 218 216 188C257 156 292 172 331 202C358 223 377 214 395 204" stroke="#28B9FF" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
                <path d="M108 257C153 229 191 243 227 217C264 190 301 201 338 229C360 245 378 238 394 230" stroke="#087BFF" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
                <circle cx="242" cy="197" r="26" fill="#06182D" fillOpacity="0.55" stroke="#8FE4FF" strokeOpacity="0.6" />
                <path d="M235 184L250 197L235 210V184Z" fill="#EAF9FF" />
                <g fill="#B9EEFF">
                  <circle cx="126" cy="136" r="1.4" />
                  <circle cx="358" cy="130" r="1.2" />
                  <circle cx="332" cy="260" r="1.2" />
                  <circle cx="146" cy="264" r="1" />
                </g>
              </g>
              <rect x="76" y="96" width="332" height="211" rx="12" fill="none" stroke="#2E73AC" strokeOpacity="0.45" />
              <path d="M216 307H268" stroke="#1A4168" strokeWidth="4" strokeLinecap="round" />
              <path d="M242 307V326" stroke="#1A4168" strokeWidth="4" />
              <path d="M198 330H286" stroke="#1A4168" strokeWidth="5" strokeLinecap="round" />
              <circle cx="242" cy="316" r="1.8" fill="#28B9FF" />
            </g>

            <g>
              <rect x="424" y="108" width="126" height="178" rx="14" fill="#02050A" stroke="#28699E" strokeWidth="2" />
              <rect x="434" y="120" width="106" height="145" rx="7" fill="url(#dev-screen)" />
              <path d="M434 217C457 195 478 207 494 190C511 172 528 180 540 195V265H434V217Z" fill="#020A16" opacity="0.78" />
              <path d="M441 211C463 193 481 202 497 187C512 173 526 179 537 191" stroke="#28B9FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
              <circle cx="487" cy="174" r="17" fill="#06182D" fillOpacity="0.55" stroke="#8FE4FF" strokeOpacity="0.5" />
              <path d="M483 166L492 174L483 182V166Z" fill="#EAF9FF" />
              <circle cx="487" cy="276" r="3.5" fill="none" stroke="#2A5F91" />
              <rect x="434" y="278" width="38" height="4" rx="2" fill="#123251" />
            </g>

            <g>
              <rect x="465" y="324" width="76" height="156" rx="16" fill="#02050A" stroke="#28699E" strokeWidth="2" />
              <rect x="473" y="337" width="60" height="126" rx="8" fill="url(#dev-screen)" />
              <path d="M473 407C487 393 498 402 508 390C519 377 527 383 533 393V463H473V407Z" fill="#020A16" opacity="0.78" />
              <path d="M478 403C491 392 501 399 510 389C519 379 526 383 532 391" stroke="#28B9FF" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
              <circle cx="503" cy="383" r="12" fill="#06182D" fillOpacity="0.5" stroke="#8FE4FF" strokeOpacity="0.45" />
              <path d="M500 377L507 383L500 389V377Z" fill="#EAF9FF" />
              <rect x="492" y="470" width="22" height="3" rx="1.5" fill="#1A4168" />
            </g>

            <g>
              <rect x="66" y="352" width="244" height="151" rx="9" fill="#02050A" stroke="#245A86" strokeWidth="2" />
              <rect x="76" y="362" width="224" height="125" rx="4" fill="url(#dev-screen)" />
              <path d="M76 447C112 423 144 437 176 414C210 389 243 401 300 435V487H76V447Z" fill="#020A16" opacity="0.8" />
              <path d="M82 441C118 419 148 432 179 412C212 390 242 400 294 429" stroke="#28B9FF" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
              <rect x="76" y="362" width="224" height="125" rx="4" fill="none" stroke="#2A5F91" strokeOpacity="0.35" />
              <path d="M46 503H330L356 528H20L46 503Z" fill="#07101C" stroke="#1A4168" />
              <path d="M20 528H356" stroke="#28B9FF" strokeOpacity="0.4" />
              <path d="M150 515H226" stroke="#1A4168" strokeWidth="3" strokeLinecap="round" />
            </g>

            <g>
              <rect x="338" y="380" width="98" height="43" rx="8" fill="#07101C" stroke="#245A86" strokeWidth="1.5" />
              <rect x="346" y="388" width="82" height="5" rx="2.5" fill="#123251" />
              <circle cx="424" cy="412" r="3" fill="#25D366" filter="url(#dev-glow-filter)" />
              <path d="M338 404H328" stroke="#28B9FF" strokeOpacity="0.45" strokeDasharray="2 4" />
            </g>

            <g opacity="0.7">
              <path d="M398 216L424 198" stroke="#28B9FF" strokeDasharray="3 5" strokeOpacity="0.5" />
              <path d="M338 380L312 340" stroke="#28B9FF" strokeDasharray="3 5" strokeOpacity="0.45" />
              <path d="M465 410L436 405" stroke="#28B9FF" strokeDasharray="3 5" strokeOpacity="0.45" />
              <circle cx="424" cy="198" r="2.5" fill="#8FE4FF" />
              <circle cx="312" cy="340" r="2.5" fill="#8FE4FF" />
              <circle cx="436" cy="405" r="2.5" fill="#8FE4FF" />
            </g>

            <g filter="url(#dev-glow-filter)">
              <circle cx="112" cy="120" r="4" fill="#28B9FF" opacity="0.65" />
              <circle cx="568" cy="304" r="3" fill="#28B9FF" opacity="0.5" />
              <circle cx="48" cy="330" r="2.5" fill="#28B9FF" opacity="0.45" />
            </g>
          </svg>

          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-ink/75 px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-mist backdrop-blur-md sm:left-4 sm:top-4">
            Compatibilidade sob consulta
          </div>
        </div>
      </div>
    </div>
  );
}
