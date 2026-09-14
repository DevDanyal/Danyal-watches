import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <span className="font-montserrat text-6xl font-bold text-accent-gold sm:text-8xl">
        404
      </span>
      <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-text-secondary">
        The page you are looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent-gold px-10 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-accent-gold-light"
      >
        Back to Home
      </Link>
    </div>
  );
}