# Revenue Leakage Analysis — Fulfillment SOP

**Goal:** deliver a customized one-page report to every lead within 3 business days of form submission.
**Target time per lead:** 20–30 minutes once you're in the groove.

---

## When a new submission arrives

Formspree emails you the form data to `contact@mdbillinghouston.com`. Workflow:

### 1. Acknowledge (within 4 business hours) — 2 min
Send a quick reply:

> Hi {{FIRST_NAME}}, thanks for the request — I received your submission and I'll have your Revenue Leakage Analysis back to you by {{3RD_BUSINESS_DAY}}. If anything comes up in the meantime, feel free to reach me directly at this email or (832) 660-6657.
>
> — Arwa

This sets the expectation, confirms the clock, and makes it feel personal.

### 2. Open the template — 1 min
Copy `revenue-leakage-analysis-template.md` → rename with practice name + date. Open in Word.

### 3. Fill the profile table — 2 min
Every `{{VARIABLE}}` in the "Your Practice Profile" section is a direct copy-paste from the form submission.

### 4. Pick the three leaks — 5 min
Use this decision tree based on what they submitted:

| Their submitted signal | Most likely Leak #1 | Most likely Leak #2 | Most likely Leak #3 |
|---|---|---|---|
| First-pass < 90% | Unworked denials aging out | Under-coding E/M levels | Eligibility gaps |
| "Denials" in pain point | Unworked denials aging out | Modifier 25 / bundling | Eligibility gaps |
| "Slow AR" / "slow payments" in pain point | **Aged AR without follow-up** | Under-coding | Secondary payer COB errors |
| "Cash flow" / "collections" in pain point | **Aged AR without follow-up** | Under-coding | Patient responsibility collection gaps |
| "Credentialing" in pain point | Out-of-network billing from lapsed credentialing | Under-coding | Payer enrollment delays |
| New EMR / migration | Charge capture misses during transition | Coding template errors | Eligibility 270/271 misconfig |
| "Staff turnover" | Workflow documentation gaps → denial rework | Under-coding from new staff | Missed time-based billing |
| No stated pain point | Unworked denials aging out | Under-coding E/M levels | Eligibility gaps |

Pick the three that best match. You can always swap in a different leak you've seen if it's a closer fit to their specialty/EMR.

**When to use the AR follow-up leak (from the "Alternate Leak" section of the template):** Swap it in place of Leak #1 (denials aging) when:

- The pain point mentions slow payments, cash flow, days-in-AR, or aged claims
- Their first-pass rate is actually decent (>92%) — which rules out a denial problem and points at an AR follow-up problem instead
- They specifically say their denials are being worked but the money still isn't coming in

Denials aging out and aged AR without follow-up are related but different leaks — don't use both in the same report, it looks repetitive.

### 5. Specialty block for Leak #2 — 3 min
Paste the specialty-specific under-coding notes from the template's inline comments into Leak #2. Keep it to 2–3 bullet points. Don't over-explain — you want them curious, not buried.

### 6. Plug in the numbers — 5 min
Use these rough formulas — adjust based on specialty and payer mix:

**Leak #1 estimate:**
`monthly_claim_volume × (1 − first_pass_rate) × avg_reimbursement × 0.35 × 12`

Where avg_reimbursement defaults:
- Internal Medicine / Family Practice: $110
- Pediatrics: $95
- Cardiology: $175
- Hospitalist: $130
- Rehab: $90
- Senior Living / SNF: $105
- Pulmonary: $140
- Geriatrics: $115
- Nephrology: $165

If they selected "Not sure" for claim volume, use 750 as a midpoint placeholder.

**Leak #2 estimate:**
`established_patient_visits/month × 0.15 × $40 × 12`

Estimate established-patient visits as 70% of claim volume.

**Leak #3 estimate:**
`monthly_claim_volume × 0.06 × avg_reimbursement × 0.5 × 12`

**AR follow-up leak estimate (if swapped in):**
`monthly_claim_volume × 0.10 × avg_reimbursement × 0.40 × 12`

Where:
- `0.10` = ~10% of claims end up stuck in aged AR without systematic follow-up
- `0.40` = ~40% of those are recoverable if someone actually calls the payer / rebills / escalates

Example: 1,000 claims/month at $110 avg → 1000 × 0.10 × $110 × 0.40 × 12 = $52,800/year.

**Round all numbers to the nearest $500** so it feels like an estimate, not a fabricated precise figure.

### 7. Executive summary — 3 min
The `${{LOW_ESTIMATE}}–${{HIGH_ESTIMATE}}` range = (Total × 0.8) to (Total × 1.2). Always round.

### 8. Sanity check — 2 min
Read the whole thing end-to-end. Check:
- No leftover `{{VARIABLES}}`
- Specialty block matches their specialty
- Total estimate matches the three line items
- Their practice name is spelled right (basic one, but often missed)

### 9. Export and send — 3 min
- File → Save As → PDF
- Filename: `Revenue_Leakage_Analysis_{{PRACTICE_NAME}}_{{DATE}}.pdf`
- Email with this copy:

> Hi {{FIRST_NAME}},
>
> Attached is the Revenue Leakage Analysis for {{PRACTICE_NAME}}. The three leaks we flagged are the highest-probability ones based on what you shared — the estimated recovery range is conservative.
>
> If any of this resonates, I'd love to get 20 minutes on your calendar to walk through what a full audit would look at and answer any questions: {{BOOKING_LINK}}
>
> No pressure. If it's not the right time, I appreciate you giving us a look.
>
> — Arwa
> MD Billing Experts | (832) 660-6657

### 10. Log it — 1 min
Track in a spreadsheet (or CRM later): name, practice, date delivered, follow-up date (+7 business days if no response).

---

## Red flags — when NOT to send the report

If a submission looks like any of these, **do not send**:

- Honeypot field populated (`_gotcha` field has content) → spam, Formspree should filter these but double-check
- Practice name is gibberish or obviously fake
- Email is a throwaway domain (mailinator, guerrillamail, 10minutemail)
- The same submitter has submitted 3+ times in a week
- The "pain point" field contains a solicitation, sales pitch, or SEO spam

For the first two: ignore.
For suspected competitors doing recon: still ignore, but maybe adjust the form to require phone verification if it happens repeatedly.

---

## Follow-up cadence

If no reply after delivery:
- **+7 business days:** short follow-up email ("Did the report make sense? Any questions?")
- **+21 business days:** final check-in with a value-add (link to a relevant article, or a specific observation about their specialty)
- After that: stop. Don't become the practice that pesters.

---

## When to update the template

- **Quarterly** — refresh the avg_reimbursement numbers based on current Medicare fee schedule
- **When you spot a new common leak** — swap it into the decision tree
- **When a specialty's pattern shifts** — update the specialty block for that row

---

*Keep this SOP next to the template. The faster you can produce these, the more leads you can actually close on.*
