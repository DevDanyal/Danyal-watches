import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-bold text-sale-badge sm:text-8xl">
        404
      </span>
      <h1 className="mt-4 text-2xl font-bold text-text-primary sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-text-secondary">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-text-primary px-10 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-sale-badge"
      >
        Back to Home
      </Link>
    </div>
  );
}