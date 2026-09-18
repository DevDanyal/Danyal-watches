"use client";

import { useState } from "react";
import { Save, KeyRound } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { SectionTitle, Card, Input, PrimaryBtn } from "@/components/admin/ui";

const ACCOUNT_KEY = "danyal_admin_account";

export default function AdminSettings() {
  const { settings, saveSettings } = useAdmin();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [passForm, setPassForm] = useState({ current: "", next: "", next2: "" });
  const [passMsg, setPassMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSave = () => {
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = () => {
    type Account = { email: string; password: string };
    const read = (): Account | null => {
      try {
        const raw = window.localStorage.getItem(ACCOUNT_KEY);
        return raw ? (JSON.parse(raw) as Account) : null;
      } catch {
        return null;
      }
    };
    const account = read();
    if (!account) {
      setPassMsg({ ok: false, text: "Admin account not initialized." });
      return;
    }
    if (passForm.current !== account.password) {
      setPassMsg({ ok: false, text: "Current password is incorrect." });
      return;
    }
    if (passForm.next.length < 6) {
      setPassMsg({ ok: false, text: "New password must be at least 6 characters." });
      return;
    }
    if (passForm.next !== passForm.next2) {
      setPassMsg({ ok: false, text: "New passwords do not match." });
      return;
    }
    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ ...account, password: passForm.next }));
    setPassForm({ current: "", next: "", next2: "" });
    setPassMsg({ ok: true, text: "Password updated successfully." });
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
        <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
          <KeyRound className="h-5 w-5 text-accent-gold" /> Admin Password
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Change the password used to sign in to this dashboard (applies to the
          local admin account).
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input
            label="Current Password"
            type="password"
            value={passForm.current}
            onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
          />
          <Input
            label="New Password"
            type="password"
            value={passForm.next}
            onChange={(e) => setPassForm({ ...passForm, next: e.target.value })}
          />
          <Input
            label="Confirm New"
            type="password"
            value={passForm.next2}
            onChange={(e) => setPassForm({ ...passForm, next2: e.target.value })}
          />
        </div>
        {passMsg && (
          <p className={passMsg.ok ? "mt-3 text-sm text-success" : "mt-3 text-sm text-error"}>
            {passMsg.text}
          </p>
        )}
        <div className="mt-4">
          <PrimaryBtn onClick={handlePasswordChange}>Update Password</PrimaryBtn>
        </div>
      </Card>
    </div>
  );
}