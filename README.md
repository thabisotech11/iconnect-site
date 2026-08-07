# iConnect Pre-Owned — Static Site

A plain HTML/CSS/JS build of the iConnect Pre-Owned storefront — no build step,
no framework, no npm install. Open `index.html` in a browser, or upload the
whole folder to any static host (Netlify, GitHub Pages, S3, cPanel, etc.).

This is a companion to the full **Next.js/React/TypeScript** version (in the
other download) — same design, same 10 pages, same content, rebuilt with
plain files for people who want to edit HTML/CSS directly or host it
somewhere that doesn't run Node.js.

## Structure

```
index.html              Home
shop.html                Shop (search, filters, sort)
product.html              Product detail — reads ?slug= from the URL
trade-in.html              Trade-In quote flow
sell-your-device.html       Sell Your Device quote flow
repairs.html                 Repairs pricing + booking form
financing.html                 Financing plans + calculator
about.html                       About Us
contact.html                      Contact form
faq.html                           FAQ accordion

css/style.css     Every style on every page — one shared stylesheet
js/data.js         Product catalogue, reviews, FAQs, team, and render helpers
js/main.js          Navbar, mobile menu, dark mode, scroll reveal, cart/wishlist demo counters
js/quote-flow.js     Shared step-by-step logic for trade-in.html and sell-your-device.html
```

Every page pulls from the same `js/data.js`, so editing a product's price or
a FAQ answer in one place updates it everywhere it appears.

## What works vs. what's a demo

- **Navigation, search, filtering, sorting, the trade-in/sell quote flow, the
  financing calculator, the FAQ accordion, dark mode, and all forms** are
  fully working client-side JavaScript — no backend required.
- **Cart and wishlist counters reset when you navigate to a new page.** This
  is a static multi-page site with no backend, and deliberately avoids
  `localStorage` (some preview/sandbox environments block it). If you deploy
  this for real and want the cart to persist across pages, open `js/main.js`
  and swap the two counter variables at the top of the "Cart / wishlist demo
  counters" section for `localStorage.getItem`/`setItem` calls — everything
  else already calls through those two functions, so it's a small, contained
  change.
- **Forms (contact, repair booking, trade-in/sell, newsletter) show a
  success state but don't send anywhere** — there's no backend here. Wire
  the `submit` handlers in each page's inline `<script>` to your own
  endpoint (or see the Next.js version, which has real API route handlers
  already written for these).
- **Product images are gradient + icon placeholders**, not photos — same
  approach as the Next.js version, and for the same reason: it looks
  intentional out of the box and carries zero copyright risk. Swap the
  `.product-art` divs for real `<img>` tags once you have product photography.

## Browser support

Modern CSS (custom properties, `aspect-ratio`, `backdrop-filter`) and
vanilla ES6+ JavaScript — works in current Chrome, Safari, Firefox and Edge.
No IE11 support.
