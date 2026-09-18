export type Product = {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: string;
  subtitle: string;
  price: number;
  regularPrice: number;
  rating: number;
  reviews: number;
  badge?: "sale" | "new" | "bestseller";
  isNew?: boolean;
  isBestSeller?: boolean;
  colors: { name: string; hex: string }[];
  images: string[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "danyal-crl6666-mast",
    code: "CRL-6666",
    name: "Danyal CRL6666 Mast",
    category: "men",
    subtitle: "Men's Chain Watch",
    price: 16600,
    regularPrice: 19550,
    rating: 4.6,
    reviews: 42,
    badge: "sale",
    colors: [
      { name: "Two Tone/Golden", hex: "#C9A96E" },
      { name: "Two Tone/Grey", hex: "#808080" },
      { name: "Two Tone/White", hex: "#D9D9D9" },
      { name: "Two Tone/Black", hex: "#1A1A1A" },
    ],
    images: ["/images/products/images (17).jpg", "/images/products/images (11).jpg"],
  },
  {
    id: "2",
    slug: "danyal-crl2544-magnet",
    code: "CRL-2544",
    name: "Danyal CRL2544 Magnet",
    category: "men",
    subtitle: "Men's Strap Watch",
    price: 6100,
    regularPrice: 7150,
    rating: 4.7,
    reviews: 58,
    badge: "sale",
    isNew: true,
    colors: [
      { name: "Full Black", hex: "#0A0A0A" },
      { name: "Black/White", hex: "#1A1A1A" },
      { name: "Full Blue", hex: "#1B3C6B" },
      { name: "Tiffany", hex: "#6BC5B8" },
    ],
    images: ["/images/products/images (1).jpg", "/images/products/images (18).jpg"],
  },
  {
    id: "3",
    slug: "danyal-crl6927-horvick",
    code: "CRL-6927",
    name: "Danyal CRL6927 Horvick",
    category: "men",
    subtitle: "Men's Strap Watch",
    price: 4800,
    regularPrice: 6875,
    rating: 4.6,
    reviews: 31,
    badge: "sale",
    colors: [
      { name: "Full Black", hex: "#0A0A0A" },
      { name: "Brown Gold", hex: "#8B5E3C" },
      { name: "Full Grey", hex: "#808080" },
    ],
    images: ["/images/products/images (2).jpg", "/images/products/images (9).jpg"],
  },
  {
    id: "4",
    slug: "danyal-crl2127-diastar-lite",
    code: "CRL-2127",
    name: "Danyal CRL2127 Diastar Lite",
    category: "men",
    subtitle: "Men's Luxury Watch",
    price: 12700,
    regularPrice: 15000,
    rating: 4.3,
    reviews: 26,
    badge: "sale",
    isBestSeller: true,
    colors: [
      { name: "Two Tone/Black", hex: "#1A1A1A" },
      { name: "Two Tone/Golden", hex: "#C9A96E" },
      { name: "Full Golden", hex: "#D4AF37" },
      { name: "Silver/Black", hex: "#A0A0A0" },
    ],
    images: ["/images/products/images (3).jpg", "/images/products/images (16).jpg"],
  },
  {
    id: "5",
    slug: "danyal-crl111945-diastar-automatic",
    code: "CRL-111945",
    name: "Danyal CRL111945 Diastar Automatic",
    category: "men",
    subtitle: "Men's Luxury Automatic",
    price: 62000,
    regularPrice: 73500,
    rating: 4.9,
    reviews: 12,
    badge: "sale",
    colors: [
      { name: "Full Golden", hex: "#D4AF37" },
      { name: "Golden/White", hex: "#F2E6CE" },
      { name: "Golden/Black", hex: "#1A1A1A" },
    ],
    images: ["/images/products/images (4).jpg"],
  },
  {
    id: "6",
    slug: "danyal-crl8173-dream",
    code: "CRL-8173",
    name: "Danyal CRL8173 Dream",
    category: "men",
    subtitle: "Men's Chain Watch",
    price: 13800,
    regularPrice: 16250,
    rating: 5.0,
    reviews: 19,
    badge: "bestseller",
    isBestSeller: true,
    colors: [
      { name: "Black/Black/Black", hex: "#0A0A0A" },
      { name: "Tiffany", hex: "#6BC5B8" },
      { name: "Golden/Golden/Black", hex: "#D4AF37" },
    ],
    images: ["/images/products/images (5).jpg"],
  },
  {
    id: "7",
    slug: "danyal-crl2537-elaris",
    code: "CRL-2537",
    name: "Danyal CRL2537 Elaris",
    category: "men",
    subtitle: "Men's Chain Watch",
    price: 10000,
    regularPrice: 11825,
    rating: 4.6,
    reviews: 24,
    colors: [
      { name: "Black/Black/Black", hex: "#0A0A0A" },
      { name: "Black/Silver/Black", hex: "#3F3F46" },
      { name: "Black/Rose Gold/Black", hex: "#B76E79" },
    ],
    images: ["/images/products/images (6).jpg"],
  },
  {
    id: "8",
    slug: "danyal-crl6346c-flow",
    code: "CRL-6346C",
    name: "Danyal CRL6346C Flow",
    category: "men",
    subtitle: "Men's Strap Watch",
    price: 7900,
    regularPrice: 9350,
    rating: 4.0,
    reviews: 14,
    badge: "sale",
    colors: [
      { name: "Two Tone Golden", hex: "#C9A96E" },
      { name: "Full Black", hex: "#0A0A0A" },
      { name: "Silver Blue", hex: "#6C9CD4" },
    ],
    images: ["/images/products/images (7).jpg"],
  },
  {
    id: "9",
    slug: "danyal-crl685-aspire",
    code: "CRL-685",
    name: "Danyal CRL685 Aspire",
    category: "men",
    subtitle: "Men's Luxury Watch",
    price: 17800,
    regularPrice: 21000,
    rating: 4.5,
    reviews: 17,
    isBestSeller: true,
    colors: [
      { name: "Full Golden", hex: "#D4AF37" },
      { name: "Golden/Black", hex: "#1A1A1A" },
      { name: "Two Tone/Black", hex: "#1A1A1A" },
    ],
    images: ["/images/products/images (8).jpg"],
  },
  {
    id: "10",
    slug: "danyal-crl6824-kingston",
    code: "CRL-6824",
    name: "Danyal CRL6824 Kingston",
    category: "men",
    subtitle: "Men's Luxury Watch",
    price: 25000,
    regularPrice: 29400,
    rating: 4.7,
    reviews: 22,
    badge: "sale",
    isNew: true,
    colors: [
      { name: "Two Tone/Golden", hex: "#C9A96E" },
      { name: "Silver Black", hex: "#6E6E6E" },
      { name: "Gun Metal/Black", hex: "#2B2B33" },
    ],
    images: ["/images/products/images (9).jpg"],
  },
  {
    id: "11",
    slug: "danyal-crl2542-strider",
    code: "CRL-2542",
    name: "Danyal CRL2542 Strider",
    category: "men",
    subtitle: "Men's Strap Watch",
    price: 6600,
    regularPrice: 8250,
    rating: 5.0,
    reviews: 28,
    isNew: true,
    colors: [
      { name: "Full Blue", hex: "#1B3C6B" },
      { name: "Full Red", hex: "#8B1E2D" },
      { name: "Full Grey", hex: "#808080" },
    ],
    images: ["/images/products/images (10).jpg"],
  },
  {
    id: "12",
    slug: "danyal-crl0237-unique",
    code: "CRL-0237",
    name: "Danyal CRL0237 Unique",
    category: "men",
    subtitle: "Men's Chain Watch",
    price: 8500,
    regularPrice: 10725,
    rating: 4.3,
    reviews: 15,
    badge: "sale",
    colors: [
      { name: "Silver/Blue", hex: "#6C9CD4" },
      { name: "Full Black", hex: "#0A0A0A" },
      { name: "Full Golden", hex: "#D4AF37" },
    ],
    images: ["/images/products/images (11).jpg"],
  },
  {
    id: "13",
    slug: "danyal-crl3225-datejust",
    code: "CRL-3225",
    name: "Danyal CRL3225 Date-Just",
    category: "men",
    subtitle: "Men's Luxury Watch",
    price: 12700,
    regularPrice: 15000,
    rating: 5.0,
    reviews: 33,
    isBestSeller: true,
    colors: [
      { name: "Golden/White", hex: "#F2E6CE" },
      { name: "Golden/Golden", hex: "#D4AF37" },
      { name: "Silver/Black", hex: "#3F3F46" },
    ],
    images: ["/images/products/images (12).jpg"],
  },
  {
    id: "14",
    slug: "danyal-1027-universal",
    code: "CRL-1027",
    name: "Danyal CRL1027 Universal",
    category: "men",
    subtitle: "Men's Chain Watch",
    price: 7000,
    regularPrice: 8800,
    rating: 4.0,
    reviews: 11,
    colors: [
      { name: "Silver/Green", hex: "#4A7C59" },
      { name: "Silver/Blue", hex: "#6C9CD4" },
      { name: "Golden/Black", hex: "#1A1A1A" },
    ],
    images: ["/images/products/images (16).jpg"],
  },
  {
    id: "15",
    slug: "danyal-crl1030-globe",
    code: "CRL-1030",
    name: "Danyal CRL1030 Globe",
    category: "men",
    subtitle: "Men's Luxury Watch",
    price: 16000,
    regularPrice: 18900,
    rating: 4.4,
    reviews: 20,
    badge: "sale",
    colors: [
      { name: "Silver/Blue", hex: "#6C9CD4" },
      { name: "Full Blue", hex: "#1B3C6B" },
      { name: "Black/Blue", hex: "#1B3C6B" },
    ],
    images: ["/images/products/images (14).jpg"],
  },
  {
    id: "16",
    slug: "danyal-5799-blast",
    code: "CRL-5799",
    name: "Danyal CRL5799 Blast",
    category: "men",
    subtitle: "Men's Strap Watch",
    price: 6800,
    regularPrice: 8525,
    rating: 5.0,
    reviews: 25,
    isNew: true,
    colors: [
      { name: "Two Tone/White", hex: "#F2E6CE" },
      { name: "Golden/Black", hex: "#1A1A1A" },
      { name: "Silver/Grey", hex: "#6E6E6E" },
    ],
    images: ["/images/products/images (10).jpg"],
  },
  {
    id: "17",
    slug: "danyal-crl4401-elegance",
    code: "CRL-4401",
    name: "Danyal CRL4401 Elegance",
    category: "women",
    subtitle: "Women's Luxury Watch",
    price: 12500,
    regularPrice: 14700,
    rating: 4.8,
    reviews: 21,
    badge: "bestseller",
    isBestSeller: true,
    colors: [
      { name: "Golden/White", hex: "#F2E6CE" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Silver", hex: "#C0C0C0" },
    ],
    images: ["/images/products/images (12).jpg", "/images/products/images (8).jpg"],
  },
  {
    id: "18",
    slug: "danyal-crl5502-bloom",
    code: "CRL-5502",
    name: "Danyal CRL5502 Bloom",
    category: "women",
    subtitle: "Women's Chain Watch",
    price: 8200,
    regularPrice: 9950,
    rating: 4.6,
    reviews: 16,
    colors: [
      { name: "Tiffany", hex: "#6BC5B8" },
      { name: "Golden", hex: "#D4AF37" },
      { name: "Silver", hex: "#C0C0C0" },
    ],
    images: ["/images/products/images (10).jpg", "/images/products/images (5).jpg"],
  },
  {
    id: "19",
    slug: "danyal-crl6603-lumina",
    code: "CRL-6603",
    name: "Danyal CRL6603 Lumina",
    category: "women",
    subtitle: "Women's Luxury Watch",
    price: 16800,
    regularPrice: 21000,
    rating: 4.9,
    reviews: 13,
    isNew: true,
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Golden/White", hex: "#F2E6CE" },
      { name: "Full Black", hex: "#0A0A0A" },
    ],
    images: ["/images/products/images (4).jpg", "/images/products/images (7).jpg"],
  },
  {
    id: "20",
    slug: "danyal-crl7704-meraki",
    code: "CRL-7704",
    name: "Danyal CRL7704 Meraki",
    category: "couple",
    subtitle: "Couple's Matching Set",
    price: 22800,
    regularPrice: 26900,
    rating: 5.0,
    reviews: 9,
    badge: "sale",
    isBestSeller: true,
    colors: [
      { name: "Golden", hex: "#D4AF37" },
      { name: "Black/Gold", hex: "#1A1A1A" },
      { name: "Silver", hex: "#C0C0C0" },
    ],
    images: ["/images/products/images (3).jpg", "/images/products/images (6).jpg"],
  },
  {
    id: "21",
    slug: "danyal-crl8805-duniya",
    code: "CRL-8805",
    name: "Danyal CRL8805 Duniya",
    category: "couple",
    subtitle: "Couple's Chain Set",
    price: 18000,
    regularPrice: 21200,
    rating: 4.7,
    reviews: 7,
    isNew: true,
    colors: [
      { name: "Golden", hex: "#D4AF37" },
      { name: "Grey", hex: "#808080" },
    ],
    images: ["/images/products/images (9).jpg", "/images/products/images (14).jpg"],
  },
];

