# Frontier Maritime MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a responsive, dark/light-themed 4-page marketing site for Frontier Maritime with a global floating WhatsApp button, a demo shipment tracker, and a `mailto:` contact form. No backend.

**Architecture:** Vite + React 18 + TypeScript SPA with `react-router-dom` for 4 routes. Global chrome (Navbar, Footer, WhatsAppButton) wraps a routed page area in `App.tsx`. Theme state lives in a small `ThemeContext` that toggles `class="dark"` on `<html>`; Tailwind runs in `class` dark-mode strategy. All contact details, WhatsApp number, and default message live in `src/config/site.ts` so the user can swap them in one place.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS 3, react-router-dom 6, lucide-react, Node 18+.

## Global Constraints

- **Package manager:** npm (single lockfile).
- **Node:** ≥18.
- **Framework versions:** Vite `^5`, React `^18`, TypeScript `^5`, Tailwind `^3`, react-router-dom `^6`, lucide-react `latest`.
- **Dark mode strategy:** Tailwind `darkMode: 'class'`; class toggled on `<html>`.
- **Theme palette (from spec):** navy `#1E3A8A`, royal blue `#2563EB`, accent light blue `#93C5FD`.
- **No backend, no auth, no analytics, no i18n, no test framework** (manual verification only for MVP, per spec "Out of scope").
- **Every hard-coded contact detail** (WhatsApp number, email, phone, address, social links, default message) must be sourced from `src/config/site.ts` — never inlined in components.
- **WhatsApp link format:** `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}` (number in E.164 with no leading `+`).
- **Placeholder WhatsApp number:** `15550000000`.
- **Copy is written by the implementer** (no client-supplied copy). English only.
- **Responsive breakpoints:** mobile-first, `md` (≥768px), `lg` (≥1024px).
- **Tap targets:** ≥44px on mobile.
- **Commit style:** Conventional Commits (`feat:`, `chore:`, `style:`, etc.).
- **Verification:** manual browser check at 375px and 1440px viewports; `npm run build` must succeed with no TS errors.

---

## File Structure

```
frontier/
├── index.html                      # Vite entry, sets <title>, dark-mode-safe bg
├── package.json                    # Deps + scripts
├── vite.config.ts                  # Vite + React plugin
├── tailwind.config.js              # darkMode:'class', color tokens, content globs
├── postcss.config.js               # tailwindcss + autoprefixer
├── tsconfig.json                   # Strict TS
├── tsconfig.node.json              # For vite.config.ts
├── public/
│   └── logo.png                    # Copied from user's Downloads folder
└── src/
    ├── main.tsx                    # ReactDOM root, imports index.css
    ├── App.tsx                     # BrowserRouter + Navbar + Routes + Footer + WhatsAppButton
    ├── index.css                   # Tailwind directives + minor globals
    ├── vite-env.d.ts               # Vite type refs
    ├── config/
    │   └── site.ts                 # Single source of truth for contact info
    ├── context/
    │   └── ThemeContext.tsx        # theme + toggle, localStorage persistence
    ├── components/
    │   ├── Navbar.tsx              # Sticky top nav + hamburger + ThemeToggle
    │   ├── Footer.tsx              # Logo, links, contact, social, copyright
    │   ├── ThemeToggle.tsx         # Sun/Moon button, calls useTheme().toggle
    │   ├── WhatsAppButton.tsx      # Fixed bottom-right circular link
    │   ├── ServiceCard.tsx         # Icon + title + description + "Learn more"
    │   ├── SectionHeading.tsx      # Kicker + title + optional subtitle
    │   └── Tracker.tsx             # Input + mocked timeline
    └── pages/
        ├── Home.tsx                # Hero, ServicesGrid, Stats, AboutSnippet, Tracker, WhyUs, ContactCTA
        ├── About.tsx               # Story, Mission, Values, Team placeholder
        ├── Services.tsx            # Detailed section per service
        └── Contact.tsx             # Form (mailto) + contact block + WhatsApp CTA + map iframe
```

Files that change together live together. Each component has one clear responsibility. Pages compose from `components/`; components read from `config/site.ts` and `context/ThemeContext.tsx`.

---

## Task 1: Scaffold project + install deps + Tailwind + logo

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/index.css`, `src/vite-env.d.ts`, `public/logo.png`
- Also creates a minimal `src/App.tsx` placeholder to make the app boot.

**Interfaces:**
- Consumes: nothing (this is the base task).
- Produces: a bootable Vite app, Tailwind classes usable in JSX, `import logo from '/logo.png'` (via `public/`).

- [ ] **Step 1: Initialize the Vite project in-place**

Run from `/Users/ashishsrivastava/Documents/Personal/projects/frontier/`:

```bash
npm create vite@latest . -- --template react-ts
```

If prompted about non-empty directory (the `docs/` folder exists), choose "Ignore files and continue". Do NOT overwrite `docs/`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
```

