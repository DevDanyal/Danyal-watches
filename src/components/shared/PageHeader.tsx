export default function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-background-secondary bg-background-secondary py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
          {kicker}
        </span>
        <h1 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mt-5 h-px w-16 bg-accent-gold" />
      </div>
    </div>
  );
}