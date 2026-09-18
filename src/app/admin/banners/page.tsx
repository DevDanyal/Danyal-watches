import type { Metadata } from "next";
import AdminBanners from "@/components/admin/AdminBanners";
export const metadata: Metadata = { title: "Banners | Danyal Admin" };
export default function AdminBannersPage() { return <AdminBanners />; }