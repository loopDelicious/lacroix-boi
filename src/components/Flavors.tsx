"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PackagePlus, Star, TriangleAlert } from "lucide-react";
import CanGraphic from "@/components/CanGraphic";
import Reveal from "@/components/Reveal";
import { useCart, flavorToLine } from "@/components/CartProvider";
import { BOI_BOX, formatMoney, type Flavor } from "@/lib/catalog";

function FlavorCard({ flavor, index }: { flavor: Flavor; index: number }) {
  const { addItem } = useCart();
  const lowStock = flavor.stock <= 30;

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink bg-cream shadow-[0_0_0_0_#16122b] transition-shadow duration-300 hover:shadow-[8px_8px_0_0_#16122b]"
      >
        {/* can panel */}
        <div
          className="relative flex h-64 items-end justify-center overflow-hidden border-b-2 border-ink pb-0"
          style={{
            background: `linear-gradient(155deg, ${flavor.colorHex}40 0%, ${flavor.colorHex}14 55%, transparent 100%)`,
          }}
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 size-40 rounded-full opacity-25 blur-2xl"
            style={{ backgroundColor: flavor.colorHex }}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {flavor.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-tangerine px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                <Star className="size-3 fill-ink" /> Cult fave
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 rounded-full border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase ${
                lowStock ? "bg-coral text-cream" : "bg-cream"
              }`}
            >
              {lowStock && <TriangleAlert className="size-3" />}
              {flavor.stock} in the fridge
            </span>
          </div>
          <p className="absolute top-4 right-4 max-w-[7.5rem] text-right font-hand text-xl leading-tight text-ink/80 [transform:rotate(4deg)]">
            {flavor.tagline}
          </p>
          <motion.div
            className="relative h-52 w-[7.6rem] translate-y-3"
            animate={{ y: [12, 2, 12] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            <CanGraphic name={flavor.name} colorHex={flavor.colorHex} deepHex={flavor.deepHex} className="h-full w-full drop-shadow-[0_18px_16px_rgba(22,18,43,0.22)]" />
          </motion.div>
        </div>

        {/* body */}
        <div className="flex grow flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-extrabold tracking-tight">{flavor.name}</h3>
            <p className="font-serif text-lg text-ink-2 italic">8-pack</p>
          </div>
          <p className="mt-2 grow text-sm leading-relaxed text-ink-2">{flavor.description}</p>
          <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4">
            <p className="font-display text-xl font-extrabold">
              {formatMoney(flavor.priceCents)}
              <span className="ml-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink-2 uppercase">
                / 8 cans
              </span>
            </p>
            <button
              onClick={() => addItem(flavorToLine(flavor))}
              className="btn-punch inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-4 py-2 font-display text-sm font-bold text-cream"
              style={{ boxShadow: `3px 3px 0 0 ${flavor.colorHex}` }}
            >
              <PackagePlus className="size-4" strokeWidth={2.4} />
              Add
            </button>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Flavors({ flavors }: { flavors: Flavor[] }) {
  const { addItem } = useCart();

  return (
    <section id="flavors" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-coral-deep uppercase">
            The lineup
          </p>
          <h2 className="font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl">
            Pick your <span className="text-outline text-ink">poison</span>
            <span className="ml-3 hidden font-hand text-3xl font-bold tracking-normal text-coral-deep normal-case sm:inline-block [transform:rotate(-3deg)]">
              (it&apos;s just water)
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-ink-2">
            Six flavors in heavy rotation. Every 8-pack rides to you ice-cold,
            condensation and all.
          </p>
        </div>
        <p className="rounded-full border-2 border-ink bg-lime-pop px-5 py-2 font-mono text-xs font-bold tracking-[0.2em] uppercase shadow-[4px_4px_0_0_#16122b]">
          Free delivery over $20
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor, i) => (
          <FlavorCard key={flavor.slug} flavor={flavor} index={i} />
        ))}
      </div>

      {/* ---- boi box banner ---- */}
      <Reveal delay={0.1} className="mt-6">
        <div className="grid overflow-hidden rounded-[2.5rem] border-2 border-ink bg-ink text-cream shadow-[10px_10px_0_0_#ff6b5e] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-tangerine uppercase">
              Can&apos;t pick? Classic boi problem.
            </p>
            <h3 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {BOI_BOX.name}
            </h3>
            <p className="mt-4 max-w-md text-cream/80">{BOI_BOX.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["4× each flavor", "24 cans total", "Party armor", "Free delivery baked in"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-cream/30 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={() =>
                  addItem({
                    slug: BOI_BOX.slug,
                    name: `${BOI_BOX.name} · 24-pack`,
                    priceCents: BOI_BOX.priceCents,
                    kind: "box",
                    colorHex: "#FF6B5E",
                  })
                }
                className="btn-punch rounded-full border-2 border-cream bg-coral px-7 py-3.5 font-display text-base font-extrabold text-ink shadow-[5px_5px_0_0_#fff6ec]"
              >
                Load the box — {formatMoney(BOI_BOX.priceCents)}
              </button>
              <p className="font-hand text-2xl text-cream/90 [transform:rotate(-2deg)]">
                fridge goes brrrr
              </p>
            </div>
          </div>
          <div className="relative min-h-72 border-t-2 border-cream/20 lg:border-t-0 lg:border-l-2">
            <Image
              src="/images/boi-box.png"
              alt="The Boi Box — a 24-can variety crate of colorful sparkling water"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
