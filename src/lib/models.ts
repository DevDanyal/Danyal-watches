import { Schema, model, models, Document, Model } from "mongoose";

export interface DbProduct {
  _id?: unknown;
  name: string;
  subtitle: string;
  category: string;
  slug: string;
  price: number;
  regularPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: "sale" | "new" | "bestseller";
  colors?: { name: string; hex: string }[];
  images: string[];
  sku: string;
  stock: number;
  status: "draft" | "published";
  description?: string;
  createdAt?: Date;
}

const ProductSchema = new Schema<DbProduct>(
  {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    regularPrice: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    badge: String,
    colors: [{ name: String, hex: String }],
    images: [String],
    sku: String,
    stock: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    description: String,
  },
  { timestamps: true }
);

export interface DbUser extends Document {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  passwordHash: string;
  role: "customer" | "admin";
}

const UserSchema = new Schema<DbUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: String,
    city: String,
    address: String,
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  { timestamps: true }
);

export interface DbOrderItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  color?: string;
  quantity: number;
  price: number;
}

export interface DbOrder extends Document {
  orderId: string;
  email: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  items: DbOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema<DbOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    customerName: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    items: [
      {
        productId: String,
        name: String,
        slug: String,
        image: String,
        color: String,
        quantity: Number,
        price: Number,
      },
    ],
    subtotal: Number,
    shipping: { type: Number, default: 0 },
    total: Number,
    paymentMethod: String,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export interface DbCoupon extends Document {
  code: string;
  type: "percentage" | "flat";
  value: number;
  minOrder: number;
  expires: string;
  limit: number;
  used: number;
  active: boolean;
}

const CouponSchema = new Schema<DbCoupon>({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ["percentage", "flat"], required: true },
  value: { type: Number, required: true },
  minOrder: { type: Number, default: 0 },
  expires: String,
  limit: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export interface DbBanner extends Document {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  active: boolean;
}

const BannerSchema = new Schema<DbBanner>({
  title: { type: String, required: true },
  subtitle: String,
  cta: String,
  image: String,
  active: { type: Boolean, default: true },
});

export interface DbBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: { heading: string; body: string }[];
}

const BlogSchema = new Schema<DbBlog>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: String,
  image: String,
  category: String,
  date: String,
  readTime: String,
  author: String,
  content: [{ heading: String, body: String }],
});

export interface DbSettings extends Document {
  key: string;
  value: Record<string, unknown>;
}

const SettingsSchema = new Schema<DbSettings>({
  key: { type: String, unique: true },
  value: Schema.Types.Mixed,
});

export function getModel<T>(name: string, schema: Schema): Model<T> {
  return (models[name] as Model<T>) ?? model<T>(name, schema);
}

export const ProductModel = getModel<DbProduct>("Product", ProductSchema);
export const UserModel = getModel<DbUser>("User", UserSchema);
export const OrderModel = getModel<DbOrder>("Order", OrderSchema);
export const CouponModel = getModel<DbCoupon>("Coupon", CouponSchema);
export const BannerModel = getModel<DbBanner>("Banner", BannerSchema);
export const BlogModel = getModel<DbBlog>("Blog", BlogSchema);
export const SettingsModel = getModel<DbSettings>("Settings", SettingsSchema);