- [ ] **Step 3: Initialize Tailwind**

```bash
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 4: Configure Tailwind**

Overwrite `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1E3A8A',
          royal: '#2563EB',
          light: '#93C5FD',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Replace `src/index.css` with Tailwind directives + a couple of base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
body { @apply bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased; }
```

- [ ] **Step 6: Update `index.html`**

Set title and preconnect Inter from Google Fonts:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontier Maritime — Global Logistics</title>
    <meta name="description" content="Frontier Maritime provides ocean, air, land freight and customs clearance across the globe." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Copy the logo to `public/logo.png`**

```bash
cp "/Users/ashishsrivastava/Downloads/logo-10a-stepped-load/frontier-maritime-stepped-load.png" public/logo.png
```

- [ ] **Step 8: Replace `src/App.tsx` with a minimal placeholder so the app boots**

```tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-brand-navy dark:text-brand-light">
        Frontier Maritime — scaffold OK
      </h1>
    </div>
  );
}
```

Delete `src/App.css` if the Vite template created it. Keep `src/main.tsx` as generated (it imports `./index.css` and renders `<App />`).

- [ ] **Step 9: Verify dev server boots**

```bash
npm run dev
```

Expected: opens on `http://localhost:5173/` and shows "Frontier Maritime — scaffold OK" styled in navy. Kill the server after confirming.

- [ ] **Step 10: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + React + TS + Tailwind with logo"
```

*(If `git init` was already done elsewhere, skip it. A `.gitignore` should already exist from Vite's template; verify `node_modules/` and `dist/` are ignored.)*

---

## Task 2: Site config + ThemeContext + App shell with router

**Files:**
- Create: `src/config/site.ts`, `src/context/ThemeContext.tsx`
- Modify: `src/main.tsx`, `src/App.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces:
  - `site` object from `src/config/site.ts` with `{ name, tagline, whatsappNumber, whatsappDefaultMessage, email, phone, address, social }`
  - `ThemeProvider` React component (wraps children)
  - `useTheme()` hook returning `{ theme: 'light' | 'dark', toggle: () => void }`
  - Router with routes `/`, `/about`, `/services`, `/contact` — each mapped to a placeholder page component defined inline for now.

- [ ] **Step 1: Create `src/config/site.ts`**

```ts
export const site = {
  name: 'Frontier Maritime',
  tagline: 'Global Logistics',
  whatsappNumber: '15550000000',
  whatsappDefaultMessage:
    "Hi Frontier Maritime, I'd like to know more about your freight forwarding services.",
  email: 'info@frontiermaritime.example',
  phone: '+1 (555) 000-0000',
  address: '123 Port Avenue, Global City',
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
};

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;
```

- [ ] **Step 2: Create `src/context/ThemeContext.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
```

- [ ] **Step 3: Wrap the app in `<ThemeProvider>` and `<BrowserRouter>`**

Overwrite `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
```

- [ ] **Step 4: Replace `src/App.tsx` with routing shell (placeholder pages inline)**

```tsx
import { Route, Routes } from 'react-router-dom';

const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl font-semibold text-brand-navy dark:text-brand-light">{title}</h1>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder title="Home" />} />
      <Route path="/about" element={<Placeholder title="About" />} />
      <Route path="/services" element={<Placeholder title="Services" />} />
      <Route path="/contact" element={<Placeholder title="Contact" />} />
      <Route path="*" element={<Placeholder title="404 — Not Found" />} />
    </Routes>
  );
}
```

- [ ] **Step 5: Verify routing + theming works**

Run `npm run dev`. In the browser:
- Visit `/`, `/about`, `/services`, `/contact` — each shows its placeholder heading.
- Open DevTools console: run `document.documentElement.classList.add('dark')` → body should darken. Remove class → back to light.
- Reload — theme preference (if any) restored from `localStorage`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add site config, ThemeContext, and router shell"
```

---

## Task 3: Global chrome — Navbar, Footer, WhatsAppButton, ThemeToggle

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/ThemeToggle.tsx`, `src/components/WhatsAppButton.tsx`
- Modify: `src/App.tsx` (wrap routes with chrome)

**Interfaces:**
- Consumes: `site` from `src/config/site.ts`, `whatsappHref` helper, `useTheme()` hook.
- Produces: `<Navbar />`, `<Footer />`, `<WhatsAppButton />`, `<ThemeToggle />` — all default exports. `App.tsx` now renders `<Navbar />` above `<main>` and `<Footer />` + `<WhatsAppButton />` below.

