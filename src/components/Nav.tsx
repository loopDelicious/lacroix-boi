"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets, ShoppingBasket } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const LINKS = [
  { href: "#flavors", label: "Flavors" },
  { href: "#how", label: "How it works" },
  { href: "#zones", label: "Zones" },
  { href: "#plans", label: "Subscribe" },
];

export default function Nav() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b-2 border-ink bg-cream/90 backdrop-blur-md"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl border-2 border-ink bg-coral text-ink transition-transform duration-300 group-hover:rotate-12">
            <Droplets className="size-5" strokeWidth={2.6} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            LaCroix<span className="text-coral-deep"> Boi</span>
            <sup className="ml-0.5 font-hand text-sm text-ink-2">est. 2021</sup>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-mono text-[13px] font-medium tracking-[0.14em] uppercase text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-coral transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="btn-punch relative flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-2 font-display text-sm font-bold text-cream shadow-[3px_3px_0_0_#ff6b5e] sm:px-5"
          aria-label="Open cart"
        >
          <ShoppingBasket className="size-4" strokeWidth={2.4} />
          <span className="hidden sm:inline">Fizzy haul</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="grid min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] leading-5 font-black text-ink"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}
