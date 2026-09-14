import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/data/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog Post | CRYSMA" };
  return { title: `${post.title} | CRYSMA Blog`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/blogs"
          className="text-sm font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
        >
          ← All Posts
        </Link>

        <span className="mt-6 inline-block rounded-full bg-accent-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
          {post.category}
        </span>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={750}
            className="aspect-[16/10] w-full object-cover"
            priority
          />
        </div>

        <div className="mt-8 space-y-8">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-background-secondary bg-background-secondary">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-text-primary">
                Continue Reading
              </h2>
              <Link
                href="/blogs"
                className="text-sm font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="group flex overflow-hidden rounded-xl border border-background-secondary bg-card-background transition-all hover:border-accent-gold/40"
                >
                  <div className="relative w-32 shrink-0 sm:w-44">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 128px, 176px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-secondary">{p.date}</p>
                    <h3 className="mt-1.5 line-clamp-2 font-serif text-base font-bold leading-snug text-text-primary group-hover:text-accent-gold">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}