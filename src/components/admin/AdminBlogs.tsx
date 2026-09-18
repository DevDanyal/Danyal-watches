"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/data/blog";
import { SectionTitle, Card, Input, PrimaryBtn } from "@/components/admin/ui";

type BlogForm = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string;
};

const blank: BlogForm = { title: "", excerpt: "", category: "", date: "Sep 14, 2026", readTime: "5 min read", image: "/images/home/images (24).jpg", body: "" };

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(blank);

  const openNew = () => {
    setForm(blank);
    setEditSlug(null);
    setShowForm(true);
  };

  const openEdit = (p: BlogPost) => {
    setForm({ title: p.title, excerpt: p.excerpt, category: p.category, date: p.date, readTime: p.readTime, image: p.image, body: p.content.map((s) => s.heading + "\n" + s.body).join("\n\n") });
    setEditSlug(p.slug);
    setShowForm(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const content = form.body.split("\n\n").filter(Boolean).map((block) => {
      const [heading, ...rest] = block.split("\n");
      return { heading: heading.trim(), body: rest.join(" ").trim() };
    });
    if (editSlug) {
      setPosts((prev) => prev.map((p) => p.slug === editSlug ? { ...p, ...form, slug, content } : p));
    } else {
      setPosts((prev) => [{ slug, title: form.title, excerpt: form.excerpt, category: form.category, date: form.date, readTime: form.readTime, image: form.image, author: "Danyal Team", content }, ...prev]);
    }
    setShowForm(false);
  };

  const remove = (slug: string) => setPosts((prev) => prev.filter((p) => p.slug !== slug));

  return (
    <div>
      <SectionTitle
        title="Blog Posts"
        subtitle={`${posts.length} posts`}
        action={
          <PrimaryBtn onClick={openNew}>
            <Plus className="h-4 w-4" /> New Post
          </PrimaryBtn>
        }
      />

      {showForm && (
        <Card className="mb-6 border-accent-gold/30">
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" required placeholder="Post title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="sm:col-span-2" />
            <Input label="Category" required placeholder="Buying Guide" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input label="Read Time" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
            <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="sm:col-span-2" />
            <Input label="Excerpt" required placeholder="Short description..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">Body (sections separated by blank lines, heading on first line of each)</label>
              <textarea
                rows={6}
                required
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full rounded-xl border border-background-secondary bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              />
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <PrimaryBtn type="submit">{editSlug ? "Update Post" : "Publish Post"}</PrimaryBtn>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-background-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary">Cancel</button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.slug} className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-gold">{p.category}</span>
                <span className="text-[10px] text-text-secondary">{p.date} · {p.readTime}</span>
              </div>
              <p className="mt-1.5 truncate text-sm font-bold text-text-primary">{p.title}</p>
              <p className="mt-0.5 truncate text-xs text-text-secondary">{p.excerpt}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(p)} className="text-text-secondary hover:text-accent-gold" title="Edit"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(p.slug)} className="text-text-secondary hover:text-error" title="Delete"><Trash2 className="h-4 w-4" /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}