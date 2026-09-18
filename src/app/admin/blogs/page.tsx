import type { Metadata } from "next";
import AdminBlogs from "@/components/admin/AdminBlogs";
export const metadata: Metadata = { title: "Blogs | Danyal Admin" };
export default function AdminBlogsPage() { return <AdminBlogs />; }