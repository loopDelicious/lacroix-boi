"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Bike, MapPin, Send, Star } from "lucide-react";
import Bubbles from "@/components/Bubbles";

function useStats() {
  const [stats, setStats] = useState({ hydrated: 4187, liters: 12904, avgEta: 19 });
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.hydrated === "number") setStats(data);
      })
      .catch(() => {});
  }, []);
  return stats;
}

function CountUp({ target, className = "" }: { target: number; className?: string }) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return (
    <span className={className}>{value.toLocaleString()}</span>
  );
}

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function validateAnnouncementEmail(raw: string): string | null {
  const email = raw.trim();
  if (!email) return "Enter an email and we'll send the announcement.";
  if (email.length > 254) return "That email is too long.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email, like you@sf.boi.";
  return null;
}

function SpinBadge() {
  return (
    <div className="animate-spin-slow relative size-28 sm:size-32">
      <svg viewBox="0 0 100 100" className="size-full">
        <defs>
          <path id="badge-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-ink" />
        <text className="fill-cream font-mono text-[9.5px] font-bold tracking-[0.22em]">
          <textPath href="#badge-circle">100% BOI APPROVED • SF ONLY • 0 CAL •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <Star className="size-7 fill-tangerine text-tangerine" />
      </div>
    </div>
  );
}

export default function Hero() {
  const stats = useStats();
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCan = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-16">
      <Bubbles density={30} opacity={0.4} />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-6 lg:px-10 lg:pt-16 lg:pb-24">
        {/* ---- copy ---- */}
        <motion.div style={{ y: yText }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream-2 px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
          >
            <Bike className="size-4" strokeWidth={2.4} />
            SF&apos;s fizziest delivery crew
          </motion.p>

          <h1 className="font-display text-[13.5vw] leading-[0.9] font-extrabold tracking-[-0.03em] uppercase sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Ice-cold
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-outline block text-ink"
            >
              Sparkling
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Water{" "}
              <em className="font-serif text-coral-deep normal-case italic tracking-normal">
                delivered.
              </em>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-2"
          >
            We bike ice-cold seltzer to your door anywhere in San Francisco.
            Zero calories, zero judgment, <span className="font-hand text-2xl text-coral-deep">infinite drip.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-xl"
          >
            <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              Coming soon to San Francisco
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Leave your email and we&apos;ll send the announcement when the bikes roll out.
            </p>
            {joined ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-lime-pop px-5 py-3 font-display font-extrabold text-ink shadow-[4px_4px_0_0_#16122b]">
                <Send className="size-4" /> You&apos;re on the list. We&apos;ll ping you.
              </p>
            ) : (
              <form
                className="mt-4"
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  const message = validateAnnouncementEmail(email);
                  setEmailError(message);
                  if (message) return;

                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: email.trim() }),
                    });
                    const data = (await res.json().catch(() => null)) as { error?: string } | null;
                    if (!res.ok) {
                      setEmailError(data?.error ?? "We couldn't save that just now. Try once more.");
                      return;
                    }
                    setJoined(true);
                  } catch {
                    setEmailError("We couldn't save that just now. Try once more.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="hero-announcement-email" className="sr-only">
                      Email for the San Francisco announcement
                    </label>
                    <input
                      id="hero-announcement-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(validateAnnouncementEmail(e.target.value));
                      }}
                      placeholder="you@sf.boi"
                      aria-invalid={emailError ? true : undefined}
                      aria-describedby={emailError ? "hero-announcement-email-error" : undefined}
                      className="w-full rounded-full border-2 border-ink bg-cream px-5 py-3.5 font-mono text-sm text-ink outline-none placeholder:text-ink/40 focus:border-coral"
                    />
                    {emailError ? (
                      <p id="hero-announcement-email-error" className="mt-2 px-2 text-sm font-medium text-coral-deep">
                        {emailError}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-punch inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-ink bg-coral px-6 py-3.5 font-display text-base font-extrabold text-ink shadow-[5px_5px_0_0_#16122b] disabled:cursor-wait disabled:opacity-70"
                  >
                    <Send className="size-4" />
                    {submitting ? "Saving…" : "Get the announcement"}
                  </button>
                </div>
              </form>
            )}
            <a
              href="#how"
              className="btn-punch mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-7 py-3.5 font-display text-base font-extrabold text-ink shadow-[5px_5px_0_0_#16122b]"
            >
              How it works <ArrowDown className="size-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t-2 border-ink/10 pt-6"
          >
            {[
              { label: "bois hydrated", value: stats.hydrated, suffix: "", icon: MapPin },
              { label: "oz of fizz moved", value: stats.liters, suffix: "", icon: null },
              { label: "min avg. ETA", value: stats.avgEta, suffix: "", icon: null },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-extrabold sm:text-3xl">
                  <CountUp target={s.value} />
                </p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- can panel ---- */}
        <motion.div
          style={{ y: yCan }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-gradient-to-br from-coral via-tangerine to-magenta-pop shadow-[8px_8px_0_0_#16122b]"
          >
            <Bubbles density={18} opacity={0.55} maxRadius={7} />
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, -1.2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/3]"
            >
              <Image
                src="/images/boi-twink.png"
                alt="A courier hauling a crate of LaCroix up a San Francisco hill"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="absolute -top-5 -right-3 sm:-right-6">
            <SpinBadge />
          </div>

          <motion.p
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: -6 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="absolute top-8 -left-2 font-hand text-2xl text-ink sm:text-3xl"
          >
            u up? hydrate
          </motion.p>
          <motion.p
            initial={{ opacity: 0, rotate: 8 }}
            animate={{ opacity: 1, rotate: 4 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="absolute -bottom-7 right-2 font-hand text-2xl text-ink sm:text-3xl"
          >
            zero cal, main chair energy
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
