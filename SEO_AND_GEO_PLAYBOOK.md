# SEO + GBP + AI Search Playbook

This is your action list for getting the site to show up on Google (especially the local map pack) and on AI search engines (ChatGPT, Claude, Perplexity, Gemini AI Overviews) when someone in Texas searches for a medical biller.

The site itself is now SEO/GEO-ready (technical foundations below). The remaining levers are mostly off-site work that needs you. Estimated time investment is broken out per item.

---

## What's already done on the site

These are now live in the codebase and will deploy on next push:

- Enhanced JSON-LD schema in `app/layout.tsx`: Organization + MedicalBusiness + LocalBusiness + WebSite, with geo coordinates, service area polygon (200km radius around Houston), opening hours, knowsAbout topics, makesOffer, hasOfferCatalog, sameAs (placeholders).
- Per-page schemas: BreadcrumbList on services, specialties, FAQ, process, service-areas, /houston. Service schema on every service detail page. Specialty service schema on every specialty page. FAQPage schema on every page with FAQ items (including new city pages).
- New `/houston` city page — comprehensive local-SEO landing page for the home market with NAP block, neighborhood/hospital lists, 8-item FAQ, full LocalBusiness schema.
- New `/service-areas` index + 6 city pages (`/service-areas/sugar-land`, `/katy`, `/the-woodlands`, `/pearland`, `/cypress`, `/spring`) with unique local content + per-city geo schema.
- New `/llms.txt` at the site root (emerging standard for AI search engines).
- Updated sitemap including all new routes.
- Tightened homepage About copy with AI-extractable factual sentences.
- Footer updated with Houston + Service Areas links.

You don't need to do anything to ship these — they go live with the next deploy.

---

## 1. Google Business Profile — unblocking your verification

**This is your single highest-ROI item.** GBP drives the local map pack, which is where most "medical biller Houston" searches click.

You said the postcard verification hasn't arrived. Here's what to do:

### Step 1: Check status now
- Go to https://business.google.com/dashboard/
- Click your MD Billing Experts profile
- If it says "Pending verification" with a postcard option, the postcard is in transit or lost
- If it says "Suspended," that's a different problem — message Google support directly

### Step 2: If the postcard is lost (most common)
- In the GBP dashboard, click "Verify now" or "Get verified"
- Google often offers a second verification method on retry — phone call or email — once the postcard window has expired (~14 days after request)
- If only postcard is shown, click "I never received a code" / "Request another code"
- Your second postcard often arrives faster (Google flags the address as needing manual review)

### Step 3: If postcard fails again, request video verification
- This is now the most reliable path for service-area businesses
- In the GBP dashboard, look for "Video verification" option (sometimes hidden under "Get help")
- You'll record a video showing: business signage (or your office space), business documents (utility bill, lease, business license), and yourself holding ID
- Approval is usually 5 business days

### Step 4: If GBP still won't verify
- Submit a Google Business Profile reinstatement request: https://support.google.com/business/contact/business_redressal_form
- Attach business documents: Texas LLC paperwork, business license, EIN documentation, two utility bills with the business name and address
- Mention: "Service-area business — Houston, TX. No public-facing storefront. Postcard verification has been attempted twice without delivery."

