import { Link } from 'react-router-dom';
import {
  Ship, Plane, Truck, FileCheck2,
  Anchor, Globe2, ShieldCheck, Clock,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import Tracker from '../components/Tracker';
import HeroSlider from '../components/HeroSlider';
import { site, whatsappHref } from '../config/site';

const heroImages = [
  'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1670121180530-cfcba4438038?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1920&q=80&auto=format&fit=crop',
];

const services = [
  { icon: Ship, title: 'Ocean Freight', description: 'FCL and LCL sea shipping from Jebel Ali and Khalifa Port to 200+ destinations worldwide.' },
  { icon: Plane, title: 'Air Freight', description: 'Express and standard air cargo through DXB and DWC when the calendar matters more than the invoice.' },
  { icon: Truck, title: 'Land Transport', description: 'GCC-wide trucking and last-mile road freight across the UAE, Saudi Arabia, Oman, and beyond.' },
  { icon: FileCheck2, title: 'Customs & Warehousing', description: 'UAE customs brokerage, documentation, and bonded storage handled by a team that speaks the paperwork.' },
];

const stats = [
  { value: '10K+', label: 'Shipments delivered' },
  { value: '50+', label: 'Countries served' },
  { value: '200+', label: 'Port coverage' },
  { value: '99.4%', label: 'On-time rate' },
];

const perks = [
  { icon: Globe2, title: 'Global network', text: 'Partners on every major trade lane, coordinated from a single point of contact in Dubai.' },
  { icon: ShieldCheck, title: 'Cargo you can trust', text: 'Insured, tracked, and documented — every leg of the journey.' },
  { icon: Clock, title: 'Transit you can plan', text: 'Realistic ETAs, proactive updates, no surprises at the port.' },
];

export default function Home() {
  return (
    <>
      {/* Hero with background slider */}
      <section className="relative isolate overflow-hidden text-white min-h-[85vh] md:min-h-[90vh] flex items-center">
        <HeroSlider images={heroImages} />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center md:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            {/* <MapPin size={14} /> Headquartered in {site.city} */}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow">
            Your cargo, <span className="text-brand-light">every ocean.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/90">
            {site.name} moves goods across sea, sky, and land — connecting the UAE to global markets
            with the transparency and speed modern supply chains demand.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/5 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-white/15 transition"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/70">
            <Anchor size={14} /> Freight forwarding, simplified
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
          <SectionHeading align="left" kicker="Who we are" title="A Dubai-based logistics partner built for modern trade" subtitle="We combine deep freight expertise with a customer-first operating model — so your shipments arrive on time, on budget, and without the surprises." />
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
