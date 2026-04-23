import Link from "next/link";
import {
  ArrowRight,
  FileText,
  CreditCard,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  CalendarCheck,
  Stethoscope,
  Baby,
  HeartPulse,
  Hospital,
  Activity,
  Users,
  Wind,
  UserCog,
  Droplets,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  { value: "95%", label: "First-pass claim acceptance" },
  { value: "5-day", label: "Claim submission turnaround" },
  { value: "15%", label: "Average increase in collections" },
  { value: "25+", label: "Practices served" },
  { value: "20+", label: "Years of experience" },
];

const services = [
  {
    icon: BarChart3,
    title: "Revenue Cycle Management",
    desc: "End-to-end RCM: eligibility, charge capture, claims, posting, AR follow-up, denials, and reporting.",
  },
  {
    icon: FileText,
    title: "Medical Coding",
    desc: "Certified coders. ICD-10, CPT, and HCPCS coding with compliance review to reduce denials.",
  },
  {
    icon: ClipboardCheck,
    title: "Credentialing & Enrollment",
    desc: "Payer enrollment, re-credentialing, CAQH maintenance, and Medicare/Medicaid applications.",
  },
  {
    icon: CreditCard,
    title: "AR & Denial Management",
    desc: "Aggressive AR follow-up and denial recovery to convert unpaid claims into collected revenue.",
  },
  {
    icon: ShieldCheck,
    title: "Eligibility Verification",
    desc: "Real-time eligibility and benefits verification before the visit to eliminate denials at the source.",
  },
  {
    icon: CalendarCheck,
    title: "Patient Billing & Statements",
    desc: "Patient statements, collections, and courteous support that protects your patient relationships.",
  },
];

const specialties = [
  { icon: Stethoscope, name: "Internal Medicine" },
  { icon: Baby, name: "Pediatrics" },
  { icon: HeartPulse, name: "Cardiology" },
  { icon: Hospital, name: "Hospitalist" },
  { icon: Activity, name: "Rehabilitation" },
  { icon: Users, name: "Senior Living" },
  { icon: Wind, name: "Pulmonary" },
  { icon: UserCog, name: "Geriatrics" },
  { icon: Droplets, name: "Nephrology" },
];

