# Power Media — Courier &amp; Logistics

Modern, single-page marketing site for **Power Media Systems and Services**, a
Kolkata-based courier company. Built with Tailwind CSS, vanilla JS, and crafted
inline SVG. No runtime CDN — CSS is compiled and minified for fast, SEO-friendly
static hosting (e.g. Firebase Hosting).

## Stack

- **HTML** — `index.html` (semantic, responsive, with LocalBusiness JSON-LD for SEO)
- **Tailwind CSS** — source in `src/input.css`, compiled to `resources/css/tailwind.css`
- **JS** — `resources/js/main.js` (sticky nav, mobile menu, scroll reveals, animated route)
- Fonts: Archivo (display) + Hanken Grotesk (body), via Google Fonts

## Develop

```bash
npm install
npm run dev        # watch + rebuild CSS on change
```

Open `index.html` with any static server, e.g. `npx serve .`.

## Build for production

```bash
npm run build:css  # minified resources/css/tailwind.css
```

Deploy the repo as static files. Ship `index.html`, `resources/`, and the
compiled `resources/css/tailwind.css`; fonts load from Google Fonts.

## Deploy to Firebase Hosting

```bash
npm run build:css            # compile minified CSS first
firebase login
firebase init hosting        # or: firebase use <your-project-id>
firebase deploy --only hosting
```

`firebase.json` is already configured (public dir = repo root, clean URLs,
long-cache headers for images/CSS, no-cache for HTML, and an ignore list so
`src/`, `node_modules/`, configs and markdown are not deployed).

After first deploy, point the custom domain `www.powermediaservices.com` at the
site in the Firebase console (Hosting → Add custom domain).

## SEO checklist

Included in the repo:

- Unique `<title>`, meta description, canonical, `robots` meta
- Open Graph + Twitter cards with a generated `resources/img/og-cover.jpg` (1200×630)
- `MovingCompany` JSON-LD with address, phone, hours, area served
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`
- `robots.txt` + `sitemap.xml` (both reference the production domain)

Do after launch (off-page, the real ranking levers):

1. **Google Search Console** — verify the domain and submit `sitemap.xml`.
2. **Google Business Profile** — create/claim it; #1 driver for local courier search.
3. **Google Analytics 4** — replace the `G-XXXXXXXXXX` placeholder in `index.html`
   with your real Measurement ID.
4. Keep Name/Address/Phone identical across the site, GBP and local directories.
5. Gather customer reviews and (later) add service/city landing pages for long-tail terms.

## Notes / next steps

- The **Track** forms are visually wired but not yet functional (a real tracking
  backend is planned).
- The **contact** form posts to `#`; add a backend or form service plus spam
  protection before going live.
- Accessibility: WCAG AA targeted, full keyboard support, and
  `prefers-reduced-motion` fallbacks for all animation.

Contact: Manoj Agarwal · +91 98310 60389 · power_media007@yahoo.co.in
