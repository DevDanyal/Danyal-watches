import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const productLinks = [
  { name: "Men", href: "/collections/men" },
  { name: "Women", href: "/collections/women" },
  { name: "Couple", href: "/collections/couple" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Exchange & Return", href: "/exchange-return" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Blogs", href: "/blogs" },
  { name: "Track Order", href: "/track-order" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIcons = [
  { icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61588412626664", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-10 lg:pb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-wider text-accent-gold">
              CRYSMA
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Precision-crafted timepieces combining Swiss-inspired design with
              exceptional value. Every watch is a testament to quality and
              timeless style.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Products
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
                Khalid Watch Co., Fawara Chowk, Main Shahalam Market Road,
                Lahore
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent-gold" />
                <a
                  href="mailto:aidevdanyal@gmail.com"
                  className="transition-colors hover:text-accent-gold"
                >
                  aidevdanyal@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent-gold" />
                <a
                  href="tel:+923464141007"
                  className="transition-colors hover:text-accent-gold"
                >
                  +92 346 4141007
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background-secondary bg-card-background text-text-secondary transition-all hover:border-accent-gold hover:text-accent-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} CRYSMA Watches. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">
            Crafted with precision. Built to last.
          </p>
        </div>
      </div>
    </footer>
  );
}