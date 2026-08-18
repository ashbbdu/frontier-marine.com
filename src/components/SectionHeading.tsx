type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ kicker, title, subtitle, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {kicker && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-royal">
          {kicker}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-brand-navy dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>
      )}
    </div>
  );
}
