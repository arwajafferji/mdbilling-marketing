/**
 * Build a fully-populated Revenue Leakage Analysis .docx from calculator state.
 *
 * Inputs: everything the calculator already tracks.
 * Output: a Blob ready to trigger download in the browser.
 *
 * Template content mirrors docs/revenue-leakage-analysis-template.md — any
 * copy changes to that Markdown template should be mirrored here and vice
 * versa. The template is the source of truth for Arwa reading; this file is
 * the source of truth for what actually gets sent to leads.
 */

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

// ----- Brand colors (match Tailwind navy + rust) --------------------------
const NAVY_900 = "0A2540";
const NAVY_700 = "1F3A5F";
const NAVY_500 = "4A6B8E";
const NAVY_100 = "DDE4ED";
const CRIMSON = "C91F1F";

// ----- Inputs -------------------------------------------------------------

export interface RlaReportInputs {
  practiceName: string;
  firstName: string;
  specialty: string;
  emr: string;
  claimVolumeLabel: string;
  firstPassLabel: string;
  painPoint: string;
  submissionDate: string; // YYYY-MM-DD
  deliveryDate: string; // YYYY-MM-DD
  useArLeak: boolean;
  specialtyNotes: string;

  // Dollar amounts (already rounded)
  leak1Title: string;
  leak1Value: number;
  leak2Value: number; // under-coding
  leak3Value: number; // eligibility
  total: number;
  low: number;
  high: number;

  // References for methodology / "what we'd look at" section
  bookingLink?: string; // optional Calendly / booking URL
}

// ----- Small helpers ------------------------------------------------------

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const prettyDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const H1 = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text, bold: true, size: 36, color: NAVY_900 }),
    ],
  });

const H2 = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({ text, bold: true, size: 28, color: NAVY_900 }),
    ],
  });

const H3 = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 60 },
    children: [
      new TextRun({ text, bold: true, size: 22, color: NAVY_700 }),
    ],
  });

const P = (text: string, opts: { bold?: boolean; italic?: boolean } = {}) =>
  new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        bold: opts.bold,
        italics: opts.italic,
        size: 22,
        color: NAVY_700,
      }),
    ],
  });

/** Mixed-format paragraph: pass an array of {text, bold, italic} runs. */
const PMixed = (
  runs: Array<{ text: string; bold?: boolean; italic?: boolean }>,
) =>
  new Paragraph({
    spacing: { after: 120 },
    children: runs.map(
      (r) =>
        new TextRun({
          text: r.text,
          bold: r.bold,
          italics: r.italic,
          size: 22,
          color: NAVY_700,
        }),
    ),
  });

const Bullet = (text: string) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, color: NAVY_700 })],
  });

const HR = () =>
  new Paragraph({
    border: {
      bottom: { color: NAVY_100, size: 6, style: BorderStyle.SINGLE, space: 4 },
    },
    spacing: { before: 120, after: 120 },
    children: [],
  });

/** Two-column profile-style row. */
const profileRow = (label: string, value: string) =>
  new TableRow({
    children: [
      new TableCell({
        width: { size: 38, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: "F5F7FA", color: "auto" },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: label,
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 62, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: value, size: 22, color: NAVY_700 }),
            ],
          }),
        ],
      }),
    ],
  });

/** Two-column estimate-table row (leak title | dollar amount). */
const estimateRow = (label: string, value: string, bold = false) =>
  new TableRow({
    children: [
      new TableCell({
        width: { size: 70, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: label,
                bold,
                size: 22,
                color: NAVY_900,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: value,
                bold,
                size: 22,
                color: NAVY_900,
              }),
            ],
          }),
        ],
      }),
    ],
  });

// ----- Main builder -------------------------------------------------------

