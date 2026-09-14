import PageHeader from "@/components/shared/PageHeader";

export default function PolicyLayout({
  kicker,
  title,
  updated,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader kicker={kicker} title={title} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm text-text-secondary">Last updated: {updated}</p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-text-secondary sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}