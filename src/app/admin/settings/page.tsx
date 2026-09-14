import type { Metadata } from "next";
import AdminSettings from "@/components/admin/AdminSettings";
export const metadata: Metadata = { title: "Settings | CRYSMA Admin" };
export default function AdminSettingsPage() { return <AdminSettings />; }