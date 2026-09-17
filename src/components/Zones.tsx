"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Timer } from "lucide-react";
import Reveal from "@/components/Reveal";
import { NEIGHBORHOODS } from "@/lib/catalog";

export default function Zones() {
  const [selected, setSelected] = useState(NEIGHBORHOODS[2]);

  return (
    <section id="zones" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-coral-deep uppercase">
            Turf report
          </p>
          <h2 className="font-display text-5xl font-extrabold tracking-tight uppercase sm:text-6xl">
            If you can see <span className="text-outline text-ink">Sutro Tower</span>, we&apos;re coming
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-2">
            Every neighborhood, every hill, every fog bank. ETAs are real —
            our couriers ride like the rent is due (it is).
          </p>

          <div className="mt-9 rounded-[2rem] border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_0_#16122b]">
            <label htmlFor="hood" className="font-mono text-[11px] font-bold tracking-[0.24em] text-ink-2 uppercase">
              Check your block
            </label>
            <select
              id="hood"
              value={selected.name}
              onChange={(e) => {
                const found = NEIGHBORHOODS.find((n) => n.name === e.target.value);
                if (found) setSelected(found);
              }}
              className="mt-3 w-full cursor-pointer rounded-xl border-2 border-ink bg-cream-2 px-4 py-3 font-display text-lg font-bold outline-none focus:bg-white"
            >
              {NEIGHBORHOODS.map((n) => (
                <option key={n.name} value={n.name}>
                  {n.name}
                </option>
              ))}
            </select>
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-4"
            >
              <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-teal-pop text-cream shadow-[3px_3px_0_0_#16122b]">
                <Timer className="size-7" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-display text-3xl font-extrabold">
                  ~{selected.eta} <span className="text-lg">min</span>
                </p>
                <p className="font-hand text-xl text-coral-deep">
                  {selected.blurb ?? "Cold cans inbound to " + selected.name + "."}
                </p>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {NEIGHBORHOODS.map((n, i) => (
            <Reveal key={n.name} delay={Math.min(i * 0.04, 0.4)}>
              <button
                onClick={() => setSelected(n)}
                className={`group w-full rounded-2xl border-2 border-ink p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                  selected.name === n.name
                    ? "bg-ink text-cream shadow-[5px_5px_0_0_#ff6b5e]"
                    : "bg-cream shadow-[3px_3px_0_0_#16122b] hover:bg-cream-2"
                }`}
              >
                <MapPin
                  className={`size-4 ${selected.name === n.name ? "text-coral" : "text-coral-deep"}`}
                  strokeWidth={2.4}
                />
                <p className="mt-2 font-display text-base leading-tight font-extrabold tracking-tight">
                  {n.name}
                </p>
                <p
                  className={`mt-1 font-mono text-[10px] font-bold tracking-[0.18em] uppercase ${
                    selected.name === n.name ? "text-cream/70" : "text-ink-2"
                  }`}
                >
                  ~{n.eta} min
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
