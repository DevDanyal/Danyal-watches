import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

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

const socialIcons = [
  { icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61588412626664", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 pb-10 md:grid-cols-4 lg:pb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-wide text-text-primary">
                CRYS<span className="text-sale-badge">MA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Precision-crafted timepieces combining Swiss-inspired design with
              exceptional value. Free nationwide delivery, 30-day returns and a
              1-year warranty on every order.
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-all hover:border-text-primary hover:text-text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-primary">
              Shop CRYSMA
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
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sale-badge" />
                Fawara Chowk, Main Shahalam Market Road, Lahore
              </li>
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
            © {new Date().getFullYear()} CRYSMA Watches. All rights reserved.
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