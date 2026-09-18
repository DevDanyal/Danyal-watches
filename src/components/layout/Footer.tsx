import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const shopLinks = [
  { name: "Sale", href: "/collections/sale" },
  { name: "Best Sellers", href: "/collections/best-sellers" },
  { name: "New Arrivals", href: "/collections/new-arrivals" },
  { name: "Men Watches", href: "/collections/men" },
  { name: "Ladies Watches", href: "/collections/women" },
  { name: "Couple Watches", href: "/collections/couple" },
];

const customerCareLinks = [
  { name: "Track Order", href: "/track-order" },
  { name: "Contact Us", href: "/contact" },
  { name: "Returns & Exchange", href: "/exchange-return" },
  { name: "Warranty Information", href: "/exchange-return" },
  { name: "Shipping Policy", href: "/terms-and-conditions" },
  { name: "Modes of Payment", href: "/checkout" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-and-conditions" },
];

const aboutLinks = [
  { name: "Our Story", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Account", href: "/account" },
  { name: "Wishlist", href: "/wishlist" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 pb-10 md:grid-cols-4 lg:pb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-wide text-text-primary">
                Danyal
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Precision-crafted timepieces combining Swiss-inspired design with
              exceptional value. Free nationwide delivery, 30-day returns and a
              1-year warranty on every order.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-primary">
              Shop Danyal
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-primary">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-primary">
              About
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mb-3 mt-8 text-sm font-bold uppercase tracking-wider text-text-primary">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-sale-badge" />
                <a
                  href="mailto:aidevdanyal@gmail.com"
                  className="transition-colors hover:text-text-primary"
                >
                  aidevdanyal@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-sale-badge" />
                <a
                  href="tel:+923464141007"
                  className="transition-colors hover:text-text-primary"
                >
                  +92 346 4141007
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} Danyal Watches. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              Cash on Delivery
            </span>
            <span className="h-1 w-1 rounded-full bg-text-secondary" />
            <span className="flex items-center gap-1.5">JazzCash</span>
            <span className="h-1 w-1 rounded-full bg-text-secondary" />
            <span className="flex items-center gap-1.5">EasyPaisa</span>
            <span className="h-1 w-1 rounded-full bg-text-secondary" />
            <span className="flex items-center gap-1.5">Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}