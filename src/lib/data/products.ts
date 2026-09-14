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

const img = (path: string) => path;

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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_891c0745-b140-4d7f-aa52-1eb0ab96b5c3.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_dccd0b12-7b78-4c7e-bc2a-a56ce27dddfb.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_65cb6b91-4818-4f1d-b5b7-8995ba6fd6ac.jpg"
      ),
      img("https://crysmawatches.com/cdn/shop/files/1764749568395.jpg"),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_adaae383-6e2e-43c4-9edc-c4fe8bb26a3a.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_213ec8f0-b81d-4f6c-bb3c-b672dc4838ef.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_d54b5815-7a90-4576-be48-b39f2f4c1995.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_535093ad-5bab-4498-882c-797dc1defabf.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_2940b79d-6b95-478d-9ad3-913212ced9c4.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_dce03804-032b-46b5-a07d-8c1f6c8a37fe.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_7e40cc81-e924-412b-a755-034ae056a929.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_027f1629-5892-4b95-867e-6fbc582521cb.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_533e6417-96f4-4e2d-8cc1-de7aa21acbec.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_92de0ae0-c2dc-42fb-b5ab-79a73d4d9b96.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_f339748e-f026-4a70-bc81-6f15c27971f0.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_524a4ac7-0aa5-4383-b254-51285cf42c32.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_1cb9b84f-36dd-4d51-b996-ac7268bef8c4.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_9b51795a-5aae-4a20-a9a-5eab90d6cf6a.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_d23c90e3-40ff-4c89-ab22-09a9ebfdf5a8.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_85ec45fc-7e69-4e0b-9c6d-20a5bcd68d3a.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_60c2b66b-65c1-47ca-beab-17b961db7761.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_79d6d39f-7a58-496b-9852-5f226248fac6.jpg"
      ),
    ],
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
    images: [
      img("https://crysmawatches.com/cdn/shop/files/FULL_GOLDEN_3.jpg"),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_36c9f13f-3f90-47d6-b734-048aa89ad119.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_00b8b87e-35e7-49dd-9ecf-112dd6c9490d.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_d382e12b-8a0f-47bf-848e-ff560d61319e.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_b601d9a1-3a13-416c-8928-d67e43e4ecd7.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_cf1b4cbd-421b-4d72-988c-a87b6502eb40.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_37335af0-d1e6-440e-be4a-ecdcf33daf06.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/rn-image_picker_lib_temp_4f1abab8-85ea-4076-8d45-d303c6e22011.jpg"
      ),
    ],
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
    images: [
      img(
        "https://crysmawatches.com/cdn/shop/files/1766405696222.jpg"
      ),
      img(
        "https://crysmawatches.com/cdn/shop/files/1766405696259.jpg"
      ),
    ],
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