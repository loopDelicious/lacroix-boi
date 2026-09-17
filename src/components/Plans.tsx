"use client";

import { Check, Crown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { planToLine, useCart } from "@/components/CartProvider";
import { PLANS, formatMoney } from "@/lib/catalog";
import Bubbles from "@/components/Bubbles";

export default function Plans() {
  const { addItem } = useCart();

  return (
    <section id="plans" className="relative overflow-hidden border-y-2 border-ink bg-ink py-24 text-cream">
      <Bubbles density={22} opacity={0.35} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-tangerine uppercase">
              Weekly hydration subscriptions
            </p>
            <h2 className="font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl">
              Become a <span className="font-serif normal-case italic text-coral">subscribed boi</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-cream/75">
              Never fridge-empty again. Cans appear weekly like magic, except
              it&apos;s a guy named Marcus on a fixie.
            </p>
          </div>
          <p className="max-w-xs text-right font-hand text-2xl text-cream/80 [transform:rotate(-2deg)]">
            skip a week, swap flavors, cancel anytime — we&apos;re not your landlord
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.slug} delay={i * 0.12} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[2rem] border-2 p-7 transition-transform duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "md:-translate-y-4 border-cream bg-coral text-ink shadow-[8px_8px_0_0_#fff6ec] hover:md:-translate-y-6"
                    : "border-cream/25 bg-cream/5 shadow-[6px_6px_0_0_rgba(255,246,236,0.15)]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border-2 border-ink bg-tangerine px-4 py-1 font-mono text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-ink uppercase shadow-[3px_3px_0_0_#16122b]">
                    <Crown className="size-3.5" /> The people&apos;s choice
                  </span>
                )}
                <p
                  className={`font-mono text-[11px] font-bold tracking-[0.24em] uppercase ${
                    plan.popular ? "text-ink/70" : "text-cream/60"
                  }`}
                >
                  {plan.cans} / {plan.cadence}
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight uppercase">
                  {plan.name}
                </h3>
                <p className="mt-4 font-display text-5xl font-extrabold">
                  {formatMoney(plan.priceCents)}
                  <span className={`ml-1 font-mono text-xs font-medium tracking-[0.14em] uppercase ${plan.popular ? "text-ink/70" : "text-cream/60"}`}>
                    /week
                  </span>
                </p>
                <ul className="mt-6 grow space-y-2.5">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 ${
                          plan.popular ? "border-ink bg-ink text-coral" : "border-cream/40 text-tangerine"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3.2} />
                      </span>
                      <span className={plan.popular ? "text-ink/85" : "text-cream/80"}>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addItem(planToLine(plan))}
                  className={`btn-punch mt-8 rounded-full border-2 px-6 py-3.5 font-display text-base font-extrabold ${
                    plan.popular
                      ? "border-ink bg-ink text-cream shadow-[4px_4px_0_0_#fff6ec]"
                      : "border-cream bg-cream text-ink shadow-[4px_4px_0_0_#ff6b5e]"
                  }`}
                >
                  Lock it in
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