const stockBySlug: Record<string, number> = {
  "danyal-crl6666-mast": 12,
  "danyal-crl2544-magnet": 8,
  "danyal-crl6927-horvick": 0,
  "danyal-crl2127-diastar-lite": 16,
  "danyal-crl111945-diastar-automatic": 3,
  "danyal-crl8173-dream": 9,
  "danyal-crl2537-elaris": 0,
  "danyal-crl6346c-flow": 14,
  "danyal-crl685-aspire": 6,
  "danyal-crl6824-kingston": 5,
  "danyal-crl2542-strider": 18,
  "danyal-crl0237-unique": 7,
  "danyal-crl3225-datejust": 2,
  "danyal-1027-universal": 11,
  "danyal-crl1030-globe": 4,
  "danyal-5799-blast": 10,
  "danyal-crl4401-elegance": 15,
  "danyal-crl5502-bloom": 13,
  "danyal-crl6603-lumina": 8,
  "danyal-crl7704-meraki": 5,
  "danyal-crl8805-duniya": 6,
};

export const formatPrice = (value: number) =>
  `Rs.${value.toLocaleString("en-PK")}`;

export const getProductStock = (product: Pick<Product, "slug">): number =>
  stockBySlug[product.slug] ?? 0;

export const getProductCode = (
  product: Pick<Product, "slug"> & { code?: string }
): string => {
  if (product.code) return product.code;
  const part = product.slug.split("-")[1] ?? "";
  return part ? part.toUpperCase() : product.slug.toUpperCase();
};

