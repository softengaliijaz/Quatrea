# QUATRÉA — four seasons, four fragrances

A frontend-only, multipage scrollytelling website for a fictional perfume house. Built for the MAKRA Web Developer design task.

**Stack:** React 19 + Vite, React Router, Redux Toolkit, Tailwind CSS v4, Framer Motion, Lucide icons, Lenis (smooth scroll). No backend, no environment variables.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, pinned season story (page recolours per season), scroll-lit statements, horizontal collection strip, quiz teaser, journal preview |
| `/collection` | Filter by season, scent family and price, search, sort, skeleton + empty states |
| `/collection/:slug` | Perfume page: 3D pointer-tilt bottle, season world, scent pyramid, size and quantity, reviews |
| `/quiz` | "Find your season" quiz with animated steps and a matched result |
| `/journal`, `/journal/:slug` | Editorial stories with reading-progress bar |
| `/about` | The house, plus a scroll-driven "Inside the atelier" timeline |
| `/contact` | Client-validated contact form |
| `/cart` | Bag and simulated checkout (client validation) |
| `/order-confirmed` | Animated confirmation with a generated order number |
| `/wishlist` | Saved fragrances |
| `*` | Playful 404 |

Also: slide-in cart drawer, toast feedback, light and dark themes, skip link, reduced-motion support.

## Structure

```
src/
├── components/  common/ layout/ home/ perfume/ journal/
├── pages/       one file per route (lazy loaded)
├── redux/       store.js + slices: theme, cart, wishlist, filters, ui, order
├── data/        perfumes, seasons, journal, quiz (all content is local)
├── hooks/       useTheme, useSmoothScroll, useDebounce, useShop, useDocumentTitle
├── utils/       format, validators, storage (safe localStorage)
└── styles/      index.css (theme tokens, component classes, season particles)
```

Cart, wishlist and theme persist in `localStorage`. Everything else is in memory.

## Deploy

Vercel or Netlify: build command `npm run build`, output `dist`. `vercel.json` already rewrites every route to `index.html` so deep links such as `/collection/givre` survive a refresh.
