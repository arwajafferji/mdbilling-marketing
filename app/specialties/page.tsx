import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { specialties } from "@/data/specialties";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "Specialty-specific medical billing for Texas independent practices: internal medicine, pediatrics, cardiology, hospitalist, rehab, senior living, pulmonary, geriatrics, nephrology.",
  alternates: { canonical: "/specialties" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://mdbillinghouston.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Specialties",
      item: "https://mdbillinghouston.com/specialties",
    },
  ],
};

// ItemList schema — helps Google understand this is a curated list of
// specialty offerings linked to detail pages.
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: specialties.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://mdbillinghouston.com/specialties/${s.slug}`,
    name: `${s.name} Medical Billing`,
  })),
};

export default function SpecialtiesIndexPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                Specialties
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Specialty billing, done by specialists
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                We don't run one playbook across every practice. Each specialty
                has its own coding patterns, payer rules, and revenue traps —
                and our team is built around that reality.
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {specialties.map((s) => (
                <Link
                  key={s.slug}
                  href={`/specialties/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-7 transition hover:border-navy-300 hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 ring-1 ring-crimson/20">
                    <Stethoscope className="h-6 w-6 text-crimson" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-navy-800 group-hover:text-navy-900">
                    {s.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {s.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-crimson">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">Don't see your specialty?</h2>
              <p className="mt-4 text-navy-200">
                We've worked with 30+ specialties across Texas. Tell us yours
                and we'll send a quick note on what we'd watch for.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="tel:+18326606657"
                  className="group inline-flex items-center gap-2 rounded-lg bg-crimson px-6 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Call (832) 660-6657
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/revenue-leakage-analysis"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Free analysis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
