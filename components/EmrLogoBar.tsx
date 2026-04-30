/**
 * EMR / PM integration trust bar.
 *
 * Currently uses styled text marks since we haven't licensed real EMR logos.
 * To swap in real logos: drop SVG/PNG files into /public/logos/{slug}.svg
 * and replace the <span> elements below with <Image> tags.
 *
 * Note on logo rights: nominative fair use generally allows "we integrate
 * with X" usage, but each vendor has different brand guidelines. Safest
 * path is to ask each vendor for permission or use simple text marks.
 */

const emrs = [
  { name: "eClinicalWorks", style: "tracking-tight font-semibold" },
  { name: "athenahealth", style: "lowercase italic font-light" },
  { name: "Epic", style: "font-bold" },
  { name: "Cerner", style: "uppercase tracking-widest text-[0.85em]" },
  { name: "NextGen", style: "tracking-tight font-semibold" },
  { name: "Kareo · Tebra", style: "font-medium" },
  { name: "AdvancedMD", style: "tracking-tight font-bold" },
  { name: "Medisoft", style: "italic font-medium" },
];

export default function EmrLogoBar() {
  return (
    <section className="border-y border-navy-100 bg-navy-50/40 py-12">
      <div className="container-xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy-500">
          We plug into your EMR / PM system
        </p>
        <div className="mt-7 grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {emrs.map((e) => (
            <div
              key={e.name}
              className={`text-center text-base text-navy-400 transition hover:text-navy-700 md:text-lg ${e.style}`}
              title={e.name}
            >
              {e.name}
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-xs text-navy-500">
          Don&apos;t see yours? We&apos;ve worked with 30+ systems —{" "}
          <a href="tel:+18326606657" className="font-semibold text-crimson">
            ask us about yours
          </a>
          .
        </p>
      </div>
    </section>
  );
}
