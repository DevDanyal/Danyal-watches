"use client";

import { useEffect, useState } from "react";
import { Save, KeyRound, Database, ServerCrash, Rocket } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { SectionTitle, Card, Input, PrimaryBtn } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

type DbStatus = "loading" | "connected" | "error" | "not_configured";

function DatabaseCard() {
  const { dbMode } = useAdmin();
  const [status, setStatus] = useState<DbStatus>("loading");
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/health", { cache: "no-store" })
      .then((r) => r.json().catch(() => null))
      .then((json) => {
        if (!active) return;
        const s = json?.data?.status;
        setStatus(s === "connected" ? "connected" : s === "error" ? "error" : "not_configured");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, []);

  const seed = async () => {
    setSeeding(true);
    setSeedMsg("");
    try {
      const res = await fetch("/api/setup/seed", { method: "POST" });
      const json = await res.json().catch(() => null);
      if (res.ok) {
        setSeedMsg(`Seeded ${json?.data?.seeded ?? 0} products. Reloading…`);
        window.setTimeout(() => window.location.reload(), 1200);
      } else {
        setSeedMsg(json?.error ?? "Seed failed.");
      }
    } catch {
      setSeedMsg("Seed failed. Check network / MONGODB_URI.");
    } finally {
      setSeeding(false);
    }
  };

  const connected = status === "connected";
  return (
    <Card className="mt-6">
      <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
        <Database className="h-5 w-5 text-accent-gold" /> Database
      </h2>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            connected ? "bg-success" : "bg-text-secondary"
          )}
        />
        <span className={cn("font-semibold", connected ? "text-success" : "text-text-secondary")}>
          {status === "loading"
            ? "Checking…"
            : connected
              ? "MongoDB connected"
              : status === "error"
                ? "Connection error"
                : "Not connected (demo mode)"}
        </span>
      </div>
      {connected ? (
        <>
          <p className="mt-3 text-sm text-text-secondary">
            Product and order changes are persisted to MongoDB and shown to all
            visitors in real time.
            {!dbMode && " Admin is still buffering the catalog — reload if products are missing."}
          </p>
          <div className="mt-4">
            <PrimaryBtn onClick={seed} disabled={seeding}>
              {seeding ? <ServerCrash className="h-4 w-4 animate-pulse" /> : <Rocket className="h-4 w-4" />}
              {seeding ? "Seeding…" : "Seed catalog from store data"}
            </PrimaryBtn>
            {seedMsg && (
              <p className="mt-2 text-xs text-text-secondary">{seedMsg}</p>
            )}
          </div>
        </>
      ) : (
        <div className="mt-3 rounded-lg border border-border bg-background p-4 text-sm text-text-secondary">
          <p>
            Set <span className="font-mono text-text-primary">MONGODB_URI</span> in{" "}
            <span className="font-mono text-text-primary">.env.local</span> (and in
            Vercel) to enable persistent, server-side storage. Until then the site
            runs on in-browser localStorage and admin edits only apply to your own
            browser.
          </p>
        </div>
      )}
    </Card>
  );
}

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
        <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-text-primary">
          <KeyRound className="h-5 w-5 text-accent-gold" /> Admin Password
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Admin sign-in is verified on the server. To change the password in
          demo mode (no database), update the{" "}
          <span className="font-mono text-text-primary">ADMIN_PASSWORD</span>{" "}
          environment variable and redeploy. In database mode, update the
          password of the administrator User record directly.
        </p>
      </Card>

      <DatabaseCard />
    </div>
  );
}