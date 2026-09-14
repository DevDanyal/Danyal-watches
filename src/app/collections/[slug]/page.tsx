import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionClient from "@/components/collection/CollectionClient";
import { getCollection } from "@/lib/data/collections";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [
    "men",
    "men-luxury",
    "men-strap",
    "men-chain",
    "women",
    "women-chain",
    "couple",
    "sale",
    "featured",
    "best-sellers",
    "new-arrivals",
  ];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection | CRYSMA" };
  return {
    title: `${collection.name} | CRYSMA Watches`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return <CollectionClient slug={slug} />;
}