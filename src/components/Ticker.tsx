import { Sparkle, Droplets, Bike, Citrus } from "lucide-react";
import type { CSSProperties } from "react";

const ITEMS = [
  { text: "ICE-COLD", icon: Droplets },
  { text: "ZERO CALORIES", icon: Sparkle },
  { text: "BIG BOI ENERGY", icon: Citrus },
  { text: "BIKE-DELIVERED IN SF", icon: Bike },
  { text: "20-MIN ETAS", icon: Sparkle },
  { text: "NO JUDGMENT", icon: Droplets },
];

export default function Ticker({
  dark = false,
  fast = false,
  className = "",
}: {
  dark?: boolean;
  fast?: boolean;
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={`${item.text}-${i}`} className="flex items-center">
          <span className="mx-6 font-display text-sm font-bold tracking-[0.3em] uppercase sm:text-base">
            {item.text}
          </span>
          <item.icon className="size-4" strokeWidth={2.4} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y-2 py-3.5 ${
        dark ? "border-ink bg-ink text-cream" : "border-ink bg-lime-pop text-ink"
      } ${className}`}
      style={{ "--marquee-speed": fast ? "18s" : "28s" } as CSSProperties}
    >
      <div
        className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
