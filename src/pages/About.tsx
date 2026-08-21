import { Compass, HeartHandshake, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TestimonialsMarquee from '../components/TestimonialsMarquee';
import { site } from '../config/site';

const values = [
  { icon: Compass, title: 'Clarity', text: 'Straight answers, honest ETAs, and paperwork that makes sense.' },
  { icon: HeartHandshake, title: 'Partnership', text: 'We win when your shipment lands — that alignment shapes every decision.' },
  { icon: Sparkles, title: 'Craft', text: 'Freight forwarding is a detail business. We treat every detail like it matters.' },
];

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-royal text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">About {site.name}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold">Freight, without the friction.</h1>
            <p className="mt-5 text-lg text-white/80">
              We built {site.name} because global trade shouldn't feel like a black box. Our team combines
              decades of freight experience with modern tools — so shippers get the visibility, reliability,
              and support they've been asking for.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading align="left" kicker="Our story" title="Built on cargo, run on trust" />
          <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <p>
              What started as a small brokerage in Dubai has grown into a global forwarding partner
              spanning 50+ countries — with Jebel Ali as our anchor and the UAE's trade corridors as
              our launchpad. Along the way, one thing hasn't changed: our belief that every shipment
              is a promise.
            </p>
            <p>
              Today, we handle ocean, air, land, and project logistics — from FCL and LCL sea freight to
              RoRo vessels and break-bulk stowage for oversized cargo — serving growing brands, established
              manufacturers, and everyone in between with the same attention we gave our very first customer.
            </p>
          </div>
        </div>
        <div>
          <SectionHeading align="left" kicker="Our mission" title="Move goods. Simplify trade." />
          <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <p>
              We're here to make freight forwarding feel less like a battle and more like a competitive
              advantage. That means transparent pricing, proactive communication, and operators who
              actually pick up the phone.
            </p>
            <p>
              Whether you're shipping your first container or your ten-thousandth, our job is the same:
              get it there, keep you informed, and earn the next one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionHeading kicker="What we stand for" title="Values that ship with every order" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
                  <v.icon size={22} />
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{v.title}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading kicker="What clients say" title="Shipping teams that trust us with their cargo" subtitle="Real feedback from importers, exporters, and manufacturers across the GCC and beyond." />
        <div className="mt-12">
          <TestimonialsMarquee />
        </div>
      </section>
    </>
  );
}