export async function buildRlaDocx(input: RlaReportInputs): Promise<Blob> {
  const {
    practiceName,
    firstName,
    specialty,
    emr,
    claimVolumeLabel,
    firstPassLabel,
    painPoint,
    submissionDate,
    deliveryDate,
    useArLeak,
    specialtyNotes,
    leak1Title,
    leak1Value,
    leak2Value,
    leak3Value,
    total,
    low,
    high,
    bookingLink,
  } = input;

  const practiceDisplay = practiceName || "[Practice name]";

  // Build the document
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22, color: NAVY_700 },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "methodology-list",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: {
                paragraph: { indent: { left: 360, hanging: 260 } },
              },
            },
          ],
        },
        {
          reference: "engagement-plan",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: {
                paragraph: { indent: { left: 360, hanging: 260 } },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        children: [
          // ----- Cover / title block --------------------------------------
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: "Revenue Leakage Analysis",
                bold: true,
                size: 48,
                color: NAVY_900,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "MD Billing Experts  ·  Houston, TX",
                size: 22,
                color: CRIMSON,
                bold: true,
              }),
            ],
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: NAVY_100,
              },
              insideVertical: {
                style: BorderStyle.NONE,
                size: 0,
                color: "FFFFFF",
              },
            },
            rows: [
              profileRow("Prepared for", practiceDisplay),
              profileRow("Specialty", specialty),
              profileRow("Date", prettyDate(deliveryDate)),
              profileRow("Prepared by", "MD Billing Experts · (832) 660-6657"),
            ],
          }),

          HR(),

          // ----- Executive Summary ----------------------------------------
          H2("Executive Summary"),
          PMixed([
            { text: practiceDisplay, bold: true },
            {
              text: ` submitted a request for a complimentary Revenue Leakage Analysis on ${prettyDate(submissionDate)}. Based on the practice profile you shared and benchmarks drawn from the 25+ independent practices we currently serve across Texas, we identified `,
            },
            {
              text: "three specific revenue leaks",
              bold: true,
            },
            { text: " most likely affecting your collections today." },
          ]),
          PMixed([
            { text: "Based on your reported monthly claim volume of " },
            { text: claimVolumeLabel, bold: true },
            { text: " and current first-pass acceptance of " },
            { text: firstPassLabel, bold: true },
            { text: `, we estimate ${practiceDisplay} is leaving between ` },
            {
              text: `${usd(low)}–${usd(high)} per year`,
              bold: true,
            },
            { text: " on the table." },
          ]),
          P(
            "This report outlines what those three leaks are, how we know they're likely present in your operation, and a conservative estimate of what each one is costing you annually.",
          ),
          P(
            "There is no obligation associated with this analysis. If you'd like to discuss the findings, we've included a link to book a 20-minute call at the end.",
          ),

          HR(),

          // ----- Your Practice Profile ------------------------------------
          H2("Your Practice Profile"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              left: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              right: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: NAVY_100,
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: NAVY_100,
              },
            },
            rows: [
              profileRow("Practice", practiceDisplay),
              profileRow("Specialty", specialty),
              profileRow("Current EMR / PM system", emr),
              profileRow("Monthly claim volume", claimVolumeLabel),
              profileRow("Current first-pass acceptance", firstPassLabel),
              profileRow(
                "Self-reported pain point",
                painPoint || "Not provided",
              ),
            ],
          }),

          HR(),

          // ----- Methodology ----------------------------------------------
          H2("Methodology"),
          PMixed([
            { text: "This is a " },
            { text: "diagnostic", bold: true },
            {
              text: ", not an audit. We did not access your PM system or claims data. The leaks identified below are derived from:",
            },
          ]),
          new Paragraph({
            numbering: { reference: "methodology-list", level: 0 },
            children: [
              new TextRun({
                text: "The information you submitted in your intake form",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          new Paragraph({
            numbering: { reference: "methodology-list", level: 0 },
            children: [
              new TextRun({
                text: `Industry benchmarks for ${specialty} practices of similar size`,
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          new Paragraph({
            numbering: { reference: "methodology-list", level: 0 },
            children: [
              new TextRun({
                text: "The most common revenue leakage patterns we've documented across 25+ independent Texas practices over the past 20+ years",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          P(
            "A full audit — with access to your claims data, denial reports, and aging buckets — would yield a precise recovery number. This report identifies the three highest-probability leaks so you know what to look into, and what we'd be looking at if you chose to work with us.",
          ),

          HR(),

          // ----- Leak 1 ---------------------------------------------------
          H2(`Leak #1 — ${leak1Title}`),
          H3("What we're seeing"),
          useArLeak
            ? P(
                `Denials are the obvious leak — they come with a reason code. But a more expensive problem at most independent practices is the silent one: claims that were submitted cleanly, never got denied, and never got paid either. They just sit in the aging bucket because no one is systematically following up on unpaid claims. Industry benchmark for healthy days-in-AR is 25–32 days; practices without structured AR follow-up commonly sit at 45–60+ days, which means 1–2 months of revenue is always "out there" instead of in the bank account.`,
              )
            : PMixed([
                {
                  text: `Practices reporting first-pass acceptance at or below ${firstPassLabel} typically lose recoverable revenue not on the initial denial — but on the `,
                },
                { text: "second denial", bold: true },
                {
                  text: ", when the claim ages past the payer's timely-filing window before anyone touches it again. Medicare gives you 12 months; commercial payers often give 90–180 days. Internal teams that are triaging live work rarely get to 60+-day aged denials in time.",
                },
              ]),

          H3("How to verify this on your end"),
          ...(useArLeak
            ? [
                Bullet(
                  "Pull an aging report and look at the 60–90 and 90+ day buckets. Industry target: <15% of total AR in 90+.",
                ),
                Bullet(
                  "Sample 10 claims from the 90+ bucket. For each, can your team tell you why it hasn't paid and what the next action is?",
                ),
                Bullet(
                  "Check if anyone has a defined weekly or bi-weekly cadence of calling payers on aged claims.",
                ),
              ]
            : [
                Bullet("Pull an aging report filtered to 90+ days"),
                Bullet(
                  "Look at the denial reason code breakdown — if a single reason accounts for >30% of aged denials, that's a workflow gap",
                ),
                Bullet(
                  "Check whether those claims were ever appealed, resubmitted, or written off without documentation",
                ),
              ]),

          H3("Conservative dollar estimate"),
          PMixed([
            {
              text: `Based on your ${claimVolumeLabel} monthly claim volume${useArLeak ? "" : ` and ${firstPassLabel} first-pass rate`}, we estimate `,
            },
            { text: `${usd(leak1Value)}/year`, bold: true },
            {
              text: useArLeak
                ? " in earned revenue stuck in — and leaking out of — aged AR."
                : " in claims that were deniable-to-recoverable but expired in the aging bucket.",
            },
          ]),

          HR(),

          // ----- Leak 2 (undercoding) -------------------------------------
          H2("Leak #2 — Under-coding / missing modifiers for complex encounters"),
          H3("What we're seeing"),
          PMixed([
            { text: specialty, bold: true },
            {
              text: " practices commonly under-bill on:",
            },
          ]),
          Bullet(
            "E/M levels — especially for established patients with multiple chronic conditions (99214 vs 99213 = ~$40 delta per visit)",
          ),
          Bullet(
            "Modifier 25 on same-day procedures + E/M — routinely missed, triggers bundling",
          ),
          Bullet(
            "Time-based billing — when prolonged service codes (99417, G2212) apply but aren't captured",
          ),
          Bullet(
            "Chronic Care Management (CCM / 99490) and Transitional Care Management (TCM / 99495, 99496) — billable but under-utilized",
          ),

          H3(`Specialty-specific patterns we'd look at for ${specialty}`),
          P(specialtyNotes),

          H3("Conservative dollar estimate"),
          PMixed([
            {
              text: "A 1-level E/M upshift on just 15% of established-patient visits typically recovers ",
            },
            { text: `${usd(leak2Value)}/year`, bold: true },
            {
              text: " for a practice your size. This compounds if modifier 25 or CCM billing is also being missed.",
            },
          ]),

          HR(),

          // ----- Leak 3 (eligibility) -------------------------------------
          H2("Leak #3 — Eligibility verification gaps"),
          H3("What we're seeing"),
          P(
            "Independent practices running eligibility checks reactively — at or after the visit — lose 4–8% of claims to front-end denials that are fully preventable:",
          ),
          Bullet("Inactive coverage / terminated plans not caught at check-in"),
          Bullet("Missed secondary-payer coordination of benefits"),
          Bullet("Expired Medicare Beneficiary Identifiers (MBIs)"),
          Bullet(
            "Out-of-network status on a plan the patient assumes is in-network",
          ),
          Bullet("Prior-authorization requirements missed for certain codes"),
          PMixed([
            { text: "Most PM systems (including " },
            { text: emr, bold: true },
            {
              text: ") offer real-time eligibility checks via 270/271 transactions — but they're frequently turned off, misconfigured, or run manually on a one-off basis rather than batch-verified 48 hours before visits.",
            },
          ]),

          H3("How to verify this on your end"),
          Bullet(
            "Pull a report of eligibility-related denials (CARC 27, 24, 29, 26, 31 are the common ones) for the last 90 days",
          ),
          Bullet(
            "Check whether your front desk has a defined pre-visit eligibility SOP, and whether it's actually being followed",
          ),
          Bullet(
            "Look at your secondary-payer billing volume vs. your patient population's likely Medicare/Medicaid/commercial mix",
          ),

          H3("Conservative dollar estimate"),
          PMixed([
            {
              text: "Capturing even half of eligibility-related denials typically recovers ",
            },
            { text: `${usd(leak3Value)}/year`, bold: true },
            {
              text: " for a practice at your volume, before considering the labor cost of working those denials retroactively.",
            },
          ]),

          HR(),

          // ----- Total table ----------------------------------------------
          H2("Total Estimated Recovery"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: NAVY_500 },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY_500 },
              left: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              right: { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: NAVY_100,
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: NAVY_100,
              },
            },
            rows: [
              estimateRow(`Leak 1 — ${leak1Title}`, usd(leak1Value)),
              estimateRow("Leak 2 — Under-coding", usd(leak2Value)),
              estimateRow("Leak 3 — Eligibility gaps", usd(leak3Value)),
              estimateRow("Total recoverable", usd(total), true),
            ],
          }),
          new Paragraph({
            spacing: { before: 120, after: 120 },
            children: [
              new TextRun({
                text: "Important: ",
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
              new TextRun({
                text: "These are diagnostic estimates based on industry benchmarks and your submitted inputs. Actual figures depend on your current denial mix, payer contracts, and documentation practices. A full audit typically refines these numbers within a ±20% range.",
                size: 22,
                italics: true,
                color: NAVY_500,
              }),
            ],
          }),

          HR(),

          // ----- What we'd do about it ------------------------------------
          H2("What We'd Do About It"),
          PMixed([
            { text: "If " },
            { text: practiceDisplay, bold: true },
            {
              text: " engaged MD Billing Experts, here's how we'd address each leak in the first 90 days:",
            },
          ]),
          new Paragraph({
            numbering: { reference: "engagement-plan", level: 0 },
            children: [
              new TextRun({
                text: "Weeks 1–2 — Discovery. ",
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
              new TextRun({
                text: "Full denial audit across the last 12 months. Segment by CARC/RARC code. Identify the top three recoverable denial categories.",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          new Paragraph({
            numbering: { reference: "engagement-plan", level: 0 },
            children: [
              new TextRun({
                text: "Weeks 2–4 — Stabilize. ",
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
              new TextRun({
                text: "Work the 61–120 day aging bucket before any claims expire. Submit appeals on provable denials. Write off only what's genuinely unrecoverable, with documentation.",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          new Paragraph({
            numbering: { reference: "engagement-plan", level: 0 },
            children: [
              new TextRun({
                text: "Weeks 4–8 — Optimize. ",
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
              new TextRun({
                text: "Implement pre-visit eligibility verification workflow. Train front-desk/intake on coding documentation for the top 3 E/M level errors we find. Deploy CCM/TCM billing where clinically appropriate.",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),
          new Paragraph({
            numbering: { reference: "engagement-plan", level: 0 },
            children: [
              new TextRun({
                text: "Weeks 8–12 — Prevent. ",
                bold: true,
                size: 22,
                color: NAVY_900,
              }),
              new TextRun({
                text: "Monthly denial trend reporting. Quarterly coding compliance review. First-pass acceptance target: 95% within two quarters.",
                size: 22,
                color: NAVY_700,
              }),
            ],
          }),

          HR(),

          // ----- Next Step ------------------------------------------------
          H2("Next Step"),
          P("If any of the above resonates, we'd like to talk."),
          PMixed([
            { text: "Book a 20-minute discovery call: ", bold: true },
            { text: bookingLink || "(send your Calendly link)" },
          ]),
          PMixed([
            { text: "Prefer to email: ", bold: true },
            { text: "contact@mdbillinghouston.com" },
          ]),
          PMixed([
            { text: "Prefer to call: ", bold: true },
            { text: "(832) 660-6657" },
          ]),
          P(
            "No pressure and no obligation. The call is free; if we're not a fit, we'll say so.",
          ),

          HR(),

          // ----- About ----------------------------------------------------
          H2("About MD Billing Experts"),
          P(
            "Houston-based medical billing and revenue cycle management for independent practices across Texas. 20+ years of experience. 25+ active practice partners. HIPAA-compliant. Medicare and Medicaid guidelines followed.",
          ),
          PMixed([
            { text: "Specialties we serve: ", bold: true },
            {
              text: "Internal Medicine · Pediatrics · Cardiology · Hospitalist · Rehabilitation · Senior Living · Pulmonary · Geriatrics · Nephrology",
            },
          ]),

          // ----- Disclaimer (small, italic, at the bottom) ----------------
          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({
                text: "This analysis is provided for informational purposes. MD Billing Experts is not a CPA or law firm; tax, legal, and coding compliance decisions remain the responsibility of the practice. All figures are estimates based on industry benchmarks and self-reported inputs; actual recovery depends on a full audit of claims data.",
                italics: true,
                size: 18,
                color: NAVY_500,
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
