import type { Metadata } from "next";
import AdminOrders from "@/components/admin/AdminOrders";
export const metadata: Metadata = { title: "Orders | Danyal Admin" };
export default function AdminOrdersPage() { return <AdminOrders />; }