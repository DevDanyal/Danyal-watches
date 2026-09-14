import type { Metadata } from "next";
import AdminMedia from "@/components/admin/AdminMedia";
export const metadata: Metadata = { title: "Media Library | CRYSMA Admin" };
export default function AdminMediaPage() { return <AdminMedia />; }