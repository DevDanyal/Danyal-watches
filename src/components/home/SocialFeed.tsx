import Link from "next/link";
import Image from "next/image";

const posts = [
  "/images/home/images (13).jpg",
  "/images/home/images (14).jpg",
  "/images/home/images (15).jpg",
  "/images/home/images (16).jpg",
  "/images/home/images (17).jpg",
  "/images/home/images (18).jpg",
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function SocialFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          <InstagramIcon className="h-4 w-4" />
          Follow @crysmawatches
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Join Our Community
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
        {posts.map((src, i) => (
          <Link
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Instagram post ${i + 1}`}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <InstagramIcon className="h-6 w-6 text-white" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}