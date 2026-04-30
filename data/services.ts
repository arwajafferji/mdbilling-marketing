/**
 * Service detail page content.
 *
 * Each entry powers a /services/[slug] page. Content is first-draft —
 * pull-quote-able specifics that'll need MIL review for accuracy and
 * voice. Marked spots that need MIL input with `// MIL:` comments.
 */

export interface ServicePage {
  slug: string;
  iconName:
    | "BarChart3"
    | "FileText"
    | "ClipboardCheck"
    | "CreditCard"
    | "ShieldCheck"
    | "CalendarCheck";
  title: string;
  tagline: string;
  metaDescription: string;
  whyItMatters: string;
  includes: string[];
  pitfalls: string[];
  metrics: { label: string; value: string }[];
  faq: { q: string; a: string }[];
}

export const services: ServicePage[] = [
  {
    slug: "revenue-cycle-management",
    iconName: "BarChart3",
    title: "Revenue Cycle Management",
    tagline:
      "End-to-end ownership of every step from eligibility check to final payment — so your team focuses on patients, not paperwork.",
    metaDescription:
      "Full-service medical revenue cycle management for independent Texas practices. Eligibility, coding, claims, posting, AR follow-up, denials, reporting.",
    whyItMatters:
      "Most independent practices are leaking 5–15% of collectible revenue without realizing it. Not because they have a bad biller — because no single person is watching the entire cycle. Eligibility errors cause downstream denials. Denials sit in queues until timely-filing kills them. Aged AR gets written off. Patient balances go uncollected. End-to-end RCM means one team owns every step, every metric, every dollar — with weekly reporting that shows you exactly where the money is.",
    includes: [
      "Real-time eligibility and benefits verification before every visit",
      "Charge entry with automated scrubbing against payer rules",
      "Daily claim submission with first-pass acceptance tracking",
      "ERA/EOB posting and reconciliation against contracted rates",
      "AR follow-up on every claim past 30 days",
      "Denial management with appeal documentation",
      "Patient statements, collections, and payment plans",
      "Weekly KPI reports: collection rate, days in AR, denial rate, first-pass rate, net collection rate",
    ],
    pitfalls: [
      "Billing companies that don't track first-pass acceptance — you can't fix what you don't measure",
      "AR follow-up that stops at 90 days because 'it's too old to bother'",
      "Denial recovery that only addresses the denial code, not the upstream cause",
      "Static monthly reports that don't show trend lines or call out anomalies",
      "Generic workflow that ignores specialty-specific coding patterns",
    ],
    metrics: [
      { label: "First-pass claim acceptance", value: "95%+" },
      { label: "Claim submission turnaround", value: "24–48 hr" },
      { label: "Days in AR (industry target: <40)", value: "32 avg" },
      { label: "Net collection rate", value: "98%+" },
    ],
    faq: [
      {
        q: "How is this different from just hiring a biller in-house?",
        a: "An in-house biller owns one role. A full RCM team owns the cycle — coding, posting, AR, denials, eligibility, patient pay — with cross-coverage when someone is out, and dashboards that show you everything in one place. You also get specialist coders, certified credentialing staff, and AR analysts on the same team without paying five salaries.",
      },
      {
        q: "Will I lose visibility into my own revenue?",
        a: "The opposite. We send weekly KPI reports and give you a portal showing every claim's status in real time. Most practices say they have more visibility with us than they did running billing in-house.",
      },
      {
        q: "What's the transition from my current biller like?",
        a: "We've done this 25+ times. The first 30 days run parallel — your existing biller keeps submitting while we onboard, learn your workflow, and clear your AR backlog. By day 60 we're fully operational and submitting claims. By day 90 you'll see first-pass rates and AR aging move. See our process page for the full timeline.",
      },
      {
        q: "Do you work with my EMR?",
        a: "Almost certainly. We work with eClinicalWorks, Athenahealth, Epic, Cerner, NextGen, Kareo/Tebra, AdvancedMD, Medisoft, and 20+ other systems. If yours is unusual, call us and we'll tell you in 5 minutes.",
      },
    ],
  },
  {
    slug: "medical-coding",
    iconName: "FileText",
    title: "Medical Coding",
    tagline:
      "Certified coders applying ICD-10, CPT, and HCPCS rules with specialty-specific compliance review — fewer denials, no over-coding risk.",
    metaDescription:
      "Certified medical coding services. ICD-10, CPT, HCPCS coding for Texas practices. Specialty-specific compliance review.",
    whyItMatters:
      "Coding is where most billing companies cut corners — assigning whatever code matches the documentation literally, without catching missed modifiers, downcoded E/M visits, or unbundled services. Our coders are AAPC-certified and specialty-trained. Every chart is reviewed against the actual documentation, not just what the provider checked in the EMR. The result: fewer denials at the front, fewer audits at the back, and the right level of E/M billed every time.",
    includes: [
      "AAPC-certified coders (CPC, CPC-H, CCS, specialty credentials)",
      "ICD-10-CM diagnosis coding with specificity review",
      "CPT/HCPCS procedure coding with modifier accuracy",
      "Specialty-specific code sets (cardiology, pulm, peds, neph, etc.)",
      "E/M level review against 2021 AMA guidelines (MDM-based)",
      "Modifier 25, 59, 26, X{ESPU} documentation review",
      "Quarterly compliance audit with feedback to providers",
    ],
    pitfalls: [
      "Always coding 99213 by default — leaving 99214/99215 revenue on the table when documentation supports it",
      "Missing modifier 25 on E/M-plus-procedure same-day visits",
      "Auto-assigning ICD-10 codes from EMR drop-downs without specificity review",
      "Skipping CCM (99490) and AWV (G0438/G0439) opportunities for primary care panels",
      "Not catching unbundling rules where multiple codes get billed when one comprehensive code is required",
    ],
    metrics: [
      { label: "Coding accuracy (audited)", value: "98%+" },
      { label: "E/M downcoding rate (vs documentation)", value: "<3%" },
      { label: "Modifier denial rate", value: "<1%" },
    ],
    faq: [
      {
        q: "Do I have to use your coders for the whole revenue cycle?",
        a: "No — coding can be a standalone service. Some practices already have a biller they like and only need certified coding support. We can also do periodic coding audits for in-house teams.",
      },
      {
        q: "Will providers have to change how they document?",
        a: "Not unless they want to. We code from existing documentation and flag patterns where small documentation changes would justify higher E/M levels. Whether providers act on those patterns is up to them.",
      },
      {
        q: "How do you handle compliance risk?",
        a: "Quarterly internal audits, annual external audits, and continuous education for our coders on payer policy changes (especially CMS LCDs and Medicare Advantage plan rules in Texas). We also document every code decision so anything is defensible if audited.",
      },
    ],
  },
  {
    slug: "credentialing",
    iconName: "ClipboardCheck",
    title: "Credentialing & Enrollment",
    tagline:
      "Payer enrollment, re-credentialing, CAQH maintenance, and Medicare/Medicaid applications — without the 90-day cash-flow black hole.",
    metaDescription:
      "Medical credentialing and payer enrollment services for Texas practices. CAQH, Medicare, Medicaid, commercial payer applications.",
    whyItMatters:
      "Credentialing is the most expensive thing most practices ignore. Every month a provider isn't credentialed with a payer is a month their visits aren't billable to that payer's patients — easily $20K–$50K per provider per month for a busy specialist. Re-credentialing lapses are even worse: claims get retro-denied. We track every payer, every expiration, every CAQH refresh date so nothing slips.",
    includes: [
      "Initial credentialing for Medicare, Medicaid, and commercial payers",
      "CAQH ProView profile creation and quarterly refresh",
      "Re-credentialing tracking with 120-day advance alerts",
      "Texas Medicaid TMHP enrollment and revalidation",
      "Medicare PECOS submissions and revalidations",
      "Commercial payer applications (BCBS TX, Aetna, Cigna, UHC, Humana, Molina, Ambetter)",
      "Hospital privileging support (initial appointment + reappointment)",
      "DEA, state license, and malpractice tracking",
    ],
    pitfalls: [
      "Letting CAQH attestations expire — payers immediately freeze claim payments",
      "Submitting incomplete payer applications, triggering 30+ day rework cycles",
      "Forgetting Medicare revalidation cycles (every 5 years; PECOS sends warnings 6 months out)",
      "Not enrolling new providers in Medicare opt-out status before their first visit (if applicable)",
      "Adding a new location without updating every payer — claims at the new location get denied",
    ],
    metrics: [
      { label: "Initial credentialing cycle (commercial)", value: "60–90 days" },
      { label: "Re-credentialing on-time rate", value: "100%" },
      { label: "CAQH attestation lapse rate", value: "0" },
    ],
    faq: [
      {
        q: "How long does initial credentialing take?",
        a: "Commercial payers typically take 60–90 days from a complete application. Medicare can be faster (30–60 days). Medicaid is the wildcard — Texas Medicaid runs in the 60–120 day range. We start applications the day a provider signs an offer letter so they're credentialed by their start date, not 3 months after.",
      },
      {
        q: "What if a provider is mid-credentialing when they join my practice?",
        a: "We pick up wherever they are. CAQH transfer is instant; payer-by-payer status takes a week to map. We then drive every open application to closure with weekly status updates.",
      },
      {
        q: "Do you handle hospital privileging?",
        a: "Yes — initial appointments, reappointments, and any privilege-specific applications (e.g., ICU, telemetry). We coordinate with the hospital's medical staff office so providers don't have to.",
      },
    ],
  },
  {
    slug: "ar-denial-management",
    iconName: "CreditCard",
    title: "AR & Denial Management",
    tagline:
      "Aggressive AR follow-up and denial recovery to convert unpaid claims into collected revenue — before timely-filing kills them.",
    metaDescription:
      "Medical AR and denial management services for Texas practices. Aggressive follow-up on aged claims, denial appeals, root-cause fixes.",
    whyItMatters:
      "The longer a claim sits in AR, the less likely it gets paid — collection rates fall from 73% on 60-day AR to 27% on 120+ day AR. Most billing teams work the easy denials and let the messy ones age. Our AR team works denials by root cause: if the same modifier-25 denial keeps hitting from the same payer, we fix it once at the front-end instead of appealing every time. We also recover money you've probably written off.",
    includes: [
      "AR aging review every Monday — every claim past 30 days gets touched",
      "Denial categorization by root cause (eligibility, coding, documentation, payer-specific)",
      "Written and electronic appeals with documentation packets",
      "Payer escalations and provider reps (we know the names at Texas BCBS, Aetna, UHC, Humana)",
      "Aged AR cleanup project — recover money from 90+ day buckets you may have given up on",
      "Root-cause feedback loop: every denial pattern triggers a workflow fix at the front-end",
      "Weekly denial trend report by payer and reason code",
    ],
    pitfalls: [
      "AR follow-up on a 30-day cycle — payers should be touched at 21 days, not 30",
      "Re-billing denied claims without fixing the underlying error (just gets re-denied)",
      "Writing off claims past 90 days as 'too old' — many can still be appealed within timely-filing windows",
      "Treating every denial as an isolated incident instead of a pattern to fix upstream",
      "Not tracking appeals — sending them out without a calendar reminder for the 30-day response window",
    ],
    metrics: [
      { label: "Days in AR (industry target: <40)", value: "32 avg" },
      { label: "% AR over 90 days (industry target: <15%)", value: "<10%" },
      { label: "Denial appeal win rate", value: "70%+" },
      { label: "Net collection rate", value: "98%+" },
    ],
    faq: [
      {
        q: "We have a huge AR backlog — can you actually clean it up?",
        a: "Yes. Aged AR cleanup is one of the first things we do during onboarding. The first 60 days, our team works your 60–120+ day buckets while we onboard fresh claims in parallel. Practices typically recover 5-figure to low-6-figure amounts during this phase.",
      },
      {
        q: "How do you handle denials that aren't worth appealing?",
        a: "Every denial gets categorized — appeal, fix-and-resubmit, or write-off-with-root-cause-fix. The third category is where most billers stop. We don't — we trace why the denial happened (eligibility, coding, missing auth) and fix the workflow so it stops happening.",
      },
      {
        q: "Do you handle workers' comp and personal injury AR?",
        a: "Yes — Texas workers' comp DWC-69 and DWC-73 forms, attorney communication for PI, and lien tracking. These take longer to collect than standard payers but the per-claim revenue is usually high enough to justify the work.",
      },
    ],
  },
  {
    slug: "eligibility-verification",
    iconName: "ShieldCheck",
    title: "Eligibility Verification",
    tagline:
      "Real-time eligibility and benefits verification before the visit — eliminating denials at the source instead of fighting them after.",
    metaDescription:
      "Real-time medical eligibility verification services for Texas practices. Pre-visit insurance verification, prior auth tracking, denial prevention.",
    whyItMatters:
      "Roughly 6% of claims get denied for eligibility issues — wrong member ID, terminated coverage, missing prior auth, out-of-network plan. Almost all of those are preventable with a 90-second eligibility check before the visit. Most practices either skip eligibility entirely or only do it for new patients. We verify every single appointment, every day, before the patient arrives.",
    includes: [
      "Real-time eligibility checks via 270/271 EDI for every appointment",
      "Prior authorization tracking (initiation, status follow-up, expiration alerts)",
      "Coverage termination flagging before the visit",
      "Specialist referral verification when required",
      "Out-of-network status flagging (with patient communication script)",
      "Deductible, copay, and coinsurance estimates for patient cost transparency",
      "Daily exception report for visits that need front-desk action",
    ],
    pitfalls: [
      "Only verifying new patients — established patients change plans constantly (especially around January)",
      "Verifying once a year instead of every visit — coverage changes mid-year more often than people think",
      "Skipping prior auth checks because 'the front desk will catch it' — they usually don't",
      "Not flagging out-of-network until the claim denies, leaving the patient with a surprise balance",
      "Verification done same-day morning-of, leaving no time to fix issues before the patient arrives",
    ],
    metrics: [
      { label: "Eligibility-related denial rate", value: "<1%" },
      { label: "Pre-visit verification rate", value: "100%" },
      { label: "Prior auth initiation lead time", value: "5+ days" },
    ],
    faq: [
      {
        q: "Won't this slow down our front desk?",
        a: "No — we run eligibility 24-48 hours before the visit and flag exceptions to your front desk in a daily report. They only deal with the few that need attention. Your front desk doesn't run individual checks unless something flags.",
      },
      {
        q: "What about same-day add-ons or walk-ins?",
        a: "Real-time eligibility check at check-in, results in under 30 seconds for most payers. The handful where the EDI response is delayed get a flag for the biller to follow up that afternoon.",
      },
      {
        q: "Do you handle prior auth requests, or just track them?",
        a: "Both. We initiate prior auths for procedures, imaging, DME, and specialty medications. We track every open auth through approval, denial, or peer-to-peer escalation.",
      },
    ],
  },
  {
    slug: "patient-billing",
    iconName: "CalendarCheck",
    title: "Patient Billing & Statements",
    tagline:
      "Patient statements, collections, and courteous support that protects your patient relationships while collecting what's owed.",
    metaDescription:
      "Patient billing, statement, and collection services for Texas medical practices. Friendly patient communication that protects relationships.",
    whyItMatters:
      "Patient balances now make up 30%+ of practice revenue, up from under 10% a decade ago. Most practices send statements, then... that's it. The patient doesn't pay, the balance ages, eventually it goes to collections (or doesn't). We handle the full patient revenue cycle — clear statements, payment plans, friendly outreach, online payment portals — with the courtesy that protects the relationship between your patients and your practice.",
    includes: [
      "Clear, branded patient statements (paper or electronic)",
      "Online payment portal with credit card, ACH, and HSA options",
      "Payment plan setup and automatic enrollment for balances over $500",
      "Friendly first-call outreach at 30, 60, and 90 days",
      "Hardship/financial assistance application workflow",
      "Pre-collection notice at 120 days",
      "Coordination with your collection agency for accounts past 150 days (only if you want to use one)",
      "Patient statement design that reduces 'I don't understand my bill' calls",
    ],
    pitfalls: [
      "Statements that look like they came from a 1990s mainframe — patients call the office instead of paying",
      "No payment plan option — patients with $1,200 balances just ignore the bill",
      "Aggressive collection calls early in the cycle that damage the patient relationship",
      "No follow-up after the first statement — most patients pay after the second or third nudge, not the first",
      "Not separating patient responsibility from insurance balance on statements — patients don't know what they actually owe",
    ],
    metrics: [
      { label: "Patient balance collection rate (60-day)", value: "70%+" },
      { label: "Online payment adoption", value: "40%+" },
      { label: "Patient call volume (vs. paper-only)", value: "−60%" },
    ],
    faq: [
      {
        q: "How do you decide when to send to collections?",
        a: "We don't — you do. Some practices have a 90-day collection threshold; others wait 180 days; some never use a collection agency. We follow whatever policy you set and only send accounts to your designated agency.",
      },
      {
        q: "Will patients still call our office about bills?",
        a: "Some will, but most won't. Statements include a number for our patient billing team and a portal link. Most billing questions never reach you.",
      },
      {
        q: "What about HSA reimbursement and FSA receipts?",
        a: "Patients can download itemized receipts from the portal at any time. We also handle requests for documentation when patients submit to their HSA/FSA administrator.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}
