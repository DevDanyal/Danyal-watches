"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useAdmin, type Banner } from "@/context/AdminContext";
import { SectionTitle, Card, Input, PrimaryBtn } from "@/components/admin/ui";

export default function AdminBanners() {
  const { banners, addBanner, toggleBanner, deleteBanner } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "", cta: "Shop Now", image: "", active: true });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    addBanner(form);
    setShowForm(false);
    setForm({ title: "", subtitle: "", cta: "Shop Now", image: "", active: true });
  };

  return (
    <div>
      <SectionTitle
        title="Banners & Promotions"
        subtitle={`${banners.length} banners`}
        action={
          <PrimaryBtn onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" /> New Banner
          </PrimaryBtn>
        }
      />

      {showForm && (
        <Card className="mb-6 border-accent-gold/30">
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" required placeholder="Hero text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input label="Subtitle" required placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            <Input label="CTA Text" placeholder="Shop Now" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
            <Input label="Image URL" required placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <div className="flex gap-3 sm:col-span-2">
              <PrimaryBtn type="submit">Add Banner</PrimaryBtn>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-background-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary">Cancel</button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {banners.map((b) => (
          <Card key={b.id} className="flex items-center gap-4">
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
              <Image src={b.image} alt={b.title} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-text-primary">{b.title}</p>
              <p className="truncate text-xs text-text-secondary">{b.subtitle}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-accent-gold">CTA: {b.cta}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleBanner(b.id)} className="text-text-secondary hover:text-accent-gold" title="Toggle">
                {b.active ? <ToggleRight className="h-5 w-5 text-success" /> : <ToggleLeft className="h-5 w-5" />}
              </button>
              <button onClick={() => deleteBanner(b.id)} className="text-text-secondary hover:text-error" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
        {banners.length === 0 && (
          <Card>
            <p className="py-8 text-center text-sm text-text-secondary">No banners yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}