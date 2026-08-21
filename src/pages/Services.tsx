import { Ship, Plane, Truck, Boxes, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappHref } from '../config/site';

const services = [
  {
    icon: Boxes,
    title: 'Project Logistics (RoRo / Break Bulk)',
    image: '/service-project-logistics.jpg',
    imageAlt: 'Heavy oilfield equipment on trailers staged for shipment',
    description:
      'Oversized, wheeled, and out-of-gauge cargo handled end-to-end — from roll-on/roll-off vessels for vehicles and machinery to break-bulk stowage for project shipments that don’t fit a box.',
    features: [
      'RoRo capacity for cars, trucks, and heavy equipment',
      'Break-bulk stowage for oversized and project cargo',
      'Lift plans, lashing, and port handling coordination',
      'Route surveys and permits for out-of-gauge moves',
    ],
  },
  {
    icon: Ship,
    title: 'Ocean Freight (FCL & LCL)',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=80&auto=format&fit=crop',
    imageAlt: 'Container ship at sea loaded with stacks of shipping containers',
    description:
      'Full-container and less-than-container sea shipping to more than 200 ports worldwide, backed by vetted carrier partnerships and door-to-door coordination.',
    features: [
      'FCL, LCL, and reefer container options',
      'Weekly sailings on all major trade lanes',
      'Port-to-port and door-to-door service',
      'Bill of lading, ISF, and export docs handled',
    ],
  },
  {
    icon: Plane,
    title: 'Air Freight',
    image: 'https://images.unsplash.com/photo-1571086291540-b137111fa1c7?w=1400&q=80&auto=format&fit=crop',
    imageAlt: 'Cargo aircraft at an international airport',
    description:
      'Express and standard air cargo when time is the priority — with capacity across leading carriers and cutoffs designed around your production calendar.',
    features: [
      'Consolidated and direct air services',
      'Time-definite and next-flight-out options',
      'Temperature-controlled and hazmat capable',
      'Airport-to-airport or full door-to-door',
    ],
  },
  {
    icon: Truck,
    title: 'Land & Road Transport',
    image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?w=1400&q=80&auto=format&fit=crop',
    imageAlt: 'Freight truck on a highway',
    description:
      'Cross-border trucking and last-mile delivery across major trade corridors, integrated cleanly with your ocean and air legs.',
    features: [
      'FTL and LTL road freight',
      'Cross-border customs coordination',
      'Refrigerated and specialized equipment',
      'Real-time milestone updates',
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-royal text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">Services</div>
            <h1 className="text-4xl md:text-5xl font-extrabold">Four service lines. One accountable team.</h1>
            <p className="mt-5 text-lg text-white/80">
              Ocean, air, land, and customs — coordinated end-to-end so your shipment has one owner from
              origin to destination.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 space-y-20">
        {services.map((s, i) => (
          <div key={s.title} className={`grid gap-10 md:grid-cols-2 items-center ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
                <s.icon size={26} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white">{s.title}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{s.description}</p>
              <ul className="mt-5 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check size={18} className="mt-0.5 text-brand-royal" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800 aspect-video">
              <img
                src={s.image}
                alt={s.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-royal p-10 text-white md:p-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">Let's talk</div>
            <h2 className="text-3xl md:text-4xl font-bold">Not sure which service you need?</h2>
            <p className="mt-4 text-base md:text-lg text-white/80">Send us the shipment details — we'll recommend the right mode and get you a quote.</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition">Contact us</Link>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
