"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ToggleLeft, ToggleRight, Edit3, X } from "lucide-react";
import { useAdmin, type ManagedCategory } from "@/context/AdminContext";
import { products } from "@/lib/data/products";
import {
  SectionTitle,
  Card,
  Input,
  PrimaryBtn,
  GhostBtn,
  Badge,
} from "@/components/admin/ui";

const emptyForm = { name: "", slug: "", image: "", active: true };

export default function AdminCategories() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const slugify = (v: string) =>
    v.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const productCount = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    const keywords = cat?.name.toLowerCase().split(" ")[1] ?? "";
    return products.filter((p) => p.category === slug || p.subtitle.toLowerCase().includes(keywords)).length;
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, form);
      setEditingId(null);
    } else {
      addCategory({ ...form, slug: form.slug || slugify(form.name) });
    }
    setShowForm(false);
    setForm(emptyForm);
  };

  const startEdit = (c: ManagedCategory) => {
    setEditingId(c.id);
    setForm({ name: c.name, slug: c.slug, image: c.image, active: c.active });
    setShowForm(true);
  };

  return (
    <div>
      <SectionTitle
        title="Categories"
        subtitle={`${categories.length} categories · ${categories.filter((c) => c.active).length} active`}
        action={
          <PrimaryBtn
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4" /> New Category
          </PrimaryBtn>
        }
      />

      {showForm && (
        <Card className="mb-6 border-accent-gold/30">
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              required
              placeholder="e.g. Women's Bracelets"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })}
            />
            <Input
              label="Slug"
              required
              placeholder="women-bracelets"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
            />
            <Input
              label="Image URL"
              required
              placeholder="/images/home/images (8).jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <div className="flex items-end gap-3">
              <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent-gold"
                />
                Active
              </label>
              <PrimaryBtn type="submit">{editingId ? "Save Changes" : "Add Category"}</PrimaryBtn>
              <GhostBtn type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}>
                <X className="h-4 w-4" /> Cancel
              </GhostBtn>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id} className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-background-secondary">
              {c.image ? (
                <Image src={c.image} alt={c.name} fill sizes="56px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-serif text-accent-gold">
                  {c.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-text-primary">{c.name}</p>
              <p className="truncate text-xs text-text-secondary">/{c.slug}</p>
              <p className="mt-1">
                <Badge tone={c.active ? "success" : "muted"}>
                  {productCount(c.slug)} products · {c.active ? "Active" : "Hidden"}
                </Badge>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateCategory(c.id, { active: !c.active })} className="text-text-secondary hover:text-accent-gold" title="Toggle visibility">
                {c.active ? <ToggleRight className="h-5 w-5 text-success" /> : <ToggleLeft className="h-5 w-5" />}
              </button>
              <button onClick={() => startEdit(c)} className="text-text-secondary hover:text-accent-gold" title="Edit">
                <Edit3 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteCategory(c.id)} className="text-text-secondary hover:text-error" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}