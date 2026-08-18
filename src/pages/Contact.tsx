import { FormEvent, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { site, whatsappHref } from '../config/site';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-royal text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">Contact</div>
            <h1 className="text-4xl md:text-5xl font-extrabold">Let's get your cargo moving.</h1>
            <p className="mt-5 text-lg text-white/80">
              Tell us about your shipment. We'll respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reach us directly</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-brand-royal" />{site.address}</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-brand-royal" /><a href={`tel:${site.phone}`} className="hover:text-brand-royal">{site.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-brand-royal" /><a href={`mailto:${site.email}`} className="hover:text-brand-royal">{site.email}</a></li>
            </ul>
          </div>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-whatsapp p-6 text-white transition hover:brightness-110"
          >
            <div>
              <div className="text-sm uppercase tracking-widest opacity-90">Prefer WhatsApp?</div>
              <div className="mt-1 text-lg font-semibold">Chat with us instantly</div>
            </div>
            <MessageCircle size={28} />
          </a>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Origin, destination, cargo type, weight, and anything else we should know."
              />
            </label>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-royal px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy"
            >
              <Send size={16} /> Send message
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <iframe
            title="Office location — Jebel Ali, Dubai"
            src="https://www.openstreetmap.org/export/embed.html?bbox=55.04%2C24.98%2C55.13%2C25.03&layer=mapnik&marker=25.0075,55.088"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
