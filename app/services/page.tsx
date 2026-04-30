import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  FileText,
  ShieldCheck,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

const ICONS = {
  BarChart3,
  FileText,
  ClipboardCheck,
  CreditCard,
  ShieldCheck,
  CalendarCheck,
} as const;

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end medical billing services for independent Texas practices: revenue cycle management, coding, credentialing, AR & denial management, eligibility verification, and patient billing.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 text-white">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-crimson-light">
                Services
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Everything billing — owned by one team
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                Six services, one accountable team. Pick what you need or
                bundle the whole revenue cycle. Either way, we own the metrics
                and report on them weekly.
              </p>
            </div>
          </div>
        </section>

        {/* Service grid */}
        <section className="bg-white py-20">
          <div className="container-xl">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const Icon = ICONS[s.iconName];
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-7 transition hover:border-navy-300 hover:shadow-lg"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 ring-1 ring-crimson/20">
                      <Icon className="h-6 w-6 text-crimson" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-navy-800 group-hover:text-navy-900">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {s.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-crimson">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-50 py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-10 text-center text-white shadow-lg md:p-14">
              <h2 className="text-3xl md:text-4xl">
                Not sure which service fits?
              </h2>
              <p className="mt-4 text-navy-200">
                Get a free Revenue Leakage Analysis — we'll show you the three
                biggest leaks specific to your practice, and which services
                would close them.
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
