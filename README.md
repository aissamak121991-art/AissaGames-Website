# AissaGames — Official Website

The official company, legal, and support website for **AissaGames**, an independent
game studio, and its first title **Kharbga**.

Handcrafted with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build
step, no external runtime dependencies. Fast, accessible, responsive, and ready to
deploy on any static host.

---

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Studio intro, featured game, official links |
| Privacy Policy | `privacy.html` | GDPR/CCPA-ready legal document |
| Terms of Service | `terms.html` | Full terms, fair play, purchases |
| Delete Account | `delete-account.html` | Unity Player Account deletion guide |
| Support Center | `support.html` | Categorised, searchable help articles |
| FAQ | `faq.html` | Searchable, filterable questions + FAQ schema |
| Contact | `contact.html` | Studio details + frontend-only contact form |
| 404 | `404.html` | Friendly not-found page |

## Structure

```
/
├── index.html · privacy.html · terms.html · delete-account.html
├── support.html · contact.html · faq.html · 404.html
├── css/
│   ├── style.css        # Design system, layout & components
│   ├── dark.css          # Theme layer (light overrides) + scrollbars
│   ├── responsive.css    # Breakpoints + mobile navigation + print
│   └── animations.css    # Keyframes, scroll reveal, reduced-motion
├── js/
│   ├── theme.js          # Dark/light theme (system + manual + storage)
│   ├── navigation.js     # Sticky nav, mobile menu, active link
│   ├── animations.js     # Scroll reveal + button ripple (reduced-motion aware)
│   ├── faq.js            # Accordion + search + category filtering
│   └── main.js           # Year, TOC scroll-spy, contact form validation
├── assets/
│   ├── logo/             # SVG mark + wordmarks, apple-touch-icon.png
│   └── images/           # og-image.png (1200×630 social share)
├── favicon.svg · favicon.ico
├── manifest.json · robots.txt · sitemap.xml
├── _headers              # Security headers (Netlify / Cloudflare Pages)
├── .nojekyll             # Serve all files verbatim on GitHub Pages
└── README.md
```

## Design system

The entire visual language is driven by CSS custom properties in
`css/style.css` (`:root`) with light-theme overrides in `css/dark.css`.

- **Primary:** Emerald green · **Secondary:** Deep navy · **Accent:** Luxury gold
- Dark-luxury background, glassmorphism cards, soft shadows, subtle glow
- System font stack only — no external fonts, no network requests

## Features

- **Dark mode** — automatic (system), manual toggle, preference remembered
- **Accessibility** — semantic HTML, ARIA, keyboard navigation, skip link,
  visible focus, `prefers-reduced-motion` support, WCAG-AA-minded contrast
- **SEO** — meta tags, Open Graph, Twitter Cards, canonical URLs, Schema.org
  structured data (Organization, WebSite, VideoGame, FAQPage), `sitemap.xml`,
  `robots.txt`, `manifest.json`
- **Performance** — no frameworks, deferred scripts, no render-blocking JS,
  lightweight inline SVG icons, static hero stats (zero layout shift)
- **Security** — every page ships a strict `Content-Security-Policy` and
  `Referrer-Policy` via `<meta>`; the `_headers` file adds
  `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`, HSTS, and
  the same CSP on hosts that support custom headers. No inline styles or inline
  scripts anywhere (JSON-LD data blocks aside), so the CSP needs no
  `'unsafe-inline'`.

## Structured data

Each page includes relevant Schema.org JSON-LD: `Organization` + `WebSite` +
`VideoGame` (home), `BreadcrumbList` (all inner pages), `FAQPage` (FAQ), and
`ContactPage` (contact).

## Local preview

No build step is required. Serve the folder with any static server, e.g.:

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Deployment

Deploys as-is to **GitHub Pages, Netlify, Cloudflare Pages, or Vercel** with no
extra configuration.

**All asset and internal-link references are relative** (`css/style.css`,
`js/theme.js`, `index.html`, …) — not root-absolute (`/css/…`). This is what
makes the site work as a GitHub Pages **project** site served under a subpath,
e.g. `https://<user>.github.io/AissaGames-Website/`, as well as at a domain root.
Do not reintroduce leading slashes on `href`/`src`.

The absolute URLs that must point at the live host — `<link rel="canonical">`,
Open Graph / Twitter image and URL, JSON-LD, and `sitemap.xml`/`robots.txt` — are
currently set to `https://aissamak121991-art.github.io/AissaGames-Website/`.

### Configuration to review before launch

- If you move to a custom domain (e.g. `aissagames.com`), replace the base
  `https://aissamak121991-art.github.io/AissaGames-Website/` in `sitemap.xml`,
  `robots.txt`, and each page's canonical / Open Graph URLs. The relative asset
  paths need no change.
- A binary `favicon.ico` (16/32/48 px) ships alongside `favicon.svg` for legacy
  browsers; the SVG favicon covers modern browsers.
- GitHub Pages cannot send custom HTTP headers, so security is enforced in-page
  via `<meta>` CSP/Referrer-Policy. On Netlify or Cloudflare Pages the `_headers`
  file additionally applies HSTS, `X-Frame-Options`, `Permissions-Policy`, and
  `X-Content-Type-Options`.

## Localization

Copy is in English. The structure is localization-ready: text is not baked into
images, the layout is direction-agnostic, and pages can be duplicated per locale
(e.g. `/ar/`, `/fr/`) with the `lang` and `dir` attributes updated.

## Contact

- **Developer:** AissaGames
- **Email:** aissamak121991@gmail.com

© AissaGames. All rights reserved.
