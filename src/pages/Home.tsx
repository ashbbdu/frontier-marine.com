import { Link } from 'react-router-dom';
import {
  Ship, Plane, Truck, Anchor, Container,
  Wrench, Globe2, ShieldCheck, MapPin, Award,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import HeroSlider from '../components/HeroSlider';
import Faq from '../components/Faq';
import { site, whatsappHref } from '../config/site';

const heroImages = [
  'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1670121180530-cfcba4438038?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1920&q=80&auto=format&fit=crop',
];

const services = [
  {
    icon: Container,
    title: 'Specialized Cargo',
    description: 'RoRo and break-bulk for vehicles, heavy equipment, and shipments that don’t fit a container.',
  },
  {
    icon: Wrench,
    title: 'Project Cargo',
    description: 'Out-of-gauge and in-gauge project moves — planned, permitted, and coordinated end-to-end.',
  },
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'FCL and LCL sea shipping from Jebel Ali and Khalifa Port to 200+ destinations worldwide.',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Express and standard air cargo through DXB and DWC when the calendar matters more than the invoice.',
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'GCC-wide trucking and last-mile road freight across the UAE, Saudi Arabia, Oman, and beyond.',
  },
];

const stats = [
  { value: '4', label: 'Core service lines' },
  { value: '200+', label: 'Ports & Destinations' },
  { value: 'UAE', label: 'Based & Managed' },
  { value: 'Door-to-Door', label: 'On-time Delivery' },
];

const perks = [
  {
    icon: Globe2,
    title: 'Global network',
    text: 'Trusted partners across major trade lanes, coordinated through a single point of contact.',
  },
  {
    icon: ShieldCheck,
    title: 'Cargo handled with care',
    text: 'Documented, coordinated, and monitored throughout the journey.',
  },
  {
    icon: MapPin,
    title: 'UAE expertise',
    text: 'Local knowledge across customs, documentation, ports and delivery.',
  },
  {
    icon: Award,
    title: 'Customer-first execution',
    text: 'Clear communication and reliable execution — with real people accountable to your shipment.',
  },
];

const steps = [
  {
    number: '01',
    title: "Tell us what you're moving",
    text: 'Share your origin, destination, cargo details and timeline.',
  },
  {
    number: '02',
    title: 'We plan the movement',
    text: 'We coordinate the right freight mode, routing, documentation and delivery requirements.',
  },
  {
    number: '03',
    title: 'We manage the shipment',
    text: 'Our team coordinates carriers, customs, documentation and key milestones.',
  },
  {
    number: '04',
    title: 'You stay informed',
    text: 'Clear updates throughout the journey, with one team responsible for keeping things moving.',
  },
  {
    number: '05',
    title: 'Cargo arrives',
    text: 'From port or airport through final delivery, we coordinate the movement end-to-end.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero with background slider */}
      <section className="relative isolate overflow-hidden text-white min-h-[85vh] md:min-h-[90vh] flex items-center">
        <HeroSlider images={heroImages} />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center md:px-6">
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
        <SectionHeading
          kicker="What we do"
          title="End-to-end freight forwarding"
          subtitle="Five service lines, one accountable partner."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4 md:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-navy">{s.value}</div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <SectionHeading
            align="left"
            kicker="Who we are"
            title="A Dubai-based freight forwarder built for modern trade"
            subtitle="We combine deep freight expertise with a customer-first operating model — giving importers and exporters clear communication, reliable execution, and control from origin to destination."
          />
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal">
            Read our story <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                <p.icon size={18} />
              </div>
              <div className="font-semibold text-slate-900">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600">{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work — replaces testimonials */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionHeading
            kicker="How we work"
            title="From enquiry to delivery — one place has all your answers"
            subtitle="A simple, transparent process that keeps you informed at every stage."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <li
                key={s.number}
                className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-bold uppercase tracking-widest text-brand-royal">
                  {s.number}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading
          kicker="Frequently asked"
          title="Questions we hear a lot"
          subtitle="If you don't see your question below, message us on WhatsApp — we usually reply the same hour."
        />
        <div className="mt-12">
          <Faq />
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
