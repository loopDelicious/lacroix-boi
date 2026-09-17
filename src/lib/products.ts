import { db } from "@/db";
import { products } from "@/db/schema";
import { asc } from "drizzle-orm";
import { FLAVORS, type Flavor } from "@/lib/catalog";

/**
 * Loads the flavor lineup from Postgres. Falls back to the static catalog if
 * the database is unreachable or unseeded so the marketing site always renders.
 */
export async function getFlavors(): Promise<Flavor[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length === 0) return FLAVORS;
    return rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      tagline: row.tagline,
      description: row.description,
      colorHex: row.colorHex,
      deepHex: row.deepHex,
      priceCents: row.priceCents,
      stock: row.stock,
      featured: row.featured,
    }));
  } catch {
    return FLAVORS;
  }
}
