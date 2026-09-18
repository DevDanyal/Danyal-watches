import type { Metadata } from "next";
import AdminCategories from "@/components/admin/AdminCategories";
export const metadata: Metadata = { title: "Categories | Danyal Admin" };
export default function AdminCategoriesPage() { return <AdminCategories />; }