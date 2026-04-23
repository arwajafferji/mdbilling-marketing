# Revenue Leakage Analysis

**Prepared for:** {{PRACTICE_NAME}}
**Specialty:** {{SPECIALTY}}
**Date:** {{DELIVERY_DATE}}
**Prepared by:** MD Billing Experts | Houston, TX

---

## Executive Summary

{{PRACTICE_NAME}} submitted a request for a complimentary Revenue Leakage Analysis on {{SUBMISSION_DATE}}. Based on the practice profile you shared and benchmarks drawn from the 25+ independent practices we currently serve across Texas, we identified **three specific revenue leaks** most likely affecting your collections today.

Based on your reported monthly claim volume of **{{CLAIM_VOLUME}}** and current first-pass acceptance of **{{FIRST_PASS_RATE}}**, we estimate {{PRACTICE_NAME}} is leaving between **${{LOW_ESTIMATE}}–${{HIGH_ESTIMATE}} per year** on the table.

This report outlines what those three leaks are, how we know they're likely present in your operation, and a conservative estimate of what each one is costing you annually.

There is no obligation associated with this analysis. If you'd like to discuss the findings, we've included a link to book a 20-minute call at the end.

---

## Your Practice Profile

| Field | Response |
|---|---|
| Practice | {{PRACTICE_NAME}} |
| Specialty | {{SPECIALTY}} |
| Current EMR / PM system | {{EMR_SYSTEM}} |
| Monthly claim volume | {{CLAIM_VOLUME}} |
| Current first-pass acceptance | {{FIRST_PASS_RATE}} |
| Self-reported pain point | {{PAIN_POINT}} |

---

## Methodology

This is a **diagnostic**, not an audit. We did not access your PM system or claims data. The leaks identified below are derived from:

1. The information you submitted in your intake form
2. Industry benchmarks for {{SPECIALTY}} practices of similar size
3. The most common revenue leakage patterns we've documented across 25+ independent Texas practices over the past 20+ years

A full audit — with access to your claims data, denial reports, and aging buckets — would yield a precise recovery number. This report identifies the three highest-probability leaks so you know what to look into, and what we'd be looking at if you chose to work with us.

---

## Leak #1 — {{LEAK_1_TITLE}}

> **Default when pain point is denials / low first-pass acceptance:**
> **Unworked denials aging past filing limits**

### What we're seeing

Practices reporting first-pass acceptance at or below {{FIRST_PASS_RATE}} typically lose recoverable revenue not on the initial denial — but on the **second denial**, when the claim ages past the payer's timely-filing window before anyone touches it again. Medicare gives you 12 months; commercial payers often give 90–180 days. Internal teams that are triaging live work rarely get to 60+-day aged denials in time.

### How to verify this on your end

- Pull an aging report filtered to 90+ days
- Look at the denial reason code breakdown — if a single reason accounts for >30% of aged denials, that's a workflow gap
- Check whether those claims were ever appealed, resubmitted, or written off without documentation

### Conservative dollar estimate

Based on your {{CLAIM_VOLUME}} monthly claim volume and {{FIRST_PASS_RATE}} first-pass rate, we estimate **{{LEAK_1_ESTIMATE}}/year** in claims that were deniable-to-recoverable but expired in the aging bucket.

*Formula we use: monthly claim volume × (1 − first-pass rate) × avg reimbursement × 0.35 recovery rate × 12 months. Swap in actual numbers per lead.*

---

## Leak #2 — {{LEAK_2_TITLE}}

> **Default for most specialties:**
> **Under-coding / missing modifiers for complex encounters**

### What we're seeing

{{SPECIALTY}} practices commonly under-bill on:

- **E/M levels** — especially for established patients with multiple chronic conditions (99214 vs 99213 = ~$40 delta per visit, per 2024 Medicare fee schedule)
- **Modifier 25** on same-day procedures + E/M — routinely missed, triggers bundling
- **Time-based billing** — when prolonged service codes (99417, G2212) apply but aren't captured
- **Chronic Care Management (CCM / 99490)** and **Transitional Care Management (TCM / 99495, 99496)** — billable but under-utilized by practices without dedicated care coordinators

### Specialty-specific patterns we'd look at for {{SPECIALTY}}:

{{SPECIALTY_NOTES}}

> Fill this block per specialty. Examples:
> - **Internal Medicine:** CCM, AWV (G0438/G0439), 99214 vs 99213 mix
> - **Pediatrics:** immunization admin codes (90460/90461), developmental screening (96110)
> - **Cardiology:** cardiac monitoring codes, modifier -26 (professional component)
> - **Hospitalist:** subsequent visit levels (99232 vs 99231), discharge codes (99238/99239)
> - **Rehab:** timed vs. untimed codes, 8-minute rule
> - **Senior Living / SNF:** nursing facility E/M (99307–99310)
> - **Pulmonary:** PFT interpretation codes (94010–94060)
> - **Geriatrics:** AWV (G0438/G0439), CCM (99490), Advance Care Planning (99497/99498), Cognitive assessment (99483)
> - **Nephrology:** MCP dialysis codes (90951–90970), home dialysis training (90989), ESRD-related services, modifier -26 on dialysis

### Conservative dollar estimate

A 1-level E/M upshift on just 15% of established-patient visits typically recovers **{{LEAK_2_ESTIMATE}}/year** for a practice your size. This compounds if modifier 25 or CCM billing is also being missed.

---

## Leak #3 — {{LEAK_3_TITLE}}

> **Default for {{EMR_SYSTEM}} users (and most independent practices):**
> **Eligibility verification gaps**

### What we're seeing

Independent practices running eligibility checks reactively — at or after the visit — lose 4–8% of claims to front-end denials that are fully preventable:

