export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: { heading: string; body: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-perfect-watch",
    title: "How to Choose the Perfect Watch",
    excerpt:
      "From case size to strap material, here's everything you need to consider before buying your next timepiece.",
    image: "/images/home/images (19).jpg",
    category: "Buying Guide",
    date: "Sep 2, 2026",
    readTime: "5 min read",
    author: "CRYSMA Team",
    content: [
      {
        heading: "Start with the Case Size",
        body: "The case diameter is the most important measurement. For men, cases between 40-44mm suit most wrists; for women, 28-36mm is typical. A good rule of thumb: the case should not overhang the wrist.",
      },
      {
        heading: "Choose the Right Strap",
        body: "Stainless steel chains are durable and versatile, leather straps offer classic elegance, and rubber straps are perfect for sports and daily wear. Consider your lifestyle when choosing.",
      },
      {
        heading: "Consider the Movement",
        body: "Quartz movements are accurate and low-maintenance, while automatic movements appeal to enthusiasts who appreciate mechanical craftsmanship. Both are reliable for daily wear.",
      },
      {
        heading: "Match Your Style",
        body: "Formal watches with clean dials pair well with suits, while chronographs and sporty designs suit casual looks. Choose a watch that reflects your personality and wardrobe.",
      },
    ],
  },
  {
    slug: "caring-for-your-stainless-steel-watch",
    title: "Caring for Your Stainless Steel Watch",
    excerpt:
      "Keep your chain watch looking brand new with these simple cleaning and maintenance tips.",
    image: "/images/home/images (24).jpg",
    category: "Watch Care",
    date: "Aug 20, 2026",
    readTime: "4 min read",
    author: "CRYSMA Team",
    content: [
      {
        heading: "Daily Cleaning",
        body: "Wipe your watch with a soft microfiber cloth after each wear to remove fingerprints and dust. This simple habit keeps your timepiece looking polished.",
      },
      {
        heading: "Deep Cleaning",
        body: "For a deeper clean, use a soft brush with mild soapy water to gently clean the case and bracelet. Rinse with clean water (if water-resistant) and dry thoroughly.",
      },
      {
        heading: "Avoid Harsh Chemicals",
        body: "Keep your watch away from perfumes, cosmetics, and household chemicals, as these can dull the finish and damage seals over time.",
      },
      {
        heading: "Professional Servicing",
        body: "Have your watch serviced by a professional every 2-3 years to maintain water resistance and movement accuracy.",
      },
    ],
  },
  {
    slug: "outfit-ideas-to-match-your-watch",
    title: "Outfit Ideas to Match Your Watch",
    excerpt:
      "Whether it's a golden luxury piece or a sporty strap watch, here's how to style it effortlessly.",
    image: "/images/home/images (13).jpg",
    category: "Style Guide",
    date: "Aug 5, 2026",
    readTime: "6 min read",
    author: "CRYSMA Team",
    content: [
      {
        heading: "The Formal Look",
        body: "Pair a minimalist golden or silver luxury watch with a tailored suit. Keep the dial clean and the bracelet polished. The watch should complement, not compete with, your outfit.",
      },
      {
        heading: "Smart Casual",
        body: "A leather strap watch works beautifully with button-down shirts, chinos, and blazers. Choose brown or black straps to match your belt and shoes.",
      },
      {
        heading: "Weekend Wear",
        body: "Sporty or chain watches are perfect for weekends. They pair well with jeans, t-shirts, and polo shirts, adding a touch of rugged style.",
      },
      {
        heading: "Couple Styling",
        body: "Matching couple watches are a beautiful way to show your bond. Choose complementary colors — for example, a golden watch for one and a two-tone for the other.",
      },
    ],
  },
];

export const getBlogPost = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);