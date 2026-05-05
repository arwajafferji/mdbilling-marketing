import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * /service-areas — index of cities we serve in the Houston metro.
 *
 * Local-SEO play. Each city in the Houston metro that has practice density
 * gets its own /service-areas/[slug] page with unique content and
 * LocalBusiness schema. This index page links them all.
 */

export const metadata: Metadata = {
  title: "Service Areas | Texas Cities We Serve",
  description:
    "MD Billing Experts provides medical billing and revenue cycle management to physician practices across the Houston metro — Sugar Land, Katy, The Woodlands, Pearland, Cypress, Spring, and beyond.",
  alternates: { canonical: "/service-areas" },
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
      name: "Service Areas",
      item: "https://mdbillinghouston.com/service-areas",
    },
  ],
};

export default function ServiceAreasPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                Service Areas
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Medical billing across the Houston metro and Texas
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                We're based in Houston and serve independent practices
                throughout Texas. Below are the metros where we have active
                clients and visit in person for onboarding and quarterly
                reviews. If your city isn't listed, call — we likely already
                serve it.
              </p>
            </div>
          </div>
        </section>

        {/* Featured: Houston */}
        <section className="bg-white py-14">
          <div className="container-xl">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/houston"
                className="group block rounded-2xl border border-navy-100 bg-gradient-to-br from-crimson/5 to-navy-50 p-8 transition hover:border-crimson/40 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-crimson/10">
                    <MapPin className="h-6 w-6 text-crimson" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                      Headquarters &amp; primary market
                    </p>
                    <h2 className="mt-1 text-3xl font-semibold text-navy-800">
                      Houston, TX
                    </h2>
                    <p className="mt-3 text-navy-700">
                      Our home market. Independent practices throughout Greater
                      Houston, the Texas Medical Center, Memorial, Galleria,
                      Spring Branch, Bellaire, West University, and the
                      Energy Corridor — all served from our Houston offices
                      with 20+ years of local payer expertise.
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-crimson group-hover:translate-x-0.5 transition">
                      Read about Houston billing
                      <ArrowRight className="h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* City grid */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Suburbs we serve
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Greater Houston metro cities
              </h2>
              <p className="mt-4 text-navy-600">
                Active client markets where we visit in person. Each page
                covers local payer mix, practice density, and how we work in
                that specific city.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group rounded-2xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-crimson" />
                    <div>
                      <h3 className="text-xl font-semibold text-navy-800 group-hover:text-navy-900">
                        {area.city}, {area.state}
                      </h3>
                      <p className="mt-1 text-xs text-navy-500">
                        {area.relativeToHouston}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-600">
                    {area.heroSubtitle}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-crimson">
                    See local details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Texas-wide */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Beyond the Houston metro
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Practices across Texas
              </h2>
              <p className="mt-5 text-navy-700">
                Houston is our base, but we work with practices across the
                state — Austin, San Antonio, Dallas–Fort Worth, the Rio Grande
                Valley, East Texas, and West Texas. Texas-specific payer
                knowledge (TMHP, Texas Medicare/Novitas, Texas Medicaid managed
                plans like Superior, Amerigroup, Molina, UnitedHealthcare
                Community Plan) is one of our core differentiators.
              </p>
              <p className="mt-4 text-navy-700">
                We also serve a handful of practices in Louisiana, Oklahoma,
                Arkansas, and New Mexico — call us if your practice is in the
                region.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                Don't see your city?
              </h2>
              <p className="mt-4 text-navy-200">
                We serve practices across Texas. Call us — we'll tell you in 5
                minutes whether we're a fit.
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
                  Free Revenue Leakage Analysis
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
