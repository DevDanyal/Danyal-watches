import type { Metadata } from "next";
import AdminBanners from "@/components/admin/AdminBanners";
export const metadata: Metadata = { title: "Banners | CRYSMA Admin" };
export default function AdminBannersPage() { return <AdminBanners />; }