const COLOR_CODES: Record<string, string> = {};

const registerColor = (name: string, code: string) => {
  COLOR_CODES[name.trim().toLowerCase()] = code;
};

registerColor("Two Tone/Golden", "2T-GD");
registerColor("Two Tone/Grey", "2T-GY");
registerColor("Two Tone/White", "2T-WH");
registerColor("Two Tone/Black", "2T-BK");
registerColor("Two Tone Golden", "2T-GD");
registerColor("Full Black", "FBK");
registerColor("Black/White", "BK-WH");
registerColor("Full Blue", "FBL");
registerColor("Tiffany", "TF");
registerColor("Brown Gold", "BR-GD");
registerColor("Full Grey", "FGY");
registerColor("Full Golden", "FGD");
registerColor("Silver/Black", "SV-BK");
registerColor("Silver Black", "SV-BK");
registerColor("Golden/White", "GD-WH");
registerColor("Golden/Black", "GD-BK");
registerColor("Golden/Golden/Black", "GG-BK");
registerColor("Black/Black/Black", "BBB");
registerColor("Black/Silver/Black", "BK-SV");
registerColor("Black/Rose Gold/Black", "BK-RG");
registerColor("Silver Blue", "SV-BL");
registerColor("Gun Metal/Black", "GM-BK");
registerColor("Full Red", "FRD");
registerColor("Silver/Green", "SV-GN");
registerColor("Black/Blue", "BK-BL");
registerColor("Silver/Grey", "SV-GY");
registerColor("Rose Gold", "RG");
registerColor("Golden", "GD");
registerColor("Grey", "GY");
registerColor("Black/Gold", "BK-GD");
registerColor("Silver", "SV");

