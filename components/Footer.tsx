import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="container-xl grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="inline-flex rounded-lg bg-white p-3">
            <Image
              src="/logo.png"
              alt="MD Billing Experts"
              width={1000}
              height={300}
              className="h-[230px] w-auto"
            />
          </div>
          <p className="mt-4 text-sm text-navy-200">
            Houston-based medical billing and revenue cycle management for
            independent practices across Texas.
          </p>
        </div>

        <div>
          <h4 className="text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/#services" className="hover:text-white">Revenue Cycle Management</Link></li>
            <li><Link href="/#services" className="hover:text-white">Medical Coding</Link></li>
            <li><Link href="/#services" className="hover:text-white">Credentialing &amp; Enrollment</Link></li>
            <li><Link href="/#services" className="hover:text-white">AR &amp; Denial Management</Link></li>
            <li><Link href="/#services" className="hover:text-white">Eligibility Verification</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white">Specialties</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Internal Medicine</li>
            <li>Pediatrics</li>
            <li>Cardiology</li>
            <li>Hospitalist</li>
            <li>Rehabilitation</li>
            <li>Senior Living</li>
            <li>Pulmonary</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="tel:+18326606657" className="hover:text-white">
                (832) 660-6657
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href="mailto:contact@mdbillinghouston.com"
                className="hover:text-white break-all"
              >
                contact@mdbillinghouston.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Houston, Texas</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="container-xl flex flex-col items-start justify-between gap-2 py-6 text-xs text-navy-300 md:flex-row md:items-center">
          <span>
            &copy; {new Date().getFullYear()} MD Billing Experts. All rights
            reserved.
          </span>
          <span>HIPAA-compliant. Medicare &amp; Medicaid guidelines followed.</span>
        </div>
      </div>
    </footer>
  );
}
