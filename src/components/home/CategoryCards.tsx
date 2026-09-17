"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Men",
    href: "/collections/men",
    image: "/images/home/crysma-london.jpg",
    span: "lg:col-span-2 lg:row-span-2",
    tall: true,
  },
  {
    name: "Women",
    href: "/collections/women",
    image: "/images/home/crysma-valen.jpg",
    span: "",
  },
  {
    name: "Couples",
    href: "/collections/couple",
    image: "/images/home/crysma-aurex.jpg",
    span: "",
  },
  {
    name: "Strap Watches",
    href: "/collections/men-strap",
    image: "/images/home/crysma-devotion.jpg",
    span: "",
  },
  {
    name: "Luxury Series",
    href: "/collections/men-luxury",
    image: "/images/home/brandstory-maverick.jpg",
    span: "lg:col-span-2",
  },
];

export default function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
            Collections
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/collections/men"
          className="text-sm font-semibold uppercase tracking-wider text-text-primary underline underline-offset-4 transition-colors hover:text-sale-badge"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={cn(cat.span)}
          >
            <Link
              href={cat.href}
              className="group relative block h-full w-full overflow-hidden rounded-lg border border-border bg-background-secondary"
            >
              <div
                className={cn(
                  "relative overflow-hidden h-full",
                  cat.tall ? "min-h-[340px]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={cat.image}
                  alt={`${cat.name} watches`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {cat.name}
                  </h3>
                  <span className="mt-1 inline-block text-xs font-semibold uppercase tracking-wider text-white/0 transition-all duration-300 group-hover:text-white">
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