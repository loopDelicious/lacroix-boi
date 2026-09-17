// Shared catalog data used by both server components, API routes and the
// client cart. Keep this module free of any Node/DB imports so it can be
// imported from client components safely.

export type Flavor = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  colorHex: string;
  deepHex: string;
  priceCents: number;
  stock: number;
  featured?: boolean;
};

export const FLAVORS: Flavor[] = [
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
  },
];

export const BOI_BOX = {
  slug: "boi-box",
  name: "The Boi Box",
  tagline: "24 cans. Every flavor. Zero regrets.",
  description:
    "A 24-can variety crate with four of everything. The move for fridges that host people.",
  priceCents: 2199,
};

export type Plan = {
  slug: string;
  name: string;
  cans: string;
  priceCents: number;
  cadence: string;
  perks: string[];
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    slug: "casual-boi",
    name: "Casual Boi",
    cans: "2 × 8-packs",
    priceCents: 1299,
    cadence: "per week",
    perks: ["16 cans weekly", "Swap flavors anytime", "Pause whenever", "Free delivery"],
  },
  {
    slug: "certified-boi",
    name: "Certified Boi",
    cans: "4 × 8-packs",
    priceCents: 2399,
    cadence: "per week",
    perks: ["32 cans weekly", "First dibs on new flavors", "Pause whenever", "Free delivery, obviously"],
    popular: true,
  },
  {
    slug: "boi-of-legend",
    name: "Boi of Legend",
    cans: "6 × 8-packs",
    priceCents: 3399,
    cadence: "per week",
    perks: ["48 cans weekly", "Mystery flavor drops", "Fridge magnet of honor", "Courier learns your name"],
  },
];

export type Neighborhood = {
  name: string;
  eta: number; // minutes
  blurb?: string;
};

export const NEIGHBORHOODS: Neighborhood[] = [
  { name: "Mission", eta: 10 },
  { name: "SoMa", eta: 12 },
  { name: "Hayes Valley", eta: 12 },
  { name: "Castro", eta: 15 },
  { name: "Haight-Ashbury", eta: 15, blurb: "Groovy. Also where we keep the limes." },
  { name: "NoPa", eta: 15 },
  { name: "Nob Hill", eta: 18, blurb: "Uphill. We earn our calves." },
  { name: "Potrero", eta: 18 },
  { name: "North Beach", eta: 20 },
  { name: "Inner Sunset", eta: 20 },
  { name: "Bernal Heights", eta: 20 },
  { name: "Richmond", eta: 25 },
  { name: "Marina", eta: 25, blurb: "We know, we know — athleisure and cans." },
  { name: "Dogpatch", eta: 22 },
  { name: "Sunset", eta: 30, blurb: "Worth it for the fog-chilled delivery." },
  { name: "Russian Hill", eta: 25, blurb: "So many stairs. So worth it." },
];

export const FREE_DELIVERY_THRESHOLD_CENTS = 2000;
export const DELIVERY_FEE_CENTS = 299;

export type CartLine = {
  slug: string;
  name: string;
  priceCents: number;
  qty: number;
  kind: "flavor" | "box" | "plan";
  colorHex?: string;
};

export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}