- [ ] **Step 1: Create `src/components/ThemeToggle.tsx`**

```tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

- [ ] **Step 2: Create `src/components/Navbar.tsx`**

```tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../config/site';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt={`${site.name} logo`} className="h-9 w-auto" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide text-brand-navy dark:text-white">
              {site.name.toUpperCase()}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-royal">
              {site.tagline}
            </span>
          </span>
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
                    : 'text-slate-700 hover:text-brand-royal dark:text-slate-200'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base font-medium ${
                    isActive ? 'text-brand-royal' : 'text-slate-800 dark:text-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Create `src/components/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { site } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-9 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-brand-navy dark:text-white">
                {site.name.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-royal">
                {site.tagline}
              </span>
            </div>
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
```

- [ ] **Step 4: Create `src/components/WhatsAppButton.tsx`**

```tsx
import { MessageCircle } from 'lucide-react';
import { whatsappHref } from '../config/site';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40 transition hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
```

- [ ] **Step 5: Wire chrome into `src/App.tsx`**

```tsx
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const Placeholder = ({ title }: { title: string }) => (
  <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
    <h1 className="text-3xl font-bold text-brand-navy dark:text-brand-light">{title}</h1>
  </div>
);

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Placeholder title="Home" />} />
          <Route path="/about" element={<Placeholder title="About" />} />
          <Route path="/services" element={<Placeholder title="Services" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="*" element={<Placeholder title="404 — Not Found" />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

- [ ] **Step 6: Verify in browser**

Run `npm run dev`. Check:
- Navbar renders with logo, links, and theme toggle.
- Theme toggle flips background/text and persists after reload.
- Footer visible at bottom of every page.
- WhatsApp button visible bottom-right; clicking opens `wa.me/15550000000?text=Hi%20Frontier%20Maritime%2C...` in a new tab.
- Resize to <768px: hamburger appears; opening it shows nav links stacked.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Navbar, Footer, WhatsApp button, and theme toggle"
```

---

## Task 4: Shared UI atoms — SectionHeading, ServiceCard, Tracker

**Files:**
- Create: `src/components/SectionHeading.tsx`, `src/components/ServiceCard.tsx`, `src/components/Tracker.tsx`

**Interfaces:**
- Consumes: nothing beyond React + lucide.
- Produces:
  - `<SectionHeading kicker?: string; title: string; subtitle?: string; align?: 'left' | 'center' />`
  - `<ServiceCard icon: LucideIcon; title: string; description: string; to?: string />`
  - `<Tracker />` — self-contained input + mocked timeline.

- [ ] **Step 1: Create `src/components/SectionHeading.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/components/ServiceCard.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `src/components/Tracker.tsx`**

```tsx
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

// UI-only demo: everything through "port" is done, "out" is in progress, "delivered" is pending.
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
```

- [ ] **Step 4: Commit (no visual check yet — these render inside pages)**

```bash
git add -A
git commit -m "feat: add SectionHeading, ServiceCard, and Tracker components"
```

---

## Task 5: Home page

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx` (swap Home placeholder for real page)

**Interfaces:**
- Consumes: `SectionHeading`, `ServiceCard`, `Tracker`, `site`, `whatsappHref`, lucide icons.
- Produces: exported `Home` component with sections: Hero, Services grid, Stats strip, About snippet, Tracker, Why choose us, Contact CTA.

- [ ] **Step 1: Create `src/pages/Home.tsx`**

```tsx
import { Link } from 'react-router-dom';
import {
  Ship, Plane, Truck, FileCheck2,
  Anchor, Globe2, ShieldCheck, Clock,
  ArrowRight, MessageCircle,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import Tracker from '../components/Tracker';
import { site, whatsappHref } from '../config/site';

const services = [
  { icon: Ship, title: 'Ocean Freight', description: 'FCL and LCL sea shipping to 200+ ports with vetted carriers and door-to-door options.' },
  { icon: Plane, title: 'Air Freight', description: 'Express and standard air cargo when the calendar matters more than the invoice.' },
  { icon: Truck, title: 'Land Transport', description: 'Cross-border trucking and last-mile road freight across major trade corridors.' },
  { icon: FileCheck2, title: 'Customs & Warehousing', description: 'Brokerage, documentation, and bonded storage handled by a team that speaks the paperwork.' },
];

const stats = [
  { value: '10K+', label: 'Shipments delivered' },
  { value: '50+', label: 'Countries served' },
  { value: '200+', label: 'Port coverage' },
  { value: '99.4%', label: 'On-time rate' },
];

const perks = [
  { icon: Globe2, title: 'Global network', text: 'Partners on every major trade lane, coordinated from a single point of contact.' },
  { icon: ShieldCheck, title: 'Cargo you can trust', text: 'Insured, tracked, and documented — every leg of the journey.' },
  { icon: Clock, title: 'Transit you can plan', text: 'Realistic ETAs, proactive updates, no surprises at the port.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-royal to-brand-navy text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Anchor size={14} /> Freight forwarding, simplified
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Your cargo, <span className="text-brand-light">every ocean.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              {site.name} moves goods across sea, sky, and land — with the transparency and speed
              modern supply chains demand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center">
              <img src="/logo.png" alt="" className="w-2/3 opacity-90 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading kicker="What we do" title="End-to-end freight forwarding" subtitle="Four service lines, one accountable partner." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4 md:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-brand-light">{s.value}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <SectionHeading align="left" kicker="Who we are" title="A logistics partner built for modern trade" subtitle="We combine deep freight expertise with a customer-first operating model — so your shipments arrive on time, on budget, and without the surprises." />
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal">
            Read our story <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy dark:bg-brand-royal/20 dark:text-brand-light">
                <p.icon size={18} />
              </div>
              <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracker */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-6">
          <SectionHeading kicker="Live status" title="Where's my cargo?" subtitle="Enter a tracking number to see a demo of our shipment timeline." />
          <div className="mt-10">
            <Tracker />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-royal p-10 text-white md:p-14">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to move your next shipment?</h3>
              <p className="mt-2 text-white/80">Tell us where it's going. We'll take it from there.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-light transition">Contact us</Link>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Wire in `App.tsx`**

Replace the `<Placeholder title="Home" />` route with `<Home />`. Add the import at top.

```tsx
import Home from './pages/Home';
// ...
<Route path="/" element={<Home />} />
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, visit `/`. Check:
- Hero renders with gradient, headline, CTAs.
- Services grid: 4 cards, responsive (1 col mobile → 2 → 4).
- Stats strip visible.
- About snippet + 3 perk cards.
- Tracker section: submit demo number → timeline renders with one "In progress" step.
- Contact CTA at bottom.
- All colors flip correctly in dark mode.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement Home page"
```

---

## Task 6: About page

**Files:**
- Create: `src/pages/About.tsx`
- Modify: `src/App.tsx` (swap About placeholder)

**Interfaces:**
- Consumes: `SectionHeading`, `site`, lucide icons.
- Produces: exported `About` component with Story, Mission, Values (3 cards), Team placeholder.

- [ ] **Step 1: Create `src/pages/About.tsx`**

```tsx
import { Compass, HeartHandshake, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
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
              What started as a small brokerage in a single port city has grown into a global forwarding
              partner spanning 50+ countries. Along the way, one thing hasn't changed: our belief that
              every shipment is a promise.
            </p>
            <p>
              Today, we handle ocean, air, and land freight for growing brands, established manufacturers,
              and everyone in between — with the same attention we gave our very first customer.
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
        <SectionHeading kicker="Our team" title="Operators who've done this before" subtitle="A group of freight veterans, tech builders, and customer champions — full team profiles coming soon." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-brand-navy to-brand-royal" />
              <div className="font-semibold text-slate-900 dark:text-white">Team Member</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Role</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Wire in `App.tsx`**

Import `About` and replace the `/about` route element.

- [ ] **Step 3: Verify + commit**

Run `npm run dev`, visit `/about`. Check hero, story/mission, values grid, team placeholder — all responsive, all themed.

```bash
git add -A
git commit -m "feat: implement About page"
```

---

## Task 7: Services page

**Files:**
- Create: `src/pages/Services.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `site`, `whatsappHref`, lucide icons.
- Produces: exported `Services` component with hero + 4 detailed service sections (alternating layout) + CTA.

- [ ] **Step 1: Create `src/pages/Services.tsx`**

```tsx
import { Ship, Plane, Truck, FileCheck2, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { whatsappHref } from '../config/site';

const services = [
  {
    icon: Ship,
    title: 'Ocean Freight (FCL & LCL)',
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
    description:
      'Cross-border trucking and last-mile delivery across major trade corridors, integrated cleanly with your ocean and air legs.',
    features: [
      'FTL and LTL road freight',
      'Cross-border customs coordination',
      'Refrigerated and specialized equipment',
      'Real-time milestone updates',
    ],
  },
  {
    icon: FileCheck2,
    title: 'Customs Clearance & Warehousing',
    description:
      'Licensed brokerage, complete documentation, and bonded warehousing — so your goods clear cleanly and store safely between legs.',
    features: [
      'Import and export customs brokerage',
      'HS classification and duty consulting',
      'Bonded and general warehousing',
      'Pick-pack, kitting, and fulfillment ready',
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
            <div className="rounded-3xl bg-gradient-to-br from-brand-navy/10 to-brand-royal/10 p-10 dark:from-brand-navy/30 dark:to-brand-royal/20 aspect-video flex items-center justify-center">
              <s.icon size={96} className="text-brand-royal opacity-60" />
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-royal p-10 text-white md:p-14">
          <SectionHeading kicker="Let's talk" title="Not sure which service you need?" subtitle="Send us the shipment details — we'll recommend the right mode and get you a quote." />
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
```

Note: The `SectionHeading` inside the CTA card renders on a dark gradient — its default navy title will look poor. Wrap it in a container that overrides color, OR use inline markup instead. Use inline markup: replace the `<SectionHeading .../>` call inside the CTA card with:

```tsx
<div className="text-center max-w-3xl mx-auto">
  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">Let's talk</div>
  <h2 className="text-3xl md:text-4xl font-bold">Not sure which service you need?</h2>
  <p className="mt-4 text-base md:text-lg text-white/80">Send us the shipment details — we'll recommend the right mode and get you a quote.</p>
</div>
```

- [ ] **Step 2: Wire in `App.tsx`**

Import `Services` and replace the `/services` route element.

- [ ] **Step 3: Verify + commit**

Run `npm run dev`, visit `/services`. Check alternating layout, feature bullets, CTA readable on gradient.

```bash
git add -A
git commit -m "feat: implement Services page"
```

---

## Task 8: Contact page

**Files:**
- Create: `src/pages/Contact.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `site`, `whatsappHref`, lucide icons.
- Produces: exported `Contact` component with contact info block, form (mailto), WhatsApp CTA, and map iframe placeholder.

- [ ] **Step 1: Create `src/pages/Contact.tsx`**

```tsx
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
            title="Office location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.97%2C40.73&layer=mapnik"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Wire in `App.tsx`**

Import `Contact` and replace the `/contact` route element.

- [ ] **Step 3: Verify in browser**

Visit `/contact`. Check:
- Contact info block + WhatsApp block on left; form on right (stacked on mobile).
- Submit with empty fields → validation errors show.
- Submit with valid values → email client opens with `To`, `Subject`, `Body` populated.
- Map iframe renders.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement Contact page with mailto form and map"
```

---

## Task 9: Final polish + verification

**Files:**
- Possibly minor tweaks in any file discovered during smoke test.

**Interfaces:**
- No new interfaces.

- [ ] **Step 1: Full smoke test**

Run `npm run dev` and walk through every route in the browser at both **375px** (mobile) and **1440px** (desktop) viewports (Chrome DevTools device toolbar):

- `/` — hero, services, stats, about snippet, tracker (submit demo number, timeline appears), CTA.
- `/about` — hero, story, mission, values, team.
- `/services` — hero, 4 alternating service sections, CTA.
- `/contact` — contact block, form (test validation + successful mailto trigger), map.
- Toggle dark ↔ light on every page; reload; theme persists.
- Click WhatsApp floating button on every page — opens correct `wa.me` link with pre-filled message.
- Hamburger menu on mobile opens/closes; nav links work and close menu on click.
- All internal links navigate correctly.

- [ ] **Step 2: Production build check**

```bash
npm run build
```

Expected: builds with no TypeScript errors, output in `dist/`.

```bash
npm run preview
```

Open the preview URL, repeat a lightweight smoke test on the built bundle.

- [ ] **Step 3: Fix any issues found**

If any visual glitch, TS error, or broken link is found, fix inline and re-verify. Then:

```bash
git add -A
git commit -m "fix: address issues found in final smoke test"
```

(Skip this commit if nothing needed fixing.)

- [ ] **Step 4: Tag MVP**

```bash
git tag mvp-v0.1
```

---

## Self-review notes

- **Spec coverage:** Every section of the design doc (theming, config, pages, global components, tracker behavior, contact-form behavior, responsive, success criteria) is implemented across Tasks 1–8; Task 9 covers the success-criteria verification.
- **Placeholders:** None — WhatsApp number `15550000000` is intentionally the spec's placeholder, documented as such, and lives in one config file for easy swap.
- **Type consistency:** `site` object keys, `whatsappHref()` helper name, component prop names (`icon`, `title`, `description`, `to`, `kicker`, `subtitle`, `align`) are used identically across pages that consume them.
- **Testing:** Spec explicitly lists automated testing as out of scope for MVP; manual verification steps are embedded in each task.
