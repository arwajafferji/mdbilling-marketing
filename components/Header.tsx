import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";

import { services } from "@/data/services";
import { specialties } from "@/data/specialties";

/**
 * Top nav with hover-revealed dropdowns under sections that have sub-pages
 * (Services, Specialties). Pure CSS — uses Tailwind's group-hover and
 * group-focus-within so it works without a "use client" directive.
 *
 * Mobile nav is intentionally minimal for now — md:flex hides on small
 * screens. A proper mobile drawer is a future task.
 */

type NavLeaf = { label: string; href: string };
type NavNode =
  | NavLeaf
  | { label: string; href: string; children: NavLeaf[] };

const nav: NavNode[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    label: "Specialties",
    href: "/specialties",
    children: specialties.map((s) => ({
      label: s.name,
      href: `/specialties/${s.slug}`,
    })),
  },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="container-xl flex h-28 items-center justify-between">
        <Link href="/" aria-label="MD Billing Experts — Home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="MD Billing Experts"
            width={1000}
            height={300}
            priority
            className="h-[230px] w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) =>
            "children" in n ? (
              <div key={n.href} className="group relative">
                <Link
                  href={n.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-navy-600 transition hover:text-navy-800"
                >
                  {n.label}
                  <ChevronDown
                    className="h-3.5 w-3.5 transition group-hover:rotate-180"
                    aria-hidden
                  />
                </Link>
                {/* Bridge keeps hover state alive between the trigger and the panel */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[260px] rounded-xl border border-navy-100 bg-white p-2 shadow-lg ring-1 ring-black/5">
                    <Link
                      href={n.href}
                      className="block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-crimson hover:bg-navy-50"
                    >
                      All {n.label.toLowerCase()} →
                    </Link>
                    <div className="my-1 h-px bg-navy-100" />
                    {n.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg px-3 py-2 text-sm text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-navy-600 transition hover:text-navy-800"
              >
                {n.label}
              </Link>
            ),
          )}
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
