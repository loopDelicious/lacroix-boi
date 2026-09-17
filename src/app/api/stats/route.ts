import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { count } from "drizzle-orm";
import { NEIGHBORHOODS } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const BASE_HYDRATED = 4187;
const BASE_LITERS = 12904;

export async function GET() {
  let realOrders = 0;
  try {
    const rows = await db.select({ value: count() }).from(orders);
    realOrders = rows[0]?.value ?? 0;
  } catch {
    realOrders = 0;
  }
  const avgEta = Math.round(NEIGHBORHOODS.reduce((n, h) => n + h.eta, 0) / NEIGHBORHOODS.length);
  return NextResponse.json({
    hydrated: BASE_HYDRATED + realOrders,
    liters: BASE_LITERS + realOrders * 6,
    avgEta,
  });
}
