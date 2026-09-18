import type { Metadata } from "next";
import AdminInventory from "@/components/admin/AdminInventory";
export const metadata: Metadata = { title: "Inventory | Danyal Admin" };
export default function AdminInventoryPage() { return <AdminInventory />; }