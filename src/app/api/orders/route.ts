import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import {
  BOI_BOX,
  DELIVERY_FEE_CENTS,
  FLAVORS,
  FREE_DELIVERY_THRESHOLD_CENTS,
  NEIGHBORHOODS,
  PLANS,
} from "@/lib/catalog";
import { randomInt } from "crypto";

const itemSchema = z.object({
  slug: z.string().min(1).max(64),
  kind: z.enum(["flavor", "box", "plan"]),
  qty: z.number().int().min(1).max(24),
});

const orderSchema = z.object({
  orderType: z.enum(["one-time", "weekly"]),
  customerName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  address: z.string().trim().min(6).max(200),
  neighborhood: z.string().min(1).max(60),
  deliveryNotes: z.string().trim().max(280).optional().or(z.literal("")),
  items: z.array(itemSchema).min(1).max(20),
});

const COURIERS = ["Marcus", "Juniper", "Tall Paul", "Dee", "Sosa", "Rye"];

async function flavorPrices(slugs: string[]): Promise<Map<string, { priceCents: number; name: string; colorHex: string }>> {
  const map = new Map<string, { priceCents: number; name: string; colorHex: string }>();
  let rows: { slug: string; priceCents: number; name: string; colorHex: string }[] = [];
  try {
    rows = await db
      .select({ slug: products.slug, priceCents: products.priceCents, name: products.name, colorHex: products.colorHex })
      .from(products)
      .where(inArray(products.slug, slugs));
  } catch {
    rows = [];
  }
  for (const row of rows) map.set(row.slug, { priceCents: row.priceCents, name: row.name, colorHex: row.colorHex });
  for (const f of FLAVORS) {
    if (!map.has(f.slug)) map.set(f.slug, { priceCents: f.priceCents, name: f.name, colorHex: f.colorHex });
  }
  return map;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body." }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid order." },
      { status: 400 },
    );
  }
  const order = parsed.data;

  const hood = NEIGHBORHOODS.find((n) => n.name === order.neighborhood);
  if (!hood) {
    return NextResponse.json({ error: "We don't ride there yet — pick an SF neighborhood." }, { status: 400 });
  }

  // Reconcile prices server-side; never trust client totals.
  const flavorSlugs = order.items.filter((i) => i.kind === "flavor").map((i) => i.slug);
  const prices = await flavorPrices(flavorSlugs);

  const lineItems: { slug: string; name: string; qty: number; unitPriceCents: number; kind: string }[] = [];
  for (const item of order.items) {
    if (item.kind === "flavor") {
      const p = prices.get(item.slug);
      if (!p) return NextResponse.json({ error: `Unknown flavor: ${item.slug}` }, { status: 400 });
      lineItems.push({ slug: item.slug, name: `${p.name} 8-pack`, qty: item.qty, unitPriceCents: p.priceCents, kind: "flavor" });
    } else if (item.kind === "box") {
      if (item.slug !== BOI_BOX.slug) return NextResponse.json({ error: "Unknown box." }, { status: 400 });
      lineItems.push({ slug: item.slug, name: `${BOI_BOX.name} · 24-pack`, qty: item.qty, unitPriceCents: BOI_BOX.priceCents, kind: "box" });
    } else {
      const plan = PLANS.find((pl) => pl.slug === item.slug);
      if (!plan) return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
      lineItems.push({ slug: item.slug, name: `${plan.name} · weekly sub`, qty: item.qty, unitPriceCents: plan.priceCents, kind: "plan" });
    }
  }

  const subtotalCents = lineItems.reduce((n, l) => n + l.qty * l.unitPriceCents, 0);
  const hasPlan = order.items.some((i) => i.kind === "plan");
  const deliveryFeeCents =
    hasPlan || order.orderType === "weekly" || subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS
      ? 0
      : DELIVERY_FEE_CENTS;
  const totalCents = subtotalCents + deliveryFeeCents;

  const orderCode = `BOI-${randomInt(0, 36 ** 5)
    .toString(36)
    .toUpperCase()
    .padStart(5, "0")}`;

  try {
    await db.insert(orders).values({
      orderCode,
      orderType: order.orderType,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone || null,
      address: order.address,
      neighborhood: order.neighborhood,
      deliveryNotes: order.deliveryNotes || null,
      items: lineItems,
      subtotalCents,
      deliveryFeeCents,
      totalCents,
      status: "pending",
    });
  } catch (err) {
    console.error("Failed to persist order", err);
    return NextResponse.json(
      { error: "Our dispatch board just glitched. Give it one more tap." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    orderCode,
    etaMinutes: hood.eta + randomInt(0, 6),
    courierName: COURIERS[randomInt(0, COURIERS.length)],
    totalCents,
  });
}
