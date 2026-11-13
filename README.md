# Rocky Mountain Hyperbaric Institute — website

Static website for Rocky Mountain Hyperbaric Institute (RMHI), Louisville, Colorado.
Plain HTML, CSS and a little JavaScript: no build step, no framework, no dependencies.

## Folder layout

```
index.html              Home page
pages/                  Every other page (one real HTML file per page)
  condition-*.html      Five clinical indication pages (share styles/condition.css)
  pricing-coverage.html Redirect only: forwards old links to insurance-medicare.html
styles/
  base.css              Colors, fonts, spacing variables, global element styles
  components.css        Shared pieces: header, nav, footer, buttons, cards, hero, etc.
  <page>.css            One stylesheet per page (home.css, about.css, ...)
scripts/
  header-scroll.js      Sticky header hide/show, mobile menu, "Patients & Providers" dropdown
  contact-mailto.js     Contact form → pre-filled email draft (Contact page only)
assets/
  global/               Logo, Apple touch icon, shared hero photo
  <page>/               Photos for that page, as .webp
downloads/              Referral and consent-form PDFs linked from the site
favicon.ico             Browser tab icon
```

Each page loads `base.css`, `components.css` and its own page stylesheet, plus
`header-scroll.js`. Headings use Source Serif 4 from Google Fonts; body text uses the
system font.

## Previewing locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (VS Code Live Server also works if started from the
repo root.) Opening the HTML files directly from Finder will **not** work, because
links and asset paths start with `/`.

## Hosting

- Serve the site from the **root of the domain** (e.g. `https://example.com/`), not a
  subfolder, because all links are root-relative (`/pages/...`, `/assets/...`).
- Keep `pages/pricing-coverage.html` so old links and bookmarks keep working. If the
  host supports server redirects, a 301 from that URL to
  `/pages/insurance-medicare.html` can replace it.

## Editing conventions

- **Header and footer** are repeated in every HTML file. When changing the nav or
  footer, update all pages so they stay identical.
- **New page:** copy an existing page in `pages/`, give it its own
  `styles/<page>.css`, set the `<title>` and meta description, and add it to the nav
  and/or footer on every page.
- **Images:** convert photos to `.webp` (e.g. `cwebp -q 82 photo.jpg -o photo.webp`)
  and put them in `assets/<page>/`. Include `alt`, `width` and `height` on `<img>`.
- **Colors and fonts** live as variables at the top of `styles/base.css`.

## Contact form — important

The Contact page form does **not** send anything to a server. It only opens a
pre-filled draft in the visitor's own email app (`scripts/contact-mailto.js`).
It intentionally has no free-text message box, and visitors must confirm they won't
include medical information.

Do not turn this into a form that collects medical records, diagnoses or insurance
details unless it is replaced with a secure, HIPAA-appropriate service.

## Content notes

- Clinical summaries, insurance wording, staff credentials and photos were supplied
  and approved by RMHI.
- "Other Services" (neurofeedback, wound care) and "Additional Clinical Applications"
  are placeholder pages until those programs and summaries are finalized.
