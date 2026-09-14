"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { SectionTitle, Card, Input, PrimaryBtn } from "@/components/admin/ui";

export default function AdminSettings() {
  const { settings, saveSettings } = useAdmin();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Settings" subtitle="Manage store configuration" />

      <Card>
        <div className="space-y-5">
          <Input
            label="Store Name"
            value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
          />
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Announcement Bar Text
            </label>
            <textarea
              rows={2}
              value={form.announcement}
              onChange={(e) => setForm({ ...form, announcement: e.target.value })}
              className="w-full rounded-xl border border-background-secondary bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
          </div>
          <Input
            label="Contact Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Contact Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Free Shipping Threshold (PKR)"
            type="number"
            min={0}
            value={form.shippingFreeThreshold}
            onChange={(e) => setForm({ ...form, shippingFreeThreshold: Number(e.target.value) })}
          />

          <div className="flex items-center gap-3 pt-2">
            <PrimaryBtn onClick={handleSave}>
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Settings"}
            </PrimaryBtn>
            {saved && (
              <span className="text-xs font-semibold text-success">Changes saved successfully.</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-lg font-bold text-text-primary">Admin Password</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Current admin password: <code className="rounded bg-background-secondary px-2 py-0.5 text-accent-gold">admin123</code>
        </p>
        <p className="mt-2 text-xs text-text-secondary">
          For production, change this in <code>AdminShell.tsx</code> or add a real auth system.
        </p>
      </Card>
    </div>
  );
}