### Step 5: Once verified, optimize the profile
- **Categories:** Primary "Billing Service" + secondary "Medical Billing Service" + "Business Management Consultant"
- **Services:** Add each of your 6 services as listed services (Revenue Cycle Management, Medical Coding, Credentialing, AR & Denial Management, Eligibility Verification, Patient Billing)
- **Description:** Use the lead paragraph from the site's About section
- **Hours:** Mon–Fri 9 AM – 5 PM Central
- **Photos:** Add the logo, an office photo if you have one, a team photo (optional). Even 2–3 photos beats zero
- **Posts:** Add a Google Post once a month (announcement, blog, or seasonal — easy ones: "Free Revenue Leakage Analysis available," "Now serving [new specialty]")
- **Service area:** Set to Greater Houston metro (75 mile radius) and list specific cities (Houston, Sugar Land, Katy, etc.)
- **Q&A:** Pre-populate 5–10 Q&A entries yourself (just write the question, switch accounts to a friend's, then post the answer from your business account). Use questions from the FAQ page

**Time estimate:** 30 min to fill out, plus whatever Google takes to verify.

---

## 2. Citations — the consistency game

Local SEO ranking is partly about NAP (Name, Address, Phone) consistency across the web. Same business name, same phone, same city listed everywhere. Google triangulates these to confirm you're real.

### Your canonical NAP (use exactly this format everywhere):
- **Name:** MD Billing Experts
- **Phone:** (832) 660-6657
- **Email:** contact@mdbillinghouston.com
- **Website:** https://mdbillinghouston.com
- **Location:** Houston, TX (service-area; no public address)
- **Hours:** Mon–Fri 9:00 AM – 5:00 PM Central

### Tier 1 — must-do, free, ~2 hours total
These are the citations Google trusts most:

- [ ] **Google Business Profile** (item 1 above)
- [ ] **Bing Places for Business** — https://www.bingplaces.com/ (Bing Maps + occasionally surfaces in Microsoft AI Copilot)
- [ ] **Apple Business Connect** — https://businessconnect.apple.com/ (Apple Maps; matters for iPhone users searching)
- [ ] **Better Business Bureau (BBB)** — https://www.bbb.org/get-accredited/ (free profile; paid accreditation is optional but useful for trust)
- [ ] **Yelp for Business** — https://biz.yelp.com/ (claim/create profile; medical billing isn't huge on Yelp but the citation matters)
- [ ] **LinkedIn Company Page** — https://linkedin.com/company/setup/new (set up if you don't have one; this is one of the top signals AI engines use for entity verification)
- [ ] **Facebook Business Page** — https://www.facebook.com/pages/create/ (low engagement value but it's a citation)
- [ ] **Houston Chamber of Commerce** — https://www.houston.org/houston-chamber-commerce (membership has a fee; free directory listings exist for non-members)

### Tier 2 — industry-specific, high trust signal, ~3 hours total

- [ ] **HBMA (Healthcare Business Management Association)** — https://www.hbma.org/membership (medical billing industry association; membership has a fee but their member directory is one of the most trusted citations for billing companies)
- [ ] **AAPC business directory** — your AAPC certified coders should already be in here; add your business listing too
- [ ] **MGMA (Medical Group Management Association)** — https://www.mgma.com/ (membership-gated but valuable)
- [ ] **Clutch.co** — https://clutch.co/ (B2B service directory; healthcare-adjacent businesses do well here)
- [ ] **G2** — https://www.g2.com/ (more for software but RCM services are a category)

### Tier 3 — general business directories, ~2 hours total
Ask one team member to spend an afternoon batch-creating these. Most take 2–3 minutes each:

- [ ] Yellow Pages — yellowpages.com
- [ ] Manta — manta.com
- [ ] Foursquare for Business — business.foursquare.com
- [ ] MapQuest / Yext — yext.com (free tier available)
- [ ] Hotfrog — hotfrog.com
- [ ] Brownbook — brownbook.net
- [ ] Cylex — cylex.us.com
- [ ] EZlocal — ezlocal.com
- [ ] LocalStack — localstack.com
- [ ] CitySquares — citysquares.com

**Optional shortcut:** Pay $50/year for a service like BrightLocal, Yext, or Whitespark to push your NAP to ~50 directories at once. Worth it if you don't want a team member spending 4 hours on it.

---

## 3. Reviews — the conversion lever

Once GBP is live, reviews drive both ranking AND click-through. A 5-star profile with 20 reviews beats a 5-star profile with 2 reviews even when both rank.

### Action items
- [ ] Email your top 5–10 longest-tenured clients (Dr. Hird is already on the list per our notes) with a Google Review link
- [ ] Use this template (one paragraph, makes it easy):

> "We just claimed our Google Business Profile and reviews from clients who've worked with us for years would mean a lot. If you've had a good experience, would you be willing to leave a quick review? Here's the direct link: [your GBP review URL]. Even one or two sentences is plenty."

- [ ] Aim for 5 reviews in your first 30 days, 15 in your first 90 days
- [ ] Respond to every review (positive AND negative) within 48 hours — Google weights review-response rate

### Where else to ask for reviews (besides GBP)
- LinkedIn recommendations on your company page
- BBB review (if you set up the BBB profile)
- HBMA member directory (if it has a review function)

---

## 4. Backlinks and mentions — the AI search lever

AI engines (ChatGPT, Claude, Perplexity) weight third-party mentions heavily because they signal that your business is a real entity worth trusting. This is where you outrank national billing companies in AI search even though they have more SEO juice — because they don't get mentioned in Houston-specific contexts.

### Easy wins (1–2 hours each)

- [ ] **Local podcasts** — Houston has a thriving small-business podcast scene. Pitch yourself as a guest on shows about independent medical practices, healthcare admin, Texas business. One episode = one durable backlink + transcript that AI engines index.
- [ ] **Guest post on a healthcare admin blog** — pitch one of these: KevinMD, MGMA Connection, Physicians Practice, Becker's ASC Review. A single byline with one link back to mdbillinghouston.com is gold.
- [ ] **Texas Medical Association partnerships** — TMA has affiliate networks for service providers. Worth checking whether they list billing companies for member referrals.
- [ ] **Reddit / forum mentions** — when r/medicine or r/medicalpracticemgmt has a "best billing company" thread, having a credible mention (NOT spam) drives both AI and human signal. Don't fake it; ask one of your real clients to mention you organically when relevant.

### Bigger plays (multi-week effort)

- [ ] **Press release for a milestone** — "20 years in Houston," "25th client," "new specialty." PRWeb and EIN Presswire are cheap, and AI engines crawl press releases.
- [ ] **Industry podcast / video** — start your own short podcast or YouTube series targeting practice managers ("Revenue Leakage Of The Week"). Even 6 episodes establishes you as a voice the AI engines associate with the topic.
- [ ] **Wikipedia entity** — if MD Billing Experts has any genuinely notable claim (longest-running, largest woman-owned, etc.), a Wikipedia article would dramatically boost AI search visibility. High bar — needs third-party news coverage to support notability.

---

## 5. Inputs we still need from you (for the site)

The site has placeholders or generics in a few places where real info will boost both SEO and AI search. None block launch — they're improvements:

- [ ] **Founder name** — currently the site says "Twenty years of Texas practices trusting us." With a real founder name + photo + 2-paragraph bio on the About section, you'd add a Person schema entity that AI engines use heavily for entity disambiguation. (This was already on the MIL_INPUT_NEEDED list.)
- [ ] **Founding year** — site says "20+ years" generically. An actual year ("Founded in 2003") improves Organization schema (`foundingDate`) and is more credible.
- [ ] **LinkedIn URL** — once your LinkedIn company page is live, send me the URL and I'll add it to the schema's `sameAs` array (it's currently a placeholder). Same for GBP URL once verified.
- [ ] **Google Business Profile URL** — same as above; goes into `sameAs` once active.
- [ ] **Real testimonials** — when MIL approves real client quotes, flip `SHOW_TESTIMONIALS = true` in `app/page.tsx` and update the array. AI engines and Google both weight testimonials with attributable names.
- [ ] **Real address (optional)** — if you operate from a specific office (not service-area only), giving a verifiable address strengthens local SEO significantly. If you're service-area only, that's fine — leave it as is.

---

## 6. Ongoing — monthly cadence

Local SEO is not set-and-forget. Recommended monthly checklist (15 min):

- [ ] Post 1 update to Google Business Profile
- [ ] Reply to any new reviews
- [ ] Add 1 new FAQ to the site (helps both Google and AI engines)
- [ ] Check Google Search Console for new keyword impressions and adjust copy if a keyword is showing up but not converting
- [ ] Audit one or two NAP listings for consistency (a stale phone number on Yellow Pages will silently hurt rank)

Quarterly:
- [ ] Add a new blog post or resource page (one well-written piece per quarter beats four lazy ones)
- [ ] Refresh the homepage stats if anything has changed (number of practices, AR days, etc.)
- [ ] Check `sameAs` and update with any new social/directory profiles

---

## 7. What to expect, timeline-wise

Realistic expectations for a brand-new site + GBP in a competitive niche like medical billing:

- **Month 1–2:** Site indexed by Google, GBP verified, some long-tail queries start ranking. Negligible map-pack visibility yet.
- **Month 3–4:** First map-pack appearances for low-competition queries ("medical billing Sugar Land," "[specialty] billing Texas"). 3–10 Google reviews accumulating.
- **Month 6:** Map-pack visibility for some core terms ("medical billing Houston" — still hard but starting to show on long-tail). AI search engines starting to surface MDBilling for specific queries (especially specialty + city combos).
- **Month 9–12:** Ranking on Google's first page for most long-tail queries. AI search engines confidently citing the business for Houston medical billing questions. Map pack rotation for "medical billing Houston" with 5+ reviews.

The compound effect is real. The first 3 months of this work pays off for years afterward.

---

## TL;DR — your top 5 actions this week

1. Unblock GBP verification (item 1, ~30 min once you have docs ready).
2. Set up Bing Places + Apple Business Connect (~20 min total).
3. Set up LinkedIn Company Page (~30 min).
4. Email 5 longtime clients asking for a Google review (~15 min).
5. Send me the LinkedIn + GBP URLs once they're live so I can add them to `sameAs` schema (~5 min on your end).

Everything else can roll out over the next 4–8 weeks at a comfortable pace.
