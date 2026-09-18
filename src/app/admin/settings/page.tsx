import type { Metadata } from "next";
import AdminSettings from "@/components/admin/AdminSettings";
export const metadata: Metadata = { title: "Settings | Danyal Admin" };
export default function AdminSettingsPage() { return <AdminSettings />; }