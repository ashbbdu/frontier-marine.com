import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';
import { site, whatsappHref } from '../config/site';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label={`${site.name} home`}>
            <img
              src="/logo.png"
              alt={`${site.name} — ${site.tagline}`}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-royal'
                      : 'text-slate-700 hover:text-brand-royal'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-whatsapp text-white"
            >
              <MessageCircle size={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed right-0 top-0 z-[70] flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <img
            src="/logo.png"
            alt={`${site.name} — ${site.tagline}`}
            className="h-10 w-auto"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto bg-white px-2 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-base font-medium transition ${
                  isActive
                    ? 'bg-brand-royal/10 text-brand-royal'
                    : 'text-slate-800 hover:bg-slate-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 mx-2 inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-3 text-base font-semibold text-white transition hover:brightness-110"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </nav>

        <div className="border-t border-slate-200 bg-white px-4 py-4 text-xs text-slate-500">
          <div>{site.address}</div>
          <div className="mt-1">{site.phone}</div>
        </div>
      </aside>
    </>
  );
}