- Inactive coverage / terminated plans not caught at check-in
- Missed secondary-payer coordination of benefits
- Expired Medicare Beneficiary Identifiers (MBIs)
- Out-of-network status on a plan the patient assumes is in-network
- Prior-authorization requirements missed for certain codes

Most PM systems (including {{EMR_SYSTEM}}) offer real-time eligibility checks via 270/271 transactions — but they're frequently **turned off, misconfigured, or run manually on a one-off basis** rather than batch-verified 48 hours before visits.

### How to verify this on your end

- Pull a report of eligibility-related denials (CARC 27, 24, 29, 26, 31 are the common ones) for the last 90 days
- Check whether your front desk has a defined pre-visit eligibility SOP, and whether it's actually being followed
- Look at your secondary-payer billing volume vs. your patient population's likely Medicare/Medicaid/commercial mix

### Conservative dollar estimate

Capturing even half of eligibility-related denials typically recovers **{{LEAK_3_ESTIMATE}}/year** for a practice at your volume, before considering the labor cost of working those denials retroactively.

---

## Alternate Leak — Aged AR without systematic follow-up

> **Use this leak in place of Leak #1 or #3** when the practice's pain point signals AR problems, "slow payments," or long days-in-AR — not when denials are the core issue.

### What we're seeing

Denials are the *obvious* leak — they come with a reason code. But a more expensive problem at most independent practices is the **silent** one: claims that were submitted cleanly, never got denied, and never got paid either. They just sit in the aging bucket because no one is systematically following up on unpaid claims.

Common causes:

- Claims marked "pended" or "in adjudication" by the payer that never get resolved — needs a follow-up phone call, not a resubmission
- Secondary-payer billing that never happens after the primary pays
- Claims that hit the payer's system but were never acknowledged (lost in an EDI hand-off)
- Patient-responsibility balances that sit uncollected after insurance pays
- Claims flagged "needs more info" with no owner assigned to follow up

Industry benchmark for healthy days-in-AR is **25–32 days**. Practices without structured AR follow-up commonly sit at **45–60+ days**, which means 1–2 months of revenue is always "out there" instead of in the bank account.

### How to verify this on your end

- Pull an aging report and look at the 60–90 and 90+ day buckets. Industry target: <15% of total AR in 90+.
- Sample 10 claims from the 90+ bucket. For each, can your team tell you *why* it hasn't paid and what the next action is? If the answer is "I'm not sure" on more than 2 or 3 of them, you have an AR follow-up gap.
- Check if anyone has a defined weekly or bi-weekly cadence of calling payers on aged claims. If the answer is "when we get around to it," that's the leak.

### Conservative dollar estimate

At {{CLAIM_VOLUME}} monthly claim volume, a reasonable estimate of revenue stuck in — and leaking out of — aged AR is **{{LEAK_AR_ESTIMATE}}/year**. This is revenue that was *earned*, already documented, already submitted — just not being actively chased into the bank account.

*Formula we use: monthly claim volume × 0.10 × avg reimbursement × 0.40 recovery rate × 12 months. Swap in actual numbers per lead.*

---

## Total Estimated Recovery

| Leak | Annual estimate |
|---|---|
| 1 — {{LEAK_1_TITLE}} | {{LEAK_1_ESTIMATE}} |
| 2 — {{LEAK_2_TITLE}} | {{LEAK_2_ESTIMATE}} |
| 3 — {{LEAK_3_TITLE}} | {{LEAK_3_ESTIMATE}} |
| **Total recoverable** | **{{TOTAL_ESTIMATE}}** |

> **Important:** These are diagnostic estimates based on industry benchmarks and your submitted inputs. Actual figures depend on your current denial mix, payer contracts, and documentation practices. A full audit typically refines these numbers within a ±20% range.

---

## What We'd Do About It

If {{PRACTICE_NAME}} engaged MD Billing Experts, here's how we'd address each leak in the first 90 days:

1. **Weeks 1–2 — Discovery.** Full denial audit across the last 12 months. Segment by CARC/RARC code. Identify the top three recoverable denial categories.
2. **Weeks 2–4 — Stabilize.** Work the 61–120 day aging bucket before any claims expire. Submit appeals on provable denials. Write off only what's genuinely unrecoverable, with documentation.
3. **Weeks 4–8 — Optimize.** Implement pre-visit eligibility verification workflow. Train front-desk/intake on coding documentation for the top 3 E/M level errors we find. Deploy CCM/TCM billing where clinically appropriate.
4. **Weeks 8–12 — Prevent.** Monthly denial trend reporting. Quarterly coding compliance review. First-pass acceptance target: 95% within two quarters.

---

## Next Step

If any of the above resonates, we'd like to talk.

**Book a 20-minute discovery call:** {{CALENDLY_OR_BOOKING_LINK}}
**Prefer to email:** contact@mdbillinghouston.com
**Prefer to call:** (832) 660-6657

No pressure and no obligation. The call is free; if we're not a fit, we'll say so.

---

## About MD Billing Experts

Houston-based medical billing and revenue cycle management for independent practices across Texas. 20+ years of experience. 25+ active practice partners. HIPAA-compliant. Medicare and Medicaid guidelines followed.

**Specialties we serve:** Internal Medicine · Pediatrics · Cardiology · Hospitalist · Rehabilitation · Senior Living · Pulmonary · Geriatrics · Nephrology

---

*This analysis is provided for informational purposes. MD Billing Experts is not a CPA or law firm; tax, legal, and coding compliance decisions remain the responsibility of the practice. All figures are estimates based on industry benchmarks and self-reported inputs; actual recovery depends on a full audit of claims data.*
