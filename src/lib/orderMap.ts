import type { SavedOrder } from "@/components/checkout/CheckoutClient";

export type DbOrderJson = {
  orderId?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  items?: {
    productId?: string;
    name?: string;
    slug?: string;
    image?: string;
    color?: string;
    quantity?: number;
    price?: number;
  }[];
  subtotal?: number;
  total?: number;
  note?: string;
  paymentMethod?: string;
  status?: SavedOrder["status"];
  createdAt?: string;
};

export function dbOrderToSavedOrder(doc: DbOrderJson): SavedOrder {
  const name = doc.customerName ?? "";
  const firstSpace = name.indexOf(" ");
  const firstName = firstSpace === -1 ? name : name.slice(0, firstSpace);
  const lastName = firstSpace === -1 ? "" : name.slice(firstSpace + 1);
  const items = (doc.items ?? []).map((it, i) => ({
    id: it.productId ?? `item-${i}`,
    slug: it.slug ?? "",
    code: "",
    name: it.name ?? "Watch",
    subtitle: "",
    price: it.price ?? 0,
    regularPrice: it.price ?? 0,
    image: it.image ?? "",
    color: it.color,
    quantity: it.quantity ?? 1,
  }));
  return {
    orderId: doc.orderId ?? "",
    items,
    total: doc.total ?? doc.subtotal ?? 0,
    shipping: {
      firstName,
      lastName,
      email: doc.email ?? "",
      phone: doc.phone ?? "",
      address: doc.address ?? "",
      city: doc.city ?? "",
      province: doc.province ?? "",
    },
    paymentMethod: doc.paymentMethod ?? "cod",
    date: doc.createdAt ?? new Date().toISOString(),
    note: doc.note,
    status: doc.status ?? "pending",
  };
}