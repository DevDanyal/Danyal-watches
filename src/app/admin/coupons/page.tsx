import type { Metadata } from "next";
import AdminCoupons from "@/components/admin/AdminCoupons";
export const metadata: Metadata = { title: "Coupons | Danyal Admin" };
export default function AdminCouponsPage() { return <AdminCoupons />; }