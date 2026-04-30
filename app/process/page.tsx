import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ClipboardList,
  Database,
  FileSearch,
  GaugeCircle,
  HandCoins,
  Handshake,
  RefreshCw,
  Rocket,
  ShieldCheck,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How we onboard a Texas medical practice in 90 days — discovery, parallel run, full handoff, and ongoing optimization. No surprise gaps in your cash flow.",
  alternates: { canonical: "/process" },
};

/**
 * /process — onboarding & ongoing process page.
 *
 * Most billing companies treat onboarding like a black box. We don't —
 * this page is the answer to "what's the first 90 days actually like."
 * Helps reduce switching anxiety, which is the #1 reason practices stay
 * with bad billers longer than they should.
 */

const phases = [
  {
    label: "Day 0 — Sign",
    title: "Kickoff and access setup",
    icon: Handshake,
    bullets: [
      "Secure transfer of EMR/PM credentials and clearinghouse access",
      "BAA signed; HIPAA-compliant access provisioning",
      "Dedicated account manager and AR analyst assigned to your practice",
      "Weekly meeting cadence locked in (we recommend Mondays at 9am)",
    ],
  },
  {
    label: "Days 1–14",
    title: "Discovery and AR audit",
    icon: FileSearch,
    bullets: [
      "Full AR aging review — what's collectible, what's stuck, what's been written off prematurely",
      "Denial pattern analysis on the last 6 months of claims",
      "Fee schedule and contract review against payer ERA postings",
      "EMR/PM workflow walk-through with your front desk and providers",
      "Specialty-specific coding audit on a sample of recent encounters",
    ],
  },
  {
    label: "Days 15–30",
    title: "Parallel run + backlog cleanup",
    icon: ClipboardList,
    bullets: [
      "Your existing biller continues submitting fresh claims — no cash-flow gap",
      "We work the aged AR backlog (60+ day buckets) in parallel",
      "First denial categorization report delivered (root causes, not just codes)",
      "Eligibility verification workflow goes live for upcoming appointments",
      "Daily AR touch begins on every open claim past 30 days",
    ],
  },
  {
    label: "Days 31–60",
    title: "Full handoff",
    icon: Rocket,
    bullets: [
      "We take over claim submission, posting, denial work, and patient billing",
      "First-pass acceptance rate begins tracking weekly",
      "Backlog cleanup wraps; recovered revenue posted",
      "Provider feedback session: documentation patterns we'd flag",
      "First weekly KPI report delivered (the one you'll get every Monday after)",
    ],
  },
  {
    label: "Days 61–90",
    title: "Optimization and stabilization",
    icon: GaugeCircle,
    bullets: [
      "First-pass rate trending toward 95%+",
      "Days in AR trending toward <40",
      "Specialty-specific coding adjustments dialed in",
      "First quarterly compliance audit completed",
      "Process retrospective with you: what worked, what to refine",
    ],
  },
  {
    label: "Day 91+",
    title: "Steady state — but never static",
    icon: RefreshCw,
    bullets: [
      "Weekly KPI reports every Monday",
      "Monthly trend reviews with your account manager",
      "Quarterly internal coding audits + annual external audits",
      "Continuous payer rule updates pushed into your workflow",
      "Annual fee schedule and contract review",
    ],
  },
];

const principles = [
  {
    icon: ShieldCheck,
    title: "No cash-flow gaps",
    body: "Parallel run means your old biller keeps submitting until we're fully ready. You never have a 'dark week' where claims stop going out.",
  },
  {
    icon: Database,
    title: "Your data stays yours",
    body: "Every claim, every note, every report exports back to you on demand. If we ever part ways, you walk out with everything — no hostage situation.",
  },
  {
    icon: Calendar,
    title: "Weekly cadence, not monthly surprises",
    body: "You get KPI reports every Monday. No quarter-end shocks, no 'we'll look into it' for 30 days. If something moves, you know within a week.",
  },
  {
    icon: HandCoins,
    title: "Aligned incentives",
    body: "We charge a percentage of collections. We only make money when you do — and we make more when your collections grow. That's the only model that aligns over time.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                Our process
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                The first 90 days, in detail
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                The single biggest reason practices stay with a bad biller is
                fear of switching. So here's exactly what changing to us looks
                like — week by week, with no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {phases.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <div
                      key={phase.label}
                      className="relative flex gap-6 rounded-2xl border border-navy-100 bg-white p-7 shadow-sm md:p-9"
                    >
                      {/* Step number column */}
                      <div className="hidden flex-col items-center md:flex">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 ring-1 ring-crimson/20">
                          <Icon className="h-6 w-6 text-crimson" />
                        </div>
                        {idx < phases.length - 1 && (
                          <div className="mt-3 h-full w-px bg-navy-100" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 md:hidden">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10">
                            <Icon className="h-5 w-5 text-crimson" />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-crimson">
                            {phase.label}
                          </span>
                        </div>
                        <span className="hidden text-xs font-semibold uppercase tracking-wide text-crimson md:inline">
                          {phase.label}
                        </span>
                        <h2 className="mt-2 text-2xl font-semibold text-navy-800 md:text-3xl">
                          {phase.title}
                        </h2>
                        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-navy-700">
                          {phase.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
                How we operate
              </p>
              <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
                Four principles we don't bend on
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 ring-1 ring-crimson/20">
                      <Icon className="h-6 w-6 text-crimson" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-navy-800">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                Want to see what your first 90 days would look like?
              </h2>
              <p className="mt-4 text-navy-200">
                Start with a free Revenue Leakage Analysis — we'll show you
                three specific leaks at your practice and what they're costing.
                No commitment. No sales pitch.
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
                  Call (832) 660-6657
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
