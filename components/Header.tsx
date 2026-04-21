import Link from "next/link";
import { Phone } from "lucide-react";

const nav = [
  { label: "Services", href: "/#services" },
  { label: "Specialties", href: "/#specialties" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="container-xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-white font-bold">
            MD
          </div>
          <span className="font-bold tracking-tight text-navy-800">
            BILLING EXPERTS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-navy-600 hover:text-navy-800"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+18326606657"
            className="hidden items-center gap-2 text-sm font-semibold text-navy-800 sm:flex"
          >
            <Phone className="h-4 w-4" />
            (832) 660-6657
          </a>
          <Link href="/revenue-leakage-analysis" className="btn-primary">
            Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
}
