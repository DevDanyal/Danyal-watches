"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check, Upload, Search, X } from "lucide-react";
import { storeImages } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export type PickedImage = {
  value: string;
  isDataUrl: boolean;
};

export default function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (img: PickedImage) => void;
}) {
  const [search, setSearch] = useState("");
  const [uploaded, setUploaded] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const gallery = [...uploaded, ...storeImages].filter((src) =>
    !search || src.toLowerCase().includes(search.toLowerCase())
  );

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      setUploaded((prev) => [dataUrl, ...prev]);
      onChange({ value: dataUrl, isDataUrl: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-background-secondary bg-background p-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="h-9 w-full rounded-lg border border-background-secondary bg-card-background pl-9 pr-3 text-xs text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg bg-accent-gold px-3 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-gold-light"
        >
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      <div className="mt-3 max-h-56 grid grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8">
        {gallery.map((src) => {
          const active = value === src;
          return (
            <button
              key={src}
              type="button"
              onClick={() => onChange({ value: src, isDataUrl: src.startsWith("data:") })}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                active
                  ? "border-accent-gold ring-2 ring-accent-gold/40"
                  : "border-border hover:border-text-secondary/50"
              )}
              title={src.startsWith("data:") ? "Uploaded image" : src}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12vw, 8vw"
                className="object-cover"
              />
              {active && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-gold text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {value && (
        <div className="mt-3 flex items-center gap-3">
          <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-background-secondary">
            <Image src={value} alt="Selected" fill sizes="56px" className="object-cover" />
          </div>
          <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-text-secondary">
            {value.startsWith("data:") ? "Uploaded image (stored in browser)" : value}
          </p>
          <button
            type="button"
            onClick={() => onChange({ value: "", isDataUrl: false })}
            className="text-text-secondary hover:text-error"
            title="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}