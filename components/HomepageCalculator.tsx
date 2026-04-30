"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";

/**
 * Public-facing leakage estimator embedded on the homepage.
 *
 * Inputs: claim volume (slider), avg reimbursement (specialty proxy),
 * first-pass rate (slider). Outputs an instant directional dollar
 * number for "annual revenue leaked" — three combined leaks summed.
 *
 * Math mirrors the internal RLA calculator at app/rla-calculator/page.tsx
 * but simplified — no decision tree, no specialty notes, no AR override.
 * The output is a hook for the full RLA report (CTA at bottom).
 */

const SPECIALTIES: { name: string; avg: number }[] = [
  { name: "Internal Medicine", avg: 110 },
  { name: "Pediatrics", avg: 95 },
  { name: "Cardiology", avg: 175 },
  { name: "Hospitalist", avg: 130 },
  { name: "Rehabilitation", avg: 90 },
  { name: "Senior Living", avg: 105 },
  { name: "Pulmonary", avg: 140 },
  { name: "Geriatrics", avg: 115 },
  { name: "Nephrology", avg: 165 },
  { name: "Other / Mixed", avg: 110 },
];

// Same constants as the internal RLA calculator
const DENIAL_RECOVERY_RATE = 0.35;
const ESTABLISHED_PATIENT_RATIO = 0.7;
const UNDERCODE_RATE = 0.15;
const EM_LEVEL_DELTA_USD = 40;
const ELIGIBILITY_DENIAL_RATE = 0.06;
const ELIGIBILITY_RECOVERY_RATE = 0.5;
const MONTHS = 12;

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function HomepageCalculator() {
  const [claimsPerMonth, setClaimsPerMonth] = useState(1200);
  const [firstPassPct, setFirstPassPct] = useState(88);
  const [specialty, setSpecialty] = useState(SPECIALTIES[0]);

  const result = useMemo(() => {
    const denialRate = 1 - firstPassPct / 100;

    // Leak 1: Denials never reworked
    const leak1 =
      claimsPerMonth *
      MONTHS *
      denialRate *
      DENIAL_RECOVERY_RATE *
      specialty.avg;

    // Leak 2: Under-coding established patient visits
    const leak2 =
      claimsPerMonth *
      MONTHS *
      ESTABLISHED_PATIENT_RATIO *
      UNDERCODE_RATE *
      EM_LEVEL_DELTA_USD;

    // Leak 3: Eligibility-driven denials never recovered
    const leak3 =
      claimsPerMonth *
      MONTHS *
      ELIGIBILITY_DENIAL_RATE *
      ELIGIBILITY_RECOVERY_RATE *
      specialty.avg;

    const total = leak1 + leak2 + leak3;
    // Round to nearest $1,000 for a "feels-like-estimate" number
    const rounded = Math.round(total / 1000) * 1000;
    const low = Math.round((rounded * 0.7) / 1000) * 1000;
    const high = Math.round((rounded * 1.3) / 1000) * 1000;
    return { rounded, low, high };
  }, [claimsPerMonth, firstPassPct, specialty]);

  return (
    <section className="bg-white py-20">
      <div className="container-xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
            30-second leakage check
          </p>
          <h2 className="mt-3 text-3xl text-navy-800 md:text-4xl">
            How much is your practice losing?
          </h2>
          <p className="mt-4 text-navy-600">
            Tell us three things about your practice. We'll show you a
            directional estimate of revenue you're leaving on the table — no
            email required.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lg">
          <div className="grid lg:grid-cols-2">
            {/* LEFT: inputs */}
            <div className="border-b border-navy-100 bg-navy-50 p-8 lg:border-b-0 lg:border-r">
              <div className="space-y-7">
                {/* Claim volume slider */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="claims"
                      className="text-sm font-semibold text-navy-800"
                    >
                      Monthly claim volume
                    </label>
                    <span className="text-lg font-semibold text-navy-900">
                      {claimsPerMonth.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id="claims"
                    type="range"
                    min={100}
                    max={3500}
                    step={50}
                    value={claimsPerMonth}
                    onChange={(e) => setClaimsPerMonth(Number(e.target.value))}
                    className="mt-3 w-full accent-crimson"
                  />
                  <div className="mt-1 flex justify-between text-xs text-navy-500">
                    <span>100</span>
                    <span>3,500+</span>
                  </div>
                </div>

                {/* First-pass slider */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="firstPass"
                      className="text-sm font-semibold text-navy-800"
                    >
                      Current first-pass acceptance
                    </label>
                    <span className="text-lg font-semibold text-navy-900">
                      {firstPassPct}%
                    </span>
                  </div>
                  <input
                    id="firstPass"
                    type="range"
                    min={75}
                    max={99}
                    step={1}
                    value={firstPassPct}
                    onChange={(e) => setFirstPassPct(Number(e.target.value))}
                    className="mt-3 w-full accent-crimson"
                  />
                  <div className="mt-1 flex justify-between text-xs text-navy-500">
                    <span>75%</span>
                    <span>99%</span>
                  </div>
                </div>

                {/* Specialty dropdown */}
                <div>
                  <label
                    htmlFor="specialty"
                    className="text-sm font-semibold text-navy-800"
                  >
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    value={specialty.name}
                    onChange={(e) =>
                      setSpecialty(
                        SPECIALTIES.find((s) => s.name === e.target.value) ??
                          SPECIALTIES[0],
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT: result */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-navy-800 to-navy-700 p-8 text-white">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <TrendingDown className="h-3 w-3" />
                  Estimated annual leakage
                </div>
                <p
                  className="mt-5 text-5xl font-bold tracking-tight md:text-6xl"
                  aria-live="polite"
                >
                  {usd(result.rounded)}
                </p>
                <p className="mt-2 text-sm text-navy-200">
                  Likely range: <span className="font-semibold text-white">{usd(result.low)}</span>{" "}
                  – <span className="font-semibold text-white">{usd(result.high)}</span> per year
                </p>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-navy-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-300">
                    Where it's leaking
                  </p>
                  <p>• Denied claims never reworked</p>
                  <p>• Under-coded established-patient visits</p>
                  <p>• Eligibility-driven write-offs</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/revenue-leakage-analysis"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover"
                >
                  Get the full one-page report
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-3 text-center text-xs text-navy-300">
                  Three specific leaks. Delivered in 3 business days. No sales
                  pitch.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-navy-500">
          Estimate uses industry benchmarks for denial rework rates, E/M
          under-coding patterns, and eligibility-driven write-offs. Actual
          leakage varies by payer mix, EMR configuration, and staff workflow.
          The full report digs into the three leaks specific to your practice.
        </p>
      </div>
    </section>
  );
}
