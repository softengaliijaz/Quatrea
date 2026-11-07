# Quatréa — four seasons, four fragrances

A multipage scrollytelling website for a fictional perfume house, built with the MERN stack.
Smooth scrolling (Lenis), scroll-driven animation (Framer Motion), light and dark themes, JWT authentication with roles, and a full shop flow (cart, orders, reviews, wishlist) plus an admin dashboard.

```
quatrea/
├── client/            React (Vite) + Redux Toolkit
│   └── src/
│       ├── api/            axios instance + silent token refresh
│       ├── app/            Redux store
│       ├── features/
│       │   ├── public/       storefront pages and public-only components
│       │   ├── admin/        admin pages, components, and state
│       │   ├── auth/         authentication state and route guards
│       │   └── ...           perfumes, reviews, cart, orders, contact, theme
│       ├── layouts/          PublicLayout, AdminLayout, AuthLayout
│       ├── hooks/          useAuth, useTheme, useShop, useSmoothScroll, useDebounce
│       ├── components/     shared UI components
│       ├── constants/      season copy and colours
│       └── styles/         design tokens, light/dark themes, responsive rules
└── server/            Node + Express + MongoDB (MVC)
    ├── server.js
    └── src/
        ├── config/  models/  controllers/  routes/  middleware/  validators/  utils/  seed/
```

## Run it locally

You need Node 18+ and MongoDB (local, or a free Atlas cluster).

```bash
# 1. API
cd server
cp .env.example .env          # set MONGO_URI and two long random JWT secrets
npm install
npm run seed                  # adds 12 perfumes, an admin and a demo user without clearing data
npm run dev                   # http://localhost:5000

# 2. Website (new terminal)
cd client
npm install
npm run dev                   # http://localhost:5173  (proxies /api to the server)
```

Seeded accounts: `admin@quatrea.com / Admin@12345` and `demo@quatrea.com / Demo@12345`.
The seed command is additive and idempotent: it does not delete existing users, orders, carts, or reviews. Existing seed accounts are left unchanged.

## Frontend styling

The client uses Tailwind CSS v4 through its Vite plugin. `client/src/styles/index.css` is the styling entry point; theme tokens and light/dark values live in `variables.css`, base rules in `globals.css`, reusable Tailwind-backed component patterns and responsive rules in `components.css`, and keyframes/complex motion effects in `animations.css`. Seasonal accents and theme colors are CSS variables exposed as Tailwind colors, so dynamic product/season styling and both themes share the same palette.

## Authentication and authorization

- Register/login return a 15-minute **access token** (kept in Redux memory) and set a 7-day **refresh token** in an httpOnly cookie.
- The refresh token is rotated on every use and stored hashed (SHA-256) on the user.
- The axios interceptor refreshes silently on a 401 and retries the request; the session is restored on page load.
- `/admin/login` uses a backend-verified admin-only login endpoint. Admin pages render under `AdminLayout`; public pages use `PublicLayout`, and authentication uses `AuthLayout`.
- `protect` checks the token, `authorize('admin')` restricts admin APIs, and the client `AdminRoute` restores the session before checking the role.
- Passwords are hashed with bcrypt (12 rounds). Helmet, CORS allow-list, rate limiting on auth, and express-validator on every input.
- Password reset uses a single-use, hashed token that expires after 15 minutes. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `MAIL_FROM` to enable delivery. Reset requests return a generic response whether or not an account exists.
- Production startup rejects missing or short JWT signing secrets. Use separate random secrets of at least 32 characters.

## API endpoints (`/api`)

| Area       | Endpoints                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth       | `POST /auth/register` · `POST /auth/login` · `POST /auth/admin/login` · `POST /auth/refresh` · `POST /auth/logout` · `GET /auth/me` · `POST /auth/forgot-password` · `POST /auth/reset-password` |
| Users      | `PUT /users/me` · `PUT /users/me/password` · `GET /users/me/wishlist` · `POST /users/me/wishlist/:perfumeId` · admin: `GET /users` · `PATCH /users/:id/role` · `DELETE /users/:id` |
| Perfumes   | `GET /perfumes` (season, search, sort, price, page) · `GET /perfumes/:slug` · admin: `POST /perfumes` · `PUT /perfumes/:id` · `DELETE /perfumes/:id`                               |
| Reviews    | `GET /perfumes/:perfumeId/reviews` · `POST /perfumes/:perfumeId/reviews` · `DELETE /reviews/:id`                                                                                   |
| Cart       | `GET /cart` · `POST /cart` · `PUT /cart/:perfumeId` · `DELETE /cart/:perfumeId` · `DELETE /cart`                                                                                   |
| Orders     | `POST /orders` · `GET /orders/mine` · `GET /orders/:id` · `PATCH /orders/:id/cancel` · admin: `GET /orders` · `PATCH /orders/:id/status`                                           |
| Contact    | `POST /contact` · admin: `GET /contact` · `PATCH /contact/:id/read` · `DELETE /contact/:id`                                                                                        |
| Newsletter | `POST /newsletter/subscribe` · `POST /newsletter/unsubscribe` · admin: `GET /newsletter`                                                                                           |
| Admin      | `GET /admin/stats`                                                                                                                                                                 |

Card payment is simulated (the order is simply marked paid); wire in Stripe if you take this further.

## API reference

The interactive Swagger UI is available at `/api/docs` and the OpenAPI 3.0 JSON at `/api/openapi.json`. The docs cover public, authenticated, and admin endpoints; authorize with the short-lived Bearer access token for protected calls.

## Deploying for the live demo link

- **Database:** MongoDB Atlas (free tier). Run `npm run seed` once with the Atlas `MONGO_URI`.
- **Server:** Render or Railway. Start command `npm start`. Set `NODE_ENV=production`, `MONGO_URI`, both JWT secrets, and `CLIENT_URL` to your client URL.
- **Client:** Vercel or Netlify. Build `npm run build`, output `dist`. Set `VITE_API_URL=https://your-server.example.com/api`. Add a rewrite of all paths to `/index.html` so deep links work.
