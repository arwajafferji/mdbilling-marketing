# MD Billing Experts — mdbillinghouston.com

Rebuild of mdbillinghouston.com on Next.js 15 + Tailwind, deployed to Vercel.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom navy/crimson palette
- **Icons:** lucide-react
- **Forms:** Formspree (host-agnostic)
- **Deploy:** Vercel

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in Formspree endpoints
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

This repo is ready to import as-is:

1. Push to GitHub: `gh repo create mdbilling-marketing --public --source=. --push`
2. At vercel.com → New Project → Import the repo → Deploy.
3. In Vercel → Project Settings → Environment Variables, add:
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   - `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`
4. Vercel gives you a `*.vercel.app` URL immediately. Review there.
5. When ready for staging under your domain: Vercel → Domains → add `v2.mdbillinghouston.com` and update your DNS at your registrar with the CNAME Vercel provides.
6. When ready to cut over: swap the apex `mdbillinghouston.com` DNS to Vercel (Vercel provides the A records) and update your MX records to point at Google Workspace if not already.

## Formspree setup

1. Sign up at https://formspree.io (free tier: 50 submissions/month).
2. Create two forms: "Revenue Leakage Analysis" and "General Contact".
3. Copy each form's endpoint (format: `https://formspree.io/f/XXXXXXXX`).
4. Paste into Vercel env vars (step 3 above).
5. Confirm delivery to `contact@mdbillinghouston.com` in Formspree settings.

Test locally by submitting the form — you should receive an email.

## Content still to swap

Search for the string `Placeholder` in the codebase — everything marked that way is waiting on real content:

- [ ] Three testimonials (Dr. Travis Hird + two others). Edit `app/page.tsx` → `testimonials` array.
- [ ] Final stats confirmed (currently: 95% first-pass, 24–48 hour turnaround, 20% collections lift, 25+ practices, 20+ years).
- [ ] Logo mark: currently a placeholder red circle with "MD" text — replace with the real Billing Experts logo SVG/PNG in `components/Header.tsx` and `components/Footer.tsx`.
- [ ] Open Graph social-share image at `/og.png` (1200x630) — referenced in `app/layout.tsx` metadata.
- [ ] Favicon at `/favicon.ico`.

## Structure

```
app/
  layout.tsx                     # Root layout, SEO metadata, JSON-LD schema
  page.tsx                       # Homepage (single-scroll: hero, stats, services, specialties, about, testimonials, CTA, contact)
  revenue-leakage-analysis/
    page.tsx                     # Lead magnet landing page + intake form
  globals.css                    # Tailwind + component classes (btn-primary, btn-secondary, container-xl)
components/
  Header.tsx                     # Sticky header, nav, phone, Free Audit CTA
  Footer.tsx                     # Contact info, services/specialties lists, HIPAA line
tailwind.config.ts               # Custom navy + crimson palette
```

## Future enhancements (not yet built)

- `/specialties/[slug]` — split each specialty into its own page for SEO when we have content
- `/blog` — content hub for SEO (target "medical billing Houston", "[specialty] billing Texas")
- Integration logo wall (eClinicalWorks, Athena, Epic, etc.)
- HubSpot or similar CRM form routing for lead tracking
- Google Analytics 4 or Vercel Analytics
- Sitemap + robots.txt (Next.js App Router: add `app/sitemap.ts` and `app/robots.ts`)
