import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Building2, Stethoscope } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getServiceAreaBySlug,
  serviceAreas,
} from "@/data/serviceAreas";

/**
 * /service-areas/[slug] — per-city landing page for Houston-metro suburbs.
 *
 * Each page is local-SEO-optimized: unique LocalBusiness JSON-LD with the
 * city's geo coordinates, FAQPage schema, BreadcrumbList, and unique
 * content (no boilerplate). Pre-rendered statically via
 * generateStaticParams.
 */

const SITE_URL = "https://mdbillinghouston.com";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return serviceAreas.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `Medical Billing in ${area.city}, ${area.state}`,
    description: area.metaDescription,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: {
      title: `Medical Billing Services in ${area.city}, ${area.state} | MD Billing Experts`,
      description: area.metaDescription,
      url: `${SITE_URL}/service-areas/${area.slug}`,
    },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  // City-specific LocalBusiness schema. Each city page declares the same
  // business but with that city's geo coordinates and addressLocality —
  // helps Google associate the business with each city for local search.
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    name: `MD Billing Experts — ${area.city}, ${area.state}`,
    url: `${SITE_URL}/service-areas/${area.slug}`,
    telephone: "+1-832-660-6657",
    email: "contact@mdbillinghouston.com",
    image: `${SITE_URL}/logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: area.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.latitude,
      longitude: area.longitude,
    },
    areaServed: {
      "@type": "City",
      name: area.city,
    },
    description: area.metaDescription,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
        name: "Service Areas",
        item: `${SITE_URL}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.city}, ${area.state}`,
        item: `${SITE_URL}/service-areas/${area.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-sm text-navy-200 transition hover:text-white"
            >
              ← All service areas
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-crimson/20 ring-1 ring-crimson/30">
                  <MapPin className="h-7 w-7 text-crimson" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                  Service area · {area.relativeToHouston}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Medical billing in {area.city}, {area.state}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100 md:text-xl">
                {area.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/revenue-leakage-analysis"
                  className="group inline-flex items-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Get a Free Revenue Leakage Analysis
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

        {/* Why local */}
        <section className="bg-white py-20">
          <div className="container-xl grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Why local matters
              </p>
              <h2 className="mt-3 text-3xl text-navy-800">
                {area.city} is in our backyard
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-navy-700">
                {area.whyLocal}
              </p>
            </div>
          </div>
        </section>

        {/* Healthcare landmarks + practice patterns */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-crimson" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                    Local healthcare landmarks
                  </p>
                </div>
                <h2 className="mt-3 text-2xl text-navy-800">
                  Hospitals and medical districts we know
                </h2>
                <ul className="mt-6 space-y-3">
                  {area.healthcareLandmarks.map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-navy-700"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-crimson" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                    Practice patterns
                  </p>
                </div>
                <h2 className="mt-3 text-2xl text-navy-800">
                  What {area.city} practices look like
                </h2>
                <ul className="mt-6 space-y-3">
                  {area.practicePatterns.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-navy-700"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Questions {area.city} practices ask
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {area.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-navy-100 bg-navy-50/40 p-5 open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-navy-800">
                    <span className="flex items-start justify-between gap-4">
                      {item.q}
                      <span className="ml-2 mt-0.5 text-crimson transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-navy-700">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                Free Revenue Leakage Analysis for your {area.city} practice
              </h2>
              <p className="mt-4 text-navy-200">
                A one-page report with three specific revenue leaks at your
                practice and what they're costing per year. Delivered in 3
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

        {/* Other cities */}
        <section className="bg-white py-16">
          <div className="container-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy-500">
              Other Houston-metro service areas
            </p>
            <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
              <Link
                href="/houston"
                className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-navy-400 hover:text-navy-900"
              >
                Houston, TX
              </Link>
              {serviceAreas
                .filter((s) => s.slug !== area.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/service-areas/${s.slug}`}
                    className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-navy-400 hover:text-navy-900"
                  >
                    {s.city}, {s.state}
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
