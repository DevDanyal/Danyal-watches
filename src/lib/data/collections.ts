export type Collection = {
  slug: string;
  name: string;
  description: string;
  filterCategories: string[];
};

export const collections: Collection[] = [
  {
    slug: "men",
    name: "Men",
    description:
      "Precision-crafted men's watches — luxury, strap and chain timepieces built to impress.",
    filterCategories: ["men"],
  },
  {
    slug: "men-luxury",
    name: "Men's Luxury",
    description: "Statement luxury watches for men who appreciate fine details.",
    filterCategories: ["men"],
  },
  {
    slug: "men-strap",
    name: "Men's Strap Watches",
    description: "Classic strap watches with leather and metal finishes.",
    filterCategories: ["men"],
  },
  {
    slug: "men-chain",
    name: "Men's Chain Watches",
    description: "Bold chain watches with premium stainless steel links.",
    filterCategories: ["men"],
  },
  {
    slug: "women",
    name: "Women",
    description: "Elegant women's watches — bracelets, chains and luxury styles.",
    filterCategories: ["women"],
  },
  {
    slug: "women-chain",
    name: "Women's Chain Watches",
    description: "Refined chain watches designed for women.",
    filterCategories: ["women"],
  },
  {
    slug: "couple",
    name: "Couples",
    description: "Matching couple watch sets — a symbol of togetherness.",
    filterCategories: ["couple"],
  },
  {
    slug: "sale",
    name: "SALE",
    description: "Limited-time discounts on selected timepieces.",
    filterCategories: [],
  },
  {
    slug: "featured",
    name: "Featured",
    description: "Our handpicked selection of standout timepieces.",
    filterCategories: [],
  },
  {
    slug: "best-sellers",
    name: "Best Sellers",
    description: "The watches everyone is talking about.",
    filterCategories: [],
  },
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "Fresh off the bench — the very latest additions.",
    filterCategories: [],
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);