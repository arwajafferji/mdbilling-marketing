import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about switching medical billing companies, our process, contracts, technology, security, and pricing model. Honest answers from MD Billing Experts.",
  alternates: { canonical: "/faq" },
};

/**
 * /faq — top-level FAQ page covering the questions we get on intro calls.
 *
 * Organized by section so it's scannable. Schema.org FAQPage JSON-LD is
 * emitted at the bottom for SEO. Pricing answer is intentionally
 * directional (no specific %s) since rate depends on specialty + volume.
 */

const sections: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Switching billers",
    items: [
      {
        q: "Will my cash flow drop while we're switching?",
        a: "No. We run in parallel for the first 30 days — your existing biller keeps submitting fresh claims while we onboard, audit your AR, and clean up backlog. By day 60 we've taken over claim submission entirely. Practices typically see no week-over-week dip in collections during transition.",
      },
      {
        q: "How long is the full transition?",
        a: "90 days from sign to steady state. Days 1–14 are discovery and AR audit, 15–30 are parallel run with backlog cleanup, 31–60 are full handoff, 61–90 are optimization. See our process page for the week-by-week detail.",
      },
      {
        q: "What happens to my old AR if I switch?",
        a: "We work it. Aged AR cleanup is one of the first things we do during onboarding — practices often recover 5-figure to low-6-figure amounts during the first 60 days from claims their previous biller had given up on.",
      },
      {
        q: "Do I need to break my current contract first?",
        a: "Tell us your current contract terms and we'll plan the transition around them. Most billing contracts have 30–60 day termination clauses; we time our onboarding so you're never paying two billers for the same work.",
      },
    ],
  },
  {
    heading: "How we work",
    items: [
      {
        q: "What EMR/PM systems do you support?",
        a: "We work with eClinicalWorks, Athenahealth, Epic, Cerner, NextGen, Kareo/Tebra, AdvancedMD, Medisoft, and 20+ others. If yours is unusual, call us — we'll tell you in 5 minutes whether we can plug in.",
      },
      {
        q: "Will I lose visibility into my revenue?",
        a: "The opposite. You'll get weekly KPI reports (first-pass rate, days in AR, denial rate, net collections, patient pay) every Monday. You'll also have a portal showing every claim's status in real time. Most practices say they have more visibility with us than they did running billing in-house.",
      },
      {
        q: "Will providers have to change how they document?",
        a: "Not unless they want to. We code from existing documentation. We will flag patterns where small documentation tweaks would justify higher reimbursement (E/M leveling, modifier 25, time-based codes), but acting on those is your call.",
      },
      {
        q: "Do you handle patient billing too?",
        a: "Yes — patient statements, online payment portal, payment plans, and friendly outreach calls. Patient balances are 30%+ of practice revenue these days. Skipping the patient side leaves serious money behind.",
      },
    ],
  },
  {
    heading: "Pricing & contracts",
    items: [
      {
        q: "How does pricing work?",
        a: "We charge a percentage of collections. The rate depends on specialty, claim volume, and scope — high-volume primary care is different from low-volume cardiology with sleep studies. We quote after the Revenue Leakage Analysis so you know what you're paying for.",
      },
      {
        q: "Are there setup fees?",
        a: "No upfront setup fees for standard onboardings. Specialty migrations involving heavy data import or custom EMR integration may have a one-time onboarding cost — we'd flag that explicitly in the proposal, never as a surprise.",
      },
      {
        q: "What's the contract term?",
        a: "Month-to-month after the first 90-day onboarding. We don't lock practices into multi-year contracts — if we're not earning the relationship every month, you should be able to leave.",
      },
      {
        q: "Do you charge for denied claims?",
        a: "We charge on collections, not submissions. Denied claims aren't billed to you. The math works because our model is to keep denials low — a billing company that profits from chasing denials has weird incentives.",
      },
    ],
  },
  {
    heading: "Compliance & security",
    items: [
      {
        q: "Are you HIPAA-compliant?",
        a: "Yes. We sign a Business Associate Agreement (BAA) with every practice. All systems are HIPAA-compliant: encrypted access, role-based permissions, audit logs, secure messaging, and annual training for every team member.",
      },
      {
        q: "Where is patient data stored?",
        a: "Patient data stays in your EMR/PM system. We access it via authenticated, audit-logged sessions. We don't bulk-export or duplicate PHI to our own systems unless required for a specific reporting task, in which case it's encrypted in transit and at rest.",
      },
      {
        q: "What about Medicare and Medicaid compliance?",
        a: "Our coders are AAPC-certified and follow CMS LCDs (especially Texas Novitas guidelines), Medicare Advantage plan rules, and Texas Medicaid (TMHP) policies. We do quarterly internal audits and annual external audits to stay defensible.",
      },
      {
        q: "Who owns the data if we part ways?",
        a: "You do. Always. If we ever stop working together, you walk out with every claim, note, AR file, and report — in usable formats — at no extra cost. No data hostage situations.",
      },
    ],
  },
  {
    heading: "Service area & specialties",
    items: [
      {
        q: "Do you only work with practices in Houston?",
        a: "Houston is our base, but we work with practices across Texas and a handful in surrounding states. Local Texas knowledge (TMHP, Texas Medicare/Novitas, Texas Medicaid managed plans) is one of our differentiators.",
      },
      {
        q: "What specialties do you specialize in?",
        a: "Internal medicine, pediatrics, cardiology, hospitalist, rehabilitation, senior living/SNF, pulmonary, geriatrics, and nephrology — each with dedicated specialty pages. We've also worked with 20+ other specialties on a case-by-case basis.",
      },
      {
        q: "We're a small 1–2 provider practice. Are we too small for you?",
        a: "No. Some of our longest-tenured clients are solo practices. Small practices actually benefit most from full-service RCM — they don't have the volume to justify hiring an in-house team that covers every part of the cycle.",
      },
    ],
  },
];

export default function FaqPage() {
  // Build FAQPage JSON-LD for SEO
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                FAQ
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Questions practices ask before they switch
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                Honest answers to the questions we get on every intro call. If
                yours isn't here, give us a call — we'd rather tell you on the
                phone than in a vague brochure.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl space-y-14">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-semibold text-navy-800 md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-3">
                    {section.items.map((item) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">Don't see your question?</h2>
              <p className="mt-4 text-navy-200">
                Call us — we'd rather answer it directly than try to anticipate
                every variation. No sales pressure.
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
