import { Link } from 'react-router-dom';
import {
  Ship, Plane, Truck, FileCheck2,
  Anchor, Globe2, ShieldCheck, Clock,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import Tracker from '../components/Tracker';
import { site, whatsappHref } from '../config/site';

const services = [
  { icon: Ship, title: 'Ocean Freight', description: 'FCL and LCL sea shipping to 200+ ports with vetted carriers and door-to-door options.' },
  { icon: Plane, title: 'Air Freight', description: 'Express and standard air cargo when the calendar matters more than the invoice.' },
  { icon: Truck, title: 'Land Transport', description: 'Cross-border trucking and last-mile road freight across major trade corridors.' },
  { icon: FileCheck2, title: 'Customs & Warehousing', description: 'Brokerage, documentation, and bonded storage handled by a team that speaks the paperwork.' },
];

const stats = [
  { value: '10K+', label: 'Shipments delivered' },
  { value: '50+', label: 'Countries served' },
  { value: '200+', label: 'Port coverage' },
  { value: '99.4%', label: 'On-time rate' },
];

const perks = [
  { icon: Globe2, title: 'Global network', text: 'Partners on every major trade lane, coordinated from a single point of contact.' },
  { icon: ShieldCheck, title: 'Cargo you can trust', text: 'Insured, tracked, and documented — every leg of the journey.' },
  { icon: Clock, title: 'Transit you can plan', text: 'Realistic ETAs, proactive updates, no surprises at the port.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-royal to-brand-navy text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Anchor size={14} /> Freight forwarding, simplified
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Your cargo, <span className="text-brand-light">every ocean.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              {site.name} moves goods across sea, sky, and land — with the transparency and speed
              modern supply chains demand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center">
              <img src="/logo.png" alt="" className="w-2/3 opacity-90 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading kicker="What we do" title="End-to-end freight forwarding" subtitle="Four service lines, one accountable partner." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4 md:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-brand-light">{s.value}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <SectionHeading align="left" kicker="Who we are" title="A logistics partner built for modern trade" subtitle="We combine deep freight expertise with a customer-first operating model — so your shipments arrive on time, on budget, and without the surprises." />
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal">
            Read our story <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
                <p.icon size={18} />
              </div>
              <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracker */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-6">
          <SectionHeading kicker="Live status" title="Where's my cargo?" subtitle="Enter a tracking number to see a demo of our shipment timeline." />
          <div className="mt-10">
            <Tracker />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-royal p-10 text-white md:p-14">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to move your next shipment?</h3>
              <p className="mt-2 text-white/80">Tell us where it's going. We'll take it from there.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition">Contact us</Link>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
