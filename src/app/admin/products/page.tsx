import type { Metadata } from "next";
import AdminProducts from "@/components/admin/AdminProducts";
export const metadata: Metadata = { title: "Products | Danyal Admin" };
export default function AdminProductsPage() { return <AdminProducts />; }