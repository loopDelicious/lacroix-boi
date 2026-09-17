import { Quote } from "lucide-react";

type Quote_ = { text: string; name: string; hood: string; rotate: string };

const ROW_A: Quote_[] = [
  {
    text: "My fridge went from 'kombucha sadness' to full boi status in one delivery.",
    name: "Maya R.",
    hood: "The Mission",
    rotate: "[transform:rotate(-1.2deg)]",
  },
  {
    text: "They biked up Russian Hill in horizontal rain. The cans were somehow still colder than my ex's texts.",
    name: "Devon K.",
    hood: "Russian Hill",
    rotate: "[transform:rotate(0.8deg)]",
  },
  {
    text: "Pamplemousse pairs beautifully with standing in line for brunch. Ten out of ten.",
    name: "Priya S.",
    hood: "Hayes Valley",
    rotate: "[transform:rotate(-0.6deg)]",
  },
  {
    text: "Ordered at 2:03. Heard the crack of a can on my porch at 2:19. These people are not well (compliment).",
    name: "Jules T.",
    hood: "SoMa",
    rotate: "[transform:rotate(1.1deg)]",
  },
];

const ROW_B: Quote_[] = [
  {
    text: "The courier fist-bumped my dog. The dog now refuses non-boi beverages.",
    name: "Sam O.",
    hood: "Inner Sunset",
    rotate: "[transform:rotate(1deg)]",
  },
  {
    text: "Coconut LaCroix discourse tore our group chat apart. Boi Box healed it. Miracle water.",
    name: "Ari W.",
    hood: "Castro",
    rotate: "[transform:rotate(-1deg)]",
  },
  {
    text: "I set a standing weekly sub so I never have to make a decision again. Best $24 of my SF budget.",
    name: "Mei L.",
    hood: "Richmond",
    rotate: "[transform:rotate(0.7deg)]",
  },
  {
    text: "Fog-chilled delivery is real. The can arrived pre-nipped by Karl himself.",
    name: "Theo B.",
    hood: "Sunset",
    rotate: "[transform:rotate(-0.8deg)]",
  },
];

function QuoteCard({ q }: { q: Quote_ }) {
  return (
    <figure
      className={`mx-3 w-80 shrink-0 rounded-[1.75rem] border-2 border-ink bg-cream p-6 shadow-[5px_5px_0_0_#16122b] ${q.rotate}`}
    >
      <Quote className="size-5 fill-coral text-coral" />
      <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">{q.text}</blockquote>
      <figcaption className="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-3">
        <span className="font-display text-sm font-extrabold">{q.name}</span>
        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-ink-2 uppercase">
          {q.hood}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const row = (items: Quote_[], ariaHidden: boolean) =>
    items.map((q, i) => <QuoteCard key={`${q.name}-${i}-${ariaHidden}`} q={q} />);

  return (
    <section className="overflow-hidden border-b-2 border-ink bg-teal-pop py-20">
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-ink/70 uppercase">
          Word on the street
        </p>
        <h2 className="font-display text-5xl font-extrabold tracking-tight text-ink uppercase sm:text-6xl">
          Hydrated bois <em className="font-serif normal-case italic">say the darnedest things</em>
        </h2>
      </div>

      <div className="space-y-5">
        <div className="flex w-max animate-marquee">
          <div className="flex shrink-0">{row(ROW_A, false)}</div>
          <div className="flex shrink-0" aria-hidden>{row(ROW_A, true)}</div>
        </div>
        <div className="flex w-max animate-marquee [animation-direction:reverse]">
          <div className="flex shrink-0">{row(ROW_B, false)}</div>
          <div className="flex shrink-0" aria-hidden>{row(ROW_B, true)}</div>
        </div>
      </div>
    </section>
  );
}
