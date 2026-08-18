import { FormEvent, useState } from 'react';
import { CheckCircle2, Circle, Loader2, PackageSearch } from 'lucide-react';

const STEPS = [
  { key: 'booked', label: 'Booked' },
  { key: 'pickup', label: 'Picked up' },
  { key: 'transit', label: 'In transit' },
  { key: 'port', label: 'At port' },
  { key: 'out', label: 'Out for delivery' },
  { key: 'delivered', label: 'Delivered' },
];

const CURRENT_INDEX = 4;

export default function Tracker() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(value.trim());
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
          <PackageSearch size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Track your shipment</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Enter your tracking number to see live status.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. FM-2026-000123"
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-royal px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy"
        >
          Track
        </button>
      </form>

      {submitted && (
        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Showing status for <span className="font-semibold text-slate-900 dark:text-white">{submitted}</span>
          </p>
          <ol className="space-y-4">
            {STEPS.map((s, i) => {
              const done = i < CURRENT_INDEX;
              const current = i === CURRENT_INDEX;
              return (
                <li key={s.key} className="flex items-start gap-3">
                  <span className="mt-0.5">
                    {done && <CheckCircle2 size={20} className="text-brand-royal" />}
                    {current && <Loader2 size={20} className="animate-spin text-brand-navy dark:text-brand-light" />}
                    {!done && !current && <Circle size={20} className="text-slate-300 dark:text-slate-600" />}
                  </span>
                  <div>
                    <div className={`text-sm font-medium ${done || current ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {s.label}
                    </div>
                    {current && <div className="text-xs text-brand-royal">In progress</div>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
