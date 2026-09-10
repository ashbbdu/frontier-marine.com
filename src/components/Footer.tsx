import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { site } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt={`${site.name} — ${site.tagline}`}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Moving cargo across oceans, skies, and continents — with the reliability your business
            runs on.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/about" className="hover:text-brand-royal">About</Link></li>
            <li><Link to="/services" className="hover:text-brand-royal">Services</Link></li>
            <li><Link to="/contact" className="hover:text-brand-royal">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" />{site.address}</li>
            <li className="flex items-center gap-2"><Phone size={16} /><a href={`tel:${site.phone}`} className="hover:text-brand-royal">{site.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={16} /><a href={`mailto:${site.email}`} className="hover:text-brand-royal">{site.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Follow</h4>
          <div className="flex gap-3">
            <a href={site.social.linkedin} aria-label="LinkedIn" className="rounded-full border border-slate-300 p-2 hover:text-brand-royal dark:border-slate-700"><Linkedin size={16} /></a>
            <a href={site.social.twitter} aria-label="Twitter" className="rounded-full border border-slate-300 p-2 hover:text-brand-royal dark:border-slate-700"><Twitter size={16} /></a>
            <a href={site.social.facebook} aria-label="Facebook" className="rounded-full border border-slate-300 p-2 hover:text-brand-royal dark:border-slate-700"><Facebook size={16} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 md:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
