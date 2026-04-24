import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mdbillinghouston.com"),
  title: {
    default: "MD Billing Experts | Medical Billing Services in Houston, TX",
    template: "%s | MD Billing Experts",
  },
  description:
    "Houston-based medical billing and revenue cycle management for independent practices. 95% first-pass acceptance, 24–48 hour claim turnaround, 20+ years of experience. Free Revenue Leakage Analysis.",
  keywords: [
    "medical billing Houston",
    "medical billing services Texas",
    "revenue cycle management Houston",
    "RCM Houston",
    "medical billing company Texas",
    "eClinicalWorks billing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdbillinghouston.com",
    siteName: "MD Billing Experts",
    title: "MD Billing Experts | Medical Billing Services in Houston, TX",
    description:
      "95% first-pass acceptance. 24–48 hour claim turnaround. 20+ years serving Texas practices.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "MD Billing Experts",
  url: "https://mdbillinghouston.com",
  telephone: "+1-832-660-6657",
  email: "contact@mdbillinghouston.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Houston",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Texas" },
  description:
    "Medical billing and revenue cycle management services for independent physician practices in Houston and across Texas.",
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
