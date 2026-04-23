"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildRlaDocx } from "./buildRlaDocx";

/**
 * Revenue Leakage Analysis — internal calculator.
 *
 * Unlisted page used by the MD Billing team to fulfill RLA requests from the
 * /revenue-leakage-analysis intake form. Takes the submitted form data as
 * inputs and outputs the three leak estimates + copy-to-clipboard placeholder
 * variables ready to paste into the .docx / .md template.
 *
 * NOT linked from any public nav. Marked noindex so it stays out of search.
 * See: docs/revenue-leakage-analysis-template.md and docs/revenue-leakage-analysis-sop.md
 */

// ----- Lookup tables ------------------------------------------------------

const SPECIALTY_REIMBURSEMENT: Record<string, number> = {
  "Internal Medicine": 110,
  Pediatrics: 95,
  Cardiology: 175,
  Hospitalist: 130,
  Rehabilitation: 90,
  "Senior Living": 105,
  Pulmonary: 140,
  Geriatrics: 115,
  Nephrology: 165,
  Other: 110,
};

const CLAIM_VOLUME_MIDPOINTS: Record<string, number> = {
  "Under 250": 150,
  "250–750": 500,
  "750–1,500": 1125,
  "1,500–3,000": 2250,
  "3,000+": 3500,
  "Not sure": 750,
};

const FIRST_PASS_MIDPOINTS: Record<string, number> = {
  "Above 95%": 0.96,
  "90–95%": 0.925,
  "85–90%": 0.875,
  "Below 85%": 0.82,
  "Not sure": 0.9,
};

const SPECIALTY_NOTES: Record<string, string> = {
  "Internal Medicine":
    "Common patterns: CCM (99490), AWV (G0438/G0439), 99214 vs 99213 mix, Advance Care Planning (99497/99498).",
  Pediatrics:
    "Common patterns: immunization admin codes (90460/90461), developmental screening (96110), modifier 25 on sick + well visits.",
  Cardiology:
    "Common patterns: cardiac monitoring codes, modifier -26 (professional component), echo interpretation, nuclear stress test billing.",
  Hospitalist:
    "Common patterns: subsequent visit levels (99232 vs 99231), discharge codes (99238/99239), critical care (99291/99292).",
  Rehabilitation:
    "Common patterns: timed vs. untimed codes, 8-minute rule compliance, therapy cap thresholds, modifier 59 usage.",
  "Senior Living":
    "Common patterns: nursing facility E/M (99307–99310), annual assessments, care plan oversight (G0181/G0182).",
  Pulmonary:
    "Common patterns: PFT interpretation codes (94010–94060), sleep study billing, home oxygen documentation.",
  Geriatrics:
    "Common patterns: AWV (G0438/G0439), CCM (99490), Advance Care Planning (99497/99498), Cognitive assessment (99483).",
  Nephrology:
    "Common patterns: MCP dialysis codes (90951–90970), home dialysis training (90989), ESRD-related services, modifier -26 on dialysis interpretations.",
  Other:
    "Review specialty-specific billing codes — ask the practice about their top 5 CPT codes and common denial reasons.",
};

// ----- Formula constants (from docs/revenue-leakage-analysis-sop.md) ------

const DENIAL_RECOVERY_RATE = 0.35;
const ESTABLISHED_PATIENT_RATIO = 0.7;
const UNDERCODE_RATE = 0.15;
const EM_LEVEL_DELTA_USD = 40;
const ELIGIBILITY_DENIAL_RATE = 0.06;
const ELIGIBILITY_RECOVERY_RATE = 0.5;
const AR_STUCK_RATE = 0.1;
const AR_RECOVERY_RATE = 0.4;
const MONTHS = 12;

// Round to nearest $500 for a "feels like an estimate" number
const roundTo500 = (n: number) => Math.round(n / 500) * 500;

// ----- Decision tree ------------------------------------------------------

interface DecisionResult {
  useArLeak: boolean;
  reasoning: string;
}

function suggestLeaks(painPoint: string, firstPassRate: number): DecisionResult {
  const p = painPoint.toLowerCase();

  const hasArSignal =
    p.includes("slow ar") ||
    p.includes("slow payment") ||
    p.includes("cash flow") ||
    p.includes("collection") ||
    p.includes("aged") ||
    p.includes("aging") ||
    p.includes("days in ar") ||
    p.includes("unpaid") ||
    p.includes("follow-up") ||
    p.includes("follow up");

  const decentFirstPass = firstPassRate >= 0.92;

  if (hasArSignal && decentFirstPass) {
    return {
      useArLeak: true,
      reasoning:
        "Pain point mentions AR / cash flow / slow payments AND first-pass rate is decent (≥92%). Swap AR leak in place of Leak #1 (denials aging).",
    };
  }
  if (hasArSignal) {
    return {
      useArLeak: true,
      reasoning:
        "Pain point mentions AR / cash flow / slow payments. Consider swapping AR leak in place of Leak #1, but since first-pass is also weak, both angles are valid — your call.",
    };
  }
  return {
    useArLeak: false,
    reasoning:
      "Pain point doesn't signal AR-specific issues. Default three leaks apply: unworked denials, under-coding, eligibility gaps.",
  };
}

