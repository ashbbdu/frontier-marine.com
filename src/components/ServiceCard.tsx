import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
};

export default function ServiceCard({ icon: Icon, title, description, to = '/services' }: Props) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
        <Icon size={22} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-royal group-hover:gap-2 transition-all"
      >
        Learn more <ArrowRight size={16} />
      </Link>
    </div>
  );
}
