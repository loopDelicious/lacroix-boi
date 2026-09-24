import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl,
});

const flavors = [
  {
    slug: "pamplemousse",
    name: "Pamplemousse",
    tagline: "Grapefruit, but make it French",
    description:
      "The one that started the cult. Bitter-sweet grapefruit fizz with main-character energy.",
    colorHex: "#FF6B5E",
    deepHex: "#D8402F",
    priceCents: 699,
    stock: 48,
    featured: true,
    sortOrder: 0,
  },
  {
    slug: "lime",
    name: "Key Lime",
    tagline: "Green means go",
    description:
      "Crisp, zippy, borderline aggressive citrus. Pairs with spreadsheets and bad decisions.",
    colorHex: "#8FC93A",
    deepHex: "#5E9720",
    priceCents: 699,
    stock: 36,
    featured: false,
    sortOrder: 1,
  },
  {
    slug: "passionfruit",
    name: "Passionfruit",
    tagline: "Tropical chaos energy",
    description:
      "Tastes like a vacation your boss doesn't know about. Loud pink vibes only.",
    colorHex: "#EC3D8C",
    deepHex: "#B81E66",
    priceCents: 699,
    stock: 41,
    featured: false,
    sortOrder: 2,
  },
  {
    slug: "coconut",
    name: "Coconut",
    tagline: "Polarizing since forever",
    description:
      "The most debated flavor in the canon. You either get it or you don't. We get it.",
    colorHex: "#1FB6B2",
    deepHex: "#0E7F7C",
    priceCents: 699,
    stock: 29,
    featured: false,
    sortOrder: 3,
  },
  {
    slug: "apricot",
    name: "Apricot",
    tagline: "Golden hour, canned",
    description:
      "Soft stone-fruit sweetness that goes down like a Dolores Park sunset. Underrated legend.",
    colorHex: "#FF9E2C",
    deepHex: "#D9740B",
    priceCents: 699,
    stock: 33,
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "berry",
    name: "Berry",
    tagline: "Purple drank (healthy)",
    description:
      "A mysterious blend of berries that tastes like the color purple sounds. Science can't explain it.",
    colorHex: "#7B61E8",
    deepHex: "#4C2FBF",
    priceCents: 699,
    stock: 38,
    featured: false,
    sortOrder: 5,
  },
];

await client.connect();

try {
  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      id serial PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name text NOT NULL,
      tagline text NOT NULL,
      description text NOT NULL,
      color_hex text NOT NULL,
      deep_hex text NOT NULL,
      price_cents integer NOT NULL,
      stock integer NOT NULL DEFAULT 24,
      featured boolean NOT NULL DEFAULT false,
      sort_order integer NOT NULL DEFAULT 0
    )
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id serial PRIMARY KEY,
      email text NOT NULL UNIQUE,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id serial PRIMARY KEY,
      order_code text NOT NULL UNIQUE,
      order_type text NOT NULL DEFAULT 'one-time',
      customer_name text NOT NULL,
      email text NOT NULL,
      phone text,
      address text NOT NULL,
      neighborhood text NOT NULL,
      delivery_notes text,
      items jsonb NOT NULL,
      subtotal_cents integer NOT NULL,
      delivery_fee_cents integer NOT NULL DEFAULT 0,
      total_cents integer NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  for (const flavor of flavors) {
    await client.query(
      `
        INSERT INTO products (
          slug, name, tagline, description, color_hex, deep_hex,
          price_cents, stock, featured, sort_order
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (slug) DO NOTHING
      `,
      [
        flavor.slug,
        flavor.name,
        flavor.tagline,
        flavor.description,
        flavor.colorHex,
        flavor.deepHex,
        flavor.priceCents,
        flavor.stock,
        flavor.featured,
        flavor.sortOrder,
      ],
    );
  }

  console.log("Database schema and flavor seed are ready.");
} finally {
  await client.end();
}
