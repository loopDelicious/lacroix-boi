import { NextResponse } from "next/server";
import { getFlavors } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const flavors = await getFlavors();
  return NextResponse.json({ flavors });
}
