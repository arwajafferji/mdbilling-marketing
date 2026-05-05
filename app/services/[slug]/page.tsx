import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  ClipboardCheck,
  CreditCard,
  FileText,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServiceBySlug, services } from "@/data/services";

/**
 * /services/[slug] — full service detail page.
 *
 * Pre-rendered statically for all 6 services via generateStaticParams.
 * Content lives in data/services.ts so MIL can review/edit copy without
 * touching JSX.
 */

const ICONS = {
  BarChart3,
  FileText,
  ClipboardCheck,
  CreditCard,
  ShieldCheck,
  CalendarCheck,
} as const;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | MD Billing Experts`,
      description: service.metaDescription,
      url: `https://mdbillinghouston.com/services/${service.slug}`,
    },
  };
}

const SITE_URL = "https://mdbillinghouston.com";

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = ICONS[service.iconName];

  // Service schema — declares this as a structured Service offered by the
  // organization, so AI engines and Google can map service queries here.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "City", name: "Houston" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Independent physician practices",
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
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  // Per-service FAQ schema. Each service page has its own FAQ items —
  // expose them as FAQPage so they can be pulled into AI search answers.
  const faqJsonLd =
    service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-navy-200 transition hover:text-white"
            >
              ← All services
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-crimson/20 ring-1 ring-crimson/30">
                <Icon className="h-7 w-7 text-crimson" />
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100 md:text-xl">
                {service.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/revenue-leakage-analysis"
                  className="group inline-flex items-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Get a free Revenue Leakage Analysis
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

        {/* Why it matters */}
        <section className="bg-white py-20">
          <div className="container-xl grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Why it matters
              </p>
              <h2 className="mt-3 text-3xl text-navy-800">
                The hidden cost of getting this wrong
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-navy-700">
                {service.whyItMatters}
              </p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                What's included
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Everything in this service
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
              {service.includes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/10">
                    <Check className="h-3.5 w-3.5 text-crimson" />
                  </div>
                  <p className="text-sm leading-relaxed text-navy-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common pitfalls */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Common pitfalls
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                What we see go wrong elsewhere
              </h2>
              <p className="mt-4 text-navy-600">
                Patterns we run into when we audit incoming practices. If any of
                these sound familiar, your current setup may be leaving money on
                the table.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-4xl space-y-4">
              {service.pitfalls.map((pitfall) => (
                <div
                  key={pitfall}
                  className="flex items-start gap-4 rounded-xl border border-navy-100 bg-navy-50/40 p-5"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  <p className="text-sm leading-relaxed text-navy-700">
                    {pitfall}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        {service.metrics.length > 0 && (
          <section className="bg-gradient-to-br from-navy-800 to-navy-700 py-20 text-white">
            <div className="container-xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                  Performance benchmarks
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl">
                  What we hold ourselves to
                </h2>
                <p className="mt-4 text-navy-200">
                  Industry medians shown where applicable. We track these every
                  week and report them to you, in writing.
                </p>
              </div>
              <div
                className={`mx-auto mt-12 grid max-w-5xl gap-6 ${
                  service.metrics.length >= 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-3"
                }`}
              >
                {service.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
                  >
                    <p className="text-3xl font-bold tracking-tight md:text-4xl">
                      {m.value}
                    </p>
                    <p className="mt-2 text-sm text-navy-100">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Frequently asked
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                What practices ask before they switch
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {service.faq.map((item) => (
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
                Want to know what {service.title.toLowerCase()} is costing you?
              </h2>
              <p className="mt-4 text-navy-200">
                Get a free Revenue Leakage Analysis — a one-page report with
                three specific revenue leaks at your practice and what they're
                costing per year. Delivered in 3 business days. No sales pitch.
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

        {/* Related services */}
        <section className="bg-white py-16">
          <div className="container-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy-500">
              Other services
            </p>
            <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3">
              {services
                .filter((s) => s.slug !== service.slug)
                .slice(0, 3)
                .map((s) => {
                  const RelatedIcon = ICONS[s.iconName];
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group rounded-xl border border-navy-100 bg-white p-5 transition hover:border-navy-300 hover:shadow-md"
                    >
                      <RelatedIcon className="h-6 w-6 text-crimson" />
                      <p className="mt-3 text-base font-semibold text-navy-800 group-hover:text-navy-900">
                        {s.title}
                      </p>
                      <p className="mt-1 text-xs text-navy-500">
                        Learn more →
                      </p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
