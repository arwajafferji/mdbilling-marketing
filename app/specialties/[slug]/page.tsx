import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Quote, AlertTriangle, Stethoscope } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSpecialtyBySlug, specialties } from "@/data/specialties";

/**
 * /specialties/[slug] — full specialty detail page.
 *
 * Pre-rendered statically for all 9 specialties. Highlights the
 * specialty-specific revenue traps, code focus areas, payer notes
 * (Texas-flavored where possible), and KPIs.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) return {};

  return {
    title: `${specialty.name} Billing`,
    description: specialty.metaDescription,
    alternates: { canonical: `/specialties/${specialty.slug}` },
    openGraph: {
      title: `${specialty.name} Billing | MD Billing Experts`,
      description: specialty.metaDescription,
      url: `https://mdbillinghouston.com/specialties/${specialty.slug}`,
    },
  };
}

const SITE_URL = "https://mdbillinghouston.com";

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) notFound();

  // Service schema scoped to this specialty — helps AI engines map queries
  // like "cardiology billing services Houston" to this exact page.
  const specialtyServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${specialty.name} medical billing`,
    name: `${specialty.name} Medical Billing Services`,
    description: specialty.metaDescription,
    url: `${SITE_URL}/specialties/${specialty.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "City", name: "Houston" },
    ],
    audience: {
      "@type": "MedicalAudience",
      audienceType: `${specialty.name} physicians and practices`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Specialties",
        item: `${SITE_URL}/specialties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${specialty.name} Billing`,
        item: `${SITE_URL}/specialties/${specialty.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(specialtyServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 text-sm text-navy-200 transition hover:text-white"
            >
              ← All specialties
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-crimson/20 ring-1 ring-crimson/30">
                  <Stethoscope className="h-7 w-7 text-crimson" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                  Specialty
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                {specialty.name} billing
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100 md:text-xl">
                {specialty.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/revenue-leakage-analysis"
                  className="group inline-flex items-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Get a {specialty.shortName} revenue leakage analysis
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="tel:+18326606657"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Call (832) 660-6657
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight quote */}
        <section className="bg-white py-14">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-crimson bg-navy-50/40 p-8">
              <Quote className="h-8 w-8 text-crimson/60" />
              <p className="mt-3 text-xl leading-relaxed text-navy-800 md:text-2xl">
                {specialty.highlight}
              </p>
            </div>
          </div>
        </section>

        {/* Revenue traps */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Where revenue leaks
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                The {specialty.name.toLowerCase()} traps we see most
              </h2>
              <p className="mt-4 text-navy-600">
                Patterns we run into across {specialty.shortName} practices in
                Texas. None are obvious from a 30,000-foot view of the practice
                — they show up only when someone's actually looking at every
                claim.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
              {specialty.revenueTraps.map((trap) => (
                <div
                  key={trap.title}
                  className="flex flex-col rounded-xl border border-navy-100 bg-navy-50/40 p-6"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                    <h3 className="text-base font-semibold text-navy-800">
                      {trap.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-700">
                    {trap.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coding focus + Payer notes */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                  Coding focus
                </p>
                <h2 className="mt-3 text-2xl text-navy-800">
                  Where our coders specialize
                </h2>
                <ul className="mt-6 space-y-3">
                  {specialty.codingFocus.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-navy-700"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                  Texas payer notes
                </p>
                <h2 className="mt-3 text-2xl text-navy-800">
                  Local rules we navigate every day
                </h2>
                <ul className="mt-6 space-y-3">
                  {specialty.payerNotes.map((n) => (
                    <li
                      key={n}
                      className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-navy-700"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="bg-gradient-to-br from-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                {specialty.shortName} KPIs we track
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                Specialty-specific benchmarks
              </h2>
              <p className="mt-4 text-navy-200">
                We tailor reporting per specialty — these are the metrics that
                matter most for {specialty.name.toLowerCase()}.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
              {specialty.kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
                >
                  <p className="text-2xl font-bold tracking-tight md:text-3xl">
                    {k.value}
                  </p>
                  <p className="mt-2 text-sm text-navy-100">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                What's your {specialty.name.toLowerCase()} practice leaking?
              </h2>
              <p className="mt-4 text-navy-200">
                Get a free Revenue Leakage Analysis customized to{" "}
                {specialty.shortName} billing patterns. Three specific leaks at
                your practice, dollar amounts, and exactly how to fix them. 3
                business days. No sales pitch.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/revenue-leakage-analysis"
                  className="group inline-flex items-center gap-2 rounded-lg bg-crimson px-6 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Get my free analysis
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="tel:+18326606657"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  (832) 660-6657
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Other specialties */}
        <section className="bg-navy-50 py-16">
          <div className="container-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy-500">
              Other specialties we serve
            </p>
            <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
              {specialties
                .filter((s) => s.slug !== specialty.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/specialties/${s.slug}`}
                    className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-navy-400 hover:text-navy-900"
                  >
                    {s.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
