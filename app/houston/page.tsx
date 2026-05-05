import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Building2,
  Stethoscope,
  Phone,
  Mail,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * /houston — primary local-SEO landing page for Houston, TX.
 *
 * Houston is the home market and gets a richer page than the suburb
 * service-area pages: more neighborhoods, more landmarks, more FAQ items,
 * and a NAP block aligned with what should be on Google Business Profile.
 * NAP (Name/Address/Phone) consistency is a major local-SEO signal — keep
 * the values here identical to GBP and citation directories.
 */

const SITE_URL = "https://mdbillinghouston.com";

export const metadata: Metadata = {
  title:
    "Medical Billing Services in Houston, TX | Local Texas RCM Company",
  description:
    "Houston-based medical billing and revenue cycle management for independent physician practices. 20+ years serving Texas, 95% first-pass acceptance, certified coders. Free Revenue Leakage Analysis.",
  alternates: { canonical: "/houston" },
  openGraph: {
    title:
      "Medical Billing Services in Houston, TX | MD Billing Experts",
    description:
      "Houston-based medical billing and RCM. 20+ years serving Texas practices. Free Revenue Leakage Analysis.",
    url: `${SITE_URL}/houston`,
  },
};

const houstonNeighborhoods = [
  "Texas Medical Center (TMC)",
  "Memorial / Memorial City",
  "Galleria / Uptown",
  "Bellaire",
  "West University",
  "River Oaks",
  "Heights",
  "Spring Branch",
  "Energy Corridor",
  "Westchase",
  "Champions",
  "Greenway Plaza",
  "Midtown",
  "Sharpstown",
  "Clear Lake",
  "Kingwood",
];

const hospitals = [
  "Houston Methodist Hospital (TMC)",
  "Memorial Hermann–Texas Medical Center",
  "Texas Children's Hospital",
  "MD Anderson Cancer Center",
  "Memorial Hermann Memorial City",
  "Houston Methodist Willowbrook",
  "HCA Houston Healthcare network",
  "Kelsey-Seybold Clinic locations",
  "St. Luke's Health (Baylor St. Luke's)",
];

const houstonFaq = [
  {
    q: "Where is MD Billing Experts located in Houston?",
    a: "We're a Houston, Texas–headquartered medical billing company serving independent physician practices across the Greater Houston metro and statewide. For our exact address and Google Business Profile, see the contact section below or call (832) 660-6657.",
  },
  {
    q: "Do you only serve practices in Houston proper?",
    a: "No. Houston is our base, but we serve practices across the Houston metro (Sugar Land, Katy, The Woodlands, Pearland, Cypress, Spring) and statewide. Local Texas knowledge — TMHP, Texas Novitas, Texas Medicaid managed plans — is one of our core differentiators.",
  },
  {
    q: "What Houston neighborhoods and medical districts do you serve?",
    a: "All of them. We work with practices in the Texas Medical Center, Memorial, Galleria, Bellaire, West University, Heights, Spring Branch, Energy Corridor, Champions, Clear Lake, Kingwood, and every other Houston-area medical district. Independent practices everywhere; that's our market.",
  },
  {
    q: "How long has your company been in Houston?",
    a: "20+ years. Our clients are Texas practices, our staff is Texas-based, and our owner has been running the company from Houston since the start. We're not a national billing company with a Houston office — we're a Houston billing company.",
  },
  {
    q: "Are you HIPAA-compliant and Medicare-certified?",
    a: "Yes. We sign a Business Associate Agreement (BAA) with every practice. Our coders are AAPC-certified, we follow CMS LCDs (Texas Novitas), Medicare Advantage plan rules, and Texas Medicaid (TMHP) policies. Quarterly internal audits and annual external audits.",
  },
  {
    q: "What EMR systems do you support for Houston practices?",
    a: "eClinicalWorks (we're certified), Athenahealth, Epic, Cerner, NextGen, Kareo/Tebra, AdvancedMD, Medisoft, and 20+ others. The Houston practice market uses a wide mix — call us with your EMR and we'll tell you in 5 minutes whether we can plug in.",
  },
  {
    q: "Can we meet your team in person?",
    a: "Yes. Houston practices get in-person onboarding kickoffs, quarterly business reviews, and audit walkthroughs at your office. For practices outside Houston, we drive or fly to you for major milestones.",
  },
  {
    q: "What does outsourced medical billing cost in Houston?",
    a: "We charge a percentage of collections — the rate depends on specialty, claim volume, and scope. We quote after the free Revenue Leakage Analysis so you know exactly what you're paying for. No setup fees on standard onboardings, no multi-year contracts (month-to-month after the first 90 days).",
  },
];

