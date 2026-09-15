"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { SectionTitle, Card, PrimaryBtn } from "@/components/admin/ui";

export default function AdminMedia() {
  const { products } = useAdmin();
  const [filter, setFilter] = useState("");

  const images = products
    .filter((p) => !filter || p.name.toLowerCase().includes(filter.toLowerCase()))
    .map((p) => ({ name: p.name, url: p.image, sku: p.sku }));

  const uniqueImages = Array.from(new Map(images.map((i) => [i.url, i])).values());

  return (
    <div>
      <SectionTitle
        title="Media Library"
        subtitle={`${uniqueImages.length} images`}
        action={
          <PrimaryBtn onClick={() => {}}>
            <Upload className="h-4 w-4" /> Upload
          </PrimaryBtn>
        }
      />

      <div className="mb-4 flex gap-3">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by product name..."
          className="h-11 w-full max-w-xs rounded-xl border border-background-secondary bg-background px-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {uniqueImages.map((img) => (
          <div key={img.url} className="group relative overflow-hidden rounded-xl border border-background-secondary bg-card-background">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={img.url}
                alt={img.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110"
                  title="Open full size"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="px-3 py-2.5">
              <p className="truncate text-xs font-medium text-text-primary">{img.name}</p>
              <p className="mt-0.5 truncate text-[10px] text-text-secondary">{img.sku}</p>
            </div>
          </div>
        ))}
      </div>

      {uniqueImages.length === 0 && (
        <Card>
          <p className="py-12 text-center text-sm text-text-secondary">No images found.</p>
        </Card>
      )}
    </div>
  );
}