// --------------------------------------------------------------------------

export default function RLACalculator() {
  const [practiceName, setPracticeName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submissionDate, setSubmissionDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [specialty, setSpecialty] = useState("Internal Medicine");
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [emr, setEmr] = useState("eClinicalWorks");
  const [claimVolumeBucket, setClaimVolumeBucket] = useState("750–1,500");
  const [firstPassBucket, setFirstPassBucket] = useState("90–95%");
  const [painPoint, setPainPoint] = useState("");
  const [useArLeak, setUseArLeak] = useState(false);
  const [userOverrodeArToggle, setUserOverrodeArToggle] = useState(false);

  // If specialty is "Other" AND the user typed a custom name, use that name
  // in the report — but keep the math using "Other" defaults (since we don't
  // have benchmarks for a specialty we've never worked with).
  const effectiveSpecialty =
    specialty === "Other" && customSpecialty.trim()
      ? customSpecialty.trim()
      : specialty;

  const avgReimbursement = SPECIALTY_REIMBURSEMENT[specialty] ?? 110;
  const claimVolume = CLAIM_VOLUME_MIDPOINTS[claimVolumeBucket] ?? 750;
  const firstPassRate = FIRST_PASS_MIDPOINTS[firstPassBucket] ?? 0.9;

  const decision = useMemo(
    () => suggestLeaks(painPoint, firstPassRate),
    [painPoint, firstPassRate],
  );

  // If user hasn't manually toggled, follow the decision tree's suggestion
  const effectiveUseArLeak = userOverrodeArToggle
    ? useArLeak
    : decision.useArLeak;

  const leakDenials = useMemo(
    () =>
      roundTo500(
        claimVolume *
          (1 - firstPassRate) *
          avgReimbursement *
          DENIAL_RECOVERY_RATE *
          MONTHS,
      ),
    [claimVolume, firstPassRate, avgReimbursement],
  );

  const leakUndercoding = useMemo(
    () =>
      roundTo500(
        claimVolume *
          ESTABLISHED_PATIENT_RATIO *
          UNDERCODE_RATE *
          EM_LEVEL_DELTA_USD *
          MONTHS,
      ),
    [claimVolume],
  );

  const leakEligibility = useMemo(
    () =>
      roundTo500(
        claimVolume *
          ELIGIBILITY_DENIAL_RATE *
          avgReimbursement *
          ELIGIBILITY_RECOVERY_RATE *
          MONTHS,
      ),
    [claimVolume, avgReimbursement],
  );

  const leakAr = useMemo(
    () =>
      roundTo500(
        claimVolume *
          AR_STUCK_RATE *
          avgReimbursement *
          AR_RECOVERY_RATE *
          MONTHS,
      ),
    [claimVolume, avgReimbursement],
  );

  const leak1Value = effectiveUseArLeak ? leakAr : leakDenials;
  const leak1Title = effectiveUseArLeak
    ? "Aged AR without systematic follow-up"
    : "Unworked denials aging past filing limits";

  const total = leak1Value + leakUndercoding + leakEligibility;
  const low = roundTo500(total * 0.8);
  const high = roundTo500(total * 1.2);

  // Delivery date = submission + 3 business days
  const deliveryDate = useMemo(() => {
    const d = new Date(submissionDate);
    let added = 0;
    while (added < 3) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return d.toISOString().slice(0, 10);
  }, [submissionDate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  // Build a markdown-ready variables block for pasting into the template
  const variablesBlock = useMemo(() => {
    return [
      `PRACTICE_NAME: ${practiceName || "[practice name]"}`,
      `FIRST_NAME: ${firstName || "[first name]"}`,
      `SPECIALTY: ${effectiveSpecialty}`,
      `EMR_SYSTEM: ${emr}`,
      `CLAIM_VOLUME: ${claimVolumeBucket}`,
      `FIRST_PASS_RATE: ${firstPassBucket}`,
      `PAIN_POINT: ${painPoint || "[pain point]"}`,
      `SUBMISSION_DATE: ${submissionDate}`,
      `DELIVERY_DATE: ${deliveryDate}`,
      ``,
      `LEAK_1_TITLE: ${leak1Title}`,
      `LEAK_1_ESTIMATE: ${fmt(leak1Value)}`,
      `LEAK_2_TITLE: Under-coding / missing modifiers for complex encounters`,
      `LEAK_2_ESTIMATE: ${fmt(leakUndercoding)}`,
      `LEAK_3_TITLE: Eligibility verification gaps`,
      `LEAK_3_ESTIMATE: ${fmt(leakEligibility)}`,
      ``,
      `TOTAL_ESTIMATE: ${fmt(total)}`,
      `LOW_ESTIMATE: ${low.toLocaleString()}`,
      `HIGH_ESTIMATE: ${high.toLocaleString()}`,
      ``,
      `SPECIALTY_NOTES: ${SPECIALTY_NOTES[specialty] ?? ""}`,
    ].join("\n");
  }, [
    practiceName,
    firstName,
    specialty,
    effectiveSpecialty,
    emr,
    claimVolumeBucket,
    firstPassBucket,
    painPoint,
    submissionDate,
    deliveryDate,
    leak1Title,
    leak1Value,
    leakUndercoding,
    leakEligibility,
    total,
    low,
    high,
  ]);

  const copyVariables = () => {
    navigator.clipboard.writeText(variablesBlock);
  };

  const [downloading, setDownloading] = useState(false);

  const downloadDocx = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const blob = await buildRlaDocx({
        practiceName,
        firstName,
        specialty: effectiveSpecialty,
        emr,
        claimVolumeLabel: claimVolumeBucket,
        firstPassLabel: firstPassBucket,
        painPoint,
        submissionDate,
        deliveryDate,
        useArLeak: effectiveUseArLeak,
        specialtyNotes: SPECIALTY_NOTES[specialty] ?? "",
        leak1Title,
        leak1Value,
        leak2Value: leakUndercoding,
        leak3Value: leakEligibility,
        total,
        low,
        high,
      });
      const safeName = (practiceName || "Practice")
        .replace(/[^a-z0-9]+/gi, "_")
        .replace(/^_+|_+$/g, "");
      const filename = `Revenue_Leakage_Analysis_${safeName}_${submissionDate}.docx`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-50 py-12">
      <div className="container-xl max-w-5xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
              Internal tool · unlisted
            </p>
            <h1 className="mt-1 text-3xl text-navy-800">
              Revenue Leakage Analysis — Calculator
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-navy-600">
              Plug in what the lead submitted. Click{" "}
              <span className="font-semibold">Download report (.docx)</span>{" "}
              when you're done — it produces a ready-to-send Word doc with
              every field filled in. Formulas + workflow documented in{" "}
              <code className="rounded bg-white px-1">
                docs/revenue-leakage-analysis-sop.md
              </code>
              .
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 hover:text-navy-800"
          >
            ← Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* INPUTS */}
          <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-800">
              Lead submission
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Input
                label="Practice name"
                value={practiceName}
                onChange={setPracticeName}
              />
              <Input
                label="First name (for greeting)"
                value={firstName}
                onChange={setFirstName}
              />
              <Select
                label="Specialty"
                value={specialty}
                onChange={setSpecialty}
                options={Object.keys(SPECIALTY_REIMBURSEMENT)}
              />
              <Input label="EMR / PM system" value={emr} onChange={setEmr} />
              <Select
                label="Monthly claim volume"
                value={claimVolumeBucket}
                onChange={setClaimVolumeBucket}
                options={Object.keys(CLAIM_VOLUME_MIDPOINTS)}
              />
              <Select
                label="First-pass acceptance"
                value={firstPassBucket}
                onChange={setFirstPassBucket}
                options={Object.keys(FIRST_PASS_MIDPOINTS)}
              />
              <Input
                label="Submission date"
                type="date"
                value={submissionDate}
                onChange={setSubmissionDate}
              />
              <Input
                label="Delivery date (auto: +3 biz days)"
                value={deliveryDate}
                onChange={() => {}}
                disabled
              />
            </div>

            {specialty === "Other" && (
              <div className="mt-4 rounded-lg border border-crimson/30 bg-crimson/5 p-4">
                <label className="block">
                  <span className="text-sm font-medium text-navy-800">
                    Specialty name (as submitted)
                  </span>
                  <input
                    type="text"
                    value={customSpecialty}
                    onChange={(e) => setCustomSpecialty(e.target.value)}
                    placeholder="e.g. Urology, Dermatology, OB/GYN"
                    className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
                  />
                </label>
                <p className="mt-2 text-xs text-navy-500">
                  This will appear throughout the report instead of "Other."
                  Math uses default ($110) reimbursement since we don't have
                  benchmarks for new specialties yet — double-check the Leak
                  #2 estimate before sending.
                </p>
              </div>
            )}

            <label className="mt-4 block">
              <span className="text-sm font-medium text-navy-800">
                Pain point (as submitted)
              </span>
              <textarea
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
                placeholder="Denials, slow AR, staff turnover, new EMR..."
              />
            </label>

            {/* Decision tree suggestion */}
            <div className="mt-6 rounded-lg border border-navy-100 bg-navy-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="text-xs text-navy-700">
                  <span className="font-semibold uppercase tracking-wide text-navy-500">
                    Suggested
                  </span>
                  <p className="mt-1">{decision.reasoning}</p>
                </div>
                <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-semibold text-navy-800">
                  <input
                    type="checkbox"
                    checked={effectiveUseArLeak}
                    onChange={(e) => {
                      setUseArLeak(e.target.checked);
                      setUserOverrodeArToggle(true);
                    }}
                    className="h-4 w-4"
                  />
                  Use AR leak
                </label>
              </div>
            </div>
          </section>

          {/* OUTPUTS */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy-800">Results</h2>

              <dl className="mt-4 divide-y divide-navy-100 text-sm">
                <ResultRow
                  label={`Leak 1 — ${leak1Title}`}
                  value={fmt(leak1Value)}
                />
                <ResultRow
                  label="Leak 2 — Under-coding"
                  value={fmt(leakUndercoding)}
                />
                <ResultRow
                  label="Leak 3 — Eligibility gaps"
                  value={fmt(leakEligibility)}
                />
                <ResultRow
                  label="Total (3 leaks)"
                  value={fmt(total)}
                  bold
                />
                <ResultRow
                  label="Low–High range (±20%)"
                  value={`${fmt(low)} – ${fmt(high)}`}
                />
              </dl>

              <div className="mt-4 border-t border-dashed border-navy-200 pt-4">
                <p className="text-xs text-navy-500">
                  Reference values (not used if you swap leaks):
                </p>
                <dl className="mt-2 grid grid-cols-2 gap-2 text-xs text-navy-600">
                  <div>
                    Denials-only leak:{" "}
                    <span className="font-semibold">{fmt(leakDenials)}</span>
                  </div>
                  <div>
                    AR-only leak:{" "}
                    <span className="font-semibold">{fmt(leakAr)}</span>
                  </div>
                  <div>
                    Avg reimbursement:{" "}
                    <span className="font-semibold">
                      {fmt(avgReimbursement)}
                    </span>
                  </div>
                  <div>
                    Numeric volume:{" "}
                    <span className="font-semibold">
                      {claimVolume.toLocaleString()}
                    </span>
                    /mo
                  </div>
                </dl>
              </div>
            </div>

            {/* Primary action — generate the actual report */}
            <div className="rounded-2xl border-2 border-crimson/30 bg-gradient-to-br from-white to-crimson/5 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy-800">
                Generate report
              </h2>
              <p className="mt-1 text-sm text-navy-600">
                Downloads a fully-populated .docx. Open in Word, give it a
                30-second read-through, save as PDF, and email it to{" "}
                {firstName || "the prospect"}.
              </p>
              <button
                onClick={downloadDocx}
                disabled={downloading || !practiceName}
                className="mt-4 w-full rounded-lg bg-crimson px-4 py-3 text-sm font-semibold text-white transition hover:bg-crimson-hover disabled:cursor-not-allowed disabled:bg-navy-200"
              >
                {downloading
                  ? "Building report…"
                  : !practiceName
                    ? "Enter practice name to enable"
                    : "Download report (.docx)"}
              </button>
              {!practiceName && (
                <p className="mt-2 text-xs text-navy-500">
                  Add a practice name at the top of the form so the file has
                  something to name itself.
                </p>
              )}
            </div>

            {/* Secondary — raw variables block for debugging or manual edits */}
            <details className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-navy-800">
                Show raw variables block (advanced)
              </summary>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-navy-500">
                  For when you want to edit the Markdown template by hand.
                </p>
                <button
                  onClick={copyVariables}
                  className="rounded-md bg-navy-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-700"
                >
                  Copy all
                </button>
              </div>
              <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-navy-900 p-4 text-xs leading-relaxed text-navy-100">
                {variablesBlock}
              </pre>
            </details>
          </section>
        </div>
      </div>
    </div>
  );
}

// ----- Small input primitives ---------------------------------------------

function Input({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-800 focus:outline-none disabled:bg-navy-50 disabled:text-navy-500"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-800">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${bold ? "font-semibold" : ""}`}
    >
      <dt className="text-navy-700">{label}</dt>
      <dd className="text-navy-900">{value}</dd>
    </div>
  );
}
