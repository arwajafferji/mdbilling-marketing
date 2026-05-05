import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://mdbillinghouston.com";
const PHONE = "+1-832-660-6657";
const EMAIL = "contact@mdbillinghouston.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MD Billing Experts | Medical Billing Services in Houston, TX",
    template: "%s | MD Billing Experts",
  },
  description:
    "Houston-based medical billing and revenue cycle management for independent practices. 95% first-pass acceptance, 24–48 hour claim turnaround, 20+ years of experience. Free Revenue Leakage Analysis.",
  keywords: [
    "medical billing Houston",
    "medical billing services Texas",
    "medical billing company Houston",
    "medical billing company Texas",
    "Houston medical billing",
    "Texas medical billing",
    "revenue cycle management Houston",
    "RCM Houston",
    "outsourced medical billing Houston",
    "medical coding Houston",
    "credentialing services Houston",
    "AR follow-up Houston",
    "denial management Texas",
    "eClinicalWorks billing",
    "Athenahealth billing services",
    "internal medicine billing Houston",
    "cardiology billing Houston",
    "pediatrics billing Houston",
    "Sugar Land medical billing",
    "Katy medical billing",
    "The Woodlands medical billing",
    "Pearland medical billing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MD Billing Experts",
    title: "MD Billing Experts | Medical Billing Services in Houston, TX",
    description:
      "95% first-pass acceptance. 24–48 hour claim turnaround. 20+ years serving Texas practices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Billing Experts | Medical Billing Services in Houston, TX",
    description:
      "Houston-based medical billing and RCM for independent Texas practices.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  authors: [{ name: "MD Billing Experts" }],
  creator: "MD Billing Experts",
  publisher: "MD Billing Experts",
  category: "Medical Billing Services",
};

// JSON-LD graph: Organization + MedicalBusiness (LocalBusiness subtype) + WebSite.
// Multiple linked entities help Google + AI search engines (ChatGPT,
// Perplexity, Gemini, Claude) understand the business as a single coherent
// record. @id values let entities cross-reference each other.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MD Billing Experts",
      alternateName: ["MDBilling Houston", "MD Billing Houston"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 767,
        height: 230,
      },
      image: `${SITE_URL}/logo.png`,
      telephone: PHONE,
      email: EMAIL,
      description:
        "Houston-based medical billing and revenue cycle management company serving independent physician practices across Texas. 20+ years of experience, 95% first-pass claim acceptance, certified coders.",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE,
          email: EMAIL,
          contactType: "sales",
          areaServed: "US-TX",
          availableLanguage: ["English"],
        },
      ],
      // Social and third-party profile URLs — major signal for AI search
      // engines for entity disambiguation. Add LinkedIn, BBB, Clutch, etc.
      // here as they come online.
      sameAs: [
        "https://share.google/46U90uVuiCKg85ene", // Google Business Profile
        // "https://www.linkedin.com/company/md-billing-experts",
        // "https://www.bbb.org/us/tx/houston/profile/...",
      ],
    },
    {
      "@type": ["MedicalBusiness", "LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: "MD Billing Experts",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      image: `${SITE_URL}/logo.png`,
      logo: `${SITE_URL}/logo.png`,
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: ["Invoice", "ACH", "Wire Transfer"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77002",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.7604,
        longitude: -95.3698,
      },
      // Service-area business — serves Texas + listed metros, no walk-in office.
      areaServed: [
        { "@type": "State", name: "Texas" },
        { "@type": "City", name: "Houston" },
        { "@type": "City", name: "Sugar Land" },
        { "@type": "City", name: "Katy" },
        { "@type": "City", name: "The Woodlands" },
        { "@type": "City", name: "Pearland" },
        { "@type": "City", name: "Cypress" },
        { "@type": "City", name: "Spring" },
        { "@type": "City", name: "Conroe" },
        { "@type": "City", name: "League City" },
        { "@type": "City", name: "Galveston" },
      ],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 29.7604,
          longitude: -95.3698,
        },
        geoRadius: 200000, // 200km — covers greater Houston metro
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      knowsAbout: [
        "Medical billing",
        "Revenue cycle management",
        "Medical coding",
        "ICD-10 coding",
        "CPT coding",
        "Provider credentialing",
        "Insurance eligibility verification",
        "Denial management",
        "Accounts receivable management",
        "HIPAA compliance",
        "Medicare billing",
        "Texas Medicaid (TMHP) billing",
        "eClinicalWorks billing",
        "Athenahealth billing",
        "Internal medicine billing",
        "Pediatric billing",
        "Cardiology billing",
        "Hospitalist billing",
        "Nephrology billing",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free Revenue Leakage Analysis",
            description:
              "One-page diagnostic report showing three specific revenue leaks at your practice with dollar estimates. Delivered in 3 business days.",
            url: `${SITE_URL}/revenue-leakage-analysis`,
          },
          price: "0",
          priceCurrency: "USD",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Medical Billing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Revenue Cycle Management",
              url: `${SITE_URL}/services/revenue-cycle-management`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Medical Coding",
              url: `${SITE_URL}/services/medical-coding`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Provider Credentialing & Enrollment",
              url: `${SITE_URL}/services/credentialing`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AR & Denial Management",
              url: `${SITE_URL}/services/ar-denial-management`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Eligibility Verification",
              url: `${SITE_URL}/services/eligibility-verification`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Patient Billing",
              url: `${SITE_URL}/services/patient-billing`,
            },
          },
        ],
      },
      description:
        "Medical billing and revenue cycle management services for independent physician practices in Houston and across Texas. Specialties include internal medicine, pediatrics, cardiology, hospitalist, rehabilitation, senior living, pulmonary, geriatrics, and nephrology.",
      slogan:
        "Houston-based medical billing for independent practices that want to keep more of what they earn.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "MD Billing Experts",
      description:
        "Medical billing and revenue cycle management for independent Texas practices.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
