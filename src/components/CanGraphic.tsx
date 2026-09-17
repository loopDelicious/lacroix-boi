type Props = {
  name: string;
  colorHex: string;
  deepHex: string;
  className?: string;
};

/**
 * A fully vector-rendered sparkling water can. Cylinder shading, brushed lid
 * and the signature watercolor swoosh are all CSS/SVG so every flavor stays
 * razor sharp and perfectly on-palette.
 */
export default function CanGraphic({ name, colorHex, deepHex, className = "" }: Props) {
  return (
    <div
      className={`relative select-none ${className}`}
      role="img"
      aria-label={`A can of ${name} sparkling water`}
    >
      {/* body */}
      <div
        className="absolute inset-x-0 top-[4%] bottom-0 overflow-hidden rounded-[1.75rem] border-2 border-ink/80"
        style={{ backgroundColor: colorHex }}
      >
        {/* watercolor swooshes */}
        <svg
          viewBox="0 0 200 340"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M-10 150 C 40 110, 70 190, 105 165 C 140 142, 160 195, 210 160 L 210 235 C 165 268, 135 208, 100 232 C 66 256, 42 176, -10 222 Z"
            fill={deepHex}
            opacity="0.95"
          />
          <path
            d="M-10 196 C 45 158, 78 226, 112 204 C 146 184, 168 236, 210 206 L 210 260 C 170 290, 138 240, 104 262 C 70 284, 40 220, -10 258 Z"
            fill="#FFF6EC"
            opacity="0.92"
          />
          <path
            d="M-10 240 C 50 206, 84 268, 118 248 C 152 230, 172 278, 210 252 L 210 320 L -10 320 Z"
            fill={colorHex}
            opacity="0.85"
          />
          <ellipse cx="52" cy="84" rx="34" ry="22" fill="#FFF6EC" opacity="0.35" />
          <ellipse cx="150" cy="64" rx="26" ry="16" fill={deepHex} opacity="0.28" />
        </svg>

        {/* label text */}
        <div className="absolute inset-0 flex flex-col items-center pt-[16%]">
          <p className="rounded-full bg-ink px-3 py-1 font-mono text-[0.55rem] font-bold tracking-[0.3em] text-cream uppercase">
            LaCroix Boi
          </p>
          <p className="mt-3 font-display text-[1.35rem] leading-none font-extrabold tracking-tight text-ink uppercase">
            Sparkling
          </p>
          <p className="font-display text-[1.35rem] leading-none font-extrabold tracking-tight text-ink uppercase">
            Water
          </p>
          <p
            className="mt-[34%] font-hand text-3xl leading-none font-bold"
            style={{ color: deepHex, textShadow: "0 1px 0 rgba(255,255,255,0.55)" }}
          >
            {name}
          </p>
          <p className="mt-1 font-mono text-[0.5rem] font-bold tracking-[0.28em] text-ink/70 uppercase">
            0 cal · all boi
          </p>
        </div>

        {/* cylinder shading + shine */}
        <div className="can-body absolute inset-0" />
        <div className="can-shine" />
        <div className="absolute inset-x-0 bottom-0 h-[7%] bg-black/25" />
      </div>

      {/* lid */}
      <div
        className="absolute inset-x-[3%] top-0 h-[8%] rounded-[50%] border-2 border-ink/80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 38%, #f4f4f6 0%, #cfd0d6 45%, #8f9098 100%)",
        }}
      >
        <div className="absolute inset-x-[18%] top-[22%] h-[52%] rounded-[50%] border border-black/25 bg-gradient-to-b from-black/10 to-transparent" />
      </div>
    </div>
  );
}
