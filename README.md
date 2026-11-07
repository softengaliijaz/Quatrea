# Quatréa

A frontend-only, seasonal fragrance house experience created as a creative web-development portfolio piece. The four original fragrances—Éclosion, Zénith, Vendange and Givre—anchor a local collection of twelve scents.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`, or preview it with `npm run preview`.

## Pages and experiences

- **Home:** seasonal editorial hero, scene switcher, pinned four-season story and horizontal collection.
- **Collection and fragrance pages:** local catalogue, filters, scent pyramids, sample reviews, wishlist and add-to-bag controls.
- **Find your season:** a five-question animated quiz with recommendations and a shareable result.
- **Layering lab:** blend two fragrances with a live ratio, combined note cloud and imagined blend name.
- **Notes atlas:** filter ingredient stories by season and explore their origins and fragrance connections.
- **Journal:** editorial index and long-form reading pages with a reading-progress indicator.
- **Atelier:** a scroll-led account of gathering, extraction, composition, ageing and bottling.
- **Gift finder:** three quick choices and a small animated gift pairing.
- **Our places:** an interactive illustrated locator for fictional Paris, Grasse, Tokyo and New York boutiques.
- **Wishlist, cart drawer, bag, checkout and confirmation:** persistent local preferences and a clearly simulated checkout.
- **About, contact and 404:** the house story, an accessible contact form and a designed empty-state page.

## Frontend-only scope

All catalogue, editorial, ingredient, quiz and review content lives in `src/data/`. Redux Toolkit is used only for the local catalogue, cart, wishlist, theme and temporary interface state. Cart, wishlist and theme are stored in browser local storage where available.

Checkout generates an in-memory demo reference; it does not collect payment or send or save an order. Contact and newsletter forms show local success states without sending addresses or messages to a server. Boutique locations, reviews, ingredient origins and order confirmation are portfolio-demo content.

## Project structure

```text
src/
├── app/                         Redux store
├── components/ui/               Shared bottle, form, icon and product components
├── constants/                   Seasons and shared labels
├── data/                        Local catalogue, editorial and discovery content
├── features/
│   ├── cart/                    Cart and wishlist state
│   ├── perfumes/                Local catalogue state
│   ├── theme/                   Theme state
│   ├── ui/                      Temporary interface state
│   └── public/                  Pages and presentation components
├── hooks/                       Shared interaction hooks
├── layouts/                     Public site shell
└── styles/                      Theme tokens, Tailwind utilities and motion
```

## Deployment

### Vercel

Import the repository, keep the root directory at the repository root, and use the Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` rewrites deep links to the SPA entry point.

### Netlify

Set the build command to `npm run build` and the publish directory to `dist`. Add a `public/_redirects` file containing `/* /index.html 200` if your Netlify setup does not already provide SPA history fallback.

No environment variables or backend services are required. The deployed preview link must be created from the hosting account; this repository does not contain a live deployment URL.

## Design and accessibility

Tailwind CSS v4 is configured with the Vite plugin. Centralized palette and type tokens are in `src/styles/variables.css`; global styles, shared patterns, page experiences and seasonal motion are kept in separate CSS files. Hover treatments are limited to fine pointers. Keyboard focus, semantic labels, touch-sized controls and reduced-motion overrides are included.
