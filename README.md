# iConnect Pre-Owned

A premium, Apple-inspired storefront for certified pre-owned iPhones, Samsung Galaxy devices, iPads, Apple Watches, AirPods and MacBooks — built for the South African market.

Built with **Next.js 15** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS** · **Framer Motion** · **Supabase** · **Stripe + PayFast** · **Cloudinary**

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local   # fill in the values you have — see section 3
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The storefront runs immediately on **mock data** (`src/lib/mock-data.ts`) — you don't need any API keys to browse, search, filter, add to cart/wishlist, run the trade-in flow, or view the admin dashboard.

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint        # ESLint
npm run type-check  # TypeScript only, no emit
```

This codebase was built and verified with a real `npm install` + `next build` — 53 routes compiling cleanly, all 23 demo products statically generated via `generateStaticParams`.

---

## 2. What's wired vs. what's mock data

Being upfront about this matters more than it looks impressive, so here's exactly where things stand:

| Area | Status |
|---|---|
| UI, pages, animations, cart/wishlist/compare/recently-viewed | **Fully real**, working client-side state (persisted to `localStorage`) |
| Product catalog, reviews, FAQs, team, orders shown on `/account` and `/admin` | **Mock data** in `src/lib/mock-data.ts` — swap for Supabase queries (schema below is ready) |
| Supabase client/server setup + full SQL schema with Row Level Security | **Real code**, needs your project URL + keys to connect |
| Stripe checkout session + webhook handler | **Real code**, needs your Stripe keys — see the payments note below |
| PayFast checkout payload + ITN webhook | **Real code**, needs your PayFast merchant credentials |
| Cloudinary URL helper | **Real code**, needs your cloud name once you upload real product photos |
| Resend email templates (order confirmation, quote confirmation, newsletter) | **Real code**, needs a `RESEND_API_KEY` |
| Authentication | **Not implemented.** `/account` shows a realistic mock signed-in state. Supabase Auth is the natural fit (the middleware and server client are already set up for it) — see section 6 |
| Admin product editing | UI only (search/sort works against mock data). Add/edit buttons are present but not wired to a mutation yet |

Nothing here is faked to look more finished than it is — every "not yet real" item above is a genuine next step, not a hidden limitation.

---

## 3. Environment variables

All variables are documented in `.env.example`. Copy it to `.env.local` and fill in what you have — the site degrades gracefully and keeps using mock data for anything left blank.

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_WHATSAPP_NUMBER          # digits only, e.g. 27821234567

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

NEXT_PUBLIC_PAYFAST_MERCHANT_ID
PAYFAST_MERCHANT_KEY
PAYFAST_PASSPHRASE
NEXT_PUBLIC_PAYFAST_MODE             # "sandbox" or "live"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

RESEND_API_KEY
EMAIL_FROM
```

---

## 4. Payments — an important note for a South African business

**Stripe does not currently support payouts to South African-registered businesses directly.** It's only reachable from South Africa via Stripe's "Paystack extended network" arrangement or by incorporating a foreign entity — neither is a realistic default for most local sellers.

Because of that, this codebase ships **two** payment integrations:

- **PayFast** (`src/lib/payfast.ts`) — the recommended, primary gateway. It's the dominant South African processor, supports cards, Instant EFT, and local wallets, and settles to a South African bank account. It works as a signed form POST rather than a hosted API session; `buildPayfastPayload()` returns the exact fields to submit.
- **Stripe** (`src/lib/stripe.ts`) — included because it was requested and is genuinely useful if you serve international customers or later incorporate an entity where Stripe is supported.

The checkout page (`/checkout`) lets the customer choose between them, defaulting to PayFast. Swap the default in `src/app/checkout/page.tsx` if your mix of customers differs.

Other established South African gateways worth comparing before you commit: **Yoco**, **Ozow**, **Peach Payments**, and **PayGate**.

---

## 5. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `src/lib/supabase/schema.sql` — it creates every table this app expects (`products`, `reviews`, `orders`, `order_items`, `wishlists`, `device_quote_requests`, `repair_bookings`, `financing_applications`, `newsletter_subscribers`, `contact_messages`, `profiles`), all with Row Level Security policies already applied.
3. Copy your Project URL and anon key into `.env.local`.
4. To go fully live, replace the mock-data reads in `src/lib/mock-data.ts` call sites with Supabase queries — the shapes match exactly, so this is a targeted swap, not a rewrite. Every API route already has the relevant `supabase.from(...).insert(...)` call written out in a comment at the point it's needed.

