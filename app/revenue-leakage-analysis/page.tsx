import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecialtyField from "./SpecialtyField";

export const metadata: Metadata = {
  title: "Free Revenue Leakage Analysis",
  description:
    "Tell us about your practice and we'll return a one-page report within three business days showing three specific revenue leaks — and what they're costing you.",
};

const promises = [
  "A one-page report delivered to your inbox within 3 business days",
  "Three specific revenue leaks we see in practices like yours",
  "An estimated dollar recovery number based on your claim volume",
  "No obligation. No sales pitch. Just the analysis.",
];

export default function RevenueLeakagePage() {
  return (
    <>
      <Header />

      <section className="bg-gradient-to-b from-navy-800 to-navy-700 py-16 text-white">
        <div className="container-xl max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Free Analysis
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl">
            Find the money your practice is losing.
          </h1>
          <p className="mt-6 text-lg text-navy-100">
            Most independent practices are under-collecting by 5–15% — and
            don't know it. Tell us a bit about your operation and we'll send you
            a one-page revenue leakage report within three business days.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl grid gap-12 lg:grid-cols-5">
          {/* LEFT: what you get */}
          <aside className="lg:col-span-2">
            <h2 className="text-2xl text-navy-800">What you'll get back</h2>
            <ul className="mt-6 space-y-4">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  <span className="text-navy-700">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-navy-100 bg-navy-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy-500">
                Prefer to talk first?
              </p>
              <p className="mt-2 text-navy-800">
                Call us directly at{" "}
                <a
                  href="tel:+18326606657"
                  className="font-semibold text-crimson"
                >
                  (832) 660-6657
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:contact@mdbillinghouston.com"
                  className="font-semibold text-crimson break-all"
                >
                  contact@mdbillinghouston.com
                </a>
                .
              </p>
            </div>
          </aside>

          {/* RIGHT: form */}
          <div className="lg:col-span-3">
            <form
              action={process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT}
              method="POST"
              className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl text-navy-800">
                Tell us about your practice
              </h2>
              <p className="mt-2 text-sm text-navy-600">
                All fields confidential. HIPAA-safe: never send PHI.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Practice name" name="practice" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />

                <SpecialtyField
                  options={[
                    "Internal Medicine",
                    "Pediatrics",
                    "Cardiology",
                    "Hospitalist",
                    "Rehabilitation",
                    "Senior Living",
                    "Pulmonary",
                    "Geriatrics",
                    "Nephrology",
                    "Other",
                  ]}
                />
                <Select
                  label="Current EMR / PM system"
                  name="emr"
                  options={[
                    "eClinicalWorks",
                    "Athenahealth",
                    "Epic",
                    "Cerner",
                    "NextGen",
                    "AdvancedMD",
                    "Kareo / Tebra",
                    "DrChrono",
                    "Other / Not sure",
                  ]}
                />

                <Select
                  label="Monthly claim volume"
                  name="claimVolume"
                  options={[
                    "Under 250",
                    "250–750",
                    "750–1,500",
                    "1,500–3,000",
                    "3,000+",
                    "Not sure",
                  ]}
                />
                <Select
                  label="Current first-pass acceptance"
                  name="firstPass"
                  options={[
                    "Above 95%",
                    "90–95%",
                    "85–90%",
                    "Below 85%",
                    "Not sure",
                  ]}
                />
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-medium text-navy-800">
                  Biggest billing pain point right now
                </span>
                <textarea
                  name="painPoint"
                  rows={4}
                  placeholder="Denials, slow AR, staff turnover, new EMR, credentialing backlog..."
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <button type="submit" className="btn-primary mt-6 w-full">
                Send My Free Analysis Request
              </button>

              <p className="mt-4 text-xs text-navy-500">
                By submitting, you agree to be contacted by MD Billing Experts
                about your analysis. We do not sell or share your information.
              </p>
            </form>

            <p className="mt-6 text-center text-sm text-navy-600">
              Not ready?{" "}
              <Link href="/" className="font-semibold text-crimson">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-800">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-800">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 focus:border-navy-800 focus:outline-none"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
