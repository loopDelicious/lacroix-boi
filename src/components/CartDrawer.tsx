"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  CalendarClock,
  Loader2,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import Bubbles from "@/components/Bubbles";
import {
  DELIVERY_FEE_CENTS,
  FREE_DELIVERY_THRESHOLD_CENTS,
  NEIGHBORHOODS,
  formatMoney,
} from "@/lib/catalog";

type Stage = "cart" | "checkout" | "success";

type OrderResult = {
  orderCode: string;
  etaMinutes: number;
  courierName: string;
  totalCents: number;
};

const INPUT_CLS =
  "w-full rounded-xl border-2 border-ink/20 bg-cream px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-coral-deep";

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, clear, subtotalCents } = useCart();
  const [stage, setStage] = useState<Stage>("cart");
  const [orderType, setOrderType] = useState<"one-time" | "weekly">("one-time");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  const hasPlan = items.some((i) => i.kind === "plan");
  const feeCents = useMemo(() => {
    if (items.length === 0) return 0;
    if (hasPlan || orderType === "weekly") return 0;
    return subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS ? 0 : DELIVERY_FEE_CENTS;
  }, [items.length, hasPlan, orderType, subtotalCents]);
  const totalCents = subtotalCents + feeCents;

  const reset = () => {
    setStage("cart");
    setError(null);
    setResult(null);
  };

  const close = () => {
    closeCart();
    if (stage === "success") {
      clear();
      reset();
    }
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      orderType: hasPlan ? "weekly" : orderType,
      customerName: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      neighborhood: String(form.get("neighborhood") || ""),
      deliveryNotes: String(form.get("notes") || ""),
      items: items.map((i) => ({
        slug: i.slug,
        kind: i.kind,
        qty: i.qty,
      })),
    };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something fizzled out. Try again.");
      } else {
        setResult(data as OrderResult);
        setStage("success");
      }
    } catch {
      setError("The courier hit a pothole. Check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l-2 border-ink bg-cream"
            role="dialog"
            aria-label="Cart"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b-2 border-ink bg-lime-pop px-6 py-4">
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight uppercase">
                <ShoppingBasket className="size-5" strokeWidth={2.4} />
                Your fizzy haul
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="btn-punch grid size-9 place-items-center rounded-full border-2 border-ink bg-cream"
              >
                <X className="size-4" strokeWidth={2.6} />
              </button>
            </div>

            {/* ---------------- SUCCESS VIEW ---------------- */}
            {stage === "success" && result ? (
              <div className="relative flex grow flex-col items-center justify-center overflow-hidden p-8 text-center">
                <Bubbles density={30} opacity={0.5} />
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative"
                >
                  <span className="mx-auto grid size-20 place-items-center rounded-full border-2 border-ink bg-tangerine shadow-[4px_4px_0_0_#16122b]">
                    <Bike className="size-10" strokeWidth={2} />
                  </span>
                  <h3 className="mt-6 font-display text-4xl font-extrabold tracking-tight uppercase">
                    Order locked in
                  </h3>
                  <p className="mt-2 font-hand text-2xl text-coral-deep">
                    {result.courierName} is stretching right now
                  </p>
                  <div className="mt-6 space-y-2 rounded-2xl border-2 border-dashed border-ink/30 p-5 font-mono text-sm">
                    <p>
                      ORDER <span className="font-bold">{result.orderCode}</span>
                    </p>
                    <p>
                      ETA <span className="font-bold">~{result.etaMinutes} MIN</span>
                    </p>
                    <p>
                      TOTAL <span className="font-bold">{formatMoney(result.totalCents)}</span>
                    </p>
                  </div>
                  <p className="mt-5 text-sm text-ink-2">
                    Confirmation headed to your inbox. Have a glass ready.
                  </p>
                  <button
                    onClick={close}
                    className="btn-punch mt-8 rounded-full border-2 border-ink bg-ink px-8 py-3.5 font-display font-extrabold text-cream shadow-[4px_4px_0_0_#ff6b5e]"
                  >
                    Back to vibing
                  </button>
                </motion.div>
              </div>
            ) : items.length === 0 ? (
              /* ---------------- EMPTY VIEW ---------------- */
              <div className="flex grow flex-col items-center justify-center p-8 text-center">
                <span className="grid size-20 place-items-center rounded-full border-2 border-dashed border-ink/30 text-ink/40">
                  <ShoppingBasket className="size-9" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase">Dry in here</h3>
                <p className="mt-2 max-w-[230px] text-sm text-ink-2">
                  Your haul is empty and frankly so is your fridge — let&apos;s fix both.
                </p>
                <a
                  href="#flavors"
                  onClick={close}
                  className="btn-punch mt-7 rounded-full border-2 border-ink bg-coral px-7 py-3 font-display font-extrabold text-ink shadow-[4px_4px_0_0_#16122b]"
                >
                  Shop the lineup
                </a>
              </div>
            ) : (
              /* ---------------- CART / CHECKOUT VIEW ---------------- */
              <>
                <div className="grow overflow-y-auto px-6 py-5">
                  {/* items */}
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={`${item.kind}-${item.slug}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex items-center gap-3 rounded-2xl border-2 border-ink/15 bg-white/60 p-3"
                        >
                          <span
                            className="size-11 shrink-0 rounded-xl border-2 border-ink"
                            style={{ backgroundColor: item.colorHex ?? "#ccc" }}
                          />
                          <div className="min-w-0 grow">
                            <p className="truncate font-display text-sm font-extrabold">{item.name}</p>
                            <p className="font-mono text-[11px] text-ink-2">
                              {formatMoney(item.priceCents)}
                              {item.kind === "plan" ? " / week" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(item.slug, item.kind, item.qty - 1)}
                              className="grid size-7 place-items-center rounded-full border-2 border-ink bg-cream hover:bg-cream-2"
                            >
                              <Minus className="size-3.5" strokeWidth={2.6} />
                            </button>
                            <span className="w-6 text-center font-display text-sm font-extrabold">
                              {item.qty}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(item.slug, item.kind, item.qty + 1)}
                              className="grid size-7 place-items-center rounded-full border-2 border-ink bg-cream hover:bg-cream-2"
                            >
                              <Plus className="size-3.5" strokeWidth={2.6} />
                            </button>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(item.slug, item.kind)}
                              className="ml-1 grid size-7 place-items-center rounded-full text-ink/40 transition-colors hover:text-coral-deep"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {stage === "cart" && (
                    <div className="mt-6">
                      <button
                        onClick={() => setStage("checkout")}
                        className="btn-punch w-full rounded-full border-2 border-ink bg-ink px-6 py-4 font-display text-lg font-extrabold text-cream shadow-[5px_5px_0_0_#ff6b5e]"
                      >
                        Checkout — {formatMoney(totalCents)}
                      </button>
                    </div>
                  )}

                  {/* ------------- checkout form ------------- */}
                  {stage === "checkout" && (
                    <motion.form
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={submit}
                      className="mt-6 space-y-4 border-t-2 border-dashed border-ink/20 pt-6"
                    >
                      {!hasPlan && (
                        <div>
                          <p className="mb-2 font-mono text-[11px] font-bold tracking-[0.2em] text-ink-2 uppercase">
                            How often?
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {(
                              [
                                { v: "one-time", label: "One-time drop", icon: Zap },
                                { v: "weekly", label: "Weekly sub", icon: CalendarClock },
                              ] as const
                            ).map((opt) => (
                              <button
                                type="button"
                                key={opt.v}
                                onClick={() => setOrderType(opt.v)}
                                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-all ${
                                  orderType === opt.v
                                    ? "border-ink bg-ink text-cream shadow-[3px_3px_0_0_#ff6b5e]"
                                    : "border-ink/20 bg-cream hover:border-ink"
                                }`}
                              >
                                <opt.icon className="size-4" />
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {orderType === "weekly" && (
                            <p className="mt-2 font-hand text-xl text-coral-deep">
                              smart boi — delivery&apos;s on us, pause anytime
                            </p>
                          )}
                        </div>
                      )}

                      <input name="name" required minLength={2} placeholder="Full name" className={INPUT_CLS} />
                      <input name="email" required type="email" placeholder="Email" className={INPUT_CLS} />
                      <input name="phone" type="tel" placeholder="Phone (for the dramatic door text)" className={INPUT_CLS} />
                      <input name="address" required minLength={6} placeholder="Street address + unit" className={INPUT_CLS} />
                      <select name="neighborhood" required defaultValue="" className={INPUT_CLS}>
                        <option value="" disabled>
                          Pick your neighborhood
                        </option>
                        {NEIGHBORHOODS.map((n) => (
                          <option key={n.name} value={n.name}>
                            {n.name} — ~{n.eta} min
                          </option>
                        ))}
                      </select>
                      <textarea
                        name="notes"
                        rows={2}
                        maxLength={280}
                        placeholder="Gate code, floor, 'leave with the houseplant'…"
                        className={`${INPUT_CLS} resize-none`}
                      />

                      {error && (
                        <p className="rounded-xl border-2 border-coral-deep bg-coral/10 px-4 py-3 text-sm font-bold text-coral-deep">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-punch flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-coral px-6 py-4 font-display text-lg font-extrabold text-ink shadow-[5px_5px_0_0_#16122b] disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="size-5 animate-spin" /> Sending to dispatch…
                          </>
                        ) : (
                          <>Send it — {formatMoney(totalCents)}</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </div>

                {/* totals footer */}
                <div className="space-y-1.5 border-t-2 border-ink bg-cream-2 px-6 py-4 font-mono text-sm">
                  <p className="flex justify-between">
                    <span className="text-ink-2">Subtotal</span>
                    <span className="font-bold">{formatMoney(subtotalCents)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-ink-2">Delivery</span>
                    <span className="font-bold">
                      {feeCents === 0 ? "FREE (nice)" : formatMoney(feeCents)}
                    </span>
                  </p>
                  <p className="flex justify-between border-t-2 border-dashed border-ink/20 pt-2 font-display text-lg font-extrabold tracking-tight">
                    <span>Total</span>
                    <span>{formatMoney(totalCents)}</span>
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
