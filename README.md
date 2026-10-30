# DeepTrics Event Planners & Surprise Planners

A premium, cinematic single-page website for **DeepTrics Event Planners & Surprise
Planners** — an event management and surprise planning brand. Built as a
high-end, Awwwards-style experience rather than a generic business site.

## Highlights

- **Immersive hero** — an interactive Three.js scene (React Three Fiber + Drei)
  with floating metallic ribbons, particles, layered depth, mouse-driven camera
  and realistic studio lighting via `Lightformer`. Pauses when off-screen.
- **Cinematic motion** — GSAP ScrollTrigger for section reveals, text reveals,
  image-clip transitions, parallax and a pinned horizontal *Signature
  Experiences* gallery. Framer Motion for navigation, modals, filtering and
  carousels. Lenis for buttery smooth scrolling (synced to ScrollTrigger).
- **Custom cursor** — dot + ring with contextual labels ("Explore", "View
  Project", "Discover"). Disabled on touch devices and under reduced motion.
- **Asymmetric service grid** + full service detail modal with enquiry CTA.
- **Editorial portfolio** with category filtering and a full-screen viewer.
- **Honest enquiry form** — validation, success/error states, WhatsApp
  integration, and a clearly configurable submission endpoint (never fakes a
  success without a backend).
- Fully responsive, SEO/OG meta, semantic HTML, keyboard-accessible, respects
  `prefers-reduced-motion`, error boundary and lazy-loaded images.

## Tech stack

React · TypeScript · Vite · Tailwind CSS v4 · Three.js · React Three Fiber ·
Drei · GSAP (ScrollTrigger) · Framer Motion · Lenis · Lucide React

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build (dist/)
npm run preview    # preview the production build
npm run typecheck  # TypeScript check only
```

Requires Node 18+.

## Environment variables

Copy `.env.example` to `.env` and fill in your values. Full documentation lives
in `.env.example`. The key ones:

| Variable                | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `VITE_CONTACT_PHONE`    | Phone shown across the site                |
| `VITE_CONTACT_EMAIL`    | Email shown across the site                |
| `VITE_WHATSAPP_NUMBER`  | WhatsApp number (international, no `+`)    |
| `VITE_ENQUIRY_ENDPOINT` | URL the enquiry form POSTs JSON to         |

If `VITE_ENQUIRY_ENDPOINT` is empty, the form shows an honest "submission not
configured" notice and points visitors to WhatsApp/email — it does **not**
simulate success.

## Where to change content

| What                  | File                                        |
| --------------------- | ------------------------------------------- |
| Brand / contact / WhatsApp / stats | `src/lib/config.ts`          |
| Services (copy, images)            | `src/data/services.ts`        |
| Signature experiences              | `src/data/signature.ts`       |
| Portfolio (sample projects)        | `src/data/portfolio.ts`       |
| Testimonials (sample reviews)      | `src/data/testimonials.ts`    |
| All imagery (single registry)      | `src/data/images.ts`          |

> **Please replace the sample data before launch.** Statistics and testimonials
> are clearly-labelled placeholders; the portfolio is sample content.

## Imagery & attribution

All photography resolves through `src/data/images.ts` so it can be swapped in
one place. The current images are **CC-licensed placeholder stock** curated from
Wikimedia Commons (replace them with your real portfolio photography in WebP/AVIF
before going live). A full attribution list with source links is in
`IMAGE_ATTRIBUTION.md`.

The `SmartImage` component lazy-loads every image and falls back to an elegant
branded placeholder instead of ever rendering a broken image.

## Deployment

`npm run build` produces a static `dist/` folder. Deploy it to any static host
(Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, Nginx, etc.). No server
runtime is required. For the enquiry form, point `VITE_ENQUIRY_ENDPOINT` at your
form service and set the environment variable at build time in your host's
settings.

## Performance & accessibility notes

- Three.js scene renders only while the hero is visible and drops particle count
  on mobile (`dpr` capped). Geometries/materials are disposed on unmount by R3F.
- Images lazy-load with `loading="lazy"`, `decoding="async"` and sized `sizes`.
- The custom cursor, smooth scroll, carousel auto-play and heavy animations are
  all disabled under `prefers-reduced-motion`.
- Semantic landmarks, skip-friendly headings, focus-visible outlines, ARIA on
  dialogs/tabs, and form field errors with `aria-invalid` are included.
