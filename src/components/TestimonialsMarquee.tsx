import { Quote, Star } from 'lucide-react';

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "SeaFargo turned our monthly FCL shipments from Jebel Ali into the least stressful line item on my calendar. Documentation is always ahead of schedule, and I actually get a human on the phone.",
    name: 'Ayesha Rahman',
    role: 'Supply Chain Lead',
    company: 'Meridian Home Goods',
  },
  {
    quote:
      "We had a time-critical air freight into DXB with customs quirks nobody wanted to touch. Their team cleared it the same day and kept us updated at every checkpoint. That's the standard now.",
    name: 'Rohit Menon',
    role: 'Operations Manager',
    company: 'Northwind Electronics',
  },
  {
    quote:
      "Straightforward pricing, no surprise fees, and their brokerage team knows UAE customs cold. We moved four suppliers over to SeaFargo in the first quarter — that's the highest compliment I can give.",
    name: 'Sarah Al Mansoori',
    role: 'Founder',
    company: 'Souq Provisions',
  },
  {
    quote:
      "Their GCC road network is exactly what we needed for cross-border deliveries into Saudi. On-time percentage jumped noticeably in the first month, and I have visibility I never had before.",
    name: 'Faisal Ibrahim',
    role: 'Logistics Director',
    company: 'Levant Trading Co.',
  },
  {
    quote:
      "As a fashion importer, our SKUs come from a dozen origins on tight windows. SeaFargo consolidates it all beautifully and their LCL rates keep our unit economics honest.",
    name: 'Anna Kovacs',
    role: 'Head of Buying',
    company: 'Kite & Co. Apparel',
  },
  {
    quote:
      "We ship spare parts around the clock — sometimes at 2am. Their ops team responds fast, files clean, and treats every consignment like it's their own. That's rare.",
    name: 'Devang Shah',
    role: 'COO',
    company: 'Precision Auto Parts',
  },
  {
    quote:
      "Bulk construction materials into Abu Dhabi used to be a paperwork nightmare. SeaFargo's brokerage and bonded warehousing turned it into something I barely think about now.",
    name: 'Mohammed Al-Farsi',
    role: 'Procurement Manager',
    company: 'Al Waha Construction',
  },
];

type Props = {
  items?: Testimonial[];
  speedSeconds?: number;
};

export default function TestimonialsMarquee({ items = testimonials, speedSeconds = 25 }: Props) {
  return (
    <div className="group relative overflow-hidden" aria-label="Client testimonials">
      <div
        className="flex w-max gap-6"
        style={{
          animation: `marquee ${speedSeconds}s linear infinite`,
          willChange: 'transform',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {[...items, ...items].map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="flex w-[85vw] max-w-sm shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            aria-hidden={i >= items.length}
          >
            <Quote size={28} className="text-brand-royal/60" aria-hidden="true" />
            <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={16} className="fill-brand-royal text-brand-royal" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-royal text-sm font-semibold text-white">
                {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.role} · {t.company}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-slate-950 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-slate-950 md:w-24" />
    </div>
  );
}