const testimonials = [
  {
    quote:
      "Placeholder testimonial — to be replaced with real quote from Dr. Travis Hird about collections improvement and workflow.",
    name: "Dr. Travis Hird",
    role: "Practice Name · Specialty",
  },
  {
    quote:
      "Placeholder testimonial — second real client quote highlighting denial recovery or AR turnaround.",
    name: "Client Name",
    role: "Practice · Specialty",
  },
  {
    quote:
      "Placeholder testimonial — third real client quote focused on responsiveness and service quality.",
    name: "Client Name",
    role: "Practice · Specialty",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-700 text-white">
        <div className="container-xl grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Medical Billing · Houston, TX
            </p>
            <h1 className="mt-5 text-4xl leading-tight md:text-5xl lg:text-6xl">
              Stop leaving revenue on the table.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-100">
              Independent practices trust MD Billing Experts to run their
              revenue cycle end-to-end — so their team can focus on patients,
              not paperwork. 95% first-pass acceptance. 15% average lift in
              collections. Twenty years of experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/revenue-leakage-analysis" className="btn-primary">
                Get My Free Revenue Leakage Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a href="#contact" className="btn-secondary !bg-white !text-navy-800">
                Talk to Us
              </a>
            </div>
            <p className="mt-4 text-xs text-navy-200">
              No obligation. 1-page report delivered within 3 business days.
            </p>
          </div>
          <div className="hidden lg:block">
            {/* Decorative stats card */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="text-3xl font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-navy-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="container-xl grid grid-cols-2 gap-6 py-10 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-semibold text-navy-800">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-navy-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
              What we do
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl text-navy-800">
              Full revenue cycle, handled.
            </h2>
            <p className="mt-4 text-navy-600">
              We plug into your EMR/PM and take ownership of every step from
              eligibility check to final payment — including the work most
              billers skip.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-navy-100 bg-white p-6 transition hover:border-navy-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg text-navy-800">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="specialties" className="bg-navy-50 py-20">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
              Specialties we serve
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl text-navy-800">
              Deep experience across the specialties you see every day.
            </h2>
            <p className="mt-4 text-navy-600">
              Every specialty has its own coding, modifier, and payer quirks.
              We've spent twenty years learning them so your claims don't bounce.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {specialties.map((sp) => (
              <div
                key={sp.name}
                className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <sp.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-navy-800">{sp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="container-xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
              Who we are
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl text-navy-800">
              Twenty years of Houston practices trusting us with their revenue.
            </h2>
            <p className="mt-4 text-navy-600">
              MD Billing Experts is a privately-owned Houston company founded
              on a simple idea: independent practices deserve a billing partner
              that treats their revenue like its own. We combine modern
              technology, certified coders, and the kind of hands-on attention
              national billing companies can't match.
            </p>
            <p className="mt-4 text-navy-600">
              We're eClinicalWorks certified, HIPAA-compliant, and follow all
              Medicare and Medicaid privacy guidelines.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-navy-100 bg-white p-6">
              <div className="text-3xl font-semibold text-navy-800">20+</div>
              <div className="mt-1 text-sm text-navy-600">Years in Houston</div>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6">
              <div className="text-3xl font-semibold text-navy-800">25+</div>
              <div className="mt-1 text-sm text-navy-600">Practices served</div>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6">
              <div className="text-3xl font-semibold text-navy-800">95%</div>
              <div className="mt-1 text-sm text-navy-600">First-pass rate</div>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6">
              <div className="text-3xl font-semibold text-navy-800">100%</div>
              <div className="mt-1 text-sm text-navy-600">HIPAA-compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-navy-800 py-20 text-white">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
              What our clients say
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">
              Trusted by independent physicians across Texas.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <blockquote className="text-navy-100">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-navy-200">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="py-20">
        <div className="container-xl">
          <div className="rounded-2xl bg-crimson px-6 py-14 text-center text-white md:px-14">
            <h2 className="text-3xl md:text-4xl">
              Want to know how much revenue you're leaving behind?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Send us a few details about your practice. Within three business
              days we'll return a one-page report with three specific revenue
              leaks we see — and what they're costing you.
            </p>
            <div className="mt-8">
              <Link
                href="/revenue-leakage-analysis"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-crimson transition hover:bg-navy-50"
              >
                Start My Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-navy-50 py-20">
        <div className="container-xl grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-crimson">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl text-navy-800">
              Talk to a real person today.
            </h2>
            <p className="mt-4 text-navy-600">
              Call, email, or send us a note. We respond to every inquiry within
              one business day.
            </p>
            <dl className="mt-8 space-y-4 text-navy-800">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-navy-500">
                  Phone
                </dt>
                <dd className="mt-1 text-lg">
                  <a href="tel:+18326606657" className="hover:text-crimson">
                    (832) 660-6657
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-navy-500">
                  Email
                </dt>
                <dd className="mt-1 text-lg">
                  <a
                    href="mailto:contact@mdbillinghouston.com"
                    className="hover:text-crimson"
                  >
                    contact@mdbillinghouston.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-navy-500">
                  Location
                </dt>
                <dd className="mt-1 text-lg">Houston, Texas</dd>
              </div>
            </dl>
          </div>

          <form
            action={process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT}
            method="POST"
            className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-navy-800">
                  Your name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy-800">
                  Practice name
                </span>
                <input
                  name="practice"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy-800">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy-800">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-medium text-navy-800">Message</span>
              <textarea
                name="message"
                rows={4}
                className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 focus:border-navy-800 focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-primary mt-5 w-full md:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