const fallbackColorCode = (raw: string): string => {
  const cleaned = raw
    .replace(/[^a-z0-9\s]/gi, " ")
    .trim()
    .toUpperCase();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts.length >= 2
    ? parts.map((p) => p[0]).join("")
    : cleaned.slice(0, 4);
};

export const getVariantCode = (
  product: Pick<Product, "slug"> & { code?: string },
  color?: string
): string => {
  const base = getProductCode(product);
  if (!color) return base;
  const key = color.trim().toLowerCase();
  const suffix = COLOR_CODES[key] ?? fallbackColorCode(key);
  return `${base}-${suffix}`;
};

export const getDiscountPercent = (product: Product) =>
  Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches: Product[] = [];
  const seen = new Set<string>();
  for (const p of products) {
    const haystack = `${p.name} ${p.subtitle} ${p.category}`.toLowerCase();
    const normalized = haystack.includes(q) || aliasWordsMatch(haystack, q);
    if (normalized && !seen.has(p.id)) {
      seen.add(p.id);
      matches.push(p);
    }
  }
  return matches.slice(0, 12);
};

const aliasGroups: [string, string][] = [
  ["woman", "women"],
  ["ladies", "women"],
];

const aliasWordsMatch = (haystack: string, q: string): boolean => {
  for (const group of aliasGroups) {
    if (group.includes(q)) {
      const other = group.find((t) => t !== q);
      if (other && haystack.includes(other)) return true;
    }
  }
  return false;
};