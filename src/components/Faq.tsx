import { ChevronDown } from 'lucide-react';

export type FaqItem = { question: string; answer: string };

export const defaultFaqs: FaqItem[] = [
  {
    question: 'Which regions and countries do you cover?',
    answer:
      "We're headquartered in Dubai and ship worldwide — with especially deep coverage across the GCC (UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar), the wider Middle East, South Asia, Europe, and East Asia. If your lane isn't listed, ask — chances are we can still get it there.",
  },
  {
    question: 'How do I get a quote?',
    answer:
      "The fastest way is WhatsApp — tap the green button in the corner and send your shipment details (origin, destination, cargo type, weight/volume, and target date). You can also use the contact form or email us directly. Most quotes come back within one business day.",
  },
  {
    question: 'Do you handle UAE customs clearance and documentation?',
    answer:
      "Yes. Our in-house brokerage team handles import and export customs clearance across all UAE ports and airports, including HS classification, duty consulting, bill of lading, ISF, certificates of origin, and any special permits your cargo requires.",
  },
  {
    question: 'What shipping modes do you offer?',
    answer:
      'Ocean freight (FCL and LCL), air freight (express and standard), land / road transport across the GCC, and end-to-end customs and warehousing. Most shipments use a combination — we coordinate every leg so you have a single point of contact.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'It depends on mode and lane. Rough guidance: air freight into Dubai is 1–5 days, GCC road freight is 1–3 days, ocean FCL is 2–6 weeks for intercontinental lanes and days for regional. We share a realistic ETA before you book so there are no surprises.',
  },
  {
    question: 'Can you arrange door-to-door delivery?',
    answer:
      "Yes — across every mode. Origin pickup, export clearance, main transport, import clearance, and final-mile delivery to your warehouse or customer. You get one shipment reference and one team accountable end-to-end.",
  },
];

type Props = { items?: FaqItem[] };

export default function Faq({ items = defaultFaqs }: Props) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 dark:divide-slate-800">
      {items.map((item) => (
        <details
          key={item.question}
          className="group py-5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-900 dark:text-white">
            <span>{item.question}</span>
            <ChevronDown
              size={20}
              className="shrink-0 text-brand-royal transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
