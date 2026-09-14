"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Men",
    href: "/collections/men",
    image: "/images/home/images (3).jpg",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Women",
    href: "/collections/women",
    image: "/images/home/images (4).jpg",
    span: "",
  },
  {
    name: "Couples",
    href: "/collections/couple",
    image: "/images/home/images (5).jpg",
    span: "",
  },
  {
    name: "Strap Watches",
    href: "/collections/men-strap",
    image: "/images/home/images (6).jpg",
    span: "",
  },
  {
    name: "Luxury Series",
    href: "/collections/men-luxury",
    image: "/images/home/images (7).jpg",
    span: "lg:col-span-2",
  },
];

export default function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          Collections
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Shop by Category
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-accent-gold" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={cn(cat.span, i === 0 && "row-span-2")}
          >
            <Link
              href={cat.href}
              className="group relative block h-full w-full overflow-hidden rounded-xl"
            >
              <div className={cn("relative overflow-hidden", i === 0 ? "h-full min-h-[320px]" : "aspect-[4/3]")}>
                <Image
                  src={cat.image}
                  alt={`${cat.name} watches`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                    {cat.name}
                  </h3>
                  <span className="mt-1 inline-block text-xs font-semibold uppercase tracking-wider text-accent-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}