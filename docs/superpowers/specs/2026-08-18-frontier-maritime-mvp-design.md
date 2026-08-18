# Frontier Maritime — Website MVP Design

**Date:** 2026-08-18
**Status:** Approved for planning

## Purpose

A responsive marketing website for **Frontier Maritime — Global Logistics**, a freight forwarding company. The MVP presents the company, its four service lines, a demo shipment tracker, and provides two contact paths: an email contact form and a floating WhatsApp button with a pre-filled default message. Copy is written in-house by the implementer (no client-supplied copy yet). Dark and light modes ship together. No backend.

## Non-goals

- Real shipment tracking (UI only, mocked timeline).
- Real form submission backend (uses `mailto:`).
- Authentication, quoting engine, CMS, or blog.
- Multi-language / i18n (English only for MVP).
- Analytics wiring (can be added post-MVP).

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (with `darkMode: 'class'`)
- **react-router-dom** for the 4 routes
- **lucide-react** for icons
- No other UI or component libraries
- Node 18+; deploys as a static SPA (Netlify, Vercel, or any static host)

## Theming

Palette derived from the supplied logo:

| Token | Hex | Use |
|---|---|---|
| `primary` (navy) | `#1E3A8A` | Wordmark, headings, primary buttons |
| `secondary` (royal blue) | `#2563EB` | Links, hover, accents |
| `accent` (light blue) | `#93C5FD` | Highlights, tags, subtle backgrounds |
| `bg-light` | `#FFFFFF` / `slate-50` | Light-mode surfaces |
| `bg-dark` | `slate-950` / `slate-900` | Dark-mode surfaces |
| `text-light` | `slate-900` | Light-mode body |
| `text-dark` | `slate-100` | Dark-mode body |

- Tailwind `darkMode: 'class'`.
- `ThemeContext` provides `theme` and `toggle()`; persists to `localStorage['theme']`.
- On first load: read `localStorage` → else `prefers-color-scheme`.
- `<ThemeToggle />` in navbar swaps a Sun/Moon icon.

## Site configuration (single source of truth)

`src/config/site.ts` — every hard-coded contact detail lives here so the user can swap in one place later:

```ts
export const site = {
  name: 'Frontier Maritime',
  tagline: 'Global Logistics',
  whatsappNumber: '15550000000',           // placeholder (E.164 no '+')
  whatsappDefaultMessage:
    "Hi Frontier Maritime, I'd like to know more about your freight forwarding services.",
  email: 'info@frontiermaritime.example',
  phone: '+1 (555) 000-0000',
  address: '123 Port Avenue, Global City',
  social: { linkedin: '#', twitter: '#', facebook: '#' },
};
```

WhatsApp link format: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMessage)}`.

## Pages & routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Hero, services grid, stats strip, about snippet, demo tracker, why-choose-us, contact CTA |
| `/about` | `About` | Story, mission, values (3 cards), team placeholder |
| `/services` | `Services` | Detailed section per service (icon, description, feature bullets) |
| `/contact` | `Contact` | Contact form (mailto), contact block (phone/email/address), WhatsApp CTA, map iframe placeholder |

## Global components

- **`Navbar`** — sticky top, logo + wordmark on left, links + `ThemeToggle` on right, hamburger below `md`.
- **`Footer`** — logo, quick links, contact block, social icon placeholders, copyright.
- **`WhatsAppButton`** — fixed bottom-right (`right-6 bottom-6`), circular, WhatsApp green (`#25D366`), opens `wa.me` link with the default message. Present on every page.
- **`ThemeToggle`** — button that toggles `class="dark"` on `<html>`.
- **`ServiceCard`** — icon, title, short description, "Learn more" link.
- **`SectionHeading`** — reusable heading with kicker + title + optional subtitle.
- **`Tracker`** — input + submit; on submit, renders a mocked vertical timeline with statuses `Booked → Picked up → In transit → At port → Out for delivery → Delivered`, with one step marked "in progress" and the rest "completed" or "pending".

## Services (copy will be written by implementer)

1. **Ocean Freight (FCL / LCL)** — full and less-than container load sea shipping.
2. **Air Freight** — express and standard international air cargo.
3. **Land / Road Transport** — trucking and cross-border road freight.
4. **Customs Clearance & Warehousing** — brokerage, documentation, bonded warehousing.

Each service on `/services` gets: icon (`lucide-react`), title, 2–3 sentence description, 4–5 feature bullets.

## Responsive behavior

- Mobile-first Tailwind: base styles for mobile, `md` (≥768) for tablet, `lg` (≥1024) for desktop.
- Hero stacks vertically on mobile, side-by-side on `md+`.
- Service grid: 1 col mobile → 2 col `md` → 4 col `lg`.
- Navbar collapses to hamburger under `md`.
- All tap targets ≥44px on mobile.

## File layout

```
frontier/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── public/
│   └── logo.png              # copied from user's Downloads folder
└── src/
    ├── main.tsx
    ├── App.tsx                # BrowserRouter + routes + Navbar + Footer + WhatsAppButton
    ├── index.css              # Tailwind directives + a few CSS vars
    ├── config/
    │   └── site.ts
    ├── context/
    │   └── ThemeContext.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── ThemeToggle.tsx
    │   ├── WhatsAppButton.tsx
    │   ├── ServiceCard.tsx
    │   ├── SectionHeading.tsx
    │   └── Tracker.tsx
    └── pages/
        ├── Home.tsx
        ├── About.tsx
        ├── Services.tsx
        └── Contact.tsx
```

## Contact form behavior

- Fields: `name`, `email`, `message` (all required).
- Basic client-side validation (non-empty, valid email regex).
- On submit: build `mailto:${site.email}?subject=...&body=...` and `window.location.href = ...`.
- Below the form, a divider and a "Prefer WhatsApp?" button linking to the same `wa.me` URL as the floating button.

## Success criteria

- All 4 routes render without errors on desktop and mobile viewports.
- Theme toggle switches every surface; preference persists across reloads.
- WhatsApp floating button opens `wa.me` with the default message pre-filled (verify by clicking).
- Contact form opens the user's mail client with subject and body populated.
- Demo tracker renders the mock timeline when a tracking number is submitted.
- Layout is usable at 375px width (mobile) and 1440px width (desktop).
- Site builds cleanly with `npm run build` and previews with `npm run preview`.

## Out of scope for this design

- SEO meta tags beyond a basic `<title>` and description.
- Sitemap, robots.txt.
- Image optimization pipeline.
- Testing framework (manual verification only for MVP).
- Deployment configuration.
