const jsonBody = {
  required: true,
  content: {
    "application/json": {
      schema: { type: "object", additionalProperties: true },
    },
  },
};

const operation = (
  summary,
  tag,
  { auth = false, body = false, params = [], description } = {},
) => ({
  summary,
  tags: [tag],
  ...(description ? { description } : {}),
  ...(auth ? { security: [{ bearerAuth: [] }] } : {}),
  ...(params.length ? { parameters: params } : {}),
  ...(body
    ? {
        requestBody:
          body === true
            ? jsonBody
            : {
                required: true,
                content: {
                  "application/json": {
                    schema: { $ref: `#/components/schemas/${body}` },
                  },
                },
              },
      }
    : {}),
  responses: {
    "200": { description: "Request completed successfully" },
    "201": { description: "Resource created successfully" },
    "400": { description: "Invalid request" },
    "401": { description: "Authentication required or session expired" },
    "403": { description: "Insufficient permissions" },
    "404": { description: "Resource not found" },
    "409": { description: "Resource conflicts with existing data" },
    "422": { description: "Request validation failed" },
    "429": { description: "Rate limit exceeded" },
    "500": { description: "Unexpected server error" },
    "503": { description: "Required service is not configured or available" },
  },
});

const id = (name) => ({
  name,
  in: "path",
  required: true,
  schema: { type: "string" },
});

const auth = (summary, body = false) =>
  operation(summary, "Authentication", { body });
const admin = (summary, options = {}) =>
  operation(summary, "Administration", { auth: true, ...options });

const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Quatréa API",
    version: "1.0.0",
    description:
      "REST API for the Quatréa fragrance shop. Authenticated requests use a short-lived Bearer access token. Refresh tokens are rotated in an httpOnly cookie scoped to /api/auth.",
  },
  servers: [{ url: "/api", description: "Current Quatréa API server" }],
  tags: [
    { name: "Authentication" },
    { name: "Perfumes" },
    { name: "Reviews" },
    { name: "Users" },
    { name: "Cart" },
    { name: "Orders" },
    { name: "Contact" },
    { name: "Newsletter" },
    { name: "Administration" },
    { name: "Health" },
  ],
  paths: {
    "/health": {
      get: operation("Check API availability", "Health"),
    },
    "/auth/register": {
      post: auth("Create an account and start a session", "RegistrationRequest"),
    },
    "/auth/login": {
      post: auth("Sign in and start a session", "LoginRequest"),
    },
    "/auth/refresh": {
      post: auth("Rotate the refresh cookie and issue an access token"),
    },
    "/auth/logout": {
      post: auth("Revoke the current refresh session"),
    },
    "/auth/me": {
      get: operation("Get the current user", "Authentication", { auth: true }),
    },
    "/auth/forgot-password": {
      post: auth(
        "Send a time-limited password reset email",
        "ForgotPasswordRequest",
      ),
    },
    "/auth/reset-password": {
      post: auth(
        "Reset a password using a valid email token",
        "ResetPasswordRequest",
      ),
    },
    "/perfumes": {
      get: operation("List and filter fragrances", "Perfumes"),
      post: admin("Create a fragrance", { body: true }),
    },
    "/perfumes/{identifier}": {
      get: operation("Get fragrance details by slug", "Perfumes", {
        params: [id("identifier")],
        description: "Use the fragrance slug as the identifier.",
      }),
      put: admin("Update a fragrance", {
        body: true,
        params: [id("identifier")],
      }),
      delete: admin("Delete a fragrance", { params: [id("identifier")] }),
    },
    "/perfumes/{perfumeId}/reviews": {
      get: operation("List fragrance reviews", "Reviews", {
        params: [id("perfumeId")],
      }),
      post: operation("Create a fragrance review", "Reviews", {
        auth: true,
        body: true,
        params: [id("perfumeId")],
      }),
    },
    "/reviews/{id}": {
      delete: operation("Delete an owned review", "Reviews", {
        auth: true,
        params: [id("id")],
      }),
    },
    "/users/me": {
      put: operation("Update the current profile", "Users", {
        auth: true,
        body: true,
      }),
    },
    "/users/me/password": {
      put: operation("Change the current password", "Users", {
        auth: true,
        body: true,
      }),
    },
    "/users/me/wishlist": {
      get: operation("Get the current wishlist", "Users", { auth: true }),
    },
    "/users/me/wishlist/{perfumeId}": {
      post: operation("Toggle a fragrance in the wishlist", "Users", {
        auth: true,
        params: [id("perfumeId")],
      }),
    },
    "/users": {
      get: admin("List users"),
    },
    "/users/{id}/role": {
      patch: admin("Change a user's role", {
        body: true,
        params: [id("id")],
      }),
    },
    "/users/{id}": {
      delete: admin("Delete a user", { params: [id("id")] }),
    },
    "/cart": {
      get: operation("Get the current cart", "Cart", { auth: true }),
      post: operation("Add a fragrance to the cart", "Cart", {
        auth: true,
        body: true,
      }),
      delete: operation("Clear the current cart", "Cart", { auth: true }),
    },
    "/cart/{perfumeId}": {
      put: operation("Set a cart item quantity", "Cart", {
        auth: true,
        body: true,
        params: [id("perfumeId")],
      }),
      delete: operation("Remove a cart item", "Cart", {
        auth: true,
        params: [id("perfumeId")],
      }),
    },
    "/orders": {
      get: admin("List all orders"),
      post: operation("Place an order from the current cart", "Orders", {
        auth: true,
        body: true,
      }),
    },
    "/orders/mine": {
      get: operation("List the current user's orders", "Orders", {
        auth: true,
      }),
    },
    "/orders/{id}": {
      get: operation("Get an order owned by the current user or an admin", "Orders", {
        auth: true,
        params: [id("id")],
      }),
    },
    "/orders/{id}/cancel": {
      patch: operation("Cancel an eligible order", "Orders", {
        auth: true,
        params: [id("id")],
      }),
    },
    "/orders/{id}/status": {
      patch: admin("Update an order status", {
        body: true,
        params: [id("id")],
      }),
    },
    "/contact": {
      get: admin("List customer messages"),
      post: operation("Send a customer message", "Contact", { body: true }),
    },
    "/contact/{id}/read": {
      patch: admin("Mark a customer message as read", {
        params: [id("id")],
      }),
    },
    "/contact/{id}": {
      delete: admin("Delete a customer message", { params: [id("id")] }),
    },
    "/newsletter/subscribe": {
      post: operation("Subscribe an email address", "Newsletter", {
        body: true,
      }),
    },
    "/newsletter/unsubscribe": {
      post: operation("Unsubscribe an email address", "Newsletter", {
        body: true,
      }),
    },
    "/newsletter": {
      get: admin("List newsletter subscribers"),
    },
    "/admin/stats": {
      get: admin("Get dashboard metrics and low-stock inventory"),
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegistrationRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", maxLength: 60 },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      ForgotPasswordRequest: {
        type: "object",
        required: ["email"],
        properties: { email: { type: "string", format: "email" } },
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["token", "password"],
        properties: {
          token: { type: "string" },
          password: { type: "string", minLength: 8 },
        },
      },
    },
  },
};

export default openapi;
