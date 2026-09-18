import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Blog | Danyal Watches",
  description:
    "Watch buying guides, care tips, and style inspiration from the Danyal team.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        kicker="Journal"
        title="The Danyal Blog"
        subtitle="Buying guides, watch care tips, and style inspiration."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card-background transition-all duration-300 hover:-translate-y-1 hover:border-text-primary/30 hover:shadow-xl hover:shadow-black/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug text-text-primary group-hover:text-sale-badge">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-sale-badge">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}