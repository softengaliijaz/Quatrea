# Quatréa

A frontend-only, responsive fragrance house concept built with React, Vite, Tailwind CSS v4, and Framer Motion. The home page tells the story of four seasonal originals, with a locally browsable collection of twelve fragrances.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`, or preview it using `npm run preview`.

## Project structure

```text
src/
├── app/                 Redux store
├── components/ui/       Shared product and form components
├── data/                Local fragrance catalogue
├── features/
│   ├── cart/            Local cart and wishlist state
│   ├── perfumes/        Catalogue state
│   └── public/          Storefront pages and presentation
├── hooks/               Shared UI and shopping hooks
├── layouts/             Public layout
├── styles/              Tokens, global rules, components, animations
└── App.jsx
```

## Interactions and scope

- Product filters, perfume details, cart, and wishlist work entirely in the browser. The bag and wishlist are saved in local storage on this device.
- This is a design-assignment storefront, not a commerce service: there is no account system, checkout, payment processing, order submission, or server-side persistence.
- Contact and correspondence links open the visitor's email application.
- The four seasonal originals lead the catalogue; eight additional fragrances broaden discovery.

## Design system

Tailwind CSS v4 is configured through the Vite plugin. `src/styles/variables.css` holds the palette and Tailwind theme mappings; `globals.css` contains base styles; `components.css` contains reusable Tailwind-backed UI patterns and responsive rules; and `animations.css` holds the seasonal effects and keyframes. Pointer hover feedback is limited to hover-capable devices; touch targets, active states, keyboard focus, and reduced-motion preferences are supported.
