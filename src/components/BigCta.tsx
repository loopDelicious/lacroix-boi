import { ArrowUpRight } from "lucide-react";
import Bubbles from "@/components/Bubbles";
import Reveal from "@/components/Reveal";

export default function BigCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coral via-magenta-pop to-grape py-28 text-cream">
      <Bubbles density={44} opacity={0.7} maxRadius={12} />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="mb-4 font-hand text-3xl [transform:rotate(-2deg)]">last call, hydration nation</p>
          <h2 className="font-display text-[16vw] leading-[0.85] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-9xl">
            Thirsty,
            <br />
            <span className="text-outline">boi?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-cream/85">
            Cold cans are twenty minutes away. Your future hydrated self says thanks.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#flavors"
              className="btn-punch inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-8 py-4 font-display text-lg font-extrabold text-ink shadow-[6px_6px_0_0_#16122b]"
            >
              Get the goods <ArrowUpRight className="size-5" strokeWidth={2.6} />
            </a>
            <a
              href="#plans"
              className="btn-punch rounded-full border-2 border-cream bg-transparent px-8 py-4 font-display text-lg font-extrabold text-cream shadow-[6px_6px_0_0_#16122b]"
            >
              Go full boi (subscribe)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
