export type Product = {
  id: string;
  slug: string;
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
    slug: "crysma-crl6666-mast",
    name: "CRYSMA CRL6666 Mast",
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
    images: ["/images/products/images.jpg", "/images/products/images (17).jpg"],
  },
  {
    id: "2",
    slug: "crysma-crl2544-magnet",
    name: "CRYSMA CRL2544 Magnet",
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
    slug: "crysma-crl6927-horvick",
    name: "CRYSMA CRL6927 Horvick",
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
    images: ["/images/products/images (2).jpg", "/images/products/images (19).jpg"],
  },
  {
    id: "4",
    slug: "crysma-crl2127-diastar-lite",
    name: "CRYSMA CRL2127 Diastar Lite",
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
    slug: "crysma-crl111945-diastar-automatic",
    name: "CRYSMA CRL111945 Diastar Automatic",
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
    slug: "crysma-crl8173-dream",
    name: "CRYSMA CRL8173 Dream",
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
    slug: "crysma-crl2537-elaris",
    name: "CRYSMA CRL2537 Elaris",
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
    slug: "crysma-crl6346c-flow",
    name: "CRYSMA CRL6346C Flow",
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
    slug: "crysma-crl685-aspire",
    name: "CRYSMA CRL685 Aspire",
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
    slug: "crysma-crl6824-kingston",
    name: "CRYSMA CRL6824 Kingston",
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
    slug: "crysma-crl2542-strider",
    name: "CRYSMA CRL2542 Strider",
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
    slug: "crysma-crl0237-unique",
    name: "CRYSMA CRL0237 Unique",
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
    slug: "crysma-crl3225-datejust",
    name: "CRYSMA CRL3225 Date-Just",
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
    slug: "crysma-1027-universal",
    name: "CRYSMA CRL1027 Universal",
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
    images: ["/images/products/images (13).jpg"],
  },
  {
    id: "15",
    slug: "crysma-crl1030-globe",
    name: "CRYSMA CRL1030 Globe",
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
    slug: "crysma-5799-blast",
    name: "CRYSMA CRL5799 Blast",
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
    images: ["/images/products/images (15).jpg"],
  },
];

export const formatPrice = (value: number) =>
  `Rs.${value.toLocaleString("en-PK")}`;

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