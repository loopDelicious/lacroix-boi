import Image from "next/image";
import { MousePointerClick, Bike, GlassWater } from "lucide-react";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    icon: MousePointerClick,
    title: "Pick your pack",
    body: "Build a lineup of 8-packs or grab the Boi Box. Subs ship weekly, one-timers ship now.",
    footnote: "decisions are hard, water is easy",
  },
  {
    n: "02",
    icon: Bike,
    title: "We bike like hell",
    body: "A real human courier clips in and carves SF's hills with a cooler full of fizz strapped to the rack.",
    footnote: "our quads have quads",
  },
  {
    n: "03",
    icon: GlassWater,
    title: "Crack one open",
    body: "Door knock, cold cans, condensation on your palm. Hydration achieved. Respect earned.",
    footnote: "pshhht — the sound of success",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-y-2 border-ink bg-cream-2 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-coral-deep uppercase">
            The sacred ritual
          </p>
          <h2 className="font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl">
            Door-fridge <span className="font-serif normal-case italic text-coral-deep">in minutes</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12} className="h-full">
              <div className="relative flex h-full flex-col rounded-[2rem] border-2 border-ink bg-cream p-7 shadow-[6px_6px_0_0_#16122b]">
                <div className="flex items-start justify-between">
                  <span className="text-outline font-display text-6xl font-extrabold text-ink">
                    {step.n}
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl border-2 border-ink bg-lime-pop shadow-[3px_3px_0_0_#16122b]">
                    <step.icon className="size-6" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 grow leading-relaxed text-ink-2">{step.body}</p>
                <p className="mt-5 font-hand text-2xl text-coral-deep [transform:rotate(-1.5deg)]">
                  {step.footnote}
                </p>
                {i < STEPS.length - 1 && (
                  <span className="absolute top-1/2 -right-5 hidden h-0.5 w-7 border-t-2 border-dashed border-ink/50 md:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14">
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-[2.5rem] border-2 border-ink shadow-[10px_10px_0_0_#16122b]">
              <div className="relative aspect-[16/8]">
                <Image
                  src="/images/courier.jpg"
                  alt="A LaCroix Boi courier cycling up a steep San Francisco hill with a crate of sparkling water"
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 sm:bottom-7 sm:left-8">
                  <p className="font-display text-2xl font-extrabold text-cream uppercase sm:text-4xl">
                    Hills are a <span className="text-tangerine">suggestion</span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-bold tracking-[0.24em] text-cream/80 uppercase">
                    Courier #7 · Filbert St. · 11:42 AM
                  </p>
                </div>
              </div>
            </div>
            <p className="absolute -top-5 right-6 rounded-full border-2 border-ink bg-magenta-pop px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-cream uppercase shadow-[3px_3px_0_0_#16122b] [transform:rotate(3deg)]">
              Definitely legal speed
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
