/**
 * Hero illustration: a shirt-front sewing pattern overlaid with AI body
 * landmarks and a virtual try-on scan — fashion craft meets computer vision.
 */
export function HeroArt() {
  const landmarks: [number, number][] = [
    [172, 60],
    [292, 86],
    [322, 214],
    [312, 470],
    [110, 470],
    [110, 120],
  ];

  return (
    <div className="cut-lg pattern-grid relative aspect-[6/7] w-full overflow-hidden bg-linen-dark">
      <svg
        viewBox="0 0 480 560"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Illustration of a shirt sewing pattern with AI measurement points mapped onto it"
      >
        <defs>
          <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5F25FF" stopOpacity="0" />
            <stop offset="1" stopColor="#5F25FF" stopOpacity="0.18" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="#2F4A3A" />
          </marker>
        </defs>

        {/* Sleeve piece (behind) */}
        <g stroke="#2F4A3A" fill="none" strokeWidth="1.25">
          <path d="M338 318 C362 262 436 262 458 318 L446 524 L350 524 Z" fill="#F3EEE3" />
          <path d="M350 324 C370 278 426 278 446 324 L436 512 L360 512 Z" strokeDasharray="5 4" opacity="0.6" />
          <path d="M398 300 V500" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          <text x="406" y="430" fontSize="9" fontFamily="monospace" fill="#5E6B5A" transform="rotate(90 406 430)" stroke="none" letterSpacing="1.5">
            SLEEVE · CUT 2
          </text>
        </g>

        {/* Front bodice piece */}
        <g stroke="#2F4A3A" fill="none" strokeWidth="1.5">
          <path
            d="M110 120 Q160 118 172 60 L292 86 C282 140 286 196 322 214 L312 470 Q210 480 110 470 Z"
            fill="#F3EEE3"
          />
          {/* seam allowance */}
          <path
            d="M122 130 Q168 126 180 76 L280 97 C272 148 276 202 308 224 L300 458 Q210 467 122 458 Z"
            strokeWidth="1"
            strokeDasharray="5 4"
            opacity="0.6"
          />
          {/* waist dart */}
          <path d="M188 470 L206 344 L224 470" strokeWidth="1" />
          {/* grainline */}
          <path d="M150 170 V420" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          {/* notches */}
          <path d="M296 150 l10 -3 M302 186 l10 -4 M316 330 l10 0 M110 300 l-10 0" strokeWidth="1.5" />
          {/* buttons */}
          {[180, 240, 300, 360, 420].map((y) => (
            <circle key={y} cx="122" cy={y} r="3.5" strokeWidth="1" />
          ))}
          <text x="160" y="300" fontSize="10" fontFamily="monospace" fill="#2F4A3A" stroke="none" letterSpacing="2" transform="rotate(-90 160 300)">
            FRONT · CUT 1 · HTF-26
          </text>
        </g>

        {/* Measurement line */}
        <g stroke="#2F4A3A" strokeWidth="1" fill="#2F4A3A">
          <path d="M110 504 H312" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          <path d="M110 494 v20 M312 494 v20" />
          <rect x="178" y="494" width="66" height="20" fill="#E7DFCF" stroke="none" />
          <text x="211" y="508" fontSize="11" fontFamily="monospace" textAnchor="middle" stroke="none">
            48.5 cm
          </text>
        </g>

        {/* AI landmark mesh */}
        <g stroke="#5F25FF" strokeWidth="1" fill="none">
          <path d={`M${landmarks.map((p) => p.join(" ")).join(" L")} Z`} strokeDasharray="2 3" opacity="0.7" />
          <path d="M172 60 L322 214 M292 86 L110 470 M110 120 L312 470" opacity="0.25" />
          {/* circuit trace off to the side */}
          <path d="M322 214 H372 L392 194 V140 H440" />
          <path d="M110 120 H70 V60 H40" />
          <circle cx="440" cy="140" r="3" fill="#5F25FF" />
          <circle cx="40" cy="60" r="3" fill="#5F25FF" />
        </g>
        <g fill="#5F25FF">
          {landmarks.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x - 4} y={y - 4} width="8" height="8" />
              <rect x={x - 9} y={y - 9} width="18" height="18" fill="none" stroke="#5F25FF" strokeWidth="1" opacity="0.4" />
            </g>
          ))}
        </g>
        <text x="380" y="132" fontSize="9" fontFamily="monospace" fill="#5F25FF" letterSpacing="1">
          SHOULDER 0.98
        </text>
        <text x="28" y="50" fontSize="9" fontFamily="monospace" fill="#5F25FF" letterSpacing="1">
          NECK 0.96
        </text>

        {/* Terracotta tailor's mark */}
        <path d="M232 250 l14 14 M246 250 l-14 14" stroke="#B5583A" strokeWidth="2" />

        {/* Try-on scan line */}
        <g className="scan-line" style={{ ["--scan-distance" as string]: "470px" }}>
          <rect x="0" y="0" width="480" height="60" fill="url(#scan)" />
          <rect x="0" y="59" width="480" height="1.5" fill="#5F25FF" />
        </g>
      </svg>
    </div>
  );
}
