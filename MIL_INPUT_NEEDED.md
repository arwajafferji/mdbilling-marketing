# Items needing MIL input

The new website is fully built and live-deployable, but the following items are first-draft and need your mother-in-law's review/input. None of these block launch — they're refinements to do over a phone call or two.

## High priority — accuracy/voice

### 1. Service-page content review (`data/services.ts`)
Six service pages drafted (Revenue Cycle Management, Medical Coding, Credentialing, AR & Denial Management, Eligibility Verification, Patient Billing). Each has:
- Why-it-matters paragraph
- "What's included" bullet list
- "Common pitfalls" we see elsewhere
- Performance metrics (some are aspirational targets — confirm or adjust)
- 3–4 FAQ items each

**Ask MIL:** Is the tone right? Are the metrics defensible (e.g. "32 days in AR avg" — is that the actual number she'd quote)? Any service we're claiming to do that she wouldn't want to advertise?

### 2. Specialty-page content review (`data/specialties.ts`)
Nine specialty pages drafted (IM, Peds, Cards, Hospitalist, Rehab, Senior Living, Pulm, Geri, Neph). Each has revenue traps, coding focus, Texas payer notes, KPIs, and a highlight quote.

**Ask MIL:** For each specialty she actually serves, is the trap list accurate? Anything she'd add or remove? Are the highlight quotes (currently general) something she's comfortable putting in her own voice, or should they be replaced with real client quotes?

### 3. Founder bio / About page detail
Current About section is generic ("twenty years of Texas practices..."). It would be much stronger with:
- Her name and credentials
- Year founded
- Why she started the company (origin story)
- A photo (optional — many B2B billing companies skip this)

### 4. Real testimonials
We've hidden the testimonials section behind a feature flag (`SHOW_TESTIMONIALS = false` in `app/page.tsx`). Three placeholders are sitting there. Once you have real client quotes:
- Update the names, practices, specialties, and quotes in the `testimonials` array
- Flip the flag to `true`
- Site will automatically render them

Top candidates per earlier conversations: **Dr. Travis Hird** confirmed willing.

### 5. Real case studies / numbers
Anywhere on the site we say "20% average lift in collections" or "25+ practices" — confirm these numbers are accurate enough to publish. Same for the stats in the hero stats card and the stats strip.

## Medium priority — content gaps

### 6. Pricing page
You explicitly said no pricing transparency (rates depend on practice). Currently the FAQ says "we charge a percentage of collections; depends on specialty/volume; quoted after the Revenue Leakage Analysis." If MIL wants a different framing (e.g. ranges, or a "starts at X%" floor), update the FAQ pricing answer.

### 7. EMR logo bar
Currently uses styled text marks for 8 EMRs (eClinicalWorks, athenahealth, Epic, Cerner, NextGen, Kareo/Tebra, AdvancedMD, Medisoft). For real logos:
- Get permission from each vendor (or rely on nominative fair use — riskier)
- Drop SVG/PNG files in `/public/logos/{slug}.svg`
- Update `components/EmrLogoBar.tsx` to use `<Image>` instead of `<span>`

Alternatively: ask MIL if her actual EMR list is different (we listed the most common; she may not work with all of these).

### 8. Photos / imagery
Site is currently logo + colored sections + icons. No team/office/stock photos. Could add:
- A team photo on the About section
- A photo of MIL or the office on the Process page (humanizes the "first 90 days")
- Skip if she prefers clean/abstract — site reads professional without them

### 9. Process page review (`app/process/page.tsx`)
Day-by-day phases drafted. **Ask MIL:** is the actual onboarding she runs structured this way? Anything materially different in week-by-week? Do they really do parallel-run for 30 days, or is it shorter/longer?

### 10. FAQ review (`app/faq/page.tsx`)
20 FAQ items drafted across 5 sections. Some answers are directional/best-practice — particularly:
- Pricing model details (percentage of collections — confirm)
- Contract terms (month-to-month after first 90 days — confirm)
- Data ownership commitments — confirm
- Service area ("Texas + handful of surrounding states" — confirm)

## Low priority / nice-to-have

### 11. Service-area map
Could add a map of Texas with markers for cities served. Skip if she'd rather not advertise specific locations.

### 12. Compliance / certification badges
HIPAA, AAPC certification, eClinicalWorks Certified — if she has logos for any official certifications, drop them in. Currently text-only mentions in the About section.

### 13. Blog / resource library
Pages exist for thought-leadership posts (e.g. "Top 5 reasons your IM practice is leaving 6 figures on the table"). Not built yet — would be a separate next-phase project once core site is solid.

---

## What's already done (you don't need to ask about these)

- Homepage with hero, stats, calculator, EMR bar, services, specialties, about, contact
- Public Revenue Leakage estimator (homepage calculator)
- Free RLA landing page + form + .docx report download
- Service detail pages (6) with full content
- Specialty detail pages (9) with full content
- Process page (90-day timeline)
- FAQ page with FAQPage schema markup
- Header nav, Footer with all links wired up
- Sitemap including all new routes
- Robots.txt, OG image, JSON-LD MedicalBusiness schema
- Real logo as favicon
- Domain pointed to Vercel; site is live
- Testimonials hidden behind feature flag (ready to flip when real quotes arrive)