// LocalBusiness schema specific to the Houston page — reinforces the
// Houston entity for Google's local search index. References the root
// Organization @id so all pages roll up to one entity.
const houstonJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness", "ProfessionalService"],
  name: "MD Billing Experts — Houston, TX",
  url: `${SITE_URL}/houston`,
  telephone: "+1-832-660-6657",
  email: "contact@mdbillinghouston.com",
  image: `${SITE_URL}/logo.png`,
  logo: `${SITE_URL}/logo.png`,
  priceRange: "$$",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77002",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.7604,
    longitude: -95.3698,
  },
  areaServed: [
    { "@type": "City", name: "Houston" },
    { "@type": "City", name: "Bellaire" },
    { "@type": "City", name: "West University Place" },
    { "@type": "City", name: "Jersey Village" },
    { "@type": "City", name: "Bunker Hill Village" },
    { "@type": "City", name: "Hunters Creek Village" },
    { "@type": "City", name: "Piney Point Village" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  description:
    "Houston, Texas medical billing and revenue cycle management company. Serving independent physician practices in the Texas Medical Center, Memorial, Galleria, Spring Branch, Bellaire, West University, Heights, Energy Corridor, and across Greater Houston.",
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
      name: "Houston, TX",
      item: `${SITE_URL}/houston`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: houstonFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function HoustonPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(houstonJsonLd) }}
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
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-crimson/20 ring-1 ring-crimson/30">
                  <MapPin className="h-7 w-7 text-crimson" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                  Houston, Texas — Headquarters
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Medical billing services in Houston, TX
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100 md:text-xl">
                MD Billing Experts is a Houston-based medical billing and
                revenue cycle management company serving independent physician
                practices across the Greater Houston metro and statewide.
                Twenty-plus years of Texas experience, 95% first-pass claim
                acceptance, certified coders, and a team that drives to your
                practice for onboarding.
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

        {/* Quick facts — AI-extractable factual block */}
        <section className="bg-white py-16">
          <div className="container-xl">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                About MD Billing Experts
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Houston's specialty-aware medical billing partner
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Headquarters
                  </p>
                  <p className="mt-2 text-base text-navy-800">Houston, Texas</p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Years in business
                  </p>
                  <p className="mt-2 text-base text-navy-800">20+ years</p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Practices served
                  </p>
                  <p className="mt-2 text-base text-navy-800">
                    25+ independent practices across Texas
                  </p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    First-pass claim acceptance
                  </p>
                  <p className="mt-2 text-base text-navy-800">95%+</p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Days in AR
                  </p>
                  <p className="mt-2 text-base text-navy-800">
                    32 average (industry target &lt;40)
                  </p>
                </div>
                <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Compliance
                  </p>
                  <p className="mt-2 text-base text-navy-800">
                    HIPAA-compliant, AAPC-certified coders, eClinicalWorks
                    Certified
                  </p>
                </div>
              </div>
              <p className="mt-6 leading-relaxed text-navy-700">
                MD Billing Experts is a privately-owned Houston, Texas medical
                billing company. We provide end-to-end revenue cycle management
                for independent physician practices, including eligibility
                verification, medical coding, claim submission, ERA posting,
                AR follow-up, denial management, provider credentialing, and
                patient billing. Our specialty focus areas are internal
                medicine, pediatrics, cardiology, hospitalist, rehabilitation,
                senior living, pulmonary, geriatrics, and nephrology.
              </p>
            </div>
          </div>
        </section>

        {/* Houston neighborhoods served */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-crimson" />
                    <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                      Neighborhoods we serve
                    </p>
                  </div>
                  <h2 className="mt-3 text-2xl text-navy-800 md:text-3xl">
                    Every Houston medical district
                  </h2>
                  <p className="mt-4 text-navy-700">
                    Independent practices across Greater Houston use us. Below
                    is a partial list of neighborhoods and medical districts
                    where we have active clients.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {houstonNeighborhoods.map((n) => (
                      <span
                        key={n}
                        className="rounded-full border border-navy-200 bg-white px-3 py-1.5 text-sm text-navy-700"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-crimson" />
                    <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                      Hospital systems we know
                    </p>
                  </div>
                  <h2 className="mt-3 text-2xl text-navy-800 md:text-3xl">
                    Houston referral patterns we understand
                  </h2>
                  <p className="mt-4 text-navy-700">
                    Houston's hospital systems each have their own credentialing,
                    referral, and billing nuances. We know them.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {hospitals.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-navy-700"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Houston practices choose us */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Why local Texas billers
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                The case for a Houston billing partner
              </h2>
              <div className="mt-6 space-y-5 text-navy-700">
                <p className="leading-relaxed">
                  National billing companies have scale. What they don't have
                  is Texas. Our team has spent two decades inside Texas Medicare
                  (Novitas), Texas Medicaid (TMHP), Texas Medicaid managed
                  plans (Superior, Amerigroup, Molina, UnitedHealthcare
                  Community Plan), and the commercial PPO mix that defines
                  Houston-area practices (BCBS Texas, UHC, Aetna, Cigna,
                  Humana). That depth shows up in three places.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-navy-800">First-pass acceptance.</strong>{" "}
                  We hit 95%+ because our coders know Texas LCD policies cold —
                  what Novitas accepts, what they bounce, and how to document
                  around the gray areas. Generic billers learn this on your
                  claims.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-navy-800">Denial recovery.</strong> We
                  appeal Texas Medicare denials by their actual policy
                  language, not generic templates. When Texas Medicaid managed
                  plans deny, we know whether it's a real policy issue or a
                  payer error worth escalating. We routinely recover 5-figure
                  amounts in the first 90 days from claims previous billers
                  wrote off.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-navy-800">In-person presence.</strong>{" "}
                  Our team is in Houston. We come to your practice for
                  onboarding kickoffs, quarterly reviews, and major audits.
                  National billing companies will video-call you. We'll drive
                  to your office.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services + specialties cross-link */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                  What we do for Houston practices
                </p>
                <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                  Six service lines, nine specialty focus areas
                </h2>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-navy-100 bg-white p-6">
                  <h3 className="text-xl font-semibold text-navy-800">
                    Services
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <Link
                        href="/services/revenue-cycle-management"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Revenue Cycle Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/medical-coding"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Medical Coding
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/credentialing"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Provider Credentialing &amp; Enrollment
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/ar-denial-management"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → AR &amp; Denial Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/eligibility-verification"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Eligibility Verification
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/patient-billing"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Patient Billing
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-navy-100 bg-white p-6">
                  <h3 className="text-xl font-semibold text-navy-800">
                    Specialties
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <Link
                        href="/specialties/internal-medicine"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Internal Medicine
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/specialties/pediatrics"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Pediatrics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/specialties/cardiology"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Cardiology
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/specialties/hospitalist"
                        className="text-navy-700 hover:text-crimson"
                      >
                        → Hospitalist
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/specialties"
                        className="font-semibold text-crimson hover:text-crimson-hover"
                      >
                        → All 9 specialty pages
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Houston FAQ
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Questions Houston practices ask
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {houstonFaq.map((item) => (
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

        {/* NAP block — keep identical to GBP and citations */}
        <section className="bg-navy-50 py-16">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                Contact
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-800">
                MD Billing Experts
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <span>Houston, Texas (service-area business)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <a href="tel:+18326606657" className="hover:text-navy-900">
                    (832) 660-6657
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <a
                    href="mailto:contact@mdbillinghouston.com"
                    className="hover:text-navy-900"
                  >
                    contact@mdbillinghouston.com
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-xs text-navy-500">
                Hours: Monday–Friday, 9:00 AM – 5:00 PM Central Time. Houston
                metro practices receive in-person visits for onboarding and
                quarterly reviews.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                Free Revenue Leakage Analysis for your Houston practice
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
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Other Texas service areas
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
