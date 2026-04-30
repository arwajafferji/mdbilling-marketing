/**
 * Specialty detail page content.
 *
 * Each entry powers a /specialties/[slug] page. Specialty pages exist
 * because billing patterns vary wildly between specialties — a cardiology
 * practice has nothing in common with a peds practice in terms of code
 * mix, denial patterns, or revenue traps. Marked spots that need MIL
 * input with `// MIL:` comments. Avg reimbursement values are directional
 * proxies used by the homepage RLA calculator and should be reviewed by
 * MIL against actual payer data she has.
 */

export interface SpecialtyPage {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  metaDescription: string;
  // Top revenue traps unique to this specialty
  revenueTraps: { title: string; body: string }[];
  // Common CPT/HCPCS code patterns we focus on for this specialty
  codingFocus: string[];
  // Payer-specific notes (Texas-flavored where possible)
  payerNotes: string[];
  // Specialty-specific KPIs we track
  kpis: { label: string; value: string }[];
  // Pull quote (// MIL: replace once we have a real client testimonial)
  highlight: string;
}

export const specialties: SpecialtyPage[] = [
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    shortName: "IM",
    tagline:
      "Primary-care economics live and die on E/M leveling, AWVs, and chronic-care management — three places most billers leave money behind.",
    metaDescription:
      "Medical billing for internal medicine practices in Texas. E/M optimization, AWV, CCM, transitional care management — all done right.",
    revenueTraps: [
      {
        title: "Habitually under-coded 99214s",
        body: "Many IM practices default to 99213 even when documentation supports 99214 under 2021 MDM rules. The delta is ~$40 per visit. On a 25-visit-per-day panel, that's $250K+ per year of legitimately billable revenue lost.",
      },
      {
        title: "Missed Annual Wellness Visits",
        body: "Medicare pays G0438 (~$170) for the initial AWV and G0439 (~$130) for subsequent. Both can be billed alongside a problem-focused visit (with modifier 25). Most practices either skip them entirely or fail to add the problem visit.",
      },
      {
        title: "Untouched chronic-care management",
        body: "99490 (CCM) pays ~$60/month per Medicare patient with 2+ chronic conditions. A 1,500-Medicare-panel practice with 60% qualifying patients is leaving $650K+ per year on the table by not running a CCM workflow.",
      },
      {
        title: "Transitional Care Management forgotten",
        body: "99495/99496 pays $200–$280 for the post-discharge follow-up most IM practices already do — but only if billed within the right windows (7 or 14 days) with the right documentation.",
      },
    ],
    codingFocus: [
      "E/M codes 99202–99205 (new) and 99212–99215 (established) under 2021 MDM rules",
      "Annual Wellness Visit (G0438, G0439) + problem visit (modifier 25)",
      "Chronic Care Management (99490, 99491, 99487, 99489)",
      "Transitional Care Management (99495, 99496)",
      "Advance Care Planning (99497, 99498)",
      "Preventive screenings (G0444 depression, G0442 alcohol, G0102 prostate)",
    ],
    payerNotes: [
      "BCBS TX often denies modifier 25 unless documentation explicitly separates the wellness vs. problem encounter",
      "Texas Medicaid (Superior, Amerigroup, UnitedHealthcare CHIP) requires HEDIS-aligned diagnosis specificity",
      "Medicare Advantage plans (Humana, Aetna, Cigna, WellCare in TX) handle CCM consent forms differently — get them right at intake",
    ],
    kpis: [
      { label: "Avg E/M level (target: 3.6+)", value: "3.7" },
      { label: "AWV completion rate", value: "85%+" },
      { label: "CCM enrollment of qualifying panel", value: "60%+" },
    ],
    // MIL: replace with a real client quote once we have one
    highlight:
      "Most IM practices we onboard discover they had been giving away $200K–$500K a year just in unbilled AWV and CCM revenue.",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    shortName: "Peds",
    tagline:
      "Volume game: lots of low-dollar visits where one missed code or modifier wipes out the margin on the visit — and Texas Medicaid quirks dominate the AR.",
    metaDescription:
      "Medical billing for pediatric practices in Texas. Well-child visits, immunization administration, sick visits, Texas Medicaid TMHP expertise.",
    revenueTraps: [
      {
        title: "Missed immunization administration codes",
        body: "Every immunization needs both the vaccine code AND the administration code (90460/90461 for under-19, with counseling; 90471–90474 without). Forgetting administration codes loses $20–$30 per shot — across a busy peds panel, that's tens of thousands per year.",
      },
      {
        title: "Well-visit + sick-visit same day",
        body: "When a child shows up for a well visit and gets diagnosed with an ear infection, both can be billed with modifier 25. Most peds practices either pick one or get the modifier 25 denied because documentation doesn't separate them clearly.",
      },
      {
        title: "TMHP enrollment lapses",
        body: "Texas Medicaid (TMHP) revalidates every 5 years and is unforgiving about missing the deadline. A lapsed enrollment means every Medicaid visit gets denied until re-enrolled — a 60-90 day cash-flow hole.",
      },
      {
        title: "Developmental screening codes ignored",
        body: "96110 (developmental screening) pays $10–$15 per screening and is reimbursable separately from the well-child visit. AAP recommends 9, 18, and 30-month screenings — that's $30–$45 of legitimate billable revenue per child per year that often goes uncoded.",
      },
    ],
    codingFocus: [
      "Well-child visits (99381–99385 new, 99391–99395 established)",
      "Vaccine + administration codes (90460/90461 with counseling; CVX/CPT vaccine code per dose)",
      "Sick visit add-ons with modifier 25",
      "Developmental screening (96110, 96112, 96113)",
      "Behavioral assessments (96127)",
      "Hearing/vision screening (92551/92552, 99173)",
    ],
    payerNotes: [
      "Texas Medicaid via TMHP — strict on Texas Health Steps (THSteps) checklist completeness for well-child claims",
      "STAR/STAR Kids/STAR Health managed Medicaid plans (Superior, Amerigroup, Cook Children's, Driscoll, Texas Children's) each have slightly different prior-auth rules for specialty referrals",
      "BCBS TX HMO requires PCP designation matched correctly or claims deny",
      "VFC (Vaccines for Children) program tracking — must distinguish state-supplied vs. private-purchased vaccine inventory",
    ],
    kpis: [
      { label: "Immunization admin code capture rate", value: "99%+" },
      { label: "Modifier 25 well+sick acceptance", value: "95%+" },
      { label: "TMHP claim denial rate", value: "<5%" },
    ],
    highlight:
      "Texas peds practices live or die by Medicaid. Get TMHP wrong and your AR aging is brutal — get it right and you have a steady stream that pays predictably.",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    shortName: "Cards",
    tagline:
      "High-dollar procedures, complex modifier rules, and aggressive payer scrutiny — one missed prior auth on a stress test can cost $1,000+ per case.",
    metaDescription:
      "Medical billing for cardiology practices in Texas. Echo, stress test, cath, EP procedure billing with prior auth tracking and accurate modifier coding.",
    revenueTraps: [
      {
        title: "Prior auth gaps on advanced imaging",
        body: "Stress echo, nuclear stress, cardiac CT, and cardiac MRI all require prior auth from most commercial payers. A missed auth turns a $1,500 procedure into a $0 write-off. Tracking auths is non-negotiable for cardiology.",
      },
      {
        title: "Professional vs. technical component (modifier 26 / TC)",
        body: "Studies done in-office often need split billing. Wrong modifier means you bill for the wrong component, get partially paid, and lose the difference. Common on echo (93306), holter (93225), stress test (93015–93018).",
      },
      {
        title: "Bundling errors on cath procedures",
        body: "Diagnostic cath + intervention same day has CCI bundling rules. Billing both without modifier 59 (or X{ESPU}) gets the diagnostic portion denied. Conversely, unbundling when bundling is required triggers audits.",
      },
      {
        title: "Device monitoring under-billed",
        body: "Pacemaker/ICD remote monitoring (93294, 93295, 93296, 93297) pays per-90-day cycle. Many practices monitor patients without billing the surveillance codes consistently.",
      },
    ],
    codingFocus: [
      "Echo (93303, 93304, 93306, 93307, 93308, 93312, 93313, 93314, 93315, 93316, 93317)",
      "Stress test (93015 global, 93016 supervision only, 93017 tracing only, 93018 interpretation only)",
      "Cardiac catheterization (93452–93462, 93571, 93572)",
      "EP studies (93619–93624, 93653–93657)",
      "Device monitoring (93279–93298)",
      "Modifier 26, TC, 59, 25 — used heavily and audited closely",
    ],
    payerNotes: [
      "BCBS TX, UHC, and Aetna all require prior auth for advanced cardiac imaging — track via specific portal per payer",
      "Medicare LCDs in Texas (Novitas) have specific documentation requirements for stress testing medical necessity",
      "Hospital-based vs. office-based service distinction matters for cath lab billing",
      "Cardiology-specific bundling rules (NCCI edits) update quarterly — coders must stay current",
    ],
    kpis: [
      { label: "Prior auth on-time rate", value: "99%+" },
      { label: "Modifier accuracy (audited)", value: "98%+" },
      { label: "Days in AR for high-dollar procedures", value: "<35" },
    ],
    highlight:
      "Cardiology billing is unforgiving — high reimbursement means high audit scrutiny. Practices that get sloppy on documentation pay it back in clawbacks two years later.",
  },
  {
    slug: "hospitalist",
    name: "Hospitalist",
    shortName: "Hosp",
    tagline:
      "Inpatient billing with critical care, observation, and discharge codes — high-volume, high-margin, and high-risk if E/M leveling is off.",
    metaDescription:
      "Medical billing for hospitalist groups in Texas. Inpatient E/M, observation, critical care, discharge coding done right.",
    revenueTraps: [
      {
        title: "Critical care under-utilized (99291/99292)",
        body: "Critical care pays significantly more than subsequent inpatient (99291: ~$235 for first 30–74 minutes vs. 99232: ~$80). Many hospitalists don't document time spent or fail to invoke critical care when criteria are met.",
      },
      {
        title: "Observation vs. inpatient confusion",
        body: "Observation (99218–99220 admit, 99224–99226 subsequent, 99217 discharge) is billed differently than inpatient. Mis-classifying status leads to denials and recoupments.",
      },
      {
        title: "Discharge day codes missed",
        body: "99238 (≤30 min) and 99239 (>30 min) — the >30 min bracket pays ~$45 more. Documentation needs to support time spent on discharge planning.",
      },
      {
        title: "Subsequent visits stuck at 99232",
        body: "99233 requires high-complexity MDM and pays ~$30 more than 99232. For sick inpatients with multiple active issues, 99233 is often appropriate but coded as 99232 by default.",
      },
    ],
    codingFocus: [
      "Initial inpatient (99221, 99222, 99223)",
      "Subsequent inpatient (99231, 99232, 99233)",
      "Observation (99218, 99219, 99220, 99224, 99225, 99226, 99217)",
      "Critical care (99291, 99292)",
      "Discharge (99238, 99239)",
      "Time-based vs. MDM-based E/M selection (post-2023 inpatient rules)",
    ],
    payerNotes: [
      "Medicare two-midnight rule still applies — observation vs. inpatient affects reimbursement and patient liability",
      "Texas Medicaid managed plans audit observation claims aggressively",
      "Concurrent care rules — multiple physicians from different specialties on the same patient must document distinct issues",
    ],
    kpis: [
      { label: "Avg E/M level (target: 2.5+)", value: "2.6" },
      { label: "Critical care capture rate", value: "in-line w/ benchmarks" },
      { label: "Discharge code distribution (99239)", value: "55%+" },
    ],
    highlight:
      "Hospitalist groups can leave 10–15% of revenue on the table by defaulting to 99232. Right-leveling alone often justifies the entire billing relationship.",
  },
  {
    slug: "rehabilitation",
    name: "Rehabilitation",
    shortName: "Rehab",
    tagline:
      "PT/OT/SLP units, therapy caps, plan-of-care recertification — a billing flow with a dozen places to leak revenue.",
    metaDescription:
      "Medical billing for rehabilitation practices in Texas. PT, OT, speech therapy billing — units, caps, plan-of-care, KX modifier.",
    revenueTraps: [
      {
        title: "8-minute rule errors on therapy units",
        body: "Time-based therapy codes (97110, 97140, 97530, etc.) bill in 15-minute units using the 8-minute rule. Sloppy time documentation underbills units consistently — often 1 unit per visit, which adds up fast.",
      },
      {
        title: "Therapy threshold (cap) and KX modifier",
        body: "Medicare therapy threshold ($2,330 PT/SLP combined, $2,330 OT in 2024) requires KX modifier above the threshold to certify medical necessity. Missing the KX above threshold gets the entire claim denied.",
      },
      {
        title: "Plan-of-care recertification lapses",
        body: "Plans of care need physician/NPP signature every 90 days for Medicare. A lapsed plan invalidates ALL claims since the lapse — not just future ones.",
      },
      {
        title: "Functional limitation reporting (where still required by payer)",
        body: "Some Medicaid managed care plans in Texas still require functional G-codes despite Medicare retiring them. Skip these and the claim denies.",
      },
    ],
    codingFocus: [
      "Therapeutic procedures (97110, 97112, 97140, 97530, 97150)",
      "Modalities (97014, 97032, 97035, 97039)",
      "Evaluations (97161/97162/97163 PT, 97165/97166/97167 OT, 92521/92522/92523/92524 SLP)",
      "Re-evaluations (97164 PT, 97168 OT)",
      "Group therapy (97150)",
      "GP/GO/GN therapy modifiers, KX modifier, modifier 59",
    ],
    payerNotes: [
      "Medicare 8-minute rule documentation is audited by Texas Novitas — must show start/stop times",
      "Texas Medicaid prior auth required after first 30 visits for most plans",
      "Workers' comp (DWC) has unique Texas billing requirements — DWC-69 and progress reports",
      "BCBS TX requires plan of care submission at the start of treatment for many specialty rehab",
    ],
    kpis: [
      { label: "8-min rule unit accuracy", value: "98%+" },
      { label: "POC recert on-time rate", value: "100%" },
      { label: "KX modifier compliance", value: "100%" },
    ],
    highlight:
      "Therapy billing is technical and unforgiving — the difference between a clean rehab biller and a sloppy one is often 15–20% of revenue.",
  },
  {
    slug: "senior-living",
    name: "Senior Living",
    shortName: "SNF",
    tagline:
      "SNF/ALF/IL physician services, consolidated billing exclusions, and complex care plan oversight — different rules than office-based primary care.",
    metaDescription:
      "Medical billing for senior living and SNF physician services in Texas. Consolidated billing rules, care plan oversight, transitional care.",
    revenueTraps: [
      {
        title: "Consolidated billing landmines",
        body: "Medicare SNF Part A consolidated billing means most services for SNF Part A residents get paid to the SNF, not the physician. Billing the physician part directly to Medicare gets denied. Knowing what's bundled vs. carved out (physician E/M, certain therapies) is critical.",
      },
      {
        title: "Wrong place-of-service code",
        body: "POS 31 (SNF), 32 (Nursing Facility), 13 (ALF), 14 (Group Home), 12 (Home). Wrong POS code triggers denials and incorrect reimbursement.",
      },
      {
        title: "Care plan oversight (G0181/G0182) ignored",
        body: "Care plan oversight for home health and hospice patients pays $100–$120 for cumulative supervision time exceeding 30 minutes per month. Most practices never bill this even when documenting the work.",
      },
      {
        title: "Transitional Care Management around facility transitions",
        body: "99495/99496 applies when a patient is discharged from a facility and the physician follows up. Often missed in senior living because the physician sees the patient anyway during their regular rounds.",
      },
    ],
    codingFocus: [
      "Nursing facility services (99304–99318)",
      "Domiciliary/rest home (99324–99340 — replaced by 99341–99350 home services in 2023)",
      "Home services (99341–99350)",
      "Care plan oversight (G0181 home health, G0182 hospice)",
      "Transitional Care Management (99495, 99496)",
      "Advance care planning (99497, 99498)",
      "Place of service codes 31, 32, 13, 14, 12",
    ],
    payerNotes: [
      "Medicare SNF Part A consolidated billing rules are complex and frequently misunderstood",
      "Texas Medicaid Long-Term Services and Supports (STAR+PLUS) has specific managed care rules per MCO",
      "Medicare Advantage plans (especially Humana SNP, Wellcare DSNP) have additional auth requirements for facility-based visits",
    ],
    kpis: [
      { label: "POS code accuracy", value: "100%" },
      { label: "Consolidated billing denial rate", value: "<2%" },
      { label: "CPO/TCM capture (when applicable)", value: "tracked monthly" },
    ],
    highlight:
      "Senior living billing has the highest 'I didn't know I could bill that' delta of any specialty we work with — practices routinely add 8–12% to collections just by capturing CPO and TCM.",
  },
  {
    slug: "pulmonary",
    name: "Pulmonary",
    shortName: "Pulm",
    tagline:
      "Sleep studies, PFTs, and complex critical-care/inpatient mixes — billing flows that demand specialist coders.",
    metaDescription:
      "Medical billing for pulmonary and sleep medicine practices in Texas. PFT, sleep study, bronch, critical care billing with payer-specific expertise.",
    revenueTraps: [
      {
        title: "Sleep study auth + interpretation timing",
        body: "Polysomnograms (95810, 95811) require prior auth from most commercial payers, plus a follow-up visit for results. Practices that don't track auth windows or interpretation dates lose claims to timely-filing denials.",
      },
      {
        title: "PFT under-coding",
        body: "Spirometry (94010), full PFT (94060), DLCO (94729), methacholine (94070) — each has specific component coding. Many practices bill 94010 default when the testing performed justified the higher-paying combinations.",
      },
      {
        title: "Bronchoscopy bundling",
        body: "Diagnostic bronch (31622) plus add-ons (BAL 31624, biopsy 31625, brushing 31623) with EBUS (31652–31654) has specific bundling rules. Wrong combinations get denied or pay lower than warranted.",
      },
      {
        title: "Inpatient critical care under-captured",
        body: "Pulmonologists frequently provide critical care during ICU consults but bill subsequent inpatient (99232) instead of 99291. Time-based critical care documentation is required and often missed.",
      },
    ],
    codingFocus: [
      "PFT (94010, 94060, 94070, 94729, 94375)",
      "Sleep studies (95800, 95806, 95810, 95811, G0398–G0400)",
      "Bronchoscopy (31622–31652)",
      "Critical care (99291, 99292)",
      "Inpatient consults (99231–99233 follow-up under post-2010 rules)",
      "DME orders (oxygen, BiPAP, CPAP) — separate billing flow",
    ],
    payerNotes: [
      "Texas Medicare (Novitas) LCDs for sleep studies are strict on documentation of medical necessity",
      "DME billing for CPAP/BiPAP requires compliance reporting (95% adherence by day 90 for Medicare)",
      "Commercial payers (BCBS TX, Aetna, UHC) increasingly require home sleep study before in-lab studies",
    ],
    kpis: [
      { label: "Sleep study auth on-time rate", value: "100%" },
      { label: "PFT coding accuracy", value: "98%+" },
      { label: "Critical care capture (when applicable)", value: "tracked weekly" },
    ],
    highlight:
      "Pulmonary practices that use generalist coders consistently leave 10%+ on the table through PFT under-coding and missed bronch add-ons.",
  },
  {
    slug: "geriatrics",
    name: "Geriatrics",
    shortName: "Geri",
    tagline:
      "Medicare-heavy panels with CCM, AWVs, ACP, and chronic conditions everywhere — every specialty trap and opportunity, concentrated.",
    metaDescription:
      "Medical billing for geriatrics practices in Texas. Medicare-heavy billing with CCM, TCM, AWV, advance care planning, complex chronic care.",
    revenueTraps: [
      {
        title: "CCM workflow not built",
        body: "Geriatrics panels almost universally qualify for CCM (2+ chronic conditions). At ~$60/month per patient, a 1,200-patient panel with 80% qualifying is leaving ~$700K/year on the table without a CCM workflow.",
      },
      {
        title: "Advance Care Planning not billed",
        body: "99497 ($85) for the first 30 minutes and 99498 ($75) for each additional 30 minutes — billable separately from E/M with proper documentation. Geriatrics has these conversations constantly without billing.",
      },
      {
        title: "Hierarchical Condition Categories (HCC) gaps in Medicare Advantage",
        body: "MA plans pay providers more for sicker patients via HCC risk scoring. Conditions need to be documented and coded annually to maintain the risk score. Missed HCC documentation = lower MA reimbursement next year.",
      },
      {
        title: "Complex chronic CCM under-captured",
        body: "99487/99489 (complex CCM) pays significantly more than 99490 for patients with comprehensive care plans. Geriatrics patients often qualify but are billed at the basic 99490 level.",
      },
    ],
    codingFocus: [
      "AWV (G0438 initial, G0439 subsequent) + problem visit modifier 25",
      "CCM (99490 basic, 99491 30-min, 99487/99489 complex)",
      "ACP (99497, 99498)",
      "TCM (99495, 99496)",
      "Behavioral health integration (99492, 99493, 99494)",
      "HCC documentation strategies for Medicare Advantage",
    ],
    payerNotes: [
      "Medicare Advantage plans in Texas (Humana, Aetna, Cigna, WellCare, Devoted) all use HCC scoring — annual documentation refresh is critical",
      "Medicare LCDs for ACP/CCM require specific consent language",
      "Texas Medicaid STAR+PLUS for dual-eligibles has additional service requirements",
    ],
    kpis: [
      { label: "CCM enrollment of qualifying panel", value: "70%+" },
      { label: "AWV completion rate", value: "85%+" },
      { label: "ACP capture rate", value: "tracked weekly" },
    ],
    highlight:
      "Geriatrics is where the gap between 'good biller' and 'specialty biller' shows up biggest — CCM and HCC alone often add 20%+ to revenue when done right.",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    shortName: "Neph",
    tagline:
      "Dialysis MCP billing, ESRD-specific rules, and AVF/AVG procedure coding — a niche where general billers consistently lose money.",
    metaDescription:
      "Medical billing for nephrology practices in Texas. ESRD MCP, dialysis billing, vascular access procedure coding with specialty expertise.",
    revenueTraps: [
      {
        title: "MCP billing per-month errors",
        body: "Monthly Capitated Payment (90951–90970) for ESRD patients on dialysis is billed monthly with specific visit-frequency requirements (1 vs. 2–3 vs. 4+ visits). Wrong code = wrong payment. Audited closely.",
      },
      {
        title: "Home dialysis training/oversight missed",
        body: "Home hemodialysis and PD have separate billing codes (90989/90993 training, 90963–90966 monthly home). Practices often default to in-center MCP codes and underbill home patients.",
      },
      {
        title: "AVF/AVG procedure under-coding",
        body: "AV fistula creation, fistulagram, angioplasty, thrombectomy each have specific codes. Catheter placement codes (36558, 36561) and tunneled vs. non-tunneled distinction matters.",
      },
      {
        title: "Hospital consultation under-billed",
        body: "Inpatient nephrology consults (99221–99233 after 99251–99255 retirement) on AKI patients require careful E/M leveling — frequently under-coded as 99232 when MDM justifies 99233.",
      },
    ],
    codingFocus: [
      "MCP codes (90951–90961 face-to-face per month, 90963–90966 home)",
      "Initial training (90989, 90993)",
      "Vascular access procedures (36558, 36561, 36818, 36819, 36821)",
      "Fistulagram/intervention (36901–36909)",
      "Inpatient consultation E/M (99221–99233)",
      "Hospital observation, critical care",
    ],
    payerNotes: [
      "Medicare ESRD requires specific Method I/II election forms and is audited for compliance",
      "Texas Medicaid coverage for ESRD coordinates with Medicare — dual-eligible workflow matters",
      "Commercial payers handle vascular access differently (some bundle more aggressively)",
    ],
    kpis: [
      { label: "MCP visit-frequency accuracy", value: "100%" },
      { label: "Home dialysis billing capture", value: "100%" },
      { label: "Vascular access denial rate", value: "<3%" },
    ],
    highlight:
      "Nephrology billing is dense — getting MCP categorization wrong by one visit-frequency tier costs hundreds per patient per month. Compounded across a panel, the difference is enormous.",
  },
];

export function getSpecialtyBySlug(slug: string): SpecialtyPage | undefined {
  return specialties.find((s) => s.slug === slug);
}
