"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useAdmin, type ManagedProduct } from "@/context/AdminContext";
import { formatPrice } from "@/lib/data/products";
import { SectionTitle, Card, Badge, Input, Select, PrimaryBtn } from "@/components/admin/ui";

type Form = Omit<ManagedProduct, "id">;

const blank: Form = {
  name: "",
  category: "Men's Chain Watch",
  price: 0,
  sku: "",
  stock: 0,
  status: "draft",
  image: "/images/home/images (23).jpg",
};

const categories = [
  "Men's Chain Watch",
  "Men's Strap Watch",
  "Men's Luxury Watch",
  "Women's Luxury Watch",
  "Women's Chain Watch",
  "Couple's Chain Watch",
  "Sport Watch",
];

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(blank);
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openNew = () => {
    setForm(blank);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p: ManagedProduct) => {
    setForm({ name: p.name, category: p.category, price: p.price, sku: p.sku, stock: p.stock, status: p.status, image: p.image });
    setEditingId(p.id);
    setShowForm(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateProduct(editingId, form);
    else addProduct(form);
    setShowForm(false);
  };

  return (
    <div>
      <SectionTitle
        title="Products"
        subtitle={`${products.length} products total`}
        action={
          <PrimaryBtn onClick={openNew}>
            <Plus className="h-4 w-4" /> Add Product
          </PrimaryBtn>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-11 w-full rounded-xl border border-background-secondary bg-background pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <div className="flex rounded-lg border border-background-secondary">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 text-xs font-semibold uppercase transition-colors ${
                filterStatus === s ? "bg-accent-gold text-black" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <Card className="border-accent-gold/30">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-text-primary">
                  {editingId ? "Edit Product" : "New Product"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
              <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Product Name"
                  required
                  placeholder="e.g. CRYSMA CRL6666"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Select
                  label="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
                <Input
                  label="Price (PKR)"
                  type="number"
                  required
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
                <Input
                  label="SKU"
                  required
                  placeholder="CRL-XXXX"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
                <Input
                  label="Stock"
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </Select>
                <Input
                  label="Image URL"
                  className="sm:col-span-2"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
                <div className="flex gap-3 sm:col-span-2">
                  <PrimaryBtn type="submit">{editingId ? "Update Product" : "Add Product"}</PrimaryBtn>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full border border-background-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-background-secondary text-xs uppercase tracking-wider text-text-secondary">
              <th className="pb-3 pr-4 font-semibold">Product</th>
              <th className="pb-3 pr-4 font-semibold">SKU</th>
              <th className="pb-3 pr-4 font-semibold">Price</th>
              <th className="pb-3 pr-4 font-semibold">Stock</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-background-secondary/60 last:border-0">
                <td className="flex items-center gap-3 py-3 pr-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                    <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="truncate font-medium text-text-primary">{p.name}</p>
                    <p className="text-xs text-text-secondary">{p.category}</p>
                  </div>
                </td>
                <td className="py-3 pr-4 font-montserrat text-xs font-bold text-text-secondary">{p.sku}</td>
                <td className="py-3 pr-4 font-montserrat font-bold text-text-primary">{formatPrice(p.price)}</td>
                <td className="py-3 pr-4">
                  <Badge tone={p.stock === 0 ? "error" : p.stock <= 5 ? "gold" : "default"}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} units`}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={p.status === "published" ? "success" : "muted"}>
                    {p.status}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="text-text-secondary hover:text-accent-gold" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-text-secondary hover:text-error" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">No products match your search.</p>
        )}
      </Card>
    </div>
  );
}