---

## 6. Adding real authentication

`src/lib/supabase/client.ts`, `server.ts`, and `src/middleware.ts` are already set up correctly for Supabase Auth (SSR-safe cookie handling via `@supabase/ssr`). To turn on real accounts:

1. Enable email/password or an OAuth provider in the Supabase dashboard.
2. Build sign-in/sign-up forms calling `supabase.auth.signInWithPassword` / `signUp`.
3. Replace the mock profile in `src/components/shared/account-content.tsx` with a query against `auth.getUser()` and the `profiles` table.
4. Gate `/admin` behind a role check (add a `role` column to `profiles`, check it in `src/app/admin/layout.tsx`).

---

## 7. Images & Cloudinary

Every product currently renders through `<ProductImage>` (`src/components/product/product-image.tsx`) — a gradient-and-icon placeholder, one consistent treatment per device category, instead of stock photography. This was a deliberate choice: it means the entire UI is copyright-safe out of the box and doesn't depend on any external image host to look complete.

To switch to real photography:

1. Upload product photos to Cloudinary (folder suggestion: `iconnect-products/{product-slug}/1.jpg`).
2. Use `cloudinaryUrl(publicId, { width, height })` from `src/lib/cloudinary.ts` with `next/image` in place of `<ProductImage>`.
3. `next.config.mjs` already whitelists `res.cloudinary.com` in `images.remotePatterns`.

---

## 8. Project structure

```
src/
  app/                    Routes (App Router). One folder per page.
    api/                  Route handlers: checkout, webhooks, form submissions
    admin/                Admin dashboard (layout + dashboard + products + orders)
    product/[slug]/       Dynamic product detail page
  components/
    ui/                   Design-system primitives (Button, Badge, Accordion, Rating…)
    layout/               Navbar, Footer, Cart Drawer, WhatsApp button, theme toggle
    home/                 One component per homepage section
    product/               Product card, gallery, filters, compare bar, Health Ring…
    shared/                Multi-page pieces: quote flow, contact form, FAQ, account
  context/                 Cart / wishlist / compare / recently-viewed providers
  lib/
    mock-data.ts           Product catalog, reviews, FAQs, team, mock orders
    types.ts                Shared TypeScript types (mirrors schema.sql)
    supabase/               Client, server, service-role client, SQL schema
    stripe.ts / payfast.ts / cloudinary.ts / email.ts
  middleware.ts             Supabase session refresh
```

---

## 9. Design system notes

- Brand tokens live in `src/app/globals.css` as CSS variables (`--accent`, `--ink`, `--surface`, etc.), consumed by `tailwind.config.ts`. The accent blue shifts from `#007AFF` (light mode) to `#0A84FF` (dark mode) — the same shift Apple's own system blue makes.
- The recurring circular "Health Ring" motif (`src/components/product/health-ring.tsx`) ties the certification/battery-health story together across the hero, product gallery, trade-in flow and warranty section — it's the one deliberately bold visual signature; everything else stays quiet and typographic on purpose.
- Typography pairs **Inter Tight** (headlines, tight tracking) with **Inter** (body/UI), loaded via `next/font/google` — self-hosted at build time, no runtime request, no layout shift.
- Full dark mode via `next-themes`, toggle in the navbar and mobile menu.
- Every interactive element has a visible focus ring, all icon-only buttons have `aria-label`s, and animations respect `prefers-reduced-motion`.

---

## 10. Deployment

This is a standard Next.js app — deploys cleanly to **Vercel** (recommended, zero config) or any Node hosting that supports the Next.js runtime. Set the environment variables from section 3 in your hosting provider's dashboard, then point your Stripe/PayFast webhook URLs at `https://yourdomain/api/webhooks/stripe` and `https://yourdomain/api/webhooks/payfast`.

---

## 11. What's mock/placeholder content you'll want to replace

- Phone number, email, address and social links in the footer and Contact page
- Team bios on the About page
- Product prices, stock counts and descriptions (illustrative ZAR pricing)
- The WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
