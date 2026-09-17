"use client";

import { useState } from "react";
import { Droplets, Send, Clock, MapPin, Heart } from "lucide-react";

const NAV = [
  { label: "Flavors", href: "#flavors" },
  { label: "How it works", href: "#how" },
  { label: "Zones & ETAs", href: "#zones" },
  { label: "Subscriptions", href: "#plans" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.4fr]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-xl border-2 border-cream bg-coral text-ink">
                <Droplets className="size-5" strokeWidth={2.6} />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight">
                LaCroix<span className="text-coral"> Boi</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              A fan-run sparkling water delivery club. Pedaled with love,
              condensation, and questionable quads across San Francisco.
            </p>
            <p className="mt-4 font-hand text-2xl text-cream/60 [transform:rotate(-1.5deg)]">
              not affiliated, just obsessed
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.24em] text-cream/50 uppercase">
              Ride the site
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-lg font-bold text-cream/85 transition-colors hover:text-coral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-cream/70">
              <p className="flex items-center gap-2">
                <Clock className="size-4 text-tangerine" /> Daily 10am – 10pm
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-tangerine" /> San Francisco only (for now)
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.24em] text-cream/50 uppercase">
              The Fizz Report
            </p>
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              New flavors, drop alerts, and courier lore. Monthly-ish. No spam
              — spam isn&apos;t sparkling.
            </p>
            {joined ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-lime-pop px-5 py-3 font-display font-bold text-lime-pop">
                <Send className="size-4" /> You&apos;re on the list, boi.
              </p>
            ) : (
              <form
                className="mt-5 flex max-w-sm items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setJoined(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@sf.boi"
                  className="w-full rounded-full border-2 border-cream/30 bg-transparent px-5 py-3 font-mono text-sm text-cream outline-none placeholder:text-cream/40 focus:border-coral"
                />
                <button
                  type="submit"
                  aria-label="Join the newsletter"
                  className="btn-punch grid size-12 shrink-0 place-items-center rounded-full border-2 border-cream bg-coral text-ink shadow-[3px_3px_0_0_#fff6ec]"
                >
                  <Send className="size-5" strokeWidth={2.4} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-cream/50 uppercase">
            © {new Date().getFullYear()} LaCroix Boi Delivery Club · SF, CA
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-cream/50 uppercase">
            Made with <Heart className="size-3.5 fill-coral text-coral" /> and zero calories
          </p>
        </div>
      </div>
    </footer>
  );
}
